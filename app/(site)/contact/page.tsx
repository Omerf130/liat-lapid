import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/content";
import PageBanner from "@/components/shared/PageBanner";
import ContactForm from "@/components/shared/ContactForm";
import ContactInfo from "@/components/shared/ContactInfo";
import RevealOnScroll from "@/components/shared/RevealOnScroll";
import SectionTitle from "@/components/shared/SectionTitle";
import pg from "@/styles/pages.module.scss";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: `${settings.contact.formTitle} | ליאת לפיד`,
    description: settings.contact.formSubtitle,
  };
}

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const { contact } = settings;

  return (
    <>
      <PageBanner
        title={contact.formTitle}
        subtitle={contact.formSubtitle}
      />
      <section className={pg.pageContent}>
        <div className={pg.container}>
          <div className={pg.contactGrid}>
            <RevealOnScroll>
              <SectionTitle
                title="פרטי התקשרות"
                subtitle="נשמח לעמוד לשירותכם — צרו קשר בדרך הנוחה לכם"
                align="start"
              />
              <ContactInfo contact={contact} />
            </RevealOnScroll>
            <RevealOnScroll delay={0.15}>
              <ContactForm
                formTitle="שלחו לנו הודעה"
                formSubtitle={contact.formSubtitle}
              />
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}
