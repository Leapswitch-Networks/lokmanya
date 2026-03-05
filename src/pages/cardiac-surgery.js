import React, { useEffect, useState } from "react";
import { CommonBanner } from '../site/components';


import kneeImage from "../site/assets/images/male-student-practicing-medicine.webp";


import Icon1 from '../site/assets/images/Patient-CenteredCare.svg';
import Icon2 from '../site/assets/images/AdvancedDiagnosticTechnology.svg';
import Icon3 from '../site/assets/images/MinimallyInvasiveTechnique.svg';
import Icon4 from '../site/assets/images/ComprehensivePreandPostOperativeCare.svg';


import conditionIcon1 from '../site/assets/images/Coronary Artery Disease.svg';
import conditionIcon2 from '../site/assets/images/Heart Valve Disorders.svg';
import conditionIcon3 from '../site/assets/images/Atrial Fibrillation.svg';
import conditionIcon4 from '../site/assets/images/HeartDiseaseStroke.svg';
import conditionIcon5 from '../site/assets/images/Heart Failure.svg';
import conditionIcon6 from '../site/assets/images/Aortic Aneurysms.svg';
import conditionIcon7 from '../site/assets/images/Arrhythmias.svg';
import conditionIcon8 from '../site/assets/images/Cardiomyopathy.svg';
import conditionIcon9 from '../site/assets/images/Pericarditis.svg';
import conditionIcon10 from '../site/assets/images/Endocarditis2x.svg';
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
    title: "Why Choose Lokmanya Hospitals for Cardiac Surgery?",
    items: [
        {
            title: 'Comprehensive Cardiac Care',
            description: 'We offer a wide range of surgical and non-surgical treatments to address all heart-related conditions.',
            image: "/images/specialities-images/CardiacSurgery/ComprehensiveCardiacCare.webp",
        },
        {
            title: 'Experienced Cardiac Specialists',
            description: 'Our team of renowned cardiac surgeons, anesthesiologists, and cardiologists brings decades of experience in managing complex heart conditions.',
            image: "/images/specialities-images/CardiacSurgery/ExperiencedCardiacSpecialists.webp",
        },
        {
            title: 'Personalized Treatment Plans',
            description: 'We create customized treatment plans tailored to your specific condition, lifestyle, and health goals.',
            image: "/images/specialities-images/CardiacSurgery/PersonalizedTreatmentPlans.webp",
        },
        {
            title: 'Affordable and Accessible Care',
            description: 'Lokmanya Hospitals is committed to providing world-class cardiac care at an affordable cost, ensuring accessibility for everyone.',
            image: "/images/specialities-images/Affordable.webp",
        },
    ]
};

const serviceData = {
    title: "Our Cardiac Surgery Services",
    items: [
        {
            title: "Coronary Artery Bypass Grafting (CABG)",
            description: "A surgical procedure to restore blood flow to the heart by bypassing blocked arteries using grafts.",
            imageUrl: "/images/specialities-images/CardiacSurgery/CoronaryArteryBypass.webp",
        },
        {
            title: "Heart Valve Surgery",
            description: "Repair or replacement of damaged heart valves to improve blood flow and overall heart function.",
            imageUrl: "/images/specialities-images/CardiacSurgery/HeartValveSurgery.webp",
        },
        {
            title: "Minimally Invasive Cardiac Surgery",
            description: "Advanced techniques to perform surgeries with smaller incisions, resulting in faster recovery and less discomfort.",
            imageUrl: "/images/specialities-images/CardiacSurgery/MinimallyInvasiveCardiacSurgery.webp",
        },
        {
            title: "Aortic Surgery",
            description: "Treatment of conditions affecting the aorta, including aneurysms and dissections, to prevent life-threatening complications.",
            imageUrl: "/images/specialities-images/CardiacSurgery/AorticSurgery.webp",
        },
        {
            title: "Pacemaker and ICD Implantation",
            description: "Implantation of devices to regulate heart rhythm and prevent life-threatening arrhythmias.",
            imageUrl: "/images/specialities-images/CardiacSurgery/Pacemaker.webp",
        },
        {
            title: "Congenital Heart Defect Surgery",
            description: "Correction of structural abnormalities in the heart present from birth, improving function and quality of life.",
            imageUrl: "/images/specialities-images/CardiacSurgery/CongenitalHeartDefectSurgery.webp",
        },
    ]
};

const whatsetsApartdata = {
    title: "Cardiac Surgery at Lokmanya Hospitals – What Sets Us Apart?",
    items: [
        {
            title: "Patient-Centered Care",
            description: "We prioritize our patients’ comfort and recovery, ensuring every treatment plan is tailored to their unique needs.",
            icon: Icon1,
        },
        {
            title: "Advanced Technology",
            description: "Our facilities feature cutting-edge tools like 3D imaging, robotic surgery systems, and advanced monitoring devices for precision and safety.",
            icon: Icon2,
        },
        {
            title: "Minimally Invasive Techniques",
            description: "Whenever possible, we employ minimally invasive approaches to reduce recovery time, scarring, and post-operative discomfort.",
            icon: Icon3,
        },
        {
            title: "Comprehensive Post-Surgery Care",
            description: "Our holistic approach includes rehabilitation programs, follow-up visits, and lifestyle guidance to promote long-term heart health.",
            icon: Icon4,
        },
    ]
};

const consultationData = {
    title: "When To Consult a Cardiac Surgeon?",
    items: [
        {
            title: "Chest Pain or Discomfort",
            description: "Recurring chest pain could indicate a heart condition requiring immediate evaluation.",
            image: "/images/specialities-images/CardiacSurgery/ChestPain.webp",
        },
        {
            title: "Shortness of Breath",
            description: "Difficulty breathing, especially during physical activity, can signal heart problems.",
            image: "/images/specialities-images/CardiacSurgery/ShortnessofBreath.webp",
        },
        {
            title: "Irregular Heartbeats",
            description: "Persistent arrhythmias or palpitations may need surgical intervention.",
            image: "/images/specialities-images/CardiacSurgery/IrregularHeartbeats.webp",
        },
        {
            title: "Swelling in Legs or Feet",
            description: "Edema can be a sign of heart failure or valve disease.",
            image: "/images/specialities-images/CardiacSurgery/SwellingLegsFeet.webp",
        },
        {
            title: "Fatigue and Weakness",
            description: "Unexplained fatigue might be linked to poor heart function.",
            image: "/images/specialities-images/CardiacSurgery/FatigueandWeakness.webp",
        },
        {
            title: "Dizziness or Fainting",
            description: "Frequent dizziness or fainting spells should be evaluated for potential heart issues.",
            image: "/images/specialities-images/CardiacSurgery/DizzinessorFainting.webp",
        },
    ]
};

const ConditionsTreatData = {
    title: "Conditions We Treat",
    items: [
        {
            title: "Coronary Artery Disease",
            icon: conditionIcon1,
        },
        {
            title: "Heart Valve Disorders",
            icon: conditionIcon2,
        },
        {
            title: "Atrial Fibrillation",
            icon: conditionIcon3,
        },
        {
            title: "Congenital Heart Defects",
            icon: conditionIcon4,
        },
        {
            title: "Heart Failure",
            icon: conditionIcon5,
        },
        {
            title: "Aortic Aneurysms",
            icon: conditionIcon6,
        },
        {
            title: "Arrhythmias",
            icon: conditionIcon7,
        },
        {
            title: "Cardiomyopathy",
            icon: conditionIcon8,
        },
        {
            title: "Pericarditis",
            icon: conditionIcon9,
        },
        {
            title: "Endocarditis",
            icon: conditionIcon10,
        },
    ]
};


const faqs = [
    {
        question: "What are the signs that I need cardiac surgery?",
        answer: "If you experience persistent chest pain, shortness of breath, or irregular heartbeats, consult a cardiologist. Early intervention can improve outcomes significantly.",
    },
    {
        question: "How long does it take to recover from cardiac surgery?",
        answer: "Recovery time varies depending on the procedure but typically ranges from a few weeks for minimally invasive surgeries to several months for open-heart procedures.",
    },
    {
        question: "Are minimally invasive cardiac surgeries effective?",
        answer: "Yes, minimally invasive surgeries are highly effective and offer several benefits, including smaller incisions, reduced pain, and faster recovery times.",
    },
    {
        question: "Can heart surgery completely cure my condition?",
        answer: "While surgery can address and improve many heart conditions, maintaining a healthy lifestyle and following medical advice are crucial for long-term success.",
    },
    {
        question: "How do I prepare for cardiac surgery?",
        answer: "Your surgeon will provide specific guidelines, including dietary restrictions, medications, and lifestyle adjustments, to prepare for surgery.",
    },
];
const CardiacSurgery = () => {

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
                <title>Best Cardiac Surgery Hospital in Pune | Lokmanya Hospital​s</title>
                <meta name="description" content="Lokmanya Hospital offers CABG, valve repair/replacement, ASD/VSD closure,
bypass, pacemaker, and minimally invasive cardiac surgery by expert surgeons." />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Hospital",
                        "name": "Lokmanya Hospital",
                        "url": "https://www.lokmanyahospitals.com/cardiac-surgery",
                        "description": "Lokmanya Hospital offers comprehensive cardiac surgery services, providing expert diagnosis and treatment for a wide range of heart-related conditions in Pune, Maharashtra.",
                        "medicalSpecialty": "Cardiac Surgery",
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
                        <h1 className="page-heading">CARDIAC SURGERY</h1>
                        <p className="subtitle">
                            Lokmanya Hospitals is a trusted name in cardiac care, offering a comprehensive range of surgical solutions to address all your heart health needs. Our team of experienced cardiac surgeons uses cutting-edge technology and innovative techniques to ensure the best outcomes for patients of all ages.
                        </p>
                    </div>
                </CommonBanner>
                <div className="overview-section side-space section-space">
                    <h2 className="page-heading">Overview</h2>
                    <div className="para">
                        <p >
                            Lokmanya Hospitals is a leading provider of cardiac surgery in Pune, offering a full spectrum of services designed to treat, manage, and improve cardiovascular health. Our state-of-the-art cardiac care department is equipped with advanced facilities and staffed by highly skilled surgeons and medical professionals dedicated to providing personalized care in a compassionate environment.
                        </p>
                        <p >
                            From minimally invasive procedures to complex open-heart surgeries, we are committed to delivering the highest quality care tailored to each patient’s unique needs. Whether you require preventive treatment, surgical intervention, or post-operative care, our team is here to support you every step of the way toward a healthier heart.
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

export default CardiacSurgery;