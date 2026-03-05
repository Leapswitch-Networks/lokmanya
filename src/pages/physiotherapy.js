import React, { useState, useEffect } from "react";
import { CommonBanner } from '../site/components';


import kneeImage from "../site/assets/images/female-physiotherapist.webp";


import Icon1 from '../site/assets/images/Patient-CenteredCare.svg';
import Icon2 from '../site/assets/images/AdvancedDiagnosticTechnology.svg';
import Icon3 from '../site/assets/images/Evidence-BasedPractices.svg';
import Icon4 from '../site/assets/images/HolisticandPreventiveCare.svg';


import conditionIcon1 from '../site/assets/images/Back and Neck Pain.svg';
import conditionIcon2 from '../site/assets/images/Arthritis and Joint Disorders.svg';
import conditionIcon3 from '../site/assets/images/Post-Surgical Recovery.svg';
import conditionIcon4 from '../site/assets/images/Sports Injuries.svg';
import conditionIcon5 from '../site/assets/images/Stroke Rehabilitation.svg';
import conditionIcon6 from '../site/assets/images/Sciatica and Nerve Pain.svg';
import conditionIcon7 from '../site/assets/images/Frozen Shoulder.svg';
import conditionIcon8 from '../site/assets/images/Balance and Coordination Issues.svg';
import conditionIcon9 from '../site/assets/images/Muscle Strains and Sprains.svg';
import conditionIcon10 from '../site/assets/images/Postural Dysfunctions.svg';
import WhyChooseSection from '../site/components/WhyChooseSection/WhyChooseSection';
import OurServicesSection from "../site/components/OurServicesSection/OurServicesSection";
import WhatsetsApartSection from "../site/components/WhatSetsApartSection/WhatsetsApartSection";
import WhenConsultSection from "../site/components/WhenConsultSection/WhenConsultSection";
import ConditionsTreatSection from "../site/components/ConditionsTreatSection/ConditionsTreatSection";
import FaqSection from "../site/components/FaqSection/FaqSection";
import PatientSuccessStories from "../site/components/PatientsSuccessStorySection/PatientSuccessStories";
import LokmanyaNetwork from "../site/components/LokmanyaNetworkSection/LokmanyaNetwork";
import Head from "next/head";
import MeetOurExpertSpeciality from "@/site/components/MeetOurExpertSpeciality";
import { useRouter } from "next/router";
import { getSpecialityDoctors } from "@/ApiActions/CommonApi";


const WhyChooseData = {
    title: "Why Choose Lokmanya Hospitals for Physiotherapy?",
    items: [
        {
            title: 'Comprehensive Physiotherapy Services',
            description: 'We provide a wide range of services, including pain management, injury rehabilitation, and mobility enhancement, catering to all age groups and health conditions.',
            image: "/images/specialities-images/Physio/ComprehensivePhysiotherapyServices.webp",
        },
        {
            title: 'Experienced Physiotherapists',
            description: 'Our team of licensed physiotherapists has extensive experience in addressing diverse physical health challenges, ensuring you receive expert care and personalized treatment.',
            image: "/images/specialities-images/Physio/ExperiencedPhysiotherapists.webp",
        },
        {
            title: 'Personalized Treatment Plans',
            description: 'We believe in individualized care, creating tailored therapy programs that address your specific health goals and challenges.',
            image: "/images/specialities-images/Physio/PersonalizedTreatmentPlans.webp",
        },
        {
            title: 'Affordable and Accessible Care',
            description: 'At Lokmanya Hospitals, we make high-quality physiotherapy accessible and affordable, ensuring that everyone can benefit from our expertise.',
            image: "/images/specialities-images/Affordable.webp",
        },
    ]
};

const serviceData = {
    title: "Our Physiotherapy Services",
    items: [
        {
            title: "Pain Management",
            description: "Effective therapies to reduce chronic and acute pain caused by conditions like arthritis, back pain, or injuries.",
            imageUrl: "/images/specialities-images/Physio/PainManagement.webp",
        },
        {
            title: "Post-Surgical Rehabilitation",
            description: "Specialized care to aid recovery and regain strength following surgeries such as joint replacements or spinal procedures.",
            imageUrl: "/images/specialities-images/Physio/Post-SurgicalRehabilitation.webp",
        },
        {
            title: "Sports Injury Rehabilitation",
            description: "Targeted programs to treat sports-related injuries, improve performance, and prevent future injuries.",
            imageUrl: "/images/specialities-images/Physio/SportsInjuryRehabilitation.webp",
        },
        {
            title: "Neurological Rehabilitation",
            description: "Comprehensive care for patients recovering from strokes, spinal cord injuries, or neurological conditions like Parkinson’s disease.",
            imageUrl: "/images/specialities-images/Physio/NeurologicalRehabilitation.webp",
        },
        {
            title: "Pediatric Physiotherapy",
            description: "Specialized therapies for children to address developmental delays, injuries, or congenital conditions.",
            imageUrl: "/images/specialities-images/Physio/PediatricPhysiotherapy.webp",
        },
        {
            title: "Geriatric Physiotherapy",
            description: "Care focused on enhancing mobility, strength, and independence in older adults, addressing age-related conditions.",
            imageUrl: "/images/specialities-images/Physio/GeriatricPhysiotherapy.webp",
        },
        {
            title: "Orthopedic Physiotherapy",
            description: "Treatment for musculoskeletal issues such as fractures, joint problems, and soft tissue injuries.",
            imageUrl: "/images/specialities-images/Physio/OrthopedicPhysiotherapy.webp",
        },
        {
            title: "Postural Correction",
            description: "Therapies to correct posture and alignment issues, reducing strain and improving overall well-being.",
            imageUrl: "/images/specialities-images/Physio/PosturalCorrection.webp",
        },
        {
            title: "Cardiopulmonary Rehabilitation",
            description: "Programs designed to improve lung function and cardiovascular health, particularly after heart or lung conditions.",
            imageUrl: "/images/specialities-images/Physio/CardiopulmonaryRehabilitation.webp",
        },
    ]
};

const whatsetsApartdata = {
    title: "Physiotherapy at Lokmanya Hospitals – What Sets Us Apart?",
    items: [
        {
            title: "Patient-Centered Care",
            description: "We focus on creating a supportive and comfortable environment, tailoring therapies to your unique needs and goals.",
            icon: Icon1,
        },
        {
            title: "Advanced Technology",
            description: "Our physiotherapy department is equipped with the latest tools, including electrotherapy devices, ultrasound therapy, and computerized gait analysis systems.",
            icon: Icon2,
        },
        {
            title: "Evidence-Based Practices",
            description: "We use scientifically proven methods to deliver effective treatments, ensuring the best possible outcomes.",
            icon: Icon3,
        },
        {
            title: "Holistic Approach",
            description: "Our care extends beyond therapy sessions, providing guidance on exercises, lifestyle changes, and preventive measures to maintain long-term health.",
            icon: Icon4,
        },
    ]
};

const consultationData = {
    title: "When To Consult a Physiotherapist?",
    items: [
        {
            title: "Chronic Pain",
            description: "Persistent pain in your back, neck, joints, or muscles that limits daily activities.",
            image: "/images/specialities-images/Physio/ChronicPain.webp",
        },
        {
            title: "Injury Recovery",
            description: "Assistance with healing from sports injuries, fractures, or surgeries.",
            image: "/images/specialities-images/Physio/InjuryRecovery.webp",
        },
        {
            title: "Reduced Mobility",
            description: "Difficulty in moving or performing routine tasks due to stiffness or pain.",
            image: "/images/specialities-images/Physio/ReducedMobility.webp",
        },
        {
            title: "Neurological Symptoms",
            description: "Weakness, numbness, or difficulty with balance and coordination.",
            image: "/images/specialities-images/Physio/NeurologicalSymptoms.webp",
        },
        {
            title: "Postural Issues",
            description: "Slouching, uneven gait, or discomfort due to poor posture.",
            image: "/images/specialities-images/Physio/PosturalIssues.webp",
        },
        {
            title: "Recurrent Injuries",
            description: "Frequent strains or sprains that affect your physical activity.",
            image: "/images/specialities-images/Physio/RecurrentInjuries.webp",
        },
    ]
};

const ConditionsTreatData = {
    title: "Conditions We Treat",
    items: [
        {
            title: "Back and Neck Pain",
            icon: conditionIcon1,
        },
        {
            title: "Arthritis and Joint Disorders",
            icon: conditionIcon2,
        },
        {
            title: "Post-Surgical Recovery",
            icon: conditionIcon3,
        },
        {
            title: "Sports Injuries",
            icon: conditionIcon4,
        },
        {
            title: "Stroke Rehabilitation",
            icon: conditionIcon5,
        },
        {
            title: "Sciatica and Nerve Pain",
            icon: conditionIcon6,
        },
        {
            title: "Frozen Shoulder",
            icon: conditionIcon7,
        },
        {
            title: "Balance and Coordination Issues",
            icon: conditionIcon8,
        },
        {
            title: "Muscle Strains and Sprains",
            icon: conditionIcon9,
        },
        {
            title: "Postural Dysfunctions",
            icon: conditionIcon10,
        },
    ]
};

const faqs = [
    {
        question: "How can physiotherapy help me recover from an injury?",
        answer: "Physiotherapy aids recovery by reducing pain, improving mobility, and strengthening the affected area through targeted exercises and therapies.",
    },
    {
        question: "How long will I need physiotherapy?",
        answer: "The duration depends on your condition and progress. Your physiotherapist will create a personalized plan to meet your recovery goals.",
    },
    {
        question: "Is physiotherapy painful?",
        answer: "While some techniques may cause temporary discomfort, our therapists prioritize your comfort and use gentle methods to minimize pain during sessions.",
    },
    {
        question: "Do I need a referral to see a physiotherapist?",
        answer: "No, you can book an appointment directly. However, some insurance providers may require a referral for coverage.",
    },
];
const Physiotherapy = () => {

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
                <title>Best Physiotherapy Hospital & Clinic in Pune | Lokmanya Hospital​s</title>
                <meta name="description" content="Lokmanya Hospital offers expert physiotherapy care in Pune, including pain
management, injury rehabilitation, mobility enhancement, and post-surgical recovery.​" />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Hospital",
                        "name": "Lokmanya Hospital",
                        "url": "https://www.lokmanyahospitals.com/physiotherapy",
                        "description": "Lokmanya Hospital offers comprehensive physiotherapy services, providing expert care for musculoskeletal, neurological, and cardiopulmonary rehabilitation in Pune, Maharashtra.",
                        "medicalSpecialty": "Physiotherapy",
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
                        <h1 className="page-heading">PHYSIOTHERAPY</h1>
                        <p className="subtitle">
                            Lokmanya Hospitals is a trusted name in physiotherapy, offering a wide range of services designed to restore mobility, reduce pain, and enhance your quality of life. Our team of highly qualified physiotherapists uses advanced techniques and state-of-the-art equipment to deliver effective care for patients of all ages.
                        </p>
                    </div>
                </CommonBanner>
                <div className="overview-section side-space section-space">
                    <h2 className="page-heading">Overview</h2>
                    <div className="para">
                        <p >
                            Lokmanya Hospitals is a leading provider of physiotherapy services in Pune, offering comprehensive care tailored to your individual needs. Our dedicated physiotherapy department combines cutting-edge technology with proven therapeutic techniques to help patients recover from injuries, manage chronic conditions, and improve overall physical function.
                        </p>
                        <p >
                            From post-surgical rehabilitation to sports injury management, we provide a patient-centered approach that prioritizes your comfort and long-term wellness. Whether you need preventive care, recovery assistance, or ongoing therapy, Lokmanya Hospitals is committed to helping you achieve optimal health and mobility.
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

export default Physiotherapy;