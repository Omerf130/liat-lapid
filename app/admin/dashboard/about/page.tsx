"use client";

import ImageUploadField from "@/components/admin/ImageUploadField";
import RichTextEditor from "@/components/admin/RichTextEditor";
import SaveBar from "@/components/admin/SaveBar";
import formStyles from "@/components/admin/admin-forms.module.scss";
import { useSiteSection } from "@/hooks/useSiteSection";

export default function AboutEditorPage() {
  const { data, setData, loading, saving, save } = useSiteSection("about");

  if (loading) return <p className={formStyles.loading}>טוען...</p>;

  return (
    <>
      <div className={formStyles.pageHeader}>
        <h1>אודות</h1>
        <p>עריכת תוכן עמוד האודות.</p>
      </div>

      <div className={formStyles.card}>
        <div className={formStyles.formGrid}>
          <div className={formStyles.field}>
            <label>כותרת עמוד</label>
            <input
              value={data.pageTitle}
              onChange={(e) => setData({ ...data, pageTitle: e.target.value })}
            />
          </div>
          <ImageUploadField
            label="תמונה"
            value={data.imageUrl}
            onChange={(url) => setData({ ...data, imageUrl: url })}
          />
          <div className={`${formStyles.field} ${formStyles.fullWidth}`}>
            <label>טקסט קצר</label>
            <textarea
              value={data.shortText}
              onChange={(e) => setData({ ...data, shortText: e.target.value })}
              rows={3}
            />
          </div>
          <div className={`${formStyles.field} ${formStyles.fullWidth}`}>
            <label>תוכן מלא</label>
            <RichTextEditor
              value={data.fullContent}
              onChange={(html) => setData({ ...data, fullContent: html })}
            />
          </div>
        </div>
        <SaveBar onSave={save} saving={saving} />
      </div>
    </>
  );
}
