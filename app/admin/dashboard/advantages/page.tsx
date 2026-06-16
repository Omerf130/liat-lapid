"use client";

import { useEffect, useState } from "react";
import formStyles from "@/components/admin/admin-forms.module.scss";
import { useToast } from "@/components/admin/Toast";
import type { AdvantageData } from "@/lib/types";

interface AdvantageDoc extends AdvantageData {
  _id: string;
}

const emptyForm = (): AdvantageData => ({
  title: "",
  description: "",
  icon: "",
  order: 0,
});

export default function AdvantagesPage() {
  const { showToast } = useToast();
  const [items, setItems] = useState<AdvantageDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<AdvantageData>(emptyForm());

  useEffect(() => {
    let cancelled = false;

    async function fetchItems() {
      try {
        const res = await fetch("/api/admin/advantages");
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? "שגיאה בטעינה");
        if (!cancelled) setItems(json.advantages ?? []);
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

    fetchItems();
    return () => {
      cancelled = true;
    };
  }, [showToast]);

  async function reload() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/advantages");
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "שגיאה בטעינה");
      setItems(json.advantages ?? []);
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
    setForm({ ...emptyForm(), order: items.length });
  }

  function startEdit(item: AdvantageDoc) {
    setEditingId(item._id);
    setForm({
      title: item.title,
      description: item.description,
      icon: item.icon,
      order: item.order,
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
        ? "/api/admin/advantages"
        : `/api/admin/advantages/${editingId}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "שגיאה בשמירה");

      showToast(isNew ? "יתרון נוצר" : "נשמר בהצלחה");
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
      const res = await fetch(`/api/admin/advantages/${id}`, {
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
        <h1>יתרונות</h1>
        <p>ניהול כרטיסי היתרונות בדף הבית.</p>
      </div>

      <div className={formStyles.card}>
        <div className={formStyles.tableWrap}>
        <table className={formStyles.table}>
          <thead>
            <tr>
              <th>כותרת</th>
              <th>אייקון</th>
              <th>סדר</th>
              <th>פעולות</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.title}</td>
                <td>{item.icon}</td>
                <td>{item.order}</td>
                <td>
                  <button
                    type="button"
                    className={formStyles.btnSmall}
                    onClick={() => startEdit(item)}
                  >
                    עריכה
                  </button>{" "}
                  <button
                    type="button"
                    className={formStyles.btnDanger}
                    onClick={() => handleDelete(item._id, item.title)}
                  >
                    מחק
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

        {!editingId && (
          <button
            type="button"
            className={formStyles.btnAdd}
            onClick={startCreate}
            style={{ marginTop: "1rem" }}
          >
            + הוספת יתרון
          </button>
        )}
      </div>

      {editingId && (
        <div className={formStyles.editPanel}>
          <h3>{editingId === "new" ? "יתרון חדש" : "עריכת יתרון"}</h3>
          <div className={formStyles.formGrid} style={{ marginTop: "1rem" }}>
            <div className={formStyles.field}>
              <label>כותרת</label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
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
            <div className={`${formStyles.field} ${formStyles.fullWidth}`}>
              <label>תיאור</label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={3}
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
