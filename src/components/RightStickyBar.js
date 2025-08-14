import React, { useState, useEffect } from "react";
import {
  FaBuilding, FaUtensils, FaTrophy, FaRegNewspaper, FaPhoneAlt, FaBars, FaTimes,
  FaHome, FaBookOpen, FaBook, FaCalendarAlt, FaHamburger, FaBlog,
   FaUserFriends, FaComments, FaExclamationTriangle, FaAddressCard,
} from "react-icons/fa";

// Drawer menu links (all)
const menuLinks = [
  { icon: <FaHome />, label: "Home", href: "/" },
  { icon: <FaBuilding />, label: "About", href: "/about" },
  { icon: <FaUtensils />, label: "Services", href: "/services" },
  { icon: <FaCalendarAlt />, label: "Events", href: "/events" },
  { icon: <FaHamburger />, label: "Menu", href: "/menu" },
  { icon: <FaBook />, label: "Pages", href: "/pages" },
  { icon: <FaBookOpen />, label: "Booking", href: "/booking" },
  { icon: <FaBlog />, label: "Our Blog", href: "/blog" },
  { icon: <FaUserFriends />, label: "Our Team", href: "/team" },
  { icon: <FaComments />, label: "Testimonial", href: "/testimonial" },
  { icon: <FaExclamationTriangle />, label: "404 Page", href: "/404" },
  { icon: <FaAddressCard />, label: "Contact", href: "/contact" },
];

// Bottom bar links for mobile (Menu is a button, not a link)
const mobileMenuLinks = [
  { icon: <FaHome />, label: "Home", href: "/" },
  { icon: <FaBuilding />, label: "Company", href: "/about" },
  { icon: <FaUtensils />, label: "Services", href: "/services" },
];

export default function RightStickyBar() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 767.98 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 767.98);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <style>{`
        .right-sticky-bar {
          position: fixed;
          z-index: 1000;
        }
        @media (min-width: 768px) {
          .right-sticky-bar {
            right: 0; top: 0;
            height: 100vh; width: 100px;
            background: #fff;
            border-left: 1px solid #f2f2f2;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 90px;
            transition: width 0.3s;
          }
          .right-sticky-bar .sticky-item {
            margin: 10px 0;
            text-align: center;
            transition: background 0.3s, color 0.3s;
            border-radius: 1rem;
            padding: 10px 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-decoration: none;
            color: inherit;
          }
          .right-sticky-bar .sticky-item:hover {
            background: #D4A762;
            color: #1b1a16;
            box-shadow: 0 3px 14px #fae18e50;
          }
          .right-sticky-bar .sticky-item:hover svg {
            color: #1f1e1d !important;
            transition: color 0.2s;
          }
          .right-sticky-bar .sticky-label {
            font-size: 15px; font-style: italic;
          }
          .right-sticky-bar .sticky-title {
            font-weight: 500; font-size: 16px;
          }
          .right-sticky-bar .call-btn {
            background: #fff;
            border: 2px solid #D4A762;
            box-shadow: 0 2px 10px #0001;
            width: 50px; height: 50px;
            border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
          }
          .right-sticky-bar .call-btn-wrap {
            position: absolute; bottom: 30px;
          }
        }
        @media (max-width: 767.98px) {
          .right-sticky-bar {
            left: 0; right: 0; bottom: 0; top: auto;
            height: 60px; width: 100vw;
            background: #fff;
            border-left: none;
            border-top: 1px solid #f2f2f2;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 0;
          }
          .right-sticky-bar .sticky-item {
            flex: 1;
            font-size: 12px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-decoration: none;
            color: inherit;
            background: none;
            border: none;
            transition: background 0.3s, color 0.3s;
            border-radius: 0.7rem;
            padding: 5px 0 0 0;
            min-width: 0;
            outline: none;
          }
          .right-sticky-bar .sticky-item.selected,
          .right-sticky-bar .sticky-item:active {
            color: #0066ae;
          }
          .right-sticky-bar .sticky-item span {
            margin-top: 4px;
            font-size: 14px;
            font-weight: 400;
            text-align: center;
            white-space: nowrap;
            letter-spacing: 0;
          }
          .right-sticky-bar .sticky-item svg {
            font-size: 26px;
          }
        }
        @media (max-width: 767.98px) {
          .right-sticky-bar .call-btn-wrap {
            display: none !important;
          }
        }
        .right-hamburger {
          position: fixed;
          right: 30px; top: 30px;
          z-index: 1101;
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 1px 8px #0002;
          padding: 12px;
          display: flex;
          align-items: center; justify-content: center;
          cursor: pointer;
        }
        @media (max-width: 767.98px) {
          .right-hamburger { display: none !important; }
        }
        .mobile-hamburger {
          display: none;
        }
        @media (max-width: 767.98px) {
          .mobile-hamburger { display: none !important; }
        }
        .slide-menu-overlay {
          display: ${open ? "block" : "none"};
          position: fixed;
          z-index: 1300;
          inset: 0;
          background: rgba(0,0,0,0.28);
          animation: fadeIn 0.3s;
        }
        .slide-menu {
          position: fixed;
          top: 0; right: 0;
          width: 325px; max-width: 92vw;
          height: 100vh;
          background: #fff;
          z-index: 1301;
          padding: 38px 0 0 0;
          box-shadow: -2px 0 15px #0002;
          transform: ${open ? "translateX(0)" : "translateX(105%)"};
          transition: transform 0.35s cubic-bezier(.4,1.7,.58,.98);
          display: flex; flex-direction: column;
        }
        .slide-menu .slide-close {
          position: absolute; top: 20px; right: 20px; cursor: pointer;
        }
        .slide-menu-list {
          padding: 50px 0 0 0;
          display: flex; 
          flex-direction: column; 
          gap: 0;
          max-height: calc(100vh - 80px);
          overflow-y: auto;
        }
        .slide-menu-list a {
          display: flex; align-items: center;
          padding: 18px 32px;
          text-decoration: none;
          color: #232323;
          font-size: 1.14rem;
          border-bottom: 1px solid #f1f1f1;
          transition: background .18s, color .15s;
        }
        .slide-menu-list a:hover {
          background: #ffeaaa44;
          color: #D4A762;
        }
        .slide-menu-list svg {
          margin-right: 15px;
          font-size: 1.2em;
          min-width: 22px;
        }
        @media (max-width: 576px) {
          .slide-menu {
            width: 92vw; min-width: 0; padding-top: 24px;
          }
          .slide-menu-list a { padding: 15px 17px; font-size: 1.02rem; }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      {/* Sticky Sidebar (PC) or Bottom bar (Mobile) */}
      <div className="right-sticky-bar">
        {isMobile ? (
          <>
            {mobileMenuLinks.map((link, i) => (
              <a
                key={i}
                className="sticky-item"
                href={link.href}
                style={{
                  color:
                    typeof window !== "undefined" &&
                    window.location.pathname === link.href
                      ? "#0066ae"
                      : "#232323",
                }}
              >
                {link.icon}
                <span>{link.label}</span>
              </a>
            ))}
            <button
              className="sticky-item"
              onClick={() => setOpen(true)}
              style={{
                background: "none",
                border: "none",
                color: "#232323",
                cursor: "pointer",
                outline: "none",
              }}
            >
              <FaBars size={28} />
              <span>Menu</span>
            </button>
          </>
        ) : (
          <>
            <a className="sticky-item" href="/about">
              <FaBuilding size={28} color="#222" />
              <div className="sticky-label">Our</div>
              <div className="sticky-title">Company</div>
            </a>
            <a className="sticky-item" href="/services">
              <FaUtensils size={28} color="#222" />
              <div className="sticky-label">Our</div>
              <div className="sticky-title">Services</div>
            </a>
            <a className="sticky-item" href="/menu">
              <FaBook size={28} color="#222" />
              <div className="sticky-label">Our</div>
              <div className="sticky-title">Menu</div>
            </a>
            <a className="sticky-item" href="/blog">
              <FaRegNewspaper size={28} color="#222" />
              <div className="sticky-label">Our</div>
              <div className="sticky-title">News</div>
            </a>
            <div className="call-btn-wrap">
              <a href="/contact" className="call-btn">
                <FaPhoneAlt color="#D4A762" size={22} />
              </a>
            </div>
          </>
        )}
      </div>

      {/* PC Hamburger */}
      <div className="right-hamburger" onClick={() => setOpen(true)}>
        <FaBars size={26} color="#222" />
      </div>

      {/* Slide Drawer Overlay and Menu */}
      <div className="slide-menu-overlay" onClick={() => setOpen(false)} />
      <nav className="slide-menu" aria-hidden={!open}>
        <div className="slide-close" onClick={() => setOpen(false)}>
          <FaTimes size={30} />
        </div>
        <div className="slide-menu-list">
          {menuLinks.map((link, i) => (
            <a key={i} href={link.href} onClick={() => setOpen(false)}>
              {link.icon}
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}