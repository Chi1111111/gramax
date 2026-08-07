import { ensureInspectionSchema, getD1 } from "../../../db";
import {
  getInspectionApiUser,
  InspectionAccessError,
} from "../../inspection/auth";

export const runtime = "nodejs";

type PropertyRow = {
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

type InspectionRow = {
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

export async function GET() {
  try {
    await getInspectionApiUser();
    await ensureInspectionSchema();
    const d1 = getD1();

    const [propertyResult, inspectionResult] = await Promise.all([
      d1
        .prepare(
          `SELECT
            id,
            route_order AS routeOrder,
            address,
            region,
            key_code AS keyCode,
            contact_name AS contactName,
            contact_phone AS contactPhone,
            last_inspection_date AS lastInspectionDate,
            next_inspection_date AS nextInspectionDate,
            inspection_interval_months AS inspectionIntervalMonths,
            notes,
            updated_at AS updatedAt
          FROM properties
          ORDER BY route_order ASC, id ASC`,
        )
        .all<PropertyRow>(),
      d1
        .prepare(
          `SELECT
            id,
            property_id AS propertyId,
            original_planned_date AS originalPlannedDate,
            planned_date AS plannedDate,
            planned_time AS plannedTime,
            completed_date AS completedDate,
            reschedule_count AS rescheduleCount,
            notes,
            updated_at AS updatedAt
          FROM inspections
          ORDER BY updated_at DESC
          LIMIT 1000`,
        )
        .all<InspectionRow>(),
    ]);

    return Response.json({
      ok: true,
      properties: propertyResult.results,
      inspections: inspectionResult.results,
    });
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const user = await getInspectionApiUser();
    await ensureInspectionSchema();
    const body = (await request.json()) as Record<string, unknown>;
    const action = text(body.action, 40);

    if (action === "schedule") {
      const propertyId = positiveInteger(body.propertyId);
      const plannedDate = isoDate(body.plannedDate);
      const plannedTime = optionalTime(body.plannedTime);
      const notes = optionalText(body.notes, 1200);
      const d1 = getD1();
      const existing = await d1
        .prepare(
          "SELECT id FROM inspections WHERE property_id = ? AND completed_date IS NULL LIMIT 1",
        )
        .bind(propertyId)
        .first<{ id: string }>();
      if (existing) return badRequest("这套房已经有未完成的安排。");

      const id = crypto.randomUUID();
      const now = Date.now();
      await d1
        .prepare(
          `INSERT INTO inspections (
            id, property_id, original_planned_date, planned_date, planned_time,
            completed_date, reschedule_count, notes, created_by, updated_by,
            created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, NULL, 0, ?, ?, ?, ?, ?)`,
        )
        .bind(
          id,
          propertyId,
          plannedDate,
          plannedDate,
          plannedTime,
          notes,
          user.email,
          user.email,
          now,
          now,
        )
        .run();
      return Response.json({ ok: true, id }, { status: 201 });
    }

    if (action === "complete") {
      const inspectionId = requiredId(body.inspectionId);
      const completedDate = isoDate(body.completedDate);
      const notes = optionalText(body.notes, 1200);
      const d1 = getD1();
      const row = await d1
        .prepare(
          `SELECT
            inspections.property_id AS propertyId,
            properties.inspection_interval_months AS intervalMonths
          FROM inspections
          JOIN properties ON properties.id = inspections.property_id
          WHERE inspections.id = ?`,
        )
        .bind(inspectionId)
        .first<{ propertyId: number; intervalMonths: number }>();
      if (!row) return badRequest("找不到这条安排。");

      const nextInspectionDate = addMonths(completedDate, row.intervalMonths);
      const now = Date.now();
      await d1.batch([
        d1
          .prepare(
            `UPDATE inspections
             SET completed_date = ?, notes = COALESCE(?, notes), updated_by = ?, updated_at = ?
             WHERE id = ?`,
          )
          .bind(completedDate, notes, user.email, now, inspectionId),
        d1
          .prepare(
            `UPDATE properties
             SET last_inspection_date = ?, next_inspection_date = ?, updated_at = ?
             WHERE id = ?`,
          )
          .bind(completedDate, nextInspectionDate, now, row.propertyId),
      ]);
      return Response.json({ ok: true, nextInspectionDate });
    }

    if (action === "reschedule") {
      const inspectionId = requiredId(body.inspectionId);
      const plannedDate = isoDate(body.plannedDate);
      const plannedTime = optionalTime(body.plannedTime);
      const notes = optionalText(body.notes, 1200);
      const now = Date.now();
      await getD1()
        .prepare(
          `UPDATE inspections
           SET planned_date = ?, planned_time = ?, notes = COALESCE(?, notes),
               reschedule_count = reschedule_count + 1, updated_by = ?, updated_at = ?
           WHERE id = ? AND completed_date IS NULL`,
        )
        .bind(plannedDate, plannedTime, notes, user.email, now, inspectionId)
        .run();
      return Response.json({ ok: true });
    }

    if (action === "createProperty") {
      const address = requiredText(body.address, 260);
      const region = requiredText(body.region, 20);
      const keyCode = optionalText(body.keyCode, 160);
      const contactName = optionalText(body.contactName, 120);
      const contactPhone = optionalText(body.contactPhone, 80);
      const lastInspectionDate = optionalIsoDate(body.lastInspectionDate);
      const nextInspectionDate = optionalIsoDate(body.nextInspectionDate);
      const intervalMonths = oneOfIntegers(body.inspectionIntervalMonths, [3, 6]);
      const notes = optionalText(body.notes, 1200);
      const insertAfter = nonNegativeInteger(body.insertAfterRouteOrder);
      const routeOrder = insertAfter + 1;
      const now = Date.now();
      const d1 = getD1();
      await d1.batch([
        d1
          .prepare(
            "UPDATE properties SET route_order = route_order + 1, updated_at = ? WHERE route_order > ?",
          )
          .bind(now, insertAfter),
        d1
          .prepare(
            `INSERT INTO properties (
              route_order, address, region, key_code, contact_name, contact_phone,
              last_inspection_date, next_inspection_date, inspection_interval_months,
              notes, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          )
          .bind(
            routeOrder,
            address,
            region,
            keyCode,
            contactName,
            contactPhone,
            lastInspectionDate,
            nextInspectionDate,
            intervalMonths,
            notes,
            now,
            now,
          ),
      ]);
      return Response.json({ ok: true }, { status: 201 });
    }

    if (action === "updateProperty") {
      const propertyId = positiveInteger(body.propertyId);
      const address = requiredText(body.address, 260);
      const region = requiredText(body.region, 20);
      const keyCode = optionalText(body.keyCode, 160);
      const contactName = optionalText(body.contactName, 120);
      const contactPhone = optionalText(body.contactPhone, 80);
      const lastInspectionDate = optionalIsoDate(body.lastInspectionDate);
      const nextInspectionDate = optionalIsoDate(body.nextInspectionDate);
      const intervalMonths = oneOfIntegers(body.inspectionIntervalMonths, [3, 6]);
      const notes = optionalText(body.notes, 1200);
      await getD1()
        .prepare(
          `UPDATE properties SET
            address = ?, region = ?, key_code = ?, contact_name = ?, contact_phone = ?,
            last_inspection_date = ?, next_inspection_date = ?,
            inspection_interval_months = ?, notes = ?, updated_at = ?
           WHERE id = ?`,
        )
        .bind(
          address,
          region,
          keyCode,
          contactName,
          contactPhone,
          lastInspectionDate,
          nextInspectionDate,
          intervalMonths,
          notes,
          Date.now(),
          propertyId,
        )
        .run();
      return Response.json({ ok: true });
    }

    return badRequest("不支持的操作。");
  } catch (error) {
    return apiError(error);
  }
}

function apiError(error: unknown) {
  if (error instanceof InspectionAccessError) {
    return Response.json({ ok: false, error: error.message }, { status: error.status });
  }
  if (error instanceof InputError) return badRequest(error.message);
  return Response.json(
    { ok: false, error: "暂时无法保存，请稍后再试。" },
    { status: 500 },
  );
}

function badRequest(message: string) {
  return Response.json({ ok: false, error: message }, { status: 400 });
}

class InputError extends Error {}

function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function requiredText(value: unknown, maxLength: number) {
  const result = text(value, maxLength);
  if (!result) throw new InputError("请填写所有必填内容。");
  return result;
}

function optionalText(value: unknown, maxLength: number) {
  const result = text(value, maxLength);
  return result || null;
}

function requiredId(value: unknown) {
  const result = text(value, 80);
  if (!result) throw new InputError("缺少记录编号。");
  return result;
}

function positiveInteger(value: unknown) {
  const result = Number(value);
  if (!Number.isInteger(result) || result < 1) throw new InputError("编号无效。");
  return result;
}

function nonNegativeInteger(value: unknown) {
  const result = Number(value);
  if (!Number.isInteger(result) || result < 0) throw new InputError("路线位置无效。");
  return result;
}

function oneOfIntegers(value: unknown, allowed: number[]) {
  const result = Number(value);
  if (!allowed.includes(result)) throw new InputError("检查周期无效。");
  return result;
}

function isoDate(value: unknown) {
  const result = text(value, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(result)) throw new InputError("日期无效。");
  const date = new Date(`${result}T00:00:00Z`);
  if (Number.isNaN(date.valueOf())) throw new InputError("日期无效。");
  return result;
}

function optionalIsoDate(value: unknown) {
  const result = text(value, 10);
  return result ? isoDate(result) : null;
}

function optionalTime(value: unknown) {
  const result = text(value, 5);
  if (!result) return null;
  if (!/^\d{2}:\d{2}$/.test(result)) throw new InputError("时间无效。");
  return result;
}

function addMonths(iso: string, months: number) {
  const [year, month, day] = iso.split("-").map(Number);
  const targetStart = new Date(Date.UTC(year, month - 1 + months, 1));
  const lastDay = new Date(
    Date.UTC(targetStart.getUTCFullYear(), targetStart.getUTCMonth() + 1, 0),
  ).getUTCDate();
  const result = new Date(
    Date.UTC(
      targetStart.getUTCFullYear(),
      targetStart.getUTCMonth(),
      Math.min(day, lastDay),
    ),
  );
  return result.toISOString().slice(0, 10);
}
