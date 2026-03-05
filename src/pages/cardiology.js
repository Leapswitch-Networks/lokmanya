import React, { useEffect, useState } from "react";

import LokmanyaNetwork from "../site/components/LokmanyaNetworkSection/LokmanyaNetwork";
import WhyChooseSection from "../site/components/WhyChooseSection/WhyChooseSection";
import OurServicesSection from "../site/components/OurServicesSection/OurServicesSection";
import WhatsetsApartSection from "../site/components/WhatSetsApartSection/WhatsetsApartSection";


import Icon1 from "../assets/images/Comprehensive and Personalized Care cardiology.svg";
import Icon2 from "../assets/images/State-of-the-Art Technology cardiology.svg";
import Icon3 from "../assets/images/Holistic Approach to Health cardiology.svg";

import WhenConsultSection from "../site/components/WhenConsultSection/WhenConsultSection";

import conditionIcon1 from "../assets/images/Coronary_Artery_Disease.svg";
import conditionIcon2 from "../assets/images/Heart_Valve_Disease.svg";
import conditionIcon3 from "../assets/images/Arrhythmias.svg";
import conditionIcon4 from "../assets/images/Congenital_Heart_Defects.svg";
import conditionIcon5 from "../assets/images/Heart_Failure.svg";
import conditionIcon6 from "../assets/images/Myocardial_Infarction.svg";
import conditionIcon7 from "../assets/images/Cardiomyopathy.svg";
import conditionIcon8 from "../assets/images/Hypertension.svg";
import conditionIcon9 from "../assets/images/Peripheral_Artery_Disease.svg";
import conditionIcon10 from "../assets/images/Aneurysms.svg";
import conditionIcon11 from "../assets/images/Stroke.svg";
import conditionIcon12 from "../assets/images/Pulmonary_Hypertension.svg";
import conditionIcon13 from "../assets/images/Hyperlipidemia.svg";
import conditionIcon14 from "../assets/images/Chronic_Angina.svg";
import conditionIcon15 from "../assets/images/Diabetic_Condition.svg";
import ConditionsTreatSection from "../site/components/ConditionsTreatSection/ConditionsTreatSection";
import FaqSection from "../site/components/FaqSection/FaqSection";
import PatientSuccessStories from "../site/components/PatientsSuccessStorySection/PatientSuccessStories";
import Head from "next/head";
import { CommonBanner } from "../site/components";
import BannerImg from "../site/assets/images/CARDIOLOGY-banner.webp";
import { useRouter } from "next/router";
import { getSpecialityDoctors } from "@/ApiActions/CommonApi";
import MeetOurExpertSpeciality from "@/site/components/MeetOurExpertSpeciality";

const WhyChooseData = {
  title: "Why Choose Lokmanya Hospitals for Cardiology Care?",
  items: [
    {
      title: "Comprehensive Cardiology Services",
      description:
        "From preventive care and diagnostic testing to advanced treatments like bypass surgery and valve repair, we offer a full range of services for all heart conditions.",
      image: "/images/specialities-images/Cardiology/ComprehensiveCardiologyServices.jpg",
    },
    {
      title: "Expert Cardiology Team",
      description:
        "Our team of highly skilled cardiologists, surgeons, and support staff are dedicated to providing personalized care, utilizing the latest medical advancements.",
      image: "/images/specialities-images/Cardiology/ExpertTeamcardiology.jpg",
    },
    // {
    //   title: 'Advanced Technology and Infrastructure',
    //   description: 'We leverage cutting-edge technology for precise diagnosis and effective treatment options.',
    //   image: Image3,
    // },
    {
      title: "Holistic Care Approach",
      description:
        "Beyond medical treatment, we focus on your overall well-being, offering emotional and lifestyle support to ensure a speedy recovery.",
      image: "/images/specialities-images/Cardiology/HolisticCareApproach.jpg",
    },
    {
      title: "Affordable Care",
      description:
        "We believe in providing world-class heart care that is accessible to everyone, ensuring affordability without compromising on quality.",
      image: "/images/specialities-images/Affordable.webp",
    },
  ],
};

const serviceData = {
  title: "Our Cardiology Treatment Services",
  items: [
    {
      title: "Coronary Artery Bypass Graft (CABG)",
      description:
        "A surgical procedure to restore blood flow by bypassing blocked arteries.",
      imageUrl: "/images/specialities-images/Cardiology/CoronaryArteryBypassGraft.jpg",
    },
    {
      title: "Angioplasty & Stent Placement",
      description:
        "A minimally invasive procedure to open blocked arteries and restore normal blood flow.",
      imageUrl: "/images/specialities-images/Cardiology/AngioplastyStentPlacement.jpg",
    },
    // {
    //   title: "Heart Valve Repair or Replacement",
    //   description: "We repair or replace malfunctioning heart valves to ensure efficient blood flow.",
    //   imageUrl: img3,
    // },
    {
      title: "Pacemaker or ICD Implantation",
      description:
        "Advanced technology to stabilize irregular heart rhythms and ensure a regular heartbeat.",
      imageUrl: "/images/specialities-images/Cardiology/PacemakerICDImplantation.jpg",
    },
  ],
};

const whatsetsApartdata = {
  title: "Cardiology Treatment At Lokmanya Hospitals – What Sets Us Apart?",
  items: [
    {
      title: "Comprehensive and Personalized Care",
      description:
        "We offer a full range of cardiology services, from preventive care and diagnostic testing to advanced treatments, tailored to each patient's specific needs to ensure optimal outcomes.",
      icon: Icon1,
    },
    {
      title: "State-of-the-Art Technology",
      description:
        "We utilize the latest medical advancements and cutting-edge equipment for precise diagnosis and effective treatments, ensuring the highest level of care.",
      icon: Icon2,
    },
    {
      title: "Holistic Approach to Health",
      description:
        "Our care goes beyond just treating heart conditions; we focus on your overall well-being, providing emotional support, lifestyle guidance, and rehabilitation to ensure long-term recovery and quality of life.",
      icon: Icon3,
    },
  ],
};

const consultationData = {
  title: "When To Consult For Cardiology Care?",
  items: [
    {
      title: "Chest Pain or Discomfort",
      description:
        "If you experience persistent chest pain, pressure, or tightness, it’s important to consult a cardiologist to rule out heart conditions such as coronary artery disease.",
      image: "/images/specialities-images/Cardiology/ChestPainDiscomfort.jpg",
    },
    {
      title: "Shortness of Breath",
      description:
        "Difficulty breathing during physical activity or while at rest can signal underlying heart issues, requiring immediate medical attention.",
      image: "/images/specialities-images/Cardiology/ShortnessBreath.jpg",
    },
    {
      title: "Irregular Heartbeat or Palpitations",
      description:
        "If you feel an irregular or fast heartbeat, or experience palpitations, it could indicate arrhythmias or other heart rhythm disorders.",
      image: "/images/specialities-images/Cardiology/IrregularHeartbeat.jpg",
    },
    {
      title: "Dizziness or Fainting",
      description:
        "Unexplained dizziness, lightheadedness, or fainting spells could be a sign of poor blood circulation or a heart condition that needs professional evaluation.",
      image: "/images/specialities-images/Cardiology/DizzinessFainting.jpg",
    },
    {
      title: "Swelling in Legs, Ankles, or Abdomen",
      description:
        "Swelling, especially when associated with fatigue or shortness of breath, may be linked to heart failure and should be evaluated by a cardiologist.",
      image: "/images/specialities-images/Cardiology/SwellingLegs.jpg",
    },
    {
      title: "Family History of Heart Disease",
      description:
        "If you have a family history of heart disease, it is important to get regular check-ups with a cardiologist to assess your risk and prevent potential heart-related issues.",
      image: "/images/specialities-images/Cardiology/FamilyHistoryHeart.jpg",
    },
  ],
};

const ConditionsTreatData = {
  title: "Conditions We Treat",
  items: [
    {
      title: "Coronary Artery Disease (Blocked Arteries)",
      icon: conditionIcon1,
    },
    {
      title: "Heart Valve Disease (Defects in Heart Valves)",
      icon: conditionIcon2,
    },
    {
      title: "Arrhythmias (Irregular Heart Rhythms)",
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
      title: "Myocardial Infarction (Heart Attack)",
      icon: conditionIcon6,
    },
    {
      title: "Cardiomyopathy (Weakening of the Heart Muscle)",
      icon: conditionIcon7,
    },
    {
      title: "Hypertension (High Blood Pressure)",
      icon: conditionIcon8,
    },
    {
      title: "Peripheral Artery Disease (Poor Blood Circulation)",
      icon: conditionIcon9,
    },
    {
      title: "Aneurysms (Abnormal Blood Vessel Bulges)",
      icon: conditionIcon10,
    },
    {
      title: "Stroke (Cardiovascular-related)",
      icon: conditionIcon11,
    },
    {
      title: "Pulmonary Hypertension (High Blood Pressure in the Lungs)",
      icon: conditionIcon12,
    },
    {
      title: "Hyperlipidemia (High Cholesterol)",
      icon: conditionIcon13,
    },
    {
      title: "Chronic Angina (Chest Pain)",
      icon: conditionIcon14,
    },
    {
      title: "Diabetic Cardiovascular Conditions",
      icon: conditionIcon15,
    },
  ],
};

const faqs = [
  {
    question: "Is cardiac surgery safe?",
    answer:
      "Yes, with the latest advancements in medical technology and a skilled team, cardiac surgery is safer than ever. We ensure thorough assessments and tailor treatments to your individual needs.",
  },
  {
    question: "Are there non-surgical options for heart conditions?",
    answer:
      "Yes, lifestyle changes and medications can manage many heart conditions effectively. Our specialists will guide you based on your specific diagnosis.",
  },
  {
    question: "Will I need long-term follow-up care?",
    answer:
      "Yes, regular follow-ups are essential for monitoring heart health and ensuring a smooth recovery.",
  },
];

function Cardiology() {

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
        <title>Best Cardiology Hospital in Pune | Lokmanya Hospitals</title>
        <meta
          name="description"
          content="Get expert heart care at Lokmanya Hospital, Pune. From chest pain to bypass
surgery, our expert cardiologists ensure accurate diagnosis and advanced treatment."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Hospital",
            "name": "Lokmanya Hospital",
            "url": "https://www.lokmanyahospitals.com/cardiology",
            "description": "Lokmanya Hospital offers comprehensive cardiology services, providing expert diagnosis and treatment for a wide range of heart-related conditions in Pune, Maharashtra.",
            "medicalSpecialty": "Cardiology",
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
              <h1 className="page-heading">CARDIOLOGY</h1>
              <p className="subtitle">
                Lokmanya Hospitals has established itself as a leading name in
                healthcare in Pune, particularly in the field of cardiology.
              </p>
            </div>
          </CommonBanner>
          <div className="overview-section side-space section-space">
            <h2 className="page-heading">Overview</h2>
            <div className="para">
              <p>
                Your heart is the core of your life. At Lokmanya Hospitals,
                we’re committed to ensuring your heart beats strong, healthy,
                and for years to come. Our specialized cardiology department is
                equipped with the latest technologies and staffed by expert
                cardiologists who offer comprehensive care for all heart-related
                conditions. From early detection to advanced treatments, we are
                here to manage your heart health with compassion and precision.
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

export default Cardiology;
