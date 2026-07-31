import type { Metadata } from "next";
import { TeamView } from "../_components/PageViews";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet Grace Luo and the people behind Gramax Property Management in Auckland.",
};

export default function Page() {
  return <TeamView lang="en" />;
}
