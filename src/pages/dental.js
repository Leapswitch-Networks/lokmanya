import React, { useState, useEffect } from "react";
import { CommonBanner } from '../site/components';


import kneeImage from "../site/assets/images/Dentalcare/DentalPageBanner.webp";


import Icon1 from '../site/assets/images/Patient-CenteredCare.svg';
import Icon2 from '../site/../assets/images/Advanced Diagnostic Tools neuro.svg';
import Icon3 from '../site/assets/images/MinimallyInvasiveTechnique.svg';
import Icon4 from '../site/assets/images/HolisticandPreventiveCare.svg';


// import consultimg1 from '../site/assets/images/Dentalcare/PersistentToothGumPain.webp';
// import consultimg2 from '../site/assets/images/Dentalcare/BleedingGums.webp';
// import consultimg3 from '../site/assets/images/Dentalcare/SensitivityHotCold.webp';
// import consultimg4 from '../site/assets/images/Dentalcare/DifficultyChewingSwallowing.webp';
// import consultimg5 from '../site/assets/images/Dentalcare/BadBreathorUnpleasantTaste.webp';
// import consultimg6 from '../site/assets/images/Dentalcare/LooseShiftingTeeth.webp';

import conditionIcon1 from '../site/assets/images/Dentalcare/icons/ToothDecayandCavities.svg';
import conditionIcon2 from '../site/assets/images/Dentalcare/icons/GumDisease.svg';
import conditionIcon3 from '../site/assets/images/Dentalcare/icons/ToothSensitivity.svg';
import conditionIcon4 from '../site/assets/images/Dentalcare/icons/TeethGrinding.svg';
import conditionIcon5 from '../site/assets/images/Dentalcare/icons/OralCancer.svg';
import conditionIcon6 from '../site/assets/images/Dentalcare/icons/ToothLoss.svg';
import conditionIcon7 from '../site/assets/images/Dentalcare/icons/badbreath.svg';
import conditionIcon8 from '../site/assets/images/Dentalcare/icons/TMJ.svg';
import conditionIcon9 from '../site/assets/images/Dentalcare/icons/OrthodonticIssues.svg';
import conditionIcon10 from '../site/assets/images/Dentalcare/icons/MouthSores.svg';
import conditionIcon11 from '../site/assets/images/Dentalcare/icons/CosmeticConcerns.svg';
import conditionIcon12 from '../site/assets/images/Dentalcare/icons/RegularCheckup.svg';
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
import MeetOurExpertSpeciality from "@/site/components/MeetOurExpertSpeciality";
import { getSpecialityDoctors } from "@/ApiActions/CommonApi";

const WhyChooseData = {
    title: "Why Choose Lokmanya Hospitals for Dental Care?",
    subtitle: "Enhanced Dental Care with Multispecialty Support",
    description: "Our dental department benefits from being part of a larger hospital setup, offering an elevated level of care with access to cutting-edge medical technology and a wide range of healthcare specialists. Our multiple branches ensure that patients can easily access high-quality dental services at convenient locations, providing comprehensive care under one roof.",
    items: [
        {
            title: 'Comprehensive Dental Services',
            description: 'We offer a full range of dental services, including preventive, restorative, and cosmetic dentistry, to address all your oral health concerns.',
            image: "/images/specialities-images/Dental/ComprehensiveDental.webp",
        },
        {
            title: 'Experienced Dental Professionals',
            description: 'Our team of dentists, hygienists, and specialists have years of experience in diagnosing and treating a wide variety of dental conditions, ensuring you receive the most advanced and effective treatments.',
            image: "/images/specialities-images/Dental/ExperiencedDentalProfessionals.webp",
        },
        {
            title: 'Personalized Treatment Plans',
            description: 'We believe in providing individualized care that’s tailored to your specific needs, whether you’re seeking routine care or complex procedures.',
            image: "/images/specialities-images/Dental/PersonalizedTreatmentPlans.webp",
        },
        {
            title: 'Affordable and Accessible Care',
            description: 'At Lokmanya Hospitals, we offer affordable dental services without compromising on the quality of care. We believe everyone deserves access to top-notch dental treatment.',
            image: "/images/specialities-images/Affordable.webp",
        },
    ]
};

const serviceData = {
    title: "Our Dental Services",
    items: [
        {
            title: "Preventive Dentistry",
            description: "Routine dental exams, cleanings, and screenings to prevent oral health issues and maintain optimal dental hygiene.",
            imageUrl: "/images/specialities-images/Dental/PreventiveDentistry.webp",
        },
        {
            title: "Restorative Dentistry",
            description: "We offer a variety of restorative treatments, including fillings, crowns, bridges, and dentures, to restore the function and appearance of your teeth.",
            imageUrl: "/images/specialities-images/Dental/RestorativeDentistry.webp",
        },
        {
            title: "Cosmetic Dentistry",
            description: "Enhance the appearance of your smile with treatments like teeth whitening, veneers, and smile makeovers.",
            imageUrl: "/images/specialities-images/Dental/CosmeticDentistry.webp",
        },
        {
            title: "Orthodontics",
            description: "We provide orthodontic services for children and adults, including traditional braces and Invisalign, to straighten teeth and correct bite issues.",
            imageUrl: "/images/specialities-images/Dental/Orthodontics.webp",
        },
        {
            title: "Periodontics",
            description: "Our periodontists specialize in the prevention, diagnosis, and treatment of gum diseases, offering deep cleanings, scaling, and gum surgeries.",
            imageUrl: "/images/specialities-images/Dental/Periodontics.webp",
        },
        {
            title: "Pediatric Dentistry",
            description: "We offer specialized dental care for children, focusing on prevention and early intervention to ensure healthy teeth and gums as they grow.",
            imageUrl: "/images/specialities-images/Dental/PediatricDentistry.webp",
        },
        {
            title: "Endodontics",
            description: "We provide single-visit root canal treatments for a faster and more convenient experience.",
            imageUrl: "/images/specialities-images/Dental/Endodontics.webp",
        },
        {
            title: "Dental Implants",
            description: "Our dental implant specialists offer permanent solutions for missing teeth, providing you with a functional and aesthetically pleasing smile.",
            imageUrl: "/images/specialities-images/Dental/DentalImplants.webp",
        },
    ]
};

const whatsetsApartdata = {
    title: "Dental Care at Lokmanya Hospitals – What Sets Us Apart?",
    items: [
        {
            title: "Patient-Centered Care",
            description: "We prioritize our patients’ comfort and well-being, creating personalized treatment plans that cater to individual needs and ensuring the best possible outcomes.",
            icon: Icon1,
        },
        {
            title: "Advanced Technology",
            description: "We use state-of-the-art technology, including digital X-rays, to accurately diagnose and treat dental conditions with precision and efficiency.",
            icon: Icon2,
        },
        {
            title: "Minimally Invasive Techniques",
            description: "Whenever possible, we use minimally invasive procedures to reduce discomfort, speed up recovery times, and deliver better results.",
            icon: Icon3,
        },
        {
            title: "Comprehensive Post-Treatment Care",
            description: "We offer comprehensive aftercare, including follow-up visits, guidance on home care, and preventive advice to ensure long-term oral health.",
            icon: Icon4,
        },
    ]
};

const consultationData = {
    title: "When To Consult A Dentist for Dental Issues?",
    items: [
        {
            title: "Persistent Tooth or Gum Pain",
            description: "Pain lasting more than a few days or worsening over time is a sign that you should consult a dentist.",
            image: "/images/specialities-images/Dental/PersistentToothGumPain.webp",
        },
        {
            title: "Bleeding Gums",
            description: "If your gums bleed during brushing or flossing, it may be a sign of gum disease and requires prompt attention.",
            image: "/images/specialities-images/Dental/BleedingGums.webp",
        },
        {
            title: "Sensitivity to Hot or Cold",
            description: "Pain or discomfort when eating hot or cold food can indicate tooth sensitivity or decay.",
            image: "/images/specialities-images/Dental/SensitivityHotCold.webp",
        },
        {
            title: "Difficulty Chewing or Swallowing",
            description: "Difficulty chewing or swallowing could indicate underlying dental or health issues that need to be addressed.",
            image: "/images/specialities-images/Dental/DifficultyChewingSwallowing.webp",
        },
        {
            title: "Bad Breath or Unpleasant Taste",
            description: "Persistent bad breath or a strange taste in your mouth can be a sign of gum disease, infection, or other dental problems.",
            image: "/images/specialities-images/Dental/BadBreathorUnpleasantTaste.webp",
        },
        {
            title: "Loose or Shifting Teeth",
            description: "Teeth that feel loose or shift position could be a sign of gum disease or other serious conditions.",
            image: "/images/specialities-images/Dental/LooseShiftingTeeth.webp",
        },
    ]
};

const ConditionsTreatData = {
    title: "Conditions We Treat",
    items: [
        {
            title: "Tooth Decay and Cavities",
            icon: conditionIcon1,
        },
        {
            title: "Gum Disease (Gingivitis, Periodontitis)",
            icon: conditionIcon2,
        },
        {
            title: "Tooth Sensitivity",
            icon: conditionIcon3,
        },
        {
            title: "Teeth Grinding (Bruxism)",
            icon: conditionIcon4,
        },
        {
            title: "Oral Cancer",
            icon: conditionIcon5,
        },
        {
            title: "Tooth Loss",
            icon: conditionIcon6,
        },
        {
            title: "Bad Breath (Halitosis)",
            icon: conditionIcon7,
        },
        {
            title: "Temporomandibular Joint (TMJ) Disorders",
            icon: conditionIcon8,
        },
        {
            title: "Orthodontic Issues (Misaligned Teeth, Bite Problems)",
            icon: conditionIcon9,
        },
        {
            title: "Mouth Sores and Ulcers",
            icon: conditionIcon10,
        },
        {
            title: "Cosmetic Concerns (Stained, Chipped, or Crooked Teeth)",
            icon: conditionIcon11,
        },
        {
            title: "Regular Check up",
            icon: conditionIcon12,
        },
    ]
};


const faqs = [
    {
        question: "What are the signs that I need to visit a dentist?",
        answer: "If you experience persistent tooth pain, bleeding gums, difficulty chewing, or sudden tooth sensitivity, it's time to schedule a visit. Early intervention can prevent more serious dental issues.",
    },
    {
        question: "How often should I get a dental check-up?",
        answer: "It’s recommended to visit your dentist for a routine check-up and cleaning every six months. However, if you have specific concerns, your dentist may suggest more frequent visits.",
    },
    {
        question: "Are dental implants safe?",
        answer: "Yes, dental implants are a safe and effective solution for replacing missing teeth. They are designed to integrate with your jawbone, providing a permanent and natural-looking result when placed by a skilled professional.",
    },
    {
        question: "Can cosmetic dental procedures be done in one visit?",
        answer: "Some cosmetic procedures, like teeth whitening or dental bonding, can often be completed in a single visit. However, more complex treatments, such as veneers or smile makeovers, may require multiple visits to achieve the desired results.",
    },
];


const DentalCare = () => {


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
                <title>Best Dental Hospital in Pune | Lokmanya Hospital​s</title>
                <meta name="description" content="Lokmanya Hospital offers expert dental care in Pune, providing treatments like
root canals, implants, braces, and cosmetic dentistry for all age groups.​" />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Hospital",
                        "name": "Lokmanya Hospital",
                        "url": "https://www.lokmanyahospitals.com/dental",
                        "description": "Lokmanya Hospital offers comprehensive dental services, providing expert care for a wide range of dental and oral health conditions in Pune, Maharashtra.",
                        "medicalSpecialty": "Dentistry",
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
                        <h1 className="page-heading">DENTAL CARE</h1>
                        <p className="subtitle">
                            Lokmanya Hospitals is a trusted name in dental care, offering a comprehensive range of services to meet all your oral health needs. Our team of experienced and skilled dentists uses advanced technology and innovative treatments to ensure the best care for patients of all ages.
                        </p>
                    </div>
                </CommonBanner>
                <div className="overview-section side-space section-space">
                    <h2 className="page-heading">Overview</h2>
                    <div className="para">
                        <p >
                            Lokmanya Hospitals is a leading provider of dental care in Pune, offering a full spectrum of services designed to maintain, restore, and enhance oral health. Our state-of-the-art dental department is equipped with the latest technology and staffed by a team of highly trained dental professionals who are dedicated to providing personalized care in a comfortable environment.
                        </p>
                        <p >
                            From routine check-ups and cleanings to complex dental procedures, we are committed to delivering the highest quality care tailored to your individual needs. Whether you need preventive care, restorative treatments, or implantology, our team is here to help you achieve and maintain a healthy, beautiful smile.
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

export default DentalCare