"use client";

import ImageUploadField from "@/components/admin/ImageUploadField";
import SaveBar from "@/components/admin/SaveBar";
import formStyles from "@/components/admin/admin-forms.module.scss";
import { useSiteSection } from "@/hooks/useSiteSection";

export default function HeroEditorPage() {
  const { data, setData, loading, saving, save } = useSiteSection("hero");

  if (loading) return <p className={formStyles.loading}>טוען...</p>;

  return (
    <>
      <div className={formStyles.pageHeader}>
        <h1>Hero — דף הבית</h1>
        <p>עריכת כותרת, תיאור ותמונת רקע של אזור הפתיחה.</p>
      </div>

      <div className={formStyles.card}>
        <div className={formStyles.formGrid}>
          <div className={formStyles.field}>
            <label>כותרת ראשית</label>
            <input
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
          </div>
          <div className={formStyles.field}>
            <label>כותרת משנה</label>
            <input
              value={data.subtitle}
              onChange={(e) => setData({ ...data, subtitle: e.target.value })}
            />
          </div>
          <div className={`${formStyles.field} ${formStyles.fullWidth}`}>
            <label>תיאור</label>
            <textarea
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              rows={3}
            />
          </div>
          <ImageUploadField
            label="תמונת רקע"
            value={data.backgroundImageUrl}
            onChange={(url) =>
              setData({ ...data, backgroundImageUrl: url })
            }
          />
          <div className={formStyles.field}>
            <label>טקסט כפתור ראשי</label>
            <input
              value={data.ctaPrimaryText}
              onChange={(e) =>
                setData({ ...data, ctaPrimaryText: e.target.value })
              }
            />
          </div>
          <div className={formStyles.field}>
            <label>טקסט כפתור משני</label>
            <input
              value={data.ctaSecondaryText}
              onChange={(e) =>
                setData({ ...data, ctaSecondaryText: e.target.value })
              }
            />
          </div>
        </div>
        <SaveBar onSave={save} saving={saving} />
      </div>
    </>
  );
}
