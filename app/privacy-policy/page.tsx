import Link from "next/link";

const sections = [
  {
    title: "1. Information we collect",
    body:
      "We may collect information you provide directly, such as your name, email address, business name, website URL, project details, and any message you submit through forms, email, Calendly, or other contact methods.",
  },
  {
    title: "2. How we use your information",
    body:
      "We use your information to respond to enquiries, provide website audits, discuss potential projects, deliver services, improve our website, and communicate with you about relevant updates or next steps.",
  },
  {
    title: "3. Calendly and third-party tools",
    body:
      "If you book a call or submit information through third-party tools such as Calendly, those services may also collect and process your information according to their own privacy policies.",
  },
  {
    title: "4. Cookies and analytics",
    body:
      "Our website may use basic analytics or cookies to understand website performance and improve user experience. You can control cookies through your browser settings.",
  },
  {
    title: "5. Sharing information",
    body:
      "We do not sell your personal information. We may share information only when necessary to deliver services, use trusted tools, comply with legal requirements, or protect our rights.",
  },
  {
    title: "6. Data retention",
    body:
      "We keep information only for as long as needed for business, legal, or service-related purposes.",
  },
  {
    title: "7. Your rights",
    body:
      "You may contact us to request access, correction, or deletion of your personal information, subject to reasonable legal and operational limits.",
  },
  {
    title: "8. Contact",
    body:
      "For privacy-related questions, contact Ocia Studios through the contact details or enquiry links on this website.",
  },
];

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="mt-6 max-w-[48rem] text-[1rem] leading-8 text-[#526777]">
            Ocia Studios respects your privacy. This Privacy Policy explains what information we may collect, how we use it, and how we protect it when you use our website or contact us about our services.
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
