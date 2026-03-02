import { NavLink } from "react-router-dom";
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
} from "react-icons/fa";

const Home = () => {
  const services = [
    {
      icon: <FaExchangeAlt size={32} />,
      title: "Money Transfer",
      desc: "Send money instantly anywhere.",
    },
    {
      icon: <FaCreditCard size={32} />,
      title: "Card Payments",
      desc: "Fast and secure transactions.",
    },
    {
      icon: <FaPiggyBank size={32} />,
      title: "Savings",
      desc: "Grow your money safely.",
    },
    {
      icon: <FaMobileAlt size={32} />,
      title: "Mobile Banking",
      desc: "Bank anytime, anywhere.",
    },
    {
      icon: <FaShieldAlt size={32} />,
      title: "Secure Banking",
      desc: "Advanced security system.",
    },
    {
      icon: <FaUniversity size={32} />,
      title: "Loans",
      desc: "Flexible loan services.",
    },
    {
      icon: <FaChartLine size={32} />,
      title: "Investment",
      desc: "Smart financial growth.",
    },
    {
      icon: <FaHeadset size={32} />,
      title: "24/7 Support",
      desc: "We are always available.",
    },
  ];

  return (
    <>
      <section className="max-w-7xl mx-auto px-6 pt-36 pb-16">
        {/* pt-36 prevents overlap with fixed header */}

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT IMAGE */}
          <div>
            <img
              src={heroImage}
              alt="Legion Bank"
              className="rounded-2xl shadow-xl w-full object-cover"
            />
          </div>

          {/* RIGHT TEXT */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Welcome to <span className="text-green-600">Legion</span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed">
              Start banking smarter with Legion — a secure and modern digital
              banking platform built to simplify transactions, manage finances
              effortlessly, and give you complete control over your money
              anytime, anywhere.
            </p>

            <NavLink
              to="/login"
              className="inline-block bg-green-600 text-white px-8 py-3
                         rounded-lg font-semibold
                         transition-all duration-400
                         hover:bg-yellow-700 hover:text-white hover:scale-105
                         shadow-md hover:shadow-xl"
            >
              Get Started
            </NavLink>
          </div>
        </div>
      </section>

      {/* ================= SECOND SECTION (SERVICES) ================= */}
      <section className="py-24 bg-white">
        {/* Title */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-800">
            Our Banking Services
          </h2>

          <div className="w-24 h-1 bg-yellow-500 mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Services Grid */}
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="
                bg-green-50
                rounded-2xl
                p-6
                text-center
                shadow-md
                hover:shadow-xl
                hover:-translate-y-2
                transition-all
                duration-300
              "
            >
              <div className="text-yellow-500 flex justify-center mb-4">
                {service.icon}
              </div>

              <h3 className="font-semibold text-lg mb-2 text-green-700">
                {service.title}
              </h3>

              <p className="text-gray-600 text-sm">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= THIRD SECTION (CBN AUTHORITY - UPGRADED) ================= */}
      <section
        className="relative bg-cover bg-center bg-fixed py-36"
        style={{ backgroundImage: `url(${cbnImage})` }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/70 to-black/80"></div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center text-white px-6 animate-fadeIn">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Fully Regulated by the
            <span className="block text-yellow-400 mt-2">
              Central Bank of Nigeria
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
            The Central Bank of Nigeria (CBN) serves as the apex financial
            regulatory authority in Nigeria, ensuring stability, transparency,
            and public confidence in the banking system.
          </p>

          <p className="mt-6 text-lg md:text-xl text-gray-300 leading-relaxed">
            <span className="font-semibold text-yellow-400">Legion Bank</span>{" "}
            operates under the supervision and regulatory framework of the CBN,
            complying with all national banking laws and financial security
            standards.
          </p>

          {/* CTA Button */}
          <div className="mt-10">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-full transition duration-300 shadow-lg hover:scale-105">
              View Regulatory Information
            </button>
          </div>
        </div>
      </section>

      {/* ================= FOURTH SECTION (PREMIUM CUSTOMER CARE) ================= */}
      <section className="relative bg-linear-to-r from-green-800 via-green-700 to-green-900 py-32 overflow-hidden">
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] bg-size-[30px_30px]"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Glass Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-white/20">
            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Need Assistance?
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-green-100 leading-relaxed">
              At{" "}
              <span className="text-yellow-400 font-semibold">Legion Bank</span>
              , our customer care team is dedicated to providing fast, reliable,
              and professional support for all your banking needs.
            </p>

            <p className="mt-6 text-lg text-green-200">
              Whether you have questions about transactions, account management,
              security, or financial services — we are ready to help you
              anytime.
            </p>

            {/* CTA Button */}
            <div className="mt-10">
              <NavLink
                to="/customer-care"
                className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-10 py-4 rounded-full transition duration-300 shadow-lg hover:scale-110"
              >
                Talk To Us
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
