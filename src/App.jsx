import React, { useEffect, useMemo, useState, useRef } from "react";

const NAV = [
  { label: "01 // Home", href: "#/" },
  { label: "02 // Infrastructure", href: "#/infrastructure" },
  { label: "03 // Case Studies", href: "#/case-studies" },
  { label: "04 // Contact", href: "#/contact" },
];

const BOOKING_URL = "#";
const CONTACT_FORM_ENDPOINT = "#";
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
    productName: "Unified Conversion Infrastructure",
    h1Line1: "We engineer the conversion systems that turn authority into",
    h1Line2Accent: "revenue.",
    sub: "High-trust operators don't need more engagement; they need high-intent conversion pipelines.",
    subBold: "We build the unified infrastructure to capture it.",
    ctaPrimary: "Audit Your Infrastructure",
    ctaSecondary: "Explore the Framework",
    trustedKicker: "COMMANDING AUTHORITY FOR GLOBAL LEADERS",
    trustedSub: "We align narrative structures with high-intent audience segments for industry-defining operators.",
    stats: [
      { label: "STRATEGY", sub: "LINGUISTIC CONVERSION FRAMEWORKS" },
      { label: "DISTRIBUTION", sub: "OMNI-CHANNEL AUTHORITY ASSETS" },
      { label: "AUTOMATION", sub: "BEHAVIORAL TRIGGER INFRASTRUCTURE" },
      { label: "OUTCOME", sub: "UNIFIED REVENUE CONVERSION" },
    ],
    equationKicker: "THE SYSTEM",
    equationHeadline: "The Unified Conversion Engine.",
    equationBody:
      "Strategic language, owned distribution, and lifecycle automation are not separate services. They are a single, coordinated system engineered for conversion. We don't ship 'projects'; we deploy Conversion Infrastructure.",
    coreArch: "FOUR ENGINES",
    architecture: [
      {
        title: "STRATEGIC LANGUAGE",
        desc: "The Linguistic Foundation. We define the forward-speaking narrative that eliminates friction and commands high-intent action.",
      },
      {
        title: "PODCAST ENGINE",
        desc: "Authority at Scale. We transform long-form insights into high-retention distribution assets that build trust while you sleep.",
      },
      {
        title: "NEWSLETTER SYSTEM",
        desc: "Owned Audience Equity. We build the high-conversion distribution nodes that ensure your authority is never at the mercy of an algorithm.",
      },
      {
        title: "EMAIL INFRASTRUCTURE",
        desc: "The Revenue Pipeline. We engineer the behavioral triggers and automated sequences that turn intent into measurable growth.",
      },
    ],
    closingHeadline: "Ready to engineer your conversion infrastructure?",
    closingSub: "Stop chasing engagement. Start building authority equity.",
    closingCta: "Start Your Audit",
  },
  infrastructure: {
    kicker: "INFRASTRUCTURE",
    h1: "The infrastructure.",
    sub: "Four coordinated engines. One measurable outcome.",
    layers: [
      {
        note: "01 // POSITIONING",
        title: "STRATEGIC LANGUAGE",
        desc: "Linguistic Conversion Frameworks: We codify your authority into high-intent narrative structures.",
      },
      {
        note: "02 // DISTRIBUTION",
        title: "PODCAST ENGINE",
        desc: "Omni-Channel Authority Assets: We deploy your narrative across high-retention distribution nodes.",
      },
      {
        note: "03 // REACH",
        title: "NEWSLETTER SYSTEM",
        desc: "Behavioral Trigger Infrastructure: We engineer automated revenue pipelines that respond to intent in real-time.",
      },
      {
        note: "04 // CONVERSION",
        title: "EMAIL INFRASTRUCTURE",
        desc: "Unified Revenue Conversion: We deliver measurable, scalable growth through integrated infrastructure.",
      },
    ],
    outroLines: ["Language positions.", "Distribution captures.", "Sequences nurture.", "Infrastructure converts."],
    outroSub: "OPERATIONAL CONTROL OVER DISTRIBUTION AND CONVERSION.",
    cta: "Audit Your Infrastructure",
  },
  caseStudies: {
    kicker: "CASE STUDIES",
    title: "Measured outcomes",
    sub: "Each case shows the problem, the deployed engines, and the measurable shift.",
    trustedKicker: "COMMANDING AUTHORITY FOR GLOBAL LEADERS",
    cards: [
      {
        badge: "B2B",
        client: "B2B Operations",
        outcome: "+41% High-Intent SQLs",
        problem: "We replaced fragmented intake with a unified conversion system, automating lead scoring and narrative alignment.",
        tech: "Language + Distribution + Conversion",
      },
      {
        badge: "B2C",
        client: "B2C Growth",
        outcome: "+42% Revenue via Owned Assets",
        problem: "We engineered a high-retention newsletter system that captured and converted peak demand windows with zero ad spend.",
        tech: "Distribution + Nurture Sequences",
      },
      {
        badge: "Legal",
        client: "Professional Services",
        outcome: "60% Qualification Load Reduction",
        problem: "We deployed a linguistic conversion framework that pre-qualified prospects, ensuring staff only engaged with high-intent opportunities.",
        tech: "Qualification + Lifecycle Automation",
      },
    ],
    outroLines: ["Language builds authority.", "Infrastructure converts it."],
    cta: "Start Your Audit",
  },
  contact: {
    kicker: "CONTACT",
    title: "Work with us.",
    sub: "Looking to build your brand, sharpen your positioning, or install conversion infrastructure that actually moves?",
    submitIdle: "SUBMIT",
    submitDone: "SUBMITTED",
  },
  shell: {
    brand: "Social Following Studios",
    brandSub: "Unified Conversion Infrastructure",
    topCta: "Work With Us",
    footerSub: "© 2026 SOCIAL FOLLOWING STUDIOS",
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
      body: "We do not sell personal data. We may share information with trusted providers only when required to operate or support our services.",
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
    "inline-flex items-center justify-center px-8 py-4 text-xs font-black tracking-[0.2em] uppercase transition-all active:scale-[0.98] border shadow-2xl relative z-10";
  const styles =
    variant === "primary"
      ? "bg-emerald-600 text-white border-emerald-500 hover:bg-emerald-500"
      : "bg-transparent text-white border-white/20 hover:bg-white/5";
  return (
    <a href={href} className={cx(base, styles)}>
      {children}
    </a>
  );
}

function PolicyPage({ policy }) {
  return (
    <section className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 py-20 text-white">
      <p className="text-xs font-black tracking-[0.28em] uppercase text-emerald-400/90 mb-4">Last Updated: {POLICY_TEMPLATE.updatedAt}</p>
      <h1 className="text-4xl md:text-5xl font-black tracking-tight uppercase mb-5">{policy.title}</h1>
      <p className="text-base md:text-lg leading-8 text-white/80 mb-10">{policy.intro}</p>
      <div className="space-y-8">
        {policy.sections.map((section) => (
          <article key={section.heading} className="border border-white/10 bg-white/[0.02] p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-wide mb-3">{section.heading}</h2>
            <p className="text-sm md:text-base leading-7 text-white/75">{section.body}</p>
          </article>
        ))}
      </div>
      <p className="mt-10 text-sm text-white/60">
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
        uColor1: { value: new THREE.Vector3(0.06, 0.72, 0.5) },
        uColor2: { value: new THREE.Vector3(0.02, 0.03, 0.08) },
        uSpeed: { value: 1.2 },
        uIntensity: { value: 2.2 },
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
        uniforms.uTime.value += clock.getDelta();
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
  return <div ref={containerRef} className="fixed inset-0 -z-30 bg-stone-950" />;
}

function InnerBackground() {
  return (
    <div className="fixed inset-0 -z-30">
      <div className="absolute inset-0 bg-stone-950" />
      <div className="absolute -top-56 left-1/2 h-[980px] w-[980px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[140px]" />
      <div className="absolute -top-32 -left-48 h-[720px] w-[720px] rounded-full bg-white/5 blur-[130px]" />
      <div className="absolute -bottom-48 -right-48 h-[820px] w-[820px] rounded-full bg-emerald-400/5 blur-[160px]" />
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

function Grid({ opacityClass = "opacity-20" }) {
  return (
    <svg
      className={`fixed inset-0 h-full w-full -z-20 pointer-events-none ${opacityClass}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="archGrid" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#archGrid)" />
    </svg>
  );
}

function resolveLogoAsset(logo) {
  if (logo.mode === "image" && logo.src) {
    return { mode: "image", src: logo.src, alt: logo.alt || logo.name };
  }
  return { mode: "text", text: logo.name.toUpperCase(), alt: logo.alt || logo.name };
}

function TrustedLogo({ logo }) {
  const asset = resolveLogoAsset(logo);
  const [imageFailed, setImageFailed] = useState(false);
  if (asset.mode === "image" && !imageFailed) {
    return (
      <img
        src={asset.src}
        alt={asset.alt}
        className="h-5 w-auto max-w-[180px] object-contain brightness-0 invert opacity-90"
        loading="lazy"
        onError={() => setImageFailed(true)}
      />
    );
  }
  return <span className="text-[10px] md:text-xs font-black tracking-[0.22em] uppercase text-white/70">{logo.name.toUpperCase()}</span>;
}

function Home() {
  return (
    <div className="relative pt-12 space-y-16">
      <section className="min-h-[65vh] flex flex-col justify-center text-left relative z-10">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_420px] gap-14 lg:gap-20 items-start">
          <div className="max-w-5xl">
            <div className="inline-block border border-emerald-500/30 px-4 py-2 text-[10px] font-black tracking-[0.5em] text-emerald-400 uppercase mb-10">
              {COPY.home.productName}
            </div>
            <h1 className="text-5xl md:text-[8rem] font-black tracking-tighter leading-[0.9] text-white">
              {COPY.home.h1Line1}
              <br />
              <span className="text-emerald-500">{COPY.home.h1Line2Accent}</span>
            </h1>
            <p className="mt-8 text-xl md:text-3xl text-white/60 font-medium max-w-4xl leading-tight">{COPY.home.sub}</p>
            <p className="mt-3 text-xl md:text-2xl text-white font-black max-w-4xl leading-tight">{COPY.home.subBold}</p>
            <div className="mt-12 flex flex-wrap gap-4">
              <Button href="#/contact">{COPY.home.ctaPrimary}</Button>
              <Button href="#/infrastructure" variant="secondary">
                {COPY.home.ctaSecondary}
              </Button>
            </div>
          </div>

          <aside className="border border-white/10 bg-black/35 backdrop-blur-xl overflow-hidden lg:mt-4">
            <div className="px-8 pt-8 text-right">
              <div className="text-[10px] font-black tracking-[0.4em] text-emerald-400 uppercase mb-2">{COPY.home.trustedKicker}</div>
              <p className="text-[10px] text-white/40 font-medium leading-relaxed mb-6">{COPY.home.trustedSub}</p>
            </div>
            <img
              src="/logos-sheet.png"
              alt="Trusted by Kaiser Permanente, Stanford University, NVIDIA, PG&E, CommonSpirit Health, Drew Medical, The Anthemist, City of Concord, DGRP, Rhythm & Roux, Parade of Youth, D55"
              className="w-full object-contain"
            />
          </aside>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-6 relative z-10">
        {COPY.home.stats.map((s) => (
          <div key={s.label} className="relative z-10 border border-white/10 bg-white/5 p-8 backdrop-blur-sm text-left h-full overflow-hidden">
            <div className="text-xs md:text-sm font-black tracking-[0.25em] uppercase text-emerald-400 mb-3">{s.label}</div>
            <div className="text-[10px] md:text-xs font-black tracking-[0.2em] text-white/60 uppercase">{s.sub}</div>
          </div>
        ))}
      </div>

      <section className="mt-14 border border-white/10 bg-black/40 backdrop-blur-xl p-12 md:p-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          <div>
            <div className="text-[10px] font-black tracking-[0.4em] text-emerald-500 uppercase mb-8">{COPY.home.equationKicker}</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-none">{COPY.home.equationHeadline}</h2>
            <p className="mt-8 text-lg md:text-xl text-white/60 leading-relaxed font-medium">{COPY.home.equationBody}</p>
          </div>
          <div className="border border-white/10 p-10 bg-white/5 relative overflow-hidden">
            <div className="text-[10px] font-black tracking-[0.3em] text-white/40 uppercase mb-12">{COPY.home.coreArch}</div>
            <div className="space-y-6">
              {COPY.home.architecture.map((layer, i) => (
                <div key={layer.title} className="border-b border-white/5 pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black tracking-widest text-emerald-400">0{i + 1}</span>
                    <span className="text-lg font-black text-white">{layer.title}</span>
                  </div>
                  <p className="text-xs text-white/45 font-medium leading-relaxed text-right">{layer.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 border border-white/10 bg-black/40 backdrop-blur-xl p-8 md:p-12">
        <div className="mb-8">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">{COPY.caseStudies.title}</h2>
          <p className="mt-3 text-base text-white/50 font-medium">{COPY.caseStudies.sub}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COPY.caseStudies.cards.map((cs) => (
            <article key={cs.client} className="border border-white/10 bg-white/[0.03] p-6">
              <div className="text-[10px] font-black tracking-[0.3em] text-emerald-400 uppercase mb-3">{cs.badge}</div>
              <div className="text-3xl font-black text-emerald-400 mb-3">{cs.outcome}</div>
              <h3 className="text-base font-black text-white mb-2 uppercase">{cs.client}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{cs.problem}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border border-emerald-500/40 bg-emerald-500/5 p-12 md:p-20 relative z-10">
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
            {COPY.home.closingHeadline}
          </h2>
          <p className="mt-4 text-base md:text-xl text-white/60 font-medium">{COPY.home.closingSub}</p>
          <div className="mt-10">
            <Button href="#/contact">{COPY.home.closingCta}</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function Infrastructure() {
  return (
    <div className="pt-12 space-y-16 relative z-10">
      <div className="max-w-4xl text-left">
        <div className="text-[10px] font-black tracking-[0.5em] text-emerald-500 uppercase mb-8">{COPY.infrastructure.kicker}</div>
        <h1 className="text-5xl md:text-[8rem] font-black tracking-tighter text-white leading-[0.9]">{COPY.infrastructure.h1}</h1>
        <p className="mt-12 text-2xl md:text-4xl text-white/60 font-medium">{COPY.infrastructure.sub}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {COPY.infrastructure.layers.map((L) => (
          <div
            key={L.title}
            className="bg-black/40 backdrop-blur-md p-12 text-left border border-white/10 hover:bg-emerald-500/5 transition-colors h-full relative z-10 overflow-hidden"
          >
            <div className="text-[10px] font-black tracking-[0.3em] text-emerald-500 mb-6">{L.note}</div>
            <h3 className="text-3xl font-black text-white mb-6 uppercase">{L.title}</h3>
            <p className="text-lg text-white/60 font-medium leading-relaxed">{L.desc}</p>
          </div>
        ))}
      </div>

      <section className="text-center py-24 border-t border-white/10 relative z-10">
        <p className="text-3xl md:text-5xl font-black text-white leading-tight mb-8">
          {COPY.infrastructure.outroLines.map((line) => (
            <React.Fragment key={line}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
        <p className="text-xl text-white/40 uppercase tracking-widest font-bold mb-12">{COPY.infrastructure.outroSub}</p>
        <Button href="#/contact">{COPY.infrastructure.cta}</Button>
      </section>
    </div>
  );
}

function CaseStudies() {
  return (
    <div className="pt-12 relative z-10">
      <div className="text-left mb-24 max-w-4xl">
        <div className="text-[10px] font-black tracking-[0.5em] text-emerald-500 uppercase mb-8">{COPY.caseStudies.kicker}</div>
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-[0.9]">{COPY.caseStudies.title}</h1>
        <p className="mt-8 text-xl text-white/60 font-medium leading-tight">{COPY.caseStudies.sub}</p>
      </div>

      <div className="mb-24 py-12 border-y border-white/10 overflow-hidden relative z-10">
        <div className="text-[10px] font-black tracking-[0.3em] text-emerald-500 uppercase mb-12 text-center">
          {COPY.caseStudies.trustedKicker}
        </div>
        <img
          src="/logos-sheet.png"
          alt="Trusted by Kaiser Permanente, Stanford University, NVIDIA, PG&E, CommonSpirit Health, Drew Medical, The Anthemist, City of Concord, DGRP, Rhythm & Roux, Parade of Youth, D55"
          className="w-full max-w-4xl mx-auto object-contain"
        />
      </div>

      <div className="space-y-8 relative z-10">
        {COPY.caseStudies.cards.map((cs) => (
          <div
            key={cs.client}
            className="grid grid-cols-1 md:grid-cols-4 items-center border border-white/10 bg-black/40 p-12 hover:bg-white/5 transition-all gap-12 relative z-10 overflow-hidden"
          >
            <div className="col-span-1">
              <span className="inline-block border border-emerald-500/30 px-3 py-1 text-[10px] font-black tracking-widest text-emerald-400 uppercase mb-4">
                {cs.badge}
              </span>
              <div className="text-2xl font-black text-white uppercase">{cs.client}</div>
            </div>
            <div className="col-span-1">
              <div className="text-[10px] font-black tracking-widest text-white/40 uppercase mb-2">Problem</div>
              <p className="text-sm font-bold text-white leading-tight">{cs.problem}</p>
            </div>
            <div className="col-span-1 text-center">
              <div className="text-3xl md:text-4xl font-black text-emerald-400">{cs.outcome}</div>
            </div>
            <div className="col-span-1 md:text-right">
              <div className="text-[10px] font-black tracking-widest text-white/40 uppercase mb-2">Tech Deployment</div>
              <div className="text-xs font-black tracking-widest text-white uppercase">{cs.tech}</div>
            </div>
          </div>
        ))}
      </div>

      <section className="text-center py-24 mt-24 relative z-10">
        <p className="text-3xl md:text-5xl font-black text-white leading-tight mb-8">
          {COPY.caseStudies.outroLines.map((line) => (
            <React.Fragment key={line}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
        <Button href="#/contact">{COPY.caseStudies.cta}</Button>
      </section>
    </div>
  );
}

function Contact() {
  const [status, setStatus] = useState("idle");
  return (
    <div className="pt-12 max-w-5xl mx-auto relative z-10">
      <section className="border border-white/10 bg-black/40 backdrop-blur-xl px-8 md:px-16 py-14 md:py-20">
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-[10px] font-black tracking-[0.5em] text-emerald-500 uppercase mb-8">{COPY.contact.kicker}</div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.95]">{COPY.contact.title}</h1>
          <div className="h-[2px] w-24 bg-emerald-500/90 mx-auto mt-8 mb-8" />
          <p className="text-lg md:text-2xl text-white/70 font-medium leading-relaxed">{COPY.contact.sub}</p>
        </div>

        <form
          action={CONTACT_FORM_ENDPOINT}
          onSubmit={(e) => {
            e.preventDefault();
            setStatus("submitted");
          }}
          className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {["First Name", "Last Name", "Email", "Phone", "Brand / Company", "What are you building?"].map((field) => (
            <input
              key={field}
              type={field === "Email" ? "email" : "text"}
              required={field !== "Phone"}
              placeholder={field}
              className="w-full bg-white/[0.02] border border-white/20 px-5 py-4 text-base font-semibold text-white placeholder:text-white/35 focus:outline-none focus:border-emerald-500"
            />
          ))}
          <textarea
            placeholder="Optional Message / Notes"
            rows={5}
            className="md:col-span-2 w-full bg-white/[0.02] border border-white/20 px-5 py-4 text-base font-semibold text-white placeholder:text-white/35 focus:outline-none focus:border-emerald-500"
          />
          <div className="md:col-span-2 flex justify-start mt-2">
            <button type="submit" className="bg-emerald-600 px-10 py-4 text-xs font-black tracking-[0.3em] uppercase text-white hover:bg-emerald-500 transition-colors">
              {status === "submitted" ? COPY.contact.submitDone : COPY.contact.submitIdle}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function Shell({ children, route }) {
  const active = (href) => {
    const r = href.replace(/^#/, "").toLowerCase();
    return route === r || (route === "/" && r === "/");
  };

  return (
    <div className="min-h-screen text-white selection:bg-emerald-600 selection:text-white font-sans relative">
      {route === "/" ? <LiquidBackground /> : <InnerBackground />}
      <Grid opacityClass={route === "/" ? "opacity-20" : "opacity-10"} />

      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="max-w-[1800px] mx-auto flex items-center justify-between px-6 md:px-12 py-6 md:py-8">
          <a href="#/" className="flex flex-col items-start leading-none group">
            <span className="text-xl md:text-2xl font-black tracking-tighter group-hover:text-emerald-400 transition-colors uppercase">
              {COPY.shell.brand}
            </span>
            <span className="text-[10px] font-black tracking-[0.3em] text-emerald-500 uppercase mt-1">{COPY.shell.brandSub}</span>
          </a>
          <nav className="flex gap-4 md:gap-12">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cx(
                  "text-sm font-black tracking-[0.4em] uppercase transition-colors whitespace-nowrap",
                  active(item.href) ? "text-emerald-400" : "text-white/40 hover:text-white"
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="hidden sm:block">
            <a
              href="#/contact"
              className="border border-emerald-500/50 px-6 py-3 text-sm font-black tracking-[0.3em] uppercase hover:bg-emerald-500 transition-all"
            >
              {COPY.shell.topCta}
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-[1800px] mx-auto px-6 md:px-12 pt-32 pb-48 relative z-10">{children}</main>

      <footer className="border-t border-white/10 bg-black relative z-50">
        <div className="max-w-[1800px] mx-auto px-12 py-20 border-b border-white/10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white leading-tight">
                Ready to engineer your<br />
                <span className="text-emerald-400">conversion infrastructure?</span>
              </h2>
              <p className="mt-4 text-base text-white/50 font-medium">Stop chasing engagement. Start building authority equity.</p>
            </div>
            <Button href="#/contact">Start Your Audit</Button>
          </div>
        </div>
        <div className="max-w-[1800px] mx-auto px-12 py-16 grid lg:grid-cols-3 gap-16">
          <div>
            <div className="text-4xl font-black tracking-tighter uppercase mb-4 leading-none">{COPY.shell.brand}</div>
            <div className="text-xs font-black tracking-[0.4em] text-white/40 uppercase">{COPY.shell.footerSub}</div>
          </div>
          <form
            action={MAILING_LIST_ENDPOINT}
            onSubmit={(e) => e.preventDefault()}
            className="border border-white/10 bg-white/[0.02] p-6"
          >
            <p className="text-sm font-semibold text-white mb-4">Join our mailing list for the latest insights.</p>
            <div className="flex gap-3">
              <input
                type="email"
                required
                placeholder="Email"
                className="flex-1 bg-transparent border border-white/20 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-500"
              />
              <button type="submit" className="bg-emerald-600 px-5 py-3 text-xs font-black tracking-[0.24em] uppercase hover:bg-emerald-500">
                Join
              </button>
            </div>
          </form>
          <div className="flex flex-col md:flex-row lg:flex-col gap-8 text-sm font-black tracking-[0.4em] text-white/40 uppercase lg:items-end">
            <a href="#/terms" className="hover:text-emerald-400 transition-colors">
              {COPY.shell.terms}
            </a>
            <a href="#/privacy" className="hover:text-emerald-400 transition-colors">
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
      default:
        return <Home />;
    }
  }, [route]);

  return <Shell route={route}>{page}</Shell>;
}
