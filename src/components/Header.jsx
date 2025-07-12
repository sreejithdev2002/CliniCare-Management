import { Link } from "react-router-dom";
import AvatarImage from "../assets/avatarImage.jpg";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

function Header() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between px-20 py-2 border-b border-gray-200 shadow-xs">
      <h1 className="robotoFont text-3xl">CliniCare</h1>
      <div className="flex flex-col lg:flex-row items-center space-x-5 space-y-0">
        <ul className="flex items-center">
          <Link
            to="/dashboard"
            className="hover:bg-[#e5ffeb] cursor-pointer text-sm lg:text-base px-2 lg:px-3 py-1 rounded-sm transition-all duration-300"
          >
            Dashboard
          </Link>
          <Link
            to="/appointments"
            className="hover:bg-[#e5ffeb] cursor-pointer text-sm lg:text-base px-2 lg:px-3 py-1 rounded-sm transition-all duration-300"
          >
            Appointments
          </Link>
          <Link
            to="/patients"
            className="hover:bg-[#e5ffeb] cursor-pointer text-sm lg:text-base px-2 lg:px-3 py-1 rounded-sm transition-all duration-300"
          >
            Patients
          </Link>
          <Link
            to="#"
            className="hover:bg-[#e5ffeb] cursor-pointer text-sm lg:text-base px-2 lg:px-3 py-1 rounded-sm transition-all duration-300"
          >
            Reports
          </Link>
          <Link
            to="#"
            className="hover:bg-[#e5ffeb] cursor-pointer text-sm lg:text-base px-2 lg:px-3 py-1 rounded-sm transition-all duration-300"
          >
            Billing
          </Link>
        </ul>
        <div className="flex items-center space-x-5 self-end mt-2 lg:mt-0">
          <button className="bg-[#d6ffdf] rounded-lg text-center h-10 w-10 text-gray-700 cursor-pointer shadow-xs">
            <NotificationsOutlinedIcon />
          </button>
          <img
            src={AvatarImage}
            alt=""
            className="object-cover rounded-full h-8 w-8 cursor-pointer shadow-xs"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
