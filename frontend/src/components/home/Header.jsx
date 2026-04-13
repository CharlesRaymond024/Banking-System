import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../assets/images/bank-logo.png";
import { FaBars, FaTimes, FaArrowRight } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  const closeMenu = () => setMenuOpen(false);

  const linkClass = ({ isActive }) =>
    `relative text-sm font-medium pb-0.5 transition-all duration-200
     after:content-[''] after:absolute after:left-0 after:bottom-0
     after:h-[1.5px] after:bg-emerald-400 after:transition-all after:duration-300
     ${
       isActive
         ? "text-emerald-400 after:w-full"
         : "text-slate-400 hover:text-slate-200 after:w-0 hover:after:w-full"
     }`;

  const mobileLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
        : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
    }`;

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .menu-slide { animation: slideDown 0.22s cubic-bezier(.16,1,.3,1) forwards; }
      `}</style>

      <header
        className="fixed top-3 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 transition-all duration-300"
        style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
      >
        {/* Main bar */}
        <div
          className="rounded-2xl px-5 md:px-8 py-3.5 flex justify-between items-center transition-all duration-300"
          style={{
            background: scrolled
              ? "rgba(10,14,22,0.95)"
              : "rgba(10,14,22,0.85)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: scrolled
              ? "0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(16,185,129,0.08)"
              : "0 4px 24px rgba(0,0,0,0.3)",
          }}
        >
          {/* Logo */}
          <NavLink
            to="/"
            className="flex items-center gap-2.5"
            onClick={closeMenu}
          >
            <img src={logo} alt="Legion Bank Logo" className="h-8 w-auto" />
            <div className="flex flex-col leading-none">
              <span className="text-white font-black text-sm tracking-tight">
                Legion <span style={{ color: "#10b981" }}>Bank</span>
              </span>
              <div className="flex items-center gap-1 mt-0.5">
                <MdVerified size={9} style={{ color: "#10b981" }} />
                <span className="text-[9px] text-slate-600 uppercase tracking-wider">
                  CBN Licensed
                </span>
              </div>
            </div>
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/" end className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/about" className={linkClass}>
              About Us
            </NavLink>
            <NavLink to="/contact" className={linkClass}>
              Contact
            </NavLink>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <NavLink
              to="/login"
              className="inline-flex items-center gap-1.5 text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-200 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #10b981, #059669)",
                color: "#fff",
                boxShadow: "0 4px 16px rgba(16,185,129,0.3)",
              }}
            >
              Login <FaArrowRight size={11} />
            </NavLink>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl border border-slate-700/60 bg-slate-800/40 hover:bg-slate-700/50 transition-all duration-200"
          >
            {menuOpen ? (
              <FaTimes size={15} className="text-slate-300" />
            ) : (
              <FaBars size={15} className="text-slate-300" />
            )}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div
            className="menu-slide md:hidden mt-2 rounded-2xl overflow-hidden"
            style={{
              background: "rgba(10,14,22,0.97)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 12px 48px rgba(0,0,0,0.6)",
            }}
          >
            <div className="p-3 flex flex-col gap-1">
              <NavLink
                to="/"
                end
                className={mobileLinkClass}
                onClick={closeMenu}
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={mobileLinkClass}
                onClick={closeMenu}
              >
                About Us
              </NavLink>
              <NavLink
                to="/contact"
                className={mobileLinkClass}
                onClick={closeMenu}
              >
                Contact
              </NavLink>

              <div
                className="h-px my-2"
                style={{ background: "rgba(255,255,255,0.06)" }}
              />

              <NavLink
                to="/login"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 hover:brightness-110"
                style={{
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  color: "#fff",
                  boxShadow: "0 4px 20px rgba(16,185,129,0.25)",
                }}
              >
                Login to Your Account <FaArrowRight size={11} />
              </NavLink>
            </div>

            {/* Footer strip inside dropdown */}
            <div
              className="px-5 py-3 border-t flex items-center gap-1.5"
              style={{ borderColor: "rgba(255,255,255,0.05)" }}
            >
              <MdVerified size={11} style={{ color: "#10b981" }} />
              <span className="text-[10px] text-slate-700 uppercase tracking-widest">
                CBN Licensed & Regulated
              </span>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
