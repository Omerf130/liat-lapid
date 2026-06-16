"use client";

import type { ContentCard } from "@/lib/types";
import formStyles from "./admin-forms.module.scss";

interface ContentItemsEditorProps {
  items: ContentCard[];
  onChange: (items: ContentCard[]) => void;
  itemLabel?: string;
}

const emptyItem = (): ContentCard => ({
  title: "",
  description: "",
  icon: "",
});

export default function ContentItemsEditor({
  items,
  onChange,
  itemLabel = "פריט",
}: ContentItemsEditorProps) {
  function updateItem(index: number, field: keyof ContentCard, value: string) {
    const next = items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    onChange(next);
  }

  function removeItem(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }

  function moveItem(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  return (
    <div className={formStyles.itemsList}>
      {items.map((item, index) => (
        <div key={index} className={formStyles.itemCard}>
          <div className={formStyles.formGrid}>
            <div className={formStyles.field}>
              <label>
                {itemLabel} {index + 1} — כותרת
              </label>
              <input
                value={item.title}
                onChange={(e) => updateItem(index, "title", e.target.value)}
              />
            </div>
            <div className={formStyles.field}>
              <label>אייקון (emoji)</label>
              <input
                value={item.icon}
                onChange={(e) => updateItem(index, "icon", e.target.value)}
                placeholder="📋"
              />
            </div>
            <div className={`${formStyles.field} ${formStyles.fullWidth}`}>
              <label>תיאור</label>
              <textarea
                value={item.description}
                onChange={(e) =>
                  updateItem(index, "description", e.target.value)
                }
                rows={2}
              />
            </div>
          </div>
          <div className={formStyles.itemActions}>
            <button
              type="button"
              className={formStyles.btnSmall}
              onClick={() => moveItem(index, -1)}
              disabled={index === 0}
            >
              ↑
            </button>
            <button
              type="button"
              className={formStyles.btnSmall}
              onClick={() => moveItem(index, 1)}
              disabled={index === items.length - 1}
            >
              ↓
            </button>
            <button
              type="button"
              className={formStyles.btnDanger}
              onClick={() => removeItem(index)}
            >
              מחק
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        className={formStyles.btnAdd}
        onClick={() => onChange([...items, emptyItem()])}
      >
        + הוספת {itemLabel}
      </button>
    </div>
  );
}
