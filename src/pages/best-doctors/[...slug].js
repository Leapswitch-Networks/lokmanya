import React, { useCallback, useEffect, useState } from 'react';
import '@/styles/HospitalNearMe.css';
// import '@/styles/HospitalNearMe.css';
// import '@/styles/adm'
import HeroBanner from '../../site/components/banner/HeroBanner';
import AppointmentModal from '../../site/components/AppointmentModal';
import HospitalCounterSection from '../../site/components/HospitalCounterSection/HospitalCounterSection';
import BenifitTable from '../../site/components/BenifitTable';
import ExperienceExcellence from '../../site/components/ExperienceExceptional';
import BookCallSection from '../../site/components/BookCallnowSection/BookCallSection';
import DrPlaceholderImg from "../../site/assets/images/Dr-placeholder-img.webp";
import { hospitalCounterData } from '../../site/../static-data';
import BlogComponent from '../../site/components/BlogComponent/BlogComponent';
import FaqSection from '../../site/components/FaqSection/FaqSection';

// import axiosConfig from "../../site/../utils/axiosConfig";
import { errorToast, successToast } from '../../site/../utils/Toast';
import CompCareSection from '../../site/components/CompCareSection';
import DocAppointmentModal from '../../site/components/DocAppointmentModal';
import QuestionAnsweredSection from '../../site/components/QuestionAnsweredSection';
import Link from 'next/link';
import MainSuccessStor from '@/site/components/MainSuccessStor';
// import BenefitsSection from '@/site/components/BenefitsSection';
import WorldFacilitiesSection from '@/site/components/WorldFacilitiesSection';
import { getBestDoctorsHyperlocalSingleFrontend } from '@/ApiActions/Admin/hyperlocaladmin/hyperlocal';
import { useRouter } from 'next/router';
import { doctorsListFrontend, storeLeadInfo } from '@/ApiActions/CommonApi';
import Select from 'react-select';
import MeetOurExpertsHyperlocal from '@/site/components/InternationalPatients/MeetOurExpertsHyperlocal';
import { replacePlaceholders } from '../../site/components/replacePlaceholders';
import Head from 'next/head';
import debounce from 'lodash.debounce';
import { createLead, updateLead } from "@/ApiActions/CommonApi";

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
        benefit: "Pioneering Robotic Surgery and Technology",
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

const WhyChooseData = {
    title: "Comprehensive Care for Cardiology",
    items: [
        {
            title: 'Heart Disease Management',
            description: 'At Lokmanya Hospital, our expert cardiologists in Pune specialize in managing a wide range of heart conditions, including coronary artery disease, heart failure, and arrhythmias. Using advanced diagnostic tools and treatment plans, we focus on both immediate care and long-term heart health. Our cardiologists work with patients to ensure optimal outcomes through medications, lifestyle changes, and advanced interventions.',
            image: '/images/new-theme/Newpages/HospitalNearme/comp-care-1.webp',
        },
        {
            title: 'Interventional Cardiology',
            description: 'Lokmanya Hospital offers comprehensive interventional cardiology services, including angioplasty, stent placements, and catheter-based procedures. Our experienced cardiologists use the latest techniques and equipment to perform minimally invasive procedures, ensuring faster recovery and less discomfort. Each treatment plan is tailored to meet the individual needs of our patients for optimal heart health.',
            image: '/images/new-theme/Newpages/HospitalNearme/comp-care-1.webp',
        },
        {
            title: 'Cardiac Surgery',
            description: 'When it comes to complex heart surgeries, Lokmanya Hospital offers care with experienced cardiac surgeons specializing in procedures like heart bypass surgery, valve replacements, and congenital heart defect corrections. With advanced surgical techniques and a focus on patient safety, our team ensures a successful recovery with minimal risk.',
            image: '/images/new-theme/Newpages/HospitalNearme/comp-care-1.webp',
        },
        {
            title: 'Electrophysiology and Arrhythmia Treatment',
            description: 'Lokmanya Hospital’s cardiology team is skilled in treating arrhythmias and heart rhythm disorders. Our electrophysiologists use advanced diagnostic methods and treatments like ablation therapy, pacemaker implantation, and defibrillator insertion to manage irregular heartbeats effectively. We focus on restoring normal heart rhythms and improving the quality of life.',
            image: '/images/new-theme/Newpages/HospitalNearme/comp-care-1.webp',
        },
        {
            title: 'Preventive Cardiology',
            description: 'At Lokmanya Hospital, we emphasize the importance of preventive cardiology to reduce the risk of heart disease. Our cardiologists offer personalized health assessments, lifestyle counseling, and early detection strategies to help patients maintain heart health. We provide guidance on diet, exercise, and stress management for a heart-healthy lifestyle.',
            image: '/images/new-theme/Newpages/HospitalNearme/comp-care-1.webp',
        },
        {
            title: 'Post-Cardiac Surgery Rehabilitation',
            description: 'Rehabilitation is an essential part of recovery after cardiac surgery, and Lokmanya Hospital offers comprehensive post-surgery care. Our cardiologists and rehabilitation specialists provide personalized programs focusing on heart function, strength, and overall fitness, ensuring a smooth transition back to an active lifestyle.',
            image: '/images/new-theme/Newpages/HospitalNearme/comp-care-1.webp',
        },
    ]
};

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


const DoctorsSpecialist = () => {

    const [isbookModalOpen, setIsbookModalOpen] = useState(false);
    const handlebookModalOpen = () => setIsbookModalOpen(true);
    const handlebookModalClose = () => setIsbookModalOpen(false);
    const [doctorData, setData] = useState([]); // State for locations
    const [matchedArea, setMatchedArea] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [leadId, setLeadId] = useState(null);
    const [currentDoctorName, setCurrentDoctorName] = useState('');
    const [currentDoctorLocation, setCurrentDoctorLocation] = useState('');
    const handleModalOpen = (doctorName, doctorLocation) => {

        setCurrentDoctorName(doctorName);         // Use actual name
        setCurrentDoctorLocation(doctorLocation);
        setIsModalOpen(true);
    };
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

    useEffect(() => {
        if (!slug.length) return;

        const fullSlug = Array.isArray(slug) ? slug.join('/') : slug;
        const fetchAreas = async () => {
            try {
                const response = await getBestDoctorsHyperlocalSingleFrontend(fullSlug);
                if (!response?.data) {
                    // No data found, go to 404
                    router.replace('/404');
                    return;
                }
                setData(response.data.data.hyperlocal); // Set areas                
                setMatchedArea(response.data.data.matchedArea);
            } catch (error) {
                console.log('responseerror', error);

                console.error("Failed to fetch locations", error);
            }
        };
        fetchAreas();
        fetchDoctors();
    }, [slug]);


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



    const leadslug = Array.isArray(slug) ? slug.join('/') : slug;

    const handleModalClose = () => setIsModalOpen(false);


    const bannerSlides = [
        {
            desktop: `${process.env.NEXT_PUBLIC_FILE_BASE_URL}/${doctorData?.featured_image?.replace(/\\/g, '/') || ''}`,
            mobile: `${process.env.NEXT_PUBLIC_FILE_BASE_URL}/${doctorData?.featured_images_mobile?.replace(/\\/g, '/') || ''}`,
            onClick: handlebookModalOpen,
            // link: `/hyperlocal/best-hospital/${data?.slug || ''}`,
        }
    ];



    const handleImageError = (e) => {
        e.target.onerror = null;
        e.target.src = DrPlaceholderImg;
    };

    // Book Appointment Form

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
            setFormSubmitted(true);

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
                setFormSubmitted(false);

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
    // const area = router.asPath.split('/').pop().split('-').pop();
    const area = matchedArea?.masterName;
    const updatedDescription = replacePlaceholders(doctorData.description, { area });
    return (
        <>
            <Head>
                <title>{replacePlaceholders(doctorData?.metaTitle, { area }) || ' Title'}</title>
                <meta name="description" content={replacePlaceholders(doctorData?.metaDescription, { area }) || ' Description'} />
            </Head>
            <HeroBanner slides={bannerSlides} />
            <AppointmentModal isModalOpen={isbookModalOpen} handleModalClose={handlebookModalClose} />
            <section className='side-space section-space'>
                <HospitalCounterSection data={hospitalCounterData} />
            </section>
            {doctorData?.description && (
                <section className='hosp-ovw-section side-space section-space pt-0'>
                    <div className='row align-items-center'>
                        <div className="col-md-7">
                            {/* <h2 className='page-heading text-start mb-md-3 mb-3'>Your Path to a Healthier Heart Starts at Lokmanya</h2> */}
                            <div
                                className="mb-0"
                                dangerouslySetInnerHTML={{ __html: updatedDescription }}
                            ></div>
                        </div>
                        <div className="col-md-5 mb-md-0 mb-3 order-md-2 order-1">
                            <div className='hosp-ovw-img'>
                                <img
                                    src={`${process.env.NEXT_PUBLIC_FILE_BASE_URL}/${doctorData.aboutus_images}`}
                                    alt="Cardiology care"
                                />
                            </div>
                        </div>

                    </div>
                </section>
            )}
            {doctorData?.TreatmentProcedures?.length > 0 && (
                <section className='side-space'>
                    <h2 className='page-heading text-start mb-md-3 mb-3'>
                        {/* {doctorData.treatmentHeading} */}
                        {replacePlaceholders(doctorData.treatmentHeading, { area })}
                    </h2>
                    {/* <QuestionAnsweredSection
                        activeTabtab="treatmentProcedure"
                        combinedProcedures={doctorData.TreatmentProcedures}
                    /> */}

                    <QuestionAnsweredSection
                        activeTabtab="treatmentProcedure"
                        combinedProcedures={
                            Array.isArray(doctorData.TreatmentProcedures)
                                ? doctorData.TreatmentProcedures.map(item => ({
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
                <h2 className='page-heading text-center mb-md-3 mb-2'>What Sets Lokmanya Hospital Apart?</h2>
                <BenifitTable data={comparisonData} />
            </section>
            <section className='side-space section-space exp-exc-section'>
                <h2 className='page-heading text-center mb-md-3 mb-2'>{ExpExcdata.heading}</h2>
                <ExperienceExcellence data={ExpExcdata} />
            </section>
            {/* <BenefitsSection /> */}
            {Array.isArray(doctorData?.HyperlocalBenifits) && doctorData.HyperlocalBenifits.length > 0 && (
                <section className='hospital-choose-bnft side-space section-space'>
                    <h2 className="page-heading text-start text-md-center mb-md-3 mb-2">
                        Your Health, Our Priority : Benefits Of Choosing Lokmanya Hospitals
                    </h2>
                    <div className='row g-md-4 g-3'>
                        {doctorData.HyperlocalBenifits.map((benefit, index) => (
                            <div className='col-xl-4 col-lg-6 col-md-6 col-sm-12' key={index}>
                                <div className='hospital-choose-bnft-card'>
                                    <div className='d-flex align-items-center gap-3 mb-2'>
                                        <img
                                            width={52}
                                            height={52}
                                            // src={
                                            //     benefit.benifitImage
                                            //         ? benefit.benifitImage
                                            //         : '/assets/images/icons/placeholder-icon.svg'
                                            // }
                                            src='/images/hospital-dummy.png'

                                            alt={benefit.benifitTitle || 'Benefit Icon'}
                                        />
                                        {/* <h4 className='mb-0'>{benefit.benifitTitle}</h4> */}
                                        <h4 className='mb-0'>{replacePlaceholders(benefit.benifitTitle, { area })}</h4>
                                    </div>
                                    <p className='mb-0'>{replacePlaceholders(benefit.benifitDescription, { area })}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
            <section className='book-call-section side-space section-space'>
                <BookCallSection
                    btn1Class="hyp-best-doc-meet-spec-finddoc"
                    // btn2Class="hyp-best-doc-meet-spec-callus"
                    title="Cardiologist Expertise : Meet Our Specialized Doctors"
                    subtitle="Experience outstanding care with our expert cardiologists in Pune, offering advanced solutions for every heart condition, ensuring your heart health is in trusted hands."
                    // primaryText="Book Your Appointment"
                    primaryText="Find A Doctor"
                    imageUrl="/images/new-theme/Newpages/HospitalNearme/hosp-book-call.webp"
                    // onPrimaryClick={handlebookModalOpen}
                    onPrimaryClick={() => window.location.href = '/doctors'}
                />
                <AppointmentModal isModalOpen={isbookModalOpen} handleModalClose={handlebookModalClose} />
            </section>
            <section className='book-call-section side-space d-none'>
                <BookCallSection
                    title="Expert Back Pain Relief: Get to Know Our Doctors"
                    subtitle="For the most trusted care, visit the best back pain doctor in Pune at Lokmanya Hospital, specializing in personalized treatment solutions for back pain relief."
                    primaryText="Book An Appointment"
                    secondaryText="Call Now"
                    imageUrl="/images/new-theme/Newpages/DrSpecialist/bookcall-drspc-img.webp"
                    onPrimaryClick={handlebookModalOpen}
                    onSecondaryClick={() => window.location.href = 'tel:+919307076767'}
                />
                <AppointmentModal isModalOpen={isbookModalOpen} handleModalClose={handlebookModalClose} />
            </section>
            {doctorData?.relatedDoctors?.length > 0 && (
                <MeetOurExpertsHyperlocal data={doctorData.relatedDoctors} />
            )}
            <DocAppointmentModal
                isModalOpen={isModalOpen}
                handleModalClose={handleModalClose}
                currentDoctorName={currentDoctorName}
                selectedHospital={currentDoctorLocation}
            />
            {Array.isArray(doctorData?.ComprehensiveCares) && doctorData.ComprehensiveCares.length > 0 && (
                <section className="hosp-comprehensive-care position-relative">
                    <CompCareSection
                        data={{
                            // title: "Comprehensive Cardiac Care",
                            title: replacePlaceholders(doctorData.comprehensiveHeading, { area }), 
                            items: doctorData.ComprehensiveCares.map((item) => ({
                                title: replacePlaceholders(item.comprehensiveTitle, { area }), 
                                description: replacePlaceholders(item.comprehensiveDescription, { area }), 
                                image: item.comprehensiveImage || '/assets/images/icons/placeholder-icon.svg', // fallback
                            })),
                        }}
                    />
                    <div className='d-flex justify-content-center mt-3 hosp-comprehensive-care-cta'>
                        <Link href="/doctors" className='btn-see-more hyp-best-doc-comp-care-finddoc'>Find A Doctor</Link>
                    </div>
                </section>
            )}
            <WorldFacilitiesSection />
            <section className='book-call-section side-space section-space pt-0'>
                <BookCallSection
                    btn1Class="hyp-best-doc-take-step-bookap"
                    btn2Class="hyp-best-doc-take-step-callus"
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
            {/* <section className='hospital-faq-section'> */}
            {/* <FaqSection data={faqs} /> */}
            {/* {doctorData?.faqs &&
                JSON.parse(doctorData.faqs).length > 0 && (
                    <section className='hospital-faq-section'>
                        <FaqSection data={JSON.parse(doctorData.faqs)} />
                    </section>
                )} */}

            {doctorData?.faqs && (() => {
                let parsedFaqs = [];
                try {
                    parsedFaqs = JSON.parse(doctorData.faqs);
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
            {/* </section> */}
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
                                            className={`button-primary btn-white false w-100 BestDocFormBtnId ${formSubmitted ? "disabled-btn" : ""}`}
                                            disabled={formSubmitted}
                                        >
                                            <span className='BestDocFormBtnId'>
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

export default DoctorsSpecialist