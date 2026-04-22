import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Settings,
  Package,
  ClipboardList,
  Users,
  ChevronDown,
} from "lucide-react";

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const linkClass =
    "flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-700 transition";

  const activeClass = "bg-gray-700";

  return (
    <div className="w-64 h-screen bg-gray-900 text-gray-200 flex flex-col">
      
      {/* LOGO / HEADER */}
      <div className="p-4 pt-6 border-b border-gray-700">
        <img
          src="/images/govLogo.png"
          alt="Government Logo"
          className="h-18 w-18 object-contain mx-auto"
        />
      </div>

      <div className="flex-1 overflow-y-auto p-2">

        {/* Dashboard */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        {/* BASIC SETUP */}
        <div>
          <button
            onClick={() => toggleMenu("basic")}
            className="w-full flex items-center justify-between px-4 py-2 mt-2 hover:bg-gray-700 rounded-lg"
          >
            <span className="flex items-center gap-2">
              <Settings size={18} />
              Basic Setup
            </span>
            <ChevronDown
              size={16}
              className={`transition ${
                openMenu === "basic" ? "rotate-180" : ""
              }`}
            />
          </button>

          {openMenu === "basic" && (
            <div className="ml-6 mt-1 space-y-1">
              <NavLink to="/product-group" className={linkClass}>
                Product Group
              </NavLink>
              <NavLink to="/product-info" className={linkClass}>
                Product Information
              </NavLink>
              <NavLink to="/opening-balance" className={linkClass}>
                Opening Balance
              </NavLink>
            </div>
          )}
        </div>

        {/* TRANSACTION */}
        <div>
          <button
            onClick={() => toggleMenu("transaction")}
            className="w-full flex items-center justify-between px-4 py-2 mt-2 hover:bg-gray-700 rounded-lg"
          >
            <span className="flex items-center gap-2">
              <ClipboardList size={18} />
              Transaction
            </span>
            <ChevronDown
              size={16}
              className={`transition ${
                openMenu === "transaction" ? "rotate-180" : ""
              }`}
            />
          </button>

          {openMenu === "transaction" && (
            <div className="ml-6 mt-1 space-y-1">
              <NavLink to="/stock-register" className={linkClass}>
                Stock Register
              </NavLink>
              <NavLink to="/distribution" className={linkClass}>
                Distribution
              </NavLink>
              <NavLink to="/purchase-planning" className={linkClass}>
                Purchase Planning
              </NavLink>
            </div>
          )}
        </div>

        {/* USERS - LAST MENU */}
        <div>
          <button
            onClick={() => toggleMenu("users")}
            className="w-full flex items-center justify-between px-4 py-2 mt-2 hover:bg-gray-700 rounded-lg"
          >
            <span className="flex items-center gap-2">
              <Users size={18} />
              Users
            </span>
            <ChevronDown
              size={16}
              className={`transition ${
                openMenu === "users" ? "rotate-180" : ""
              }`}
            />
          </button>

          {openMenu === "users" && (
            <div className="ml-6 mt-1 space-y-1">
              <NavLink to="/users/registration" className={linkClass}>
                User Registration
              </NavLink>
              <NavLink to="/users/role" className={linkClass}>
                User Role
              </NavLink>
              <NavLink to="/users/permission" className={linkClass}>
                User Permission
              </NavLink>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}