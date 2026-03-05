import React, { useEffect, useState } from "react";
import { CommonBanner } from '../site/components';


import kneeImage from "../site/assets/images/Ophthalmology/ophthalmology-banner.webp";

import Icon1 from '../site/assets/images/Patient-CenteredCare.svg';
import Icon2 from '../site/assets/images/AdvancedDiagnosticTechnology.svg';
import Icon3 from '../site/assets/images/Evidence-BasedPractices.svg';
import Icon4 from '../site/assets/images/HolisticandPreventiveCare.svg';


import conditionIcon1 from '../site/assets/images/Ophthalmology/icons/RefractiveErrors.svg';
import conditionIcon2 from '../site/assets/images/Ophthalmology/icons/Cataracts.svg';
import conditionIcon3 from '../site/assets/images/Ophthalmology/icons/Glaucoma.svg';
import conditionIcon4 from '../site/assets/images/Ophthalmology/icons/DiabeticRetinopathy.svg';
import conditionIcon5 from '../site/assets/images/Ophthalmology/icons/MacularDegeneration.svg';
import conditionIcon6 from '../site/assets/images/Ophthalmology/icons/DryEyeSyndrome.svg';
import conditionIcon7 from '../site/assets/images/Ophthalmology/icons/CornealDisorders.svg';
import conditionIcon8 from '../site/assets/images/Ophthalmology/icons/RetinalDetachment.svg';
import conditionIcon9 from '../site/assets/images/Ophthalmology/icons/EyeInfectionsandAllergies.svg';
import conditionIcon10 from '../site/assets/images/Ophthalmology/icons/StrabismusandAmblyopia.svg';
import conditionIcon11 from '../site/assets/images/Ophthalmology/icons/EyeInjuries.svg';
import conditionIcon12 from '../site/assets/images/Ophthalmology/icons/CosmeticConcerns.svg';

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
    title: "Why Choose Lokmanya Hospitals for Ophthalmology?",
    items: [
        {
            title: 'Comprehensive Eye Care Services',
            description: 'We offer a full range of eye care services, including preventive, diagnostic, and surgical treatments, to address all your vision and ocular health concerns.',
            image: "/images/specialities-images/Ophthalmology/ComprehensiveEye.webp",
        },
        {
            title: 'Experienced Ophthalmologists',
            description: 'Our team of skilled ophthalmologists and optometrists have years of experience in diagnosing and treating a wide variety of eye conditions, ensuring you receive the most advanced and effective care.',
            image: "/images/specialities-images/Ophthalmology/ExperiencedOphthalmologists.webp",
        },
        {
            title: 'Personalized Treatment Plans',
            description: 'We provide individualized care tailored to your specific needs, whether youre seeking routine eye exams or advanced surgical procedures.',
            image: "/images/specialities-images/Ophthalmology/PersonalizedTreatmentPlans.webp",
        },
        {
            title: 'Affordable and Accessible Care',
            description: 'At Lokmanya Hospitals, we offer affordable ophthalmology services without compromising on the quality of care. We believe everyone deserves access to top-notch eye treatment.',
            image: "/images/specialities-images/Affordable.webp",
        },
    ]
};

const serviceData = {
    title: "Our Ophthalmology Services",
    items: [
        {
            title: "Preventive Eye Care",
            description: "Routine eye exams, screenings, and preventive measures to maintain healthy vision and detect potential issues early.",
            imageUrl: "/images/specialities-images/Ophthalmology/PreventiveEyeCare.webp",
        },
        {
            title: "Cataract Surgery",
            description: "Our specialists perform advanced cataract surgeries using techniques such as phacoemulsification and premium intraocular lens (IOL) implants for precise and effective results.",
            imageUrl: "/images/specialities-images/Ophthalmology/CataractSurgery.webp",
        },
        {
            title: "Glaucoma Management",
            description: "Comprehensive diagnosis, monitoring, and treatment of glaucoma using medications, laser therapy, or surgery to prevent vision loss.",
            imageUrl: "/images/specialities-images/Ophthalmology/GlaucomaManagement.webp",
        },
        {
            title: "Retinal Care",
            description: "Specialized care for retinal conditions such as diabetic retinopathy, macular degeneration, and retinal detachments, including advanced laser treatments and vitrectomy.",
            imageUrl: "/images/specialities-images/Ophthalmology/RetinalCare.webp",
        },
        {
            title: "Pediatric Ophthalmology",
            description: "Dedicated care for children, including vision screenings, treatment of lazy eye (amblyopia), and correction of strabismus (crossed eyes).",
            imageUrl: "/images/specialities-images/Ophthalmology/PediatricOphthalmology.webp",
        },
        {
            title: "Corneal Services",
            description: "Diagnosis and treatment of corneal disorders, including keratoconus, infections, and injuries, along with corneal transplants.",
            imageUrl: "/images/specialities-images/Ophthalmology/CornealServices.webp",
        },
        {
            title: "Dry Eye Treatment",
            description: "Comprehensive management of dry eye syndrome with advanced therapies to restore comfort and improve eye health.",
            imageUrl: "/images/specialities-images/Ophthalmology/DryEyeTreatment.webp",
        },
        {
            title: "Oculoplastic Surgery",
            description: "Cosmetic and reconstructive surgeries for eyelids, tear ducts, and orbit to enhance function and appearance.",
            imageUrl: "/images/specialities-images/Ophthalmology/OculoplasticSurgery.webp",
        },
    ]
};

const whatsetsApartdata = {
    title: "Ophthalmology at Lokmanya Hospitals – What Sets Us Apart?",
    items: [
        {
            title: "Patient-Centered Care",
            description: "We prioritize your comfort and well-being, creating personalized treatment plans that cater to individual needs and ensuring the best possible outcomes.",
            icon: Icon1,
        },
        {
            title: "Advanced Technology",
            description: "We use cutting-edge technology, including OCT (Optical Coherence Tomography), fundus photography, and advanced surgical equipment, for precise diagnosis and treatment.",
            icon: Icon2,
        },
        {
            title: "Minimally Invasive Techniques",
            description: "Whenever possible, we employ minimally invasive procedures to reduce discomfort, speed up recovery times, and deliver superior results.",
            icon: Icon3,
        },
        {
            title: "Comprehensive Post-Treatment Care",
            description: "We provide thorough aftercare, including follow-up visits, guidance on eye care, and preventive advice to ensure long-term vision health.",
            icon: Icon4,
        },
    ]
};
const consultationData = {
    title: "When To Consult an Ophthalmologist?",
    items: [
        {
            title: "Blurry or Distorted Vision",
            description: "Persistent vision changes may indicate refractive errors or underlying eye conditions.",
            image: "/images/specialities-images/Ophthalmology/blurred-vision.webp",
        },
        {
            title: "Eye Pain or Discomfort",
            description: "Any unexplained pain or discomfort should be evaluated promptly.",
            image: "/images/specialities-images/Ophthalmology/EyePainDiscomfort.webp",
        },
        {
            title: "Sudden Vision Loss",
            description: "Loss of vision in one or both eyes requires immediate attention.",
            image: "/images/specialities-images/Ophthalmology/SuddenVisionLoss.webp",
        },
        {
            title: "Red or Swollen Eyes",
            description: "Redness, swelling, or irritation could be signs of infections or other conditions.",
            image: "/images/specialities-images/Ophthalmology/RedSwollenEyes.webp",
        },
        {
            title: "Frequent Headaches",
            description: "Recurrent headaches can be linked to vision problems or eye strain.",
            image: "/images/specialities-images/Ophthalmology/FrequentHeadaches.webp",
        },
        {
            title: "Flashes or Floaters",
            description: "Sudden flashes of light or floating spots in your vision may indicate retinal issues.",
            image: "/images/specialities-images/Ophthalmology/FlashesorFloaters.webp",
        },
    ]
};

const ConditionsTreatData = {
    title: "Conditions We Treat",
    items: [
        {
            title: "Refractive Errors",
            icon: conditionIcon1,
        },
        {
            title: "Cataracts",
            icon: conditionIcon2,
        },
        {
            title: "Glaucoma",
            icon: conditionIcon3,
        },
        {
            title: "Diabetic Retinopathy",
            icon: conditionIcon4,
        },
        {
            title: "Macular Degeneration",
            icon: conditionIcon5,
        },
        {
            title: "Dry Eye Syndrome",
            icon: conditionIcon6,
        },
        {
            title: "Corneal Disorders",
            icon: conditionIcon7,
        },
        {
            title: "Retinal Detachment",
            icon: conditionIcon8,
        },
        {
            title: "Eye Infections and Allergies",
            icon: conditionIcon9,
        },
        {
            title: "Strabismus and Amblyopia",
            icon: conditionIcon10,
        },
        {
            title: "Eye Injuries",
            icon: conditionIcon11,
        },
        {
            title: "Cosmetic Concerns",
            icon: conditionIcon12,
        },
    ]
};

const faqs = [
    {
        question: "How often should I have an eye exam?",
        answer: "It’s recommended to have a routine eye exam every 1-2 years. Individuals with existing conditions may need more frequent check-ups.",
    },
    {
        question: "What are the symptoms of cataracts?",
        answer: "Symptoms include blurry vision, difficulty seeing at night, sensitivity to light, and seeing halos around lights.",
    },
    {
        question: "Can children undergo eye surgeries?",
        answer: "Yes, depending on the condition, children can undergo necessary eye surgeries, which are tailored to their specific needs.",
    },
];
const Opthalmology = () => {

    // const [expandedIndex, setExpandedIndex] = useState(null);

    // const toggleFAQ = (index) => {
    //     setExpandedIndex(expandedIndex === index ? null : index);
    // };

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
                <title>Top Eye Specialists in Pune | Lokmanya Hospitals</title>
                <meta name="description" content="Looking for the best eye hospital in Pune? Lokmanya Hospital offers expert
cataract, retina, glaucoma & LASIK treatments with advanced tech & trusted doctors." />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Hospital",
                        "name": "Lokmanya Hospital",
                        "url": "https://www.lokmanyahospitals.com/ophthalmology",
                        "description": "Lokmanya Hospital offers comprehensive ophthalmology services, providing expert care for a wide range of eye-related conditions in Pune, Maharashtra.",
                        "medicalSpecialty": "Ophthalmology",
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
                        <h1 className="page-heading">OPHTHALMOLOGY</h1>
                        <p className="subtitle">
                            Lokmanya Hospitals is a trusted name in eye care, offering a comprehensive range of services to meet all your vision and ocular health needs. Our team of experienced ophthalmologists utilizes advanced technology and innovative treatments to ensure the best care for patients of all ages.
                        </p>
                    </div>
                </CommonBanner>
                <div className="overview-section side-space section-space">
                    <h2 className="page-heading">Overview</h2>
                    <div className="para">
                        <p >
                            Lokmanya Hospitals is a leading provider of ophthalmology services in Pune, offering a full spectrum of care designed to maintain, restore, and enhance your vision. Our state-of-the-art ophthalmology department is equipped with the latest technology and staffed by a team of highly trained eye care professionals who are dedicated to providing personalized care in a comfortable environment.
                        </p>
                        <p >
                            From routine eye exams to complex surgical procedures, we are committed to delivering the highest quality care tailored to your individual needs. Whether you need preventive care, corrective treatments, or advanced surgeries, our team is here to help you achieve and maintain optimal eye health and clear vision.
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

export default Opthalmology;