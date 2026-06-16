import type { Metadata } from "next";
import Image from "next/image";
import { getSiteSettings } from "@/lib/content";
import { publicImageExists } from "@/lib/images";
import PageBanner from "@/components/shared/PageBanner";
import RichText from "@/components/shared/RichText";
import ContentCard from "@/components/shared/ContentCard";
import RevealOnScroll from "@/components/shared/RevealOnScroll";
import pg from "@/styles/pages.module.scss";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: `${settings.employerGuidance.pageTitle} | ליאת לפיד`,
    description: settings.employerGuidance.shortText,
  };
}

export default async function EmployersPage() {
  const settings = await getSiteSettings();
  const { employerGuidance } = settings;
  const showImage = publicImageExists(employerGuidance.imageUrl);

  return (
    <>
      <PageBanner
        title={employerGuidance.pageTitle}
        subtitle={employerGuidance.shortText}
      />
      <section className={pg.pageContent}>
        <div className={pg.contentBlock}>
          <RevealOnScroll>
            {showImage ? (
              <div className={pg.imageWrap}>
                <Image
                  src={employerGuidance.imageUrl}
                  alt={employerGuidance.pageTitle}
                  fill
                  sizes="(max-width: 900px) 100vw, 900px"
                />
              </div>
            ) : (
              <div className={pg.imagePlaceholder}>
                <span aria-hidden="true">🏢</span>
              </div>
            )}
            <RichText html={employerGuidance.fullContent} />
          </RevealOnScroll>

          <div className={pg.cardGrid} style={{ marginTop: "3rem" }}>
            {employerGuidance.cards.map((card, index) => (
              <RevealOnScroll key={card.title} delay={index * 0.1}>
                <ContentCard
                  title={card.title}
                  description={card.description}
                  icon={card.icon}
                />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
