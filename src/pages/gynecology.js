import React, { useState, useEffect } from "react";
import { CommonBanner } from '../site/components';


import kneeImage from "../site/assets/images/OBGYBanner.webp";


import Icon1 from '../site/assets/images/Patient-CenteredCare.svg';
import Icon2 from '../site/assets/images/AdvancedDiagnosticTechnology.svg';
import Icon3 from '../site/assets/images/MinimallyInvasiveTechnique.svg';
import Icon4 from '../site/assets/images/Comprehensive Wellness Programs.svg';
import Icon5 from '../site/assets/images/AffordableWomenHealthServices.svg';


import conditionIcon1 from '../site/assets/images/Irregular Periods.svg';
import conditionIcon2 from '../site/assets/images/Menstrual Disorders.svg';
import conditionIcon3 from '../site/assets/images/Polycystic Ovary Syndrome.svg';
import conditionIcon4 from '../site/assets/images/endometriosis.svg';
import conditionIcon5 from '../site/assets/images/Fibroids and Ovarian Cysts.svg';
import conditionIcon6 from '../site/assets/images/Pelvic Inflammatory Disease.svg';
import conditionIcon7 from '../site/assets/images/Infertility.svg';
import conditionIcon8 from '../site/assets/images/Menopause and Hormonal Imbalances.svg';
import conditionIcon9 from '../site/assets/images/High-RiskPregnancy.svg';
import conditionIcon10 from '../site/assets/images/Urinary Incontinence.svg';
import conditionIcon11 from '../site/assets/images/Adolescent Gynecological Issues.svg';
import conditionIcon12 from '../site/assets/images/Postpartum Recovery.svg';
import WhyChooseSection from '../site/components/WhyChooseSection/WhyChooseSection';
import OurServicesSection from "../site/components/OurServicesSection/OurServicesSection";
import WhatsetsApartSection from "../site/components/WhatSetsApartSection/WhatsetsApartSection";
import WhenConsultSection from "../site/components/WhenConsultSection/WhenConsultSection";
import ConditionsTreatSection from "../site/components/ConditionsTreatSection/ConditionsTreatSection";
import FaqSection from "../site/components/FaqSection/FaqSection";
import PatientSuccessStories from "../site/components/PatientsSuccessStorySection/PatientSuccessStories";
import LokmanyaNetwork from "../site/components/LokmanyaNetworkSection/LokmanyaNetwork";
import Head from "next/head";
import { useRouter } from "next/router";
import { getSpecialityDoctors } from "@/ApiActions/CommonApi";
import MeetOurExpertSpeciality from "@/site/components/MeetOurExpertSpeciality";


const WhyChooseData = {
    title: "Why Choose Lokmanya Hospitals for Gynecology & Women’s Health?",
    description: "Lokmanya Hospital is a trusted name in women’s healthcare, known for its commitment of delivering world-class medical services. Here’s why we stand out in the field of gynecology and women’s health :",
    items: [
        {
            title: "Comprehensive Women’s Health Services",
            description: "We offer a broad spectrum of services, from routine screenings and preventive care to specialized treatments for complex gynecological conditions.",
            image: "/images/specialities-images/Gync/ComprehensiveWomenServices.webp",
        },
        {
            title: "Expert Gynecologists",
            description: "Our team of highly skilled and experienced gynecologists is dedicated to providing compassionate care, utilizing the latest techniques and technologies to ensure the best outcomes.",
            image: "/images/specialities-images/Gync/ExpertGynecologists.webp",
        },
        {
            title: "State-of-the-Art Facilities",
            description: "Our women’s health department is equipped with advanced diagnostic tools, including ultrasounds, laparoscopy, and hysteroscopy, for accurate diagnosis and treatment planning.",
            image: "/images/specialities-images/Gync/State-of-the-ArtFacilities.webp",
        },
        {
            title: "Personalized Care Plans",
            description: "We understand that every woman’s health needs are unique. Our specialists create customized treatment plans tailored to your individual requirements, ensuring optimal care.",
            image: "/images/specialities-images/Gync/PersonalizedCarePlans.webp",
        },
        {
            title: "Minimally Invasive Procedures",
            description: "Whenever possible, we offer minimally invasive options that reduce recovery times, minimize discomfort, and enhance overall treatment outcomes.",
            image: "/images/specialities-images/Gync/MinimallyInvasive-gync.webp",
        },
        {
            title: "Affordable and Accessible Care",
            description: "We are committed to providing affordable and high-quality women’s healthcare, ensuring that top-notch services are accessible to all our patients.",
            image: "/images/specialities-images/Affordable.webp",
        },
    ]
};

const serviceData = {
    title: "Our Gynecology & Women’s Health Services",
    items: [
        {
            title: "Routine Gynecological Check-ups",
            description: "Regular health screenings are essential for women of all ages. Our comprehensive check-ups include Pap smears, breast examination, pelvic examination and hormone level assessments to detect any potential issues early.",
            imageUrl: "/images/specialities-images/Gync/RoutineGynecological.webp",
        },
        {
            title: "Infertility Treatment",
            description: "We specialize in diagnosing and treating infertility, offering a range of services from medication and assisted reproductive technologies to advanced surgical interventions.",
            imageUrl: "/images/specialities-images/Gync/InfertilityTreatment.webp",
        },
        // {
        //     title: "Menopause Care",
        //     description: "Our team provides personalized care for women navigating menopause, offering hormone replacement therapy (HRT), lifestyle guidance, and treatments for common symptoms like hot flashes and mood swings.",
        //     imageUrl: img3,
        // },
        {
            title: "High-Risk Pregnancy Care",
            description: "For women with high-risk pregnancies, we provide expert monitoring and management to ensure both mother and baby are well taken care of throughout the pregnancy.",
            imageUrl: "/images/specialities-images/Gync/High-RiskPregnancyCare.webp",
        },
        {
            title: "Gynecological Surgery",
            description: "Our surgeons are experienced in performing both laparoscopic and traditional surgeries for conditions like fibroids, ovarian cysts, endometriosis, and uterine cancers.",
            imageUrl: "/images/specialities-images/Gync/GynecologicalSurgery.webp",
        },
        {
            title: "Breast Health Services",
            description: "We offer comprehensive breast health services, including screening mammograms, ultrasound, biopsies, and treatments for conditions like fibrocystic breast disease and breast cancer.",
            imageUrl: "/images/specialities-images/Gync/BreastHealthServices.webp",
        },
        {
            title: "Pelvic Floor Disorders",
            description: "Our specialists treat pelvic floor conditions, including urinary incontinence, prolapse, and pelvic pain, using non-invasive and surgical options tailored to each patient’s needs.",
            imageUrl: "/images/specialities-images/Gync/PelvicFloorDisorders.webp",
        },
        {
            title: "Adolescent Gynecology",
            description: "Our team provides care for young women, including counseling on menstrual health, contraception, and early prevention of gynecological issues.",
            imageUrl: "/images/specialities-images/Gync/AdolescentGynecology.webp",
        },
        {
            title: "Postpartum Care",
            description: "We offer comprehensive postpartum care to ensure new mothers recover well physically and emotionally, with support for breastfeeding, mental health, and pelvic health.",
            imageUrl: "/images/specialities-images/Gync/PostpartumCare.webp",
        }
    ]
};

const whatsetsApartdata = {
    title: "Gynecology & Women’s Health at Lokmanya Hospitals – What Sets Us Apart?",
    items: [
        {
            title: "Patient-Centered Care",
            description: "We believe in treating each patient as an individual, offering personalized care plans designed to address your specific health needs and concerns.",
            icon: Icon1,
        },
        {
            title: "Advanced Diagnostic Technology",
            description: "Early detection is key to effective treatment. Our state-of-the-art diagnostic tools, including ultrasounds and laparoscopy, allow us to accurately assess and treat your condition.",
            icon: Icon2,
        },
        {
            title: "Minimally Invasive Techniques",
            description: "We use the latest minimally invasive techniques, reducing recovery time and minimizing discomfort for our patients, so you can return to your daily activities faster.",
            icon: Icon3,
        },
        {
            title: "Comprehensive Wellness Programs",
            description: "Our services extend beyond treatment, offering wellness programs that focus on overall health, including nutrition, mental health, and lifestyle modifications.",
            icon: Icon4,
        },
        {
            title: "Affordable Women’s Health Services",
            description: "We are committed to making quality women’s healthcare affordable and accessible, providing exceptional care without compromising on cost.",
            icon: Icon5,
        }
    ]
};

const consultationData = {
    title: "When to Consult a Gynecologist?",
    items: [
        {
            title: "Irregular or Painful Periods",
            description: "If you experience abnormal menstrual cycles or severe pain, it may indicate an underlying condition that needs attention.",
            image: "/images/specialities-images/Gync/IrregularPeriodPain.webp",
        },
        {
            title: "Difficulty Getting Pregnant",
            description: "If you’ve been trying to conceive for over a year without success, it’s time to consult a fertility specialist.",
            image: "/images/specialities-images/Gync/DifficultyGettingPregnant.webp",
        },
        {
            title: "Pain During Intercourse",
            description: "Persistent pain during intercourse can be a sign of a gynecological issue, such as endometriosis or fibroids.",
            image: "/images/specialities-images/Gync/PainDuringIntercourse.webp",
        },
        {
            title: "Breast Lumps or Changes",
            description: "Any unusual lumps, tenderness, or changes in your breasts should be evaluated by a healthcare professional.",
            image: "/images/specialities-images/Gync/BreastLumpsChanges.webp",
        },
        {
            title: "Menopausal Symptoms",
            description: "If you’re experiencing symptoms like hot flashes, mood swings, or sleep disturbances, it may be time to seek guidance on managing menopause.",
            image: "/images/specialities-images/Gync/MenopausalSymptoms.webp",
        },
        {
            title: "Pelvic Pain or Discomfort",
            description: "Chronic pelvic pain or discomfort can indicate conditions like fibroids, endometriosis, or pelvic floor disorders that need medical attention.",
            image: "/images/specialities-images/Gync/pelvic-pain.webp",
        },
        {
            title: "Planning to Start the Family",
            description: "Consultation for those considering starting a family to discuss preconception care and fertility support.",
            image: "/images/specialities-images/Gync/FamilyPlanning.webp",
        },
        {
            title: "Family History of Gynecological Cancer",
            description: "If you have a family history of gynecological cancer, it’s important to have regular screenings and discuss preventative care options.",
            image: "/images/specialities-images/Gync/FamilyHistory-gync.webp",
        },
        {
            title: "Excessive White Discharge Per Vaginum",
            description: "If you notice an unusual increase in vaginal discharge, it may signal an infection or other medical issue.",
            image: "/images/specialities-images/Gync/ExcessiveWhiteDischargePerVaginum.webp",
        },
        {
            title: "Intermenstrual Bleeding",
            description: "Bleeding between periods can be a sign of underlying conditions like fibroids, infections, or hormonal imbalances.",
            image: "/images/specialities-images/Gync/IntermenstrualBleeding.webp",
        }
    ]
};

const ConditionsTreatData = {
    title: "Conditions We Treat",
    subtitle: "At Lokmanya Hospitals, we specialize in diagnosing and treating a wide range of gynecological and women’s health conditions, including :",
    items: [
        {
            title: "Irregular Periods",
            icon: conditionIcon1,
        },
        {
            title: "Menstrual Disorders",
            icon: conditionIcon2,
        },
        {
            title: "Polycystic Ovary Syndrome (PCOS)",
            icon: conditionIcon3,
        },
        {
            title: "Endometriosis",
            icon: conditionIcon4,
        },
        {
            title: "Fibroids and Ovarian Cysts",
            icon: conditionIcon5,
        },
        {
            title: "Pelvic Inflammatory Disease (PID)",
            icon: conditionIcon6,
        },
        {
            title: "Infertility",
            icon: conditionIcon7,
        },
        {
            title: "Menopause and Hormonal Imbalances",
            icon: conditionIcon8,
        },
        {
            title: "High-Risk Pregnancy",
            icon: conditionIcon9,
        },
        {
            title: "Urinary Incontinence and Pelvic Organ Prolapse",
            icon: conditionIcon10,
        },
        {
            title: "Adolescent Gynecological Issues",
            icon: conditionIcon11,
        },
        {
            title: "Postpartum Recovery",
            icon: conditionIcon12,
        }
    ]
};

const faqs = [
    {
        question: "What are the symptoms of menopause?",
        answer: "Common symptoms include hot flashes, night sweats, mood changes, irregular periods, and vaginal dryness. Our specialists can help manage these symptoms through hormone therapy and lifestyle changes.",
    },
    {
        question: "How can I improve my fertility?",
        answer: "Treatment for infertility depends on the underlying cause. Options include medication, lifestyle changes, and assisted reproductive technologies like IVF. Our specialists will guide you through the best options for your condition.",
    },
    {
        question: "What is endometriosis?",
        answer: "Endometriosis is a condition where tissue similar to the lining of the uterus grows outside the uterus, causing pain and fertility issues. Treatment options include medication, hormone therapy, and surgery.",
    },
];


const Gynecology = () => {
    
        const router = useRouter();
        const slug = router.pathname;
        const [doctorData, setData] = useState([]);
        useEffect(() => {
            if (!slug || slug.length === 0) return;
    
            const fullSlug = (Array.isArray(slug) ? slug.join('/') : slug).replace(/^\/+/, '');
            const fetchDoctors = async () => {
                try {
                    const response = await getSpecialityDoctors(fullSlug);
                    if (!response?.data || response.data.length === 0) {
                        return;
                    }
    
                    setData(response.data); // set fetched data
                } catch (error) {
                    console.error("Failed to fetch doctors:", error);
                }
            };
    
            fetchDoctors();
        }, [slug]);
    return (
        <>
            <Head>
                <title>Best Gynecology Hospital in Pune | Lokmanya Hospital​s</title>
                <meta name="description" content="Lokmanya Hospital offers expert gynecology care in Pune — from infertility, PCOS,
and menstrual disorders to advanced laparoscopic gynecologic surgeries." />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Hospital",
                        "name": "Lokmanya Hospital",
                        "url": "https://www.lokmanyahospitals.com/gynecology",
                        "description": "Lokmanya Hospital offers comprehensive gynecology and obstetrics services, providing expert care for women's health, including prenatal care, childbirth, and reproductive health services in Pune, Maharashtra.",
                        "medicalSpecialty": "Gynecology",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "402/A Gokhale Nagar Road, Vetal Baba Chowk, off Senapati Bapat, Pune, Maharashtra 411016",
                            "addressLocality": "Pune",
                            "addressRegion": "Maharashtra",
                            "postalCode": "411016",
                            "addressCountry": "IN"
                        },
                        "contactPoint": {
                            "@type": "ContactPoint",
                            "telephone": "+91-72-1934-3223",
                            "contactType": "Customer Service",
                            "email": "care@lokmanyahospitals.com"
                        }
                    })}
                </script>
            </Head>
            <section>
                <CommonBanner bgColor={"#EFEDD1"} bgImage={kneeImage.src}>
                    <div className="header-section">
                        <h1 className="page-heading">Gynecology & Women’s Health</h1>
                        <p className="subtitle">
                            At Lokmanya Hospitals, we offer comprehensive gynecology services, from routine check-ups to advanced treatments for infertility, menopause, and gynecological cancers. Our expert team is dedicated to providing compassionate, personalized care for women at every stage of life.
                        </p>
                    </div>
                </CommonBanner>
                <div className="overview-section side-space section-space">
                    <h2 className="page-heading">Overview</h2>
                    <div className="para">
                        <p >
                            At Lokmanya Hospitals, we understand the unique healthcare needs of women and are committed to provide exceptional gynecology and women’s health services. From routine check-ups to complex conditions like infertility, menopause and gynecological cancers, our experienced team of specialists is here to support you at every stage of life. With advanced technology, compassionate care, and personalized treatment plans, we ensure that your health and well-being are in expert hands.
                        </p>
                        <p >
                            Our gynecology services encompass a wide range of preventive, diagnostic and therapeutic options, including minimally invasive surgeries, hormone therapy, and wellness programs. We are dedicated to help women maintain a healthy lifestyle, ensuring that you can live your life with confidence and vitality.
                        </p>
                    </div>
                </div>
            </section>
            <WhyChooseSection data={WhyChooseData} />
            <OurServicesSection data={serviceData} />
             {doctorData && doctorData.length > 0 && (
                <MeetOurExpertSpeciality data={doctorData} />
            )}
            <WhatsetsApartSection data={whatsetsApartdata} />
            <WhenConsultSection data={consultationData} />
            <ConditionsTreatSection data={ConditionsTreatData} />
            <FaqSection data={faqs} />
            <PatientSuccessStories />
            <LokmanyaNetwork />
        </>
    )
}

export default Gynecology
