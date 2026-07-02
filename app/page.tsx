"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import OciaButton from "./components/OciaButton";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "#system" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#final-cta" },
];

const heroProofChips = [
  "5+ client projects",
  "Premium websites",
  "Lead systems",
  "Automation",
  "AI workflows",
];

const decisionQuestions = [
  "Do you look credible?",
  "Is your offer clear?",
  "Can they trust you?",
  "Is it easy to take action?",
];

const systemPillars = [
  {
    number: "01",
    name: "Presence",
    title: "Make the business look credible.",
    body: "Premium websites, brand direction and trust-building pages that help customers take your business seriously faster.",
  },
  {
    number: "02",
    name: "Growth",
    title: "Turn attention into enquiries.",
    body: "SEO, landing pages, lead capture, conversion flows and local visibility designed to create more opportunities.",
  },
  {
    number: "03",
    name: "Automation",
    title: "Follow up faster and operate cleaner.",
    body: "CRM, WhatsApp automation, AI chatbots and enquiry systems that reduce manual work and prevent missed leads.",
  },
];

const servicesPreview = [
  {
    category: "Website & Brand",
    outcome:
      "Create a sharper first impression so customers trust the business faster.",
    services: ["Website Redesign", "Branding & Positioning", "UX / Visual Hierarchy", "Mobile Responsiveness"],
  },
  {
    category: "Growth & Visibility",
    outcome:
      "Increase visibility and turn more high-intent traffic into real enquiries.",
    services: ["SEO", "Google Business Profile Optimisation", "Lead Generation", "Landing Pages"],
  },
  {
    category: "Automation & Follow-up",
    outcome:
      "Respond faster, track leads cleanly and prevent opportunities from going cold.",
    services: ["WhatsApp / Enquiry Automation", "CRM / Lead Management", "Appointment Booking System", "Automated Follow-up Systems"],
  },
  {
    category: "AI & Digital Systems",
    outcome:
      "Use AI and practical system design to reduce manual work and support growth.",
    services: ["AI Chatbot", "Website Audit Reports", "Service Recommendation Engine", "E-commerce Improvement"],
  },
];

const auditGaps = [
  {
    title: "Trust gaps",
    body: "Outdated visuals, unclear messaging, weak proof and low credibility signals.",
  },
  {
    title: "Conversion gaps",
    body: "Confusing CTAs, weak enquiry flows, friction-heavy forms and missed intent.",
  },
  {
    title: "Follow-up gaps",
    body: "Untracked leads, slow replies, no CRM visibility and forgotten opportunities.",
  },
];

const whyOcia = [
  {
    number: "01",
    title: "Strategy",
    body: "Every project starts with business goals, not colours.",
  },
  {
    number: "02",
    title: "Design",
    body: "Premium experiences that build credibility instantly.",
  },
  {
    number: "03",
    title: "Systems",
    body: "Automation and AI that continue working after launch.",
  },
  {
    number: "04",
    title: "Follow-through",
    body: "We help refine, test and improve after your system goes live.",
  },
];

const transformations = [
  {
    id: "01",
    title: "Professional Services Website",
    problem:
      "The business looked outdated online and enquiries were inconsistent.",
    solution:
      "A clearer website structure, stronger trust signals and improved enquiry flow.",
    result:
      "A sharper digital presence built to convert visitors into qualified leads.",
    visual: ["Trust signals", "Service clarity", "Enquiry CTA", "Mobile-first layout"],
  },
  {
    id: "02",
    title: "Lead System Build",
    problem:
      "Leads were coming in from multiple channels with no clear follow-up process.",
    solution:
      "CRM tracking, WhatsApp enquiry routing and automated follow-up reminders.",
    result: "A cleaner pipeline with fewer missed opportunities.",
    visual: ["New lead", "Audit generated", "Follow-up sent", "Reply tracked"],
  },
  {
    id: "03",
    title: "Premium Launch Page",
    problem:
      "The brand needed a memorable launch experience that felt premium.",
    solution:
      "A cinematic landing page with clear messaging, scroll interaction and focused CTAs.",
    result:
      "A stronger first impression for launch traffic and campaign visitors.",
    visual: ["Hero clarity", "Focused CTA", "Launch analytics", "Campaign-ready"],
  },
];

const processSteps = [
  {
    number: "01",
    title: "Discover",
    body: "We understand your business, audience, goals, competitors and current digital gaps.",
  },
  {
    number: "02",
    title: "Strategy",
    body: "We map the website, messaging, services, customer journey and conversion flow before designing.",
  },
  {
    number: "03",
    title: "Design",
    body: "We shape a premium experience around trust, clarity and action.",
  },
  {
    number: "04",
    title: "Build",
    body: "We develop the website, systems and automations with performance and usability in mind.",
  },
  {
    number: "05",
    title: "Launch & Improve",
    body: "We launch, test, track and refine so the system keeps improving after going live.",
  },
];

const growthSystems = [
  {
    title: "Presence System",
    price: "From SGD 1,500",
    forLabel: "Businesses that need credibility online.",
    description:
      "A premium starting point for businesses that need to look credible, clear and professional.",
    timeline: "2–3 weeks",
    cta: "Start with Presence",
    featured: false,
    includes: [
      "Landing page or small website",
      "Mobile-responsive design",
      "Basic brand direction",
      "Contact / enquiry flow",
      "WhatsApp CTA",
      "Basic on-page SEO",
      "Analytics setup",
      "14-day bug-fix support",
    ],
  },
  {
    title: "Growth System",
    price: "From SGD 3,500",
    forLabel: "Businesses that want more enquiries.",
    description:
      "A conversion-focused website and lead system built to help your business get found, trusted and contacted.",
    timeline: "3–5 weeks",
    cta: "Build My Growth System",
    featured: true,
    includes: [
      "Multi-page website",
      "Custom responsive design",
      "Conversion Rate Optimisation",
      "Lead generation setup",
      "Landing pages and enquiry forms",
      "WhatsApp CTAs",
      "Google Business Profile Optimisation",
      "SEO foundations",
      "Analytics and event tracking",
      "Social proof / testimonials section",
      "30-day support",
    ],
  },
  {
    title: "Premium System",
    price: "From SGD 5,800",
    forLabel: "Businesses that need a complete digital ecosystem.",
    description:
      "A complete system for brands that need stronger automation, trust, conversion and follow-up infrastructure.",
    timeline: "5–8 weeks",
    cta: "Discuss Premium System",
    featured: false,
    includes: [
      "Advanced website or web experience",
      "Brand positioning and messaging",
      "CRM / Lead Management",
      "WhatsApp / Enquiry Automation",
      "AI Chatbot",
      "Appointment Booking System",
      "Advanced SEO setup",
      "Conversion tracking and analytics",
      "E-commerce or enquiry flow improvement",
      "Priority optimisation support",
    ],
  },
];

const proofBlocks = [
  {
    title: "Clear audits",
    body: "We identify the gaps affecting trust, conversion and enquiries.",
  },
  {
    title: "Strategic builds",
    body: "Every section, CTA and flow is tied to a business goal.",
  },
  {
    title: "System thinking",
    body: "Websites, automations and lead flows are built to work together.",
  },
  {
    title: "Launch support",
    body: "We help test, refine and improve after the site goes live.",
  },
];

const faqs = [
  {
    question: "How long does a project take?",
    answer:
      "Most builds take 2–8 weeks depending on scope, content, systems and feedback speed. Smaller presence sites are usually faster, while automation-heavy systems take longer.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Packages start from SGD 1,500. Final pricing depends on the number of pages, design complexity, integrations, automations and support required.",
  },
  {
    question: "Will I own the website?",
    answer:
      "Yes. Once the project is completed and payment is settled, you own the final website and agreed deliverables.",
  },
  {
    question: "Can I update the website myself?",
    answer:
      "Yes. We can build with editable sections or a CMS depending on your needs, so your team can update content without depending on a developer for every change.",
  },
  {
    question: "Can you help after launch?",
    answer:
      "Yes. We offer launch support, optimisation and ongoing improvements depending on the package or retainer arrangement.",
  },
  {
    question: "Do you only build websites?",
    answer:
      "No. Websites are one part of the system. We also build lead flows, CRM workflows, WhatsApp automation, AI chatbots, booking systems, audit reports and digital growth systems.",
  },
];

const footerLinks = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "#system" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#final-cta" },
];

const sectionRevealTargets = [
  { trigger: "[data-system-section]", intro: "[data-reveal-intro][data-group='system']", body: "[data-system-card]" },
  { trigger: "[data-services-preview-section]", intro: "[data-reveal-intro][data-group='services']", body: "[data-service-group]" },
  { trigger: "[data-audit-section]", intro: "[data-reveal-intro][data-group='audit']", body: "[data-audit-card], [data-audit-visual]" },
  { trigger: "[data-why-section]", intro: "[data-reveal-intro][data-group='why']", body: "[data-why-card]" },
  { trigger: "[data-work-section]", intro: "[data-reveal-intro][data-group='work']", body: "[data-case-study]" },
  { trigger: "[data-process-section]", intro: "[data-reveal-intro][data-group='process']", body: "[data-process-step]" },
  { trigger: "[data-growth-section]", intro: "[data-reveal-intro][data-group='growth']", body: "[data-growth-card]" },
  { trigger: "[data-proof-section]", intro: "[data-reveal-intro][data-group='proof']", body: "[data-proof-card]" },
  { trigger: "[data-faq-section]", intro: "[data-reveal-intro][data-group='faq']", body: "[data-faq-item]" },
  { trigger: "[data-final-section]", intro: "[data-reveal-intro][data-group='final']", body: "[data-final-cta]" },
];

export default function HomePage() {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const [openFaq, setOpenFaq] = useState<number>(0);

  useLayoutEffect(() => {
    const page = pageRef.current;
    const heroSection = heroSectionRef.current;
    let onPointerMove: ((event: PointerEvent) => void) | undefined;
    let lenis: Lenis | undefined;
    let rafId = 0;

    if (!page || !heroSection) {
      return;
    }

    const ctx = gsap.context(() => {
      lenis = new Lenis({
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 0.95,
      });

      lenis.on("scroll", ScrollTrigger.update);

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = window.requestAnimationFrame(raf);
      };

      rafId = window.requestAnimationFrame(raf);

      gsap.set("[data-hero-bg]", {
        transformOrigin: "center center",
        scale: 1,
        x: 0,
        y: 0,
      });
      gsap.set("[data-hero-mist]", { x: -36, opacity: 0.34 });
      gsap.set("[data-hero-shimmer]", { x: 18, opacity: 0.14 });
      gsap.set("[data-hero-haze]", { x: -12, y: 0, opacity: 0.14 });
      gsap.set("[data-hero-shadow]", { opacity: 0.14 });
      gsap.set("[data-hero-glow]", { xPercent: -50, yPercent: -50, x: 0, y: 0 });
      gsap.set("[data-hero-copy]", { y: 0, opacity: 1 });
      gsap.set("[data-hero-chip]", { y: 10, opacity: 0.24 });
      gsap.set("[data-hero-card]", { y: 0, opacity: 1 });
      gsap.set("[data-hero-particles]", { opacity: 0.14 });

      gsap.set("[data-reveal-intro]", { y: 34, opacity: 0 });
      gsap.set("[data-decision-question]", {
        y: 40,
        autoAlpha: 0,
        filter: "blur(8px)",
      });
      gsap.set("[data-decision-progress]", { autoAlpha: 0, y: 16 });
      gsap.set("[data-decision-final]", {
        y: 40,
        autoAlpha: 0,
        filter: "blur(6px)",
      });
      gsap.set("[data-decision-cta]", { y: 24, autoAlpha: 0 });
      gsap.set("[data-system-card]", { y: 34, opacity: 0 });
      gsap.set("[data-service-group]", { y: 34, opacity: 0 });
      gsap.set("[data-audit-card]", { y: 34, opacity: 0 });
      gsap.set("[data-audit-visual]", { y: 34, opacity: 0 });
      gsap.set("[data-why-card]", { y: 28, opacity: 0 });
      gsap.set("[data-case-study]", { y: 38, opacity: 0 });
      gsap.set("[data-process-step]", { y: 28, opacity: 0 });
      gsap.set("[data-growth-card]", { y: 38, opacity: 0 });
      gsap.set("[data-proof-card]", { y: 30, opacity: 0 });
      gsap.set("[data-faq-item]", { y: 24, opacity: 0 });
      gsap.set("[data-final-cta]", { y: 34, opacity: 0 });

      gsap.to("[data-hero-mist]", {
        x: 18,
        duration: 11,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to("[data-hero-haze]", {
        x: 18,
        y: -8,
        opacity: 0.2,
        duration: 14,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to("[data-hero-shimmer]", {
        x: 34,
        opacity: 0.19,
        duration: 7.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to("[data-hero-particles]", {
        opacity: 0.22,
        y: -6,
        duration: 6.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to("[data-hero-chip]", {
        y: -8,
        opacity: 0.46,
        duration: 2.8,
        ease: "sine.inOut",
        stagger: 0.16,
        yoyo: true,
        repeat: -1,
      });

      gsap.utils.toArray<HTMLElement>("[data-hero-card]").forEach((card, index) => {
        gsap.to(card, {
          y: index % 2 === 0 ? -10 : 10,
          x: index % 2 === 0 ? 6 : -6,
          duration: 5.4 + index * 0.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });

      const glowX = gsap.quickTo("[data-hero-glow]", "x", {
        duration: 0.8,
        ease: "power3.out",
      });
      const glowY = gsap.quickTo("[data-hero-glow]", "y", {
        duration: 0.8,
        ease: "power3.out",
      });

      onPointerMove = (event: PointerEvent) => {
        const bounds = heroSection.getBoundingClientRect();
        glowX(event.clientX - bounds.left);
        glowY(event.clientY - bounds.top);
      };

      heroSection.addEventListener("pointermove", onPointerMove);

      gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: heroSection,
          start: "top top",
          end: "+=235%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
        .to("[data-hero-bg]", { scale: 1.3, y: -88, x: 8, immediateRender: false }, 0)
        .to("[data-hero-mist]", { x: 72, opacity: 0.4, immediateRender: false }, 0)
        .to("[data-hero-shimmer]", { x: -42, opacity: 0.16, immediateRender: false }, 0)
        .to("[data-hero-copy]", { y: -96, opacity: 0, immediateRender: false }, 0.28)
        .to("[data-hero-shadow]", { opacity: 0.62, immediateRender: false }, 0)
        .to("[data-hero-dashboard]", { y: -48, opacity: 0.82, immediateRender: false }, 0);

      sectionRevealTargets.forEach((section) => {
        gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: section.trigger,
            start: "top 78%",
            end: "top 28%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }).to(section.intro, {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.85,
          immediateRender: false,
        });

        gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: section.trigger,
            start: "top 72%",
            end: "top 24%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }).to(section.body, {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.85,
          immediateRender: false,
        });
      });

      const media = gsap.matchMedia();

      media.add("(min-width: 768px)", () => {
        gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: "[data-decision-desktop]",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })
          .to("[data-reveal-intro][data-group='decision']", {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.7,
            immediateRender: false,
          }, 0.02)
          .to("[data-decision-progress='0']", { autoAlpha: 0.7, y: 0, immediateRender: false }, 0.18)
          .to("[data-decision-question='0']", { y: 0, autoAlpha: 1, filter: "blur(0px)", immediateRender: false }, 0.22)
          .to("[data-decision-progress='0']", { autoAlpha: 0, y: -14, immediateRender: false }, 0.38)
          .to("[data-decision-question='0']", { y: -26, autoAlpha: 0, filter: "blur(6px)", immediateRender: false }, 0.4)
          .to("[data-decision-progress='1']", { autoAlpha: 0.7, y: 0, immediateRender: false }, 0.44)
          .to("[data-decision-question='1']", { y: 0, autoAlpha: 1, filter: "blur(0px)", immediateRender: false }, 0.48)
          .to("[data-decision-progress='1']", { autoAlpha: 0, y: -14, immediateRender: false }, 0.62)
          .to("[data-decision-question='1']", { y: -26, autoAlpha: 0, filter: "blur(6px)", immediateRender: false }, 0.64)
          .to("[data-decision-progress='2']", { autoAlpha: 0.7, y: 0, immediateRender: false }, 0.68)
          .to("[data-decision-question='2']", { y: 0, autoAlpha: 1, filter: "blur(0px)", immediateRender: false }, 0.72)
          .to("[data-decision-progress='2']", { autoAlpha: 0, y: -14, immediateRender: false }, 0.86)
          .to("[data-decision-question='2']", { y: -26, autoAlpha: 0, filter: "blur(6px)", immediateRender: false }, 0.88)
          .to("[data-decision-progress='3']", { autoAlpha: 0.7, y: 0, immediateRender: false }, 0.92)
          .to("[data-decision-question='3']", { y: 0, autoAlpha: 1, filter: "blur(0px)", immediateRender: false }, 0.96)
          .to("[data-decision-progress='3']", { autoAlpha: 0, y: -14, immediateRender: false }, 1.1)
          .to("[data-decision-question='3']", { y: -24, autoAlpha: 0, filter: "blur(6px)", immediateRender: false }, 1.12)
          .to("[data-decision-final]", { y: 0, autoAlpha: 1, filter: "blur(0px)", immediateRender: false }, 1.18)
          .to("[data-decision-cta]", { y: 0, autoAlpha: 1, immediateRender: false }, 1.22);
      });

      media.add("(max-width: 767px)", () => {
        gsap.set("[data-decision-mobile-item]", { y: 26, opacity: 0 });

        gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: "[data-decision-mobile]",
            start: "top 80%",
            end: "top 28%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }).to("[data-reveal-intro][data-group='decision-mobile']", {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.7,
          immediateRender: false,
        });

        gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: "[data-decision-mobile]",
            start: "top 72%",
            end: "bottom 24%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }).to("[data-decision-mobile-item]", {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          immediateRender: false,
        });
      });

    }, page);

    return () => {
      if (onPointerMove) {
        heroSection.removeEventListener("pointermove", onPointerMove);
      }
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      lenis?.destroy();
      ctx.revert();
    };
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <main ref={pageRef} className="relative isolate overflow-x-clip bg-[#05070b] text-white">
      <section ref={heroSectionRef} className="relative h-svh overflow-hidden">
        <div className="relative h-svh overflow-hidden">
          <div className="absolute inset-0 z-0 bg-[#030508]" />

          <Image
            src="/assets/ocia/hero-shoreline.png"
            alt="Dark shoreline at dusk"
            fill
            priority
            sizes="100vw"
            data-hero-bg
            className="absolute inset-0 z-10 h-full w-full object-cover object-center will-change-transform"
          />

          <Image
            src="/assets/ocia/mist-overlay.png"
            alt=""
            fill
            sizes="100vw"
            aria-hidden="true"
            data-hero-mist
            className="pointer-events-none absolute inset-0 z-20 h-full w-full object-cover object-center opacity-[0.34] mix-blend-screen will-change-transform"
          />

          <div
            data-hero-shimmer
            className="pointer-events-none absolute bottom-[12%] right-[-2%] z-30 h-[24%] w-[48%] rounded-[100%] opacity-[0.14] mix-blend-screen blur-3xl will-change-transform md:bottom-[10%] md:h-[27%] md:w-[44%]"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(223,232,244,0.44) 0%, rgba(192,212,236,0.22) 26%, rgba(110,140,174,0.08) 52%, rgba(110,140,174,0) 78%)",
            }}
          />

          <div
            data-hero-haze
            className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_58%_20%,rgba(170,194,220,0.08),transparent_20%),radial-gradient(circle_at_72%_34%,rgba(116,150,186,0.07),transparent_26%)] will-change-transform"
          />
          <div className="absolute inset-0 z-20 bg-[radial-gradient(circle_at_70%_18%,rgba(114,144,178,0.12),transparent_30%),linear-gradient(90deg,rgba(2,4,8,0.64)_0%,rgba(2,4,8,0.42)_34%,rgba(2,4,8,0.14)_62%,rgba(2,4,8,0.5)_100%)]" />
          <div className="absolute inset-0 z-20 bg-[linear-gradient(180deg,rgba(2,5,10,0.26)_0%,rgba(2,5,10,0.06)_36%,rgba(2,5,10,0.12)_64%,rgba(2,5,10,0.34)_100%)]" />
          <div
            data-hero-shadow
            className="absolute inset-0 z-30 bg-[linear-gradient(180deg,rgba(1,3,7,0.02)_0%,rgba(1,3,7,0.1)_52%,rgba(1,3,7,0.26)_100%)] opacity-[0.14]"
          />
          <div
            data-hero-glow
            className="pointer-events-none absolute left-0 top-0 z-30 hidden h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(210,225,240,0.1)_0%,rgba(126,160,194,0.05)_34%,rgba(126,160,194,0)_72%)] blur-3xl md:block"
          />
          <div
            data-hero-particles
            className="pointer-events-none absolute inset-0 z-30 opacity-[0.14] [background-image:radial-gradient(rgba(235,242,248,0.14)_0.7px,transparent_0.7px)] [background-size:26px_26px]"
          />

          <div className="relative z-40 flex h-full flex-col px-5 pb-10 pt-5 sm:px-8 md:px-10 lg:px-14 lg:pt-7 xl:px-20">
            <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <Link
                href="/"
                className="text-[0.72rem] font-medium uppercase tracking-[0.42em] text-white/90 sm:text-xs"
              >
                OCIA Studios
              </Link>

              <nav className="flex max-w-full items-center gap-4 overflow-x-auto pb-1 text-[0.62rem] uppercase tracking-[0.22em] whitespace-nowrap text-white/65 [scrollbar-width:none] md:gap-7 md:pb-0 md:text-[0.7rem] md:tracking-[0.24em]">
                {navItems.map((item) =>
                  item.href.startsWith("/") ? (
                    <Link key={item.label} href={item.href} className="transition hover:text-white">
                      {item.label}
                    </Link>
                  ) : (
                    <a key={item.label} href={item.href} className="transition hover:text-white">
                      {item.label}
                    </a>
                  ),
                )}
              </nav>
            </header>

            <div className="grid flex-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-16">
              <div data-hero-copy className="max-w-3xl will-change-transform">
                <p className="mb-5 text-[0.68rem] font-medium uppercase tracking-[0.42em] text-white/55 sm:text-[0.74rem]">
                  Premium digital systems for ambitious businesses
                </p>

                <h1 className="max-w-4xl text-[2.8rem] font-medium leading-[0.95] tracking-[-0.06em] text-white sm:text-[4rem] md:text-[5.4rem] lg:text-[6.2rem]">
                  Build the business everyone remembers.
                </h1>

                <p className="mt-6 max-w-2xl text-sm leading-7 text-white/72 sm:text-base sm:leading-8 md:mt-7 md:text-lg">
                  Premium websites, lead systems, automation and AI-powered
                  workflows engineered to earn trust, generate enquiries and
                  help ambitious businesses grow.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <OciaButton href="#final-cta" arrow>
                    Book a Discovery Call
                  </OciaButton>
                  <OciaButton href="#work" variant="secondary">
                    View Work
                  </OciaButton>
                </div>

                <p className="mt-4 text-sm leading-7 text-white/48">
                  Start with a website, audit or complete growth system.
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {heroProofChips.map((chip) => (
                    <span
                      key={chip}
                      data-hero-chip
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[0.62rem] uppercase tracking-[0.28em] text-white/38"
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                <p className="mt-6 max-w-xl text-sm leading-7 text-white/48">
                  From first impression to follow-up, OCIA builds the digital
                  system behind every enquiry.
                </p>
              </div>

              <div data-hero-dashboard className="relative hidden min-h-[560px] lg:block">
                <div
                  data-hero-card
                  className="absolute left-[2%] top-[9%] w-[44%] rounded-[1.7rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.025))] p-5 shadow-[0_18px_70px_rgba(4,10,18,0.36)] backdrop-blur-xl"
                >
                  <p className="text-[0.62rem] uppercase tracking-[0.28em] text-white/42">
                    Lead Discovery
                  </p>
                  <div className="mt-4 rounded-full border border-[#f8b457]/35 bg-[#f8b457]/12 px-3 py-1 text-[0.62rem] uppercase tracking-[0.28em] text-[#f2d29a]">
                    Hot lead
                  </div>
                  <h3 className="mt-5 text-lg font-medium text-white">
                    Harvest Accounting Pte. Ltd.
                  </h3>
                  <p className="mt-2 text-sm text-white/52">
                    Professional Services
                  </p>
                </div>

                <div
                  data-hero-card
                  className="absolute right-[4%] top-[2%] w-[48%] rounded-[1.8rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.025))] p-6 shadow-[0_18px_70px_rgba(4,10,18,0.36)] backdrop-blur-xl"
                >
                  <p className="text-[0.62rem] uppercase tracking-[0.28em] text-white/42">
                    Website Audit
                  </p>
                  <p className="mt-4 text-sm leading-7 text-white/62">
                    Service clarity, trust signals and mobile UX mapped for a
                    cleaner first impression.
                  </p>
                  <div className="mt-6 flex items-center justify-between rounded-[1rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/54">
                    <span>Report ready</span>
                    <span>Approved</span>
                  </div>
                </div>

                <div
                  data-hero-card
                  className="absolute left-[12%] top-[40%] w-[40%] rounded-[1.7rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.025))] p-5 shadow-[0_18px_70px_rgba(4,10,18,0.36)] backdrop-blur-xl"
                >
                  <p className="text-[0.62rem] uppercase tracking-[0.28em] text-white/42">
                    Service Fit Scores
                  </p>
                  <div className="mt-5 space-y-3">
                    {[
                      ["Conversion Rate Optimisation", "70"],
                      ["Lead Generation", "70"],
                      ["SEO", "60"],
                      ["AI Chatbot", "60"],
                    ].map(([label, score]) => (
                      <div key={label} className="flex items-center justify-between text-sm text-white/62">
                        <span>{label}</span>
                        <span className="rounded-full border border-white/10 px-2 py-1 text-[0.68rem] text-white/72">
                          {score}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  data-hero-card
                  className="absolute right-[10%] top-[48%] w-[44%] rounded-[1.9rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.025))] p-6 shadow-[0_18px_70px_rgba(4,10,18,0.36)] backdrop-blur-xl"
                >
                  <p className="text-[0.62rem] uppercase tracking-[0.28em] text-white/42">
                    CRM Pipeline
                  </p>
                  <div className="mt-5 space-y-3">
                    {["Analysed", "Report ready", "Approved", "Follow-up sent", "Replied"].map((step, index) => (
                      <div key={step} className="flex items-center gap-3 text-sm text-white/62">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-[0.7rem] text-white/48">
                          {index + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  data-hero-card
                  className="absolute left-[38%] bottom-[2%] w-[42%] rounded-[1.7rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.025))] p-5 shadow-[0_18px_70px_rgba(4,10,18,0.36)] backdrop-blur-xl"
                >
                  <p className="text-[0.62rem] uppercase tracking-[0.28em] text-white/42">
                    Gmail Outreach
                  </p>
                  <p className="mt-4 text-sm leading-7 text-white/62">
                    Generate next follow-up, sync replies and keep warm leads
                    moving through the system.
                  </p>
                </div>

                <div
                  data-hero-card
                  className="absolute left-[4%] bottom-[6%] w-[28%] rounded-[1.55rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.025))] p-5 shadow-[0_18px_70px_rgba(4,10,18,0.36)] backdrop-blur-xl"
                >
                  <p className="text-[0.62rem] uppercase tracking-[0.28em] text-white/42">
                    Follow-up Automation
                  </p>
                  <div className="mt-4 space-y-2 text-sm text-white/62">
                    <div className="flex items-center justify-between">
                      <span>Generate next follow-up</span>
                      <span className="text-white/38">Queued</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Sync replies</span>
                      <span className="text-white/38">Live</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-end justify-between text-[0.65rem] uppercase tracking-[0.28em] text-white/38">
              <span>OCIA System</span>
              <span className="hidden sm:inline">Scroll to explore</span>
            </div>
          </div>
        </div>
      </section>

      <section
        data-decision-section
        className="relative overflow-hidden border-t border-white/8 bg-[radial-gradient(circle_at_50%_18%,rgba(108,138,166,0.1),transparent_24%),linear-gradient(180deg,#030408_0%,#060910_100%)]"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_20%,rgba(114,144,178,0.1),transparent_24%),radial-gradient(circle_at_82%_78%,rgba(76,102,132,0.08),transparent_24%)]" />
        <div
          data-decision-desktop
          className="relative z-20 hidden min-h-[300vh] md:block"
        >
          <div className="sticky top-0 flex h-svh items-center px-5 sm:px-8 md:px-10 lg:px-14 xl:px-20">
            <div className="mx-auto w-full max-w-[1080px] text-center">
              <p
                data-reveal-intro
                data-group="decision"
                className="text-[0.68rem] font-medium uppercase tracking-[0.42em] text-white/40 sm:text-[0.72rem]"
              >
                The Decision
              </p>
              <h2
                data-reveal-intro
                data-group="decision"
                className="mx-auto mt-6 max-w-4xl text-[2.9rem] font-medium leading-[0.93] tracking-[-0.06em] text-white sm:text-[4rem] md:text-[5rem] lg:text-[6rem]"
              >
                Before they enquire, they decide.
              </h2>
              <p
                data-reveal-intro
                data-group="decision"
                className="mx-auto mt-7 max-w-3xl text-base leading-8 text-white/66 md:text-[1.12rem] md:leading-9"
              >
                Before a customer fills out a form, books a call or sends a
                message, they have already judged your business through what they
                see online.
              </p>

              <div className="relative mx-auto mt-16 flex min-h-[220px] max-w-3xl items-center justify-center overflow-hidden md:min-h-[260px]">
                {decisionQuestions.map((question, index) => (
                  <div
                    key={question}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-5"
                  >
                    <p
                      data-decision-progress={String(index)}
                      className="invisible text-[0.72rem] uppercase tracking-[0.38em] text-white/44 opacity-0"
                    >
                      0{index + 1} / 04
                    </p>
                    <p
                      data-decision-question={String(index)}
                      className="invisible max-w-3xl text-[1.55rem] font-medium tracking-[-0.04em] text-white/88 opacity-0 sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem]"
                    >
                      {question}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mx-auto mt-8 max-w-3xl">
                <p
                  data-decision-final
                  className="invisible text-[1.25rem] font-medium tracking-[-0.03em] text-white opacity-0 sm:text-[1.5rem] md:text-[1.9rem]"
                >
                  If any answer is unclear, the lead is already gone.
                </p>

                <div data-decision-cta className="invisible mt-10 flex justify-center opacity-0">
                  <OciaButton href="#final-cta" arrow>
                    Get a Website Review
                  </OciaButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          data-decision-mobile
          className="relative z-20 px-5 py-24 sm:px-8 sm:py-28 md:hidden"
        >
          <div className="mx-auto max-w-[760px] text-center">
            <p
              data-reveal-intro
              data-group="decision-mobile"
              className="text-[0.68rem] font-medium uppercase tracking-[0.42em] text-white/40 sm:text-[0.72rem]"
            >
              The Decision
            </p>
            <h2
              data-reveal-intro
              data-group="decision-mobile"
              className="mx-auto mt-6 max-w-4xl text-[2.9rem] font-medium leading-[0.93] tracking-[-0.06em] text-white sm:text-[4rem] md:text-[5rem] lg:text-[6rem]"
            >
              Before they enquire, they decide.
            </h2>
            <p
              data-reveal-intro
              data-group="decision-mobile"
              className="mx-auto mt-7 max-w-3xl text-base leading-8 text-white/66 md:text-[1.12rem] md:leading-9"
            >
              Before a customer fills out a form, books a call or sends a
              message, they have already judged your business through what they
              see online.
            </p>

            <div className="mt-14 space-y-6 text-center">
              {decisionQuestions.map((question, index) => (
                <div
                  key={question}
                  data-decision-mobile-item
                  className="rounded-[1.5rem] border border-white/8 bg-white/[0.02] px-5 py-6"
                >
                  <p className="text-[0.68rem] uppercase tracking-[0.36em] text-white/38">
                    0{index + 1} / 04
                  </p>
                  <p className="mt-4 text-[1.2rem] font-medium tracking-[-0.035em] text-white/88">
                    {question}
                  </p>
                </div>
              ))}
            </div>

            <p data-decision-mobile-item className="mx-auto mt-12 max-w-3xl text-[1.25rem] font-medium tracking-[-0.03em] text-white sm:text-[1.5rem]">
              If any answer is unclear, the lead is already gone.
            </p>

            <div data-decision-mobile-item className="mt-10 flex justify-center">
              <OciaButton href="#final-cta" arrow>
                Get a Website Review
              </OciaButton>
            </div>
          </div>
        </div>
      </section>

      <section
        id="system"
        data-system-section
        className="relative overflow-hidden border-t border-white/8 bg-[linear-gradient(180deg,#04070c_0%,#060a11_100%)] px-5 py-28 sm:px-8 md:px-10 lg:px-14 lg:py-40 xl:px-20"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_18%,rgba(94,124,154,0.12),transparent_22%),radial-gradient(circle_at_18%_82%,rgba(62,82,108,0.1),transparent_24%)]" />
        <div className="relative z-20 mx-auto max-w-[1280px]">
          <p
            data-reveal-intro
            data-group="system"
            className="text-[0.68rem] font-medium uppercase tracking-[0.42em] text-white/40 sm:text-[0.72rem]"
          >
            The System
          </p>
          <div className="mt-6 grid gap-12 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-24">
            <div>
              <h2
                data-reveal-intro
                data-group="system"
                className="max-w-4xl text-[2.8rem] font-medium leading-[0.95] tracking-[-0.055em] text-white sm:text-[3.7rem] md:text-[4.75rem]"
              >
                We build the system behind the yes.
              </h2>
            </div>
            <p
              data-reveal-intro
              data-group="system"
              className="max-w-2xl text-base leading-8 text-white/66 md:text-[1.08rem] md:leading-9"
            >
              OCIA creates the digital pieces that help businesses look
              established, generate enquiries and respond faster — from
              websites and lead flows to automation and AI.
            </p>
          </div>

          <div className="mt-18 grid gap-5 lg:grid-cols-3">
            {systemPillars.map((pillar) => (
              <article
                key={pillar.title}
                data-system-card
                className="group rounded-[2rem] border border-white/10 bg-white/[0.022] px-7 py-8 transition hover:border-white/18 hover:bg-white/[0.04] md:min-h-[320px] md:px-8 md:py-9"
              >
                <span className="text-[0.66rem] uppercase tracking-[0.34em] text-white/30">
                  {pillar.number}
                </span>
                <h3 className="mt-8 text-[1.7rem] font-medium tracking-[-0.045em] text-white md:text-[2.2rem]">
                  {pillar.name}
                </h3>
                <p className="mt-5 text-[0.7rem] uppercase tracking-[0.34em] text-white/34">
                  {pillar.title}
                </p>
                <p className="mt-6 max-w-2xl text-sm leading-7 text-white/60 md:text-[1rem] md:leading-8">
                  {pillar.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        data-services-preview-section
        className="relative overflow-hidden border-t border-white/8 bg-[linear-gradient(180deg,#030509_0%,#060911_100%)] px-5 py-28 sm:px-8 md:px-10 lg:px-14 lg:py-40 xl:px-20"
      >
        <div className="relative z-20 mx-auto max-w-[1320px]">
          <p
            data-reveal-intro
            data-group="services"
            className="text-[0.68rem] font-medium uppercase tracking-[0.42em] text-white/40 sm:text-[0.72rem]"
          >
            Services
          </p>
          <div className="mt-6 grid gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-24">
            <div>
              <h2
                data-reveal-intro
                data-group="services"
                className="max-w-4xl text-[2.8rem] font-medium leading-[0.95] tracking-[-0.055em] text-white sm:text-[3.7rem] md:text-[4.75rem]"
              >
                Services that turn your website into a growth system.
              </h2>
            </div>
            <p
              data-reveal-intro
              data-group="services"
              className="max-w-2xl text-base leading-8 text-white/66 md:text-[1.08rem] md:leading-9"
            >
              From first impression to follow-up, OCIA connects design,
              visibility, automation and AI into one practical digital system.
            </p>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2">
            {servicesPreview.map((group) => (
              <article
                key={group.category}
                data-service-group
                className="rounded-[1.9rem] border border-white/10 bg-white/[0.022] p-7 transition hover:border-white/18 hover:bg-white/[0.04] md:p-8"
              >
                <h3 className="text-[1.35rem] font-medium tracking-[-0.04em] text-white md:text-[1.6rem]">
                  {group.category}
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-white/58 md:text-[0.98rem]">
                  {group.outcome}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {group.services.map((service) => (
                    <span
                      key={service}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white/56"
                    >
                      {service}
                    </span>
                  ))}
                </div>
                <div className="mt-7">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition hover:text-white"
                  >
                    <span>Explore Services</span>
                    <span aria-hidden="true" className="text-white/42">
                      →
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10">
            <OciaButton href="/services" variant="secondary">
              View All Services
            </OciaButton>
          </div>
        </div>
      </section>

      <section
        data-audit-section
        className="relative overflow-hidden border-t border-white/8 bg-[linear-gradient(180deg,#04070d_0%,#060a12_100%)] px-5 py-28 sm:px-8 md:px-10 lg:px-14 lg:py-36 xl:px-20"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(112,142,172,0.12),transparent_24%),radial-gradient(circle_at_20%_76%,rgba(74,98,128,0.1),transparent_28%)]" />
        <div className="relative z-20 mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-20">
          <div>
            <p
              data-reveal-intro
              data-group="audit"
              className="text-[0.68rem] font-medium uppercase tracking-[0.42em] text-white/40 sm:text-[0.72rem]"
            >
              Start With Clarity
            </p>
            <h2
              data-reveal-intro
              data-group="audit"
              className="mt-6 max-w-4xl text-[2.8rem] font-medium leading-[0.95] tracking-[-0.055em] text-white sm:text-[3.7rem] md:text-[4.6rem]"
            >
              Know what is costing you trust, enquiries and follow-up.
            </h2>
            <p
              data-reveal-intro
              data-group="audit"
              className="mt-6 max-w-2xl text-base leading-8 text-white/66 md:text-[1.08rem] md:leading-9"
            >
              Before recommending a website, automation or growth system, OCIA
              identifies where your digital presence is losing attention,
              credibility or leads.
            </p>

            <div className="mt-10 space-y-4">
              {auditGaps.map((gap) => (
                <article
                  key={gap.title}
                  data-audit-card
                  className="rounded-[1.7rem] border border-white/10 bg-white/[0.022] p-6"
                >
                  <h3 className="text-[1.2rem] font-medium tracking-[-0.035em] text-white">
                    {gap.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/58 md:text-[0.98rem]">
                    {gap.body}
                  </p>
                </article>
              ))}
            </div>

            <div data-audit-card className="mt-10">
              <OciaButton href="#final-cta" arrow>
                Get a Recommendation
              </OciaButton>
            </div>
          </div>

          <article
            data-audit-visual
            className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.018))] p-6 shadow-[0_18px_70px_rgba(4,10,18,0.22)] md:p-8"
          >
            <div className="flex items-center justify-between">
              <p className="text-[0.66rem] uppercase tracking-[0.34em] text-white/34">
                Audit Report
              </p>
              <span className="rounded-full border border-white/10 px-3 py-1 text-[0.62rem] uppercase tracking-[0.26em] text-white/48">
                Preview
              </span>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                ["Audit score", "78 / 100"],
                ["Opportunity profile", "High intent"],
                ["Recommended services", "Website, CRO, CRM"],
                ["Follow-up status", "Automation ready"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-[1.25rem] border border-white/8 bg-white/[0.03] p-5"
                >
                  <p className="text-[0.62rem] uppercase tracking-[0.28em] text-white/32">
                    {label}
                  </p>
                  <p className="mt-4 text-lg font-medium tracking-[-0.03em] text-white/86">
                    {value}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-[1.4rem] border border-white/8 bg-[#0b1118]/88 p-5">
              <div className="flex items-center justify-between text-sm text-white/58">
                <span>Priority issue</span>
                <span className="text-white/78">Weak service clarity</span>
              </div>
              <div className="mt-4 h-2 rounded-full bg-white/8">
                <div className="h-full w-[68%] rounded-full bg-[linear-gradient(90deg,rgba(202,220,238,0.9),rgba(112,142,172,0.58))]" />
              </div>
              <p className="mt-4 text-sm leading-7 text-white/56">
                Clear audit outputs make the next recommendation easier to trust
                and easier to act on.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section
        data-why-section
        className="relative overflow-hidden border-t border-white/8 bg-[linear-gradient(180deg,#030509_0%,#050911_100%)] px-5 py-28 sm:px-8 md:px-10 lg:px-14 lg:py-40 xl:px-20"
      >
        <div className="relative z-20 mx-auto max-w-[1280px]">
          <p
            data-reveal-intro
            data-group="why"
            className="text-[0.68rem] font-medium uppercase tracking-[0.42em] text-white/40 sm:text-[0.72rem]"
          >
            Why Ocia
          </p>
          <h2
            data-reveal-intro
            data-group="why"
            className="mt-6 max-w-4xl text-[2.8rem] font-medium leading-[0.95] tracking-[-0.055em] text-white sm:text-[3.7rem] md:text-[4.75rem]"
          >
            Built differently.
          </h2>
          <p
            data-reveal-intro
            data-group="why"
            className="mt-6 max-w-3xl text-base leading-8 text-white/66 md:text-[1.08rem] md:leading-9"
          >
            We do not sell websites. We build digital systems that help
            businesses look established, convert visitors and remove
            operational bottlenecks.
          </p>

          <div className="mt-18 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {whyOcia.map((item) => (
              <article
                key={item.title}
                data-why-card
                className="rounded-[1.85rem] border border-white/10 bg-white/[0.02] p-7 md:min-h-[280px] md:p-8"
              >
                <span className="text-[0.66rem] uppercase tracking-[0.34em] text-white/32">
                  {item.number}
                </span>
                <h3 className="mt-7 text-[1.45rem] font-medium tracking-[-0.04em] text-white md:text-[1.7rem]">
                  {item.title}
                </h3>
                <p className="mt-5 text-sm leading-7 text-white/58 md:text-[1rem] md:leading-8">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="work"
        data-work-section
        className="relative overflow-hidden border-t border-white/8 bg-[linear-gradient(180deg,#04070d_0%,#060a11_100%)] px-5 py-28 sm:px-8 md:px-10 lg:px-14 lg:py-40 xl:px-20"
      >
        <div className="relative z-20 mx-auto max-w-[1280px]">
          <p
            data-reveal-intro
            data-group="work"
            className="text-[0.68rem] font-medium uppercase tracking-[0.42em] text-white/40 sm:text-[0.72rem]"
          >
            Selected Transformations
          </p>
          <h2
            data-reveal-intro
            data-group="work"
            className="mt-6 max-w-4xl text-[2.8rem] font-medium leading-[0.95] tracking-[-0.055em] text-white sm:text-[3.7rem] md:text-[4.75rem]"
          >
            Proof through better digital experiences.
          </h2>

          <div className="mt-18 space-y-6">
            {transformations.map((item) => (
              <article
                key={item.title}
                data-case-study
                className="grid gap-8 rounded-[2rem] border border-white/10 bg-white/[0.02] p-7 md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] md:p-10"
              >
                <div className="rounded-[1.5rem] bg-[linear-gradient(160deg,rgba(255,255,255,0.06),rgba(255,255,255,0.015))] p-6">
                  <span className="text-[0.66rem] uppercase tracking-[0.34em] text-white/34">
                    Case Study {item.id}
                  </span>
                  <div className="mt-8 rounded-[1.2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.015))] p-4">
                    {item.id === "01" ? (
                      <div className="space-y-4">
                        <div className="rounded-[1rem] border border-white/8 bg-white/[0.04] p-4">
                          <div className="h-20 rounded-[0.9rem] bg-[linear-gradient(135deg,rgba(205,219,233,0.2),rgba(255,255,255,0.02))]" />
                          <div className="mt-4 flex flex-wrap gap-2">
                            {item.visual.map((label) => (
                              <span
                                key={label}
                                className="rounded-full border border-white/10 px-3 py-2 text-[0.64rem] uppercase tracking-[0.24em] text-white/44"
                              >
                                {label}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : item.id === "02" ? (
                      <div className="grid gap-3">
                        {item.visual.map((label, index) => (
                          <div
                            key={label}
                            className="flex items-center justify-between rounded-[0.95rem] border border-white/8 bg-white/[0.04] px-4 py-3 text-sm text-white/58"
                          >
                            <span>{label}</span>
                            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-[0.68rem] text-white/44">
                              {index + 1}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="rounded-[1rem] border border-white/8 bg-white/[0.04] p-4">
                          <div className="flex items-center justify-between text-[0.66rem] uppercase tracking-[0.24em] text-white/34">
                            <span>Launch preview</span>
                            <span>Analytics</span>
                          </div>
                          <div className="mt-4 grid grid-cols-2 gap-3">
                            {item.visual.map((label) => (
                              <div
                                key={label}
                                className="rounded-[0.9rem] border border-white/8 bg-[#0b1118]/88 p-3 text-[0.68rem] uppercase tracking-[0.22em] text-white/46"
                              >
                                {label}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                  <div>
                    <h3 className="text-[1.6rem] font-medium tracking-[-0.045em] text-white md:text-[2rem]">
                      {item.title}
                    </h3>
                    <div className="mt-6 space-y-5 text-sm leading-7 text-white/60 md:text-[1rem] md:leading-8">
                      <p>
                        <span className="mr-2 text-[0.64rem] uppercase tracking-[0.32em] text-white/34">
                          Problem
                        </span>
                        {item.problem}
                      </p>
                      <p>
                        <span className="mr-2 text-[0.64rem] uppercase tracking-[0.32em] text-white/34">
                          Solution
                        </span>
                        {item.solution}
                      </p>
                      <p>
                        <span className="mr-2 text-[0.64rem] uppercase tracking-[0.32em] text-white/34">
                          Result
                        </span>
                        {item.result}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.015] p-6 text-sm leading-7 text-white/54 md:text-[0.98rem] md:leading-8">
                    A polished mockup frame keeps the story client-ready while
                    the live launch assets are still being prepared.
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10">
            <OciaButton href="#final-cta" arrow variant="secondary">
              Discuss a Similar Build
            </OciaButton>
          </div>
        </div>
      </section>

      <section
        id="process"
        data-process-section
        className="relative overflow-hidden border-t border-white/8 bg-[linear-gradient(180deg,#03050a_0%,#070b12_100%)] px-5 py-28 sm:px-8 md:px-10 lg:px-14 lg:py-40 xl:px-20"
      >
        <div className="relative z-20 mx-auto max-w-[1280px]">
          <p
            data-reveal-intro
            data-group="process"
            className="text-[0.68rem] font-medium uppercase tracking-[0.42em] text-white/40 sm:text-[0.72rem]"
          >
            Process
          </p>
          <h2
            data-reveal-intro
            data-group="process"
            className="mt-6 max-w-4xl text-[2.8rem] font-medium leading-[0.95] tracking-[-0.055em] text-white sm:text-[3.7rem] md:text-[4.75rem]"
          >
            From idea to launch, without the chaos.
          </h2>

          <div className="relative mt-18 grid gap-5 lg:grid-cols-5 lg:gap-6">
            <div className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-white/0 via-white/16 to-white/0 lg:block" />
            {processSteps.map((step) => (
              <article
                key={step.title}
                data-process-step
                className="relative rounded-[1.8rem] border border-white/10 bg-[#0a1017]/88 p-7 md:min-h-[260px]"
              >
                <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <span className="relative z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-[#0c141d] text-[0.66rem] uppercase tracking-[0.2em] text-white/38">
                  {step.number}
                </span>
                <h3 className="mt-8 text-[1.3rem] font-medium tracking-[-0.04em] text-white md:text-[1.55rem]">
                  {step.title}
                </h3>
                <p className="mt-5 text-sm leading-7 text-white/58 md:text-[1rem] md:leading-8">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="pricing"
        data-growth-section
        className="relative overflow-hidden border-t border-white/8 bg-[radial-gradient(circle_at_76%_18%,rgba(80,108,138,0.12),transparent_20%),linear-gradient(180deg,#020307_0%,#050810_24%,#04070c_100%)] px-5 py-28 sm:px-8 md:px-10 lg:px-14 lg:py-40 xl:px-20"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black via-black/45 to-transparent" />
          <div className="absolute left-[8%] top-[12%] h-64 w-64 rounded-full bg-[rgba(108,134,164,0.06)] blur-3xl" />
          <div className="absolute right-[10%] bottom-[16%] h-80 w-80 rounded-full bg-[rgba(88,118,150,0.08)] blur-3xl" />
        </div>

        <div className="relative z-20 mx-auto max-w-[1320px]">
          <div className="max-w-3xl">
            <p
              data-reveal-intro
              data-group="growth"
              className="text-[0.68rem] font-medium uppercase tracking-[0.42em] text-white/40 sm:text-[0.72rem]"
            >
              Growth Systems
            </p>
            <h2
              data-reveal-intro
              data-group="growth"
              className="mt-6 max-w-3xl text-[2.8rem] font-medium leading-[0.95] tracking-[-0.055em] text-white sm:text-[3.7rem] md:text-[4.75rem]"
            >
              Choose the system that fits your next stage.
            </h2>
            <p
              data-reveal-intro
              data-group="growth"
              className="mt-6 max-w-2xl text-base leading-8 text-white/66 md:text-[1.08rem] md:leading-9"
            >
              Clear packages for businesses that want a sharper website,
              stronger lead flow and better digital operations.
            </p>
            <div
              data-reveal-intro
              data-group="growth"
              className="mt-8 flex flex-wrap gap-3 text-[0.68rem] uppercase tracking-[0.28em] text-white/54"
            >
              <span className="rounded-full border border-white/10 px-4 py-2">Fixed scope</span>
              <span className="rounded-full border border-white/10 px-4 py-2">Strategy included</span>
              <span className="rounded-full border border-white/10 px-4 py-2">Built for trust</span>
              <span className="rounded-full border border-white/10 px-4 py-2">Launch support</span>
            </div>
          </div>

          <div className="mt-18 grid gap-6 lg:grid-cols-3">
            {growthSystems.map((pkg) => (
              <article
                key={pkg.title}
                data-growth-card
                className={`group relative flex h-full flex-col overflow-hidden rounded-[2rem] border p-6 md:p-8 ${
                  pkg.featured
                    ? "border-[rgba(206,223,240,0.34)] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] shadow-[0_0_0_1px_rgba(206,223,240,0.12),0_24px_80px_rgba(18,32,50,0.28)] lg:-translate-y-3"
                    : "border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.012))]"
                } transition-transform duration-300 hover:-translate-y-1 hover:border-white/20`}
              >
                {pkg.featured ? (
                  <span className="mb-6 inline-flex w-fit rounded-full border border-white/18 bg-white/8 px-3 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.28em] text-white">
                    Most Popular
                  </span>
                ) : null}
                <h3 className="text-[1.55rem] font-medium tracking-[-0.045em] text-white md:text-[1.9rem]">
                  {pkg.title}
                </h3>
                <p className="mt-5 text-3xl font-semibold tracking-[-0.05em] text-white md:text-[2.75rem]">
                  {pkg.price}
                </p>
                <p className="mt-4 text-[0.64rem] uppercase tracking-[0.32em] text-white/34">
                  For
                </p>
                <p className="mt-2 text-sm leading-7 text-white/56">
                  {pkg.forLabel}
                </p>
                <p className="mt-5 text-sm leading-7 text-white/64 md:text-[1rem] md:leading-8">
                  {pkg.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/10 px-3 py-1 text-[0.64rem] uppercase tracking-[0.28em] text-white/52">
                    {pkg.timeline}
                  </span>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-[0.64rem] uppercase tracking-[0.28em] text-white/52">
                    Strategy-led
                  </span>
                </div>
                <div className="mt-7 grid gap-3 border-t border-white/8 pt-6 sm:grid-cols-2">
                  {pkg.includes.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 text-sm leading-6 text-white/58"
                    >
                      <span
                        className={`mt-1.5 h-2 w-2 rounded-full ${
                          pkg.featured ? "bg-[rgba(214,228,242,0.88)]" : "bg-white/28"
                        }`}
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <OciaButton
                    href="#final-cta"
                    variant={pkg.featured ? "primary" : "secondary"}
                    arrow={pkg.featured}
                    className="w-full"
                  >
                    {pkg.cta}
                  </OciaButton>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-[1.7rem] border border-white/10 bg-white/[0.02] px-6 py-6 md:flex md:items-center md:justify-between md:gap-6">
            <p className="text-sm leading-7 text-white/58 md:text-[0.98rem]">
              Not sure which system fits? Start with an audit and we will
              recommend the most practical next step.
            </p>
            <div className="mt-4 md:mt-0">
              <OciaButton href="#final-cta" arrow>
                Find the Right System
              </OciaButton>
            </div>
          </div>
        </div>
      </section>

      <section
        data-proof-section
        className="relative overflow-hidden border-t border-white/8 bg-[linear-gradient(180deg,#03050a_0%,#070b12_100%)] px-5 py-28 sm:px-8 md:px-10 lg:px-14 lg:py-40 xl:px-20"
      >
        <div className="relative z-20 mx-auto max-w-[1280px]">
          <p
            data-reveal-intro
            data-group="proof"
            className="text-[0.68rem] font-medium uppercase tracking-[0.42em] text-white/40 sm:text-[0.72rem]"
          >
            Proof
          </p>
          <h2
            data-reveal-intro
            data-group="proof"
            className="mt-6 max-w-4xl text-[2.8rem] font-medium leading-[0.95] tracking-[-0.055em] text-white sm:text-[3.7rem] md:text-[4.75rem]"
          >
            Built to make trust visible.
          </h2>
          <p
            data-reveal-intro
            data-group="proof"
            className="mt-6 max-w-3xl text-base leading-8 text-white/66 md:text-[1.08rem] md:leading-9"
          >
            We document the problem, strategy, build decisions and outcomes
            behind every project, so clients understand exactly what was
            improved and why it matters.
          </p>

          <div className="mt-18 grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div className="grid gap-5 md:grid-cols-2">
              {proofBlocks.map((item) => (
                <article
                  key={item.title}
                  data-proof-card
                  className="rounded-[1.8rem] border border-white/10 bg-white/[0.02] p-7 md:min-h-[240px]"
                >
                  <h3 className="text-[1.3rem] font-medium tracking-[-0.04em] text-white md:text-[1.55rem]">
                    {item.title}
                  </h3>
                  <p className="mt-5 text-sm leading-7 text-white/58 md:text-[1rem] md:leading-8">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>

            <article
              data-proof-card
              className="rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] p-7 md:p-8"
            >
              <div className="flex items-center justify-between">
                <p className="text-[0.66rem] uppercase tracking-[0.34em] text-white/34">
                  OCIA System Report
                </p>
                <span className="rounded-full border border-white/10 px-3 py-1 text-[0.62rem] uppercase tracking-[0.26em] text-white/44">
                  Live Preview
                </span>
              </div>
              <div className="mt-6 grid gap-4 rounded-[1.35rem] border border-white/8 bg-white/[0.03] p-5 text-sm text-white/60">
                <div className="flex items-center justify-between">
                  <span>Website Audit</span>
                  <span className="text-white/84">78 / 100</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Services recommended</span>
                  <span className="text-white/84">Website, SEO, CRM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Fit scores</span>
                  <span className="text-white/84">70 / 68 / 61</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Pipeline status</span>
                  <span className="text-white/84">Follow-up sent</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Follow-up generated</span>
                  <span className="text-white/84">Queued</span>
                </div>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {["Trust gaps found", "Service fit mapped", "Lead flow clarified", "Automation staged"].map((label) => (
                  <div
                    key={label}
                    className="rounded-[1rem] border border-white/8 bg-[#0b1118]/85 px-4 py-4 text-sm text-white/52"
                  >
                    {label}
                  </div>
                ))}
              </div>
            </article>
          </div>

          <div className="mt-10">
            <OciaButton href="#final-cta" arrow variant="secondary">
              Talk to Us
            </OciaButton>
          </div>
        </div>
      </section>

      <section
        data-faq-section
        className="relative overflow-hidden border-t border-white/8 bg-[linear-gradient(180deg,#04070c_0%,#050810_100%)] px-5 py-28 sm:px-8 md:px-10 lg:px-14 lg:py-40 xl:px-20"
      >
        <div className="relative z-20 mx-auto max-w-[1120px]">
          <p
            data-reveal-intro
            data-group="faq"
            className="text-[0.68rem] font-medium uppercase tracking-[0.42em] text-white/40 sm:text-[0.72rem]"
          >
            FAQ
          </p>
          <h2
            data-reveal-intro
            data-group="faq"
            className="mt-6 max-w-4xl text-[2.8rem] font-medium leading-[0.95] tracking-[-0.055em] text-white sm:text-[3.7rem] md:text-[4.75rem]"
          >
            Questions before we build.
          </h2>

          <div className="mt-14 space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <article
                  key={faq.question}
                  data-faq-item
                  className={`rounded-[1.6rem] border px-6 py-5 transition duration-300 md:px-7 ${
                    isOpen
                      ? "border-[rgba(203,219,234,0.24)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] shadow-[0_10px_30px_rgba(18,32,50,0.14)]"
                      : "border-white/10 bg-white/[0.02] hover:border-white/18 hover:bg-white/[0.03]"
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between gap-4 text-left"
                  >
                    <span className="text-base font-medium tracking-[-0.02em] text-white md:text-[1.1rem]">
                      {faq.question}
                    </span>
                    <span
                      className={`text-white/44 transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"}`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    id={`faq-panel-${index}`}
                    className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pt-5 text-sm leading-7 text-white/60 md:text-[1rem] md:leading-8">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div data-faq-item className="mt-10 flex justify-start">
            <OciaButton href="#final-cta" arrow variant="secondary">
              Talk to Us
            </OciaButton>
          </div>
        </div>
      </section>

      <section
        id="final-cta"
        data-final-section
        className="relative overflow-hidden border-t border-white/8 bg-[radial-gradient(circle_at_50%_18%,rgba(112,142,172,0.16),transparent_20%),linear-gradient(180deg,#020307_0%,#04070c_100%)] px-5 py-28 sm:px-8 md:px-10 lg:px-14 lg:py-40 xl:px-20"
      >
        <div className="pointer-events-none absolute left-1/2 top-12 h-56 w-56 -translate-x-1/2 rounded-full bg-[rgba(206,223,240,0.08)] blur-3xl" />
        <div className="relative z-20 mx-auto max-w-[920px] text-center">
          <p
            data-reveal-intro
            data-group="final"
            className="text-[0.68rem] font-medium uppercase tracking-[0.42em] text-white/40 sm:text-[0.72rem]"
          >
            Start
          </p>
          <h2
            data-final-cta
            className="mt-6 text-[2.9rem] font-medium leading-[0.95] tracking-[-0.055em] text-white sm:text-[3.9rem] md:text-[5rem]"
          >
            Ready to become the business people remember?
          </h2>
          <p
            data-final-cta
            className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/66 md:text-[1.08rem] md:leading-9"
          >
            Let&apos;s build a digital presence that earns trust before you say
            a word.
          </p>
          <div
            data-final-cta
            className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <OciaButton href="#final-cta" arrow>
              Start the Conversation
            </OciaButton>
            <OciaButton href="#pricing" variant="secondary">
              View Growth Systems
            </OciaButton>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/8 bg-[#03060a] px-5 py-10 text-white/56 sm:px-8 md:px-10 lg:px-14 xl:px-20">
        <div className="mx-auto grid max-w-[1320px] gap-10 md:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.42em] text-white/86">
              OCIA Studios
            </p>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/50">
              Premium digital systems for ambitious businesses.
            </p>
          </div>

          <div className="grid gap-3 text-sm md:text-right">
            {footerLinks.map((link) =>
              link.href.startsWith("/") ? (
                <Link key={link.label} href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              ) : (
                <a key={link.label} href={link.href} className="transition hover:text-white">
                  {link.label}
                </a>
              ),
            )}
            <OciaButton href="#final-cta" arrow variant="tertiary">
              Talk to Us
            </OciaButton>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-[1320px] border-t border-white/8 pt-6 text-xs uppercase tracking-[0.24em] text-white/28">
          © {currentYear} OCIA Studios
        </div>
      </footer>
    </main>
  );
}
