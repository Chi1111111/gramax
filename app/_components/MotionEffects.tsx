"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const revealSelector = [
  ".brand-hero-shell > .brand-hero-logo",
  ".brand-hero-shell > .brand-hero-roof",
  ".brand-hero-shell > h1",
  ".brand-hero-shell > .brand-hero-name",
  ".brand-hero-shell > .brand-hero-lead",
  ".brand-hero-shell > .button-row",
  ".page-intro .container > *",
  ".section-heading > *",
  ".audience-grid > *",
  ".guide-grid > *",
  ".service-page-grid > *",
  ".service-detail-list > *",
  ".listing-category-grid > *",
  ".process-grid > *",
  ".service-grid > *",
  ".values-grid > *",
  ".resource-grid > *",
  ".quiet-list > *",
  ".founder-profile > *",
  ".form-layout > *",
  ".split-layout > *",
  ".listings-link-panel > *",
  ".final-cta-inner > *",
].join(",");

export function MotionEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      return;
    }

    let observer: IntersectionObserver | undefined;

    const frame = window.requestAnimationFrame(() => {
      const site = document.querySelector(".site");

      if (!site) {
        return;
      }

      const targets = Array.from(
        site.querySelectorAll<HTMLElement>(revealSelector),
      );
      const siblingPositions = new Map<Element, number>();

      targets.forEach((target) => {
        const parent = target.parentElement;
        const position = parent ? siblingPositions.get(parent) ?? 0 : 0;

        target.classList.add("motion-reveal");
        target.style.setProperty(
          "--motion-delay",
          `${Math.min(position, 4) * 55}ms`,
        );

        if (parent) {
          siblingPositions.set(parent, position + 1);
        }
      });

      document.documentElement.classList.add("motion-ready");

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add("is-revealed");
            observer?.unobserve(entry.target);
          });
        },
        {
          rootMargin: "0px 0px -7% 0px",
          threshold: 0.08,
        },
      );

      targets.forEach((target) => observer?.observe(target));
    });

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
