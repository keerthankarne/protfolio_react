import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import MaskedText from "./MaskedText";
import logo from "../assets/logo.png";
import "./Navbar.css";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Me" },
  { to: "/projects", label: "Projects" },
  { to: "/skills", label: "Skills" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(window.scrollY > 12);

  // Responsive nav behavior: track viewport width with a resize listener.
  // Cleanup removes the listener on unmount to avoid a memory leak.
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // A second, independent side effect: darken/blur the bar once the page
  // has scrolled past the hero. Also cleaned up on unmount.
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 12);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

  return (
    <header className={`bar ${scrolled ? "bar-scrolled" : ""}`}>
      <div className="bar-inner">
        <NavLink to="/" className="brand" onClick={() => setMenuOpen(false)}>
          <img src={logo} alt="Keerthan Karne logo" className="brand-mark" />
          <span className="brand-name">
            <MaskedText text="KEERTHAN" />
            <MaskedText text="KARNE" className="brand-name-alt" />
          </span>
        </NavLink>

        {isMobile && (
          <button
            className="menu-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        )}

        {(!isMobile || menuOpen) && (
          <nav aria-label="Primary">
            <ul className={`nav ${isMobile ? "nav-mobile" : ""}`}>
              {LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    className={navLinkClass}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <li>
                <button
                  className="theme-toggle"
                  onClick={toggleTheme}
                  aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                >
                  
                  {theme === "dark" ? "☀" : "☾"}
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
