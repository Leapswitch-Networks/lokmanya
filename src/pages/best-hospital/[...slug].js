import React, { useState, useEffect, useRef, useCallback } from 'react';
import '@/styles/HospitalNearMe.css';
import HeroBanner from '../../site/components/banner/HeroBanner';
import HospitalCounterSection from '../../site/components/HospitalCounterSection/HospitalCounterSection';

// import { ReactComponent as BatchIcon } from '../site/assets/images/New-theme/icons/batchicon.svg';
import PersonPlus from '../../site/assets/images/New-theme/icons/personplus.svg';
import BookCallSection from '../../site/components/BookCallnowSection/BookCallSection';
import AppointmentModal from '../../site/components/AppointmentModal';
import WhenConsultSection from '../../site/components/WhenConsultSection/WhenConsultSection';

import ArrowLeft from "../../site/assets/images/icons/Arrow-left-blu.svg";
import ArrowRight from "../../site/assets/images/icons/Arrow-right-blu.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Navigation, Pagination } from "swiper/modules";

import NarendraV from "../../site/assets/images/findAdoctor/Narendra Vaidya.webp";
import DrSuprashant from "../../site/assets/images/findAdoctor/DrSuprashnat.jpeg";
import DrShailendra from "../../site/assets/images/findAdoctor/Dr.Shailendra.JPG";
import docBag from "../../site/assets/images/findAdoctor/doctors-bag.svg";
import PlaceholderImg from "../../site/assets/images/Dr-placeholder-img.webp";

import FaqSection from '../../site/components/FaqSection/FaqSection';
import DocAppointmentModal from '../../site/components/DocAppointmentModal';
import { ButtonPrimary, CustomCarousel } from '../../site/components';

import { hospitalCounterData } from '../../static-data';
import BlogComponent from '../../site/components/BlogComponent/BlogComponent';

// import axiosConfig from "../../utils/axiosConfig";
import { errorToast, successToast } from '../../utils/Toast';
import QuestionAnsweredSection from '../../site/components/QuestionAnsweredSection';
import BenifitTable from '../../site/components/BenifitTable';
import ExperienceExcellence from '../../site/components/ExperienceExceptional';
import CompCareSection from '../../site/components/CompCareSection';
import Head from 'next/head';
import Link from 'next/link';
import MainSuccessStor from '@/site/components/MainSuccessStor';
import Image from 'next/image';
import { getBestHospitalHyperlocalSingleFrontend } from '@/ApiActions/Admin/hyperlocaladmin/hyperlocal';
import { useRouter } from 'next/router';
import { doctorsListFrontend, storeLeadInfo } from '@/ApiActions/CommonApi';
import Select from 'react-select';
import { replacePlaceholders } from '../../site/components/replacePlaceholders';
import debounce from 'lodash.debounce';
import { createLead, updateLead } from "@/ApiActions/CommonApi";
// const bannerSlides = [
//     {
//         desktop: 'http://localhost:3000/uploads/hyperlocal/1752490810349-Webbanner_v3-01.webp',
//         mobile: 'http://localhost:3000/uploads/hyperlocal/1752490810349-Webbanner_v3-01.webp',
//     },
// ];



const ourServicesData = [
    {
        img: '/images/new-theme/Newpages/HospitalNearme/hosp-our-servc-1.webp',
        title: 'Coronary Artery Bypass Grafting (CABG)',
        description: 'We perform CABG to restore blood flow to the heart by bypassing blocked arteries.'
    },
    {
        img: '/images/new-theme/Newpages/HospitalNearme/hosp-our-servc-2.webp',
        title: 'Heart Valve Surgery',
        description: 'Repair or replacement of damaged heart valves to improve blood flow and overall heart function.'
    },
    {
        img: '/images/new-theme/Newpages/HospitalNearme/hosp-our-servc-3.webp',
        title: 'Minimally Invasive Cardiac Surgery',
        description: 'Advanced techniques to perform surgeries with smaller incisions, resulting in faster recovery and less discomfort.'
    },
    {
        img: '/images/new-theme/Newpages/HospitalNearme/hosp-our-servc-4.webp',
        title: 'Aortic Surgery',
        description: 'Treatment of conditions affecting the aorta, including aneurysms and dissections, to prevent life-threatening complications.'
    },
    {
        img: '/images/new-theme/Newpages/HospitalNearme/hosp-our-servc-5.webp',
        title: 'Pediatric Cardiac Surgery',
        description: 'Specialized care for children with congenital heart defects, offering corrective surgeries for long-term health.'
    },
    {
        img: '/images/new-theme/Newpages/HospitalNearme/hosp-our-servc-6.webp',
        title: 'Pacemaker and ICD Implantation',
        description: 'Implantation of devices to regulate heart rhythm and prevent life-threatening arrhythmias.'
    },
    {
        img: '/images/new-theme/Newpages/HospitalNearme/hosp-our-servc-7.webp',
        title: 'Heart Transplant',
        description: 'Comprehensive care for end-stage heart failure patients, including heart transplantation and post-operative management.'
    },
    {
        img: '/images/new-theme/Newpages/HospitalNearme/hosp-our-servc-8.webp',
        title: 'Congenital Heart Defect Surgery',
        description: 'Correction of structural abnormalities in the heart present from birth, improving function and quality of life.'
    },
]

const consultationData = {
    title: "When To Consult ?",
    items: [
        {
            title: "Chest Pain or Discomfort",
            description: "Recurring chest pain could indicate a heart condition requiring immediate evaluation.",
            image: '/images/new-theme/Newpages/HospitalNearme/when-consult-1.png',
        },
        {
            title: "Shortness of Breath",
            description: "Difficulty breathing, especially during physical activity, can signal heart problems.",
            image: '/images/new-theme/Newpages/HospitalNearme/when-consult-2.png',
        },
        {
            title: "Irregular Heartbeats",
            description: "Persistent arrhythmias or palpitations may need surgical intervention.",
            image: '/images/new-theme/Newpages/HospitalNearme/when-consult-3.png',
        },
        {
            title: "Fatigue and Weakness",
            description: "Unexplained fatigue might be linked to poor heart function.",
            image: '/images/new-theme/Newpages/HospitalNearme/when-consult-4.png',
        },
        {
            title: "Dizziness or Fainting",
            description: "Frequent dizziness or fainting spells should be evaluated for potential heart issues.",
            image: '/images/new-theme/Newpages/HospitalNearme/when-consult-5.png',
        },
        {
            title: "Swelling in Legs or Feet",
            description: "Edema can be a sign of heart failure or valve disease.",
            image: '/images/new-theme/Newpages/HospitalNearme/when-consult-6.png',
        }
    ]
};

const conditionsData = {
    image: "/images/new-theme/Newpages/HospitalNearme/hosp-conditions-treat-heart.png",
    conditions: [
        "Coronary Artery Disease",
        "Congenital Heart Defects",
        "Heart Failure",
        "Arrhythmias",
        "Pericarditis",
        "Heart Valve Disorders",
        "Heart Failure",
        "Aortic Aneurysms",
        "Cardiomyopathy",
        "Endocarditis"
    ]
};



const doctors = [
    { name: "Dr. Narendra Vaidya", designation: "Consultant Orthopeadic Department", field: "Orthopedics, Joint Replacement, Spine, Sports Medicine", exp: "30+ Years of Experience", image: NarendraV },
    { name: "Dr. Suprashant kulkarni", designation: "Consultant General Surgery Department", field: "General Surgery", exp: "25+ Years of Experience", image: DrSuprashant },
    { name: "Dr. Bhatia Pallav", designation: "Consultant Spine Department", field: "Spine", exp: "18+ Years of Experience", image: "" },
    { name: "Dr. Shailendra Date", designation: "Consultant Internal Medicine", field: "Internal Medicine", exp: "30+ Years of Experience", image: DrShailendra },
]

const worldFacData = [
    {
        img: '/images/new-theme/Newpages/HospitalNearme/wrld-cls-1.webp',
        title: 'Advanced operation theaters',
    },
    {
        img: '/images/new-theme/Newpages/HospitalNearme/wrld-cls-2.webp',
        title: 'Comfortable inpatient rooms',
    },
    {
        img: '/images/new-theme/Newpages/HospitalNearme/wrld-cls-3.webp',
        title: 'Modern diagnostic labs',
    },
    {
        img: '/images/new-theme/Newpages/HospitalNearme/wrld-cls-1.webp',
        title: 'Advanced operation theaters',
    },
    {
        img: '/images/new-theme/Newpages/HospitalNearme/wrld-cls-2.webp',
        title: 'Comfortable inpatient rooms',
    },
]

const blogsData = [
    {
        image: "/images/BlogImg-1.webp",
        category: "Orthopedics",
        date: "17 Apr, 2025",
        title: "Robotic Knee Replacement Surgery",
        link: "/blogs/robotic-knee-replacement-surgery",
    },
    {
        image: "/images/BlogImg-2.webp",
        category: "Orthopedics",
        date: "16 Apr, 2025",
        title: "Knee Replacement Surgery: Procedure, Types And Risks",
        link: "/blogs/knee-replacement-surgery-procedure-types-and-risks",
    },
    {
        image: "/images/BlogImg-3.webp",
        category: "Orthopedics",
        date: "15 Apr, 2025",
        title: "Hip Surgery Cost In Pune, India",
        link: "/blogs/hip-surgery-cost-in-pune-india",
    },
    {
        image: "/images/BlogImg-4.webp",
        category: "Orthopedics",
        date: "15 Apr, 2025",
        title: "Knee Transplant Cost In Pune, India",
        link: "/blogs/knee-transplant-cost-in-pune-india",
    },
    // Add more objects as needed
];

const comparisonData = [
    {
        benefit: "Highly Experienced Specialists",
        lokmanya: true,
        others: false,
    },
    {
        benefit: "Patient Comfort",
        lokmanya: true,
        others: false,
    },
    {
        benefit: "Collaborations with International Experts",
        lokmanya: true,
        others: false,
    },
    {
        benefit: "Pioneering Robotic Surgery and Technology",
        lokmanya: true,
        others: false,
    },
    {
        benefit: "Seamless Insurance and Payment Options",
        lokmanya: true,
        others: false,
    },
    {
        benefit: "Emergency Care 24/7",
        lokmanya: true,
        others: false,
    },
];

const ExpExcdata = {
    heading: "Experience Exceptional Healthcare at Lokmanya Hospitals",
    content: [
        {
            id: 1,
            position: "left",
            className: "exp-exc-left-one-ctnt",
            title: "A Complete Spectrum of Care",
            text: "The hospital offers a comprehensive range of specialties, ensuring that patients benefit from a unified treatment plan, with seamless coordination among specialists for complex conditions.",
            icon: "/images/new-theme/Newpages/DrSpecialist/exp-exc-icon-1.svg"
        },
        {
            id: 2,
            position: "left",
            className: "exp-exc-left-two-ctnt",
            title: "Elite Healthcare Infrastructure",
            text: "Our state-of-the-art facilities and advanced medical equipment enable precise diagnostics and innovative treatments, ensuring better outcomes for patients.",
            icon: "/images/new-theme/Newpages/DrSpecialist/exp-exc-icon-1.svg"
        },
        {
            id: 3,
            position: "left",
            className: "exp-exc-left-three-ctnt",
            title: "Accomplished Specialists",
            text: "A team of renowned doctors and surgeons with expertise in their respective fields ensures the best medical outcomes.",
            icon: "/images/new-theme/Newpages/DrSpecialist/exp-exc-icon-1.svg"
        },
        {
            id: 4,
            position: "right",
            className: "exp-exc-right-one-ctnt",
            title: "Your Health, Our Expert Insight",
            text: "Patients at Lokmanya Hospital have the option to seek a second opinion from a wide array of medical experts, ensuring confidence and clarity in their treatment decisions.",
            icon: "/images/new-theme/Newpages/DrSpecialist/exp-exc-icon-1.svg"
        },
        {
            id: 5,
            position: "right",
            className: "exp-exc-right-two-ctnt",
            title: " Round-the-Clock Emergency Services",
            text: "With a dedicated emergency department operational 24/7, Lokmanya Hospital ensures that critical care is always available, regardless of the time of day or night.",
            icon: "/images/new-theme/Newpages/DrSpecialist/exp-exc-icon-1.svg"
        },
        {
            id: 6,
            position: "right",
            className: "exp-exc-right-three-ctnt",
            title: "Awarded Healthcare Credentials",
            text: "The hospital holds various national and international accreditations, affirming its commitment to maintaining high medical and ethical standards in patient care.",
            icon: "/images/new-theme/Newpages/DrSpecialist/exp-exc-icon-1.svg"
        }
    ],
    middleImage: [
        { img: "/images/new-theme/Newpages/DrSpecialist/exp-exc-img.png" },
    ],
    middleIcons: [
        { className: "top-left-one-exp", icon: "/images/new-theme/Newpages/DrSpecialist/exp-exc-icon-1.svg" },
        { className: "top-left-two-exp", icon: "/images/new-theme/Newpages/DrSpecialist/exp-exc-icon-1.svg" },
        { className: "top-left-three-exp", icon: "/images/new-theme/Newpages/DrSpecialist/exp-exc-icon-1.svg" },
        { className: "top-right-one-exp", icon: "/images/new-theme/Newpages/DrSpecialist/exp-exc-icon-1.svg" },
        { className: "top-right-two-exp", icon: "/images/new-theme/Newpages/DrSpecialist/exp-exc-icon-1.svg" },
        { className: "top-right-three-exp", icon: "/images/new-theme/Newpages/DrSpecialist/exp-exc-icon-1.svg" }
    ]
};

const HospitalNearMe = () => {
    const baseUrl = process.env.NEXT_PUBLIC_FILE_BASE_URL;
    const [hospitalData, setData] = useState([]);
    const [matchedArea, setMatchedArea] = useState(null);
    const [isbookModalOpen, setIsbookModalOpen] = useState(false);
    const handlebookModalOpen = () => setIsbookModalOpen(true);
    const handlebookModalClose = () => setIsbookModalOpen(false);
    const [leadId, setLeadId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentDoctorName, setCurrentDoctorName] = useState('');
    const [currentDoctorLocation, setCurrentDoctorLocation] = useState('');
    const handleModalOpen = (doctorName, doctorLocation) => {
        // console.log("Doctor name:", doctorName);  // For debugging
        setCurrentDoctorName(doctorName);         // Use actual name
        setCurrentDoctorLocation(doctorLocation);
        setIsModalOpen(true);
    };
    const handleModalClose = () => setIsModalOpen(false);
    const router = useRouter();
    const { slug = [] } = router.query;


    const [doctorlist, setDoctors] = useState([]);

    const fetchDoctors = useCallback(async () => {
        try {
            const response = await doctorsListFrontend();
            // Assuming response.data contains the list of doctors
            setDoctors(response?.data || []);
        } catch (err) {
            setErrors("Failed to fetch doctors. Please try again later.");
        }
    }, []);

    const [progressiveData, setProgressiveData] = useState({
        fullName: "",
        phoneNumber: "",
        city: "",
        formtype: "",
        doctor: ""
    });
    const formtype = "hyperlocal";
    const saveProgressiveLead = async (fieldName, value) => {
        try {
            const keyMap = {
                fullName: "patientName",
                phoneNumber: "mobileNumber",
                city: "areaId",
                doctor: "doctorName",
            };

            const updatedData = {
                ...progressiveData,
                [keyMap[fieldName]]: value,
                formtype,
            };

            setProgressiveData(updatedData);


            if (!leadId && fieldName == "fullName" && value.trim().length >= 3) {
                const response = await createLead(updatedData);

                if (response?.status === 201) {
                    setLeadId(response.data.id);
                }
            } else if (leadId) {
                await updateLead({ id: leadId, ...updatedData, });
            }
        } catch (err) {
            console.error("Progressive save error", err);
        }
    };


    // ✅ Hamesha yahan rakho, koi condition ke andar nahi
    const debouncedSaveProgressiveLead = useCallback(
        debounce((fieldName, value) => {
            saveProgressiveLead(fieldName, value);
        }, 800),
        [progressiveData, leadId]
    );

    // const area = router.asPath.split('/').pop().split('-').pop();
    const area = matchedArea?.masterName;

    useEffect(() => {

        if (!slug.length) return;

        const fullSlug = Array.isArray(slug) ? slug.join('/') : slug;

        const fetchAreas = async () => {
            try {
                const response = await getBestHospitalHyperlocalSingleFrontend(fullSlug);
                if (!response?.data) {
                    // No data found, go to 404
                    router.replace('/404');
                    return;
                }


                setData(response.data.data.hyperlocal); // Set areas
                setMatchedArea(response.data.data.matchedArea); // Set areas
            } catch (error) {
                console.error("Failed to fetch locations", error.StatusCode);
            }
        };
        fetchAreas();
        fetchDoctors();
    }, [slug]);

    // Book Appointment Form
    const leadslug = Array.isArray(slug) ? slug.join('/') : slug;

    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        doctor: '',
        city: '',
        formtype: 'hyperlocal',
        slug: leadslug
    });

    const [errors, setErrors] = useState({
        fullName: '',
        phoneNumber: '',
        doctor: '',
        city: ''
    });

    const [formSubmitted, setFormSubmitted] = useState(false);

    const validateFullName = (name) => {
        const nameRegex = /^[a-zA-Z\s]+$/; // Only letters and spaces
        return nameRegex.test(name);
    };

    const validatePhoneNumber = (phone) => {
        const phoneRegex = /^[0-9]{10}$/; // Only 10 digit phone numbers
        return phoneRegex.test(phone);
    };

    const validateCity = (city) => {
        return city.trim().length > 0; // City should not be empty
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        debouncedSaveProgressiveLead(name, value);
    };
    const resetForm = () => {
        setFormData({
            fullName: '',
            phoneNumber: '',
            doctor: '',
            city: ''
        });
        setErrors({});
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        let valid = true;
        const newErrors = {};

        // Validate Full Name
        if (!validateFullName(formData.fullName)) {
            valid = false;
            newErrors.fullName = 'Full Name should only contain letters and spaces.';
        }

        // Validate Phone Number
        if (!validatePhoneNumber(formData.phoneNumber)) {
            valid = false;
            newErrors.phoneNumber = 'Phone number should be 10 digits.';
        }

        // Validate Doctor Selection
        if (!formData.doctor) {
            valid = false;
            newErrors.doctor = 'Please select a doctor.';
        }

        // Validate City
        if (!validateCity(formData.city)) {
            valid = false;
            newErrors.city = 'City is required.';
        }

        setErrors(newErrors);

        if (valid) {
            const payload = {
                patientName: formData.fullName,
                mobileNumber: formData.phoneNumber,
                doctorId: formData.doctor,
                location: formData.city,
                formtype: 'hyperlocal',
                slug: leadslug,
                leadId: leadId
            };

            try {

                const response = await storeLeadInfo(payload, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.status === 201) {
                    successToast("Appointment booked successfully!");
                    setFormSubmitted(false);
                    resetForm();
                }
            } catch (error) {
                console.error("Form submission error:", error);
                errorToast("Something went wrong. Please try again.");
            }
        }
    };

    // Swiper For world fac
    const [showNav, setShowNav] = useState(true);
    const swiperRef = useRef(null);

    useEffect(() => {
        // Hide navigation if slides are less than or equal to the largest slidesPerView
        const maxSlidesVisible = 4;
        if (worldFacData.length <= maxSlidesVisible) {
            setShowNav(false);
        }
    }, [worldFacData]);

    const bannerSlides = [
        {
            desktop: `${process.env.NEXT_PUBLIC_FILE_BASE_URL}/${hospitalData?.featured_image?.replace(/\\/g, '/') || ''}`,
            mobile: `${process.env.NEXT_PUBLIC_FILE_BASE_URL}/${hospitalData?.featured_images_mobile?.replace(/\\/g, '/') || ''}`,
            onClick: handlebookModalOpen,
            // link: `/hyperlocal/best-hospital/${data?.slug || ''}`,
        }
    ];

    const updatedDescription = replacePlaceholders(hospitalData.description, { area });




    return (
        <>

            <Head>
                <title>{replacePlaceholders(hospitalData?.metaTitle, { area }) || ' Title'}</title>
                <meta name="description" content={replacePlaceholders(hospitalData?.metaDescription, { area }) || ' Description'} />
            </Head>
            <HeroBanner slides={bannerSlides} />
            <section className='side-space section-space'>
                <HospitalCounterSection data={hospitalCounterData} />
            </section>
            <section className='hosp-ovw-section side-space section-space pt-0'>
                {/* <h2 className='page-heading text-start mb-md-3 mb-3'>Lokmanya : Cardiology Care for a Better You</h2> */}
                <div
                    className="mb-0 html-content"
                    dangerouslySetInnerHTML={{ __html: updatedDescription }}
                ></div>
            </section>
            {hospitalData?.TreatmentProcedures?.length > 0 && (
                <section className='side-space'>
                    <h2 className='page-heading text-start mb-md-3 mb-3'>
                        {/* {hospitalData.treatmentHeading} */}
                        {replacePlaceholders(hospitalData.treatmentHeading, { area })}
                    </h2>

                    <QuestionAnsweredSection
                        activeTabtab="treatmentProcedure"
                        combinedProcedures={
                            Array.isArray(hospitalData.TreatmentProcedures)
                                ? hospitalData.TreatmentProcedures.map(item => ({
                                    ...item,
                                    question: replacePlaceholders(item.question, { area }),
                                    description: replacePlaceholders(item.description, { area }),
                                }))
                                : []
                        }
                    />
                </section>
            )}
            <section className='side-space section-space'>
                <h2 className='page-heading text-center mb-md-3 mb-2'>What Sets Lokmanya Hospitals Apart?</h2>
                <BenifitTable data={comparisonData} />
            </section>
            <section className='book-call-section side-space section-space pt-0'>
                <BookCallSection
                    btn1Class="hyp-best-hosp-meet-spec-bookap"
                    btn2Class="hyp-best-hosp-meet-spec-callus"
                    title="Cardiology Expertise : Meet Our Specialized Doctors"
                    subtitle="Take a step toward a healthier heart with the trusted specialists at our cardiology hospital in Pune, delivering personalized care for every heartbeat."
                    primaryText="Book Your Appointment"
                    secondaryText="Call Us Today"
                    imageUrl="/images/new-theme/Newpages/HospitalNearme/hosp-book-call.webp"
                    onPrimaryClick={handlebookModalOpen}
                    onSecondaryClick={() => window.location.href = 'tel:+919307076767'}
                />

                <AppointmentModal isModalOpen={isbookModalOpen} handleModalClose={handlebookModalClose} />
            </section>
            <section className='side-space section-space exp-exc-section'>
                <h2 className='page-heading text-center mb-md-3 mb-2'>{ExpExcdata.heading}</h2>
                <ExperienceExcellence data={ExpExcdata} />
            </section>
            {Array.isArray(hospitalData?.HyperlocalBenifits) && hospitalData.HyperlocalBenifits.length > 0 && (
                <section className='hospital-choose-bnft side-space section-space'>
                    <h2 className="page-heading text-start text-md-center mb-md-3 mb-2">
                        Your Health, Our Priority : Benefits Of Choosing Lokmanya Hospitals
                    </h2>
                    <div className='row g-md-4 g-3'>
                        {hospitalData.HyperlocalBenifits.map((benefit, index) => (
                            <div className='col-xl-4 col-lg-6 col-md-6 col-sm-12' key={index}>
                                <div className='hospital-choose-bnft-card'>
                                    <div className='d-flex align-items-center gap-3 mb-2'>
                                        <img
                                            width={52}
                                            height={52}
                                            // src={
                                            //     benefit.benifitImage
                                            //         ? benefit.benifitImage
                                            //         : '@/assets/images/icons/placeholder-icon.svg'
                                            // }
                                            src='/images/hospital-dummy.png'
                                            alt={benefit.benifitTitle || 'Benefit Icon'}
                                        />
                                        {/* <h4 className='mb-0'>{benefit.benifitTitle}</h4> */}
                                        <h4 className='mb-0'>{replacePlaceholders(benefit.benifitTitle, { area })}</h4>
                                    </div>
                                    {/* <p className='mb-0'>{benefit.benifitDescription}</p> */}
                                    <p className='mb-0'>{replacePlaceholders(benefit.benifitDescription, { area })}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <section className='hospital-why-choose-us side-space section-space d-none'>
                <h2 className='page-heading text-start mb-md-3 mb-3 d-md-none d-flex'>Why Choose Lokmanya Hospitals for Cardiac Surgery?</h2>
                <div className='row align-items-center'>
                    <div className="col-xl-6 col-lg-7 mb-lg-0 mb-4">
                        <div className='hospital-why-choose-us-img'>
                            <Image width={600} height={415} src="/images/new-theme/Newpages/HospitalNearme/hosp-why-choose-us.png" alt="" />
                            {/* <div className='hospital-why-choose-img-overlay'>
                                <div className='hospital-why-choose-img-overlay-content d-flex gap-2 align-items-center'>
                                    <BatchIcon />
                                    <p className='mb-0'>Best Cardiac Hospitals of the year 2024</p>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className='col-xl-6 col-lg-5'>
                        <h2 className='page-heading text-start mb-md-3 mb-3 d-md-flex d-none'>Why Choose Lokmanya Hospitals for Cardiac Surgery?</h2>
                        <h4>Comprehensive Cardiac Care</h4>
                        <p>We offer a wide range of surgical and non-surgical treatments to address all heart-related conditions.</p>
                        <h4>Experienced Cardiac Specialists</h4>
                        <p>Our team of renowned cardiac surgeons, anesthesiologists, and cardiologists brings decades of experience in managing complex heart conditions.</p>
                        <h4>Personalized Treatment Plans</h4>
                        <p>We create customized treatment plans tailored to your specific condition, lifestyle, and health goals.</p>
                        <h4>Affordable and Accessible Care</h4>
                        <p className='mb-0'>Lokmanya Hospitals is committed to providing world-class cardiac care at an affordable cost, ensuring accessibility for everyone.</p>
                    </div>
                </div>
            </section>
            <section className='hospital-conditions-treat side-space d-none'>
                <div className='hospital-conditions-treat-outer bg-color-image'>
                    <div className='row align-items-center justify-content-center'>
                        <div className="col-lg-9">
                            <div className='hospital-conditions-treat-content'>
                                <h2 className='page-heading text-start mb-md-3 mb-3 text-white'>Conditions We Treat</h2>
                                <ul className='hospital-conditions-treat-list'>
                                    {conditionsData.conditions.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-5 mt-lg-0 mt-3 d-md-flex d-none">
                            <div className='hospital-conditions-treat-img'>
                                <img src={conditionsData.image.src} alt="Heart Treatment" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='hospital-our-services side-space section-space d-none'>
                <h2 className='page-heading text-start mb-md-3 mb-3 text-md-center'>Our Cardiac Surgery Services</h2>
                <div className='row g-md-3 g-3'>
                    {
                        ourServicesData.map((service, index) => (
                            <div className='col-xl-3 col-lg-4 col-md-6' key={index}>
                                <div className='hospital-our-services-card'>
                                    <div className='hospital-our-services-card-img'>
                                        <img src={service.img.src} alt="" />
                                    </div>
                                    <div className='hospital-our-services-card-content'>
                                        <h4>{service.title}</h4>
                                        <p>{service.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </section>
            {/* {Array.isArray(hospitalData?.ComprehensiveCares) && hospitalData.ComprehensiveCares.length > 0 && (
                <section className="hosp-comprehensive-care position-relative">
                    <CompCareSection
                        data={{
                            title: hospitalData.comprehensiveHeading,
                            items: hospitalData.ComprehensiveCares.map((item) => ({
                                title: item.comprehensiveTitle,
                                description: item.comprehensiveDescription,
                                image: item.comprehensiveImage || '/assets/images/icons/placeholder-icon.svg', // fallback
                            })),
                        }}
                    />
                    <div className='d-flex justify-content-center mt-3 hosp-comprehensive-care-cta'>
                        <Link href="/doctors" className='btn-see-more'>Find A Doctor</Link>
                    </div>
                </section>
            )} */}
            {Array.isArray(hospitalData?.ComprehensiveCares) && hospitalData.ComprehensiveCares.length > 0 && (
                <section className="hosp-comprehensive-care position-relative">
                    <CompCareSection
                        data={{
                            title: replacePlaceholders(hospitalData.comprehensiveHeading, { area }),
                            items: hospitalData.ComprehensiveCares.map((item) => ({
                                title: replacePlaceholders(item.comprehensiveTitle, { area }),
                                description: replacePlaceholders(item.comprehensiveDescription, { area }),
                                image: item.comprehensiveImage || '/assets/images/icons/placeholder-icon.svg',
                            })),
                        }}
                    />
                    <div className='d-flex justify-content-center mt-3 hosp-comprehensive-care-cta'>
                        <Link href="/doctors" className='btn-see-more hyp-best-hosp-comp-care-finddoc'>Find A Doctor</Link>
                    </div>
                </section>
            )}


            <section className='hospital-wrld-facility side-space section-space'>
                <h2 className='page-heading text-center mb-md-3 mb-2'>World-Class Facilities</h2>
                <div className="position-relative">
                    {showNav && (
                        <>
                            <div className="swiper-btn-prev" id="wrld-prev">
                                <Image width={15} height={15} src={ArrowLeft.src} alt="arrow-left" />
                            </div>
                            <div className="swiper-btn-next" id="wrld-next">
                                <Image width={15} height={15} src={ArrowRight.src} alt="arrow-right" />
                            </div>
                        </>
                    )}

                    <Swiper
                        modules={[Autoplay, Keyboard, Navigation, Pagination]}
                        spaceBetween={25}
                        slidesPerView={4}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        navigation={showNav ? {
                            prevEl: "#wrld-prev",
                            nextEl: "#wrld-next",
                        } : false}
                        pagination={worldFacData.length > 4 ? { clickable: true } : false}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                            550: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            768: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                            1200: {
                                slidesPerView: 4,
                            },
                        }}
                    >
                        {worldFacData.map((data, index) => (
                            <SwiperSlide key={index}>
                                <div className='hospital-wrld-facility-card'>
                                    <div className='hospital-wrld-facility-card-img'>
                                        <Image width={260} height={200} src={data.img} alt="" />
                                    </div>
                                    <div className='hospital-wrld-facility-card-content'>
                                        <h4 className='mb-0 text-capitalize'>{data.title}</h4>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>
            <section className='book-call-section side-space section-space pt-0'>
                <BookCallSection
                    btn1Class="hyp-best-hosp-take-step-bookap"
                    btn2Class="hyp-best-hosp-take-step-callus"
                    title="Take the First Step Towards Better Health"
                    // subtitle="Take a step toward a healthier heart with the trusted specialists at our cardiology hospital in Pune, delivering personalized care for every heartbeat."
                    primaryText="Book Your Appointment"
                    secondaryText="Call Us Today"
                    imageUrl="/images/new-theme/Newpages/TakeFirststep.webp"
                    onPrimaryClick={handlebookModalOpen}
                    onSecondaryClick={() => window.location.href = 'tel:+919307076767'}
                />
                <AppointmentModal isModalOpen={isbookModalOpen} handleModalClose={handlebookModalClose} />
            </section>
            <section className='d-none'>
                <WhenConsultSection data={consultationData} />
            </section>
            {/* {hospitalData?.faqs &&
                JSON.parse(hospitalData.faqs).length > 0 && (
                    <section className='hospital-faq-section'>
                        <FaqSection data={JSON.parse(hospitalData.faqs)} />
                    </section>
                )} */}
            {hospitalData?.faqs && (() => {
                let parsedFaqs = [];
                try {
                    parsedFaqs = JSON.parse(hospitalData.faqs);
                } catch (e) {
                    console.error("Invalid FAQ JSON:", e);
                }

                return Array.isArray(parsedFaqs) && parsedFaqs.length > 0 ? (
                    <section className='hospital-faq-section'>
                        <FaqSection
                            data={parsedFaqs.map((faq) => ({
                                ...faq,
                                question: replacePlaceholders(faq.question, { area }),
                                answer: replacePlaceholders(faq.answer, { area }),
                            }))}
                        />
                    </section>
                ) : null;
            })()}

            <section className='side-space section-space pb-0 hosp-amb-section'>
                <div className='enquiry-meet-section'>
                    <div className='enquiry-meet-inner bg-color-image position-relative amb-sec'>
                        <div className='row w-100 g-0 align-items-center'>
                            <div className="col-xl-6 col-lg-6 col-md-12">
                                <div className='enquiry-meet-ctnt'>
                                    <h2 className='mb-md-3 mb-2 text-capitalize text-white'>24/7 Emergency Services</h2>
                                    <p className='text-white'>When every second counts, Lokmanya Hospital's 24/7 emergency services are just a call away!</p>
                                    <div className="d-flex gap-2 align-items-center">
                                        <img src="/images/new-theme/emergency-call-white.svg" style={{ width: "25px", height: "25px" }} alt="call in gradient" />
                                        <div className="">
                                            <p className='mb-1 text-uppercase text-white' style={{ opacity: "65%" }} >For Emergency/ Appointment</p>
                                            <a className="text-white enquiry-meet-link" href="tel:9307076767">93 0707 6767</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-8 justify-content-center mt-md-0 mt-3 d-lg-flex d-none'>
                                <div className='enquiry-meet-img'>
                                    <img src='/images/new-theme/Newpages/LokmanyaAmbulance.png' crossOrigin="anonymous" alt="meet" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="hosp-met-exprt side-space section-space meet-expert d-none">
                <h2 className="section-heading">Meet Our Cardiac Experts</h2>
                <div className="position-relative">
                    <div className="swiper-btn-prev" id="doc-prev">
                        <Image width={15} height={15} src={ArrowLeft.src} alt="arrow-left" />
                    </div>
                    <div className="swiper-btn-next" id="doc-next">
                        <Image width={15} height={15} src={ArrowRight.src} alt="arrow-right" />
                    </div>
                    <Swiper
                        modules={[Autoplay, Keyboard, Navigation, Pagination]}
                        spaceBetween={25}
                        slidesPerView={3}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        navigation={{
                            prevEl: "#doc-prev",
                            nextEl: "#doc-next",
                        }}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                            550: {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                            768: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 2,
                            },
                            1200: {
                                slidesPerView: 3,
                            },
                        }}
                    >
                        {doctors.map((doc, index) => (
                            <SwiperSlide key={index}>
                                <div className="docCard">
                                    <div className="docCard-inner">
                                        <div className="docImg">
                                            <img
                                                loading="lazy"
                                                src={doc.image ? doc.image : PlaceholderImg}
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
                                                {doc.exp === "" ? (
                                                    <p className="mb-0">{doc.exp}</p>
                                                ) : (
                                                    <>
                                                        <img loading="lazy" src={docBag} alt="bag" />
                                                        <p className="mb-0">{doc.exp}</p>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <ButtonPrimary onClick={() => handleModalOpen(doc.name, doc.hospital)}>
                                        Book An Appointment
                                    </ButtonPrimary>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>
            <DocAppointmentModal
                isModalOpen={isModalOpen}
                handleModalClose={handleModalClose}
                currentDoctorName={currentDoctorName}
                selectedHospital={currentDoctorLocation}
            />
            <MainSuccessStor />
            <BlogComponent data={blogsData} />
            <section className='enquiry-meet-section hypc-book-ap side-space section-space'>
                <div className='enquiry-meet-inner bg-color-image position-relative'>
                    <div className='row w-100 h-100 g-0'>
                        <div className='col-xl-6 col-lg-6 col-md-8 d-lg-flex d-none h-100'>
                            <div className='enquiry-meet-img'>
                                <img src='/images/new-theme/Newpages/HospitalNearme/hosp-bookform-img.png' alt="Appointment Form" />
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 narendra-form">
                            <div id="appointment" className="">
                                <h3 className="text-center text-white mb-4">Book An Appointment</h3>
                                <form className="row g-3" onSubmit={handleSubmit}>
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="Full Name*"
                                            required
                                        />
                                        {errors.fullName && (
                                            <span className="error" style={{ color: 'red' }}>
                                                {errors.fullName}
                                            </span>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <input
                                            type="tel"
                                            className="form-control"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            placeholder="Phone Number*"
                                            required
                                        />
                                        {errors.phoneNumber && (
                                            <span className="error" style={{ color: 'red' }}>
                                                {errors.phoneNumber}
                                            </span>
                                        )}
                                    </div>

                                    <div className="col-md-6">
                                        <Select
                                            name="doctor"
                                            options={doctorlist.map((doc) => ({
                                                value: doc.id,
                                                label: doc.doctorName,
                                            }))}
                                            value={doctorlist
                                                .map((doc) => ({
                                                    value: doc.id,
                                                    label: doc.doctorName,
                                                }))
                                                .find((option) => option.value === formData.doctor) || null}
                                            onChange={(selectedOption) =>
                                                handleChange({
                                                    target: {
                                                        name: 'doctor',
                                                        value: selectedOption?.value || '',
                                                    },
                                                })
                                            }
                                            placeholder="Select Doctor"
                                            isClearable
                                        />

                                        {errors.doctor && (
                                            <span className="error" style={{ color: 'red' }}>
                                                {errors.doctor}
                                            </span>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            placeholder="City*"
                                            required
                                        />
                                        {errors.city && (
                                            <span className="error" style={{ color: 'red' }}>
                                                {errors.city}
                                            </span>
                                        )}
                                    </div>
                                    <div className="col-md-12">
                                        <button
                                            type="submit"
                                            className={`button-primary btn-white false w-100 BesthospFormBtnId ${formSubmitted ? "disabled-btn" : ""}`}
                                            disabled={formSubmitted}
                                        >
                                            <span className='BesthospFormBtnId'>
                                                {formSubmitted ? (
                                                    <>
                                                        Submitting
                                                        <div className="spinner-border spinner-border-sm custom-spinner ms-2"></div>
                                                    </>
                                                ) : (
                                                    "Submit"
                                                )}
                                            </span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HospitalNearMe