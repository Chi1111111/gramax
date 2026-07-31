import type { Metadata } from "next";
import { PrivacyView } from "../_components/PageViews";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Gramax handles information submitted through this website.",
};

export default function Page() {
  return <PrivacyView lang="en" />;
}
