import { getSiteSettings, getPracticeAreas, getAdvantages } from "@/lib/content";
import styles from "./page.module.scss";

export default async function Home() {
  const [settings, practiceAreas, advantages] = await Promise.all([
    getSiteSettings(),
    getPracticeAreas(),
    getAdvantages(),
  ]);

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <span className={styles.badge}>{settings.hero.subtitle}</span>
        <h1 className={styles.title}>{settings.hero.title}</h1>
        <p className={styles.subtitle}>{settings.hero.description}</p>
        <div className={styles.stats}>
          <span className={styles.stat}>
            {practiceAreas.length} תחומי עיסוק
          </span>
          <span className={styles.stat}>
            {advantages.length} יתרונות המשרד
          </span>
        </div>
        <div className={styles.status}>שלב 2: חיבור MongoDB ומודלים הושלם</div>
      </div>
    </main>
  );
}
