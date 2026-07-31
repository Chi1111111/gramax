import type { Metadata } from "next";
import { AboutView } from "../_components/PageViews";

export const metadata: Metadata = {
  title: "About Gramax",
  description:
    "Meet Grace Luo and learn about Gramax Property Management's professional, compliance-led approach.",
};

export default function Page() {
  return <AboutView lang="en" />;
}
