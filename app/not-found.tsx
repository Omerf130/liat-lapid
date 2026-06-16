import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "לא נמצא | ליאת לפיד",
  description: "העמוד המבוקש לא נמצא.",
  robots: { index: false, follow: false },
};

export default function NotFoundPage() {
  return (
    <section style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem" }}>
      <div>
        <h1 style={{ fontFamily: "var(--font-frank)", color: "#0d1b2a", marginBottom: "1rem" }}>
          העמוד לא נמצא
        </h1>
        <p style={{ color: "#6b6b6b", marginBottom: "1.5rem" }}>
          ייתכן שהקישור שגוי או שהעמוד הוסר.
        </p>
        <Link href="/" style={{ color: "#a8893f", textDecoration: "underline" }}>
          חזרה לדף הבית
        </Link>
      </div>
    </section>
  );
}
