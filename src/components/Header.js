"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { useAuth } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Header() {
  const { user, logout } = useAuth();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const buttonRefs = useRef({});
  const [firstName, setFirstName] = useState("");

  const menus = ["Lessons", "Question Bank", "Past Papers", "Flash Cards"];

  useEffect(() => {
    if (user?.displayName) {
      setFirstName(user.displayName.split(" ")[0]);
    }
  }, [user]);

  const toggleDropdown = (menu) => {
    if (openDropdown === menu) {
      setOpenDropdown(null);
      return;
    }
    const rect = buttonRefs.current[menu]?.getBoundingClientRect();
    if (rect) {
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + rect.width / 2,
      });
    }
    setOpenDropdown(menu);
  };

  const toggleUserDropdown = () => {
    if (openDropdown === "user") {
      setOpenDropdown(null);
      return;
    }
    const rect = buttonRefs.current["user"]?.getBoundingClientRect();
    if (rect) {
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + rect.width / 2,
      });
    }
    setOpenDropdown("user");
  };

  useEffect(() => {
    const closeOnScrollOrResize = () => setOpenDropdown(null);
    window.addEventListener("scroll", closeOnScrollOrResize);
    window.addEventListener("resize", closeOnScrollOrResize);
    return () => {
      window.removeEventListener("scroll", closeOnScrollOrResize);
      window.removeEventListener("resize", closeOnScrollOrResize);
    };
  }, []);

  return (
    <header className="bg-white border-bottom shadow-sm py-1 position-relative">
      <div className="container d-flex align-items-center justify-content-between position-relative">

        {/* Logo */}
        <div className="d-flex align-items-center" style={{ minWidth: "200px" }}>
          <Link href="/" className="d-flex align-items-center text-decoration-none">
            <img src="/logo.svg" alt="Logo" height="80" className="me-2" />
            <span className="fs-4 fw-bold text-dark">AceIBMath</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="d-flex align-items-center gap-4 position-absolute start-50 translate-middle-x">
          {menus.map((menu) => (
            <div key={menu} className="position-relative">
              <button
                ref={(el) => (buttonRefs.current[menu] = el)}
                className={`btn text-dark px-3 py-1 ${
                  openDropdown === menu ? "bg-light border rounded-pill" : ""
                }`}
                onClick={() => toggleDropdown(menu)}
                style={{ border: "none" }}
              >
                {menu}{" "}
                {openDropdown === menu ? (
                  <IoChevronUp size={14} />
                ) : (
                  <IoChevronDown size={14} />
                )}
              </button>
            </div>
          ))}
        </nav>

        {/* Right side */}
        <div className="d-flex align-items-center gap-3">
          {user && (
            <Link
              href="/membership"
              className="btn btn-danger rounded-pill px-3 py-1"
              style={{ fontSize: "0.85rem", fontWeight: "500" }}
            >
              Premium
            </Link>
          )}

          <div
            ref={(el) => (buttonRefs.current["user"] = el)}
            className={`p-1 ${openDropdown === "user" ? "bg-light border rounded-pill" : ""}`}
            style={{ cursor: "pointer" }}
            onClick={toggleUserDropdown}
          >
            {!user ? (
              <FaUserCircle size={32} className="text-dark" />
            ) : (
              <span className="fw-normal text-dark">
                Hi, <strong>{firstName}</strong>{" "}
                <IoChevronDown size={14} style={{ verticalAlign: "middle" }} />
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Dropdown */}
      {openDropdown && (
        <div
          className="dropdown-animation bg-white shadow rounded p-2"
          style={{
            position: "fixed",
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            transform: "translateX(-50%)",
            zIndex: 999999,
            minWidth: "150px",
          }}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          {openDropdown === "user" ? (
            !user ? (
              <>
                <Link href="/login" className="custom-dropdown-link">
                  Login
                </Link>
                <Link href="/register" className="custom-dropdown-link">
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link href="/account" className="custom-dropdown-link">
                  Account
                </Link>
                <button
                  onClick={logout}
                  className="custom-dropdown-link text-danger"
                  style={{ border: "none", background: "transparent" }}
                >
                  Logout
                </button>
              </>
            )
          ) : (
            <>
              <Link href="#" className="custom-dropdown-link">
                AA SL
              </Link>
              <Link href="#" className="custom-dropdown-link">
                AA HL
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
