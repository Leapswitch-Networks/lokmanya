import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';

// Import Swiper styles
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Keyboard, Pagination, Navigation, Autoplay } from 'swiper/modules';
import PhoneSvg from '../assets/images/icons/Phone';
import Tick from '../assets/images/icons/Tick';
import QuoteMark from "../site/assets/images/quote-mark.webp";
import OurLocation from '@/site/components/LokmanyaNetworkSection/OurLocation';
import CounterCard from '@/site/pages/KneeReplacement/CounterCard';
// import axiosConfig from "@/utils/axiosConfig";
import { addleadkneereplacement } from '@/ApiActions/CommonApi';
import { errorToast, successToast } from '@/utils/Toast';
import Image from 'next/image';


const servicesData = [
    {
        title: "Knee Replacement",
        description: "A knee replacement is a surgical procedure to replace a damaged or worn-out knee joint with an artificial implant to restore mobility and relieve pain.",
        image: "/images/section2/1.webp",
        reverseOrder: false,
        ButtonId: "ServicesKneeRplcId"
    },
    {
        title: "ACL Reconstruction",
        description: "ACL reconstruction is a surgical procedure to repair or replace a torn anterior cruciate ligament in the knee, restoring stability and function.",
        image: "/images/section2/2.webp",
        reverseOrder: true,
        ButtonId: "ServicesACLId"
    },
    {
        title: "Knee Arthroscopy",
        description: "Knee arthroscopy is a minimally invasive surgical procedure used to diagnose and treat issues within the knee joint using a small camera and specialized tools.",
        image: "/images/section2/3.webp",
        reverseOrder: true,
        ButtonId: "ServicesKneeArthId"
    },
    {
        title: "Hip Replacement",
        description: "Hip replacement is a surgical procedure to replace a damaged or worn-out hip joint with an artificial implant to relieve pain and improve mobility.",
        image: "/images/section2/4.webp",
        reverseOrder: false,
        ButtonId: "ServicesHipRplcId"
    },
];

const doctors = [
    {
        id: 1,
        name: 'Dr. Narendra Vaidya',
        specialty: 'Chief Joint Replacement & Orthopaedic Surgeon',
        image: '/images/doctors/1.webp',
        link: '#appointment',
        ButtonId: "DrNarendraBtnId"
    },
    {
        id: 2,
        name: 'Dr. Nikhill Likhate',
        specialty: 'Consultant Sports Medicine Department',
        image: '/images/doctors/DrNikhillLikhate.png',
        link: '#appointment',
        ButtonId: "DrNikhilBtnId"
    },
    {
        id: 3,
        name: 'Dr. Rahul Gagare',
        specialty: 'Consultant Robotic Joint Replacement',
        image: '/images/doctors/DrRahulGagare.png',
        link: '#appointment',
        ButtonId: "DrRahulGagareBtnId"
    },
    {
        id: 4,
        name: 'Dr. Rakesh Patil',
        specialty: 'Sr. Joint Replacement & Orthopaedic Surgeon',
        image: '/images/doctors/2.webp',
        link: '#appointment',
        ButtonId: "DrRakeshBtnId"
    },
    {
        id: 5,
        name: 'Dr. Ashish Suryawanshi',
        specialty: 'Sr. Trauma & Joint Replacement Surgeon',
        image: '/images/doctors/3.webp',
        link: '#appointment',
        ButtonId: "DrAshishBtnId"
    },
    {
        id: 6,
        name: 'Dr. Satish Kale',
        specialty: 'Sr. Joint Replacement & Orthopaedic Surgeon',
        image: '/images/doctors/DrSatishKale.webp',
        link: '#appointment',
        ButtonId: "DrSatishBtnId"
    },
    {
        id: 7,
        name: 'Dr. Nilesh Yeole',
        specialty: 'Consultant Orthopedic Surgeon',
        image: '/images/doctors/DrNilesh.jpeg',
        link: '#appointment',
        ButtonId: "DrNileshYeoleBtnId"
    },
];

const cardData = [
    {
        text: "My wife underwent knee replacement surgery in this Hospital. My experience was excellent from all perspective. Really worth. With minor improvement in support staff for personal attention of individual patient, the Hospital is only a step behind in rating 5 star. I especially commend Ms Shobha, Nursing Head for her enthusiasm and supervision excellence.",
        name: "Vinayak Mankikar",
        // img: QuoteMark,
        alt: "Doctor 1",
    },
    {
        text: "My mother recently underwent knee replacement surgery from this hospital. Overall good experience. All the staff are supportive and all procedures took place without any delay. Areas of improvement food, cleaning and clothing.",
        name: "Dipti Manikkar",
        // img: QuoteMark,
        alt: "Doctor 2",
    },
    {
        text: "L.H.S.S.is one of the best hospital of our Maharashtra situated in the centralised place of pune, highly appreciated cleanliness, the most positive attitudinal staff n Dr. personally Shri Vaidya sir is seem to be very careful for his services, financially found reasonable charges of the hospital.",
        name: "Deepesh Pakhare",
        // img: QuoteMark,
        alt: "Doctor 3",
    },
    {
        text: "Very good experience. Service was very good. Patient was walking immediately after surgery. We went to Dubai for holiday after surgery.",
        name: "Yadwendra Gaikwad",
        // img: QuoteMark,
        alt: "Doctor 4",
    },
    {
        text: "My mother Mrs. Sunita Suresh Kashikar was asked to undergo surgery on both knees but she was not ready due to mental fear. Lokmanya Hospital at Gokhale Nagar *Sarla Kirve* Sister counseled my mother properly and explained to her.",
        name: "Dhanesh Kashikar",
        // img: QuoteMark,
        alt: "Doctor 5",
    },
    {
        text: "Excellent service, the doctor is very high skilled and all the staff is very supportive. The cleanliness and promptness is beyond the mark. The physiotherapy department provides proper guidance for faster recovery.",
        name: "Harshad Shelke",
        // img: QuoteMark,
        alt: "Doctor 6",
    },
    {
        text: "Service of all staff including Dr. Narendra Vaidya & physiotherapy department was excellent.",
        name: "Mauli Krushi Bhandar",
        // img: QuoteMark,
        alt: "Doctor 7",
    },
];

const faqData = [
    {
        id: "one",
        question: "Is Robotic Knee Replacement Surgery really better than Conventional Knee Replacement Surgery?",
        answer: [
            "Robotic knee replacement offers several advantages over traditional knee replacement surgeries, including improved implant positioning, precise surgical bone cuts, a reduced risk of human error, faster recovery, and shorter hospital stays.",
            "Additionally, due to its minimally invasive nature, robotic surgery results in less tissue trauma, decreased blood loss, and a quicker recovery time."
        ]
    },
    {
        id: "two",
        question: "Are There Any Risks Associated with Robotic Knee Replacement Surgery?",
        answer: [
            "Robotic knee replacement surgeries do not pose any additional risks to patients. Thanks to advanced features and intuitive software, the system monitors all aspects of the procedure in real time, ensuring optimal outcomes and maximum safety for patients."
        ]
    },
    {
        id: "three",
        question: "Will I Be Able to Walk and Perform Daily Activities Independently After Knee Replacement Surgery?",
        answer: [
            "Yes, after the initial recovery phase, you can begin walking within a week. Following 2-3 months of recovery, you should be able to engage in most daily activities independently. Aside from the initial recovery period, you will not require any walking support after knee replacement surgery."
        ]
    },
    {
        id: "four",
        question: "How Do I Know If I Need Knee Replacement Surgery?",
        answer: [
            "If your X-ray report shows a gap in the knees and you experience pain while walking, it is strongly recommended to consider knee replacement surgery before the condition deteriorates further. Consult our experts for the best guidance and information."
        ]
    },
    {
        id: "five",
        question: "How to Minimize Knee Replacement Surgery Costs?",
        answer: [
            "The cost of knee replacement surgery can vary significantly from one hospital to another and among different surgeons. At Lokmanya Hospitals, we collaborate with a network of over 20 hospitals in the city that specialize in knee replacement procedures, ensuring that you find options that fit your budget."
        ]
    }
];


const KneeReplacement = () => {

    const [headerHeight, setHeaderHeight] = useState(0);

    useEffect(() => {
        const updateHeaderHeight = () => {
            const header = document.querySelector('#header1');
            if (header) {
                setHeaderHeight(header.offsetHeight - 15); // Subtract 1px to prevent flickering
            }
        };

        updateHeaderHeight();
        window.addEventListener('resize', updateHeaderHeight);

        return () => {
            window.removeEventListener('resize', updateHeaderHeight);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const [activeTab, setActiveTab] = useState('light-blue-bg');

    const handleTabClick = (tabClass) => {
        // Change the active tab class based on the tab clicked
        setActiveTab(tabClass);
    };

    const [resetCounter, setResetCounter] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // When the section becomes visible, reset the counter
                if (entry.isIntersecting) {
                    setResetCounter(true);
                    // Optional: Delay resetting to allow the counter to restart visually
                    setTimeout(() => setResetCounter(false), 100); // Reset after a short delay
                }
            },
            { threshold: 0.5 } // Trigger when 50% of the section is in view
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        doctor: '',
        city: ''
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
    };
    const resetForm = () => {
        setFormData({
            fullName: '',
            phoneNumber: '',
            doctor: '',
            city: ''
        });
        setErrors({
            fullName: '',
            phoneNumber: '',
            doctor: '',
            city: ''
        });
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

            try {
                const response = await addleadkneereplacement(formData);

                // const response = await axiosConfig.post("/add-lead-kneereplacement", formData, {
                //     headers: {
                //         "Content-Type": "application/json",
                //     },
                // });
                // console.log("formData", formData);
                // console.log("response", response);
                

                if (response?.message === "Lead created successfully") {
                    successToast("Thank you! Your details have been submitted successfully.");
                }

                resetForm();
                setFormSubmitted(false);

            } catch (error) {
                console.error("Form submission error:", error);
                errorToast("Something went wrong. Please try again.");
            }
        }
    };

    return (

        <>
            <Head>
                <title>Advanced Knee Replacement  in Pune | Lokmanya Hospital</title>
                <meta name="description" content="Get expert knee replacement surgery at Lokmanya Hospital Pune. Trusted by thousands for robotic knee care, faster recovery, and long-lasting joint relief." />
            </Head>
            <div className="main-page-content" style={{ marginTop: `${headerHeight}px` }}>
                <section>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={30}
                        keyboard={{
                            enabled: true,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        // autoplay={{
                        //     delay: 7000,
                        //     disableOnInteraction: false,
                        // }}
                        loop={true}
                        navigation={true}
                        modules={[Autoplay, Keyboard, Pagination, Navigation]}
                        className="main-slider"
                    >
                        <SwiperSlide>
                            <Image width={1531} height={643} src="/images/KneeBanner2.webp" alt="slider" className="w-100 d-md-block d-none" />
                            <Image width={426} height={426} src="/images/KneeBanner2Mob.webp" alt="slider" className="w-100 d-md-none d-block" />
                        </SwiperSlide>
                    </Swiper>
                </section>
                <section id="about" className="topSpacing">
                    <div className="containerCustom">
                        <div className="content-wrapper text-center">
                            <div className="row">
                                <div className="col-lg-2 colCustom col-md-4 col-6 mb-4">
                                    <div className="feature-item">
                                        <Image
                                            height={60}
                                            width={60}
                                            src="/images/section1/1.svg"
                                            alt="Feature 1"
                                            className="img-fluid mb-2"
                                            style={{ height: '60px', width: 'auto' }}
                                        />
                                        <p>Faster <br /> Recovery</p>
                                    </div>
                                </div>

                                <div className="col-lg-2 colCustom col-md-4 col-6 mb-4">
                                    <div className="feature-item">
                                        <Image
                                            height={60}
                                            width={60}
                                            src="/images/section1/2.svg"
                                            alt="Feature 2"
                                            className="img-fluid mb-2"
                                            style={{ height: '60px', width: 'auto' }}
                                        />
                                        <p>Less Blood<br />Loss</p>
                                    </div>
                                </div>

                                <div className="col-lg-2 colCustom col-md-4 col-6 mb-4">
                                    <div className="feature-item">
                                        <Image
                                            height={60}
                                            width={60}
                                            src="/images/section1/3.svg"
                                            alt="Feature 3"
                                            className="img-fluid mb-2"
                                            style={{ height: '60px', width: 'auto' }}
                                        />
                                        <p>Smaller<br />Incisions</p>
                                    </div>
                                </div>

                                <div className="col-lg-2 colCustom col-md-4 col-6 mb-4 offset-md-2 offset-lg-0">
                                    <div className="feature-item">
                                        <Image
                                            height={60}
                                            width={60}
                                            src="/images/section1/4.svg"
                                            alt="Feature 4"
                                            className="img-fluid mb-2"
                                            style={{ height: '60px', width: 'auto' }}
                                        />
                                        <p>Exceptional Long<br />Term Result</p>
                                    </div>
                                </div>

                                <div className="col-lg-2 colCustom col-md-4 col-12 mb-4">
                                    <div className="feature-item">
                                        <Image
                                            height={60}
                                            width={60}
                                            src="/images/section1/5.svg"
                                            alt="Feature 5"
                                            className="img-fluid mb-2"
                                            style={{ height: '60px', width: 'auto' }}
                                        />
                                        <p>Reduced Pain<br />After Surgery</p>
                                    </div>
                                </div>
                            </div>

                            {/* About Us Section */}
                            <div className="row align-items-center topSpacing">
                                <div className="col-md-8 text-start">
                                    <h2 className="section-ttl">Total <span>Knee Replacement</span> Surgery Made Easy</h2>
                                    <p>
                                        Total Knee Replacement Surgery is a highly effective procedure designed to relieve pain
                                        and restore mobility in individuals with severely damaged knee joints. The surgery
                                        involves replacing the worn-out or damaged joint with an artificial implant, allowing
                                        patients to regain their quality of life. With advancements in medical techniques and
                                        technology, the procedure has become more efficient, resulting in shorter hospital stays
                                        and quicker recovery times. Modern surgical approaches minimize pain and reduce
                                        complications, enabling patients to return to their daily activities sooner. Total Knee
                                        Replacement Surgery offers a long-term solution for those suffering from chronic knee
                                        pain.
                                    </p>
                                    <a className="custom-btn custom-btn-2 button-primary d-flex align-items-center mb-md-0 mb-3 TotalKneeRplcSectionId" href="#appointment">
                                        <i className="phone-icon"><PhoneSvg /></i>
                                        <span className='TotalKneeRplcSectionId'>Get A Free Call Back</span>
                                    </a>
                                </div>
                                <div className="col-md-4">
                                    <Image
                                        height={325}
                                        width={335}
                                        loading="lazy"
                                        src="/images/section1/bone.webp"
                                        alt="About Us"
                                        className="img-fluid"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="services" className="topSpacing">
                    <div className="containerCustom">
                        <h2 className="text-center mb-md-4 mb-3 section-ttl">
                            <span>Services</span> We Provide
                        </h2>
                        <div className="row g-md-4 g-3">
                            {servicesData.map((service, index) => (
                                <div key={index} className="col-md-6">
                                    <div className="card d-flex flex-row productBorders w-100">
                                        <Image
                                            height={215}
                                            width={230}
                                            loading="lazy"
                                            src={service.image}
                                            className={`card-img-left leftImg ${service.reverseOrder ? 'order-md-2' : 'order-md-1'}`}
                                            alt={service.title}
                                        />
                                        <div className={`card-body p-md-3 p-0 mt-md-3 mt-2 ${service.reverseOrder ? 'order-md-1' : 'order-md-2'}`}>
                                            <h4 className="text-md-start text-center">{service.title}</h4>
                                            <p className="card-text text-md-start text-center">{service.description}</p>
                                            <a className={`custom-btn button-primary btn-white d-flex align-items-center mb-md-0 ${service.ButtonId}`} href="#appointment">
                                                <i className="phone-icon"><PhoneSvg /></i>
                                                <span className={`${service.ButtonId}`}>Get A Free Call Back</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <section id="benefits" className="topSpacing">
                    <div className="containerCustom">
                        <h3 className="text-center mb-md-4 mb-3 section-ttl">
                            <span className="blueclr">Robotic</span> Knee Joint Replacement
                        </h3>

                        {/* Tabs for larger screens */}
                        <ul
                            className="nav nav-pills custom-tab justify-content-center d-none d-lg-flex"
                            id="pills-tab"
                            role="tablist"
                        >
                            <li className="nav-item" role="presentation">
                                <a
                                    className="nav-link active light-blue-tab"
                                    id="pills-light-blue-tab"
                                    data-bs-toggle="pill"
                                    href="#pills-light-blue"
                                    role="tab"
                                    aria-controls="pills-light-blue"
                                    aria-selected="true"
                                    onClick={() => handleTabClick('light-blue-bg')}
                                >
                                    What Is Robotic Knee Replacement?
                                </a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a
                                    className="nav-link dark-blue-tab"
                                    id="pills-dark-blue-tab"
                                    data-bs-toggle="pill"
                                    href="#pills-dark-blue"
                                    role="tab"
                                    aria-controls="pills-dark-blue"
                                    aria-selected="false"
                                    onClick={() => handleTabClick('dark-blue-bg')}
                                >
                                    Who Needs A Robotic Knee Replacement?
                                </a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a
                                    className="nav-link peach-tab"
                                    id="pills-peach-tab"
                                    data-bs-toggle="pill"
                                    href="#pills-peach"
                                    role="tab"
                                    aria-controls="pills-peach"
                                    aria-selected="false"
                                    onClick={() => handleTabClick('peach-bg')}
                                >
                                    What Are The Advantages Of Robotic Knee Replacement Surgery?
                                </a>
                            </li>
                        </ul>

                        {/* Accordion for smaller screens */}
                        <div className="accordion d-lg-none" id="benefitsAccordion">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingOne">
                                    <button
                                        className="accordion-button acc1"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseOne"
                                        aria-expanded="true"
                                        aria-controls="collapseOne"
                                    >
                                        What is Robotic Knee Replacement
                                    </button>
                                </h2>
                                <div
                                    id="collapseOne"
                                    className="accordion-collapse collapse show"
                                    aria-labelledby="headingOne"
                                    data-bs-parent="#benefitsAccordion"
                                >
                                    <div className="accordion-body acc1">
                                        <p>
                                            A robotic knee replacement, or robot-assisted knee replacement surgery, is similar to
                                            traditional knee replacement. During the procedure, your surgeon will remove the
                                            damaged tissue or bone in your knee and replace it with an artificial metal joint. The
                                            key difference is that this surgery is performed with the assistance of a handheld
                                            robotic device or robotic arm, based on an automated computerized system. Robotic-assisted
                                            procedures offer high accuracy, reduced recovery time, and improved outcomes. In complex
                                            surgeries, robotic assistance helps achieve a better balance of soft tissues around the knee
                                            and ensures proper joint alignment. If you choose robotic knee replacement surgery, you
                                            won't need to prepare any differently than for conventional surgery.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingTwo">
                                    <button
                                        className="accordion-button collapsed acc2"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseTwo"
                                        aria-expanded="false"
                                        aria-controls="collapseTwo"
                                    >
                                        Who is a Candidate for Robotic Knee Replacement?
                                    </button>
                                </h2>
                                <div
                                    id="collapseTwo"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="headingTwo"
                                    data-bs-parent="#benefitsAccordion"
                                >
                                    <div className="accordion-body acc2">

                                        <p>
                                            A candidate for traditional knee replacement is also likely to be a candidate for
                                            robotic-assisted knee replacement. It's essential to consult with your doctor to explore
                                            both non-surgical and surgical options available to you.
                                        </p>
                                        <p>Robotic knee replacements are often the preferred choice for individuals with complex knee joint conditions. This includes people who have:</p>
                                        <p>
                                            <Image width={15} height={15}
                                                src="/images/tick.svg"
                                                alt="Tick"
                                                className="me-2"
                                            />
                                            Deformities in the femur (thigh bone) after an injury
                                        </p>
                                        <p>
                                            <Image width={15} height={15}
                                                src="/images/tick.svg"
                                                alt="Tick"
                                                className="me-2"
                                            />
                                            Complex bone or knee joint degeneration
                                        </p>
                                        <p>
                                            <Image width={15} height={15}
                                                src="/images/tick.svg"
                                                alt="Tick"
                                                className="me-2"
                                            />
                                            CT-Scan
                                        </p>
                                        <p>
                                            <Image width={15} height={15}
                                                src="/images/tick.svg"
                                                alt="Tick"
                                                className="me-2"
                                            />
                                            Complications resulting from previous joint replacement surgeries
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingThree">
                                    <button
                                        className="accordion-button collapsed acc3"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseThree"
                                        aria-expanded="false"
                                        aria-controls="collapseThree"
                                    >
                                        What are the Advantages of Robotic Knee Replacement Surgery?
                                    </button>
                                </h2>
                                <div
                                    id="collapseThree"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="headingThree"
                                    data-bs-parent="#benefitsAccordion"
                                >
                                    <div className="accordion-body acc3">
                                        <p>
                                            Robotic-assisted knee replacement surgery offers several advantages over traditional knee
                                            replacement surgery, including:
                                        </p>
                                        <p>
                                            <b>Enhanced Surgical Planning:</b> Specialized 3D images are captured to assist in preparing
                                            for or during surgery, tailored to the robotic option best suited for you. These images
                                            lead to more accurate planning and optimize the placement of your artificial joint, ensuring
                                            the right fit and size.
                                        </p>
                                        <p>
                                            <b>Greater Precision:</b> Robotic technology enhances the surgeon's ability to plan effectively,
                                            remove tissue accurately, and place implants precisely. This leads to faster recovery, fewer
                                            complications, and a lower likelihood of needing repeat surgery.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tab Content for larger screens */}
                        <div className={`tab-content ${activeTab} d-none d-lg-block`} id="pills-tabContent">
                            <div
                                className="tab-pane fade show active"
                                id="pills-light-blue"
                                role="tabpanel"
                                aria-labelledby="pills-light-blue-tab"
                            >
                                <p>
                                    A robotic knee replacement, or robot-assisted knee replacement surgery, is similar to traditional knee replacement. During the procedure, your surgeon will remove the damaged tissue or bone in your knee and replace it with an artificial metal joint. The key difference is that this surgery is performed with the assistance of a handheld robotic device or robotic arm, based on an automated computerized system. Robotic-assisted procedures offer high accuracy, reduced recovery time, and improved outcomes. In complex surgeries, robotic assistance helps achieve a better balance of soft tissues around the knee and ensures proper joint alignment. If you choose robotic knee replacement surgery, you won't need to prepare any differently than for conventional surgery.
                                </p>
                            </div>

                            <div
                                className="tab-pane fade"
                                id="pills-dark-blue"
                                role="tabpanel"
                                aria-labelledby="pills-dark-blue-tab"
                            >
                                <div className="row align-items-center">
                                    <div className="col-md-12 roboticspacing text-start">
                                        <p>
                                            A candidate for traditional knee replacement is also likely to be a candidate for robotic-assisted knee replacement. It's essential to consult with your doctor to explore both non-surgical and surgical options available to you.
                                        </p>
                                        <p>Robotic knee replacements are often the preferred choice for individuals with complex knee joint conditions. This includes people who have:</p>
                                        <div className="d-flex gap-2 align-items-center mb-md-3 mb-2">
                                            <Tick />
                                            <p className="mb-0">
                                                Deformities in the femur (thigh bone) after an injury
                                            </p>
                                        </div>
                                        <div className="d-flex gap-2 align-items-center mb-md-3 mb-2">
                                            <Tick />
                                            <p className="mb-0">
                                                Complex bone or knee joint degeneration
                                            </p>
                                        </div>
                                        <div className="d-flex gap-2 align-items-center mb-md-3 mb-2">
                                            <Tick />
                                            <p className="mb-0">
                                                CT-Scan
                                            </p>
                                        </div>
                                        <div className="d-flex gap-2 align-items-center mb-md-3 mb-2">
                                            <Tick />
                                            <p className="mb-0">
                                                Complications resulting from previous joint replacement surgeries
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div
                                className="tab-pane fade"
                                id="pills-peach"
                                role="tabpanel"
                                aria-labelledby="pills-peach-tab"
                            >
                                <p>
                                    Robotic-assisted knee replacement surgery offers several advantages over traditional knee replacement surgery, including:
                                </p>
                                <p>
                                    <b>Enhanced Surgical Planning:</b> Specialized 3D images are captured to assist in preparing for or during surgery, tailored to the robotic option best suited for you. These images lead to more accurate planning and optimize the placement of your artificial joint, ensuring the right fit and size.
                                </p>
                                <p>
                                    <b>Greater Precision:</b> Robotic technology enhances the surgeon's ability to plan effectively, remove tissue accurately, and place implants precisely. This leads to faster recovery, fewer complications, and a lower likelihood of needing repeat surgery.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="comparision" className="topSpacing">
                    <div className="containerCustom">
                        <h3 className="text-center mb-md-4 mb-3 section-ttl">
                            Robotic vs Traditional Surgery For <span>Knee Replacements</span>
                        </h3>
                        <div className="row">
                            {/* Robotic Card */}
                            <div className="col-lg-6 marginB">
                                <div className="card2">
                                    <h4 className="">Robotic Knee Surgery</h4>
                                    <div className="row g-0">
                                        <div className="col-md-5 d-flex">
                                            <Image width={225} height={180}
                                                src="/images/robot.webp"
                                                className="img-fluid imgCompare mb-md-0 mb-3"
                                                alt="Robotic Surgery"
                                            />
                                        </div>
                                        <div className="col-md-7 text-start">
                                            <p>
                                                <Image width={15} height={15}
                                                    src="./images/tick.svg"
                                                    alt="Tick"
                                                    className="me-2 ms-4"
                                                />
                                                Smaller Incisions
                                            </p>
                                            <p>
                                                <Image width={15} height={15}
                                                    src="./images/tick.svg"
                                                    alt="Tick"
                                                    className="me-2 ms-4"
                                                />
                                                Less Blood Loss
                                            </p>
                                            <p>
                                                <Image width={15} height={15}
                                                    src="./images/tick.svg"
                                                    alt="Tick"
                                                    className="me-2 ms-4"
                                                />
                                                Faster Recovery
                                            </p>
                                            <p>
                                                <Image width={15} height={15}
                                                    src="./images/tick.svg"
                                                    alt="Tick"
                                                    className="me-2 ms-4"
                                                />
                                                Less Post-Operative Pain
                                            </p>
                                            <p>
                                                <Image width={15} height={15}
                                                    src="./images/tick.svg"
                                                    alt="Tick"
                                                    className="me-2 ms-4"
                                                />
                                                Exceptional Long Term Result
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Traditional Card */}
                            <div className="col-lg-6 marginB">
                                <div className="card1">
                                    <h4 className="">Traditional Knee Surgery</h4>
                                    <div className="row g-0">
                                        <div className="col-md-5 d-flex">
                                            <Image width={225} height={180}
                                                src="/images/manual.webp"
                                                className="img-fluid imgCompare mb-md-0 mb-3"
                                                alt="Traditional Surgery"
                                            />
                                        </div>
                                        <div className="col-md-7 text-start">
                                            <p>
                                                <Image width={15} height={15}
                                                    src="/images/tick.svg"
                                                    alt="Tick"
                                                    className="me-2 ms-4"
                                                />
                                                Larger Incisions
                                            </p>
                                            <p>
                                                <Image width={15} height={15}
                                                    src="/images/tick.svg"
                                                    alt="Tick"
                                                    className="me-2 ms-4"
                                                />
                                                More Blood Loss
                                            </p>
                                            <p>
                                                <Image width={15} height={15}
                                                    src="/images/tick.svg"
                                                    alt="Tick"
                                                    className="me-2 ms-4"
                                                />
                                                More Recovery Period
                                            </p>
                                            <p>
                                                <Image width={15} height={15}
                                                    src="/images/tick.svg"
                                                    alt="Tick"
                                                    className="me-2 ms-4"
                                                />
                                                More Post-Operative Pain
                                            </p>
                                            <p>
                                                <Image width={15} height={15}
                                                    src="/images/tick.svg"
                                                    alt="Tick"
                                                    className="me-2 ms-4"
                                                />
                                                Better Long-Term Results
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="doctors" className="topSpacing">
                    <div className="containerCustom">
                        <h3 className="text-center mb-md-4 mb-3 section-ttl">
                            Our Team Of <span>Expert Doctors</span>
                        </h3>

                        <Swiper
                            spaceBetween={5}
                            slidesPerView={4}
                            loop={false}
                            modules={[Keyboard, Pagination, Navigation, Autoplay]}
                            navigation={false}
                            pagination={{ clickable: true }}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1,
                                    pagination: {
                                        clickable: true,
                                    },
                                },
                                640: {
                                    slidesPerView: 1,
                                },
                                768: {
                                    slidesPerView: 2,
                                },
                                1024: {
                                    slidesPerView: 2,
                                    pagination: {
                                        clickable: false,
                                    },
                                },
                                1025: {
                                    slidesPerView: 4,
                                    pagination: {
                                        clickable: false,
                                    },
                                },
                            }}
                        >
                            {doctors?.map((doctor) => (
                                <SwiperSlide key={doctor.id}>
                                    <div className="card w-100">
                                        <Image width={250} height={200}
                                            src={doctor.image}
                                            alt={doctor.name}
                                        />
                                        <a
                                            href={doctor.link}
                                            className={`custom-btn btn-profile phoneHover button-primary ${doctor.ButtonId}`}
                                            data-doctor-id={doctor.name}
                                        >
                                            Book An Appointment
                                        </a>

                                        <div className="card-body align-items-start">
                                            <h4 className="text-start">{doctor.name}</h4>
                                            <p className="card-text text-start">{doctor.specialty}</p>
                                        </div>

                                        <a
                                            href={doctor.link}
                                            className={`custom-btn doctorBtnMobile ${doctor.ButtonId}`}
                                            data-doctor-id={doctor.name}
                                        >
                                            Book An Appointment
                                        </a>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </section>
                <section id="advantages" className="topSpacing">
                    <div className="containerCustom">
                        <div className="row">
                            {/* Card 1: Comparison */}
                            <div className="col-lg-6">
                                <div className=" card1">
                                    <h4 className=" text-start mb-md-4 mb-3">What Is The Cost Of Knee Replacement Surgery?</h4>
                                    <div className="d-flex">
                                        <div className="left-text">
                                            <p className="card-text">
                                                <Image width={15} height={15} src="/images/tick.svg" alt="Tick" className="me-2" />
                                                Cost of surgery depends on the following factors
                                            </p>
                                            <p className="card-text">
                                                <Image width={15} height={15} src="/images/tick.svg" alt="Tick" className="me-2" />
                                                Technique and equipment used
                                            </p>
                                            <p className="card-text">
                                                <Image width={15} height={15} src="/images/tick.svg" alt="Tick" className="me-2" />
                                                Type of implant selected
                                            </p>
                                            <p className="card-text">
                                                <Image width={15} height={15} src="/images/tick.svg" alt="Tick" className="me-2" />
                                                Requirement of additional corrections in the knee
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2: Plain Text */}
                            <div className="col-lg-6">
                                <div className="card2">
                                    <h4 className=" text-start mb-md-4 mb-3">Why You Should Not Delay Knee Replacement Surgery?</h4>
                                    <p className="card-text">
                                        <Image width={15} height={15} src="/images/tick.svg" alt="Tick" className="me-2" />
                                        Patient can become Bed ridden permanently
                                    </p>
                                    <p className="card-text">
                                        <Image width={15} height={15} src="/images/tick.svg" alt="Tick" className="me-2" />
                                        Health condition might not allow operation in future
                                    </p>
                                    <p className="card-text">
                                        <Image width={15} height={15} src="/images/tick.svg" alt="Tick" className="me-2" />
                                        Effect of Medications/other treatments will start to diminish
                                    </p>
                                    <p className="card-text">
                                        <Image width={15} height={15} src="/images/tick.svg" alt="Tick" className="me-2" />
                                        Increase chances of visible permanent deformation.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="stagesCarousel" className="d-lg-none d-block">
                    <div className="containerCustom topSpacing">
                        <h2 className="text-center mb-md-4 mb-3 section-ttl">
                            Stages Of <span>Knee Recovery</span>
                        </h2>

                        <Swiper
                            spaceBetween={20} // Adjust the space between slides
                            slidesPerView={2} // Set number of slides to show at a time
                            loop={true} // Enable loop for continuous sliding
                            pagination={{ clickable: true }}
                            modules={[Keyboard, Pagination, Navigation, Autoplay]}
                            // autoplay={{ delay: 2500 }}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1,
                                },
                                640: {
                                    slidesPerView: 1,
                                },
                                768: {
                                    slidesPerView: 2,
                                },
                                1024: {
                                    slidesPerView: 2,
                                },
                            }}
                            className="stage-grid"
                        >
                            <SwiperSlide className="stage">
                                <img className="stageimg" src="/images/stages/1.webp" alt="Stage 1" />
                                <div>
                                    <p className="stage-number stageBorder">STAGE (01)</p>
                                </div>
                                <p className="stage-text">Can Walk With The Help Of Crutches</p>
                            </SwiperSlide>

                            <SwiperSlide className="stage">
                                <img className="stageimg" src="/images/stages/2.webp" alt="Stage 2" />
                                <p className="stage-number stageBorder">STAGE (02)</p>
                                <p className="stage-text">Patient Can Walk With The Help Of Some Support</p>
                            </SwiperSlide>

                            <SwiperSlide className="stage">
                                <img className="stageimg" src="/images/stages/3.webp" alt="Stage 3" />
                                <p className="stage-number stageBorder">STAGE (03)</p>
                                <p className="stage-text">The Patient Will Be Able To Walk On His Own</p>
                            </SwiperSlide>

                            <SwiperSlide className="stage">
                                <img className="stageimg" src="/images/stages/4.webp" alt="Stage 4" />
                                <p className="stage-number">STAGE (04)</p>
                                <p className="stage-text">The Patient Can Go For Walking, Cycling & More</p>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </section>
                <section className="stages containerCustom topSpacing d-lg-block d-none" id="stages">
                    <h3 className="text-center mb-md-4 mb-3 section-ttl">
                        Stages of <span>Knee Recovery</span>
                    </h3>
                    <div className="row stage-row">
                        <div className="line"></div>

                        <div className="col-md-3">
                            <div className="stage-img">
                                <Image width={138} height={138} src="/images/stages-1.webp" alt="stages" />
                            </div>
                            <div className="content-sec">
                                <p className="stage-number">STAGE (01)</p>
                                <p className="stage-text">Can Walk With The Help Of Crunches</p>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="stage-img">
                                <Image width={138} height={138} src="/images/stages-2.webp" alt="stages" />
                            </div>
                            <div className="content-sec">
                                <p className="stage-number">STAGE (02)</p>
                                <p className="stage-text">Patient Can Walk With The Help Of Some Support</p>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="stage-img">
                                <Image width={138} height={138} src="/images/stages-3.webp" alt="stages" />
                            </div>
                            <div className="content-sec">
                                <p className="stage-number">STAGE (03)</p>
                                <p className="stage-text">The Patient Will Be Able To Walk On His Own</p>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="stage-img">
                                <Image width={138} height={138} src="/images/stages-4.webp" alt="stages" />
                            </div>
                            <div className="content-sec">
                                <p className="stage-number">STAGE (04)</p>
                                <p className="stage-text">The Patient Can Go For Walking, Cycling & More</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="youtube" className="topSpaceOnly">
                    {/* YouTube Video Carousel */}
                    <div id="success" className="video-carousel-containerCustom">
                        <h2 className="text-center mb-md-4 mb-3 section-ttl">Patient <span>Success Stories</span></h2>
                    </div>

                    {/* Doctor Card Carousel using Swiper */}
                    <div className="video-carousel-containerCustom">
                        <Swiper
                            spaceBetween={30} // Space between slides
                            slidesPerView={4} // Show 1 slide at a time
                            loop={true} // Infinite loop
                            autoplay={{ delay: 2500 }}
                            modules={[Keyboard, Pagination, Navigation, Autoplay]}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1,
                                },
                                640: {
                                    slidesPerView: 1,
                                },
                                768: {
                                    slidesPerView: 2,
                                },
                                1024: {
                                    slidesPerView: 4,
                                    pagination: {
                                        clickable: false,
                                    },
                                },
                            }}
                            className="owl-carousel card-carousel owl-theme"
                        >
                            {cardData.map((card, index) => (
                                <SwiperSlide key={index}>
                                    <div className="card yt-card w-100">
                                        <Image width={30} height={30} src={QuoteMark.src} className="card-img-top" alt={card.alt} />
                                        <p className="card-text text-white">{card.text}</p>
                                        <p className="card-text text-white">{card.name}</p>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </section>
                <section className="knee-rplc-loc side-space section-space">
                    <h2 className="text-center mb-md-4 mb-3 section-ttl d-block">Our <span>Locations</span></h2>
                    <OurLocation />
                </section>
                <section id="faq" className="topSpacing">
                    <div className="containerCustom">
                        <h3 className="text-center mb-md-4 mb-3 section-ttl">
                            Frequently Asked <span>Questions</span>
                        </h3>
                        <div className="accordion" id="faqAccordion">
                            {faqData.map((item) => (
                                <div className="accordion-item" key={item.id}>
                                    <h2 className="accordion-header" id={`heading${item.id}`}>
                                        <button
                                            className="accordion-button h-auto"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#collapse${item.id}`}
                                            aria-expanded="false"
                                            aria-controls={`collapse${item.id}`}
                                        >
                                            {item.question}
                                        </button>
                                    </h2>
                                    <div
                                        id={`collapse${item.id}`}
                                        className="accordion-collapse collapse"
                                        aria-labelledby={`heading${item.id}`}
                                        data-bs-parent="#faqAccordion"
                                    >
                                        <div className="accordion-body">
                                            {item.answer.map((text, index) => (
                                                <div key={index}>{text}</div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <section id="counter" className="topSpacing" ref={sectionRef}>
                    <div className="containerCustom">
                        <div className="row">
                            <CounterCard
                                imgSrc="images/counter/1.webp"
                                target="150000"
                                description="Successful Knee Replacements"
                                altText="Card 1"
                                resetCounter={resetCounter}
                            />
                            <CounterCard
                                imgSrc="images/counter/2.webp"
                                target="35000"
                                description="Joint Replacements"
                                altText="Card 2"
                                resetCounter={resetCounter}
                            />
                            <CounterCard
                                imgSrc="images/counter/3.webp"
                                target="12000"
                                description="Robotic Knee Replacement Surgeries"
                                altText="Card 3"
                                resetCounter={resetCounter}
                            />
                            <CounterCard
                                imgSrc="images/counter/4.webp"
                                target="50"
                                description="Years of Experience"
                                altText="Card 4"
                                resetCounter={resetCounter}
                            />
                        </div>
                    </div>
                </section>
                <section id="appointment" className="appointment-section topSpacing knee-app-sec">
                    <div className="containerCustom">
                        <div className="row footerRow justify-content-center">
                            <div className="col-lg-2 footerImg">
                                <Image width={530} height={434} src="/images/pain.webp" alt="Pain" />
                            </div>
                            <div className="col-md-12 col-sm-12 col-lg-10 painImg">
                                <div className="card">
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
                                            // required
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
                                            // required
                                            />
                                            {errors.phoneNumber && (
                                                <span className="error" style={{ color: 'red' }}>
                                                    {errors.phoneNumber}
                                                </span>
                                            )}
                                        </div>
                                        <div className="col-md-6">
                                            <select
                                                className="form-select"
                                                name="doctor"
                                                value={formData.doctor}
                                                onChange={handleChange}
                                                aria-label=' Select Doctor'
                                            // required
                                            >
                                                <option value="" disabled>
                                                    Select Doctor
                                                </option>
                                                <option value="Dr.Narendra Vaidya">Dr. Narendra Vaidya</option>
                                                <option value="Dr.Nikhill Likhate">Dr. Nikhill Likhate</option>
                                                <option value="Dr.Rahul Gagare">Dr. Rahul Gagare</option>
                                                <option value="Dr.Rakesh Patil">Dr. Rakesh Patil</option>
                                                <option value="Dr.Ashish Suryawanshi">Dr. Ashish Suryawanshi</option>
                                                <option value="Dr.Satish Kale">Dr. Satish Kale</option>
                                                <option value="Dr.Nilesh Yeole">Dr. Nilesh Yeole</option>
                                            </select>
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
                                            // required
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
                                                className={`button-primary btn-white false w-100 KneeRplcFormBtnId ${formSubmitted ? "disabled-btn" : ""}`}
                                                disabled={formSubmitted}
                                            >
                                                <span className='KneeRplcFormBtnId'>
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

                                    {formSubmitted && (
                                        <div
                                            aria-live="polite"
                                            aria-atomic="true"
                                            style={{ position: 'relative', zIndex: 9999 }}
                                        >
                                            <div style={{ position: 'fixed', top: 110, right: 20 }}>
                                                <div
                                                    className="toast"
                                                    role="alert"
                                                    aria-live="assertive"
                                                    aria-atomic="true"
                                                    data-bs-delay="3000"
                                                >
                                                    <div className="toast-header">
                                                        <strong className="me-auto">Success</strong>
                                                        <button
                                                            type="button"
                                                            className="btn-close"
                                                            data-bs-dismiss="toast"
                                                            aria-label="Close"
                                                        />
                                                    </div>
                                                    <div className="toast-body">Your form has been submitted successfully!</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="row justify-content-center">
                            <div className="col-lg-2"></div>
                            <div className="col-md-12 col-sm-12 col-lg-10 serveIn">
                                <h3 className="text-center text-black mt-4 fw-bold">
                                    Our Satellite OPD Available in Maharashtra
                                </h3>
                                <div style={{ textAlign: 'center' }} className="location-res">
                                    <ul className="d-flex flex-wrap justify-content-center">
                                        <li className="mx-3">Satara</li>
                                        <li className="mx-3">Sangli</li>
                                        <li className="mx-3">Belgaon</li>
                                        <li className="mx-3">Sambhaji Nagar</li>
                                        <li className="mx-3">Jalgaon</li>
                                        <li className="mx-3">Thane & Dadar</li>
                                        <li className="mx-3">Solapur</li>
                                        <li className="mx-3">Latur</li>
                                        <li className="mx-3">Jalna</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default KneeReplacement