import { Link } from "react-router-dom";
import { useState } from "react";
import AvatarImage from "../assets/avatarImage.jpg";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className="border-b border-gray-200 shadow-xs bg-white">
      <div className="flex items-center justify-between px-6 lg:px-20 py-3">
        <h1 className="robotoFont text-2xl lg:text-3xl">CliniCare</h1>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-5">
          <Link
            to="/dashboard"
            className="hover:bg-[#e5ffeb] px-3 py-1 rounded-sm"
          >
            Dashboard
          </Link>
          <Link
            to="/appointments"
            className="hover:bg-[#e5ffeb] px-3 py-1 rounded-sm"
          >
            Appointments
          </Link>
          <Link
            to="/patients"
            className="hover:bg-[#e5ffeb] px-3 py-1 rounded-sm"
          >
            Patients
          </Link>
          <Link to="#" className="hover:bg-[#e5ffeb] px-3 py-1 rounded-sm">
            Reports
          </Link>
          <Link to="#" className="hover:bg-[#e5ffeb] px-3 py-1 rounded-sm">
            Billing
          </Link>
        </nav>

        {/* Right side icons */}
        <div className="flex items-center space-x-4">
          <button className="bg-[#d6ffdf] rounded-lg h-10 w-10 flex items-center justify-center text-gray-700 shadow-xs">
            <NotificationsOutlinedIcon />
          </button>
          <img
            src={AvatarImage}
            alt="User"
            className="h-8 w-8 rounded-full object-cover shadow-xs"
          />

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-gray-700 ml-2 p-2 rounded-md cursor-pointer hover:bg-[#d6ffdf] transition-colors duration-300"
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
            className="block hover:bg-[#e5ffeb] px-3 py-2 rounded-sm"
            onClick={toggleMenu}
          >
            Dashboard
          </Link>
          <Link
            to="/appointments"
            className="block hover:bg-[#e5ffeb] px-3 py-2 rounded-sm"
            onClick={toggleMenu}
          >
            Appointments
          </Link>
          <Link
            to="/patients"
            className="block hover:bg-[#e5ffeb] px-3 py-2 rounded-sm"
            onClick={toggleMenu}
          >
            Patients
          </Link>
          <Link
            to="#"
            className="block hover:bg-[#e5ffeb] px-3 py-2 rounded-sm"
            onClick={toggleMenu}
          >
            Reports
          </Link>
          <Link
            to="#"
            className="block hover:bg-[#e5ffeb] px-3 py-2 rounded-sm"
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
