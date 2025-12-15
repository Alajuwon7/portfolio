'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import type { CaseStudyHero } from "@/data/caseStudies";

import styles from "./case-study.module.css";

type StepGalleryProps = {
  images: Array<CaseStudyHero["image"]>;
};

export default function StepGallery({ images }: StepGalleryProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);

  const activeImage =
    activeIndex === null ? null : (images[activeIndex] as CaseStudyHero["image"]);

  const scroll = (direction: "prev" | "next") => {
    if (!viewportRef.current) return;
    const { clientWidth } = viewportRef.current;
    viewportRef.current.scrollBy({
      left: direction === "next" ? clientWidth : -clientWidth,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
        setZoom(1);
        return;
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) => {
          if (current === null) return current;
          return (current + 1) % images.length;
        });
        setZoom(1);
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => {
          if (current === null) return current;
          return (current - 1 + images.length) % images.length;
        });
        setZoom(1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, images.length]);

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
      const nextIndex =
        direction === "next"
          ? (current + 1) % images.length
          : (current - 1 + images.length) % images.length;
      return nextIndex;
    });
    setZoom(1);
  };

  const zoomIn = () => setZoom((value) => Math.min(value + 0.25, 3));
  const zoomOut = () => setZoom((value) => Math.max(value - 0.25, 0.5));

  return (
    <div className={styles.stepGallery}>
      <div className={styles.stepGalleryViewport} ref={viewportRef}>
        {images.map((image, index) => {
          const picture = (
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(max-width: 768px) 100vw, 360px"
              loading={index === 0 ? "eager" : "lazy"}
              className={styles.stepGalleryImage}
            />
          );

          return (
            <figure key={`${image.src}-${index}`} className={styles.stepGallerySlide}>
              <div className={styles.stepGalleryImageFrame}>
                <button
                  type="button"
                  className={styles.stepGalleryImageButton}
                  onClick={() => openModal(index)}
                  aria-label={`Open ${image.alt} in a larger view`}
                >
                  {picture}
                </button>
              </div>
              <figcaption>
                {image.alt}
                {image.link && (
                  <>
                    {" "}
                    <Link
                      href={image.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.stepGalleryInlineLink}
                    >
                      Open source ↗
                    </Link>
                  </>
                )}
              </figcaption>
            </figure>
          );
        })}
      </div>

      {images.length > 1 && (
        <div className={styles.stepGalleryControls}>
          <button
            type="button"
            className={styles.stepGalleryArrow}
            onClick={() => scroll("prev")}
            aria-label="Scroll gallery backward"
          >
            ←
          </button>
          <button
            type="button"
            className={styles.stepGalleryArrow}
            onClick={() => scroll("next")}
            aria-label="Scroll gallery forward"
          >
            →
          </button>
        </div>
      )}

      {activeImage && (
        <div
          className={styles.stepGalleryModal}
          role="dialog"
          aria-modal="true"
          aria-label={`Expanded view of ${activeImage.alt}`}
          onClick={closeModal}
        >
          <div
            className={styles.stepGalleryModalContent}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={styles.stepGalleryModalClose}
              aria-label="Close image modal"
              onClick={closeModal}
            >
              ×
            </button>

            <div className={styles.stepGalleryModalImageFrame}>
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                width={activeImage.width}
                height={activeImage.height}
                sizes="(max-width: 1024px) 100vw, 1100px"
                className={styles.stepGalleryModalImage}
                style={{
                  transform: `scale(${zoom})`,
                  transformOrigin: "center",
                }}
              />
            </div>

            <div className={styles.stepGalleryModalControls}>
              <div className={styles.stepGalleryModalNav}>
                <button
                  type="button"
                  className={styles.stepGalleryModalArrow}
                  onClick={() => goTo("prev")}
                  aria-label="View previous image"
                  disabled={images.length <= 1}
                >
                  ←
                </button>
                <button
                  type="button"
                  className={styles.stepGalleryModalArrow}
                  onClick={() => goTo("next")}
                  aria-label="View next image"
                  disabled={images.length <= 1}
                >
                  →
                </button>
              </div>

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
            </div>

            <div className={styles.stepGalleryModalFooter}>
              <p className={styles.stepGalleryModalCaption}>{activeImage.alt}</p>
              {activeImage.link && (
                <Link
                  href={activeImage.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.stepGalleryModalLink}
                >
                  View source ↗
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}