"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { adminNavLinks } from "@/lib/admin-nav";
import { ToastProvider } from "@/components/admin/Toast";
import styles from "./admin-layout.module.scss";

interface AdminShellProps {
  email: string;
  children: ReactNode;
}

export default function AdminShell({ email, children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }

  async function handleLogout() {
    setLogoutLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } finally {
      setLogoutLoading(false);
    }
  }

  return (
    <ToastProvider>
      <div className={styles.shell}>
        {menuOpen && (
          <div
            className={styles.sidebarOverlay}
            onClick={() => setMenuOpen(false)}
            aria-hidden
          />
        )}

        <aside
          className={`${styles.sidebar} ${menuOpen ? styles.sidebarOpen : ""}`}
        >
          <div className={styles.sidebarHeader}>
            <div className={styles.sidebarLogo}>ליאת לפיד</div>
            <div className={styles.sidebarSub}>ממשק ניהול</div>
          </div>
          <nav className={styles.nav}>
            {adminNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  isActive(link.href, "exact" in link ? link.exact : false)
                    ? styles.navLinkActive
                    : styles.navLink
                }
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className={styles.sidebarFooter}>
            <button
              type="button"
              className={styles.logoutBtn}
              onClick={handleLogout}
              disabled={logoutLoading}
            >
              {logoutLoading ? "מתנתק..." : "התנתקות"}
            </button>
          </div>
        </aside>

        <div className={styles.main}>
          <header className={styles.topBar}>
            <button
              type="button"
              className={styles.menuBtn}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="תפריט"
            >
              <span />
              <span />
              <span />
            </button>
            <span className={styles.topBarTitle}>לוח בקרה</span>
            <span className={styles.topBarEmail}>{email}</span>
          </header>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </ToastProvider>
  );
}
