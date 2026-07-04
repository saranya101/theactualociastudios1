"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import ConstellationWhale from "./components/ConstellationWhale";
import OciaButton from "./components/OciaButton";
import SceneSection from "./components/SceneSection";
import { CALENDLY_URL } from "./lib/ocia-links";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/#solutions" },
  { label: "Process", href: "/#process" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contact", href: CALENDLY_URL, external: true },
];

const decisionQuestions = [
  "Do you look established?",
  "Is your offer clear?",
  "Can they trust you?",
  "Is it easy to take action?",
];

const systemPillars = [
  {
    number: "01",
    name: "Land",
    body: "They understand what you do.",
    desktopOffset: "lg:-translate-y-8",
  },
  {
    number: "02",
    name: "Trust",
    body: "The business feels credible.",
    desktopOffset: "lg:translate-y-10",
  },
  {
    number: "03",
    name: "Choose",
    body: "The offer feels clear.",
    desktopOffset: "lg:-translate-y-3",
  },
  {
    number: "04",
    name: "Enquire",
    body: "The next step feels easy.",
    desktopOffset: "lg:translate-y-12",
  },
  {
    number: "05",
    name: "Follow up",
    body: "The lead does not get lost.",
    desktopOffset: "lg:-translate-y-10",
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
    title: "Trust",
    body: "Does your current website make the business feel credible within seconds?",
  },
  {
    title: "Enquiries",
    body: "Is the page guiding visitors clearly towards calling, messaging or booking?",
  },
  {
    title: "Follow-up",
    body: "Are leads tracked and followed up before they lose interest?",
  },
];

const whatWeFix = [
  {
    number: "01",
    title: "Weak first impression",
    body: "Your website does not immediately make the business feel credible, current or professional.",
  },
  {
    number: "02",
    title: "Unclear offer",
    body: "Visitors cannot quickly understand what you do, who it is for and why they should choose you.",
  },
  {
    number: "03",
    title: "Low enquiry conversion",
    body: "People visit, but the page does not guide them clearly towards calling, messaging or booking.",
  },
  {
    number: "04",
    title: "Missed follow-up",
    body: "Leads come in through different channels, but there is no clean system to track, respond and follow up.",
  },
];

const buildPreviews = [
  {
    id: "01",
    title: "Website Trust System",
    description:
      "A premium website structure for businesses that need to look established, explain services clearly and guide visitors toward enquiry.",
    includes: [
      "Service-led page structure",
      "Trust signals",
      "Mobile-first layout",
      "Clear enquiry CTAs",
    ],
    cta: "Build a Credible Website",
    visualType: "website",
  },
  {
    id: "02",
    title: "Lead Flow System",
    description:
      "A cleaner enquiry flow that captures leads from forms, WhatsApp or booking links and keeps them organised.",
    includes: [
      "Enquiry forms",
      "WhatsApp CTA",
      "Lead stages",
      "Follow-up reminders",
    ],
    cta: "Improve My Lead Flow",
    visualType: "pipeline",
  },
  {
    id: "03",
    title: "Automation & AI System",
    description:
      "Automation and AI support that help businesses respond faster, answer common questions and reduce manual follow-up.",
    includes: [
      "WhatsApp automation",
      "AI chatbot",
      "Booking flow",
      "Follow-up workflow",
    ],
    cta: "Explore Automation",
    visualType: "automation",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Discover",
    body: "We understand the business, audience, offer, current website and goals.",
  },
  {
    number: "02",
    title: "Diagnose",
    body: "We identify what is weakening trust, clarity, enquiry flow or follow-up.",
  },
  {
    number: "03",
    title: "Design the system",
    body: "We plan the pages, messaging, CTAs, lead paths and automation touchpoints.",
  },
  {
    number: "04",
    title: "Build & connect",
    body: "We design and develop the website, integrations and workflows.",
  },
  {
    number: "05",
    title: "Launch & refine",
    body: "We test, launch and improve based on real use and business priorities.",
  },
];

const growthSystems = [
  {
    title: "Presence System",
    price: "From SGD 1,500",
    forLabel: "Businesses that need credibility online.",
    description:
      "A focused website build for businesses that need to look professional, explain their offer clearly and give customers an easy way to enquire.",
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
      "A website and lead-generation system designed around clearer messaging, stronger conversion flow, SEO foundations and enquiry capture.",
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
      "A complete digital system with website strategy, CRM, automation, AI support, conversion tracking and launch optimisation.",
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
    title: "Clarity",
    body: "Customers should understand what you do, who you help and why it matters without digging.",
  },
  {
    title: "Credibility",
    body: "Visual quality, structure, proof and messaging should make the business feel established.",
  },
  {
    title: "Conversion",
    body: "Every page should guide visitors toward a clear action: call, message, book or enquire.",
  },
  {
    title: "Continuity",
    body: "After the enquiry, lead tracking and follow-up systems help prevent opportunities from going cold.",
  },
];

const faqs = [
  {
    question: "Do I need a full website or just improvements?",
    answer:
      "It depends on what is currently holding the business back. Some businesses need a full redesign, while others need better messaging, CTAs, SEO or follow-up systems. We usually begin by understanding the gaps first.",
  },
  {
    question: "How long does a project take?",
    answer:
      "Most projects take 2–8 weeks depending on scope, content, approvals and integrations. Smaller presence sites are faster, while CRM, automation or AI systems need more planning and testing.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Packages start from SGD 1,500. Final pricing depends on the number of pages, design complexity, integrations, automations and support required.",
  },
  {
    question: "Can you help with leads, not just design?",
    answer:
      "Yes. OCIA works beyond visual design. We help with landing pages, enquiry flows, SEO foundations, WhatsApp CTAs, CRM tracking, automation and follow-up systems.",
  },
  {
    question: "Will I own the website?",
    answer:
      "Yes. Once the project is completed and payment is settled, you own the agreed final website and deliverables.",
  },
  {
    question: "Can you support us after launch?",
    answer:
      "Yes. We can help with launch checks, improvements, optimisation and ongoing support depending on the package or arrangement.",
  },
];

const footerLinks = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/#solutions" },
  { label: "Process", href: "/#process" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contact", href: CALENDLY_URL, external: true },
];

const sectionRevealTargets = [
  { trigger: "[data-system-section]", intro: "[data-reveal-intro][data-group='system']", body: "[data-system-card]" },
  { trigger: "[data-services-preview-section]", intro: "[data-reveal-intro][data-group='services']", body: "[data-service-group]" },
  { trigger: "[data-audit-section]", intro: "[data-reveal-intro][data-group='audit']", body: "[data-audit-card], [data-audit-visual]" },
  { trigger: "[data-work-section]", intro: "[data-reveal-intro][data-group='work']", body: "[data-build-preview]" },
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
  const [headerScrolled, setHeaderScrolled] = useState(false);

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
      gsap.set("[data-build-preview]", { y: 38, opacity: 0 });
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
        .to("[data-hero-shadow]", { opacity: 0.62, immediateRender: false }, 0);

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
        gsap.set("[data-decision-copy]", { opacity: 1 });
        gsap.set("[data-decision-line]", { scaleX: 0.2, opacity: 0.28, transformOrigin: "left center" });

        gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: "[data-decision-section]",
            start: "top top",
            end: "+=220%",
            pin: "[data-decision-pin]",
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
          .to("[data-reveal-intro][data-group='decision']", {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.7,
            immediateRender: false,
          }, 0)
          .to("[data-decision-copy]", { opacity: 0.78, immediateRender: false }, 0.16)
          .to("[data-decision-progress='0']", { autoAlpha: 0.78, y: 0, immediateRender: false }, 0.16)
          .to("[data-decision-question='0']", { y: 0, autoAlpha: 1, filter: "blur(0px)", immediateRender: false }, 0.16)
          .to("[data-decision-line]", { scaleX: 0.38, opacity: 0.52, immediateRender: false }, 0.16)
          .to("[data-decision-progress='0']", { autoAlpha: 0, y: -10, immediateRender: false }, 0.38)
          .to("[data-decision-question='0']", { y: -20, autoAlpha: 0, filter: "blur(4px)", immediateRender: false }, 0.38)
          .to("[data-decision-progress='1']", { autoAlpha: 0.78, y: 0, immediateRender: false }, 0.46)
          .to("[data-decision-question='1']", { y: 0, autoAlpha: 1, filter: "blur(0px)", immediateRender: false }, 0.46)
          .to("[data-decision-line]", { scaleX: 0.58, opacity: 0.62, immediateRender: false }, 0.46)
          .to("[data-decision-progress='1']", { autoAlpha: 0, y: -10, immediateRender: false }, 0.68)
          .to("[data-decision-question='1']", { y: -20, autoAlpha: 0, filter: "blur(4px)", immediateRender: false }, 0.68)
          .to("[data-decision-progress='2']", { autoAlpha: 0.78, y: 0, immediateRender: false }, 0.76)
          .to("[data-decision-question='2']", { y: 0, autoAlpha: 1, filter: "blur(0px)", immediateRender: false }, 0.76)
          .to("[data-decision-line]", { scaleX: 0.78, opacity: 0.72, immediateRender: false }, 0.76)
          .to("[data-decision-progress='2']", { autoAlpha: 0, y: -10, immediateRender: false }, 0.98)
          .to("[data-decision-question='2']", { y: -20, autoAlpha: 0, filter: "blur(4px)", immediateRender: false }, 0.98)
          .to("[data-decision-progress='3']", { autoAlpha: 0.78, y: 0, immediateRender: false }, 1.06)
          .to("[data-decision-question='3']", { y: 0, autoAlpha: 1, filter: "blur(0px)", immediateRender: false }, 1.06)
          .to("[data-decision-line]", { scaleX: 1, opacity: 0.86, immediateRender: false }, 1.06)
          .to("[data-decision-progress='3']", { autoAlpha: 0, y: -10, immediateRender: false }, 1.28)
          .to("[data-decision-question='3']", { y: -16, autoAlpha: 0, filter: "blur(4px)", immediateRender: false }, 1.28)
          .to("[data-decision-final]", { y: 0, autoAlpha: 1, filter: "blur(0px)", immediateRender: false }, 1.38)
          .to("[data-decision-cta]", { y: 0, autoAlpha: 1, immediateRender: false }, 1.42)
          .to("[data-decision-copy]", { opacity: 1, immediateRender: false }, 1.38);
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
    <div className="ocia-page-atmosphere">
      <div className="ocia-atmosphere-bg" />
      <main ref={pageRef} className="relative z-10 isolate overflow-x-clip bg-transparent text-white">
        <ConstellationWhale />
        <header
        className={`fixed inset-x-0 top-0 z-[90] transition-all duration-500 ${
          headerScrolled
            ? "border-b border-white/10 bg-[rgba(3,6,12,0.72)] shadow-[0_18px_50px_rgba(0,0,0,0.24)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-4 sm:px-8 md:px-10 lg:px-14 xl:px-20">
          <Link
            href="/"
            className="shrink-0 text-[0.72rem] font-medium uppercase tracking-[0.42em] text-white/92 transition hover:text-white sm:text-xs"
          >
            OCIA Studios
          </Link>

          <nav className="flex max-w-full items-center gap-4 overflow-x-auto pb-1 text-[0.62rem] uppercase tracking-[0.24em] whitespace-nowrap text-white/64 [scrollbar-width:none] md:gap-7 md:pb-0 md:text-[0.7rem]">
              {navItems.map((item) =>
              item.href.startsWith("/") ? (
                <Link key={item.label} href={item.href} className="transition duration-300 hover:text-white">
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="transition duration-300 hover:text-white"
                >
                  {item.label}
                </a>
              ),
            )}
          </nav>
        </div>
        </header>

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
            className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_58%_18%,rgba(196,216,236,0.12),transparent_16%),radial-gradient(circle_at_72%_34%,rgba(128,162,198,0.12),transparent_24%),radial-gradient(circle_at_60%_58%,rgba(98,128,160,0.08),transparent_22%)] will-change-transform"
          />
          <div className="absolute inset-0 z-20 bg-[radial-gradient(circle_at_62%_18%,rgba(158,188,218,0.22),transparent_18%),radial-gradient(circle_at_64%_42%,rgba(110,146,182,0.1),transparent_28%),linear-gradient(90deg,rgba(2,4,8,0.74)_0%,rgba(2,4,8,0.56)_24%,rgba(2,4,8,0.18)_50%,rgba(2,4,8,0.12)_68%,rgba(2,4,8,0.42)_100%)]" />
          <div className="absolute inset-0 z-20 bg-[linear-gradient(180deg,rgba(2,5,10,0.18)_0%,rgba(2,5,10,0.02)_34%,rgba(2,5,10,0.08)_64%,rgba(2,5,10,0.3)_100%)]" />
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

          <div className="relative z-40 flex h-full flex-col px-5 pb-10 pt-24 sm:px-8 sm:pt-28 md:px-10 lg:px-14 lg:pt-32 xl:px-20">
            <div className="flex flex-1 items-center">
              <div
                data-hero-copy
                className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.74fr)] lg:gap-18 xl:gap-24"
              >
                <div className="max-w-[760px]">
                  {/* <p className="mb-5 text-[0.68rem] font-medium uppercase tracking-[0.42em] text-white/58 sm:text-[0.74rem]">
                    Premium digital systems for service businesses
                  </p> */}

                  <h1 className="max-w-[760px] text-[3.25rem] font-medium leading-[0.88] tracking-[-0.068em] text-white sm:text-[4.8rem] md:text-[6.15rem] lg:text-[6.75rem] xl:text-[7.4rem]">
                    Be trusted before they enquire.
                  </h1>

                  <p className="mt-6 max-w-[34rem] text-[0.98rem] leading-7 text-white/76 sm:text-[1.02rem] sm:leading-8 md:mt-7 md:text-[1.12rem] md:leading-8">
                    OCIA Studios builds premium websites, lead flows and follow-up
                    systems that help service businesses look credible, explain
                    their value clearly and turn visitors into enquiries.
                  </p>
                </div>

                <div className="lg:flex lg:justify-end">
                  <div className="relative max-w-[520px] pl-0 lg:pl-12">
                    <div className="pointer-events-none absolute left-0 top-1/2 hidden h-[72%] w-px -translate-y-1/2 bg-[linear-gradient(180deg,rgba(214,229,244,0.02),rgba(214,229,244,0.24),rgba(214,229,244,0.02))] lg:block" />

                    <h2 className="max-w-[26rem] text-[1.8rem] font-medium leading-[1.02] tracking-[-0.05em] text-white sm:text-[2rem] md:text-[2.15rem]">
                      Not sure what your business needs yet?
                    </h2>

                    <p className="mt-7 max-w-[28rem] text-[1rem] leading-7 text-white/70 sm:text-[1.04rem] sm:leading-8">
                      Start with a quick conversation and we&apos;ll help identify
                      the right next step for your website, enquiries or follow-up.
                    </p>

                    <div className="mt-9">
                      <OciaButton href={CALENDLY_URL} arrow>
                        Book a Discovery Call
                      </OciaButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </section>

        <SceneSection
        data-decision-section
        tone="night"
        className="border-t border-white/8"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_20%,rgba(114,144,178,0.1),transparent_24%),radial-gradient(circle_at_82%_78%,rgba(76,102,132,0.08),transparent_24%)]" />
        <div
          data-decision-desktop
          className="relative z-20 hidden min-h-[260vh] md:block"
        >
          <div data-decision-pin className="flex h-svh items-center px-5 sm:px-8 md:px-10 lg:px-14 xl:px-20">
            <div data-decision-copy className="mx-auto w-full max-w-[1080px] text-center">
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
                A visitor does not wait until the contact form to judge your
                business. Within seconds, they decide whether you look
                credible, clear and worth trusting.
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

              <div className="mx-auto mt-2 h-px max-w-xl overflow-hidden rounded-full bg-white/8">
                <div
                  data-decision-line
                  className="h-full w-full rounded-full bg-[linear-gradient(90deg,rgba(202,220,238,0.92),rgba(112,142,172,0.62))]"
                />
              </div>

              <div className="mx-auto mt-8 max-w-3xl">
                <p
                  data-decision-final
                  className="invisible text-[1.25rem] font-medium tracking-[-0.03em] text-white opacity-0 sm:text-[1.5rem] md:text-[1.9rem]"
                >
                  If the answer is unclear, the lead is already slipping away.
                </p>

                <div data-decision-cta className="invisible mt-10 flex justify-center opacity-0">
                  <OciaButton href={CALENDLY_URL} arrow>
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
              A visitor does not wait until the contact form to judge your
              business. Within seconds, they decide whether you look
              credible, clear and worth trusting.
            </p>
          </div>
        </div>
        </SceneSection>

      <SceneSection
        id="solutions"
        data-system-section
        tone="night"
        className="border-t border-white/8 px-5 py-28 sm:px-8 md:px-10 lg:px-14 lg:py-44 xl:px-20"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(182,208,232,0.16),transparent_18%),radial-gradient(circle_at_78%_20%,rgba(118,150,184,0.1),transparent_22%),radial-gradient(circle_at_50%_84%,rgba(94,126,156,0.12),transparent_26%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-[26%] h-[44%] bg-[radial-gradient(ellipse_at_center,rgba(216,229,240,0.16),rgba(216,229,240,0)_72%)] blur-3xl" />
        <div className="relative z-20 mx-auto max-w-[1280px]">
            <p
              data-reveal-intro
              data-group="system"
              className="text-[0.68rem] font-medium uppercase tracking-[0.42em] text-white/42 sm:text-[0.72rem]"
            >
            Digital Path
            </p>
          <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] lg:gap-20">
            <div>
              <h2
                data-reveal-intro
                data-group="system"
                className="max-w-4xl text-[2.8rem] font-medium leading-[0.95] tracking-[-0.055em] text-white sm:text-[3.7rem] md:text-[4.75rem]"
              >
                Every enquiry starts before the form.
              </h2>
            </div>
              <p
                data-reveal-intro
                data-group="system"
                className="max-w-2xl text-base leading-8 text-white/66 md:text-[1.08rem] md:leading-9"
              >
              Before someone books a call, they have already judged your
              credibility, clarity, and value. We design that journey
              intentionally.
            </p>
          </div>

          <div className="relative mt-18 rounded-[2.25rem] border border-white/10 bg-[rgba(5,12,20,0.62)] px-6 py-8 shadow-[0_24px_80px_rgba(4,10,18,0.28),0_0_0_1px_rgba(138,168,196,0.05)] backdrop-blur-[18px] sm:px-8 md:px-10 lg:px-12 lg:py-12">
            <div className="pointer-events-none absolute inset-0 rounded-[2.25rem] bg-[radial-gradient(circle_at_16%_20%,rgba(168,194,220,0.08),transparent_20%),radial-gradient(circle_at_80%_18%,rgba(120,150,184,0.1),transparent_18%),radial-gradient(circle_at_52%_84%,rgba(120,150,184,0.08),transparent_26%)]" />
            <div className="pointer-events-none absolute inset-x-[8%] top-[22%] hidden h-20 rounded-full bg-[radial-gradient(circle,rgba(184,204,223,0.08),transparent_64%)] blur-3xl lg:block" />
            <div className="pointer-events-none absolute inset-0 opacity-18 [background-image:linear-gradient(115deg,transparent_0%,rgba(132,160,188,0.06)_46%,transparent_52%),radial-gradient(rgba(162,188,212,0.14)_0.6px,transparent_0.6px)] [background-size:100%_100%,34px_34px]" />

            <div className="relative space-y-6 lg:hidden">
              <div className="pointer-events-none absolute bottom-6 left-5 top-6 w-px bg-[linear-gradient(180deg,rgba(88,111,138,0.08)_0%,rgba(118,147,176,0.44)_18%,rgba(127,160,191,0.72)_50%,rgba(118,147,176,0.44)_82%,rgba(88,111,138,0.08)_100%)] shadow-[0_0_24px_rgba(128,156,184,0.14)]" />
              {systemPillars.map((pillar) => (
                <article
                  key={pillar.number}
                  data-system-card
                  className="group relative ml-8 rounded-[1.7rem] border border-white/10 bg-[rgba(8,18,28,0.62)] px-6 py-6 shadow-[0_18px_42px_rgba(4,10,18,0.22)] backdrop-blur-[18px] transition duration-300 hover:-translate-y-1 hover:border-[rgba(182,208,232,0.24)] hover:shadow-[0_26px_54px_rgba(8,18,30,0.28)]"
                >
                  <span className="pointer-events-none absolute -left-[1.88rem] top-8 h-4 w-4 rounded-full border border-[rgba(160,190,218,0.4)] bg-[rgba(201,218,232,0.18)] shadow-[0_0_0_5px_rgba(160,190,218,0.12),0_0_18px_rgba(160,190,218,0.16)]" />
                  <span className="text-[0.66rem] uppercase tracking-[0.34em] text-white/36">
                    {pillar.number}
                  </span>
                  <h3 className="mt-5 text-[1.35rem] font-medium tracking-[-0.04em] text-white">
                    {pillar.name}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/58">
                    {pillar.body}
                  </p>
                </article>
              ))}
            </div>

            <div className="relative hidden lg:block">
              <svg
                aria-hidden="true"
                viewBox="0 0 1200 340"
                className="pointer-events-none absolute inset-x-0 top-10 h-[340px] w-full"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="signalLine" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(147,176,203,0.08)" />
                    <stop offset="25%" stopColor="rgba(131,160,190,0.34)" />
                    <stop offset="50%" stopColor="rgba(168,198,226,0.52)" />
                    <stop offset="75%" stopColor="rgba(131,160,190,0.34)" />
                    <stop offset="100%" stopColor="rgba(147,176,203,0.08)" />
                  </linearGradient>
                </defs>
                <path
                  d="M 30 195 C 170 95, 280 255, 430 185 S 700 85, 845 175 S 1035 255, 1170 145"
                  fill="none"
                  stroke="url(#signalLine)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M 30 195 C 170 95, 280 255, 430 185 S 700 85, 845 175 S 1035 255, 1170 145"
                  fill="none"
                  stroke="rgba(201,220,238,0.18)"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeDasharray="2 16"
                />
              </svg>

              <div className="pointer-events-none absolute inset-x-0 top-10 h-[340px]">
                {[
                  { left: "6%", top: "49%" },
                  { left: "27%", top: "26%" },
                  { left: "48%", top: "47%" },
                  { left: "69%", top: "21%" },
                  { left: "90%", top: "42%" },
                ].map((node, index) => (
                  <div
                    key={`desktop-node-${index}`}
                    className="absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(160,190,218,0.32)] bg-[rgba(201,218,232,0.18)] shadow-[0_0_0_6px_rgba(160,190,218,0.12),0_0_18px_rgba(144,173,201,0.18)]"
                    style={{ left: node.left, top: node.top }}
                  >
                    <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(220,235,248,0.88)]" />
                  </div>
                ))}
                <div className="absolute left-[15%] top-[18%] h-1.5 w-1.5 rounded-full bg-[rgba(220,235,248,0.54)] shadow-[0_0_12px_rgba(139,166,194,0.18)]" />
                <div className="absolute left-[35%] top-[66%] h-1 w-1 rounded-full bg-[rgba(220,235,248,0.62)] shadow-[0_0_12px_rgba(151,177,200,0.18)]" />
                <div className="absolute left-[58%] top-[12%] h-1.5 w-1.5 rounded-full bg-[rgba(220,235,248,0.52)] shadow-[0_0_12px_rgba(137,164,191,0.18)]" />
                <div className="absolute left-[77%] top-[65%] h-1 w-1 rounded-full bg-[rgba(220,235,248,0.6)] shadow-[0_0_12px_rgba(151,177,200,0.18)]" />
              </div>

            <div className="relative hidden gap-5 lg:grid lg:grid-cols-5 lg:items-start lg:pt-6">
              {systemPillars.map((pillar) => (
                <article
                  key={pillar.number}
                  data-system-card
                  className={`group relative rounded-[1.85rem] border border-white/10 bg-[rgba(8,18,28,0.62)] px-6 py-6 shadow-[0_18px_42px_rgba(4,10,18,0.22)] backdrop-blur-[18px] transition duration-300 hover:-translate-y-1 hover:border-[rgba(182,208,232,0.24)] hover:shadow-[0_28px_58px_rgba(8,18,30,0.28)] ${pillar.desktopOffset ?? ""}`}
                >
                  <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(173,201,226,0.18),transparent)]" />
                  <span className="text-[0.66rem] uppercase tracking-[0.34em] text-white/36">
                    {pillar.number}
                  </span>
                  <h3 className="mt-5 text-[1.4rem] font-medium tracking-[-0.04em] text-white">
                    {pillar.name}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/58">
                    {pillar.body}
                  </p>
                </article>
              ))}
            </div>
            </div>
          </div>

          <div className="mt-14">
            <Link
              href="#services"
              data-system-card
              className="inline-flex items-center gap-3 text-sm font-medium text-white/84 transition hover:text-white"
            >
              <span>Explore what we build</span>
              <span
                aria-hidden="true"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/14 bg-white/[0.05] text-white/72 shadow-[0_10px_20px_rgba(10,20,34,0.16)] transition hover:border-white/22 hover:bg-white/[0.09] hover:text-white"
              >
                →
              </span>
            </Link>
          </div>
        </div>
        </SceneSection>

        <SceneSection
        id="services"
        data-services-preview-section
        tone="night"
        className="border-t border-white/8 px-5 py-30 sm:px-8 md:px-10 lg:px-14 lg:py-44 xl:px-20"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(233,239,245,0.24),transparent)]" />
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
                Services built around the full customer journey.
              </h2>
            </div>
            <p
              data-reveal-intro
              data-group="services"
              className="max-w-2xl text-base leading-8 text-white/66 md:text-[1.08rem] md:leading-9"
            >
              Choose a focused service or combine them into a complete growth
              system.
            </p>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2">
            {servicesPreview.map((group) => (
              <article
                key={group.category}
                data-service-group
                className="group relative rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.018))] p-7 transition duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:rotate-[-0.3deg] hover:border-[rgba(197,216,234,0.28)] hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.065),rgba(255,255,255,0.03))] hover:shadow-[0_22px_60px_rgba(10,20,34,0.18)] md:p-8"
              >
                <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(233,239,245,0.36),transparent)] opacity-0 transition duration-300 group-hover:opacity-100" />
                <h3 className="text-[1.35rem] font-medium tracking-[-0.04em] text-white md:text-[1.6rem]">
                  {group.category}
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-white/64 md:text-[1rem]">
                  {group.outcome}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {group.services.map((service) => (
                    <span
                      key={service}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white/56 transition duration-300 group-hover:border-white/16 group-hover:bg-white/[0.05] group-hover:text-white/72"
                    >
                      {service}
                    </span>
                  ))}
                </div>
                <div className="mt-7">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition group-hover:text-white hover:text-white"
                  >
                    <span>Explore Services</span>
                    <span aria-hidden="true" className="text-white/42 transition duration-300 group-hover:translate-x-0.5 group-hover:text-white/72">
                      →
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10">
            <OciaButton href="/services" arrow variant="secondary">
              Explore All Services
            </OciaButton>
            <div className="mt-4">
              <OciaButton href={CALENDLY_URL} arrow variant="tertiary">
                Talk to Us
              </OciaButton>
            </div>
          </div>
        </div>
        </SceneSection>

        <SceneSection
        data-audit-section
        tone="night"
        className="border-t border-white/8 px-5 py-28 sm:px-8 md:px-10 lg:px-14 lg:py-36 xl:px-20"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(112,142,172,0.12),transparent_24%),radial-gradient(circle_at_20%_76%,rgba(74,98,128,0.1),transparent_28%)]" />
        <div className="relative z-20 mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-20">
          <div>
            <p
              data-reveal-intro
              data-group="audit"
              className="text-[0.68rem] font-medium uppercase tracking-[0.42em] text-white/40 sm:text-[0.72rem]"
          >
              Discovery
            </p>
            <h2
              data-reveal-intro
              data-group="audit"
              className="mt-6 max-w-4xl text-[2.8rem] font-medium leading-[0.95] tracking-[-0.055em] text-white sm:text-[3.7rem] md:text-[4.6rem]"
            >
              Start with clarity before you commit.
            </h2>
            <p
              data-reveal-intro
              data-group="audit"
              className="mt-6 max-w-2xl text-base leading-8 text-white/66 md:text-[1.08rem] md:leading-9"
            >
              In a discovery call, we look at your current website, offer,
              enquiry flow and follow-up process. Then we recommend the most
              practical next step — whether that is a website review, redesign,
              automation workflow or complete growth system.
            </p>

            <div className="mt-10 space-y-4">
              {auditGaps.map((gap) => (
                <article
                  key={gap.title}
                  data-audit-card
                  className="rounded-[1.7rem] border border-white/12 bg-[rgba(8,18,28,0.48)] p-6 backdrop-blur-[18px]"
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
              <OciaButton href={CALENDLY_URL} arrow>
                Get a Recommendation
              </OciaButton>
            </div>
            <div data-audit-card className="mt-4">
              <OciaButton href={CALENDLY_URL} variant="secondary">
                Request a Website Review
              </OciaButton>
            </div>
          </div>

          <article
            data-audit-visual
            className="rounded-[2rem] border border-white/12 bg-[rgba(8,18,28,0.48)] p-6 shadow-[0_18px_70px_rgba(4,10,18,0.22)] backdrop-blur-[18px] md:p-8"
          >
            <div className="flex items-center justify-between">
              <p className="text-[0.66rem] uppercase tracking-[0.34em] text-white/34">
                Discovery Review
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
        </SceneSection>

        <SceneSection
        id="work"
        data-work-section
        tone="night"
        className="border-t border-white/8 px-5 py-28 sm:px-8 md:px-10 lg:px-14 lg:py-40 xl:px-20"
      >
        <div className="relative z-20 mx-auto max-w-[1280px]">
          <p
            data-reveal-intro
            data-group="work"
            className="text-[0.68rem] font-medium uppercase tracking-[0.42em] text-white/40 sm:text-[0.72rem]"
          >
            Work Systems
          </p>
          <h2
            data-reveal-intro
            data-group="work"
            className="mt-6 max-w-4xl text-[2.8rem] font-medium leading-[0.95] tracking-[-0.055em] text-white sm:text-[3.7rem] md:text-[4.75rem]"
          >
            Three ways we turn websites into business systems.
          </h2>
          <p
            data-reveal-intro
            data-group="work"
            className="mt-6 max-w-3xl text-base leading-8 text-white/66 md:text-[1.08rem] md:leading-9"
          >
            OCIA combines website design, lead capture and follow-up workflows
            into practical systems that help service businesses look sharper and
            respond faster.
          </p>

          <div className="mt-18 space-y-8">
            {buildPreviews.map((item, index) => (
              <article
                key={item.title}
                data-build-preview
                className={`grid items-center gap-8 rounded-[2rem] border border-white/12 bg-[rgba(8,18,28,0.48)] p-7 shadow-[0_18px_60px_rgba(4,12,22,0.14)] backdrop-blur-[18px] md:p-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] ${
                  index % 2 === 1 ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""
                }`}
              >
                <div className="rounded-[1.7rem] border border-white/8 bg-[#0a1017]/88 p-5 md:p-6">
                  {item.visualType === "website" ? (
                    <div className="space-y-4">
                      <div className="rounded-[1.2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-4">
                        <div className="flex items-center gap-2 border-b border-white/8 pb-3">
                          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                          <span className="h-2.5 w-2.5 rounded-full bg-white/14" />
                          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                        </div>
                        <div className="mt-4 overflow-hidden rounded-[1rem] border border-white/8 bg-[linear-gradient(180deg,rgba(13,18,28,0.96),rgba(9,13,20,0.96))]">
                          <div className="h-32 bg-[radial-gradient(circle_at_70%_18%,rgba(225,234,244,0.18),transparent_22%),linear-gradient(135deg,rgba(20,27,40,0.92),rgba(10,14,22,0.92))]" />
                          <div className="border-t border-white/8 px-5 py-4">
                            <div className="h-3 w-40 rounded-full bg-white/12" />
                            <div className="mt-3 h-2 w-full rounded-full bg-white/6" />
                            <div className="mt-2 h-2 w-[72%] rounded-full bg-white/6" />
                          </div>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-3">
                          {["Hero clarity", "Trust sections", "Mobile CTA", "Enquiry flow"].map((label) => (
                            <div key={label} className="rounded-[0.95rem] border border-white/8 bg-white/[0.04] px-4 py-3 text-[0.72rem] uppercase tracking-[0.22em] text-white/52">
                              {label}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : item.visualType === "pipeline" ? (
                    <div className="rounded-[1.25rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.025))] p-4">
                      <div className="grid grid-cols-4 gap-3">
                        {["New enquiry", "Qualified", "Follow-up", "Replied"].map((stage, stageIndex) => (
                          <div key={stage} className="rounded-[1rem] border border-white/8 bg-[#0d131c]/88 p-3">
                            <div className="flex items-center justify-between">
                              <span className="text-[0.62rem] uppercase tracking-[0.22em] text-white/34">
                                0{stageIndex + 1}
                              </span>
                              <span className="h-2.5 w-2.5 rounded-full bg-[rgba(214,228,242,0.6)]" />
                            </div>
                            <p className="mt-8 text-sm font-medium tracking-[-0.02em] text-white/76">
                              {stage}
                            </p>
                            <div className="mt-4 space-y-2">
                              <div className="h-2 rounded-full bg-white/8" />
                              <div className="h-2 w-[74%] rounded-full bg-white/8" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="rounded-[1rem] border border-white/8 bg-white/[0.04] p-4">
                        <div className="flex items-center justify-between text-[0.66rem] uppercase tracking-[0.24em] text-white/34">
                          <span>Automation</span>
                          <span>AI support</span>
                        </div>
                        <div className="mt-5 space-y-4">
                          {[
                            ["Website enquiry", "WhatsApp routing"],
                            ["AI chatbot", "Booking flow"],
                            ["Follow-up workflow", "Reply tracking"],
                          ].map(([from, to]) => (
                            <div key={from} className="rounded-[0.95rem] border border-white/8 bg-[#0d131c]/76 px-4 py-3">
                              <div className="flex items-center justify-between gap-4 text-sm text-white/62">
                                <span>{from}</span>
                                <span className="text-white/34">→</span>
                                <span>{to}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <span className="text-[0.66rem] uppercase tracking-[0.34em] text-white/32">
                    0{index + 1}
                  </span>
                  <h3 className="mt-6 text-[2rem] font-medium tracking-[-0.045em] text-white md:text-[2.6rem]">
                    {item.title}
                  </h3>
                  <p className="mt-5 max-w-2xl text-sm leading-7 text-white/60 md:text-[1rem] md:leading-8">
                    {item.description}
                  </p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {item.includes.map((label) => (
                      <div key={label} className="rounded-[1rem] border border-white/8 bg-white/[0.03] px-4 py-4 text-sm text-white/58">
                        {label}
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <OciaButton href={CALENDLY_URL} arrow variant="secondary">
                      {item.cta}
                    </OciaButton>
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
        </SceneSection>

        <SceneSection
        id="process"
        data-process-section
        tone="night"
        className="border-t border-white/8 px-5 py-30 sm:px-8 md:px-10 lg:px-14 lg:py-44 xl:px-20"
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
            A clear path from first conversation to launch.
          </h2>
          <p
            data-reveal-intro
            data-group="process"
            className="mt-6 max-w-3xl text-base leading-8 text-white/66 md:text-[1.08rem] md:leading-9"
          >
            A structured process keeps the project focused, practical and easy
            to move through.
          </p>

          <div className="relative mt-18 grid gap-4 lg:grid-cols-5 lg:gap-4">
            <div className="pointer-events-none absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-white/0 via-white/22 to-white/0 lg:block" />
            {processSteps.map((step) => (
              <article
                key={step.title}
                data-process-step
                className="relative rounded-[1.45rem] border border-white/12 bg-[rgba(8,18,28,0.48)] p-5 backdrop-blur-[18px] transition duration-300 hover:-translate-y-1 hover:border-[rgba(197,216,234,0.24)] hover:bg-[rgba(8,18,28,0.56)] lg:min-h-[235px]"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-[#0c141d] text-[0.66rem] uppercase tracking-[0.2em] text-white/38">
                  {step.number}
                </span>
                <div className="mt-6">
                  <span className="text-[2.9rem] font-medium leading-none tracking-[-0.06em] text-white/16">
                    {step.number}
                  </span>
                  <h3 className="mt-5 text-[1.25rem] font-medium tracking-[-0.04em] text-white md:text-[1.5rem]">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/58 md:text-[0.98rem] md:leading-8">
                    {step.body}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10">
            <OciaButton href={CALENDLY_URL} arrow variant="secondary">
              Talk Through Your Project
            </OciaButton>
          </div>
        </div>
        </SceneSection>

      <SceneSection
        id="pricing"
        data-growth-section
        tone="night"
        className="border-t border-white/8 px-5 py-28 sm:px-8 md:px-10 lg:px-14 lg:py-40 xl:px-20"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[rgba(10,18,28,0.3)] via-[rgba(10,18,28,0.1)] to-transparent" />
          <div className="absolute left-[8%] top-[12%] h-64 w-64 rounded-full bg-[rgba(108,134,164,0.1)] blur-3xl" />
          <div className="absolute right-[10%] bottom-[16%] h-80 w-80 rounded-full bg-[rgba(158,188,218,0.08)] blur-3xl" />
        </div>

        <div className="relative z-20 mx-auto max-w-[1320px]">
          <div className="max-w-3xl">
            <p
              data-reveal-intro
              data-group="growth"
              className="text-[0.68rem] font-medium uppercase tracking-[0.42em] text-white/42 sm:text-[0.72rem]"
            >
              Growth Systems
            </p>
            <h2
              data-reveal-intro
              data-group="growth"
              className="mt-6 max-w-3xl text-[2.8rem] font-medium leading-[0.95] tracking-[-0.055em] text-white sm:text-[3.7rem] md:text-[4.75rem]"
            >
              Choose the right starting point for your business.
            </h2>
            <p
              data-reveal-intro
              data-group="growth"
              className="mt-6 max-w-2xl text-base leading-8 text-white/68 md:text-[1.08rem] md:leading-9"
            >
              Start small with a credible website, or build a complete system
              for enquiries, automation and follow-up.
            </p>
            <div
              data-reveal-intro
              data-group="growth"
              className="mt-8 flex flex-wrap gap-3 text-[0.68rem] uppercase tracking-[0.28em] text-white/54"
            >
              <span className="rounded-full border border-white/12 bg-white/[0.04] px-4 py-2">Fixed scope</span>
              <span className="rounded-full border border-white/12 bg-white/[0.04] px-4 py-2">Strategy included</span>
              <span className="rounded-full border border-white/12 bg-white/[0.04] px-4 py-2">Built for trust</span>
              <span className="rounded-full border border-white/12 bg-white/[0.04] px-4 py-2">Launch support</span>
            </div>
          </div>

          <div className="mt-18 grid gap-6 lg:grid-cols-3">
            {growthSystems.map((pkg) => (
              <article
                key={pkg.title}
                data-growth-card
                className={`group relative flex h-full flex-col overflow-hidden rounded-[2rem] border p-6 md:p-8 ${
                  pkg.featured
                    ? "border-[rgba(184,206,228,0.28)] bg-[rgba(9,18,28,0.72)] shadow-[0_24px_80px_rgba(4,10,18,0.32),0_0_0_1px_rgba(184,206,228,0.08)] backdrop-blur-[18px] lg:-translate-y-3"
                    : "border-white/10 bg-[rgba(5,12,20,0.62)] shadow-[0_24px_80px_rgba(4,10,18,0.24)] backdrop-blur-[18px]"
                } transition-transform duration-300 hover:-translate-y-1 hover:border-[rgba(158,180,198,0.32)]`}
              >
                {pkg.featured ? (
                  <span className="mb-6 inline-flex w-fit rounded-full border border-[rgba(184,206,228,0.26)] bg-[rgba(184,206,228,0.08)] px-3 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.28em] text-[rgba(218,232,244,0.9)]">
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
                  <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[0.64rem] uppercase tracking-[0.28em] text-white/54">
                    {pkg.timeline}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[0.64rem] uppercase tracking-[0.28em] text-white/54">
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
                    href={CALENDLY_URL}
                    variant="primary"
                    arrow
                    className="w-full"
                  >
                    {pkg.cta}
                  </OciaButton>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-[1.7rem] border border-white/12 bg-[linear-gradient(180deg,rgba(8,18,28,0.66),rgba(8,18,28,0.52))] px-6 py-6 shadow-[0_18px_44px_rgba(3,10,18,0.2)] backdrop-blur-[16px] md:flex md:items-center md:justify-between md:gap-6">
            <p className="text-sm leading-7 text-white/62 md:text-[0.98rem]">
              Not sure where to start?
            </p>
            <div className="mt-4 md:mt-0">
              <OciaButton href={CALENDLY_URL} arrow variant="secondary">
                Get a Recommendation
              </OciaButton>
            </div>
          </div>
        </div>
        </SceneSection>

      <SceneSection
        data-proof-section
        tone="night"
        className="border-t border-white/8 px-5 py-30 sm:px-8 md:px-10 lg:px-14 lg:py-44 xl:px-20"
      >
        <div className="relative z-20 mx-auto max-w-[1280px]">
          <p
            data-reveal-intro
            data-group="proof"
            className="text-[0.68rem] font-medium uppercase tracking-[0.42em] text-white/40 sm:text-[0.72rem]"
          >
            Why Ocia
          </p>
          <h2
            data-reveal-intro
            data-group="proof"
            className="mt-6 max-w-4xl text-[2.8rem] font-medium leading-[0.95] tracking-[-0.055em] text-white sm:text-[3.7rem] md:text-[4.75rem]"
          >
            Not just a nicer website. A clearer path to enquiry.
          </h2>
          <p
            data-reveal-intro
            data-group="proof"
            className="mt-6 max-w-3xl text-base leading-8 text-white/66 md:text-[1.08rem] md:leading-9"
          >
            Most websites stop at looking good. OCIA focuses on what happens
            before and after the visitor lands: what they understand, what they
            trust, what they click and how the business follows up.
          </p>

          <div className="mt-18 grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
            <div data-proof-card className="lg:pt-2">
              <p className="text-[2.2rem] font-medium leading-[1.02] tracking-[-0.06em] text-white sm:text-[3rem] md:text-[3.7rem]">
                Trust → Clarity → Enquiry → Follow-up
              </p>
            </div>
            <div className="space-y-2 border-t border-white/8 lg:border-t-0">
              {proofBlocks.map((item, index) => (
                <article
                  key={item.title}
                  data-proof-card
                  className="grid gap-5 border-b border-white/8 py-6 transition duration-300 hover:border-white/16 md:grid-cols-[90px_minmax(0,1fr)] md:gap-8"
                >
                  <span className="text-[0.72rem] uppercase tracking-[0.36em] text-white/28">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-[1.25rem] font-medium tracking-[-0.04em] text-white md:text-[1.45rem]">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-white/58 md:text-[0.98rem] md:leading-8">
                      {item.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <OciaButton href={CALENDLY_URL} arrow variant="secondary">
              See What We Can Improve
            </OciaButton>
          </div>
        </div>
      </SceneSection>

      <SceneSection
        data-faq-section
        tone="night"
        className="border-t border-white/8 px-5 py-28 sm:px-8 md:px-10 lg:px-14 lg:py-40 xl:px-20"
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
                      ? "border-white/16 bg-[rgba(8,18,28,0.58)] shadow-[0_10px_30px_rgba(18,32,50,0.18)] backdrop-blur-[18px]"
                      : "border-white/10 bg-[rgba(8,18,28,0.46)] backdrop-blur-[18px] hover:border-white/18 hover:bg-[rgba(8,18,28,0.56)]"
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
            <OciaButton href={CALENDLY_URL} arrow variant="secondary">
              Talk Through Your Project
            </OciaButton>
          </div>
        </div>
      </SceneSection>

      <SceneSection
        id="final-cta"
        data-final-section
        tone="night"
        className="border-t border-white/8 px-5 py-28 sm:px-8 md:px-10 lg:px-14 lg:py-40 xl:px-20"
      >
        <div className="pointer-events-none absolute inset-x-0 -top-12 h-24 bg-[linear-gradient(180deg,rgba(120,152,184,0.05),rgba(120,152,184,0))] blur-3xl" />
        <div className="pointer-events-none absolute left-1/2 top-14 h-64 w-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(164,190,214,0.1),rgba(164,190,214,0.03)_42%,transparent_74%)] blur-3xl" />
        <div className="pointer-events-none absolute inset-x-[16%] bottom-0 h-36 bg-[radial-gradient(ellipse_at_center,rgba(214,228,240,0.08),rgba(214,228,240,0)_70%)] blur-3xl" />
        <div className="relative z-20 mx-auto max-w-[920px] text-center">
          <p
            data-reveal-intro
            data-group="final"
            className="text-[0.68rem] font-medium uppercase tracking-[0.42em] text-white/42 sm:text-[0.72rem]"
          >
            Start
          </p>
          <h2
            data-final-cta
            className="mt-6 text-[2.9rem] font-medium leading-[0.95] tracking-[-0.055em] text-white sm:text-[3.9rem] md:text-[5rem]"
          >
            Let&apos;s find the system your business needs next.
          </h2>
          <p
            data-final-cta
            className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/66 md:text-[1.08rem] md:leading-9"
          >
            Tell us where your business is now. We&apos;ll help identify whether
            your next step should be a website review, redesign, automation
            workflow or complete growth system.
          </p>
          <div
            data-final-cta
            className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <OciaButton href={CALENDLY_URL} arrow>
              Start the Conversation
            </OciaButton>
            <OciaButton href="/#pricing" variant="secondary">
              View Growth Systems
            </OciaButton>
          </div>
        </div>
        </SceneSection>

        <footer className="border-t border-white/8 bg-[linear-gradient(180deg,rgba(5,10,17,0.68),rgba(6,12,20,0.88))] px-5 py-10 text-white/56 sm:px-8 md:px-10 lg:px-14 xl:px-20">
        <div className="mx-auto grid max-w-[1320px] gap-10 md:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.42em] text-white">
              OCIA Studios
            </p>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/56">
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
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-white"
                >
                  {link.label}
                </a>
              ),
            )}
            <OciaButton href={CALENDLY_URL} arrow variant="tertiary">
              Talk to Us
            </OciaButton>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-[1320px] border-t border-white/8 pt-6 text-xs uppercase tracking-[0.24em] text-white/38">
          © {currentYear} OCIA Studios
        </div>
        </footer>
      </main>
    </div>
  );
}
