import sanitizeHtml from "sanitize-html";
import styles from "./RichText.module.scss";

interface RichTextProps {
  html: string;
  className?: string;
  light?: boolean;
}

export default function RichText({
  html,
  className = "",
  light = false,
}: RichTextProps) {
  const sanitized = sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "h1", "h2"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      a: ["href", "target", "rel"],
    },
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
