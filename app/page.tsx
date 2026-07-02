"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useLayoutEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const navItems = ["Work", "Solutions", "Process", "Pricing", "Contact"];
const heroHints = ["Trust", "Visibility", "Conversion", "Systems"];
const decisionQuestions = [
  "Do you look credible?",
  "Is your offer clear?",
  "Can they trust you?",
  "Is it easy to take action?",
];
const systemPillars = [
  {
    title: "Presence",
    eyebrow: "Make the business look credible.",
    body: "Premium websites and brand direction that help customers trust you faster.",
  },
  {
    title: "Growth",
    eyebrow: "Turn attention into enquiries.",
    body: "SEO, landing pages, lead capture and conversion flows designed to create opportunities.",
  },
  {
    title: "Automation",
    eyebrow: "Follow up faster and operate cleaner.",
    body: "CRM, WhatsApp automation, AI chatbots and enquiry systems that reduce manual work.",
  },
];
const whyOcia = [
  {
    title: "Strategy",
    body: "Every project starts with business goals, not colours.",
  },
  {
    title: "Design",
    body: "Premium experiences that build credibility instantly.",
  },
  {
    title: "Systems",
    body: "Automation and AI that continue working after launch.",
  },
];
const transformations = [
  {
    title: "Professional Services Website",
    problem:
      "The business looked outdated online and enquiries were inconsistent.",
    solution:
      "A clearer website structure, stronger trust signals and improved enquiry flow.",
    result:
      "A sharper digital presence built to convert visitors into qualified leads.",
  },
  {
    title: "Lead System Build",
    problem:
      "Leads were coming in from multiple channels with no clear follow-up process.",
    solution:
      "CRM tracking, WhatsApp enquiry routing and automated follow-up reminders.",
    result: "A cleaner pipeline with fewer missed opportunities.",
  },
  {
    title: "Premium Launch Page",
    problem:
      "The brand needed a memorable launch experience that felt premium.",
    solution:
      "A cinematic landing page with clear messaging, scroll interaction and focused CTAs.",
    result:
      "A stronger first impression for launch traffic and campaign visitors.",
  },
];
const processSteps = [
  {
    title: "Discover",
    body: "We understand your business, audience, goals and current digital gaps.",
  },
  {
    title: "Design",
    body: "We shape the website, messaging and experience around trust and conversion.",
  },
  {
    title: "Build",
    body: "We develop the site, systems and automations with performance and usability in mind.",
  },
  {
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
    timeline: "2-3 weeks",
    cta: "Start with Presence",
    featured: false,
  },
  {
    title: "Growth System",
    price: "From SGD 3,500",
    forLabel: "Businesses that want more enquiries.",
    description:
      "A conversion-focused website and lead system built to help your business get found, trusted and contacted.",
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
    timeline: "3-5 weeks",
    cta: "Build My Growth System",
    featured: true,
  },
  {
    title: "Premium System",
    price: "From SGD 5,800",
    forLabel: "Businesses that need a complete digital ecosystem.",
    description:
      "A more complete system for brands that need stronger automation, trust, conversion and follow-up infrastructure.",
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
    timeline: "5-8 weeks",
    cta: "Discuss Premium System",
    featured: false,
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
      "Most builds take 2–8 weeks depending on scope, content, systems and feedback speed.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Projects usually start from SGD 1,500. Larger growth systems or automation-heavy builds are scoped based on requirements.",
  },
  {
    question: "Will I own the website?",
    answer:
      "Yes. Ownership, access and handover details are made clear before the project starts.",
  },
  {
    question: "Can I update the website myself?",
    answer:
      "Yes. We can build with a CMS or editable structure depending on your needs.",
  },
  {
    question: "Can you help after launch?",
    answer:
      "Yes. Support, optimisation and maintenance can be added depending on the package or scope.",
  },
  {
    question: "Do you only build websites?",
    answer:
      "No. We build websites, lead systems, automation flows and AI-supported digital operations.",
  },
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
      gsap.set("[data-hero-hint]", { y: 10, opacity: 0.24 });
      gsap.set("[data-hero-particles]", { opacity: 0.16 });

      gsap.set("[data-reveal-intro]", { y: 34, opacity: 0 });
      gsap.set("[data-decision-question]", {
        y: 40,
        autoAlpha: 0,
        filter: "blur(8px)",
      });
      gsap.set("[data-decision-final]", { y: 40, autoAlpha: 0, filter: "blur(6px)" });
      gsap.set("[data-system-pillar]", { y: 34, opacity: 0 });
      gsap.set("[data-why-card]", { y: 28, opacity: 0 });
      gsap.set("[data-case-study]", { y: 38, opacity: 0 });
      gsap.set("[data-process-step]", { y: 28, opacity: 0 });
      gsap.set("[data-growth-card]", { y: 38, opacity: 0 });
      gsap.set("[data-proof-card]", { y: 30, opacity: 0 });
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
        opacity: 0.24,
        y: -6,
        duration: 6.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to("[data-hero-hint]", {
        y: -8,
        opacity: 0.46,
        duration: 2.6,
        ease: "sine.inOut",
        stagger: 0.18,
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

      const heroTimeline = gsap.timeline({
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
      });

      heroTimeline
        .to("[data-hero-bg]", { scale: 1.31, y: -96, x: 8, immediateRender: false }, 0)
        .to("[data-hero-mist]", { x: 72, opacity: 0.4, immediateRender: false }, 0)
        .to("[data-hero-shimmer]", { x: -42, opacity: 0.16, immediateRender: false }, 0)
        .to("[data-hero-copy]", { y: -96, opacity: 0, immediateRender: false }, 0.28)
        .to("[data-hero-shadow]", { opacity: 0.62, immediateRender: false }, 0);

      const createReveal = (
        trigger: string,
        target: string,
        options?: { start?: string; end?: string; stagger?: number; scrub?: number | boolean },
      ) => {
        gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger,
            start: options?.start ?? "top 78%",
            end: options?.end ?? "top 28%",
            scrub: options?.scrub ?? 1,
            invalidateOnRefresh: true,
          },
        }).to(target, {
          y: 0,
          opacity: 1,
          stagger: options?.stagger ?? 0.1,
          duration: 0.85,
          immediateRender: false,
        });
      };

      createReveal("[data-solutions-section]", "[data-system-pillar]", { stagger: 0.12 });
      createReveal("[data-why-section]", "[data-why-card]", { stagger: 0.12 });
      createReveal("[data-work-section]", "[data-case-study]", { stagger: 0.12 });
      createReveal("[data-process-section]", "[data-process-step]", { stagger: 0.12 });
      createReveal("[data-growth-section]", "[data-growth-card]", { stagger: 0.12 });
      createReveal("[data-proof-section]", "[data-proof-card]", { stagger: 0.1 });
      createReveal("[data-final-section]", "[data-final-cta]", { stagger: 0.08 });

      createReveal("[data-solutions-section]", "[data-reveal-intro][data-group='solutions']", {
        stagger: 0.08,
      });
      createReveal("[data-why-section]", "[data-reveal-intro][data-group='why']", {
        stagger: 0.08,
      });
      createReveal("[data-work-section]", "[data-reveal-intro][data-group='work']", {
        stagger: 0.08,
      });
      createReveal("[data-process-section]", "[data-reveal-intro][data-group='process']", {
        stagger: 0.08,
      });
      createReveal("[data-growth-section]", "[data-reveal-intro][data-group='growth']", {
        stagger: 0.08,
      });
      createReveal("[data-proof-section]", "[data-reveal-intro][data-group='proof']", {
        stagger: 0.08,
      });
      createReveal("[data-faq-section]", "[data-reveal-intro][data-group='faq']", {
        stagger: 0.08,
      });

      const decisionTimeline = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: "[data-problem-section]",
          start: "top top",
          end: "+=240%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      decisionTimeline
        .to("[data-reveal-intro][data-group='decision']", {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.7,
          immediateRender: false,
        })
        .to(
          "[data-decision-question='0']",
          { y: 0, autoAlpha: 0.9, filter: "blur(0px)", immediateRender: false },
          0.22,
        )
        .to(
          "[data-decision-question='0']",
          { y: -30, autoAlpha: 0, filter: "blur(6px)", immediateRender: false },
          0.4,
        )
        .to(
          "[data-decision-question='1']",
          { y: 0, autoAlpha: 0.9, filter: "blur(0px)", immediateRender: false },
          0.44,
        )
        .to(
          "[data-decision-question='1']",
          { y: -30, autoAlpha: 0, filter: "blur(6px)", immediateRender: false },
          0.62,
        )
        .to(
          "[data-decision-question='2']",
          { y: 0, autoAlpha: 0.9, filter: "blur(0px)", immediateRender: false },
          0.66,
        )
        .to(
          "[data-decision-question='2']",
          { y: -30, autoAlpha: 0, filter: "blur(6px)", immediateRender: false },
          0.84,
        )
        .to(
          "[data-decision-question='3']",
          { y: 0, autoAlpha: 0.9, filter: "blur(0px)", immediateRender: false },
          0.88,
        )
        .to(
          "[data-decision-question='3']",
          { y: -24, autoAlpha: 0, filter: "blur(6px)", immediateRender: false },
          1.06,
        )
        .to(
          "[data-decision-final]",
          { y: 0, autoAlpha: 1, filter: "blur(0px)", immediateRender: false },
          1.1,
        );
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

  return (
    <main ref={pageRef} className="bg-[#05070b] text-white">
      <section ref={heroSectionRef} className="relative h-svh overflow-hidden">
        <div className="relative h-svh overflow-hidden">
          <div className="absolute inset-0 z-0 bg-[#030508]" />

          <img
            src="/assets/ocia/hero-shoreline.png"
            alt="Dark shoreline at dusk"
            data-hero-bg
            className="absolute inset-0 z-10 h-full w-full object-cover object-center will-change-transform"
          />

          <img
            src="/assets/ocia/mist-overlay.png"
            alt=""
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
            className="pointer-events-none absolute left-0 top-0 z-30 hidden h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(210,225,240,0.12)_0%,rgba(126,160,194,0.06)_34%,rgba(126,160,194,0)_72%)] blur-3xl md:block"
          />
          <div
            data-hero-particles
            className="pointer-events-none absolute inset-0 z-30 opacity-[0.16] [background-image:radial-gradient(rgba(235,242,248,0.16)_0.7px,transparent_0.7px)] [background-size:26px_26px]"
          />

          <div className="relative z-40 flex h-full flex-col px-5 pb-10 pt-5 sm:px-8 md:px-10 lg:px-14 lg:pt-7 xl:px-20">
            <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <a
                href="#"
                className="text-[0.72rem] font-medium uppercase tracking-[0.42em] text-white/90 sm:text-xs"
              >
                OCIA Studios
              </a>

              <nav className="flex max-w-full items-center gap-4 overflow-x-auto pb-1 text-[0.62rem] uppercase tracking-[0.22em] whitespace-nowrap text-white/65 [scrollbar-width:none] md:gap-7 md:pb-0 md:text-[0.7rem] md:tracking-[0.24em]">
                {navItems.map((item) => (
                  <a key={item} href="#" className="transition hover:text-white">
                    {item}
                  </a>
                ))}
              </nav>
            </header>

            <div className="flex flex-1 items-center">
              <div
                data-hero-copy
                className="max-w-2xl will-change-transform"
              >
                <p className="mb-5 text-[0.68rem] font-medium uppercase tracking-[0.42em] text-white/55 sm:text-[0.74rem]">
                  Premium digital systems for ambitious businesses
                </p>

                <h1 className="max-w-4xl text-[2.7rem] font-medium leading-[0.96] tracking-[-0.06em] text-white sm:text-[3.8rem] md:text-[5rem] lg:text-[6rem]">
                  Build the business everyone remembers.
                </h1>

                <p className="mt-6 max-w-2xl text-sm leading-7 text-white/72 sm:text-base sm:leading-8 md:mt-7 md:text-lg">
                  Premium websites, automation systems and digital systems
                  engineered to earn trust, generate enquiries and help
                  ambitious businesses grow.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#"
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 bg-white px-6 text-sm font-semibold leading-none tracking-[0.01em] text-[#06101a] transition hover:bg-white/90"
                  >
                    <span className="text-[#06101a]">Start a Project</span>
                  </a>
                  <a
                    href="#"
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/10"
                  >
                    View Work
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-end justify-between text-[0.65rem] uppercase tracking-[0.28em] text-white/38">
              <div className="flex items-center gap-3">
                <span>OCIA System</span>
                <div className="hidden items-center gap-2 md:flex">
                  {heroHints.map((hint) => (
                    <span
                      key={hint}
                      data-hero-hint
                      className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[0.52rem] tracking-[0.28em] text-white/28 backdrop-blur-sm"
                    >
                      {hint}
                    </span>
                  ))}
                </div>
              </div>
              <span className="hidden sm:inline">Scroll to explore</span>
            </div>
          </div>
        </div>
      </section>

      <section
        data-problem-section
        className="relative overflow-hidden border-t border-white/8 bg-[radial-gradient(circle_at_50%_18%,rgba(108,138,166,0.1),transparent_24%),linear-gradient(180deg,#030408_0%,#060910_100%)] px-5 py-0 sm:px-8 md:px-10 lg:px-14 xl:px-20"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_20%,rgba(114,144,178,0.1),transparent_24%),radial-gradient(circle_at_82%_78%,rgba(76,102,132,0.08),transparent_24%)]" />
        <div className="relative mx-auto flex min-h-svh max-w-[1080px] items-center justify-center py-24 sm:py-28 lg:py-32">
          <div className="w-full text-center">
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

            <div className="relative mt-16 min-h-[220px] overflow-hidden md:mt-20 md:min-h-[260px]">
              {decisionQuestions.map((question, index) => (
                <p
                  key={question}
                  data-decision-question={String(index)}
                  className="absolute inset-x-0 top-0 opacity-0 invisible text-[1.55rem] font-medium tracking-[-0.04em] text-white/85 sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem]"
                >
                  {question}
                </p>
              ))}
            </div>

            <p
              data-decision-final
              className="invisible mx-auto mt-14 max-w-3xl opacity-0 text-[1.25rem] font-medium tracking-[-0.03em] text-white sm:text-[1.5rem] md:mt-16 md:text-[1.9rem]"
            >
              If the answer is unclear, the lead is already gone.
            </p>
          </div>
        </div>
      </section>

      <section
        data-solutions-section
        className="relative overflow-hidden border-t border-white/8 bg-[linear-gradient(180deg,#04070c_0%,#060a11_100%)] px-5 py-28 sm:px-8 md:px-10 lg:px-14 lg:py-40 xl:px-20"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_18%,rgba(94,124,154,0.12),transparent_22%),radial-gradient(circle_at_18%_82%,rgba(62,82,108,0.1),transparent_24%)]" />
        <div className="relative mx-auto max-w-[1280px]">
          <p
            data-reveal-intro
            data-group="solutions"
            className="text-[0.68rem] font-medium uppercase tracking-[0.42em] text-white/40 sm:text-[0.72rem]"
          >
            The System
          </p>
          <div className="mt-6 grid gap-12 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-24">
            <div>
              <h2
                data-reveal-intro
                data-group="solutions"
                className="max-w-4xl text-[2.8rem] font-medium leading-[0.95] tracking-[-0.055em] text-white sm:text-[3.7rem] md:text-[4.75rem]"
              >
                We build the system behind the yes.
              </h2>
            </div>
            <p
              data-reveal-intro
              data-group="solutions"
              className="max-w-2xl text-base leading-8 text-white/66 md:text-[1.08rem] md:leading-9"
            >
              OCIA creates the digital pieces that help businesses look
              established, generate enquiries and respond faster, from websites
              and lead flows to automation and AI.
            </p>
          </div>

          <div className="mt-18 grid gap-5 lg:grid-cols-3">
            {systemPillars.map((solution, index) => (
              <article
                key={solution.title}
                data-system-pillar
                className="group rounded-[2rem] border border-white/10 bg-white/[0.022] px-7 py-8 transition hover:border-white/18 hover:bg-white/[0.04] md:min-h-[320px] md:px-8 md:py-9"
              >
                <span className="text-[0.66rem] uppercase tracking-[0.34em] text-white/30">
                  0{index + 1}
                </span>
                <h3 className="mt-8 text-[1.7rem] font-medium tracking-[-0.045em] text-white md:text-[2.2rem]">
                  {solution.title}
                </h3>
                <p className="mt-5 text-[0.7rem] uppercase tracking-[0.34em] text-white/34">
                  {solution.eyebrow}
                </p>
                <p className="mt-6 max-w-2xl text-sm leading-7 text-white/60 md:text-[1rem] md:leading-8">
                  {solution.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        data-why-section
        className="relative overflow-hidden border-t border-white/8 bg-[linear-gradient(180deg,#030509_0%,#050911_100%)] px-5 py-28 sm:px-8 md:px-10 lg:px-14 lg:py-40 xl:px-20"
      >
        <div className="relative mx-auto max-w-[1280px]">
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

          <div className="mt-18 grid gap-5 md:grid-cols-3">
            {whyOcia.map((item, index) => (
              <article
                key={item.title}
                data-why-card
                className="rounded-[1.85rem] border border-white/10 bg-white/[0.02] p-7 md:min-h-[280px] md:p-8"
              >
                <span className="text-[0.66rem] uppercase tracking-[0.34em] text-white/32">
                  0{index + 1}
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
        data-work-section
        className="relative overflow-hidden border-t border-white/8 bg-[linear-gradient(180deg,#04070d_0%,#060a11_100%)] px-5 py-28 sm:px-8 md:px-10 lg:px-14 lg:py-40 xl:px-20"
      >
        <div className="relative mx-auto max-w-[1280px]">
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
            {transformations.map((item, index) => (
              <article
                key={item.title}
                data-case-study
                className="grid gap-8 rounded-[2rem] border border-white/10 bg-white/[0.02] p-7 md:grid-cols-[240px_minmax(0,1.05fr)_minmax(0,0.95fr)] md:p-10"
              >
                <div className="rounded-[1.5rem] bg-[linear-gradient(160deg,rgba(255,255,255,0.06),rgba(255,255,255,0.015))] p-6">
                  <span className="text-[0.66rem] uppercase tracking-[0.34em] text-white/34">
                    Case Study {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="mt-8 h-48 rounded-[1.1rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.015))]" />
                </div>
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
                  Space reserved for project visuals, interface frames or
                  launch screenshots once selected work is ready to publish.
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        data-process-section
        className="relative overflow-hidden border-t border-white/8 bg-[linear-gradient(180deg,#03050a_0%,#070b12_100%)] px-5 py-28 sm:px-8 md:px-10 lg:px-14 lg:py-40 xl:px-20"
      >
        <div className="relative mx-auto max-w-[1280px]">
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

          <div className="relative mt-18 grid gap-5 lg:grid-cols-4 lg:gap-6">
            <div className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-white/0 via-white/16 to-white/0 lg:block" />
            {processSteps.map((step, index) => (
              <article
                key={step.title}
                data-process-step
                className="relative rounded-[1.8rem] border border-white/10 bg-[#0a1017]/88 p-7 md:min-h-[260px]"
              >
                <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <span className="relative z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-[#0c141d] text-[0.66rem] uppercase tracking-[0.2em] text-white/38">
                  0{index + 1}
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
        data-growth-section
        className="relative overflow-hidden border-t border-white/8 bg-[radial-gradient(circle_at_76%_18%,rgba(80,108,138,0.12),transparent_20%),linear-gradient(180deg,#020307_0%,#050810_24%,#04070c_100%)] px-5 py-28 sm:px-8 md:px-10 lg:px-14 lg:py-40 xl:px-20"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black via-black/45 to-transparent" />
          <div className="absolute left-[8%] top-[12%] h-64 w-64 rounded-full bg-[rgba(108,134,164,0.06)] blur-3xl" />
          <div className="absolute right-[10%] bottom-[16%] h-80 w-80 rounded-full bg-[rgba(88,118,150,0.08)] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-[1320px]">
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
              data-package-intro
              className="mt-8 flex flex-wrap gap-3 text-[0.68rem] uppercase tracking-[0.28em] text-white/54"
            >
              <span className="rounded-full border border-white/10 px-4 py-2">
                Fixed scope
              </span>
              <span className="rounded-full border border-white/10 px-4 py-2">
                Built for trust
              </span>
              <span className="rounded-full border border-white/10 px-4 py-2">
                Strategy included
              </span>
            </div>
          </div>

          <div className="mt-18 grid gap-6 lg:mt-20 lg:grid-cols-3">
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
                <a
                  href="#"
                  className={`mt-8 inline-flex min-h-12 items-center justify-center rounded-full border px-5 text-sm font-medium transition ${
                    pkg.featured
                      ? "border-[rgba(214,228,242,0.44)] bg-white text-[#08111b] hover:bg-white/92"
                      : "border-white/14 bg-white/[0.03] text-white hover:bg-white/[0.08]"
                  }`}
                >
                  <span className={pkg.featured ? "text-[#08111b]" : "text-white"}>
                    {pkg.cta}
                  </span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        data-proof-section
        className="relative overflow-hidden border-t border-white/8 bg-[linear-gradient(180deg,#03050a_0%,#070b12_100%)] px-5 py-28 sm:px-8 md:px-10 lg:px-14 lg:py-40 xl:px-20"
      >
        <div className="relative mx-auto max-w-[1280px]">
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

          <div className="mt-18 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
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
        </div>
      </section>

      <section
        data-faq-section
        className="relative overflow-hidden border-t border-white/8 bg-[linear-gradient(180deg,#04070c_0%,#050810_100%)] px-5 py-28 sm:px-8 md:px-10 lg:px-14 lg:py-40 xl:px-20"
      >
        <div className="relative mx-auto max-w-[1120px]">
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
            {faqs.map((faq, index) => (
              <article
                key={faq.question}
                className="rounded-[1.6rem] border border-white/10 bg-white/[0.02] px-6 py-5 md:px-7"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 text-left"
                >
                  <span className="text-base font-medium tracking-[-0.02em] text-white md:text-[1.1rem]">
                    {faq.question}
                  </span>
                  <span className="text-white/44">{openFaq === index ? "−" : "+"}</span>
                </button>
                {openFaq === index ? (
                  <p className="pt-5 text-sm leading-7 text-white/60 md:text-[1rem] md:leading-8">
                    {faq.answer}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        data-final-section
        className="relative overflow-hidden border-t border-white/8 bg-[radial-gradient(circle_at_50%_18%,rgba(112,142,172,0.16),transparent_20%),linear-gradient(180deg,#020307_0%,#04070c_100%)] px-5 py-28 sm:px-8 md:px-10 lg:px-14 lg:py-40 xl:px-20"
      >
        <div className="pointer-events-none absolute left-1/2 top-12 h-56 w-56 -translate-x-1/2 rounded-full bg-[rgba(206,223,240,0.08)] blur-3xl" />
        <div className="relative mx-auto max-w-[920px] text-center">
          <p
            data-final-cta
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
            Let&apos;s build a digital presence that earns trust before you say a
            word.
          </p>
          <div
            data-final-cta
            className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a
              href="#"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 bg-white px-6 text-sm font-semibold text-[#06101a] transition hover:bg-white/92"
            >
              Start a Project
            </a>
            <a
              href="#"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/14 bg-white/[0.03] px-6 text-sm font-medium text-white transition hover:bg-white/[0.08]"
            >
              View Growth Systems
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
