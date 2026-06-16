import { getAdminSession } from "@/lib/auth";
import LogoutButton from "./LogoutButton";
import styles from "./dashboard.module.scss";

export default async function AdminDashboardPage() {
  const session = await getAdminSession();

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <span className={styles.badge}>שלב 3 — אימות</span>
        <h1 className={styles.title}>לוח בקרה</h1>
        <p className={styles.subtitle}>
          ברוכים הבאים, {session?.email ?? "מנהל"}
        </p>
        <p className={styles.note}>
          הגנת middleware פעילה. ממשק הניהול המלא ייבנה בשלבים הבאים.
        </p>
        <LogoutButton />
      </div>
    </main>
  );
}
