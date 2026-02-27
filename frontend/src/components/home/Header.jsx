import { NavLink } from "react-router-dom";


const Header = () => {
  // Tailwind classes for active/inactive links
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-green-200 font-semibold transition-colors duration-300"
      : "text-white hover:text-green-200 transition-colors duration-300";

  return (
    <header className="bg-green-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/">
          <img src={logo} alt="Bank Logo" className="h-10 w-auto" />
        </NavLink>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-8 text-lg font-medium">
            <li>
              <NavLink to="/" className={linkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={linkClass}>
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={linkClass}>
                Contact Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
