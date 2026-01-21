export type CaseStudyHero = {
  title: string;
  subtitle: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
    link?: string;
  };
  projectType: string;
  year: string;
  duration: string;
  role: string;
  platform?: string;
  client?: {
    name: string;
    logo?: string;
  };
  modal?: {
    title: string;
    subtitle: string;
    paragraphs: string[];
  };
};

export type CaseStudyOverview = {
  challenge: string;
  role: string;
  outcome: {
    stat: string;
    label: string;
    description: string;
  };
};

export type CaseStudy = {
  slug: string;
  hero: CaseStudyHero;
  overview: CaseStudyOverview;
  problem: {
    title: string;
    context: string[];
    quote?: {
      text: string;
      author: string;
      role?: string;
    };
    supportingImage?: CaseStudyHero["image"];
  };
  process: {
    steps: Array<{
      title: string;
      description: string;
      image?: CaseStudyHero["image"];
      gallery?: Array<CaseStudyHero["image"]>;
      extraDetails?: Array<{
        heading: string;
        items: string[];
      }>;
    }>;
  };
  designShowcase: {
    images: Array<{
      id: string;
      category:
        | "Wireframe"
        | "Mid-fi"
        | "Hi-fi"
        | "Final"
        | "Discovery"
        | "Flow Chart"
        | "Low-Fi"
        | "Hi-Fi Redesign";
      caption: string;
      link?: string;
      video?: string;
      hiFiSrc?: string;
      hiFiCaption?: string;
      image: CaseStudyHero["image"];
    }>;
  };
  results: {
    metrics: Array<{
      value: string;
      label: string;
      description?: string;
    }>;
    testimonial?: {
      quote: string;
      author: string;
      role?: string;
    };
  };
  learnings: {
    takeaways: string[];
    differently?: string[];
  };
  toolsUsed?: string[];
  techStack?: {
    frontend: string;
    backend: string;
    language: string;
    state: string;
    other?: string;
  };
  navigation: {
    previous?: {
      slug: string;
      title: string;
    };
    next?: {
      slug: string;
      title: string;
    };
  };
  keyDecisions?: Array<{
    title: string;
    context: string;
    options: string;
    decision: string;
    outcome: string;
  }>;
};

const createPlaceholderImage = (label: string) => {
  const safeLabel = label
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const svg = `
    <svg width="1440" height="900" viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${safeLabel}">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#e2e8f0"/>
          <stop offset="100%" stop-color="#f8fafc"/>
        </linearGradient>
      </defs>
      <rect width="1440" height="900" fill="url(#bg)"/>
      <rect x="150" y="90" width="1140" height="720" rx="48" fill="#f8fafc" stroke="#cbd5e1" stroke-width="10"/>
      <rect x="230" y="170" width="980" height="560" rx="38" fill="#e5e7eb" stroke="#cbd5e1" stroke-width="8" stroke-dasharray="18 14"/>
      <text x="50%" y="50%" text-anchor="middle" fill="#475569" font-family="Inter, Arial, sans-serif" font-size="42" font-weight="700" letter-spacing="1">
        ${safeLabel}
      </text>
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "cdc-data-platform",
    hero: {
      title: "CDC Data Modernization Dashboard",
      subtitle:
        "Redesigned PowerApps dashboards so NVSS epidemiologists can align on the same story in minutes, not meetings.",
      image: {
        src: "/CaseStudyCover.png",
        alt: "NVSS KMS dashboard cover showing key workflows and navigation",
        width: 1440,
        height: 1080,
      },
      projectType: "Enterprise Dashboard",
      year: "2025",
      duration: "18 Months",
      role: "Lead Product Designer",
      client: {
        name: "NVSS-NCHS",
      },
    modal: {
      title: "NVSS KMS Overview",
      subtitle: "Purpose",
      paragraphs: [
        "The NVSS NKMS provides a centralized repository of information related to jurisdictional VRO characteristics and progress reports.",
        "Core application functions allow the CoP team and technical partners to manage and maintain the information by direct data entry and data imports.",
        "Analytical functions provide NVSS data consumers with predefined reports and the ability to track progress on task completion. System administrators manage backend configurations, user access, and retrieve updates made within the system.",
      ],
    },
    },
    toolsUsed: ["Figma", "FigJam", "PowerBi", "Sharepoint database"],
    overview: {
      challenge:
        "The NVSS/NCHS needed a centralized dashboard to track 57 jurisdictions’ progress toward FHIR certification, but the landscape was chaotic. Certification guidance across the six stages was still in flux, state-level leadership turnover left new VRO staff unsure of their true status, and many jurisdictions relied on vendors to kick off pre-certification steps—creating critical visibility gaps. The team required a single source of truth to understand where each jurisdiction stood and who needed targeted outreach.",
      role: "I led discovery through delivery for the NKMS-tracking dashboard: facilitated sessions with stakeholders to document the evolving six-stage workflow, designed filterable views that surfaced jurisdictions by certification stage and barrier type (vendor dependency, system upgrades, leadership transitions), and built PowerApps reporting interfaces that stayed aligned with guidance even as that guidance matured.",
      outcome: {
        stat: "100%",
        label: "Testing participation",
        description:
          "NCHS leadership gained real-time visibility into FHIR modernization progress and shifted to targeted outreach. 100% of jurisdictions completed an NVSS/NCHS testing event, 14+ states are now live with FHIR, and another 25+ are actively progressing from pre-certification into certification.",
      },
    },
    problem: {
      title: "Fragmented reporting slowed national response",
      context: [
        "Without centralized tracking, outreach was reactive instead of strategic. Analysts couldn’t distinguish between a jurisdiction waiting on a vendor versus one whose program lead had just changed and needed re-onboarding. Tentative certification timelines created a false sense of flexibility—jurisdictions delayed action, assuming they had more runway than they did.",
        "When it came time to accelerate compliance, the team had no way to prioritize who needed a quick nudge versus who required hands-on support. Every follow-up demanded manual investigation before a single email could be sent.",
      ],
      quote: {
        text: "We spent more time confirming if a trend was real than communicating what to do about it.",
        author: "NVSS Epidemiologist",
        role: "State Integrations Lead",
      },
      supportingImage: {
        src: "https://res.cloudinary.com/kingaat7/image/upload/v1764239406/Canstudy_Posts_hzgm1j.png",
        alt: "Heatmap showing inconsistent jurisdiction dashboards",
        width: 1280,
        height: 720,
      },
    },
    process: {
      steps: [
        {
          title: "Step 01 — Discovery & data collection",
          description:
            "Interviewed NCHS leadership, facilitated ELC breakout sessions, and captured jurisdiction feedback from testing events. Mapped the six-stage certification workflow plus every tracking artifact—PowerApps, spreadsheets, SharePoint lists, and email threads—to expose where information fell through the cracks.",
          image: {
            src: "/CoverDiscovery.png",
            alt: "Overview board combining discovery, validation, and program staff insights.",
            width: 3354,
            height: 1616,
            link: "https://www.figma.com/board/wfh2Mlg0kXcFgHGJTqvEge/NKMS?node-id=0-1&t=jL9tFGt2UgBFioFT-1",
          },
          extraDetails: [
            {
              heading: "Research Activities",
              items: [
                "Conducted 12 stakeholder interviews across NCHS leadership, ELC coordinators, and data analysts",
                "Facilitated 3 ELC breakout sessions with jurisdiction representatives during testing events",
                "Documented 47 pain points in the existing workflow through screen recordings and user walkthroughs",
                "Mapped information flow across 4 disconnected tracking systems",
              ],
            },
            {
              heading: "Key Insights",
              items: [
                "Task fragmentation: Users needed 8+ clicks across 3 different systems to prepare for a single leadership briefing",
                "Certification stage confusion: The 6-stage pipeline wasn't clearly visualized, causing missed dependencies",
                "Role-based needs: Analysts needed bulk data views; program staff needed jurisdiction-specific histories; leadership needed aggregate progress snapshots",
              ],
            },
          ],
        },
        {
          title: "Step 02 — Design system & dashboard redesign",
          description:
            "Turned discovery insights into a Figma system of reusable patterns—stage indicators, blocker filters, jurisdiction cards, and data input panels. Partnered with a PowerApps developer to replicate the system, streamline legacy screens, and add net-new flows that closed functionality gaps.",
          image: {
            src: "/DesignSystemCover.png",
            alt: "Design system components for certification dashboard",
            width: 3384,
            height: 2044,
          },
          extraDetails: [
            {
              heading: "Design System Components Created",
              items: [
                "Stage indicator patterns covering all 6 certification stages with clear progress states",
                "Blocker filter modules that highlight technical, vendor, and policy categories",
                "Jurisdiction profile cards that standardize data display across 57 jurisdictions",
                "Data input panels templated for PowerApps-compatible forms",
              ],
            },
            {
              heading: "Navigation Paradigm Shift",
              items: [
                "Before: Jurisdiction-first structure scattered task-specific data across tabs",
                "After: Task-first navigation with role-based entry points",
              ],
            },
          ],
        },
        {
          title: "Step 03 — Validation & iteration",
          description:
            "Ran validation sessions with analysts, program staff, and CDC leadership to test retrieval speed, data accuracy, and reporting clarity. Iterated until teams could locate jurisdiction data and brief leadership in under five minutes—down from multi-step hunts across disconnected sources.",
          image: {
            src: "/MetricsCover.png",
            alt: "System performance dashboard showing consolidated progress tracking metrics",
            width: 720,
            height: 480,
          },
          extraDetails: [
            {
              heading: "Testing Protocol",
              items: [
                "Validation sessions with data analysts (focus: retrieval speed)",
                "Sessions with program staff (focus: jurisdiction briefing preparation)",
                "CDC leadership reviews (focus: reporting clarity for federal oversight)",
              ],
            },
            {
              heading: "Measurable Outcomes",
              items: [
                "Reduced leadership briefing prep time from 45+ minutes to under 5 minutes",
                "Eliminated need to cross-reference external spreadsheets for 89% of common queries",
                "Achieved 100% task completion rate for jurisdiction status lookup across all user groups",
              ],
            },
            {
              heading: "Iteration Examples",
              items: [
                "Added “last updated” timestamps after analysts requested change tracking",
                "Introduced bulk filter presets when program staff needed to quickly identify stage combinations",
                "Refined stage indicator colors based on accessibility feedback",
              ],
            },
          ],
        },
      ],
    },
    designShowcase: {
      images: [
      {
        id: "artifact-discovery-1",
        category: "Discovery",
        caption: "Stakeholder artifact board overview from discovery phase.",
        link: "https://www.figma.com/board/wfh2Mlg0kXcFgHGJTqvEge/NKMS",
        image: {
          src: "/Discovery-1.png",
          alt: "Discovery artifact board overview",
          width: 3320,
          height: 1556,
        },
      },
      {
        id: "artifact-discovery-2",
        category: "Discovery",
        caption: "Discovery artifacts highlighting research insights and themes.",
        link: "https://www.figma.com/board/wfh2Mlg0kXcFgHGJTqvEge/NKMS",
        image: {
          src: "/Discovery-2.png",
          alt: "Discovery artifacts highlighting research insights and themes",
          width: 3432,
          height: 1608,
        },
      },
      {
        id: "artifact-discovery-3",
        category: "Discovery",
        caption: "User journeys and early synthesis from discovery workshops.",
        link: "https://www.figma.com/board/wfh2Mlg0kXcFgHGJTqvEge/NKMS",
        image: {
          src: "/Discovery-3.png",
          alt: "User journeys and early synthesis from discovery workshops",
          width: 3036,
          height: 1310,
        },
      },
      {
        id: "artifact-discovery-4",
        category: "Discovery",
        caption: "Detailed research board showing pain points and opportunities.",
        link: "https://www.figma.com/board/wfh2Mlg0kXcFgHGJTqvEge/NKMS",
        image: {
          src: "/Discovery-4.png",
          alt: "Detailed research board showing pain points and opportunities",
          width: 3208,
          height: 1842,
        },
      },
      {
        id: "artifact-discovery-5",
        category: "Discovery",
        caption: "Consolidated discovery artifacts for stakeholder alignment.",
        link: "https://www.figma.com/board/wfh2Mlg0kXcFgHGJTqvEge/NKMS",
        image: {
          src: "/Discovery-5.png",
          alt: "Consolidated discovery artifacts for stakeholder alignment",
          width: 3192,
          height: 1634,
        },
      },
        {
          id: "designsystem-2",
        category: "Flow Chart",
          caption: "Dashboard redesign layouts applying the design system across views.",
          image: {
            src: "/DesignSystem-02.png",
            alt: "Dashboard redesign layouts applying the design system across views",
            width: 2504,
            height: 1772,
          },
        },
        {
          id: "designsystem-1",
          category: "Low-Fi",
          caption: "Stage indicators, filters, and jurisdiction cards from the system.",
          image: {
            src: "/DesignSytem-01.png",
            alt: "Expanded pattern library showing stage indicators, filters, and jurisdiction cards",
            width: 2712,
            height: 1562,
          },
        },
        {
          id: "designsystem-3",
          category: "Hi-Fi Redesign",
          caption: "Extended components and dashboard templates within the system.",
          image: {
            src: "/DesignSystem-03.png",
            alt: "Design system overview with extended components and dashboard templates",
            width: 7514,
            height: 3152,
          },
        },
        {
          id: "designsystem-4",
          category: "Hi-Fi Redesign",
          caption: "Interaction-heavy dashboards applying the system across multiple views.",
          image: {
            src: "/DesignSystem-04.png",
            alt: "Interaction-heavy dashboards applying the design system with multiple views",
            width: 7514,
            height: 3152,
          },
        },
        {
          id: "designsystem-5",
          category: "Hi-Fi Redesign",
          caption: "State variations and data panels within the design system.",
          image: {
            src: "/DesignSystem-05.png",
            alt: "Additional state variations and data panels within the design system",
            width: 8538,
            height: 3160,
          },
        },
        {
          id: "designsystem-6",
          category: "Hi-Fi Redesign",
          caption: "Extended dashboards with data panels and navigation built on the system.",
          image: {
            src: "/DesignSystem-06.png",
            alt: "Extended dashboards showing data panels and navigation built on the system",
            width: 8538,
            height: 3160,
          },
        },
        {
          id: "designsystem-7",
          category: "Hi-Fi Redesign",
          caption: "Micro-interaction patterns and status treatments within the system.",
          image: {
            src: "/DesignSystem-07.png",
            alt: "Micro-interaction patterns and status treatments within the design system",
            width: 2636,
            height: 956,
          },
        },
        {
          id: "designsystem-8",
          category: "Hi-Fi Redesign",
          caption: "Component variations and layout explorations for certification workflows.",
          image: {
            src: "/DesignSystem-08.png",
            alt: "Component variations and layout explorations for certification workflows",
            width: 3706,
            height: 1999,
          },
        },
        {
          id: "designsystem-9",
          category: "Hi-Fi Redesign",
          caption: "Composite dashboard views showing end-to-end system application.",
          image: {
            src: "/DesignSystem-09.png",
            alt: "Composite dashboard views demonstrating end-to-end design system application",
            width: 8538,
            height: 3160,
          },
        },
        {
          id: "artifact-modernization-video",
          category: "Hi-fi",
          caption:
            "Screen recording artifact for the jurisdiction modernization tracking and outreach initiative.",
          video: "https://res.cloudinary.com/kingaat7/video/upload/v1765565523/Screen_Recording_2025-12-12_at_1.29.38_AM_ygxyfd.mov",
          image: {
            src: "https://res.cloudinary.com/kingaat7/video/upload/v1765565523/Screen_Recording_2025-12-12_at_1.29.38_AM_ygxyfd.jpg",
            alt: "Screen recording showing jurisdiction modernization tracking and outreach flows",
            width: 1920,
            height: 1080,
          },
        },
      ],
    },
    results: {
      metrics: [
        {
          value: "89%",
          label: "Faster briefing prep",
          description: "Leadership reports reduced from 45+ minutes to under 5 minutes.",
        },
        {
          value: "40%",
          label: "Fewer clicks per session",
          description: "Centralized navigation reduced repetitive interactions across reports.",
        },
        {
          value: "100%",
          label: "Error elimination",
          description: "Dataset confusion incidents dropped from 2-3 monthly to zero.",
        },
        {
          value: "5→1",
          label: "Systems unified",
          description:
            "Replaced fragmented tracking across 5 disconnected tools with single dashboard.",
        },
      ],
      testimonial: {
        quote:
          "The redesigned NVSS dashboards turned our data into decisions. We no longer waste cycles debating whose numbers are right.",
        author: "Dr. Eunice Carter",
        role: "Director, CDC NVSS",
      },
    },
    learnings: {
      takeaways: [
        "Pairing PowerApps engineers with epidemiologists early uncovered platform constraints before they blocked our sprint goals.",
        "We needed a shared taxonomy workstream to keep design critique actionable across 50 jurisdictions.",
        "In-product validation tips earn more trust than external documentation because analysts see guidance in the moment of doubt.",
      ],
      differently: [
        "Invest in analytics instrumentation sooner—retrofit tracking cost us an extra sprint.",
        "Bring data governance leads into usability testing earlier to accelerate approvals.",
      ],
    },
    navigation: {
      next: {
        slug: "rush-the-line",
        title: "Rush The Line — Airport Companion",
      },
    },
    keyDecisions: [
      {
        title: "Centralize Dataset Selection",
        context:
          "Users selected dataset type (Mortality/Natality/Fetal Death) 3-4 times per session—once at Reports module entry, then repeatedly within individual reports. This created redundant interactions and increased risk of analyzing wrong dataset.",
        options:
          "Keep dataset selectors in every report for flexibility. Remove all selectors and infer from user role. Centralize selection at module entry, remove from individual reports.",
        decision:
          "Mapped user workflows and found dataset rarely changes mid-session. Centralizing to single entry point reduced cognitive load while maintaining flexibility when users do need to switch datasets.",
        outcome:
          "Clicks per reporting session dropped 40% (v1.9.0). Eliminated dataset selection errors that previously occurred 2-3 times monthly.",
      },
      {
        title: "Differentiate Datasets Visually",
        context:
          "Analysts supporting multiple vital statistics programs (Mortality, Natality, Fetal Death) switched between datasets multiple times daily. Uniform interface design made it easy to accidentally analyze wrong data, risking reporting errors.",
        options:
          "Add text labels to indicate current dataset. Use distinct color schemes for each dataset. Require users to confirm dataset before each action.",
        decision:
          "Color differentiation provides immediate visual feedback without requiring conscious attention. Combined with dataset indicator badges and distinct map titles to create multi-layered confirmation system.",
        outcome:
          "Dataset confusion errors dropped from 2-3 monthly incidents to zero (v1.5.0). Analysts reported increased confidence when working across programs.",
      },
      {
        title: "Optimize Screen Real Estate",
        context:
          "FHIR Validation tables contained complex multi-column data (error types, validation checks, stage progression). Sidebar layout constrained table width, forcing horizontal scrolling that made pattern identification difficult.",
        options:
          "Add horizontal scroll with sticky column headers. Collapse columns into expandable rows. Move section to full-width layout area.",
        decision:
          "Validation workflow requires scanning across columns to identify patterns (e.g., 'which jurisdictions have same error type?'). Full-width layout better supports this scanning behavior than forcing vertical navigation.",
        outcome:
          "Eliminated horizontal scrolling for complex tables (v2.0.0). Improved readability reduced cognitive load when reviewing multi-jurisdiction validation data.",
      },
    ],
  },
  {
    slug: "rush-the-line",
    hero: {
      title: "Rush The Line: Designing Calm in Chaos",
      subtitle:
        "A mobile app that calms airport anxiety with live queue insights, proactive alerts, and guided checklists for time-sensitive travelers.",
      image: {
        src: "https://res.cloudinary.com/kingaat7/image/upload/v1766802730/_Posts_enirvr.png",
        alt: "Mobile app screens showing airport companion flows",
        width: 1536,
        height: 1125,
      },
      projectType: "Consumer Mobile App",
      year: "2024–2025",
      duration: "(v10.0 Beta Phase)",
      role: "Lead Product Designer",
      platform: "iOS/Android",
      modal: {
        title: "Rush The Line Overview",
        subtitle: "Purpose",
        paragraphs: [
          "Rush The Line reduces traveler stress by surfacing real-time queue status, gate changes, and packing reminders in one mobile hub.",
          "The app guides first-time and frequent flyers through critical pre-boarding steps, provides delay contingencies, and simplifies rebooking flows.",
          "Designed for low-attention contexts with accessible, glanceable controls that still offer deep detail when the user has more time.",
        ],
      },
    },
    overview: {
      challenge:
        "Travelers faced unpredictable security lines, gate swaps, and last-minute packing confusion. Anxiety spiked close to boarding time, especially for infrequent flyers and parents traveling with kids. Existing airport apps showed static maps but couldn't answer \"Am I on track?\" or \"What do I need to do next?\"",
      role:
        "Led research, IA, and end-to-end product design. Ran usability tests in simulated airport conditions, collaborated with engineering on offline-ready flows, and delivered a reusable component library for future features.",
      outcome: {
        stat: "",
        label: "",
        description:
          "RTL is in beta now, launching the full pilot in March 2026. Early testing shows users making critical decisions in under 8 seconds, and confidence in crowdsourced data jumped from 3.8 to 4.6 out of 5 after we introduced transparency features.",
      },
    },
    techStack: {
      frontend: "React Native with Expo",
      backend: "Supabase (PostgreSQL, Auth, Storage, Realtime)",
      language: "TypeScript",
      state: "React Context API",
    },
    problem: {
      title: "Air travel anxiety spikes when timelines shift",
      context: [],
      quote: {
        text: "By the time I saw the gate change, I had already sprinted to the wrong end of the terminal.",
        author: "Frequent flier",
        role: "Pilot test participant",
      },
      supportingImage: {
        src: "https://res.cloudinary.com/kingaat7/image/upload/v1766802730/_Posts_enirvr.png",
        alt: "Three mobile screens showing control panel, room devices, and lighting",
        width: 1536,
        height: 1125,
      },
    },
    process: {
      steps: [
        {
          title: "Step 01 — Field research & journey mapping",
          description:
            "Shadowed travelers through check-in, security, and gate arrival to capture stress points. Mapped time-sensitive decisions (documents, bags, kid-handling) and where information broke down. Applied Jobs-to-be-Done framework to uncover what users truly “hire” an airport app to do: answer “Am I on track?” before anything else. Validated through trust testing that data source transparency builds confidence more than numeric scores.",
          gallery: [
            {
              src: "https://res.cloudinary.com/kingaat7/image/upload/v1767083360/DiscoveryJTBD_vbxvqk.png",
              alt: "JTBD discovery artifacts and early journey mapping",
              width: 3000,
              height: 1385,
              link: "https://www.figma.com/board/6TnrggvkPN6yANycfCA8D8/RTL--Airport-Optimization-App?node-id=0-1&t=dALEhJF7Y81dlQ1d-1",
            },
          ],
          extraDetails: [
            {
              heading: "Key JTBD Insight",
              items: [
                'When travelers open RTL, they are "hiring" it to answer binary questions: "Am I on track to my gate?" and "What do I need to do next?"',
                "Secondary needs (dining, shopping, lounges) only emerge after the primary anxiety is resolved.",
              ],
            },
          ],
        },
        {
          title: "Step 02 — Information architecture & design patterns",
          description:
            'Designed a layered IA where the most critical question—"Am I on track?"—gets answered in under 6 seconds via a persistent Decision Cockpit card. Built progressive disclosure patterns for drill-down decisions.',
          gallery: [
            {
              src: "https://res.cloudinary.com/kingaat7/image/upload/v1767089387/IA_PrincBackground_Shadow_uzlv8f.png",
              alt: "IA principles and decision support patterns overview",
              width: 2504,
              height: 1772,
            },
          ],
          extraDetails: [
            {
              heading: "Key Patterns",
              items: [
                'Glanceable "Now" State: The "Am I on track?" answer lives in a persistent top card—never nested, never hidden.',
                "Progressive Disclosure for Depth: Secondary actions sit one tap away in a Quick Actions grid.",
                "Reusable Trust Patterns: Every update card displays data source badge, confidence level, timestamp, and priority color border",
              ],
            },
          ],
        },
        {
          title: "Step 03 — Usability testing & design refinement",
          description:
            "Tested hi-fi Figma prototypes with frequent and infrequent travelers. Early sessions still showing users could complete critical decisions in under 10 seconds but need notification reasoning, not just timing. Iterating offline checklist based on feedback.",
          gallery: [
            {
              src: "https://res.cloudinary.com/kingaat7/image/upload/v1767123516/Step3DesignIteration._ecwwrd.png",
              alt: "Hi-fi mobile UI components and states",
              width: 2636,
              height: 956,
            },
          ],
          extraDetails: [
            {
              heading: "Improvements from Testing",
              items: [
                'Testing Approach: Ran think-aloud usability sessions with realistic scenarios: "Your flight boards in 47 minutes and you\'re at the airport entrance."',
                'Early Insights on Time-to-Decision: Users don\'t trust bare commands like "Leave now." Adding context ("Leave in 8 min to maintain comfortable buffer") increased confidence and compliance.',
                "Redesigned v2 (3 essential steps): Screenshot boarding pass + gate number; check security wait (app caches automatically); enable offline mode in settings.",
              ],
            },
          ],
        },
      ],
    },
    designShowcase: {
      images: [
        {
          id: "rtl-hub-home",
          category: "Low-Fi",
          caption:
            "Hub screen brings the next milestone, quick actions, and live updates into one view so travelers see what matters first, then dive deeper only when needed.",
          image: {
            src: createPlaceholderImage("Travel Feed Hub"),
            alt: "Travel hub screen with next milestone, quick actions, and live updates",
            width: 1440,
            height: 900,
          },
          hiFiSrc: "/Splash2.png",
          hiFiCaption:
            "Welcome splash screen introduces Rush The Line with the app logo and tagline. The gradient-styled 'R' logo with motion lines communicates speed and efficiency, setting the tone for a travel companion that helps users move through airports quickly.",
        },
        {
          id: "rtl-home-decision-cockpit",
          category: "Low-Fi",
          caption:
            'Decision Cockpit — All critical information in one glanceable view. No menu diving. Users answer "Am I on track?" in under 3 seconds, addressing the #1 pain point from pre-pilot research: uncertainty in unfamiliar airports.',
          image: {
            src: createPlaceholderImage("Decision Cockpit Screen"),
            alt: "Decision Cockpit home screen summarizing on-track status",
            width: 1440,
            height: 900,
          },
          hiFiSrc: "/Splash3.png",
          hiFiCaption:
            "Real-time navigation onboarding screen highlights the core value proposition with a location pin icon. The screen introduces key features—live updates and smart timing—helping first-time users understand how the app transforms airport navigation with AI-powered route optimization.",
        },
        {
          id: "rtl-trust-signals-feed",
          category: "Low-Fi",
          caption:
            "Trust signals integrated into every update: data source badges (Official vs. Crowdsourced), confidence levels (High/Medium/Low), and color-coded timestamps. Priority borders guide attention—red for urgent, purple for moderate, gray for info.",
          image: {
            src: "/rtl-trust-signals-feed.png",
            alt: "Real-time updates feed with trust badges and timestamps",
            width: 1440,
            height: 900,
          },
          hiFiSrc: "/Splash1.png",
          hiFiCaption:
            "AI-powered assistance splash screen showcases intelligent features with a sparkle icon. Three feature cards—Smart Routes, Crowd Alerts, and Security Estimates—demonstrate how AI personalizes the experience by finding optimal paths, avoiding crowds, and providing wait time predictions before arrival.",
        },
        {
          id: "rtl-journey-timeline",
          category: "Low-Fi",
          caption:
            "Journey Timeline shows travelers where they are in the airport experience. Completed stages fade to gray, current stage highlights in purple, upcoming stages show ETA. Reduces cognitive load by filtering out irrelevant information.",
          image: {
            src: createPlaceholderImage("Journey Timeline"),
            alt: "Airport stages timeline with current progress indicator",
            width: 1440,
            height: 900,
          },
          hiFiSrc: "/LoadingScreen.png",
          hiFiCaption:
            "Loading screen maintains user engagement during app initialization. The personalized messaging ('Loading Your Experience') and animated progress indicators reassure users that their customized feed is being prepared, reducing perceived wait time and setting expectations for personalized content.",
        },
        {
          id: "rtl-progressive-disclosure",
          category: "Low-Fi",
          caption:
            "Progressive disclosure in action: summary view prevents information overload, but users can tap to understand the math. A/B testing shows users fell more confident when they could see the reasoning (4.6/5) vs. bare commands (3.2/5).",
          image: {
            src: createPlaceholderImage("Calculation Breakdown"),
            alt: "Progressive disclosure showing calculation breakdown for timing",
            width: 1440,
            height: 900,
          },
          hiFiSrc: "/RTLlogin.png",
          hiFiCaption:
            "Sign-in screen provides a streamlined authentication experience with email and password fields. The toggle between 'Sign In' and 'Create Account' tabs, along with staff mode options and password recovery links, ensures quick access for both travelers and airport personnel. The gradient-branded design maintains visual consistency with the onboarding flow.",
        },
        {
          id: "rtl-offline-mode",
          category: "Low-Fi",
          caption:
            "Offline-ready architecture prevents the app from becoming useless when airport Wi-Fi drops. Cached data surfaces with clear warnings, and manual alternatives direct users to physical resources (monitors, staff). Early testing: 89% successfully navigated with no connectivity.",
          image: {
            src: createPlaceholderImage("Offline Mode"),
            alt: "Offline mode screen illustrating graceful degradation pattern",
            width: 1440,
            height: 900,
          },
          hiFiSrc: "/FlightModal.png",
          hiFiCaption:
            "Flight Information modal unlocks terminal-specific features by collecting flight details. The modal supports both flight number and confirmation code entry, with clear instructions and examples. The warning about airport locking ensures users understand that flight entry enables precise, location-aware updates and prevents accidental airport switching mid-journey.",
        },
        {
          id: "rtl-profile-hub",
          category: "Low-Fi",
          caption:
            "Profile hub centralizes traveler identity, preferences, and support shortcuts so guidance and notifications stay personalized wherever they are in the journey.",
          image: {
            src: createPlaceholderImage("Profile Hub"),
            alt: "Profile screen with traveler details and preferences",
            width: 1440,
            height: 900,
          },
          hiFiSrc: "/AIModal.png",
          hiFiCaption:
            "AI Summary modal surfaces real-time insights aggregated from Terminal B traveler reports. The summary presents key metrics—TSA wait times, crowded areas, trending topics, and verified staff reports—in a scannable format. This on-demand intelligence helps users make informed decisions about where to go, what to avoid, and when to move, all contextualized to their current terminal.",
        },
      ],
    },
    results: {
      metrics: [
        {
          value: "92%",
          label: "Users felt calmer pre-boarding",
          description: "Surveyed after a 2-week pilot across 3 airports.",
        },
        {
          value: "18%",
          label: "Increase in on-time gate arrival",
          description: "Measured via voluntary location pings and boarding scans.",
        },
        {
          value: "4.7/5",
          label: "Usability score",
          description: "Post-session SUS score from 24 participants.",
        },
      ],
    },
    learnings: {
      takeaways: [
        "Glanceable states matter more than perfect fidelity when users are in motion.",
        "Batching alerts reduces notification fatigue and improves compliance.",
        "Offline-first design is essential in airports with spotty Wi‑Fi.",
      ],
      differently: [
        "Test earlier with true offline conditions to tune asset caching.",
        "Pilot family-specific flows sooner to validate kid-travel checklists.",
      ],
    },
    navigation: {
      previous: {
        slug: "cdc-data-platform",
        title: "CDC Data Modernization Dashboard",
      },
      next: {
        slug: "true-peaks",
        title: "True Peaks: Modern Online Booking Platform",
      },
    },
    keyDecisions: [
      {
        title: "Prioritize glanceable over deep data",
        context: "Users in transit can’t process dense screens while walking with luggage.",
        options: "Dense dashboard vs. simplified tiles with drill-down modals.",
        decision: "Used a glance-first layout with modal detail only when needed.",
        outcome: "Higher task completion one-handed; fewer missed alerts.",
      },
      {
        title: "Bundle notifications",
        context: "Multiple alerts during disruptions overwhelmed users.",
        options: "Separate alerts per event vs. single actionable card.",
        decision: "Bundled gate change, delay info, and next best action into one card.",
        outcome: "Reduced notification fatigue; faster acknowledgment.",
      },
      {
        title: "Offline-first boarding",
        context: "Airport Wi‑Fi is unreliable near gates.",
        options: "Require connectivity vs. cached passes and directions.",
        decision: "Cached passes, maps, and checklists locally with periodic refresh.",
        outcome: "Usable even when the network dropped during boarding.",
      },
    ],
  },
  {
    slug: "true-peaks",
    hero: {
      title: "True Peaks: From Paper-Based Operations to a Secure, Data-Driven Platform",
      subtitle:
        "Modernized booking, client portals, and real-time dashboards—cutting reporting from 3 days to instant while improving recommendation accuracy from 68% to 93%.",
      image: {
        src: "https://res.cloudinary.com/kingaat7/image/upload/v1768870204/TPHero2_ylaumc.png",
        alt: "True Peaks booking platform dashboard and client portal",
        width: 1536,
        height: 1125,
      },
      projectType: "Client Dashboard",
      year: "2024",
      duration: "(v1.0)",
      role: "Assistant UX Developer",
      platform: "Web App",
      modal: {
        title: "True Peaks Overview",
        subtitle: "Purpose",
        paragraphs: [
          "True Peaks modernized a paper-based booking system into a secure, data-driven platform with client portals and real-time dashboards.",
          "The platform streamlines operations, reduces reporting time from 3 days to instant, and improves recommendation accuracy significantly.",
        ],
      },
    },
    toolsUsed: ["Figma", "FigJam", "GitHub", "LLM", "Supabase"],
    techStack: {
      frontend: "Web app stack",
      backend: "Secure authentication pipeline, role-based access controls",
      language: "TypeScript",
      state: "N/A",
      other: "Reporting dashboard + PDF generation module",
    },
    overview: {
      challenge:
        "True Peaks is a drug/alcohol testing services company that relied on paper-based workflows for appointments and blood draws, which caused lost documents, inconsistent processes, and slow reporting that limited leadership's ability to manage performance and scale.",
      role:
        "As the UX Researcher, I mapped end-to-end workflows across owner/admin/dispatcher roles, validated operational pain points, and translated them into requirements for a modern platform that centralized scheduling, a blood draw log (replacing manual file sorting with clickable agency records), real-time dashboards for volume and peak-hour insights, and one-click PDF generation/download for recordkeeping. As the Assistant UX Developer, I supported the implementation of core UI flows and reporting interactions while helping introduce a secure, compliant access pattern after discovering admins were emailing vulnerable PDFs—addressed through an authentication pipeline using officer-number verification and role-based permissions to protect sensitive data while preserving usability.",
      outcome: {
        stat: "40+",
        label: "Contracts Managed Online",
        description:
          "The result was a scalable, data-driven system that eliminated manual entry, delivered instant reporting, improved recommendation accuracy, and enabled management of 40+ contracts online across multiple counties without increasing headcount.",
      },
    },
    problem: {
      title: "Paper-based workflows created operational bottlenecks and security risks",
      context: [
        "As the UX Researcher, I found that True Peaks' core operations ran on a paper-based workflow for appointments and blood draws, which led to lost documents, inconsistent processing, and downstream customer satisfaction issues.",
        "Reporting was also highly manual—stakeholders couldn't reliably see daily volume, peak hours, top agencies, or phlebotomist performance without time-consuming effort.",
        "A separate (and urgent) risk surfaced during research: admin users were emailing PDFs containing sensitive information, creating a compliance/security exposure tied to CLIA expectations.",
      ],
    },
    process: {
      steps: [
        {
          title: "Step 01 — Client Journey Mapping & Discovery",
          description:
            "As part of the discovery phase, I created a client journey map to visualize the current experience, identify pain points, and uncover opportunities for improvement. This guided design decisions throughout the transformation project by mapping the end-to-end client journey from awareness through follow-up and reporting.",
          gallery: [
            {
              src: "https://res.cloudinary.com/kingaat7/image/upload/v1768849592/TPMap_vnfbki.png",
              alt: "Client Journey Map showing stages from Awareness through Follow-Up & Reporting with current experience, pain points, customer emotions, and opportunities",
              width: 1920,
              height: 856,
            },
          ],
          extraDetails: [
            {
              heading: "Journey Map Stages",
              items: [
                "Stage: Awareness — Client hears about the business through word-of-mouth or local ads. Pain Points: Low clarity on offerings. Opportunities: Provide clear service listings online.",
                "Stage: Consideration — Client calls or visits to inquire. Pain Points: Inconsistent info sharing. Opportunities: Centralized info hub & FAQ on website.",
                "Stage: Appointment Booking — Manual scheduling via phone or in person. Pain Points: Time-consuming, prone to errors. Opportunities: Online booking system with confirmations.",
                "Stage: Intake Process — Manual form filling during visit. Pain Points: Data entry delays, repetitive questions. Opportunities: Digital intake forms with pre-fill options.",
                "Stage: Service Delivery — Service provided as scheduled. Pain Points: Limited personalization. Opportunities: Use intake data to personalize services.",
                "Stage: Follow-Up & Reporting — Reports prepared manually days later. Pain Points: Slow turnaround. Opportunities: Automated reporting & client portal access.",
              ],
            },
          ],
        },
        {
          title: "Step 02 — Solution: Modern, data-driven platform with secure access",
          description:
            "Delivered a modern, data-driven platform that replaced paper processes with a centralized system: a blood draw tracking + reporting dashboard (showing volume by day and peak times), a clickable agency-based log to replace file sorting, and instant PDF generation/download for recordkeeping. To address compliance risk while maintaining usability, the solution introduced a secure authentication pipeline for sensitive data access (link-based access with officer-number verification) paired with a role-based permission hierarchy (Owner/Admin/Dispatcher), enabling controlled access and real-time operational visibility without slowing teams down.",
          gallery: [
            {
              src: "https://res.cloudinary.com/kingaat7/image/upload/v1768854369/TPLogin_cy0xi2.png",
              alt: "True Peaks login screen with secure authentication",
              width: 1440,
              height: 840,
            },
          ],
        },
      ],
    },
    designShowcase: {
      images: [
        {
          id: "tp-cover",
          category: "Hi-fi",
          caption: "True Peaks platform overview showing modernized booking and client portal features.",
          image: {
            src: "https://res.cloudinary.com/kingaat7/image/upload/v1768836312/3_bztbnw.png",
            alt: "True Peaks case study cover",
            width: 1440,
            height: 840,
          },
        },
        {
          id: "tp-login",
          category: "Hi-fi",
          caption: "Secure login screen with officer-number verification and role-based access controls",
          image: {
            src: "https://res.cloudinary.com/kingaat7/image/upload/v1768854369/TPLogin_cy0xi2.png",
            alt: "True Peaks login screen",
            width: 1440,
            height: 840,
          },
        },
        {
          id: "tp-dashboard-home",
          category: "Hi-fi",
          caption: "Dashboard home view showing real-time volume metrics, peak hours, and agency-based tracking",
          image: {
            src: "https://res.cloudinary.com/kingaat7/image/upload/v1768859460/TP-Dashboard_v420jd.png",
            alt: "True Peaks dashboard home view",
            width: 1920,
            height: 1080,
          },
        },
        {
          id: "tp-dashboard-2",
          category: "Hi-fi",
          caption: "Additional dashboard view with detailed metrics and reporting features",
          image: {
            src: "https://res.cloudinary.com/kingaat7/image/upload/v1768859460/TP-Dashboard2_s0t8tc.png",
            alt: "True Peaks dashboard view 2",
            width: 1920,
            height: 1080,
          },
        },
        {
          id: "tp-before-modal",
          category: "Hi-fi",
          caption: "Interface state before modal reveals detailed information.",
          image: {
            src: "https://res.cloudinary.com/kingaat7/image/upload/v1768859460/TP-BeforeModal_sqg65q.png",
            alt: "True Peaks before modal state",
            width: 1920,
            height: 1080,
          },
        },
        {
          id: "tp-modal",
          category: "Hi-fi",
          caption: "Modal interface for detailed information and actions",
          image: {
            src: "https://res.cloudinary.com/kingaat7/image/upload/v1768859460/TP-Modal_qen9rk.png",
            alt: "True Peaks modal interface",
            width: 1920,
            height: 1080,
          },
        },
        {
          id: "tp-map",
          category: "Hi-fi",
          caption: "Client journey diagram",
          image: {
            src: "https://res.cloudinary.com/kingaat7/image/upload/v1768859459/TPMap_maup5f.png",
            alt: "True Peaks map view",
            width: 1920,
            height: 1080,
          },
        },
        {
          id: "tp-screenshot",
          category: "Hi-fi",
          caption: "Client journey map to visualize the current experience, identify pain points, and uncover opportunities for improvement.",
          image: {
            src: "https://res.cloudinary.com/kingaat7/image/upload/v1768860257/Screenshot_2026-01-19_at_5.03.20_PM_pomsqn.png",
            alt: "True Peaks platform screenshot",
            width: 1920,
            height: 1080,
          },
        },
      ],
    },
    results: {
      metrics: [
        {
          value: "3 days → Instant",
          label: "Reporting turnaround",
          description: "Cut reporting time from 3 days to instant with automated PDF generation and real-time dashboards.",
        },
        {
          value: "68% → 93%",
          label: "Recommendation accuracy",
          description: "Improved recommendation accuracy from 68% to 93% through data-driven insights.",
        },
        {
          value: "40+",
          label: "Contracts managed online",
          description: "Enabled management of 40+ contracts online across multiple counties without increasing headcount.",
        },
        {
          value: "100%",
          label: "Security compliance",
          description: "Eliminated vulnerable PDF emailing with secure authentication pipeline and role-based access controls.",
        },
        {
          value: "0 lost documents",
          label: "Document management",
          description: "Replaced paper-based workflows with digital tracking, eliminating lost documents and inconsistent processing.",
        },
      ],
    },
    learnings: {
      takeaways: [],
    },
    navigation: {
      previous: {
        slug: "rush-the-line",
        title: "Rush The Line — Airport Companion",
      },
    },
  },
];

export const getCaseStudy = (slug: string) =>
  caseStudies.find((study) => study.slug === slug);

