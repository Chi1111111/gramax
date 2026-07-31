import type { Metadata } from "next";
import { LandlordsView } from "../_components/PageViews";

export const metadata: Metadata = {
  title: "Landlord Property Management",
  description:
    "Residential property management, letting, compliance, rent, inspections and maintenance from Gramax.",
};

export default function Page() {
  return <LandlordsView lang="en" />;
}
