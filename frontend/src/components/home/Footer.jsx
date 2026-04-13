import { NavLink } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";

export default function Footer() {
  const linkClass =
    "text-slate-500 hover:text-emerald-400 transition-colors duration-200 text-sm";

  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #080d18 0%, #060a13 100%)",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Top rule accent */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(16,185,129,0.4), rgba(245,158,11,0.2), transparent)",
        }}
      />

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Column 1 — Brand */}
        <div className="space-y-5">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs shadow"
              style={{
                background: "linear-gradient(135deg, #10b981, #059669)",
                color: "#fff",
              }}
            >
              LB
            </div>
            <span className="text-white font-black text-base tracking-tight">
              Legion <span style={{ color: "#10b981" }}>Bank</span>
            </span>
          </div>

          <p className="text-slate-500 text-sm leading-relaxed">
            A secure and trusted financial institution operating under
            regulatory standards to deliver safe, reliable, and innovative
            banking services for every Nigerian.
          </p>

          {/* CBN badge */}
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium"
            style={{
              background: "rgba(16,185,129,0.07)",
              borderColor: "rgba(16,185,129,0.2)",
              color: "#10b981",
            }}
          >
            <MdVerified size={12} />
            CBN Licensed Institution
          </div>
        </div>

        {/* Column 2 — Quick Links */}
        <div>
          <h3 className="text-xs uppercase tracking-widest text-slate-600 font-semibold mb-5">
            Quick Links
          </h3>
          <ul className="space-y-3">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About Us" },
              { to: "/services", label: "Services" },
              { to: "/customer-care", label: "Customer Care" },
            ].map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 text-sm transition-colors duration-200 group ${
                      isActive
                        ? "text-emerald-400"
                        : "text-slate-500 hover:text-slate-300"
                    }`
                  }
                >
                  <FaArrowRight
                    size={9}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ color: "#10b981" }}
                  />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Contact */}
        <div>
          <h3 className="text-xs uppercase tracking-widest text-slate-600 font-semibold mb-5">
            Contact Us
          </h3>
          <ul className="space-y-4">
            {[
              {
                icon: <FaPhoneAlt size={12} />,
                text: "+234 800 000 0000",
                color: "#10b981",
              },
              {
                icon: <FaEnvelope size={12} />,
                text: "support@legionbank.com",
                color: "#38bdf8",
              },
              {
                icon: <FaMapMarkerAlt size={12} />,
                text: "Abuja, Nigeria",
                color: "#f59e0b",
              },
            ].map(({ icon, text, color }) => (
              <li key={text} className="flex items-center gap-3">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border"
                  style={{
                    background: `${color}11`,
                    borderColor: `${color}22`,
                    color,
                  }}
                >
                  {icon}
                </div>
                <span className="text-sm text-slate-500">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 — Social */}
        <div>
          <h3 className="text-xs uppercase tracking-widest text-slate-600 font-semibold mb-5">
            Follow Us
          </h3>
          <div className="flex gap-3 flex-wrap">
            {[
              {
                icon: <FaFacebookF size={14} />,
                label: "Facebook",
                color: "#60a5fa",
              },
              {
                icon: <FaTwitter size={14} />,
                label: "Twitter",
                color: "#38bdf8",
              },
              {
                icon: <FaInstagram size={14} />,
                label: "Instagram",
                color: "#f472b6",
              },
              {
                icon: <FaLinkedinIn size={14} />,
                label: "LinkedIn",
                color: "#10b981",
              },
            ].map(({ icon, label, color }) => (
              <a
                key={label}
                href="#"
                title={label}
                className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                style={{
                  background: `${color}11`,
                  borderColor: `${color}22`,
                  color,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${color}22`;
                  e.currentTarget.style.borderColor = `${color}44`;
                  e.currentTarget.style.boxShadow = `0 4px 16px ${color}22`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `${color}11`;
                  e.currentTarget.style.borderColor = `${color}22`;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Newsletter micro-CTA */}
          <div className="mt-7">
            <p className="text-xs text-slate-600 mb-3 uppercase tracking-wider">
              Stay updated
            </p>
            <div
              className="flex rounded-xl overflow-hidden border"
              style={{ borderColor: "rgba(255,255,255,0.07)" }}
            >
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-transparent px-3 py-2.5 text-xs text-slate-400 placeholder-slate-700 outline-none"
              />
              <button
                className="px-3 py-2.5 text-xs font-bold shrink-0 transition-all duration-200 hover:brightness-110"
                style={{
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  color: "#fff",
                }}
              >
                <FaArrowRight size={11} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="h-px"
          style={{ background: "rgba(255,255,255,0.05)" }}
        />
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-slate-700">
          © {new Date().getFullYear()} Legion Bank · All Rights Reserved
        </p>
        <div className="flex items-center gap-4">
          {["Privacy Policy", "Terms of Service", "Security"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-xs text-slate-700 hover:text-slate-500 transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
