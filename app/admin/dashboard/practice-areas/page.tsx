"use client";

import { useEffect, useState } from "react";
import RichTextEditor from "@/components/admin/RichTextEditor";
import formStyles from "@/components/admin/admin-forms.module.scss";
import { useToast } from "@/components/admin/Toast";
import type { PracticeAreaData } from "@/lib/types";

interface PracticeAreaDoc extends PracticeAreaData {
  _id: string;
}

const emptyForm = (): PracticeAreaData => ({
  title: "",
  slug: "",
  shortDescription: "",
  fullDescription: "",
  icon: "",
  order: 0,
  isActive: true,
});

export default function PracticeAreasPage() {
  const { showToast } = useToast();
  const [areas, setAreas] = useState<PracticeAreaDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<PracticeAreaData>(emptyForm());

  useEffect(() => {
    let cancelled = false;

    async function fetchAreas() {
      try {
        const res = await fetch("/api/admin/practice-areas");
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? "שגיאה בטעינה");
        if (!cancelled) setAreas(json.practiceAreas ?? []);
      } catch (error) {
        if (!cancelled) {
          showToast(
            error instanceof Error ? error.message : "שגיאה בטעינה",
            "error"
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchAreas();
    return () => {
      cancelled = true;
    };
  }, [showToast]);

  async function reload() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/practice-areas");
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "שגיאה בטעינה");
      setAreas(json.practiceAreas ?? []);
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "שגיאה בטעינה",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }

  function startCreate() {
    setEditingId("new");
    setForm({ ...emptyForm(), order: areas.length });
  }

  function startEdit(area: PracticeAreaDoc) {
    setEditingId(area._id);
    setForm({
      title: area.title,
      slug: area.slug,
      shortDescription: area.shortDescription,
      fullDescription: area.fullDescription,
      icon: area.icon,
      order: area.order,
      isActive: area.isActive,
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm());
  }

  async function handleSave() {
    setSaving(true);
    try {
      const isNew = editingId === "new";
      const url = isNew
        ? "/api/admin/practice-areas"
        : `/api/admin/practice-areas/${editingId}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "שגיאה בשמירה");

      showToast(isNew ? "תחום עיסוק נוצר" : "נשמר בהצלחה");
      cancelEdit();
      await reload();
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "שגיאה בשמירה",
        "error"
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, title: string) {
    if (!window.confirm(`למחוק את "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/practice-areas/${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "שגיאה במחיקה");
      showToast("נמחק בהצלחה");
      if (editingId === id) cancelEdit();
      await reload();
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "שגיאה במחיקה",
        "error"
      );
    }
  }

  if (loading) return <p className={formStyles.loading}>טוען...</p>;

  return (
    <>
      <div className={formStyles.pageHeader}>
        <h1>תחומי עיסוק</h1>
        <p>ניהול תחומי העיסוק של המשרד.</p>
      </div>

      <div className={formStyles.card}>
        <table className={formStyles.table}>
          <thead>
            <tr>
              <th>כותרת</th>
              <th>Slug</th>
              <th>סדר</th>
              <th>סטטוס</th>
              <th>פעולות</th>
            </tr>
          </thead>
          <tbody>
            {areas.map((area) => (
              <tr key={area._id}>
                <td>{area.title}</td>
                <td dir="ltr">{area.slug}</td>
                <td>{area.order}</td>
                <td>
                  <span
                    className={
                      area.isActive
                        ? formStyles.badge
                        : formStyles.badgeInactive
                    }
                  >
                    {area.isActive ? "פעיל" : "לא פעיל"}
                  </span>
                </td>
                <td>
                  <button
                    type="button"
                    className={formStyles.btnSmall}
                    onClick={() => startEdit(area)}
                  >
                    עריכה
                  </button>{" "}
                  <button
                    type="button"
                    className={formStyles.btnDanger}
                    onClick={() => handleDelete(area._id, area.title)}
                  >
                    מחק
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!editingId && (
          <button
            type="button"
            className={formStyles.btnAdd}
            onClick={startCreate}
            style={{ marginTop: "1rem" }}
          >
            + הוספת תחום עיסוק
          </button>
        )}
      </div>

      {editingId && (
        <div className={formStyles.editPanel}>
          <h3>{editingId === "new" ? "תחום עיסוק חדש" : "עריכת תחום עיסוק"}</h3>
          <div className={formStyles.formGrid} style={{ marginTop: "1rem" }}>
            <div className={formStyles.field}>
              <label>כותרת</label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className={formStyles.field}>
              <label>Slug (אנגלית, מקפים)</label>
              <input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                dir="ltr"
              />
            </div>
            <div className={formStyles.field}>
              <label>אייקון</label>
              <input
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
              />
            </div>
            <div className={formStyles.field}>
              <label>סדר</label>
              <input
                type="number"
                value={form.order}
                onChange={(e) =>
                  setForm({ ...form, order: Number(e.target.value) })
                }
              />
            </div>
            <div className={formStyles.field}>
              <label>
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) =>
                    setForm({ ...form, isActive: e.target.checked })
                  }
                  style={{ marginInlineEnd: "0.5rem" }}
                />
                פעיל
              </label>
            </div>
            <div className={`${formStyles.field} ${formStyles.fullWidth}`}>
              <label>תיאור קצר</label>
              <textarea
                value={form.shortDescription}
                onChange={(e) =>
                  setForm({ ...form, shortDescription: e.target.value })
                }
                rows={2}
              />
            </div>
            <div className={`${formStyles.field} ${formStyles.fullWidth}`}>
              <label>תיאור מלא</label>
              <RichTextEditor
                value={form.fullDescription}
                onChange={(html) =>
                  setForm({ ...form, fullDescription: html })
                }
              />
            </div>
          </div>
          <div className={formStyles.saveBar}>
            <button
              type="button"
              className={formStyles.btnSmall}
              onClick={cancelEdit}
            >
              ביטול
            </button>
            <button
              type="button"
              className={formStyles.saveBtn}
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "שומר..." : "שמירה"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
