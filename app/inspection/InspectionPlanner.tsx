"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./inspection.module.css";

type Property = {
  id: number;
  routeOrder: number;
  address: string;
  region: string;
  keyCode: string | null;
  contactName: string | null;
  contactPhone: string | null;
  lastInspectionDate: string | null;
  nextInspectionDate: string | null;
  inspectionIntervalMonths: number;
  notes: string | null;
  updatedAt: number;
};

type Inspection = {
  id: string;
  propertyId: number;
  originalPlannedDate: string;
  plannedDate: string;
  plannedTime: string | null;
  completedDate: string | null;
  rescheduleCount: number;
  notes: string | null;
  updatedAt: number;
};

type ModalState =
  | { kind: "schedule"; property: Property }
  | { kind: "complete"; inspection: Inspection; property: Property }
  | { kind: "reschedule"; inspection: Inspection; property: Property }
  | { kind: "edit"; property: Property }
  | { kind: "add" }
  | null;

const regions = ["中", "东", "南", "南南", "西", "北"];

export default function InspectionPlanner({ userName }: { userName: string }) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [tab, setTab] = useState<"week" | "properties" | "history">("week");
  const [weekStart, setWeekStart] = useState(nextMondayIso);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("全部");
  const [showAllCandidates, setShowAllCandidates] = useState(false);
  const [modal, setModal] = useState<ModalState>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadData = useCallback(async () => {
    try {
      const response = await fetch("/api/inspection", { cache: "no-store" });
      const result = (await response.json()) as {
        ok: boolean;
        properties?: Property[];
        inspections?: Inspection[];
        error?: string;
      };
      if (!response.ok || !result.ok) throw new Error(result.error || "无法读取资料");
      setProperties(result.properties ?? []);
      setInspections(result.inspections ?? []);
      setError("");
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "无法读取资料");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const propertyById = useMemo(
    () => new Map(properties.map((property) => [property.id, property])),
    [properties],
  );
  const weekEnd = addDaysIso(weekStart, 6);
  const activePropertyIds = useMemo(
    () => new Set(inspections.filter((item) => !item.completedDate).map((item) => item.propertyId)),
    [inspections],
  );
  const weekInspections = useMemo(
    () =>
      inspections
        .filter(
          (item) =>
            (item.plannedDate >= weekStart && item.plannedDate <= weekEnd) ||
            (!item.completedDate && item.plannedDate < weekStart),
        )
        .sort((a, b) => {
          const aProperty = propertyById.get(a.propertyId);
          const bProperty = propertyById.get(b.propertyId);
          return (aProperty?.routeOrder ?? 9999) - (bProperty?.routeOrder ?? 9999);
        }),
    [inspections, propertyById, weekEnd, weekStart],
  );
  const dueCandidates = useMemo(
    () =>
      properties.filter(
        (property) =>
          property.nextInspectionDate &&
          property.nextInspectionDate <= weekEnd &&
          !activePropertyIds.has(property.id),
      ),
    [activePropertyIds, properties, weekEnd],
  );
  const completedThisWeek = weekInspections.filter((item) => item.completedDate).length;
  const pendingThisWeek = weekInspections.length - completedThisWeek;

  const filteredProperties = useMemo(() => {
    const term = search.trim().toLowerCase();
    return properties.filter((property) => {
      const matchesRegion = region === "全部" || property.region === region;
      const matchesSearch =
        !term ||
        property.address.toLowerCase().includes(term) ||
        property.keyCode?.toLowerCase().includes(term) ||
        property.contactName?.toLowerCase().includes(term) ||
        property.contactPhone?.toLowerCase().includes(term);
      return matchesRegion && matchesSearch;
    });
  }, [properties, region, search]);

  async function save(payload: Record<string, unknown>, successMessage: string) {
    setSaving(true);
    setError("");
    try {
      const response = await fetch("/api/inspection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { ok: boolean; error?: string };
      if (!response.ok || !result.ok) throw new Error(result.error || "保存失败");
      await loadData();
      setModal(null);
      setNotice(successMessage);
      window.setTimeout(() => setNotice(""), 2800);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "保存失败");
    } finally {
      setSaving(false);
    }
  }

  async function submitModal(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!modal) return;
    const values = Object.fromEntries(new FormData(event.currentTarget).entries());

    if (modal.kind === "schedule") {
      await save(
        { action: "schedule", propertyId: modal.property.id, ...values },
        "已加入安排",
      );
    } else if (modal.kind === "complete") {
      await save(
        { action: "complete", inspectionId: modal.inspection.id, ...values },
        "Inspection 已完成，下一次日期已更新",
      );
    } else if (modal.kind === "reschedule") {
      await save(
        { action: "reschedule", inspectionId: modal.inspection.id, ...values },
        "已更新预约日期",
      );
    } else if (modal.kind === "edit") {
      await save(
        { action: "updateProperty", propertyId: modal.property.id, ...values },
        "房源资料已更新",
      );
    } else {
      await save({ action: "createProperty", ...values }, "新房源已插入路线");
    }
  }

  return (
    <main className={styles.appShell}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.brandMark}>G</span>
          <div>
            <strong>GRAMAX</strong>
            <span>INSPECTION PLANNER</span>
          </div>
        </div>
        <div className={styles.userBlock}>
          <span className={styles.liveDot} />
          <span>{userName}</span>
          <a href="/signout-with-chatgpt?return_to=/">退出</a>
        </div>
      </header>

      <section className={styles.workspace}>
        <div className={styles.topbar}>
          <nav className={styles.tabs} aria-label="Inspection navigation">
            <button className={tab === "week" ? styles.activeTab : ""} onClick={() => setTab("week")}>
              下周安排
            </button>
            <button className={tab === "properties" ? styles.activeTab : ""} onClick={() => setTab("properties")}>
              所有房源
            </button>
            <button className={tab === "history" ? styles.activeTab : ""} onClick={() => setTab("history")}>
              历史记录
            </button>
          </nav>
          <p>两个人使用同一份资料 · 自动保存</p>
        </div>

        {notice ? <div className={styles.notice} role="status">{notice}</div> : null}
        {error ? <div className={styles.error} role="alert">{error}</div> : null}

        {loading ? (
          <div className={styles.loading}>正在整理 inspection 路线…</div>
        ) : tab === "week" ? (
          <WeekView
            weekStart={weekStart}
            weekEnd={weekEnd}
            setWeekStart={setWeekStart}
            dueCandidates={dueCandidates}
            weekInspections={weekInspections}
            propertyById={propertyById}
            completedCount={completedThisWeek}
            pendingCount={pendingThisWeek}
            showAllCandidates={showAllCandidates}
            setShowAllCandidates={setShowAllCandidates}
            setModal={setModal}
          />
        ) : tab === "properties" ? (
          <PropertiesView
            properties={filteredProperties}
            allProperties={properties}
            search={search}
            setSearch={setSearch}
            region={region}
            setRegion={setRegion}
            setModal={setModal}
          />
        ) : (
          <HistoryView inspections={inspections} propertyById={propertyById} />
        )}
      </section>

      {modal ? (
        <Modal
          modal={modal}
          properties={properties}
          weekStart={weekStart}
          saving={saving}
          onClose={() => setModal(null)}
          onSubmit={submitModal}
        />
      ) : null}
    </main>
  );
}

function WeekView({
  weekStart,
  weekEnd,
  setWeekStart,
  dueCandidates,
  weekInspections,
  propertyById,
  completedCount,
  pendingCount,
  showAllCandidates,
  setShowAllCandidates,
  setModal,
}: {
  weekStart: string;
  weekEnd: string;
  setWeekStart: (value: string) => void;
  dueCandidates: Property[];
  weekInspections: Inspection[];
  propertyById: Map<number, Property>;
  completedCount: number;
  pendingCount: number;
  showAllCandidates: boolean;
  setShowAllCandidates: (value: boolean) => void;
  setModal: (value: ModalState) => void;
}) {
  const visibleCandidates = showAllCandidates ? dueCandidates : dueCandidates.slice(0, 12);
  return (
    <>
      <section className={styles.weekHero}>
        <div>
          <span className={styles.kicker}>NEXT WEEK ROUTE</span>
          <h1>下周安排</h1>
          <p>{formatDate(weekStart)} — {formatDate(weekEnd)}</p>
        </div>
        <div className={styles.weekControls}>
          <button onClick={() => setWeekStart(addDaysIso(weekStart, -7))} aria-label="上一周">←</button>
          <button className={styles.todayButton} onClick={() => setWeekStart(nextMondayIso())}>回到下周</button>
          <button onClick={() => setWeekStart(addDaysIso(weekStart, 7))} aria-label="下一周">→</button>
        </div>
      </section>

      <section className={styles.stats} aria-label="Week summary">
        <div><span>待选择</span><strong>{dueCandidates.length}</strong><small>到期房源</small></div>
        <div><span>已安排</span><strong>{pendingCount}</strong><small>按路线排列</small></div>
        <div><span>已完成</span><strong>{completedCount}</strong><small>自动更新日期</small></div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <div><span>01</span><h2>已安排路线</h2></div>
          <p>完成或改期后会立即同步</p>
        </div>
        {weekInspections.length ? (
          <div className={styles.routeList}>
            {weekInspections.map((inspection) => {
              const property = propertyById.get(inspection.propertyId);
              if (!property) return null;
              const carried = !inspection.completedDate && inspection.plannedDate < weekStart;
              return (
                <article className={`${styles.routeRow} ${inspection.completedDate ? styles.completedRow : ""}`} key={inspection.id}>
                  <div className={styles.routeNumber}>{String(property.routeOrder).padStart(3, "0")}</div>
                  <div className={styles.routeMain}>
                    <div className={styles.rowEyebrow}>
                      <span>{property.region}区</span>
                      {carried ? <b>上周未完成</b> : null}
                      {inspection.rescheduleCount ? <b>已改期 {inspection.rescheduleCount} 次</b> : null}
                    </div>
                    <h3>{property.address}</h3>
                    <div className={styles.routeMeta}>
                      <span>预约 {formatDate(inspection.plannedDate)}{inspection.plannedTime ? ` · ${inspection.plannedTime}` : ""}</span>
                      <span>钥匙 {property.keyCode || "未填写"}</span>
                      <span>{property.contactName || property.contactPhone ? `${property.contactName || "联系人"} ${property.contactPhone || ""}` : "联系资料未填写"}</span>
                    </div>
                    {inspection.notes ? <p className={styles.rowNote}>{inspection.notes}</p> : null}
                  </div>
                  <div className={styles.rowActions}>
                    {inspection.completedDate ? (
                      <span className={styles.doneLabel}>✓ {formatDate(inspection.completedDate)} 完成</span>
                    ) : (
                      <>
                        <button className={styles.secondaryButton} onClick={() => setModal({ kind: "reschedule", inspection, property })}>改期</button>
                        <button className={styles.primaryButton} onClick={() => setModal({ kind: "complete", inspection, property })}>完成</button>
                      </>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className={styles.emptyState}>这一周还没有安排。可以从下面的到期房源中选择。</div>
        )}
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <div><span>02</span><h2>到期房源</h2></div>
          <p>选择后自动放入正确路线位置</p>
        </div>
        {visibleCandidates.length ? (
          <div className={styles.candidateList}>
            {visibleCandidates.map((property) => (
              <article className={styles.candidateRow} key={property.id}>
                <span className={styles.routeNumber}>{String(property.routeOrder).padStart(3, "0")}</span>
                <div>
                  <span className={styles.rowEyebrow}>{property.region}区 · 应检查 {formatDate(property.nextInspectionDate)}</span>
                  <h3>{property.address}</h3>
                </div>
                <button className={styles.addButton} onClick={() => setModal({ kind: "schedule", property })}>加入安排 +</button>
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>这个日期范围内没有需要安排的房源。</div>
        )}
        {dueCandidates.length > 12 ? (
          <button className={styles.showMore} onClick={() => setShowAllCandidates(!showAllCandidates)}>
            {showAllCandidates ? "收起" : `查看全部 ${dueCandidates.length} 套`}
          </button>
        ) : null}
      </section>
    </>
  );
}

function PropertiesView({
  properties,
  allProperties,
  search,
  setSearch,
  region,
  setRegion,
  setModal,
}: {
  properties: Property[];
  allProperties: Property[];
  search: string;
  setSearch: (value: string) => void;
  region: string;
  setRegion: (value: string) => void;
  setModal: (value: ModalState) => void;
}) {
  return (
    <>
      <section className={styles.pageHeading}>
        <div><span className={styles.kicker}>ROUTE MASTER LIST</span><h1>所有房源</h1><p>共 {allProperties.length} 套 · 按原路线顺序</p></div>
        <button className={styles.primaryButton} onClick={() => setModal({ kind: "add" })}>新增房源 +</button>
      </section>
      <section className={styles.filters}>
        <label className={styles.searchBox}>
          <span>⌕</span>
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="搜索地址、钥匙或联系人" />
        </label>
        <div className={styles.regionFilters}>
          {["全部", ...regions].map((item) => (
            <button className={region === item ? styles.activeFilter : ""} onClick={() => setRegion(item)} key={item}>{item}</button>
          ))}
        </div>
      </section>
      <div className={styles.propertyList}>
        {properties.map((property) => (
          <article className={styles.propertyRow} key={property.id}>
            <span className={styles.routeNumber}>{String(property.routeOrder).padStart(3, "0")}</span>
            <div className={styles.propertyAddress}><span>{property.region}区</span><h3>{property.address}</h3></div>
            <div className={styles.propertyDetail}><span>钥匙 / 门禁</span><strong>{property.keyCode || "未填写"}</strong></div>
            <div className={styles.propertyDetail}><span>上次</span><strong>{formatDate(property.lastInspectionDate)}</strong></div>
            <div className={styles.propertyDetail}><span>下次</span><strong className={dateTone(property.nextInspectionDate)}>{formatDate(property.nextInspectionDate)}</strong></div>
            <button className={styles.editButton} onClick={() => setModal({ kind: "edit", property })}>编辑</button>
          </article>
        ))}
      </div>
    </>
  );
}

function HistoryView({ inspections, propertyById }: { inspections: Inspection[]; propertyById: Map<number, Property> }) {
  return (
    <>
      <section className={styles.pageHeading}>
        <div><span className={styles.kicker}>INSPECTION LOG</span><h1>历史记录</h1><p>完成和改期都会保留在这里</p></div>
      </section>
      <div className={styles.historyList}>
        {inspections.length ? inspections.map((inspection) => {
          const property = propertyById.get(inspection.propertyId);
          if (!property) return null;
          return (
            <article className={styles.historyRow} key={inspection.id}>
              <span className={styles.routeNumber}>{String(property.routeOrder).padStart(3, "0")}</span>
              <div><span className={styles.rowEyebrow}>{property.region}区</span><h3>{property.address}</h3>{inspection.notes ? <p>{inspection.notes}</p> : null}</div>
              <div className={styles.historyDates}>
                <span>原计划 {formatDate(inspection.originalPlannedDate)}</span>
                {inspection.rescheduleCount ? <span>最后预约 {formatDate(inspection.plannedDate)}</span> : null}
                <strong>{inspection.completedDate ? `${formatDate(inspection.completedDate)} 完成` : "等待完成"}</strong>
              </div>
            </article>
          );
        }) : <div className={styles.emptyState}>完成第一次 inspection 后，记录会显示在这里。</div>}
      </div>
    </>
  );
}

function Modal({
  modal,
  properties,
  weekStart,
  saving,
  onClose,
  onSubmit,
}: {
  modal: Exclude<ModalState, null>;
  properties: Property[];
  weekStart: string;
  saving: boolean;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
  const property = "property" in modal ? modal.property : null;
  const title =
    modal.kind === "schedule" ? "加入下周安排" :
    modal.kind === "complete" ? "完成 inspection" :
    modal.kind === "reschedule" ? "重新预约" :
    modal.kind === "edit" ? "编辑房源" : "新增房源";

  return (
    <div className={styles.modalBackdrop} role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className={styles.modalHeader}>
          <div><span className={styles.kicker}>GRAMAX ROUTE</span><h2 id="modal-title">{title}</h2>{property ? <p>#{property.routeOrder} · {property.address}</p> : null}</div>
          <button onClick={onClose} aria-label="关闭">×</button>
        </div>
        <form onSubmit={onSubmit} className={styles.form}>
          {modal.kind === "schedule" ? (
            <>
              <FormField label="预约日期"><input name="plannedDate" type="date" min={weekStart} defaultValue={weekStart} required /></FormField>
              <FormField label="预约时间"><input name="plannedTime" type="time" /></FormField>
              <FormField label="联系或预约备注" wide><textarea name="notes" rows={3} placeholder="例如：已联系租客，下午到达" /></FormField>
            </>
          ) : modal.kind === "complete" ? (
            <>
              <FormField label="实际完成日期"><input name="completedDate" type="date" defaultValue={todayIso()} required /></FormField>
              <FormField label="完成备注" wide><textarea name="notes" rows={4} defaultValue={modal.inspection.notes || ""} placeholder="可不填写" /></FormField>
              <div className={styles.formHint}>完成后，系统会按照 {property?.inspectionIntervalMonths ?? 3} 个月周期自动更新下一次 inspection 日期。</div>
            </>
          ) : modal.kind === "reschedule" ? (
            <>
              <FormField label="新的预约日期"><input name="plannedDate" type="date" min={todayIso()} defaultValue={modal.inspection.plannedDate} required /></FormField>
              <FormField label="新的预约时间"><input name="plannedTime" type="time" defaultValue={modal.inspection.plannedTime || ""} /></FormField>
              <FormField label="改期原因" wide><textarea name="notes" rows={3} defaultValue={modal.inspection.notes || ""} placeholder="例如：租客临时不方便" /></FormField>
              <div className={styles.formHint}>改期不会更改上次和下次 inspection 日期。</div>
            </>
          ) : (
            <PropertyFields property={modal.kind === "edit" ? modal.property : null} properties={properties} />
          )}
          <div className={styles.formActions}>
            <button type="button" className={styles.secondaryButton} onClick={onClose}>取消</button>
            <button type="submit" className={styles.primaryButton} disabled={saving}>{saving ? "正在保存…" : "保存"}</button>
          </div>
        </form>
      </section>
    </div>
  );
}

function PropertyFields({ property, properties }: { property: Property | null; properties: Property[] }) {
  return (
    <>
      {!property ? (
        <FormField label="插在这套房后面" wide>
          <select name="insertAfterRouteOrder" defaultValue={String(properties.at(-1)?.routeOrder ?? 0)} required>
            <option value="0">路线最前面</option>
            {properties.map((item) => <option value={item.routeOrder} key={item.id}>#{item.routeOrder} · {item.address}</option>)}
          </select>
        </FormField>
      ) : null}
      <FormField label="房源地址" wide><input name="address" defaultValue={property?.address || ""} required /></FormField>
      <FormField label="区域">
        <select name="region" defaultValue={property?.region || "中"}>{regions.map((item) => <option key={item}>{item}</option>)}</select>
      </FormField>
      <FormField label="钥匙 / 门禁"><input name="keyCode" defaultValue={property?.keyCode || ""} /></FormField>
      <FormField label="联系人"><input name="contactName" defaultValue={property?.contactName || ""} /></FormField>
      <FormField label="联系电话"><input name="contactPhone" type="tel" defaultValue={property?.contactPhone || ""} /></FormField>
      <FormField label="上次 inspection"><input name="lastInspectionDate" type="date" defaultValue={property?.lastInspectionDate || ""} /></FormField>
      <FormField label="下次 inspection"><input name="nextInspectionDate" type="date" defaultValue={property?.nextInspectionDate || ""} /></FormField>
      <FormField label="检查周期">
        <select name="inspectionIntervalMonths" defaultValue={String(property?.inspectionIntervalMonths || 3)}><option value="3">3 个月</option><option value="6">6 个月</option></select>
      </FormField>
      <FormField label="房源备注" wide><textarea name="notes" rows={4} defaultValue={property?.notes || ""} /></FormField>
    </>
  );
}

function FormField({ label, wide = false, children }: { label: string; wide?: boolean; children: React.ReactNode }) {
  return <label className={wide ? styles.wideField : ""}><span>{label}</span>{children}</label>;
}

function todayIso() {
  const now = new Date();
  return localIso(now);
}

function nextMondayIso() {
  const date = new Date();
  const days = ((8 - date.getDay()) % 7) || 7;
  date.setDate(date.getDate() + days);
  return localIso(date);
}

function localIso(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDaysIso(iso: string, days: number) {
  const date = new Date(`${iso}T12:00:00`);
  date.setDate(date.getDate() + days);
  return localIso(date);
}

function formatDate(iso: string | null | undefined) {
  if (!iso) return "未设置";
  const date = new Date(`${iso}T12:00:00`);
  return new Intl.DateTimeFormat("zh-CN", { month: "short", day: "numeric", weekday: "short" }).format(date);
}

function dateTone(iso: string | null) {
  if (!iso) return styles.dateMissing;
  return iso < todayIso() ? styles.dateOverdue : "";
}
