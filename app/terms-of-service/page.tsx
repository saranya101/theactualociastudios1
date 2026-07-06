import Link from "next/link";

const sections = [
  {
    title: "1. Website use",
    body:
      "You may use this website to learn about Ocia Studios, request an audit, book a call, or contact us about services. You agree not to misuse the website, interfere with its functionality, or attempt unauthorised access.",
  },
  {
    title: "2. Services",
    body:
      "Ocia Studios provides website improvement, SEO, conversion optimisation, automation, booking flow, CRM, and lead generation-related services. Specific project scope, pricing, deliverables, and timelines will be agreed separately in writing.",
  },
  {
    title: "3. Free website audit",
    body:
      "The free audit is intended to provide practical observations and recommendations. It does not guarantee specific results, rankings, enquiries, revenue, or business outcomes.",
  },
  {
    title: "4. No guaranteed results",
    body:
      "While we aim to improve trust, visibility, conversion, and lead flow, results depend on many factors including market conditions, offer quality, competition, budget, implementation, and business operations.",
  },
  {
    title: "5. Intellectual property",
    body:
      "Website content, designs, copy, graphics, and materials created by Ocia Studios remain protected unless ownership or usage rights are agreed separately in writing.",
  },
  {
    title: "6. Third-party tools",
    body:
      "Some services may involve third-party platforms such as Calendly, analytics tools, website builders, CRM systems, automation tools, or hosting providers. Their own terms and policies may apply.",
  },
  {
    title: "7. Limitation of liability",
    body:
      "Ocia Studios is not liable for indirect, incidental, or consequential losses arising from website use, service enquiries, third-party tools, or business outcomes.",
  },
  {
    title: "8. Changes to these terms",
    body:
      "We may update these Terms of Service from time to time. The latest version will be posted on this page.",
  },
  {
    title: "9. Contact",
    body:
      "For questions about these terms, contact Ocia Studios through the contact details or enquiry links on this website.",
  },
];

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-[#F6F1E8] text-[#071827]">
      <div className="mx-auto w-full max-w-[1040px] px-6 py-12 sm:px-8 lg:px-12 lg:py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#32516a] transition hover:text-[#071827]"
        >
          <span aria-hidden="true">←</span>
          <span>Back to homepage</span>
        </Link>

        <div className="mt-8 rounded-[2rem] border border-[rgba(7,24,39,0.08)] bg-[linear-gradient(180deg,#FFFDF8_0%,#FBF7EF_100%)] px-6 py-8 shadow-[0_24px_70px_rgba(19,31,45,0.08)] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[#5f7789]">
            Last updated: 2026
          </p>
          <h1 className="mt-4 text-[2.35rem] font-medium leading-[0.96] tracking-[-0.05em] sm:text-[3rem]">
            Terms of Service
          </h1>
          <p className="mt-6 max-w-[48rem] text-[1rem] leading-8 text-[#526777]">
            These Terms of Service outline the basic terms for using the Ocia Studios website and engaging with our services. By using this website or contacting us, you agree to these terms.
          </p>

          <div className="mt-10 space-y-8">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-[1.15rem] font-semibold tracking-[-0.02em] text-[#071827]">
                  {section.title}
                </h2>
                <p className="mt-3 text-[0.98rem] leading-8 text-[#526777]">
                  {section.body}
                </p>
              </section>
            ))}
          </div>

          <p className="mt-10 rounded-[1.4rem] border border-[rgba(7,24,39,0.08)] bg-[rgba(234,243,248,0.46)] px-5 py-4 text-[0.92rem] leading-7 text-[#32516a]">
            This page is provided for general informational purposes and does not replace legal advice.
          </p>
        </div>
      </div>
    </main>
  );
}
