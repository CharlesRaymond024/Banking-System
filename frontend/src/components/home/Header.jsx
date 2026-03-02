import { NavLink } from "react-router-dom";
import logo from "../../assets/images/bank-logo.png";


const Header = () => {
  const linkClass = ({ isActive }) =>
    `relative pb-1 transition duration-300
     ${isActive ? "text-green-100" : "text-white hover:text-green-200"}
     
     after:content-['']
     after:absolute
     after:left-0
     after:bottom-0
     after:h-[2px]
     after:bg-white
     after:transition-all
     after:duration-300
     ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}
    `;

  return (
    <header
      className="fixed top-4 left-1/2 -translate-x-1/2 
                   w-[95%] z-50 
                   bg-green-600 shadow-lg rounded-2xl"
    >
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3">
          <img src={logo} alt="Legion Bank Logo" className="h-10 w-auto" />
          <h2 className="uppercase text-white font-semibold tracking-wide">
            Legion Bank
          </h2>
        </NavLink>

        {/* Navigation */}
        <nav>
          <ul className="flex items-center space-x-10 text-lg font-medium">
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

            {/* ✅ GOLD LOGIN BUTTON */}
            <li>
              <NavLink
                to="/login"
                className="bg-yellow-500 text-green-900 px-6 py-2 rounded-lg font-semibold
                           transition-all duration-400
                           hover:bg-yellow-400 hover:scale-105
                           shadow-md hover:shadow-lg"
              >
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
