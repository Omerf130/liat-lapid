import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPracticeAreaBySlug, getPracticeAreas } from "@/lib/content";
import PageBanner from "@/components/shared/PageBanner";
import RichText from "@/components/shared/RichText";
import RevealOnScroll from "@/components/shared/RevealOnScroll";
import Button from "@/components/shared/Button";
import pg from "@/styles/pages.module.scss";
import styles from "./page.module.scss";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const areas = await getPracticeAreas();
  return areas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const area = await getPracticeAreaBySlug(slug);

  if (!area) {
    return { title: "לא נמצא | ליאת לפיד" };
  }

  return {
    title: `${area.title} | ליאת לפיד`,
    description: area.shortDescription,
  };
}

export default async function PracticeAreaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const area = await getPracticeAreaBySlug(slug);

  if (!area) {
    notFound();
  }

  return (
    <>
      <PageBanner
        title={area.title}
        subtitle={area.shortDescription}
      />
      <section className={pg.pageContent}>
        <div className={pg.contentBlock}>
          <RevealOnScroll>
            <span className={styles.icon} aria-hidden="true">
              {area.icon}
            </span>
            <RichText html={area.fullDescription} />
          </RevealOnScroll>
          <div className={styles.actions}>
            <Button href="/practice-areas" variant="secondary">
              ← חזרה לכל תחומי העיסוק
            </Button>
            <Button href="/contact" variant="primary">
              לקביעת שיחת ייעוץ
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
