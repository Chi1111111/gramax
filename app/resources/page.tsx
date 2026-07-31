import type { Metadata } from "next";
import { ResourcesView } from "../_components/PageViews";

export const metadata: Metadata = {
  title: "Property Guides & Forms",
  description:
    "Bilingual property management, tenancy, compliance, inspection and safety guides from Gramax.",
};

export default function Page() {
  return <ResourcesView lang="en" />;
}
