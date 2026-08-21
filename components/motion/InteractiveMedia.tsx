"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ease } from "@/lib/animations";
import { motion } from "@/lib/motion";
import { useIsTouch, useReducedMotionPreferred } from "@/lib/hooks";
import { cx } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  caption?: string;
  className?: string;
  mediaClassName?: string;
  cursor?: "view" | "play" | "open" | "read";
  videoSrc?: string;
  poster?: React.ReactNode;
};

export function InteractiveMedia({
  children,
  caption,
  className,
  mediaClassName,
  cursor = "view",
  videoSrc,
  poster,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const touch = useIsTouch();
  const reduced = useReducedMotionPreferred();
  const parallax = useRef({ x: 0, y: 0, tx: 0, ty: 0, scale: 1 });
  const hovering = useRef(false);
  const rafRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    return () => {
      video?.pause();
    };
  }, []);

  useEffect(() => {
    if (touch || reduced) return;

    const tick = () => {
      const p = parallax.current;
      p.x += (p.tx - p.x) * 0.1;
      p.y += (p.ty - p.y) * 0.1;
      if (mediaRef.current && hovering.current) {
        mediaRef.current.style.transform = `translate3d(${p.x.toFixed(2)}px, ${p.y.toFixed(2)}px, 0) scale(${p.scale})`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reduced, touch]);

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (touch || reduced || !wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    parallax.current.tx = px * motion.card.parallaxMax * 2;
    parallax.current.ty = py * motion.card.parallaxMax * 2;
  };

  const onEnter = async () => {
    hovering.current = true;
    parallax.current.scale = motion.card.imageScale;

    if (!videoSrc || !videoRef.current) return;
    try {
      videoRef.current.currentTime = 0;
      await videoRef.current.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  const onLeave = () => {
    hovering.current = false;
    parallax.current.tx = 0;
    parallax.current.ty = 0;
    parallax.current.scale = 1;

    if (mediaRef.current) {
      gsap.to(mediaRef.current, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: ease.expo,
        overwrite: "auto",
      });
    }
    if (videoRef.current) {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <div
      ref={wrapRef}
      className={cx("group relative", className)}
      data-cursor={videoSrc ? "play" : cursor}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="media-mask relative border border-white/12 transition-[border-color] duration-500 group-hover:border-white/[0.28]">
        <div
          ref={mediaRef}
          className={cx("relative will-change-transform", mediaClassName)}
          data-card-image
        >
          <div
            className={cx(
              "transition-opacity duration-700",
              playing ? "opacity-0" : "opacity-100",
            )}
          >
            {poster ?? children}
          </div>
          {videoSrc ? (
            <video
              ref={videoRef}
              className={cx(
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
                playing ? "opacity-100" : "opacity-0",
              )}
              src={videoSrc}
              poster={
                videoSrc.includes("/videos/")
                  ? videoSrc.replace("/videos/", "/posters/").replace(/\.mp4$/, ".jpg")
                  : undefined
              }
              muted
              loop
              playsInline
              preload="none"
              aria-hidden
            />
          ) : null}
        </div>
      </div>
      {caption ? (
        <p className="label-mono mt-4 text-[10px] text-muted">{caption}</p>
      ) : null}
    </div>
  );
}
