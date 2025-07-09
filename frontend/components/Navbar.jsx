"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faRightFromBracket,
  faUser,
  faRightToBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    router.push("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow-md border-b border-white sticky top-0 z-50">
      {/* Left: Logo */}
      <Link href="/" className="text-2xl font-bold text-purple-400">
        TaskFlow
      </Link>

      {/* Right: User Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
        >
          <FontAwesomeIcon icon={faUser} />
          {user && <span>{user.username}</span>}
          <FontAwesomeIcon
            icon={dropdownOpen ? faChevronUp : faChevronDown}
            className="w-3 h-3"
          />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded shadow-lg py-2 z-50">
            {user ? (
              <>
                <div className="px-4 py-2 text-sm text-gray-300 border-b border-gray-600">
                  Welcome, {user.username || user.email}
                </div>
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 hover:bg-gray-600"
                  onClick={() => setDropdownOpen(false)}
                >
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-600"
                >
                  <FontAwesomeIcon icon={faRightFromBracket} className="mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block px-4 py-2 hover:bg-gray-600"
                  onClick={() => setDropdownOpen(false)}
                >
                  <FontAwesomeIcon icon={faRightToBracket} className="mr-2" />
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block px-4 py-2 hover:bg-gray-600"
                  onClick={() => setDropdownOpen(false)}
                >
                  <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
