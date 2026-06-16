"use client";

import ContentItemsEditor from "@/components/admin/ContentItemsEditor";
import ImageUploadField from "@/components/admin/ImageUploadField";
import RichTextEditor from "@/components/admin/RichTextEditor";
import SaveBar from "@/components/admin/SaveBar";
import formStyles from "@/components/admin/admin-forms.module.scss";
import { useSiteSection } from "@/hooks/useSiteSection";

export default function EmployersEditorPage() {
  const { data, setData, loading, saving, save } =
    useSiteSection("employerGuidance");

  if (loading) return <p className={formStyles.loading}>טוען...</p>;

  return (
    <>
      <div className={formStyles.pageHeader}>
        <h1>ליווי מעסיקים</h1>
        <p>עריכת עמוד וסקשן ליווי משפטי למעסיקים.</p>
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
          <div className={formStyles.field}>
            <label>כותרת</label>
            <input
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
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

        <h3 style={{ margin: "1.5rem 0 1rem" }}>כרטיסיות</h3>
        <ContentItemsEditor
          items={data.cards}
          onChange={(cards) => setData({ ...data, cards })}
          itemLabel="כרטיס"
        />

        <SaveBar onSave={save} saving={saving} />
      </div>
    </>
  );
}
