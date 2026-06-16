"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./login.module.scss";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectTo =
    searchParams.get("from")?.startsWith("/admin/dashboard")
      ? searchParams.get("from")!
      : "/admin/dashboard";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "שגיאה בהתחברות");
        return;
      }

      router.push(redirectTo);
      router.refresh();
    } catch {
      setError("שגיאה בהתחברות — נסו שוב");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <span className={styles.badge}>ניהול אתר</span>
          <h1 className={styles.title}>התחברות מנהל</h1>
          <p className={styles.subtitle}>ליאת לפיד — מערכת ניהול תוכן</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span>אימייל</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              dir="ltr"
            />
          </label>

          <label className={styles.field}>
            <span>סיסמה</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              dir="ltr"
            />
          </label>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.submit} disabled={loading}>
            {loading ? "מתחבר..." : "התחברות"}
          </button>
        </form>
      </div>
    </main>
  );
}
