import React, { useEffect, useMemo, useRef, useState } from "react";

const NAV = [
  { label: "01 // Home", href: "#/" },
  { label: "02 // System", href: "#/system" },
  { label: "03 // Case studies", href: "#/case-studies" },
  { label: "04 // Contact", href: "#/contact" },
];

const PARTNERS = [
  "CHEVRON",
  "STANFORD MEDICAL",
  "TRUE HEALTH CENTER",
  "PG&E",
  "MARCHITECTS",
];

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

function LiquidBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    script.async = true;
    document.head.appendChild(script);

    let renderer;
    let animationFrame;
    let handleMove;
    let handleResize;

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

          for (let i = this.trail.length - 1; i >= 0; i -= 1) {
            const point = this.trail[i];
            const f = point.force * this.speed * (1 - point.age / this.maxAge);

            point.x += point.vx * f;
            point.y += point.vy * f;
            point.age += 1;

            if (point.age > this.maxAge) {
              this.trail.splice(i, 1);
            } else {
              const pos = {
                x: point.x * this.width,
                y: (1 - point.y) * this.height,
              };

              let intensity =
                point.age < this.maxAge * 0.3
                  ? Math.sin((point.age / (this.maxAge * 0.3)) * (Math.PI / 2))
                  : 1.0 - point.age / this.maxAge;

              intensity *= point.force;

              const offset = this.size * 5;
              this.ctx.shadowOffsetX = offset;
              this.ctx.shadowOffsetY = offset;
              this.ctx.shadowBlur = this.radius;
              this.ctx.shadowColor = `rgba(${((point.vx + 1) / 2) * 255}, ${
                ((point.vy + 1) / 2) * 255
              }, ${intensity * 255}, ${0.3 * intensity})`;
              this.ctx.beginPath();
              this.ctx.fillStyle = "rgba(255,0,0,1)";
              this.ctx.arc(
                pos.x - offset,
                pos.y - offset,
                this.radius,
                0,
                Math.PI * 2,
              );
              this.ctx.fill();
            }
          }

          this.texture.needsUpdate = true;
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
      }

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      containerRef.current?.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
      );
      camera.position.z = 50;

      const touchTexture = new TouchTexture();
      const uniforms = {
        uTime: { value: 0 },
        uResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        uColor1: { value: new THREE.Vector3(0.06, 0.72, 0.5) },
        uColor2: { value: new THREE.Vector3(0.02, 0.03, 0.08) },
        uSpeed: { value: 1.2 },
        uIntensity: { value: 2.5 },
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
        vertexShader:
          "varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
        fragmentShader: `
uniform float uTime; uniform vec2 uResolution; uniform vec3 uColor1, uColor2, uDarkNavy;
uniform float uSpeed, uIntensity, uGrainIntensity, uGradientSize, uColor1Weight, uColor2Weight;
uniform sampler2D uTouchTexture; varying vec2 vUv;
float grain(vec2 uv, float time) {
  vec2 grainUv = uv * uResolution * 0.5;
  return fract(sin(dot(grainUv + time, vec2(12.9898, 78.233))) * 43758.5453) * 2.0 - 1.0;
}
vec3 getGradientColor(vec2 uv, float time) {
  float s = uSpeed;
  vec3 color = vec3(0.0);
  for (int i=0; i<8; i++) {
    float fi = float(i);
    vec2 c = vec2(0.5 + sin(time * s * (0.4 + fi * 0.02)) * 0.4, 0.5 + cos(time * s * (0.5 + fi * 0.03)) * 0.4);
    float inf = 1.0 - smoothstep(0.0, uGradientSize, length(uv - c));
    color += ((i % 2 == 0) ? uColor1 : uColor2) * inf * (0.5 + 0.5 * sin(time * s * (0.8 + fi * 0.1))) * ((i % 2 == 0) ? uColor1Weight : uColor2Weight);
  }
  color = clamp(color * uIntensity, 0.0, 1.0);
  return mix(uDarkNavy, color, max(length(color), 0.1));
}
void main() {
  vec2 uv = vUv;
  vec4 touchTex = texture2D(uTouchTexture, uv);
  uv += vec2(-(touchTex.r * 2.0 - 1.0), -(touchTex.g * 2.0 - 1.0)) * 0.5 * touchTex.b;
  vec3 color = getGradientColor(uv, uTime);
  color += grain(uv, uTime) * uGrainIntensity;
  gl_FragColor = vec4(color, 1.0);
}`,
      });

      scene.add(new THREE.Mesh(new THREE.PlaneGeometry(150, 150, 1, 1), material));

      const clock = new THREE.Clock();
      const animate = () => {
        uniforms.uTime.value += clock.getDelta();
        touchTexture.update();
        renderer.render(scene, camera);
        animationFrame = requestAnimationFrame(animate);
      };

      animate();

      handleMove = (e) => {
        const clientX = e.clientX || (e.touches && e.touches[0]?.clientX);
        const clientY = e.clientY || (e.touches && e.touches[0]?.clientY);
        if (clientX == null || clientY == null) return;

        const x = clientX / window.innerWidth;
        const y = 1 - clientY / window.innerHeight;
        touchTexture.addTouch({ x, y });
      };

      handleResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      };

      window.addEventListener("mousemove", handleMove);
      window.addEventListener("touchmove", handleMove);
      window.addEventListener("resize", handleResize);
    };

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      if (handleMove) {
        window.removeEventListener("mousemove", handleMove);
        window.removeEventListener("touchmove", handleMove);
      }
      if (handleResize) window.removeEventListener("resize", handleResize);
      if (renderer) renderer.dispose();
      if (containerRef.current && renderer?.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-30 bg-stone-950" />;
}

function Grid() {
  return (
    <svg
      className="fixed inset-0 h-full w-full -z-20 opacity-20 pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="archGrid" width="100" height="100" patternUnits="userSpaceOnUse">
          <path
            d="M 100 0 L 0 0 0 100"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#archGrid)" />
    </svg>
  );
}

function Stat({ label, value, sub }) {
  return (
    <div className="relative z-10 border border-white/10 bg-white/5 p-8 backdrop-blur-sm text-left h-full overflow-hidden">
      <div className="text-[10px] font-black tracking-[0.3em] uppercase text-emerald-400 mb-4">
        {label}
      </div>
      <div className="text-4xl md:text-6xl font-black tracking-tighter text-white">
        {value}
      </div>
      {sub && (
        <div className="mt-2 text-xs font-bold text-white/40 uppercase tracking-widest leading-relaxed">
          {sub}
        </div>
      )}
    </div>
  );
}

function Home() {
  return (
    <div className="relative pt-12">
      <section className="min-h-[80vh] flex flex-col justify-center text-left relative z-10">
        <div className="max-w-6xl">
          <div className="inline-block border border-emerald-500/30 px-4 py-2 text-[10px] font-black tracking-[0.5em] text-emerald-400 uppercase mb-12">
            Unified Conversion Systems
          </div>
          <h1 className="text-6xl md:text-[10rem] font-black tracking-tighter leading-[0.85] text-white">
            Capture every opportunity.
            <br />
            Convert faster.
            <br />
            <span className="text-emerald-500">Scale predictably.</span>
          </h1>
          <p className="mt-12 text-xl md:text-3xl text-white/60 font-medium max-w-4xl leading-tight">
            Social Following deploys revenue infrastructure that organizes inbound
            demand into scheduled outcomes across intake, booking, and follow-up.
          </p>
          <div className="mt-16 flex flex-wrap gap-4">
            <Button href="#/configure">CONFIGURE NOW</Button>
            <Button href="#/case-studies" variant="secondary">
              VIEW CASE STUDIES
            </Button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-24 relative z-10">
        <Stat label="COVERAGE" value="24/7" sub="Continuous intake and routing" />
        <Stat label="RESPONSE SPEED" value="&lt;60s" sub="First-touch handling" />
        <Stat label="CONVERSION LIFT" value="+42%" sub="Booked outcomes" />
        <Stat
          label="OPERATIONAL EFFICIENCY"
          value="-60%"
          sub="Manual workload"
        />
      </div>

      <section className="mt-32 border border-white/10 bg-black/40 backdrop-blur-xl p-12 md:p-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <div className="text-[10px] font-black tracking-[0.4em] text-emerald-500 uppercase mb-8">
              THE EQUATION
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-none">
              Capture + Route + Convert = Predictable revenue.
            </h2>
            <p className="mt-8 text-lg md:text-xl text-white/60 leading-relaxed font-medium">
              Traffic becomes booked work when systems align. This infrastructure
              coordinates call capture, booking logic, and intake automation so
              inbound demand moves through one continuous pipeline.
            </p>
          </div>

          <div className="border border-white/10 p-10 bg-white/5 relative overflow-hidden">
            <div className="text-[10px] font-black tracking-[0.3em] text-white/40 uppercase mb-12">
              CORE ARCHITECTURE
            </div>
            <div className="space-y-4">
              {["ACCESS", "CONVERSION", "INTAKE", "CONTINUITY"].map((layer, i) => (
                <div
                  key={layer}
                  className="flex items-center justify-between border-b border-white/5 py-4"
                >
                  <span className="text-xs font-black tracking-widest text-emerald-400">
                    0{i + 1}
                  </span>
                  <span className="text-xl font-black text-white">{layer}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function System() {
  const layers = [
    {
      title: "Access Layer",
      note: "01 // SPEED TO RESPONSE",
      desc: "The first layer captures inbound demand the moment it arrives. Every call, form submission, message, and inquiry enters structured handling immediately. Every opportunity receives immediate, structured attention.",
    },
    {
      title: "Conversion Layer",
      note: "02 // INTENT REALIZED",
      desc: "The second layer guides interest into commitment. Prospects enter clear booking paths. Scheduling happens in real time. Deposits process automatically. Calendar slots fill through automated coordination.",
    },
    {
      title: "Intake Layer",
      note: "03 // RECORD INTEGRITY",
      desc: "The third layer organizes information for clean handoff. Lead data enters structured formats. Priority scoring identifies high-value opportunities. Records write directly into your system of record.",
    },
    {
      title: "Continuity Layer",
      note: "04 // LIFECYCLE PROTECTION",
      desc: "The fourth layer maintains relationship momentum beyond the first booking. Confirmations deliver reliably. Reminders reduce missed appointments. Follow-up sequences stay consistent.",
    },
  ];

  return (
    <div className="pt-12 space-y-24 relative z-10">
      <div className="max-w-4xl text-left">
        <div className="text-[10px] font-black tracking-[0.5em] text-emerald-500 uppercase mb-8">
          SYSTEM
        </div>
        <h1 className="text-5xl md:text-[8rem] font-black tracking-tighter text-white leading-[0.9]">
          The topology.
        </h1>
        <p className="mt-12 text-2xl md:text-4xl text-white/60 font-medium">
          A four-layer deployment that moves demand into outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {layers.map((layer) => (
          <div
            key={layer.title}
            className="bg-black/40 backdrop-blur-md p-12 text-left border border-white/10 hover:bg-emerald-500/5 transition-colors h-full relative z-10 overflow-hidden"
          >
            <div className="text-[10px] font-black tracking-[0.3em] text-emerald-500 mb-6">
              {layer.note}
            </div>
            <h3 className="text-3xl font-black text-white mb-6 uppercase">
              {layer.title}
            </h3>
            <p className="text-lg text-white/60 font-medium leading-relaxed">
              {layer.desc}
            </p>
          </div>
        ))}
      </div>

      <section className="text-center py-24 border-t border-white/10 relative z-10">
        <p className="text-3xl md:text-5xl font-black text-white leading-tight mb-8">
          Access captures demand.
          <br />
          Conversion creates commitment.
          <br />
          Intake structures data.
          <br />
          Continuity maintains momentum.
        </p>
        <p className="text-xl text-white/40 uppercase tracking-widest font-bold mb-12">
          Operational stability at scale.
        </p>
        <Button href="#/configure">Configure Your System</Button>
      </section>
    </div>
  );
}

function CaseStudies() {
  const cases = [
    {
      badge: "B2B",
      client: "B2B Operations",
      outcome: "+41% Qualified",
      problem: "Inbound requests arrive incomplete, unscored, and routed late.",
      tech: "Voice + Intake + Conversion",
    },
    {
      badge: "B2C",
      client: "B2C Growth",
      outcome: "+42% Bookings",
      problem: "Missed calls and slow intake during peak demand.",
      tech: "Voice + Booking Flow",
    },
    {
      badge: "Legal",
      client: "Professional Services",
      outcome: "60% Load Reduction",
      problem: "Staff spent hours qualifying unready prospects.",
      tech: "Intake + Qualification",
    },
  ];

  return (
    <div className="pt-12 relative z-10">
      <div className="text-left mb-24 max-w-4xl">
        <div className="text-[10px] font-black tracking-[0.5em] text-emerald-500 uppercase mb-8">
          CASE STUDIES
        </div>
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-[0.9]">
          Measured outcomes.
        </h1>
        <p className="mt-8 text-xl text-white/60 font-medium leading-tight">
          Each case shows the problem, the deployed pillars, and the shift.
        </p>
      </div>

      <div className="mb-24 py-12 border-y border-white/10 overflow-hidden relative z-10">
        <div className="text-[10px] font-black tracking-[0.3em] text-emerald-500 uppercase mb-12 text-center">
          TRUSTED BY INDUSTRY LEADERS
        </div>
        <div className="flex flex-wrap justify-center gap-10 md:gap-20 text-white/60 font-black tracking-[0.3em] text-sm uppercase">
          {PARTNERS.map((partner) => (
            <span
              key={partner}
              className="hover:text-emerald-400 transition-colors"
            >
              {partner}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-8 relative z-10">
        {cases.map((cs) => (
          <div
            key={cs.client}
            className="grid grid-cols-1 md:grid-cols-4 items-center border border-white/10 bg-black/40 p-12 hover:bg-white/5 transition-all gap-12 relative z-10 overflow-hidden"
          >
            <div className="col-span-1">
              <span className="inline-block border border-emerald-500/30 px-3 py-1 text-[10px] font-black tracking-widest text-emerald-400 uppercase mb-4">
                {cs.badge}
              </span>
              <div className="text-2xl font-black text-white uppercase">
                {cs.client}
              </div>
            </div>
            <div className="col-span-1">
              <div className="text-[10px] font-black tracking-widest text-white/40 uppercase mb-2">
                Problem
              </div>
              <p className="text-sm font-bold text-white leading-tight">
                {cs.problem}
              </p>
            </div>
            <div className="col-span-1 text-center">
              <div className="text-4xl md:text-5xl font-black text-emerald-400">
                {cs.outcome}
              </div>
            </div>
            <div className="col-span-1 md:text-right">
              <div className="text-[10px] font-black tracking-widest text-white/40 uppercase mb-2">
                Tech Deployment
              </div>
              <div className="text-xs font-black tracking-widest text-white uppercase">
                {cs.tech}
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className="text-center py-24 mt-24 relative z-10">
        <p className="text-3xl md:text-5xl font-black text-white leading-tight mb-8">
          Structure replaces manual coordination.
          <br />
          Revenue becomes predictable.
        </p>
        <Button href="#/configure">Configure Your System</Button>
      </section>
    </div>
  );
}

function Configure() {
  const [status, setStatus] = useState("idle");

  return (
    <div className="pt-12 max-w-4xl relative z-10">
      <div className="text-left mb-12">
        <div className="text-[10px] font-black tracking-[0.5em] text-emerald-500 uppercase mb-8">
          CONFIGURE
        </div>
        <h1 className="text-5xl font-black tracking-tighter text-white leading-none">
          Configuration.
        </h1>
        <p className="mt-8 text-xl text-white/60 font-medium">
          Deployment-ready output for voice and conversion systems.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setStatus("deployed");
        }}
        className="border border-white/10 p-12 bg-black/40 backdrop-blur-xl relative z-10"
      >
        <div className="text-[10px] font-black tracking-[0.3em] text-emerald-500 uppercase mb-12">
          BUSINESS INFORMATION
        </div>
        <div className="space-y-12">
          {[
            { label: "Business Name", placeholder: "Enter business name" },
            { label: "Primary Phone", placeholder: "Enter primary phone number" },
          ].map((field) => (
            <div key={field.label}>
              <div className="text-[10px] font-black tracking-widest text-white/40 uppercase mb-4">
                {field.label}
              </div>
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
            {status === "deployed" ? "CAPTURED" : "SUBMIT CONFIGURATION"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Contact() {
  return (
    <div className="pt-12 relative z-10">
      <div className="text-left mb-24 max-w-4xl">
        <div className="text-[10px] font-black tracking-[0.5em] text-emerald-500 uppercase mb-8">
          CONTACT
        </div>
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-[0.9]">
          Direct terminal.
        </h1>
        <p className="mt-8 text-xl text-white/60 font-medium leading-tight">
          Deploy conversion management in sequence.
        </p>
      </div>

      <div className="border border-white/10 bg-black/40 backdrop-blur-xl p-12 md:p-24 max-w-4xl relative z-10 overflow-hidden">
        <div className="text-[10px] font-black tracking-[0.5em] text-emerald-500 uppercase mb-8">
          ACTIVATION
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-white mb-12">
          Start configuration
        </h2>
        <Button href="#/configure">Configure Your System</Button>
      </div>
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
      <LiquidBackground />
      <Grid />

      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="max-w-[1800px] mx-auto flex items-center justify-between px-6 md:px-12 py-6 md:py-8">
          <a href="#/" className="flex flex-col items-start leading-none group">
            <span className="text-xl md:text-2xl font-black tracking-tighter group-hover:text-emerald-400 transition-colors uppercase">
              Social Following Studios
            </span>
            <span className="text-[10px] font-black tracking-[0.3em] text-emerald-500 uppercase mt-1">
              Unified Conversion Systems
            </span>
          </a>

          <nav className="flex gap-4 md:gap-12">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cx(
                  "text-sm font-black tracking-[0.4em] uppercase transition-colors whitespace-nowrap",
                  active(item.href)
                    ? "text-emerald-400"
                    : "text-white/40 hover:text-white",
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
              Configure
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-[1800px] mx-auto px-6 md:px-12 pt-32 pb-48 relative z-10">
        {children}
      </main>

      <footer className="border-t border-white/10 py-24 bg-black relative z-50">
        <div className="max-w-[1800px] mx-auto px-12 grid md:grid-cols-2 gap-24">
          <div>
            <div className="text-4xl font-black tracking-tighter uppercase mb-4 leading-none">
              Social Following Studios
            </div>
            <div className="text-xs font-black tracking-[0.4em] text-white/40 uppercase">
              © 2026 Unified Conversion Systems
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-12 md:gap-24 text-sm font-black tracking-[0.4em] text-white/40 uppercase">
            <a href="#/terms" className="hover:text-emerald-400 transition-colors">
              Terms
            </a>
            <a
              href="#/privacy"
              className="hover:text-emerald-400 transition-colors"
            >
              Privacy
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
      case "/system":
        return <System />;
      case "/case-studies":
        return <CaseStudies />;
      case "/configure":
        return <Configure />;
      case "/contact":
        return <Contact />;
      case "/terms":
        return (
          <div className="p-20 text-white font-bold text-2xl relative z-10">
            Terms of Operation.
          </div>
        );
      case "/privacy":
        return (
          <div className="p-20 text-white font-bold text-2xl relative z-10">
            Privacy Records.
          </div>
        );
      default:
        return <Home />;
    }
  }, [route]);

  return <Shell route={route}>{page}</Shell>;
}
