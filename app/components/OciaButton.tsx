"use client";

import Link from "next/link";

type OciaButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
  arrow?: boolean;
  className?: string;
};

export default function OciaButton({
  href,
  children,
  variant = "primary",
  arrow = false,
  className = "",
}: OciaButtonProps) {
  const baseClassName =
    "group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 text-sm transition duration-300";

  const variantClassName =
    variant === "primary"
      ? "border border-[rgba(255,255,255,0.34)] bg-[linear-gradient(180deg,#ffffff_0%,#d7e0ea_100%)] font-semibold text-[#061018] shadow-[0_12px_40px_rgba(180,210,255,0.12)] hover:-translate-y-0.5 hover:border-[rgba(255,255,255,0.42)] hover:bg-[linear-gradient(180deg,#ffffff_0%,#e5edf6_100%)] hover:shadow-[0_18px_46px_rgba(180,210,255,0.18)]"
      : variant === "secondary"
        ? "border border-white/14 bg-[rgba(255,255,255,0.04)] font-medium text-white/90 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-md hover:-translate-y-0.5 hover:border-[rgba(198,214,230,0.28)] hover:bg-[rgba(255,255,255,0.065)] hover:text-white"
        : "min-h-0 rounded-none border-0 px-0 font-medium text-[rgba(197,216,234,0.88)] hover:text-white";

  return (
    <Link href={href} className={`${baseClassName} ${variantClassName} ${className}`.trim()}>
      <span className={variant === "primary" ? "text-[#061018]" : undefined}>{children}</span>
      {arrow ? (
        <span
          aria-hidden="true"
          className={`text-base transition-transform duration-300 group-hover:translate-x-0.5 ${
            variant === "primary"
              ? "text-[#061018]/78"
              : variant === "secondary"
                ? "text-white/72"
                : "text-[rgba(197,216,234,0.72)]"
          }`}
        >
          →
        </span>
      ) : null}
    </Link>
  );
}
