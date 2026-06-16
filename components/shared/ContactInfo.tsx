import Link from "next/link";
import type { ContactContent } from "@/lib/types";
import styles from "./ContactInfo.module.scss";

interface ContactInfoProps {
  contact: ContactContent;
}

export default function ContactInfo({ contact }: ContactInfoProps) {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {contact.phone && (
          <li>
            <span className={styles.label}>טלפון</span>
            <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className={styles.value}>
              {contact.phone}
            </a>
          </li>
        )}
        {contact.email && (
          <li>
            <span className={styles.label}>אימייל</span>
            <a href={`mailto:${contact.email}`} className={styles.value}>
              {contact.email}
            </a>
          </li>
        )}
        {contact.address && (
          <li>
            <span className={styles.label}>כתובת</span>
            <span className={styles.value}>{contact.address}</span>
          </li>
        )}
      </ul>

      <div className={styles.actions}>
        {contact.phone && (
          <a
            href={`tel:${contact.phone.replace(/\s/g, "")}`}
            className={styles.phoneBtn}
          >
            התקשרו עכשיו
          </a>
        )}
        {contact.whatsapp && (
          <Link
            href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
            className={styles.whatsappBtn}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </Link>
        )}
      </div>
    </div>
  );
}
