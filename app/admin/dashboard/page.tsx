"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { adminNavLinks } from "@/lib/admin-nav";
import formStyles from "@/components/admin/admin-forms.module.scss";

export default function DashboardOverview() {
  const [unreadCount, setUnreadCount] = useState<number | null>(null);
  const [practiceCount, setPracticeCount] = useState<number | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const [subsRes, areasRes] = await Promise.all([
          fetch("/api/admin/submissions?unread=true"),
          fetch("/api/admin/practice-areas"),
        ]);
        const subsJson = await subsRes.json();
        const areasJson = await areasRes.json();

        if (subsRes.ok) setUnreadCount(subsJson.unreadCount ?? 0);
        if (areasRes.ok) setPracticeCount(areasJson.practiceAreas?.length ?? 0);
      } catch {
        // stats are optional on overview
      }
    }
    loadStats();
  }, []);

  const quickLinks = adminNavLinks.filter(
    (l) => !("exact" in l && l.exact)
  );

  return (
    <>
      <div className={formStyles.pageHeader}>
        <h1>סקירה כללית</h1>
        <p>ניהול תוכן האתר — בחרו סעיף מהרשימה או מהקישורים המהירים.</p>
      </div>

      <div className={formStyles.statsGrid}>
        <div className={formStyles.statCard}>
          <strong>{unreadCount ?? "—"}</strong>
          <span>פניות שלא נקראו</span>
        </div>
        <div className={formStyles.statCard}>
          <strong>{practiceCount ?? "—"}</strong>
          <span>תחומי עיסוק</span>
        </div>
      </div>

      <div className={formStyles.quickLinks}>
        {quickLinks.map((link) => (
          <Link key={link.href} href={link.href} className={formStyles.quickLink}>
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
}
