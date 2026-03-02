import { NavLink } from "react-router-dom";
import heroImage from "../../assets/images/bank1.jpg";
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
    </>
  );
};

export default Home;
