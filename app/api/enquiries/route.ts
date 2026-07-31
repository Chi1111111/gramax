const allowedKinds = new Set([
  "contact",
  "appraisal",
  "maintenance",
  "rental-alert",
]);

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const kind = typeof body.kind === "string" ? body.kind : "";
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const language = body.lang === "zh" ? "zh" : "en";

    if (body.website) {
      return Response.json({ ok: true, reference: "RECEIVED" }, { status: 201 });
    }

    if (
      !allowedKinds.has(kind) ||
      name.length < 2 ||
      email.length < 5 ||
      !email.includes("@")
    ) {
      return Response.json(
        { ok: false, error: "Invalid enquiry details" },
        { status: 400 },
      );
    }

    const cleanPayload = Object.fromEntries(
      Object.entries(body).filter(
        ([key]) =>
          !["website", "kind", "lang", "name", "email", "phone"].includes(key),
      ),
    );

    if (process.env.VERCEL === "1") {
      const forwardUrl = process.env.ENQUIRY_FORWARD_URL;
      const forwardToken = process.env.ENQUIRY_FORWARD_TOKEN;

      if (!forwardUrl || !forwardToken) {
        return Response.json(
          { ok: false, error: "Enquiry service is not configured" },
          { status: 503 },
        );
      }

      const destination = new URL(forwardUrl);
      if (destination.origin === new URL(request.url).origin) {
        throw new Error("Enquiry forwarding cannot target the current origin");
      }

      const forwarded = await fetch(destination, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${forwardToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        cache: "no-store",
        signal: AbortSignal.timeout(10_000),
      });
      const result = (await forwarded.json().catch(() => null)) as
        | Record<string, unknown>
        | null;

      if (!forwarded.ok || !result) {
        throw new Error("Upstream enquiry service rejected the request");
      }

      return Response.json(result, { status: forwarded.status });
    }

    const [{ ensureEnquiriesSchema, getDb }, { enquiries }] = await Promise.all([
      import("../../../db"),
      import("../../../db/schema"),
    ]);
    const id = crypto.randomUUID();
    await ensureEnquiriesSchema();
    await getDb().insert(enquiries).values({
      id,
      createdAt: Date.now(),
      kind,
      language,
      name: name.slice(0, 160),
      email: email.slice(0, 240),
      phone: phone.slice(0, 80) || null,
      payload: JSON.stringify(cleanPayload).slice(0, 12000),
      status: "new",
    });

    return Response.json(
      { ok: true, reference: id.slice(0, 8).toUpperCase() },
      { status: 201 },
    );
  } catch {
    return Response.json(
      { ok: false, error: "Unable to save enquiry" },
      { status: 500 },
    );
  }
}
