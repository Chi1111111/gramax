import type { Metadata } from "next";
import { RentalsView } from "../_components/PageViews";

export const metadata: Metadata = {
  title: "Available Properties",
  description:
    "Browse Gramax-managed residential rentals, commercial spaces and property application information.",
};

export default function Page() {
  return <RentalsView lang="en" />;
}
