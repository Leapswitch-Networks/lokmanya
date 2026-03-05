import React, { useRef, useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import WhyChooseSection from '../../components/WhyChooseSection/WhyChooseSection';
import Head from 'next/head';

const types = [
    {
        image: "./images/endoImages/types1.webp",
        alt: "Robotic Knee Replacement Surgery",
        title: "Deep Endometriosis",
        description: "This is the most severe form of endometriosis involving the penetration of endometrial tissue more than 5mm into affected tissues."
    },
    {
        image: "./images/endoImages/types2.webp",
        alt: "Knee Replacement Surgery",
        title: "Bladder Endometriosis",
        description: "Here, endometrial tissue grows in or on the bladder. Symptoms can include major pelvic pain, frequent urination, and blood in the urine."
    },
    {
        image: "./images/endoImages/types3.webp",
        alt: "Spine Treatments",
        title: "Bowel Endometriosis",
        description: "This type involves endometrial tissue growing on or in the bowel wall, which can cause symptoms like painful bowel movements, abdominal cramping."
    },
    {
        image: "./images/endoImages/types4.webp",
        alt: "Shoulder Treatments",
        title: "Endometriosis of Ureter",
        description: "Endometrial tissue grows on or in the ureters (tubes that carry urine from the kidneys to the bladder). This may lead to kidney damage if left untreated."
    },
    {
        image: "./images/endoImages/types5.webp",
        alt: "Shoulder Treatments",
        title: "Scar Endometriosis",
        description: "This occurs when endometriosis develops in a surgical scar, such as after a cesarean section. It can cause pain and swelling in the scar area."
    },
    {
        image: "./images/endoImages/types6.webp",
        alt: "Shoulder Treatments",
        title: "Inguinal Endometriosis",
        description: "In this rare form, endometrial tissue is found in the inguinal canal, which is a passage in the front abdominal wall. It can cause groin pain and even a palpable mass."
    },
    {
        image: "./images/endoImages/types7.webp",
        alt: "Shoulder Treatments",
        title: "Umbilical Endometriosis",
        description: "This type, also known as “navel endometriosis,” is when endometrial tissue grows in or around the belly button. It can cause a painful nodule to form."
    },
    {
        image: "./images/endoImages/types8.webp",
        alt: "Shoulder Treatments",
        title: "Ovarian Endometriosis",
        description: "This is one of the most common types, where endometrial tissue grows on or in the ovaries, potentially causing cysts called endometriomas."
    }
];

const procedures = [
    {
        image: "./images/endoImages/proc1.webp",
        alt: "Knee/Hip/Shoulder Replacement",
        title: "Pelvic Exam",
        description: "Initial physical examination to check for abnormalities related to endometriosis.",
        backgroundColor: "rgb(226, 255, 254)"
    },
    {
        image: "./images/endoImages/proc3.webp",
        alt: "Carpal Tunnel Release",
        title: "Ultrasound",
        description: "Imaging technique to visualize ovarian cysts (endometriomas) and possible endometrial growths.",
        backgroundColor: "rgb(255, 250, 229)"
    },
    {
        image: "./images/endoImages/proc2.webp",
        alt: "Spinal Fusion",
        title: "MRI (Magnetic Resonance Imaging)",
        description: "Detailed imaging to detect deep infiltrating endometriosis and map pelvic lesions.",
        backgroundColor: "rgb(229, 231, 255)"
    },
    {
        image: "./images/endoImages/proc4.webp",
        alt: "Rotator Cuff Repair",
        title: "Laparoscopy",
        description: "Minimally invasive surgery that allows direct visualization, diagnosis, and removal of endometrial tissue.",
        backgroundColor: "rgb(223, 239, 254)"
    },
    {
        image: "./images/endoImages/proc5.webp",
        alt: "ACL Reconstruction",
        title: "Hormonal Therapy",
        description: "Medical management using hormones to reduce or suppress endometrial tissue growth and alleviate symptoms.",
        backgroundColor: "rgb(255, 237, 231)"
    },
    {
        image: "./images/endoImages/proc6.webp",
        alt: "Fracture Repair",
        title: "Excision Surgery",
        description: "Surgical removal of endometriosis lesions, often performed laparoscopically for symptom relief and fertility improvement.",
        backgroundColor: "rgb(255, 254, 223)"
    }
];

const technologies = [
    {
        icon: './images/endoImages/techIcon1.svg',
        title: 'Ultrasound',
        description:
            'High-frequency imaging to detect ovarian endometriomas and assess pelvic structures.',
    },
    {
        icon: './images/endoImages/techIcon2.svg',
        title: 'Magnetic Resonance Imaging (MRI)',
        description:
            'Detailed imaging for locating deep infiltrating endometrial lesions.',
    },
    {
        icon: './images/endoImages/techIcon3.svg',
        title: 'Laparoscopy',
        description:
            'Minimally invasive procedure allowing for diagnosis and removal of endometrial tissue.',
    },
    {
        icon: './images/endoImages/techIcon4.svg',
        title: 'Robotic-Assisted Laparoscopy',
        description:
            'Precision-enhanced laparoscopic surgery using robotic systems, ideal for complex cases.',
    },
    {
        icon: './images/endoImages/techIcon5.svg',
        title: 'Laser Surgery',
        description:
            'High-precision laser technology used to remove endometrial tissue with minimal damage.',
    },
    {
        icon: './images/endoImages/techIcon6.svg',
        title: 'Genomic and Biomarker Testing',
        description:
            'Emerging tests to detect biomarkers or genetic indicators for early diagnosis of endometriosis.',
    },
];

const faqData = [
    {
        question: "What is Infertility?",
        answer: "Couples at a certain point in time have the desire to conceive. Many studies have found that almost 85% of the couples successfully conceive within one year of trying. However, if they fail to conceive even after trying every method, there are chances that they might be suffering from infertility. Infertility is the inability to conceive within one year. Even if the couples fail to conceive within one year, it is better to consult any reproductive endocrinologist. They must know the right time to take the help of any gynecologist to determine symptoms of infertility.",
        id: "One"
    },
    {
        question: "What are the symptoms of infertility?",
        answer: "Infertility issues are common in both men and women. When it comes to women, irregular periods or even painful and heavy periods are one of the common symptoms. Normally, cycles are of 28 days, which may or may not exceed. It is one of the common infertility symptoms in females since irregular cycles are a sign of PCOS, which is associated with infertility. When it comes to infertility symptoms in men, they include low sexual desire, swelling in testicles. Apart from that, issues with maintaining an erection as well as ejaculation problems can also lead to infertility.",
        id: "Two"
    },
    {
        question: "How to prevent infertility?",
        answer: "Preventing infertility requires maintaining a healthy lifestyle. From maintaining a healthy weight to avoiding alcohol and smoking, everything is important. Also, it is necessary to avoid stress since it is responsible for the infertility issue. Limiting caffeine is also necessary to avoid infertility issues. Both men and women must focus on maintaining a healthy lifestyle for a successful pregnancy.",
        id: "Three"
    },
    {
        question: "Risk factors for infertility",
        answer: "Some of the common factors behind infertility in both men and women are age, weight, sexual history, smoking, etc. With age, both men and women lose the capability of conceiving. The reason behind this is the egg quality and quantity in women degrades, which affects fertility. The sperm count in men reduces too. Similarly, smoking is also a risk factor as it damages the cervix as well as fallopian tubes. The chances of miscarriages also increase due to smoking. Overweight or obesity is yet another common problem that acts as a risk factor behind infertility in both men and women.",
        id: "Four"
    },
    {
        question: "Treatment & Care for infertility",
        answer: "Infertility treatment and care involve various processes. The primary processes include maintaining a healthy lifestyle like healthy eating and exercise. For maintaining fertility levels, it is important to maintain a healthy workout regimen along with good food habits excluding junkies. The secondary options include infertility treatments ranging from medicinal treatments to surgeries that help in increasing fertility levels, both in men and women.",
        id: "Five"
    },
    {
        question: "Treatment Options for men",
        answer: "Changing lifestyle is one of the primary infertility treatments in males. Excluding particular medications, reducing the intake of harmful substances, and increasing the timing of intercourse is quite useful. Next comes the medications since few medications are there that enhance the sperm count. Medications are quite useful in increasing testicular functions like sperm production as well as quality. Surgery is also a good idea since it helps in reversing sperm blockage issues. Also, surgery helps in repairing varicocele that increases the chances for pregnancy.",
        id: "Six"
    },
    {
        question: "Treatment Options for Women",
        answer: "The treatment options vary, while some women need one or two therapies for increasing fertility, others require multiple treatments to get pregnant. Primary infertility treatment in females includes ovulation medications that help in stimulating the ovulation procedure. These medicines either help in regulating or inducing ovulation. Most gynecologists discuss the fertility drug options with the patient and focus on how each medication will help in increasing fertility. IUI or Intrauterine Insemination is yet another useful treatment procedure where healthy sperm is placed inside the uterus during ovulation time. Surgeries are also useful as it helps in removing problems like endometrial polyps or any intrauterine scar tissue. Above everything, it is important to remember that infertility treatment cost varies.",
        id: "Seven"
    }
];
const WhyChooseData = {
    title: "Types of Endometriosis",
    items: [
        {
            image: "./images/endoImages/types1.webp",
            title: "Deep Endometriosis",
            description: "This is the most severe form of endometriosis involving the penetration of endometrial tissue more than 5mm into affected tissues."
        },
        {
            image: "./images/endoImages/types2.webp",
            title: "Bladder Endometriosis",
            description: "Here, endometrial tissue grows in or on the bladder. Symptoms can include major pelvic pain, frequent urination, and blood in the urine."
        },
        {
            image: "./images/endoImages/types3.webp",
            title: "Bowel Endometriosis",
            description: "This type involves endometrial tissue growing on or in the bowel wall, which can cause symptoms like painful bowel movements, abdominal cramping."
        },
        {
            image: "./images/endoImages/types4.webp",
            title: "Endometriosis of Ureter",
            description: "Endometrial tissue grows on or in the ureters (tubes that carry urine from the kidneys to the bladder). This may lead to kidney damage if left untreated."
        },
        {
            image: "./images/endoImages/types5.webp",
            title: "Scar Endometriosis",
            description: "This occurs when endometriosis develops in a surgical scar, such as after a cesarean section. It can cause pain and swelling in the scar area."
        },
        {
            image: "./images/endoImages/types6.webp",
            title: "Inguinal Endometriosis",
            description: "In this rare form, endometrial tissue is found in the inguinal canal, which is a passage in the front abdominal wall. It can cause groin pain and even a palpable mass."
        },
        {
            image: "./images/endoImages/types7.webp",
            title: "Umbilical Endometriosis",
            description: "This type, also known as “navel endometriosis,” is when endometrial tissue grows in or around the belly button. It can cause a painful nodule to form."
        },
        {
            image: "./images/endoImages/types8.webp",
            title: "Ovarian Endometriosis",
            description: "This is one of the most common types, where endometrial tissue grows on or in the ovaries, potentially causing cysts called endometriomas."
        }
    ]
};

const Endometriosis = () => {
    useEffect(() => {
        import('./endometriosis.css');
    }, []);

    const [isOpen, setIsOpen] = useState(false);

    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        city: ''
    });

    const [errors, setErrors] = useState({
        fullName: '',
        phoneNumber: '',
        city: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const validateForm = () => {
        let valid = true;
        let errorMessages = {};

        if (!formData.fullName) {
            errorMessages.fullName = 'Full Name is required';
            valid = false;
        }

        const phoneNumberRegex = /^\d{10}$/;
        if (!formData.phoneNumber) {
            errorMessages.phoneNumber = 'Phone Number is required';
            valid = false;
        } else if (!phoneNumberRegex.test(formData.phoneNumber)) {
            errorMessages.phoneNumber = 'Phone Number must be 10 digits';
            valid = false;
        }

        if (!formData.city) {
            errorMessages.city = 'City is required';
            valid = false;
        }

        setErrors(errorMessages);
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Show success toast message
            toast.success('Your form has been submitted successfully!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            // Clear form after successful submission
            setFormData({
                fullName: '',
                phoneNumber: '',
                city: ''
            });
        }
    };

    return (
        <>
            <Head>
                <title>Lokmanya Hospitals-Endometriosis</title>
            </Head>
            <header>
                <div className="mobile-bootom-header">
                    <div className="mb-logo-sec">
                        <a href="/">
                            <img loading="lazy" src="./images/endoImages/logo.svg" alt="app logo" />
                        </a>
                    </div>
                    <button
                        aria-label="menu button"
                        type="button"
                        className="btn-hamburger"
                        onClick={() => setIsOpen(true)}
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
                    <div id="toggle-nav" className={`sidebar-nav ${isOpen && "is-open"}`}>
                        <div className="nav-header">
                            <a aria-current="page" className="mob-logo active" href="/">
                                <img
                                    loading="lazy"
                                    src="./images/endoImages/logo.svg"
                                    alt="header logo"
                                    height="30"
                                    crossOrigin="anonymous"
                                />
                            </a>
                            <button
                                type="button"
                                id="close-nav"
                                className="btn-menu-close"
                                onClick={() => setIsOpen(false)}
                                aria-label="Close Header"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="15"
                                    height="15"
                                    viewBox="0 0 26.072 26.071"
                                >
                                    <g transform="translate(0 -0.016)">
                                        <g transform="translate(0 0.016)">
                                            <path
                                                className="ac"
                                                d="M15.908,13.051,25.656,3.3a1.429,1.429,0,0,0,0-2.016L24.8.432a1.43,1.43,0,0,0-2.017,0L13.037,10.18,3.288.432a1.429,1.429,0,0,0-2.016,0l-.855.854a1.427,1.427,0,0,0,0,2.016l9.748,9.749L.417,22.8a1.43,1.43,0,0,0,0,2.017l.854.854a1.429,1.429,0,0,0,2.016,0l9.749-9.748,9.748,9.748a1.415,1.415,0,0,0,1.008.416h0A1.415,1.415,0,0,0,24.8,25.67l.854-.854a1.43,1.43,0,0,0,0-2.017Z"
                                            ></path>
                                        </g>
                                    </g>
                                </svg>
                            </button>
                        </div>
                        <ul className="navbar-nav">
                            <li>
                                <a className="nav-link" href="#overview">
                                    Overview
                                </a>
                            </li>
                            <li>
                                <a className="" href="#types">
                                    Types
                                </a>
                            </li>
                            <li>
                                <a className="nav-link" href="#procedures">
                                    Procedures
                                </a>
                            </li>
                            <li>
                                <a className="nav-link" href="#technologies">
                                    Technologies
                                </a>
                            </li>
                            <li>
                                <a className="nav-link" href="#faq">
                                    FAQs
                                </a>
                            </li>
                        </ul>
                        <div className="right-emg-sec">
                            <img
                                loading="lazy"
                                src="./images/endoImages/call-gradient.svg"
                                alt="call in gradient"
                            />
                            <div className="emg-text">
                                <p> For Emergency/ Appointment</p>
                                <a href="tel:+919307076767">93 0707 6767</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bottom-header">
                    <div className="row bottom-header-row">
                        <div className="d-none d-lg-block col-md-3 col-xxl-2 ">
                            <div className="logo-sec">
                                <a href="/">
                                    <img loading="lazy" src="./images/endoImages/logo.svg" alt="app logo" />
                                </a>
                            </div>
                        </div>
                        <nav className="col-xxl-6 col-md-6">
                            <ul className="navbar">
                                <li>
                                    <a className="nav-link" href="#overview">
                                        Overview
                                    </a>
                                </li>
                                <li>
                                    <a className="" href="#types">
                                        Types
                                    </a>
                                </li>
                                <li>
                                    <a className="nav-link" href="#procedures">
                                        Procedures
                                    </a>
                                </li>
                                <li>
                                    <a className="nav-link" href="#technologies">
                                        Technologies
                                    </a>
                                </li>
                                <li>
                                    <a className="nav-link" href="#faq">
                                        FAQs
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        <div className="col-md-3">
                            <div className="right-appoi-btn">
                                <a type="button" href="#bookNow" className="button-primary false">
                                    <span>Book An Appointment</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="banner-main">
                <div className="row g-0 justify-content-center">
                    <div className="col-md-8 col-lg-8 banner-left-col">
                        <div className="banner-left-sec">
                            <div className="career-banner-left">
                                <h1 className="page-heading mb-3 widthWrapper">
                                    Consultation With Expert Dr. Jay Mehta
                                </h1>
                                <h5>Endometriosis Surgeon & Fertility Specialist</h5>
                                <p>
                                    Dr. Jay Mehta, a leading IVF specialist in Pune, boasting over
                                    10 years of successful fertility treatment experience.
                                </p>
                                <div className="primaryBtnDiv">
                                    <a href="#bookNow" className="button-primary false">
                                        <span>Book An Appointment</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 banner-right-col">
                        <div
                            className="banner-right-sec bg-before"
                            style={{
                                background: 'center center / cover rgb(239, 219, 209)',
                            }}
                        >
                            <img
                                loading="lazy"
                                src="./images/endoImages/bannerRight.webp"
                                alt="banner-right"
                                className="banner-right"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <section id="overview" className="overview-section side-space section-space">
                <h2 className="page-heading">Overview</h2>
                <div className="para">
                    <p>
                        Endometriosis is a painful disease. This disease develops when the
                        endometrial-like tissue acts as a wound; thus, it thickens and bleeds
                        at the time of menstruation. But it does not find any exit and gets
                        trapped, forming underlining. It grows inside the uterus, and the
                        endometrium grows outside the uterus. Endometriosis can develop in
                        your fallopian tubes, ovaries, and in the lining of the pelvis.
                    </p>
                    <p className="mb-0">
                        In extreme situations, Endometriosis can grow an infertility problem.
                        Endometriosis can cause severe pain at the time of menstruation.
                    </p>
                </div>
            </section>
            <section className="section-below-space side-space">
                <h2 className="section-heading">When To Consult</h2>
                <div className="row">
                    <div className="consultation-card col-md-6 col-sm-6 col-lg-3">
                        <img
                            loading="lazy"
                            src="./images/endoImages/when1.webp"
                            alt="Injuries"
                            className="consultation-image"
                        />
                        <h5 className="card-ttl">Pain During Intercourse</h5>
                        <p>You may experience extreme pain during or after intercourse.</p>
                    </div>
                    <div className="consultation-card col-md-6 col-lg-3 col-sm-6">
                        <img
                            loading="lazy"
                            src="./images/endoImages/when2.webp"
                            alt="Arthritis Management"
                            className="consultation-image"
                        />
                        <h5 className="card-ttl">Pain During Excretion</h5>
                        <p>There will be pain during pooping especially during the menstrual cycle.</p>
                    </div>
                    <div className="consultation-card col-md-6 col-lg-3 col-sm-6">
                        <img
                            loading="lazy"
                            src="./images/endoImages/when3.webp"
                            alt="Limited Range Of Motion"
                            className="consultation-image"
                        />
                        <h5 className="card-ttl">Excessive Bleeding</h5>
                        <p>The blood flow during periods or urine on regular days too.</p>
                    </div>
                    <div className="consultation-card col-md-6 col-lg-3 col-sm-6">
                        <img
                            loading="lazy"
                            src="./images/endoImages/when4.webp"
                            alt="Pain Symptoms"
                            className="consultation-image"
                        />
                        <h5 className="card-ttl">Infertility</h5>
                        <p>You may be facing problems relating to infertility.</p>
                    </div>
                </div>
            </section>
            <WhyChooseSection data={WhyChooseData} />
            <section id="procedures" className="orthopedic-procedures section-space side-space">
                <h2 className="section-heading">Endometriosis Procedures</h2>
                <div id="orthopedic-procedures" className="row g-3">
                    {procedures.map((procedure, index) => (
                        <div className="col-sm-12 col-md-6 col-lg-4" key={index}>
                            <div className="procedure-card" style={{ backgroundColor: procedure.backgroundColor }}>
                                <img
                                    loading="lazy"
                                    src={procedure.image}
                                    alt={procedure.alt}
                                    className="procedure-image"
                                />
                                <h4>{procedure.title}</h4>
                                <p>{procedure.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <section className="expert side-space section-space">
                <div className="row align-items-center">
                    <div className="col-md-8">
                        <div className="expertDiv expertLeftCard">
                            <div className="content">
                                <h2 className="section-left-heading">Consultation With Expert Dr. Jay Mehta</h2>
                                <h5>Endometriosis Surgeon & Fertility Specialist</h5>
                                <p>
                                    Dr. Jay Mehta, a leading IVF specialist in Pune, boasting over 10 years of successful fertility treatment experience.
                                </p>
                                <a href="#bookNow" className="button-primary">
                                    <span>Book An Appointment</span>
                                </a>
                            </div>
                            <a href="#bookNow">
                                <div className="icon-container1">
                                    <svg
                                        className="arrowExpert"
                                        width="11"
                                        height="11"
                                        viewBox="0 0 11 11"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M7.59706 2.21507L0.242241 9.56989L1.39794 10.7256L8.75275 3.37076L8.75275 9.56991L10.3872 9.56991L10.3872 0.580666L1.39791 0.580666L1.39791 2.21507L7.59706 2.21507Z"
                                            fill="#fff"
                                        ></path>
                                        <defs>
                                            <linearGradient
                                                id="paint0_linear_1252_152"
                                                x1="10.3872"
                                                y1="0.580667"
                                                x2="0.242241"
                                                y2="10.7256"
                                                gradientUnits="userSpaceOnUse"
                                            >
                                                <stop stopColor="#F6811F"></stop>
                                                <stop offset="0.511069" stopColor="#4C586B"></stop>
                                                <stop offset="1" stopColor="#134A85"></stop>
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                            </a>
                            <svg
                                className="corner-img"
                                width="50"
                                height="50"
                                viewBox="0 0 50 50"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M-162 -75H-177V-60C-177 -68.2843 -170.284 -75 -162 -75ZM35 -75C43.2843 -75 50 -68.2843 50 -60V-75H35ZM50 6.87228C50 11.1026 44.2303 14 40 14H29C20.7157 14 14 20.7157 14 29V40C14 44.2303 11.1026 50 6.87227 50H50V6.87228ZM-162 50C-170.284 50 -177 43.2843 -177 35V50H-162Z"
                                    fill="#fff"
                                ></path>
                            </svg>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="expertRightCard">
                            <img loading="lazy" src="./images/endoImages/expert.webp" alt="expert" />
                        </div>
                    </div>
                </div>
            </section>
            <section id="technologies" className="technologies section-space side-space">
                <h2 className="section-heading">Technologies</h2>
                <div className="technologies-grid">
                    {technologies.map((tech, index) => (
                        <div key={index} className="technology-card">
                            <div className="icon">
                                <img loading="lazy" src={tech.icon} alt={tech.title} />
                            </div>
                            <h4>{tech.title}</h4>
                            <p className="tech-desc">{tech.description}</p>
                        </div>
                    ))}
                </div>
            </section>
            <section id="faq" className="section-space">
                <div className="containerCustom section-space side-space">
                    <h3 className="section-heading">Frequently Asked Questions</h3>
                    <div className="accordion" id="faqAccordion">
                        {faqData.map((faq, index) => (
                            <div className="accordion-item" key={faq.id}>
                                <h2 className="accordion-header" id={`heading${faq.id}`}>
                                    <button
                                        className={`accordion-button ${index === 0 ? 'show' : ''}`}
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#collapse${faq.id}`}
                                        aria-expanded={index === 0 ? 'true' : 'false'}
                                        aria-controls={`collapse${faq.id}`}
                                    >
                                        {faq.question}
                                    </button>
                                </h2>
                                <div
                                    id={`collapse${faq.id}`}
                                    className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                                    aria-labelledby={`heading${faq.id}`}
                                    data-bs-parent="#faqAccordion"
                                >
                                    <div className="accordion-body">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section id="bookNow" className="side-space section-space boaSection">
                <div className="row">
                    <div className="col-md-2 setImgDiv1">
                        <img loading="lazy" src="./images/endoImages/boa.webp" alt="women" />
                    </div>
                    <div className="col-md-10 setImgDiv2">
                        <div className="boaDiv">
                            <div className="formDiv">
                                <form method="POST" onSubmit={handleSubmit}>
                                    <div className="row gy-3">
                                        <h2 className="text-center whiteText">Book An Appointment</h2>
                                        <div className="boaInputFields col-md-12">
                                            <input
                                                type="text"
                                                name="fullName"
                                                id="full_name"
                                                className="boaInput"
                                                placeholder="Full Name*"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                            />
                                            <p className="error error-message mb-0">{errors.fullName}</p>
                                        </div>
                                        <div className="boaInputFields col-md-12">
                                            <input
                                                type="text"
                                                name="phoneNumber"
                                                id="phone_number"
                                                className="boaInput"
                                                placeholder="Phone Number*"
                                                value={formData.phoneNumber}
                                                onChange={handleChange}
                                            />
                                            <p className="error error-message mb-0">{errors.phoneNumber}</p>
                                        </div>
                                        <div className="boaInputFields col-md-12">
                                            <input
                                                type="text"
                                                name="city"
                                                id="city"
                                                className="boaInput"
                                                placeholder="City*"
                                                value={formData.city}
                                                onChange={handleChange}
                                            />
                                            <p className="error error-message mb-0">{errors.city}</p>
                                        </div>
                                        <div className="boaInputFields col-md-12">
                                            <button type="submit" className="boaBtn">
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ToastContainer to render the toast notifications */}
                <ToastContainer />
            </section>
            <footer className="footer">
                <div className="footer-inner">
                    <div className="footer-bottom">
                        <p className="copy-right">
                            Copyright 2024, All Rights Reserved with Lokmanya Hospitals, Powered by{" "}
                            <a
                                href="https://www.hatsoffdigital.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Hats-Off
                            </a>
                        </p>
                        <div>
                            <a href="#">Privacy Policy</a> | <a href="#">Medical Disclaimer</a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Endometriosis