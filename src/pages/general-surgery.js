import React, { useState, useEffect } from "react";
import { CommonBanner } from '../site/components';


import kneeImage from "../site/assets/images/generalsurgerybanner.webp";


import Icon1 from '../site/assets/images/Patient-CenteredCare.svg';
import Icon2 from '../site/assets/images/AdvancedDiagnosticTechnology.svg';
import Icon3 from '../site/assets/images/ComprehensivePreandPostOperativeCare.svg';
import Icon4 from '../site/assets/images/AffordableandAccessible.svg';


import conditionIcon1 from '../site/assets/images/Appendicitis.svg';
import conditionIcon2 from '../site/assets/images/Gallstones.svg';
import conditionIcon3 from '../site/assets/images/Hernias.svg';
import conditionIcon4 from '../site/assets/images/Colorectalconditions.svg';
import conditionIcon5 from '../site/assets/images/NeonatalSurgery.svg';
import conditionIcon7 from '../site/assets/images/TongueTieRelease.svg';
import conditionIcon8 from '../site/assets/images/StaplerCircumcision2.svg';
import conditionIcon9 from '../site/assets/images/SurgeryofBladder.svg';
import conditionIcon10 from '../site/assets/images/PediatricTumors.svg';
import conditionIcon11 from '../site/assets/images/Thoracotomy.svg';
import conditionIcon12 from '../site/assets/images/Gastrointestinaldisorders.svg';
import conditionIcon13 from '../site/assets/images/Softtissuelumpsandcysts.svg';
import conditionIcon14 from '../site/assets/images/Infectionsandabscesses.svg';

import WhyChooseSection from "../site/components/WhyChooseSection/WhyChooseSection";
import OurServicesSection from "../site/components/OurServicesSection/OurServicesSection";
import WhatsetsApartSection from "../site/components/WhatSetsApartSection/WhatsetsApartSection";
import WhenConsultSection from "../site/components/WhenConsultSection/WhenConsultSection";
import ConditionsTreatSection from "../site/components/ConditionsTreatSection/ConditionsTreatSection";
import FaqSection from "../site/components/FaqSection/FaqSection";
import PatientSuccessStories from "../site/components/PatientsSuccessStorySection/PatientSuccessStories";
import LokmanyaNetwork from "../site/components/LokmanyaNetworkSection/LokmanyaNetwork";
import Head from "next/head";
import MeetOurExpertSpeciality from "@/site/components/MeetOurExpertSpeciality";
import { getSpecialityDoctors } from "@/ApiActions/CommonApi";
import { useRouter } from "next/router";


const WhyChooseData = {
    title: "Why Choose Lokmanya Hospitals for General Surgery?",
    description: "Lokmanya Hospitals is a trusted name in the healthcare industry, known for its excellence in surgical care. Here’s why you should choose us for your surgical needs :",
    items: [
        {
            title: "Comprehensive Surgical Treatments",
            description: "We offer a wide variety of general surgery services, including both elective and emergency procedures, designed to address various health conditions.",
            image: "/images/specialities-images/GeneralSurgery/ComprehensiveSurgicalTreatments.webp",
        },
        {
            title: "Experienced Surgeons",
            description: "Our team of highly skilled surgeons is equipped with the latest techniques and technology to provide the best surgical care.",
            image: "/images/specialities-images/GeneralSurgery/ExperiencedSurgeons.webp",
        },
        {
            title: "State-of-the-Art Facilities",
            description: "Our surgical department is equipped with cutting-edge diagnostic tools and operating theaters, ensuring precise and effective treatment.",
            image: "/images/specialities-images/GeneralSurgery/State-of-the-ArtFacilities.webp",
        },
        {
            title: "Personalized Care Plans",
            description: "Every patient’s condition is unique. Our surgeons work closely with you to develop customized treatment plans that are tailored to your specific needs.",
            image: "/images/specialities-images/GeneralSurgery/PersonalizedCarePlans.webp",
        },
        {
            title: "Minimally Invasive Options",
            description: "Whenever possible, we use minimally invasive techniques to ensure quicker recovery times, reduced pain, and fewer complications.",
            image: "/images/specialities-images/GeneralSurgery/MinimallyInvasiveTechniques.webp",
        },
        {
            title: "Affordable and Accessible Care",
            description: "We are committed to making high-quality general surgery accessible to everyone, offering affordable treatment options without compromising on quality.",
            image: "/images/specialities-images/Affordable.webp",
        },
    ]
};


const serviceData = {
    title: "Our General Surgery Services",
    items: [
        {
            title: "Appendectomy",
            description: "Treatment for appendicitis through the removal of the appendix, performed using both traditional and minimally invasive techniques.",
            imageUrl: "/images/specialities-images/GeneralSurgery/Appendectomy.webp",
        },
        {
            title: "Hernia Repair",
            description: "Surgical treatment for various types of hernias, ensuring a quick and effective recovery with minimal discomfort.",
            imageUrl: "/images/specialities-images/GeneralSurgery/HerniaRepair.webp",
        },
        {
            title: "Gallbladder Surgery",
            description: "We offer both laparoscopic and open surgeries for gallbladder conditions, including gallstones and inflammation.",
            imageUrl: "/images/specialities-images/GeneralSurgery/GallbladderSurgery.webp",
        },
        {
            title: "Bowel Resection",
            description: "Surgical removal of damaged or diseased portions of the intestines, helping to improve digestion and overall health.",
            imageUrl: "/images/specialities-images/GeneralSurgery/BowelResection.webp",
        },
        {
            title: "Thyroid Surgery",
            description: "Removal of thyroid nodules or the entire thyroid gland in cases of thyroid cancer or hyperthyroidism.",
            imageUrl: "/images/specialities-images/GeneralSurgery/ThyroidSurgery.webp",
        },
        {
            title: "Breast Surgery",
            description: "We offer surgery for breast cancer, benign tumors, and other conditions affecting the breast, with a focus on cosmetic outcomes and recovery.",
            imageUrl: "/images/specialities-images/GeneralSurgery/BreastSurgery.webp",
        },
        {
            title: "Laparoscopic Surgery",
            description: "Minimally invasive procedures for various conditions, providing quicker recovery and less post-operative pain.",
            imageUrl: "/images/specialities-images/GeneralSurgery/LaparoscopicSurgery.webp",
        },
        {
            title: "Emergency Surgery",
            description: "Prompt and effective surgical intervention for trauma, injuries, or conditions requiring immediate attention, including gastrointestinal bleeding and bowel obstructions.",
            imageUrl: "/images/specialities-images/GeneralSurgery/EmergencySurgery.webp",
        },
        // {
        //     title: "Skin and Soft Tissue Surgery",
        //     description: "Removal of cysts, lipomas, and other benign growths, as well as treatment for skin infections or injuries.",
        //     imageUrl: img9,
        // },
        // {
        //     title: "Weight Loss Surgery",
        //     description: "We provide bariatric surgery options for patients looking to manage obesity and related health conditions.",
        //     imageUrl: img10,
        // },
    ]
};

const whatsetsApartdata = {
    title: "General Surgery at Lokmanya Hospitals – What Sets Us Apart?",
    items: [
        {
            title: "Patient-Centered Care",
            description: "Our focus is on you. We ensure that your needs and concerns are addressed throughout the surgical process, from consultation to recovery.",
            icon: Icon1,
        },
        {
            title: "Advanced Surgical Techniques",
            description: "We use the latest in surgical technology and techniques, including minimally invasive surgery, to provide the most effective care with the least disruption to your life.",
            icon: Icon2,
        },
        {
            title: "Comprehensive Pre- and Post-Operative Care",
            description: "From initial diagnosis to recovery, our dedicated team supports you at every stage of your surgical journey.",
            icon: Icon3,
        },
        {
            title: "Affordable and Accessible",
            description: "We are committed to offering world-class surgical care that is affordable and accessible to all our patients in Pune.",
            icon: Icon4,
        },
    ]
};

const consultationData = {
    title: "When to Consult a Doctor for General Surgery?",
    items: [
        {
            title: "Abdominal Pain",
            description: "Persistent or severe abdominal pain, especially in the lower right side, may indicate conditions like appendicitis or hernia that require surgical evaluation.",
            image: "/images/specialities-images/GeneralSurgery/AbdominalPain.webp",
        },
        {
            title: "Swelling or Lump",
            description: "Any unexplained swelling or lump in the abdomen, breast, or other areas should be evaluated to rule out hernias, tumors, or cysts.",
            image: "/images/specialities-images/GeneralSurgery/SwellingLump.webp",
        },
        {
            title: "Digestive Issues",
            description: "Ongoing gastrointestinal issues such as nausea, vomiting, bloating, or blood in the stool may signal the need for surgical intervention.",
            image: "/images/specialities-images/GeneralSurgery/DigestiveIssues.webp",
        },
        {
            title: "Unexplained Weight Loss or Gain",
            description: "Significant and unexplained weight changes could indicate underlying issues that may require surgical attention.",
            image: "/images/specialities-images/GeneralSurgery/UnexplainedWeightLoss.webp",
        },
        {
            title: "Trauma or Injury",
            description: "Injuries resulting in cuts, fractures, or internal bleeding often require surgical intervention to prevent complications.",
            image: "/images/specialities-images/GeneralSurgery/trauma.webp",
        },
        {
            title: "Infection",
            description: "Infections that do not respond to medication or result in abscesses may need surgical drainage or removal.",
            image: "/images/specialities-images/GeneralSurgery/Infection.webp",
        }
    ]
};

const ConditionsTreatData = {
    title: "Conditions We Treat",
    subtitle: "At Lokmanya Hospitals, we specialize in treating a wide range of general surgical conditions, including :",
    items: [
        {
            title: "Appendicitis",
            icon: conditionIcon1,
        },
        {
            title: "Gallstones",
            icon: conditionIcon2,
        },
        {
            title: "Hernias",
            icon: conditionIcon3,
        },
        {
            title: "Colorectal conditions",
            icon: conditionIcon4,
        },
        {
            title: "Neonatal Surgery",
            icon: conditionIcon5,
        },
        // {
        //     title: "Trauma & Burns",
        //     icon: conditionIcon6,
        // },
        {
            title: "Tongue Tie Release",
            icon: conditionIcon7,
        },
        {
            title: "Stapler Circumcision",
            icon: conditionIcon8,
        },
        {
            title: "Surgery of Bladder",
            icon: conditionIcon9,
        },
        {
            title: "Pediatric Tumors",
            icon: conditionIcon10,
        },
        {
            title: "Thoracotomy",
            icon: conditionIcon11,
        },
        {
            title: "Gastrointestinal disorders",
            icon: conditionIcon12,
        },
        {
            title: "Soft tissue lumps and cysts",
            icon: conditionIcon13,
        },
        {
            title: "Infections and abscesses",
            icon: conditionIcon14,
        }
    ]
};




const faqs = [
    {
        question: "What types of surgery are considered general surgery?",
        answer: "General surgery includes a wide range of procedures, from gallbladder removal and hernia repair to colorectal surgery and breast surgery.",
    },
    {
        question: "Is minimally invasive surgery safer?",
        answer: "Minimally invasive surgeries typically result in smaller incisions, less pain, and faster recovery times compared to traditional surgeries.",
    },
    {
        question: "How long is the recovery after surgery?",
        answer: "Recovery time varies depending on the type of surgery and your overall health. Most patients can resume normal activities within a few weeks, though full recovery may take longer.",
    },
    {
        question: "How do I prepare for surgery?",
        answer: "Your surgeon will provide detailed instructions on how to prepare, including dietary restrictions, medications, and pre-surgical tests.",
    },
    {
        question: "Are general surgeries covered by insurance?",
        answer: "Many general surgeries are covered by health insurance. We recommend contacting your provider for specific coverage details.",
    },
];



const GeneralSurgery = () => {

    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleFAQ = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

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
                <title>Best General Surgery Hospital In Pune | Lokmanya Hospitals</title>
                <meta name="description" content="Best general surgery hospital in Pune—Lokmanya Hospital offers advanced
laparoscopic, gastrointestinal, hernia, appendix, gallbladder & emergency surgeries." />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Hospital",
                        "name": "Lokmanya Hospital",
                        "url": "https://www.lokmanyahospitals.com/general-surgery",
                        "description": "Lokmanya Hospital offers comprehensive general surgery services, including laparoscopic procedures, hernia repairs, and gastrointestinal surgeries, ensuring advanced surgical care in Pune, Maharashtra.",
                        "medicalSpecialty": "GeneralSurgery",
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
                        <h1 className="page-heading">General Surgery</h1>
                        <p className="subtitle">
                            Lokmanya Hospitals is renowned for its skilled general surgeons who provide a wide range of surgical services, from minimally invasive procedures to complex surgeries. With advanced technology and a patient-centered approach, we ensure optimal outcomes and faster recovery.
                        </p>
                    </div>
                </CommonBanner>
                <div className="overview-section side-space section-space">
                    <h2 className="page-heading">Overview</h2>
                    <div className="para">
                        <p >
                            At Lokmanya Hospitals, we provide comprehensive and compassionate care for a wide range of surgical conditions. Whether you're dealing with routine procedures or more complex surgeries, our expert surgical team is dedicated to delivering the highest quality of care in a comfortable and supportive environment. With advanced technology, experienced surgeons, and personalized treatment plans, we ensure that every patient receives the best possible outcome.
                        </p>
                        <p >
                            From minimally invasive procedures to major surgeries, our general surgery department offers a full spectrum of services designed to address your unique needs. We focus on both the treatment and prevention of surgical conditions, helping you achieve a healthier, pain-free life.
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

export default GeneralSurgery;
