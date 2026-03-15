import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const admin = localStorage.getItem("isAdmin");
    setIsAdmin(admin === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-red-700 hover:opacity-90 transition"
        >
          GIET <span className="text-gray-800">DeptConnect</span>
        </Link>

        {/* LINKS */}
        <div className="flex items-center gap-6 font-medium">

          <Link
            to="/"
            className="relative text-gray-800 transition duration-300 hover:text-red-700 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-red-700 after:transition-all after:duration-300 hover:after:w-full"
          >
            Home
          </Link>

          <Link
            to="/about"
            className="relative text-gray-800 transition duration-300 hover:text-red-700 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-red-700 after:transition-all after:duration-300 hover:after:w-full"
          >
            About Us
          </Link>

          <Link
            to="/faculty"
            className="relative text-gray-800 transition duration-300 hover:text-red-700 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-red-700 after:transition-all after:duration-300 hover:after:w-full"
          >
            Faculty
          </Link>

          <a
            href="#toppers"
            className="relative text-gray-800 transition duration-300 hover:text-red-700 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-red-700 after:transition-all after:duration-300 hover:after:w-full"
          >
            Events
          </a>

          <a
            href="/achievements"
            className="relative text-gray-800 transition duration-300 hover:text-red-700 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-red-700 after:transition-all after:duration-300 hover:after:w-full"
          >
            Achievements
          </a>

          <a
            href="/Placement"
            className="relative text-gray-800 transition duration-300 hover:text-red-700 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-red-700 after:transition-all after:duration-300 hover:after:w-full"
          >
            Placements
          </a>

          {!isAdmin ? (
            <Link
              to="/login"
              className="bg-red-700 text-white px-5 py-2 rounded-full transition hover:bg-red-800 hover:shadow-md"
            >
              Admin Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-gray-800 text-white px-5 py-2 rounded-full transition hover:bg-black hover:shadow-md"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
