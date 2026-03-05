import React, { useEffect, useState } from "react";

import LokmanyaNetwork from "../site/components/LokmanyaNetworkSection/LokmanyaNetwork";
import WhyChooseSection from "../site/components/WhyChooseSection/WhyChooseSection";
import OurServicesSection from "../site/components/OurServicesSection/OurServicesSection";
import WhatsetsApartSection from "../site/components/WhatSetsApartSection/WhatsetsApartSection";

import Icon1 from "../assets/images/patient neuro.svg";
import Icon3 from "../assets/images/Affordable Neurology Care in Pune.svg";
import Icon4 from "../assets/images/Comprehensive Follow-Up Care.svg";

import WhenConsultSection from "../site/components/WhenConsultSection/WhenConsultSection";

import ConditionIcon2 from "../assets/images/Stroke_n.svg";
import ConditionIcon3 from "../assets/images/Epilepsy.svg";
import ConditionIcon4 from "../assets/images/Parkinsons Disease.svg";
import ConditionIcon5 from "../assets/images/Alzheimers Disease.svg";
import ConditionIcon6 from "../assets/images/Multiple Sclerosis.svg";
import ConditionIcon7 from "../assets/images/Migraine.svg";
import ConditionIcon9 from "../assets/images/Neuroinfectious Diseases.svg";
import ConditionIcon10 from "../assets/images/Nerve and Muscle Disorders.svg";
import ConditionIcon11 from "../assets/images/Cerebral Palsy.svg";
import ConditionIcon13 from "../assets/images/Nerve and Muscle Disorders-1.svg";
import ConditionIcon14 from "../assets/images/Sleep Disorders.svg";
import ConditionIcon15 from "../assets/images/Pediatric Disorder.svg";
import ConditionsTreatSection from "../site/components/ConditionsTreatSection/ConditionsTreatSection";
import FaqSection from "../site/components/FaqSection/FaqSection";
import PatientSuccessStories from "../site/components/PatientsSuccessStorySection/PatientSuccessStories";
import Head from "next/head";
import { CommonBanner } from "../site/components";
import BannerImg from "../site/assets/images/Neurology-banner.webp";
import { useRouter } from "next/router";
import { getSpecialityDoctors } from "@/ApiActions/CommonApi";
import MeetOurExpertSpeciality from "@/site/components/MeetOurExpertSpeciality";

const WhyChooseData = {
  title: "Why Choose Lokmanya Hospitals for Neurology Care?",
  items: [
    {
      title: "Comprehensive Neurology Treatment",
      description:
        "From diagnosing complex neurological conditions to offering surgical solutions and rehabilitation, we provide a full spectrum of services.",
      image: "/images/specialities-images/Neurology/ComprehensiveNeurologyTreatment.jpg",
    },
    {
      title: "Expert Team",
      description:
        "Our team consists of highly qualified neurologists, neurosurgeons, and therapists with years of experience in treating various neurological disorders.",
      image: "/images/specialities-images/Neurology/ExpertTeamneurology.jpg",
    },
    // {
    //   title: 'State-of-the-Art Infrastructure',
    //   description: 'We are equipped with advanced technology, allowing us to provide precise diagnostic evaluations and the most effective treatments.',
    //   image: Image3,
    // },
    {
      title: "Personalized Care",
      description:
        "We offer holistic care that includes not just medical treatments, but emotional and psychological support, as well as rehabilitation programs for faster recovery.",
      image: "/images/specialities-images/Neurology/PersonalizedCareneuro.jpg",
    },
    {
      title: "Affordable and Accessible",
      description:
        "We strive to make high-quality neurology care accessible to all, ensuring affordability without compromising on excellence.",
      image: "/images/specialities-images/Affordable.webp",
    },
  ],
};

const serviceData = {
  title: "Our Neurology Treatment Services",
  items: [
    // {
    //   title: "Neurosurgery",
    //   description: "Our skilled neurosurgeons perform delicate surgeries for conditions such as brain tumors, spinal disorders, and other complex neurological issues, using advanced surgical techniques for minimal recovery time.",
    //   imageUrl: img1,
    // },
    {
      title: "Stroke Management",
      description:
        "We provide timely and effective care for stroke patients, from emergency care to rehabilitation, ensuring the best possible outcomes.",
      imageUrl: "/images/specialities-images/Neurology/StrokeManagement.jpg",
    },
    {
      title: "Epilepsy Care",
      description:
        "Our team offers a comprehensive approach to epilepsy, including medication management, surgery, and other treatments to improve quality of life.",
      imageUrl: "/images/specialities-images/Neurology/EpilepsyCare.jpg",
    },
    {
      title: "Parkinson’s Disease and Movement Disorders",
      description:
        "We offer specialized care for patients with Parkinson’s disease and other movement disorders, including medical management and surgical options like deep brain stimulation.",
      imageUrl: "/images/specialities-images/Neurology/ParkinsonDisorders.jpg",
    },
    // {
    //   title: "Spinal Disorders",
    //   description: "Whether it’s spinal cord injuries, herniated discs, or other conditions, our expert team provides non-surgical and surgical solutions tailored to the patient’s condition.",
    //   imageUrl: img5,
    // },
    {
      title: "Neurodegenerative Diseases",
      description:
        "Our team offers cutting-edge treatment for conditions such as Alzheimer’s disease, dementia, and multiple sclerosis, focusing on slowing progression and improving cognitive function.",
      imageUrl: "/images/specialities-images/Neurology/NeurodegenerativeDiseases.jpg",
    },
    {
      title: "Headache & Migraine",
      description:
        "We specialize in the diagnosis and treatment of chronic headaches and migraines, offering a range of treatments to alleviate symptoms and improve quality of life.",
      imageUrl: "/images/specialities-images/Neurology/HeadachesandMigraines.jpg",
    },
  ],
};

const whatsetsApartdata = {
  title: "Neurology Care at Lokmanya Hospitals – What Sets Us Apart?",
  items: [
    {
      title: "Patient-Centered Care",
      description:
        "We believe in putting our patients’ needs first, ensuring that each treatment plan is customized for the best possible outcomes.",
      icon: Icon1,
    },
    // {
    //   title: "Advanced Diagnostic Tools",
    //   description: "Accurate and early diagnosis is key to effective treatment. Our hospital is equipped with the latest imaging and diagnostic technologies, ensuring that we provide the most precise care.",
    //   icon: Icon2,
    // },
    {
      title: "Affordable Neurology Care in Pune",
      description:
        "We are committed to offering high-quality neurology services at accessible rates, ensuring that every patient has access to world-class treatment.",
      icon: Icon3,
    },
    {
      title: "Comprehensive Follow-Up Care",
      description:
        "Our commitment to your health doesn’t end after treatment. We provide regular follow-up care to monitor your progress and ensure a smooth recovery.",
      icon: Icon4,
    },
  ],
};

const consultationData = {
  title: "When To Consult A Neurologist?",
  items: [
    {
      title: "Chronic Headache or Migraine",
      description:
        "If you experience persistent or severe headaches that don’t respond to over-the-counter medications, it’s time to seek a neurologist’s expertise.",
      image: "/images/specialities-images/Neurology/ChronicHeadachesMigraines.jpg",
    },
    {
      title: "Frequent Dizziness or Balance Issues",
      description:
        "Repeated episodes of dizziness, vertigo, or difficulty maintaining balance may indicate a neurological condition that needs attention.",
      image: "/images/specialities-images/Neurology/FrequentDizziness.jpg",
    },
    {
      title: "Unexplained Numbness or Tingling",
      description:
        "Persistent numbness or tingling in the hands, feet, or other areas could be a sign of nerve damage or other neurological issues.",
      image: "/images/specialities-images/Neurology/UnexplainedNumbness.jpg",
    },
    {
      title: "Memory Problems or Confusion",
      description:
        "Experiencing forgetfulness, difficulty concentrating, or confusion could signal conditions like Alzheimer’s or other neurodegenerative disorders.",
      image: "/images/specialities-images/Neurology/MemoryProblems.jpg",
    },
    {
      title: "Seizures or Loss of Consciousness",
      description:
        "Sudden seizures or blackouts require immediate consultation to diagnose epilepsy or other underlying neurological causes.",
      image: "/images/specialities-images/Neurology/Seizures.jpg",
    },
    {
      title: "Muscle Weakness or Loss of Coordination",
      description:
        "Difficulty in moving, muscle weakness, or trouble with coordination may point to conditions like Parkinson’s disease or multiple sclerosis.",
      image: "/images/specialities-images/Neurology/MuscleWeakness.jpg",
    },
  ],
};

const ConditionsTreatData = {
  title: "Conditions We Treat",
  items: [
    // {
    //   title: "Brain Tumors",
    //   icon: ConditionIcon1,
    //   // },
    {
      title: "Stroke",
      icon: ConditionIcon2,
    },
    {
      title: "Epilepsy",
      icon: ConditionIcon3,
    },
    {
      title: "Parkinson’s Disease and Movement Disorders",
      icon: ConditionIcon4,
    },
    {
      title: "Alzheimer’s Disease and Dementia",
      icon: ConditionIcon5,
    },
    {
      title: "Multiple Sclerosis",
      icon: ConditionIcon6,
    },
    {
      title: "Migraine and Chronic Headaches",
      icon: ConditionIcon7,
    },
    // {
    //   title: "Spinal Disorders",
    //   icon: ConditionIcon8,
    //   // },
    {
      title: "Neuroinfectious Diseases",
      icon: ConditionIcon9,
    },
    {
      title: "Nerve and Muscle Disorders",
      icon: ConditionIcon10,
    },
    {
      title: "Cerebral Palsy",
      icon: ConditionIcon11,
    },
    // {
    //   title: "Traumatic Brain Injury",
    //   icon: ConditionIcon12,
    // },
    {
      title: "Neuropsychological Disorders",
      icon: ConditionIcon13,
    },
    {
      title: "Sleep Disorders",
      icon: ConditionIcon14,
    },
    {
      title: "Pediatric Neurological Disorders",
      icon: ConditionIcon15,
    },
  ],
};

const faqs = [
  {
    question: "What are the risks associated with neurological treatments?",
    answer:
      "While neurological treatments may involve risks, including side effects like dizziness, weakness, or fatigue, our team at Lokmanya Hospitals is highly skilled in managing these risks and ensuring the best possible care.",
  },
  {
    question: "How long will my recovery take?",
    answer:
      "Recovery time varies depending on the individual and the type of neurological condition treated. We provide detailed recovery plans and support to ensure that you return to your normal activities as quickly as possible.",
  },
  {
    question: "Will I need follow-up care after treatment?",
    answer:
      "Yes, follow-up care is crucial in neurology to monitor progress, prevent complications, and ensure that any concerns are addressed promptly. We will be with you every step of the way.",
  },
];

function Neurology() {

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
        <title>
          Best Neurology Hospital in Pune | Expert Neurologist In Pune
        </title>
        <meta
          name="description"
          content="Lokmanya Hospital, best neurology hospital in Pune, treats stroke, epilepsy,
migraine & nerve disorders with advanced neuro care & expert neurologists."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Hospital",
            "name": "Lokmanya Hospital",
            "url": "https://www.lokmanyahospitals.com/neurology",
            "description": "Lokmanya Hospital offers comprehensive neurology services, providing expert diagnosis and treatment for a wide range of neurological conditions in Pune, Maharashtra.",
            "medicalSpecialty": "Neurology",
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
      <div>
        <section>
          <CommonBanner bgColor={"#EFEDD1"} bgImage={BannerImg.src}>
            <div className="header-section">
              <h1 className="page-heading">NEUROLOGY</h1>
              <p className="subtitle">
                Lokmanya Hospitals is a leading name in neurology care in Pune,
                offering comprehensive services for a wide range of neurological
                conditions with a patient-centered approach.
              </p>
            </div>
          </CommonBanner>
          <div className="overview-section side-space section-space">
            <h2 className="page-heading">Overview</h2>
            <div className="para">
              <p>
                Lokmanya Hospitals is a leading name in neurology care in Pune,
                offering comprehensive services for a wide range of neurological
                conditions with a patient-centered approach. Our specialized
                neurology department is equipped with advanced diagnostic tools
                and cutting-edge technology, all under the expertise of our
                skilled neurologists, neurosurgeons, and support staff. Whether
                it’s early diagnosis, medical management, or surgery, we are
                committed to providing high-quality, personalized care to ensure
                optimal health and well-being.
              </p>
              <p>
                At Lokmanya Hospitals, we focus on treating neurological
                disorders with the latest innovations, ensuring the best
                outcomes through non-invasive and minimally invasive treatments,
                as well as surgical interventions when necessary. We are
                dedicated to guiding you through every stage of your treatment
                journey with compassion and expertise.
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
      </div>
    </>
  );
}

export default Neurology;
