import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import { getSiteSettings } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: settings.seo.siteTitle,
    description: settings.seo.metaDescription,
    keywords: settings.seo.keywords,
  };
}

export const dynamic = "force-dynamic";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <>
      <Header />
      {children}
      <Footer contact={settings.contact} />
      <FloatingButtons
        phone={settings.contact.phone}
        whatsapp={settings.contact.whatsapp}
      />
    </>
  );
}
