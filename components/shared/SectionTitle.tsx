import styles from "./SectionTitle.module.scss";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "center" | "start";
  light?: boolean;
}

export default function SectionTitle({
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionTitleProps) {
  return (
    <div
      className={`${styles.wrapper} ${styles[align]} ${
        light ? styles.light : ""
      }`}
    >
      <span className={styles.accent} aria-hidden="true" />
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
