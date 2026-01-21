"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useState, useRef } from "react";
import styles from "./page.module.css";

const heroPortrait =
  "https://res.cloudinary.com/kingaat7/image/upload/v1764236243/Alajuwon3Geminiimage_or6odc.png";
const heroScreen =
  "https://res.cloudinary.com/kingaat7/image/upload/v1764239406/Canstudy_Posts_hzgm1j.png";
const aboutPortrait =
  "https://res.cloudinary.com/kingaat7/image/upload/v1764236243/Alajuwon3Geminiimage_or6odc.png";
const portfolioVisual =
  "https://www.figma.com/api/mcp/asset/bf91a885-74b5-44b6-824a-32e3de94f60f";
const highlightImageDark = "/UXImage.png";

const topUxSkills = [
  "Product Strategy",
  "Interaction Design",
  "Design Systems",
  "User Research",
  "Prototype Testing",
  "Data Visualization",
];

const cvLink = "/Alajuwon-Thomas-CV.pdf";
const emailAddress = "athoma38@gmail.com";

type ServiceHighlight = {
  id: string;
  title: string;
  variant: "dark" | "accent" | "light";
  image?: string;
  customGraphic?: "automation" | "webDesign" | "research";
};


const experiences = [
  {
    company: "CTE Inc./CDC (NVSS/NCHS Division)",
    period: "March 2022 – October 2025",
    role: "Lead Product Designer",
    details: "Led the end‑to‑end redesign of PowerApps dashboards.",
  },
  {
    company: "Canstudy Consulting Ltd. ",
    period: "July 2019 – January 2022 ",
    role: "Product Designer",
    details:
      "Transformed product development by integrating UX methodologies, and driving six‑figure growth through data‑backed design improvements.",
  },
  {
    company: "Rush The Line Inc.",
    period: "February 2018 – January 2022",
    role: "UX/UI Designer & Researcher",
    details:
      "Crafted cohesive user experiences and flows that streamline operations for airport personnel.",
  },
];

const portfolioProjects = [
  {
    title: "NKMS: Data Modernization Dashboard",
    summary:
      "A glassmorphism inspired design system for a premium food delivery experience.",
    slug: "cdc-data-platform",
    image: "https://res.cloudinary.com/kingaat7/image/upload/v1768836312/2_h1kbcm.png",
  },
  {
    title: "Rush The Line: Designing Calm in Chaos (Mobile App)",
    summary:
      "A gamified mobile companion that reduces line anxiety with delightful UI.",
    slug: "rush-the-line",
    image: "https://res.cloudinary.com/kingaat7/image/upload/v1768836312/1_yzbrhu.png",
  },
  {
    title: "True Peaks: Modern Online Booking Platform",
    summary:
      "A gamified mobile companion that reduces line anxiety with delightful UI.",
    slug: "true-peaks",
    image: "https://res.cloudinary.com/kingaat7/image/upload/v1768836312/3_bztbnw.png",
  },
];

const serviceHighlights: ServiceHighlight[] = [
  {
    id: "highlight-dark",
    title: "UX/UI Design",
    image: highlightImageDark,
    variant: "dark",
  },
  {
    id: "highlight-research",
    title: "Research",
    customGraphic: "research",
    variant: "dark",
  },
  {
    id: "highlight-accent",
    title: "Automation Workflows",
    customGraphic: "automation",
    variant: "accent",
  },
  {
    id: "highlight-light",
    title: "Web Design",
    customGraphic: "webDesign",
    variant: "light",
  },
];

const expertiseMarquee = [
  "UX Design",
  "App Design",
  "Dashboard",
  "Wireframe",
  "User Research",
  "User Testing",
];


const navItems = [
  { label: "Home", target: "home" },
  { label: "About", target: "about" },
  { label: "Resume", target: "resume" },
  { label: "Case Studies", target: "portfolio" },
  { label: "Contact", target: "contact" },
];

export default function Home() {
  const scrollToSection = useCallback((sectionId: string) => {
    if (typeof document === "undefined") return;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const [activeNav, setActiveNav] = useState("home");
  const serviceScrollRef = useRef<HTMLDivElement>(null);

  const handleNavClick = useCallback(
    (target: string) => {
      if (target === "resume") {
        if (typeof window !== "undefined") {
          window.open(
            "https://docs.google.com/document/d/1uKC4DwUgvH6eka-Xib1VkWlqszFX0CyDxlYHRZvu5oA/edit?usp=sharing",
            "_blank",
            "noopener,noreferrer"
          );
        }
        return;
      }
      setActiveNav(target);
      scrollToSection(target);
    },
    [scrollToSection]
  );

  const scrollServices = useCallback((direction: "prev" | "next") => {
    if (!serviceScrollRef.current) return;
    const container = serviceScrollRef.current;
    const cardWidth = container.querySelector("article")?.clientWidth || 0;
    const gap = 32; // Gap between cards (adjust based on CSS)
    const scrollAmount = cardWidth + gap;
    
    container.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  }, []);

  const handleEmailClick = useCallback(() => {
    if (typeof window === "undefined") return;

    const randomInt = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    let first = randomInt(3, 9);
    let second = randomInt(1, 7);
    const useAddition = Math.random() > 0.5;

    if (!useAddition && second > first) {
      [first, second] = [second, first];
    }

    const symbol = useAddition ? "+" : "-";
    const correctAnswer = useAddition ? first + second : first - second;
    const response = window.prompt(
      `Quick check to reveal email: ${first} ${symbol} ${second} = ?`
    );

    if (response === null) return;

    if (Number(response.trim()) === correctAnswer) {
      window.alert(`Email: ${emailAddress}`);
    } else {
      window.alert("Oops, try the math problem again to verify you're human.");
    }
  }, []);

  const primaryNav = navItems.slice(0, 3);
  const secondaryNav = navItems.slice(3);

  return (
    <main className={styles.main}>
      <header id="home" className={styles.hero}>
        <nav className={styles.nav}>
          <div className={styles.navGroup}>
            {primaryNav.map((item) => (
              <button
                key={item.label}
                type="button"
                className={`${styles.navButton} ${
                  activeNav === item.target ? styles.navButtonActive : ""
                }`}
                onClick={() => handleNavClick(item.target)}
                aria-current={activeNav === item.target ? "page" : undefined}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            className={styles.navBrand}
            onClick={() => scrollToSection("home")}
            aria-label="Navigate to top"
          >
            <span className={styles.navBrandBadge}>AT</span>
            <span className={styles.navBrandText}>ALAJUWON</span>
          </button>
          <div className={styles.navGroup}>
            {secondaryNav.map((item) => (
              <button
                key={item.label}
                type="button"
                className={`${styles.navButton} ${
                  activeNav === item.target ? styles.navButtonActive : ""
                }`}
                onClick={() => handleNavClick(item.target)}
                aria-current={activeNav === item.target ? "page" : undefined}
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        <div className={styles.heroGrid}>
          <div className={styles.heroText}>
            <div className={styles.heroTag}>
              <span>Hello!</span>
            </div>
            <h1 className={styles.heroTitle}>
              I’m <span>Alajuwon</span>, <br />
              Product Designer
            </h1>
            <p className={styles.heroDescription}>
              With 6+ years of crafting digital experiences, I turn ambiguous problems into shipped solutions with measurable impact.
            </p>
            <div className={styles.heroSkills}>
              <div className={styles.heroSkillsHeader}>
                <p className={styles.heroSkillsLabel}>Skills</p>
                <div className={styles.skillPills}>
                  {topUxSkills.map((skill) => (
                    <span key={skill} className={styles.skillPill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.heroSkillActions}>
                <a href={cvLink} className={styles.downloadCvButton} download>
                  Download CV
                </a>
                <button
                  type="button"
                  className={styles.ghostButton}
                  onClick={() => scrollToSection("contact")}
                >
                  Contact me
                </button>
              </div>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.heroImageFrame}>
              <Image
                src={heroScreen}
                alt="Case study preview"
                className={styles.heroScreen}
                loading="lazy"
                width={280}
                height={360}
              />
            </div>
            <div className={styles.heroReview}>
              <p className={styles.heroReviewLabel}>Connect with me</p>
              <div className={styles.heroSocialIcons}>
                <a
                  className={styles.heroSocialButton}
                  href="https://www.linkedin.com/in/alajuwonthomas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                >
                  <LinkedInIcon />
                </a>
                <a
                  className={styles.heroSocialButton}
                  href="https://github.com/Alajuwon"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                >
                  <GitHubIcon />
                </a>
                <button
                  type="button"
                  className={styles.heroSocialButton}
                  onClick={handleEmailClick}
                  aria-label="Email me"
                >
                  <MailIcon />
                </button>
              </div>
            </div>
          </div>
        </div>

      </header>

      <section className={styles.servicesSection} id="services">
        <div className={styles.serviceHero}>
          <div>
            <p className={styles.sectionLabel}>My Specialties</p>
            <h2>
              <span>What I Do</span>
            </h2>
          </div>
          <p>
            I specialize in crafting user-centered digital experiences that enhance operational efficiency and drive business outcomes.
          </p>
        </div>
        <div className={styles.serviceHighlights} ref={serviceScrollRef}>
          {serviceHighlights.map((highlight) => (
            <article
              key={highlight.id}
              className={`${styles.serviceHighlightCard} ${
                highlight.variant === "accent"
                  ? styles.serviceHighlightCardAccent
                  : ""
              } ${
                highlight.variant === "light"
                  ? styles.serviceHighlightCardLight
                  : ""
              }`}
            >
              <div
                className={`${styles.serviceHighlightTop} ${
                  highlight.variant === "accent"
                    ? styles.serviceHighlightTitleAccent
                    : ""
                }`}
              >
                <h3>{highlight.title}</h3>
              </div>
              <div className={styles.serviceHighlightImage}>
                {highlight.customGraphic === "automation" ? (
                  <AutomationWorkflowGraphic />
                ) : highlight.customGraphic === "webDesign" ? (
                  <WebsiteShowcaseGraphic />
                ) : highlight.customGraphic === "research" ? (
                  <ResearchGraphic />
                ) : (
                  highlight.image && (
                    <Image
                      src={highlight.image}
                      alt={`${highlight.title} showcase`}
                      width={416}
                      height={320}
                      loading="lazy"
                    />
                  )
                )}
              </div>
            </article>
          ))}
        </div>
        <div className={styles.serviceSliderNav}>
          <button
            type="button"
            className={styles.sliderButton}
            aria-label="Previous service"
            onClick={() => scrollServices("prev")}
          >
            <span>↙</span>
          </button>
          <div className={styles.sliderDots}>
            {[0, 1, 2, 3].map((dot) => (
              <span
                key={`slider-dot-${dot}`}
                className={`${styles.sliderDot} ${
                  dot === 0 ? styles.sliderDotActive : ""
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            className={styles.sliderButton}
            aria-label="Next service"
            onClick={() => scrollServices("next")}
          >
            <span>↗</span>
          </button>
        </div>
      </section>

      <section className={styles.aboutSection} id="about">
        <div className={styles.aboutGrid}>
          <div className={styles.aboutImage}>
            <Image
              src={aboutPortrait}
              alt="About portrait"
              loading="lazy"
              width={620}
              height={520}
            />
          </div>
          <div className={styles.aboutContent}>
            <p className={styles.sectionLabel}>About me</p>
            <h2>
              About <span>Me</span>
            </h2>
            <p>
            I'm a Product Designer and UX Developer who loves turning real-world problems into digital experiences that feel simple, fast, and trustworthy. Over the last 9 years, I've worked across government, education, and travel tech—using research, clear interaction design, and hands-on UI development to move products from idea → usable → measurable.
            </p>
            <p>
            I've also always been close to the "why" behind technology. In 2017, I taught a kids coding bootcamp and later led STEM days for elementary and middle schools—teaching 1st through 8th graders Scratch, HTML, CSS, and JavaScript (usually 12–21 students per class). That work stuck with me, and today I'm on the vendor list to teach STEM days for Carroll County Schools.
            </p>
            <p>
            On the product side, I like validating ideas in the real world, not just in a deck. In 2021, I built a mobile food delivery app and ran a pilot at ATL—supporting flight attendants, CLEAR staff, and gate agents—fulfilling 80 orders and even receiving exclusive access across the airport through a CIDA badge granted by a concessions group GM. In 2022, I won the Dell for Startups pitch event and a $10,000 prize, which reinforced something I already believed: when you pair strong user insight with solid execution, people notice.
            </p>
            <button
              type="button"
              className={styles.outlineButton}
              onClick={() => scrollToSection("contact")}
            >
              Contact me
            </button>
          </div>
        </div>
      </section>

      <section className={styles.experienceSection} id="experience">
        <div className={styles.sectionHeader}>
          <p>Career Journey</p>
          <h2>
            My <span>Work Experience</span>
          </h2>
        </div>
        <div className={styles.experienceGrid}>
          <div className={styles.experienceCol}>
            {experiences.map((item) => (
              <div key={item.company} className={styles.experienceCompany}>
                <h3>{item.company}</h3>
                <p>{item.period}</p>
              </div>
            ))}
          </div>
          <div className={styles.timelineCol}>
            <div className={styles.timelineTrack}>
              {experiences.map((item) => (
                <div key={`${item.company}-dot`} className={styles.timelineDot}>
                  <span />
                </div>
              ))}
            </div>
          </div>
          <div className={styles.experienceCol}>
            {experiences.map((item) => (
              <div key={item.role} className={styles.experienceRole}>
                <h3>{item.role}</h3>
                <p>{item.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.portfolioSection} id="portfolio">
        <div className={styles.portfolioHeader}>
          <div>
            <p className={styles.sectionLabel}>Case Studies</p>
            <h2>
              Let's have a look at my <span>Projects</span>
            </h2>
          </div>
        </div>
        <div className={styles.portfolioGrid}>
          {portfolioProjects.map((project) => (
            <Link
              key={project.title}
              href={`/case-studies/${project.slug}`}
              className={styles.portfolioCard}
            >
              <div className={styles.portfolioImage}>
                <Image
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  width={720}
                  height={420}
                />
              </div>
              <div className={styles.portfolioBody}>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.ctaSection} id="contact">
        <div className={styles.ctaCard}>
          <h2>
            Have an awesome project idea? <span>Let’s discuss.</span>
          </h2>
          <form className={styles.ctaForm}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Enter email address</label>
              <input id="email" type="email" placeholder="you@email.com" />
            </div>
            <button type="submit" className={styles.primaryButton}>
              Send
            </button>
          </form>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerHeader}>
          <h2>Let’s connect there</h2>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={handleEmailClick}
          >
            Contact me
          </button>
        </div>
        <div className={styles.footerDivider} />
        <div className={styles.footerColumns}>
          <div>
            <div className={styles.logoBadge}>AT</div>
          </div>
          <div>
            <h4>Contact</h4>
            <div className={styles.heroSocialIcons}>
              <a
                className={styles.heroSocialButton}
                href="https://www.linkedin.com/in/alajuwonthomas/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
              >
                <LinkedInIcon />
              </a>
              <a
                className={styles.heroSocialButton}
                href="https://github.com/Alajuwon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
              >
                <GitHubIcon />
              </a>
              <button
                type="button"
                className={styles.heroSocialButton}
                onClick={handleEmailClick}
                aria-label="Email me"
              >
                <MailIcon />
              </button>
            </div>
          </div>
        </div>
        <div className={styles.footerDivider} />
        <div className={styles.footerBottom}>
          <span>© {new Date().getFullYear()} Alajuwon. All rights reserved.</span>
        </div>
      </footer>
    </main>
  );
}

function AutomationWorkflowGraphic() {
  return (
    <svg
      viewBox="0 0 360 220"
      role="img"
      aria-label="Automation workflow diagram"
      className={styles.workflowGraphic}
    >
      <defs>
        <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff6ee" />
          <stop offset="100%" stopColor="#ffe1c9" />
        </linearGradient>
        <linearGradient id="nodeGradientSecondary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffe4d1" />
          <stop offset="100%" stopColor="#ffc79f" />
        </linearGradient>
      </defs>
      <rect
        x="20"
        y="30"
        width="120"
        height="60"
        rx="16"
        fill="url(#nodeGradient)"
        stroke="#f8a062"
        strokeWidth="2"
      />
      <text
        x="80"
        y="65"
        textAnchor="middle"
        fontSize="16"
        fill="#b54a0a"
        fontWeight="600"
      >
        Trigger
      </text>
      <rect
        x="220"
        y="30"
        width="120"
        height="60"
        rx="16"
        fill="url(#nodeGradientSecondary)"
        stroke="#ff9a4b"
        strokeWidth="2"
      />
      <text
        x="280"
        y="55"
        textAnchor="middle"
        fontSize="16"
        fill="#b54a0a"
        fontWeight="600"
      >
        Router
      </text>
      <text
        x="280"
        y="75"
        textAnchor="middle"
        fontSize="12"
        fill="#ad5a23"
      >
        Branch logic
      </text>
      <rect
        x="120"
        y="130"
        width="120"
        height="60"
        rx="16"
        fill="url(#nodeGradient)"
        stroke="#f8a062"
        strokeWidth="2"
      />
      <text
        x="180"
        y="155"
        textAnchor="middle"
        fontSize="16"
        fill="#b54a0a"
        fontWeight="600"
      >
        Action
      </text>
      <text
        x="180"
        y="175"
        textAnchor="middle"
        fontSize="12"
        fill="#ad5a23"
      >
        Notify CRM
      </text>
      <path
        d="M140 60 H220"
        stroke="#ffd4b8"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M80 90 V150"
        stroke="#ffd4b8"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M280 90 V150"
        stroke="#ffd4b8"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="80" cy="150" r="6" fill="#ffe1c9" />
      <circle cx="280" cy="150" r="6" fill="#ffe1c9" />
      <circle cx="140" cy="60" r="6" fill="#ffe1c9" />
      <circle cx="220" cy="60" r="6" fill="#ffe1c9" />
    </svg>
  );
}

function WebsiteShowcaseGraphic() {
  return (
    <svg
      viewBox="0 0 360 220"
      role="img"
      aria-label="Web design gallery mockups"
      className={styles.websiteGraphic}
    >
      <defs>
        <linearGradient id="webBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#151a2a" />
          <stop offset="100%" stopColor="#070b15" />
        </linearGradient>
        <linearGradient id="webCard" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#eaf0ff" />
        </linearGradient>
        <linearGradient id="webAccent" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffd2b5" />
          <stop offset="100%" stopColor="#ff8f3a" />
        </linearGradient>
        <linearGradient id="webMuted" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d8dff1" />
          <stop offset="100%" stopColor="#c6d0ea" />
        </linearGradient>
      </defs>
      <rect width="360" height="220" rx="28" fill="url(#webBg)" />
      <rect
        x="24"
        y="28"
        width="312"
        height="164"
        rx="26"
        fill="rgba(255,255,255,0.08)"
        stroke="rgba(255,255,255,0.15)"
      />
      <rect
        x="46"
        y="48"
        width="268"
        height="124"
        rx="20"
        fill="url(#webCard)"
        stroke="#d4def2"
      />
      <rect
        x="58"
        y="64"
        width="244"
        height="14"
        rx="7"
        fill="#f4f6ff"
      />
      <circle cx="70" cy="71" r="3" fill="#ffb78d" />
      <circle cx="82" cy="71" r="3" fill="#ffd8c2" />
      <circle cx="94" cy="71" r="3" fill="#ffe9dc" />
      <rect
        x="70"
        y="88"
        width="124"
        height="74"
        rx="14"
        fill="url(#webMuted)"
        stroke="#dbe3f6"
      />
      <rect
        x="80"
        y="100"
        width="68"
        height="10"
        rx="5"
        fill="#c5cee6"
      />
      <rect
        x="80"
        y="118"
        width="98"
        height="10"
        rx="5"
        fill="#cfd7ee"
      />
      <rect
        x="80"
        y="136"
        width="84"
        height="10"
        rx="5"
        fill="#dde2f4"
      />
      <rect
        x="210"
        y="88"
        width="84"
        height="74"
        rx="14"
        fill="#fdf4ec"
        stroke="#ffe1c9"
      />
      <rect x="222" y="100" width="60" height="12" rx="6" fill="#ffc293" />
      <rect x="222" y="118" width="48" height="10" rx="5" fill="#ffd8ba" />
      <rect x="222" y="134" width="54" height="10" rx="5" fill="#ffe8d4" />
      <rect x="222" y="150" width="42" height="10" rx="5" fill="#fff4ea" />
      <rect
        x="70"
        y="172"
        width="224"
        height="32"
        rx="12"
        fill="#f7f9ff"
        stroke="#dfe6f8"
      />
      <rect x="82" y="182" width="48" height="12" rx="6" fill="#c0cae5" />
      <rect x="136" y="182" width="48" height="12" rx="6" fill="#d1d9f0" />
      <rect x="190" y="182" width="48" height="12" rx="6" fill="#dee5f7" />
      <rect x="244" y="182" width="38" height="12" rx="6" fill="#ecf0fb" />
      <rect
        x="196"
        y="36"
        width="118"
        height="78"
        rx="18"
        fill="url(#webCard)"
        stroke="#dde4f5"
      />
      <rect x="212" y="50" width="86" height="10" rx="5" fill="#cad3ea" />
      <rect x="212" y="66" width="72" height="10" rx="5" fill="#dfe5f6" />
      <rect
        x="212"
        y="82"
        width="64"
        height="20"
        rx="10"
        fill="url(#webAccent)"
      />
      <rect
        x="46"
        y="32"
        width="80"
        height="60"
        rx="14"
        fill="#111829"
        opacity="0.9"
      />
      <rect
        x="54"
        y="44"
        width="64"
        height="12"
        rx="6"
        fill="url(#webAccent)"
      />
      <rect
        x="54"
        y="62"
        width="52"
        height="8"
        rx="4"
        fill="#dbe1f2"
      />
    </svg>
  );
}

function ResearchGraphic() {
  return (
    <svg
      viewBox="0 0 360 220"
      role="img"
      aria-label="Research and discovery diagram"
      className={styles.workflowGraphic}
    >
      <defs>
        <linearGradient id="researchBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff6ee" />
          <stop offset="100%" stopColor="#ffe1c9" />
        </linearGradient>
        <linearGradient id="researchCard" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#fff6ee" />
        </linearGradient>
        <linearGradient id="researchAccent" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffd2b5" />
          <stop offset="100%" stopColor="#ff8f3a" />
        </linearGradient>
      </defs>
      <rect width="360" height="220" rx="28" fill="url(#researchBg)" />
      
      {/* User icon */}
      <circle cx="80" cy="60" r="24" fill="url(#researchAccent)" />
      <circle cx="80" cy="52" r="8" fill="#ffffff" />
      <path
        d="M 60 85 Q 60 75 80 75 Q 100 75 100 85"
        stroke="#ffffff"
        strokeWidth="4"
        fill="none"
      />
      
      {/* Interview/Notes card */}
      <rect
        x="140"
        y="40"
        width="180"
        height="80"
        rx="16"
        fill="url(#researchCard)"
        stroke="#ffd4b8"
        strokeWidth="2"
      />
      <rect x="156" y="56" width="120" height="8" rx="4" fill="#ffc79f" />
      <rect x="156" y="72" width="148" height="8" rx="4" fill="#ffe4d1" />
      <rect x="156" y="88" width="100" height="8" rx="4" fill="#ffe4d1" />
      <rect x="280" y="88" width="40" height="8" rx="4" fill="url(#researchAccent)" />
      
      {/* Data/Analytics card */}
      <rect
        x="40"
        y="140"
        width="140"
        height="60"
        rx="14"
        fill="url(#researchCard)"
        stroke="#ffd4b8"
        strokeWidth="2"
      />
      <rect x="56" y="156" width="80" height="10" rx="5" fill="#ffc79f" />
      <rect x="56" y="174" width="60" height="8" rx="4" fill="#ffe4d1" />
      <rect x="56" y="186" width="70" height="8" rx="4" fill="#ffe4d1" />
      
      {/* Insights card */}
      <rect
        x="200"
        y="140"
        width="140"
        height="60"
        rx="14"
        fill="url(#researchCard)"
        stroke="#ffd4b8"
        strokeWidth="2"
      />
      <circle cx="220" cy="165" r="6" fill="url(#researchAccent)" />
      <circle cx="250" cy="165" r="6" fill="#ffc79f" />
      <circle cx="280" cy="165" r="6" fill="#ffe4d1" />
      <rect x="220" y="180" width="100" height="8" rx="4" fill="#ffe4d1" />
      
      {/* Connection lines */}
      <path
        d="M 104 60 L 140 80"
        stroke="#ffd4b8"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="4 4"
      />
      <path
        d="M 120 170 L 200 170"
        stroke="#ffd4b8"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="4 4"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-hidden="true"
      focusable="false"
      className={styles.socialIcon}
    >
      <path
        fill="currentColor"
        d="M4.983 3.5a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5ZM3 9h3.967v12H3V9Zm7.358 0H14v1.86h.049c.651-1.233 2.245-2.533 4.622-2.533C22.556 8.327 23 11 23 14.552V21H19v-5.25c0-1.253-.022-2.868-1.746-2.868-1.748 0-2.015 1.366-2.015 2.777V21h-3.881V9Z"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-hidden="true"
      focusable="false"
      className={styles.socialIcon}
    >
      <path
        fill="currentColor"
        d="M12 .5C5.648.5.5 5.648.5 12a11.5 11.5 0 0 0 7.86 10.926c.575.105.785-.249.785-.553 0-.274-.01-1-.016-1.964-3.2.696-3.876-1.542-3.876-1.542-.523-1.33-1.278-1.684-1.278-1.684-1.045-.715.08-.701.08-.701 1.156.082 1.765 1.188 1.765 1.188 1.028 1.763 2.697 1.254 3.354.959.104-.744.402-1.254.73-1.543-2.554-.291-5.238-1.278-5.238-5.689 0-1.256.448-2.283 1.184-3.087-.119-.29-.513-1.461.113-3.048 0 0 .965-.309 3.163 1.178a10.902 10.902 0 0 1 5.758 0c2.197-1.487 3.161-1.178 3.161-1.178.628 1.587.234 2.758.115 3.048.737.804 1.183 1.83 1.183 3.087 0 4.422-2.688 5.395-5.252 5.68.414.357.783 1.06.783 2.137 0 1.543-.014 2.787-.014 3.166 0 .306.208.663.791.55A11.503 11.503 0 0 0 23.5 12C23.5 5.648 18.352.5 12 .5Z"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-hidden="true"
      focusable="false"
      className={styles.socialIcon}
    >
      <path
        fill="currentColor"
        d="M3 5.75C3 4.784 3.784 4 4.75 4h14.5C20.216 4 21 4.784 21 5.75v12.5c0 .966-.784 1.75-1.75 1.75H4.75C3.784 20 3 19.216 3 18.25Zm1.75-.25a.25.25 0 0 0-.25.25v.383l7.5 4.687 7.5-4.687V5.75a.25.25 0 0 0-.25-.25Zm14.5 3.184-5.641 3.524 5.641 3.71Zm-1.096 7.882-6.154-4.048-6.154 4.048h12.308Zm-13.404-.648 5.64-3.71-5.64-3.524Z"
      />
    </svg>
  );
}

function MarqueeStar() {
  return (
    <svg
      className={styles.marqueeStar}
      viewBox="0 0 34 34"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M17 2l3.8 8.7 9.5 1.1-7.1 6.1 2.2 9.4L17 22.7l-8.4 4.6 2.2-9.4L3.7 11.8l9.5-1.1L17 2z"
        fill="#ff8f3a"
      />
    </svg>
  );
}

