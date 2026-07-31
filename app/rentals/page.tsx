import type { Metadata } from "next";
import { RentalsView } from "../_components/PageViews";

export const metadata: Metadata = {
  title: "Homes For Rent",
  description:
    "View current Gramax-managed rentals or register for a rental alert.",
};

export default function Page() {
  return <RentalsView lang="en" />;
}
