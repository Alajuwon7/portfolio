"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import type { CaseStudyHero } from "@/data/caseStudies";

import styles from "./case-study.module.css";

type HeroMediaProps = {
  image: CaseStudyHero["image"];
  modal: {
    title: string;
    subtitle?: string;
    paragraphs: string[];
  };
  slug: string;
};

export default function HeroMedia({ image, modal, slug }: HeroMediaProps) {
  const [open, setOpen] = useState(false);
  const isTruePeaks = slug === "true-peaks";

  return (
    <div className={styles.heroMedia}>
      {isTruePeaks ? (
        <Link
          href="https://truepeaks.com/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.heroMediaButton}
          aria-label="Visit True Peaks website"
        >
          <div className={styles.heroImageFrame}>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              priority
              sizes="(max-width: 768px) 100vw, 640px"
              className={styles.heroImage}
            />
          </div>
        </Link>
      ) : (
        <button
          type="button"
          className={styles.heroMediaButton}
          onClick={() => setOpen(true)}
          aria-label="Open hero image details"
        >
          <div className={styles.heroImageFrame}>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              priority
              sizes="(max-width: 768px) 100vw, 640px"
              className={styles.heroImage}
            />
          </div>
        </button>
      )}

      {open && (
        <div
          className={styles.heroModalOverlay}
          role="dialog"
          aria-modal="true"
          aria-label="NVSS NKMS overview"
          onClick={() => setOpen(false)}
        >
          <div
            className={styles.heroModal}
            onClick={(event) => event.stopPropagation()}
          >
            <header className={styles.heroModalHeader}>
              <div>
                <p className={styles.heroModalEyebrow}>{modal.subtitle}</p>
                <h3>{modal.title}</h3>
              </div>
              <button
                type="button"
                className={styles.heroModalClose}
                onClick={() => setOpen(false)}
                aria-label="Close modal"
              >
                ×
              </button>
            </header>
            <div className={styles.heroModalBody}>
              {modal.paragraphs.map((text) => (
                <p key={text.slice(0, 20)}>{text}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

