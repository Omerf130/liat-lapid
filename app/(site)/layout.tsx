import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import { getSiteSettings } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = settings.seo.siteTitle;
  const description = settings.seo.metaDescription;

  return {
    title: {
      default: title,
      template: `%s | ליאת לפיד`,
    },
    description,
    keywords: settings.seo.keywords,
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://liat-lapid.vercel.app"
    ),
    openGraph: {
      type: "website",
      locale: "he_IL",
      siteName: "ליאת לפיד — משרד עורכי דין",
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: "/",
    },
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
      <main id="main-content">{children}</main>
      <Footer contact={settings.contact} />
      <FloatingButtons
        phone={settings.contact.phone}
        whatsapp={settings.contact.whatsapp}
      />
    </>
  );
}
