import { Menu, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setOpen(false);
  };

  return (
    <div className="h-20 bg-white border-b flex items-center justify-between px-6 shadow-sm">
      
      {/* LEFT: Banner */}
      <div className="flex items-center gap-3">
        <Menu className="cursor-pointer" />
        <h1 className="font-semibold text-2xl">
          Education Engineering Department
        </h1>
      </div>

      {/* RIGHT: User */}
      <div className="relative" ref={dropdownRef}>
        <div
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <User size={16} />
          </div>
          <span>{user?.full_name || user?.username || "User"}</span>
        </div>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow">
            <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Profile
            </div>
            <div 
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
