import Link from "next/link";
import Button from "@/components/shared/Button";
import pg from "@/styles/pages.module.scss";
import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <section className={`${pg.pageContent} ${styles.page}`}>
      <div className={styles.inner}>
        <span className={styles.code} aria-hidden="true">
          404
        </span>
        <h1 className={styles.title}>העמוד לא נמצא</h1>
        <p className={styles.text}>
          ייתכן שהקישור שגוי או שהעמוד הוסר. נשמח לעזור — צרו קשר או חזרו לדף
          הבית.
        </p>
        <div className={styles.actions}>
          <Button href="/" variant="primary">
            חזרה לדף הבית
          </Button>
          <Button href="/contact" variant="secondary">
            צור קשר
          </Button>
        </div>
        <Link href="/practice-areas" className={styles.link}>
          תחומי עיסוק
        </Link>
      </div>
    </section>
  );
}
