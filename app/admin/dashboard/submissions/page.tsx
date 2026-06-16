"use client";

import { Fragment, useEffect, useState } from "react";
import formStyles from "@/components/admin/admin-forms.module.scss";
import { useToast } from "@/components/admin/Toast";

interface Submission {
  _id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function SubmissionsPage() {
  const { showToast } = useToast();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filterUnread, setFilterUnread] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchSubmissions() {
      try {
        const url = filterUnread
          ? "/api/admin/submissions?unread=true"
          : "/api/admin/submissions";
        const res = await fetch(url);
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? "שגיאה בטעינה");
        if (!cancelled) {
          setSubmissions(json.submissions ?? []);
          setUnreadCount(json.unreadCount ?? 0);
        }
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

    fetchSubmissions();
    return () => {
      cancelled = true;
    };
  }, [filterUnread, showToast]);

  async function reload() {
    const url = filterUnread
      ? "/api/admin/submissions?unread=true"
      : "/api/admin/submissions";
    const res = await fetch(url);
    const json = await res.json();
    if (!res.ok) throw new Error(json.error ?? "שגיאה בטעינה");
    setSubmissions(json.submissions ?? []);
    setUnreadCount(json.unreadCount ?? 0);
  }

  async function toggleRead(id: string, read: boolean) {
    try {
      const res = await fetch(`/api/admin/submissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: !read }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "שגיאה בעדכון");
      await reload();
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "שגיאה בעדכון",
        "error"
      );
    }
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleString("he-IL");
  }

  if (loading) return <p className={formStyles.loading}>טוען...</p>;

  return (
    <>
      <div className={formStyles.pageHeader}>
        <h1>פניות מטופס יצירת קשר</h1>
        <p>
          {unreadCount > 0
            ? `${unreadCount} פניות שלא נקראו`
            : "אין פניות חדשות"}
        </p>
      </div>

      <div className={formStyles.card}>
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input
            type="checkbox"
            checked={filterUnread}
            onChange={(e) => setFilterUnread(e.target.checked)}
          />
          הצג רק פניות שלא נקראו
        </label>

        {submissions.length === 0 ? (
          <p style={{ marginTop: "1rem", color: "#6b6b6b" }}>אין פניות להצגה.</p>
        ) : (
          <div className={formStyles.tableWrap}>
          <table className={formStyles.table} style={{ marginTop: "1rem" }}>
            <thead>
              <tr>
                <th>תאריך</th>
                <th>שם</th>
                <th>טלפון</th>
                <th>אימייל</th>
                <th>סטטוס</th>
                <th>פעולות</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub) => (
                <Fragment key={sub._id}>
                  <tr>
                    <td>{formatDate(sub.createdAt)}</td>
                    <td>{sub.name}</td>
                    <td dir="ltr">{sub.phone}</td>
                    <td dir="ltr">{sub.email}</td>
                    <td>
                      {sub.read ? (
                        <span className={formStyles.badgeInactive}>נקרא</span>
                      ) : (
                        <span className={formStyles.badgeUnread}>חדש</span>
                      )}
                    </td>
                    <td>
                      <button
                        type="button"
                        className={formStyles.btnSmall}
                        onClick={() =>
                          setExpandedId(expandedId === sub._id ? null : sub._id)
                        }
                      >
                        {expandedId === sub._id ? "סגור" : "צפייה"}
                      </button>{" "}
                      <button
                        type="button"
                        className={formStyles.btnSmall}
                        onClick={() => toggleRead(sub._id, sub.read)}
                      >
                        {sub.read ? "סמן כחדש" : "סמן כנקרא"}
                      </button>
                    </td>
                  </tr>
                  {expandedId === sub._id && (
                    <tr>
                      <td colSpan={6}>
                        <strong>הודעה:</strong>
                        <p style={{ marginTop: "0.5rem", whiteSpace: "pre-wrap" }}>
                          {sub.message}
                        </p>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>
    </>
  );
}
