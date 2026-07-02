"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function ConstellationWhaleGuide() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const whaleRef = useRef<HTMLImageElement | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const whale = whaleRef.current;

    if (!container || !whale) {
      return;
    }

    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("(min-width: 768px)", () => {
        gsap.set(container, {
          autoAlpha: 0,
          x: 0,
          y: 0,
          rotation: 0,
        });

        gsap.to(whale, {
          x: 4,
          y: -8,
          rotation: 1.2,
          duration: 8.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })
          .to(
            container,
            {
              autoAlpha: 0.35,
              x: 0,
              y: 0,
              rotation: -4,
            },
            0.14,
          )
          .to(
            container,
            {
              autoAlpha: 0.38,
              x: -54,
              y: 108,
              rotation: 0,
            },
            0.3,
          )
          .to(
            container,
            {
              autoAlpha: 0.25,
              x: 18,
              y: 246,
              rotation: 5,
            },
            0.52,
          )
          .to(
            container,
            {
              autoAlpha: 0.16,
              x: 88,
              y: 146,
              rotation: 8,
            },
            0.74,
          )
          .to(
            container,
            {
              autoAlpha: 0,
              x: 124,
              y: 98,
              rotation: 10,
            },
            0.9,
          );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed right-[6vw] top-[24vh] z-10 hidden w-[260px] opacity-0 mix-blend-screen md:block lg:w-[300px] xl:w-[360px]"
      aria-hidden="true"
    >
      <Image
        ref={whaleRef}
        src="/assets/ocia/constellation-whale.svg"
        alt=""
        width={600}
        height={400}
        unoptimized
        className="h-auto w-full opacity-90 [filter:brightness(2)_invert(1)_drop-shadow(0_0_18px_rgba(180,210,255,0.14))]"
      />
    </div>
  );
}
