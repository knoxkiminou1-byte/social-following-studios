import React, { useEffect, useMemo, useState, useRef } from "react";

const NAV = [
  { label: "01 Home", href: "#/" },
  { label: "02 The Program", href: "#/infrastructure" },
  { label: "03 Case Studies", href: "#/case-studies" },
  { label: "04 Contact", href: "#/contact" },
];

const BOOKING_URL = "https://app.cal.com/socialfollowing";
const CONTACT_FORM_ENDPOINT = "https://crm.zoho.com/crm/WebToLeadForm";
const ZOHO_RETURN_URL = "https://socialfollowingstudios.com/#/thank-you";
const MAILING_LIST_ENDPOINT = "#";
const BRAND_LOGO_PATH = "/brand/sfs-logo.png";

const MARQUEE_NAMES = [
  "Stanford University",
  "City of Concord",
  "Drew Medical",
  "Roux",
  "DGRP",
  "Parade of Youth",
  "The Anthemist",
  "D55",
  "PG&E",
];



const COPY = {
  home: {
    headline: "Your database, reactivated.",
    sub: "Social Following Studios reactivates dormant contact databases for organizations operating under active compliance mandates, with a 95% inbox placement record across every program we run.",
    ctaPrimary: "BOOK YOUR ASSESSMENT",
    ctaSecondary: "View Case Studies",
    trustedKicker: "TRUSTED BY",
    authorityKicker: "THE PROGRAM",
    authorityHeadline: "When a database stops producing revenue, the source of the performance gap is the program managing it.",
    authorityBody: "Organizations operating under active compliance mandates have built contact databases from years of earned permission and documented relationship. When that database stops producing revenue, the source of the performance gap is the program managing it.",
    authoritySub: "Social Following Studios operates as the full program owner, managing strategy, execution, reporting, and channel coordination through one team from open to close.",
    proofKicker: "PROOF",
    proofBody: "A compliance sector client completed a coordinated reactivation sequence across three live channels simultaneously. More than 14,000 disengaged contacts returned to active status within 14 days, from the existing database and within the existing program budget.",
    proofStatement: "Your database, reactivated.",
    closingHeadline: "Your database, reactivated.",
    closingSub: "We are accepting assessment calls for organizations ready to understand what their existing database can produce. There is no proposal before the assessment. The assessment produces the numbers. The numbers drive the decision.",
    closingCta: "Book Your Assessment",
  },
  infrastructure: {
    kicker: "THE PROGRAM",
    h1: "One program. Every channel.",
    sub: "Managed end-to-end by Social Following Studios.",
    layers: [
      {
        note: "01 We Assess It",
        title: "We audit the database.",
        desc: "We assess your contact database, deliverability health, and channel infrastructure to identify exactly where the reactivation gap is.",
      },
      {
        note: "02 We Build It",
        title: "We build the program.",
        desc: "We build the full reactivation program across every live channel — email, conversational, and voice — coordinated from one team.",
      },
      {
        note: "03 We Run It",
        title: "We run the deployment.",
        desc: "We execute the program, manage deliverability, and report on reactivation progress against your program targets.",
      },
    ],
    whoWeServe: {
      kicker: "WHO WE SERVE",
      headline: "Organizations with dormant databases and active compliance obligations.",
      body: "We work with organizations that have built real contact databases from years of earned permission — legal, government, healthcare, real estate, and manufacturing — whose outreach programs have gone quiet.",
      closing: "",
    },
    howItWorks: {
      kicker: "HOW IT WORKS",
      headline: "All engagements begin with a Database Assessment.",
      tiers: [
        {
          title: "Assessment",
          desc: "A focused audit of your database, deliverability health, and channel gaps — delivered as a written report with a clear reactivation path.",
        },
        {
          title: "Full Program",
          desc: "Your complete reactivation program, built and launched across every live channel within your existing budget and infrastructure.",
        },
        {
          title: "Retained Management",
          desc: "We manage the program on an ongoing basis with monthly deliverability reporting and reactivation tracking tied to your program targets.",
        },
      ],
    },
    outroLines: [],
    outroSub: "",
    cta: "BOOK YOUR ASSESSMENT",
  },
  caseStudies: {
    kicker: "CASE STUDIES",
    title: "Results from real engagements.",
    cards: [
      {
        badge: "A federal housing agency recovered constituent engagement at program scale without new budget or new infrastructure.",
        narrative: "A federal housing agency managing constituent communication across active waitlist programs engaged Social Following Studios to run the full outreach program. Coordinated communication reached applicants across every live channel within the existing program infrastructure. Constituent engagement returned to active status at program scale.",
        quote: "",
        quoteAttrib: "",
      },
      {
        badge: "A plaintiff database reached multi-million dollar resolution after competing firms had already reached the same claimant pool.",
        narrative: "A plaintiff database had gone dormant while competing firms reached the same claimant pool. The industry average inbox placement rate sits at 83.5%. Outreach that does not reach the inbox does not reach the claimant. We ran the deliverability program at 95% inbox placement, sequenced the outreach, and built the communication program around claimant trust. The matter reached multi-million dollar resolution.",
        quote: "Our messaging reached our claimants. That was the difference.",
        quoteAttrib: "Managing Attorney, mass tort firm — quoted anonymously at client's request",
      },
      {
        badge: "A regional broker produced 11 signed listing agreements in 45 days from a database the business had stopped using.",
        narrative: "A regional broker had a past-client database of buyers and sellers who had gone quiet while the business spent money acquiring new leads. A unified reactivation sequence ran across email, conversational, and voice channels simultaneously. The existing database produced 11 signed listing agreements within 45 days without new list acquisition or additional spend.",
        quote: "The buyers and sellers we thought were gone came back through the same list we had ignored for years.",
        quoteAttrib: "",
      },
      {
        badge: "A manufacturing organization recovered procurement relationships that had stopped responding after a program transition.",
        narrative: "A manufacturing organization had a vendor and procurement contact database that had gone quiet after a program transition while relationships representing active buying history stopped responding entirely. A reactivation sequence ran across the existing database. Procurement contacts returned to active engagement within the first program cycle without new list acquisition or additional budget.",
        quote: "We recovered relationships we assumed were gone permanently.",
        quoteAttrib: "",
      },
    ],
    outroLines: [],
    cta: "BOOK YOUR ASSESSMENT",
  },
  contact: {
    kicker: "CONTACT",
    title: "Book Your Call.",
    sub: "Every engagement starts with a Database Assessment. There is no proposal before the assessment. The assessment produces the numbers. The numbers drive the decision.",
    submitIdle: "SUBMIT",
    submitDone: "SUBMITTED",
  },
  shell: {
    brand: "Social Following Studios",
    brandSub: "Database Reactivation",
    topCta: "BOOK YOUR ASSESSMENT",
    footerSub: "An imprint of Marchitects.",
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

function Button({ href, children, variant = "primary" }) {
  const base =
    "inline-flex items-center justify-center px-7 py-3 text-sm font-semibold tracking-wide rounded-full transition-all active:scale-[0.98] relative z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2";
  const styles =
    variant === "primary"
      ? "bg-emerald-600 text-white hover:bg-emerald-500 shadow-sm"
      : "bg-white text-[#0A0A0A] border border-black/15 hover:border-black/30 hover:bg-white shadow-sm";
  return (
    <a href={href} className={cx(base, styles)}>
      {children}
    </a>
  );
}

function PolicyPage({ policy }) {
  return (
    <section className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 py-20 text-[#0A0A0A]">
      <p className="text-sm font-black tracking-[0.28em] uppercase text-emerald-400/90 mb-4">Last Updated: {POLICY_TEMPLATE.updatedAt}</p>
      <h1 className="text-4xl md:text-5xl font-black tracking-tight uppercase mb-5">{policy.title}</h1>
      <p className="text-[17px] leading-7 text-[#0A0A0A]/75 mb-10">{policy.intro}</p>
      <div className="space-y-8">
        {policy.sections.map((section) => (
          <article key={section.heading} className="border border-black/10 bg-black/[0.03] p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-wide mb-3">{section.heading}</h2>
            <p className="text-[17px] leading-7 text-[#0A0A0A]/75">{section.body}</p>
          </article>
        ))}
      </div>
      <p className="mt-10 text-[17px] text-[#0A0A0A]/75">
        Questions? Contact {POLICY_TEMPLATE.siteName} at {POLICY_TEMPLATE.email}.
      </p>
    </section>
  );
}

function LiquidBackground() {
  const containerRef = useRef(null);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    script.async = true;
    document.head.appendChild(script);
    script.onload = () => {
      const THREE = window.THREE;
      class TouchTexture {
        constructor() {
          this.size = 128;
          this.width = this.height = this.size;
          this.maxAge = 64;
          this.radius = 0.15 * this.size;
          this.speed = 1 / this.maxAge;
          this.trail = [];
          this.last = null;
          this.initTexture();
        }
        initTexture() {
          this.canvas = document.createElement("canvas");
          this.canvas.width = this.width;
          this.canvas.height = this.height;
          this.ctx = this.canvas.getContext("2d");
          this.ctx.fillStyle = "black";
          this.ctx.fillRect(0, 0, this.width, this.height);
          this.texture = new THREE.Texture(this.canvas);
        }
        update() {
          this.ctx.fillStyle = "black";
          this.ctx.fillRect(0, 0, this.width, this.height);
          for (let i = this.trail.length - 1; i >= 0; i--) {
            const point = this.trail[i];
            let f = point.force * this.speed * (1 - point.age / this.maxAge);
            point.x += point.vx * f;
            point.y += point.vy * f;
            point.age++;
            if (point.age > this.maxAge) {
              this.trail.splice(i, 1);
            } else {
              const pos = { x: point.x * this.width, y: (1 - point.y) * this.height };
              let intensity =
                point.age < this.maxAge * 0.3
                  ? Math.sin((point.age / (this.maxAge * 0.3)) * (Math.PI / 2))
                  : 1.0 - point.age / this.maxAge;
              intensity *= point.force;
              let offset = this.size * 5;
              this.ctx.shadowOffsetX = this.ctx.shadowOffsetY = offset;
              this.ctx.shadowBlur = this.radius;
              this.ctx.shadowColor = `rgba(${((point.vx + 1) / 2) * 255}, ${((point.vy + 1) / 2) * 255}, ${intensity * 255}, ${0.3 * intensity})`;
              this.ctx.beginPath();
              this.ctx.fillStyle = "rgba(255,0,0,1)";
              this.ctx.arc(pos.x - offset, pos.y - offset, this.radius, 0, Math.PI * 2);
              this.ctx.fill();
            }
          }
          this.texture.needsUpdate = true;
        }
        addTouch(point) {
          if (this.last) {
            const dx = point.x - this.last.x,
              dy = point.y - this.last.y;
            if (dx === 0 && dy === 0) return;
            const dd = dx * dx + dy * dy;
            let d = Math.sqrt(dd);
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
        uColor1: { value: new THREE.Vector3(0.07, 0.74, 0.5) },
        uColor2: { value: new THREE.Vector3(0.91, 0.92, 0.92) },
        uSpeed: { value: 0.55 },
        uIntensity: { value: 0.85 },
        uTouchTexture: { value: touchTexture.texture },
        uGrainIntensity: { value: 0.08 },
        uDarkNavy: { value: new THREE.Vector3(0.88, 0.89, 0.90) },
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
    return () => {
      const s = document.querySelector('script[src*="three.min.js"]');
      if (s) document.head.removeChild(s);
    };
  }, []);
  return <div ref={containerRef} className="fixed inset-0 -z-30 bg-[#E8E9EA]" />;
}

function InnerBackground() {
  return (
    <div className="fixed inset-0 -z-30">
      <div className="absolute inset-0 bg-[#E8E9EA]" />
      <div className="absolute -top-56 left-1/2 h-[980px] w-[980px] -translate-x-1/2 rounded-full bg-emerald-400/10 blur-[140px]" />
      <div className="absolute -top-32 -left-48 h-[720px] w-[720px] rounded-full bg-white/40 blur-[110px]" />
      <div className="absolute -bottom-48 -right-48 h-[820px] w-[820px] rounded-full bg-emerald-300/8 blur-[150px]" />
    </div>
  );
}

function Grid({ opacityClass = "opacity-20" }) {
  return (
    <svg
      className={`fixed inset-0 h-full w-full -z-20 pointer-events-none ${opacityClass}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="archGrid" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#archGrid)" />
    </svg>
  );
}

function ScrollingMarquee() {
  const names = [...MARQUEE_NAMES, ...MARQUEE_NAMES];
  return (
    <div className="relative overflow-hidden w-full py-3">
      <div
        className="flex gap-12 whitespace-nowrap"
        style={{
          animation: "marquee 28s linear infinite",
          width: "max-content",
        }}
      >
        {names.map((name, i) => (
          <span
            key={i}
            className="text-sm font-black tracking-[0.28em] uppercase text-[#0A0A0A]/50"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

function BrandLogo({ className = "", priority = false }) {
  const [imageFailed, setImageFailed] = useState(false);
  if (imageFailed) {
    return <span className="text-lg md:text-2xl font-black tracking-[0.08em] uppercase text-[#0A0A0A]">Social Following Studios</span>;
  }
  return (
    <img
      src={BRAND_LOGO_PATH}
      alt="Social Following Studios"
      className={cx("block h-auto w-full max-w-full object-contain", className)}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => setImageFailed(true)}
    />
  );
}

function Home() {
  return (
    <div className="relative pt-12 space-y-16">
      <section className="relative z-10 md:min-h-[calc(100vh-170px)] flex flex-col justify-center max-w-3xl">
        <h1 className="text-[clamp(2.4rem,9vw,5rem)] font-bold leading-[1.05] text-[#0A0A0A]" style={{fontFamily: "'Lora', Georgia, serif"}}>
          {COPY.home.headline}
        </h1>
        <p className="mt-6 text-[17px] text-[#0A0A0A]/75 font-semibold leading-relaxed max-w-2xl">{COPY.home.sub}</p>
        <div className="mt-8 md:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4">
          <Button href={BOOKING_URL}>{COPY.home.ctaPrimary}</Button>
          <Button href="#/case-studies" variant="secondary">
            {COPY.home.ctaSecondary}
          </Button>
        </div>
      </section>

      <section className="relative z-10 border-t border-b border-black/10 py-10 md:py-14">
        <div className="text-xs font-semibold tracking-[0.18em] text-[#4A4F54] uppercase mb-8 text-center">{COPY.home.trustedKicker}</div>
        <img
          src="/logos-approved.png"
          alt="Trusted by Stanford University, Drew Medical, The Anthemist, City of Concord, DGRP Baysound, Rhythm and Roux, Parade of Youth"
          className="w-full max-w-5xl mx-auto object-contain"
        />
      </section>

      <section className="relative z-10 border border-black/10 bg-white/60">
        <div className="aspect-video w-full flex flex-col items-center justify-center gap-4 bg-[#E8E9EA]">
          <div className="w-16 h-16 rounded-full border-2 border-emerald-600 flex items-center justify-center">
            <svg className="w-6 h-6 text-emerald-600 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
          <p className="text-sm font-medium text-[#4A4F54]" style={{fontFamily:"'Lora', Georgia, serif"}}>Program Explainer — Coming Soon</p>
        </div>
      </section>

      <section className="mt-6 relative z-10 border border-black/10 bg-white/60 backdrop-blur-xl p-8 md:p-16">
        <div className="text-xs font-semibold tracking-[0.18em] text-emerald-600 uppercase mb-4">{COPY.home.authorityKicker}</div>
        <h2 className="text-[clamp(1.6rem,5vw,2.5rem)] font-semibold text-[#0A0A0A] leading-snug mb-6" style={{fontFamily: "'Lora', Georgia, serif"}}>{COPY.home.authorityHeadline}</h2>
        <p className="text-[17px] text-[#0A0A0A]/75 font-semibold leading-relaxed mb-6">{COPY.home.authorityBody}</p>
        <p className="text-[17px] text-[#0A0A0A]/75 font-semibold leading-relaxed">{COPY.home.authoritySub}</p>
      </section>

      <section className="mt-0 relative z-10 border border-emerald-500/30 bg-emerald-50/60 p-8 md:p-16">
        <div className="text-xs font-semibold tracking-[0.18em] text-emerald-600 uppercase mb-4">{COPY.home.proofKicker}</div>
        <p className="text-[17px] text-[#0A0A0A]/80 font-semibold leading-relaxed mb-8">{COPY.home.proofBody}</p>
        <div className="text-[clamp(1.8rem,5vw,2.5rem)] font-semibold text-emerald-600" style={{fontFamily: "'Lora', Georgia, serif"}}>{COPY.home.proofStatement}</div>
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
        <h1 className="text-[clamp(2.25rem,10vw,8rem)] font-black tracking-tighter text-[#0A0A0A] leading-[0.92] whitespace-pre-line">{COPY.infrastructure.h1}</h1>
        <p className="mt-12 text-2xl md:text-4xl text-[#0A0A0A]/75 font-semibold">{COPY.infrastructure.sub}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {COPY.infrastructure.layers.map((L) => (
          <div
            key={L.title}
            className="bg-white/60 backdrop-blur-md p-10 text-left border border-black/10 hover:bg-emerald-500/5 transition-colors h-full relative z-10"
          >
            <div className="text-sm font-black tracking-[0.3em] text-emerald-500 mb-6">{L.note}</div>
            <h3 className="text-2xl font-black text-[#0A0A0A] mb-6 uppercase">{L.title}</h3>
            <p className="text-[17px] text-[#0A0A0A]/75 font-semibold leading-relaxed">{L.desc}</p>
          </div>
        ))}
      </div>

      <section className="border border-black/10 bg-white/60 backdrop-blur-xl p-6 md:p-8 relative z-10">
        <div className="max-w-2xl">
          <div className="text-xs font-black tracking-[0.4em] text-emerald-500 uppercase mb-4">{whoWeServe.kicker}</div>
          <h3 className="text-2xl md:text-3xl font-black tracking-tight text-[#0A0A0A] leading-tight mb-4">{whoWeServe.headline}</h3>
          <p className="text-[17px] text-[#0A0A0A]/75 font-semibold leading-relaxed">{whoWeServe.body}</p>
        </div>
      </section>

      <section className="relative z-10">
        <div className="text-sm font-black tracking-[0.5em] text-emerald-500 uppercase mb-8">{howItWorks.kicker}</div>
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-[#0A0A0A] leading-none mb-14">{howItWorks.headline}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {howItWorks.tiers.map((tier) => (
            <div key={tier.title} className="border border-black/10 bg-white/60 p-10 hover:bg-emerald-500/5 transition-colors">
              <h3 className="text-xl font-black text-[#0A0A0A] uppercase mb-4">{tier.title}</h3>
              <p className="text-[17px] text-[#0A0A0A]/75 font-semibold leading-relaxed">{tier.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center py-20 border-t border-black/10 relative z-10">
        {COPY.infrastructure.outroLines.length > 0 && (
          <p className="text-3xl md:text-5xl font-black text-[#0A0A0A] leading-tight mb-12">
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
  return (
    <div className="pt-12 relative z-10">
      <div className="text-left mb-24 max-w-4xl">
        <div className="text-sm font-black tracking-[0.5em] text-emerald-500 uppercase mb-8">{COPY.caseStudies.kicker}</div>
        <h1 className="text-[clamp(2.2rem,10vw,6rem)] font-black tracking-tighter text-[#0A0A0A] leading-[0.92]">{COPY.caseStudies.title}</h1>
        {COPY.caseStudies.sub && <p className="mt-8 text-[17px] text-[#0A0A0A]/75 font-semibold leading-tight">{COPY.caseStudies.sub}</p>}
      </div>

      <div className="space-y-8 relative z-10">
        {COPY.caseStudies.cards.map((cs, i) => (
          <div key={cs.badge} className="border border-black/10 bg-white/60 p-10 md:p-14 hover:bg-white/80 transition-all relative z-10">
            <p className="text-[1.15rem] font-semibold text-[#0A0A0A] leading-snug mb-6" style={{fontFamily: "'Lora', Georgia, serif"}}>{cs.badge}</p>
            <p className="text-[17px] font-semibold text-[#0A0A0A]/80 leading-relaxed mb-8">{cs.narrative}</p>
            {cs.quote && (
              <blockquote className="border-l-2 border-emerald-500 pl-6">
                <p className="text-[17px] font-black text-[#0A0A0A] leading-relaxed italic">&ldquo;{cs.quote}&rdquo;</p>
                {cs.quoteAttrib && <cite className="mt-2 block text-sm font-black tracking-[0.2em] uppercase text-[#4A4F54] not-italic">{cs.quoteAttrib}</cite>}
              </blockquote>
            )}
          </div>
        ))}
      </div>

      <div className="mb-24 py-12 border-y border-black/10 overflow-hidden relative z-10">
        <ScrollingMarquee />
      </div>

      <section className="text-center py-24 mt-24 relative z-10">
        <Button href={BOOKING_URL}>{COPY.caseStudies.cta}</Button>
      </section>

      <section className="border border-emerald-500/40 bg-emerald-50/60 p-8 sm:p-12 md:p-20 relative z-10">
        <h2 className="text-[clamp(1.8rem,6vw,3rem)] font-semibold text-[#0A0A0A] leading-snug mb-6" style={{fontFamily: "'Lora', Georgia, serif"}}>{COPY.home.closingHeadline}</h2>
        <p className="text-[17px] text-[#0A0A0A]/75 font-medium leading-relaxed max-w-2xl mb-10">{COPY.home.closingSub}</p>
        <Button href={BOOKING_URL}>{COPY.home.closingCta}</Button>
      </section>
    </div>
  );
}

function Contact() {
  return (
    <div className="pt-12 max-w-5xl mx-auto relative z-10">
      <section id="contact" className="border border-black/10 bg-white/60 backdrop-blur-xl px-5 sm:px-8 md:px-16 py-10 sm:py-14 md:py-20">
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-semibold tracking-[0.18em] text-emerald-600 uppercase mb-6">{COPY.contact.kicker}</div>
          <h1 className="text-[clamp(2.2rem,10vw,4.5rem)] font-semibold text-[#0A0A0A] leading-tight" style={{fontFamily: "'Lora', Georgia, serif"}}>{COPY.contact.title}</h1>
          <div className="h-[2px] w-24 bg-emerald-500/90 mx-auto mt-8 mb-8" />
          <p className="text-[17px] text-[#0A0A0A]/80 font-semibold leading-relaxed">{COPY.contact.sub}</p>
        </div>
        <form
          action={CONTACT_FORM_ENDPOINT}
          method="POST"
          className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <input type="hidden" name="xnQsjsdp" value="b45ce04ddd76914bbfeade30ab0a6e86446ed07ddcd64b5425a1a4d9d5a467b8" readOnly />
          <input type="hidden" name="zc_gad" id="zc_gad" value="" readOnly />
          <input type="hidden" name="xmIwtLD" value="97ca543a3d1ea88492628d126d9ab329b04cea167679b0225170279c6fc6e4f3684dbc3fb82c598c93398f0f68dcd29b" readOnly />
          <input type="hidden" name="actionType" value="TGVhZHM=" readOnly />
          <input type="hidden" name="returnURL" value={ZOHO_RETURN_URL} readOnly />
          <input type="hidden" name="aG9uZXlwb3Q" value="" readOnly />

          <div>
            <label htmlFor="company" className="block text-xs font-black tracking-[0.2em] uppercase text-[#4A4F54] mb-2">Company *</label>
            <input id="company" type="text" name="Company" required placeholder="Company" className="w-full min-h-11 bg-black/[0.03] border border-black/20 px-4 md:px-5 py-3 md:py-4 text-[17px] font-semibold text-[#0A0A0A] placeholder:text-black/35 focus:outline-none focus:border-emerald-500" />
          </div>

          <div>
            <label htmlFor="designation" className="block text-xs font-black tracking-[0.2em] uppercase text-[#4A4F54] mb-2">Title</label>
            <input id="designation" type="text" name="Designation" placeholder="Title" className="w-full min-h-11 bg-black/[0.03] border border-black/20 px-4 md:px-5 py-3 md:py-4 text-[17px] font-semibold text-[#0A0A0A] placeholder:text-black/35 focus:outline-none focus:border-emerald-500" />
          </div>

          <div>
            <label htmlFor="firstName" className="block text-xs font-black tracking-[0.2em] uppercase text-[#4A4F54] mb-2">First Name</label>
            <input id="firstName" type="text" name="First Name" placeholder="First Name (optional)" className="w-full min-h-11 bg-black/[0.03] border border-black/20 px-4 md:px-5 py-3 md:py-4 text-[17px] font-semibold text-[#0A0A0A] placeholder:text-black/35 focus:outline-none focus:border-emerald-500" />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-black tracking-[0.2em] uppercase text-[#4A4F54] mb-2">Email</label>
            <input id="email" type="email" name="Email" placeholder="Email" className="w-full min-h-11 bg-black/[0.03] border border-black/20 px-4 md:px-5 py-3 md:py-4 text-[17px] font-semibold text-[#0A0A0A] placeholder:text-black/35 focus:outline-none focus:border-emerald-500" />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-xs font-black tracking-[0.2em] uppercase text-[#4A4F54] mb-2">Last Name *</label>
            <input id="lastName" type="text" name="Last Name" required placeholder="Last Name" className="w-full min-h-11 bg-black/[0.03] border border-black/20 px-4 md:px-5 py-3 md:py-4 text-[17px] font-semibold text-[#0A0A0A] placeholder:text-black/35 focus:outline-none focus:border-emerald-500" />
          </div>

          <div>
            <label htmlFor="primaryChannel" className="block text-xs font-black tracking-[0.2em] uppercase text-[#4A4F54] mb-2">Primary Channel</label>
            <input id="primaryChannel" type="text" name="LEADCF2" placeholder="Primary Channel" className="w-full min-h-11 bg-black/[0.03] border border-black/20 px-4 md:px-5 py-3 md:py-4 text-[17px] font-semibold text-[#0A0A0A] placeholder:text-black/35 focus:outline-none focus:border-emerald-500" />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="audienceDescription" className="block text-xs font-black tracking-[0.2em] uppercase text-[#4A4F54] mb-2">Audience Description</label>
            <textarea id="audienceDescription" name="Description" placeholder="Audience Description" rows={3} className="w-full bg-black/[0.03] border border-black/20 px-4 md:px-5 py-3 md:py-4 text-[17px] font-semibold text-[#0A0A0A] placeholder:text-black/35 focus:outline-none focus:border-emerald-500" />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="additionalContext" className="block text-xs font-black tracking-[0.2em] uppercase text-[#4A4F54] mb-2">Additional Context</label>
            <textarea id="additionalContext" name="LEADCF1" placeholder="Additional Context" rows={4} className="w-full bg-black/[0.03] border border-black/20 px-4 md:px-5 py-3 md:py-4 text-[17px] font-semibold text-[#0A0A0A] placeholder:text-black/35 focus:outline-none focus:border-emerald-500" />
          </div>

          <div className="md:col-span-2 flex justify-start mt-2">
            <button type="submit" className="min-h-11 bg-emerald-600 px-8 md:px-10 py-3 text-sm font-semibold rounded-full text-white hover:bg-emerald-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2">
              {COPY.contact.submitIdle}
            </button>
          </div>
        </form>

        <div className="mt-12 border border-black/10 bg-black/[0.03] p-6 md:p-8">
          <p className="text-sm font-black tracking-[0.3em] uppercase text-emerald-500 mb-3">Qualification</p>
          <p className="text-[17px] text-[#0A0A0A]/75 font-semibold leading-relaxed">
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
      <section className="border border-black/10 bg-white/60 backdrop-blur-xl px-8 md:px-16 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-[#0A0A0A]">Thanks. We got your request.</h1>
        <p className="mt-6 text-[17px] text-[#0A0A0A]/75 font-semibold">Our team will review and follow up shortly.</p>
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
    <div className="min-h-screen text-[#0A0A0A] selection:bg-emerald-500 selection:text-white relative" style={{fontFamily: "'Inter', system-ui, sans-serif"}}>
      {route === "/" ? <LiquidBackground /> : <InnerBackground />}
      <Grid opacityClass={route === "/" ? "opacity-20" : "opacity-10"} />

      <header className="fixed top-0 left-0 right-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur-xl">
        <div className="max-w-[1800px] mx-auto flex items-center justify-between gap-2 px-4 sm:px-6 md:px-12 py-3 md:py-4">
          <a href="#/" className="group min-w-0 shrink">
            <BrandLogo className="w-[140px] sm:w-[180px] md:w-[260px]" priority />
          </a>
          <nav className="hidden md:flex gap-1 md:gap-2 mr-2 md:mr-6" style={{fontFamily: "'Lora', Georgia, serif"}}>
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cx(
                  "px-4 py-2 text-base font-medium rounded-full transition-colors whitespace-nowrap",
                  active(item.href) ? "text-emerald-600 bg-emerald-50" : "text-[#555] hover:text-[#0A0A0A] hover:bg-black/5"
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="hidden md:block shrink-0">
            <a
              href={BOOKING_URL}
              className="inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-full bg-emerald-600 text-white hover:bg-emerald-500 transition-colors whitespace-nowrap shadow-sm"
              style={{fontFamily: "'Lora', Georgia, serif"}}
            >
              {COPY.shell.topCta}
            </a>
          </div>
          <button
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="md:hidden min-h-11 min-w-11 border border-black/20 bg-white/60 text-[#0A0A0A] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        {mobileMenuOpen && (
          <div id="mobile-nav" className="md:hidden border-t border-black/10 bg-[#E8E9EA]/98 px-4 py-4 space-y-3">
            <a
              href={BOOKING_URL}
              className="flex items-center justify-center py-3 px-4 text-sm font-semibold rounded-full bg-emerald-600 text-white hover:bg-emerald-500 transition-colors"
            >
              {COPY.shell.topCta}
            </a>
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cx(
                  "flex items-center justify-center py-3 px-4 text-sm font-medium rounded-full transition-colors",
                  active(item.href) ? "text-emerald-600 bg-emerald-50" : "text-[#555] hover:text-[#0A0A0A] hover:bg-black/5"
                )}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </header>

      <main className="max-w-[1800px] mx-auto px-4 sm:px-6 md:px-12 pt-28 md:pt-32 pb-24 md:pb-48 relative z-10 text-base md:text-lg leading-relaxed">{children}</main>

      <footer className="border-t border-black/10 bg-[#E8E9EA] relative z-50">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16 grid lg:grid-cols-3 gap-10 md:gap-16">
          <div>
            <BrandLogo className="w-[180px] sm:w-[220px] md:w-[300px] mb-4" />
            <div className="text-sm font-medium text-[#777]">{COPY.shell.footerSub}</div>
          </div>
          <form
            action={MAILING_LIST_ENDPOINT}
            onSubmit={(e) => e.preventDefault()}
            className="border border-black/10 bg-black/[0.03] p-6"
          >
            <p className="text-base font-semibold text-[#0A0A0A] mb-4">Join our mailing list for the latest insights.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="Email"
                className="flex-1 bg-transparent border border-black/20 px-4 py-3 text-xs text-[#0A0A0A] placeholder:text-black/50 focus:outline-none focus:border-emerald-500"
              />
              <button type="submit" className="min-h-11 bg-emerald-600 px-5 py-3 text-sm font-semibold rounded-full hover:bg-emerald-500 text-white">
                Join
              </button>
            </div>
          </form>
          <div className="flex flex-col md:flex-row lg:flex-col gap-6 text-sm font-medium text-[#777] lg:items-end">
            <a href="#/terms" className="hover:text-emerald-500 transition-colors">
              {COPY.shell.terms}
            </a>
            <a href="#/privacy" className="hover:text-emerald-500 transition-colors">
              {COPY.shell.privacy}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const route = useHashRoute();
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
