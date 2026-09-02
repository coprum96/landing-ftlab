"use client";

import { useEffect, useRef } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/animations";
import { useReducedMotionPreferred } from "@/lib/hooks";
import type { Dictionary } from "@/lib/i18n";

export function FieldVideoSection({ dict }: { dict: Dictionary }) {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotionPreferred();

  useEffect(() => {
    if (reduced || !sectionRef.current || !frameRef.current) return;
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        frameRef.current,
        { width: "78vw", borderRadius: 16, scale: 0.98 },
        {
          width: "100vw",
          borderRadius: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 20%",
            scrub: true,
          },
        },
      );

      gsap.fromTo(
        textRef.current,
        { y: 24, opacity: 0.35 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            end: "top 30%",
            scrub: true,
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduced) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            void video.play().catch(() => undefined);
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <section
      id="field-signal"
      ref={sectionRef}
      className="relative overflow-hidden py-16 md:py-20"
    >
      <div className="editorial-grid mb-8 md:mb-10">
        <div className="col-span-12">
          <SectionLabel>{dict.fieldVideo.label}</SectionLabel>
        </div>
      </div>

      <div
        ref={frameRef}
        className="relative mx-auto flex aspect-[16/10] max-h-[min(56vh,560px)] min-h-[280px] w-full flex-col justify-end overflow-hidden bg-[#0c0c0c] md:min-h-[360px]"
        data-cursor="play"
      >
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover opacity-70"
          src="/media/videos/human-closeup.mp4"
          poster="/media/posters/human-closeup.jpg"
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-[#080808]/35 to-[#080808]/45" />
        <div
          ref={textRef}
          className="relative z-10 w-full px-6 pb-8 pt-16 sm:px-8 sm:pb-10 md:px-14 md:pb-12 md:pt-20"
        >
          <p className="headline-display max-w-4xl pl-[0.05em] leading-[1.06]">
            {dict.fieldVideo.line1}
            <br />
            {dict.fieldVideo.line2}
            <br />
            {dict.fieldVideo.line3}
          </p>
        </div>
      </div>
    </section>
  );
}

void ScrollTrigger;
