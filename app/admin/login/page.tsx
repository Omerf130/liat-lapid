import { Suspense } from "react";
import type { Metadata } from "next";
import LoginForm from "./LoginForm";
import styles from "./login.module.scss";

export const metadata: Metadata = {
  title: "התחברות",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <main className={styles.page}>
          <div className={styles.card}>
            <p className={styles.subtitle}>טוען...</p>
          </div>
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
