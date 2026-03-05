import React, { useState, useEffect } from "react";
// import "./Neurosurgery.css";
import { CommonBanner } from '../site/components';


import kneeImage from "../site/assets/images/neurosurgerybanner.webp";

import Icon1 from '../site/assets/images/AdvancedDiagnosticTechnology.svg';
import Icon2 from '../site/assets/images/Patient-CenteredCare.svg';
import Icon3 from '../site/../assets/images/Affordable Neurology Care in Pune.svg';
import Icon4 from '../site/assets/images/Innovative Treatments.svg';
import Icon5 from '../site/assets/images/Emergency Neuro Care.svg';


import conditionIcon1 from '../site/../assets/images/Brain Tumors.svg';
import conditionIcon2 from '../site/../assets/images/Stroke_n.svg';
import conditionIcon3 from '../site/../assets/images/Epilepsy.svg';
import conditionIcon4 from '../site/assets/images/Spinal Cord Tumors.svg';
import conditionIcon5 from '../site/assets/images/Herniated Discs and Spinal Stenosis.svg';
import conditionIcon6 from '../site/../assets/images/Multiple Sclerosis.svg';
import conditionIcon7 from '../site/../assets/images/Migraine.svg';
import conditionIcon8 from '../site/assets/images/Hydrocephalus.svg';
import conditionIcon9 from '../site/../assets/images/Neuroinfectious Diseases.svg';
import conditionIcon10 from '../site/assets/images/MovementDisorders.svg';
import conditionIcon11 from '../site/assets/images/Chiari Malformations.svg';
import conditionIcon12 from '../site/../assets/images/Traumatic Brain Injury.svg';
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
    title: "Why Choose Lokmanya Hospitals for NeuroSurgery?",
    description: "Lokmanya Hospitals is a trusted name in neurosurgical care, recognized for our expertise, innovation, and patient-centric approach. Here’s why we stand out :",
    items: [
        {
            title: 'Expert Neurosurgeons',
            description: 'Our neurosurgical team consists of highly qualified and experienced surgeons skilled in treating a wide range of neurological conditions. Using advanced surgical techniques, we ensure precision and optimal outcomes for every patient.',
            image: "/images/specialities-images/NeuroSurgery/ExpertNeurosurgeonsneurosrgy.webp",
        },
        {
            title: 'State-of-the-Art Facilities',
            description: 'We employ the latest diagnostic and surgical technologies, including high-resolution MRI, CT scans, neuronavigation systems, and intraoperative imaging for accurate diagnosis and safe procedures.',
            image: "/images/specialities-images/NeuroSurgery/State-of-the-ArtFacilities.webp",
        },
        {
            title: 'Comprehensive Treatment Options',
            description: 'From non-invasive treatments to complex surgeries, we offer a full spectrum of neurosurgical care for brain, spine, and peripheral nerve disorders.',
            image: "/images/specialities-images/NeuroSurgery/comprehensive-trtmt-opt.webp",
        },
        {
            title: 'Minimally Invasive Techniques',
            description: 'Whenever possible, we utilize minimally invasive surgical techniques that reduce pain, minimize scarring, and shorten recovery times.',
            image: "/images/specialities-images/NeuroSurgery/MinimallyInvasiveTechniques.webp",
        },
        {
            title: 'Personalized Care Plans',
            description: 'Every neurological condition is unique. Our specialists create customized treatment plans based on your medical history, diagnosis, and personal health goals.',
            image: "/images/specialities-images/NeuroSurgery/PersonalizedCarePlans.webp",
        },
        {
            title: 'Affordable and Accessible Care',
            description: 'We believe that high-quality neurosurgical care should be accessible to all. Our services are designed to be affordable without compromising on quality.',
            image: "/images/specialities-images/Affordable.webp",
        }
    ]
};

const serviceData = {
    title: "Our Neuro Surgery Services",
    items: [
        {
            title: "Brain Tumor Surgery",
            description: "Our experts specialize in the surgical removal of brain tumors, employing minimally invasive techniques and advanced imaging to ensure precision and safety.",
            imageUrl: "/images/specialities-images/NeuroSurgery/BrainTumorSurgery.webp",
        },
        {
            title: "Spinal Neurosurgery",
            description: "We provide comprehensive care for spinal disorders due to congenital, traumatic and degenerative conditions. Some examples include herniated discs, spinal stenosis, and spinal cord injuries, CV Junction anomalies using both surgical and non-surgical approaches.",
            imageUrl: "/images/specialities-images/NeuroSurgery/SpinalNeuroSurgery.webp",
        },
        {
            title: "Neurovascular Surgery",
            description: "Our team treats complex neurovascular conditions such as aneurysms and arteriovenous malformations (AVMs) using both surgical and endovascular techniques.",
            imageUrl: "/images/specialities-images/NeuroSurgery/NeurovascularSurgery.webp",
        },
        {
            title: "Epilepsy Surgery",
            description: "For patients with drug-resistant epilepsy, we offer surgical solutions that can significantly reduce or eliminate seizures, improving quality of life.",
            imageUrl: "/images/specialities-images/NeuroSurgery/EpilepsySurgery.webp",
        },
        {
            title: "Peripheral Nerve Surgery",
            description: "We specialize in treating conditions like carpal tunnel syndrome, nerve entrapments, and peripheral nerve injuries through advanced microsurgical techniques.",
            imageUrl: "/images/specialities-images/NeuroSurgery/PeripheralNerveSurgery.webp",
        },
        {
            title: "Trauma and Emergency Neurosurgery",
            description: "Our trauma team is available 24/7 to provide immediate care for head injuries, skull fractures, and other neurological emergencies.",
            imageUrl: "/images/specialities-images/NeuroSurgery/TraumaEmergencyNeurosurgery.webp",
        },
        // {
        //     title: "Functional Neurosurgery",
        //     description: "We offer treatments for movement disorders such as Parkinson’s disease and dystonia, including Deep Brain Stimulation (DBS) for advanced cases.",
        //     imageUrl: img7,
        // },
        // {
        //     title: "Hydrocephalus Treatment",
        //     description: "Our specialists provide effective solutions for hydrocephalus, including the placement of shunts and endoscopic ventriculostomy procedures.",
        //     imageUrl: img8,
        // },
    ]
};

const whatsetsApartdata = {
    title: "What Sets Lokmanya Hospitals Apart in NeuroSurgery?",
    items: [
        {
            title: "Advanced Diagnostic Tools",
            description: "Our neuroimaging technologies enable precise diagnosis and treatment planning, ensuring better outcomes for our patients.",
            icon: Icon1,
        },
        {
            title: "Patient-Centric Approach",
            description: "We focus on your overall well-being, tailoring every aspect of your treatment plan to your specific needs and health goals.",
            icon: Icon2,
        },
        {
            title: "Holistic Care",
            description: "Beyond surgery, we provide comprehensive rehabilitation and support services to help you recover fully and maintain long-term neurological health.",
            icon: Icon3,
        },
        {
            title: "Innovative Treatments",
            description: "Our neurosurgeons stay at the forefront of medical advancements, adopting the latest techniques to provide the best care possible.",
            icon: Icon4,
        },
        {
            title: "Emergency Neuro Care",
            description: "With 24/7 availability, we ensure timely and effective treatment for neurological emergencies.",
            icon: Icon5,
        }
    ]
};

const consultationData = {
    title: "When to Consult a Neurosurgeon?",
    items: [
        {
            title: "Chronic Headaches",
            description: "Severe or persistent headaches, not changing sides, especially when accompanied by visual disturbances  or nausea, should be evaluated by a specialist.",
            image: "/images/specialities-images/NeuroSurgery/ChronicHeadache.webp",
        },
        {
            title: "Neurological Symptoms",
            description: "Symptoms like sudden weakness, numbness, or difficulty speaking may indicate a serious neurological issue requiring immediate attention.",
            image: "/images/specialities-images/NeuroSurgery/NeurologicalSymptoms.webp",
        },
        {
            title: "Seizures",
            description: "Unexplained seizures or changes in seizure patterns warrant consultation with a neurosurgeon.",
            image: "/images/specialities-images/NeuroSurgery/Seizures.webp",
        },
        {
            title: "Head Injuries",
            description: "Traumatic head injuries with symptoms like confusion, loss of consciousness, or bleeding require urgent evaluation.",
            image: "/images/specialities-images/NeuroSurgery/HeadInjury.webp",
        },
        {
            title: "Back or Neck Pain",
            description: "Persistent or worsening back and neck pain, especially if accompanied by numbness or tingling, may indicate a spinal condition.",
            image: "/images/specialities-images/NeuroSurgery/Back&NeckPain.webp",
        },
    ]
};

const ConditionsTreatData = {
    title: "Conditions We Treat",
    subtitle: "At Lokmanya Hospitals, we manage a wide range of neurological conditions, including :",
    items: [
        {
            title: "Brain Tumors (Benign and Malignant)",
            icon: conditionIcon1,
        },
        {
            title: "Aneurysms and AVMs",
            icon: conditionIcon2,
        },
        {
            title: "Epilepsy and Seizure Disorders",
            icon: conditionIcon3,
        },
        {
            title: "Spinal Cord Tumors and Injuries",
            icon: conditionIcon4,
        },
        {
            title: "Herniated Discs and Spinal Stenosis",
            icon: conditionIcon5,
        },
        {
            title: "Traumatic Brain Injuries (TBI)",
            icon: conditionIcon6,
        },
        {
            title: "Trigeminal Neuralgia",
            icon: conditionIcon7,
        },
        {
            title: "Hydrocephalus",
            icon: conditionIcon8,
        },
        {
            title: "Peripheral Nerve Disorders",
            icon: conditionIcon9,
        },
        {
            title: "Movement Disorders (e.g., Parkinson’s Disease)",
            icon: conditionIcon10,
        },
        {
            title: "Chiari Malformations",
            icon: conditionIcon11,
        },
        {
            title: "Cranial Nerve Disorders",
            icon: conditionIcon12,
        },
    ]
};

const faqs = [
    {
        question: "What are the risks associated with neurological treatments?What are the common signs of a neurological condition?",
        answer: "Symptoms such as chronic headaches, dizziness, numbness, weakness, or seizures may indicate a neurological issue requiring medical attention.",
    },
    {
        question: "What are the benefits of minimally invasive neuro surgery?",
        answer: "Minimally invasive techniques offer reduced pain, minimum blood loss, shorter recovery times, and smaller scars compared to traditional surgeries.",
    },
    {
        question: "How long does it take to recover from brain surgery?",
        answer: "Recovery varies based on the type of surgery and the individual’s overall health. Most patients resume daily activities within 4-8 weeks.",
    },
    {
        question: "Can neurological conditions be prevented?",
        answer: "While some conditions are unavoidable, maintaining a healthy lifestyle, managing stress, and addressing risk factors like high blood pressure can reduce the likelihood of certain neurological disorders.",
    },
];
const Neurosurgery = () => {

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
                <title>Best Neurosurgery Hospital in Pune | Lokmanya Hospital​s</title>
                <meta name="description" content="Lokmanya Hospital in Pune offers expert neurosurgical care for brain, spine, and
nerve conditions with advanced technology and experienced specialists.​" />

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Hospital",
                        "name": "Lokmanya Hospital",
                        "url": "https://www.lokmanyahospitals.com/neurosurgery",
                        "description": "Lokmanya Hospital offers advanced neurosurgical care, providing expert diagnosis and treatment for a wide range of neurological conditions in Pune, Maharashtra.",
                        "medicalSpecialty": "Neurosurgery",
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
                        <h1 className="page-heading">NEUROSURGERY</h1>
                        <p className="subtitle">
                            Lokmanya Hospitals is known for its highly skilled neurosurgeons who utilize cutting-edge technology and innovative techniques to treat complex neurological conditions, ensuring optimal outcomes for patients.
                        </p>
                    </div>
                </CommonBanner>
                <div className="overview-section side-space section-space">
                    <h2 className="page-heading">Overview</h2>
                    <div className="para">
                        <p >
                            At Lokmanya Hospitals, we specialize in providing world-class neurosurgical care to patients in Pune and beyond. From brain tumors and aneurysms to spine-related neurological disorders, our highly skilled neurosurgeons deliver advanced treatment options tailored to your needs. Equipped with cutting-edge technology and guided by years of expertise, we are committed to improving neurological health and enhancing your quality of life.
                        </p>
                        <p >
                            Whether you require minimally invasive brain surgery, complex spinal procedures, or non-surgical interventions, our team is here to offer compassionate and personalized care. Our goal is to address neurological issues effectively, enabling you to lead a healthier and more active life.
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

export default Neurosurgery