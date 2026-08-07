import "server-only";

import { getChatGPTUser, requireChatGPTUser } from "../chatgpt-auth";

export type InspectionUser = {
  displayName: string;
  email: string;
};

function allowedEmails() {
  return (process.env.INSPECTION_ALLOWED_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

function isAllowed(email: string) {
  const allowed = allowedEmails();
  if (process.env.NODE_ENV === "development" && allowed.length === 0) return true;
  return allowed.includes(email.toLowerCase());
}

export async function requireInspectionPageUser(): Promise<InspectionUser> {
  if (process.env.NODE_ENV === "development") {
    const localUser = await getChatGPTUser();
    if (!localUser) {
      return { displayName: "Local preview", email: "preview@local.test" };
    }
  }

  const user = await requireChatGPTUser("/inspection");
  if (!isAllowed(user.email)) {
    throw new InspectionAccessError("这个账号没有 inspection 系统权限。", 403);
  }
  return user;
}

export async function getInspectionApiUser(): Promise<InspectionUser> {
  const user = await getChatGPTUser();
  if (!user && process.env.NODE_ENV === "development") {
    return { displayName: "Local preview", email: "preview@local.test" };
  }
  if (!user) throw new InspectionAccessError("请先登录。", 401);
  if (!isAllowed(user.email)) {
    throw new InspectionAccessError("这个账号没有 inspection 系统权限。", 403);
  }
  return user;
}

export class InspectionAccessError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}
