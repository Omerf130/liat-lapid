"use client";

import SaveBar from "@/components/admin/SaveBar";
import formStyles from "@/components/admin/admin-forms.module.scss";
import { useSiteSection } from "@/hooks/useSiteSection";

export default function ContactEditorPage() {
  const { data, setData, loading, saving, save } = useSiteSection("contact");

  if (loading) return <p className={formStyles.loading}>טוען...</p>;

  return (
    <>
      <div className={formStyles.pageHeader}>
        <h1>פרטי קשר</h1>
        <p>עריכת פרטי התקשרות וטקסט טופס יצירת קשר.</p>
      </div>

      <div className={formStyles.card}>
        <div className={formStyles.formGrid}>
          <div className={formStyles.field}>
            <label>טלפון</label>
            <input
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              dir="ltr"
            />
          </div>
          <div className={formStyles.field}>
            <label>WhatsApp (מספר בינלאומי ללא +)</label>
            <input
              value={data.whatsapp}
              onChange={(e) => setData({ ...data, whatsapp: e.target.value })}
              dir="ltr"
            />
          </div>
          <div className={formStyles.field}>
            <label>אימייל</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              dir="ltr"
            />
          </div>
          <div className={formStyles.field}>
            <label>כתובת</label>
            <input
              value={data.address}
              onChange={(e) => setData({ ...data, address: e.target.value })}
            />
          </div>
          <div className={formStyles.field}>
            <label>כותרת טופס</label>
            <input
              value={data.formTitle}
              onChange={(e) => setData({ ...data, formTitle: e.target.value })}
            />
          </div>
          <div className={formStyles.field}>
            <label>כותרת משנה לטופס</label>
            <input
              value={data.formSubtitle}
              onChange={(e) =>
                setData({ ...data, formSubtitle: e.target.value })
              }
            />
          </div>
        </div>
        <SaveBar onSave={save} saving={saving} />
      </div>
    </>
  );
}
