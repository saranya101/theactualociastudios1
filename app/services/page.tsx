import Link from "next/link";
import OciaButton from "../components/OciaButton";

const serviceCategories = [
  {
    title: "Website & Brand Systems",
    outcome:
      "Sharpen your first impression so visitors understand the business faster and trust it sooner.",
    items: [
      {
        name: "Website Redesign",
        description:
          "Improve UX, layout, messaging, visual hierarchy, mobile responsiveness, trust and credibility.",
        bestFor: "Outdated sites, unclear offers, low enquiries.",
        outcome: "Stronger first impression and clearer enquiry flow.",
      },
      {
        name: "Branding & Positioning",
        description:
          "Clarify value proposition, differentiation, audience, offer and credibility.",
        bestFor: "Businesses that look inconsistent or hard to explain.",
        outcome: "A more premium identity with clearer market positioning.",
      },
      {
        name: "UX / Visual Hierarchy",
        description:
          "Structure pages so customers understand the business faster and know what action to take.",
        bestFor: "Crowded pages, confused user journeys, weak CTAs.",
        outcome: "Cleaner page flow and easier decision-making.",
      },
      {
        name: "Mobile Responsiveness",
        description:
          "Ensure the website works cleanly across phones, tablets and desktops.",
        bestFor: "Sites that feel broken or cramped on mobile.",
        outcome: "A smoother mobile experience that protects conversions.",
      },
    ],
  },
  {
    title: "Growth & Visibility Systems",
    outcome:
      "Bring in better attention and help more high-intent visitors turn into enquiries.",
    items: [
      {
        name: "SEO",
        description:
          "Improve search visibility through metadata, headings, content structure, local SEO, indexability and keyword targeting.",
        bestFor: "Businesses with low search visibility or weak organic reach.",
        outcome: "Stronger discoverability and better qualified traffic.",
      },
      {
        name: "Google Business Profile Optimisation",
        description:
          "Improve local search visibility, reviews, business information, service categories and local trust.",
        bestFor: "Local businesses competing in map and local search results.",
        outcome: "More trust and more visibility in local intent searches.",
      },
      {
        name: "Conversion Rate Optimisation",
        description:
          "Improve CTA clarity, enquiry flow, lead capture, forms, trust signals and friction reduction.",
        bestFor: "Sites with traffic but too few leads.",
        outcome: "More enquiries from the traffic you already have.",
      },
      {
        name: "Lead Generation",
        description:
          "Build landing pages, enquiry forms, lead magnets, WhatsApp CTAs, tracking and follow-up flows.",
        bestFor: "Campaigns, local services and businesses that need more consistent demand.",
        outcome: "A stronger enquiry engine from click to contact.",
      },
    ],
  },
  {
    title: "Automation & Operations Systems",
    outcome:
      "Reduce manual follow-up and build a cleaner way to respond, track and convert leads.",
    items: [
      {
        name: "WhatsApp / Enquiry Automation",
        description:
          "Set up auto-replies, lead qualification, appointment routing, response speed and enquiry handling.",
        bestFor: "Businesses handling many enquiries manually.",
        outcome: "Faster replies and fewer missed conversations.",
      },
      {
        name: "CRM / Lead Management",
        description:
          "Improve lead tracking, pipeline visibility, follow-up reminders, status tracking and lost-lead prevention.",
        bestFor: "Teams with scattered leads or unclear follow-up ownership.",
        outcome: "A cleaner sales pipeline with better visibility.",
      },
      {
        name: "Appointment Booking System",
        description:
          "Add online booking, calendar integration, reminders, no-show reduction and appointment management.",
        bestFor: "Clinics, consultants, education providers and service businesses.",
        outcome: "Less admin and a smoother booking experience.",
      },
      {
        name: "Automated Follow-up Systems",
        description:
          "Create structured follow-up flows so fewer enquiries are forgotten.",
        bestFor: "Businesses that lose momentum after the first contact.",
        outcome: "More consistent follow-up and warmer leads.",
      },
    ],
  },
  {
    title: "AI & Intelligence Systems",
    outcome:
      "Use practical AI to support visibility, reduce manual work and improve response quality.",
    items: [
      {
        name: "AI Chatbot",
        description:
          "Support FAQ handling, lead qualification, appointment support and 24/7 enquiry response.",
        bestFor: "Businesses that need round-the-clock response support.",
        outcome: "Quicker answers and better lead capture coverage.",
      },
      {
        name: "Website Audit Reports",
        description:
          "Analyse trust, SEO, conversion, layout and user journey gaps in a structured report.",
        bestFor: "Businesses unsure what to improve first.",
        outcome: "Clear next steps grounded in real digital gaps.",
      },
      {
        name: "Service Recommendation Engine",
        description:
          "Match business needs to suitable services based on audit scores and opportunity profile.",
        bestFor: "Agencies or teams that need clearer service matching.",
        outcome: "More confident recommendations and faster decision-making.",
      },
      {
        name: "E-commerce Improvement",
        description:
          "Improve product pages, checkout friction, abandoned carts, product trust and purchase flow.",
        bestFor: "Shops with traffic but weak conversion performance.",
        outcome: "A smoother path from product view to purchase.",
      },
      {
        name: "Social Media Content Support",
        description:
          "Support content strategy, trust-building posts, educational content, testimonials and service awareness.",
        bestFor: "Brands that need more consistency across social channels.",
        outcome: "Stronger trust signals beyond the website itself.",
      },
    ],
  },
];

const serviceJourney = [
  "Discover",
  "Understand",
  "Trust",
  "Enquire",
  "Track",
  "Follow up",
  "Convert",
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#030509_0%,#060a10_100%)] text-white">
      <section className="relative overflow-hidden border-b border-white/8 px-5 py-24 sm:px-8 md:px-10 lg:px-14 lg:py-32 xl:px-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(98,128,158,0.14),transparent_24%),radial-gradient(circle_at_18%_82%,rgba(70,94,122,0.1),transparent_28%)]" />
        <div className="relative mx-auto max-w-[1280px]">
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.42em] text-white/40 sm:text-[0.72rem]">
            Services
          </p>
          <div className="mt-6 grid gap-12 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-24">
            <div>
              <h1 className="max-w-4xl text-[2.9rem] font-medium leading-[0.95] tracking-[-0.055em] text-white sm:text-[4rem] md:text-[5rem]">
                Digital services for trust, enquiries and follow-up.
              </h1>
            </div>
            <div>
              <p className="max-w-2xl text-base leading-8 text-white/66 md:text-[1.08rem] md:leading-9">
                OCIA improves the full digital journey: how customers find
                you, understand you, enquire with you and get followed up
                after they show interest.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <OciaButton href="/#final-cta" arrow>
                  Get a Recommendation
                </OciaButton>
                <OciaButton href="/#pricing" variant="secondary">
                  View Growth Systems
                </OciaButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sticky top-0 z-20 border-y border-white/8 bg-[#060a10]/88 px-5 py-4 backdrop-blur-xl sm:px-8 md:px-10 lg:px-14 xl:px-20">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/54">
            Start with clarity, then build the right system.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <OciaButton href="/#final-cta" arrow className="sm:min-w-[180px]">
              Get a Recommendation
            </OciaButton>
            <OciaButton href="/#pricing" variant="secondary" className="sm:min-w-[180px]">
              View Packages
            </OciaButton>
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 md:px-10 lg:px-14 lg:py-32 xl:px-20">
        <div className="mx-auto max-w-[1320px] space-y-10">
          {serviceCategories.map((category) => (
            <div
              key={category.title}
              className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-7 md:p-9"
            >
              <div className="grid gap-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-start">
                <div>
                  <h2 className="text-[1.65rem] font-medium tracking-[-0.04em] text-white md:text-[2rem]">
                    {category.title}
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-white/58 md:text-[0.98rem]">
                    {category.outcome}
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {category.items.map((item) => (
                    <article
                      key={item.name}
                      className="rounded-[1.4rem] border border-white/8 bg-white/[0.02] p-5"
                    >
                      <h3 className="text-[1.05rem] font-medium text-white">
                        {item.name}
                      </h3>
                      <div className="mt-4">
                        <p className="text-[0.62rem] uppercase tracking-[0.28em] text-white/32">
                          What it fixes
                        </p>
                        <p className="mt-2 text-sm leading-7 text-white/58 md:text-[0.98rem]">
                          {item.description}
                        </p>
                      </div>
                      <div className="mt-5 border-t border-white/8 pt-4">
                        <p className="text-[0.62rem] uppercase tracking-[0.28em] text-white/32">
                          Best for
                        </p>
                        <p className="mt-2 text-sm leading-6 text-white/54">
                          {item.bestFor}
                        </p>
                      </div>
                      <div className="mt-4">
                        <p className="text-[0.62rem] uppercase tracking-[0.28em] text-white/32">
                          Outcome
                        </p>
                        <p className="mt-2 text-sm leading-6 text-white/72">
                          {item.outcome}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
              <div className="mt-8">
                <OciaButton href="/#final-cta" arrow variant="secondary">
                  Get a Recommendation
                </OciaButton>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-white/8 px-5 py-24 sm:px-8 md:px-10 lg:px-14 lg:py-32 xl:px-20">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="max-w-3xl text-[2.5rem] font-medium leading-[0.96] tracking-[-0.05em] text-white sm:text-[3.5rem] md:text-[4.2rem]">
            Not separate services. One connected customer journey.
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/66 md:text-[1.08rem] md:leading-9">
            A website creates credibility. SEO and local visibility bring
            attention. Conversion flow turns attention into enquiries. CRM and
            automation make sure those enquiries are not forgotten.
          </p>

          <div className="mt-12 grid gap-4 md:grid-cols-6">
            {serviceJourney.map((step, index) => (
              <div key={step} className="relative rounded-[1.4rem] border border-white/10 bg-white/[0.02] px-4 py-5 text-center">
                <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />
                <p className="text-[0.62rem] uppercase tracking-[0.28em] text-white/30">
                  0{index + 1}
                </p>
                <p className="mt-3 text-sm font-medium text-white/72">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/8 px-5 py-24 sm:px-8 md:px-10 lg:px-14 lg:py-32 xl:px-20">
        <div className="mx-auto max-w-[920px] text-center">
          <h2 className="text-[2.5rem] font-medium leading-[0.96] tracking-[-0.05em] text-white sm:text-[3.5rem] md:text-[4.2rem]">
            Not sure where to start?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/66 md:text-[1.08rem] md:leading-9">
            Start with an audit. We will identify the biggest gaps affecting
            trust, enquiries and follow-up, then recommend the most practical
            next step.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <OciaButton href="/#final-cta" arrow>
              Get a Recommendation
            </OciaButton>
            <OciaButton href="/#pricing" variant="secondary">
              View Packages
            </OciaButton>
          </div>
        </div>
      </section>
    </main>
  );
}
