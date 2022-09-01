import { useState } from "react";
import "./NavigationBar.css";

export default function NavigationBar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  function renderMenu(activeElement) {
    document.getElementById("menu-you-look-for").style.cssText -=
      "font-weight: bold";
    document.getElementById("menu-you-read").style.cssText -= "font-weight: bold";
    document.getElementById("menu-about-me").style.cssText -= "font-weight: bold";
    document.getElementById("menu-contact").style.cssText -= "font-weight: bold";
    activeElement.style.cssText += "font-weight: bold";

    if (isNavExpanded) {
      // following line ensures that the hamburger menu is collapsed after clicking a menu entry
      setIsNavExpanded(false);
    }
  }

  return (
    <nav className="navigation">
      <a href="#html-root" className="brand-name">
        El Taurus - Psychologie
      </a>
      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      >
        {/* icon from Heroicons.com */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }
      >
        <ul>
          <li>
            <a
              id="menu-you-look-for"
              href="#you-look-for"
              onClick={(e) => renderMenu(e.target)}
            >
              Du suchst
            </a>
          </li>
          <li>
            <a
              id="menu-you-read"
              href="#you-read"
              onClick={(e) => renderMenu(e.target)}
            >
              Du liest
            </a>
          </li>
          <li>
            <a
              id="menu-about-me"
              href="#about-me"
              onClick={(e) => renderMenu(e.target)}
            >
              &Uuml;ber mich
            </a>
          </li>
          <li>
            <a
              id="menu-contact"
              href="#contact"
              onClick={(e) => renderMenu(e.target)}
            >
              Kontakt
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
