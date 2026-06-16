import { connectDB } from "./db";
import {
  defaultAdvantages,
  defaultPracticeAreas,
  defaultSiteSettings,
} from "./defaults";
import type { SiteSettingsData } from "./types";
import SiteSettings from "@/models/SiteSettings";
import PracticeArea from "@/models/PracticeArea";
import Advantage from "@/models/Advantage";

function mergeSiteSettings(stored: SiteSettingsData | null): SiteSettingsData {
  if (!stored) {
    return defaultSiteSettings;
  }

  return {
    hero: { ...defaultSiteSettings.hero, ...stored.hero },
    about: { ...defaultSiteSettings.about, ...stored.about },
    employerGuidance: {
      ...defaultSiteSettings.employerGuidance,
      ...stored.employerGuidance,
      cards:
        stored.employerGuidance?.cards?.length > 0
          ? stored.employerGuidance.cards
          : defaultSiteSettings.employerGuidance.cards,
    },
    employeeGuidance: {
      ...defaultSiteSettings.employeeGuidance,
      ...stored.employeeGuidance,
      items:
        stored.employeeGuidance?.items?.length > 0
          ? stored.employeeGuidance.items
          : defaultSiteSettings.employeeGuidance.items,
    },
    lectures: {
      ...defaultSiteSettings.lectures,
      ...stored.lectures,
      items:
        stored.lectures?.items?.length > 0
          ? stored.lectures.items
          : defaultSiteSettings.lectures.items,
    },
    contact: { ...defaultSiteSettings.contact, ...stored.contact },
    seo: { ...defaultSiteSettings.seo, ...stored.seo },
  };
}

export async function getSiteSettings(): Promise<SiteSettingsData> {
  try {
    await connectDB();
    const doc = await SiteSettings.findOne({ key: "main" }).lean();
    if (!doc) {
      return defaultSiteSettings;
    }
    const { key: _key, createdAt: _c, updatedAt: _u, ...data } = doc;
    return mergeSiteSettings(data as SiteSettingsData);
  } catch {
    return defaultSiteSettings;
  }
}

export async function getPracticeAreas(activeOnly = true) {
  try {
    await connectDB();
    const filter = activeOnly ? { isActive: true } : {};
    const areas = await PracticeArea.find(filter).sort({ order: 1 }).lean();
    if (areas.length === 0) {
      return activeOnly
        ? defaultPracticeAreas.filter((a) => a.isActive)
        : defaultPracticeAreas;
    }
    return areas;
  } catch {
    return activeOnly
      ? defaultPracticeAreas.filter((a) => a.isActive)
      : defaultPracticeAreas;
  }
}

export async function getPracticeAreaBySlug(slug: string) {
  try {
    await connectDB();
    const area = await PracticeArea.findOne({ slug, isActive: true }).lean();
    if (area) {
      return area;
    }
    return defaultPracticeAreas.find((a) => a.slug === slug && a.isActive) ?? null;
  } catch {
    return defaultPracticeAreas.find((a) => a.slug === slug && a.isActive) ?? null;
  }
}

export async function getAdvantages() {
  try {
    await connectDB();
    const advantages = await Advantage.find().sort({ order: 1 }).lean();
    if (advantages.length === 0) {
      return defaultAdvantages;
    }
    return advantages;
  } catch {
    return defaultAdvantages;
  }
}

export { defaultSiteSettings, defaultPracticeAreas, defaultAdvantages };
