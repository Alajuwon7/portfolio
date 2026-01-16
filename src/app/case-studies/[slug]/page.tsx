import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import { notFound } from "next/navigation";

import { caseStudies, getCaseStudy } from "@/data/caseStudies";

import HeroMedia from "./HeroMedia";
import DesignShowcaseCarousel from "./DesignShowcaseCarousel";
import StepGallery from "./StepGallery";
import Timeline from "./Timeline";
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

export async function generateMetadata(
  props: {
    params: Promise<{ slug: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const { slug } = params;
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

export default function CaseStudyPage(props: CaseStudyPageProps) {
  const params = use(props.params);
  const { slug } = params;
  const study = getCaseStudy(slug);

  if (!study) {
    notFound();
  }

  const heroMeta = [
    { label: "Project Type", value: study.hero.projectType },
    { label: "Year", value: study.hero.year },
    { label: "Version", value: study.hero.duration },
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

  const problemSolutionPairs: Array<{
    problem: React.ReactNode;
    solution: React.ReactNode;
  }> = isRushCaseStudy
    ? [
        {
          problem:
            <>
              <mark style={{ backgroundColor: "#fff59d" }}>
                Airport travelers are forced to make high-stakes decisions under extreme time
                pressure
              </mark>
              —often while walking, carrying bags, managing kids, or navigating accessibility
              constraints—yet today’s tools don’t help them answer the only question that matters in
              the moment: “Am I on track?”
              <mark style={{ backgroundColor: "#fff59d" }}>
                The core issue isn’t lack of information; it’s lack of decision-grade clarity.
              </mark>{" "}
              Real-time signals are fragmented across airline updates, TSA conditions, maps, and
              vendor systems, and they frequently conflict, lag, or go offline. Even when apps show
              “live” updates, they rarely communicate data reliability—so a gate change from 45
              minutes ago can appear as credible as one from 2 minutes ago.{" "}
              <mark style={{ backgroundColor: "#fff59d" }}>
                Users can’t quickly judge what to trust, what to ignore, or what action to take.
              </mark>
              Generic navigation assumes one “average” user, but airport decisions depend on
              context and constraints: wheelchair users need accessible routes, families need
              nursing rooms and restrooms, business travelers optimize for lounges and speed, and
              different people carry different risk tolerance—from highly buffered planners to
              last-minute movers.{" "}
              <mark style={{ backgroundColor: "#fff59d" }}>
                Without a system that adapts to these differences and translates messy signals into
                a clear recommendation, travelers default to guessing, over-buffering, or missing
                key moments—resulting in avoidable stress, wasted time, and missed connections
              </mark>
              .
            </>,
          solution: (
            <>
              <mark style={{ backgroundColor: "#fff59d" }}>
                Rush The Line turns fragmented airport signals into one trusted, time-aware
                decision system.
              </mark>{" "}
              Instead of dumping “real-time” info with no credibility cues, RTL makes every update
              actionable by attaching provenance + reliability + freshness: source (official vs
              crowdsourced), confidence (high/med/low), and “last updated” age—so a 2-minute gate
              change is instantly distinguishable from stale noise.
              <mark style={{ backgroundColor: "#fff59d" }}>
                At the center is a persistent Decision Cockpit that answers the only question that
                matters in motion: “Am I on track?
              </mark>{" "}
              RTL continuously calculates a traveler’s dynamic risk score by combining walking time,
              queue estimates, gate status, and time-to-board—then converts it into a clear
              recommendation (“Leave now,” “You’re safe for a quick stop,” “Reroute to Checkpoint
              B”) with a visible explanation (“Why this”) to preserve trust.
              <mark style={{ backgroundColor: "#fff59d" }}>
                It personalizes routing and suggestions based on access needs, companion context,
                and preferences
              </mark>{" "}
              (wheelchair routes, nursing rooms, lounges, dietary filters), and it learns the
              user’s risk tolerance over time—tight vs buffered travelers—so guidance stays aligned
              with how they actually move.
              <mark style={{ backgroundColor: "#fff59d" }}>
                RTL degrades gracefully using confidence-based fallbacks and lightweight user
                verification, ensuring the experience remains reliable even when the environment
                isn’t.
              </mark>
            </>
          ),
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
                  {problemSolutionPairs.map((item, idx) => (
                    <div key={`problem-solution-${idx}`} className={styles.diagramRow}>
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
                  <h3 className={styles.stepTitle}>
                    {step.title === "Step 01 — Field research & journey mapping"
                      ? "Step 01 — Discovery & jobs-to-be-done framework"
                      : step.title}
                  </h3>
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
            <h2>
              {isRushCaseStudy
                ? "Key screens showing transparency-first design in action."
                : "Artifacts that prove the evolution of the system."}
            </h2>
            {isRushCaseStudy ? (
              <p className={styles.showcaseSubtext}>
                Still actively testing and iterating: trust signals on every update and
                glanceable decision support.
                Each screen reflects the patterns we're validating through testing—designed
                for travelers making high-stakes decisions under time pressure.
              </p>
            ) : null}
          </div>
          <DesignShowcaseCarousel
            slides={study.designShowcase.images}
            isRushCaseStudy={isRushCaseStudy}
            enableFidelityToggle={isRushCaseStudy}
          />
        </section>

        <section className={styles.decisionsSection}>
          <div className={styles.decisionsHeader}>
            <div>
              <p>App Feature Release</p>
              <h2>Rush The Line Timeline</h2>
            </div>
            <a
              href="https://rushtheline.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.joinBetaButton}
            >
              Join Waitlist
            </a>
          </div>

          <Timeline
            milestones={[
              {
                date: "DEC 2025",
                title: "Launched Beta",
                description: "",
                status: "completed",
                icon: "rocket",
              },
              {
                date: "FEB 2026",
                title: "Travel Feed",
                description: "",
                status: "completed",
                icon: "check",
              },
              {
                date: "APR 2026",
                title: "",
                description: "",
                status: "future",
                icon: "check",
              },
              {
                date: "JUN 2026",
                title: "",
                description: "",
                status: "future",
                icon: "check",
              },
              {
                date: "AUG 2026",
                title: "",
                description: "",
                status: "future",
                icon: "check",
              },
              {
                date: "NOV 2026",
                title: "",
                description: "",
                status: "future",
                icon: "check",
              },
            ]}
          />
        </section>

        {!isRushCaseStudy && (
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
        )}

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

