import { getSiteSettings, getPracticeAreas, getAdvantages } from "@/lib/content";
import HeroSection from "@/components/home/HeroSection";
import SectionTitle from "@/components/shared/SectionTitle";
import PracticeAreaCard from "@/components/shared/PracticeAreaCard";
import AdvantageCard from "@/components/shared/AdvantageCard";
import ContentCard from "@/components/shared/ContentCard";
import ContactForm from "@/components/shared/ContactForm";
import ContactInfo from "@/components/shared/ContactInfo";
import RevealOnScroll from "@/components/shared/RevealOnScroll";
import Button from "@/components/shared/Button";
import RichText from "@/components/shared/RichText";
import pg from "@/styles/pages.module.scss";
import home from "./page.module.scss";

export default async function HomePage() {
  const [settings, practiceAreas, advantages] = await Promise.all([
    getSiteSettings(),
    getPracticeAreas(),
    getAdvantages(),
  ]);

  const { hero, about, employerGuidance, employeeGuidance, lectures, contact } =
    settings;

  return (
    <>
      <HeroSection hero={hero} />

      {/* 2. Short About */}
      <section className={`${pg.section} ${pg.sectionLight}`}>
        <div className={pg.container}>
          <RevealOnScroll>
            <SectionTitle title="אודות המשרד" subtitle={about.shortText} />
            <p className={home.aboutText}>{about.shortText}</p>
            <div className={pg.sectionAction}>
              <Button href="/about" variant="primary">
                קרא עוד
              </Button>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 3. Employer Guidance preview */}
      <section className={`${pg.section} ${pg.sectionCream}`}>
        <div className={pg.container}>
          <RevealOnScroll>
            <div className={home.employerPreview}>
              <div>
                <SectionTitle
                  title={employerGuidance.title}
                  subtitle={employerGuidance.shortText}
                  align="start"
                />
                <p className={home.employerText}>{employerGuidance.shortText}</p>
                <div className={pg.sectionAction} style={{ justifyContent: "flex-start" }}>
                  <Button href="/employers" variant="primary">
                    לפרטים נוספים
                  </Button>
                </div>
              </div>
              <div className={home.employerCards}>
                {employerGuidance.cards.slice(0, 3).map((card, index) => (
                  <RevealOnScroll key={card.title} delay={index * 0.1}>
                    <ContentCard
                      title={card.title}
                      description={card.description}
                      icon={card.icon}
                    />
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 4. Employee Guidance */}
      <section className={`${pg.section} ${pg.sectionDark}`}>
        <div className={pg.container}>
          <RevealOnScroll>
            <SectionTitle
              title={employeeGuidance.title}
              light
              align="center"
            />
            <div className={home.richTextWrap}>
              <RichText html={employeeGuidance.content} light />
            </div>
          </RevealOnScroll>
          <div className={`${pg.cardGrid} ${home.cardGridSpaced}`}>
            {employeeGuidance.items.map((item, index) => (
              <RevealOnScroll key={item.title} delay={index * 0.08}>
                <ContentCard
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                  variant="dark"
                />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Lectures */}
      <section className={`${pg.section} ${pg.sectionLight}`}>
        <div className={pg.container}>
          <RevealOnScroll>
            <SectionTitle
              title={lectures.title}
              subtitle={lectures.description}
            />
          </RevealOnScroll>
          <div className={pg.cardGrid}>
            {lectures.items.map((item, index) => (
              <RevealOnScroll key={item.title} delay={index * 0.1}>
                <article className={home.lectureCard}>
                  <span className={home.lectureIcon} aria-hidden="true">
                    {item.icon}
                  </span>
                  <h3 className={home.lectureTitle}>{item.title}</h3>
                  <p className={home.lectureDesc}>{item.description}</p>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Practice Areas preview */}
      <section className={`${pg.section} ${pg.sectionDark}`}>
        <div className={pg.container}>
          <RevealOnScroll>
            <SectionTitle
              title="תחומי עיסוק"
              subtitle="מומחיות בדיני עבודה — ייעוץ, ליווי וייצוג משפטי"
              light
            />
          </RevealOnScroll>
          <div className={pg.cardGridFour}>
            {practiceAreas.slice(0, 4).map((area, index) => (
              <RevealOnScroll key={area.slug} delay={index * 0.1}>
                <PracticeAreaCard
                  title={area.title}
                  slug={area.slug}
                  shortDescription={area.shortDescription}
                  icon={area.icon}
                />
              </RevealOnScroll>
            ))}
          </div>
          <div className={pg.sectionAction}>
            <Button href="/practice-areas" variant="secondary">
              לכל תחומי העיסוק
            </Button>
          </div>
        </div>
      </section>

      {/* 7. Advantages */}
      <section className={`${pg.section} ${pg.sectionDark}`}>
        <div className={pg.container}>
          <RevealOnScroll>
            <SectionTitle
              title="יתרונות המשרד"
              subtitle="מקצועיות, זמינות ויחס אישי — בכל שלב"
              light
            />
          </RevealOnScroll>
          <div className={pg.advantageGrid}>
            {advantages.map((item, index) => (
              <RevealOnScroll key={item.title} delay={index * 0.08}>
                <AdvantageCard
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Contact */}
      <section className={`${pg.section} ${pg.sectionLight}`} id="contact">
        <div className={pg.container}>
          <div className={pg.contactGrid}>
            <RevealOnScroll>
              <SectionTitle
                title={contact.formTitle}
                subtitle={contact.formSubtitle}
                align="start"
              />
              <ContactInfo contact={contact} />
            </RevealOnScroll>
            <RevealOnScroll delay={0.15}>
              <ContactForm
                formTitle={contact.formTitle}
                formSubtitle={contact.formSubtitle}
              />
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}
