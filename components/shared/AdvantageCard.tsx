import styles from "./AdvantageCard.module.scss";

interface AdvantageCardProps {
  title: string;
  description: string;
  icon?: string;
}

export default function AdvantageCard({
  title,
  description,
  icon = "✨",
}: AdvantageCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.iconWrap}>
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </article>
  );
}
