import type { Metadata } from "next";
import { getPracticeAreas } from "@/lib/content";
import PageBanner from "@/components/shared/PageBanner";
import PracticeAreaCard from "@/components/shared/PracticeAreaCard";
import RevealOnScroll from "@/components/shared/RevealOnScroll";
import pg from "@/styles/pages.module.scss";

export const metadata: Metadata = {
  title: "תחומי עיסוק | ליאת לפיד",
  description: "תחומי העיסוק של משרד עורכי הדין ליאת לפיד — דיני עבודה",
};

export default async function PracticeAreasPage() {
  const practiceAreas = await getPracticeAreas();

  return (
    <>
      <PageBanner
        title="תחומי עיסוק"
        subtitle="מומחיות בדיני עבודה — ייעוץ, ליווי וייצוג משפטי לעובדים ולמעסיקים"
      />
      <section className={pg.pageContent}>
        <div className={pg.container}>
          <div className={pg.cardGrid}>
            {practiceAreas.map((area, index) => (
              <RevealOnScroll key={area.slug} delay={index * 0.06}>
                <PracticeAreaCard
                  title={area.title}
                  slug={area.slug}
                  shortDescription={area.shortDescription}
                  icon={area.icon}
                />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
