"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./dashboard.module.scss";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      className={styles.logout}
      onClick={handleLogout}
      disabled={loading}
    >
      {loading ? "מתנתק..." : "התנתקות"}
    </button>
  );
}
