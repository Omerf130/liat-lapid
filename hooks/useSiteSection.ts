"use client";

import { useCallback, useEffect, useState } from "react";
import { defaultSiteSettings } from "@/lib/defaults";
import type { SiteSettingsData } from "@/lib/types";
import { useToast } from "@/components/admin/Toast";

export function useSiteSection<K extends keyof SiteSettingsData>(section: K) {
  const { showToast } = useToast();
  const [data, setData] = useState<SiteSettingsData[K]>(
    defaultSiteSettings[section]
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/admin/site-settings");
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? "שגיאה בטעינה");

        if (!cancelled) {
          setData(json.settings?.[section] ?? defaultSiteSettings[section]);
        }
      } catch (error) {
        if (!cancelled) {
          showToast(
            error instanceof Error ? error.message : "שגיאה בטעינת נתונים",
            "error"
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [section, showToast]);

  const save = useCallback(async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/site-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [section]: data }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "שגיאה בשמירה");
      showToast("נשמר בהצלחה");
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "שגיאה בשמירה",
        "error"
      );
    } finally {
      setSaving(false);
    }
  }, [section, data, showToast]);

  return { data, setData, loading, saving, save };
}
