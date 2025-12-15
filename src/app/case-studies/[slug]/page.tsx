import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { caseStudies, getCaseStudy } from "@/data/caseStudies";

import HeroMedia from "./HeroMedia";
import DesignShowcaseCarousel from "./DesignShowcaseCarousel";
import StepGallery from "./StepGallery";
import styles from "./case-study.module.css";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

type OverviewCard = {
  title: string;
  description: string;
  stat?: string;
  statLabel?: string;
};

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    return {
      title: "Case Study | Alajuwon Thomas",
      description: "Detailed project work from Alajuwon Thomas.",
    };
  }

  return {
    title: `${study.hero.title} | Case Study`,
    description: study.hero.subtitle,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    notFound();
  }

  const heroMeta = [
    { label: "Project Type", value: study.hero.projectType },
    { label: "Year", value: study.hero.year },
    { label: "Duration", value: study.hero.duration },
    { label: "Role", value: study.hero.role },
  ];

  const overviewCards: OverviewCard[] = [
    {
      title: "The Challenge",
      description: study.overview.challenge,
    },
    {
      title: "My Role",
      description: study.overview.role,
    },
    {
      title: "Outcome",
      description: study.overview.outcome.description,
      stat: study.overview.outcome.stat,
      statLabel: study.overview.outcome.label,
    },
  ];

  const heroModalContent = {
    title: "NVSS KMS Overview",
    subtitle: "Purpose",
    paragraphs: [
      "The NVSS NKMS provides a centralized repository of information related to jurisdictional VRO characteristics and progress reports. Core application functions allow the CoP team and technical partners to manage and maintain the information by direct data entry and data imports.Analytical functions provide NVSS data consumers with predefined reports and the ability to track progress on task completion. System administrators manage backend configurations, user access, and retrieve updates made within the system."
    ],
  };

  return (
    <main className={styles.caseStudyPage}>
      <div className={styles.container}>
        <Link href="/" className={styles.backLink}>
          <span>↺</span>
          Back to portfolio
        </Link>

        <p className={styles.caseDisclaimer}>
          ❗ Due to strict federal confidentiality affidavits, several production visuals
          from the CDC engagement have been redacted. The following overview emphasizes
          methodology, collaboration, and impact rather than sensitive government data.
        </p>

        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <p className={styles.heroEyebrow}>Case Study</p>
            <h1 className={styles.heroTitle}>{study.hero.title}</h1>
            <p className={styles.heroSubtitle}>{study.hero.subtitle}</p>

            <div className={styles.heroMetaGrid}>
              {heroMeta.map(({ label, value }) => (
                <div key={label} className={styles.heroPill}>
                  <span className={styles.heroPillLabel}>{label}</span>
                  <span className={styles.heroPillValue}>{value}</span>
                </div>
              ))}
            </div>

            {study.hero.client && (
              <div className={styles.heroClient}>
                <span className={styles.heroClientLabel}>Client</span>
                <span>{study.hero.client.name}</span>
              </div>
            )}
          </div>

          <HeroMedia image={study.hero.image} modal={heroModalContent} />
        </section>

        <section className={styles.overviewSection}>
          <div className={styles.overviewHeader}>
            <p className={styles.overviewEyebrow}>Project Overview</p>
            <h2 className={styles.overviewTitle}>Quick context before the deep dive.</h2>
          </div>

          <div className={styles.overviewGrid}>
            {overviewCards.map((card) => (
              <article key={card.title} className={styles.overviewCard}>
                <span className={styles.cardAccent} />
                <div>
                  <h3 className={styles.overviewCardTitle}>{card.title}</h3>
                  <p className={styles.overviewCardBody}>{card.description}</p>
                </div>
                {card.stat && (
                  <div>
                    <p className={styles.outcomeStat}>{card.stat}</p>
                    <p className={styles.outcomeLabel}>
                      {card.statLabel ?? "Impact"}
                    </p>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className={styles.problemSection}>
          <div className={styles.problemLayer}>
            <div>
              <div className={styles.problemHeader}>
                <p className={styles.problemTitle}>The Problem</p>
                <span className={styles.problemUnderline} />
              </div>
              <div className={styles.problemParagraphs}>
                {study.problem.context.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.processSection}>
          <div className={styles.processHeader}>
            <p>Process &amp; Approach</p>
            <h2>How we moved from fragmented insights to clear decisions.</h2>
          </div>

          <div className={styles.processTimeline}>
            {study.process.steps.map((step, index) => (
              <article key={step.title} className={styles.processStep}>
                <div className={styles.stepCopy}>
                  <span className={styles.stepNumber}>
                    {`Step ${String(index + 1).padStart(2, "0")}`}
                  </span>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDescription}>{step.description}</p>
                  {step.extraDetails && step.extraDetails.length > 0 && (
                    <details className={styles.stepDetails}>
                      <summary className={styles.stepDetailsSummary}>
                        <span>See more</span>
                        <span className={styles.stepDetailsArrow} aria-hidden="true">
                          ↗
                        </span>
                      </summary>
                      <div className={styles.stepDetailsContent}>
                        {step.extraDetails.map((detail) => (
                          <div
                            key={`${step.title}-${detail.heading}`}
                            className={styles.stepDetailsGroup}
                          >
                            <p className={styles.stepDetailsHeading}>{detail.heading}</p>
                            <ul className={styles.stepDetailsList}>
                              {detail.items.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </details>
                  )}
                </div>
                {step.gallery ? (
                  <StepGallery
                    images={step.image ? [step.image, ...step.gallery] : step.gallery}
                  />
                ) : (
                  step.image && (
                    <div className={styles.stepMedia}>
                      {step.image.link ? (
                        <Link
                          href={step.image.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.stepMediaLink}
                        >
                          <Image
                            src={step.image.src}
                            alt={step.image.alt}
                            width={step.image.width}
                            height={step.image.height}
                            sizes="(max-width: 768px) 100vw, 360px"
                            loading="lazy"
                          />
                        </Link>
                      ) : (
                        <Image
                          src={step.image.src}
                          alt={step.image.alt}
                          width={step.image.width}
                          height={step.image.height}
                          sizes="(max-width: 768px) 100vw, 360px"
                          loading="lazy"
                        />
                      )}
                    </div>
                  )
                )}
              </article>
            ))}
          </div>
        </section>

        <section className={styles.showcaseSection}>
          <div className={styles.showcaseHeader}>
            <p>Design Showcase</p>
            <h2>Artifacts that prove the evolution of the system.</h2>
          </div>
          <DesignShowcaseCarousel slides={study.designShowcase.images} />
        </section>

        <section className={styles.decisionsSection}>
          <div className={styles.decisionsHeader}>
            <p>Key Decisions</p>
            <h2>The inflection points that moved the project forward.</h2>
          </div>

          <div className={styles.decisionsGrid}>
            {study.keyDecisions.map((decision) => (
              <article key={decision.title} className={styles.decisionCard}>
                <h3 className={styles.decisionTitle}>{decision.title}</h3>
                <div className={styles.decisionMeta}>
                  <div className={styles.decisionMetaGroup}>
                    <span className={styles.decisionMetaLabel}>Context</span>
                    <p className={styles.decisionMetaValue}>{decision.context}</p>
                  </div>
                  <div className={styles.decisionMetaGroup}>
                    <span className={styles.decisionMetaLabel}>Options</span>
                    <p className={styles.decisionMetaValue}>{decision.options}</p>
                  </div>
                  <div className={styles.decisionMetaGroup}>
                    <span className={styles.decisionMetaLabel}>Why this path</span>
                    <p className={styles.decisionMetaValue}>{decision.decision}</p>
                  </div>
                  <div className={styles.decisionMetaGroup}>
                    <span className={styles.decisionMetaLabel}>Outcome</span>
                    <p className={styles.decisionMetaValue}>{decision.outcome}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.resultsSection}>
          <div className={styles.resultsHeader}>
            <p>Results &amp; Impact</p>
            <h2>Quantifiable proof the redesign mattered.</h2>
          </div>

          <div className={styles.resultsMetrics}>
            {study.results.metrics.map((metric) => (
              <article key={metric.label} className={styles.metricCard}>
                <p className={styles.metricValue}>{metric.value}</p>
                <p className={styles.metricLabel}>{metric.label}</p>
                {metric.description && (
                  <p className={styles.metricDescription}>{metric.description}</p>
                )}
              </article>
            ))}
          </div>

        </section>

        <section className={styles.caseNavSection}>
          <div className={styles.caseNavCard}>
            <div className={styles.caseNavLinks}>
              {study.navigation.previous && (
                <Link
                  href={`/case-studies/${study.navigation.previous.slug}`}
                  className={styles.navProjectLink}
                >
                  <div className={styles.navArrowButton}>
                    <span>↙</span>
                  </div>
                  <div className={styles.navProjectMeta}>
                    <span>Previous</span>
                    <h4>{study.navigation.previous.title}</h4>
                  </div>
                </Link>
              )}
              {study.navigation.next && (
                <Link
                  href={`/case-studies/${study.navigation.next.slug}`}
                  className={styles.navProjectLink}
                >
                  <div className={styles.navArrowButton}>
                    <span>↗</span>
                  </div>
                  <div className={styles.navProjectMeta}>
                    <span>Next</span>
                    <h4>{study.navigation.next.title}</h4>
                  </div>
                </Link>
              )}
            </div>

            <div className={styles.caseNavCtas}>
              <Link href="/#portfolio" className={styles.backLinkSecondary}>
                Back to all projects
              </Link>
              <Link href="/#contact" className={styles.primaryButton}>
                Let’s Discuss
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

