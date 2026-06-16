import Link from "next/link";
import type { ContactContent } from "@/lib/types";
import { navLinks } from "@/lib/navigation";
import styles from "./Footer.module.scss";

interface FooterProps {
  contact: ContactContent;
}

export default function Footer({ contact }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <h2 className={styles.logo}>ליאת לפיד</h2>
            <p className={styles.tagline}>משרד עורכי דין | דיני עבודה</p>
            <p className={styles.desc}>
              ייעוץ וייצוג משפטי מקצועי בתחום דיני העבודה — לעובדים ולמעסיקים.
            </p>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>ניווט</h3>
            <ul className={styles.links}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>יצירת קשר</h3>
            <ul className={styles.contactList}>
              {contact.phone && (
                <li>
                  <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>
                    {contact.phone}
                  </a>
                </li>
              )}
              {contact.email && (
                <li>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </li>
              )}
              {contact.address && <li>{contact.address}</li>}
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {year} ליאת לפיד. כל הזכויות שמורות.</p>
          <p>
            נבנה על ידי{" "}
            <a
              href="https://weblio.co.il"
              target="_blank"
              rel="noopener noreferrer"
            >
              weblio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
