import type { Metadata } from "next";
import { RentalsView } from "../_components/PageViews";

export const metadata: Metadata = {
  title: "Current Rental Listings",
  description:
    "Open Gramax Property Management's current residential and commercial listings on Trade Me.",
};

export default function Page() {
  return <RentalsView lang="en" />;
}
