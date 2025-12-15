"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./case-study.module.css";

export type ShowcaseSlide = {
  id: string;
  category: string;
  caption: string;
  link?: string;
  video?: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

type DesignShowcaseCarouselProps = {
  slides: ShowcaseSlide[];
};

export default function DesignShowcaseCarousel({
  slides,
}: DesignShowcaseCarouselProps) {
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
