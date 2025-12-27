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
    ...(study.hero.platform ? [{ label: "Platform", value: study.hero.platform }] : []),
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

  const defaultHeroModal = {
    title: "Project Overview",
    subtitle: "Purpose",
    paragraphs: [
      "This case study highlights the core flows, constraints, and impact of the project. It summarizes how the experience evolved from early research through delivery and validation.",
    ],
  };

  const heroModalContent = study.hero.modal ?? defaultHeroModal;

  const isRushCaseStudy = slug === "rush-the-line";

  const problemSolutionPairs = isRushCaseStudy
    ? [
        {
          problem:
            'Airport travelers face critical decisions under time pressure but cannot evaluate the trustworthiness of real-time crowdsourced data— a gate change from 45 minutes ago is not as reliable as one from 2 minutes ago, yet most apps do not communicate this difference. When boarding starts in 30 minutes, they need immediate answers like "Am I on track?" but must hunt through fragmented information scattered across airline APIs, TSA systems, and vendor databases that often conflict or go offline. Generic navigation cannot serve diverse needs: wheelchair users need accessible routes, families need nursing rooms, business travelers need lounges, and risk tolerance varies from those who arrive 2 hours early to those who cut it close.',
          solution:
            'RTL addresses these challenges through multi-layered transparency: every update displays its data source (crowdsourced vs. official), confidence level (high/medium/low), and color-coded timestamp freshness, with red borders for urgent alerts and purple for moderate priority. A persistent "Decision Cockpit" card answers "Am I on track?" by combining walk time, current wait, and personalized departure recommendations, while a color-coded journey timeline tracks progress through airport stages. Adaptive personalization activates wheelchair-accessible routes, family amenities, or business lounges based on user context, while learning risk tolerance from past behavior to calibrate buffer time recommendations.',
        },
      ]
    : [
        {
          problem: "7+ nested sidebar sections with no clear starting point",
          solution: "4 role-based entry points on the home screen",
        },
        {
          problem: "Leadership transitions = lost context on progress",
          solution: "Prominent contact cards + status headers per jurisdiction",
        },
        {
          problem: "Can't distinguish blocker types for outreach",
          solution: "Structured blocker-type tagging + priority levels",
        },
        {
          problem: "Data scattered across PowerApps, Excel, email",
          solution: "Single dashboard with real-time metrics + funnel",
        },
        {
          problem: "Briefing leadership took 11+ minutes of prep",
          solution: "Click-to-drill metrics with trend indicators",
        },
      ];

  return (
    <main className={styles.caseStudyPage}>
      <div className={styles.container}>
        <Link href="/" className={styles.backLink}>
          <span>↺</span>
          Back to portfolio
        </Link>

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

            {study.toolsUsed?.length ? (
              <div className={styles.heroTools}>
                <span className={styles.heroToolsLabel}>Tools Used</span>
                <div className={styles.heroToolPills}>
                  {study.toolsUsed.map((tool) => (
                    <span key={tool} className={styles.heroToolPill}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {study.techStack ? (
              <div className={styles.heroTools}>
                <span className={styles.heroToolsLabel}>Tech Stack</span>
                <div className={styles.heroTechStackList}>
                  <span><strong>Frontend:</strong> {study.techStack.frontend}</span>
                  <span><strong>Backend:</strong> {study.techStack.backend}</span>
                  <span><strong>Language:</strong> {study.techStack.language}</span>
                  <span><strong>State:</strong> {study.techStack.state}</span>
                </div>
              </div>
            ) : null}

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

              <div className={styles.problemDiagram} aria-label="Problems and solutions overview">
                <div className={styles.problemDiagramHeader}>
                  <span>Problems</span>
                  <span>Solutions</span>
                </div>

                <div className={styles.diagramGrid}>
                  {problemSolutionPairs.map((item) => (
                    <div key={item.problem} className={styles.diagramRow}>
                      <div className={`${styles.diagramCard} ${styles.diagramProblem}`}>
                        <p>{item.problem}</p>
                      </div>
                      <div className={styles.diagramArrow} aria-hidden="true">
                        <span>→</span>
                      </div>
                      <div className={`${styles.diagramCard} ${styles.diagramSolution}`}>
                        <p>{item.solution}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.processSection}>
          <div className={styles.processHeader}>
            <p>Process &amp; Approach</p>
            <h2>How we moved from crowdsourced chaos to confident decisions.</h2>
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

