"use client";

import ContentItemsEditor from "@/components/admin/ContentItemsEditor";
import SaveBar from "@/components/admin/SaveBar";
import formStyles from "@/components/admin/admin-forms.module.scss";
import { useSiteSection } from "@/hooks/useSiteSection";

export default function LecturesEditorPage() {
  const { data, setData, loading, saving, save } = useSiteSection("lectures");

  if (loading) return <p className={formStyles.loading}>טוען...</p>;

  return (
    <>
      <div className={formStyles.pageHeader}>
        <h1>הרצאות</h1>
        <p>עריכת סקשן הרצאות והדרכות.</p>
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
            <label>תיאור</label>
            <textarea
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              rows={3}
            />
          </div>
        </div>

        <h3 style={{ margin: "1.5rem 0 1rem" }}>הרצאות</h3>
        <ContentItemsEditor
          items={data.items}
          onChange={(items) => setData({ ...data, items })}
          itemLabel="הרצאה"
        />

        <SaveBar onSave={save} saving={saving} />
      </div>
    </>
  );
}
