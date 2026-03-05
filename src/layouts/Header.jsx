"use client";
import { useState, useEffect } from "react";
import { Search } from "../site/assets/images/icons";
// import "../header/header.css"
import ButtonPrimary from "../site/components/controls/ButtonPrimary";
import { useRouter } from "next/router";
import AppointmentModal from "../site/components/AppointmentModal"; // Import the modal component
import Head from "next/head";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Header = () => {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isStickyHeaderVisible, setIsStickyHeaderVisible] = useState(false);
  const [isMobileSticky, setIsMobileSticky] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalId, setModalId] = useState("");
  const [modalTitle, setModalTitle] = useState("");


  const handleModalOpen = (submitBtnClass, title) => {
    setIsModalOpen(true);
    setModalId(submitBtnClass);
    setModalTitle(title);
  };
  const handleModalClose = () => setIsModalOpen(false);
  const router = useRouter();

  const [globalSearchVal, setGlobalSearchVal] = useState(""); // State to store search query
  const navigate = useRouter(); // Hook for navigation

  // Function to handle global search
  const globalSearch = () => {
    if (globalSearchVal) {
      router.push(`/doctors?search=${encodeURIComponent(globalSearchVal)}`);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const isMobile = window.innerWidth <= 992;

      if (isMobile) {
        if (currentScroll > 50) {
          setIsMobileSticky(true); // Make mobile header sticky
        } else {
          setIsMobileSticky(false); // Remove sticky effect
        }
      } else {
        setIsMobileSticky(false); // Reset for non-mobile devices
        setIsStickyHeaderVisible(currentScroll > 100); // Desktop sticky header
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Header Button class updates starts
  const pathname = router.asPath;
  let extraClass = "";
  let callBackClass = "";
  let apClass = "";
  let PhoneClass = "";
  if (pathname.startsWith("/best-treatment")) {
    extraClass = "best-treatment-header-btnId";
    callBackClass = "best-treatment-foot-callbck";
    apClass = "best-treatment-foot-apt";
    PhoneClass = "best-treatment-phone-cls";
  } else if (pathname.startsWith("/best-hospital")) {
    extraClass = "best-hospital-header-btnId";
    callBackClass = "best-hospital-foot-callbck";
    apClass = "best-hospital-foot-apt";
    PhoneClass = "best-hospital-phone-cls";
  } else if (pathname.startsWith("/best-doctors")) {
    extraClass = "best-doctors-header-btnId";
    callBackClass = "best-doctors-foot-callbck";
    apClass = "best-doctors-foot-apt";
    PhoneClass = "best-doctors-phone-cls";
  }

  const buttonClass = `headerBookButtonId ${extraClass}`;
  const footCallBackClass = `btn-book-app call-back-btn ${callBackClass}`;
  const footaptClass = `btn-book-app ${apClass}`;
  const headerPhoneClass = `${PhoneClass}`;


  return (
    <>
      <Head>
        <link
          rel="canonical"
          href={`https://lokmanyahospitals.com${path === "/" ? "" : path}`}
        />
      </Head>

      <header>
        <div
          className={`mobile-bootom-header ${isMobileSticky ? "sticky" : ""}`}
        >
          <div className="mb-logo-sec">
            <Link href="/">
              <img
                src="/images/new-theme/lokmanya-new-png-logo.webp"
                alt="app logo"
              />
            </Link>
          </div>
          <button
            aria-label="menu button"
            type="button"
            onClick={() => setIsOpen(true)}
            className="btn-hamburger"
          >
            <svg
              width="26"
              height="18"
              viewBox="0 0 26 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.6875 1.5C6.6875 0.809668 7.24717 0.25 7.9375 0.25H24.1875C24.8778 0.25 25.4375 0.809668 25.4375 1.5C25.4375 2.19033 24.8778 2.75 24.1875 2.75H7.9375C7.24717 2.75 6.6875 2.19028 6.6875 1.5ZM24.1875 7.75H1.6875C0.997168 7.75 0.4375 8.30972 0.4375 9C0.4375 9.69033 0.997168 10.25 1.6875 10.25H24.1875C24.8778 10.25 25.4375 9.69033 25.4375 9C25.4375 8.30972 24.8778 7.75 24.1875 7.75ZM24.1875 15.25H12.9375C12.2472 15.25 11.6875 15.8097 11.6875 16.5C11.6875 17.1903 12.2472 17.75 12.9375 17.75H24.1875C24.8778 17.75 25.4375 17.1903 25.4375 16.5C25.4375 15.8097 24.8778 15.25 24.1875 15.25Z"
                fill="#1A1A1A"
              ></path>
            </svg>
          </button>
        </div>
        <div className="top-header">
          <div className="row top-header-row">
            <div className="d-none d-lg-block col-lg-3 col-xl-3 px-0">
              <div className="logo-sec">
                <Link href="/">
                  <Image
                    width={245}
                    height={47}
                    src="/images/new-theme/lokmanya-new-png-logo.webp"
                    alt="app logo"
                  />
                </Link>
              </div>
            </div>
            <div className="col-12 col-lg-5 col-xl-6">
              <div className="globle-search">
                <input
                  type="search"
                  name="globle-search"
                  placeholder="Search for doctor"
                  id="globle-search"
                  value={globalSearchVal}
                  onChange={(e) => setGlobalSearchVal(e.target.value)} // Update state with input value
                  onKeyDown={(e) => e.key === "Enter" && globalSearch()} // Trigger search on Enter key press
                />

                <button className="searchIcon" onClick={globalSearch}>
                  {/* <Search />  */}
                  <Image width={20} height={20} src={Search.src} alt="Search" />
                </button>
              </div>
            </div>
            <div className="d-none d-lg-block col-lg-4 col-xl-3">
              <div className="right-emg-sec">
                <Image
                  width={26}
                  height={26}
                  src="/images/new-theme/emergency-call.svg"
                  alt="call in gradient"
                />
                <div className="emg-text">
                  <p> For Appointment</p>
                  <Link className={`numberHover ${headerPhoneClass}`} href="tel:9307076767">
                    93 0707 6767
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div id="toggle-nav" className={`sidebar-nav ${isOpen && "is-open"}`}>
            <div className="nav-header">
              <Link aria-current="page" className="mob-logo active" href="/">
                <Image
                  width={150}
                  height={30}
                  src="/images/new-theme/lokmanya-new-png-logo.webp"
                  alt="header logo"
                  crossOrigin="anonymous"
                />
              </Link>
              <button
                type="button"
                id="close-nav"
                onClick={() => setIsOpen(false)}
                className="btn-menu-close"
                aria-label="Close Header"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 26.072 26.071"
                >
                  <defs>
                    <style></style>
                  </defs>
                  <g transform="translate(0 -0.016)">
                    <g transform="translate(0 0.016)">
                      <path
                        className="ac"
                        d="M15.908,13.051,25.656,3.3a1.429,1.429,0,0,0,0-2.016L24.8.432a1.43,1.43,0,0,0-2.017,0L13.037,10.18,3.288.432a1.429,1.429,0,0,0-2.016,0l-.855.854a1.427,1.427,0,0,0,0,2.016l9.748,9.749L.417,22.8a1.43,1.43,0,0,0,0,2.017l.854.854a1.429,1.429,0,0,0,2.016,0l9.749-9.748,9.748,9.748a1.415,1.415,0,0,0,1.008.416h0A1.415,1.415,0,0,0,24.8,25.67l.854-.854a1.43,1.43,0,0,0,0-2.017Z"
                        transform="translate(0 -0.016)"
                      ></path>
                    </g>
                  </g>
                </svg>
              </button>
            </div>

            <ul className="navbar-nav">
              <li>
                <Link onClick={() => setIsOpen(false)} className="nav-link" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link onClick={() => setIsOpen(false)} className="nav-link" href="/about-us">
                  About Us
                </Link>
              </li>
              <li></li>
              <li className="dropdownHover">
                <Link
                  className="nav-link"
                  // data-bs-toggle="collapse"
                  href="/#healthcare-specialities"
                  // aria-expanded="false"
                  // onClick={() => setIsOpen(false)}
                  aria-controls="mediaMenu2"
                >
                  Specialities +
                </Link>
                <ul className="dropdown-menu" id="mediaMenu2">
                  {/* <li >
                    <Link className="dropdown-item" href="/cancer">
                      Cancer
                    </Link>
                  </li> */}
                  <li>
                    <Link onClick={() => setIsOpen(false)} className="dropdown-item" href="/orthopedics">
                      Orthopedics
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => setIsOpen(false)}
                      className="dropdown-item"
                      href="/joint-hip-and-knee-replacement"
                    >
                      Joint Replacement
                    </Link>
                  </li>
                  <li>
                    <Link onClick={() => setIsOpen(false)} className="dropdown-item" href="/spine">
                      Spine
                    </Link>
                  </li>
                  <li>
                    <Link onClick={() => setIsOpen(false)} className="dropdown-item" href="/general-surgery">
                      General Surgery
                    </Link>
                  </li>
                  <li>
                    <Link onClick={() => setIsOpen(false)} className="dropdown-item" href="/internal-medicine">
                      Internal Medicine
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => setIsOpen(false)}
                      className="dropdown-item"
                      href="/trauma-and-critical-care"
                    >
                      Trauma & Critical Care
                    </Link>
                  </li>
                  <li>
                    <Link onClick={() => setIsOpen(false)} className="dropdown-item" href="/gastroenterology">
                      Gastroenterology
                    </Link>
                  </li>
                  <li>
                    <Link onClick={() => setIsOpen(false)} className="dropdown-item" href="/neurology">
                      Neurology
                    </Link>
                  </li>
                  <li>
                    <Link onClick={() => setIsOpen(false)} className="dropdown-item" href="/neurosurgery">
                      Neuro Surgery
                    </Link>
                  </li>
                  <li>
                    <Link onClick={() => setIsOpen(false)} className="dropdown-item" href="/cardiology">
                      Cardiology
                    </Link>
                  </li>
                  <li>
                    <Link onClick={() => setIsOpen(false)} className="dropdown-item" href="/cardiac-surgery">
                      Cardiac Surgery
                    </Link>
                  </li>
                  <li>
                    <Link onClick={() => setIsOpen(false)} className="dropdown-item" href="/gynecology">
                      Gynecology
                    </Link>
                  </li>
                  <li>
                    <Link onClick={() => setIsOpen(false)} className="dropdown-item" href="/urology">
                      Urology
                    </Link>
                  </li>
                  <li>
                    <Link onClick={() => setIsOpen(false)} className="dropdown-item" href="/dietetics">
                      Dietetics
                    </Link>
                  </li>
                  <li>
                    <Link onClick={() => setIsOpen(false)} className="dropdown-item" href="/physiotherapy">
                      Physiotherapy
                    </Link>
                  </li>
                  <li>
                    <Link onClick={() => setIsOpen(false)} className="dropdown-item" href="/dental">
                      Dental
                    </Link>
                  </li>
                  <li>
                    <Link onClick={() => setIsOpen(false)} className="dropdown-item" href="/ophthalmology">
                      Ophthalmology
                    </Link>
                  </li>
                  <li>
                    <Link onClick={() => setIsOpen(false)} className="dropdown-item" href="/dermatology">
                      Dermatology
                    </Link>
                  </li>
                  {/* <li >
                    <Link className="dropdown-item" href="/cancer">
                    Cancer
                    </Link>
                  </li> */}
                </ul>
              </li>
              {/* <li>
              <Link
                className="nav-link dropdown-toggle"
                data-bs-toggle="collapse"
                href="#mediaMenu"
                aria-expanded="false"
                aria-controls="mediaMenu"
              >Media Centre +
              </Link>
              <ul className="dropdown-menu" id="mediaMenu">
                <li >
                  <Link className="dropdown-item" href="/">
                  Media Centre 1
                  </Link>
                </li>
                <li >
                  <Link className="dropdown-item" href="/">
                  Media Centre 2
                  </Link>
                </li>
              </ul>
            </li> */}
              <li>
                <Link onClick={() => setIsOpen(false)} href="/doctors">Find A Doctor</Link>
              </li>
              <li>
                <Link onClick={() => setIsOpen(false)} href="/blogs">Blog</Link>
              </li>
              <li>
                <Link onClick={() => setIsOpen(false)} href="/videos">Videos</Link>
              </li>
              <li>
                <Link onClick={() => setIsOpen(false)} href="/international-patients">International Patients</Link>
              </li>
              <li className="dropdownHover">
                <Link
                  className="nav-link"
                  // data-bs-toggle="collapse"
                  href="/our-branch"
                >
                  Our Branches +
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      onClick={() => setIsOpen(false)}
                      className="dropdown-item"
                      href="/our-branch#sb-road-branch"
                    >
                      S B Road, Pune
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => setIsOpen(false)}
                      className="dropdown-item"
                      href="/our-branch#nigdi-branch"
                    >
                      Nigdi, Pune
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => setIsOpen(false)}
                      className="dropdown-item"
                      href="/our-branch#chinchwad-branch"
                    >
                      Chinchwad, Pune
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => setIsOpen(false)}
                      className="dropdown-item"
                      href="/our-branch#swargate-branch"
                    >
                      Swargate, Pune
                    </Link>
                  </li>
                  {/* <li>
                    <Link className="dropdown-item" href="/our-branch#kolhapur-branch">
                      Kolhapur
                    </Link>
                  </li> */}
                </ul>
              </li>
              <li>
                <Link onClick={() => setIsOpen(false)} href="/careers">Careers</Link>
              </li>
              <li>
                <Link onClick={() => setIsOpen(false)} href="/contact-us">Contact Us</Link>
              </li>
            </ul>
            <div className="right-emg-sec">
              <Image
                width={26}
                height={26}
                src="/images/new-theme/emergency-call.svg"
                alt="call in gradient"
              />
              <div className="emg-text">
                <p>For Appointment</p>
                <Link className={`${headerPhoneClass}`} href="tel:9307076767">93 0707 6767</Link>
              </div>
            </div>
          </div>
        </div>




        <div
          className={`bottom-header ${isStickyHeaderVisible ? "visible" : "hidden"
            }`}
        >
          <div className="row bottom-header-row">
            <nav className="col-xxl-8 col-md-10">
              <ul className="navbar">
                <li>
                  <Link className="nav-link" href="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about-us">About Us</Link>
                </li>
                {/* <li>
            <Link
                className="nav-link"
                href="#"
              >
                Speciality
              </Link>
             
            </li> */}
                <li className="dropdownHover">
                  <Link
                    className="nav-link"
                    // data-bs-toggle="collapse"
                    href="/#healthcare-specialities"
                    // aria-expanded="false"
                    aria-controls="mediaMenu1"
                  >
                    Specialities +
                  </Link>
                  <ul className="dropdown-menu" id="mediaMenu1">
                    {/* <li >
                      <Link className="dropdown-item" href="/cancer">
                        Cancer
                      </Link>
                    </li> */}

                    <li>
                      <Link className="dropdown-item" href="/orthopedics">
                        Orthopedics
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        href="/joint-hip-and-knee-replacement"
                      >
                        Joint Replacement
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" href="/spine">
                        Spine
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/general-surgery">
                        General Surgery
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/internal-medicine">
                        Internal Medicine
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        href="/trauma-and-critical-care"
                      >
                        Trauma & Critical Care
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/gastroenterology">
                        Gastroenterology
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/neurology">
                        Neurology
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/neurosurgery">
                        Neuro Surgery
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/cardiology">
                        Cardiology
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/cardiac-surgery">
                        Cardiac Surgery
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/gynecology">
                        Gynecology
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/urology">
                        Urology
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/dietetics">
                        Dietetics
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/physiotherapy">
                        Physiotherapy
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/dental">
                        Dental
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/ophthalmology">
                        Ophthalmology
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/dermatology">
                        Dermatology
                      </Link>
                    </li>
                    {/* <li >
                    <Link className="dropdown-item" href="/cancer">
                    Cancer
                    </Link>
                  </li> */}
                  </ul>
                </li>
                <li>
                  <Link className="nav-link" href="/doctors">
                    Find A Doctor
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" href="/blogs">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" href="/videos">
                    Videos
                  </Link>
                </li>
                {/* <li>
                <Link href="#doctors">Media Centre +</Link>
                <ul className="sub-menues">
                  <li>
                    <Link className="" href="/">
                    Media Centre 1
                    </Link>
                  </li>
                  <li>
                    <Link className="" href="/">
                    Media Centre 2
                    </Link>
                  </li>
                </ul>
              </li> */}
                <li>
                  <Link href="/international-patients">International Patient</Link>
                </li>
                <li className="dropdownHover">
                  <Link className="nav-link" href="/our-branch">
                    Our Branches +
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        className="dropdown-item"
                        href="/our-branch#sb-road-branch"
                      >
                        S B Road, Pune
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        href="/our-branch#nigdi-branch"
                      >
                        Nigdi, Pune
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        href="/our-branch#chinchwad-branch"
                      >
                        Chinchwad, Pune
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        href="/our-branch#swargate-branch"
                      >
                        Swargate, Pune
                      </Link>
                    </li>
                    {/* <li>
                      <Link className="dropdown-item" href="/our-branch#kolhapur-branch">
                        Kolhapur
                      </Link>
                    </li> */}
                  </ul>
                </li>
                {/* <li>
                <Link href="#success-stories">Success Stories</Link>
              </li> */}
                <li>
                  <Link href="/careers">Careers</Link>
                </li>
                <li>
                  <Link href="/contact-us">Contact Us</Link>
                </li>
              </ul>
            </nav>
            <div className="col-md-2">
              <div className="right-appoi-btn">
                <ButtonPrimary
                  submitBtnClass={buttonClass}
                  onClick={() => handleModalOpen(buttonClass, "Book An Appointment")}
                >
                  Book An Appointment
                </ButtonPrimary>
              </div>
            </div>
          </div>
        </div>

        {/* Appointment Modal */}
        <AppointmentModal
          submitBtnClass={modalId}
          isModalOpen={isModalOpen}
          title={modalTitle}
          handleModalClose={handleModalClose}
        />

        <div
          className={`sticky-header ${isStickyHeaderVisible ? "visible" : "hidden"
            }`}
        >
          <div className="row align-items-center">
            <div className="col-xxl-2 col-lg-2 col-md-2">
              <div className="logo-sec">
                <Link href="/">
                  <Image
                    width={245}
                    height={47}
                    src="/images/new-theme/lokmanya-new-png-logo.webp"
                    alt="app logo"
                  />
                </Link>
              </div>
            </div>
            <nav className="col-xxl-8 col-lg-8 col-md-7">
              <ul className="navbar stick-sm-nav">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/about-us">About Us</Link>
                </li>
                <li className="dropdownHover">
                  <Link
                    className="nav-link"
                    // data-bs-toggle="collapse"
                    href="/#healthcare-specialities"
                    aria-expanded="false"
                    aria-controls="mediaMenu"
                  >
                    Specialities +
                  </Link>
                  <ul className="dropdown-menu" id="mediaMenu">
                    {/* <li >
                    <Link className="dropdown-item" href="/cancer">
                      Cancer
                    </Link>
                  </li> */}

                    <li>
                      <Link className="dropdown-item" href="/orthopedics">
                        Orthopedics
                      </Link>
                    </li>

                    <li>
                      <Link
                        className="dropdown-item"
                        href="/joint-hip-and-knee-replacement"
                      >
                        Joint Replacement
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" href="/spine">
                        Spine
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/general-surgery">
                        General Surgery
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/internal-medicine">
                        Internal Medicine
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        href="/trauma-and-critical-care"
                      >
                        Trauma & Critical Care
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/gastroenterology">
                        Gastroenterology
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/neurology">
                        Neurology
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/neurosurgery">
                        Neuro Surgery
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/cardiology">
                        Cardiology
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/cardiac-surgery">
                        Cardiac Surgery
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/gynecology">
                        Gynecology
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/urology">
                        Urology
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/dietetics">
                        Dietetics
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/physiotherapy">
                        Physiotherapy
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/dental">
                        Dental
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/ophthalmology">
                        Ophthalmology
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/dermatology">
                        Dermatology
                      </Link>
                    </li>
                    {/* <li >
                    <Link className="dropdown-item" href="/cancer">
                    Cancer
                    </Link>
                  </li> */}
                  </ul>
                </li>
                <li>
                  <Link href="/doctors">Find A Doctor</Link>
                </li>
                <li>
                  <Link href="/blogs">Blog</Link>
                </li>
                <li className="">
                  <Link href="/videos">Videos</Link>
                </li>
                <li className="display-none-sm">
                  <Link href="/international-patients">International Patients</Link>
                </li>
                <li className="dropdownHover display-none-sm">
                  <Link className="nav-link" href="/our-branch">
                    Our Branches +
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        className="dropdown-item"
                        href="/our-branch#sb-road-branch"
                      >
                        S B Road, Pune
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        href="/our-branch#nigdi-branch"
                      >
                        Nigdi, Pune
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        href="/our-branch#chinchwad-branch"
                      >
                        Chinchwad, Pune
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        href="/our-branch#swargate-branch"
                      >
                        Swargate, Pune
                      </Link>
                    </li>
                    {/* <li>
                    <Link className="dropdown-item" href="/our-branch#kolhapur-branch">
                      Kolhapur
                    </Link>
                  </li> */}
                  </ul>
                </li>

                <li className="display-none-sm">
                  <Link href="/careers">Careers</Link>
                </li>
                <li className="display-none-sm">
                  <Link href="/contact-us">Contact Us</Link>
                </li>
              </ul>
            </nav>
            <div className="col-xxl-2 col-lg-2 col-md-3">
              <div className="right-appoi-btn">
                <ButtonPrimary
                  submitBtnClass={buttonClass}
                  onClick={() => handleModalOpen(buttonClass, "Book An Appointment")}
                >
                  Book An Appointment
                </ButtonPrimary>
                <button
                  aria-label="menu button"
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className="btn-hamburger stick-sm-btn-hamburger"
                >
                  <svg
                    width="26"
                    height="18"
                    viewBox="0 0 26 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.6875 1.5C6.6875 0.809668 7.24717 0.25 7.9375 0.25H24.1875C24.8778 0.25 25.4375 0.809668 25.4375 1.5C25.4375 2.19033 24.8778 2.75 24.1875 2.75H7.9375C7.24717 2.75 6.6875 2.19028 6.6875 1.5ZM24.1875 7.75H1.6875C0.997168 7.75 0.4375 8.30972 0.4375 9C0.4375 9.69033 0.997168 10.25 1.6875 10.25H24.1875C24.8778 10.25 25.4375 9.69033 25.4375 9C25.4375 8.30972 24.8778 7.75 24.1875 7.75ZM24.1875 15.25H12.9375C12.2472 15.25 11.6875 15.8097 11.6875 16.5C11.6875 17.1903 12.2472 17.75 12.9375 17.75H24.1875C24.8778 17.75 25.4375 17.1903 25.4375 16.5C25.4375 15.8097 24.8778 15.25 24.1875 15.25Z"
                      fill="#1A1A1A"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-fixed-buttons">
          <Link href="tel:+919307076767" className={`${footCallBackClass}`} >
            Call Back
          </Link>
          <Link href="/" onClick={handleModalOpen} className={`${footaptClass}`} >
            Book Appointment
          </Link>
        </div>
      </header>
      {/* Sticky Header */}

    </>
  );
};

export default Header;
