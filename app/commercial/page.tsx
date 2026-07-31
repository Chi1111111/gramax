import type { Metadata } from "next";
import { CommercialView } from "../_components/PageViews";

export const metadata: Metadata = {
  title: "Commercial Property Management",
  description:
    "End-to-end commercial property leasing, financials, operations, compliance and asset advisory.",
};

export default function Page() {
  return <CommercialView lang="en" />;
}
