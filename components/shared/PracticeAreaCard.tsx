import Link from "next/link";
import styles from "./PracticeAreaCard.module.scss";

interface PracticeAreaCardProps {
  title: string;
  slug: string;
  shortDescription: string;
  icon?: string;
}

export default function PracticeAreaCard({
  title,
  slug,
  shortDescription,
  icon = "⚖️",
}: PracticeAreaCardProps) {
  return (
    <Link href={`/practice-areas/${slug}`} className={styles.card}>
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{shortDescription}</p>
      <span className={styles.link}>
        קרא עוד
        <span className={styles.arrow} aria-hidden="true">←</span>
      </span>
    </Link>
  );
}
