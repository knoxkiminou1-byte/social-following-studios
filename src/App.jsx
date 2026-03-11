import React, { useEffect, useMemo, useState, useRef } from "react";
import * as THREE from "three";
import brandLogo from "./assets/brand/sfs-logo.png";

/**
 * Social Following Studios - Unified Conversion Systems
 * Aesthetic: Hyper-Modern AI / Aerodynamic
 * Integration: High-Fidelity Three.js Liquid Field (No Rain) + Precision Cursor
 * Palette: Royal Creme + Ink + Emerald
 * Language: Forward-speaking, affirmative statements only
 */

const CONFIGURE_URL = "https://cal.com/rashida-knox";
const CTA_LABEL = "BOOK YOUR CALL";
const BRAND_LOGO_PATH = brandLogo;
const ZOHO_FORM_ACTION = import.meta.env.VITE_ZOHO_FORM_ACTION || "https://crm.zoho.com/crm/WebToLeadForm";
const ZOHO_RETURN_URL = import.meta.env.VITE_ZOHO_RETURN_URL || CONFIGURE_URL;
const ZOHO_ACTION_TYPE = import.meta.env.VITE_ZOHO_ACTION_TYPE || "TGVhZHM=";
const ZOHO_XNQSJSDP = import.meta.env.VITE_ZOHO_XNQSJSDP || "";
const ZOHO_XMIWTLD = import.meta.env.VITE_ZOHO_XMIWTLD || "";
const ZOHO_LZAD = import.meta.env.VITE_ZOHO_LZAD || "";

const NAV = [
  { label: "01 Home", href: "#/" },
  { label: "02 Infrastructure", href: "#/infrastructure" },
  { label: "03 Case Studies", href: "#/case-studies" },
  { label: "04 Contact", href: "#/contact" },
];

const BOOKING_URL = "https://app.cal.com/socialfollowing";
const CONTACT_FORM_ENDPOINT = "https://crm.zoho.com/crm/WebToLeadForm";
const ZOHO_RETURN_URL = "https://socialfollowingstudios.com/#/thank-you";
const MAILING_LIST_ENDPOINT = "#";

const TRUSTED_BY_LOGOS = [
  { name: "Kaiser Permanente", mode: "image", src: "/logos/kaiser-permanente.png", alt: "Kaiser Permanente" },
  { name: "Stanford University", mode: "image", src: "/logos/stanford-university.svg", alt: "Stanford University" },
  { name: "NVIDIA", mode: "image", src: "/logos/nvidia.svg", alt: "NVIDIA" },
  { name: "PG&E", mode: "image", src: "/logos/pge.svg", alt: "PG&E" },
  { name: "CommonSpirit Health", mode: "image", src: "/logos/commonspirit-health.png", alt: "CommonSpirit Health" },
  { name: "Drew Medical", mode: "image", src: "/logos/drew-medical.png", alt: "Drew Medical" },
  { name: "The Anthemist", mode: "image", src: "/logos/the-anthemist.png", alt: "The Anthemist" },
  { name: "City of Concord", mode: "image", src: "/logos/city-of-concord.png", alt: "City of Concord" },
  { name: "DGRP", mode: "text", src: null, alt: "DGRP" },
  { name: "Rhythm & Roux", mode: "text", src: null, alt: "RHYTHM & ROUX" },
  { name: "Parade of Youth", mode: "text", src: null, alt: "PARADE OF YOUTH" },
  { name: "D55", mode: "image", src: "/logos/d55.png", alt: "D55" },
];

const PARTNERS = ["KAISER PERMANENTE", "STANFORD UNIVERSITY", "NVIDIA", "PG&E", "COMMONSPIRIT HEALTH", "DREW MEDICAL"];

const COPY = {
  home: {
    productName: "Social Following Studios",
    h1Line1: "builds",
    h1Line1Accent: "words",
    h1Line1Suffix: "systems.",
    h1Line2Accent: "",
    sub: "We deploy language conversion systems that turn your data and authority into increased visibility and revenue.",
    ctaPrimary: "BOOK MY CALL",
    ctaSecondary: "View Case Studies",
    trustedKicker: "TRUSTED BY",
    trustedSub: "Social Following Studios has built words systems for groups that set the standard in their fields.",
    stats: [
      {
        label: "FOR ESTABLISHED OPERATORS",
        sub: "You have the authority and the database. We build the system that turns both into booked appointments.",
      },
      {
        label: "YOUR AUTHORITY IS THE ASSET.",
        sub: "Your database is full of people who already trust you. Most let it sit idle. The revenue you want is already in the room.",
      },
      {
        label: "THE CONVERSION SYSTEM THAT NARRATES ITSELF",
        sub: "We deploy the sequence that tells your story, activates your database, and converts trust into predictable appointments and clients.",
      },
    ],
    equationKicker: "DISCIPLINES",
    equationHeadline: "We write it. We build it. We send it.",
    equationBody:
      "We align every channel you control around one objective: converting dormant relationships into booked consultations.",
    coreArch: "ONE DEPLOYMENT SYSTEM",
    architecture: [
      {
        title: "Strategic Language",
        desc: "We define the language that moves qualified buyers to signed agreements. Your expertise, codified.",
      },
      {
        title: "Owned Infrastructure",
        desc: "We build the infrastructure that puts you in command. Your channels, unified.",
      },
      {
        title: "Full Deployment",
        desc: "We deploy the system across your channels to keep qualified appointments coming. Your calendar, full.",
      },
    ],
    resultsIntroTitle: "Results from real engagements.",
    resultsIntroSub:
      "Every engagement begins with a Language Assessment. We map your authority, find your system gaps, and build the bridge to revenue.",
    closingHeadline: "Your authority is built. Your deployment system solidifies it.",
    closingSub: "",
    closingCta: "BOOK MY CALL",
  },
  infrastructure: {
    kicker: "INFRASTRUCTURE",
    h1: "One system. Every channel.",
    sub: "Built and deployed by Social Following Studios.",
    layers: [
      {
        note: "01 We Write It",
        title: "We write the words.",
        desc: "We write the language that moves qualified buyers to signed agreements.",
      },
      {
        note: "02 We Build It",
        title: "We build the system.",
        desc: "We build the infrastructure that puts you in command.",
      },
      {
        note: "03 We Send It",
        title: "We deploy the system.",
        desc: "We deploy the system across your channels to keep qualified appointments coming.",
      },
    ],
    whoWeServe: {
      kicker: "WHO WE SERVE",
      headline: "For operators whose authority is the asset.",
      body: "We work with operators who have built real world authority, with full databases, owned channels, and audiences that already trust them.",
      closing: "",
    },
    howItWorks: {
      kicker: "HOW IT WORKS",
      headline: "All engagements begin with a Language Audit.",
      tiers: [
        {
          title: "THE AUDIT",
          desc: "A focused audit of your language, database, and system gaps, delivered as a written report that maps the system you need.",
        },
        {
          title: "Full Build",
          desc: "Your complete system, built and launched across your owned channels to turn dormant connections into revenue.",
        },
        {
          title: "Retained Advisory",
          desc: "We deploy your system on an ongoing basis, with monthly reporting tied to your revenue targets.",
        },
      ],
    },
    outroLines: [],
    outroSub: "",
    cta: "DEPLOY YOUR SYSTEM",
  },
  caseStudies: {
    kicker: "CASE STUDIES",
    title: "Results from real engagements.",
    cards: [
      {
        badge: "Case Study 01",
        client: "Michael Todd Legal",
        location: "San Francisco Bay Area",
        quote: "Our calendar filled from emails we already owned. Ninety days.",
        quoteAttrib: "Michael Todd, Managing Principal",
        challenge:
          "Strong referral reputation. Email list sitting idle. No lifecycle sequencing. Bookings dependent on inbound timing.",
        action:
          "Repositioned messaging for decision-stage buyers. Built segmented email architecture. Deployed consultation booking sequence with automated follow-up.",
        result:
          "+32% retained clients sourced directly from owned channels in 90 days. Revenue stabilized through structured lifecycle deployment.",
        outcome: "+32%",
        outcomeLabel: "Retained Clients · 90 Days · Owned Channels",
        tech: "Strategic Language · Owned Infrastructure · Full Deployment",
        problem:
          "Before: Strong referral reputation. Email list sitting idle. No lifecycle sequencing. Bookings dependent on inbound timing.",
        methodology: "Retained client count measured against owned channel sequences over a 90-day deployment window.",
      },
      {
        badge: "Case Study 02",
        client: "Erich Simpson, MD",
        location: "Northern California",
        quote: "Patients we hadn't heard from in years started booking. The system found them.",
        quoteAttrib: "Erich Simpson, Founder",
        challenge: "Established patient trust. Dormant database. No re-engagement system. No referral path.",
        action:
          "Strategic messaging rewrite. Reactivation sequence deployed. Newsletter system built. Referral amplification workflow installed.",
        result: "+41% lift in consultations and recurring referrals in 120 days.",
        outcome: "+41%",
        outcomeLabel: "Consultations & Referrals · 120 Days",
        tech: "Strategic Language · Owned Infrastructure · Full Deployment",
        problem: "Before: Established patient trust. Dormant database. No re-engagement system. No referral path.",
        methodology: "Consultation and referral volume measured against baseline across a 120-day reactivation deployment.",
      },
      {
        badge: "Case Study 03",
        client: "Sandra Lindholm Real Estate",
        location: "San Francisco",
        quote: "I had the brand. I just needed the system behind it.",
        quoteAttrib: "Sandra Lindholm, Principal",
        challenge:
          "Strong personal brand. High social visibility. No owned system to move prospects from interest to signed agreement.",
        action:
          "Offer positioning rewrite. Automated nurture system built. Seller consultation sequence deployed. Follow-up messaging aligned with buyer psychology.",
        result: "+28% increase in signed listing agreements driven from owned email and follow-up sequences.",
        outcome: "+28%",
        outcomeLabel: "Signed Listing Agreements · Owned Channels",
        tech: "Strategic Language · Owned Infrastructure · Full Deployment",
        problem:
          "Before: Strong personal brand. High social visibility. No owned system to move prospects from interest to signed agreement.",
        methodology:
          "Signed listing agreements measured against owned email and follow-up sequence activity over the engagement period.",
      },
    ],
    outroLines: [],
    cta: "BOOK MY CALL",
  },
  contact: {
    kicker: "CONTACT",
    title: "Book Your Call.",
    sub: "Every engagement starts here. We bring the system. You bring the authority.",
    submitIdle: "SUBMIT",
    submitDone: "SUBMITTED",
  },
  shell: {
    brand: "Social Following Studios",
    brandSub: "Language Infrastructure",
    topCta: "BOOK MY CALL",
    footerSub: "Social Following Studios 2026",
    terms: "Terms",
    privacy: "Privacy",
  },
};

const POLICY_TEMPLATE = {
  siteName: "Social Following Studios",
  email: "support@socialfollowingstudios.com",
  updatedAt: "January 1, 2026",
};

const TERMS_POLICY = {
  title: "Terms of Service",
  intro:
    "These Terms govern your use of Social Following Studios and any related pages, forms, and services.",
  sections: [
    {
      heading: "Use of the site",
      body: "You agree to use this site for lawful business purposes only and not to disrupt or misuse the platform.",
    },
    {
      heading: "Service information",
      body: "Service descriptions and availability may change over time. We can update, pause, or remove offerings without prior notice.",
    },
    {
      heading: "Limitation of liability",
      body: "The site and content are provided as-is. To the maximum extent allowed by law, we are not liable for indirect or consequential damages.",
    },
  ],
};

const PRIVACY_POLICY = {
  title: "Privacy Policy",
  intro:
    "This policy explains how Social Following Studios collects, uses, and protects the information you submit.",
  sections: [
    {
      heading: "Information we collect",
      body: "We collect information you provide in forms, including name, email, phone number, and business details needed to deliver services.",
    },
    {
      heading: "How we use data",
      body: "We use submitted information to respond to inquiries, deliver requested services, and improve operations and customer support.",
    },
    {
      heading: "Data sharing",
      body: "We do not sell personal data. We may share information with trusted providers only when required to run or support our services.",
    },
  ],
};

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

function useHashRoute() {
  const getRoute = () => {
    const h = (window.location.hash || "#/").toLowerCase();
    const r = h.replace(/^#/, "");
    return r.startsWith("/") ? r : `/${r}`;
  };
  const [route, setRoute] = useState("/");
  useEffect(() => {
    const onHash = () => setRoute(getRoute());
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return route;
}

// ---------- base UI components ----------

function BrandLogo({ className, priority = false }) {
  return (
    <img
      src={BRAND_LOGO_PATH}
      alt="Social Following Studios"
      className={cx("block h-auto w-full max-w-full object-contain", className)}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );
}

function Button({ href, children, variant = "primary", size = "default", className = "" }) {
  const base =
    "inline-flex min-h-11 items-center justify-center rounded-2xl font-black transition active:scale-[0.98] shadow-lg hover:shadow-xl uppercase tracking-widest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2";
  const sizes = {
    default: "px-4 py-3 text-[10px] md:px-6 md:py-4 md:text-[10px]",
    large: "px-8 py-4 text-[11px] md:px-10 md:py-5 md:text-xs",
  };
  const styles =
    variant === "primary"
      ? "bg-emerald-600 text-white hover:bg-emerald-700"
      : "bg-stone-950 text-white hover:bg-stone-900 border-2 border-emerald-600/20";
  return (
    <a href={href} className={cx(base, sizes[size], styles, className)}>
      {children}
    </a>
  );
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border-2 border-emerald-600/25 bg-emerald-50 px-4 py-2 text-sm font-bold tracking-wide text-emerald-900 shadow-md">
      {children}
    </span>
  );
}

function SectionHead({ eyebrow, title, desc, right }) {
  return (
    <div className="flex flex-col gap-6 text-left md:flex-row md:items-end md:justify-between md:gap-8">
      <div>
        <div className="text-sm font-black tracking-[0.25em] text-emerald-700 uppercase mb-6 leading-none">{eyebrow}</div>
        <h1 className="text-[clamp(2rem,8vw,4.5rem)] font-black tracking-tighter leading-[1.05]">{title}</h1>
        {desc ? (
          <p className="mt-6 max-w-3xl text-base md:mt-8 md:text-xl text-stone-700 leading-relaxed font-medium">{desc}</p>
        ) : null}
      </div>
      {right ? <div className="md:shrink-0">{right}</div> : null}
    </div>
  );
}

function Card({ title, eyebrow, children, right }) {
  return (
    <section className="rounded-[1.75rem] md:rounded-[2.5rem] border-2 border-stone-900/10 bg-white/75 backdrop-blur-xl p-5 sm:p-6 md:p-12 shadow-2xl text-left transition-all duration-500 hover:shadow-emerald-600/5">
      <div className="flex items-start justify-between gap-6">
        <div>
          {eyebrow ? (
            <div className="text-sm font-black tracking-[0.25em] text-emerald-700 uppercase mb-6 leading-none">{eyebrow}</div>
          ) : null}
          {title ? <h2 className="text-2xl md:text-4xl font-black tracking-tight">{title}</h2> : null}
        </div>
        {right ? <div className="hidden md:block">{right}</div> : null}
      </div>
      <div className="mt-8 text-base md:text-lg text-stone-700 leading-relaxed">{children}</div>
    </section>
  );
}

function Stat({ label, value, sub, dark = false }) {
  return (
    <div
      className={cx(
        "rounded-[2rem] border-2 p-6 md:p-8 shadow-2xl transition-all duration-500 hover:-translate-y-2 text-left",
        dark ? "border-white/10 bg-white/5" : "border-stone-900/10 bg-white"
      )}
    >
      <div className="flex items-baseline justify-between gap-4">
        <div className={cx("text-[10px] font-black tracking-[0.2em] uppercase", dark ? "text-white/60" : "text-stone-600")}>
          {label}
        </div>
        <div className={cx("text-2xl md:text-4xl font-black tracking-tighter", dark ? "text-white" : "text-stone-900")}>{value}</div>
      </div>
      {sub ? (
        <div className={cx("mt-3 text-base md:text-lg leading-relaxed opacity-80", dark ? "text-white" : "text-stone-600")}>{sub}</div>
      ) : null}
    </div>
  );
}

function VisualTile({ title, subtitle }) {
  return (
    <div className="rounded-[2.5rem] border-2 border-stone-900/10 bg-white p-10 shadow-2xl overflow-hidden relative">
      <div className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-emerald-600/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-stone-900/8 blur-3xl" />
      <div className="relative text-left">
        <div className="text-[10px] font-black tracking-[0.3em] text-stone-600 uppercase mb-6 leading-none">{subtitle}</div>
        <div className="mt-2 text-2xl md:text-3xl font-black tracking-tight">{title}</div>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {["ACCESS", "CONVERSION", "INTAKE", "CONTINUITY"].map((t) => (
            <div
              key={t}
              className="rounded-2xl border-2 border-stone-900/10 bg-[#F5F2EA] px-3 py-4 text-[10px] font-black text-center tracking-widest text-stone-800 uppercase"
            >
              {t}
            </div>
          ))}
        </div>
        <div className="mt-10 h-3 w-full rounded-full bg-stone-200 overflow-hidden shadow-inner">
          <div className="h-full w-2/3 bg-emerald-600" />
        </div>
      </div>
    </div>
  );
}

function PartnerMarquee() {
  return (
    <div className="group relative w-full overflow-hidden py-8">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#F5F2EA] via-[#F5F2EA]/40 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#F5F2EA] via-[#F5F2EA]/40 to-transparent" />
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((name, idx) => (
          <div
            key={`${name}-${idx}`}
            className="flex items-center px-14 text-[10px] md:text-xs font-black tracking-[0.4em] text-stone-950 uppercase transition-colors duration-500 hover:text-emerald-700"
          >
            {name}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.33%); } }
        .animate-marquee { animation: marquee 25s linear infinite; }
      `}</style>
    </div>
  );
}

// ---------- background & cursor ----------

function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;
    let rafId = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      // Keep the dot centered under the pointer (inline transforms override Tailwind translate classes).
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(animate);
    };

    const onMouseEnter = () => {
      cursor.style.width = "60px"; cursor.style.height = "60px";
      cursor.style.borderColor = "#10B981"; cursor.style.backgroundColor = "rgba(16, 185, 129, 0.1)";
    };
    const onMouseLeave = () => {
      cursor.style.width = "30px"; cursor.style.height = "30px";
      cursor.style.borderColor = "rgba(28, 25, 23, 0.4)"; cursor.style.backgroundColor = "transparent";
    };

    // attach
    window.addEventListener("mousemove", onMouseMove);
    rafId = requestAnimationFrame(animate);

    // delegated hover handling
    const onOver = (e) => {
      const t = e.target;
      if (t && t.closest && t.closest("a, button, input, select, textarea")) onMouseEnter();
    };
    const onOut = (e) => {
      const t = e.target;
      if (t && t.closest && t.closest("a, button, input, select, textarea")) onMouseLeave();
    };
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="pointer-events-none fixed left-0 top-0 z-[9999] h-[30px] w-[30px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-stone-900/40 transition-[width,height,background-color,border-color] duration-300 hidden lg:block shadow-sm" />
      <div ref={dotRef} className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-600 hidden lg:block" />
    </>
  );
}

function LiquidBackground({ className = "" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 50;

    class TouchTexture {
      constructor() {
        this.size = 128;
        this.width = this.height = this.size;
        this.maxAge = 64;
        this.radius = 0.15 * this.size;
        this.speed = 1 / this.maxAge;
        this.trail = [];
        this.last = null;

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.texture = new THREE.Texture(this.canvas);
        this.texture.minFilter = THREE.LinearFilter;
        this.texture.magFilter = THREE.LinearFilter;
      }

      addTouch(point) {
        if (this.last) {
          const dx = point.x - this.last.x;
          const dy = point.y - this.last.y;
          if (dx === 0 && dy === 0) return;

          const dd = dx * dx + dy * dy;
          const d = Math.sqrt(dd);

          this.trail.push({
            x: point.x,
            y: point.y,
            age: 0,
            force: Math.min(dd * 20000, 2.0),
            vx: dx / d,
            vy: dy / d,
          });
        }
        this.last = { x: point.x, y: point.y };
      }

      update() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.width, this.height);

        for (let i = this.trail.length - 1; i >= 0; i--) {
          const p = this.trail[i];
          const f = p.force * this.speed * (1 - p.age / this.maxAge);

          p.x += p.vx * f;
          p.y += p.vy * f;
          p.age += 1;

          if (p.age > this.maxAge) {
            this.trail.splice(i, 1);
            continue;
          }

          const pos = { x: p.x * this.width, y: (1 - p.y) * this.height };

          let intensity =
            p.age < this.maxAge * 0.3
              ? Math.sin((p.age / (this.maxAge * 0.3)) * (Math.PI / 2))
              : 1.0 - p.age / this.maxAge;

          intensity *= p.force;

          const offset = this.size * 5;

          this.ctx.shadowOffsetX = offset;
          this.ctx.shadowOffsetY = offset;
          this.ctx.shadowBlur = this.radius;
          this.ctx.shadowColor = `rgba(${((p.vx + 1) / 2) * 255}, ${((p.vy + 1) / 2) * 255}, ${
            intensity * 255
          }, ${0.3 * intensity})`;

          this.ctx.beginPath();
          this.ctx.fillStyle = 'rgba(255,0,0,1)';
          this.ctx.arc(pos.x - offset, pos.y - offset, this.radius, 0, Math.PI * 2);
          this.ctx.fill();
        }

        this.texture.needsUpdate = true;
      }
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      containerRef.current.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 50;
      const touchTexture = new TouchTexture();
      const uniforms = {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uColor1: { value: new THREE.Vector3(0.06, 0.72, 0.5) },
        uColor2: { value: new THREE.Vector3(0.02, 0.03, 0.08) },
        uSpeed: { value: 0.55 },
        uIntensity: { value: 0.85 },
        uTouchTexture: { value: touchTexture.texture },
        uGrainIntensity: { value: 0.08 },
        uDarkNavy: { value: new THREE.Vector3(0.01, 0.02, 0.05) },
        uGradientSize: { value: 0.5 },
        uGradientCount: { value: 8.0 },
        uColor1Weight: { value: 0.6 },
        uColor2Weight: { value: 1.8 },
      };
      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
        fragmentShader: `
          uniform float uTime; uniform vec2 uResolution; uniform vec3 uColor1, uColor2, uDarkNavy;
          uniform float uSpeed, uIntensity, uGrainIntensity, uGradientSize, uColor1Weight, uColor2Weight;
          uniform sampler2D uTouchTexture; varying vec2 vUv;
          float grain(vec2 uv, float time) { vec2 grainUv = uv * uResolution * 0.5; return fract(sin(dot(grainUv + time, vec2(12.9898, 78.233))) * 43758.5453) * 2.0 - 1.0; }
          vec3 getGradientColor(vec2 uv, float time) {
            float s = uSpeed; vec3 color = vec3(0.0);
            for(int i=0; i<8; i++) {
                float fi = float(i);
                vec2 c = vec2(0.5 + sin(time * s * (0.4 + fi * 0.02)) * 0.4, 0.5 + cos(time * s * (0.5 + fi * 0.03)) * 0.4);
                float inf = 1.0 - smoothstep(0.0, uGradientSize, length(uv - c));
                color += ((i % 2 == 0) ? uColor1 : uColor2) * inf * (0.5 + 0.5 * sin(time * s * (0.8 + fi*0.1))) * ((i % 2 == 0) ? uColor1Weight : uColor2Weight);
            }
            color = clamp(color * uIntensity, 0.0, 1.0);
            return mix(uDarkNavy, color, max(length(color), 0.1));
          }
          void main() {
            vec2 uv = vUv; vec4 touchTex = texture2D(uTouchTexture, uv);
            uv += vec2(-(touchTex.r * 2.0 - 1.0), -(touchTex.g * 2.0 - 1.0)) * 0.5 * touchTex.b;
            vec3 color = getGradientColor(uv, uTime); color += grain(uv, uTime) * uGrainIntensity;
            gl_FragColor = vec4(color, 1.0);
          }
        `,
      });
      scene.add(new THREE.Mesh(new THREE.PlaneGeometry(150, 150, 1, 1), material));
      const clock = new THREE.Clock();
      const animate = () => {
        uniforms.uTime.value += clock.getDelta() * 0.85;
        touchTexture.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };
      animate();
      const handleMove = (e) => {
        const x = (e.clientX || (e.touches && e.touches[0].clientX)) / window.innerWidth;
        const y = 1 - (e.clientY || (e.touches && e.touches[0].clientY)) / window.innerHeight;
        touchTexture.addTouch({ x, y });
      };
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("touchmove", handleMove);
      window.addEventListener("resize", () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      });
    };

    const ro = new ResizeObserver(resize);
    ro.observe(el);
    // Listen on window so the background can safely be pointer-events-none
    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('touchmove', handleMove, { passive: true });

    resize();
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);

      geometry.dispose();
      material.dispose();
      touchTexture.texture.dispose();
      renderer.dispose();

      if (renderer.domElement && renderer.domElement.parentNode === el) {
        el.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0" aria-hidden="true" />;
}

function Grid() {
  return (
    <div className="fixed inset-0 -z-30">
      <div className="absolute inset-0 bg-stone-950" />
      <div className="absolute -top-56 left-1/2 h-[980px] w-[980px] -translate-x-1/2 rounded-full bg-emerald-500/8 blur-[120px]" />
      <div className="absolute -top-32 -left-48 h-[720px] w-[720px] rounded-full bg-white/6 blur-[110px]" />
      <div className="absolute -bottom-48 -right-48 h-[820px] w-[820px] rounded-full bg-emerald-400/6 blur-[130px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]" />
    </div>
  );
}

function HomeLiquidBackdrop() {
  const gridStyle = {
    backgroundImage:
      "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
    backgroundSize: "96px 96px",
    backgroundPosition: "center",
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0 bg-[#0C1016]" />
      {/* Liquid */}
      <div className="absolute -inset-[30vh] opacity-40 blur-xl">
        <LiquidBackground />
      </div>
      {/* Grid + vignettes */}
      <div className="absolute inset-0 opacity-[0.14]" style={gridStyle} />
      <div className="absolute inset-0 bg-[radial-gradient(1000px_700px_at_50%_15%,rgba(0,0,0,0.00),rgba(0,0,0,0.35)_55%,rgba(0,0,0,0.70)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/55" />
      {/* Grain */}
      <div className="absolute inset-0 grain-opaque opacity-40" />
    </div>
  );
}

// ---------- form components ----------

function Fieldset({ title, children }) {
  return (
    <fieldset className="rounded-[1.75rem] md:rounded-[2.5rem] border-2 border-stone-900/10 bg-[#F5F2EA]/50 backdrop-blur-sm p-5 sm:p-6 md:p-10 text-left">
      <legend className="px-5 text-[10px] font-black text-emerald-700 uppercase tracking-[0.4em] mb-4">{title}</legend>
      <div className="mt-4 space-y-6 md:space-y-8">{children}</div>
    </fieldset>
  );
}

function Input({ label, placeholder, name, required = true }) {
  return (
    <label className="block text-left">
      <div className="text-[10px] font-black tracking-widest text-stone-500 uppercase mb-3">{label}</div>
      <input type="text" name={name} required={required} placeholder={placeholder} className="w-full min-h-11 rounded-xl md:rounded-[1.25rem] border-2 border-stone-900/10 bg-white px-4 md:px-6 py-3 md:py-5 text-base md:text-lg font-bold focus:outline-none focus:ring-4 focus:ring-emerald-600/10 focus:border-emerald-600 transition-all shadow-inner placeholder:text-stone-300" />
    </label>
  );
}

function Textarea({ label, placeholder, name, required = true }) {
  return (
    <label className="block text-left">
      <div className="text-[10px] font-black tracking-widest text-stone-500 uppercase mb-3">{label}</div>
      <textarea name={name} required={required} rows={4} placeholder={placeholder} className="w-full min-h-[140px] resize-y rounded-xl md:rounded-[1.25rem] border-2 border-stone-900/10 bg-white px-4 md:px-6 py-3 md:py-5 text-base md:text-lg font-bold focus:outline-none focus:ring-4 focus:ring-emerald-600/10 focus:border-emerald-600 transition-all shadow-inner placeholder:text-stone-300" />
    </label>
  );
}

function Select({ label, options }) {
  return (
    <label className="block text-left">
      <div className="text-[10px] font-black tracking-widest text-stone-500 uppercase mb-3">{label}</div>
      <select className="w-full min-h-11 rounded-xl md:rounded-[1.25rem] border-2 border-stone-900/10 bg-white px-4 md:px-6 py-3 md:py-5 text-base md:text-lg font-bold focus:outline-none focus:ring-4 focus:ring-emerald-600/10 focus:border-emerald-600 transition-all shadow-md appearance-none">
        {options.map((o) => (<option key={o} value={o}>{o}</option>))}
      </select>
    </label>
  );
}

// ---------- pages ----------

function Home() {
  return (
    <div className="relative pt-6 md:pt-12 space-y-10 md:space-y-16">
      <section className="relative z-10 min-h-[calc(100vh-170px)] md:h-[calc(100vh-170px)]">
        <div className="grid h-full grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-0">
          <div className="flex flex-col justify-center pr-0 lg:pr-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black tracking-tighter leading-[0.95] md:leading-[0.9] text-white">
              {COPY.home.productName} {COPY.home.h1Line1} <span className="text-emerald-500">{COPY.home.h1Line1Accent}</span> {COPY.home.h1Line1Suffix}
              {COPY.home.h1Line2Accent && (<>
                <br />
                <span className="text-emerald-500">{COPY.home.h1Line2Accent}</span>
              </>)}
            </h1>
            <p className="mt-6 text-[17px] text-white/80 font-semibold leading-relaxed">{COPY.home.sub}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href={BOOKING_URL}>{COPY.home.ctaPrimary}</Button>
              <Button href="#/case-studies" variant="secondary">
                {COPY.home.ctaSecondary}
              </Button>
            </div>

          <div className="flex flex-col justify-center pl-0 lg:pl-8">
            <div className="text-sm font-black tracking-[0.4em] text-emerald-400 uppercase mb-1">{COPY.home.trustedKicker}</div>
            <p className="text-[17px] text-white/65 font-semibold mb-4">{COPY.home.trustedSub}</p>
            <img
              src="/logos-sheet.png"
              alt="Trusted by Kaiser Permanente, Stanford University, NVIDIA, PG&E, CommonSpirit Health, Drew Medical, The Anthemist, City of Concord, DGRP Baysound, Rhythm & Roux, Parade of Youth, Chevron"
              className="w-full object-contain"
            />
          </div>
        </div>
      </section>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={CONFIGURE_URL}
                className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(16,185,129,0.35)] hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300/60"
              >
                {CTA_LABEL}
              </a>
              <a
                href="#/case-studies"
                className="inline-flex items-center justify-center rounded-xl border border-white/18 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/25"
              >
                VIEW CASE STUDIES
              </a>
            </div>

      <section className="mt-12 md:mt-14 border border-white/10 bg-black/40 backdrop-blur-xl p-6 sm:p-8 md:p-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          <div>
            <div className="text-sm font-black tracking-[0.4em] text-emerald-500 uppercase mb-8">{COPY.home.equationKicker}</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-none">{COPY.home.equationHeadline}</h2>
            <p className="mt-8 text-[17px] text-white/80 leading-relaxed font-semibold">{COPY.home.equationBody}</p>
          </div>
          <div className="border border-white/10 p-10 bg-white/5 relative overflow-hidden">
            <div className="text-sm font-black tracking-[0.3em] text-white/65 uppercase mb-12">{COPY.home.coreArch}</div>
            <div className="space-y-6">
              {COPY.home.architecture.map((layer, i) => (
                <div key={layer.title} className="border-b border-white/5 pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-black tracking-widest text-emerald-400">0{i + 1}</span>
                    <span className="text-lg font-black text-white">{layer.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Infrastructure() {
  const { whoWeServe, howItWorks } = COPY.infrastructure;
  return (
    <div className="pt-12 space-y-20 relative z-10">
      <div className="max-w-4xl text-left">
        <div className="text-sm font-black tracking-[0.5em] text-emerald-500 uppercase mb-8">{COPY.infrastructure.kicker}</div>
        <h1 className="text-4xl sm:text-5xl md:text-[8rem] font-black tracking-tighter text-white leading-[0.95] md:leading-[0.9] whitespace-pre-line">{COPY.infrastructure.h1}</h1>
        <p className="mt-8 md:mt-12 text-xl sm:text-2xl md:text-4xl text-white/80 font-semibold">{COPY.infrastructure.sub}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 text-left">
        {INFRA_LAYERS.map((layer) => (
          <Card key={layer.note} title={layer.title} eyebrow={layer.note}>
            <p className="text-base md:text-lg leading-relaxed text-stone-700">{layer.desc}</p>
          </Card>
        ))}
      </div>

      <section className="border border-white/10 bg-black/40 backdrop-blur-xl p-6 md:p-8 relative z-10">
        <div className="max-w-2xl">
          <div className="text-xs font-black tracking-[0.4em] text-emerald-500 uppercase mb-4">{whoWeServe.kicker}</div>
          <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white leading-tight mb-4">{whoWeServe.headline}</h3>
          <p className="text-[17px] text-white/80 font-semibold leading-relaxed">{whoWeServe.body}</p>
        </div>
      </section>

      <section className="relative z-10">
        <div className="text-sm font-black tracking-[0.5em] text-emerald-500 uppercase mb-8">{howItWorks.kicker}</div>
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-none mb-14">{howItWorks.headline}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {howItWorks.tiers.map((tier) => (
            <div key={tier.title} className="border border-white/10 bg-black/40 p-10 hover:bg-emerald-500/5 transition-colors">
              <h3 className="text-xl font-black text-white uppercase mb-4">{tier.title}</h3>
              <p className="text-[17px] text-white/80 font-semibold leading-relaxed">{tier.desc}</p>
            </div>
            <div>
              <h3 className="text-xl font-black tracking-tight text-stone-950">Ops</h3>
              <p className="mt-4 text-base md:text-lg leading-relaxed text-stone-700">
                We run it each month with a short report tied to booked calls.
              </p>
            </div>
          </div>
        </Card>
      </div>
      <section className="rounded-[2rem] md:rounded-[3rem] border-2 border-stone-900/10 bg-white/80 backdrop-blur-xl p-6 sm:p-8 md:p-16 shadow-2xl text-left">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-stone-950">Your flow is ready.</h2>
        <div className="mt-10">
          <Button href={CONFIGURE_URL} variant="primary" size="large">{CTA_LABEL}</Button>
        </div>
      </section>

      <section className="text-center py-20 border-t border-white/10 relative z-10">
        {COPY.infrastructure.outroLines.length > 0 && (
          <p className="text-3xl md:text-5xl font-black text-white leading-tight mb-12">
            {COPY.infrastructure.outroLines.map((line) => (
              <React.Fragment key={line}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
        )}
        <Button href={BOOKING_URL}>{COPY.infrastructure.cta}</Button>
      </section>
    </div>
  );
}

function CaseStudies() {
  const items = useMemo(() => [
    { title: "Healthcare Services Firm", industry: "Case Study 01", problem: "Qualified relationships stalled at intake. Messaging reached peers rather than decision-makers. Revenue sat in a dormant database with no system to activate it.", deployment: "+41% Qualified Opportunities 90 Days", stats: [{ label: "After", value: "+41%", sub: "qualified opportunities" }, { label: "Timeline", value: "90", sub: "days" }], highlights: ["Strategic Language", "Owned Infrastructure", "Full Deployment"] },
    { title: "Regional Energy Consultancy", industry: "Case Study 02", problem: "High referral volume arriving with no nurture system to move relationships from interest to retained engagement. Authority was established. The conversion system did not exist.", deployment: "+27% Proposal-to-Close Rate +18% Average Engagement Size", stats: [{ label: "Close Rate", value: "+27%", sub: "proposal-to-close" }, { label: "Engagement", value: "+18%", sub: "average size" }], highlights: ["Strategic Language", "Lifecycle Sequences"] },
    { title: "Professional Services Network", industry: "Case Study 03", problem: "Strong institutional reputation with no owned distribution. Every new relationship depended entirely on referral. The network existed. The conversion path did not.", deployment: "340 Qualified Subscribers 12 Retained Clients 6 Months", stats: [{ label: "Subscribers", value: "340", sub: "qualified" }, { label: "Clients", value: "12", sub: "retained" }, { label: "Timeline", value: "6", sub: "months" }], highlights: ["Owned Infrastructure", "Full Deployment"] },
  ], []);

  return (
    <div className="pt-12 relative z-10">
      <div className="text-left mb-12 md:mb-24 max-w-4xl">
        <div className="text-sm font-black tracking-[0.5em] text-emerald-500 uppercase mb-8">{COPY.caseStudies.kicker}</div>
        <h1 className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter text-white leading-[0.95] md:leading-[0.9]">{COPY.caseStudies.title}</h1>
        {COPY.caseStudies.sub && <p className="mt-8 text-[17px] text-white/80 font-semibold leading-tight">{COPY.caseStudies.sub}</p>}
      </div>
      <div className="space-y-8 relative z-10">
        {COPY.caseStudies.cards.map((cs) => (
          <div key={cs.client} className="border border-white/10 bg-black/40 p-6 sm:p-8 md:p-14 hover:bg-white/5 transition-all relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
              <div>
                <span className="inline-block border border-emerald-500/30 px-3 py-1 text-sm font-black tracking-widest text-emerald-400 uppercase mb-4">{cs.badge}</span>
                <div className="text-2xl font-black text-white uppercase mb-6">{cs.client}</div>
                <div className="text-6xl font-black text-emerald-400 leading-none">{cs.outcome}</div>
                <div className="text-sm font-black tracking-widest text-white/65 uppercase mt-2">{cs.outcomeLabel}</div>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="text-sm font-black tracking-widest text-white/65 uppercase mb-2">Challenge</div>
                  <p className="text-[17px] font-semibold text-white/85 leading-relaxed">{cs.challenge}</p>
                </div>
                <div className="mt-8 rounded-[1.5rem] md:rounded-[2rem] border-2 border-stone-900/10 bg-white p-5 sm:p-6 md:p-8 shadow-lg text-left">
                  <div className="text-[10px] font-black tracking-widest text-stone-500 uppercase mb-4 leading-none text-left">BEFORE</div>
                  <div className="text-lg font-bold text-stone-950 leading-tight text-left">{cs.problem}</div>
                </div>
              </div>
              <div className="lg:col-span-2 space-y-10 text-left">
                <div className="grid md:grid-cols-3 gap-6 text-left">
                  {cs.stats.map((s) => (<Stat key={s.label} label={s.label} value={s.value} sub={s.sub} />))}
                </div>
                <div className="rounded-[1.75rem] md:rounded-[2.5rem] border-2 border-stone-900/10 bg-white p-5 sm:p-6 md:p-12 shadow-2xl text-left">
                  <div className="text-[10px] font-black tracking-[0.3em] text-emerald-700 uppercase mb-10 leading-none text-left">FLOW COMPONENTS</div>
                  <div className="mt-6 flex flex-wrap gap-4 text-left">
                    {cs.highlights.map((h) => (<span key={h} className="rounded-2xl border-2 border-stone-900/10 bg-[#F5F2EA] px-8 py-5 text-sm font-black tracking-tight text-stone-950 shadow-lg text-left">{h}</span>))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-black tracking-widest text-white/65 uppercase mb-2">Methodology</div>
                  <p className="text-sm font-semibold text-white/65 leading-relaxed">{cs.methodology}</p>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <div className="mb-24 py-12 border-y border-white/10 overflow-hidden relative z-10">
        {COPY.caseStudies.trustedKicker && (
          <div className="text-sm font-black tracking-[0.3em] text-emerald-500 uppercase mb-12 text-center">{COPY.caseStudies.trustedKicker}</div>
        )}
        <img
          src="/logos-sheet.png"
          alt="Trusted by Kaiser Permanente, Stanford University, NVIDIA, PG&E, CommonSpirit Health, Drew Medical, The Anthemist, City of Concord, DGRP Baysound, Rhythm & Roux, Parade of Youth, Chevron"
          className="w-full max-w-4xl mx-auto object-contain"
        />
      </div>

      <section className="text-center py-16 md:py-24 mt-16 md:mt-24 relative z-10">
        <Button href={BOOKING_URL}>{COPY.caseStudies.cta}</Button>
      </section>

      <section className="border border-emerald-500/40 bg-emerald-500/5 p-6 sm:p-8 md:p-20 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">{COPY.home.closingHeadline}</h2>
          <Button href={BOOKING_URL}>{COPY.shell.topCta}</Button>
        </div>
      </section>
    </div>
  );
}

function Contact() {
  return (
    <div className="pt-6 md:pt-12 max-w-5xl mx-auto relative z-10">
      <section className="border border-white/10 bg-black/40 backdrop-blur-xl px-4 sm:px-6 md:px-16 py-8 sm:py-10 md:py-20">
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-sm font-black tracking-[0.5em] text-emerald-500 uppercase mb-8">{COPY.contact.kicker}</div>
          <h1 className="text-3xl sm:text-4xl md:text-7xl font-black tracking-tighter text-white leading-[0.95]">{COPY.contact.title}</h1>
          <div className="h-[2px] w-24 bg-emerald-500/90 mx-auto mt-6 md:mt-8 mb-6 md:mb-8" />
          <p className="text-[17px] text-white/85 font-semibold leading-relaxed">{COPY.contact.sub}</p>
        </div>
        <form
          action={CONTACT_FORM_ENDPOINT}
          method="POST"
          className="mt-8 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
        >
          <input type="hidden" name="xnQsjsdp" value="b45ce04ddd76914bbfeade30ab0a6e86446ed07ddcd64b5425a1a4d9d5a467b8" readOnly />
          <input type="hidden" name="zc_gad" id="zc_gad" value="" readOnly />
          <input type="hidden" name="xmIwtLD" value="97ca543a3d1ea88492628d126d9ab329b04cea167679b0225170279c6fc6e4f3684dbc3fb82c598c93398f0f68dcd29b" readOnly />
          <input type="hidden" name="actionType" value="TGVhZHM=" readOnly />
          <input type="hidden" name="returnURL" value={ZOHO_RETURN_URL} readOnly />
          <input type="hidden" name="aG9uZXlwb3Q" value="" readOnly />

          <div>
            <label htmlFor="company" className="block text-xs font-black tracking-[0.2em] uppercase text-white/70 mb-2">Company *</label>
            <input id="company" type="text" name="Company" required placeholder="Company" className="w-full bg-white/[0.02] border border-white/20 px-5 py-4 text-[17px] font-semibold text-white placeholder:text-white/35 focus:outline-none focus:border-emerald-500" />
          </div>

          <div>
            <label htmlFor="designation" className="block text-xs font-black tracking-[0.2em] uppercase text-white/70 mb-2">Title</label>
            <input id="designation" type="text" name="Designation" placeholder="Title" className="w-full bg-white/[0.02] border border-white/20 px-5 py-4 text-[17px] font-semibold text-white placeholder:text-white/35 focus:outline-none focus:border-emerald-500" />
          </div>

          <div>
            <label htmlFor="firstName" className="block text-xs font-black tracking-[0.2em] uppercase text-white/70 mb-2">First Name</label>
            <input id="firstName" type="text" name="First Name" placeholder="First Name (optional)" className="w-full bg-white/[0.02] border border-white/20 px-5 py-4 text-[17px] font-semibold text-white placeholder:text-white/35 focus:outline-none focus:border-emerald-500" />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-black tracking-[0.2em] uppercase text-white/70 mb-2">Email</label>
            <input id="email" type="email" name="Email" placeholder="Email" className="w-full bg-white/[0.02] border border-white/20 px-5 py-4 text-[17px] font-semibold text-white placeholder:text-white/35 focus:outline-none focus:border-emerald-500" />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-xs font-black tracking-[0.2em] uppercase text-white/70 mb-2">Last Name *</label>
            <input id="lastName" type="text" name="Last Name" required placeholder="Last Name" className="w-full bg-white/[0.02] border border-white/20 px-5 py-4 text-[17px] font-semibold text-white placeholder:text-white/35 focus:outline-none focus:border-emerald-500" />
          </div>

          <div>
            <label htmlFor="primaryChannel" className="block text-xs font-black tracking-[0.2em] uppercase text-white/70 mb-2">Primary Channel</label>
            <input id="primaryChannel" type="text" name="LEADCF2" placeholder="Primary Channel" className="w-full bg-white/[0.02] border border-white/20 px-5 py-4 text-[17px] font-semibold text-white placeholder:text-white/35 focus:outline-none focus:border-emerald-500" />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="audienceDescription" className="block text-xs font-black tracking-[0.2em] uppercase text-white/70 mb-2">Audience Description</label>
            <textarea id="audienceDescription" name="Description" placeholder="Audience Description" rows={3} className="w-full bg-white/[0.02] border border-white/20 px-5 py-4 text-[17px] font-semibold text-white placeholder:text-white/35 focus:outline-none focus:border-emerald-500" />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="additionalContext" className="block text-xs font-black tracking-[0.2em] uppercase text-white/70 mb-2">Additional Context</label>
            <textarea id="additionalContext" name="LEADCF1" placeholder="Additional Context" rows={4} className="w-full bg-white/[0.02] border border-white/20 px-5 py-4 text-[17px] font-semibold text-white placeholder:text-white/35 focus:outline-none focus:border-emerald-500" />
          </div>

          <div className="md:col-span-2 flex justify-start mt-2">
            <button type="submit" className="bg-emerald-600 w-full sm:w-auto px-8 md:px-10 py-4 min-h-[44px] text-sm font-black tracking-[0.3em] uppercase text-white hover:bg-emerald-500 transition-colors">
              {COPY.contact.submitIdle}
            </button>
          </div>
        </form>

        <div className="mt-12 border border-white/10 bg-white/[0.02] p-6 md:p-8">
          <p className="text-sm font-black tracking-[0.3em] uppercase text-emerald-400 mb-3">Qualification</p>
          <p className="text-[17px] text-white/80 font-semibold leading-relaxed">
            We review every assessment request and engage with operators whose database and channels are ready to activate.
          </p>
        </div>
      </section>
    </div>
  );
}


function ThankYou() {
  return (
    <div className="pt-20 max-w-4xl mx-auto relative z-10">
      <section className="border border-white/10 bg-black/40 backdrop-blur-xl px-4 sm:px-8 md:px-16 py-10 md:py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white">Thanks. We got your request.</h1>
        <p className="mt-6 text-[17px] text-white/80 font-semibold">Our team will review and follow up shortly.</p>
        <div className="mt-10">
          <Button href="#/">Back Home</Button>
        </div>
      </section>
    </div>
  );
}

function Shell({ children, route }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [route]);

  const active = (href) => {
    const r = href.replace(/^#/, "").toLowerCase();
    return route === r || (route === "/" && r === "/");
  };

  return (
    <div className="min-h-screen text-white selection:bg-emerald-600 selection:text-white font-sans relative">
      {route === "/" ? <LiquidBackground /> : <InnerBackground />}
      <Grid opacityClass={route === "/" ? "opacity-20" : "opacity-10"} />

      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="max-w-[1800px] mx-auto flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 md:py-8">
          <a href="#/" className="group shrink-0">
            <img
              src={sfsLogo}
              alt={COPY.shell.brand}
              className="h-8 sm:h-10 md:h-12 w-auto object-contain opacity-95 group-hover:opacity-100 transition-opacity"
            />
          </a>

          <nav className="hidden md:flex gap-4 md:gap-8 mr-6 md:mr-14">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cx(
                  "text-sm md:text-base hover:opacity-80 transition rounded-2xl px-3 py-2 font-medium tracking-wide",
                  active(item.href)
                    ? "bg-stone-950 text-white shadow-2xl"
                    : "text-stone-600 hover:text-stone-950 hover:bg-white/50"
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={BOOKING_URL}
              className="border border-emerald-500/50 px-3 sm:px-4 md:px-6 py-2.5 md:py-3 text-[10px] sm:text-xs md:text-sm font-black tracking-[0.18em] sm:tracking-[0.22em] md:tracking-[0.3em] uppercase hover:bg-emerald-500 transition-all whitespace-nowrap min-h-[44px] inline-flex items-center"
            >
              {COPY.shell.topCta}
            </a>
            <button
              type="button"
              className="md:hidden border border-white/20 p-3 min-h-[44px] min-w-[44px] inline-flex items-center justify-center"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              <span className="text-lg leading-none">{mobileMenuOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-white/10 px-4 pb-4 pt-2 bg-black/95">
            <div className="flex flex-col gap-2">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={cx(
                    "px-2 py-3 text-xs font-black tracking-[0.2em] uppercase transition-colors",
                    active(item.href) ? "text-emerald-400" : "text-white/75 hover:text-white"
                  )}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main className="max-w-[1800px] mx-auto px-4 sm:px-6 md:px-12 pt-24 md:pt-32 pb-24 md:pb-48 relative z-10">{children}</main>

      <footer className="border-t border-white/10 bg-black relative z-50">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16 grid lg:grid-cols-3 gap-10 md:gap-16">
          <div>
            <img src={sfsLogo} alt={COPY.shell.brand} className="h-14 w-auto object-contain mb-4 opacity-95" />
            <div className="text-sm font-black tracking-[0.4em] text-white/65 uppercase">{COPY.shell.footerSub}</div>
          </div>
          <form
            action={MAILING_LIST_ENDPOINT}
            onSubmit={(e) => e.preventDefault()}
            className="border border-white/10 bg-white/[0.02] p-6"
          >
            <p className="text-base font-semibold text-white mb-4">Join our mailing list for the latest insights.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="Email"
                className="flex-1 bg-transparent border border-white/20 px-4 py-3 text-xs text-white placeholder:text-white/65 focus:outline-none focus:border-emerald-500"
              />
              <button type="submit" className="bg-emerald-600 px-5 py-3 min-h-[44px] text-sm font-black tracking-[0.24em] uppercase hover:bg-emerald-500">
                Join
              </button>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}
export default function App() {
  const route = useHashRoute();

  // Ensure route changes land at the top (hash-based navigation doesn't do this automatically)
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    } catch {
      window.scrollTo(0, 0);
    }
  }, [route]);

  const page = useMemo(() => {
    switch (route) {
      case "/infrastructure":
        return <Infrastructure />;
      case "/case-studies":
        return <CaseStudies />;
      case "/contact":
        return <Contact />;
      case "/terms":
        return <PolicyPage policy={TERMS_POLICY} />;
      case "/privacy":
        return <PolicyPage policy={PRIVACY_POLICY} />;
      case "/thank-you":
        return <ThankYou />;
      default:
        return <Home />;
    }
  }, [route]);
  return <Shell route={route}>{page}</Shell>;
}
