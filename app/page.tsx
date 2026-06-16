import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <span className={styles.badge}>משרד עורכי דין | דיני עבודה</span>
        <h1 className={styles.title}>ליאת לפיד</h1>
        <p className={styles.subtitle}>
          אתר מקצועי בתהליך הקמה — שלב 1: תשתית הפרויקט, עיצוב RTL ומערכת SCSS
        </p>
        <div className={styles.status}>הפרויקט אותחל בהצלחה</div>
      </div>
    </main>
  );
}
