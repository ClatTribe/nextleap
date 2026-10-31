"use client";

import { useEffect } from "react";
import { COURSES, PILLARS } from "./courses";

type Draw = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void;

// All page interactivity: canvases, headline scramble, pillars, course drawer,
// counters, reveal-on-scroll and copy-email. Renders nothing itself.
export default function NextLeapEffects() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");

    const ac = new AbortController();
    const sig = { signal: ac.signal };
    const cleanups: (() => void)[] = [];
    let alive = true;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const RED = getComputedStyle(root).getPropertyValue("--red").trim() || "#E2321C";
    const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;

    /* header: transparent over hero, solid after */
    const hdr = $("hdr");
    const hero = document.querySelector<HTMLElement>(".hero")!;
    const onScroll = () => hdr.classList.toggle("solid", scrollY > hero.offsetHeight - 90);
    addEventListener("scroll", onScroll, { passive: true, ...sig });
    onScroll();

    /* canvas helper: sizes to CSS box, runs only while visible */
    function stage(canvas: HTMLCanvasElement, draw: Draw) {
      const ctx = canvas.getContext("2d")!;
      let w = 0, h = 0, raf = 0, on = false;
      const t0 = performance.now();
      const size = () => {
        const r = canvas.getBoundingClientRect();
        w = r.width; h = r.height;
        canvas.width = w * DPR; canvas.height = h * DPR;
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
        if (reduce || !on) draw(ctx, w, h, 0);
      };
      const loop = (now: number) => {
        draw(ctx, w, h, now - t0);
        if (on && alive) raf = requestAnimationFrame(loop);
      };
      const ro = new ResizeObserver(size);
      ro.observe(canvas);
      const io = new IntersectionObserver(([e]) => {
        on = e.isIntersecting && !reduce;
        cancelAnimationFrame(raf);
        if (on) raf = requestAnimationFrame(loop);
      });
      io.observe(canvas);
      size();
      cleanups.push(() => { ro.disconnect(); io.disconnect(); cancelAnimationFrame(raf); });
    }

    /* pointer, smoothed */
    const ptr = { x: 0, y: 0, tx: 0, ty: 0 };
    addEventListener("pointermove", (e) => {
      ptr.tx = e.clientX / innerWidth - 0.5;
      ptr.ty = e.clientY / innerHeight - 0.5;
    }, { passive: true, ...sig });
    const ease = () => { ptr.x += (ptr.tx - ptr.x) * 0.05; ptr.y += (ptr.ty - ptr.y) * 0.05; };

    /* HERO: a dot terrain flowing toward the viewer */
    stage($<HTMLCanvasElement>("terrain"), (ctx, w, h, t) => {
      ease();
      ctx.clearRect(0, 0, w, h);
      const g = ctx.createRadialGradient(w * 0.62, h * 0.42, 0, w * 0.62, h * 0.42, Math.max(w, h) * 0.6);
      g.addColorStop(0, "rgba(255,74,46,.16)"); g.addColorStop(1, "rgba(255,74,46,0)");
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      const cols = w < 700 ? 80 : 140, rows = 52, dz = 0.45, speed = 0.0016;
      const travel = t * speed, off = travel % dz;
      const horizon = h * 0.4 + ptr.y * 30, f = h * 0.95, camH = 2.4, cx = w * 0.5 - ptr.x * 80;
      for (let r = rows - 1; r >= 0; r--) {
        const z = 0.9 + r * dz - off;
        if (z <= 0.2) continue;
        const rowId = Math.round((z + travel) / dz);
        const a = Math.max(0, Math.min(1, 1 - z / (rows * dz)));
        for (let c = 0; c < cols; c++) {
          const x = (c - cols / 2) * 0.3;
          const zw = z + travel;
          const y = Math.sin(x * 0.32 + zw * 0.22) * 0.5 + Math.sin(x * 0.11 - zw * 0.16) * 0.9 + Math.cos(zw * 0.09 + x * 0.05) * 0.4;
          const sx = cx + (x * f) / z, sy = horizon + (((camH - y * 0.55) * f) / z) * 0.42;
          if (sx < -10 || sx > w + 10 || sy > h + 10) continue;
          const hot = ((c * 73856093) ^ (rowId * 19349663)) % 61 === 0;
          const s = Math.max(0.9, (hot ? 4.2 : 2.4) / z);
          ctx.globalAlpha = hot ? Math.min(1, a * 1.6) : Math.min(0.95, a * 1.15);
          ctx.fillStyle = hot ? RED : "#E9EAEE";
          ctx.fillRect(sx - s / 2, sy - s / 2, s, s);
        }
      }
      ctx.globalAlpha = 1;
    });

    /* headline scramble */
    const words = ["AI-ready leaders", "product builders", "AI-native marketers"];
    const el = $("scramble"), glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ/-_<>01";
    let wi = 0;
    function scrambleTo(next: string) {
      const from = el.textContent || "", len = Math.max(from.length, next.length), start = performance.now();
      const step = (now: number) => {
        if (!alive) return;
        const p = Math.min(1, (now - start) / 900);
        let out = "";
        for (let i = 0; i < len; i++) {
          const lock = i / len < p * 1.15 - 0.1;
          out += lock ? next[i] || "" : next[i] === " " ? " " : glyphs[(Math.random() * glyphs.length) | 0];
        }
        el.textContent = out;
        if (p < 1) requestAnimationFrame(step); else el.textContent = next;
      };
      requestAnimationFrame(step);
    }
    if (!reduce) {
      const iv = setInterval(() => { wi = (wi + 1) % words.length; scrambleTo(words[wi]); }, 3600);
      cleanups.push(() => clearInterval(iv));
    }

    /* APPROACH: rotating dot sphere */
    const N = 900, pts: [number, number, number, boolean][] = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = i * 2.39996;
      pts.push([Math.cos(th) * r, y, Math.sin(th) * r, i % 23 === 0]);
    }
    const inkCol = () => getComputedStyle(root).getPropertyValue("--ink").trim();
    let ink = inkCol();
    matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => (ink = inkCol()), sig);
    stage($<HTMLCanvasElement>("orb"), (ctx, w, h, t) => {
      ease();
      ctx.clearRect(0, 0, w, h);
      const R = Math.min(w, h) * 0.36, cx = w / 2, cy = h / 2;
      const ay = t * 0.00025 + ptr.x * 1.2, ax = 0.35 + ptr.y * 0.6;
      const sy = Math.sin(ay), cyA = Math.cos(ay), sx = Math.sin(ax), cxA = Math.cos(ax);
      for (const [x, y, z, hot] of pts) {
        const X = x * cyA + z * sy;
        let Z = -x * sy + z * cyA;
        const Y = y * cxA - Z * sx;
        Z = y * sx + Z * cxA;
        const p = 2.6 / (2.6 - Z), px = cx + X * R * p, py = cy + Y * R * p;
        const a = (Z + 1) / 2;
        ctx.globalAlpha = hot ? 0.35 + a * 0.65 : 0.08 + a * 0.6;
        ctx.fillStyle = hot ? RED : ink;
        const s = (hot ? 3 : 1.7) * p;
        ctx.fillRect(px - s / 2, py - s / 2, s, s);
      }
      ctx.globalAlpha = 0.25; ctx.strokeStyle = ink; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.ellipse(cx, cy, R * 1.32, R * 0.32, -0.35, 0, Math.PI * 2); ctx.stroke();
      ctx.globalAlpha = 1;
      const orbit = t * 0.0006;
      ctx.fillStyle = RED;
      const ox = cx + Math.cos(orbit) * R * 1.32 * Math.cos(-0.35) - Math.sin(orbit) * R * 0.32 * Math.sin(-0.35);
      const oy = cy + Math.cos(orbit) * R * 1.32 * Math.sin(-0.35) + Math.sin(orbit) * R * 0.32 * Math.cos(-0.35);
      ctx.fillRect(ox - 4, oy - 4, 8, 8);
    });

    /* pillars */
    const pt = $("pillarText"), pills = [...document.querySelectorAll<HTMLButtonElement>(".pill")];
    pills.forEach((b) => b.addEventListener("click", () => {
      pills.forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      const [h, p] = PILLARS[+(b.dataset.i || 0)];
      pt.querySelector("h3")!.textContent = h;
      pt.querySelector("p")!.textContent = p;
      pt.classList.remove("swap"); void pt.offsetWidth; pt.classList.add("swap");
    }, sig));

    /* in-page links: scroll with JS */
    const HEADER = 84;
    function goTo(id: string) {
      const target = id === "top" ? null : document.getElementById(id);
      const y = target ? target.getBoundingClientRect().top + scrollY - (id === "contact" ? 0 : HEADER) : 0;
      scrollTo({ top: Math.max(0, y), behavior: reduce ? "auto" : "smooth" });
    }

    /* course detail drawer */
    const drawer = $("drawer"), panel = drawer.querySelector<HTMLElement>(".panel")!;
    const tiles = [...document.querySelectorAll<HTMLButtonElement>(".tile")];
    const esc = (s: string) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]!);
    let cur = 0;
    let opener: HTMLElement | null = null;
    function fill(i: number) {
      cur = (i + COURSES.length) % COURSES.length;
      const c = COURSES[cur];
      $("dLabel").textContent = "Course 0" + (cur + 1) + " · " + c.track;
      $("dTitle").textContent = c.title;
      $("dPitch").textContent = c.pitch;
      $("dMods").innerHTML = c.mods
        .map(([h, p], k) => '<li style="animation-delay:' + (0.15 + k * 0.05) + 's"><span class="n">M0' + (k + 1) + "</span><div><b>" + esc(h) + "</b><p>" + esc(p) + "</p></div></li>")
        .join("");
      $("dShip").innerHTML = c.ship.map((s) => "<li>" + esc(s) + "</li>").join("");
      $("dTools").innerHTML = c.tools.map((s) => "<span>" + esc(s) + "</span>").join("");
      $("dMeta").innerHTML = c.meta.map(([k, v]) => "<div><small>" + esc(k) + "</small><b>" + esc(v) + "</b></div>").join("");
      $("dArt").innerHTML = tiles[cur].querySelector(".art")!.innerHTML;
      $("dNext2").textContent = "Next: " + COURSES[(cur + 1) % COURSES.length].title;
      panel.scrollTop = 0;
    }
    function openCourse(i: number, from?: HTMLElement | null) {
      opener = from || (document.activeElement as HTMLElement | null);
      fill(i);
      drawer.classList.add("on"); drawer.setAttribute("aria-hidden", "false");
      document.body.classList.add("locked");
      setTimeout(() => $("dClose").focus({ preventScroll: true }), 50);
    }
    function closeCourse() {
      if (!drawer.classList.contains("on")) return;
      drawer.classList.remove("on"); drawer.setAttribute("aria-hidden", "true");
      document.body.classList.remove("locked");
      opener?.focus?.({ preventScroll: true });
    }
    const flip = (d: number) => {
      fill(cur + d);
      $("dMods").querySelectorAll("li").forEach((li) => { li.style.animation = "none"; void li.offsetWidth; li.style.animation = ""; });
    };
    $("dPrev").addEventListener("click", () => flip(-1), sig);
    $("dNext").addEventListener("click", () => flip(1), sig);
    $("dNext2").addEventListener("click", () => flip(1), sig);
    tiles.forEach((t, i) => t.addEventListener("click", () => openCourse(i, t), sig));
    document.addEventListener("keydown", (e) => {
      if (!drawer.classList.contains("on")) return;
      if (e.key === "Escape") closeCourse();
      if (e.key === "ArrowRight") flip(1);
      if (e.key === "ArrowLeft") flip(-1);
      if (e.key === "Tab") {
        const f = [...panel.querySelectorAll<HTMLElement>("button,a[href]")], first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }, sig);

    /* one click handler for every in-page link and close control */
    document.addEventListener("click", (e) => {
      const target = e.target as Element;
      const closer = target.closest("[data-close]");
      const a = target.closest<HTMLAnchorElement>('a[href^="#"]');
      if (closer) closeCourse();
      if (!a) return;
      e.preventDefault();
      const id = a.getAttribute("href")!.slice(1);
      const m = /^c([1-4])$/.exec(id);
      if (m) openCourse(+m[1] - 1, a);
      else setTimeout(() => goTo(id || "top"), closer ? 120 : 0);
    }, sig);

    /* PLATE: concentric rings, looking up a tower */
    stage($<HTMLCanvasElement>("rings"), (ctx, w, h, t) => {
      ctx.fillStyle = "#07080A"; ctx.fillRect(0, 0, w, h);
      const cx = w * 0.36, cy = h * 0.46, max = Math.hypot(w, h) * 0.75;
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, max * 0.18);
      glow.addColorStop(0, "rgba(243,243,241,.95)"); glow.addColorStop(0.55, "rgba(243,243,241,.35)"); glow.addColorStop(1, "rgba(243,243,241,0)");
      let r = max * 0.06, i = 0;
      while (r < max) {
        const seg = 24 + i * 6, dir = i % 2 ? 1 : -1, rot = t * 0.00004 * dir * (1 + i * 0.15);
        const shade = Math.min(1, 0.25 + i * 0.05);
        ctx.lineWidth = Math.max(1, r * 0.045);
        for (let s = 0; s < seg; s++) {
          const a0 = rot + (s / seg) * Math.PI * 2, a1 = a0 + ((Math.PI * 2) / seg) * 0.82;
          const v = 40 + ((s * 37 + i * 11) % 9) * 6;
          ctx.strokeStyle = `rgba(${v},${v + 2},${v + 6},${shade})`;
          ctx.beginPath(); ctx.arc(cx, cy, r, a0, a1); ctx.stroke();
        }
        if (i === 3) { ctx.strokeStyle = RED; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, r * 1.06, rot * 4, rot * 4 + 0.9); ctx.stroke(); }
        r *= 1.22; i++;
      }
      ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(cx, cy, max * 0.18, 0, Math.PI * 2); ctx.fill();
      const vg = ctx.createLinearGradient(0, 0, 0, h); vg.addColorStop(0, "rgba(7,8,10,0)"); vg.addColorStop(1, "rgba(7,8,10,.5)");
      ctx.fillStyle = vg; ctx.fillRect(0, 0, w, h);
    });

    /* counters, bars and reveal */
    const count = (b: HTMLElement) => {
      const to = +(b.dataset.to || 0), sup = b.dataset.sup ? "<sup>" + b.dataset.sup + "</sup>" : "";
      if (reduce) return;
      const s = performance.now();
      const tick = (n: number) => {
        if (!alive) return;
        const k = Math.min(1, (n - s) / 1200), v = Math.round(to * (1 - Math.pow(1 - k, 3)));
        b.innerHTML = v + sup;
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      const t = e.target as HTMLElement;
      if (t.id === "stats") t.querySelectorAll<HTMLElement>("b").forEach(count);
      if (t.id === "ab" && !reduce) t.querySelectorAll<HTMLElement>("i").forEach((i, k) => {
        const w = i.style.getPropertyValue("--w");
        i.style.setProperty("--w", "0%");
        setTimeout(() => i.style.setProperty("--w", w), 80 + k * 160);
      });
      t.classList.remove("pre"); io.unobserve(t);
    }), { threshold: 0.2 });
    ["stats", "ab"].forEach((id) => io.observe($(id)));
    document.querySelectorAll<HTMLElement>(".rv").forEach((e) => {
      if (e.getBoundingClientRect().top > innerHeight) e.classList.add("pre");
      io.observe(e);
    });
    cleanups.push(() => io.disconnect());

    /* copy email */
    const copy = $("copy"), mail = $("mail");
    copy.addEventListener("click", () => {
      const ok = () => { copy.textContent = "Copied"; setTimeout(() => (copy.textContent = "Copy email"), 1600); };
      const sel = () => {
        const r = document.createRange(); r.selectNodeContents(mail);
        const s = getSelection(); s?.removeAllRanges(); s?.addRange(r);
        copy.textContent = "Press Ctrl/⌘ C";
      };
      try { navigator.clipboard.writeText(mail.textContent || "").then(ok, sel); } catch { sel(); }
    }, sig);

    return () => {
      alive = false;
      ac.abort();
      cleanups.forEach((fn) => fn());
      root.classList.remove("js");
      document.body.classList.remove("locked");
    };
  }, []);

  return null;
}
