"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";

import styles from "./case-study.module.css";

export type ShowcaseSlide = {
  id: string;
  category: string;
  caption: string;
  link?: string;
  video?: string;
  hiFiSrc?: string;
  hiFiCaption?: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

type PreparedSlide = ShowcaseSlide & { computedSrc: string };

type DesignShowcaseCarouselProps = {
  slides: ShowcaseSlide[];
  isRushCaseStudy?: boolean;
  hiFiSlides?: ShowcaseSlide[];
  enableFidelityToggle?: boolean;
};

const buildPlaceholder = (label: string) => {
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

const rtlQuickDirections = [
  {
    title: "TSA Security Checkpoint",
    subtitle: "4 min walk • Currently 12 min wait",
    icon: "▢",
  },
  {
    title: "Check-in Counters",
    subtitle: "6 min walk • AA desks 12-18",
    icon: "▢",
  },
  {
    title: "Restrooms",
    subtitle: "2 min walk • Near Gate B5",
    icon: "▢",
  },
  {
    title: "Bag Drop",
    subtitle: "5 min walk • Self-service available",
    icon: "▢",
  },
];

const rtlAccessibility = [
  {
    title: "Request Wheelchair Assistance",
    subtitle: "Available in 5-10 minutes",
    icon: "▢",
  },
  {
    title: "Airport Services FAQ",
    subtitle: "Common questions & answers",
    icon: "▢",
  },
];

function RtlNavigationScreen() {
  return (
    <div className="w-[375px] h-[780px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-showcase">
      <div className="flex h-full flex-col bg-white text-neutral-900">
        <header className="flex items-center justify-between bg-neutral-900 px-4 py-3 text-white">
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-medium">LAX Terminal 3</span>
            <span className="text-xs text-neutral-400">Los Angeles International</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full bg-neutral-800 px-3 py-1 text-xs font-medium text-white">
              <span className="text-white">●</span> Board in 42m
            </span>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800 text-white"
              aria-label="Open settings"
            >
              ⋮
            </button>
          </div>
        </header>

        <div className="border-b border-neutral-200/70 bg-neutral-50 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-200 text-neutral-700">
              +
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-900">
                Turn on location for live routing
              </p>
              <p className="text-xs text-neutral-500">Get precise directions and wait times</p>
            </div>
            <button
              type="button"
              className="rounded-md bg-neutral-900 px-3 py-1 text-xs font-medium text-white"
            >
              Enable
            </button>
          </div>
        </div>

        <main className="flex flex-col gap-6 overflow-y-auto px-4 pb-6 pt-5">
          <section>
            <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
              <div className="flex h-48 flex-col items-center justify-center gap-2 border-b border-neutral-200 bg-neutral-100 text-neutral-600">
                <span className="text-2xl text-neutral-700">▭▭▭</span>
                <p className="text-sm font-medium">Terminal Map Preview</p>
              </div>
              <div className="space-y-3 p-4 text-sm text-neutral-800">
                <div className="flex items-center gap-2">
                  <span className="text-base text-black">●</span>
                  <span className="font-medium">You are here - Gate Area B</span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-neutral-700">
                  <div className="flex items-center gap-2">
                    <span aria-hidden>■</span>
                    <span>TSA - 4 min walk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span aria-hidden>■</span>
                    <span>Restrooms - 2 min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span aria-hidden>■</span>
                    <span>Check-in - 6 min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span aria-hidden>■</span>
                    <span>Bag Drop - 5 min</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
              Quick Directions
            </p>
            <div className="space-y-3">
              {rtlQuickDirections.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  className="flex w-full items-center gap-3 rounded-lg border border-neutral-200 bg-white px-4 py-3 text-left shadow-sm"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 text-lg">
                    {item.icon}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-neutral-900">{item.title}</p>
                    <p className="text-xs text-neutral-500">{item.subtitle}</p>
                  </div>
                  <span aria-hidden className="text-neutral-400">
                    →
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
              Accessibility &amp; Services
            </p>
            <div className="space-y-3">
              {rtlAccessibility.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  className="flex w-full items-center gap-3 rounded-lg border border-neutral-200 bg-white px-4 py-3 text-left shadow-sm"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 text-lg">
                    {item.icon}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-neutral-900">{item.title}</p>
                    <p className="text-xs text-neutral-500">{item.subtitle}</p>
                  </div>
                  <span aria-hidden className="text-neutral-400">
                    →
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
              Smart Reminders
            </p>
            <div className="space-y-4 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-neutral-900">Check-in reminder</p>
                  <div className="h-6 w-11 rounded-full bg-neutral-300">
                    <div className="h-6 w-6 translate-x-5 rounded-full bg-white shadow-sm" />
                  </div>
                </div>
                <p className="text-xs text-neutral-500">Notify 24 hours before departure</p>
                <div className="flex items-center justify-between rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-900">
                  <span>24 hours before</span>
                  <span aria-hidden>⌄</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-neutral-900">Boarding reminder</p>
                  <div className="h-6 w-11 rounded-full bg-neutral-300">
                    <div className="h-6 w-6 translate-x-5 rounded-full bg-white shadow-sm" />
                  </div>
                </div>
                <p className="text-xs text-neutral-500">Notify before boarding starts</p>
                <div className="flex items-center justify-between rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-900">
                  <span>30 minutes before</span>
                  <span aria-hidden>⌄</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-neutral-900">Leave for security</p>
                  <div className="h-6 w-11 rounded-full bg-neutral-200">
                    <div className="h-6 w-6 translate-x-0 rounded-full bg-white shadow-sm" />
                  </div>
                </div>
                <p className="text-xs text-neutral-500">
                  Smart suggestion based on current wait times
                </p>
              </div>
            </div>
          </section>
        </main>

      </div>
    </div>
  );
}

function TrustSignalsFeed() {
  return (
    <div className="w-[375px] h-[780px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-showcase">
      <div className="relative flex h-full flex-col bg-white text-neutral-900">
        {/* Travel Feed header */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="text-xl text-neutral-800" aria-hidden>
              ≡
            </span>
            <span className="text-lg font-semibold text-neutral-900">Travel Feed</span>
          </div>
          <div className="flex items-center gap-3 text-neutral-800">
            <span aria-hidden className="text-lg">
              ⌾
            </span>
            <span aria-hidden className="text-lg">
              ○
            </span>
          </div>
        </div>

        {/* Trust signals list */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-neutral-900">Real-Time Updates</span>
            <span className="text-xs text-neutral-500">Trust signals on every change</span>
          </div>
          <span className="text-xs text-neutral-500">Live</span>
        </div>

        <main className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
          <article className="rounded-lg border border-red-500/80 bg-white p-3 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-neutral-900">Gate Change: B12 → C24</p>
                <div className="flex flex-wrap gap-2 text-[11px] font-medium">
                  <span className="rounded-md bg-neutral-100 px-2 py-1 text-neutral-700">
                    Official Airport Data
                  </span>
                  <span className="rounded-md bg-neutral-100 px-2 py-1 text-neutral-700">
                    High Confidence
                  </span>
                </div>
              </div>
              <span className="text-xs font-semibold text-green-600">2 min ago</span>
            </div>
            <p className="mt-2 text-sm text-neutral-800">Add 8 min walk time</p>
          </article>

          <article className="rounded-lg border border-purple-500/80 bg-white p-3 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-neutral-900">Security Wait Increased</p>
                <div className="flex flex-wrap gap-2 text-[11px] font-medium">
                  <span className="rounded-md bg-neutral-100 px-2 py-1 text-neutral-700">
                    Crowdsourced
                  </span>
                  <span className="rounded-md bg-neutral-100 px-2 py-1 text-neutral-700">
                    Medium Confidence
                  </span>
                </div>
              </div>
              <span className="text-xs font-semibold text-green-600">5 min ago</span>
            </div>
            <p className="mt-2 text-sm text-neutral-800">Now 20-25 min wait</p>
          </article>

          <article className="rounded-lg border border-neutral-300 bg-white p-3 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-neutral-900">
                  Terminal B Food Courts Open
                </p>
                <div className="flex flex-wrap gap-2 text-[11px] font-medium">
                  <span className="rounded-md bg-neutral-100 px-2 py-1 text-neutral-700">
                    Crowdsourced
                  </span>
                  <span className="rounded-md bg-neutral-100 px-2 py-1 text-neutral-700">
                    Low Confidence
                  </span>
                </div>
              </div>
              <span className="text-xs font-semibold text-amber-600">18 min ago</span>
            </div>
            <p className="mt-2 text-sm text-neutral-800">FYI while you’re in the terminal</p>
          </article>

          {/* Feed card */}
          <section className="space-y-3 rounded-xl border border-neutral-200 bg-white p-3 shadow-sm">
            <div className="flex flex-wrap gap-2">
              {["All Posts", "TSA", "Food & Dining", "Travel Tips"].map((item, idx) => (
                <span
                  key={item}
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${
                    idx === 0
                      ? "bg-neutral-900 text-white"
                      : "bg-white text-neutral-700 ring-1 ring-neutral-200"
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="rounded-lg border border-neutral-200 bg-white p-3 shadow-sm">
              <div className="flex items-start gap-3">
                <span aria-hidden className="text-xl text-neutral-800">
                  ○
                </span>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-neutral-900">Sarah Chen</p>
                    <span className="text-xs text-neutral-500">2h</span>
                    <span className="rounded-full bg-neutral-100 px-2 py-1 text-xs font-semibold text-neutral-800">
                      TSA
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-neutral-600">
                    <span aria-hidden>•</span>
                    <span>LAX Terminal 3</span>
                  </div>
                </div>
              </div>

              <p className="mt-3 text-sm leading-6 text-neutral-900">
                Pro tip: TSA PreCheck line is actually longer than regular security right now.
                Regular line took me 8 minutes vs 15+ for PreCheck. Check both before choosing!
              </p>

              <div className="mt-4 flex items-center justify-between text-sm text-neutral-700">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    ♡ <span>24</span>
                  </span>
                  <span className="flex items-center gap-1">
                    ✎ <span>8</span>
                  </span>
                  <span aria-hidden>↩</span>
                </div>
                <span className="text-xs text-neutral-500">Helpful</span>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function JourneyTimelineView() {
  return (
    <div className="w-[375px] h-[780px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-showcase">
      <div className="flex h-full flex-col bg-white text-neutral-900">
        <header className="flex items-center justify-between bg-neutral-900 px-4 py-3 text-white">
          <div className="flex items-center gap-3">
            <span aria-hidden className="text-lg">
              ←
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-white">LAX Terminal 3</span>
              <span className="text-xs text-neutral-400">Security Checkpoint</span>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-neutral-800 px-3 py-1 text-xs font-semibold text-white">
            <span aria-hidden className="text-sm">⏱</span>
            <span>Board in 42m</span>
          </span>
        </header>

        <main className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
          <section className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Completed
            </p>
            <div className="space-y-2">
              {[
                { title: "Check-in", detail: "Completed 18 min ago" },
                { title: "Bag Drop", detail: "Completed 12 min ago" },
              ].map((stage) => (
                <div
                  key={stage.title}
                  className="flex items-center justify-between rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2"
                >
                  <div className="flex items-center gap-2">
                    <span aria-hidden className="text-lg text-neutral-600">
                      ✓
                    </span>
                    <div className="flex flex-col leading-tight">
                      <span className="text-sm font-semibold text-neutral-900">{stage.title}</span>
                      <span className="text-xs text-neutral-600">{stage.detail}</span>
                    </div>
                  </div>
                  <span className="text-xs text-neutral-500">Done</span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Current
            </p>
            <div className="space-y-3 rounded-lg border border-neutral-300 bg-white px-3 py-3 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span aria-hidden className="text-base text-neutral-800">▪</span>
                  <span className="text-sm font-semibold text-neutral-900">Security Checkpoint</span>
                </div>
                <span className="rounded-full bg-neutral-100 px-2 py-1 text-xs font-semibold text-neutral-800">
                  In Progress
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200">
                  <div className="h-full w-2/3 rounded-full bg-neutral-500" />
                </div>
                <p className="text-xs text-neutral-600">
                  15 min wait | Checkpoint A recommended
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Upcoming
            </p>
            <div className="space-y-2">
              {[
                { title: "Gate Navigation", detail: "12 min walk after security" },
                { title: "Boarding", detail: "Starts in 42 min" },
              ].map((stage) => (
                <div
                  key={stage.title}
                  className="flex items-center justify-between rounded-lg border border-dashed border-neutral-300 px-3 py-2"
                >
                  <div className="flex items-center gap-2">
                    <span aria-hidden className="text-base text-neutral-700">○</span>
                    <div className="flex flex-col leading-tight">
                      <span className="text-sm font-semibold text-neutral-900">{stage.title}</span>
                      <span className="text-xs text-neutral-600">{stage.detail}</span>
                    </div>
                  </div>
                  <span className="text-xs text-neutral-500">Next</span>
                </div>
              ))}
            </div>
          </section>
        </main>

        <div className="m-4 mt-0 rounded-xl bg-neutral-900 px-4 py-4 text-white shadow-md">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-neutral-300">UPGRADE AVAILABLE</p>
              <p className="text-base font-semibold text-white">Skip the wait entirely</p>
              <p className="text-xs leading-5 text-neutral-300">
                Priority boarding, lounge access, and fast-track security options available
              </p>
            </div>
            <span aria-hidden className="text-lg">♛</span>
          </div>

          <div className="mt-4 space-y-2 text-sm text-neutral-100">
            <div className="flex items-center gap-2">
              <span aria-hidden className="text-neutral-200">✓</span>
              <span>CLEAR fast-track (2-3 min)</span>
            </div>
            <div className="flex items-center gap-2">
              <span aria-hidden className="text-neutral-200">✓</span>
              <span>Priority boarding zone 1</span>
            </div>
            <div className="flex items-center gap-2">
              <span aria-hidden className="text-neutral-200">✓</span>
              <span>Lounge access (food & drinks)</span>
            </div>
          </div>

          <button
            type="button"
            className="mt-4 w-full rounded-lg bg-white px-4 py-2 text-center text-sm font-semibold text-neutral-800 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            View Upgrade Options
          </button>
        </div>
      </div>
    </div>
  );
}

function ProgressiveDisclosureView() {
  const breakdown = [
    "Walk to security: 3 min",
    "Security wait: 15 min",
    "Walk to gate: 12 min",
    "Comfortable buffer: 10 min",
    "Total time needed: 40 min",
    "Your flight boards: 48 min from now",
    "Recommended departure: 8 min from now",
  ];

  return (
    <div className="w-[375px] h-[780px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-showcase">
      <div className="flex h-full flex-col bg-white text-neutral-900">
        <header className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-neutral-900">Leave in 8 min</span>
            <span className="text-xs text-neutral-500">Recommendation breakdown</span>
          </div>
          <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-800">
            Expanded
          </span>
        </header>

        <main className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-4">
          <section className="space-y-2 rounded-lg border border-neutral-200 bg-white p-3 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-neutral-900">Summary</span>
              <span className="rounded-full bg-neutral-900 px-3 py-1 text-xs font-semibold text-white">
                Leave in 8 min
              </span>
            </div>
            <p className="text-xs text-neutral-600">
              Tap to see how we calculated this recommendation.
            </p>
          </section>

          <section className="space-y-3 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <span aria-hidden className="text-lg text-neutral-700">≡</span>
              <p className="text-sm font-semibold text-neutral-900">Calculation breakdown</p>
            </div>
            <div className="space-y-2 text-sm text-neutral-800">
              {breakdown.map((line) => (
                <div key={line} className="flex items-start gap-2">
                  <span aria-hidden className="text-neutral-500">•</span>
                  <span className="leading-5">{line}</span>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function HubHomeView() {
  return (
    <div className="w-[375px] h-[780px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-showcase">
      <div className="flex h-full flex-col bg-white text-neutral-900">
        <header className="flex items-center justify-between bg-neutral-900 px-4 py-3 text-white">
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-white">LAX Terminal 3</span>
            <span className="text-xs text-neutral-400">Los Angeles International</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-neutral-800 px-3 py-1 text-xs font-semibold text-white">
              <span aria-hidden className="text-sm">⏱</span>
              <span>Board in 42m</span>
            </span>
            <span aria-hidden className="text-lg">✶</span>
            <span aria-hidden className="text-lg">◎</span>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-4 overflow-y-auto">
          <section className="bg-neutral-900 text-white px-4 py-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs text-neutral-300">NEXT MILESTONE</p>
                <p className="text-lg font-semibold">Security Checkpoint</p>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-neutral-900">
                On Track
              </span>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-neutral-100">
              <span className="inline-flex items-center gap-1">
                <span aria-hidden>⇄</span>8 min walk to gate
              </span>
              <span className="inline-flex items-center gap-1">
                <span aria-hidden>⌛</span>~12 min wait
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-neutral-800 px-3 py-2">
              <div className="space-y-1">
                <p className="text-xs text-neutral-300">RECOMMENDED DEPARTURE</p>
                <p className="text-base font-semibold text-white">Leave in 18 minutes</p>
              </div>
              <span aria-hidden>→</span>
            </div>
          </section>

          <section className="px-4 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Quick Actions
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { title: "Live Wait Times", detail: "Real-time updates", icon: "⌛" },
                { title: "Pre-Security Help", detail: "Tips & guidance", icon: "?" },
                { title: "TSA Guidance", detail: "Rules & prep", icon: "✈" },
                { title: "Gate & Boarding", detail: "Flight status", icon: "▶" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-neutral-200 bg-white px-3 py-3 shadow-sm"
                >
                  <div className="flex items-center justify-center rounded-lg bg-neutral-100 p-2 w-10 h-10">
                    <span aria-hidden className="text-neutral-800">{item.icon}</span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-neutral-900">{item.title}</p>
                  <p className="text-xs text-neutral-600">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="px-4 space-y-3 bg-neutral-50 pb-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                Real-Time Updates
              </p>
              <div className="flex items-center gap-1 text-xs text-neutral-600">
                <span className="h-2 w-2 rounded-full bg-neutral-500" aria-hidden />
                <span>Live</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="rounded-lg border border-neutral-200 bg-white p-3 shadow-sm">
                <div className="flex items-start gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100">
                    <span aria-hidden>⬆</span>
                  </div>
                  <div className="flex-1 space-y-1 text-sm text-neutral-900">
                    <p className="font-semibold">TSA Line B Spike Detected</p>
                    <p className="text-xs text-neutral-600">
                      Wait time increased to 18-22 minutes. Consider Line A (8 min) or PreCheck.
                    </p>
                    <div className="flex items-center gap-1 text-[11px] text-neutral-600">
                      <span>2 min ago</span>
                      <span aria-hidden>•</span>
                      <span>High confidence</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-neutral-200 bg-white p-3 shadow-sm">
                <div className="flex items-start gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100">
                    <span aria-hidden>↗</span>
                  </div>
                  <div className="flex-1 space-y-1 text-sm text-neutral-900">
                    <p className="font-semibold">Gate Changed to C12</p>
                    <p className="text-xs text-neutral-600">
                      Your flight AA2847 has moved. New gate is 4 min walk from current location.
                    </p>
                    <div className="flex items-center gap-1 text-[11px] text-neutral-600">
                      <span>5 min ago</span>
                      <span aria-hidden>•</span>
                      <span>Official</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-neutral-200 bg-white p-3 shadow-sm">
                <div className="flex items-start gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100">
                    <span aria-hidden>↻</span>
                  </div>
                  <div className="flex-1 space-y-1 text-sm text-neutral-900">
                    <p className="font-semibold">Security Line A Moving Fast</p>
                    <p className="text-xs text-neutral-600">
                      Current wait: 6-8 minutes. Good time to head through security.
                    </p>
                    <div className="flex items-center gap-1 text-[11px] text-neutral-600">
                      <span>18 min ago</span>
                      <span aria-hidden>•</span>
                      <span>High confidence</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="px-4 pb-4">
            <button
              type="button"
              className="w-full rounded-xl bg-neutral-900 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm"
            >
              Start Guided Journey
            </button>
            <p className="mt-2 text-center text-xs text-neutral-600">
              Get step-by-step guidance to your gate
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
function OfflineModeView() {
  return (
    <div className="w-[375px] h-[780px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-showcase">
      <div className="flex h-full flex-col bg-white text-neutral-900">
        <div className="flex items-center justify-between bg-amber-200 px-4 py-3 text-neutral-900">
          <div className="flex items-center gap-2">
            <span aria-hidden>⚠</span>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold">Offline Mode</span>
              <span className="text-xs text-neutral-700">
                Cached info until connection returns
              </span>
            </div>
          </div>
          <span className="text-xs font-semibold text-neutral-800">Reconnecting…</span>
        </div>

        <main className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-4">
          <section className="space-y-2 rounded-lg border border-neutral-200 bg-white p-3 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-neutral-900">Last known info</p>
                <p className="text-xs text-neutral-600">Security Checkpoint</p>
              </div>
              <span className="rounded-full bg-neutral-200 px-2 py-1 text-[11px] font-semibold text-neutral-800">
                Cached
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700">
              <span className="rounded-md bg-amber-200 px-2 py-1 text-[11px] font-semibold text-neutral-900">
                Updated 8 min ago — may be outdated
              </span>
            </div>
            <p className="mt-1 text-sm text-neutral-700">
              Recommendation: Check airport monitors for current info.
            </p>
          </section>

          <section className="space-y-2 rounded-lg border border-neutral-200 bg-white p-3 shadow-sm">
            <p className="text-sm font-semibold text-neutral-900">Manual alternatives</p>
            <div className="space-y-2 text-sm text-neutral-800">
              <div className="flex items-start gap-2">
                <span aria-hidden>•</span>
                <span>Nearest airport monitor: Near Gate B12</span>
              </div>
              <div className="flex items-start gap-2">
                <span aria-hidden>•</span>
                <span>TSA PreCheck line may be faster</span>
              </div>
              <div className="flex items-start gap-2">
                <span aria-hidden>•</span>
                <span>Use staff at checkpoint A for latest status</span>
              </div>
            </div>
            <button
              type="button"
              disabled
              className="mt-3 w-full rounded-lg bg-neutral-200 px-4 py-2 text-center text-sm font-semibold text-neutral-600"
            >
              Download essential info (cached)
            </button>
          </section>

          <section className="space-y-2 rounded-lg border border-neutral-200 bg-white p-3 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-neutral-900">Cached updates</p>
              <span className="text-xs text-neutral-600">Waiting for connection…</span>
            </div>
            <div className="space-y-2 text-sm text-neutral-800">
              <div className="rounded-lg border border-neutral-200 px-3 py-2">
                <div className="flex items-center justify-between text-xs text-neutral-600">
                  <span>Gate change status</span>
                  <span>12 min ago</span>
                </div>
                <p className="text-sm text-neutral-900">Last seen: Gate B12</p>
              </div>
              <div className="rounded-lg border border-neutral-200 px-3 py-2">
                <div className="flex items-center justify-between text-xs text-neutral-600">
                  <span>Security wait</span>
                  <span>14 min ago</span>
                </div>
                <p className="text-sm text-neutral-900">Approx. 15-20 min (cached)</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function ProfileHubView() {
  return (
    <div className="w-[375px] h-[780px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-showcase">
      <div className="flex h-full flex-col bg-white text-neutral-900">
        <header className="flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-3">
          <div className="flex items-center gap-2">
            <span aria-hidden className="text-lg">←</span>
            <span className="text-sm font-semibold text-neutral-900">Profile & Settings</span>
          </div>
          <div className="flex items-center gap-3 text-neutral-800">
            <span aria-hidden className="text-lg">☺</span>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 pb-4 pt-4">
          <section className="rounded-lg border border-neutral-200 bg-neutral-900 p-4 shadow-sm text-white">
            <div className="flex gap-3 items-start">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-800 text-neutral-100">
                <span aria-hidden className="text-2xl">☺</span>
              </div>
              <div className="flex-1">
                <p className="text-base font-semibold text-white">Sarah Mitchell</p>
                <p className="text-xs text-neutral-300">sarah.mitchell@email.com</p>
                <div className="mt-2 flex flex-wrap gap-2 text-[11px] font-semibold text-neutral-100">
                  <span className="rounded-full bg-neutral-800 px-3 py-1">Business Traveler</span>
                  <span className="rounded-full bg-neutral-800 px-3 py-1">Frequent Flyer</span>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-2 rounded-lg border border-neutral-200 bg-white p-3 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-neutral-900">Profile Details</p>
              <span aria-hidden>→</span>
            </div>
            <p className="text-xs text-neutral-600">Name, contact info</p>
          </section>

          <section className="space-y-3 rounded-lg border border-neutral-200 bg-white p-3 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-neutral-900">Travel Preferences</p>
              <span aria-hidden>⌄</span>
            </div>
            <div className="space-y-2 text-sm text-neutral-800">
              <div>
                <p className="text-xs font-semibold text-neutral-600">Preferred Terminal</p>
                <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-2 py-1">
                  <span className="rounded-full bg-neutral-900 px-3 py-1 text-xs font-semibold text-white">
                    Terminal 3
                  </span>
                  <span className="rounded-full border border-neutral-300 px-3 py-1 text-xs font-semibold text-neutral-800">
                    Terminal 5
                  </span>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-neutral-600">Preferred Airlines</p>
                <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold text-neutral-800">
                  <span className="rounded-full border border-neutral-300 px-2 py-1 bg-neutral-100">
                    American Airlines
                  </span>
                  <span className="rounded-full border border-neutral-300 px-2 py-1 bg-neutral-100">
                    Delta
                  </span>
                  <span className="rounded-full border border-neutral-300 px-2 py-1 bg-white">
                    + Add airline
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-800">Always use TSA PreCheck</span>
                  <span className="rounded-full bg-neutral-900 px-3 py-1 text-xs font-semibold text-white">
                    On
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-800">Priority boarding alerts</span>
                  <span className="rounded-full bg-neutral-300 px-3 py-1 text-xs font-semibold text-white">
                    Off
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-2 rounded-lg border border-neutral-200 bg-white p-3 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-neutral-900">Companion Preferences</p>
              <span aria-hidden>→</span>
            </div>
            <p className="text-xs text-neutral-600">Children, elderly, accessibility</p>
          </section>

          <section className="space-y-3 rounded-lg border border-neutral-200 bg-white p-3 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-neutral-900">Frequent Flyer Details</p>
              <span aria-hidden>⌄</span>
            </div>
            <div className="space-y-2 text-sm text-neutral-800">
              <div className="rounded-lg border border-neutral-200 bg-white p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">American Airlines AAdvantage</p>
                    <p className="text-xs text-neutral-600">Gold Member · 21,000 miles</p>
                  </div>
                  <span aria-hidden>✎</span>
                </div>
              </div>
              <div className="rounded-lg border border-neutral-200 bg-white p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">Delta SkyMiles</p>
                    <p className="text-xs text-neutral-600">Silver Member · 32,000 miles</p>
                  </div>
                  <span aria-hidden>✎</span>
                </div>
              </div>
              <button className="w-full rounded-md border border-dashed border-neutral-300 px-3 py-2 text-sm font-semibold text-neutral-800">
                + Add Program
              </button>
            </div>
          </section>

          <section className="space-y-3 rounded-lg border border-neutral-200 bg-white p-3 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-neutral-900">Notification Preferences</p>
              <span aria-hidden>⌄</span>
            </div>
            <div className="space-y-2 text-sm text-neutral-800">
              {[
                ["TSA Wait Time Alerts", "Get notified of low-traffic windows", true],
                ["Gate Change Notifications", "Next-step gate updates", true],
                ["Dining Suggestions", "Personalized food options", false],
                ["Hydration Reminders", "Stay hydrated during travel", true],
                ["Restroom Proximity Alerts", "Nearby facilities", false],
              ].map(([title, detail, on]) => (
                <div
                  key={title as string}
                  className="flex items-center justify-between rounded-md border border-neutral-200 px-3 py-2"
                >
                  <div>
                    <p className="font-semibold">{title as string}</p>
                    <p className="text-xs text-neutral-600">{detail as string}</p>
                  </div>
                  <span
                    aria-hidden
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      on ? "bg-neutral-900 text-white" : "bg-neutral-300 text-white"
                    }`}
                  >
                    {on ? "On" : "Off"}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-3 rounded-lg border border-neutral-200 bg-white p-3 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-neutral-900">Dietary & Health Preferences</p>
              <span aria-hidden>⌄</span>
            </div>
            <div className="space-y-3 text-sm text-neutral-800">
              <div>
                <p className="text-xs text-neutral-600">Dietary Restrictions</p>
                <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold text-neutral-800">
                  {["Vegetarian", "Vegan", "Halal", "Kosher", "Gluten-free"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-neutral-300 bg-neutral-100 px-2 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-neutral-600">Allergies</p>
                <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold text-neutral-800">
                  {["Peanuts", "Shellfish"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-neutral-300 bg-neutral-100 px-2 py-1"
                    >
                      {tag} ✕
                    </span>
                  ))}
                  <span className="rounded-full border border-dashed border-neutral-300 bg-white px-2 py-1">
                    + Add allergy
                  </span>
                </div>
              </div>
              <div>
                <p className="text-xs text-neutral-600">Avoid list</p>
                <div className="mt-2 rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs text-neutral-500">
                  Add foods or ingredients to avoid…
                </div>
              </div>
            </div>
          </section>
        </main>

        <div className="border-t border-neutral-200 bg-white px-4 pb-4">
          <button className="mt-2 w-full rounded-lg bg-neutral-900 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
/**
 * Legacy carousel used for non-Rush case studies (CDC, etc.).
 */
function LegacyCarousel({ slides }: { slides: ShowcaseSlide[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);

  const handleScroll = useCallback((direction: "prev" | "next") => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
        setZoom(1);
      }
      if (event.key === "ArrowRight") {
        goTo("next");
      }
      if (event.key === "ArrowLeft") {
        goTo("prev");
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, slides.length]);

  const openModal = (index: number) => {
    setActiveIndex(index);
    setZoom(1);
  };

  const closeModal = () => {
    setActiveIndex(null);
    setZoom(1);
  };

  const goTo = (direction: "prev" | "next") => {
    setActiveIndex((current) => {
      if (current === null) return current;
      const total = slides.length;
      const next =
        direction === "next"
          ? (current + 1) % total
          : (current - 1 + total) % total;
      return next;
    });
    setZoom(1);
  };

  const zoomIn = () => setZoom((value) => Math.min(value + 0.25, 3));
  const zoomOut = () => setZoom((value) => Math.max(value - 0.25, 0.5));

  const activeSlide = activeIndex === null ? null : slides[activeIndex];
  const activeIsVideo = activeSlide?.video;

  if (!slides.length) return null;

  return (
    <div className={styles.showcaseCarousel}>
      <div className={styles.showcaseViewport} ref={scrollRef}>
        {slides.map((slide, index) => {
          const image = (
            <Image
              src={slide.image.src}
              alt={slide.image.alt}
              width={slide.image.width}
              height={slide.image.height}
              loading="lazy"
              sizes="(max-width: 768px) 90vw, 640px"
              className={styles.showcaseImage}
            />
          );

          return (
            <article key={slide.id} className={styles.showcaseSlide}>
              <div className={styles.showcaseImageFrame}>
                <button
                  type="button"
                  className={styles.showcaseImageButton}
                  onClick={() => openModal(index)}
                  aria-label={`Open ${slide.category} design in a modal`}
                >
                  {image}
                </button>
              </div>
              <footer className={styles.showcaseCaption}>
                <p className={styles.showcaseCategory}>{slide.category}</p>
                <p>
                  {slide.caption}{" "}
                  {slide.link && (
                    <a
                      href={slide.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.stepGalleryInlineLink}
                    >
                      Open in Figma ↗
                    </a>
                  )}
                </p>
              </footer>
            </article>
          );
        })}
      </div>

      <div className={styles.showcaseControls}>
        <button
          type="button"
          className={styles.showcaseArrow}
          onClick={() => handleScroll("prev")}
          aria-label="Previous design slide"
        >
          <span>↙</span>
        </button>
        <button
          type="button"
          className={styles.showcaseArrow}
          onClick={() => handleScroll("next")}
          aria-label="Next design slide"
        >
          <span>↗</span>
        </button>
      </div>

      {activeSlide && (
        <div
          className={styles.stepGalleryModal}
          role="dialog"
          aria-modal="true"
          aria-label={`Expanded view of ${activeSlide.caption}`}
          onClick={closeModal}
        >
          <div
            className={styles.stepGalleryModalContent}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={styles.stepGalleryModalClose}
              aria-label="Close design modal"
              onClick={closeModal}
            >
              ×
            </button>

            <div className={styles.stepGalleryModalImageFrame}>
              {activeIsVideo ? (
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster={activeSlide.image.src}
                  className={styles.stepGalleryModalImage}
                  src={activeSlide.video}
                />
              ) : (
                <Image
                  src={activeSlide.image.src}
                  alt={activeSlide.image.alt}
                  width={activeSlide.image.width}
                  height={activeSlide.image.height}
                  sizes="(max-width: 1024px) 100vw, 1100px"
                  className={styles.stepGalleryModalImage}
                  style={{
                    transform: `scale(${zoom})`,
                    transformOrigin: "center",
                  }}
                />
              )}
            </div>

            <div className={styles.stepGalleryModalControls}>
              <div className={styles.stepGalleryModalNav}>
                <button
                  type="button"
                  className={styles.stepGalleryModalArrow}
                  onClick={() => goTo("prev")}
                  aria-label="Previous design"
                  disabled={slides.length <= 1}
                >
                  ←
                </button>
                <button
                  type="button"
                  className={styles.stepGalleryModalArrow}
                  onClick={() => goTo("next")}
                  aria-label="Next design"
                  disabled={slides.length <= 1}
                >
                  →
                </button>
                {activeSlide.link && (
                  <a
                    href={activeSlide.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.stepGalleryInlineLink}
                  >
                    Open in Figma ↗
                  </a>
                )}
              </div>

              {!activeIsVideo && (
                <div className={styles.stepGalleryModalZoom}>
                  <button
                    type="button"
                    onClick={zoomOut}
                    className={styles.stepGalleryModalZoomButton}
                    aria-label="Zoom out"
                  >
                    −
                  </button>
                  <span className={styles.stepGalleryModalZoomLabel}>
                    {Math.round(zoom * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={zoomIn}
                    className={styles.stepGalleryModalZoomButton}
                    aria-label="Zoom in"
                  >
                    +
                  </button>
                </div>
              )}
            </div>

            <footer className={styles.stepGalleryModalFooter}>
              <p className={styles.stepGalleryModalCaption}>{activeSlide.caption}</p>
              {activeSlide.link && (
                <a
                  href={activeSlide.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.stepGalleryInlineLink}
                >
                  Open in Figma ↗
                </a>
              )}
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DesignShowcaseCarousel({
  slides,
  isRushCaseStudy = false,
  hiFiSlides,
  enableFidelityToggle = false,
}: DesignShowcaseCarouselProps) {
  if (!isRushCaseStudy) {
    return <LegacyCarousel slides={slides} />;
  }

  const [fidelity, setFidelity] = useState<"lo" | "hi">("lo");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [zoom, setZoom] = useState(1);
  const viewportRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<HTMLDivElement[]>([]);

  const preparedSlides: PreparedSlide[] = useMemo(
    () =>
      slides.map((slide) => {
        const label = slide.image.alt || slide.caption || "Design screen";
        const placeholderSrc = buildPlaceholder(label);
        const computedSrc = slide.image.src || placeholderSrc;

        return {
          ...slide,
          computedSrc,
        };
      }),
    [slides]
  );

  const preparedHiFiSlides: PreparedSlide[] = useMemo(() => {
    const source =
      hiFiSlides && hiFiSlides.length
        ? hiFiSlides
        : slides.map((slide) => ({
            ...slide,
            id: `${slide.id}-hi`,
            category: "Hi-Fi",
            caption: slide.hiFiCaption ?? slide.caption,
            hiFiSrc: slide.hiFiSrc,
            hiFiCaption: slide.hiFiCaption,
            image: {
              ...slide.image,
              src: slide.hiFiSrc ?? slide.image.src,
            },
          }));

    return source.map((slide) => {
      const label = slide.image.alt || slide.caption || "Hi-fi design screen";
      const placeholderSrc = buildPlaceholder(`${label} (Hi-Fi placeholder)`);
      const computedSrc = slide.hiFiSrc ?? slide.image.src ?? placeholderSrc;

      return {
        ...slide,
        computedSrc,
      };
    });
  }, [hiFiSlides, slides]);

  const displayedSlides = fidelity === "hi" ? preparedHiFiSlides : preparedSlides;

  const lightboxSlides = useMemo(
    () =>
      displayedSlides.map((slide) => ({
        src: slide.computedSrc,
        alt: slide.image.alt,
        description: slide.caption,
        title: slide.category,
      })),
    [displayedSlides]
  );

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    let ticking = false;

    const updateActiveFromScroll = () => {
      if (!viewport) return;
      const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;

      let closestIndex = 0;
      let smallestDelta = Number.POSITIVE_INFINITY;

      slideRefs.current.forEach((node, index) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const left = node.offsetLeft;
        const width = rect.width;
        const center = left + width / 2;
        const delta = Math.abs(center - viewportCenter);
        if (delta < smallestDelta) {
          smallestDelta = delta;
          closestIndex = index;
        }
      });

      setVisibleIndex(closestIndex);
      
      // Check if we're at the end of the scrollable area
      const maxScroll = viewport.scrollWidth - viewport.clientWidth;
      const isAtEndOfScroll = viewport.scrollLeft >= maxScroll - 10; // 10px threshold for floating point issues
      setIsAtEnd(isAtEndOfScroll);
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveFromScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    updateActiveFromScroll();
    viewport.addEventListener("scroll", onScroll, { passive: true });
    return () => viewport.removeEventListener("scroll", onScroll);
  }, [displayedSlides.length, fidelity]);

  useEffect(() => {
    slideRefs.current = [];
    setVisibleIndex(0);
    setActiveIndex(-1);
  }, [fidelity]);

  const scrollToIndex = (index: number) => {
    const viewport = viewportRef.current;
    const target = slideRefs.current[index];
    if (!viewport || !target) return;
    target.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  const goPrev = () => {
    if (!displayedSlides.length) return;
    const next = (visibleIndex - 1 + displayedSlides.length) % displayedSlides.length;
    scrollToIndex(next);
  };

  const goNext = () => {
    if (!displayedSlides.length) return;
    const next = (visibleIndex + 1) % displayedSlides.length;
    scrollToIndex(next);
  };

  if (!displayedSlides.length) return null;

  return (
    <div className="w-full space-y-4">
      <a
        href="#design-showcase-content"
        className="sr-only focus:not-sr-only focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-black"
      >
        Skip to design showcase carousel
      </a>

      <div className="flex items-center justify-between gap-4">
        {enableFidelityToggle ? (
          <div className="flex items-center justify-start gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Fidelity
            </span>
            <div className="inline-flex rounded-full border border-neutral-300 bg-white shadow-sm">
              <button
                type="button"
                onClick={() => setFidelity("lo")}
                aria-pressed={fidelity === "lo"}
                className={`px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] transition ${
                  fidelity === "lo"
                    ? "bg-neutral-900 text-white"
                    : "text-neutral-700 hover:bg-neutral-100"
                }`}
              >
                LO-FI
              </button>
              <button
                type="button"
                onClick={() => setFidelity("hi")}
                aria-pressed={fidelity === "hi"}
                className={`px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] transition ${
                  fidelity === "hi"
                    ? "bg-neutral-900 text-white"
                    : "text-neutral-700 hover:bg-neutral-100"
                }`}
              >
                HI-FI
              </button>
            </div>
          </div>
        ) : null}
        
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Zoom
          </span>
          <div className="inline-flex items-center gap-1 rounded-full border border-neutral-300 bg-white shadow-sm px-1">
            <button
              type="button"
              onClick={() => setZoom((prev) => Math.max(0.5, prev - 0.25))}
              aria-label="Zoom out"
              disabled={zoom <= 0.5}
              className={`px-2 py-1 text-xs font-semibold transition ${
                zoom <= 0.5
                  ? "cursor-not-allowed text-neutral-400"
                  : "text-neutral-700 hover:bg-neutral-100"
              }`}
            >
              −
            </button>
            <span className="min-w-[3rem] text-center text-xs font-medium text-neutral-600">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoom((prev) => Math.min(2, prev + 0.25))}
              aria-label="Zoom in"
              disabled={zoom >= 2}
              className={`px-2 py-1 text-xs font-semibold transition ${
                zoom >= 2
                  ? "cursor-not-allowed text-neutral-400"
                  : "text-neutral-700 hover:bg-neutral-100"
              }`}
            >
              +
            </button>
            <button
              type="button"
              onClick={() => setZoom(1)}
              aria-label="Reset zoom"
              disabled={zoom === 1}
              className={`px-2 py-1 text-xs font-medium transition ${
                zoom === 1
                  ? "cursor-not-allowed text-neutral-400"
                  : "text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="relative">
        <div
          ref={viewportRef}
          id="design-showcase-content"
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:pb-6"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "top left",
            transition: "transform 0.2s ease",
          }}
          aria-label="Design showcase carousel"
        >
          {displayedSlides.map((slide, index) => (
            <article
              key={slide.id}
              ref={(node: HTMLDivElement | null) => {
                if (node) slideRefs.current[index] = node;
              }}
              className="snap-start"
            >
              <div className="flex min-w-[375px] max-w-[375px] flex-col gap-3">
                {(() => {
                  const isCustom =
                    slide.id === "rtl-hub-home" ||
                    slide.id === "rtl-home-decision-cockpit" ||
                    slide.id === "rtl-trust-signals-feed" ||
                    slide.id === "rtl-journey-timeline" ||
                    slide.id === "rtl-progressive-disclosure" ||
                    slide.id === "rtl-profile-hub" ||
                    slide.id === "rtl-offline-mode";

                  const content = (
                    <div
                      className="relative w-full overflow-hidden rounded-lg border border-gray-200 bg-slate-100 transition duration-200 ease-out group-hover:scale-[1.02] group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
                      style={{ maxWidth: "375px", height: "780px" }}
                    >
                      {slide.id === "rtl-hub-home" ? (
                        <div className="flex h-full w-full items-center justify-center bg-neutral-50">
                          <HubHomeView />
                        </div>
                      ) : slide.id === "rtl-home-decision-cockpit" ? (
                        <div className="flex h-full w-full items-center justify-center bg-neutral-50">
                          <RtlNavigationScreen />
                        </div>
                      ) : slide.id === "rtl-trust-signals-feed" ? (
                        <div className="flex h-full w-full items-center justify-center bg-neutral-50">
                          <TrustSignalsFeed />
                        </div>
                      ) : slide.id === "rtl-journey-timeline" ? (
                        <div className="flex h-full w-full items-center justify-center bg-neutral-50">
                          <JourneyTimelineView />
                        </div>
                      ) : slide.id === "rtl-progressive-disclosure" ? (
                        <div className="flex h-full w-full items-center justify-center bg-neutral-50">
                          <ProgressiveDisclosureView />
                        </div>
                      ) : slide.id === "rtl-profile-hub" ? (
                        <div className="flex h-full w-full items-center justify-center bg-neutral-50">
                          <ProfileHubView />
                        </div>
                      ) : slide.id === "rtl-offline-mode" ? (
                        <div className="flex h-full w-full items-center justify-center bg-neutral-50">
                          <OfflineModeView />
                        </div>
                      ) : (
                        <>
                          <Image
                            src={slide.computedSrc}
                            alt={slide.image.alt}
                            width={375}
                            height={780}
                            sizes="375px"
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                          <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-b from-black/5 via-transparent to-black/12 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                        </>
                      )}
                    </div>
                  );

                  if (isCustom) {
                    return (
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => setActiveIndex(index)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setActiveIndex(index);
                          }
                        }}
                        className="group relative block w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary)]"
                        aria-label={`Open ${slide.category} design in a modal`}
                      >
                        {content}
                      </div>
                    );
                  }

                  return (
                    <button
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className="group relative block w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary)]"
                      aria-label={`Open ${slide.category} design in a modal`}
                    >
                      {content}
                    </button>
                  );
                })()}

                <div className="flex flex-col gap-1.5 max-w-[375px] px-4 pt-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-600">
                    {slide.category}
                  </p>
                  {fidelity === "hi" && slide.hiFiCaption ? (
                    <p className="text-sm leading-[1.5] text-gray-700">
                      {slide.hiFiCaption}
                    </p>
                  ) : fidelity !== "hi" ? (
                    <p className="text-sm leading-[1.5] text-gray-700">
                      {slide.caption}
                    </p>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
        <button
          type="button"
          onClick={isAtEnd ? goPrev : goNext}
          aria-label={
            isAtEnd
              ? "Scroll back to previous screens"
              : "Scroll right to see more screens"
          }
          className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full border border-neutral-300 bg-white/90 px-3 py-2 text-sm font-semibold text-neutral-800 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
        >
          <span className="flex items-center gap-1">
            {isAtEnd ? (
              <>
                <span aria-hidden="true" className="text-base">←</span>
                <span className="text-xs uppercase tracking-wide text-neutral-600">Previous</span>
              </>
            ) : (
              <>
                <span className="text-xs uppercase tracking-wide text-neutral-600">Scroll</span>
                <span aria-hidden="true" className="text-base">→</span>
              </>
            )}
          </span>
        </button>
      </div>


      <Lightbox
        open={activeIndex >= 0}
        index={activeIndex}
        close={() => setActiveIndex(-1)}
        slides={lightboxSlides}
        plugins={[Captions]}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, 0.8)" },
          button: { color: "#fff", opacity: 1 },
        }}
        captions={{
          descriptionTextAlign: "center",
          descriptionMaxLines: 3,
        }}
        controller={{ closeOnBackdropClick: true }}
        labels={{
          Close: "Close lightbox",
          Next: "Next image",
          Previous: "Previous image",
        }}
        render={{
          slide: () => {
            const currentId =
              activeIndex >= 0 && activeIndex < displayedSlides.length
                ? displayedSlides[activeIndex].id
                : undefined;

            if (currentId === "rtl-hub-home") {
              return (
                <div className="flex h-full w-full items-center justify-center">
                  <HubHomeView />
                </div>
              );
            }
            if (currentId === "rtl-home-decision-cockpit") {
              return (
                <div className="flex h-full w-full items-center justify-center">
                  <RtlNavigationScreen />
                </div>
              );
            }
            if (currentId === "rtl-trust-signals-feed") {
              return (
                <div className="flex h-full w-full items-center justify-center">
                  <TrustSignalsFeed />
                </div>
              );
            }
            if (currentId === "rtl-journey-timeline") {
              return (
                <div className="flex h-full w-full items-center justify-center">
                  <JourneyTimelineView />
                </div>
              );
            }
            if (currentId === "rtl-progressive-disclosure") {
              return (
                <div className="flex h-full w-full items-center justify-center">
                  <ProgressiveDisclosureView />
                </div>
              );
            }
            if (currentId === "rtl-profile-hub") {
              return (
                <div className="flex h-full w-full items-center justify-center">
                  <ProfileHubView />
                </div>
              );
            }
            if (currentId === "rtl-offline-mode") {
              return (
                <div className="flex h-full w-full items-center justify-center">
                  <OfflineModeView />
                </div>
              );
            }

            return undefined;
          },
        }}
      />
    </div>
  );
}
