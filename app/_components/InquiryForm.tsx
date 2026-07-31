"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import type { Language } from "../_data/content";

type InquiryKind = "contact" | "appraisal" | "maintenance" | "rental-alert";

type Field = {
  name: string;
  label: { en: string; zh: string };
  type?: "text" | "email" | "tel" | "number" | "textarea" | "select";
  required?: boolean;
  options?: { value: string; en: string; zh: string }[];
  wide?: boolean;
};

const common: Field[] = [
  { name: "name", label: { en: "Full name", zh: "姓名" }, required: true },
  {
    name: "email",
    label: { en: "Email", zh: "电子邮箱" },
    type: "email",
    required: true,
  },
  { name: "phone", label: { en: "Phone", zh: "联系电话" }, type: "tel" },
];

const fields: Record<InquiryKind, Field[]> = {
  contact: [
    ...common,
    {
      name: "customerType",
      label: { en: "I am a", zh: "您的身份" },
      type: "select",
      required: true,
      options: [
        { value: "landlord", en: "Landlord / owner", zh: "房东／业主" },
        { value: "tenant", en: "Tenant", zh: "租客" },
        { value: "commercial", en: "Commercial owner", zh: "商业业主" },
        { value: "other", en: "Other", zh: "其他" },
      ],
    },
    {
      name: "message",
      label: { en: "How can we help?", zh: "请告诉我们您的需求" },
      type: "textarea",
      required: true,
      wide: true,
    },
  ],
  appraisal: [
    ...common,
    {
      name: "address",
      label: { en: "Property address", zh: "物业地址" },
      required: true,
      wide: true,
    },
    {
      name: "propertyType",
      label: { en: "Property type", zh: "物业类型" },
      type: "select",
      required: true,
      options: [
        { value: "house", en: "House", zh: "独立屋" },
        { value: "apartment", en: "Apartment", zh: "公寓" },
        { value: "townhouse", en: "Townhouse", zh: "联排住宅" },
        { value: "commercial", en: "Commercial", zh: "商业物业" },
        { value: "other", en: "Other", zh: "其他" },
      ],
    },
    {
      name: "bedrooms",
      label: { en: "Bedrooms", zh: "卧室数量" },
      type: "number",
    },
    {
      name: "bathrooms",
      label: { en: "Bathrooms", zh: "浴室数量" },
      type: "number",
    },
    {
      name: "parking",
      label: { en: "Parking", zh: "停车位" },
      type: "number",
    },
    {
      name: "notes",
      label: {
        en: "Property condition, features or timing",
        zh: "物业状况、特色或预计出租时间",
      },
      type: "textarea",
      wide: true,
    },
  ],
  maintenance: [
    ...common,
    {
      name: "address",
      label: { en: "Rental address", zh: "租住房屋地址" },
      required: true,
      wide: true,
    },
    {
      name: "urgency",
      label: { en: "Urgency", zh: "紧急程度" },
      type: "select",
      required: true,
      options: [
        { value: "routine", en: "Routine", zh: "一般维修" },
        { value: "urgent", en: "Urgent", zh: "紧急" },
        {
          value: "safety",
          en: "Immediate safety concern",
          zh: "即时安全问题",
        },
      ],
    },
    {
      name: "issue",
      label: { en: "Describe the issue", zh: "请描述问题" },
      type: "textarea",
      required: true,
      wide: true,
    },
  ],
  "rental-alert": [
    ...common,
    {
      name: "preferredArea",
      label: { en: "Preferred area", zh: "意向区域" },
      required: true,
    },
    {
      name: "bedrooms",
      label: { en: "Bedrooms needed", zh: "所需卧室数量" },
      type: "number",
    },
    {
      name: "weeklyBudget",
      label: { en: "Weekly budget", zh: "每周预算" },
      type: "number",
    },
    {
      name: "moveDate",
      label: { en: "Preferred move date", zh: "预计入住日期" },
    },
    {
      name: "notes",
      label: { en: "Anything else we should know?", zh: "其他需求" },
      type: "textarea",
      wide: true,
    },
  ],
};

export function InquiryForm({
  kind,
  lang,
}: {
  kind: InquiryKind;
  lang: Language;
}) {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [reference, setReference] = useState("");
  const isZh = lang === "zh";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, lang, ...data }),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        reference?: string;
      };
      if (!response.ok || !result.ok) {
        throw new Error("Submission failed");
      }
      setReference(result.reference ?? "");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="inquiry-form" onSubmit={submit}>
      <input
        className="honeypot"
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <div className="form-grid">
        {fields[kind].map((field) => (
          <label className={field.wide ? "field field-wide" : "field"} key={field.name}>
            <span>
              {field.label[lang]}
              {field.required ? " *" : ""}
            </span>
            {field.type === "textarea" ? (
              <textarea name={field.name} rows={5} required={field.required} />
            ) : field.type === "select" ? (
              <select name={field.name} required={field.required} defaultValue="">
                <option value="" disabled>
                  {isZh ? "请选择" : "Select"}
                </option>
                {field.options?.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option[lang]}
                  </option>
                ))}
              </select>
            ) : (
              <input
                name={field.name}
                type={field.type ?? "text"}
                min={field.type === "number" ? "0" : undefined}
                required={field.required}
              />
            )}
          </label>
        ))}
      </div>
      <label className="consent">
        <input name="consent" type="checkbox" value="yes" required />
        <span>
          {isZh
            ? "我同意 Gramax 使用这些信息回复本次咨询。"
            : "I agree that Gramax may use these details to respond to this enquiry."}
        </span>
      </label>
      <button className="button form-submit" type="submit" disabled={status === "submitting"}>
        {status === "submitting"
          ? isZh
            ? "提交中…"
            : "Sending…"
          : isZh
            ? "提交"
            : "Submit enquiry"}
      </button>
      <div className="form-status" aria-live="polite">
        {status === "success" ? (
          <p>
            {isZh
              ? `提交成功。查询编号：${reference}`
              : `Thank you. Your reference is ${reference}.`}
          </p>
        ) : null}
        {status === "error" ? (
          <p>
            {isZh
              ? "暂时无法提交，请稍后再试。"
              : "We could not send this just now. Please try again."}
          </p>
        ) : null}
      </div>
    </form>
  );
}

