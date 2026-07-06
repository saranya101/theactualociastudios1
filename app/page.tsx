"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { DM_Serif_Display } from "next/font/google";
import Link from "next/link";
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import ConstellationWhale from "./components/ConstellationWhale";
import OciaButton from "./components/OciaButton";
import SceneSection from "./components/SceneSection";
import { CALENDLY_URL } from "./lib/ocia-links";

gsap.registerPlugin(ScrollTrigger);

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
});

const sectionTwoContainer = "mx-auto max-w-[1460px] px-6 sm:px-10 md:px-12 lg:px-14 xl:px-16";
const AUDIT_LINK = CALENDLY_URL;
const SECTION_LINKS = {
  work: "#work",
  services: "#services",
  process: "#process",
  pricing: "#pricing",
  contact: "#contact",
  audit: AUDIT_LINK,
} as const;

const navItems = [
  { label: "Work", href: SECTION_LINKS.work },
  { label: "Services", href: SECTION_LINKS.services },
  { label: "Process", href: SECTION_LINKS.process },
  { label: "Pricing", href: SECTION_LINKS.pricing },
  { label: "Contact", href: SECTION_LINKS.contact },
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

const websiteLeakIssues = [
  {
    id: "messaging",
    number: "01",
    tabLabel: "Unclear messaging",
    cardTitle: "Visitors do not instantly understand what you do",
    shortBody:
      "If your offer is unclear, people hesitate before they ever reach the next step.",
    annotationTitle: "UNCLEAR OFFER",
    annotationBody:
      "Visitors do not instantly understand what you do, who you help, or why they should choose you.",
    affects: ["Clarity", "Positioning", "Conversion"],
    hotspot: "hero-copy",
  },
  {
    id: "trust",
    number: "02",
    tabLabel: "Weak trust",
    cardTitle: "Your website does not build enough trust",
    shortBody:
      "Weak proof, poor presentation, and missing credibility signals make people less likely to enquire.",
    annotationTitle: "WEAK PROOF",
    annotationBody:
      "Trust signals are missing, outdated, or too weak near key decision points.",
    affects: ["Trust", "Credibility", "Enquiries"],
    hotspot: "trust-row",
  },
  {
    id: "cta",
    number: "03",
    tabLabel: "Weak CTA",
    cardTitle: "Your CTA is weak or easy to miss",
    shortBody:
      "If the next step is not obvious, visitors keep browsing instead of taking action.",
    annotationTitle: "HIDDEN CTA",
    annotationBody:
      "Your main call-to-action is buried, visually weak, or appears too late.",
    affects: ["CTA", "Action", "Conversion"],
    hotspot: "cta-button",
  },
  {
    id: "booking",
    number: "04",
    tabLabel: "Booking friction",
    cardTitle: "Your forms or booking flow create friction",
    shortBody:
      "Too many steps, unclear forms, or a clunky booking process reduce conversions.",
    annotationTitle: "BOOKING FRICTION",
    annotationBody:
      "Too many steps, unclear inputs, or weak form structure create hesitation.",
    affects: ["Booking", "Forms", "Conversion"],
    hotspot: "booking-panel",
  },
  {
    id: "whatsapp",
    number: "05",
    tabLabel: "Enquiry flow",
    cardTitle: "Your WhatsApp or enquiry process is inconsistent",
    shortBody:
      "When enquiries are not guided clearly, interested visitors drop off too easily.",
    annotationTitle: "INCONSISTENT ENQUIRY FLOW",
    annotationBody:
      "The path from interest to message, call, or consultation is not clear enough.",
    affects: ["WhatsApp", "Enquiries", "Response"],
    hotspot: "whatsapp-panel",
  },
  {
    id: "seo",
    number: "06",
    tabLabel: "SEO visibility",
    cardTitle: "Your SEO is too weak to bring in the right traffic",
    shortBody:
      "Even a good website underperforms if the right people cannot find it when searching.",
    annotationTitle: "LOW VISIBILITY",
    annotationBody:
      "Your site is not showing up clearly for relevant high-intent searches.",
    affects: ["Visibility", "Search", "Lead Quality"],
    hotspot: "seo-panel",
  },
  {
    id: "followup",
    number: "07",
    tabLabel: "Follow-up leaks",
    cardTitle: "Your leads are not being followed up properly",
    shortBody:
      "Warm leads go cold when there is no clear follow-up system after first contact.",
    annotationTitle: "NO FOLLOW-UP",
    annotationBody:
      "Without a proper follow-up system, interested prospects quietly disappear.",
    affects: ["Follow-up", "Pipeline", "Sales"],
    hotspot: "followup-panel",
  },
  {
    id: "tracking",
    number: "08",
    tabLabel: "No tracking",
    cardTitle: "Your team has no clean system for tracking opportunities",
    shortBody:
      "If leads are not tracked properly, you lose visibility over what is working and what is being lost.",
    annotationTitle: "NO TRACKING",
    annotationBody:
      "Leads are not being tracked, organised, or managed clearly across the pipeline.",
    affects: ["CRM", "Tracking", "Operations"],
    hotspot: "crm-panel",
  },
] as const;

const valueScrollSteps = [
  {
    number: "01",
    blockLabel: "TRUST",
    title: "Improve trust",
    text: "Make visitors feel confident before they decide to reach out.",
    chips: ["Improve trust"],
    squareBg: "#DDECF5",
    squareText: "#071827",
    chipBg: "#EEF6FA",
    chipText: "#25445A",
    ghostColor: "rgba(7,24,39,0.1)",
  },
  {
    number: "02",
    blockLabel: "ENQUIRIES",
    title: "Increase enquiries",
    text: "Guide more people toward calls, forms, WhatsApp, or bookings.",
    chips: ["Increase enquiries"],
    squareBg: "#071827",
    squareText: "#F8F4EC",
    chipBg: "#E7EEF4",
    chipText: "#071827",
    ghostColor: "rgba(7,24,39,0.14)",
  },
  {
    number: "03",
    blockLabel: "FRICTION",
    title: "Reduce friction",
    text: "Remove the small moments that make visitors hesitate or leave.",
    chips: ["Reduce friction"],
    squareBg: "#E9E2D6",
    squareText: "#071827",
    chipBg: "#F5EFE6",
    chipText: "#5A4938",
    ghostColor: "rgba(7,24,39,0.1)",
  },
  {
    number: "04",
    blockLabel: "LEADS",
    title: "Capture more leads",
    text: "Make sure interested visitors are recorded instead of getting lost.",
    chips: ["Capture more leads"],
    squareBg: "#C9DDEB",
    squareText: "#071827",
    chipBg: "#EAF3F8",
    chipText: "#18384F",
    ghostColor: "rgba(7,24,39,0.12)",
  },
  {
    number: "05",
    blockLabel: "SPEED",
    title: "Respond faster",
    text: "Create a clearer enquiry flow so people are not left waiting.",
    chips: ["Respond faster"],
    squareBg: "#F1E7D5",
    squareText: "#071827",
    chipBg: "#FFF7EA",
    chipText: "#6A4A1F",
    ghostColor: "rgba(7,24,39,0.09)",
  },
  {
    number: "06",
    blockLabel: "FOLLOW-UP",
    title: "Follow up better",
    text: "Keep warm leads moving instead of letting them go cold.",
    chips: ["Follow up better"],
    squareBg: "#0E2435",
    squareText: "#F8F4EC",
    chipBg: "#EAF0F4",
    chipText: "#071827",
    ghostColor: "rgba(7,24,39,0.14)",
  },
] as const;

const auditChecklist = [
  "Homepage and messaging review",
  "Trust and credibility review",
  "CTA and enquiry flow review",
  "SEO basics review",
  "Booking and contact flow review",
  "Quick-win opportunities",
  "Recommended next-step services",
];

const serviceSelectorGroups = [
  {
    group: "Website & Visibility",
    services: [
      {
        number: "01",
        title: "Website Redesign",
        preview: "Improve credibility, usability, and visitor action flow.",
        description:
          "Redesign your website so it looks more credible, feels easier to use, and leads visitors toward action.",
        chips: ["Trust", "UX", "Conversion"],
        outcome: "Clearer website experience that guides visitors toward action.",
      },
      {
        number: "02",
        title: "SEO",
        preview: "Help the right people discover your business in search.",
        description:
          "Improve your visibility so the right people can actually find your business when they are searching.",
        chips: ["Visibility", "Search", "Leads"],
        outcome: "Better visibility for people already searching for your service.",
      },
      {
        number: "03",
        title: "Branding & Positioning",
        preview: "Make your offer easier to understand and choose.",
        description:
          "Clarify your message so visitors immediately understand why they should choose you.",
        chips: ["Clarity", "Trust", "Positioning"],
        outcome: "A clearer message that makes your business easier to choose.",
      },
    ],
  },
  {
    group: "Enquiry & Conversion",
    services: [
      {
        number: "04",
        title: "WhatsApp / Enquiry Automation",
        preview: "Speed up replies and reduce missed opportunities.",
        description:
          "Respond faster, qualify leads better, and stop enquiries from slipping through the cracks.",
        chips: ["Response", "Qualification", "Automation"],
        outcome: "Faster replies and fewer enquiries slipping through.",
      },
      {
        number: "05",
        title: "AI Chatbot",
        preview: "Guide visitors even when your team is offline.",
        description:
          "Add always-on support that can answer questions and guide visitors toward action.",
        chips: ["Support", "Guidance", "Automation"],
        outcome: "Always-on support that guides visitors even when your team is offline.",
      },
      {
        number: "06",
        title: "Appointment Booking System",
        preview: "Reduce friction between interest and scheduling.",
        description:
          "Make it easier for interested prospects to schedule without friction.",
        chips: ["Booking", "Scheduling", "Conversion"],
        outcome: "Less friction between interest and confirmed appointments.",
      },
    ],
  },
  {
    group: "Lead Management & Growth",
    services: [
      {
        number: "07",
        title: "CRM / Lead Management",
        preview: "Keep visibility over every lead and follow-up step.",
        description:
          "Track leads, manage follow-up, and create visibility so fewer opportunities go cold.",
        chips: ["CRM", "Follow-up", "Pipeline"],
        outcome: "Better tracking and follow-up so warm leads do not go cold.",
      },
      {
        number: "08",
        title: "E-commerce Improvement",
        preview: "Improve trust and checkout flow for stronger sales.",
        description:
          "Improve product pages, trust, and checkout flow so more visitors complete a purchase.",
        chips: ["Product", "Trust", "Checkout"],
        outcome: "Stronger product pages and checkout flow for more completed purchases.",
      },
      {
        number: "09",
        title: "Social Media Content",
        preview: "Reinforce authority before visitors ever enquire.",
        description:
          "Support trust, authority, and awareness with content that reinforces your offer.",
        chips: ["Content", "Authority", "Awareness"],
        outcome: "More trust and awareness before visitors reach your website.",
      },
    ],
  },
] as const;

const leakChainSteps = [
  {
    number: "01",
    title: "Unclear messaging",
    effect: "Reduces trust",
    detail:
      "If visitors do not understand what you do quickly, trust drops before they take action.",
    shortLabel: "Messaging",
    tone: "soft",
  },
  {
    number: "02",
    title: "Weak design",
    effect: "Lowers credibility",
    detail: "A weak visual experience makes the business feel less credible.",
    shortLabel: "Design",
    tone: "soft",
  },
  {
    number: "03",
    title: "Bad CTA placement",
    effect: "Kills response",
    detail: "If the next step is not obvious, interested visitors do not respond.",
    shortLabel: "CTA",
    tone: "accent",
  },
  {
    number: "04",
    title: "Friction-heavy forms",
    effect: "Reduce enquiries",
    detail: "Too many steps or unclear forms reduce the number of enquiries.",
    shortLabel: "Forms",
    tone: "soft",
  },
  {
    number: "05",
    title: "No booking flow",
    effect: "Slows decisions",
    detail: "Without a clear booking path, people delay or leave.",
    shortLabel: "Booking",
    tone: "soft",
  },
  {
    number: "06",
    title: "Poor follow-up",
    effect: "Turns warm leads cold",
    detail: "Warm leads go cold when there is no follow-up system.",
    shortLabel: "Follow-up",
    tone: "soft",
  },
] as const;

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

const outcomeBoardCards = [
  {
    number: "01",
    label: "Trust",
    title: "Trust & Clarity",
    transformBefore: "unclear",
    transformAfter: "trusted",
    cardAccent:
      "bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(241,248,252,0.98))]",
    chipAccent: "bg-[rgba(234,243,248,0.92)] text-[#32516a]",
    markerAccent: "bg-[rgba(221,236,245,0.92)] text-[#25445a]",
    items: [
      "A website that builds more trust",
      "Clearer messaging that improves response",
    ],
  },
  {
    number: "02",
    label: "Leads",
    title: "Conversion & Enquiries",
    transformBefore: "passive traffic",
    transformAfter: "more enquiries",
    cardAccent:
      "bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(246,249,252,0.98))]",
    chipAccent: "bg-[rgba(241,247,251,0.94)] text-[#32516a]",
    markerAccent: "bg-[rgba(230,239,246,0.92)] text-[#25445a]",
    items: [
      "Better conversion from existing traffic",
      "More enquiries from the right people",
    ],
  },
  {
    number: "03",
    label: "Speed",
    title: "Speed & Follow-up",
    transformBefore: "slow response",
    transformAfter: "faster action",
    cardAccent:
      "bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,243,235,0.98))]",
    chipAccent: "bg-[rgba(245,239,230,0.94)] text-[#6b573d]",
    markerAccent: "bg-[rgba(239,230,214,0.92)] text-[#5a4a38]",
    items: [
      "Faster response to leads",
      "Better follow-up and less leakage",
    ],
  },
  {
    number: "04",
    label: "Growth",
    title: "Growth Direction",
    transformBefore: "guesswork",
    transformAfter: "clear next steps",
    cardAccent:
      "bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(243,247,250,0.98))]",
    chipAccent: "bg-[rgba(232,239,244,0.94)] text-[#4d6475]",
    markerAccent: "bg-[rgba(225,234,240,0.92)] text-[#25445a]",
    items: [
      "Less friction in forms and booking",
      "A clearer growth plan based on real gaps",
    ],
  },
] as const;

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

const whyOciaComparison = {
  commonApproach: [
    "Looks better",
    "More pages",
    "Launch and leave",
  ],
  ociaApproach: [
    {
      number: "01",
      title: "Business outcomes",
      body: "We focus on business outcomes, not vanity design.",
      tone: "soft",
    },
    {
      number: "02",
      title: "Full enquiry funnel",
      body: "We look at the full enquiry funnel.",
      tone: "soft",
    },
    {
      number: "03",
      title: "Conversion diagnosis",
      body: "We identify what is actually hurting conversions.",
      tone: "accent",
    },
    {
      number: "04",
      title: "Evidence-based recommendations",
      body: "We recommend services based on evidence, not assumptions.",
      tone: "soft",
    },
    {
      number: "05",
      title: "Lead-dependent businesses",
      body: "We understand businesses that depend on leads and bookings.",
      tone: "soft",
    },
    {
      number: "06",
      title: "Pipeline movement",
      body: "We care about results like enquiries, calls, and pipeline movement.",
      tone: "soft",
    },
  ],
} as const;

const faqs = [
  {
    question: "Do you only do website redesign?",
    answer:
      "No. We also help with SEO, conversion optimisation, lead generation, WhatsApp automation, booking systems, and CRM follow-up improvements.",
  },
  {
    question: "What if I already have a website?",
    answer:
      "That is fine. In many cases, the best move is improving what you already have instead of rebuilding everything from scratch.",
  },
  {
    question: "How do I know which service I need?",
    answer:
      "That is why we start with the audit. We identify the biggest growth gaps first, then recommend the most useful next step.",
  },
  {
    question: "Can you help us get more leads, not just improve design?",
    answer:
      "Yes. Our focus is on improving trust, visibility, conversion, and lead flow.",
  },
  {
    question: "Do you help with follow-up and CRM too?",
    answer:
      "Yes. We can help improve how your leads are tracked, managed, and followed up.",
  },
  {
    question: "Do you work with local service businesses?",
    answer:
      "Yes. That is one of our strongest fits, especially businesses that depend on enquiries, calls, bookings, and trust.",
  },
  {
    question: "What happens after the free audit?",
    answer:
      "We show you the main issues, explain the opportunities, and recommend the best next step based on your goals.",
  },
];

const footerLinks = [
  { label: "Work", href: SECTION_LINKS.work },
  { label: "Services", href: SECTION_LINKS.services },
  { label: "Process", href: SECTION_LINKS.process },
  { label: "Pricing", href: SECTION_LINKS.pricing },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: SECTION_LINKS.contact },
];

const footerServiceLinks = [
  { label: "Website Redesign", href: SECTION_LINKS.services },
  { label: "SEO", href: SECTION_LINKS.services },
  { label: "Automation", href: SECTION_LINKS.services },
  { label: "CRM / Follow-up", href: SECTION_LINKS.services },
];

const footerLegalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
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
  "[data-faq-section]",
  "[data-final-section]",
  "[data-footer-section]",
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
            className="ml-2 inline-flex translate-y-[-0.02em] items-center rounded-full px-3 py-[0.3rem] text-[0.74rem] font-bold tracking-[-0.01em] text-[#071827] shadow-[0_8px_24px_rgba(63,139,198,0.12)] sm:ml-4 sm:translate-y-[-0.08em] sm:px-4 sm:py-2 sm:text-[0.82rem] md:text-[0.88rem]"
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

function AuditWebsiteMockup({
  issue,
}: {
  issue: (typeof websiteLeakIssues)[number];
}) {
  const isHotspot = (hotspot: (typeof websiteLeakIssues)[number]["hotspot"]) => issue.hotspot === hotspot;
  const hotspotPosition = {
    "hero-copy": { markerClass: "left-[36%] top-[22%]", connectorClass: "left-[38%] top-[23.2%] w-[23%]" },
    "trust-row": { markerClass: "left-[76%] top-[32%]", connectorClass: "left-[78%] top-[33.1%] w-[8%]" },
    "cta-button": { markerClass: "left-[28%] top-[40%]", connectorClass: "left-[30%] top-[41.1%] w-[31%]" },
    "booking-panel": { markerClass: "left-[18%] top-[79%]", connectorClass: "left-[20%] top-[80.1%] w-[41%]" },
    "whatsapp-panel": { markerClass: "left-[50%] top-[83%]", connectorClass: "left-[52%] top-[84.1%] w-[9%]" },
    "seo-panel": { markerClass: "left-[48%] top-[67%]", connectorClass: "left-[50%] top-[68.1%] w-[11%]" },
    "followup-panel": { markerClass: "left-[82%] top-[74%]", connectorClass: "left-[84%] top-[75.1%] w-[2%]" },
    "crm-panel": { markerClass: "left-[82%] top-[86%]", connectorClass: "left-[84%] top-[87.1%] w-[2%]" },
  } as const;
  const annotationBubblePosition = {
    "hero-copy": "left-[5%] top-[11%] max-w-[13rem]",
    "trust-row": "left-[58%] top-[17%] max-w-[12rem]",
    "cta-button": "left-[6%] top-[31%] max-w-[12rem]",
    "booking-panel": "left-[6%] top-[69%] max-w-[12rem]",
    "whatsapp-panel": "left-[43%] top-[73%] max-w-[12rem]",
    "seo-panel": "left-[40%] top-[57%] max-w-[12rem]",
    "followup-panel": "left-[67%] top-[65%] max-w-[11rem]",
    "crm-panel": "left-[66%] top-[78%] max-w-[11rem]",
  } as const;
  const contentTranslate = {
    "hero-copy": "0%",
    "trust-row": "-8%",
    "cta-button": "-3%",
    "booking-panel": "-24%",
    "whatsapp-panel": "-30%",
    "seo-panel": "-19%",
    "followup-panel": "-29%",
    "crm-panel": "-35%",
  } as const;
  const activeHotspot = hotspotPosition[issue.hotspot];

  return (
    <motion.div
      initial={{ y: 12 }}
      whileInView={{ y: -6 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative aspect-[16/9] overflow-hidden rounded-[2.2rem] bg-[linear-gradient(180deg,#112232,#0b1622)] p-3 shadow-[0_24px_70px_rgba(9,18,28,0.2)] ring-1 ring-[rgba(255,255,255,0.06)]"
    >
      <div className="pointer-events-none absolute inset-x-12 top-0 h-20 rounded-b-[2rem] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_74%)]" />
      <motion.div
        key={issue.id}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="flex h-full flex-col rounded-[1.8rem] border border-[rgba(7,24,39,0.08)] bg-[linear-gradient(180deg,#fcfaf6,#f4eee5)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.84)]"
      >
        <div className="mb-4 flex items-center justify-between rounded-[1rem] border border-[rgba(7,24,39,0.08)] bg-white/72 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#c9d8e3]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#e5cfac]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#9ec5e3]" />
            </div>
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#5a7082]">Website lead leak audit</p>
          </div>
          <p className="text-[0.62rem] font-medium uppercase tracking-[0.2em] text-[#6b8294]">BrightSpace Interiors</p>
        </div>

        <div className="relative flex-1 overflow-hidden rounded-[1.45rem] border border-[rgba(7,24,39,0.06)] bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(247,242,234,0.94))] p-3">
          <div className="grid h-full gap-3 lg:grid-cols-[minmax(0,1.72fr)_minmax(15rem,0.88fr)]">
            <div className="relative rounded-[1.35rem] border border-[rgba(7,24,39,0.06)] bg-[#fbf8f1] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.86)]">
              <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_18%_0%,rgba(181,216,241,0.28),transparent_44%)]" />
              <div className="relative rounded-[1rem] border border-[rgba(7,24,39,0.06)] bg-white/86 px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#d9e4ec]" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[#ead5b7]" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[#b7d3e8]" />
                  </div>
                  <div className="flex flex-wrap justify-end gap-2">
                    {["Home", "Services", "Projects", "Contact"].map((item) => (
                      <span key={item} className="rounded-full bg-[#102130]/6 px-3 py-1 text-[0.56rem] uppercase tracking-[0.16em] text-[#102130]/56">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative mt-3 h-[calc(100%-4.25rem)] min-h-[20rem] overflow-hidden rounded-[1.1rem] bg-[linear-gradient(180deg,#e6eff6,#f8fbff)] p-3 shadow-[0_18px_36px_rgba(188,206,220,0.22)] md:p-4">
                <motion.div
                  animate={{ y: contentTranslate[issue.hotspot] }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="grid min-h-[132%] gap-3"
                >
                  <div className={`rounded-[1rem] border p-4 transition-all duration-300 ${isHotspot("hero-copy") ? "border-[rgba(126,167,198,0.28)] bg-white/96 shadow-[0_18px_40px_rgba(126,167,198,0.22)]" : "border-transparent bg-white/88"}`}>
                    <div className="h-3 w-24 rounded-full bg-[#102130]/14" />
                    <div className="mt-4 space-y-2.5">
                      <div className={`h-9 w-[88%] rounded-[0.85rem] ${isHotspot("hero-copy") ? "bg-[#102130]/13" : "bg-[#102130]/9"}`} />
                      <div className={`h-9 w-[72%] rounded-[0.85rem] ${isHotspot("hero-copy") ? "bg-[#102130]/11" : "bg-[#102130]/7"}`} />
                      <div className="h-3 w-[80%] rounded-full bg-[#102130]/10" />
                      <div className="h-3 w-[62%] rounded-full bg-[#102130]/7" />
                    </div>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <div className={`h-10 w-32 rounded-full transition-all duration-300 ${isHotspot("cta-button") ? "bg-[#d6e7f4] ring-1 ring-[rgba(16,33,48,0.18)] shadow-[0_10px_24px_rgba(123,163,194,0.24)]" : "bg-[#102130]"}`} />
                      <div className="h-10 w-28 rounded-full bg-[#102130]/8" />
                    </div>
                  </div>

                  <div className="grid gap-3 lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="rounded-[1rem] bg-white/84 p-3">
                      <div className="h-full min-h-[8.5rem] rounded-[0.9rem] bg-[linear-gradient(135deg,#dfe9f1,#fdfefe)] p-3">
                        <div className="flex h-full items-end justify-between gap-3">
                          <div className="space-y-2">
                            <div className="h-2 w-16 rounded-full bg-[#102130]/12" />
                            <div className="h-2 w-12 rounded-full bg-[#102130]/8" />
                          </div>
                          <div className="h-16 w-16 rounded-[1rem] bg-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.84)]" />
                        </div>
                      </div>
                    </div>
                    <div className={`rounded-[1rem] border p-4 transition-all duration-300 ${isHotspot("trust-row") ? "border-[rgba(201,220,235,0.22)] bg-[#102130] text-white shadow-[0_14px_30px_rgba(16,33,48,0.24)]" : "border-transparent bg-white/82 text-[#102130]"}`}>
                      <div className={`text-[0.56rem] uppercase tracking-[0.16em] ${isHotspot("trust-row") ? "text-white/44" : "text-[#5c7385]"}`}>Trust row</div>
                      <div className="mt-3 grid grid-cols-4 gap-2">
                        {Array.from({ length: 4 }).map((_, index) => <div key={index} className={`h-8 rounded-[0.75rem] ${isHotspot("trust-row") ? "bg-white/14" : "bg-[#102130]/7"}`} />)}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {["Interior styling", "Renovation planning", "Space audits"].map((service, index) => (
                      <div key={service} className="rounded-[0.95rem] border border-[rgba(7,24,39,0.06)] bg-white/82 p-3">
                        <div className="h-8 w-8 rounded-[0.8rem] bg-[#d9e7f2]" />
                        <div className="mt-3 h-2 w-20 rounded-full bg-[#102130]/12" />
                        <div className="mt-2 h-2 rounded-full bg-[#102130]/7" />
                        <div className={`mt-2 h-2 rounded-full ${index === 1 ? "w-4/5" : "w-3/4"} bg-[#102130]/7`} />
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-3 lg:grid-cols-[0.94fr_0.9fr_1.16fr]">
                    <div className={`rounded-[1rem] border p-4 transition-all duration-300 ${isHotspot("booking-panel") ? "border-[rgba(186,152,120,0.22)] bg-[linear-gradient(180deg,#fffaf4,#f2e8dc)] shadow-[0_14px_30px_rgba(146,112,81,0.12)]" : "border-transparent bg-white/82"}`}>
                      <div className="text-[0.56rem] uppercase tracking-[0.16em] text-[#526777]">Booking widget</div>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <div className="h-9 rounded-[0.75rem] bg-[#102130]/8" />
                        <div className="h-9 rounded-[0.75rem] bg-[#102130]/8" />
                        <div className="h-9 rounded-[0.75rem] bg-[#102130]/8" />
                        <div className="h-9 rounded-[0.75rem] bg-[#102130]/10" />
                      </div>
                    </div>
                    <div className="grid gap-3">
                      <div className={`rounded-[1rem] border p-3 transition-all duration-300 ${isHotspot("seo-panel") ? "border-[rgba(126,167,198,0.22)] bg-[linear-gradient(180deg,#ebf3fa,#ffffff)] shadow-[0_14px_30px_rgba(124,152,175,0.14)]" : "border-transparent bg-white/82"}`}>
                        <div className="text-[0.56rem] uppercase tracking-[0.16em] text-[#526777]">Local search</div>
                        <div className="mt-2 rounded-[0.75rem] bg-[#102130]/6 px-3 py-2 text-[0.62rem] text-[#40576a]">interior design consultation singapore</div>
                        <div className="mt-3 flex items-end gap-2">
                          <div className="text-[1.5rem] font-semibold tracking-[-0.05em] text-[#102130]">{isHotspot("seo-panel") ? "#9" : "#24"}</div>
                          <div className="text-[0.64rem] uppercase tracking-[0.16em] text-[#688092]">search rank</div>
                        </div>
                      </div>
                      <div className={`rounded-[1rem] border p-3 transition-all duration-300 ${isHotspot("whatsapp-panel") ? "border-[rgba(102,152,122,0.22)] bg-[linear-gradient(180deg,#eff8f2,#dff1e6)] shadow-[0_14px_30px_rgba(87,126,107,0.12)]" : "border-transparent bg-white/82"}`}>
                        <div className="text-[0.56rem] uppercase tracking-[0.16em] text-[#526777]">Enquiry handoff</div>
                        <div className="mt-2 grid gap-1.5">
                          <div className="ml-auto w-[78%] rounded-[0.75rem] rounded-br-sm bg-[#d7efe1] px-2.5 py-2 text-[0.58rem] text-[#204033]">Do you have availability this week?</div>
                          <div className="w-[84%] rounded-[0.75rem] rounded-bl-sm bg-white px-2.5 py-2 text-[0.58rem] text-[#4b6172]">Yes. We&apos;ll send the next step shortly.</div>
                        </div>
                      </div>
                    </div>
                    <div className={`rounded-[1rem] border p-4 transition-all duration-300 ${isHotspot("crm-panel") || isHotspot("followup-panel") ? "border-[rgba(201,220,235,0.16)] bg-[#102130] text-white shadow-[0_16px_32px_rgba(16,33,48,0.24)]" : "border-transparent bg-white/84 text-[#102130]"}`}>
                      <div className={`flex items-center justify-between text-[0.56rem] uppercase tracking-[0.16em] ${isHotspot("crm-panel") || isHotspot("followup-panel") ? "text-white/44" : "text-[#526777]"}`}>
                        <span>{isHotspot("followup-panel") ? "Follow-up flow" : "Lead tracker"}</span>
                        <span>{isHotspot("followup-panel") ? "Delayed response" : "4 new opportunities"}</span>
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        {["New", "Follow-up", "Won"].map((item, index) => (
                          <div key={item} className={`rounded-[0.85rem] px-2 py-2.5 text-center text-[0.58rem] uppercase tracking-[0.14em] ${isHotspot("crm-panel") || isHotspot("followup-panel") ? index === 1 && isHotspot("followup-panel") ? "bg-white/16 text-white" : "bg-white/8 text-white/64" : "bg-[#102130]/6 text-[#526777]"}`}>
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                <div className="pointer-events-none absolute inset-0 hidden lg:block">
                  <motion.div
                    key={`${issue.id}-bubble`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className={`absolute ${annotationBubblePosition[issue.hotspot]} rounded-[1rem] border border-[rgba(7,24,39,0.08)] bg-[rgba(255,252,247,0.96)] px-3 py-3 shadow-[0_18px_36px_rgba(16,33,48,0.1)] backdrop-blur-sm`}
                  >
                    <p className="text-[0.54rem] font-semibold uppercase tracking-[0.16em] text-[#6d8191]">{issue.annotationTitle}</p>
                    <p className="mt-2 text-[0.68rem] leading-5 text-[#4e6475]">{issue.annotationBody}</p>
                  </motion.div>
                  <div className={`absolute ${activeHotspot.connectorClass} h-px bg-[linear-gradient(90deg,rgba(16,33,48,0.44),rgba(16,33,48,0.08))]`} />
                  <span className={`absolute ${activeHotspot.markerClass} h-3.5 w-3.5 rounded-full bg-[#102130] shadow-[0_0_0_7px_rgba(221,236,247,0.6)]`} />
                </div>
              </div>
            </div>

            <div className="grid gap-3 content-start">
              <div className="rounded-[1.1rem] border border-[rgba(7,24,39,0.06)] bg-white/84 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-[0.56rem] uppercase tracking-[0.16em] text-[#526777]">Response path</p>
                  <span className="rounded-full bg-[#102130]/6 px-2.5 py-1 text-[0.56rem] uppercase tracking-[0.14em] text-[#526777]">
                    Live
                  </span>
                </div>
                <div className="mt-3 space-y-2">
                  {["Visit", "Enquiry", "Booked", "Follow-up"].map((step, index) => (
                    <div
                      key={step}
                      className={`flex items-center justify-between rounded-[0.8rem] px-3 py-2 ${
                        isHotspot("followup-panel") && index === 3
                          ? "bg-[#102130] text-white"
                          : "bg-[#102130]/6 text-[#526777]"
                      }`}
                    >
                      <span className="text-[0.62rem] font-semibold uppercase tracking-[0.14em]">{step}</span>
                      <span className="h-2.5 w-14 rounded-full bg-current/20" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.1rem] border border-[rgba(7,24,39,0.06)] bg-white/84 p-4">
                <div className="text-[0.56rem] uppercase tracking-[0.16em] text-[#526777]">Tracking board</div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {["New", "Open", "Won"].map((status, index) => (
                    <div
                      key={status}
                      className={`rounded-[0.8rem] px-2 py-2 text-center text-[0.56rem] font-semibold uppercase tracking-[0.14em] ${
                        isHotspot("crm-panel") && index === 1
                          ? "bg-[#d6e7f4] text-[#102130]"
                          : "bg-[#102130]/6 text-[#526777]"
                      }`}
                    >
                      {status}
                    </div>
                  ))}
                </div>
                <div className="mt-3 space-y-2">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className={`h-8 rounded-[0.8rem] ${
                        isHotspot("crm-panel") && index === 1
                          ? "bg-[#102130]/14"
                          : "bg-[#102130]/7"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-[1.1rem] border border-[rgba(7,24,39,0.06)] bg-white/84 p-4">
                <div className="text-[0.56rem] uppercase tracking-[0.16em] text-[#526777]">Ops snapshot</div>
                <div className="mt-3 grid gap-2">
                  <div className="rounded-[0.85rem] bg-[#102130]/6 px-3 py-2">
                    <div className="h-2 w-12 rounded-full bg-[#102130]/16" />
                    <div className="mt-2 h-2 w-4/5 rounded-full bg-[#102130]/10" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className={`rounded-[0.85rem] p-3 ${isHotspot("seo-panel") ? "bg-[#e7f0f8]" : "bg-[#102130]/6"}`}>
                      <div className="h-2 w-10 rounded-full bg-[#102130]/12" />
                      <div className="mt-2 h-5 w-12 rounded-[0.6rem] bg-[#102130]/10" />
                    </div>
                    <div className={`rounded-[0.85rem] p-3 ${isHotspot("whatsapp-panel") ? "bg-[#e6f4eb]" : "bg-[#102130]/6"}`}>
                      <div className="h-2 w-10 rounded-full bg-[#102130]/12" />
                      <div className="mt-2 h-5 w-14 rounded-[0.6rem] bg-[#102130]/10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
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
            className="relative h-[39rem] overflow-x-hidden overflow-y-visible pt-4 pb-[6.25rem]"
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
                      className="group relative h-[27.9rem] w-[22.6rem] shrink-0 overflow-hidden rounded-[2rem] border border-black/8 bg-[rgba(255,255,255,0.9)] p-5 text-left shadow-[0_26px_80px_rgba(22,34,48,0.14)] backdrop-blur-md transition duration-300 [transform:translateY(var(--card-shift))_rotate(var(--card-rotate))] group-hover:[transform:translateY(calc(var(--card-shift)-4px))_rotate(var(--card-rotate))] hover:shadow-[0_30px_88px_rgba(22,34,48,0.18)]"
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

function ValueScrollWall() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const squareTrackY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ["0px", "-340px", "-680px", "-1020px", "-1360px", "-1700px"],
  );
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      if (value < 0.2) {
        setActiveStep(0);
      } else if (value < 0.4) {
        setActiveStep(1);
      } else if (value < 0.6) {
        setActiveStep(2);
      } else if (value < 0.8) {
        setActiveStep(3);
      } else if (value < 1) {
        setActiveStep(4);
      } else {
        setActiveStep(5);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <>
      <div className="bg-[#f6f1e8] lg:hidden">
        <div className={`${sectionTwoContainer} py-24 sm:py-28`}>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[#5a7082]">
            WHAT WE FIX
          </p>
          <h2 className="mt-5 max-w-[12ch] text-[2.45rem] font-medium leading-[0.95] tracking-[-0.05em] text-[#071827] sm:text-[3.15rem]">
            We fix the parts of your online funnel that stop people from contacting you.
          </h2>
          <p className="mt-6 max-w-[38rem] text-[1rem] leading-8 text-[#42596b]">
            At Ocia Studios, we do more than “make websites look better.” We improve the
            parts of your business that directly affect trust, lead flow, conversion,
            response speed, and follow-up.
          </p>
        </div>

        <div className={`${sectionTwoContainer} grid gap-5 pb-24`}>
          {valueScrollSteps.map((step, index) => (
            <motion.article
              key={step.number}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{
                duration: 0.6,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative overflow-hidden rounded-[2rem] border border-[rgba(11,28,43,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(250,245,237,0.96))] p-5 shadow-[0_20px_48px_rgba(18,31,44,0.08)] sm:p-6"
            >
              <div className="pointer-events-none absolute right-4 top-3 text-[5rem] font-medium leading-none tracking-[-0.12em] text-[#ffffff]">
                {step.number}
              </div>
              <div className="relative grid gap-4">
                <div
                  className="flex min-h-[10rem] items-center justify-center rounded-[1.65rem] border border-[rgba(11,28,43,0.08)] text-center text-[1.2rem] font-medium tracking-[-0.03em]"
                  style={{ backgroundColor: step.squareBg, color: step.squareText }}
                >
                  {step.blockLabel}
                </div>
                <div className="rounded-[1.7rem] bg-white/76 p-5">
                  <p className="text-[0.64rem] font-semibold uppercase tracking-[0.22em] text-[#6a8090]">
                    {step.number}
                  </p>
                  <h3 className="mt-3 text-[1.55rem] font-medium leading-[1] tracking-[-0.04em] text-[#102130]">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-[0.98rem] leading-7 text-[#4e6475]">
                    {step.text}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {step.chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full border border-[rgba(16,33,48,0.08)] px-3 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.16em]"
                        style={{ backgroundColor: step.chipBg, color: step.chipText }}
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <section
        id="value-proposition"
        ref={sectionRef}
        className="relative hidden h-[600vh] bg-[#F6F1E8] lg:block"
      >
          <div className="sticky top-0 h-screen overflow-hidden bg-[#F6F1E8]">
            <div className="pointer-events-none absolute inset-0 z-0 bg-[#F6F1E8]" />
            <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.42),transparent_42%),radial-gradient(circle_at_20%_18%,rgba(214,229,240,0.24),transparent_24%),radial-gradient(circle_at_82%_78%,rgba(255,249,240,0.64),transparent_32%)]" />

            <div className={`${sectionTwoContainer} relative h-full`}>
              <div className="grid h-full items-center gap-10 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] xl:gap-12">
                <div className="relative z-20 max-w-[34rem]">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[#5a7082]">
                    WHAT WE FIX
                  </p>
                  <h2 className="mt-5 max-w-[12ch] text-[3.15rem] font-medium leading-[0.94] tracking-[-0.06em] text-[#071827] xl:text-[4.05rem]">
                    We fix the parts of your online funnel that stop people from contacting you.
                  </h2>
                  <p className="mt-6 max-w-[34rem] text-[1.03rem] leading-8 text-[#42596b] xl:text-[1.08rem]">
                    At Ocia Studios, we do more than “make websites look better.” We improve the
                    parts of your business that directly affect trust, lead flow, conversion,
                    response speed, and follow-up.
                  </p>
                </div>

                <div className="relative z-10 justify-self-end w-full max-w-[896px] lg:origin-right lg:scale-[0.88] xl:scale-100">
                  <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
                    <motion.span
                      key={valueScrollSteps[activeStep].blockLabel}
                      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 0.2, y: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="text-center text-[7.2rem] font-medium leading-none tracking-[-0.12em] xl:text-[8.35rem]"
                      style={{ color: valueScrollSteps[activeStep].ghostColor }}
                    >
                      {valueScrollSteps[activeStep].blockLabel}
                    </motion.span>
                  </div>

                  <div className="relative z-10 flex h-[340px] items-center justify-end gap-4">
                    <div className="relative h-[340px] w-[340px] shrink-0 overflow-hidden rounded-[30px] xl:rounded-[32px]">
                      <motion.div
                        style={reduceMotion ? undefined : { y: squareTrackY }}
                        className="will-change-transform"
                      >
                        {valueScrollSteps.map((step) => (
                          <div
                            key={step.number}
                            className="flex h-[340px] w-[340px] items-center justify-center rounded-[30px] border border-[rgba(11,28,43,0.08)] text-center text-[2.85rem] font-medium leading-[0.88] tracking-[-0.05em] shadow-[0_24px_56px_rgba(19,31,45,0.08)] xl:rounded-[32px] xl:text-[3.1rem]"
                            style={{ backgroundColor: step.squareBg, color: step.squareText }}
                          >
                            <span className="max-w-[8ch]">{step.blockLabel}</span>
                          </div>
                        ))}
                      </motion.div>
                    </div>

                    <div className="relative h-[340px] w-[540px] overflow-hidden rounded-[30px] border border-[rgba(11,28,43,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.99),rgba(252,249,244,0.97))] shadow-[0_28px_72px_rgba(18,31,44,0.11)] xl:rounded-[32px]">
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(224,236,245,0.26),transparent_22%),radial-gradient(circle_at_82%_84%,rgba(247,239,228,0.24),transparent_26%)]" />
                      <div className="relative h-full">
                        <motion.div
                          key={valueScrollSteps[activeStep].number}
                          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute inset-0 flex h-full flex-col justify-between px-10 py-10"
                        >
                          <div>
                            <p className="text-[0.64rem] font-semibold uppercase tracking-[0.22em] text-[#6a8090]">
                              {valueScrollSteps[activeStep].number}
                            </p>
                            <h3 className="mt-4 max-w-[14ch] text-[2.4rem] font-medium leading-[0.92] tracking-[-0.05em] text-[#102130] xl:text-[2.6rem]">
                              {valueScrollSteps[activeStep].title}
                            </h3>
                            <p className="mt-5 max-w-[26rem] text-[1.06rem] leading-8 text-[#4e6475] xl:text-[1.12rem]">
                              {valueScrollSteps[activeStep].text}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-2.5">
                            {valueScrollSteps[activeStep].chips.map((chip) => (
                              <span
                                key={chip}
                                className="rounded-full border border-[rgba(16,33,48,0.08)] px-3.5 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em]"
                                style={{
                                  backgroundColor: valueScrollSteps[activeStep].chipBg,
                                  color: valueScrollSteps[activeStep].chipText,
                                }}
                              >
                                {chip}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}

function ConversionLeakTimeline() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      if (value < 0.17) {
        setActiveStep(0);
      } else if (value < 0.34) {
        setActiveStep(1);
      } else if (value < 0.51) {
        setActiveStep(2);
      } else if (value < 0.67) {
        setActiveStep(3);
      } else if (value < 0.84) {
        setActiveStep(4);
      } else {
        setActiveStep(5);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const activeLeak = leakChainSteps[activeStep];
  const completedLeaks = leakChainSteps.slice(0, activeStep);
  const showOutcome = activeStep === leakChainSteps.length - 1;

  return (
    <>
      <section data-funnel-section className="bg-[#f6f1e8] lg:hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(221,236,245,0.28),transparent_22%),radial-gradient(circle_at_82%_76%,rgba(244,235,223,0.5),transparent_28%)]" />
        <div className={`relative ${sectionTwoContainer} py-24 sm:py-28`}>
          <div data-reveal-intro className="max-w-[36rem]">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#5a7082]">
              WHY THIS WORKS
            </p>
            <h2 className="mt-5 max-w-[12ch] text-[2.7rem] font-medium leading-[0.94] tracking-[-0.055em] text-[#071827] sm:text-[3.55rem]">
              Why most websites underperform
            </h2>
            <p className="mt-6 max-w-[34rem] text-[1rem] leading-8 text-[#42596b]">
              A website does not fail because of one big problem. It usually underperforms because of several small conversion leaks working together.
            </p>

            <div className="mt-8 rounded-[1.8rem] border border-[rgba(7,24,39,0.08)] bg-[rgba(234,243,248,0.5)] px-6 py-5 shadow-[0_16px_40px_rgba(19,31,45,0.04)]">
              <p className="text-[1rem] leading-8 text-[#25445a]">
                We identify those leaks, prioritise the biggest ones, and help fix them in a way that improves business results.
              </p>
            </div>
          </div>

          <motion.div
            data-reveal-card
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 overflow-hidden rounded-[2.2rem] border border-[rgba(7,24,39,0.08)] bg-[linear-gradient(180deg,#fffdf8_0%,#fbf7ef_100%)] p-5 shadow-[0_24px_80px_rgba(19,31,45,0.08)] sm:p-7"
          >
            <div className="rounded-[1.75rem] border border-[rgba(7,24,39,0.08)] bg-white/62 px-5 py-5 sm:px-6 sm:py-6">
              <div className="flex items-center justify-between gap-4 border-b border-[rgba(7,24,39,0.08)] pb-5">
                <div>
                  <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[#698091]">
                    DIAGNOSTIC
                  </p>
                  <h3 className="mt-3 text-[1.7rem] font-medium tracking-[-0.04em] text-[#071827] sm:text-[1.95rem]">
                    Conversion Leak Timeline
                  </h3>
                </div>
                <span className="rounded-full border border-[rgba(37,68,90,0.1)] bg-[rgba(234,243,248,0.88)] px-3 py-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[#32516a]">
                  6 common leaks
                </span>
              </div>

              <div className="mt-6 flex flex-col gap-4">
                {leakChainSteps.map((step, index) => (
                  <Fragment key={step.number}>
                    <motion.article
                      data-reveal-card
                      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.4,
                        delay: reduceMotion ? 0 : index * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={`flex min-h-[84px] items-center gap-4 rounded-[1.45rem] border px-4 py-4 shadow-[0_12px_30px_rgba(19,31,45,0.04)] ${
                        step.tone === "accent"
                          ? "border-[#071827] bg-[#071827] text-[#f8f4ec]"
                          : "border-[rgba(7,24,39,0.08)] bg-[rgba(247,242,233,0.9)] text-[#071827]"
                      }`}
                    >
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-[0.68rem] font-semibold uppercase tracking-[0.16em] ${
                          step.tone === "accent"
                            ? "border-white/16 bg-white/10 text-[#f8f4ec]"
                            : "border-[rgba(37,68,90,0.12)] bg-[rgba(221,236,245,0.82)] text-[#25445a]"
                        }`}
                      >
                        {step.number}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4
                          className={`text-[1.02rem] font-medium leading-6 tracking-[-0.03em] ${
                            step.tone === "accent" ? "text-[#f8f4ec]" : "text-[#071827]"
                          }`}
                        >
                          {step.title}
                        </h4>
                        <p
                          className={`mt-1.5 text-[0.92rem] leading-6 ${
                            step.tone === "accent" ? "text-white/72" : "text-[#526777]"
                          }`}
                        >
                          {step.effect}
                        </p>
                      </div>
                    </motion.article>

                    {index < leakChainSteps.length - 1 ? (
                      <motion.div
                        data-reveal-line
                        initial={reduceMotion ? false : { opacity: 0, scaleY: 0.55 }}
                        whileInView={reduceMotion ? undefined : { opacity: 1, scaleY: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{
                          duration: 0.34,
                          delay: reduceMotion ? 0 : index * 0.05 + 0.06,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="ml-[1.35rem] h-5 w-px origin-top bg-[linear-gradient(180deg,rgba(145,176,204,0.2),rgba(97,127,154,0.48),rgba(145,176,204,0.16))]"
                      />
                    ) : null}
                  </Fragment>
                ))}
              </div>

              <div className="mt-6 rounded-[1.6rem] border border-[rgba(7,24,39,0.08)] bg-[rgba(234,243,248,0.58)] px-5 py-5">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#5f7789]">
                  Outcome
                </p>
                <p className="mt-3 text-[0.98rem] leading-8 text-[#173044]">
                  Lost enquiries are usually the result of several small leaks working together.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        ref={sectionRef}
        data-funnel-section
        className="relative hidden h-[600vh] bg-[#f6f1e8] lg:block"
      >
        <div className="sticky top-0 h-screen overflow-hidden bg-[#f6f1e8]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(221,236,245,0.28),transparent_22%),radial-gradient(circle_at_82%_76%,rgba(244,235,223,0.5),transparent_28%)]" />
          <div className={`relative ${sectionTwoContainer} h-full`}>
            <div className="grid h-full items-center gap-10 xl:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] xl:gap-12">
              <div className="max-w-[36rem]">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#5a7082]">
                  WHY THIS WORKS
                </p>
                <h2 className="mt-5 max-w-[12ch] text-[3rem] font-medium leading-[0.94] tracking-[-0.055em] text-[#071827] xl:text-[4.1rem]">
                  Why most websites underperform
                </h2>
                <p className="mt-6 max-w-[34rem] text-[1.03rem] leading-8 text-[#42596b] xl:text-[1.08rem]">
                  A website does not fail because of one big problem. It usually underperforms because of several small conversion leaks working together.
                </p>

                <div className="mt-8 rounded-[1.8rem] border border-[rgba(7,24,39,0.08)] bg-[rgba(234,243,248,0.5)] px-6 py-5 shadow-[0_16px_40px_rgba(19,31,45,0.04)]">
                  <p className="text-[1rem] leading-8 text-[#25445a] xl:text-[1.04rem]">
                    We identify those leaks, prioritise the biggest ones, and help fix them in a way that improves business results.
                  </p>
                </div>
              </div>

              <motion.div
                layout
                className="w-full max-w-[680px] justify-self-end overflow-hidden rounded-[2.2rem] border border-[rgba(7,24,39,0.08)] bg-[linear-gradient(180deg,#fffdf8_0%,#fbf7ef_100%)] p-7 shadow-[0_24px_80px_rgba(19,31,45,0.08)] xl:p-8"
              >
                <div className="rounded-[1.75rem] border border-[rgba(7,24,39,0.08)] bg-white/62 px-6 py-6">
                  <div className="flex items-center justify-between gap-4 border-b border-[rgba(7,24,39,0.08)] pb-5">
                    <div>
                      <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[#698091]">
                        DIAGNOSTIC
                      </p>
                      <h3 className="mt-3 text-[1.95rem] font-medium tracking-[-0.04em] text-[#071827]">
                        Conversion Leak Timeline
                      </h3>
                    </div>
                    <span className="rounded-full border border-[rgba(37,68,90,0.1)] bg-[rgba(234,243,248,0.88)] px-3 py-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[#32516a]">
                      6 common leaks
                    </span>
                  </div>

                  <div className="mt-6 grid gap-6 lg:grid-cols-[72px_minmax(0,1fr)]">
                    <div className="relative flex justify-center">
                      <div className="absolute top-2 bottom-2 w-px rounded-full bg-[rgba(189,210,226,0.42)]" />
                      <motion.div
                        style={{ height: progressHeight }}
                        className="absolute top-2 w-px origin-top rounded-full bg-[linear-gradient(180deg,#8fb7d6_0%,#25445a_100%)]"
                      />
                      <div className="relative z-10 flex w-full flex-col items-center justify-between gap-6 py-2">
                        {leakChainSteps.map((step, index) => {
                          const isActive = index === activeStep;
                          const isCompleted = index < activeStep;

                          return (
                            <div
                              key={step.number}
                              className={`flex h-12 w-12 items-center justify-center rounded-full border text-[0.68rem] font-semibold uppercase tracking-[0.16em] transition duration-300 ${
                                isActive
                                  ? "border-[#071827] bg-[#071827] text-[#f8f4ec] shadow-[0_18px_34px_rgba(7,24,39,0.18)]"
                                  : isCompleted
                                    ? "border-[rgba(37,68,90,0.12)] bg-[rgba(221,236,245,0.92)] text-[#25445a]"
                                    : "border-[rgba(127,146,160,0.12)] bg-[rgba(240,234,226,0.96)] text-[#7a8b97]"
                              }`}
                            >
                              {step.number}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex min-h-[580px] flex-col">
                      <motion.div
                        key={activeLeak.number}
                        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                        transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                        className={`rounded-[1.7rem] border px-6 py-6 shadow-[0_16px_38px_rgba(19,31,45,0.06)] ${
                          activeLeak.tone === "accent"
                            ? "border-[#071827] bg-[#071827] text-[#f8f4ec]"
                            : "border-[rgba(7,24,39,0.08)] bg-[rgba(247,242,233,0.9)] text-[#071827]"
                        }`}
                      >
                        <p
                          className={`text-[0.66rem] font-semibold uppercase tracking-[0.22em] ${
                            activeLeak.tone === "accent" ? "text-white/58" : "text-[#6a8090]"
                          }`}
                        >
                          {activeLeak.number}
                        </p>
                        <h4
                          className={`mt-4 text-[1.75rem] font-medium leading-[1] tracking-[-0.04em] ${
                            activeLeak.tone === "accent" ? "text-[#f8f4ec]" : "text-[#071827]"
                          }`}
                        >
                          {activeLeak.title}
                        </h4>
                        <p
                          className={`mt-4 text-[1rem] font-medium leading-7 ${
                            activeLeak.tone === "accent" ? "text-white/80" : "text-[#25445a]"
                          }`}
                        >
                          {activeLeak.effect}
                        </p>
                        <p
                          className={`mt-5 max-w-[30rem] text-[0.98rem] leading-8 ${
                            activeLeak.tone === "accent" ? "text-white/72" : "text-[#526777]"
                          }`}
                        >
                          {activeLeak.detail}
                        </p>
                      </motion.div>

                      <div className="mt-5 min-h-[72px]">
                        {completedLeaks.length ? (
                          <>
                            <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-[#6a8090]">
                              Completed leaks
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2.5">
                              {completedLeaks.map((step) => (
                                <span
                                  key={step.number}
                                  className="rounded-full border border-[rgba(37,68,90,0.1)] bg-[rgba(234,243,248,0.88)] px-3.5 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#25445a]"
                                >
                                  ✓ {step.shortLabel}
                                </span>
                              ))}
                            </div>
                          </>
                        ) : (
                          <div className="rounded-[1.2rem] border border-dashed border-[rgba(37,68,90,0.12)] bg-[rgba(255,255,255,0.56)] px-4 py-4 text-[0.9rem] leading-6 text-[#6a8090]">
                            Completed leaks will build here as the timeline progresses.
                          </div>
                        )}
                      </div>

                      <motion.div
                        animate={
                          reduceMotion
                            ? undefined
                            : showOutcome
                              ? { opacity: 1, y: 0 }
                              : { opacity: 0.35, y: 6 }
                        }
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-auto rounded-[1.6rem] border border-[rgba(7,24,39,0.08)] bg-[rgba(234,243,248,0.58)] px-5 py-5"
                      >
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#5f7789]">
                          Outcome
                        </p>
                        <p className="mt-3 text-[0.98rem] leading-8 text-[#173044]">
                          Lost enquiries are usually the result of several small leaks working together.
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function HomePage() {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const [openFaq, setOpenFaq] = useState<number>(0);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [activeAuditIssue, setActiveAuditIssue] = useState(0);
  const [activeServiceTitle, setActiveServiceTitle] = useState("Website Redesign");

  useLayoutEffect(() => {
    const page = pageRef.current;
    const heroSection = heroSectionRef.current;

    if (!page || !heroSection) {
      return;
    }

    const ctx = gsap.context(() => {
      const handleWindowScroll = () => {
        setHeaderScrolled(window.scrollY > 28);
      };

      handleWindowScroll();
      window.addEventListener("scroll", handleWindowScroll, { passive: true });

      gsap.set("[data-hero-copy]", { y: 0, opacity: 1 });
      gsap.set("[data-hero-ribbon]", { y: 0, opacity: 1 });
      gsap.set("[data-hero-accent]", { y: 0, rotate: 0, opacity: 1 });
      gsap.set("[data-hero-orb]", { y: 0, x: 0, opacity: 0.8 });

      gsap.set("[data-reveal-intro]", { y: 24, opacity: 0 });
      gsap.set("[data-reveal-card]", { y: 26, opacity: 0 });
      gsap.set("[data-reveal-chip]", { y: 18, opacity: 0 });
      gsap.set("[data-reveal-line]", { scaleX: 0.52, opacity: 0.22, transformOrigin: "left center" });
      gsap.set("[data-reveal-form]", { y: 24, opacity: 0 });

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
              start: "top 82%",
              end: "top 58%",
              invalidateOnRefresh: true,
            },
          }).to(intro, {
            y: 0,
            opacity: 1,
            stagger: 0.07,
            duration: 0.72,
            immediateRender: false,
          });
        }

        if (cards.length) {
          gsap.timeline({
            defaults: { ease: "power2.out" },
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "top 52%",
              invalidateOnRefresh: true,
            },
          }).to(cards, {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.76,
            immediateRender: false,
          });
        }

        if (chips.length) {
          gsap.timeline({
            defaults: { ease: "power2.out" },
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              end: "top 48%",
              invalidateOnRefresh: true,
            },
          }).to(chips, {
            y: 0,
            opacity: 1,
            stagger: 0.06,
            duration: 0.66,
            immediateRender: false,
          });
        }

        if (lines.length) {
          gsap.timeline({
            defaults: { ease: "power2.out" },
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              end: "top 46%",
              invalidateOnRefresh: true,
            },
          }).to(lines, {
            scaleX: 1,
            opacity: 0.92,
            stagger: 0.08,
            duration: 0.62,
            immediateRender: false,
          });
        }
      });

      return () => {
        window.removeEventListener("scroll", handleWindowScroll);
      };
    }, page);

    return () => {
      ctx.revert();
    };
  }, []);

  const currentAuditIssue = websiteLeakIssues[activeAuditIssue];
  const allServices = serviceSelectorGroups.flatMap((group) =>
    group.services.map((service) => ({
      ...service,
      group: group.group,
    })),
  );
  const activeService =
    allServices.find((service) => service.title === activeServiceTitle) ?? allServices[0];
  const currentYear = new Date().getFullYear();

  return (
    <div className="ocia-page-atmosphere">
      <div className="ocia-atmosphere-bg" />

      <main ref={pageRef} className="relative z-10 isolate bg-transparent text-white">
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

            <a
              href={AUDIT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-[rgba(7,24,39,0.9)] bg-[#071827] px-4 text-[0.84rem] font-semibold tracking-[-0.01em] text-white shadow-[0_16px_36px_rgba(7,24,39,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#0d2232] hover:shadow-[0_20px_42px_rgba(7,24,39,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#89bee7] focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:px-5 sm:text-sm"
            >
              Get My Free Audit
            </a>
          </div>
        </header>

        <section
          id="work"
          ref={heroSectionRef}
          className="relative overflow-x-hidden overflow-y-visible bg-[#f6f1e8] text-[#0f1f2d]"
        >
          <div
            data-hero-orb
            className="pointer-events-none absolute left-[8%] top-[18%] z-0 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(168,202,230,0.34)_0%,rgba(168,202,230,0.12)_44%,rgba(168,202,230,0)_72%)] blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[3%] top-[22%] z-[1] h-[24rem] w-[34rem] rounded-[42%_58%_61%_39%_/_48%_42%_58%_52%] opacity-[0.38] blur-[62px] sm:left-[5%] sm:w-[36rem] md:h-[25rem] md:w-[40rem] lg:h-[26rem] lg:w-[44rem]"
            style={{
              background:
                "radial-gradient(circle at 34% 34%, rgba(250, 244, 234, 0.94) 0%, rgba(245, 236, 222, 0.78) 34%, rgba(236, 224, 206, 0.36) 58%, rgba(236, 224, 206, 0) 78%)",
              transform: "rotate(-8deg)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[5%] top-[25%] z-[1] h-[26rem] w-[34rem] rounded-[56%_44%_46%_54%_/_42%_58%_44%_56%] opacity-[0.4] blur-[68px] sm:right-[7%] sm:w-[36rem] md:h-[27rem] md:w-[40rem] lg:h-[28rem] lg:w-[44rem]"
            style={{
              background:
                "radial-gradient(circle at 40% 42%, rgba(202, 217, 229, 0.88) 0%, rgba(190, 206, 220, 0.64) 34%, rgba(170, 190, 208, 0.28) 58%, rgba(170, 190, 208, 0) 78%)",
              transform: "rotate(7deg)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 bottom-[10.75rem] z-[4] h-[16rem] w-[72rem] max-w-[94vw] -translate-x-1/2 rounded-[46%_54%_52%_48%_/_58%_42%_60%_40%] opacity-[0.34] blur-[86px] sm:bottom-[11rem] md:h-[17rem] lg:bottom-[11.5rem] lg:h-[18rem]"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(244, 238, 228, 0.92) 0%, rgba(236, 228, 217, 0.64) 36%, rgba(211, 221, 230, 0.24) 62%, rgba(244, 238, 228, 0) 82%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[5%] z-[1] h-[11rem] w-[23rem] -translate-x-1/2 rounded-[999px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.34)_0%,rgba(255,255,255,0.12)_42%,rgba(255,255,255,0)_80%)] opacity-75 blur-[90px] md:h-[13rem] md:w-[28rem]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-0 h-44 bg-[linear-gradient(180deg,rgba(255,255,255,0.6),rgba(255,255,255,0.18)_42%,rgba(255,255,255,0)_100%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[2] opacity-[0.045]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 18% 22%, rgba(92, 104, 118, 0.34) 0.4px, transparent 0.8px), radial-gradient(circle at 78% 28%, rgba(88, 98, 112, 0.28) 0.35px, transparent 0.78px), radial-gradient(circle at 48% 74%, rgba(110, 120, 132, 0.22) 0.3px, transparent 0.72px)",
              backgroundSize: "18px 18px, 20px 20px, 24px 24px",
              backgroundPosition: "0 0, 7px 11px, 12px 5px",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[3] opacity-[0.032]"
            style={{
              backgroundImage:
                "repeating-radial-gradient(circle at 0 0, rgba(80, 88, 98, 0.18) 0, rgba(80, 88, 98, 0.18) 0.55px, transparent 0.9px, transparent 4px)",
              backgroundSize: "10px 10px",
              mixBlendMode: "multiply",
            }}
          />

          <div className={`${sectionTwoContainer} relative z-10 flex min-h-svh flex-col pb-24 pt-28 sm:pb-24 sm:pt-32 lg:pb-32 lg:pt-36`}>
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
                  <a
                    href={AUDIT_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
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
                  </a>

                  <Link
                    href={SECTION_LINKS.services}
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
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-40 opacity-0 bg-[linear-gradient(180deg,rgba(246,241,232,0)_0%,rgba(246,241,232,0.46)_34%,rgba(246,241,232,0.82)_68%,#f6f1e8_100%)]"
          />
        </section>

        <SceneSection data-problem-section tone="dawn" className="-mt-8 scroll-mt-32 bg-[#f6f1e8] pt-24">
          <div className="pointer-events-none absolute inset-0 z-[4] bg-[linear-gradient(180deg,rgba(246,241,232,0.98),rgba(246,241,232,0.98))]" />
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0.52, y: 0 }}
            whileInView={{ opacity: 0.75, y: -16 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute inset-0 z-[4] bg-[radial-gradient(circle_at_12%_20%,rgba(255,252,247,0.96),transparent_24%),radial-gradient(circle_at_84%_22%,rgba(196,212,225,0.24),transparent_22%),radial-gradient(circle_at_52%_78%,rgba(241,234,224,0.82),transparent_28%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[4] opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 18% 24%, rgba(7,24,39,0.14) 0.45px, transparent 0.7px), radial-gradient(circle at 74% 32%, rgba(7,24,39,0.1) 0.4px, transparent 0.66px), radial-gradient(circle at 42% 72%, rgba(7,24,39,0.08) 0.36px, transparent 0.64px)",
              backgroundSize: "18px 18px, 22px 22px, 24px 24px",
              backgroundPosition: "0 0, 6px 8px, 12px 5px",
            }}
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-40 bg-[linear-gradient(180deg,rgba(246,241,232,0.98),rgba(246,241,232,0.76)_44%,rgba(246,241,232,0)_100%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-[-3.5rem] z-[5] h-28 bg-[radial-gradient(ellipse_at_center,rgba(246,241,232,0.98)_0%,rgba(246,241,232,0)_72%)] blur-2xl" />

          <div className="relative z-[6] mx-auto max-w-[1460px] px-6 py-[7.5rem] sm:px-10 md:px-12 lg:px-14 xl:px-16">
            <div className="grid items-start gap-12 xl:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)] xl:gap-[4.5rem] 2xl:gap-[5.25rem]">
              <div data-reveal-intro className="max-w-[36rem] pt-6">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[#5a7082] sm:text-[0.72rem]">
                  THE LEAKS YOU DON&apos;T SEE
                </p>
                <h2 className="mt-5 max-w-[12ch] text-[2.7rem] font-medium leading-[0.94] tracking-[-0.055em] text-[#071827] sm:text-[3.6rem] md:text-[4.2rem]">
                  Your website may be costing you leads every single week.
                </h2>
                <p className="mt-6 max-w-[36rem] text-[1rem] leading-8 text-[#42596b] md:text-[1.08rem]">
                  Most service businesses do not realise how many opportunities they are
                  quietly losing online.
                </p>
                <p className="mt-9 max-w-[36rem] text-[1rem] leading-8 text-[#233c50] md:text-[1.04rem]">
                  The result is simple: people show interest, but fewer of them actually
                  become enquiries, bookings, or customers.
                </p>
                <p className="mt-9 text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-[#6d8090]">
                  Explore the most common places where service websites lose leads.
                </p>
              </div>

              <motion.div
                data-reveal-card
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-[2.75rem] border border-[rgba(7,24,39,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(249,244,237,0.98))] p-4 shadow-[0_28px_80px_rgba(32,46,61,0.09)] backdrop-blur-xl sm:p-5"
              >
                <div className="rounded-[2.15rem] border border-[rgba(7,24,39,0.07)] bg-[linear-gradient(180deg,#fdfbf7,#f4eee5)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                  <div className="flex flex-col gap-3 border-b border-[rgba(7,24,39,0.08)] px-1 pb-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <span className="rounded-full border border-[rgba(7,24,39,0.08)] bg-white/90 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#5a7082]">
                        Website lead leak audit
                      </span>
                      <p className="mt-3 text-sm leading-7 text-[#536878]">
                        Click a leak to see how it quietly affects what visitors do next.
                      </p>
                    </div>
                    <span className="text-[0.62rem] font-medium uppercase tracking-[0.2em] text-[#6b8294]">
                      BrightSpace Interiors
                    </span>
                  </div>

                  <div className="mt-5">
                    <AuditWebsiteMockup issue={currentAuditIssue} />
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="mt-14 grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(18rem,0.72fr)] xl:items-start">
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 xl:gap-6">
                {websiteLeakIssues.map((issue, index) => {
                  const isActive = activeAuditIssue === index;

                  return (
                    <button
                      key={issue.id}
                      type="button"
                      data-reveal-card
                      onClick={() => setActiveAuditIssue(index)}
                      className={`cursor-pointer rounded-[1.35rem] border p-4 text-left transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#89bee7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f3eb] ${
                        isActive
                          ? "border-[#102130] bg-[#102130] text-white shadow-[0_18px_40px_rgba(16,33,48,0.14)]"
                          : "border-[rgba(7,24,39,0.08)] bg-[rgba(255,252,247,0.78)] text-[#102130] shadow-[0_16px_40px_rgba(20,34,49,0.05)] hover:-translate-y-0.5 hover:border-[rgba(7,24,39,0.16)] hover:bg-white"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className={`text-[0.6rem] font-semibold uppercase tracking-[0.2em] ${isActive ? "text-white/56" : "text-[#6d8191]"}`}>
                            {issue.number}
                          </div>
                          <div className={`mt-2 text-[0.74rem] font-semibold uppercase tracking-[0.16em] ${isActive ? "text-white/72" : "text-[#5f7485]"}`}>
                            {issue.tabLabel}
                          </div>
                        </div>
                        <span className={`shrink-0 text-base ${isActive ? "text-white/76" : "text-[#5c7385]"}`}>↗</span>
                      </div>
                      <p className={`mt-3 text-[0.92rem] leading-6 ${isActive ? "text-white/76" : "text-[#526777]"}`}>
                        {issue.shortBody}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {issue.affects.slice(0, 2).map((chip) => (
                          <span
                            key={chip}
                            className={`rounded-full border px-2.5 py-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.14em] ${
                              isActive
                                ? "border-white/12 bg-white/8 text-white/76"
                                : "border-[rgba(7,24,39,0.08)] bg-[rgba(181,216,241,0.18)] text-[#325069]"
                            }`}
                          >
                            {chip}
                          </span>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>

              <motion.div
                key={currentAuditIssue.id}
                data-reveal-card
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[1.65rem] border border-[rgba(7,24,39,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(248,243,236,0.98))] p-5 shadow-[0_20px_60px_rgba(20,34,49,0.07)]"
              >
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-[#6d8191]">
                  Active Issue
                </p>
                <p className="mt-3 text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[#5b7284]">
                  {currentAuditIssue.number} • {currentAuditIssue.tabLabel}
                </p>
                <h3 className="mt-4 text-[1.3rem] font-medium leading-[1.05] tracking-[-0.04em] text-[#071827]">
                  {currentAuditIssue.cardTitle}
                </h3>
                <p className="mt-4 text-[0.94rem] leading-7 text-[#536979]">
                  {currentAuditIssue.shortBody}
                </p>
                <div className="mt-6 rounded-[1.05rem] border border-[rgba(7,24,39,0.08)] bg-white/80 px-4 py-4">
                  <p className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[#6d8191]">
                    Annotation
                  </p>
                  <p className="mt-2 text-[0.92rem] leading-7 text-[#4e6475]">
                    {currentAuditIssue.annotationBody}
                  </p>
                </div>
                <div className="mt-6">
                  <p className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[#6d8191]">
                    What this affects
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {currentAuditIssue.affects.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full border border-[rgba(7,24,39,0.08)] bg-[rgba(181,216,241,0.2)] px-3 py-2 text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-[#33506a]"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </SceneSection>

        <section
          id="solutions"
          data-value-section
          className="relative overflow-visible bg-[#f6f1e8]"
        >
          <div className="pointer-events-none absolute inset-0 bg-[#f6f1e8]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(216,230,240,0.18),transparent_24%),radial-gradient(circle_at_84%_82%,rgba(244,235,223,0.62),transparent_32%)]" />
          <div className="relative">
            <ValueScrollWall />
          </div>
        </section>

        <section
          id="pricing"
          data-audit-section
          className="relative overflow-hidden border-y border-[rgba(7,24,39,0.07)] bg-[#f6f1e8]"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_22%,rgba(214,228,238,0.42),transparent_24%),radial-gradient(circle_at_82%_74%,rgba(241,232,220,0.72),transparent_28%)]" />
          <div className="relative mx-auto max-w-[1480px] px-5 py-24 sm:px-8 sm:py-28 md:px-10 lg:px-14 xl:px-20">
            <div className="grid items-center gap-10 xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] xl:gap-12">
              <motion.div
                id="audit"
                data-reveal-intro
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-[38rem]"
              >
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-[#6d8191]">
                  FREE WEBSITE AUDIT
                </p>
                <h2
                  className="mt-6 max-w-[12ch] text-[2.7rem] font-medium leading-[0.94] tracking-[-0.055em] text-[#071827] sm:text-[3.5rem] lg:text-[4.1rem]"
                >
                  Start with a free website opportunity audit
                </h2>
                <p className="mt-6 max-w-[30rem] text-[1.1rem] leading-8 text-[#1c3447]">
                  If you are not sure what is underperforming, we will show you.
                </p>
                <p className="mt-5 max-w-[33rem] text-[1rem] leading-8 text-[#536979]">
                  We review your website and identify the biggest gaps affecting leads,
                  trust, visibility, and conversion.
                </p>

                <div className="mt-8 rounded-[1.9rem] border border-[rgba(7,24,39,0.08)] bg-[rgba(234,242,247,0.58)] px-6 py-5 shadow-[0_16px_48px_rgba(16,33,48,0.06)]">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#5f7789]">
                    Outcome
                  </p>
                  <p className="mt-3 text-[1rem] leading-8 text-[#25445a]">
                    You will walk away with a clearer picture of what is holding your
                    website back and what to fix first.
                  </p>
                </div>

                <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <motion.a
                    href={AUDIT_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={
                      reduceMotion
                        ? undefined
                        : { y: -3, boxShadow: "0 24px 48px rgba(7,24,39,0.22)" }
                    }
                    transition={{ duration: 0.24, ease: "easeOut" }}
                    className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#071827] px-7 text-sm font-semibold tracking-[0.01em] text-[#f8f4ec] shadow-[0_18px_44px_rgba(7,24,39,0.16)] transition duration-300 hover:brightness-105"
                  >
                    Claim My Free Audit
                  </motion.a>
                </div>

                <p className="mt-4 text-sm leading-7 text-[#6a7f8e]">
                  No pressure. Just a clear review of what can be improved.
                </p>
              </motion.div>

              <motion.div
                data-reveal-card
                initial={reduceMotion ? false : { opacity: 0, y: 34 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -4,
                        boxShadow: "0 34px 96px rgba(16,33,48,0.12)",
                      }
                }
                viewport={{ once: true, amount: 0.28 }}
                transition={{ duration: 0.78, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-[2rem] border border-[rgba(7,24,39,0.08)] bg-[linear-gradient(180deg,#fffdf8_0%,#fbf7ef_100%)] p-5 shadow-[0_28px_90px_rgba(16,33,48,0.08)] sm:p-7"
              >
                <div className="pointer-events-none absolute inset-x-8 top-7 h-20 overflow-hidden rounded-[1.35rem] opacity-80">
                  <motion.div
                    aria-hidden="true"
                    initial={reduceMotion ? false : { x: "-45%", opacity: 0.2 }}
                    whileInView={reduceMotion ? undefined : { x: "140%", opacity: [0.14, 0.32, 0.14] }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{
                      duration: 4.8,
                      delay: 0.3,
                      ease: "easeInOut",
                      repeat: reduceMotion ? 0 : Number.POSITIVE_INFINITY,
                      repeatDelay: 1.8,
                    }}
                    className="h-full w-[34%] skew-x-[-18deg] bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(220,235,244,0.6),rgba(255,255,255,0))] blur-[10px]"
                  />
                </div>

                <div className="relative rounded-[1.7rem] border border-[rgba(7,24,39,0.08)] bg-white/72 p-6 sm:p-8">
                  <div className="flex flex-col gap-4 border-b border-[rgba(7,24,39,0.08)] pb-6 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="rounded-full border border-[rgba(37,68,90,0.12)] bg-[rgba(234,243,248,0.88)] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#32516a]">
                          FREE REVIEW
                        </span>
                        <span className="rounded-full border border-[rgba(7,24,39,0.08)] bg-[rgba(246,241,232,0.92)] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#5a6f7f]">
                          QUICK WINS FIRST
                        </span>
                      </div>
                      <h3 className="mt-5 text-[2rem] font-medium tracking-[-0.05em] text-[#071827] sm:text-[2.35rem]">
                        Website Opportunity Audit
                      </h3>
                    </div>

                    <div className="grid max-w-[12rem] gap-2 text-left sm:text-right">
                      <div className="rounded-[1.15rem] border border-[rgba(7,24,39,0.07)] bg-[rgba(221,236,245,0.62)] px-4 py-3">
                        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#5d7688]">
                          Audit Steps
                        </p>
                        <p className="mt-2 text-sm font-medium text-[#071827]">
                          01 Review
                        </p>
                        <p className="text-sm font-medium text-[#071827]">02 Prioritise</p>
                        <p className="text-sm font-medium text-[#071827]">03 Recommend</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2.5">
                    {["Trust", "Leads", "SEO", "Conversion"].map((chip) => (
                      <span
                        key={chip}
                        data-reveal-chip
                        className="rounded-full border border-[rgba(7,24,39,0.08)] bg-[rgba(231,238,244,0.86)] px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#25445a]"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>

                  <div className="mt-7 rounded-[1.5rem] border border-[rgba(7,24,39,0.08)] bg-[rgba(255,255,255,0.76)]">
                    {auditChecklist.map((item, index) => (
                      <motion.div
                        key={item}
                        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.65 }}
                        transition={{
                          duration: 0.46,
                          delay: reduceMotion ? 0 : 0.08 + index * 0.06,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <div
                          data-reveal-line
                          className="flex items-center gap-4 px-5 py-4 sm:px-6"
                        >
                          <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-[rgba(37,68,90,0.12)] bg-[rgba(234,243,248,0.94)] text-[#25445a]">
                            <svg
                              viewBox="0 0 20 20"
                              fill="none"
                              className="h-4 w-4"
                              aria-hidden="true"
                            >
                              <path
                                d="M4.5 10.2 8.1 13.8 15.5 6.4"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="text-[0.96rem] leading-7 text-[#173044]">{item}</p>
                          </div>
                        </div>
                        {index < auditChecklist.length - 1 ? (
                          <div className="mx-5 h-px bg-[rgba(7,24,39,0.08)] sm:mx-6" />
                        ) : null}
                      </motion.div>
                    ))}

                    <div className="mx-5 mt-1 border-t border-[rgba(7,24,39,0.08)] px-0 py-4 sm:mx-6">
                      <p className="text-[0.78rem] font-medium uppercase tracking-[0.18em] text-[#647988]">
                        Clear gaps. Practical next steps. No guesswork.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section
          id="services"
          data-services-section
          data-work-section
          className="relative overflow-hidden bg-[#f6f1e8]"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(221,236,245,0.3),transparent_22%),radial-gradient(circle_at_84%_76%,rgba(244,235,223,0.54),transparent_28%)]" />
          <div className={`relative ${sectionTwoContainer} py-24 sm:py-28`}>
            <div data-reveal-intro className="max-w-[46rem]">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#5a7082]">
                SERVICES
              </p>
              <h2 className="mt-5 max-w-[13ch] text-[2.7rem] font-medium leading-[0.94] tracking-[-0.055em] text-[#071827] sm:text-[3.55rem] md:text-[4.15rem]">
                Services designed to help you get more enquiries, bookings, and qualified leads
              </h2>
              <p className="mt-6 max-w-[39rem] text-[1rem] leading-8 text-[#42596b] md:text-[1.08rem]">
                We recommend the right service based on the actual gaps in your funnel, not based on what sounds trendy.
              </p>
              <p className="mt-7 text-[0.92rem] leading-7 text-[#607585]">
                Choose a service area to see how it improves your enquiry flow.
              </p>
            </div>

            <motion.div
              data-reveal-card
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
              className="mt-14 overflow-hidden rounded-[2.4rem] border border-[#e6ddd0] bg-[linear-gradient(180deg,#fffdf8_0%,#fbf7ef_100%)] p-6 shadow-[0_28px_90px_rgba(19,31,45,0.08)] sm:p-8 xl:p-10"
            >
              <div className="grid gap-6 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:items-start">
                <motion.div
                  data-reveal-card
                  layout
                  className="order-2 xl:order-1"
                >
                  <div className="relative overflow-hidden rounded-[2.15rem] border border-[rgba(7,24,39,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(250,246,239,0.96))] p-6 shadow-[0_22px_60px_rgba(19,31,45,0.07)] sm:p-7">
                    <div className="pointer-events-none absolute right-5 top-4 text-[6.2rem] font-medium leading-none tracking-[-0.12em] text-[#071827]/[0.05] sm:text-[7.4rem]">
                      {activeService.number}
                    </div>
                    <div className="pointer-events-none absolute -right-10 top-12 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(221,236,245,0.9)_0%,rgba(221,236,245,0.3)_48%,rgba(221,236,245,0)_76%)] blur-2xl" />

                    <motion.div
                      key={activeService.title}
                      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                      className="relative"
                    >
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full border border-[rgba(37,68,90,0.1)] bg-[rgba(234,243,248,0.9)] px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#32516a]">
                          {activeService.group}
                        </span>
                        <span className="rounded-full border border-[rgba(7,24,39,0.08)] bg-[rgba(246,241,232,0.92)] px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#6b8192]">
                          Recommended after audit
                        </span>
                      </div>

                      <h3 className="mt-6 max-w-[14ch] text-[2.2rem] font-medium leading-[0.95] tracking-[-0.05em] text-[#071827] sm:text-[2.65rem]">
                        {activeService.title}
                      </h3>
                      <p className="mt-5 max-w-[32rem] text-[1rem] leading-8 text-[#4d6475] sm:text-[1.04rem]">
                        {activeService.description}
                      </p>

                      <div className="mt-7">
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#698091]">
                          Best for
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2.5">
                          {activeService.chips.map((chip) => (
                            <span
                              key={chip}
                              className="rounded-full border border-[rgba(37,68,90,0.12)] bg-[rgba(234,243,248,0.84)] px-3.5 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#25445a]"
                            >
                              {chip}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-7 rounded-[1.4rem] border border-[rgba(7,24,39,0.08)] bg-white/82 px-5 py-4">
                        <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-[#698091]">
                          Outcome
                        </p>
                        <p className="mt-3 text-[0.98rem] leading-7 text-[#173044]">
                          {activeService.outcome}
                        </p>
                      </div>

                      <div className="mt-7 flex items-center gap-3 text-[0.86rem] font-semibold text-[#25445a]">
                        <span>Start with an audit</span>
                        <span className="text-[#6f8aa0]">↗</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                <div className="order-1 grid gap-4 xl:order-2">
                  {serviceSelectorGroups.map((group, groupIndex) => (
                    <motion.section
                      key={group.group}
                      data-reveal-card
                      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.48,
                        delay: reduceMotion ? 0 : groupIndex * 0.06,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="rounded-[1.8rem] border border-[rgba(7,24,39,0.08)] bg-white/74 p-4 shadow-[0_16px_40px_rgba(19,31,45,0.04)] sm:p-5"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="text-[1.08rem] font-medium tracking-[-0.03em] text-[#071827]">
                          {group.group}
                        </h3>
                        <span className="rounded-full bg-[rgba(234,243,248,0.88)] px-2.5 py-1 text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-[#5c7688]">
                          {group.services.length} Services
                        </span>
                      </div>

                      <div className="mt-4 grid gap-3">
                        {group.services.map((service, serviceIndex) => {
                          const isActive = activeService.title === service.title;

                          return (
                            <motion.button
                              key={service.title}
                              type="button"
                              data-reveal-chip
                              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                              viewport={{ once: true, amount: 0.2 }}
                              transition={{
                                duration: 0.38,
                                delay: reduceMotion ? 0 : groupIndex * 0.06 + serviceIndex * 0.04,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              onClick={() => setActiveServiceTitle(service.title)}
                              className={`group/service flex w-full items-start gap-4 rounded-[1.35rem] border px-4 py-4 text-left transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#89bee7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fbf7ef] ${
                                isActive
                                  ? "border-[rgba(37,68,90,0.2)] bg-[rgba(221,236,245,0.72)] text-[#071827] shadow-[0_14px_28px_rgba(19,31,45,0.07)]"
                                  : "border-[rgba(7,24,39,0.08)] bg-[rgba(255,255,255,0.9)] text-[#071827] hover:border-[rgba(37,68,90,0.14)] hover:bg-[rgba(234,243,248,0.48)]"
                              }`}
                            >
                              <span
                                className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full transition duration-300 ${
                                  isActive ? "bg-[#071827]" : "bg-[#cbdceb] group-hover/service:bg-[#7d99ad]"
                                }`}
                              />
                              <div className="min-w-0 flex-1">
                                <div className="flex items-start justify-between gap-3">
                                  <div>
                                    <p className="text-[1rem] font-medium leading-6 tracking-[-0.03em]">
                                      {service.title}
                                    </p>
                                    <p className="mt-2 text-[0.9rem] leading-6 text-[#536979]">
                                      {service.preview}
                                    </p>
                                  </div>
                                  <span
                                    className={`pt-0.5 text-base transition duration-300 ${
                                      isActive
                                        ? "translate-x-0.5 text-[#25445a]"
                                        : "text-[#7c95a7] group-hover/service:translate-x-0.5"
                                    }`}
                                  >
                                    ↗
                                  </span>
                                </div>
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.section>
                  ))}
                </div>
              </div>

              <div className="mt-8 rounded-[1.85rem] border border-[rgba(7,24,39,0.08)] bg-[rgba(234,243,248,0.52)] px-6 py-6 shadow-[0_16px_40px_rgba(19,31,45,0.04)] sm:px-7">
                <p className="text-[1rem] leading-8 text-[#25445a]">
                  Not sure where your biggest gap is? Start with the free audit and we will show you what to fix first.
                </p>
                <div className="mt-5">
                  <motion.a
                    href={AUDIT_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={
                      reduceMotion
                        ? undefined
                        : { y: -3, boxShadow: "0 24px 48px rgba(7,24,39,0.2)" }
                    }
                    transition={{ duration: 0.24, ease: "easeOut" }}
                    className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#071827] px-7 text-sm font-semibold tracking-[0.01em] text-[#f8f4ec] shadow-[0_18px_44px_rgba(7,24,39,0.16)]"
                  >
                    Claim My Free Audit
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <ConversionLeakTimeline />

        <section
          id="process"
          data-process-section
          className="relative overflow-hidden bg-[#f6f1e8]"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_16%,rgba(221,236,245,0.28),transparent_22%),radial-gradient(circle_at_84%_76%,rgba(244,235,223,0.48),transparent_28%)]" />
          <div className={`relative ${sectionTwoContainer} py-24 sm:py-28`}>
            <div data-reveal-intro className="max-w-[42rem]">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#5a7082]">
                PROCESS
              </p>
              <h2 className="mt-5 max-w-[10ch] text-[2.7rem] font-medium leading-[0.94] tracking-[-0.055em] text-[#071827] sm:text-[3.55rem] md:text-[4.05rem]">
                How we work
              </h2>
              <p className="mt-6 max-w-[32rem] text-[1rem] leading-8 text-[#42596b] md:text-[1.06rem]">
                A simple process built around fixing the highest-impact gaps first.
              </p>
            </div>

            <motion.div
              data-reveal-card
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
              className="mt-14 overflow-hidden rounded-[2.35rem] border border-[rgba(7,24,39,0.08)] bg-[linear-gradient(180deg,#fffdf8_0%,#fbf7ef_100%)] p-6 shadow-[0_28px_90px_rgba(19,31,45,0.08)] sm:p-8 xl:p-10"
            >
              <div className="hidden lg:block">
                <div className="relative">
                  <div className="pointer-events-none absolute left-[9%] right-[9%] top-10 h-px bg-[linear-gradient(90deg,rgba(145,176,204,0.22),rgba(97,127,154,0.48),rgba(145,176,204,0.22))]" />
                  <motion.div
                    data-reveal-line
                    initial={reduceMotion ? false : { opacity: 0, scaleX: 0.4 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, scaleX: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="pointer-events-none absolute left-[9%] right-[9%] top-10 h-px origin-left bg-[linear-gradient(90deg,rgba(145,176,204,0.36),rgba(37,68,90,0.68),rgba(145,176,204,0.28))]"
                  />

                  <div className="grid gap-5 xl:grid-cols-4">
                    {processSteps.map((step, index) => {
                      const phaseLabels = ["Review", "Prioritise", "Build", "Convert"];
                      const isFinal = index === processSteps.length - 1;

                      return (
                        <motion.article
                          key={step.step}
                          data-reveal-card
                          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{
                            duration: 0.46,
                            delay: reduceMotion ? 0 : index * 0.08,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="group relative pt-16"
                        >
                          <div className="absolute left-1/2 top-0 flex -translate-x-1/2 flex-col items-center">
                            <div
                              className={`flex h-20 w-20 items-center justify-center rounded-full border text-[0.88rem] font-semibold uppercase tracking-[0.16em] shadow-[0_14px_34px_rgba(19,31,45,0.08)] ${
                                isFinal
                                  ? "border-[#071827] bg-[#071827] text-[#f8f4ec]"
                                  : "border-[rgba(37,68,90,0.12)] bg-[rgba(221,236,245,0.92)] text-[#25445a]"
                              }`}
                            >
                              0{index + 1}
                            </div>
                            <span className="mt-3 rounded-full border border-[rgba(37,68,90,0.1)] bg-white/86 px-3 py-1 text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-[#698091]">
                              {phaseLabels[index]}
                            </span>
                          </div>

                          <div
                            className={`rounded-[1.75rem] border p-6 pt-7 shadow-[0_16px_42px_rgba(19,31,45,0.05)] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_22px_46px_rgba(19,31,45,0.09)] ${
                              isFinal
                                ? "border-[rgba(7,24,39,0.12)] bg-[linear-gradient(180deg,rgba(234,243,248,0.84),rgba(255,255,255,0.96))]"
                                : "border-[rgba(7,24,39,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(250,246,239,0.96))]"
                            }`}
                          >
                            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[#698091]">
                              0{index + 1}
                            </p>
                            <h3 className="mt-4 text-[1.45rem] font-medium tracking-[-0.04em] text-[#071827]">
                              {step.step}
                            </h3>
                            <p className="mt-4 text-[0.96rem] leading-7 text-[#526777]">
                              {step.body}
                            </p>
                          </div>
                        </motion.article>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="grid gap-4 lg:hidden">
                {processSteps.map((step, index) => {
                  const phaseLabels = ["Review", "Prioritise", "Build", "Convert"];
                  const isFinal = index === processSteps.length - 1;

                  return (
                    <Fragment key={step.step}>
                      <motion.article
                        data-reveal-card
                        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{
                          duration: 0.42,
                          delay: reduceMotion ? 0 : index * 0.06,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className={`rounded-[1.6rem] border p-5 shadow-[0_14px_34px_rgba(19,31,45,0.05)] ${
                          isFinal
                            ? "border-[rgba(7,24,39,0.12)] bg-[linear-gradient(180deg,rgba(234,243,248,0.84),rgba(255,255,255,0.96))]"
                            : "border-[rgba(7,24,39,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(250,246,239,0.96))]"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border text-[0.68rem] font-semibold uppercase tracking-[0.16em] ${
                              isFinal
                                ? "border-[#071827] bg-[#071827] text-[#f8f4ec]"
                                : "border-[rgba(37,68,90,0.12)] bg-[rgba(221,236,245,0.92)] text-[#25445a]"
                            }`}
                          >
                            0{index + 1}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-3">
                              <h3 className="text-[1.22rem] font-medium tracking-[-0.035em] text-[#071827]">
                                {step.step}
                              </h3>
                              <span className="rounded-full border border-[rgba(37,68,90,0.1)] bg-white/88 px-2.5 py-1 text-[0.54rem] font-semibold uppercase tracking-[0.18em] text-[#698091]">
                                {phaseLabels[index]}
                              </span>
                            </div>
                            <p className="mt-3 text-[0.95rem] leading-7 text-[#526777]">
                              {step.body}
                            </p>
                          </div>
                        </div>
                      </motion.article>

                      {index < processSteps.length - 1 ? (
                        <motion.div
                          data-reveal-line
                          initial={reduceMotion ? false : { opacity: 0, scaleY: 0.55 }}
                          whileInView={reduceMotion ? undefined : { opacity: 1, scaleY: 1 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{
                            duration: 0.34,
                            delay: reduceMotion ? 0 : index * 0.06 + 0.06,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="ml-6 h-8 w-px origin-top bg-[linear-gradient(180deg,rgba(145,176,204,0.22),rgba(97,127,154,0.48),rgba(145,176,204,0.2))]"
                        />
                      ) : null}
                    </Fragment>
                  );
                })}
              </div>

              <motion.div
                data-reveal-card
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 rounded-[1.85rem] border border-[rgba(7,24,39,0.08)] bg-[rgba(234,243,248,0.52)] px-6 py-6 shadow-[0_16px_40px_rgba(19,31,45,0.04)] sm:px-7"
              >
                <p className="text-[1rem] leading-8 text-[#25445a]">
                  Start with the audit. Then fix what matters most.
                </p>
                <div className="mt-5">
                  <motion.a
                    href={AUDIT_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={
                      reduceMotion
                        ? undefined
                        : { y: -3, boxShadow: "0 24px 48px rgba(7,24,39,0.2)" }
                    }
                    transition={{ duration: 0.24, ease: "easeOut" }}
                    className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#071827] px-7 text-sm font-semibold tracking-[0.01em] text-[#f8f4ec] shadow-[0_18px_44px_rgba(7,24,39,0.16)]"
                  >
                    Claim My Free Audit
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section
          id="outcomes"
          data-outcomes-section
          className="relative overflow-hidden bg-[#f6f1e8]"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_16%,rgba(221,236,245,0.26),transparent_22%),radial-gradient(circle_at_82%_76%,rgba(244,235,223,0.5),transparent_28%)]" />
          <div className={`relative ${sectionTwoContainer} py-24 sm:py-28`}>
            <div data-reveal-intro className="max-w-[44rem]">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#5a7082]">
                OUTCOMES
              </p>
              <h2 className="mt-5 max-w-[11ch] text-[2.7rem] font-medium leading-[0.94] tracking-[-0.055em] text-[#071827] sm:text-[3.55rem] md:text-[4.05rem]">
                What you can expect
              </h2>
              <p className="mt-6 max-w-[38rem] text-[1rem] leading-8 text-[#42596b] md:text-[1.06rem]">
                The improvements are designed to help more visitors become enquiries, bookings, and customers.
              </p>
            </div>

            <motion.div
              data-reveal-card
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
              className="mt-14 overflow-hidden rounded-[2.35rem] border border-[rgba(7,24,39,0.08)] bg-[linear-gradient(180deg,#fffdf8_0%,#fbf7ef_100%)] p-6 shadow-[0_28px_90px_rgba(19,31,45,0.08)] sm:p-8 xl:p-10"
            >
              <div className="grid gap-5 md:grid-cols-2">
                {outcomeBoardCards.map((card, index) => (
                  <motion.article
                    key={card.title}
                    data-reveal-card
                    initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.46,
                      delay: reduceMotion ? 0 : index * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`group relative overflow-hidden rounded-[1.9rem] border border-[rgba(7,24,39,0.08)] ${card.cardAccent} p-6 shadow-[0_16px_42px_rgba(19,31,45,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(19,31,45,0.09)] sm:p-7`}
                  >
                    <div className="pointer-events-none absolute right-5 top-4 text-[5.5rem] font-medium leading-none tracking-[-0.12em] text-[#071827]/[0.04]">
                      {card.number}
                    </div>
                    <div className="pointer-events-none absolute -right-12 top-10 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(221,236,245,0.86)_0%,rgba(221,236,245,0.24)_52%,rgba(221,236,245,0)_78%)] blur-2xl" />

                    <div className="relative">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className={`rounded-full border border-[rgba(37,68,90,0.1)] px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.18em] ${card.chipAccent}`}>
                          {card.label}
                        </span>
                        <span className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-[#698091]">
                          {card.number}
                        </span>
                      </div>

                      <h3 className="mt-5 text-[1.45rem] font-medium tracking-[-0.04em] text-[#071827] sm:text-[1.55rem]">
                        {card.title}
                      </h3>

                      <div className="mt-5 grid gap-2.5">
                        {card.items.map((item) => (
                          <div
                            key={item}
                            className="flex min-h-[3.75rem] items-center gap-4 rounded-[1.05rem] border border-[rgba(7,24,39,0.06)] bg-white/84 px-4 py-3"
                          >
                            <span className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.72rem] ${card.markerAccent}`}>
                              ✓
                            </span>
                            <p className="text-[0.95rem] leading-7 text-[#526777]">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-5 flex min-h-[3.5rem] flex-wrap items-center gap-3 rounded-[1rem] border border-[rgba(7,24,39,0.05)] bg-white/64 px-4 py-3">
                        <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#698091]">
                          Before
                        </span>
                        <span className="text-[0.84rem] font-medium text-[#526777]">
                          {card.transformBefore}
                        </span>
                        <span className="text-[#8aa8bf]">→</span>
                        <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#698091]">
                          After
                        </span>
                        <span className="text-[0.84rem] font-medium text-[#173044]">
                          {card.transformAfter}
                        </span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              <motion.div
                data-reveal-card
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.52, delay: reduceMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 overflow-hidden rounded-[1.9rem] border border-[rgba(7,24,39,0.14)] bg-[#071827] px-6 py-6 text-[#f8f4ec] shadow-[0_22px_60px_rgba(7,24,39,0.16)] sm:px-7"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                  <div className="max-w-[40rem]">
                    <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[#d6e7f4]">
                      BUSINESS PERFORMANCE
                    </span>
                    <p className="mt-4 text-[1.08rem] leading-8 text-[#f8f4ec] sm:text-[1.16rem]">
                      The goal is not just to improve your website. The goal is to improve business performance.
                    </p>
                    <p className="mt-3 text-[0.9rem] leading-7 text-white/64">
                      Start with the free audit
                    </p>
                  </div>

                  <div>
                    <motion.a
                      href={AUDIT_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={
                        reduceMotion
                          ? undefined
                          : { y: -3, boxShadow: "0 24px 48px rgba(255,255,255,0.12)" }
                      }
                      transition={{ duration: 0.24, ease: "easeOut" }}
                      className="inline-flex min-h-13 items-center justify-center rounded-full border border-white/14 bg-[rgba(255,255,255,0.08)] px-6 text-sm font-semibold tracking-[0.01em] text-[#f8f4ec] shadow-[0_18px_40px_rgba(0,0,0,0.12)] backdrop-blur-sm"
                    >
                      Claim My Free Audit
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section
          data-industries-section
          className="relative overflow-hidden bg-[#f6f1e8]"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(221,236,245,0.24),transparent_22%),radial-gradient(circle_at_82%_76%,rgba(244,235,223,0.46),transparent_28%)]" />
          <div className={`relative ${sectionTwoContainer} py-24 sm:py-28`}>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:items-start xl:gap-12">
              <div data-reveal-intro className="max-w-[34rem]">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#5a7082]">
                  WHO IT’S FOR
                </p>
                <h2 className="mt-5 max-w-[12ch] text-[2.7rem] font-medium leading-[0.94] tracking-[-0.055em] text-[#071827] sm:text-[3.55rem] md:text-[4.05rem]">
                  Best fit for businesses that rely on trust, local visibility, and enquiries
                </h2>
                <p className="mt-6 max-w-[33rem] text-[1rem] leading-8 text-[#42596b] md:text-[1.06rem]">
                  We work especially well with service businesses where the website plays a key role in credibility, contact, and conversion.
                </p>
                <p className="mt-7 text-[0.96rem] leading-7 text-[#607585]">
                  If people need to trust you before contacting you, your website matters.
                </p>
              </div>

              <motion.div
                data-reveal-card
                initial={reduceMotion ? false : { opacity: 0, y: 26 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden rounded-[2.25rem] border border-[rgba(7,24,39,0.08)] bg-[linear-gradient(180deg,#fffdf8_0%,#fbf7ef_100%)] p-6 shadow-[0_28px_90px_rgba(19,31,45,0.08)] sm:p-8"
              >
                <div className="rounded-[1.8rem] border border-[rgba(7,24,39,0.08)] bg-white/62 px-5 py-5 sm:px-6 sm:py-6">
                  <div className="flex flex-col gap-3 border-b border-[rgba(7,24,39,0.08)] pb-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <h3 className="text-[1.7rem] font-medium tracking-[-0.04em] text-[#071827] sm:text-[1.95rem]">
                        Best-fit industries
                      </h3>
                      <p className="mt-3 max-w-[30rem] text-[0.96rem] leading-7 text-[#526777]">
                        Businesses where credibility, local search, and quick enquiries directly affect revenue.
                      </p>
                    </div>
                    <span className="rounded-full border border-[rgba(37,68,90,0.1)] bg-[rgba(234,243,248,0.88)] px-3 py-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[#32516a]">
                      High-trust, enquiry-led businesses
                    </span>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {industries.map((industry, index) => (
                      <motion.div
                        key={industry}
                        data-reveal-chip
                        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{
                          duration: 0.38,
                          delay: reduceMotion ? 0 : index * 0.04,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className={`group rounded-[1.2rem] border px-4 py-3.5 text-sm text-[#071827] shadow-[0_10px_24px_rgba(19,31,45,0.04)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(19,31,45,0.08)] ${
                          index % 3 === 0
                            ? "border-[rgba(37,68,90,0.1)] bg-[rgba(234,243,248,0.74)]"
                            : index % 3 === 1
                              ? "border-[rgba(7,24,39,0.08)] bg-[rgba(255,255,255,0.92)]"
                              : "border-[rgba(7,24,39,0.08)] bg-[rgba(247,242,233,0.88)]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-[#89abc5] transition duration-300 group-hover:bg-[#25445a]" />
                          <span className="font-medium leading-6 tracking-[-0.01em] text-[#173044]">
                            {industry}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-6 grid gap-3 md:grid-cols-3">
                    {[
                      {
                        title: "Trust-led",
                        text: "People need confidence before enquiring.",
                      },
                      {
                        title: "Local visibility",
                        text: "Search and location matter.",
                      },
                      {
                        title: "Enquiry-driven",
                        text: "More calls, bookings, and leads matter.",
                      },
                    ].map((item, index) => (
                      <motion.article
                        key={item.title}
                        data-reveal-card
                        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{
                          duration: 0.4,
                          delay: reduceMotion ? 0 : 0.18 + index * 0.05,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="rounded-[1.25rem] border border-[rgba(7,24,39,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,244,236,0.96))] px-4 py-4 shadow-[0_10px_24px_rgba(19,31,45,0.04)]"
                      >
                        <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-[#698091]">
                          {item.title}
                        </p>
                        <p className="mt-3 text-[0.92rem] leading-7 text-[#526777]">
                          {item.text}
                        </p>
                      </motion.article>
                    ))}
                  </div>

                  <div className="mt-6 rounded-[1.4rem] border border-[rgba(7,24,39,0.08)] bg-[rgba(234,243,248,0.52)] px-5 py-5">
                    <p className="text-[0.96rem] leading-7 text-[#25445a]">
                      Not sure if this applies to your business? Start with the free audit.
                    </p>
                    <div className="mt-5">
                      <motion.a
                        href={AUDIT_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={
                          reduceMotion
                            ? undefined
                            : { y: -3, boxShadow: "0 24px 48px rgba(7,24,39,0.2)" }
                        }
                        transition={{ duration: 0.24, ease: "easeOut" }}
                        className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#071827] px-7 text-sm font-semibold tracking-[0.01em] text-[#f8f4ec] shadow-[0_18px_44px_rgba(7,24,39,0.16)]"
                      >
                        Claim My Free Audit
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section
          data-why-section
          className="relative overflow-hidden bg-[#f6f1e8]"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(221,236,245,0.24),transparent_22%),radial-gradient(circle_at_82%_76%,rgba(244,235,223,0.46),transparent_28%)]" />
          <div className={`relative ${sectionTwoContainer} py-24 sm:py-28`}>
            <div data-reveal-intro className="max-w-[47.5rem]">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#5a7082]">
                WHY OCIA STUDIOS
              </p>
              <h2 className="mt-5 max-w-[12ch] text-[2.7rem] font-medium leading-[0.94] tracking-[-0.055em] text-[#071827] sm:text-[3.55rem] md:text-[4.05rem]">
                Why businesses choose Ocia Studios
              </h2>
              <p className="mt-6 max-w-[42rem] text-[1rem] leading-8 text-[#42596b] md:text-[1.06rem]">
                We combine strategy, website improvement, lead generation thinking, automation, and follow-up systems into one practical approach.
              </p>
            </div>

            <motion.div
              data-reveal-card
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 overflow-hidden rounded-[2.5rem] border border-[rgba(7,24,39,0.08)] bg-[linear-gradient(180deg,#fffdf8_0%,#fbf7ef_100%)] p-5 shadow-[0_28px_90px_rgba(19,31,45,0.08)] sm:p-7 xl:p-8"
            >
              <div className="rounded-[2.15rem] border border-[rgba(7,24,39,0.08)] bg-white/54 px-4 py-4 sm:px-5 sm:py-5">
                <div className="grid gap-5 xl:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)] xl:gap-6">
                  <div className="rounded-[1.7rem] border border-[rgba(7,24,39,0.07)] bg-[linear-gradient(180deg,rgba(247,242,233,0.94),rgba(245,238,228,0.9))] p-5 shadow-[0_14px_34px_rgba(19,31,45,0.04)] sm:p-6">
                    <span className="rounded-full border border-[rgba(7,24,39,0.06)] bg-white/72 px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[#7b8a95]">
                      COMMON APPROACH
                    </span>
                    <h3 className="mt-4 max-w-[12ch] text-[1.42rem] font-medium leading-[1.02] tracking-[-0.04em] text-[#4d6475] sm:text-[1.62rem]">
                      Most website projects stop at
                    </h3>

                    <div className="mt-5 grid gap-2.5">
                      {whyOciaComparison.commonApproach.map((item, index) => (
                        <motion.article
                          key={item}
                          data-reveal-card
                          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{
                            duration: 0.36,
                            delay: reduceMotion ? 0 : index * 0.05,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="rounded-[1.15rem] border border-[rgba(7,24,39,0.06)] bg-[rgba(255,255,255,0.76)] px-4 py-3.5"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#97a5af]">
                              0{index + 1}
                            </span>
                            <span className="text-[0.98rem] font-medium leading-7 text-[#607585]">
                              {item}
                            </span>
                          </div>
                        </motion.article>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[1.8rem] border border-[rgba(7,24,39,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,244,236,0.96))] p-5 shadow-[0_16px_40px_rgba(19,31,45,0.05)] sm:p-6">
                    <div className="flex flex-col gap-4 border-b border-[rgba(7,24,39,0.08)] pb-5 xl:flex-row xl:items-end xl:justify-between">
                      <div>
                        <span className="rounded-full border border-[rgba(37,68,90,0.1)] bg-[rgba(234,243,248,0.88)] px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[#32516a]">
                          OCIA APPROACH
                        </span>
                        <h3 className="mt-4 text-[1.58rem] font-medium tracking-[-0.04em] text-[#071827] sm:text-[1.82rem]">
                          Ocia Studios looks at
                        </h3>
                      </div>

                      <motion.div
                        data-reveal-line
                        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.44, delay: reduceMotion ? 0 : 0.14, ease: [0.22, 1, 0.36, 1] }}
                        className="inline-flex items-center gap-3 self-start xl:self-auto"
                      >
                        <div className="hidden h-px w-8 bg-[linear-gradient(90deg,rgba(145,176,204,0.1),rgba(97,127,154,0.44))] sm:block" />
                        <span className="rounded-full border border-[rgba(37,68,90,0.1)] bg-[rgba(246,241,232,0.96)] px-3 py-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[#5f7789]">
                          Beyond design-only
                        </span>
                      </motion.div>
                    </div>

                    <div className="mt-5 grid gap-3 md:grid-cols-2">
                      {whyOciaComparison.ociaApproach.map((item, index) => (
                        <motion.article
                          key={item.title}
                          data-reveal-card
                          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{
                            duration: 0.4,
                            delay: reduceMotion ? 0 : 0.16 + index * 0.045,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className={`group rounded-[1.35rem] border p-4 shadow-[0_12px_30px_rgba(19,31,45,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(19,31,45,0.08)] sm:p-5 ${
                            item.tone === "accent"
                              ? "border-[#071827] bg-[#071827] text-[#f8f4ec]"
                              : "border-[rgba(7,24,39,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(241,248,252,0.94))] text-[#071827]"
                          }`}
                        >
                          <p
                            className={`text-[0.64rem] font-semibold uppercase tracking-[0.22em] ${
                              item.tone === "accent" ? "text-white/58" : "text-[#698091]"
                            }`}
                          >
                            {item.number}
                          </p>
                          <h4
                            className={`mt-3 text-[1.04rem] font-medium leading-6 tracking-[-0.03em] ${
                              item.tone === "accent" ? "text-[#f8f4ec]" : "text-[#071827]"
                            }`}
                          >
                            {item.title}
                          </h4>
                          <p
                            className={`mt-2.5 text-[0.92rem] leading-7 ${
                              item.tone === "accent" ? "text-white/72" : "text-[#526777]"
                            }`}
                          >
                            {item.body}
                          </p>
                        </motion.article>
                      ))}
                    </div>
                  </div>
                </div>

                <motion.div
                  data-reveal-card
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-5 overflow-hidden rounded-[1.7rem] border border-[rgba(7,24,39,0.1)] bg-[linear-gradient(180deg,rgba(234,243,248,0.92),rgba(255,255,255,0.96))] px-5 py-5 shadow-[0_16px_42px_rgba(19,31,45,0.06)] sm:px-6"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-[39rem]">
                      <p className="text-[1.04rem] leading-8 text-[#173044] sm:text-[1.12rem]">
                        If you need more than a pretty website, we are the right kind of partner.
                      </p>
                      <p className="mt-2.5 text-[0.9rem] leading-7 text-[#607585]">
                        Want to see what is holding your website back?
                      </p>
                    </div>

                    <div>
                      <motion.a
                        href={AUDIT_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={
                          reduceMotion
                            ? undefined
                            : { y: -3, boxShadow: "0 24px 48px rgba(7,24,39,0.18)" }
                        }
                        transition={{ duration: 0.24, ease: "easeOut" }}
                        className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#071827] px-7 text-sm font-semibold tracking-[0.01em] text-[#f8f4ec] shadow-[0_18px_44px_rgba(7,24,39,0.16)]"
                      >
                        Claim My Free Audit
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <section
          id="faq"
          data-faq-section
          className="relative overflow-hidden bg-[#f6f1e8]"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_16%,rgba(221,236,245,0.24),transparent_22%),radial-gradient(circle_at_82%_76%,rgba(244,235,223,0.46),transparent_28%)]" />
          <div className={`relative ${sectionTwoContainer} py-24 sm:py-28`}>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)] lg:items-start xl:gap-12">
              <div data-reveal-intro className="max-w-[33rem]">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#5a7082]">
                  FAQ
                </p>
                <h2 className="mt-5 max-w-[10ch] text-[2.7rem] font-medium leading-[0.94] tracking-[-0.055em] text-[#071827] sm:text-[3.55rem] md:text-[4.05rem]">
                  Frequently Asked Questions
                </h2>
                <p className="mt-6 max-w-[31rem] text-[1rem] leading-8 text-[#42596b] md:text-[1.06rem]">
                  Clear answers before you start. The audit helps us recommend what actually matters.
                </p>

                <div className="mt-8 rounded-[1.8rem] border border-[rgba(7,24,39,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,244,236,0.96))] px-6 py-6 shadow-[0_16px_40px_rgba(19,31,45,0.05)]">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#698091]">
                    Still unsure?
                  </p>
                  <p className="mt-4 text-[0.98rem] leading-7 text-[#526777]">
                    Start with the free audit and we will show you the clearest next step.
                  </p>
                  <div className="mt-5">
                    <motion.a
                      href={AUDIT_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={
                        reduceMotion
                          ? undefined
                          : { y: -3, boxShadow: "0 24px 48px rgba(7,24,39,0.18)" }
                      }
                      transition={{ duration: 0.24, ease: "easeOut" }}
                      className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#071827] px-7 text-sm font-semibold tracking-[0.01em] text-[#f8f4ec] shadow-[0_18px_44px_rgba(7,24,39,0.16)]"
                    >
                      Claim My Free Audit
                    </motion.a>
                  </div>
                </div>
              </div>

              <motion.div
                data-reveal-card
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="pointer-events-none absolute inset-0 rounded-[2.3rem] bg-[radial-gradient(circle_at_18%_16%,rgba(221,236,245,0.26),transparent_28%)] blur-2xl" />
                <div className="relative overflow-hidden rounded-[2.3rem] border border-[rgba(7,24,39,0.08)] bg-[linear-gradient(180deg,#fffdf8_0%,#fbf7ef_100%)] p-5 shadow-[0_28px_90px_rgba(19,31,45,0.08)] sm:p-6">
                  <div className="flex items-center justify-between gap-4 border-b border-[rgba(7,24,39,0.08)] pb-5">
                    <div>
                      <span className="rounded-full border border-[rgba(37,68,90,0.1)] bg-[rgba(234,243,248,0.88)] px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[#32516a]">
                        Answers
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3">
                    {faqs.map((faq, index) => {
                      const isOpen = openFaq === index;

                      return (
                        <motion.div
                          key={faq.question}
                          data-reveal-card
                          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{
                            duration: 0.38,
                            delay: reduceMotion ? 0 : index * 0.05,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className={`overflow-hidden rounded-[1.55rem] border shadow-[0_12px_30px_rgba(19,31,45,0.04)] transition duration-300 ${
                            isOpen
                              ? "border-[rgba(37,68,90,0.16)] bg-[rgba(234,243,248,0.58)] shadow-[0_18px_38px_rgba(19,31,45,0.08)]"
                              : "border-[rgba(7,24,39,0.08)] bg-[rgba(255,255,255,0.9)] hover:bg-[rgba(248,244,236,0.84)]"
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => setOpenFaq(index)}
                            className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                          >
                            <span className="text-[1rem] font-medium leading-7 text-[#071827] sm:text-[1.04rem]">
                              {faq.question}
                            </span>
                            <motion.span
                              animate={reduceMotion ? undefined : { rotate: isOpen ? 180 : 0 }}
                              transition={{ duration: 0.24, ease: "easeOut" }}
                              className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-base ${
                                isOpen
                                  ? "border-[rgba(37,68,90,0.14)] bg-[rgba(221,236,245,0.92)] text-[#25445a]"
                                  : "border-[rgba(7,24,39,0.08)] bg-white/82 text-[#7d99ad]"
                              }`}
                            >
                              {isOpen ? "−" : "+"}
                            </motion.span>
                          </button>

                          <motion.div
                            initial={false}
                            animate={
                              isOpen
                                ? { height: "auto", opacity: 1 }
                                : { height: 0, opacity: 0 }
                            }
                            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <motion.p
                              initial={false}
                              animate={
                                isOpen
                                  ? { y: 0, opacity: 1 }
                                  : { y: -6, opacity: 0 }
                              }
                              transition={{ duration: 0.24, ease: "easeOut" }}
                              className="px-5 pb-5 text-[0.96rem] leading-7 text-[#526777] sm:px-6 sm:pb-6"
                            >
                              {faq.answer}
                            </motion.p>
                          </motion.div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section
          id="contact"
          data-final-section
          className="relative overflow-hidden bg-[#f6f1e8]"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(221,236,245,0.24),transparent_22%),radial-gradient(circle_at_84%_78%,rgba(244,235,223,0.42),transparent_28%)]" />
          <div className={`relative ${sectionTwoContainer} py-24 sm:py-28`}>
            <motion.div
              data-final-cta
              data-reveal-card
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden rounded-[2.5rem] border border-[rgba(7,24,39,0.08)] bg-[linear-gradient(180deg,#fffdf8_0%,#fbf7ef_100%)] p-6 shadow-[0_28px_90px_rgba(19,31,45,0.08)] sm:p-8 xl:p-10"
            >
              <div className="grid gap-8 lg:grid-cols-[minmax(0,0.58fr)_minmax(0,0.42fr)] lg:items-center">
                <div className="max-w-[40rem]">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#5a7082]">
                    READY TO FIND THE GAPS?
                  </p>
                  <h2 className="mt-5 max-w-[11ch] text-[2.5rem] font-medium leading-[0.95] tracking-[-0.055em] text-[#071827] sm:text-[3.35rem] md:text-[3.9rem]">
                    Start with a free website opportunity audit
                  </h2>
                  <p className="mt-6 max-w-[34rem] text-[1rem] leading-8 text-[#42596b] md:text-[1.06rem]">
                    We will review your website, identify the biggest issues affecting trust, enquiries, visibility, and conversion, then show you what to fix first.
                  </p>

                  <div className="mt-8">
                    <motion.a
                      href={AUDIT_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={
                        reduceMotion
                          ? undefined
                          : { y: -3, boxShadow: "0 24px 48px rgba(7,24,39,0.18)" }
                      }
                      transition={{ duration: 0.24, ease: "easeOut" }}
                      className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#071827] px-7 text-sm font-semibold tracking-[0.01em] text-[#f8f4ec] shadow-[0_18px_44px_rgba(7,24,39,0.16)]"
                    >
                      Claim My Free Audit
                    </motion.a>
                  </div>

                  <p className="mt-4 text-[0.92rem] leading-7 text-[#607585]">
                    No pressure. Just a clear review of what can be improved.
                  </p>
                </div>

                <div className="rounded-[2rem] border border-[rgba(7,24,39,0.08)] bg-white/78 px-5 py-5 shadow-[0_16px_42px_rgba(19,31,45,0.05)] sm:px-6 sm:py-6">
                  <div className="flex items-center justify-between gap-4 border-b border-[rgba(7,24,39,0.08)] pb-5">
                    <h3 className="text-[1.35rem] font-medium tracking-[-0.04em] text-[#071827]">
                      Free Audit Includes
                    </h3>
                    <span className="rounded-full border border-[rgba(37,68,90,0.1)] bg-[rgba(234,243,248,0.88)] px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[#32516a]">
                      Preview
                    </span>
                  </div>

                  <div className="mt-5 grid gap-3">
                    {[
                      "Messaging review",
                      "Trust review",
                      "CTA and enquiry flow",
                      "SEO basics",
                      "Quick-win opportunities",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex min-h-[3.5rem] items-center gap-3 rounded-[1.1rem] border border-[rgba(7,24,39,0.06)] bg-[rgba(255,255,255,0.88)] px-4 py-3"
                      >
                        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgba(221,236,245,0.92)] text-[0.72rem] text-[#25445a]">
                          ✓
                        </span>
                        <p className="text-[0.95rem] leading-7 text-[#526777]">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,rgba(246,241,232,0)_0%,rgba(228,235,241,0.3)_52%,rgba(7,24,39,0.08)_100%)]" />
        </section>

        <footer
          data-footer-section
          className="relative w-full overflow-hidden border-t border-[rgba(214,231,244,0.14)] bg-[#071827] text-[#F8F4EC]"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_24%,rgba(121,155,182,0.16),transparent_24%),radial-gradient(circle_at_84%_18%,rgba(255,255,255,0.06),transparent_18%)]" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(214,231,244,0.22) 1px, transparent 1px), linear-gradient(45deg, rgba(214,231,244,0.12) 1px, transparent 1px)",
              backgroundSize: "80px 80px, 120px 120px",
            }}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-6 text-center text-[clamp(4.5rem,14vw,12rem)] font-medium uppercase tracking-[-0.08em] text-[rgba(248,244,236,0.05)]">
            OCIA STUDIOS
          </div>

          <div className={`mx-auto w-full ${sectionTwoContainer} py-16 lg:py-20`}>
            <motion.div
              data-reveal-card
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.64, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="grid gap-10 border-b border-[rgba(214,231,244,0.14)] pb-10 lg:grid-cols-[minmax(0,1.15fr)_repeat(3,minmax(0,0.62fr))] lg:gap-8 xl:gap-12">
                <div data-reveal-intro className="max-w-[28rem]">
                  <div className="inline-flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-[#c7dced]">
                    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#9fc0d8]" />
                    Ocia Studios
                  </div>
                  <h3 className="mt-5 max-w-[15ch] text-[1.9rem] font-medium leading-[0.96] tracking-[-0.05em] text-[#f8f4ec] sm:text-[2.2rem]">
                    Websites, funnels, and follow-up systems built to turn interest into enquiries.
                  </h3>
                  <p className="mt-5 max-w-[25rem] text-[0.98rem] leading-7 text-[rgba(248,244,236,0.74)]">
                    For service businesses that rely on enquiries, bookings, and trust.
                  </p>

                  <div className="mt-7">
                    <Link
                      href={SECTION_LINKS.work}
                      className="inline-flex min-h-11 items-center justify-center rounded-full border border-[rgba(214,231,244,0.22)] px-4 text-sm font-semibold text-[#f8f4ec] transition duration-300 hover:bg-[rgba(255,255,255,0.06)] hover:border-[rgba(214,231,244,0.34)]"
                    >
                      Back to top
                    </Link>
                  </div>
                </div>

                <div data-reveal-card>
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#bfd5e6]">
                    Navigate
                  </p>
                  <div className="mt-5 grid gap-3">
                    {footerLinks.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="text-[0.94rem] leading-7 text-[rgba(248,244,236,0.8)] transition duration-300 hover:text-[#f8f4ec] hover:underline"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>

                <div data-reveal-card>
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#bfd5e6]">
                    Services
                  </p>
                  <div className="mt-5 grid gap-3">
                    {footerServiceLinks.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="text-[0.94rem] leading-7 text-[rgba(248,244,236,0.8)] transition duration-300 hover:text-[#f8f4ec] hover:underline"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>

                <div data-reveal-card className="max-w-[16rem]">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#bfd5e6]">
                    Start
                  </p>
                  <p className="mt-5 text-[0.96rem] leading-7 text-[rgba(248,244,236,0.74)]">
                    Not sure what is holding your website back?
                  </p>
                  <div className="mt-6">
                    <motion.a
                      href={AUDIT_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={
                        reduceMotion
                          ? undefined
                          : { y: -3, boxShadow: "0 24px 48px rgba(0,0,0,0.24)" }
                      }
                      transition={{ duration: 0.24, ease: "easeOut" }}
                      className="inline-flex min-h-13 items-center justify-center rounded-full bg-[#f8f4ec] px-6 text-sm font-semibold tracking-[0.01em] text-[#071827] shadow-[0_18px_44px_rgba(0,0,0,0.18)] hover:brightness-[1.03]"
                      style={{ background: "#F8F4EC", color: "#071827", fontWeight: 700 }}
                    >
                      <span style={{ color: "#071827", opacity: 1 }}>
                        Claim My Free Audit
                      </span>
                    </motion.a>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 pt-6 text-[0.84rem] text-[rgba(248,244,236,0.62)] sm:flex-row sm:items-center sm:justify-between">
                <p>© {currentYear} Ocia Studios. All rights reserved.</p>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                  {footerLegalLinks.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="transition duration-300 hover:text-[#f8f4ec] hover:underline"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </footer>
      </main>
    </div>
  );
}
