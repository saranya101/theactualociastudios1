import type { ComponentPropsWithoutRef, ReactNode } from "react";

type SceneTone = "night" | "mist" | "dawn";

const scrimClasses: Record<SceneTone, string> = {
  night:
    "bg-[linear-gradient(180deg,rgba(2,6,12,0.35),rgba(2,6,12,0.12))]",
  mist:
    "bg-[linear-gradient(180deg,rgba(4,10,18,0.28),rgba(5,12,20,0.14))]",
  dawn:
    "bg-[linear-gradient(180deg,rgba(6,12,20,0.18),rgba(10,18,28,0.12))]",
};

const glowClasses: Record<SceneTone, string> = {
  night:
    "bg-[radial-gradient(circle_at_20%_18%,rgba(110,140,170,0.06),transparent_22%),radial-gradient(circle_at_82%_72%,rgba(78,104,132,0.06),transparent_24%)]",
  mist:
    "bg-[radial-gradient(circle_at_16%_18%,rgba(158,188,218,0.1),transparent_22%),radial-gradient(circle_at_82%_18%,rgba(112,142,172,0.08),transparent_18%),radial-gradient(circle_at_50%_82%,rgba(92,122,152,0.08),transparent_24%)]",
  dawn:
    "bg-[radial-gradient(circle_at_50%_18%,rgba(176,198,220,0.1),transparent_24%),radial-gradient(circle_at_24%_80%,rgba(118,144,170,0.08),transparent_24%),radial-gradient(circle_at_84%_22%,rgba(94,120,146,0.06),transparent_18%)]",
};

const textureClasses: Record<SceneTone, string> = {
  night:
    "opacity-[0.08] [background-image:radial-gradient(rgba(236,242,247,0.14)_0.7px,transparent_0.7px)] [background-size:30px_30px]",
  mist:
    "opacity-[0.08] [background-image:radial-gradient(rgba(73,98,126,0.12)_0.7px,transparent_0.7px)] [background-size:32px_32px]",
  dawn:
    "opacity-[0.05] [background-image:radial-gradient(rgba(170,194,216,0.12)_0.7px,transparent_0.7px)] [background-size:34px_34px]",
};

type SceneSectionProps = ComponentPropsWithoutRef<"section"> & {
  tone?: SceneTone;
  children: ReactNode;
};

export default function SceneSection({
  tone = "night",
  className = "",
  children,
  ...props
}: SceneSectionProps) {
  return (
    <section {...props} className={`relative overflow-hidden bg-transparent ${className}`}>
      <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${scrimClasses[tone]}`} />
      <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${glowClasses[tone]}`} />
      <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${textureClasses[tone]}`} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-24 h-32 bg-[linear-gradient(180deg,rgba(170,198,224,0),rgba(170,198,224,0.04)_48%,rgba(170,198,224,0))] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-24 h-36 bg-[linear-gradient(180deg,rgba(170,198,224,0),rgba(170,198,224,0.035)_42%,rgba(170,198,224,0))] blur-3xl"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(233,239,245,0.1),transparent)]" />
      {children}
    </section>
  );
}
