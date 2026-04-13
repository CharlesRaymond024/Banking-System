import { NavLink } from "react-router-dom";
import { useEffect, useRef } from "react";
import heroImage from "../../assets/images/bank1.jpg";
import cbnImage from "../../assets/images/C.B.N.jpg";
import {
  FaExchangeAlt,
  FaCreditCard,
  FaPiggyBank,
  FaMobileAlt,
  FaShieldAlt,
  FaUniversity,
  FaChartLine,
  FaHeadset,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import { MdSecurity, MdVerified } from "react-icons/md";

/* ─── Scroll-reveal hook ───────────────────────────────────────────────────── */
const useReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.dataset.delay || "0";
            setTimeout(() => {
              el.classList.add("revealed");
            }, Number(delay));
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

/* ─── Services data ────────────────────────────────────────────────────────── */
const services = [
  {
    icon: <FaExchangeAlt size={24} />,
    title: "Money Transfer",
    desc: "Send money instantly to any bank account nationwide.",
    color: "#10b981",
    bg: "rgba(16,185,129,0.1)",
    border: "rgba(16,185,129,0.2)",
  },
  {
    icon: <FaCreditCard size={24} />,
    title: "Card Payments",
    desc: "Fast, contactless and secure card transactions.",
    color: "#38bdf8",
    bg: "rgba(56,189,248,0.1)",
    border: "rgba(56,189,248,0.2)",
  },
  {
    icon: <FaPiggyBank size={24} />,
    title: "Savings",
    desc: "Grow your money with competitive interest rates.",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.2)",
  },
  {
    icon: <FaMobileAlt size={24} />,
    title: "Mobile Banking",
    desc: "Full banking power in your pocket, anytime.",
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.1)",
    border: "rgba(167,139,250,0.2)",
  },
  {
    icon: <FaShieldAlt size={24} />,
    title: "Secure Banking",
    desc: "Military-grade encryption protecting every naira.",
    color: "#fb923c",
    bg: "rgba(251,146,60,0.1)",
    border: "rgba(251,146,60,0.2)",
  },
  {
    icon: <FaUniversity size={24} />,
    title: "Loans",
    desc: "Flexible loan plans tailored to your needs.",
    color: "#34d399",
    bg: "rgba(52,211,153,0.1)",
    border: "rgba(52,211,153,0.2)",
  },
  {
    icon: <FaChartLine size={24} />,
    title: "Investment",
    desc: "Smart portfolio tools for financial growth.",
    color: "#f472b6",
    bg: "rgba(244,114,182,0.1)",
    border: "rgba(244,114,182,0.2)",
  },
  {
    icon: <FaHeadset size={24} />,
    title: "24/7 Support",
    desc: "Expert help around the clock, every day.",
    color: "#60a5fa",
    bg: "rgba(96,165,250,0.1)",
    border: "rgba(96,165,250,0.2)",
  },
];

const trustPoints = [
  "Licensed & regulated by the Central Bank of Nigeria",
  "256-bit SSL encryption on all transactions",
  "NDIC-insured deposits up to ₦5,000,000",
  "Zero-fraud guarantee on all card transactions",
];

/* ─── Component ────────────────────────────────────────────────────────────── */
const Home = () => {
  useReveal();

  return (
    <>
      <style>{`
        /* Reveal base states */
        [data-reveal] {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.75s cubic-bezier(.16,1,.3,1),
                      transform 0.75s cubic-bezier(.16,1,.3,1);
        }
        [data-reveal="left"]  { transform: translateX(-50px); }
        [data-reveal="right"] { transform: translateX(50px); }
        [data-reveal="scale"] { transform: scale(0.88); }
        [data-reveal="fade"]  { transform: none; }

        .revealed {
          opacity: 1 !important;
          transform: none !important;
        }

        /* Floating hero animation */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
        .hero-float { animation: float 6s ease-in-out infinite; }

        /* Gradient text */
        .gradient-text {
          background: linear-gradient(135deg, #10b981 0%, #34d399 50%, #6ee7b7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Shimmer on CTA */
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .cta-btn {
          background: linear-gradient(90deg, #10b981 0%, #34d399 40%, #10b981 80%, #059669 100%);
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }
        .cta-btn:hover { background-size: 200% auto; filter: brightness(1.1); }

        /* Particle dots in hero */
        @keyframes drift {
          0%, 100% { transform: translate(0,0) scale(1); opacity: 0.4; }
          33%       { transform: translate(15px,-20px) scale(1.2); opacity: 0.7; }
          66%       { transform: translate(-10px,10px) scale(0.9); opacity: 0.3; }
        }
        .dot1 { animation: drift 8s ease-in-out infinite; }
        .dot2 { animation: drift 11s ease-in-out infinite reverse; }
        .dot3 { animation: drift 14s ease-in-out infinite 2s; }

        /* Stat counter pulse */
        @keyframes pulse-slow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.3); }
          50%       { box-shadow: 0 0 0 12px rgba(16,185,129,0); }
        }
        .stat-pulse { animation: pulse-slow 3s ease-in-out infinite; }
      `}</style>

      {/* ═══════════════════════════════════════════════════════════════
           SECTION 1 — HERO
      ═══════════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #060d18 0%, #0b1220 40%, #071a12 100%)",
          fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        }}
      >
        {/* Background grid lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(16,185,129,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16,185,129,1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Ambient glows */}
        <div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-20 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)",
          }}
        />

        {/* Floating particles */}
        <div
          className="dot1 absolute top-1/4 left-[10%] w-2 h-2 rounded-full"
          style={{ background: "#10b981" }}
        />
        <div
          className="dot2 absolute top-1/3 right-[15%] w-1.5 h-1.5 rounded-full"
          style={{ background: "#38bdf8" }}
        />
        <div
          className="dot3 absolute bottom-1/3 left-[20%] w-1 h-1 rounded-full"
          style={{ background: "#f59e0b" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 grid md:grid-cols-2 gap-14 items-center w-full">
          {/* LEFT — Text */}
          <div className="space-y-7">
            {/* Badge */}
            <div data-reveal="fade" className="flex items-center gap-2 w-fit">
              <div
                className="flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold"
                style={{
                  background: "rgba(16,185,129,0.1)",
                  borderColor: "rgba(16,185,129,0.3)",
                  color: "#10b981",
                }}
              >
                <MdVerified size={13} />
                CBN Licensed & Regulated
              </div>
            </div>

            {/* Headline */}
            <div data-reveal data-delay="100">
              <h1 className="text-5xl md:text-6xl font-black leading-[1.08] tracking-tight text-white">
                Banking Built
                <br />
                for <span className="gradient-text">Modern</span>
                <br />
                Nigeria
              </h1>
            </div>

            <p
              data-reveal
              data-delay="200"
              className="text-slate-400 text-lg leading-relaxed max-w-md"
            >
              Legion Bank gives you a secure, intelligent digital banking
              platform — manage your money, send transfers, and grow your
              savings with zero friction.
            </p>

            {/* CTAs */}
            <div
              data-reveal
              data-delay="300"
              className="flex flex-wrap gap-4 items-center"
            >
              <NavLink
                to="/login"
                className="cta-btn inline-flex items-center gap-2 text-white font-bold px-7 py-3.5 rounded-xl shadow-xl shadow-emerald-900/40 transition-all duration-200 hover:scale-105 text-sm"
              >
                Get Started <FaArrowRight size={13} />
              </NavLink>
              <NavLink
                to="/about"
                className="inline-flex items-center gap-2 text-slate-400 hover:text-white border border-slate-700/60 hover:border-slate-500 px-7 py-3.5 rounded-xl transition-all duration-200 text-sm font-medium"
              >
                Learn More
              </NavLink>
            </div>

            {/* Trust badges */}
            <div
              data-reveal
              data-delay="400"
              className="flex flex-wrap gap-5 pt-2"
            >
              {["2M+ Customers", "₦500B+ Processed", "99.9% Uptime"].map(
                (t) => (
                  <div
                    key={t}
                    className="flex items-center gap-1.5 text-xs text-slate-500"
                  >
                    <FaCheckCircle size={11} className="text-emerald-500" />
                    {t}
                  </div>
                ),
              )}
            </div>
          </div>

          {/* RIGHT — Hero image */}
          <div data-reveal="right" data-delay="200" className="relative">
            {/* Glow ring */}
            <div
              className="absolute inset-4 rounded-3xl pointer-events-none"
              style={{
                boxShadow:
                  "0 0 80px rgba(16,185,129,0.15), 0 0 40px rgba(16,185,129,0.08)",
              }}
            />

            <div
              className="hero-float relative rounded-3xl overflow-hidden border"
              style={{ borderColor: "rgba(16,185,129,0.2)" }}
            >
              <img
                src={heroImage}
                alt="Legion Bank"
                className="w-full object-cover"
                style={{ maxHeight: "520px" }}
              />
              {/* Image overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(6,13,24,0.5) 0%, transparent 50%)",
                }}
              />
            </div>

            {/* Floating stat card */}
            <div
              data-reveal="scale"
              data-delay="500"
              className="absolute -bottom-6 -left-6 rounded-2xl px-5 py-4 border stat-pulse shadow-2xl"
              style={{
                background: "linear-gradient(135deg, #0d2318, #0b1a14)",
                borderColor: "rgba(16,185,129,0.25)",
                minWidth: "160px",
              }}
            >
              <p className="text-[10px] uppercase tracking-widest text-slate-600 mb-1">
                Daily Volume
              </p>
              <p className="text-2xl font-black text-white">₦12.4B</p>
              <p className="text-xs text-emerald-400 mt-0.5 flex items-center gap-1">
                <FaChartLine size={10} /> +8.2% today
              </p>
            </div>

            {/* Security badge */}
            <div
              data-reveal="scale"
              data-delay="600"
              className="absolute -top-4 -right-4 rounded-2xl px-4 py-3 border shadow-xl"
              style={{
                background: "linear-gradient(135deg, #0d1a25, #0b0f1a)",
                borderColor: "rgba(56,189,248,0.25)",
              }}
            >
              <div className="flex items-center gap-2">
                <MdSecurity size={18} className="text-sky-400" />
                <div>
                  <p className="text-[10px] text-slate-600">Security</p>
                  <p className="text-xs font-bold text-sky-400">256-bit SSL</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[10px] uppercase tracking-widest text-slate-600">
            Scroll
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-emerald-500/60 to-transparent" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
           SECTION 2 — SERVICES
      ═══════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-28 overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #0b1220 0%, #080d18 100%)",
        }}
      >
        {/* Decorative */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(16,185,129,0.3), transparent)",
          }}
        />

        <div className="max-w-7xl mx-auto px-6">
          {/* Section header */}
          <div data-reveal="fade" className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-emerald-500 font-semibold mb-3">
              What We Offer
            </p>
            <h2
              className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4"
              style={{ letterSpacing: "-0.02em" }}
            >
              Banking Services
              <br />
              <span className="gradient-text">Built for You</span>
            </h2>
            <p className="text-slate-500 max-w-md mx-auto text-base leading-relaxed">
              Everything you need to take control of your financial life — under
              one roof.
            </p>
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s, i) => (
              <div
                key={i}
                data-reveal
                data-delay={String(i * 60)}
                className="group rounded-2xl p-6 border cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, #111827 0%, #0d1220 100%)",
                  borderColor: "rgba(255,255,255,0.06)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = s.border;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 border transition-all duration-300"
                  style={{
                    background: s.bg,
                    borderColor: s.border,
                    color: s.color,
                  }}
                >
                  {s.icon}
                </div>

                <h3 className="text-sm font-bold text-slate-200 mb-2 group-hover:text-white transition-colors">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed group-hover:text-slate-500 transition-colors">
                  {s.desc}
                </p>

                {/* Arrow reveal on hover */}
                <div
                  className="mt-4 flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-1 group-hover:translate-x-0"
                  style={{ color: s.color }}
                >
                  Learn more <FaArrowRight size={9} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
           SECTION 3 — CBN AUTHORITY
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-36 overflow-hidden">
        {/* Full-bleed bg image with overlay */}
        <div className="absolute inset-0">
          <img
            src={cbnImage}
            alt="CBN"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(6,13,24,0.93) 0%, rgba(6,13,24,0.82) 50%, rgba(7,26,18,0.93) 100%)",
            }}
          />
        </div>

        {/* Horizontal rule top */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(245,158,11,0.4), transparent)",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div data-reveal="fade">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold mb-8"
              style={{
                background: "rgba(245,158,11,0.1)",
                borderColor: "rgba(245,158,11,0.3)",
                color: "#f59e0b",
              }}
            >
              <MdVerified size={13} /> Fully Licensed Institution
            </div>
          </div>

          <h2
            data-reveal
            data-delay="100"
            className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            Regulated by the
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #f59e0b, #fcd34d)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Central Bank of Nigeria
            </span>
          </h2>

          <p
            data-reveal
            data-delay="200"
            className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto mb-6"
          >
            The CBN serves as Nigeria's apex financial regulatory authority —
            ensuring stability, transparency, and public confidence across the
            banking system.
          </p>

          <p
            data-reveal
            data-delay="280"
            className="text-slate-400 text-base leading-relaxed max-w-2xl mx-auto"
          >
            <span className="font-bold text-amber-400">Legion Bank</span>{" "}
            operates fully under the CBN's supervisory framework, complying with
            all national banking laws and financial security standards.
          </p>

          {/* Trust points */}
          <div
            data-reveal
            data-delay="350"
            className="grid sm:grid-cols-2 gap-3 max-w-xl mx-auto mt-10 text-left"
          >
            {trustPoints.map((pt, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 px-4 py-3 rounded-xl border"
                style={{
                  background: "rgba(245,158,11,0.05)",
                  borderColor: "rgba(245,158,11,0.15)",
                }}
              >
                <FaCheckCircle
                  size={13}
                  className="text-amber-400 shrink-0 mt-0.5"
                />
                <span className="text-xs text-slate-400 leading-relaxed">
                  {pt}
                </span>
              </div>
            ))}
          </div>

          <div data-reveal data-delay="420" className="mt-12">
            <button
              className="inline-flex items-center gap-2 font-bold px-8 py-3.5 rounded-xl transition-all duration-200 hover:scale-105 shadow-xl text-sm"
              style={{
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
                color: "#000",
                boxShadow: "0 8px 32px rgba(245,158,11,0.3)",
              }}
            >
              View Regulatory Information <FaArrowRight size={12} />
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
           SECTION 4 — CUSTOMER CARE
      ═══════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-32 overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #071a12 0%, #060d18 50%, #071a12 100%)",
        }}
      >
        {/* Dot pattern overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(16,185,129,1) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-[600px] h-[400px] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse, rgba(16,185,129,0.07) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Top rule */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(16,185,129,0.3), transparent)",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div data-reveal="scale">
            <div
              className="rounded-3xl p-12 md:p-16 border relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(16,185,129,0.06) 0%, rgba(11,15,26,0.8) 50%, rgba(56,189,248,0.04) 100%)",
                borderColor: "rgba(16,185,129,0.2)",
                boxShadow:
                  "0 0 80px rgba(16,185,129,0.06), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              {/* Decorative corner accents */}
              <div
                className="absolute top-0 left-0 w-16 h-16 border-t border-l rounded-tl-3xl pointer-events-none"
                style={{ borderColor: "rgba(16,185,129,0.4)" }}
              />
              <div
                className="absolute bottom-0 right-0 w-16 h-16 border-b border-r rounded-br-3xl pointer-events-none"
                style={{ borderColor: "rgba(16,185,129,0.4)" }}
              />

              {/* Icon */}
              <div
                data-reveal="scale"
                data-delay="150"
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 border"
                style={{
                  background: "rgba(16,185,129,0.12)",
                  borderColor: "rgba(16,185,129,0.3)",
                }}
              >
                <FaHeadset size={28} className="text-emerald-400" />
              </div>

              <div data-reveal data-delay="200">
                <p className="text-xs uppercase tracking-widest text-emerald-500 font-semibold mb-3">
                  Support
                </p>
                <h2
                  className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  We're Here
                  <br />
                  <span className="gradient-text">When You Need Us</span>
                </h2>
              </div>

              <p
                data-reveal
                data-delay="280"
                className="text-slate-400 text-base leading-relaxed max-w-lg mx-auto"
              >
                At{" "}
                <span className="text-amber-400 font-semibold">
                  Legion Bank
                </span>
                , our support team is dedicated to fast, reliable, professional
                help for every banking need — 24 hours a day, 7 days a week.
              </p>

              <p
                data-reveal
                data-delay="340"
                className="text-slate-500 text-sm mt-4 leading-relaxed max-w-md mx-auto"
              >
                Transactions, account management, security concerns, or
                financial advice — our team is always ready to assist.
              </p>

              {/* Contact badges */}
              <div
                data-reveal
                data-delay="400"
                className="flex flex-wrap justify-center gap-3 mt-8"
              >
                {[
                  "Live Chat",
                  "Phone Support",
                  "Email Support",
                  "In-App Help",
                ].map((ch) => (
                  <div
                    key={ch}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-medium text-slate-400"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      borderColor: "rgba(255,255,255,0.08)",
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {ch}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div data-reveal data-delay="460" className="mt-10">
                <NavLink
                  to="/customer-care"
                  className="inline-flex items-center gap-2 text-black font-bold px-10 py-4 rounded-xl transition-all duration-200 hover:scale-105 shadow-2xl text-sm"
                  style={{
                    background: "linear-gradient(135deg, #10b981, #059669)",
                    boxShadow: "0 8px 40px rgba(16,185,129,0.35)",
                  }}
                >
                  Talk To Us <FaArrowRight size={12} />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
