"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  motion,
  useReducedMotion,
} from "framer-motion";
import Lenis from "lenis";
import { DM_Serif_Display } from "next/font/google";
import Link from "next/link";
import { FormEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import ConstellationWhale from "./components/ConstellationWhale";
import OciaButton from "./components/OciaButton";
import SceneSection from "./components/SceneSection";
import { CALENDLY_URL } from "./lib/ocia-links";

gsap.registerPlugin(ScrollTrigger);

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
});

const navItems = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "/#process" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contact", href: "/#contact" },
];

const heroShowcaseCards = [
  {
    title: "Website Redesign",
    subtitle: "Built for credibility and enquiries",
    type: "website",
    image: null,
    accent: "from-[#d9ecfa] via-[#eef7ff] to-[#ffffff]",
    desktopWidth: "w-[20rem] xl:w-[21rem]",
    desktopHeight: "h-[25rem] xl:h-[27rem]",
    desktopShift: "mt-4",
    rotate: -1.5,
    mobileWidth: "w-[18rem]",
  },
  {
    title: "Client Landing Page",
    subtitle: "Clearer offer, stronger CTA flow",
    type: "landing",
    image: null,
    accent: "from-[#efe1cc] via-[#faf0e4] to-[#ffffff]",
    desktopWidth: "w-[21rem] xl:w-[22rem]",
    desktopHeight: "h-[25.75rem] xl:h-[27.75rem]",
    desktopShift: "mt-1",
    rotate: 1,
    mobileWidth: "w-[18rem]",
  },
  {
    title: "Lead Flow",
    subtitle: "Visitor → enquiry → follow-up",
    type: "flow",
    image: null,
    accent: "from-[#dbe9d2] via-[#eef7e8] to-[#ffffff]",
    desktopWidth: "w-[22rem] xl:w-[23rem]",
    desktopHeight: "h-[26rem] xl:h-[28rem]",
    desktopShift: "mt-5",
    rotate: -0.5,
    mobileWidth: "w-[18rem]",
  },
  {
    title: "WhatsApp Automation",
    subtitle: "Faster replies to warm leads",
    type: "chat",
    image: null,
    accent: "from-[#d7f0e7] via-[#ebfaf4] to-[#ffffff]",
    desktopWidth: "w-[19rem] xl:w-[20rem]",
    desktopHeight: "h-[25.25rem] xl:h-[27.25rem]",
    desktopShift: "mt-2",
    rotate: 1.5,
    mobileWidth: "w-[17rem]",
  },
  {
    title: "Booking Flow",
    subtitle: "Less friction before appointments",
    type: "booking",
    image: null,
    accent: "from-[#f2e4cf] via-[#fcf3e8] to-[#ffffff]",
    desktopWidth: "w-[18rem] xl:w-[19rem]",
    desktopHeight: "h-[24.5rem] xl:h-[26.5rem]",
    desktopShift: "mt-6",
    rotate: -1,
    mobileWidth: "w-[17rem]",
  },
  {
    title: "CRM Follow-up",
    subtitle: "Stop opportunities going cold",
    type: "crm",
    image: null,
    accent: "from-[#dde1f7] via-[#eef0ff] to-[#ffffff]",
    desktopWidth: "w-[19.5rem] xl:w-[20.5rem]",
    desktopHeight: "h-[25.25rem] xl:h-[27.25rem]",
    desktopShift: "mt-3",
    rotate: 0.75,
    mobileWidth: "w-[17rem]",
  },
  {
    title: "SEO Visibility",
    subtitle: "Help the right people find you",
    type: "seo",
    image: null,
    accent: "from-[#dce4fa] via-[#edf2ff] to-[#ffffff]",
    desktopWidth: "w-[18.5rem] xl:w-[19.5rem]",
    desktopHeight: "h-[24.75rem] xl:h-[26.75rem]",
    desktopShift: "mt-5",
    rotate: -1.25,
    mobileWidth: "w-[17rem]",
  },
  {
    title: "Website Audit",
    subtitle: "Find where leads are leaking",
    type: "audit",
    image: null,
    accent: "from-[#e9d7c8] via-[#f6e9dc] to-[#fff8f1]",
    desktopWidth: "w-[20rem] xl:w-[21rem]",
    desktopHeight: "h-[25.5rem] xl:h-[27.5rem]",
    desktopShift: "mt-2",
    rotate: 1,
    mobileWidth: "w-[18rem]",
  },
  {
    title: "Business System",
    subtitle: "Website, automation, and follow-up connected",
    type: "system",
    image: null,
    accent: "from-[#d6e9f5] via-[#eef8ff] to-[#ffffff]",
    desktopWidth: "w-[21rem] xl:w-[22rem]",
    desktopHeight: "h-[26rem] xl:h-[28rem]",
    desktopShift: "mt-4",
    rotate: -0.75,
    mobileWidth: "w-[18rem]",
  },
];

const problemCards = [
  {
    title: "Visitors do not trust fast enough",
    body: "Unclear messaging, weak proof, and poor design make people hesitate before they enquire.",
  },
  {
    title: "Enquiries are harder than they should be",
    body: "Weak CTAs, messy forms, and poor booking flows stop interested visitors from taking action.",
  },
  {
    title: "Leads slip through the cracks",
    body: "Slow replies, inconsistent WhatsApp handling, and no CRM follow-up turn warm leads cold.",
  },
];

const valueChips = [
  "Improve trust",
  "Increase enquiries",
  "Reduce friction",
  "Capture more leads",
  "Respond faster",
  "Follow up better",
];

const auditChecklist = [
  "Homepage and messaging review",
  "Trust and credibility review",
  "CTA and enquiry flow review",
  "SEO basics review",
  "Booking and contact flow review",
  "Quick-win opportunities",
  "Recommended next steps",
];

const servicePillars = [
  {
    title: "Website & Conversion",
    text: "Redesign your website so it looks credible, feels easier to use, and leads visitors toward action.",
    includes: [
      "Website Redesign",
      "Conversion Optimisation",
      "CTA Improvements",
      "Enquiry Flow",
    ],
  },
  {
    title: "Search & Visibility",
    text: "Improve your visibility so the right people can find your business when they are searching.",
    includes: ["SEO", "Local Search", "Page Structure", "Content Improvements"],
  },
  {
    title: "Automation & Lead Handling",
    text: "Respond faster, qualify leads better, and stop enquiries from slipping through the cracks.",
    includes: [
      "WhatsApp Automation",
      "CRM",
      "Lead Tracking",
      "Follow-up Workflows",
    ],
  },
  {
    title: "Growth Support",
    text: "Add tools and content that support trust, booking, and conversion.",
    includes: [
      "AI Chatbot",
      "Appointment Booking System",
      "E-commerce Improvement",
      "Social Media Content",
    ],
  },
];

const funnelSteps = [
  {
    label: "Traffic",
    body: "Can the right people find you?",
  },
  {
    label: "Trust",
    body: "Do they believe you are credible?",
  },
  {
    label: "Action",
    body: "Is the next step obvious?",
  },
  {
    label: "Response",
    body: "Are enquiries handled quickly?",
  },
  {
    label: "Follow-up",
    body: "Are leads tracked until they convert?",
  },
];

const processSteps = [
  {
    step: "Audit",
    body: "We review your website, trust signals, SEO basics, enquiry journey, booking flow, and lead handling process.",
  },
  {
    step: "Identify",
    body: "We pinpoint the highest-impact issues and recommend the best service mix based on what is actually limiting growth.",
  },
  {
    step: "Improve",
    body: "We redesign, optimise, automate, or rebuild the weak parts of your funnel.",
  },
  {
    step: "Grow",
    body: "You get a stronger online presence, more qualified enquiries, and a better system for converting interest into revenue.",
  },
];

const outcomeCards = [
  "A website that builds more trust",
  "Clearer messaging that improves response",
  "Better conversion from existing traffic",
  "More enquiries from the right people",
  "Less friction in forms and booking",
  "Faster response to leads",
  "Better follow-up and less leakage",
  "A clearer growth plan based on real gaps",
];

const industries = [
  "Aesthetic clinics",
  "Dental clinics",
  "Medical clinics",
  "Interior design firms",
  "Home services",
  "Restaurants and hospitality",
  "Legal and professional services",
  "Local service businesses",
];

const whyOciaCards = [
  {
    title: "We look at the full funnel",
    body: "We do not only judge the website design. We look at visibility, trust, enquiry flow, response speed, and follow-up.",
  },
  {
    title: "We recommend based on evidence",
    body: "The audit shows what is actually limiting growth before we suggest what to fix.",
  },
  {
    title: "We build practical systems",
    body: "From SEO and conversion to WhatsApp, booking, CRM, and follow-up, we focus on what helps enquiries become opportunities.",
  },
];

const improvementCards = [
  "Clearer messaging so visitors understand your value faster",
  "Stronger CTA placement so more visitors take action",
  "Better trust signals so the business feels more credible",
  "Improved enquiry flow so fewer leads drop off",
  "Better booking experience so prospects can move faster",
  "Cleaner follow-up systems so warm leads do not get lost",
];

const faqs = [
  {
    question: "Do you only do website redesign?",
    answer:
      "No. Website redesign is one part of the work, but we also improve SEO, conversion flow, WhatsApp handling, booking journeys, CRM setup, automation and follow-up.",
  },
  {
    question: "What if I already have a website?",
    answer:
      "That is completely fine. Many businesses we help already have a live site. We review what is underperforming and recommend whether to optimise, restructure, or redesign.",
  },
  {
    question: "How do I know which service I need?",
    answer:
      "That is exactly why the audit comes first. We use it to identify whether the biggest gap is trust, visibility, conversion, response speed, or follow-up.",
  },
  {
    question: "Can you help us get more leads, not just improve design?",
    answer:
      "Yes. The focus is on more qualified enquiries and a stronger system behind them, not visual polish for its own sake.",
  },
  {
    question: "Do you help with follow-up and CRM too?",
    answer:
      "Yes. We can improve WhatsApp workflows, contact handling, CRM setup, reminders, lead tracking and practical automation so leads do not get lost.",
  },
  {
    question: "Do you work with local service businesses?",
    answer:
      "Yes. OCIA is especially well suited to service businesses where trust, visibility, and a clean enquiry process directly affect revenue.",
  },
  {
    question: "What happens after the free audit?",
    answer:
      "We show you the main opportunities, explain what is limiting performance, and recommend the best next step. If it makes sense to work together, we plan the right scope from there.",
  },
];

const footerLinks = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/#solutions" },
  { label: "Process", href: "/#process" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contact", href: "/#contact" },
];

const sectionRevealSelectors = [
  "[data-problem-section]",
  "[data-value-section]",
  "[data-audit-section]",
  "[data-services-section]",
  "[data-funnel-section]",
  "[data-process-section]",
  "[data-outcomes-section]",
  "[data-industries-section]",
  "[data-why-section]",
  "[data-improvement-section]",
  "[data-faq-section]",
  "[data-final-section]",
];

function SectionIntro({
  label,
  title,
  body,
  align = "left",
}: {
  label: string;
  title: string;
  body: string;
  align?: "left" | "center";
}) {
  return (
    <div
      data-reveal-intro
      className={align === "center" ? "mx-auto max-w-4xl text-center" : "max-w-3xl"}
    >
      <p className="text-[0.68rem] font-medium uppercase tracking-[0.42em] text-white/42 sm:text-[0.72rem]">
        {label}
      </p>
      <h2 className="mt-5 text-[2.45rem] font-medium leading-[0.95] tracking-[-0.055em] text-white sm:text-[3.4rem] md:text-[4.35rem]">
        {title}
      </h2>
      <p className="mt-6 max-w-3xl text-[1rem] leading-8 text-white/68 md:text-[1.08rem]">
        {body}
      </p>
    </div>
  );
}

function HeroHeadline() {
  const reduceMotion = useReducedMotion();

  const lineTransition = (delay: number) => ({
    duration: 0.78,
    delay,
    ease: [0.22, 1, 0.36, 1] as const,
  });

  return (
    <div className="mx-auto mt-7 max-w-[54rem] sm:max-w-[58rem]">
      <div
        className={`${dmSerifDisplay.className} text-[3.2rem] font-normal leading-[0.88] tracking-[-0.045em] text-[#071827] sm:text-[4.7rem] md:text-[6.25rem] lg:text-[7.1rem] xl:text-[7.9rem]`}
        style={{ fontFeatureSettings: '"liga" 0, "clig" 0' }}
      >
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={lineTransition(0.08)}
          className="block"
        >
          We make{" "}
          <motion.span
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={lineTransition(0.18)}
            className="inline-block"
          >
            websites
          </motion.span>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={lineTransition(0.26)}
          className="mt-1 block"
        >
          people actually
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={lineTransition(0.38)}
          className="mt-1 block"
        >
          <span className="relative inline-flex items-end">
            <motion.span
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={lineTransition(0.44)}
              className="relative z-10 inline-block"
            >
              enquire
            </motion.span>
            <motion.span
              aria-hidden="true"
              initial={
                reduceMotion
                  ? false
                  : { scaleX: 0, opacity: 0.35, x: "-10%" }
              }
              animate={
                reduceMotion
                  ? undefined
                  : { scaleX: 1, opacity: 0.95, x: "0%" }
              }
              transition={{
                duration: 0.72,
                delay: 0.52,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute bottom-[0.18em] left-[-0.04em] right-[-0.04em] z-0 h-[0.22em] origin-left rounded-full bg-[linear-gradient(90deg,rgba(126,178,220,0.12),rgba(126,178,220,0.42),rgba(190,220,245,0.18))]"
            />
            <motion.span
              aria-hidden="true"
              initial={reduceMotion ? false : { x: "-120%", opacity: 0 }}
              animate={reduceMotion ? undefined : { x: "110%", opacity: [0, 0.7, 0] }}
              transition={{
                duration: 0.88,
                delay: 0.58,
                ease: "easeInOut",
              }}
              className="absolute bottom-[0.08em] left-0 z-[1] h-[0.28em] w-[45%] rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(219,239,255,0.8),rgba(255,255,255,0))] blur-[2px]"
            />
          </span>{" "}
          <motion.span
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={lineTransition(0.48)}
            className="inline-block"
          >
            from.
          </motion.span>
          <motion.span
            data-hero-accent
            initial={reduceMotion ? false : { opacity: 0, scale: 0.88, y: 10 }}
            animate={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.62,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="ml-3 inline-flex translate-y-[-0.08em] items-center rounded-full px-3 py-[0.35rem] text-[0.76rem] font-bold tracking-[-0.01em] text-[#071827] shadow-[0_8px_24px_rgba(63,139,198,0.12)] sm:ml-4 sm:px-4 sm:py-2 sm:text-[0.82rem] md:text-[0.88rem]"
            style={{
              background: "rgba(205, 229, 247, 0.75)",
              border: "1px solid rgba(7, 24, 39, 0.12)",
              boxShadow: "0 8px 24px rgba(63, 139, 198, 0.12)",
              fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif",
            }}
          >
            Finally.
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
}

function ShowcaseCardVisual({ type }: { type: string }) {
  if (type === "audit") {
    return (
      <div className="h-full rounded-[1.45rem] bg-[#102130] p-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between">
            <span className="text-[0.62rem] uppercase tracking-[0.22em] text-white/58">Audit Score</span>
            <span className="rounded-full bg-white/10 px-2 py-1 text-[0.62rem] text-white/72">72%</span>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <div className="text-[0.62rem] uppercase tracking-[0.18em] text-white/44">Opportunity</div>
              <div className="mt-2 text-4xl font-semibold tracking-[-0.06em]">+18%</div>
            </div>
            <div className="rounded-[1rem] bg-white/8 px-3 py-2 text-right">
              <div className="text-[0.6rem] uppercase tracking-[0.16em] text-white/42">Priority</div>
              <div className="mt-1 text-sm text-white/76">Trust + CTA</div>
            </div>
          </div>
          <div className="mt-5 h-2 rounded-full bg-white/10">
            <div className="h-full w-[72%] rounded-full bg-[linear-gradient(90deg,#8ec1e7,#dbeaf5)]" />
          </div>
          <div className="mt-5 grid flex-1 gap-2 text-[0.74rem] text-white/72">
            {["Trust signals", "CTA clarity", "Booking friction", "SEO basics"].map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-[0.95rem] bg-white/6 px-3 py-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#b8d6eb]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === "website") {
    return (
      <div className="h-full rounded-[1.45rem] bg-[#102130] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
        <div className="flex h-full flex-col overflow-hidden rounded-[1.15rem] bg-[#f6f3ec]">
          <div className="flex items-center gap-1 border-b border-[#d6dde4] px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-[#c8d7e3]" />
            <span className="h-2 w-2 rounded-full bg-[#e4cba6]" />
            <span className="h-2 w-2 rounded-full bg-[#a7c8e3]" />
          </div>
          <div className="grid flex-1 gap-3 p-3">
            <div className="relative h-28 overflow-hidden rounded-[1rem] bg-[linear-gradient(135deg,#dceaf5,#f8fbff)]">
              <div className="absolute left-4 top-4 space-y-2">
                <div className="h-3 w-24 rounded-full bg-[#102130]/14" />
                <div className="h-3 w-16 rounded-full bg-[#102130]/10" />
              </div>
              <div className="absolute bottom-4 left-4 flex gap-2">
                <div className="rounded-full bg-[#102130] px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.18em] text-white">
                  Enquire
                </div>
                <div className="rounded-full bg-white px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.18em] text-[#102130]">
                  Audit
                </div>
              </div>
            </div>
            <div className="grid grid-cols-[1.2fr_0.8fr] gap-3">
              <div className="rounded-[0.95rem] bg-[#102130]/5 p-3">
                <div className="space-y-2">
                  <div className="h-3 w-3/4 rounded-full bg-[#162535]/18" />
                  <div className="h-3 w-1/2 rounded-full bg-[#162535]/12" />
                  <div className="h-12 rounded-[0.8rem] bg-white/80" />
                </div>
              </div>
              <div className="grid gap-3">
                <div className="rounded-[0.9rem] bg-[#102130] p-3 text-white/74">
                  <div className="text-[0.58rem] uppercase tracking-[0.16em] text-white/42">Trust</div>
                  <div className="mt-3 text-xl font-semibold tracking-[-0.04em] text-white">94%</div>
                </div>
                <div className="rounded-[0.9rem] bg-[#bdd8ec]/55 p-3">
                  <div className="text-[0.58rem] uppercase tracking-[0.16em] text-[#274158]">CTA</div>
                  <div className="mt-3 h-2 rounded-full bg-white/70" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "landing") {
    return (
      <div className="h-full rounded-[1.45rem] bg-[#102130] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
        <div className="flex h-full flex-col rounded-[1.15rem] bg-[#f6f3ec] p-3">
          <div className="grid flex-1 gap-3">
            <div className="flex items-center justify-between rounded-[1rem] bg-[linear-gradient(135deg,#deebf5,#f8fbff)] px-4 py-4">
              <div className="space-y-2">
                <div className="h-3 w-28 rounded-full bg-[#0f1f2d]/18" />
                <div className="h-3 w-20 rounded-full bg-[#0f1f2d]/10" />
              </div>
              <div className="rounded-full bg-white px-3 py-1 text-[0.62rem] font-medium text-[#0f1f2d]">
                CTA
              </div>
            </div>
            <div className="grid grid-cols-[1.1fr_0.9fr] gap-3">
              <div className="grid gap-3">
                <div className="rounded-[0.95rem] bg-white p-3">
                  <div className="h-3 w-20 rounded-full bg-[#0f1f2d]/14" />
                  <div className="mt-3 h-14 rounded-[0.8rem] bg-[#0f1f2d]/6" />
                </div>
                <div className="rounded-[0.95rem] bg-[#0f1f2d]/6 p-3">
                  <div className="h-3 w-16 rounded-full bg-[#0f1f2d]/14" />
                  <div className="mt-3 space-y-2">
                    <div className="h-2 rounded-full bg-[#0f1f2d]/10" />
                    <div className="h-2 w-3/4 rounded-full bg-[#0f1f2d]/8" />
                  </div>
                </div>
              </div>
              <div className="grid gap-3">
                <div className="rounded-[0.95rem] bg-[#0f1f2d] p-3 text-white/74">
                  <div className="text-[0.62rem] uppercase tracking-[0.16em] text-white/46">
                    Clarity
                  </div>
                  <div className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-white">
                    +31%
                  </div>
                </div>
                <div className="rounded-[0.95rem] bg-[#bed9ec]/55 p-3">
                  <div className="text-[0.58rem] uppercase tracking-[0.16em] text-[#274158]">Form</div>
                  <div className="mt-3 h-10 rounded-[0.7rem] bg-white/85" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "flow") {
    return (
      <div className="h-full rounded-[1.45rem] bg-[#102130] p-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
        <div className="flex h-full flex-col">
          <div className="grid grid-cols-4 items-center gap-2 text-center text-[0.65rem] uppercase tracking-[0.18em] text-white/60">
            {["Visit", "Form", "WhatsApp", "CRM"].map((item) => (
              <div key={item} className="rounded-[0.95rem] bg-white/6 px-2 py-3">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between px-2 text-[#bdd8ec]">
            <span>→</span>
            <span>→</span>
            <span>→</span>
          </div>
          <div className="mt-5 grid flex-1 gap-3">
            <div className="rounded-[1rem] bg-white/6 p-3">
              <div className="text-[0.58rem] uppercase tracking-[0.16em] text-white/46">Conversion Rate</div>
              <div className="mt-3 flex items-end gap-2">
                <span className="text-3xl font-semibold tracking-[-0.05em] text-white">28%</span>
                <span className="text-sm text-white/52">lift</span>
              </div>
            </div>
            <div className="grid grid-cols-[1.2fr_0.8fr] gap-3">
              <div className="rounded-[0.95rem] bg-[#bdd8ec]/12 p-3">
                <div className="h-2 rounded-full bg-white/16" />
                <div className="mt-4 space-y-2">
                  <div className="h-2 w-5/6 rounded-full bg-white/10" />
                  <div className="h-2 w-2/3 rounded-full bg-white/10" />
                </div>
              </div>
              <div className="rounded-[0.95rem] bg-white/7 p-3 text-center">
                <div className="text-[0.58rem] uppercase tracking-[0.16em] text-white/42">Warm Leads</div>
                <div className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-white">42</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "seo") {
    return (
      <div className="h-full rounded-[1.45rem] bg-[#102130] p-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
        <div className="flex h-full flex-col">
          <div className="rounded-[1rem] bg-white/8 px-3 py-2 text-[0.72rem] text-white/72">
            service business web design singapore
          </div>
          <div className="mt-4 rounded-[1rem] bg-[#f8fbff] p-4 text-[#102130]">
            <div className="text-[0.68rem] uppercase tracking-[0.16em] text-[#577085]">Ranking Lift</div>
            <div className="mt-3 flex items-end gap-2">
              <span className="text-4xl font-semibold tracking-[-0.05em]">#3</span>
              <span className="text-sm text-[#5c7385]">local pack</span>
            </div>
            <div className="mt-4 h-2 rounded-full bg-[#0f1f2d]/8">
              <div className="h-full w-[68%] rounded-full bg-[linear-gradient(90deg,#8ec1e7,#b8d6eb)]" />
            </div>
          </div>
          <div className="mt-4 grid flex-1 grid-cols-2 gap-3">
            <div className="rounded-[0.95rem] bg-white/6 p-3">
              <div className="text-[0.58rem] uppercase tracking-[0.16em] text-white/42">Visibility</div>
              <div className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">82%</div>
            </div>
            <div className="rounded-[0.95rem] bg-[#bdd8ec]/14 p-3">
              <div className="text-[0.58rem] uppercase tracking-[0.16em] text-white/42">Clicks</div>
              <div className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">+41%</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "chat") {
    return (
      <div className="h-full rounded-[1.45rem] bg-[#102130] p-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
        <div className="flex h-full flex-col">
          <div className="rounded-[1rem] bg-white/7 px-3 py-2 text-[0.62rem] uppercase tracking-[0.18em] text-white/46">
            WhatsApp Assistant
          </div>
          <div className="mt-4 grid flex-1 gap-3">
            <div className="ml-auto w-[78%] rounded-[1rem] rounded-br-sm bg-[#d4ecdf] px-3 py-3 text-sm text-[#163225]">
              Hi, do you have availability this week?
            </div>
            <div className="w-[74%] rounded-[1rem] rounded-bl-sm bg-white/9 px-3 py-3 text-sm text-white/78">
              Yes, we have openings on Tuesday and Thursday afternoon.
            </div>
            <div className="ml-auto w-[70%] rounded-[1rem] rounded-br-sm bg-[#8fc2e8] px-3 py-3 text-sm text-[#102130]">
              Great, sending the booking link now.
            </div>
            <div className="rounded-[1rem] bg-white/7 p-3">
              <div className="text-[0.58rem] uppercase tracking-[0.16em] text-white/42">Response Time</div>
              <div className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white">-62%</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "booking") {
    return (
      <div className="h-full rounded-[1.45rem] bg-[#102130] p-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
        <div className="flex h-full flex-col">
          <div className="text-[0.62rem] uppercase tracking-[0.18em] text-white/44">Booking Calendar</div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[0.68rem] text-white/76">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
              <div
                key={day}
                className={`rounded-[0.9rem] px-2 py-3 ${
                  index === 2 ? "bg-[#bdd8ec] text-[#102130]" : "bg-white/8"
                }`}
              >
                {day}
              </div>
            ))}
          </div>
          <div className="mt-4 grid flex-1 gap-3">
            <div className="rounded-[1rem] bg-white/7 p-3">
              <div className="text-[0.58rem] uppercase tracking-[0.16em] text-white/42">Selected Slot</div>
              <div className="mt-3 text-xl font-semibold tracking-[-0.04em] text-white">Wed, 2:30 PM</div>
            </div>
            <div className="rounded-[1rem] bg-[#bdd8ec]/16 p-3">
              <div className="text-[0.58rem] uppercase tracking-[0.16em] text-white/42">Confirmation</div>
              <div className="mt-3 h-10 rounded-[0.8rem] bg-white/80" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "crm") {
    return (
      <div className="h-full rounded-[1.45rem] bg-[#102130] p-3 text-white/74 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
        <div className="flex h-full flex-col gap-3">
          <div className="grid grid-cols-4 gap-2">
            {[
              ["New", "4"],
              ["Qualified", "7"],
              ["Follow-up", "3"],
              ["Won", "2"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[0.95rem] bg-white/7 p-3">
                <div className="text-[0.58rem] uppercase tracking-[0.16em] text-white/42">{label}</div>
                <div className="mt-3 text-xl font-semibold tracking-[-0.05em] text-white">{value}</div>
              </div>
            ))}
          </div>
          <div className="grid flex-1 grid-cols-4 gap-2">
            {[2, 3, 2, 1].map((count, columnIndex) => (
              <div key={columnIndex} className="rounded-[0.95rem] bg-white/6 p-2">
                <div className="grid gap-2">
                  {Array.from({ length: count }).map((_, itemIndex) => (
                    <div key={itemIndex} className="rounded-[0.7rem] bg-white/10 px-2 py-2.5" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === "system") {
    return (
      <div className="h-full rounded-[1.45rem] bg-[#102130] p-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
        <div className="flex h-full flex-col">
          <div className="grid grid-cols-[1.1fr_0.9fr] gap-3">
            <div className="rounded-[1rem] bg-white/7 p-3">
              <div className="text-[0.62rem] uppercase tracking-[0.18em] text-white/44">Website</div>
              <div className="mt-3 h-20 rounded-[0.8rem] bg-[linear-gradient(135deg,rgba(189,216,236,0.78),rgba(255,255,255,0.24))]" />
            </div>
            <div className="rounded-[1rem] bg-white/7 p-3">
              <div className="text-[0.62rem] uppercase tracking-[0.18em] text-white/44">Automation</div>
              <div className="mt-3 grid gap-2">
                <div className="h-3 rounded-full bg-white/14" />
                <div className="h-3 w-2/3 rounded-full bg-white/10" />
                <div className="h-10 rounded-[0.8rem] bg-white/7" />
              </div>
            </div>
          </div>
          <div className="mt-3 rounded-[1rem] bg-white/7 p-3">
            <div className="flex items-center justify-between text-[0.62rem] uppercase tracking-[0.18em] text-white/44">
              <span>Connected Funnel</span>
              <span>Live</span>
            </div>
            <div className="mt-4 flex items-center justify-between text-[#bcd8ea]">
              <span className="rounded-full bg-white/7 px-3 py-2 text-[0.68rem] uppercase tracking-[0.14em] text-white/68">
                Enquiry
              </span>
              <span>→</span>
              <span className="rounded-full bg-white/7 px-3 py-2 text-[0.68rem] uppercase tracking-[0.14em] text-white/68">
                Follow-up
              </span>
              <span>→</span>
              <span className="rounded-full bg-white/7 px-3 py-2 text-[0.68rem] uppercase tracking-[0.14em] text-white/68">
                CRM
              </span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="h-10 rounded-[0.8rem] bg-white/8" />
              <div className="h-10 rounded-[0.8rem] bg-white/10" />
              <div className="h-10 rounded-[0.8rem] bg-white/8" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 rounded-[1.25rem] bg-[#102130] p-4 text-white">
      <div className="grid gap-2">
        {[
          { label: "Trust section", done: true },
          { label: "CTA hierarchy", done: true },
          { label: "Form friction", done: false },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-3 rounded-[0.9rem] bg-white/7 px-3 py-2 text-sm">
            <span
              className={`h-4 w-4 rounded-full border ${
                item.done ? "border-[#b9d7eb] bg-[#b9d7eb]" : "border-white/24 bg-transparent"
              }`}
            />
            <span className="text-white/76">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroShowcaseRibbon() {
  const reduceMotion = useReducedMotion();
  const reelBandRef = useRef<HTMLDivElement | null>(null);
  const reelTrackRef = useRef<HTMLDivElement | null>(null);
  const reelSetRef = useRef<HTMLDivElement | null>(null);
  const targetSpeedRef = useRef(1);
  const currentSpeedRef = useRef(1);
  const offsetRef = useRef(0);
  const cardRotations = [-1.4, 0.9, -0.45, 1.25, -0.95, 0.7, -1.15, 0.9, -0.6];
  const cardOffsets = [8, 0, 10, 2, 12, 4, 10, 1, 7];

  useEffect(() => {
    const track = reelTrackRef.current;
    const set = reelSetRef.current;

    if (!track || !set) {
      return;
    }

    if (reduceMotion) {
      track.style.transform = "translate3d(0px, 0, 0)";
      return;
    }

    let frameId = 0;
    let lastTime = 0;
    let setWidth = set.offsetWidth;
    const normalLoopDuration = 36;
    const hoverSpeedMultiplier = 0.45;

    const updateWidth = () => {
      setWidth = set.offsetWidth;
    };

    updateWidth();
    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(set);

    const tick = (time: number) => {
      if (!lastTime) {
        lastTime = time;
      }

      const delta = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      const baseSpeed = setWidth > 0 ? setWidth / normalLoopDuration : 0;
      const nextTarget = targetSpeedRef.current === 1 ? 1 : hoverSpeedMultiplier;
      currentSpeedRef.current += (nextTarget - currentSpeedRef.current) * Math.min(delta * 5.5, 1);
      offsetRef.current -= baseSpeed * currentSpeedRef.current * delta;

      if (setWidth > 0 && offsetRef.current <= -setWidth) {
        offsetRef.current += setWidth;
      }

      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
    };
  }, [reduceMotion]);

  return (
    <>
      <div data-hero-ribbon className="mt-8 hidden w-full lg:block">
        <div className="relative left-1/2 w-screen -translate-x-1/2 px-0 pt-12">
          <div
            ref={reelBandRef}
            onMouseEnter={() => {
              targetSpeedRef.current = 0.32;
            }}
            onMouseLeave={() => {
              targetSpeedRef.current = 1;
            }}
            className="relative h-[38rem] overflow-x-hidden overflow-y-visible pt-4 pb-[5.5rem]"
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-28 bg-[linear-gradient(90deg,#fbf7f1_0%,rgba(251,247,241,0.92)_35%,rgba(251,247,241,0))]" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-28 bg-[linear-gradient(270deg,#ede7db_0%,rgba(237,231,219,0.92)_35%,rgba(237,231,219,0))]" />

            <div
              ref={reelTrackRef}
              className="flex h-full w-max items-end will-change-transform"
            >
              {[0, 1].map((loop) => (
                <div
                  key={loop}
                  ref={loop === 0 ? reelSetRef : undefined}
                  className="flex h-full items-end gap-6 pr-6 pl-6"
                >
                  {heroShowcaseCards.map((card, index) => (
                    <article
                      key={`${loop}-${card.title}`}
                      data-hero-card
                      className="group relative h-[29rem] w-[23.5rem] shrink-0 overflow-hidden rounded-[2rem] border border-black/8 bg-[rgba(255,255,255,0.9)] p-5 text-left shadow-[0_26px_80px_rgba(22,34,48,0.14)] backdrop-blur-md transition duration-300 [transform:translateY(var(--card-shift))_rotate(var(--card-rotate))] group-hover:[transform:translateY(calc(var(--card-shift)-4px))_rotate(var(--card-rotate))] hover:shadow-[0_30px_88px_rgba(22,34,48,0.18)]"
                      style={{
                        ["--card-shift" as string]: `${cardOffsets[index % cardOffsets.length]}px`,
                        ["--card-rotate" as string]: `${cardRotations[index % cardRotations.length]}deg`,
                      }}
                    >
                      <div className={`absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,var(--tw-gradient-stops))] ${card.accent}`} />
                      <div className="absolute inset-x-0 top-16 h-28 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.62),rgba(255,255,255,0))]" />

                      <div className="relative grid h-full grid-rows-[minmax(0,1fr)_6.5rem] gap-4">
                        <div className="min-h-0 overflow-hidden rounded-[1.55rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.4),rgba(255,255,255,0.12))] shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]">
                          {card.image ? null : <ShowcaseCardVisual type={card.type} />}
                        </div>

                        <div className="grid h-[6.5rem] grid-cols-[minmax(0,1fr)_auto] items-start gap-4 rounded-[1.2rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,255,255,0.8))] px-4 py-3 shadow-[0_12px_28px_rgba(20,30,44,0.08)]">
                          <div className="min-w-0">
                            <h3 className="text-[1.12rem] font-semibold leading-6 tracking-[-0.04em] text-[#102130]">
                              {card.title}
                            </h3>
                            <p className="mt-1 max-w-[14rem] text-[0.9rem] leading-5 text-[#526777]">
                              {card.subtitle}
                            </p>
                          </div>
                          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-lg text-[#102130] shadow-[0_8px_16px_rgba(15,31,45,0.08)] transition duration-300 group-hover:translate-x-0.5">
                            ↗
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div data-hero-ribbon className="mt-10 w-full overflow-x-auto pb-3 lg:hidden [scrollbar-width:none]">
        <div className="flex min-w-max gap-4 px-1">
          {heroShowcaseCards.map((card) => (
            <article
              key={card.title}
              data-hero-card
              className={`group relative ${card.mobileWidth} h-[25rem] shrink-0 overflow-hidden rounded-[2rem] border border-black/8 bg-white/88 p-4 text-left shadow-[0_24px_50px_rgba(28,42,56,0.08)] backdrop-blur-md transition duration-300`}
            >
              <div className={`absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,var(--tw-gradient-stops))] ${card.accent}`} />
              <div className="absolute inset-x-0 top-16 h-20 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.52),rgba(255,255,255,0))]" />
              <div className="relative grid h-full grid-rows-[minmax(0,1fr)_6rem] gap-4">
                <div className="min-h-0 overflow-hidden rounded-[1.25rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.28),rgba(255,255,255,0.08))]">
                  {card.image ? null : <ShowcaseCardVisual type={card.type} />}
                </div>

                <div className="grid h-[6rem] grid-cols-[minmax(0,1fr)_auto] items-start gap-4 rounded-[1.1rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(255,255,255,0.74))] px-3 py-3">
                  <div>
                    <h3 className="text-[1.05rem] font-semibold leading-6 tracking-[-0.04em] text-[#102130]">
                      {card.title}
                    </h3>
                    <p className="mt-1 max-w-[13rem] text-[0.9rem] leading-6 text-[#526777]">
                      {card.subtitle}
                    </p>
                  </div>
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/76 text-lg text-[#102130] shadow-[0_8px_16px_rgba(15,31,45,0.08)]">
                    ↗
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}

export default function HomePage() {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const [openFaq, setOpenFaq] = useState<number>(0);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [auditSubmitted, setAuditSubmitted] = useState(false);

  useLayoutEffect(() => {
    const page = pageRef.current;
    const heroSection = heroSectionRef.current;
    let lenis: Lenis | undefined;
    let rafId = 0;

    if (!page || !heroSection) {
      return;
    }

    const ctx = gsap.context(() => {
      lenis = new Lenis({
        duration: 1.16,
        smoothWheel: true,
        wheelMultiplier: 0.92,
      });

      lenis.on("scroll", ScrollTrigger.update);
      let lastHeaderState = false;
      lenis.on("scroll", ({ scroll }: { scroll: number }) => {
        const nextHeaderState = scroll > 28;
        if (nextHeaderState !== lastHeaderState) {
          lastHeaderState = nextHeaderState;
          setHeaderScrolled(nextHeaderState);
        }
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = window.requestAnimationFrame(raf);
      };

      rafId = window.requestAnimationFrame(raf);

      gsap.set("[data-hero-copy]", { y: 0, opacity: 1 });
      gsap.set("[data-hero-ribbon]", { y: 0, opacity: 1 });
      gsap.set("[data-hero-accent]", { y: 0, rotate: 0, opacity: 1 });
      gsap.set("[data-hero-orb]", { y: 0, x: 0, opacity: 0.8 });

      gsap.set("[data-reveal-intro]", { y: 28, opacity: 0 });
      gsap.set("[data-reveal-card]", { y: 32, opacity: 0 });
      gsap.set("[data-reveal-chip]", { y: 22, opacity: 0 });
      gsap.set("[data-reveal-line]", { scaleX: 0.35, opacity: 0.18, transformOrigin: "left center" });
      gsap.set("[data-reveal-form]", { y: 28, opacity: 0 });

      gsap.to("[data-hero-accent]", {
        y: -6,
        rotate: -4,
        duration: 3.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to("[data-hero-orb]", {
        x: 18,
        y: -12,
        opacity: 1,
        duration: 8.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: heroSection,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
        .to("[data-hero-copy]", { y: -64, opacity: 0.22, immediateRender: false }, 0)
        .to("[data-hero-ribbon]", { y: -22, opacity: 0.84, immediateRender: false }, 0)
        .to("[data-hero-divider]", { opacity: 1, immediateRender: false }, 0.18);

      sectionRevealSelectors.forEach((selector) => {
        const section = page.querySelector(selector);
        if (!section) {
          return;
        }

        const intro = section.querySelectorAll("[data-reveal-intro]");
        const cards = section.querySelectorAll("[data-reveal-card], [data-reveal-form]");
        const chips = section.querySelectorAll("[data-reveal-chip]");
        const lines = section.querySelectorAll("[data-reveal-line]");

        if (intro.length) {
          gsap.timeline({
            defaults: { ease: "power2.out" },
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              end: "top 30%",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }).to(intro, {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.82,
            immediateRender: false,
          });
        }

        if (cards.length) {
          gsap.timeline({
            defaults: { ease: "power2.out" },
            scrollTrigger: {
              trigger: section,
              start: "top 72%",
              end: "top 24%",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }).to(cards, {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.84,
            immediateRender: false,
          });
        }

        if (chips.length) {
          gsap.timeline({
            defaults: { ease: "power2.out" },
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              end: "top 20%",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }).to(chips, {
            y: 0,
            opacity: 1,
            stagger: 0.06,
            duration: 0.72,
            immediateRender: false,
          });
        }

        if (lines.length) {
          gsap.timeline({
            defaults: { ease: "power2.out" },
            scrollTrigger: {
              trigger: section,
              start: "top 68%",
              end: "top 18%",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }).to(lines, {
            scaleX: 1,
            opacity: 1,
            stagger: 0.08,
            duration: 0.72,
            immediateRender: false,
          });
        }
      });
    }, page);

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      lenis?.destroy();
      ctx.revert();
    };
  }, []);

  const handleAuditSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuditSubmitted(true);
    event.currentTarget.reset();
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="ocia-page-atmosphere">
      <div className="ocia-atmosphere-bg" />

      <main ref={pageRef} className="relative z-10 isolate overflow-x-clip bg-transparent text-white">
        <ConstellationWhale />

        <header
          className="fixed inset-x-0 top-0 z-[90] px-4 pt-4 transition-all duration-500 sm:px-6 lg:px-8"
        >
          <div
            className={`mx-auto flex max-w-[1280px] items-center justify-between gap-4 rounded-full px-5 py-3 shadow-[0_16px_50px_rgba(7,24,39,0.08)] ring-1 ring-[rgba(7,24,39,0.08)] backdrop-blur-[18px] transition-all duration-500 sm:px-6 lg:grid lg:grid-cols-[auto_1fr_auto] lg:gap-6 lg:px-8 ${
              headerScrolled
                ? "bg-[rgba(255,255,255,0.82)] shadow-[0_18px_54px_rgba(7,24,39,0.14)]"
                : "bg-[rgba(255,255,255,0.58)]"
            }`}
          >
            <Link
              href="/"
              className="flex shrink-0 items-center gap-3 text-[#071827] transition hover:text-[#071827]"
              style={{ color: "#071827", opacity: 1 }}
            >
              <span className="relative inline-flex h-[1.35rem] w-[1.35rem] shrink-0 items-center justify-center rounded-full border border-[rgba(7,24,39,0.7)] bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.96),rgba(220,229,239,0.68)_48%,rgba(7,24,39,0.06)_100%)] shadow-[0_6px_18px_rgba(7,24,39,0.12)]">
                <span className="h-[0.28rem] w-[0.28rem] rounded-full bg-[#071827]" />
                <span className="absolute inset-[0.18rem] rounded-full border border-[rgba(7,24,39,0.14)]" />
                <span className="absolute h-[0.8rem] w-px rotate-[34deg] rounded-full bg-[linear-gradient(180deg,rgba(7,24,39,0),rgba(7,24,39,0.42),rgba(7,24,39,0))]" />
              </span>
              <span className="text-[0.68rem] font-extrabold uppercase tracking-[0.2em] text-[#071827] sm:text-[0.72rem]">
                Ocia Studios
              </span>
            </Link>

            <nav
              className="hidden items-center justify-center gap-2 text-[0.72rem] font-medium text-[#294052] md:flex lg:gap-3"
            >
              {navItems.map((item, index) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`inline-flex items-center rounded-full px-3.5 py-2 transition duration-300 ${
                    index === 0
                      ? "bg-[rgba(7,24,39,0.07)] text-[#071827]"
                      : "text-[#294052] hover:bg-[rgba(7,24,39,0.06)] hover:text-[#071827]"
                  }`}
                >
                  <span className="tracking-[0.08em]">
                    {item.label}
                  </span>
                  {index === 0 ? (
                    <span className="ml-2 h-1.5 w-1.5 rounded-full bg-[#071827]" />
                  ) : null}
                </Link>
              ))}
            </nav>

            <Link
              href="/#contact"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-[rgba(7,24,39,0.9)] bg-[#071827] px-4 text-[0.84rem] font-semibold tracking-[-0.01em] text-white shadow-[0_16px_36px_rgba(7,24,39,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#0d2232] hover:shadow-[0_20px_42px_rgba(7,24,39,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#89bee7] focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:px-5 sm:text-sm"
            >
              Get My Free Audit
            </Link>
          </div>
        </header>

        <section
          ref={heroSectionRef}
          className="relative overflow-x-hidden overflow-y-visible bg-[linear-gradient(180deg,#fbf8f3_0%,#f7f2ea_34%,#f2ebdf_68%,#ece4d8_100%)] text-[#0f1f2d]"
        >
          <div
            data-hero-orb
            className="pointer-events-none absolute left-[8%] top-[18%] z-0 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(168,202,230,0.34)_0%,rgba(168,202,230,0.12)_44%,rgba(168,202,230,0)_72%)] blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, rgba(7,24,39,0.1) 0.45px, transparent 0.68px), radial-gradient(circle at 80% 30%, rgba(7,24,39,0.08) 0.4px, transparent 0.64px), radial-gradient(circle at 50% 70%, rgba(7,24,39,0.06) 0.36px, transparent 0.6px)",
              backgroundSize: "20px 20px, 24px 24px, 28px 28px",
              backgroundPosition: "0 0, 8px 10px, 12px 5px",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[-10%] top-[12%] z-0 h-[22rem] w-[34rem] rounded-[999px] bg-[radial-gradient(ellipse_at_center,rgba(248,244,238,0.9)_0%,rgba(248,244,238,0.5)_38%,rgba(248,244,238,0.08)_64%,rgba(248,244,238,0)_100%)] opacity-80 blur-3xl sm:left-[-4%] sm:w-[38rem] md:w-[42rem] lg:h-[24rem] lg:w-[46rem]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[-10%] top-[16%] z-0 h-[20rem] w-[28rem] rounded-[999px] bg-[radial-gradient(ellipse_at_center,rgba(202,216,228,0.42)_0%,rgba(202,216,228,0.18)_42%,rgba(202,216,228,0.04)_66%,rgba(202,216,228,0)_100%)] opacity-90 blur-3xl sm:right-[-4%] sm:w-[32rem] md:h-[22rem] md:w-[36rem] lg:top-[18%] lg:h-[24rem] lg:w-[40rem]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[6%] z-0 h-[11rem] w-[22rem] -translate-x-1/2 rounded-[999px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.44)_0%,rgba(255,255,255,0.18)_40%,rgba(255,255,255,0)_74%)] opacity-75 blur-3xl md:h-[13rem] md:w-[28rem]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-0 h-40 bg-[linear-gradient(180deg,rgba(255,255,255,0.66),rgba(255,255,255,0.18)_48%,rgba(255,255,255,0)_100%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[4%] bottom-[10.5rem] z-0 h-[18rem] rounded-[999px] bg-[radial-gradient(ellipse_at_center,rgba(244,238,228,0.72)_0%,rgba(244,238,228,0.42)_36%,rgba(244,238,228,0.12)_62%,rgba(244,238,228,0)_100%)] blur-3xl sm:inset-x-[8%] sm:bottom-[11rem] md:h-[19rem] lg:bottom-[12rem] lg:h-[20rem]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[-8%] bottom-[5.25rem] z-0 h-[18rem] bg-[radial-gradient(ellipse_at_center,rgba(234,226,214,0.22)_0%,rgba(234,226,214,0.12)_42%,rgba(234,226,214,0.03)_68%,rgba(234,226,214,0)_100%)] blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[8%] bottom-[14rem] z-0 h-[12rem] w-[20rem] rounded-[999px] bg-[radial-gradient(ellipse_at_center,rgba(112,134,154,0.14)_0%,rgba(112,134,154,0.06)_44%,rgba(112,134,154,0)_78%)] blur-3xl md:h-[14rem] md:w-[24rem]"
          />

          <div className="relative z-10 mx-auto flex min-h-svh max-w-[1440px] flex-col px-5 pb-24 pt-28 sm:px-8 sm:pb-24 sm:pt-32 md:px-10 lg:px-14 lg:pb-28 lg:pt-36 xl:px-20">
            <div className="mx-auto flex w-full max-w-[1080px] flex-1 flex-col items-center text-center">
              <div data-hero-copy className="max-w-[980px]">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[#3f5668] sm:text-[0.76rem]">
                  For service businesses that need more enquiries
                </p>

                <HeroHeadline />

                <p className="mx-auto mt-7 max-w-[50rem] text-[1rem] leading-8 text-[#425768] sm:text-[1.06rem] md:text-[1.14rem] md:leading-8">
                  Ocia Studios helps service businesses turn underperforming websites into
                  lead-generation systems through redesign, SEO, conversion optimisation,
                  WhatsApp automation, booking improvements, and CRM follow-up workflows.
                </p>

                <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link
                    href="/#contact"
                    className="inline-flex min-h-14 items-center justify-center rounded-full border border-[rgba(7,24,39,0.94)] bg-[#071827] px-7 text-sm font-bold tracking-[-0.01em] text-white shadow-[0_20px_40px_rgba(15,31,45,0.2)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#0b2030] hover:text-white hover:shadow-[0_24px_44px_rgba(15,31,45,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#89bee7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f3eb]"
                    style={{
                      background: "#071827",
                      color: "#ffffff",
                      opacity: 1,
                      fontWeight: 700,
                      border: "1px solid rgba(7,24,39,0.9)",
                    }}
                  >
                    <span style={{ color: "#ffffff", opacity: 1 }}>
                      Get My Free Website Audit
                    </span>
                  </Link>

                  <Link
                    href="/#services"
                    className="inline-flex min-h-14 items-center justify-center rounded-full border border-[rgba(7,24,39,0.14)] bg-[rgba(255,255,255,0.94)] px-7 text-sm font-semibold tracking-[-0.01em] text-[#071827] shadow-[0_12px_28px_rgba(15,31,45,0.08)] backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-[rgba(7,24,39,0.18)] hover:bg-white hover:text-[#071827] hover:shadow-[0_18px_34px_rgba(15,31,45,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#89bee7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f3eb]"
                    style={{ color: "#071827", opacity: 1 }}
                  >
                    <span style={{ color: "#071827", opacity: 1 }}>See How We Can Help</span>
                  </Link>
                </div>

                <p className="mt-6 text-[0.82rem] uppercase tracking-[0.24em] text-[#617584]">
                  No guesswork. Clear recommendations. Practical next steps.
                </p>
              </div>
            </div>

            <HeroShowcaseRibbon />
          </div>

          <div
            data-hero-divider
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28 opacity-0 bg-[linear-gradient(180deg,rgba(15,31,45,0)_0%,rgba(9,17,28,0.22)_38%,rgba(6,12,20,0.84)_100%)]"
          />
        </section>

        <SceneSection data-problem-section tone="night" className="border-t border-white/8">
          <div className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 sm:py-28 md:px-10 lg:px-14 xl:px-20">
            <SectionIntro
              label="The Problem"
              title="Your website may be costing you leads every single week."
              body="Most websites do not fail because of one big problem. They lose leads through small leaks across the journey."
            />

            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              {problemCards.map((card) => (
                <article
                  key={card.title}
                  data-reveal-card
                  className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(9,17,28,0.78),rgba(5,10,18,0.58))] p-7 shadow-[0_20px_70px_rgba(0,0,0,0.24)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/16"
                >
                  <div className="mb-5 h-px w-16 bg-[linear-gradient(90deg,rgba(220,232,244,0.88),rgba(220,232,244,0.06))]" />
                  <h3 className="text-[1.38rem] font-medium tracking-[-0.04em] text-white">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-[0.98rem] leading-7 text-white/66">{card.body}</p>
                </article>
              ))}
            </div>

            <p
              data-reveal-card
              className="mt-10 max-w-3xl text-[0.98rem] leading-7 text-white/58"
            >
              Most websites do not fail because of one big problem. They lose leads
              through small leaks across the journey.
            </p>
          </div>
        </SceneSection>

        <SceneSection id="solutions" data-value-section tone="night">
          <div className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 md:px-10 lg:px-14 xl:px-20">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
              <SectionIntro
                label="The Value"
                title="We fix the parts of your online funnel that stop people from contacting you."
                body="At Ocia Studios, we do more than make websites look better. We improve the parts of your business that directly affect trust, lead flow, conversion, response speed, and follow-up."
              />

              <div className="flex flex-wrap gap-3 lg:justify-end">
                {valueChips.map((chip) => (
                  <div
                    key={chip}
                    data-reveal-chip
                    className="rounded-full border border-[rgba(214,229,244,0.14)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-sm text-white/78 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-md"
                  >
                    {chip}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SceneSection>

        <SceneSection
          id="pricing"
          data-audit-section
          tone="mist"
          className="border-y border-white/8"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_28%,rgba(150,182,216,0.12),transparent_20%),radial-gradient(circle_at_82%_18%,rgba(109,143,178,0.08),transparent_22%)]" />
          <div className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 sm:py-28 md:px-10 lg:px-14 xl:px-20">
            <div className="grid gap-8 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <div
                data-reveal-card
                className="rounded-[2.25rem] border border-[rgba(220,230,240,0.12)] bg-[linear-gradient(180deg,rgba(9,17,29,0.86),rgba(5,10,18,0.72))] p-7 shadow-[0_24px_90px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:p-8"
              >
                <SectionIntro
                  label="Free Audit"
                  title="Start with a free website opportunity audit."
                  body="If your website is underperforming, we'll help you identify where leads, trust, visibility, and conversions are being lost."
                />

                <div className="mt-8 grid gap-3">
                  {auditChecklist.map((item) => (
                    <div
                      key={item}
                      data-reveal-chip
                      className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3"
                    >
                      <span className="h-2 w-2 rounded-full bg-[rgba(220,232,244,0.86)] shadow-[0_0_16px_rgba(182,210,242,0.34)]" />
                      <span className="text-sm leading-6 text-white/76">{item}</span>
                    </div>
                  ))}
                </div>

                <p className="mt-8 text-[0.98rem] leading-7 text-white/62">
                  You will walk away with a clearer picture of what is holding your website
                  back and what to fix first.
                </p>

                <div className="mt-8">
                  <OciaButton href="/#contact" arrow>
                    Claim My Free Audit
                  </OciaButton>
                </div>
              </div>

              <div
                id="contact"
                data-reveal-form
                className="rounded-[2.25rem] border border-[rgba(220,230,240,0.14)] bg-[linear-gradient(180deg,rgba(11,20,33,0.9),rgba(6,12,20,0.78))] p-7 shadow-[0_24px_90px_rgba(0,0,0,0.34)] backdrop-blur-xl sm:p-8"
              >
                <div className="rounded-[1.7rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-6">
                  <p className="text-[0.68rem] font-medium uppercase tracking-[0.42em] text-white/42">
                    Request your audit
                  </p>
                  <h3 className="mt-4 text-[2rem] font-medium tracking-[-0.05em] text-white">
                    Request Your Free Website Audit
                  </h3>
                  <p className="mt-4 max-w-2xl text-[0.98rem] leading-7 text-white/62">
                    Tell us what your business needs more of and we&apos;ll review the
                    website with that goal in mind.
                  </p>

                  <form onSubmit={handleAuditSubmit} className="mt-8 grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-2 text-sm text-white/72">
                      <span>Name</span>
                      <input
                        required
                        type="text"
                        className="rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.045)] px-4 py-3 text-white outline-none transition placeholder:text-white/28 focus:border-[rgba(207,222,238,0.34)]"
                        placeholder="Your name"
                      />
                    </label>
                    <label className="grid gap-2 text-sm text-white/72">
                      <span>Business Name</span>
                      <input
                        required
                        type="text"
                        className="rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.045)] px-4 py-3 text-white outline-none transition placeholder:text-white/28 focus:border-[rgba(207,222,238,0.34)]"
                        placeholder="Business name"
                      />
                    </label>
                    <label className="grid gap-2 text-sm text-white/72">
                      <span>Website URL</span>
                      <input
                        required
                        type="url"
                        className="rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.045)] px-4 py-3 text-white outline-none transition placeholder:text-white/28 focus:border-[rgba(207,222,238,0.34)]"
                        placeholder="https://"
                      />
                    </label>
                    <label className="grid gap-2 text-sm text-white/72">
                      <span>Email</span>
                      <input
                        required
                        type="email"
                        className="rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.045)] px-4 py-3 text-white outline-none transition placeholder:text-white/28 focus:border-[rgba(207,222,238,0.34)]"
                        placeholder="you@business.com"
                      />
                    </label>
                    <label className="grid gap-2 text-sm text-white/72">
                      <span>Phone or WhatsApp</span>
                      <input
                        required
                        type="text"
                        className="rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.045)] px-4 py-3 text-white outline-none transition placeholder:text-white/28 focus:border-[rgba(207,222,238,0.34)]"
                        placeholder="+65 ..."
                      />
                    </label>
                    <label className="grid gap-2 text-sm text-white/72">
                      <span>What do you want more of?</span>
                      <select
                        required
                        defaultValue=""
                        className="rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.045)] px-4 py-3 text-white outline-none transition focus:border-[rgba(207,222,238,0.34)]"
                      >
                        <option value="" disabled className="text-[#08111b]">
                          Select one
                        </option>
                        <option className="text-[#08111b]">More enquiries</option>
                        <option className="text-[#08111b]">More bookings</option>
                        <option className="text-[#08111b]">Better website conversion</option>
                        <option className="text-[#08111b]">Better SEO visibility</option>
                        <option className="text-[#08111b]">Better lead follow-up</option>
                      </select>
                    </label>
                    <div className="sm:col-span-2">
                      <button
                        type="submit"
                        className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-[rgba(255,255,255,0.34)] bg-[linear-gradient(180deg,#ffffff_0%,#d7e0ea_100%)] px-6 text-sm font-semibold tracking-[-0.01em] text-[#061018] shadow-[0_12px_40px_rgba(180,210,255,0.12)] transition duration-300 hover:-translate-y-0.5 hover:border-[rgba(255,255,255,0.44)] hover:bg-[linear-gradient(180deg,#ffffff_0%,#e5edf6_100%)] hover:shadow-[0_18px_46px_rgba(180,210,255,0.2)]"
                      >
                        <span>Get My Free Website Audit</span>
                        <span
                          aria-hidden="true"
                          className="text-base text-[#061018]/78 transition-transform duration-300 group-hover:translate-x-0.5"
                        >
                          →
                        </span>
                      </button>
                    </div>
                  </form>

                  <p className="mt-5 text-sm leading-6 text-white/54">
                    {auditSubmitted
                      ? "Thanks, we've received your request. We'll review your website and get back to you with the next steps."
                      : "Prefer to talk first? You can also book directly via Calendly."}
                    {!auditSubmitted ? (
                      <>
                        {" "}
                        <a
                          href={CALENDLY_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/78 underline decoration-white/18 underline-offset-4 transition hover:text-white"
                        >
                          Book a discovery call
                        </a>
                        .
                      </>
                    ) : null}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SceneSection>

        <SceneSection
          id="services"
          data-services-section
          data-work-section
          tone="night"
        >
          <div className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 md:px-10 lg:px-14 xl:px-20">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
              <SectionIntro
                label="Services"
                title="Grouped around the real points where enquiries are won or lost."
                body="We group the work into four capability pillars so you can see how the website, visibility, conversion, response and follow-up pieces connect."
              />

              <div className="grid gap-5">
                {servicePillars.map((pillar, index) => (
                  <article
                    key={pillar.title}
                    data-reveal-card
                    className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(9,17,28,0.78),rgba(5,10,18,0.58))] p-7 shadow-[0_20px_70px_rgba(0,0,0,0.24)] backdrop-blur-xl transition duration-300 hover:border-white/16"
                  >
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                      <div className="max-w-xl">
                        <p className="text-[0.7rem] font-medium uppercase tracking-[0.38em] text-white/38">
                          0{index + 1}
                        </p>
                        <h3 className="mt-3 text-[1.5rem] font-medium tracking-[-0.04em] text-white">
                          {pillar.title}
                        </h3>
                        <p className="mt-4 text-[0.98rem] leading-7 text-white/66">
                          {pillar.text}
                        </p>
                      </div>
                      <div className="grid gap-2 lg:max-w-[18rem] lg:justify-items-end">
                        {pillar.includes.map((item) => (
                          <span
                            key={item}
                            data-reveal-chip
                            className="rounded-full border border-white/8 bg-white/[0.035] px-3 py-2 text-xs uppercase tracking-[0.22em] text-white/68"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </SceneSection>

        <SceneSection data-funnel-section tone="night" className="border-y border-white/8">
          <div className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 md:px-10 lg:px-14 xl:px-20">
            <SectionIntro
              label="Why This Works"
              title="We fix the conversion leaks most businesses miss."
              body="We identify those leaks, prioritise the biggest ones, and help fix them in a way that improves business results."
              align="center"
            />

            <div className="mt-14 overflow-hidden rounded-[2.25rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,15,26,0.84),rgba(5,10,18,0.64))] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-8">
              <div className="hidden items-center gap-3 lg:flex">
                {funnelSteps.map((step, index) => (
                  <div key={step.label} className="flex flex-1 items-center gap-3">
                    <div data-reveal-card className="min-w-0 flex-1 rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-5">
                      <p className="text-[0.68rem] uppercase tracking-[0.34em] text-white/38">
                        {step.label}
                      </p>
                      <p className="mt-4 text-[1.02rem] leading-7 text-white/74">{step.body}</p>
                    </div>
                    {index < funnelSteps.length - 1 ? (
                      <div className="w-16 overflow-hidden">
                        <div
                          data-reveal-line
                          className="h-px w-full bg-[linear-gradient(90deg,rgba(213,229,244,0.76),rgba(100,132,164,0.26))]"
                        />
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="grid gap-4 lg:hidden">
                {funnelSteps.map((step, index) => (
                  <div key={step.label} className="grid gap-3">
                    <div
                      data-reveal-card
                      className="rounded-[1.6rem] border border-white/10 bg-white/[0.035] p-5"
                    >
                      <p className="text-[0.68rem] uppercase tracking-[0.34em] text-white/38">
                        {step.label}
                      </p>
                      <p className="mt-3 text-[1rem] leading-7 text-white/74">{step.body}</p>
                    </div>
                    {index < funnelSteps.length - 1 ? (
                      <div
                        data-reveal-line
                        className="mx-5 h-8 w-px bg-[linear-gradient(180deg,rgba(213,229,244,0.76),rgba(100,132,164,0.16))]"
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SceneSection>

        <SceneSection id="process" data-process-section tone="night">
          <div className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 md:px-10 lg:px-14 xl:px-20">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <SectionIntro
                  label="Process"
                  title="How we work"
                  body="Start with the audit. Then fix what matters most."
                />
              </div>

              <div className="grid gap-4">
                {processSteps.map((step, index) => (
                  <article
                    key={step.step}
                    data-reveal-card
                    className="rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(9,17,28,0.78),rgba(5,10,18,0.58))] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-[0.7rem] font-medium uppercase tracking-[0.38em] text-white/38">
                          Step 0{index + 1}
                        </p>
                        <h3 className="mt-3 text-[1.36rem] font-medium tracking-[-0.04em] text-white">
                          {step.step}
                        </h3>
                      </div>
                      <p className="max-w-2xl text-[0.98rem] leading-7 text-white/66">
                        {step.body}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </SceneSection>

        <SceneSection id="work" data-outcomes-section tone="night" className="border-y border-white/8">
          <div className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 md:px-10 lg:px-14 xl:px-20">
            <SectionIntro
              label="Outcomes"
              title="The goal is not a prettier website. The goal is better business performance."
              body="The work is designed to create a stronger first impression, cleaner conversion flow, and a more reliable way to turn website traffic into real opportunities."
            />

            <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {outcomeCards.map((item) => (
                <article
                  key={item}
                  data-reveal-card
                  className="rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(9,17,28,0.74),rgba(5,10,18,0.5))] p-5 backdrop-blur-xl"
                >
                  <div className="h-1.5 w-10 rounded-full bg-[linear-gradient(90deg,rgba(223,234,245,0.92),rgba(117,150,184,0.22))]" />
                  <p className="mt-5 text-[0.98rem] leading-7 text-white/72">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </SceneSection>

        <SceneSection data-industries-section tone="night">
          <div className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 md:px-10 lg:px-14 xl:px-20">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-end">
              <SectionIntro
                label="Who It's For"
                title="Built for service businesses where trust drives enquiries."
                body="We work especially well with service businesses where the website plays a key role in credibility, contact, and conversion."
              />

              <div className="flex flex-wrap gap-3 lg:justify-end">
                {industries.map((industry) => (
                  <div
                    key={industry}
                    data-reveal-chip
                    className="rounded-full border border-white/10 bg-[rgba(255,255,255,0.045)] px-4 py-3 text-sm text-white/74 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                  >
                    {industry}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SceneSection>

        <SceneSection data-why-section tone="night" className="border-y border-white/8">
          <div className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 md:px-10 lg:px-14 xl:px-20">
            <SectionIntro
              label="Why Ocia Studios"
              title="Why businesses choose Ocia Studios."
              body="If you need more than a pretty website, we are the right kind of partner."
            />

            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              {whyOciaCards.map((card) => (
                <article
                  key={card.title}
                  data-reveal-card
                  className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(9,17,28,0.78),rgba(5,10,18,0.58))] p-7 shadow-[0_20px_70px_rgba(0,0,0,0.24)] backdrop-blur-xl"
                >
                  <h3 className="text-[1.38rem] font-medium tracking-[-0.04em] text-white">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-[0.98rem] leading-7 text-white/66">{card.body}</p>
                </article>
              ))}
            </div>

            <p data-reveal-card className="mt-10 max-w-3xl text-[0.98rem] leading-7 text-white/58">
              If you need more than a pretty website, we are the right kind of partner.
            </p>
          </div>
        </SceneSection>

        <SceneSection data-improvement-section tone="night">
          <div className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 md:px-10 lg:px-14 xl:px-20">
            <SectionIntro
              label="Improvement"
              title="What improvement usually looks like."
              body="Most wins come from improving the basics that directly affect trust and conversion."
            />

            <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {improvementCards.map((item, index) => (
                <article
                  key={item}
                  data-reveal-card
                  className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(9,17,28,0.74),rgba(5,10,18,0.54))] p-6 backdrop-blur-xl"
                >
                  <p className="text-[0.7rem] font-medium uppercase tracking-[0.38em] text-white/38">
                    0{index + 1}
                  </p>
                  <p className="mt-4 text-[1rem] leading-7 text-white/72">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </SceneSection>

        <SceneSection data-faq-section tone="night" className="border-y border-white/8">
          <div className="mx-auto max-w-[1120px] px-5 py-24 sm:px-8 md:px-10 lg:px-14 xl:px-20">
            <SectionIntro
              label="FAQ"
              title="Frequently Asked Questions"
              body="A few of the questions businesses usually ask before we review the site and recommend the right next step."
              align="center"
            />

            <div className="mt-14 grid gap-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;

                return (
                  <div
                    key={faq.question}
                    data-reveal-card
                    className="overflow-hidden rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(9,17,28,0.78),rgba(5,10,18,0.56))] backdrop-blur-xl"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-white/[0.03]"
                    >
                      <span className="text-[1rem] font-medium leading-7 text-white/86">
                        {faq.question}
                      </span>
                      <span className="text-white/48">{isOpen ? "−" : "+"}</span>
                    </button>

                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 pb-6 text-[0.98rem] leading-7 text-white/64">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </SceneSection>

        <SceneSection data-final-section tone="dawn" className="border-b border-white/8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(172,196,220,0.12),transparent_22%),radial-gradient(circle_at_50%_100%,rgba(160,188,214,0.08),transparent_30%)]" />
          <div className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 sm:py-28 md:px-10 lg:px-14 xl:px-20">
            <div
              data-final-cta
              data-reveal-card
              className="rounded-[2.4rem] border border-white/12 bg-[linear-gradient(180deg,rgba(11,20,32,0.9),rgba(6,12,20,0.78))] px-6 py-12 shadow-[0_30px_100px_rgba(0,0,0,0.34)] backdrop-blur-xl sm:px-8 md:px-12 md:py-14"
            >
              <div className="mx-auto max-w-4xl text-center">
                <p className="text-[0.68rem] font-medium uppercase tracking-[0.42em] text-white/42 sm:text-[0.72rem]">
                  Final CTA
                </p>
                <h2 className="mt-6 text-[2.5rem] font-medium leading-[0.95] tracking-[-0.055em] text-white sm:text-[3.4rem] md:text-[4.25rem]">
                  If your website is underperforming, the fix should be clear.
                </h2>
                <p className="mx-auto mt-6 max-w-3xl text-[1rem] leading-8 text-white/68 md:text-[1.08rem]">
                  Get a free website audit and see what is blocking more enquiries,
                  better conversion, and stronger lead flow.
                </p>

                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <OciaButton href="/#contact" arrow>
                    Get My Free Audit
                  </OciaButton>
                  <OciaButton href={CALENDLY_URL} variant="secondary" arrow>
                    Talk to Ocia Studios
                  </OciaButton>
                </div>
              </div>
            </div>
          </div>
        </SceneSection>

        <footer className="relative z-20">
          <div className="mx-auto max-w-[1320px] px-5 py-12 sm:px-8 md:px-10 lg:px-14 xl:px-20">
            <div className="grid gap-8 border-t border-white/8 pt-8 lg:grid-cols-[minmax(0,0.9fr)_auto] lg:items-start">
              <div>
                <Link
                  href="/"
                  className="text-[0.72rem] font-medium uppercase tracking-[0.42em] text-white/92 transition hover:text-white"
                >
                  OCIA Studios
                </Link>
                <p className="mt-4 max-w-3xl text-[0.95rem] leading-7 text-white/54">
                  Ocia Studios helps service businesses improve websites, SEO,
                  conversion, lead generation, automation, booking flow, and follow-up
                  systems so more visitors become real opportunities.
                </p>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-3 text-[0.72rem] uppercase tracking-[0.28em] text-white/48">
                {footerLinks.map((item) => (
                  <Link key={item.label} href={item.href} className="transition hover:text-white/84">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <p className="mt-8 text-[0.75rem] uppercase tracking-[0.24em] text-white/34">
              © {currentYear} Ocia Studios. Built for service businesses that need
              more enquiries.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
