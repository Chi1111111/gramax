import type { Metadata } from "next";
import { TenantsView } from "../_components/PageViews";

export const metadata: Metadata = {
  title: "Tenant Support",
  description:
    "Maintenance requests, inspection guidance, tenancy information and safety support for Gramax tenants.",
};

export default function Page() {
  return <TenantsView lang="en" />;
}
