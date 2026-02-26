import React, { useEffect, useMemo, useState, useRef } from "react";

const NAV = [
  { label: "01 // Home", href: "#/" },
  { label: "02 // Infrastructure", href: "#/infrastructure" },
  { label: "03 // Case Studies", href: "#/case-studies" },
];

const PARTNERS = ["CHEVRON", "STANFORD MEDICAL", "DREW HEALTH CENTER", "PG&E", "City of Concord"];

/**
 * COPY CENTRAL (edit text here)
 * This keeps copy changes out of the JSX so updates stay fast and clean.
 */
const COPY = {
  home: {
    productName: "Unified Conversion Infrastructure",
    h1Line1: "We turn words into",
    h1Line2Accent: "revenue.",
    sub: "Content builds authority. Authority creates sales. Sales drive growth.",
    subBold: "You already know this. So why aren't you building?",
    ctaPrimary: "Configure",
    ctaSecondary: "View Case Studies",
    stats: [
      { label: "STRATEGY", sub: "LANGUAGE SYSTEMS" },
      { label: "DISTRIBUTION", sub: "OWNED CHANNELS" },
      { label: "AUTOMATION", sub: "LIFECYCLE SEQUENCES" },
      { label: "OUTCOME", sub: "REVENUE CONVERSION" },
    ],
    equationKicker: "THE SYSTEM",
    equationHeadline: "We build revenue infrastructure.",
    equationBody:
      "Strategic language, owned distribution, and lifecycle automation engineered as one coordinated system. Every engagement includes strategy, sequencing, design, and deployment. Nothing ships in isolation.",
    coreArch: "FOUR ENGINES",
    architecture: ["STRATEGIC LANGUAGE", "PODCAST ENGINE", "NEWSLETTER SYSTEM", "EMAIL INFRASTRUCTURE"],
  },
  infrastructure: {
    kicker: "INFRASTRUCTURE",
    h1: "The infrastructure.",
    sub: "Four coordinated systems. One measurable outcome.",
    layers: [
      {
        note: "01 // POSITIONING",
        title: "STRATEGIC LANGUAGE",
        desc:
          "Messaging architecture across homepage, email, and sales. Strategic language positions you to convert before the conversation starts.",
      },
      {
        note: "02 // DISTRIBUTION",
        title: "PODCAST ENGINE",
        desc: "Recurring distribution built for conversion routing. Long-form trust that moves listeners into owned channels.",
      },
      {
        note: "03 // REACH",
        title: "NEWSLETTER SYSTEM",
        desc: "Owned audience with segmentation and monetization logic. Segmented reach that compounds over time.",
      },
      {
        note: "04 // CONVERSION",
        title: "EMAIL INFRASTRUCTURE",
        desc: "Lifecycle automation from first touch to retention. Sequences, routing, and automation that drive outcomes.",
      },
    ],
    outroLines: ["Language positions.", "Distribution captures.", "Sequences nurture.", "Infrastructure converts."],
    outroSub: "OPERATIONAL CONTROL OVER DISTRIBUTION AND CONVERSION.",
    cta: "Configure",
  },
  caseStudies: {
    kicker: "CASE STUDIES",
    title: "Measured outcomes",
    sub: "Each case shows the problem, the deployed engines, and the shift.",
    trustedKicker: "TRUSTED BY INDUSTRY LEADERS",
    cards: [
      {
        badge: "B2B",
        client: "B2B Operations",
        outcome: "+41% Qualified",
        problem: "Inbound requests arrive incomplete, unscored, and routed late.",
        tech: "Language + Distribution + Conversion",
      },
      {
        badge: "B2C",
        client: "B2C Growth",
        outcome: "+42% Growth",
        problem: "Leads go cold during peak demand windows.",
        tech: "Distribution + Nurture Sequences",
      },
      {
        badge: "Legal",
        client: "Professional Services",
        outcome: "60% Load Reduction",
        problem: "Staff spent hours qualifying unready prospects.",
        tech: "Qualification + Lifecycle Automation",
      },
    ],
    outroLines: ["Language builds authority.", "Infrastructure converts it."],
    cta: "Configure",
  },
  configure: {
    kicker: "CONFIGURE",
    title: "Configuration.",
    sub: "Deployment-ready output for strategic language and conversion infrastructure.",
    formKicker: "BUSINESS INFORMATION",
    fields: [
      { label: "Business Name", placeholder: "Enter business name" },
      { label: "Primary Phone", placeholder: "Enter primary phone number" },
    ],
    submitIdle: "SUBMIT CONFIGURATION",
    submitDone: "CAPTURED",
  },
  shell: {
    brand: "Social Following Studios",
    brandSub: "Unified Conversion Infrastructure",
    topCta: "Configure",
    footerSub: "© 2026 Social Following Studios",
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

function Home() {
  return (
    <div className="relative pt-12 space-y-16">
      <section className="min-h-[65vh] flex flex-col justify-center text-left relative z-10">
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
          <p className="mt-5 text-xl md:text-2xl text-white font-black max-w-4xl leading-tight">{COPY.home.subBold}</p>
          <div className="mt-12 flex flex-wrap gap-4">
            <Button href="#/configure">{COPY.home.ctaPrimary}</Button>
            <Button href="#/case-studies" variant="secondary">
              {COPY.home.ctaSecondary}
            </Button>
          </div>
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
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <div className="text-[10px] font-black tracking-[0.4em] text-emerald-500 uppercase mb-8">{COPY.home.equationKicker}</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-none">{COPY.home.equationHeadline}</h2>
            <p className="mt-8 text-lg md:text-xl text-white/60 leading-relaxed font-medium">{COPY.home.equationBody}</p>
          </div>
          <div className="border border-white/10 p-10 bg-white/5 relative overflow-hidden">
            <div className="text-[10px] font-black tracking-[0.3em] text-white/40 uppercase mb-12">{COPY.home.coreArch}</div>
            <div className="space-y-4">
              {COPY.home.architecture.map((layer, i) => (
                <div key={layer} className="flex items-center justify-between border-b border-white/5 py-4">
                  <span className="text-xs font-black tracking-widest text-emerald-400">0{i + 1}</span>
                  <span className="text-xl font-black text-white">{layer}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 border border-white/10 bg-black/40 backdrop-blur-xl p-8 md:p-12">
        <div className="mb-8">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">Case Studies</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COPY.caseStudies.cards.map((cs) => (
            <article key={cs.client} className="border border-white/10 bg-white/[0.03] p-6">
              <div className="text-[10px] font-black tracking-[0.3em] text-emerald-400 uppercase mb-3">{cs.badge}</div>
              <h3 className="text-xl font-black text-white mb-2">{cs.client}</h3>
              <p className="text-white/70 text-sm mb-4">{cs.problem}</p>
              <div className="text-lg font-black text-emerald-400">{cs.outcome}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="border border-emerald-500/40 bg-emerald-500/5 p-8 md:p-12 relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <p className="text-lg md:text-2xl font-bold text-white max-w-3xl">I build unified conversion infrastructure across email, newsletters, podcasts, and strategic language.</p>
        <Button href="#/configure">{COPY.home.ctaPrimary}</Button>
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
        <Button href="#/configure">{COPY.infrastructure.cta}</Button>
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
        <div className="flex flex-wrap justify-center gap-10 md:gap-20 text-white/60 font-black tracking-[0.3em] text-sm uppercase">
          {PARTNERS.map((p) => (
            <span key={p} className="hover:text-emerald-400 transition-colors">
              {p}
            </span>
          ))}
        </div>
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
              <div className="text-4xl md:text-5xl font-black text-emerald-400">{cs.outcome}</div>
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
        <Button href="#/configure">{COPY.caseStudies.cta}</Button>
      </section>
    </div>
  );
}

function Configure() {
  const [status, setStatus] = useState("idle");
  return (
    <div className="pt-12 max-w-4xl relative z-10">
      <div className="text-left mb-12">
        <div className="text-[10px] font-black tracking-[0.5em] text-emerald-500 uppercase mb-8">{COPY.configure.kicker}</div>
        <h1 className="text-5xl font-black tracking-tighter text-white leading-none">{COPY.configure.title}</h1>
        <p className="mt-8 text-xl text-white/60 font-medium">{COPY.configure.sub}</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setStatus("deployed");
        }}
        className="border border-white/10 p-12 bg-black/40 backdrop-blur-xl relative z-10"
      >
        <div className="text-[10px] font-black tracking-[0.3em] text-emerald-500 uppercase mb-12">{COPY.configure.formKicker}</div>
        <div className="space-y-12">
          {COPY.configure.fields.map((field) => (
            <div key={field.label}>
              <div className="text-[10px] font-black tracking-widest text-white/40 uppercase mb-4">{field.label}</div>
              <input
                type="text"
                className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-xl font-bold text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-white/10"
                placeholder={field.placeholder}
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-emerald-600 py-8 text-xs font-black tracking-[0.4em] text-white uppercase hover:bg-emerald-500 transition-all shadow-2xl mt-12"
          >
            {status === "deployed" ? COPY.configure.submitDone : COPY.configure.submitIdle}
          </button>
        </div>
      </form>
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
              href="#/configure"
              className="border border-emerald-500/50 px-6 py-3 text-sm font-black tracking-[0.3em] uppercase hover:bg-emerald-500 transition-all"
            >
              {COPY.shell.topCta}
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-[1800px] mx-auto px-6 md:px-12 pt-32 pb-48 relative z-10">{children}</main>

      <footer className="border-t border-white/10 py-24 bg-black relative z-50">
        <div className="max-w-[1800px] mx-auto px-12 grid md:grid-cols-2 gap-24">
          <div>
            <div className="text-4xl font-black tracking-tighter uppercase mb-4 leading-none">{COPY.shell.brand}</div>
            <div className="text-xs font-black tracking-[0.4em] text-white/40 uppercase">{COPY.shell.footerSub}</div>
          </div>
          <div className="flex flex-col md:flex-row gap-12 md:gap-24 text-sm font-black tracking-[0.4em] text-white/40 uppercase">
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
      case "/configure":
        return <Configure />;
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
