"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const pathStops = [0, 0.12, 0.28, 0.45, 0.66, 0.86, 1];

const trailDots = [
  { left: "10%", top: "50%", size: "h-1 w-1", delay: 0 },
  { left: "15%", top: "42%", size: "h-1.5 w-1.5", delay: 0.45 },
  { left: "20%", top: "56%", size: "h-1 w-1", delay: 0.9 },
  { left: "25%", top: "46%", size: "h-1.5 w-1.5", delay: 1.35 },
  { left: "31%", top: "59%", size: "h-1 w-1", delay: 1.8 },
];

export default function ConstellationWhale() {
  const reduceMotion = useReducedMotion();
  const whaleRef = useRef<HTMLDivElement | null>(null);
  const [cursorNear, setCursorNear] = useState(false);

  const { scrollYProgress } = useScroll();
  const scrollProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.4,
  });

  const cursorOffsetX = useMotionValue(0);
  const cursorOffsetY = useMotionValue(0);
  const cursorRotate = useMotionValue(0);
  const glowBoost = useMotionValue(0);

  const cursorOffsetXSpring = useSpring(cursorOffsetX, {
    stiffness: 160,
    damping: 18,
    mass: 0.5,
  });
  const cursorOffsetYSpring = useSpring(cursorOffsetY, {
    stiffness: 160,
    damping: 18,
    mass: 0.5,
  });
  const cursorRotateSpring = useSpring(cursorRotate, {
    stiffness: 130,
    damping: 20,
    mass: 0.45,
  });
  const glowBoostSpring = useSpring(glowBoost, {
    stiffness: 120,
    damping: 18,
    mass: 0.4,
  });

  const whaleXBase = useTransform(
    scrollProgress,
    pathStops,
    ["95vw", "95vw", "-30vw", "70vw", "-25vw", "65vw", "15vw"],
  );
  const whaleYBase = useTransform(
    scrollProgress,
    pathStops,
    ["12vh", "18vh", "30vh", "18vh", "44vh", "28vh", "12vh"],
  );
  const whaleScaleBase = useTransform(
    scrollProgress,
    pathStops,
    [0.8, 0.82, 1.05, 0.9, 1.15, 0.75, 0.55],
  );
  const whaleRotateBase = useTransform(
    scrollProgress,
    pathStops,
    [-6, -5, 4, -8, 6, -4, 2],
  );
  const whaleOpacityBase = useTransform(
    scrollProgress,
    pathStops,
    [0, 0.12, 0.45, 0.38, 0.42, 0.25, 0],
  );

  const whaleX = useMotionTemplate`calc(${whaleXBase} + ${cursorOffsetXSpring}px)`;
  const whaleY = useMotionTemplate`calc(${whaleYBase} + ${cursorOffsetYSpring}px)`;
  const whaleRotate = useTransform(
    [whaleRotateBase, cursorRotateSpring],
    ([base, cursor]) => Number(base) + Number(cursor),
  );
  const whaleScale = useTransform(
    [whaleScaleBase, glowBoostSpring],
    ([base, boost]) => Number(base) + Number(boost) * 0.018,
  );
  const whaleOpacity = useTransform(
    [whaleOpacityBase, glowBoostSpring],
    ([base, boost]) => Math.min(0.58, Math.max(0, Number(base) + Number(boost) * 0.04)),
  );

  const lineAlpha = useTransform(
    [scrollProgress, glowBoostSpring],
    ([progress, boost]) => {
      const progressValue = Number(progress);
      const boostValue = Number(boost);
      if (progressValue < 0.1 || progressValue > 0.96) return 0;
      const base = progressValue < 0.28 ? 0.62 : progressValue < 0.66 ? 0.5 : 0.34;
      return Math.min(0.92, base + boostValue * 0.18);
    },
  );
  const glowAlpha = useTransform(
    [scrollProgress, glowBoostSpring],
    ([progress, boost]) => {
      const progressValue = Number(progress);
      const boostValue = Number(boost);
      const base = progressValue < 0.18 ? 0.08 : progressValue < 0.66 ? 0.16 : 0.1;
      return Math.max(0.02, Math.min(0.34, base + boostValue * 0.12));
    },
  );
  const whaleGlow = useMotionTemplate`drop-shadow(0 0 24px rgba(185, 212, 236, ${glowAlpha}))`;
  const twinkleOpacity = useTransform(
    [scrollProgress, glowBoostSpring],
    ([progress, boost]) => {
      const progressValue = Number(progress);
      const boostValue = Number(boost);
      if (progressValue < 0.14 || progressValue > 0.92) return 0;
      return Math.min(0.55, 0.16 + boostValue * 0.16);
    },
  );

  const bodyDrift = useTransform(scrollProgress, pathStops, [0, -2, 2, -3, 1, -1, 0]);
  const tailDrift = useTransform(scrollProgress, pathStops, [0, 1, -2, 2.5, -1.5, 1, 0]);
  const finsDrift = useTransform(scrollProgress, pathStops, [0, 0.8, -1.1, 1.6, -0.8, 0.5, 0]);

  useEffect(() => {
    if (reduceMotion) return;

    const onMouseMove = (event: MouseEvent) => {
      if (!whaleRef.current) return;

      const rect = whaleRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = event.clientX - centerX;
      const dy = event.clientY - centerY;
      const distance = Math.hypot(dx, dy);
      const radius = 360;

      if (distance < radius && distance > 0) {
        const strength = 1 - distance / radius;
        const push = 12 + strength * 16;
        cursorOffsetX.set((-dx / distance) * push);
        cursorOffsetY.set((-dy / distance) * push * 0.72);
        cursorRotate.set((-dx / radius) * 8);
        glowBoost.set(strength);
        setCursorNear(true);
        return;
      }

      cursorOffsetX.set(0);
      cursorOffsetY.set(0);
      cursorRotate.set(0);
      glowBoost.set(0);
      setCursorNear(false);
    };

    const onLeave = () => {
      cursorOffsetX.set(0);
      cursorOffsetY.set(0);
      cursorRotate.set(0);
      glowBoost.set(0);
      setCursorNear(false);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [cursorOffsetX, cursorOffsetY, cursorRotate, glowBoost, reduceMotion]);

  const bodyAnimate = reduceMotion
    ? { y: 0, scale: 1, rotate: 0 }
    : {
        y: [0, -10, 4, 8, 0],
        scale: [1, 1.012, 1.006, 0.996, 1],
        rotate: [-1.2, 0.8, -0.6, 1.2, -1.2],
      };
  const tailAnimate = reduceMotion
    ? { rotate: 0 }
    : cursorNear
      ? { rotate: [-9, 9, -8, 7, -9] }
      : { rotate: [-6, 6, -5, 4, -6] };
  const finsAnimate = reduceMotion
    ? { rotate: 0, y: 0 }
    : { rotate: [-3, 3, -2.2, 2.4, -3], y: [0, -2, 0.5, 1.8, 0] };

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[3] hidden overflow-hidden lg:block"
      style={{ opacity: whaleOpacity }}
    >
      <motion.div
        ref={whaleRef}
        className="absolute left-0 top-0 h-[19rem] w-[33rem] xl:h-[21rem] xl:w-[37rem]"
        style={{
          x: whaleX,
          y: whaleY,
          rotate: whaleRotate,
          scale: whaleScale,
          filter: whaleGlow,
        }}
      >
        {trailDots.map((dot) => (
          <motion.span
            key={`${dot.left}-${dot.top}`}
            className={`absolute ${dot.size} rounded-full bg-[rgba(220,235,248,0.84)]`}
            style={{ left: dot.left, top: dot.top, opacity: twinkleOpacity }}
            animate={
              reduceMotion
                ? { opacity: 0.12 }
                : {
                    opacity: [0.04, 0.24, 0.1, 0.18, 0.04],
                    x: [0, -10, -18, -28, -36],
                    y: [0, 3, -2, 2, 0],
                    scale: [0.9, 1.3, 1, 1.12, 0.84],
                  }
            }
            transition={{
              duration: 5.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: dot.delay,
            }}
          />
        ))}

        <motion.div
          className="absolute left-[16%] top-[18%] h-1.5 w-1.5 rounded-full bg-[rgba(233,241,248,0.86)]"
          animate={
            reduceMotion
              ? { opacity: 0.18 }
              : { opacity: [0.12, 0.48, 0.16, 0.38, 0.12], scale: [1, 1.34, 1, 1.18, 1] }
          }
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ opacity: twinkleOpacity }}
        />
        <motion.div
          className="absolute left-[60%] top-[11%] h-1 w-1 rounded-full bg-[rgba(233,241,248,0.76)]"
          animate={
            reduceMotion
              ? { opacity: 0.14 }
              : { opacity: [0.08, 0.3, 0.14, 0.34, 0.08], scale: [1, 1.24, 1, 1.1, 1] }
          }
          transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
          style={{ opacity: twinkleOpacity }}
        />
        <motion.div
          className="absolute left-[78%] top-[64%] h-1.5 w-1.5 rounded-full bg-[rgba(233,241,248,0.72)]"
          animate={
            reduceMotion
              ? { opacity: 0.14 }
              : { opacity: [0.1, 0.36, 0.14, 0.28, 0.1], scale: [1, 1.22, 1, 1.14, 1] }
          }
          transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          style={{ opacity: twinkleOpacity }}
        />

        <motion.svg
          viewBox="0 0 1191 687"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full mix-blend-screen"
          style={{ color: "rgba(206,224,240,0.92)", opacity: lineAlpha }}
        >
          <motion.g
            id="Body"
            animate={bodyAnimate}
            transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "595px 343px", transformBox: "view-box", y: bodyDrift }}
          >
            <path
              d="M16.588 363.219L6.89131 342.209L16.588 321.2L100.626 295.342L216.986 267.868M16.588 321.2H92.5453M16.588 363.219L39.2136 332.512L100.626 295.342M100.626 295.342L92.5453 321.2M380.214 240.394H310.721L216.986 267.868M216.986 267.868L246.076 287.261M216.986 267.868L168.503 327.664M310.721 240.394L246.076 287.261M380.214 240.394L501.422 267.868M380.214 240.394L396.375 284.029M380.214 240.394L349.507 170.901L391.526 120.802L373.749 52.9248M380.214 240.394L310.721 292.11M380.214 240.394L246.076 287.261M501.422 267.868L609.702 277.565M501.422 267.868L551.522 293.726M501.422 267.868L538.593 327.664M501.422 267.868L467.484 316.351M501.422 267.868L396.375 284.029M609.702 277.565L596.773 292.11M682.427 292.11L672.73 274.332L653.337 263.02L621.085 267.868L609.702 277.565M596.773 292.11L616.166 311.503M596.773 292.11L538.593 327.664M596.773 292.11L551.522 293.726M616.166 311.503L635.56 284.029M616.166 311.503L653.337 314.735M616.166 311.503L538.593 327.664M462.456 413.318L517.583 392.309L616.166 311.503M616.166 311.503L587.076 402.005M616.166 311.503L658.185 369.683M635.56 284.029L621.085 267.868M635.56 284.029L672.73 274.332M653.337 314.735L658.185 369.683M653.337 314.735L682.427 292.11M538.593 327.664L551.522 293.726M538.593 327.664L517.583 392.309M538.593 327.664L457.787 372.915M538.593 327.664L467.484 316.351M587.076 402.005L519.199 392.309L457.787 372.915M587.076 402.005L658.185 369.683M637.176 424.631L588.797 402.782L587.076 402.005M457.787 372.915L419 419.783M457.787 372.915L408.811 343.836M457.787 372.915H385.062M467.484 450.489L464.251 411.702L457.787 372.915M467.484 316.351L406.071 342.209M467.484 316.351L396.375 284.029M396.375 284.029L310.721 292.11M396.375 284.029L373.749 342.209M396.375 284.029L406.071 342.209M310.721 292.11L246.076 287.261M310.721 292.11L330.114 363.572M310.721 292.11L373.749 342.209M246.076 287.261L168.503 327.664M246.076 287.261L275.166 363.219M246.076 287.261V359.986M246.076 287.261L330.114 363.572M168.503 327.664L92.5453 321.2M168.503 327.664L186.28 353.522M168.503 327.664L150.725 363.219M168.503 327.664L246.076 359.986M275.166 363.219L246.076 359.986M275.166 363.219L310.721 379.38L330.114 363.572M246.076 359.986L333.346 413.318L385.062 432.712M246.076 359.986L186.28 353.522M92.5453 321.2L47.2942 363.219M92.5453 321.2V348.674M92.5453 321.2L150.725 363.219M16.588 363.219H47.2942M666.266 481.195L672.73 510.285L591.924 547.456L467.484 557.152L339.811 547.456L132.948 494.124L53.7586 440.792L2.04297 385.844L16.588 363.219M638.792 507.053L545.057 534.527L419 547.456L310.721 534.527L144.261 484.427L16.588 363.219M39.2136 332.512L47.2942 363.219M47.2942 363.219L92.5453 348.674M47.2942 363.219L92.5453 369.683M47.2942 363.219L194.36 484.427L380.214 534.527M92.5453 348.674L150.725 363.219M545.057 518.366L454.555 515.133L362.436 500.588L221.834 455.337L92.5453 369.683M92.5453 369.683L147.549 363.572M147.549 363.572L150.725 363.219L186.28 353.522M186.28 353.522L310.721 427.863L380.214 450.489M682.427 292.11L658.185 369.683M682.427 292.11L719.597 327.664M682.427 292.11L738.183 289.685M738.183 289.685L793.939 287.261L803.635 350.29M793.939 287.261L722.988 325.822M793.939 287.261L764.849 385.844M800.403 458.569L808.484 465.034L868.28 419.783L852.119 385.844L803.635 350.29M803.635 350.29L764.849 385.844M852.119 385.844H764.849M868.28 419.783L764.849 385.844M800.403 458.569L666.266 481.195M800.403 458.569L764.849 385.844M800.403 458.569L719.597 432.712M666.266 481.195L561.218 450.489M666.266 481.195L719.597 432.712M666.266 481.195L637.176 424.631M672.73 510.285L638.792 507.053M672.73 510.285L561.218 450.489M606.469 500.588L545.057 518.366L380.214 534.527H310.721M574.147 494.124L606.469 500.588L638.792 507.053M451.17 474.73L457.787 489.275L485.261 507.053L574.147 494.124M574.147 494.124L492.109 468.881M574.147 494.124L561.218 450.489M457.787 489.275L490.109 468.266M490.109 468.266H454.555M490.109 468.266L545.057 440.792M490.109 468.266L467.484 450.489M490.109 468.266L492.109 468.881M454.555 515.133L419 474.73M419 474.73H349.507L241.228 432.712L147.549 363.572M419 474.73L380.214 450.489M419 474.73L451.17 468.881M380.214 450.489L385.062 432.712M454.555 468.266L451.17 468.881M454.555 468.266L467.484 450.489M467.484 450.489L451.17 468.881M467.484 450.489L545.057 440.792M467.484 450.489L431.929 440.792M545.057 440.792L561.218 450.489M545.057 440.792L462.456 413.318M545.057 440.792L547.351 440.39M561.218 450.489L492.109 468.881M719.597 327.664L658.185 369.683M719.597 327.664L722.988 325.822M719.597 327.664L764.849 385.844M719.597 327.664V432.712M658.185 369.683L637.176 424.631M658.185 369.683L719.597 432.712M637.176 424.631L719.597 432.712M637.176 424.631L547.351 440.39M719.597 432.712L764.849 385.844M738.183 289.685L722.988 325.822M330.114 363.572L373.749 342.209M330.114 363.572L385.062 372.915M373.749 342.209H406.071M373.749 342.209L385.062 372.915M406.071 342.209L408.811 343.836M419 419.783L339.811 402.005L339.05 399.471L330.114 369.683M419 419.783L385.062 372.915M419 419.783L431.929 440.792M385.062 372.915L408.811 343.836M385.062 372.915L339.05 399.471M431.929 440.792L385.062 432.712M464.251 411.702L462.456 413.318L431.929 440.792M547.351 440.39L517.583 393.925M547.351 440.39L588.797 402.782"
              stroke="currentColor"
              strokeWidth="3.23223"
            />
          </motion.g>

          <motion.g
            id="Tail"
            animate={tailAnimate}
            transition={{
              duration: cursorNear ? 2.2 : 2.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "805px 286px", transformBox: "view-box", rotate: tailDrift }}
          >
            <path
              d="M984.64 167.669L955.55 250.091L924.844 326.048L868.28 419.783L852.119 385.844M852.119 385.844L924.844 326.048M860.2 240.394L792.323 292.11L805.252 350.29L805.269 350.303L852.119 385.844M805.252 350.29L924.844 330.896M805.252 350.29L848.887 290.493M860.2 240.394L903.835 177.365M860.2 240.394L848.887 290.493M860.2 240.394L908.683 219.384M860.2 240.394L903.835 280.797M903.835 177.365L897.37 151.508M903.835 177.365L947.47 174.133M792.323 62.6214L831.11 114.337L852.119 136.963L897.37 151.508M897.37 151.508L941.005 122.418M897.37 151.508L921.612 73.9342M852.119 136.963L921.612 73.9342M831.11 114.337L837.574 54.5408M831.11 114.337L921.612 73.9342M792.323 62.6214L730.911 54.5408M792.323 62.6214L837.574 54.5408M792.323 62.6214L797.171 31.9152M894.138 31.9152L837.574 10.9058L763.233 23.8347L730.911 54.5408L690.508 94.9437L627.479 106.256L590.309 62.6214L525.664 70.702M992.721 70.702L965.247 62.6214L955.55 41.6119L894.138 31.9152M894.138 31.9152H797.171M894.138 31.9152L837.574 54.5408M955.55 41.6119L837.574 54.5408M955.55 41.6119L921.612 73.9342M941.005 122.418L992.721 70.702L1007.27 54.5408L1012.11 52.4329L1044.44 38.3797L1125.24 31.9152M992.721 70.702L921.612 73.9342M1044.44 38.3797L1050.9 98.1759M1044.44 38.3797L1046.57 41.6119M1007.27 151.508L1052.52 159.588L1125.24 136.963L1175.34 62.6214L1188.27 2.8252L1125.24 31.9152M1125.24 31.9152V70.702M1188.27 2.8252L1125.24 70.702M1175.34 62.6214L1125.24 70.702M1125.24 136.963V70.702M1125.24 136.963L1094.54 114.337M1052.52 159.588L1094.54 114.337M1052.52 159.588L1050.9 98.1759M1007.27 151.508L984.64 167.669M1007.27 151.508L1050.9 98.1759M1007.27 151.508L989.489 119.185M984.64 167.669L989.489 119.185M984.64 167.669L947.47 174.133M955.55 250.091L903.835 280.797M955.55 250.091L908.683 219.384M955.55 250.091L947.47 174.133M924.844 326.048L903.835 280.797M903.835 280.797L908.683 219.384M903.835 280.797L805.269 350.303M903.835 280.797L848.887 290.493M908.683 219.384L947.47 174.133M947.47 174.133L941.005 122.418M947.47 174.133L989.489 119.185M941.005 122.418L921.612 73.9342M941.005 122.418L989.489 119.185M921.612 73.9342L837.574 54.5408M837.574 54.5408L797.171 31.9152M797.171 31.9152L758.384 23.8347M989.489 119.185L1050.9 98.1759M989.489 119.185L992.721 73.9342M1050.9 98.1759L1094.54 114.337M1050.9 98.1759L1012.11 52.4329M1094.54 114.337L1125.24 70.702M1094.54 114.337L1046.57 41.6119M1125.24 70.702L1046.57 41.6119M848.887 290.493L797.171 292.11"
              stroke="currentColor"
              strokeWidth="3.23223"
            />
          </motion.g>

          <motion.g
            id="Fins"
            animate={finsAnimate}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "596px 345px", transformBox: "view-box", rotate: finsDrift }}
          >
            <path
              d="M268.703 658.968L250.925 667.048L226.684 658.968V562.001L250.925 524.83L268.703 529.678M226.684 562.001L271.935 550.688M257.39 642.806L242.845 615.332L226.684 562.001M226.684 658.968L257.39 642.806M268.703 658.968L323.65 684.825L380.214 642.806L333.347 615.332L380.214 591.091M268.703 529.678L310.722 537.759L338.195 547.456L292.944 581.394L268.703 625.029V658.968M268.703 658.968L257.39 642.806M338.195 547.456L301.025 555.536L271.935 550.688M271.935 550.688L310.722 537.759M271.935 550.688L268.703 529.678M271.935 550.688L257.39 642.806M271.935 550.688L242.845 615.332"
              stroke="currentColor"
              strokeWidth="3.23223"
            />
            <path
              d="M963.631 540.991V560.384L871.512 576.546L764.849 549.072L674.346 511.901L666.266 481.195L797.171 456.953L810.1 466.65L871.512 516.749M764.849 549.072L666.266 481.195M764.849 549.072L760 494.124M764.849 549.072L785.858 532.91M666.266 481.195L760 494.124M760 494.124L797.171 456.953M760 494.124L871.512 516.749M760 494.124L785.858 532.91M871.512 576.546L785.858 532.91M963.631 560.384L785.858 532.91M963.631 540.991L984.64 486.043H1058.98L1078.37 456.953L1097.77 494.124M963.631 540.991L871.512 516.749M963.631 540.991L785.858 532.91M871.512 516.749L785.858 532.91"
              stroke="currentColor"
              strokeWidth="3.23223"
            />
            <path
              d="M696.972 233.93L653.337 240.394L619.398 267.868L653.337 263.02M653.337 240.394V263.02M653.337 263.02L696.972 233.93M772.929 177.366L717.981 183.83L696.972 233.93L672.73 275.949L653.337 263.02"
              stroke="currentColor"
              strokeWidth="3.23223"
            />
          </motion.g>
        </motion.svg>
      </motion.div>
    </motion.div>
  );
}
