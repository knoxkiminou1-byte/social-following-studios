import React, { useEffect, useMemo, useState, useRef } from "react";
import * as THREE from "three";
import sfsLogo from "./assets/sfs-mark.png";

/**
 * Social Following Studios - Unified Conversion Systems
 * Aesthetic: Hyper-Modern AI / Aerodynamic
 * Integration: High-Fidelity Three.js Liquid Field (No Rain) + Precision Cursor
 * Palette: Royal Creme + Ink + Emerald
 * Language: Forward-speaking, affirmative statements only
 */

const NAV = [
  { label: "Home", href: "#/" },
  { label: "System", href: "#/system" },
  { label: "Case Studies", href: "#/case-studies" },
  { label: "Configure", href: "#/configure" },
  { label: "Contact", href: "#/contact" },
];

const PARTNERS = [
  "CHEVRON",
  "STANFORD MEDICAL",
  "TRUE HEALTH CENTER",
  "PG&E",
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

function LogoPlaceholder({ className }) {
  return (
    <div
      className={cx(
        "flex items-center justify-center bg-stone-950 border border-emerald-500/30 rounded-[1.25rem] shadow-2xl overflow-hidden",
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

function Button({ href, children, variant = "primary", size = "default" }) {
  const base =
    "inline-flex items-center justify-center rounded-2xl font-black transition active:scale-[0.98] shadow-lg hover:shadow-xl uppercase tracking-widest";
  const sizes = {
    default: "px-4 py-3 text-[9px] md:px-6 md:py-4 md:text-[10px]",
    large: "px-8 py-4 text-[10px] md:px-10 md:py-5 md:text-xs",
  };
  const styles =
    variant === "primary"
      ? "bg-emerald-600 text-white hover:bg-emerald-700"
      : "bg-stone-950 text-white hover:bg-stone-900 border-2 border-emerald-600/20";
  return (
    <a href={href} className={cx(base, sizes[size], styles)}>
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
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 text-left">
      <div>
        <div className="text-sm font-black tracking-[0.25em] text-emerald-700 uppercase mb-6 leading-none">{eyebrow}</div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1]">{title}</h1>
        {desc ? (
          <p className="mt-8 max-w-3xl text-lg md:text-xl text-stone-700 leading-relaxed font-medium">{desc}</p>
        ) : null}
      </div>
      {right ? <div className="md:shrink-0">{right}</div> : null}
    </div>
  );
}

function Card({ title, eyebrow, children, right }) {
  return (
    <section className="rounded-[2.5rem] border-2 border-stone-900/10 bg-white/75 backdrop-blur-xl p-8 md:p-12 shadow-2xl text-left transition-all duration-500 hover:shadow-emerald-600/5">
      <div className="flex items-start justify-between gap-6">
        <div>
          {eyebrow ? (
            <div className="text-sm font-black tracking-[0.25em] text-emerald-700 uppercase mb-6 leading-none">{eyebrow}</div>
          ) : null}
          {title ? <h2 className="text-2xl md:text-4xl font-black tracking-tight">{title}</h2> : null}
        </div>
        {right ? <div className="hidden md:block">{right}</div> : null}
      </div>
      <div className="mt-8 text-sm md:text-base text-stone-700 leading-relaxed">{children}</div>
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
        <div className={cx("mt-3 text-xs font-bold tracking-tight opacity-70", dark ? "text-white" : "text-stone-600")}>{sub}</div>
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
      uSpeed: { value: 1.5 },
      uIntensity: { value: 2.2 },
      uTouchTexture: { value: touchTexture.texture },
      uGrainIntensity: { value: 0.06 },
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
      <div className="absolute -inset-[30vh] opacity-100">
        <LiquidBackground />
      </div>
      {/* Grid + vignettes */}
      <div className="absolute inset-0 opacity-[0.22]" style={gridStyle} />
      <div className="absolute inset-0 bg-[radial-gradient(1000px_700px_at_50%_15%,rgba(0,0,0,0.00),rgba(0,0,0,0.35)_55%,rgba(0,0,0,0.70)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/55" />
      {/* Grain */}
      <div className="absolute inset-0 grain-opaque opacity-60" />
    </div>
  );
}

// ---------- form components ----------

function Fieldset({ title, children }) {
  return (
    <fieldset className="rounded-[2.5rem] border-2 border-stone-900/10 bg-[#F5F2EA]/50 backdrop-blur-sm p-10 text-left">
      <legend className="px-5 text-[10px] font-black text-emerald-700 uppercase tracking-[0.4em] mb-4">{title}</legend>
      <div className="mt-4 space-y-8">{children}</div>
    </fieldset>
  );
}

function Input({ label, placeholder }) {
  return (
    <label className="block text-left">
      <div className="text-[10px] font-black tracking-widest text-stone-500 uppercase mb-3">{label}</div>
      <input type="text" placeholder={placeholder} className="w-full rounded-[1.25rem] border-2 border-stone-900/10 bg-white px-6 py-5 text-lg font-bold focus:outline-none focus:ring-4 focus:ring-emerald-600/10 focus:border-emerald-600 transition-all shadow-inner placeholder:text-stone-300" />
    </label>
  );
}

function Textarea({ label, placeholder }) {
  return (
    <label className="block text-left">
      <div className="text-[10px] font-black tracking-widest text-stone-500 uppercase mb-3">{label}</div>
      <textarea rows={4} placeholder={placeholder} className="w-full rounded-[1.25rem] border-2 border-stone-900/10 bg-white px-6 py-5 text-lg font-bold focus:outline-none focus:ring-4 focus:ring-emerald-600/10 focus:border-emerald-600 transition-all shadow-inner placeholder:text-stone-300" />
    </label>
  );
}

function Select({ label, options }) {
  return (
    <label className="block text-left">
      <div className="text-[10px] font-black tracking-widest text-stone-500 uppercase mb-3">{label}</div>
      <select className="w-full rounded-[1.25rem] border-2 border-stone-900/10 bg-white px-6 py-5 text-lg font-bold focus:outline-none focus:ring-4 focus:ring-emerald-600/10 focus:border-emerald-600 transition-all shadow-md appearance-none">
        {options.map((o) => (<option key={o} value={o}>{o}</option>))}
      </select>
    </label>
  );
}

// ---------- pages ----------

function Home() {
  const steps = [
    { key: "ACCESS", label: "Access" },
    { key: "CONVERSION", label: "Conversion" },
    { key: "INTAKE", label: "Intake" },
    { key: "CONTINUITY", label: "Continuity" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 pb-28 pt-24 md:pt-28">
      {/* Hero matches the reference video: dark panel over full-page liquid */}
      <section>
        <div className="relative overflow-hidden rounded-[2.75rem] border border-white/10 bg-black/45 shadow-[0_18px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl">
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
          <div className="relative px-8 py-10 md:px-14 md:py-14">
            <div className="inline-flex items-center rounded-full border border-white/12 bg-white/5 px-4 py-2 text-[11px] font-semibold tracking-[0.22em] text-emerald-200/90">
              UNIFIED CONVERSION SYSTEMS
            </div>

            <h1 className="mt-6 max-w-3xl text-5xl font-black tracking-tight text-white md:text-6xl">
              Capture every opportunity.
              <br />
              Convert faster.
              <br />
              <span className="text-emerald-300">Scale predictably.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
              Our system ensures every lead is captured, sent to the right place, and nurtured until revenue growth becomes the standard outcome.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#/configure"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(16,185,129,0.35)] hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300/60"
              >
                CONFIGURE NOW
              </a>
              <a
                href="#/case-studies"
                className="inline-flex items-center justify-center rounded-xl border border-white/18 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/25"
              >
                VIEW CASE STUDIES
              </a>
            </div>

            {/* Bottom micro-labels (matches screenshot) */}
            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 md:grid-cols-4">
              <p className="text-xs font-medium text-white/70">Continuous intake and routing</p>
              <p className="text-xs font-medium text-white/70">First-touch handling</p>
              <p className="text-xs font-medium text-white/70">Booked outcomes</p>
              <p className="text-xs font-medium text-white/70">Manual workload reduced</p>
            </div>
          </div>
        </div>
      </section>

      {/* THE EQUATION section should stay exactly like the reference (copy + layout) */}
      <section className="mt-16 md:mt-20">
        <div className="rounded-3xl border border-white/12 bg-[#F0F3F8] shadow-[0_18px_50px_rgba(0,0,0,0.22)] backdrop-blur-sm">
          <div className="p-8 md:p-10">
            <p className="text-xs font-semibold tracking-[0.32em] text-emerald-700 uppercase">
              THE EQUATION
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
              Capture + Route + Convert = <br className="hidden md:block" />
              Predictable revenue.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700">
              Service businesses grow when traffic becomes booked work. This system handles call capture, routing, and intake automation so demand becomes scheduled outcomes while operations stay clean.
            </p>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
              <p className="text-[11px] font-semibold tracking-[0.28em] text-slate-500 uppercase">
                CORE ARCHITECTURE
              </p>
              <div className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
                Access → Conversion → Intake → Continuity
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {steps.map((s) => (
                  <button
                    key={s.key}
                    type="button"
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-[11px] font-semibold tracking-[0.22em] text-slate-700 hover:bg-slate-50"
                  >
                    {s.key}
                  </button>
                ))}
              </div>

              <div className="mt-6 h-2 w-full rounded-full bg-slate-200">
                <div className="h-2 w-[62%] rounded-full bg-emerald-600" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function System() {
  const layers = [
    { title: "Access Layer", cap: ["24/7 call capture", "Overflow handling", "Intelligent routing", "Qualification prompts", "Escalation rules"], out: ["Captured contact details", "Call summaries", "Routed requests", "Qualified intent markers"], note: "SPEED TO RESPONSE" },
    { title: "Conversion Layer", cap: ["High-trust landing", "Concierge entry points", "Booking paths", "Offer clarity blocks"], out: ["Higher completion", "Higher call-to-book rates", "Clear intent signals"], note: "INTENT REALIZED" },
    { title: "Intake Layer", cap: ["Form routing", "Inbound data mapping", "Priority scoring", "Assignment rules"], out: ["Faster handling", "Cleaner records", "Higher close readiness"], note: "RECORD INTEGRITY" },
    { title: "Continuity Layer", cap: ["Integration connectors", "Appointment management", "System sync", "Retention rules"], out: ["Consistent logic", "Higher repeat business", "Higher review volume"], note: "LIFECYCLE PROTECTION" },
  ];
  return (
    <div className="space-y-12">
      <section className="rounded-[3rem] border-2 border-stone-900/10 bg-white/80 backdrop-blur-xl p-12 md:p-16 shadow-2xl text-left">
        <SectionHead
          eyebrow="SYSTEM"
          title="The Topology."
          desc="A four-layer deployment that moves demand into outcomes."
          right={<Button href="#/configure" variant="primary">CONFIGURE</Button>}
        />
      </section>
      <div className="grid lg:grid-cols-2 gap-8 text-left">
        {layers.map((L) => (
          <Card key={L.title} title={L.title} eyebrow={L.note}>
            <div className="grid sm:grid-cols-2 gap-10 mt-4 text-left">
              <div>
                <div className="text-[10px] font-black tracking-widest text-stone-950 mb-6 uppercase text-left">Capabilities</div>
                <ul className="space-y-4 text-sm text-stone-700 font-medium text-left">
                  {L.cap.map((t) => (<li key={t} className="flex gap-4"><span className="mt-1.5 h-2 w-2 rounded-full bg-emerald-600 flex-shrink-0" /><span>{t}</span></li>))}
                </ul>
              </div>
              <div>
                <div className="text-[10px] font-black tracking-widest text-stone-950 mb-6 uppercase text-left">Outputs</div>
                <div className="space-y-3 text-left">
                  {L.out.map((t) => (<div key={t} className="rounded-2xl border-2 border-stone-900/10 bg-stone-50 px-6 py-5 text-xs font-black tracking-tight text-stone-950 shadow-sm text-left">{t}</div>))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function CaseStudies() {
  const items = useMemo(() => [
    { title: "B2B Operations", industry: "B2B", problem: "Inbound requests arrive incomplete, unscored, and routed late.", deployment: "Voice + Intake + Conversion", stats: [{ label: "Qualified", value: "+41%", sub: "cleaner screening" }, { label: "Speed", value: "76%", sub: "faster response" }, { label: "Handoff", value: "+33%", sub: "sales-ready records" }], highlights: ["Voice routing", "Intake automation", "CRM sync"] },
    { title: "B2C Growth", industry: "B2C", problem: "Missed calls and slow intake during peak demand.", deployment: "Voice + Booking Flow", stats: [{ label: "Pickup", value: "+94%", sub: "extended hours capture" }, { label: "Bookings", value: "+42%", sub: "completed scheduling" }, { label: "Staff load", value: "60%", sub: "reduction in manual handling" }], highlights: ["Overflow routing", "Booking paths", "Intake logic"] },
  ], []);

  return (
    <div className="space-y-12">
      <section className="rounded-[3rem] border-2 border-stone-900/10 bg-white/80 backdrop-blur-xl p-12 md:p-16 shadow-2xl text-left">
        <SectionHead eyebrow="CASE STUDIES" title="Measured outcomes." desc="Each case shows the problem, the deployed pillars, and the shift." />
      </section>

      <section className="rounded-[3rem] border-2 border-stone-900/10 bg-white/70 backdrop-blur overflow-hidden shadow-2xl pt-14 pb-10 text-left">
        <div className="px-14">
          <div className="text-sm font-black tracking-[0.4em] text-emerald-700 uppercase mb-8 leading-none text-left">TRUSTED BY INDUSTRY LEADERS</div>
        </div>
        <div className="mt-2">
          <PartnerMarquee />
        </div>
      </section>

      <div className="grid gap-10 text-left">
        {items.map((cs) => (
          <section key={cs.title} className="rounded-[3rem] border-2 border-stone-900/10 bg-white p-10 md:p-16 shadow-2xl text-left">
            <div className="grid lg:grid-cols-3 gap-16 text-left">
              <div className="lg:col-span-1 text-left">
                <div className="rounded-[2.5rem] border-2 border-stone-900/10 bg-gradient-to-br from-[#F5F2EA] to-white p-10 overflow-hidden relative shadow-lg text-left">
                  <div className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-emerald-600/18 blur-2xl" />
                  <div className="relative text-left">
                    <div className="text-[10px] font-black tracking-[0.3em] text-emerald-700 uppercase mb-8 leading-none text-left">{cs.industry}</div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight text-left">{cs.title}</h2>
                    <div className="mt-8 flex flex-wrap gap-2 text-left"><Pill>{cs.deployment}</Pill></div>
                  </div>
                </div>
                <div className="mt-8 rounded-[2rem] border-2 border-stone-900/10 bg-white p-8 shadow-lg text-left">
                  <div className="text-[10px] font-black tracking-widest text-stone-500 uppercase mb-4 leading-none text-left">PROBLEM</div>
                  <div className="text-lg font-bold text-stone-950 leading-tight text-left">{cs.problem}</div>
                </div>
              </div>
              <div className="lg:col-span-2 space-y-10 text-left">
                <div className="grid md:grid-cols-3 gap-6 text-left">
                  {cs.stats.map((s) => (<Stat key={s.label} label={s.label} value={s.value} sub={s.sub} />))}
                </div>
                <div className="rounded-[2.5rem] border-2 border-stone-900/10 bg-white p-12 shadow-2xl text-left">
                  <div className="text-[10px] font-black tracking-[0.3em] text-emerald-700 uppercase mb-10 leading-none text-left">DEPLOYMENT HIGHLIGHTS</div>
                  <div className="mt-6 flex flex-wrap gap-4 text-left">
                    {cs.highlights.map((h) => (<span key={h} className="rounded-2xl border-2 border-stone-900/10 bg-[#F5F2EA] px-8 py-5 text-sm font-black tracking-tight text-stone-950 shadow-lg text-left">{h}</span>))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function Configure() {
  const [status, setStatus] = useState("idle");
  const onSubmit = (e) => { e.preventDefault(); setStatus("submitted"); setTimeout(() => setStatus("idle"), 2200); };
  return (
    <div className="space-y-12">
      <section className="rounded-[3rem] border-2 border-stone-900/10 bg-white/80 backdrop-blur-xl p-12 md:p-16 shadow-2xl text-left">
        <SectionHead eyebrow="CONFIGURE" title="Configuration." desc="Deployment-ready output for voice and conversion systems." />
      </section>
      <section className="rounded-[3rem] border-2 border-stone-900/10 bg-white p-12 md:p-16 shadow-2xl text-left">
        <form onSubmit={onSubmit} className="space-y-14 text-left">
          <Fieldset title="BUSINESS INFORMATION">
            <div className="grid md:grid-cols-2 gap-10 text-left">
              <Input label="Business name" placeholder="Enter business name" />
              <Input label="Primary phone" placeholder="Enter primary phone number" />
            </div>
          </Fieldset>
          <div className="flex justify-end text-left">
            <button type="submit" className="rounded-[1.5rem] bg-emerald-600 px-12 py-6 text-xs font-black tracking-[0.2em] text-white transition-all duration-500 hover:bg-emerald-700 hover:scale-105 shadow-2xl uppercase text-left">
              {status === "submitted" ? "CAPTURED" : "SUBMIT CONFIGURATION"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function Contact() {
  return (
    <div className="space-y-12">
      <section className="rounded-[3rem] border-2 border-stone-900/10 bg-white/80 backdrop-blur-xl p-12 md:p-16 shadow-2xl text-left">
        <SectionHead eyebrow="CONTACT" title="Direct Terminal." desc="Deploy conversion management in sequence." />
      </section>
      <Card title="Start Configuration" eyebrow="ACTIVATION">
        <div className="mt-10 text-left">
          <Button href="#/configure" variant="primary" size="large">CONFIGURE YOUR SYSTEM</Button>
        </div>
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

      <header className="sticky top-0 z-50 border-b-2 border-stone-900/10 bg-transparent backdrop-blur-2xl shadow-sm text-left">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 text-left">
          <a href="#/" className="flex items-center gap-4 group">
            <LogoPlaceholder className="h-10 w-10 md:h-14 md:w-14 shadow-2xl" />
            <div className="leading-none text-left">
              <div className="text-base md:text-lg font-black tracking-tighter text-left">Social Following Studios</div>
              <div className="text-[9px] md:text-[10px] font-black tracking-[0.2em] text-emerald-700 mt-1 uppercase text-left">Unified Conversion Systems</div>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-1 text-left">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cx(
                  "rounded-2xl px-5 py-3 text-[10px] font-black tracking-widest uppercase transition-all duration-300",
                  active(item.href)
                    ? "bg-stone-950 text-white shadow-2xl"
                    : "text-stone-600 hover:text-stone-950 hover:bg-white/50"
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button href="#/configure" variant="primary" size="default">CONFIGURE</Button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center h-12 w-12 rounded-2xl bg-stone-950 text-white"
              aria-label="Toggle menu"
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
          <div className="md:hidden border-t-2 border-stone-900/10 bg-[#F5F2EA]/70 backdrop-blur-2xl">
            <nav className="mx-auto max-w-7xl px-6 py-4 flex flex-col gap-2">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cx(
                    "rounded-2xl px-5 py-4 text-xs font-black tracking-widest uppercase transition-all duration-300 text-center",
                    active(item.href)
                      ? "bg-stone-950 text-white shadow-2xl"
                      : "text-stone-600 hover:text-stone-950 hover:bg-white/50"
                  )}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-7xl px-6 py-16 md:py-24 text-left">{children}</main>

      <footer className="border-t-2 border-stone-900/10 py-16 text-left">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 text-left">
            <div className="flex items-center gap-4 text-left">
              <LogoPlaceholder className="h-12 w-12 border-stone-900/20 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500" />
              <div className="text-left">
                <div className="text-xl font-black tracking-tighter text-left">Social Following Studios</div>
                <div className="text-[10px] font-black tracking-[0.2em] text-emerald-700 uppercase mt-1 text-left">Unified Conversion Systems</div>
              </div>
            </div>
            <div className="flex items-center gap-10 text-[10px] font-black tracking-widest text-stone-500 uppercase">
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
