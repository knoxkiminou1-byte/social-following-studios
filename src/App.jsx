import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import sfsLogo from "./assets/sfs-mark.png";

const ASSESSMENT_URL = "https://cal.com/rashida-knox";
const CTA_LABEL = "BOOK YOUR LANGUAGE ASSESSMENT";

const NAV_ITEMS = [
  { label: "01 Home", href: "/" },
  { label: "02 Infrastructure", href: "/infrastructure" },
  { label: "03 Case Studies", href: "/case-studies" },
  { label: "04 Contact", href: "/contact" },
];

const PARTNERS = [
  "CHEVRON",
  "STANFORD MEDICAL",
  "TRUE HEALTH CENTER",
  "PG&E",
];

const PAGE_META = {
  "/": {
    title: "Social Following Studios | Home",
    description:
      "Social Following Studios builds words systems that translate authority into consultations, subscribers, and predictable revenue.",
  },
  "/infrastructure": {
    title: "Social Following Studios | Infrastructure",
    description:
      "Explore the Social Following Studios language conversion system across strategy, infrastructure, and full deployment.",
  },
  "/case-studies": {
    title: "Social Following Studios | Case Studies",
    description:
      "Results from real Social Following Studios engagements built around language conversion systems.",
  },
  "/contact": {
    title: "Social Following Studios | Contact",
    description:
      "Book a Language Assessment with Social Following Studios and map the language conversion system your authority needs.",
  },
};

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

function normalizeRoute(pathname) {
  const path = pathname.toLowerCase().replace(/\/+$/, "") || "/";
  if (path === "/home") return "/";
  if (path === "/system") return "/infrastructure";
  if (path === "/use-cases") return "/case-studies";
  return path;
}

function navigateTo(path) {
  if (window.location.pathname !== path) {
    window.history.pushState({}, "", path);
  }
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function useRoute() {
  const getRoute = () => normalizeRoute(window.location.pathname);
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    if (window.location.hash.startsWith("#/")) {
      navigateTo(window.location.hash.slice(1));
      return;
    }

    const onPopState = () => {
      const nextRoute = getRoute();
      setRoute(nextRoute);

      if (
        nextRoute !== "/" &&
        nextRoute !== "/infrastructure" &&
        nextRoute !== "/case-studies" &&
        nextRoute !== "/contact" &&
        nextRoute !== "/terms" &&
        nextRoute !== "/privacy"
      ) {
        window.history.replaceState({}, "", "/");
        setRoute("/");
      }
    };

    onPopState();
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return route;
}

function usePageMeta(route) {
  useEffect(() => {
    const meta = PAGE_META[route] || PAGE_META["/"];
    document.title = meta.title;

    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement("meta");
      description.setAttribute("name", "description");
      document.head.appendChild(description);
    }

    description.setAttribute("content", meta.description);
  }, [route]);
}

function Link({ href, className, children, onClick, ...props }) {
  const isInternal = href.startsWith("/");

  if (!isInternal) {
    return (
      <a href={href} className={className} onClick={onClick} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      className={className}
      onClick={(event) => {
        event.preventDefault();
        onClick?.(event);
        navigateTo(href);
      }}
      {...props}
    >
      {children}
    </a>
  );
}

function LogoMark({ className }) {
  return (
    <div
      className={cx(
        "flex items-center justify-center rounded-2xl border border-white/10 bg-stone-950/85 p-2 shadow-xl",
        className
      )}
      aria-label="Social Following Studios"
    >
      <img
        src={sfsLogo}
        alt="Social Following Studios"
        className="h-full w-full object-contain"
        loading="eager"
        decoding="async"
      />
    </div>
  );
}

function Button({ href, children, variant = "primary", className = "" }) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-6 py-4 text-sm font-semibold tracking-[0.18em] uppercase transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/40";
  const tone =
    variant === "secondary"
      ? "border border-stone-900/15 bg-white/90 text-stone-900 hover:bg-white"
      : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-[0_14px_34px_rgba(5,150,105,0.18)]";

  return (
    <Link href={href} className={cx(base, tone, className)}>
      {children}
    </Link>
  );
}

function Eyebrow({ children, light = false }) {
  return (
    <p
      className={cx(
        "text-[11px] font-semibold uppercase tracking-[0.28em]",
        light ? "text-emerald-200/85" : "text-emerald-700"
      )}
    >
      {children}
    </p>
  );
}

function SectionCard({ children, className = "" }) {
  return (
    <section
      className={cx(
        "rounded-[2rem] border border-stone-900/10 bg-white/88 p-8 shadow-[0_18px_50px_rgba(28,25,23,0.08)] backdrop-blur-sm md:p-12",
        className
      )}
    >
      {children}
    </section>
  );
}

function TextBlock({ title, children }) {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-semibold tracking-tight text-stone-950">{title}</h3>
      <p className="text-base leading-8 text-stone-700">{children}</p>
    </div>
  );
}

function LogoRow() {
  return (
    <div className="space-y-6">
      <p className="max-w-3xl text-base leading-8 text-stone-700">
        Social Following Studios has built words systems for organizations that set the
        standard in their industries.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PARTNERS.map((partner) => (
          <div
            key={partner}
            className="flex min-h-16 items-center justify-center rounded-2xl border border-stone-900/10 bg-[#F7F2E8] px-5 py-4 text-center text-[11px] font-semibold uppercase tracking-[0.32em] text-stone-700"
          >
            {partner}
          </div>
        ))}
      </div>
    </div>
  );
}

function CaseStudyCard({ title, metric, before, build, after, components }) {
  return (
    <SectionCard>
      <div className="space-y-8">
        <div className="space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight text-stone-950">{title}</h2>
          <p className="text-lg font-medium tracking-tight text-stone-950">{metric}</p>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-stone-500">Before</h3>
            <p className="text-base leading-8 text-stone-700">{before}</p>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-stone-500">Build</h3>
            <p className="text-base leading-8 text-stone-700">{build}</p>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-stone-500">After</h3>
            <p className="text-base leading-8 text-stone-700">{after}</p>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-stone-500">
            Language Conversion System Components
          </h3>
          <div className="flex flex-wrap gap-3">
            {components.map((item) => (
              <span
                key={item}
                className="rounded-full border border-stone-900/10 bg-[#F7F2E8] px-4 py-2 text-xs font-semibold tracking-[0.18em] uppercase text-stone-700"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

function Footer() {
  return (
    <footer className="border-t border-stone-900/10 py-10">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-6 px-6 text-sm text-stone-600">
        <span>Social Following Studios 2026</span>
        <div className="flex flex-wrap items-center gap-6">
          <Link href="/terms" className="hover:text-stone-900">
            Terms
          </Link>
          <Link href="/privacy" className="hover:text-stone-900">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}

function StaticPage({ title, body }) {
  return (
    <div className="mx-auto max-w-4xl">
      <SectionCard>
        <h1 className="text-4xl font-semibold tracking-tight text-stone-950">{title}</h1>
        <p className="mt-6 text-base leading-8 text-stone-700">{body}</p>
      </SectionCard>
    </div>
  );
}

function HomePage() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-black/70 px-8 py-10 shadow-[0_24px_80px_rgba(0,0,0,0.45)] md:px-14 md:py-16">
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "96px 96px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(900px_650px_at_15%_20%,rgba(16,185,129,0.16),transparent_60%),radial-gradient(1000px_700px_at_85%_15%,rgba(15,23,42,0.55),transparent_70%)]" />
        <div className="relative z-10 max-w-4xl space-y-8">
          <Eyebrow light>Social Following Studios Language Infrastructure</Eyebrow>
          <h1 className="text-5xl font-semibold tracking-tight text-white md:text-7xl">
            Social Following Studios
            <span className="block text-emerald-200">builds words systems.</span>
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-white/76 md:text-xl">
            We operate language conversion systems that translate authority into
            consultations, subscribers, and predictable revenue.
          </p>
          <Button href={ASSESSMENT_URL}>{CTA_LABEL}</Button>
        </div>
      </section>

      <SectionCard>
        <Eyebrow>Trusted By</Eyebrow>
        <div className="mt-6">
          <LogoRow />
        </div>
      </SectionCard>

      <SectionCard>
        <Eyebrow>Qualification</Eyebrow>
        <div className="mt-6 space-y-6">
          <h2 className="text-3xl font-semibold tracking-tight text-stone-950 md:text-4xl">
            Social Following Studios works with operators whose authority is already built.
          </h2>
          <p className="max-w-5xl text-base leading-8 text-stone-700">
            Lawyers with decades of referral relationships. Physicians with patient
            networks built over careers. Government leaders with institutional knowledge
            and trusted audiences. Founders whose names carry weight in their industries.
          </p>
          <p className="max-w-5xl text-base leading-8 text-stone-700">
            Your authority is the asset. Your database is full of people who already
            trust you. Social Following Studios operates the language conversion system
            that translates both into predictable revenue.
          </p>
        </div>
      </SectionCard>

      <SectionCard>
        <Eyebrow>Infrastructure</Eyebrow>
        <div className="mt-6 space-y-10">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold tracking-tight text-stone-950 md:text-4xl">
              We write it. We build it. We send it.
            </h2>
            <p className="max-w-4xl text-base leading-8 text-stone-700">
              Strategy, infrastructure, and deployment operate as one language conversion
              system. Your authority reaches the people it belongs to across every
              channel you own.
            </p>
          </div>
          <div className="grid gap-10 lg:grid-cols-3">
            <TextBlock title="Strategic Language">
              We write the messaging that positions your expertise for the audiences who
              act on it. Brand voice, email copy, sales collateral, newsletter content,
              and thought leadership aligned to a single strategic framework built
              around your institutional authority.
            </TextBlock>
            <TextBlock title="Owned Infrastructure">
              We build the system you control. Email architecture, newsletter
              infrastructure, podcast distribution, automated messaging, and lifecycle
              sequences designed to reach your audience directly. Your database. Your
              relationships. Your record.
            </TextBlock>
            <TextBlock title="Full Deployment">
              We operate the system. Every channel activated. Every sequence live. Every
              relationship in your database receiving the right language at the right
              stage.
            </TextBlock>
          </div>
        </div>
      </SectionCard>

      <SectionCard>
        <Eyebrow>Results</Eyebrow>
        <div className="mt-6 space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold tracking-tight text-stone-950 md:text-4xl">
              Results from real engagements.
            </h2>
            <p className="max-w-4xl text-base leading-8 text-stone-700">
              Every engagement begins with a Language Assessment. We map your authority,
              your channels, and your system gaps. Then we build and operate the
              language conversion system that puts them to work.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            <SectionCard className="p-7 md:p-8">
              <h3 className="text-2xl font-semibold tracking-tight text-stone-950">
                Healthcare Services Firm
              </h3>
              <p className="mt-2 text-lg font-medium tracking-tight text-stone-950">
                +41% Qualified Opportunities 90 Days
              </p>
              <p className="mt-5 text-base leading-8 text-stone-700">
                Before: Qualified relationships stalled at intake. Messaging reached
                peers rather than decision-makers. Revenue sat in a dormant database
                with no activation system.
              </p>
              <p className="mt-4 text-base leading-8 text-stone-700">
                After: Rebuilt intake architecture, aligned messaging with buyer intent,
                and deployed a lifecycle sequence across email and web. +41% qualified
                opportunities within 90 days.
              </p>
            </SectionCard>
            <SectionCard className="p-7 md:p-8">
              <h3 className="text-2xl font-semibold tracking-tight text-stone-950">
                Regional Energy Consultancy
              </h3>
              <p className="mt-2 text-lg font-medium tracking-tight text-stone-950">
                +27% Proposal-to-Close Rate +18% Average Engagement Size
              </p>
              <p className="mt-5 text-base leading-8 text-stone-700">
                Before: High referral volume arriving with no nurture system to move
                relationships from interest to retained engagement.
              </p>
              <p className="mt-4 text-base leading-8 text-stone-700">
                After: Three-stage email nurture sequence deployed across service tiers.
                Proposals rewritten in buyer language. 27% lift in proposal-to-close
                rate. Average engagement size increased 18%.
              </p>
            </SectionCard>
            <SectionCard className="p-7 md:p-8">
              <h3 className="text-2xl font-semibold tracking-tight text-stone-950">
                Professional Services Network
              </h3>
              <p className="mt-2 text-lg font-medium tracking-tight text-stone-950">
                340 Qualified Subscribers 12 Retained Clients 6 Months
              </p>
              <p className="mt-5 text-base leading-8 text-stone-700">
                Before: Strong institutional reputation with no owned distribution. Every
                new relationship depended entirely on referral. No system to activate
                the existing network.
              </p>
              <p className="mt-4 text-base leading-8 text-stone-700">
                After: Complete language conversion system built from the database up.
                Newsletter architecture, LinkedIn content system, podcast distribution,
                and automated referral follow-up sequence. 340 qualified subscribers and
                12 new retained clients sourced directly from owned channels in six
                months.
              </p>
            </SectionCard>
          </div>
          <Button href="/case-studies" variant="secondary">
            VIEW CASE STUDIES
          </Button>
        </div>
      </SectionCard>

      <SectionCard className="border-stone-900/15 bg-[#F7F2E8]">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight text-stone-950 md:text-4xl">
              Your authority is built. Your language conversion system is next.
            </h2>
          </div>
          <Button href={ASSESSMENT_URL}>{CTA_LABEL}</Button>
        </div>
      </SectionCard>
    </div>
  );
}

function InfrastructurePage() {
  return (
    <div className="space-y-10">
      <SectionCard>
        <Eyebrow>Infrastructure</Eyebrow>
        <div className="mt-6 max-w-4xl space-y-6">
          <h1 className="text-4xl font-semibold tracking-tight text-stone-950 md:text-6xl">
            One language conversion system.
            <span className="block">Every channel you own.</span>
          </h1>
          <p className="text-lg leading-8 text-stone-700">
            Strategy. Infrastructure. Full deployment. Built and operated by Social
            Following Studios.
          </p>
        </div>
      </SectionCard>

      <SectionCard>
        <div className="space-y-6">
          <p className="text-base leading-8 text-stone-700">
            Social Following Studios operates language conversion systems for operators
            whose authority is the asset.
          </p>
          <p className="text-base leading-8 text-stone-700">
            Founders entering succession. Family offices sustaining generational
            continuity. Lawyers and physicians with networks built over decades.
            Institutions protecting irreplaceable records. Professional practices making
            expertise transferable.
          </p>
          <p className="text-base leading-8 text-stone-700">
            We write the strategy. We build the infrastructure. We operate the system
            that delivers it across every channel you own.
          </p>
        </div>
      </SectionCard>

      <SectionCard>
        <Eyebrow>System</Eyebrow>
        <div className="mt-6 space-y-10">
          <h2 className="text-3xl font-semibold tracking-tight text-stone-950 md:text-4xl">
            We write it. We build it. We send it.
          </h2>
          <div className="grid gap-10 lg:grid-cols-3">
            <TextBlock title="01 We Write It">
              We write everything the system needs to run. Brand voice, email
              sequences, newsletter content, sales collateral, podcast scripts,
              automated messaging, and thought leadership. All aligned to a single
              strategic framework built around your institutional authority.
            </TextBlock>
            <TextBlock title="02 We Build It">
              We build the infrastructure that delivers it. Email architecture,
              newsletter systems, podcast distribution, automated messaging sequences,
              lifecycle flows, and CRM integration. The complete language conversion
              system end to end.
            </TextBlock>
            <TextBlock title="03 We Send It">
              We operate the deployment. Every channel activated. Every sequence live.
              Every relationship in your database receiving the right language at the
              right stage. The system runs and generates predictable revenue.
            </TextBlock>
          </div>
        </div>
      </SectionCard>

      <SectionCard>
        <Eyebrow>Who We Serve</Eyebrow>
        <div className="mt-6 space-y-8">
          <h2 className="text-3xl font-semibold tracking-tight text-stone-950 md:text-4xl">
            Operators whose authority is the asset.
          </h2>
          <div className="grid gap-8 lg:grid-cols-2">
            <TextBlock title="Lawyers and Legal Practices">
              Decades of referral relationships translated through a language conversion
              system built to activate existing trust into retained engagements and
              qualified consultations.
            </TextBlock>
            <TextBlock title="Physicians and Medical Practices">
              Patient networks and professional authority deployed through email,
              newsletter, and automated messaging that generates consultations and
              referrals on schedule.
            </TextBlock>
            <TextBlock title="Government Leaders and Emeriti">
              Institutional knowledge and trusted audiences activated through owned
              channels that translate authority into speaking engagements, advisory
              roles, and retained relationships.
            </TextBlock>
            <TextBlock title="Founders and Executives">
              Your achievements, your voice, and your network deployed through a
              language conversion system that generates predictable revenue and protects
              your authority across succession and transition.
            </TextBlock>
            <TextBlock title="Family Offices">
              Systems that preserve family history, values, and knowledge across
              generations while keeping institutional relationships active and
              productive.
            </TextBlock>
            <TextBlock title="Institutions and Foundations">
              Documentation and distribution infrastructure for organizations entrusted
              with irreplaceable knowledge and public record.
            </TextBlock>
            <TextBlock title="Artists and Educators">
              Your work recorded accurately, distributed consistently, and protected
              from misrepresentation across every channel your audience uses.
            </TextBlock>
          </div>
        </div>
      </SectionCard>

      <SectionCard>
        <Eyebrow>Our Process</Eyebrow>
        <div className="mt-6 space-y-8">
          <h2 className="text-3xl font-semibold tracking-tight text-stone-950 md:text-4xl">
            Assessment. Build. Deploy.
          </h2>
          <div className="grid gap-8 lg:grid-cols-3">
            <TextBlock title="Assessment">
              We map your current language, channels, database, and system gaps. You
              receive a written report identifying where your authority lives and
              exactly what the language conversion system needs to activate it.
            </TextBlock>
            <TextBlock title="Build">
              We design and build your complete language conversion system. Messaging
              framework, email infrastructure, newsletter architecture, automated
              sequences, and deployment architecture. Everything built to your defined
              timeline with weekly progress reports.
            </TextBlock>
            <TextBlock title="Deploy">
              We operate the system. Every channel live. Every sequence active.
              Performance measured against defined revenue benchmarks and refined based
              on real data from your actual audience.
            </TextBlock>
          </div>
        </div>
      </SectionCard>

      <SectionCard>
        <Eyebrow>Engagement Models</Eyebrow>
        <div className="mt-6 space-y-8">
          <h2 className="text-3xl font-semibold tracking-tight text-stone-950 md:text-4xl">
            All engagements begin with a Language Assessment.
          </h2>
          <div className="grid gap-8 lg:grid-cols-3">
            <TextBlock title="Assessment">
              A focused audit of your language, channels, database, and system gaps.
              Delivered as a written report with prioritized recommendations and a
              clear build roadmap.
            </TextBlock>
            <TextBlock title="Full Build">
              Complete language conversion system design and deployment. Strategy,
              infrastructure, and full activation across your owned channels. Built and
              launched within an agreed timeline.
            </TextBlock>
            <TextBlock title="Retained Advisory">
              We operate the system on an ongoing basis. Content production,
              optimization, channel management, and strategic guidance. Monthly
              reporting tied to defined revenue benchmarks.
            </TextBlock>
          </div>
        </div>
      </SectionCard>

      <SectionCard className="border-stone-900/15 bg-[#F7F2E8]">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-stone-950 md:text-4xl">
            Your language conversion system is ready to build.
          </h2>
          <Button href={ASSESSMENT_URL}>{CTA_LABEL}</Button>
        </div>
      </SectionCard>
    </div>
  );
}

function CaseStudiesPage() {
  return (
    <div className="space-y-10">
      <SectionCard>
        <Eyebrow>Case Studies</Eyebrow>
        <div className="mt-6 max-w-4xl space-y-6">
          <h1 className="text-4xl font-semibold tracking-tight text-stone-950 md:text-6xl">
            Results from real engagements.
          </h1>
          <p className="text-lg leading-8 text-stone-700">
            Every engagement begins with a Language Assessment. We map where authority
            lives, identify system gaps, and build the language conversion system that
            translates existing relationships into predictable revenue.
          </p>
        </div>
      </SectionCard>

      <CaseStudyCard
        title="Healthcare Services Firm"
        metric="+41% Qualified Opportunities 90 Days"
        before="Qualified relationships stalled at intake. Messaging reached peers rather than decision-makers. Revenue sat in a dormant database with no system to activate it."
        build="Rebuilt intake architecture and lead scoring. Wrote and deployed messaging aligned with buyer intent across email and web. Activated the existing database through a structured lifecycle sequence."
        after="+41% qualified opportunities within 90 days."
        components={["Strategic Language", "Owned Infrastructure", "Full Deployment"]}
      />

      <CaseStudyCard
        title="Regional Energy Consultancy"
        metric="+27% Proposal-to-Close Rate +18% Average Engagement Size"
        before="High referral volume arriving with no nurture system to move relationships from interest to retained engagement. Authority was established. The conversion system did not exist."
        build="Designed a three-stage email nurture sequence tied to service tiers. Rewrote proposals in buyer language. Deployed automated follow-up that moved referrals through the pipeline to retained engagement."
        after="27% lift in proposal-to-close rate. Average engagement size increased 18%."
        components={["Strategic Language", "Lifecycle Sequences"]}
      />

      <CaseStudyCard
        title="Professional Services Network"
        metric="340 Qualified Subscribers 12 Retained Clients 6 Months"
        before="Strong institutional reputation with no owned distribution. Every new relationship depended entirely on referral. The network existed. The language conversion system did not."
        build="Built the complete language conversion system from the database up. Newsletter architecture, LinkedIn content system, podcast distribution, and an automated referral follow-up sequence. Every channel activated within one engagement."
        after="340 qualified subscribers and 12 new retained clients sourced directly from owned channels in the first six months."
        components={["Owned Infrastructure", "Full Deployment"]}
      />

      <SectionCard className="border-stone-900/15 bg-[#F7F2E8]">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-stone-950 md:text-4xl">
            Your authority is built. Your language conversion system is next.
          </h2>
          <Button href={ASSESSMENT_URL}>{CTA_LABEL}</Button>
        </div>
      </SectionCard>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="space-y-10">
      <SectionCard>
        <Eyebrow>Contact</Eyebrow>
        <div className="mt-6 max-w-4xl space-y-6">
          <h1 className="text-4xl font-semibold tracking-tight text-stone-950 md:text-6xl">
            Book Your Language Assessment.
          </h1>
          <p className="text-lg leading-8 text-stone-700">
            Every engagement starts here. Tell us about your authority, your audience,
            and your channels. We map the language conversion system that activates
            them.
          </p>
        </div>
      </SectionCard>

      <SectionCard>
        <form
          className="space-y-8"
          onSubmit={(event) => {
            event.preventDefault();
            if (event.currentTarget.reportValidity()) {
              window.location.href = ASSESSMENT_URL;
            }
          }}
          noValidate
        >
          <div className="grid gap-6 md:grid-cols-2">
            <label className="space-y-3">
              <span className="text-sm font-medium text-stone-700">Name</span>
              <input
                type="text"
                name="name"
                required
                className="w-full rounded-2xl border border-stone-900/10 bg-white px-5 py-4 text-base text-stone-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15"
              />
            </label>
            <label className="space-y-3">
              <span className="text-sm font-medium text-stone-700">Organization</span>
              <input
                type="text"
                name="organization"
                required
                className="w-full rounded-2xl border border-stone-900/10 bg-white px-5 py-4 text-base text-stone-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15"
              />
            </label>
            <label className="space-y-3">
              <span className="text-sm font-medium text-stone-700">Role</span>
              <input
                type="text"
                name="role"
                required
                className="w-full rounded-2xl border border-stone-900/10 bg-white px-5 py-4 text-base text-stone-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15"
              />
            </label>
            <label className="space-y-3">
              <span className="text-sm font-medium text-stone-700">
                Primary channel or platform you want activated
              </span>
              <input
                type="text"
                name="primaryChannel"
                required
                className="w-full rounded-2xl border border-stone-900/10 bg-white px-5 py-4 text-base text-stone-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15"
              />
            </label>
          </div>

          <label className="block space-y-3">
            <span className="text-sm font-medium text-stone-700">
              What your database or audience currently looks like
            </span>
            <textarea
              name="audience"
              required
              rows={5}
              className="w-full rounded-2xl border border-stone-900/10 bg-white px-5 py-4 text-base text-stone-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15"
            />
          </label>

          <label className="block space-y-3">
            <span className="text-sm font-medium text-stone-700">
              What revenue outcome you are building toward
            </span>
            <textarea
              name="revenueOutcome"
              required
              rows={5}
              className="w-full rounded-2xl border border-stone-900/10 bg-white px-5 py-4 text-base text-stone-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15"
            />
          </label>

          <div className="flex">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
            >
              {CTA_LABEL}
            </button>
          </div>
        </form>
      </SectionCard>

      <SectionCard className="border-stone-900/15 bg-[#F7F2E8]">
        <p className="max-w-4xl text-base leading-8 text-stone-700">
          Social Following Studios works with operators whose authority is already
          built. We review every assessment request and engage with operators whose
          database and channels are ready to activate.
        </p>
      </SectionCard>
    </div>
  );
}

function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return undefined;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let rafId = 0;

    const onMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.16;
      cursorY += (mouseY - cursorY) * 0.16;
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      rafId = window.requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    rafId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-stone-900/20 bg-white/20 backdrop-blur-sm lg:block"
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-600 lg:block"
      />
    </>
  );
}

function LiquidBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return undefined;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    element.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 50;

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uColor1: { value: new THREE.Vector3(0.062, 0.725, 0.505) },
      uColor2: { value: new THREE.Vector3(0.039, 0.055, 0.153) },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        varying vec2 vUv;

        float noise(vec2 p) {
          return sin(p.x) * sin(p.y);
        }

        void main() {
          vec2 uv = vUv * 2.0 - 1.0;
          uv.x *= uResolution.x / uResolution.y;
          float wave = noise(uv * 3.6 + uTime * 0.6) + noise(uv * 6.4 - uTime * 0.25);
          float blend = smoothstep(-1.3, 1.3, wave);
          vec3 color = mix(uColor2, uColor1, blend);
          gl_FragColor = vec4(color, 0.9);
        }
      `,
      transparent: true,
    });

    const geometry = new THREE.PlaneGeometry(120, 120, 1, 1);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const clock = new THREE.Clock();
    let rafId = 0;

    const resize = () => {
      const rect = element.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      uniforms.uResolution.value.set(width, height);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(element);

    const animate = () => {
      uniforms.uTime.value += clock.getDelta();
      renderer.render(scene, camera);
      rafId = window.requestAnimationFrame(animate);
    };

    resize();
    animate();

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(rafId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === element) {
        element.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0" aria-hidden="true" />;
}

function Background({ home = false }) {
  if (home) {
    return (
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#0C1016]" />
        <div className="absolute -inset-[20vh] opacity-95">
          <LiquidBackground />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "88px 88px",
          }}
        />
      </div>
    );
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#F4EFE4]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(28,25,23,0.04),transparent_55%)]" />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(28,25,23,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(28,25,23,0.2) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
        }}
      />
    </div>
  );
}

function Shell({ route, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = route === "/";

  useEffect(() => {
    setMobileOpen(false);
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    } catch {
      window.scrollTo(0, 0);
    }
  }, [route]);

  return (
    <div
      className={cx(
        "relative min-h-screen overflow-x-hidden selection:bg-emerald-600 selection:text-white",
        isHome ? "bg-transparent text-white" : "bg-transparent text-stone-900"
      )}
    >
      <Background home={isHome} />
      <CustomCursor />

      <div className="relative z-10">
        <header
          className={cx(
            "sticky top-0 z-50 border-b backdrop-blur-xl",
            isHome
              ? "border-white/10 bg-black/20"
              : "border-stone-900/10 bg-[#F4EFE4]/90"
          )}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-4">
              <LogoMark className="h-11 w-11 md:h-12 md:w-12" />
              <div className="hidden sm:block">
                <p className={cx("text-sm font-medium tracking-tight", isHome ? "text-white" : "text-stone-900")}>
                  Social Following Studios Language Infrastructure
                </p>
              </div>
            </Link>

            <nav className="hidden items-center gap-2 md:flex">
              {NAV_ITEMS.map((item) => {
                const active = route === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cx(
                      "rounded-2xl px-4 py-3 text-sm font-semibold tracking-[0.16em] transition-colors",
                      active
                        ? isHome
                          ? "bg-white/10 text-white"
                          : "bg-stone-900 text-white"
                        : isHome
                          ? "text-white/78 hover:text-white hover:bg-white/5"
                          : "text-stone-600 hover:text-stone-900 hover:bg-white/80"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <button
              type="button"
              className={cx(
                "inline-flex h-11 w-11 items-center justify-center rounded-2xl md:hidden",
                isHome ? "bg-white/10 text-white" : "bg-stone-900 text-white"
              )}
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((current) => !current)}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>

          {mobileOpen ? (
            <nav
              className={cx(
                "border-t px-6 py-5 md:hidden",
                isHome ? "border-white/10 bg-black/25" : "border-stone-900/10 bg-white/90"
              )}
            >
              <div className="flex flex-col gap-3">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cx(
                      "rounded-2xl px-4 py-3 text-sm font-semibold tracking-[0.16em]",
                      route === item.href
                        ? isHome
                          ? "bg-white/10 text-white"
                          : "bg-stone-900 text-white"
                        : isHome
                          ? "text-white/80"
                          : "text-stone-700"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
          ) : null}
        </header>

        <main className="mx-auto max-w-7xl px-6 py-10 md:py-14">{children}</main>
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  const route = useRoute();
  usePageMeta(route);

  let page;
  switch (route) {
    case "/infrastructure":
      page = <InfrastructurePage />;
      break;
    case "/case-studies":
      page = <CaseStudiesPage />;
      break;
    case "/contact":
      page = <ContactPage />;
      break;
    case "/terms":
      page = (
        <StaticPage
          title="Terms"
          body="Terms for Social Following Studios engagements are provided during the Language Assessment and engagement process."
        />
      );
      break;
    case "/privacy":
      page = (
        <StaticPage
          title="Privacy"
          body="Privacy details for Social Following Studios assessment requests and communications are provided during engagement."
        />
      );
      break;
    default:
      page = <HomePage />;
      break;
  }

  return <Shell route={route}>{page}</Shell>;
}
