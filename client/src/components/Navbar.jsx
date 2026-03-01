import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../assets/css/styles.css";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import IconButton from "@mui/material/IconButton";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();


const toggleTheme = () => {
  const current = document.documentElement.getAttribute('data-theme');
  document.documentElement.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
  localStorage.setItem('theme', current === 'dark' ? 'light' : 'dark');
};
useEffect(() => {
  const saved = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
}, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleScroll = (id) => {
    setMenuOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="l-header">
      <nav className="nav bd-grid">
        <div>
          <Link to="/" className="nav__logo">
            Abbu Bhakar Siddik
          </Link>
        </div>

        <div className={`nav__menu ${menuOpen ? "show" : ""}`}>
          <ul className="nav__list">

            {/* Scroll Sections */}
            <li className="nav__item">
              <button
                className="nav__link"
                onClick={() => handleScroll("home")}
              >
                Home
              </button>
            </li>

            <li className="nav__item">
              <button
                className="nav__link"
                onClick={() => handleScroll("about")}
              >
                About
              </button>
            </li>

            <li className="nav__item">
              <button
                className="nav__link"
                onClick={() => handleScroll("skills")}
              >
                Skills
              </button>
            </li>

            {/* Router Pages */}
            <li className="nav__item">
              <Link
                to="/projects"
                className={`nav__link ${isActive("/projects") ? "active-link" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                Live Projects
              </Link>
            </li>

            <li className="nav__item">
              <Link
                to="/certificates"
                className={`nav__link ${isActive("/certificates") ? "active-link" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                Certificates
              </Link>
            </li>

            <li className="nav__item">
              <Link
                to="/admin"
                className={`nav__link ${isActive("/admin") ? "active-link" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                Admin
              </Link>
            </li>

          </ul>
        </div>
        <button className="theme-toggle" onClick={toggleTheme}>
       <i className="bx bx-moon" />
        </button>
     
        {localStorage.getItem("token") && (
  <button
    className="nav__link"
    onClick={() => {
      localStorage.removeItem("token");
      window.location.href = "/";
    }}
  >
    Logout
  </button>
)}

        {/* Mobile Toggle */}
        <div className="nav__toggle" onClick={toggleMenu}>
          <i className="bx bx-menu"></i>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;