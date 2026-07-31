import type { Metadata } from "next";
import { AppraisalView } from "../_components/PageViews";

export const metadata: Metadata = {
  title: "Free Rental Appraisal",
  description:
    "Request a complimentary personalised rental appraisal from Gramax Property Management.",
};

export default function Page() {
  return <AppraisalView lang="en" />;
}
