"use client";

import SaveBar from "@/components/admin/SaveBar";
import formStyles from "@/components/admin/admin-forms.module.scss";
import { useSiteSection } from "@/hooks/useSiteSection";

export default function SeoEditorPage() {
  const { data, setData, loading, saving, save } = useSiteSection("seo");

  if (loading) return <p className={formStyles.loading}>טוען...</p>;

  return (
    <>
      <div className={formStyles.pageHeader}>
        <h1>SEO</h1>
        <p>עריכת כותרת האתר, תיאור מטא ומילות מפתח.</p>
      </div>

      <div className={formStyles.card}>
        <div className={formStyles.formGrid}>
          <div className={`${formStyles.field} ${formStyles.fullWidth}`}>
            <label>כותרת האתר (title)</label>
            <input
              value={data.siteTitle}
              onChange={(e) => setData({ ...data, siteTitle: e.target.value })}
            />
          </div>
          <div className={`${formStyles.field} ${formStyles.fullWidth}`}>
            <label>תיאור מטא (meta description)</label>
            <textarea
              value={data.metaDescription}
              onChange={(e) =>
                setData({ ...data, metaDescription: e.target.value })
              }
              rows={3}
            />
          </div>
          <div className={`${formStyles.field} ${formStyles.fullWidth}`}>
            <label>מילות מפתח</label>
            <input
              value={data.keywords}
              onChange={(e) => setData({ ...data, keywords: e.target.value })}
            />
          </div>
        </div>
        <SaveBar onSave={save} saving={saving} />
      </div>
    </>
  );
}
