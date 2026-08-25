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
        { width: "70vw", borderRadius: 24, scale: 0.96 },
        {
          width: "100vw",
          borderRadius: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "top 10%",
            scrub: true,
          },
        },
      );

      gsap.fromTo(
        textRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "top 25%",
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
    <section ref={sectionRef} className="section-pad relative overflow-hidden py-28">
      <div className="editorial-grid mb-12">
        <div className="col-span-12">
          <SectionLabel>{dict.fieldVideo.label}</SectionLabel>
        </div>
      </div>

      <div
        ref={frameRef}
        className="relative mx-auto flex h-[min(78vh,840px)] min-h-[460px] max-h-[840px] flex-col justify-end overflow-hidden bg-[#0c0c0c]"
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
          preload="none"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-[#080808]/35 to-[#080808]/45" />
        <div
          ref={textRef}
          className="relative z-10 w-full px-6 pb-8 pt-20 sm:px-8 sm:pb-10 md:px-14 md:pb-14 md:pt-24"
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
