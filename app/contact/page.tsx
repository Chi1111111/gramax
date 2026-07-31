import type { Metadata } from "next";
import { ContactView } from "../_components/PageViews";

export const metadata: Metadata = {
  title: "Contact Gramax",
  description:
    "Send a residential, commercial, tenant or general property management enquiry.",
};

export default function Page() {
  return <ContactView lang="en" />;
}
