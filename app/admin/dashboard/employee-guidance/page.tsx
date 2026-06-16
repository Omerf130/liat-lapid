"use client";

import ContentItemsEditor from "@/components/admin/ContentItemsEditor";
import RichTextEditor from "@/components/admin/RichTextEditor";
import SaveBar from "@/components/admin/SaveBar";
import formStyles from "@/components/admin/admin-forms.module.scss";
import { useSiteSection } from "@/hooks/useSiteSection";

export default function EmployeeGuidanceEditorPage() {
  const { data, setData, loading, saving, save } =
    useSiteSection("employeeGuidance");

  if (loading) return <p className={formStyles.loading}>טוען...</p>;

  return (
    <>
      <div className={formStyles.pageHeader}>
        <h1>ייעוץ לעובדים</h1>
        <p>עריכת סקשן ייעוץ משפטי לעובדים בדף הבית.</p>
      </div>

      <div className={formStyles.card}>
        <div className={formStyles.formGrid}>
          <div className={`${formStyles.field} ${formStyles.fullWidth}`}>
            <label>כותרת</label>
            <input
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
          </div>
          <div className={`${formStyles.field} ${formStyles.fullWidth}`}>
            <label>תוכן</label>
            <RichTextEditor
              value={data.content}
              onChange={(html) => setData({ ...data, content: html })}
            />
          </div>
        </div>

        <h3 style={{ margin: "1.5rem 0 1rem" }}>פריטים</h3>
        <ContentItemsEditor
          items={data.items}
          onChange={(items) => setData({ ...data, items })}
        />

        <SaveBar onSave={save} saving={saving} />
      </div>
    </>
  );
}
