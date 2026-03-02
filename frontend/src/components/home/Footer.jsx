import { NavLink } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
        {/* Column 1 - About */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-yellow-400">
            Legion Bank
          </h3>
          <p className="text-green-200 leading-relaxed">
            A secure and trusted financial institution operating under
            regulatory standards to ensure safe, reliable, and innovative
            banking services for all customers.
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-yellow-400">
            Quick Links
          </h3>
          <ul className="space-y-3 text-green-200">
            <li>
              <NavLink to="/" className="hover:text-yellow-400 transition">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="hover:text-yellow-400 transition">
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/services"
                className="hover:text-yellow-400 transition"
              >
                Services
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/customer-care"
                className="hover:text-yellow-400 transition"
              >
                Customer Care
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Column 3 - Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-yellow-400">
            Contact Us
          </h3>
          <ul className="space-y-4 text-green-200">
            <li className="flex items-center gap-3">
              <FaPhoneAlt />
              +234 800 000 0000
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope />
              support@legionbank.com
            </li>
            <li className="flex items-center gap-3">
              <FaMapMarkerAlt />
              Abuja, Nigeria
            </li>
          </ul>
        </div>

        {/* Column 4 - Social */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-yellow-400">
            Follow Us
          </h3>
          <div className="flex gap-4">
            <a
              href="#"
              className="bg-green-700 p-3 rounded-full hover:bg-yellow-400 hover:text-black transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="bg-green-700 p-3 rounded-full hover:bg-yellow-400 hover:text-black transition"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="bg-green-700 p-3 rounded-full hover:bg-yellow-400 hover:text-black transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="bg-green-700 p-3 rounded-full hover:bg-yellow-400 hover:text-black transition"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-700 mt-12 pt-6 text-center text-green-300 text-sm">
        © {new Date().getFullYear()} Legion Bank. All Rights Reserved.
      </div>
    </footer>
  );
}
