import type { Metadata } from "next";
import Image from "next/image";
import { getSiteSettings } from "@/lib/content";
import { publicImageExists } from "@/lib/images";
import PageBanner from "@/components/shared/PageBanner";
import RichText from "@/components/shared/RichText";
import RevealOnScroll from "@/components/shared/RevealOnScroll";
import pg from "@/styles/pages.module.scss";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: `${settings.about.pageTitle} | ליאת לפיד`,
    description: settings.about.shortText,
  };
}

export default async function AboutPage() {
  const settings = await getSiteSettings();
  const { about } = settings;
  const showImage = publicImageExists(about.imageUrl);

  return (
    <>
      <PageBanner
        title={about.pageTitle}
        subtitle={about.shortText}
      />
      <section className={pg.pageContent}>
        <div className={pg.contentBlock}>
          <RevealOnScroll>
            {showImage ? (
              <div className={pg.imageWrap}>
                <Image
                  src={about.imageUrl}
                  alt={about.pageTitle}
                  fill
                  sizes="(max-width: 900px) 100vw, 900px"
                />
              </div>
            ) : (
              <div className={pg.imagePlaceholder}>
                <span aria-hidden="true">⚖️</span>
              </div>
            )}
            <RichText html={about.fullContent} />
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
