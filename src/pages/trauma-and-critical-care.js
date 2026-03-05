import React, { useState, useEffect } from "react";
import { CommonBanner } from '../site/components';


import bannerImage from "../site/assets/images/trauma/trauma-banner.webp";

import Icon1 from '../site/assets/images/Patient-CenteredCare.svg';
import Icon2 from '../site/assets/images/AdvancedDiagnosticTechnology.svg';
import Icon3 from '../site/assets/images/Evidence-BasedPractices.svg';
import Icon4 from '../site/assets/images/trauma/icons/PersonalizedRecoveryPlans.svg';
import Icon5 from '../site/assets/images/HolisticandPreventiveCare.svg';


import conditionIcon1 from '../site/assets/images/trauma/icons/RoadTrafficAccidentsPolytrauma.svg';
import conditionIcon2 from '../site/assets/images/trauma/icons/HeadSpinalCordInjuries.svg';
import conditionIcon3 from '../site/assets/images/trauma/icons/HeartAttacksCardiacArrests.svg';
import conditionIcon4 from '../site/assets/images/trauma/icons/StrokeBrainHemorrhage.svg';
import conditionIcon5 from '../site/assets/images/trauma/icons/AcuteKidneyLiverFailure.svg';
import conditionIcon6 from '../site/assets/images/trauma/icons/LifeThreateningInfections.svg';

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
    title: "Why Choose Lokmanya Hospitals for Trauma & Critical Care?",
    description: "Lokmanya Hospitals is a trusted name in <b>emergency and critical care</b>, offering advanced medical solutions with <b>compassion and expertise</b>. Here’s why patients across Pune rely on us :",
    items: [
        {
            title: '24/7 Emergency Services',
            description: 'Our round-the-clock emergency department is equipped to handle all types of critical medical situations with immediate response and expert care.',
            image: "/images/specialities-images/Trauma/EmergencyServices.webp",
        },
        {
            title: 'Highly Skilled Critical Care Specialists',
            description: 'Our team of intensivists, emergency physicians, trauma surgeons, and anesthetists are trained to manage complex trauma and critical conditions efficiently.',
            image: "/images/specialities-images/Trauma/HighlySkilled.webp",
        },
        {
            title: 'Advanced Critical Care Units (ICU & HDU)',
            description: 'We have state-of-the-art Intensive Care Units (ICUs) and High-Dependency Units (HDUs) designed to provide continuous monitoring and specialized treatment.',
            image: "/images/specialities-images/Trauma/Advance-cc.webp",
        },
        {
            title: 'Multi-Specialty Approach',
            description: 'A team of cardiologists, neurologists, orthopedic surgeons, pulmonologists, and critical care experts collaborate to offer comprehensive emergency care.',
            image: "/images/specialities-images/Trauma/Multi-SpecialtyApproach.webp",
        },
        {
            title: 'Advanced Life-Saving Technology',
            description: 'Equipped with high-tech ventilators, cardiac monitors, dialysis support, and advanced imaging facilities, we ensure the best possible critical care.',
            image: "/images/specialities-images/Trauma/AdvancedLife-Saving.webp",
        },
        {
            title: 'Rapid Response Team',
            description: 'Our Rapid Response Team (RRT) ensures timely intervention for emergencies like heart attacks, strokes, and respiratory distress.',
            image: "/images/specialities-images/Trauma/RapidResponseTeam.webp",
        },
    ]
};


const serviceData = {
    title: "Our Trauma & Critical Care Services",
    items: [
        {
            title: "Emergency Trauma Care",
            description: "Our Level 1 trauma center is equipped to handle all types of accidents, falls, burns, and high-impact injuries with expert stabilization and treatment.",
            imageUrl: "/images/specialities-images/Trauma/EmergencyTraumaCare.webp",
        },
        {
            title: "Cardiac Emergency Care",
            description: "We provide immediate response for heart attacks, cardiac arrests, and arrhythmias, ensuring life-saving intervention and post-event care.",
            imageUrl: "/images/specialities-images/Trauma/CardiacEmergencyCare.webp",
        },
        {
            title: "Neuro-Critical Care",
            description: "Specialized care for stroke, brain injuries, seizures, and neurological trauma with advanced neuro-monitoring and intervention.",
            imageUrl: "/images/specialities-images/Trauma/Neuro-CriticalCare.webp",
        },
        {
            title: "Polytrauma & Surgical Critical Care",
            description: "Expert management of multiple injuries, major surgeries, and post-operative complications for a smooth recovery.",
            imageUrl: "/images/specialities-images/Trauma/PolytraumaCare.webp",
        },
    ]
};
const whatsetsApartdata = {
    title: "What Sets Us Apart?",
    items: [
        {
            title: "Rapid Emergency Response",
            description: "In critical situations, every second counts. Our expert trauma team is available 24/7, ensuring immediate medical attention and life-saving interventions for accident and emergency cases.",
            icon: Icon1,
        },
        {
            title: "Advanced Critical Care Units",
            description: "Our state-of-the-art ICUs are equipped with advanced monitoring systems, ventilators, and life-support technology to provide round-the-clock care for critically ill patients.",
            icon: Icon2,
        },
        {
            title: "Multidisciplinary Expertise",
            description: "From trauma surgeons and intensivists to emergency physicians and rehabilitation specialists, our team collaborates seamlessly to deliver the highest standard of critical care.",
            icon: Icon3,
        },
        {
            title: "Personalized Recovery Plans",
            description: "Recovery after a critical event requires a holistic approach. We provide personalized rehabilitation, pain management, and psychological support to help patients regain their strength and independence.",
            icon: Icon4,
        },
        {
            title: "Affordable Emergency Care",
            description: "Quality emergency and trauma care should be within reach for everyone. Our transparent and affordable treatment options ensure that life-saving care is accessible to all.",
            icon: Icon5,
        },
    ]
};

const consultationData = {
    title: "When to Seek Emergency Medical Care?",
    items: [
        {
            title: "Severe Chest Pain or Breathlessness",
            description: "Immediate medical attention is needed if you experience chest pain, difficulty breathing, or signs of a heart attack.",
            image: "/images/specialities-images/Trauma/severe-chest-pain.webp",
        },
        {
            title: "Uncontrolled Bleeding or Head Injury",
            description: "Any head trauma, deep wounds, or excessive bleeding requires urgent trauma care.",
            image: "/images/specialities-images/Trauma/HeadInjury.webp",
        },
        {
            title: "Stroke Symptoms (F.A.S.T.)",
            description: "Facial drooping, Arm weakness, Speech difficulty? Seek emergency care immediately to prevent permanent damage.",
            image: "/images/specialities-images/Trauma/StrokeSymptoms.webp",
        },
        {
            title: "Sudden Loss of Consciousness",
            description: "Fainting, dizziness, or unresponsiveness could indicate a serious medical emergency.",
            image: "/images/specialities-images/Trauma/SuddenLossofcontrol.webp",
        },
        {
            title: "Sepsis & High Fever with Chills",
            description: "Fever above 103°F, rapid breathing, confusion, or extreme weakness may indicate a life-threatening infection.",
            image: "/images/specialities-images/Trauma/SepsisHighFever.webp",
        },
    ]
};

const ConditionsTreatData = {
    title: "Conditions We Treat",
    items: [
        {
            title: "Road Traffic Accidents & Polytrauma",
            icon: conditionIcon1,
        },
        {
            title: "Head & Spinal Cord Injuries",
            icon: conditionIcon2,
        },
        {
            title: "Heart Attacks & Cardiac Arrests",
            icon: conditionIcon3,
        },
        {
            title: "Stroke & Brain Hemorrhage",
            icon: conditionIcon4,
        },
        {
            title: "Acute Kidney & Liver Failure",
            icon: conditionIcon5,
        },
        {
            title: "Life-Threatening Infections",
            icon: conditionIcon6,
        },
    ]
};

const faqs = [
    {
        question: "What should I do in a medical emergency?",
        answer: "Call for emergency help immediately. If possible, keep the patient calm, still, and breathing until medical professionals arrive.",
    },
    {
        question: "How are trauma cases treated at Lokmanya Hospitals?",
        answer: "We follow a step-by-step approach, including emergency stabilization, advanced diagnostics, surgical intervention (if needed), and post-care rehabilitation.",
    },
    {
        question: "What happens in the ICU?",
        answer: "In the ICU, patients receive continuous monitoring, life-supporting interventions, and specialized treatment for critical conditions.",
    },
    {
        question: "Can trauma patients fully recover?",
        answer: "Recovery depends on the severity of the injury. With advanced treatments and rehabilitation, we aim to restore maximum functionality and improve quality of life.",
    },
];
const Trauma = () => {

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
                <title>Best Trauma & Critical Care Hospital In Pune | Lokmanya Hospitals</title>
                <meta name="description" content="Get expert emergency and critical care at Lokmanya Hospitals. 24/7 trauma
services, advanced ICUs, and top specialists ensuring life-saving treatment." />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Hospital",
                        "name": "Lokmanya Hospital",
                        "url": "https://www.lokmanyahospitals.com/trauma-and-critical-care",
                        "description": "Lokmanya Hospital offers comprehensive trauma and critical care services, providing advanced emergency medical treatments and intensive care for critically ill patients in Pune, Maharashtra.",
                        "medicalSpecialty": "CriticalCare",
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
                <CommonBanner bgColor={"#EFEDD1"} bgImage={bannerImage.src}>
                    <div className="header-section">
                        <h1 className="page-heading">Trauma & Critical Care</h1>
                        {/* <p className="subtitle">
                        Lokmanya Hospitals is a trusted name in physiotherapy, offering a wide range of services designed to restore mobility, reduce pain, and enhance your quality of life. Our team of highly qualified physiotherapists uses advanced techniques and state-of-the-art equipment to deliver effective care for patients of all ages.
                        </p> */}
                    </div>
                </CommonBanner>
                <div className="overview-section side-space section-space">
                    <h2 className="page-heading">Overview</h2>
                    <div className="para">
                        <p >
                            At Lokmanya Hospitals, we understand that medical emergencies require immediate and expert
                            care. Our specialized Trauma & Critical Care unit is dedicated to providing life-saving treatment
                            for critically injured and acutely ill patients. With state-of-the-art infrastructure, expert emergency
                            specialists, and a patient-first approach, we ensure that every patient receives rapid, effective,
                            and comprehensive care.
                        </p>
                        <p >
                            Whether it’s a severe accident, cardiac emergency, stroke, or life-threatening infection, our team
                            is equipped to handle all medical and surgical emergencies. We focus on stabilization,
                            advanced intervention, and seamless recovery to ensure the best possible outcomes.
                        </p>
                    </div>
                </div>
            </section>
            {/* <section className="orthopedic-care-container side-space section-space">
                <h2 className="section-heading">Why Choose Lokmanya Hospitals for Trauma & Critical Care?</h2>
                <p className="text-center">Lokmanya Hospitals is a trusted name in <strong>emergency and critical care</strong>, offering advanced
                    medical solutions with <strong>compassion and expertise</strong>. Here’s why patients across Pune rely on
                    us :</p>
                <div className="treatment-grid">
                    {treatments.map((treatment, index) => (
                        <div key={index} className="treatment-card">
                            <div className='image-container'>
                                {treatment.image && (
                                    <img src={treatment.image} alt={treatment.title} className="treatment-image" />
                                )}
                            </div>
                            <div className="treatment-content">
                                <h3 className="treatment-title">{treatment.title}</h3>
                                <p className="treatment-description">{treatment.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section> */}
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

export default Trauma;