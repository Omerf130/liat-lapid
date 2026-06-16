"use client";

import { FormEvent, useState } from "react";
import styles from "./ContactForm.module.scss";

interface ContactFormProps {
  formTitle?: string;
  formSubtitle?: string;
}

export default function ContactForm({
  formTitle = "צור קשר",
  formSubtitle = "השאירו פרטים ונחזור אליכם בהקדם",
}: ContactFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMsg("");

    if (!consent) {
      setErrorMsg("יש לאשר את מדיניות הפרטיות");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, message, consent }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setErrorMsg(data.error ?? "שגיאה בשליחת הטופס");
        return;
      }

      setStatus("success");
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
      setConsent(false);
    } catch {
      setStatus("error");
      setErrorMsg("שגיאה בשליחת הטופס — נסו שוב");
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={styles.title}>{formTitle}</h3>
        {formSubtitle && <p className={styles.subtitle}>{formSubtitle}</p>}
      </div>

      {status === "success" ? (
        <div className={styles.success} role="status">
          <span className={styles.successIcon}>✓</span>
          <p>הפנייה נשלחה בהצלחה! נחזור אליכם בהקדם.</p>
        </div>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <label className={styles.field}>
            <span>שם מלא *</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={2}
            />
          </label>

          <label className={styles.field}>
            <span>טלפון *</span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              dir="ltr"
            />
          </label>

          <label className={styles.field}>
            <span>אימייל *</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              dir="ltr"
            />
          </label>

          <label className={styles.field}>
            <span>הודעה *</span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
            />
          </label>

          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              required
            />
            <span>
              אני מאשר/ת את שליחת הפרטים ואת{" "}
              <a href="/contact">מדיניות הפרטיות</a>
            </span>
          </label>

          {errorMsg && (
            <p className={styles.error} role="alert">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            className={styles.submit}
            disabled={status === "loading"}
          >
            {status === "loading" ? "שולח..." : "שליחה"}
          </button>
        </form>
      )}
    </div>
  );
}
