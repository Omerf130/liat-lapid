import styles from "./ContentCard.module.scss";

interface ContentCardProps {
  title: string;
  description: string;
  icon?: string;
  variant?: "light" | "dark";
}

export default function ContentCard({
  title,
  description,
  icon = "📌",
  variant = "light",
}: ContentCardProps) {
  return (
    <article
      className={`${styles.card} ${variant === "dark" ? styles.dark : ""}`}
    >
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </article>
  );
}
