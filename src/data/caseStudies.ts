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
  keyDecisions: Array<{
    title: string;
    context: string;
    options: string;
    decision: string;
    outcome: string;
  }>;
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
      title: "Rush The Line: Designing Trust in Crowdsourced Airport Navigation",
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
      duration: "14 Months (v10.0 Design Phase)",
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
        stat: "3.8→4.6",
        label: "Confidence lift",
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
      context: [
        "Airport travelers navigate high-stakes decisions under time pressure, but existing tools provide static information that can't answer \"Should I leave for security now?\" or \"Can I trust this crowdsourced tip?\"",
      ],
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
          image: {
            src: "/Discovery-1.png",
            alt: "Field research artifacts and early journey mapping",
            width: 3320,
            height: 1556,
          },
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
            'Designed layered IA prioritizing a "glanceable now" state: Decision Cockpit card answers designed to target <8s decision time, will validate in March 2026 pilot.',
          image: {
            src: "/DesignSystem-02.png",
            alt: "Mobile flow wireframes and IA layouts",
            width: 2504,
            height: 1772,
          },
          extraDetails: [
            {
              heading: "Key Patterns",
              items: [
                "At-a-glance tiles: security ETA, gate, boarding group, and walk time.",
                "Contextual nudges: ‘leave for gate’, ‘reprint pass’, ‘prep stroller fold’.",
                "Modal detail for delays with rebooking paths and nearby amenities.",
              ],
            },
          ],
        },
        {
          title: "Step 03 — Usability testing & design refinement",
          description:
            "Tested high-fidelity prototypes with frequent and infrequent travelers. Optimized notification timing and simplified the offline-ready checklist for unstable airport Wi‑Fi.",
          image: {
            src: "/DesignSystem-07.png",
            alt: "Hi-fi mobile UI components and states",
            width: 2636,
            height: 956,
          },
          extraDetails: [
            {
              heading: "Improvements from Testing",
              items: [
                "Raised contrast and tap targets for one-handed use with luggage.",
                "Bundled multiple alerts into a single actionable card during gate changes.",
                "Added a persistent ‘Plan B’ tab for backup routes and amenity maps.",
              ],
            },
          ],
        },
      ],
    },
    designShowcase: {
      images: [
        {
          id: "rtl-showcase-1",
          category: "Hi-fi",
          caption: "Core mobile screens showing live queue, devices, and lighting controls.",
          image: {
            src: "https://res.cloudinary.com/kingaat7/image/upload/v1766802730/_Posts_enirvr.png",
            alt: "Mobile app core screens",
            width: 1536,
            height: 1125,
          },
        },
        {
          id: "rtl-showcase-2",
          category: "Mid-fi",
          caption: "Flow diagrams for delay handling and gate change decisioning.",
          image: {
            src: "/DesignSystem-03.png",
            alt: "Flow charts and mid-fi UI states",
            width: 7514,
            height: 3152,
          },
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
];

export const getCaseStudy = (slug: string) =>
  caseStudies.find((study) => study.slug === slug);

