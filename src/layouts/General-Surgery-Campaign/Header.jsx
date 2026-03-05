import React, { useState, useEffect, useMemo } from "react";
import NewCall24 from "../../site/assets/images/icons/new-call-24.svg";
import Link from "next/link";

// import { ReactComponent as PhoneLogo } from "../assets/images/Icons/Phone.svg";

const Header = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleNavClick = (index) => {
        setActiveIndex(index);
        setMenuOpen(false);
    };

    const navItems = useMemo(() => [
        { text: "Conditions", href: "#conditions" },
        { text: "Services", href: "#services" },
        { text: "Why Us", href: "#whyus" },
        { text: "Doctors", href: "#doctors" },
        { text: "Success Stories", href: "#testimonials" },
        { text: "FAQ’s", href: "#faq" },
        { text: "Book An Appointment ", href: "#bookappointment" },
    ], []);

    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map(item => document.querySelector(item.href));
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            sections.forEach((section, index) => {
                if (section && section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
                    setActiveIndex(index);
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [navItems]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        const header = document.getElementById("header");
        const sticky = header.offsetTop;

        const myFunction = () => {
            if (window.pageYOffset > sticky) {
                header.classList.add("sticky");
            } else {
                header.classList.remove("sticky");
            }
        };

        window.addEventListener("scroll", myFunction);

        return () => {
            window.removeEventListener("scroll", myFunction);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <header id="header" className="header header_section sidespace">
            <nav className="navbar navbar-expand-xl header-inner">
                <div className="d-flex align-items-center text-start">
                    <Link href="#" className="brand-logo py-0" to="/" onClick={scrollToTop}>
                        <img src="/images/new-theme/lokmanya-new-png-logo.webp" alt="app logo" />
                    </Link>
                </div>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mobile_toggle"
                    onClick={toggleMenu}
                >
                    {menuOpen ? (
                        <div className="close-btn-icon">
                            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="Menu / Close_MD">
                                    <path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </g>
                            </svg>
                        </div>
                    ) : (
                        <div className="open-btn-icon">
                            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 6H20M4 12H14M4 18H9" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    )}
                </button>
                <div className={`collapse navbar-collapse text-center ${menuOpen ? 'show' : ''}`} id="mobile_toggle">
                    <ul className="navbar-nav m-auto mt-md-0 mt-3 mb-2 mb-lg-0 g-md-5 g-2">
                        {navItems.map((item, index) => (
                            <li
                                className={`nav-item ${!item.noBorder ? "link-border" : ""} ${activeIndex === index ? "active" : ""}`}
                                key={index}
                                onClick={() => handleNavClick(index)}
                            >
                                <a className="nav-link" href={item.href}>
                                    {item.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <a href="tel:+919307076767">
                        <ul className="header-btn-container">
                            <li className="header-btn">
                                <div className="header-btn-svg">
                                    <img alt="Contact Icon" src={NewCall24.src} />
                                </div>
                                <span className="phone-btn text-white">
                                    +91 93 0707 6767
                                </span>
                            </li>
                        </ul>
                    </a>
                </div>
            </nav>
        </header>
    );
};

export default Header;
