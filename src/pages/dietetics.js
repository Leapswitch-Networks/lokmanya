import React, { useState, useEffect } from "react";
import { CommonBanner } from '../site/components';


import kneeImage from "../site/assets/images/dieticsbanner.webp";


import Icon1 from '../site/assets/images/Patient-CenteredCare.svg';
import Icon3 from '../site/assets/images/Comprehensive Follow-Up.svg';


import conditionIcon1 from '../site/assets/images/Obesity and Overweight.svg';
import conditionIcon2 from '../site/assets/images/Underweight and Malnutrition.svg';
import conditionIcon3 from '../site/assets/images/Diabetes and Pre-Diabetes.svg';
import conditionIcon4 from '../site/assets/images/Cardiovascular Diseases.svg';
import conditionIcon5 from '../site/assets/images/Hypertension.svg';
import conditionIcon6 from '../site/assets/images/Gastrointestinaldisorders.svg';
import conditionIcon7 from '../site/assets/images/food allergies.svg';
import conditionIcon8 from '../site/assets/images/Eating Disorders.svg';
import conditionIcon9 from '../site/assets/images/nutritional deficiencies.svg';
import conditionIcon10 from '../site/assets/images/Osteoporosis.svg';
import conditionIcon11 from '../site/assets/images/Pediatric and Adolescent Nutrition.svg';
import conditionIcon12 from '../site/assets/images/Geriatric Nutrition.svg';
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
    title: "Why Choose Lokmanya Hospitals for Dietetics?",
    items: [
        {
            title: 'Comprehensive Nutrition Services',
            description: 'We offer a full spectrum of dietetic services, including preventive nutrition, medical nutrition therapy, and lifestyle coaching, tailored to your individual health goals.',
            image: "/images/specialities-images/Dietetics/ComprehensiveNutritionServices.webp",
        },
        {
            title: 'Experienced Dietitians and Nutritionists',
            description: 'Our team of skilled dietitians has extensive experience in addressing a wide range of dietary concerns, ensuring you receive accurate, personalized advice and support.',
            image: "/images/specialities-images/Dietetics/ExperiencedDietitians.webp",
        },
        {
            title: 'Personalized Nutrition Plans',
            description: 'We believe in crafting individualized dietary plans based on your medical history, lifestyle, and preferences to ensure long-term success.',
            image: "/images/specialities-images/Dietetics/PersonalizedNutritionPlans.webp",
        },
        {
            title: 'Affordable and Accessible Care',
            description: 'Our dietetic services are designed to be both effective and affordable, making quality nutritional care accessible to everyone.',
            image: "/images/specialities-images/Affordable.webp",
        },
    ]
};

const serviceData = {
    title: "Our Dietetic Services",
    items: [
        {
            title: "Nutritional Counseling",
            description: "Personalized sessions to assess your dietary habits and develop actionable plans for healthier eating.",
            imageUrl: "/images/specialities-images/Dietetics/NutritionalCounseling.webp",
        },
        {
            title: "Weight Management",
            description: "Evidence-based strategies to help you achieve and maintain a healthy weight, including plans for weight loss, gain, or maintenance.",
            imageUrl: "/images/specialities-images/Dietetics/WeightManagement.webp",
        },
        {
            title: "Medical Nutrition Therapy",
            description: "Customized diets to manage and treat specific medical conditions such as diabetes, hypertension, cardiovascular diseases, gastrointestinal disorders, and renal diseases.",
            imageUrl: "/images/specialities-images/Dietetics/MedicalNutritionTherapy.webp",
        },
        {
            title: "Pediatric Nutrition",
            description: "Expert guidance on healthy eating habits for children to support their growth and development.",
            imageUrl: "/images/specialities-images/Dietetics/PediatricNutrition.webp",
        },
        {
            title: "Pregnancy and Postpartum Nutrition",
            description: "Nutritional care for expectant and new mothers to ensure the health of both mother and child.",
            imageUrl: "/images/specialities-images/Dietetics/Pregnancy.webp",
        },
        {
            title: "Elderly Nutrition",
            description: "Tailored dietary recommendations for seniors to address age-related health concerns and improve quality of life.",
            imageUrl: "/images/specialities-images/Dietetics/ElderlyNutrition.webp",
        },
        {
            title: "Diet Plans for Special Conditions",
            description: "Diets designed to address food allergies, intolerances, and specific lifestyle needs such as vegetarianism or veganism.",
            imageUrl: "/images/specialities-images/Dietetics/DietPlansforSpecialConditions.webp",
        },
    ]
};

const whatsetsApartdata = {
    title: "Dietetics at Lokmanya Hospitals – What Sets Us Apart?",
    items: [
        {
            title: "Patient-Centered Approach",
            description: "We prioritize understanding your unique needs, preferences, and goals to create a nutrition plan that works best for you.",
            icon: Icon1,
        },
        // {
        //     title: "Holistic Care",
        //     description: "We focus on integrating nutrition with overall health and wellness, offering lifestyle coaching and ongoing support to help you stay on track.",
        //     icon: Icon2,
        // },
        {
            title: "Comprehensive Follow-Up",
            description: "Our team ensures regular follow-ups to monitor progress, address challenges, and make necessary adjustments to your diet plan.",
            icon: Icon3,
        },
    ]
};

const consultationData = {
    title: "When To Consult a Dietitian?",
    items: [
        {
            title: "Unexplained Weight Changes",
            description: "Significant weight gain or loss without any obvious cause.",
            image: "/images/specialities-images/Dietetics/UnexplainedWeightChanges.webp",
        },
        {
            title: "Chronic Health Conditions",
            description: "If you have diabetes, heart disease, hypertension, or other conditions requiring dietary management.",
            image: "/images/specialities-images/Dietetics/ChronicHealthConditions.webp",
        },
        {
            title: "Digestive Issues",
            description: "Persistent bloating, constipation, or other gastrointestinal problems.",
            image: "/images/specialities-images/Dietetics/DigestiveIssues.webp",
        },
        {
            title: "Pregnancy or Postpartum",
            description: "To ensure adequate nutrition for you and your baby during and after pregnancy.",
            image: "/images/specialities-images/Dietetics/MemoryProblemsConfusion.jpg",
        },
        {
            title: "Fatigue or Low Energy",
            description: "A balanced diet can address nutritional deficiencies and boost your energy levels.",
            image: "/images/specialities-images/Dietetics/FatigueorLowEnergy.webp",
        },
        {
            title: "Food Allergies or Intolerances",
            description: "Expert advice on managing your diet while avoiding trigger foods.",
            image: "/images/specialities-images/Dietetics/FoodAllergiesorIntolerances.webp",
        },
    ]
};

const ConditionsTreatData = {
    title: "Conditions We Treat",
    items: [
        {
            title: "Obesity and Overweight",
            icon: conditionIcon1,
        },
        {
            title: "Underweight and Malnutrition",
            icon: conditionIcon2,
        },
        {
            title: "Diabetes and Pre-Diabetes",
            icon: conditionIcon3,
        },
        {
            title: "Cardiovascular Diseases",
            icon: conditionIcon4,
        },
        {
            title: "Hypertension",
            icon: conditionIcon5,
        },
        {
            title: "Gastrointestinal Disorders (IBS, GERD, etc.)",
            icon: conditionIcon6,
        },
        {
            title: "Food Allergies and Intolerances",
            icon: conditionIcon7,
        },
        {
            title: "Eating Disorders",
            icon: conditionIcon8,
        },
        {
            title: "Nutritional Deficiencies (Iron, Vitamin D, etc.)",
            icon: conditionIcon9,
        },
        {
            title: "Osteoporosis",
            icon: conditionIcon10,
        },
        {
            title: "Pediatric and Adolescent Nutrition",
            icon: conditionIcon11,
        },
        {
            title: "Geriatric Nutrition",
            icon: conditionIcon12,
        },
    ]
};
const faqs = [
    {
        question: "How do I know if I need to see a dietitian?",
        answer: "If you’re experiencing weight changes, managing a chronic condition, or need guidance on healthy eating, consulting a dietitian can help you achieve your health goals.",
    },
    {
        question: "What should I expect during a consultation?",
        answer: "Your dietitian will assess your medical history, dietary habits, and lifestyle to create a personalized nutrition plan. Follow-ups will track your progress and make necessary adjustments.",
    },
    {
        question: "Can a dietitian help with weight loss?",
        answer: "Yes, our dietitians specialize in creating sustainable weight loss plans tailored to your needs, preferences, and medical conditions.",
    },
    {
        question: "How often should I meet with a dietitian?",
        answer: "The frequency depends on your goals and health conditions. Most clients benefit from an initial consultation followed by monthly follow-ups.",
    },
    {
        question: "Are the diet plans restrictive?",
        answer: "Our plans focus on balance and sustainability, allowing you to enjoy a variety of foods while meeting your nutritional needs.",
    },
];

const Dietetics = () => {

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
                <title>Best Dietetics & Nutrition Care in Pune | Lokmanya Hospitals</title>
                <meta name="description" content="Lokmanya Hospital offers expert dietetics care in Pune, providing personalized
nutrition plans for diabetes, heart health, weight management, and digestive wellness." />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Hospital",
                        "name": "Lokmanya Hospital",
                        "url": "https://www.lokmanyahospitals.com/dietetics",
                        "description": "Lokmanya Hospital offers expert dietetics care in Pune, providing personalized nutrition plans for diabetes, heart health, weight management, and digestive wellness.",
                        "medicalSpecialty": "Dietetics",
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
                        <h1 className="page-heading">DIETETICS</h1>
                        <p className="subtitle">
                            Lokmanya Hospitals is a trusted name in dietetics, offering a comprehensive range of services to help you achieve optimal health and wellness through personalized nutrition. Our team of experienced dietitians and nutritionists utilizes evidence-based practices to create tailored plans for individuals of all ages and health conditions.
                        </p>
                    </div>
                </CommonBanner>
                <div className="overview-section side-space section-space">
                    <h2 className="page-heading">Overview</h2>
                    <div className="para">
                        <p >
                            Lokmanya Hospitals is a leading provider of dietetic services in Pune, offering expert guidance on nutrition to support overall health and manage specific medical conditions. Our dietetics department is equipped with the latest tools and staffed by highly qualified professionals dedicated to promoting healthy lifestyles through customized dietary strategies.
                        </p>
                        <p >
                            From weight management and sports nutrition to therapeutic diets for chronic conditions, we are committed to providing practical, science-backed solutions to meet your unique nutritional needs. Whether your goal is to improve general health, address specific health concerns, or enhance athletic performance, our team is here to guide you every step of the way.
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

export default Dietetics