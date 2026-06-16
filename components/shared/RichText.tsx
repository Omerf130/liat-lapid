import DOMPurify from "isomorphic-dompurify";
import styles from "./RichText.module.scss";

interface RichTextProps {
  html: string;
  className?: string;
  light?: boolean;
}

export default function RichText({ html, className = "", light = false }: RichTextProps) {
  const sanitized = DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
  });

  if (!sanitized) {
    return null;
  }

  return (
    <div
      className={`${styles.content} ${light ? styles.light : ""} ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
