import { useState } from "react";
import { Link } from "react-router-dom";

const HERO = "https://media.base44.com/images/public/69da8f993c6895f2b079653b/8f20fa388_generated_60289809.png";
const KEYS = "https://media.base44.com/images/public/69da8f993c6895f2b079653b/3151e9d9c_generated_28ba2622.png";

const C = {
  navy: "#0d1f3c", navyMid: "#12284d",
  blue: "#1a56db", blueLight: "#3b82f6", bluePale: "#eff6ff",
  gold: "#b8860b", goldLight: "#d4a017", goldPale: "#fefce8",
  ivory: "#faf9f6", warmWhite: "#f5f3ee",
  text: "#0f172a", muted: "#64748b", border: "rgba(26,86,219,0.12)",
};

const glass = (extra = {}) => ({
  background: "rgba(255,255,255,0.9)",
  backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
  border: `1px solid ${C.border}`, borderRadius: 20,
  boxShadow: "0 8px 40px rgba(13,31,60,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
  transition: "all 0.28s ease", ...extra,
});

const POPULATIONS = [
  { icon: "⚖️", title: "Justice-Impacted Individuals", desc: "Formerly incarcerated individuals working toward stability, employment, and permanent housing." },
  { icon: "🏠", title: "Turned-Out Foster Youth", desc: "Young adults aging out of the foster care system who need structured support and a safe home." },
  { icon: "🎖️", title: "Homeless Veterans", desc: "Veterans experiencing homelessness who have served our country and deserve dignity in return." },
  { icon: "🔄", title: "Treatment Graduates", desc: "Individuals completing drug and alcohol treatment programs who need stable housing to sustain recovery." },
  { icon: "🤝", title: "Agency-Referred Individuals", desc: "Clients referred by partner courts, probation offices, nonprofits, and social service agencies." },
];

const PROGRAMS = [
  { icon: "🏘️", title: "Transitional Housing", desc: "100% drug & alcohol free structured homes operated by REJG Legacy Properties.", link: "/programs/housing", color: C.blue },
  { icon: "💼", title: "Workforce Readiness", desc: "Resume building, interview prep, employer connections, and WOTC tax credit guidance.", link: "/programs/jobs", color: C.gold },
  { icon: "🚌", title: "Transportation Support", desc: "Rides to court, treatment, employment, and programs via Mission First Transport.", link: "/programs/transportation", color: C.blue },
  { icon: "📚", title: "Life Skills & Education", desc: "140-class Pathways Hub OS curriculum covering financial literacy, digital skills, and wellness.", link: "/programs/education", color: C.gold },
  { icon: "👥", title: "Case Management", desc: "One-on-one case managers coordinate services, track progress, and remove barriers.", link: "/programs", color: C.blue },
  { icon: "🌱", title: "Community Integration", desc: "Connection to faith communities, peer networks, civic engagement, and long-term support systems.", link: "/programs", color: C.gold },
];

const STATS = [
  { val: "5", label: "Populations We Serve" },
  { val: "140", label: "Learning Classes Available" },
  { val: "100%", label: "Drug & Alcohol Free Housing" },
  { val: "501(c)(3)", label: "Texas Nonprofit" },
];

function PopCard({ icon, title, desc }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ ...glass(), padding: 24, borderLeft: `4px solid ${h ? C.gold : C.blue}`, transform: h ? "translateY(-5px)" : "none", cursor: "default" }}>
      <div style={{ fontSize: 32, marginBottom: 12 }}>{icon}</div>
      <div style={{ fontSize: 15, fontWeight: 800, color: C.text, marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.7 }}>{desc}</div>
    </div>
  );
}

function ProgramCard({ icon, title, desc, link, color }) {
  const [h, setH] = useState(false);
  return (
    <Link to={link} style={{ textDecoration: "none" }}>
      <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
        style={{ ...glass(), padding: 28, height: "100%", boxSizing: "border-box", transform: h ? "translateY(-6px)" : "none",
          boxShadow: h ? `0 20px 50px rgba(13,31,60,0.14), 0 0 0 2px ${color}` : "0 8px 40px rgba(13,31,60,0.08)" }}>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: `${color}12`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, fontSize: 26 }}>{icon}</div>
        <div style={{ fontSize: 16, fontWeight: 800, color: C.text, marginBottom: 8 }}>{title}</div>
        <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, marginBottom: 16 }}>{desc}</div>
        <span style={{ fontSize: 13, fontWeight: 700, color, display: "flex", alignItems: "center", gap: 6 }}>Learn More →</span>
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <div style={{ background: C.ivory, fontFamily: "system-ui, sans-serif", color: C.text }}>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:none}}
        @keyframes glow{0%,100%{box-shadow:0 0 20px rgba(26,86,219,0.2)}50%{box-shadow:0 0 40px rgba(26,86,219,0.4)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
      `}</style>

      {/* ── HERO ── */}
      <section style={{ position: "relative", background: C.navy, color: "#fff", minHeight: "92vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src={HERO} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.15 }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${C.navy} 45%, rgba(13,31,60,0.88) 70%, rgba(26,86,219,0.12) 100%)` }} />
        </div>
        {/* Floating orbs */}
        <div style={{ position: "absolute", top: "8%", right: "6%", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(26,86,219,0.08) 0%, transparent 70%)", animation: "float 7s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "12%", right: "22%", width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle, rgba(212,160,23,0.07) 0%, transparent 70%)", animation: "float 9s ease-in-out infinite reverse" }} />
        <div style={{ position: "absolute", top: "40%", left: "55%", width: 140, height: 140, borderRadius: "50%", background: "radial-gradient(circle, rgba(26,86,219,0.05) 0%, transparent 70%)" }} />

        <div style={{ position: "relative", maxWidth: 1240, margin: "0 auto", padding: "80px 28px", width: "100%", animation: "fadeUp 0.9s ease" }}>
          <div style={{ maxWidth: 700 }}>
            {/* Badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(26,86,219,0.15)", border: "1px solid rgba(26,86,219,0.3)", borderRadius: 30, padding: "8px 20px", marginBottom: 28 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.blueLight, animation: "glow 2s infinite" }} />
              <span style={{ fontSize: 11, fontWeight: 800, color: "#93c5fd", textTransform: "uppercase", letterSpacing: "0.14em" }}>
                Texas 501(c)(3) Nonprofit · EIN: 39-3366072
              </span>
            </div>

            <h1 style={{ fontSize: "clamp(44px, 6.5vw, 80px)", fontWeight: 900, lineHeight: 1.04, margin: "0 0 24px 0", letterSpacing: "-0.02em" }}>
              Rebuilding Lives.<br />
              <span style={{ background: `linear-gradient(135deg, ${C.blueLight}, #60a5fa)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Restoring Dignity.
              </span><br />
              Renewing Hope.
            </h1>

            <p style={{ fontSize: 18, lineHeight: 1.8, color: "rgba(255,255,255,0.72)", maxWidth: 580, marginBottom: 14 }}>
              Headquarters of Hope Foundation empowers <strong style={{ color: "#fff" }}>justice-impacted individuals, homeless veterans, and turned-out foster youth</strong> with housing, workforce readiness, and life-changing support.
            </p>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", marginBottom: 40, maxWidth: 520 }}>
              Austin, Texas · Serving Central Texas and beyond
            </p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 56 }}>
              <Link to="/get-help" style={{ textDecoration: "none" }}>
                <button style={{ padding: "15px 32px", background: `linear-gradient(135deg, ${C.blue}, ${C.blueLight})`, color: "#fff", border: "none", borderRadius: 12, cursor: "pointer", fontWeight: 800, fontSize: 15, boxShadow: "0 4px 24px rgba(26,86,219,0.45)", letterSpacing: "0.02em" }}>
                  Get Help Now →
                </button>
              </Link>
              <Link to="/partners" style={{ textDecoration: "none" }}>
                <button style={{ padding: "15px 32px", background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 12, cursor: "pointer", fontWeight: 700, fontSize: 15 }}>
                  Refer a Client
                </button>
              </Link>
              <Link to="/funding" style={{ textDecoration: "none" }}>
                <button style={{ padding: "15px 32px", background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, color: C.navy, border: "none", borderRadius: 12, cursor: "pointer", fontWeight: 800, fontSize: 15 }}>
                  Donate
                </button>
              </Link>
            </div>

            {/* Stat row */}
            <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
              {STATS.map(s => (
                <div key={s.val}>
                  <div style={{ fontSize: 26, fontWeight: 900, color: C.blueLight }}>{s.val}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── GATEWAY CARDS ── */}
      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "0 28px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginTop: -44, position: "relative", zIndex: 10 }}>
          {[
            { icon: "🆘", title: "Get Help", desc: "Individuals seeking housing, employment, or support can apply directly through our intake process.", link: "/get-help", color: C.blue },
            { icon: "📋", title: "Refer a Client", desc: "Courts, probation, social workers, and agencies can refer clients for placement and services.", link: "/partners", color: C.gold },
            { icon: "💛", title: "Support the Mission", desc: "Donors, grantmakers, and volunteers power everything we do. Every contribution changes a life.", link: "/funding", color: C.blue },
          ].map((c, i) => {
            const [h, setH] = useState(false);
            return (
              <Link key={i} to={c.link} style={{ textDecoration: "none" }}>
                <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
                  style={{ ...glass(), padding: 28, transform: h ? "translateY(-6px)" : "none", borderColor: h ? c.color : C.border, boxShadow: h ? `0 20px 48px rgba(13,31,60,0.16), 0 0 0 2px ${c.color}` : "0 8px 40px rgba(13,31,60,0.08)" }}>
                  <div style={{ fontSize: 32, marginBottom: 14 }}>{c.icon}</div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: C.text, marginBottom: 8 }}>{c.title}</div>
                  <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, marginBottom: 14 }}>{c.desc}</div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: c.color }}>Start here →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── WHO WE SERVE ── */}
      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "96px 28px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.blue, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 12 }}>Who We Serve</div>
          <h2 style={{ fontSize: "clamp(30px, 4vw, 52px)", fontWeight: 900, color: C.text, margin: "0 0 16px 0", lineHeight: 1.12 }}>
            Five Populations.<br />One Unified Mission.
          </h2>
          <p style={{ fontSize: 16, color: C.muted, maxWidth: 580, margin: "0 auto", lineHeight: 1.8 }}>
            We serve those who face the greatest barriers — and we meet them exactly where they are with dignity, structure, and real support.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          {POPULATIONS.map(p => <PopCard key={p.title} {...p} />)}
        </div>
      </section>

      {/* ── PROGRAMS ── */}
      <section style={{ background: C.warmWhite, padding: "80px 28px" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.gold, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 12 }}>Our Programs</div>
            <h2 style={{ fontSize: "clamp(30px, 4vw, 52px)", fontWeight: 900, color: C.text, margin: "0 0 16px 0" }}>
              A Complete Pathway to Stability
            </h2>
            <p style={{ fontSize: 16, color: C.muted, maxWidth: 560, margin: "0 auto", lineHeight: 1.8 }}>
              Housing is the foundation — but we go further. From workforce readiness to life skills to transportation, every piece connects.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {PROGRAMS.map(p => <ProgramCard key={p.title} {...p} />)}
          </div>
        </div>
      </section>

      {/* ── IMPACT ── */}
      <section style={{ background: C.navy, padding: "88px 28px" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.blueLight, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 12 }}>Why It Works</div>
            <h2 style={{ fontSize: "clamp(30px, 4vw, 52px)", fontWeight: 900, color: "#fff", margin: "0 0 16px 0" }}>
              When People Have a Home,<br />Everything Changes
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", maxWidth: 520, margin: "0 auto", lineHeight: 1.8 }}>
              Stable housing is the single most powerful intervention available. It makes everything else possible.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, marginBottom: 56 }}>
            {[
              { val: "85%", label: "of residents maintain housing stability through program completion", color: C.blueLight },
              { val: "3×", label: "more likely to gain employment with stable housing support", color: "#fbbf24" },
              { val: "70%", label: "reduction in recidivism associated with structured housing programs", color: C.blueLight },
              { val: "140", label: "online classes available through Pathways Hub OS learning platform", color: "#fbbf24" },
            ].map((s, i) => {
              const [h, setH] = useState(false);
              return (
                <div key={i} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
                  style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${h ? s.color : "rgba(255,255,255,0.08)"}`, borderRadius: 16, padding: "32px 24px", textAlign: "center", transform: h ? "translateY(-5px)" : "none", transition: "all 0.25s" }}>
                  <div style={{ fontSize: 52, fontWeight: 900, color: s.color, lineHeight: 1, marginBottom: 12 }}>{s.val}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{s.label}</div>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <a href="tel:7372558355" style={{ textDecoration: "none" }}>
              <button style={{ padding: "14px 28px", background: `linear-gradient(135deg, ${C.blue}, ${C.blueLight})`, color: "#fff", border: "none", borderRadius: 12, cursor: "pointer", fontWeight: 800, fontSize: 14, boxShadow: "0 4px 20px rgba(26,86,219,0.4)" }}>
                📞 Call HOH: 737-255-8355
              </button>
            </a>
            <a href="mailto:info@headquartersofhope.org" style={{ textDecoration: "none" }}>
              <button style={{ padding: "14px 28px", background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 12, cursor: "pointer", fontWeight: 700, fontSize: 14 }}>
                ✉️ info@headquartersofhope.org
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* ── FOUNDER SPOTLIGHT ── */}
      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "96px 28px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.blue, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 16 }}>Our Founder</div>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 900, color: C.text, margin: "0 0 20px 0", lineHeight: 1.15 }}>
              Built by Someone Who Knows What It Takes
            </h2>
            <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.85, marginBottom: 20 }}>
              Rodney E. Jones founded Headquarters of Hope Foundation to create a structured, dignified pathway for individuals who face overlapping barriers — housing instability, unemployment, lack of documentation, and disconnection from community.
            </p>
            <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.85, marginBottom: 32 }}>
              Drawing from lived experience and a commitment to systemic change, Rodney built an integrated ecosystem of nonprofit and for-profit organizations ensuring every person served has the tools, housing, transportation, and support they need to rebuild their life — permanently.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <span style={{ background: C.bluePale, color: C.blue, border: `1px solid ${C.blue}30`, padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>Founder & Executive Director</span>
              <span style={{ background: C.goldPale, color: C.gold, border: `1px solid ${C.gold}30`, padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>RE Jones Global LLC</span>
              <span style={{ background: C.bluePale, color: C.blue, border: `1px solid ${C.blue}30`, padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>Austin, Texas</span>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderTop: `3px solid ${C.gold}44`, borderRight: `3px solid ${C.gold}44`, borderRadius: "0 16px 0 0" }} />
            <img src={KEYS} alt="Headquarters of Hope" style={{ width: "100%", borderRadius: 20, boxShadow: "0 24px 64px rgba(13,31,60,0.18)" }} />
            <div style={{ position: "absolute", bottom: -20, left: -20, width: 100, height: 100, borderBottom: `3px solid ${C.blue}44`, borderLeft: `3px solid ${C.blue}44`, borderRadius: "0 0 0 16px" }} />
          </div>
        </div>
      </section>

      {/* ── CONTACT BAR ── */}
      <section style={{ background: C.warmWhite, borderTop: `1px solid ${C.border}`, padding: "40px 28px" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "flex", justifyContent: "center", alignItems: "center", gap: 48, flexWrap: "wrap" }}>
          {[
            { icon: "📞", val: "737-255-8355", label: "HOH Foundation Direct", href: "tel:7372558355" },
            { icon: "✉️", val: "info@headquartersofhope.org", label: "Email Us", href: "mailto:info@headquartersofhope.org" },
            { icon: "📍", val: "Austin, Texas", label: "Central Texas Service Area", href: "/contact" },
            { icon: "🏛️", val: "EIN: 39-3366072", label: "501(c)(3) Nonprofit", href: "/about" },
          ].map(c => (
            <a key={c.val} href={c.href} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: C.bluePale, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{c.icon}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: C.text }}>{c.val}</div>
                <div style={{ fontSize: 11, color: C.muted }}>{c.label}</div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}