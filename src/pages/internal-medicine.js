import React, { useEffect, useState } from "react";
import { CommonBanner } from '../site/components';


import kneeImage from "../site/assets/images/Internal-medbanner.webp";

import Icon1 from '../site/assets/images/Patient-CenteredCare.svg';
import Icon2 from '../site/assets/images/AdvancedDiagnosticTechnology.svg';
import Icon3 from '../site/assets/images/HolisticandPreventiveCare.svg';
import Icon4 from '../site/assets/images/ExpertPhysicians.svg';
import Icon5 from '../site/assets/images/AffordableHealthcare.svg';


import conditionIcon1 from '../site/assets/images/Hypertension.svg';
import conditionIcon2 from '../site/assets/images/Diabetes.svg';
import conditionIcon3 from '../site/assets/images/AsthmaandChronic.svg';
import conditionIcon4 from '../site/assets/images/HeartDiseaseStroke.svg';
import conditionIcon5 from '../site/assets/images/Gastrointestinaldisorders.svg';
import conditionIcon6 from '../site/assets/images/ThyroidDisorders.svg';
import conditionIcon7 from '../site/assets/images/KidneyDisease.svg';
import conditionIcon8 from '../site/assets/images/InfectiousDiseases.svg';
import conditionIcon9 from '../site/assets/images/RespiratoryInfections.svg';
import conditionIcon10 from '../site/assets/images/Arthritis.svg';
import conditionIcon11 from '../site/assets/images/ObesityMetabolicDisorders.svg';
import conditionIcon12 from '../site/assets/images/SleepDisorders.svg';
import conditionIcon13 from '../site/assets/images/anxietyanddepression.svg';
import conditionIcon14 from '../site/assets/images/Allergies.svg';

import WhyChooseSection from "../site/components/WhyChooseSection/WhyChooseSection";
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
    title: "Why Choose Lokmanya Hospitals for Internal Medicine?",
    description: "Lokmanya Hospitals is a trusted name in healthcare, known for its exceptional medical services. Here’s why you should choose us for your internal medicine needs :",
    items: [
        {
            title: "Comprehensive Care",
            description: "We offer a full range of services to manage both common and complex internal medical conditions, ensuring that all aspects of your health are addressed.",
            image: "/images/specialities-images/InternalMedicine/ComprehensiveCare.webp",
        },
        {
            title: "Experienced Physicians",
            description: "Our team of internal medicine specialists is highly trained in diagnosing and managing a variety of health conditions, using the latest medical knowledge and technologies.",
            image: "/images/specialities-images/InternalMedicine/ExperiencedPhysicians01.webp",
        },
        {
            title: "Advanced Diagnostic Tools",
            description: "Equipped with the latest diagnostic technology, including advanced imaging systems and laboratory services, we provide accurate diagnosis and timely interventions.",
            image: "/images/specialities-images/InternalMedicine/AdvancedDiagnosticTools.webp",
        },
        {
            title: "Personalized Treatment Plans",
            description: "We recognize that each patient is unique. Our internal medicine specialists work with you to develop a treatment plan that meets your specific health needs.",
            image: "/images/specialities-images/InternalMedicine/PersonalizedTreatmentPlans.webp",
        },
        {
            title: "Preventive Care Focus",
            description: "Our approach emphasizes preventive care, helping you avoid illness and maintain long-term health through regular screenings, vaccinations, and lifestyle guidance.",
            image: "/images/specialities-images/InternalMedicine/PreventiveCareFocus.webp",
        },
        {
            title: "Accessible and Affordable Care",
            description: "We strive to make high-quality internal medicine care affordable and accessible to everyone, ensuring that you receive the best care without financial strain.",
            image: "/images/specialities-images/Affordable.webp",
        }
    ]
};

const serviceData = {
    title: "Our Internal Medicine Services",
    items: [
        {
            title: "Chronic Disease Management",
            description: "We specialize in the management of chronic conditions such as diabetes, hypertension, asthma, and heart disease, ensuring that your health is well-maintained over time.",
            imageUrl: "/images/specialities-images/InternalMedicine/ChronicDiseaseManagement.webp",
        },
        {
            title: "Preventive Healthcare",
            description: "Our preventive services include routine health check-ups, immunizations, screenings for early detection of diseases, and lifestyle counseling to help you stay healthy.",
            imageUrl: "/images/specialities-images/InternalMedicine/preventive-healthcare.webp",
        },
        {
            title: "Acute Illness Management",
            description: " From fever and infections to gastrointestinal issues and respiratory conditions, we provide timely diagnosis and treatment for acute medical conditions.",
            imageUrl: "/images/specialities-images/InternalMedicine/AcuteIllnessManagement.webp",
        },
        {
            title: "Geriatric Care",
            description: "We offer specialized care for the elderly, focusing on age-related health issues, including arthritis, dementia, and osteoporosis, to ensure a higher quality of life.",
            imageUrl: "/images/specialities-images/InternalMedicine/GeriatricCare.webp",
        },
        {
            title: "Cardiovascular Care",
            description: "Our team works to manage heart conditions, including high blood pressure, coronary artery disease, and arrhythmias, using both medical management and lifestyle changes.",
            imageUrl: "/images/specialities-images/InternalMedicine/CardiovascularCare.webp",
        },
        {
            title: "Respiratory Care",
            description: "We treat conditions like asthma, COPD, pneumonia, and bronchitis, ensuring that your respiratory health is well-managed.",
            imageUrl: "/images/specialities-images/InternalMedicine/RespiratoryCare.webp",
        },
        {
            title: "Endocrine Disorders",
            description: "We specialize in managing conditions such as thyroid disorders, diabetes, and metabolic diseases, ensuring optimal hormone balance and metabolic health.",
            imageUrl: "/images/specialities-images/InternalMedicine/EndocrineDisorders.webp",
        },
        {
            title: "Infectious Disease Treatment",
            description: "Our specialists are equipped to treat a wide range of infectious diseases, from viral infections to bacterial and fungal conditions.",
            imageUrl: "/images/specialities-images/InternalMedicine/InfectiousDiseaseTreatment.webp",
        },
        {
            title: "Gastrointestinal Care",
            description: "We offer diagnosis and treatment for digestive disorders, including GERD, ulcers, IBS, and liver diseases, helping you maintain optimal digestive health.",
            imageUrl: "/images/specialities-images/InternalMedicine/GastrointestinalCare.webp",
        },
        {
            title: "Kidney and Renal Care",
            description: "We provide comprehensive care for kidney-related conditions, including chronic kidney disease, urinary tract infections, and kidney stones.",
            imageUrl: "/images/specialities-images/InternalMedicine/KidneyRenalCare.webp",
        },
    ]
};

const whatsetsApartdata = {
    title: "Internal Medicine at Lokmanya Hospitals – What Sets Us Apart?",
    items: [
        {
            title: "Patient-Centered Approach",
            description: "We believe in providing care that’s tailored to each patient’s unique needs. Your health is our priority, and we work with you to create personalized care plans.",
            icon: Icon1,
        },
        {
            title: "Advanced Diagnostic Capabilities",
            description: "Early diagnosis is key to effective treatment. Our hospital is equipped with the latest diagnostic tools, including laboratory testing, imaging systems, and more, ensuring a thorough evaluation of your health.",
            icon: Icon2,
        },
        {
            title: "Holistic and Preventive Care",
            description: " We focus on treating the whole person, not just the disease. Our emphasis on preventive care ensures that you can avoid health issues before they arise.",
            icon: Icon3,
        },
        {
            title: "Expert Physicians",
            description: "Our internists are highly experienced in managing a wide range of conditions, offering the best treatment options available.",
            icon: Icon4,
        },
        {
            title: "Affordable Healthcare",
            description: "We are committed to providing affordable internal medicine care, ensuring that high-quality treatment is accessible to all patients.",
            icon: Icon5,
        }
    ]
};


const consultationData = {
    title: "When to Consult a Doctor for Internal Medicine?",
    items: [
        {
            title: "Chronic Health Conditions",
            description: "If you have been diagnosed with a chronic condition like diabetes, hypertension, or asthma, it’s important to regularly consult with an internal medicine specialist to manage your condition effectively.",
            image: "/images/specialities-images/InternalMedicine/ChronicHeadaches.jpg",
        },
        {
            title: "Unexplained Symptoms",
            description: "If you experience symptoms like persistent fatigue, unexplained weight loss or gain, frequent infections, or digestive issues, it's time to seek medical advice.",
            image: "/images/specialities-images/InternalMedicine/Unexplained-Symptoms.webp",
        },
        {
            title: "Routine Health Check-ups",
            description: "Regular check-ups are crucial for preventing diseases and managing existing conditions. If it’s been a while since your last check-up, consider scheduling one soon.",
            image: "/images/specialities-images/InternalMedicine/RoutineHealthCheckup.webp",
        },
        {
            title: "Difficulty Managing Medications",
            description: "If you're struggling to manage multiple medications or have questions about your treatment plan, our specialists can help optimize your care.",
            image: "/images/specialities-images/InternalMedicine/Difficultytomanagemedication.webp",
        },
        {
            title: "Pre-existing Conditions",
            description: "If you have a family history of heart disease, diabetes, or other chronic illnesses, early consultation with an internal medicine specialist can help in early detection and prevention.",
            image: "/images/specialities-images/InternalMedicine/Pre-ExistingCondition.webp",
        },
    ]
};

const ConditionsTreatData = {
    title: "Conditions We Treat",
    subtitle: "At Lokmanya Hospitals, our internal medicine specialists treat a wide variety of conditions, including :",
    items: [
        {
            title: "Hypertension (High Blood Pressure)",
            icon: conditionIcon1,
        },
        {
            title: "Diabetes",
            icon: conditionIcon2,
        },
        {
            title: "Asthma and Chronic Obstructive Pulmonary Disease (COPD)",
            icon: conditionIcon3,
        },
        {
            title: "Heart Disease and Stroke",
            icon: conditionIcon4,
        },
        {
            title: "Gastrointestinal Disorders (GERD, IBS, Ulcers)",
            icon: conditionIcon5,
        },
        {
            title: "Thyroid Disorders",
            icon: conditionIcon6,
        },
        {
            title: "Kidney Disease",
            icon: conditionIcon7,
        },
        {
            title: "Infectious Diseases",
            icon: conditionIcon8,
        },
        {
            title: "Respiratory Infections (Pneumonia, Bronchitis)",
            icon: conditionIcon9,
        },
        {
            title: "Arthritis and Musculoskeletal Disorders",
            icon: conditionIcon10,
        },
        {
            title: "Obesity and Metabolic Disorders",
            icon: conditionIcon11,
        },
        {
            title: "Sleep Disorders",
            icon: conditionIcon12,
        },
        {
            title: "Anxiety and Depression",
            icon: conditionIcon13,
        },
        {
            title: "Allergies",
            icon: conditionIcon14,
        },
    ]
};

const faqs = [
    {
        question: "What is internal medicine?",
        answer: "Internal medicine is a medical specialty focused on the diagnosis, treatment, and prevention of adult diseases, particularly those related to the internal organs and systems of the body.",
    },
    {
        question: "How can internal medicine help with chronic conditions?",
        answer: "Our specialists manage chronic conditions by creating individualized care plans that include medications, lifestyle modifications, and regular monitoring to ensure your health is well-maintained.",
    },
    {
        question: "What can I expect during an internal medicine consultation?",
        answer: "During your consultation, our physician will review your medical history, conduct a thorough examination, and may recommend diagnostic tests to accurately diagnose your condition and develop a treatment plan.",
    },
    {
        question: "Is preventive care included in internal medicine?",
        answer: "Yes, preventive care is a key component of internal medicine. Our team offers regular screenings, vaccinations, and lifestyle counseling to help you maintain optimal health and prevent future illnesses.",
    },
];


const InternalMedicine = () => {

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
                <title>Best Internal Medicine Hospital In Pune | Lokmanya Hospitals</title>
                <meta name="description" content="Best internal medicine care in Pune—Lokmanya Hospital treats diabetes,
hypertension, infections, thyroid & chronic diseases with expert physicians & diagnostics." />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Hospital",
                        "name": "Lokmanya Hospital",
                        "url": "https://www.lokmanyahospitals.com/internal-medicine",
                        "description": "Lokmanya Hospital offers comprehensive internal medicine services, providing expert diagnosis and treatment for a wide range of adult health conditions in Pune, Maharashtra.",
                        "medicalSpecialty": "InternalMedicine",
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
                        <h1 className="page-heading">INTERNAL MEDICINE</h1>
                        <p className="subtitle">
                            Lokmanya Hospitals is renowned for its expert internal medicine specialists who provide comprehensive care for a wide range of medical conditions, using advanced diagnostic tools and personalized treatment plans.
                        </p>
                    </div>
                </CommonBanner>
                <div className="overview-section side-space section-space">
                    <h2 className="page-heading">Overview</h2>
                    <div className="para">
                        <p >
                            At Lokmanya Hospitals, we are dedicated to providing comprehensive and expert care in the field of internal medicine. Our team of highly skilled and experienced internists is committed to diagnosing, treating, and managing a wide range of medical conditions that affect the internal organs and systems of the body. Whether you're dealing with chronic diseases, acute illnesses, or preventive care, our specialists are here to help you maintain optimal health and well-being.
                        </p>
                        <p >
                            With state-of-the-art diagnostic tools, personalized treatment plans, and a focus on holistic care, we ensure that you receive the best possible care tailored to your unique health needs. Our internal medicine department offers a broad spectrum of services, from managing complex conditions to routine health check-ups.
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

export default InternalMedicine