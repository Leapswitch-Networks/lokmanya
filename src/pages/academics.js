import { ButtonPrimary, CommonBanner } from '@/site/components'
import Head from 'next/head'
import React from 'react'
import AcademicsBnr from "@/site/assets/images/academics-bnr-img.webp";
// import AcademicsForm from '@/site/components/AcademicsForm';

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Navigation } from "swiper/modules";
import "swiper/css";

// Image imports
import ArrowLeft from "../site/assets/images/icons/Arrow-left-blu.svg";
import ArrowRight from "../site/assets/images/icons/Arrow-right-blu.svg";
import DrSuprashant from "../site/assets/images/findAdoctor/DrSuprashantKulkarni.webp";
import DrAshishSuryawanshi from "../site/assets/images/findAdoctor/DrAshishSuryawanshi.webp";
// import DrShailendra from "../site/assets/images/findAdoctor/Dr.Shailendra.JPG";
import docBag from "../site/assets/images/findAdoctor/doctors-bag.svg";
import PlaceholderImg from "../site/assets/images/Dr-placeholder-img.webp";
import NarendraV from "../site/assets/images/findAdoctor/DrNarendraVaidya.webp";
import BhushanGanvir from "../site/assets/images/findAdoctor/Dr.BhushanGanvir.webp";
import Drbhatiapallav from "../site/assets/images/findAdoctor/DrPallavBhatia.webp";


import Profilesvg1 from "../site/assets/images/icons/CampaignPageicons/profile-clip-1.svg";
import Profilesvg2 from "../site/assets/images/icons/CampaignPageicons/profile-clip-2.svg";
import Image from "next/image";
import { PdfIcon } from '@/assets/images/icons';


const JobpostGraduateMedicalCourses = [
  {
    name: "DNB Orthopaedics",
    duration: "3 Years",
    seats: "2 (Post-MBBS)",
    faculty: [
      "Dr Narendra V Vaidya",
      "Dr Ashish Suryawanshi",
      "Dr Pallav Bhatia"
    ],
  },
  {
    name: "FNB Arthroplasty",
    duration: "2 Years",
    seats: "2",
    faculty: [
      "Dr Narendra V Vaidya",
      "Dr Ashish Suryawanshi",
    ],
  },
];

const Job_positions = [
    // {
    //   title: "Fellowships in Arthroplasty, Orthopedic Trauma & Spine Surgeon",
    //   education: "M.S. Orthopaedics / DNB Orthopaedics",
    //   exp: "-",
    //   location: "S B Road, Nigdi, Chinchwad, Swargate",
    // },
    {
        title: "104163-Fellowship Course in Emergency Medical and Trauma Care",
        criteria: "M.D./DNB (General Medicine/Medicine), M.S./ DNB (General Surgery/Surgery), M.S./DNB (Orthopaedics), M.D./DNB (Paediatrics), Any Other Equivalent Recognized Qualification",
        seats: "2",
        duration: "1 Yr",
    },
    {
        title: "104164-Fellowship Course in Joint Replacement Surgery",
        criteria: "M.S./ DNB (Orthopaedics), Any Other Equivalent Recognized Qualification",
        seats: "2",
        duration: "1 Yr",
    },
    {
        title: "104226-Fellowship Course in Orthopaedic Trauma",
        criteria: "Diploma In Orthopaedics, M.S./DNB (Orthopaedics), Any Other Equivalent Recognized Qualification",
        seats: "2",
        duration: "1 Yr",
    },
];

const defaultDoctors = [
    {
        id: "7",
        name: "Dr. Narendra Vaidya",
        designation: "Consultant Orthopeadic Department",
        field: "Orthopedics, Joint Replacement, Spine, Sports Medicine",
        exp: "30+ Years of Experience",
        image: NarendraV,
        slug: "dr-narendra-vaidya"
    },
    {
        id: "23",
        name: "Dr. Suprashant Kulkarni",
        designation: "Consultant General Surgery Department",
        field: "General Surgery",
        exp: "25+ Years of Experience",
        image: DrSuprashant,
        slug: "dr-suprashant-kulkarni"
    },
    {
        id: "4",
        name: "Dr. Shailesh Adwani",
        designation: "Consultant Internal Medicine",
        field: "Internal Medicine",
        exp: "20+ Years of Experience",
        image: null,
        slug: "-dr-shailesh-adwani-"
    },
    {
        id: "4",
        name: "Dr Ashish Suryawanshi",
        designation: "Consultant Orthopeadic Department",
        field: "Orthopedics, Joint Replacement, Trauma & Critical Care",
        exp: "20+ Years of Experience",
        image: DrAshishSuryawanshi,
        slug: "dr-ashish-suryawanshi"
    },
    {
        id: "14",
        name: "Dr. Bhatia Pallav",
        designation: "Consultant Spine Department",
        field: "Spine",
        exp: "18+ Years of Experience",
        image: Drbhatiapallav,
        slug: "dr-pallav-bhatia-"
    },
    {
        id: "11",
        name: "Dr. Bhushan Ganvir",
        designation: "Consultant Sports Medicine",
        field: "Sports Medicine , Orthopedics",
        exp: "15+ Years of Experience",
        image: BhushanGanvir,
        slug: "dr-bhushan-ganvir-"
    },
];


const fellowshipJointReplacementData = [
    {
        title: "Annexure A",
        pdf: "/pdfs/JointReplacement/AnnexureAJointReplacementSurgery.pdf",
    },
    {
        title: "Annexure B",
        pdf: "/pdfs/JointReplacement/AnnexureBJointReplacementSurgery.pdf",
    },
    {
        title: "Annexure C",
        pdf: "/pdfs/JointReplacement/AnnexureCJointReplacementSurgery.pdf",
    },
    {
        title: "Annexure D",
        pdf: "/pdfs/JointReplacement/AnnexureDJointReplacementSurgery.pdf",
    },
    {
        title: "Annexure E",
        pdf: "/pdfs/JointReplacement/AnnexureEJointReplacementSurgery.pdf",
    },
    {
        title: "Annexure F",
        pdf: "/pdfs/JointReplacement/AnnexureFJointReplacementSurgery.pdf",
    },
    {
        title: "Annexure G",
        pdf: "/pdfs/JointReplacement/AnnexureGJointReplacementSurgery.pdf",
    },
    {
        title: "Annexure H",
        pdf: "/pdfs/JointReplacement/AnnexureHJointReplacementSurgery.pdf",
    },
];

const fellowshipOthroTraumaData = [
    {
        title: "Annexure A",
        pdf: "/pdfs/OrthoTrauma/Annexure A Orthopaedic Trauma.pdf",
    },
    {
        title: "Annexure B",
        pdf: "/pdfs/OrthoTrauma/Annexure B Orthopaedic Trauma.pdf",
    },
    {
        title: "Annexure C",
        pdf: "/pdfs/OrthoTrauma/Annexure C Orthopaedic Trauma.pdf",
    },
    {
        title: "Annexure D",
        pdf: "/pdfs/OrthoTrauma/Annexure D Orthopaedic Trauma.pdf",
    },
    {
        title: "Annexure E",
        pdf: "/pdfs/OrthoTrauma/Annexure E Orthopaedic Trauma.pdf",
    },
    {
        title: "Annexure F",
        pdf: "/pdfs/OrthoTrauma/Annexure F Orthopaedic Trauma.pdf",
    },
    {
        title: "Annexure G",
        pdf: "/pdfs/OrthoTrauma/Annexure G Orthopaedic Trauma.pdf",
    },
    {
        title: "Annexure H",
        pdf: "/pdfs/OrthoTrauma/Annexure H Orthopaedic Trauma.pdf",
    },
];

const fellowshipEmergencyMedicalData = [
    {
        title: "Annexure A",
        pdf: "/pdfs/EmergencyMedical/Annexure A Emergency Medical  Trauma Care.pdf",
    },
    {
        title: "Annexure B",
        pdf: "/pdfs/EmergencyMedical/Annexure B Emergency Medical  Trauma Care.pdf",
    },
    {
        title: "Annexure C",
        pdf: "/pdfs/EmergencyMedical/Annexure C Emergency Medical  Trauma Care.pdf",
    },
    {
        title: "Annexure D",
        pdf: "/pdfs/EmergencyMedical/Annexure D Emergency Medical  Trauma Care.pdf",
    },
    {
        title: "Annexure E",
        pdf: "/pdfs/EmergencyMedical/Annexure E Emergency Medical  Trauma Care.pdf",
    },
    {
        title: "Annexure F",
        pdf: "/pdfs/EmergencyMedical/Annexure F Emergency Medical  Trauma Care.pdf",
    },
    {
        title: "Annexure G",
        pdf: "/pdfs/EmergencyMedical/Annexure G Emergency Medical  Trauma Care.pdf",
    },
    {
        title: "Annexure H",
        pdf: "/pdfs/EmergencyMedical/Annexure H Emergency Medical  Trauma Care.pdf",
    },
];

const jobPositionOptions = Job_positions.map((job) => ({
    value: job.title,
    label: job.title,
}));
const Academics = () => {
    return (
        <>
            <Head>
                <title>Lokmanya Hospitals Academics</title>
            </Head>
            <CommonBanner bgColor={"#54BE95"} image={AcademicsBnr.src}>
                <div>
                    <h1 className="page-heading text-white mb-md-2 mb-2 text-md-start text-center">LOKMANYA HOSPITALS ACADEMICS</h1>
                    <p className='text-md-start text-center'>At Lokmanya Hospitals, your skills and passion for healthcare contribute to our mission of providing innovative, exceptional patient care. Our academic programs offer hands-on experience and expert mentorship. Join us and take the first step towards a rewarding career in healthcare.</p>
                </div>
            </CommonBanner>
            <section className="section-space side-space pb-0 mb-md-5 mb-4">
                <h2 className="section-heading text-start">Post Graduate Medical Courses under NBEMS</h2>
                <div className="table-outer">
                    <table className="table academics-table positions-table">
                        <thead>
                            <tr>
                                <th scope="col">Course Name</th>
                                <th scope="col">Duration</th>
                                <th scope="col">No. Of Seats</th>
                                <th scope="col">Faculty</th>
                            </tr>
                        </thead>
                        <tbody>
                            {JobpostGraduateMedicalCourses.map((course, index) => (
                                <tr key={index}>
                                    <td scope="row">{course.name}</td>
                                    <td>{course.duration}</td>
                                    <td className="text-start">{course.seats}</td>
                                    <td className="text-start">
                                        <ul className="mb-0 ps-3">
                                            {course.faculty.map((facultyName, i) => (
                                                <li key={i}>{facultyName}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="section-space side-space pb-0 mb-md-5 mb-4">
                <h2 className="section-heading text-start">MUHS Fellowship Courses and Eligibility</h2>
                <div className="table-outer">
                    <table className="table academics-table positions-table">
                        <thead>
                            <tr>
                                <th scope="col">Course code and name</th>
                                <th scope="col">Eligibility criteria</th>
                                <th scope="col">Seats</th>
                                <th scope="col">Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Job_positions.map((position, index) => (
                                <tr key={index}>
                                    <td scope="row">{position.title}</td>
                                    <td>{position.criteria}</td>
                                    <td className=' text-md-center text-start'>{position.seats}</td>
                                    <td className=' text-md-center text-start'>{position.duration}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
            <section className='section-space side-space meet-expert'>
                <h2 className="section-heading text-center text-capitalize mb-3">Course Mentor</h2>
                <div className="position-relative">
                    <div className="swiper-btn-prev" id="doc-prev">
                        <Image width={15} height={15} src={ArrowLeft.src} alt="arrow-left" />
                    </div>
                    <div className="swiper-btn-next" id="doc-next">
                        <Image width={15} height={15} src={ArrowRight.src} alt="arrow-right" />
                    </div>

                    <Swiper
                        modules={[Autoplay, Keyboard, Navigation]}
                        spaceBetween={25}
                        slidesPerView={3}
                        navigation={{
                            prevEl: "#doc-prev",
                            nextEl: "#doc-next",
                        }}
                        breakpoints={{
                            0: { slidesPerView: 1, spaceBetween: 10 },
                            550: { slidesPerView: 1, spaceBetween: 10 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                            1200: { slidesPerView: 3 },
                        }}
                    >
                        {defaultDoctors.map((doc, index) => (
                            <SwiperSlide key={index}>
                                <div className="docCard">
                                    <div className="docCard-inner">
                                        <div className="docImg find-doc-new">
                                            <div className="prof-svg-1">
                                                <Image width={100} height={100} alt="SVG Icon 1" src={Profilesvg1.src} />
                                            </div>
                                            <div className="prof-svg-2 find-doc-new">
                                                <Image width={100} height={100} alt="SVG Icon 2" src={Profilesvg2.src} />
                                            </div>
                                            <Image width={100} height={100}
                                                src={doc.image?.src || PlaceholderImg.src}
                                                alt={doc.name || "Doctor image"}
                                            />
                                        </div>
                                        <div className="content">
                                            <h4>
                                                {doc.name
                                                    .toLowerCase()
                                                    .replace(/\b\w/g, (char) => char.toUpperCase())}
                                            </h4>
                                            <p>{doc.designation}</p>
                                            <p>{doc.field}</p>
                                            <div className="innerContent">
                                                {doc.exp ? (
                                                    <>
                                                        <Image width={24} height={24}
                                                            loading="lazy"
                                                            src={docBag.src}
                                                            alt="experience icon"
                                                        />
                                                        <p className="mb-0">{doc.exp}</p>
                                                    </>
                                                ) : (
                                                    <p className="mb-0">No experience info</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="btnDiv">
                                        <ButtonPrimary isLink to={`/doctors/${doc.slug}`}>
                                            Read More
                                        </ButtonPrimary>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>
            <section className="section-space side-space pt-0">
                <h2 className="section-heading text-center text-capitalize mb-3">
                    MUHS Fellowship
                </h2>
                <div className='mb-md-5 mb-4'>
                    <h3 className='mb-3'>Fellowship course - Joint Replacement Surgery</h3>
                    <div className="row g-md-4 g-3">
                        {fellowshipJointReplacementData.map((item, index) => (
                            <div className="col-xl-3 col-lg-4 col-6" key={index}>
                                <a
                                    href={item.pdf}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="d-flex align-items-center gap-2 text-decoration-none pdf-academics-link"
                                >
                                    <PdfIcon width={50} height={50} />
                                    <p className="mb-0">{item.title}</p>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='mb-md-5 mb-4'>
                    <h3 className='mb-md-4 mb-3'>Fellowship course - Orthopaedic Trauma</h3>
                    <div className="row g-md-4 g-3">
                        {fellowshipOthroTraumaData.map((item, index) => (
                            <div className="col-xl-3 col-lg-4 col-6" key={index}>
                                <a
                                    href={item.pdf}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="d-flex align-items-center gap-2 text-decoration-none pdf-academics-link"
                                >
                                    <PdfIcon width={50} height={50} />
                                    <p className="mb-0">{item.title}</p>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
                <div className=''>
                    <h3 className='mb-md-4 mb-3'>Fellowship course - Emergency Medical and Trauma Care</h3>
                    <div className="row g-md-4 g-3">
                        {fellowshipEmergencyMedicalData.map((item, index) => (
                            <div className="col-xl-3 col-lg-4 col-6" key={index}>
                                <a
                                    href={item.pdf}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="d-flex align-items-center gap-2 text-decoration-none pdf-academics-link"
                                >
                                    <PdfIcon width={50} height={50} />
                                    <p className="mb-0">{item.title}</p>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className='section-space pt-0 side-space'>
                <div className='row g-3'>
                    <div className='col-lg-12 col-12'>
                        <h2 className="section-heading text-start text-capitalize mb-2">Contact Details :</h2>
                        <h4 className=''>Email Id : <a className='fw-light academics-link' href='mailto:academics.lokmanya@lokmanyahospitals.com'>academics.lokmanya@lokmanyahospitals.com</a></h4>
                    </div>
                    {/* <div className="col-lg-6 col-12">
                        <h2 className="section-heading text-start text-capitalize mb-3">Course Director :</h2>
                        <div className="video-insight-box">
                            <div className="video-insight-img">
                                <img
                                    src="/images/doctors/NarendraVaidyaSir.png"
                                    crossOrigin="anonymous"
                                    alt="Dr. Narendra Vaidya"
                                />
                            </div>
                            <div className="video-insight-ctnt">
                                <h3 className='text-center text-lg-start'>Dr. Narendra Vaidya</h3>
                                <p className='text-center text-lg-start'>Chairman</p>
                                <div className="d-flex align-items-center justify-content-lg-start justify-content-center gap-3">
                                    <Link href={`/narendra-vaidya`} className="button-primary btn-white"><span>Read More</span></Link>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    {/* <div className='col-lg-6 col-12'>
                        <h2 className="section-heading text-start text-capitalize mb-md-4 mb-3">Apply for this course</h2>
                        <AcademicsForm jobPositionOptions={jobPositionOptions} />
                    </div> */}
                </div>
            </section>
        </>
    )
}

export default Academics