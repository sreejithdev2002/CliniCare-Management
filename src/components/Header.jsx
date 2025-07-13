import { Link } from "react-router-dom";
import { useState } from "react";
import AvatarImage from "../assets/avatarImage.jpg";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { ThemeToggle } from "./ThemeToggle";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className="border-b border-gray-200 dark:border-gray-700 shadow-xs bg-white dark:bg-gray-800 text-black dark:text-white">
      <div className="flex items-center justify-between px-6 lg:px-20 py-3">
        <h1 className="robotoFont text-2xl lg:text-3xl">CliniCare</h1>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-5">
          <Link
            to="/dashboard"
            className="hover:bg-[#e5ffeb] dark:hover:bg-green-800 text-black dark:text-gray-100 px-3 py-1 rounded-sm transition-colors duration-300"
          >
            Dashboard
          </Link>
          <Link
            to="/appointments"
            className="hover:bg-[#e5ffeb] dark:hover:bg-green-800 text-black dark:text-gray-100 px-3 py-1 rounded-sm transition-colors duration-300"
          >
            Appointments
          </Link>
          <Link
            to="#"
            className="hover:bg-[#e5ffeb] dark:hover:bg-green-800 text-black dark:text-gray-100 px-3 py-1 rounded-sm transition-colors duration-300"
          >
            Patients
          </Link>
          <Link
            to="#"
            className="hover:bg-[#e5ffeb] dark:hover:bg-green-800 text-black dark:text-gray-100 px-3 py-1 rounded-sm transition-colors duration-300"
          >
            Reports
          </Link>
          <Link
            to="#"
            className="hover:bg-[#e5ffeb] dark:hover:bg-green-800 text-black dark:text-gray-100 px-3 py-1 rounded-sm transition-colors duration-300"
          >
            Billing
          </Link>
        </nav>

        {/* Right side icons */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <button className="bg-[#d6ffdf] dark:bg-green-600 rounded-lg h-10 w-10 flex items-center justify-center text-gray-700 dark:text-white shadow-xs">
            <NotificationsOutlinedIcon />
          </button>
          <img
            src={AvatarImage}
            alt="User"
            className="h-10 w-10 rounded-full object-cover shadow-xs"
          />

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-gray-700 dark:text-green-600 ml-2 p-2 rounded-md cursor-pointer hover:bg-[#d6ffdf] dark:hover:bg-green-100 transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="lg:hidden px-6 pb-4 space-y-2">
          <Link
            to="/dashboard"
            className="block hover:bg-[#e5ffeb] dark:hover:bg-green-800 text-black dark:text-gray-100 px-3 py-2 rounded-sm"
            onClick={toggleMenu}
          >
            Dashboard
          </Link>
          <Link
            to="/appointments"
            className="block hover:bg-[#e5ffeb] dark:hover:bg-green-800 text-black dark:text-gray-100 px-3 py-2 rounded-sm"
            onClick={toggleMenu}
          >
            Appointments
          </Link>
          <Link
            to="/patients"
            className="block hover:bg-[#e5ffeb] dark:hover:bg-green-800 text-black dark:text-gray-100 px-3 py-2 rounded-sm"
            onClick={toggleMenu}
          >
            Patients
          </Link>
          <Link
            to="#"
            className="block hover:bg-[#e5ffeb] dark:hover:bg-green-800 text-black dark:text-gray-100 px-3 py-2 rounded-sm"
            onClick={toggleMenu}
          >
            Reports
          </Link>
          <Link
            to="#"
            className="block hover:bg-[#e5ffeb] dark:hover:bg-green-800 text-black dark:text-gray-100 px-3 py-2 rounded-sm"
            onClick={toggleMenu}
          >
            Billing
          </Link>
        </nav>
      )}
    </header>
  );
}

export default Header;
