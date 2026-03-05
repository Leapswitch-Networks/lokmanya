import React, { useState, useEffect } from "react";
import { CommonBanner } from '../site/components';


import kneeImage from "../site/assets/images/young-doctor-making-face-lifting-apparatus-procedure.webp";


import Icon1 from '../site/assets/images/Patient-CenteredCare.svg';
import Icon2 from '../site/assets/images/MinimallyInvasiveTechnique.svg';
import Icon3 from '../site/assets/images/ComprehensivePreandPostOperativeCare.svg';


import conditionIcon1 from '../site/assets/images/Acne and Acne Scars.svg';
import conditionIcon2 from '../site/assets/images/Eczema and Dermatitis.svg';
import conditionIcon3 from '../site/assets/images/Psoriasis.svg';
import conditionIcon4 from '../site/assets/images/Vitiligo.svg';
import conditionIcon5 from '../site/assets/images/Hyperpigmentation.svg';
import conditionIcon6 from '../site/assets/images/Rosacea.svg';
import conditionIcon7 from '../site/assets/images/Skin Allergies.svg';
import conditionIcon8 from '../site/assets/images/Dandruff and Scalp Psoriasis.svg';
import conditionIcon9 from '../site/assets/images/Warts and Skin Tags.svg';
import conditionIcon10 from '../site/assets/images/Birthmarks.svg';
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
    title: "Why Choose Lokmanya Hospitals for Dermatology Care?",
    items: [
        {
            title: 'Comprehensive Dermatology Services',
            description: 'We offer an extensive range of dermatological treatments, from medical dermatology to advanced cosmetic and aesthetic procedures.',
            image: "/images/specialities-images/Dermatology/ComprehensiveDermatologyServices.webp",
        },
        {
            title: 'Experienced Dermatologists',
            description: 'Our team of skilled dermatologists has years of experience diagnosing and treating a wide array of skin, hair, and nail conditions with precision and care.',
            image: "/images/specialities-images/Dermatology/ExperiencedDermatologists.webp",
        },
        {
            title: 'Personalized Care',
            description: 'Every patient is unique, and so is our approach. We provide customized treatment plans to address your specific dermatological concerns.',
            image: "/images/specialities-images/Dermatology/PersonalizedCare.webp",
        },
        {
            title: 'Affordable and Accessible',
            description: 'High-quality dermatology care is made affordable and accessible without compromising on service excellence.',
            image: "/images/specialities-images/Affordable.webp",
        },
    ]
};

const serviceData = {
    title: "Our Dermatology Services",
    items: [
        {
            title: "Skin Care",
            description: "From acne and pigmentation to psoriasis and eczema, we offer expert care for all types of skin conditions, ensuring healthier, glowing skin.",
            imageUrl: "/images/specialities-images/Dermatology/SkinCare.webp",
        },
        {
            title: "Cosmetic Dermatology",
            description: "Our cosmetic services include Botox, fillers, chemical peels, laser resurfacing, and skin tightening to enhance your natural beauty.",
            imageUrl: "/images/specialities-images/Dermatology/CosmeticDermatology.webp",
        },
        {
            title: "Nail Disorders",
            description: "We treat fungal infections, brittle nails, and other nail-related concerns with precision and care.",
            imageUrl: "/images/specialities-images/Dermatology/NailDisorders.webp",
        },
        {
            title: "Pediatric Dermatology",
            description: "Our specialists provide gentle and effective treatment for children’s skin conditions, including eczema, birthmarks, and rashes.",
            imageUrl: "/images/specialities-images/Dermatology/PediatricDermatology.webp",
        },
    ]
};

const whatsetsApartdata = {
    title: "Dermatology at Lokmanya Hospitals – What Sets Us Apart?",
    items: [
        {
            title: "Patient-Centered Care",
            description: "We prioritize your comfort and satisfaction, ensuring every treatment is tailored to your needs for the best possible outcome.",
            icon: Icon1,
        },
        {
            title: "Minimally Invasive Techniques",
            description: "Whenever possible, we use non-invasive and minimally invasive procedures for quicker recovery and minimal discomfort.",
            icon: Icon2,
        },
        {
            title: "Comprehensive Aftercare",
            description: "We provide detailed post-treatment care plans, including follow-ups, to ensure long-lasting results and satisfaction.",
            icon: Icon3,
        },
    ]
};

const consultationData = {
    title: "When To Consult A Dermatologist?",
    items: [
        {
            title: "Persistent Skin Issues",
            description: "If you have acne, rashes, or other skin problems that don’t respond to over-the-counter treatments, consult a dermatologist.",
            image: "/images/specialities-images/Dermatology/PersistentSkinIssues.webp",
        },
        {
            title: "Skin Growths or Moles",
            description: "Unusual growths, moles, or changes in existing ones should be checked for early detection of skin cancer.",
            image: "/images/specialities-images/Dermatology/SkinGrowthsorMoles.webp",
        },
        {
            title: "Allergic Reactions",
            description: "Redness, itching, or swelling after exposure to certain substances may require allergy testing.",
            image: "/images/specialities-images/Dermatology/AllergicReactions.webp",
        },
        {
            title: "Signs of Aging",
            description: "Wrinkles, fine lines, or age spots can be addressed with advanced anti-aging treatments.",
            image: "/images/specialities-images/Dermatology/SignsofAging.webp",
        },
    ]
};

const ConditionsTreatData = {
    title: "Conditions We Treat",
    items: [
        {
            title: "Acne and Acne Scars",
            icon: conditionIcon1,
        },
        {
            title: "Eczema and Dermatitis",
            icon: conditionIcon2,
        },
        {
            title: "Psoriasis",
            icon: conditionIcon3,
        },
        {
            title: "Vitiligo",
            icon: conditionIcon4,
        },
        {
            title: "Hyperpigmentation",
            icon: conditionIcon5,
        },
        {
            title: "Rosacea",
            icon: conditionIcon6,
        },
        {
            title: "Skin Allergies",
            icon: conditionIcon7,
        },
        {
            title: "Dandruff and Scalp Psoriasis",
            icon: conditionIcon8,
        },
        {
            title: "Warts and Skin Tags",
            icon: conditionIcon9,
        },
        {
            title: "Birthmarks",
            icon: conditionIcon10,
        },
    ]
};

const faqs = [
    {
        question: "What are the most common skin conditions treated by dermatologists?",
        answer: "Dermatologists commonly treat acne, eczema, psoriasis, rosacea, dermatitis, fungal infections, and skin cancers. They also address cosmetic concerns like wrinkles, scars, and pigmentation.",
    },
    {
        question: "How can I protect my skin from sun damage?",
        answer: "Using a broad-spectrum sunscreen with SPF 30 or higher, wearing protective clothing, and avoiding excessive sun exposure during peak hours are effective ways to protect your skin.",
    },
    {
        question: "What should I expect during a dermatology appointment?",
        answer: "During your visit, the dermatologist will examine your skin, discuss your medical history, and recommend treatment options or skincare routines tailored to your needs.",
    },
    {
        question: "When should I see a dermatologist for a mole or spot?",
        answer: "You should consult a dermatologist if you notice changes in size, shape, color, or texture of a mole or spot, or if it becomes itchy, painful, or starts bleeding.",
    },
    {
        question: "Are over-the-counter skin care products effective?",
        answer: "Many OTC products can be effective for mild skin concerns, but persistent or severe issues may require prescription treatments or professional care from a dermatologist.",
    },
];
const Dermatology = () => {


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
                <title>Best Dermatologist in Pune | Skin &amp; Hair Treatments – Lokmanya Hospitals</title>
                <meta name="description" content="Consult top dermatologists at Lokmanya Hospitals, Pune for expert care in skin,
hair, and nail conditions. Advanced treatments for acne, psoriasis, eczema, hair fall & more." />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Hospital",
                        "name": "Lokmanya Hospital",
                        "url": "https://www.lokmanyahospitals.com/dermatology",
                        "description": "Lokmanya Hospital offers comprehensive dermatology services, providing expert care for a wide range of skin-related conditions in Pune, Maharashtra.",
                        "medicalSpecialty": "Dermatology",
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
                        <h1 className="page-heading">DERMATOLOGY</h1>
                        <p className="subtitle">
                            Lokmanya Hospitals is renowned for its expert dermatologists who provide comprehensive care for skin, hair, and nail health using state-of-the-art technology.
                        </p>
                    </div>
                </CommonBanner>
                <div className="overview-section side-space section-space">
                    <h2 className="page-heading">Overview</h2>
                    <div className="para">
                        <p >
                            Lokmanya Hospitals is a trusted name in dermatology care in Pune, offering a wide range of treatments for various skin conditions, hair issues, and nail disorders. Our specialized dermatology department is equipped with cutting-edge technology and staffed by experienced dermatologists dedicated to delivering personalized care to patients of all ages.
                        </p>
                        <p >
                            From common skin conditions like acne and eczema to advanced cosmetic treatments and hair restoration, we provide tailored solutions for your dermatological needs. Whether you require medical intervention, cosmetic procedures, or preventive care, our team ensures a holistic approach to your skin health.
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

export default Dermatology;