export interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  backgroundImageUrl: string;
  ctaPrimaryText: string;
  ctaSecondaryText: string;
}

export interface AboutContent {
  pageTitle: string;
  shortText: string;
  fullContent: string;
  imageUrl: string;
}

export interface ContentCard {
  title: string;
  description: string;
  icon: string;
}

export interface EmployerGuidanceContent {
  pageTitle: string;
  title: string;
  shortText: string;
  fullContent: string;
  imageUrl: string;
  cards: ContentCard[];
}

export interface EmployeeGuidanceContent {
  title: string;
  content: string;
  items: ContentCard[];
}

export interface LecturesContent {
  title: string;
  description: string;
  items: ContentCard[];
}

export interface ContactContent {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  formTitle: string;
  formSubtitle: string;
}

export interface SeoContent {
  siteTitle: string;
  metaDescription: string;
  keywords: string;
}

export interface SiteSettingsData {
  hero: HeroContent;
  about: AboutContent;
  employerGuidance: EmployerGuidanceContent;
  employeeGuidance: EmployeeGuidanceContent;
  lectures: LecturesContent;
  contact: ContactContent;
  seo: SeoContent;
}

export interface PracticeAreaData {
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  order: number;
  isActive: boolean;
}

export interface AdvantageData {
  title: string;
  description: string;
  icon: string;
  order: number;
}
