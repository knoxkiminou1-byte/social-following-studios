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

const PARTNERS = [
  "CHEVRON",
  "STANFORD MEDICAL",
  "TRUE HEALTH CENTER",
  "PG&E",
];

const HOME_STATS = [
  {
    label: "BUILT NAME",
    sub: "You have the name and the list. We make both book calls.",
  },
  {
    label: "DORMANT LIST",
    sub: "Your list holds trust. We turn it into booked work.",
  },
  {
    label: "DEPLOYMENT",
    sub: "We set the flow across your channels and keep it live.",
  },
];

const INFRA_LAYERS = [
  {
    note: "01 Audit",
    title: "Map gaps.",
    desc: "We audit your list, copy, and channel mix.",
  },
  {
    note: "02 Build",
    title: "Set flow.",
    desc: "We set the email, page, and book path.",
  },
  {
    note: "03 Run",
    title: "Run live.",
    desc: "We run the flow and keep calls on deck.",
  },
];

// ---------- helpers & routing ----------

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
    }

    const touchTexture = new TouchTexture();

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uColor1: { value: new THREE.Vector3(0.062, 0.725, 0.505) },
      uColor2: { value: new THREE.Vector3(0.039, 0.055, 0.153) },
      uSpeed: { value: 0.25 },
      uIntensity: { value: 0.35 },
      uTouchTexture: { value: touchTexture.texture },
      uGrainIntensity: { value: 0.03 },
      uDarkNavy: { value: new THREE.Vector3(0.039, 0.055, 0.153) },
      uGradientSize: { value: 0.45 },
      uGradientCount: { value: 12.0 },
      uColor1Weight: { value: 0.55 },
      uColor2Weight: { value: 1.6 },
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
        uniform vec3 uDarkNavy;
        uniform float uSpeed;
        uniform float uIntensity;
        uniform float uGrainIntensity;
        uniform float uGradientSize;
        uniform float uColor1Weight;
        uniform float uColor2Weight;
        uniform sampler2D uTouchTexture;
        varying vec2 vUv;

        float grain(vec2 uv, float time) {
          vec2 grainUv = uv * uResolution * 0.5;
          return fract(sin(dot(grainUv + time, vec2(12.9898, 78.233))) * 43758.5453) * 2.0 - 1.0;
        }

        vec3 getGradientColor(vec2 uv, float time) {
          float s = uSpeed;
          vec3 color = vec3(0.0);

          for (int i = 0; i < 12; i++) {
            float fi = float(i);
            vec2 c = vec2(
              0.5 + sin(time * s * (0.4 + fi * 0.02)) * 0.45,
              0.5 + cos(time * s * (0.5 + fi * 0.03)) * 0.45
            );

            float inf = 1.0 - smoothstep(0.0, uGradientSize, length(uv - c));
            vec3 base = (i % 2 == 0) ? uColor1 : uColor2;
            float w = (i % 2 == 0) ? uColor1Weight : uColor2Weight;

            color += base * inf * (0.5 + 0.5 * sin(time * s * (0.8 + fi * 0.1))) * w;
          }

          color = clamp(color * uIntensity, 0.0, 1.0);
          return clamp(mix(uDarkNavy, color, max(length(color), 0.2)), 0.0, 1.0);
        }

        void main() {
          vec2 uv = vUv;
          vec4 touchTex = texture2D(uTouchTexture, uv);

          uv += vec2(-(touchTex.r * 2.0 - 1.0), -(touchTex.g * 2.0 - 1.0)) * 0.8 * touchTex.b;

          vec3 color = getGradientColor(uv, uTime);
          color += grain(uv, uTime) * uGrainIntensity;

          gl_FragColor = vec4(color, 1.0);
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
      const rect = el.getBoundingClientRect();
      const w = Math.max(1, rect.width);
      const h = Math.max(1, rect.height);

      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      uniforms.uResolution.value.set(w, h);
    };

    const handleMove = (e) => {
      const p = e.touches && e.touches[0] ? e.touches[0] : e;
      const rect = el.getBoundingClientRect();
      const clamp01 = (v) => Math.min(1, Math.max(0, v));
      const x = clamp01((p.clientX - rect.left) / rect.width);
      const y = clamp01(1 - (p.clientY - rect.top) / rect.height);
      touchTexture.addTouch({ x, y });
    };

    const animate = () => {
      uniforms.uTime.value += clock.getDelta();
      touchTexture.update();
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
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
    <svg className="absolute inset-0 h-full w-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
      <defs><pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse"><path d="M 80 0 L 0 0 0 80" fill="none" stroke="#1C1917" strokeWidth="1" /></pattern></defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}

function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(28,25,23,0.03),transparent_70%)]" />
      <Grid />
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
    <div className="mx-auto max-w-6xl px-4 sm:px-5 pb-20 md:pb-28 pt-0 -mt-6 sm:-mt-10 md:-mt-16">
      {/* Hero matches the reference video: dark panel over full-page liquid */}
      <section>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/70 shadow-[0_18px_60px_rgba(0,0,0,0.55)]">
          <div
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "96px 96px",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(900px_650px_at_15%_25%,rgba(16,185,129,0.18),transparent_60%),radial-gradient(900px_650px_at_85%_20%,rgba(34,211,238,0.14),transparent_60%)]" />
          <div className="relative px-5 py-8 sm:px-8 sm:py-10 md:px-14 md:py-14">
            <div className="inline-flex items-center rounded-full border border-white/12 bg-white/5 px-4 py-2 text-[11px] font-semibold tracking-[0.22em] text-emerald-200/90">
              Trusted by teams with real stakes.
            </div>

            <h1 className="mt-6 max-w-3xl text-[clamp(2rem,10vw,3.75rem)] font-black tracking-tight text-white leading-[1.05]">
              Social Following Studios
              <br />
              <span className="text-emerald-300">builds words systems.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
              We operate the language conversion system that turns your authority into calls, your database into clients, and your name into revenue on demand.
            </p>

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

            {/* Bottom metric cards (match the reference capture) */}
            <div className="mt-10 border-t border-white/10 pt-6">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {HOME_STATS.map((item) => (
                  <div key={item.label} className="rounded-lg border border-white/10 bg-black/50 px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                    <p className="text-[10px] font-semibold tracking-[0.32em] text-white/55">{item.label}</p>
                    <p className="mt-2 text-base md:text-lg leading-relaxed font-medium text-white/75">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 md:mt-20">
        <div className="rounded-3xl border border-white/12 bg-[#F0F3F8] shadow-[0_18px_50px_rgba(0,0,0,0.22)] backdrop-blur-sm">
          <div className="p-8 md:p-10">
            <p className="text-xs font-semibold tracking-[0.32em] text-emerald-700 uppercase">
              ONE FLOW
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
              Audit. Deploy. Run.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700">
              We sync each channel you own to turn past leads into booked calls.
            </p>
            <p className="mt-4 max-w-3xl text-base md:text-lg leading-relaxed text-slate-700">
              Each job starts with a hard audit of your name, list, and owned channels. We map gaps and ship the flow.
            </p>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
              <p className="text-[11px] font-semibold tracking-[0.28em] text-slate-500 uppercase">
                ONE FLOW
              </p>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 p-5">
                  <h3 className="text-xl font-black text-slate-900">Words</h3>
                  <p className="mt-2 text-base md:text-lg leading-relaxed text-slate-700">
                    We craft clear copy that moves buyers to book. Your skill, in print.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 p-5">
                  <h3 className="text-xl font-black text-slate-900">Channels</h3>
                  <p className="mt-2 text-base md:text-lg leading-relaxed text-slate-700">
                    We wire email, site, and booking into one flow. Your reach, on tap.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 p-5">
                  <h3 className="text-xl font-black text-slate-900">Ops</h3>
                  <p className="mt-2 text-base md:text-lg leading-relaxed text-slate-700">
                    We run the flow and track booked calls. Your week, full.
                  </p>
                </div>
              </div>

              <div className="mt-6 h-2 w-full rounded-full bg-slate-200">
                <div className="h-2 w-[62%] rounded-full bg-emerald-600" />
              </div>
            </div>

            <h3 className="mt-10 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
              Your name is built. Your flow is next.
            </h3>
          </div>
        </div>
      </section>
    </div>
  );
}

function System() {
  return (
    <div className="space-y-12">
      <section className="rounded-[2rem] md:rounded-[3rem] border-2 border-stone-900/10 bg-white/80 backdrop-blur-xl p-6 sm:p-8 md:p-16 shadow-2xl text-left">
        <SectionHead
          eyebrow="INFRASTRUCTURE"
          title="Map gaps. Set flow. Run live."
          desc="Work starts with an audit, then we ship and run the flow."
          right={<Button href={CONFIGURE_URL} variant="primary">{CTA_LABEL}</Button>}
        />
      </section>

      <div className="grid lg:grid-cols-3 gap-8 text-left">
        {INFRA_LAYERS.map((layer) => (
          <Card key={layer.note} title={layer.title} eyebrow={layer.note}>
            <p className="text-base md:text-lg leading-relaxed text-stone-700">{layer.desc}</p>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8 text-left">
        <Card title="For teams with a built name." eyebrow="WHO WE SERVE">
          <p className="text-base md:text-lg leading-relaxed text-stone-700">
            We work with teams with a live list, owned channels, and a clear offer.
          </p>
        </Card>
        <Card title="Work starts with an audit." eyebrow="HOW IT WORKS">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-black tracking-tight text-stone-950">Audit</h3>
              <p className="mt-4 text-base md:text-lg leading-relaxed text-stone-700">
                A tight audit of your copy, list, and gaps. You get a clear plan.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-black tracking-tight text-stone-950">Build</h3>
              <p className="mt-4 text-base md:text-lg leading-relaxed text-stone-700">
                A full build across your owned channels. Past leads turn into booked calls.
              </p>
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
    <div className="space-y-12">
      <section className="rounded-[2rem] md:rounded-[3rem] border-2 border-stone-900/10 bg-white/80 backdrop-blur-xl p-6 sm:p-8 md:p-16 shadow-2xl text-left">
        <SectionHead eyebrow="CASE STUDIES" title="Results from real engagements." desc="We map where authority lives, identify gaps, and turn existing relationships into booked calls." />
      </section>

      <section className="rounded-[2rem] md:rounded-[3rem] border-2 border-stone-900/10 bg-white/70 backdrop-blur overflow-hidden shadow-2xl pt-10 md:pt-14 pb-8 md:pb-10 text-left">
        <div className="px-5 md:px-14">
          <div className="text-sm font-black tracking-[0.4em] text-emerald-700 uppercase mb-8 leading-none text-left">SOCIAL FOLLOWING STUDIOS</div>
        </div>
        <div className="mt-2">
          <PartnerMarquee />
        </div>
      </section>

      <div className="grid gap-10 text-left">
        {items.map((cs) => (
          <section key={cs.title} className="rounded-[2rem] md:rounded-[3rem] border-2 border-stone-900/10 bg-white p-5 sm:p-8 md:p-16 shadow-2xl text-left">
            <div className="grid lg:grid-cols-3 gap-8 md:gap-16 text-left">
              <div className="lg:col-span-1 text-left">
                <div className="rounded-[1.75rem] md:rounded-[2.5rem] border-2 border-stone-900/10 bg-gradient-to-br from-[#F5F2EA] to-white p-5 sm:p-8 md:p-10 overflow-hidden relative shadow-lg text-left">
                  <div className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-emerald-600/18 blur-2xl" />
                  <div className="relative text-left">
                    <div className="text-[10px] font-black tracking-[0.3em] text-emerald-700 uppercase mb-8 leading-none text-left">{cs.industry}</div>
                    <h2 className="text-[clamp(1.9rem,9vw,3rem)] font-black tracking-tighter leading-tight text-left">{cs.title}</h2>
                    <div className="mt-8 flex flex-wrap gap-2 text-left"><Pill>{cs.deployment}</Pill></div>
                  </div>
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
              </div>
            </div>
          </section>
        ))}
      </div>
      <section className="rounded-[2rem] md:rounded-[3rem] border-2 border-stone-900/10 bg-white/80 backdrop-blur-xl p-6 sm:p-8 md:p-16 shadow-2xl text-left">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-stone-950">Your calls are next.</h2>
      </section>
    </div>
  );
}

function Configure() {
  useEffect(() => {
    window.location.replace(CONFIGURE_URL);
  }, []);

  return (
    <div className="space-y-12">
      <section className="rounded-[2rem] md:rounded-[3rem] border-2 border-stone-900/10 bg-white/80 backdrop-blur-xl p-6 sm:p-8 md:p-16 shadow-2xl text-left">
        <SectionHead
          eyebrow="CONFIGURE"
          title="Redirecting."
          desc="Sending you to scheduling. If it does not open automatically, use the button below."
        />
        <div className="mt-10">
          <Button href={CONFIGURE_URL} variant="primary" size="large">OPEN CALENDAR</Button>
        </div>
      </section>
    </div>
  );
}

function Contact() {
  return (
    <div className="space-y-12">
      <section id="contact" className="scroll-mt-28 rounded-[2rem] md:rounded-[3rem] border-2 border-stone-900/10 bg-white/80 backdrop-blur-xl p-6 sm:p-8 md:p-16 shadow-2xl text-left">
        <SectionHead eyebrow="CONTACT" title="Book Your Call." desc="Start here. We bring the flow. You bring the list." />
      </section>
      <Card title="Call Request" eyebrow="FORM">
        <form
          className="space-y-6 md:space-y-8"
          method="POST"
          action={ZOHO_FORM_ACTION}
        >
          <input type="hidden" name="actionType" value={ZOHO_ACTION_TYPE} />
          <input type="hidden" name="returnURL" value={ZOHO_RETURN_URL} />
          {ZOHO_XNQSJSDP ? <input type="hidden" name="xnQsjsdp" value={ZOHO_XNQSJSDP} /> : null}
          {ZOHO_XMIWTLD ? <input type="hidden" name="xmIwtLD" value={ZOHO_XMIWTLD} /> : null}
          {ZOHO_LZAD ? <input type="hidden" name="lzad" value={ZOHO_LZAD} /> : null}
          <div className="grid gap-6 md:grid-cols-2">
            <Input label="Name" name="name" placeholder="Your name" />
            <Input label="Organization" name="organization" placeholder="Organization" />
            <Input label="Role" name="role" placeholder="Role" />
            <Input label="Primary channel or platform you want activated" name="primaryChannel" placeholder="Primary channel" />
          </div>
          <Textarea label="What your database or audience currently looks like" name="audience" placeholder="Describe your current database or audience" />
          <Textarea label="What revenue outcome you are building toward" name="revenueOutcome" placeholder="Describe the revenue outcome you are building toward" />
          <div className="mt-10 text-left">
            <button
              type="submit"
              className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-emerald-600 px-8 py-4 text-[10px] font-black tracking-widest uppercase text-white transition active:scale-[0.98] shadow-lg hover:bg-emerald-700 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2"
            >
              {CTA_LABEL}
            </button>
          </div>
        </form>
      </Card>
      <Card title="Social Following Studios works with operators whose authority is already built." eyebrow="QUALIFICATION">
        We review each request and take on teams with a live list and a clear offer.
      </Card>
    </div>
  );
}

function Terms() { return <div className="p-20 text-left font-bold text-xl">Commercial terms for Unified Conversion Systems.</div>; }
function Privacy() { return <div className="p-20 text-left font-bold text-xl">Privacy policy for intake configuration data.</div>; }

// ---------- main shell ----------

function Shell({ route, children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const active = (href) => {
    const r = href.replace(/^#/, "").toLowerCase();
    return route === r || (route === "/" && r === "/");
  };

  return (
    <div className={cx("relative min-h-screen text-stone-900 overflow-x-hidden selection:bg-emerald-600 selection:text-white", route === "/" ? "bg-transparent" : "bg-[#F5F2EA]")}>
      {route === "/" ? <HomeLiquidBackdrop /> : <Background />}
      <CustomCursor />

      <div className="relative z-10">

      <header className="sticky top-0 z-50 border-b border-stone-900/10 bg-transparent backdrop-blur-2xl shadow-sm text-left">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 sm:gap-4 sm:px-6 text-left">
          <a href="#/" className="flex min-w-0 flex-1 items-center md:flex-none">
            <BrandLogo className="w-[220px] sm:w-[300px] md:w-[560px]" priority />
          </a>

          <nav className="hidden md:flex items-center gap-3 text-base md:text-lg font-medium tracking-wide text-left">
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

          <div className="ml-auto flex items-center gap-2">
            <Button href={CONFIGURE_URL} variant="primary" size="default" className="hidden sm:inline-flex">{CTA_LABEL}</Button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex min-h-11 min-w-11 items-center justify-center rounded-2xl bg-stone-950 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div id="mobile-nav" className="md:hidden border-t-2 border-white/10 bg-stone-950/90 backdrop-blur-2xl shadow-2xl">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 py-4 sm:py-6 flex flex-col gap-3 text-base md:text-lg font-medium tracking-wide">
              <Button href={CONFIGURE_URL} variant="primary" size="default" className="w-full">
                {CTA_LABEL}
              </Button>
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cx(
                    "flex min-h-11 items-center justify-center text-base md:text-lg hover:opacity-80 transition rounded-2xl px-6 py-4 font-medium tracking-wide text-center",
                    active(item.href)
                      ? "bg-emerald-500 text-white shadow-2xl"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-16 md:py-24 text-left">{children}</main>

      <footer className="border-t-2 border-stone-900/10 py-16 text-left">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-[clamp(2rem,9vw,3.75rem)] font-black tracking-tight text-stone-950 leading-[1.08]">
            Your name is built. Your <span className="text-emerald-400">flow runs.</span>
          </h2>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 text-left">
            <div className="text-left">
              <BrandLogo className="w-[220px] sm:w-[300px] md:w-[460px] opacity-70 hover:opacity-100 transition-opacity duration-500" />
              <p className="mt-3 text-base md:text-lg leading-relaxed text-stone-600">Words Systems</p>
            </div>
            <div className="flex flex-wrap items-center gap-6 md:gap-10 text-base md:text-lg font-medium tracking-wide text-stone-500">
              <a href="#/terms" className="hover:text-stone-950 transition-colors">Terms</a>
              <a href="#/privacy" className="hover:text-stone-950 transition-colors">Privacy</a>
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
      case "/system": return <System />;
      case "/case-studies": case "/use-cases": return <CaseStudies />;
      case "/configure": return <Configure />;
      case "/contact": return <Contact />;
      case "/terms": return <Terms />;
      case "/privacy": return <Privacy />;
      default: return <Home />;
    }
  }, [route]);
  return <Shell route={route}>{page}</Shell>;
}
