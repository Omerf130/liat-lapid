import Image from "next/image";
import type { HeroContent } from "@/lib/types";
import { publicImageExists } from "@/lib/images";
import Button from "@/components/shared/Button";
import styles from "./HeroSection.module.scss";

interface HeroSectionProps {
  hero: HeroContent;
}

export default function HeroSection({ hero }: HeroSectionProps) {
  const showImage = publicImageExists(hero.backgroundImageUrl);

  return (
    <section className={styles.hero}>
      {showImage && (
        <Image
          src={hero.backgroundImageUrl}
          alt=""
          fill
          priority
          className={styles.heroImage}
          sizes="100vw"
        />
      )}
      <div className={styles.heroOverlay} aria-hidden="true" />
      <div className={styles.heroContent}>
        <span className={styles.heroBadge}>{hero.subtitle}</span>
        <h1 className={styles.heroTitle}>{hero.title}</h1>
        <p className={styles.heroDescription}>{hero.description}</p>
        <div className={styles.heroActions}>
          <Button href="/contact" variant="primary">
            {hero.ctaPrimaryText}
          </Button>
          <Button href="/practice-areas" variant="secondary">
            {hero.ctaSecondaryText}
          </Button>
        </div>
      </div>
    </section>
  );
}
