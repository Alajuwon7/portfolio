"use client";

import Image from "next/image";
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
};

export default function HeroMedia({ image, modal }: HeroMediaProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.heroMedia}>
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

