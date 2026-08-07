import type { Metadata } from "next";
import InspectionPlanner from "./InspectionPlanner";
import { requireInspectionPageUser } from "./auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Inspection Planner",
  description: "Gramax internal property inspection planner.",
  robots: { index: false, follow: false },
};

export default async function InspectionPage() {
  const user = await requireInspectionPageUser();
  return <InspectionPlanner userName={user.displayName} />;
}
