import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import './ourbranch.css';
import { CommonBanner } from '../site/components';;

// import HospitalBannerImg from "../site/assets/images/ourbranch.webp"
import HospitalBannerImg from "../site/assets/images/OurBranchBnrImg.png";

// import HosptalImg1 from "../site/assets/images/SBRoad.webp";
import HosptalImg5 from "../site/assets/images/Kolhapur_Branch.webp";
// import DocAppointmentModal from '../site/components/DocAppointmentModal';
import BlueRTArrow from '../site/assets/images/icons/blu-arrow-grad.svg';
import Head from 'next/head';
import Link from 'next/link';
import BranchesSection from '@/site/components/BranchesSection';
import AppointmentModal from '@/site/components/AppointmentModal';
import Image from 'next/image';


const Ourbranch = () => {

    // modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalId, setModalId] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");

    const handleModalOpen = (title, location, submitBtnClass) => {
        setModalTitle(title);
        setSelectedLocation(location);
        setIsModalOpen(true);
        setModalId(submitBtnClass);
    };


    const handleModalClose = () => setIsModalOpen(false);

    const location = useRouter();

    useEffect(() => {
        if (location.hash) {
            const element = document.querySelector(location.hash);
            if (element) {
                const headerHeight = document.querySelector('header').offsetHeight || 0;
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth',
                });
            }
        }
    }, [location]);

    return (
        <>
            <Head>
                <title>Find Lokmanya Hospital Branches Near You | Multi-Specialty Care</title>
                <meta name="description" content="Explore all Lokmanya Hospital branches across Maharashtra. Find the nearest multi-specialty center for advanced healthcare, trauma care, and expert treatment." />
            </Head>

            <CommonBanner bgColor={"#D6EFD1"} bgImage={HospitalBannerImg.src}>
                <h1 className="page-heading">
                    Lokmanya’s Widespread Network
                </h1>
            </CommonBanner>

            <BranchesSection handleModalOpen={handleModalOpen} />
            <section id='kolhapur-branch' className='sb-road-hosp side-space section-below-space d-none'>
                <div className='sec-border'>
                    <div className='row align-items-center'>
                        <div className='col-md-5 mb-md-0 mb-3'>
                            <div className='branch-hosp-img'>
                                <Image width={569} height={335} src={HosptalImg5} alt="S B, Road" />
                            </div>
                        </div>
                        <div className='col-md-7'>
                            <h2 className='branch-name'>Lokmanya Hospital - Kolhapur</h2>
                            <ul className='contact-details list-unstyled'>
                                <li><h4 className='contact-ttl'>Address:</h4> 1214 E Ward, Takala Main Rd, <br /> near Hotel Ramkrishna, opp. Nigade Hospital, Mali Colony, <br /> Kolhapur, Maharashtra 416001</li>
                                <div className='d-flex gap-md-3 gap-2 flex-md-column'>
                                    <li><h4 className='contact-ttl'>Contact:</h4><a href="tel:9307076767">93 0707 6767</a></li>
                                    <li><h4 className='contact-ttl'>Email:</h4><a href="mailto:care@lokmanyahospitals.com" target='_blank'>care@lokmanyahospitals.com</a></li>
                                </div>
                            </ul>
                            <div className='d-flex gap-3 align-items-center'>
                                <button onClick={() => handleModalOpen('Lokmanya Hospital - Kolhapur')} className='button-primary'>
                                    <span>Book Appointment</span>
                                </button>
                                <Link href="https://maps.app.goo.gl/bcUyeot2LeKReHh7A" target="_blank" className='get-dir' rel="noopener noreferrer"><span>Get Direction</span> <Image width={11} height={11} src={BlueRTArrow.src} alt="Arrow Icon" /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='side-space section-space pt-0'>
                <div className="row justify-content-center">
                    <div className="col-md-12 col-sm-12 col-lg-10 serveIn">
                        <h2 className="text-center mb-md-3 mb-2">
                            Our Satellite OPD Available in Maharashtra
                        </h2>
                        <div style={{ textAlign: 'center' }} className="location-res">
                            <ul className="d-flex flex-wrap justify-content-center">
                                <li className="mx-3 mb-md-3 mb-2">Kolhapur</li>
                                <li className="mx-3 mb-md-3 mb-2">Thane & Dadar</li>
                                <li className="mx-3 mb-md-3 mb-2">Satara</li>
                                <li className="mx-3 mb-md-3 mb-2">Sangli</li>
                                <li className="mx-3 mb-md-3 mb-2">Belgaon</li>
                                <li className="mx-3 mb-md-3 mb-2">Sambhaji Nagar</li>
                                <li className="mx-3 mb-md-3 mb-2">Jalgaon</li>
                                <li className="mx-3 mb-md-3 mb-2">Solapur</li>
                                <li className="mx-3 mb-md-3 mb-2">Latur</li>
                                <li className="mx-3 mb-md-3 mb-2">Jalna</li>
                                <li className="mx-3 mb-md-3 mb-2">Baramati</li>
                                <li className="mx-3 mb-md-3 mb-2">Nashik</li>
                            </ul>

                        </div>
                    </div>
                </div>
            </section>
            {/* <DocAppointmentModal isModalOpen={isModalOpen} handleModalClose={handleModalClose} selectedHospital={selectedHospital} /> */}
            <AppointmentModal
                isModalOpen={isModalOpen}
                handleModalClose={handleModalClose}
                title={modalTitle}
                location={selectedLocation} // add this
                submitBtnClass={modalId}
            />
        </>
    )
}

export default Ourbranch