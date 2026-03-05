import React from 'react';
// import { ReactComponent as Tick } from "@/site/pages/KneeReplacement/images/tick.svg";
import Link from 'next/link';
import PhoneSvg from '@/assets/images/icons/Phone';
import Image from 'next/image';

const Header = () => {
    return (
        <header id="header1" className="main-header bg-white padding-5 py-3">
            <nav className="navbar navbar-expand-lg navbar-white navbar-light d-flex align-items-center">
                <div className="d-flex align-items-center navDiv">
                    <div className="logo">
                        <Link className='brand-logo py-0' href="#">
                            <Image
                                height={40}
                                width={200}
                                src="/images/new-theme/lokmanya-new-png-logo.webp"
                                alt="app logo"
                            />
                        </Link>
                    </div>
                    <div className="flex2 d-flex align-items-center">
                        <a className="custom-btn inside customA d-flex align-items-center KneereplacementMobContactBtnId" href="tel:+919307076767">
                            <Image
                                height={20}
                                width={20}
                                loading="lazy"
                                className="navPhone KneereplacementMobContactBtnId"
                                src="/images/phone.webp"
                                alt="Phone Icon"
                            />
                            <span className="hideNumber KneereplacementMobContactBtnId"> 93 0707 6767 </span>
                        </a>
                        <button
                            className="navbar-toggler ms-auto collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarCollapse"
                            aria-expanded="false"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </div>

                <div className="navbar-collapse collapse" id="navbarCollapse">
                    <div className="navbar-nav ms-auto me py-0">
                        <a className="nav-link" href="#about">About</a>
                        <a className="nav-link" href="#services">Services</a>
                        <a className="nav-link" href="#benefits">Benefits</a>
                        <a className="nav-link" href="#doctors">Doctors</a>
                        <a className="nav-link" href="#success">Success Stories</a>
                        <a className="nav-link" href="#stages">Stages</a>
                        <a className="nav-link" href="#faq">FAQ's</a>
                        <a className="button-primary false KneereplacementBookId" href="#appointment">
                            <span className='KneereplacementBookId'>Book An Appointment</span>
                        </a>

                    </div>
                    <a className="button-primary outside  btn-white custom-btn d-flex align-items-center KneereplacementContactBtnId" href="tel:+919307076767">
                        <i className="phone-icon"><PhoneSvg /></i>
                        <span className="hideNumber KneereplacementContactBtnId">93 0707 6767 </span>
                    </a>
                </div>
            </nav>
        </header>
    )
}

export default Header