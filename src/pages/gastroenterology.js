import React, { useEffect, useState } from "react";
import LokmanyaNetwork from "../site/components/LokmanyaNetworkSection/LokmanyaNetwork";
import WhyChooseSection from "../site/components/WhyChooseSection/WhyChooseSection";
import OurServicesSection from "../site/components/OurServicesSection/OurServicesSection";
import WhatsetsApartSection from "../site/components/WhatSetsApartSection/WhatsetsApartSection";


import Icon1 from "../assets/images/ComprehensiveGastroenterologyServices.svg";
import Icon2 from "../site/assets/images/AdvancedDiagnosticTechnology.svg";
import Icon3 from "../assets/images/HolisticCareApproachgastro.svg";

import WhenConsultSection from "../site/components/WhenConsultSection/WhenConsultSection";

import ConditionIcon1 from "../assets/images/ChronicAcidReflux.svg";
import ConditionIcon2 from "../assets/images/IrritableBowelSyndrome.svg";
import ConditionIcon3 from "../assets/images/Crohn.svg";
import ConditionIcon4 from "../assets/images/Ulcers.svg";
import ConditionIcon5 from "../assets/images/GallstonesandGallbladderDisease.svg";
import ConditionIcon7 from "../assets/images/LiverDisease.svg";
import ConditionIcon9 from "../assets/images/CeliacDisease.svg";
import ConditionIcon10 from "../assets/images/InflammatoryBowelDisease.svg";
import ConditionIcon11 from "../assets/images/GastrointestinalBleeding.svg";
import ConditionIcon12 from "../assets/images/DifficultySwallowing.svg";
import ConditionsTreatSection from "../site/components/ConditionsTreatSection/ConditionsTreatSection";
import FaqSection from "../site/components/FaqSection/FaqSection";
import PatientSuccessStories from "../site/components/PatientsSuccessStorySection/PatientSuccessStories";
import BannerImg from "../site/assets/images/GASTROENTEROLOGY-banner.webp";
import Head from "next/head";
import { CommonBanner } from "../site/components";
import MeetOurExpertSpeciality from "@/site/components/MeetOurExpertSpeciality";
import { useRouter } from "next/router";
import { getSpecialityDoctors } from "@/ApiActions/CommonApi";

const WhyChooseData = {
  title: "Why Choose Lokmanya Hospitals for Gastroenterology Care?",
  items: [
    {
      title: "Comprehensive Gastroenterology Services",
      description:
        "From preventive care and diagnostic testing to complex surgeries, we offer a full spectrum of services to treat all digestive conditions.",
      image: "/images/specialities-images/Gastroenterology/ComprehensiveGastroenterologyServices.jpg",
    },
    {
      title: "Expert Gastroenterology Team",
      description:
        "Our team of experienced gastroenterologists and surgeons provides personalized care, employing the latest medical advancements for optimal outcomes.",
      image: "/images/specialities-images/Gastroenterology/ExpertGastroenterologyTeam.jpg",
    },
    // {
    //   title: 'Advanced Diagnostic Tools',
    //   description: 'We use state-of-the-art technology for precise diagnosis and effective treatment, ensuring you receive the best care available.',
    //   image: Image3,
    // },
    {
      title: "Holistic Care Approach",
      description:
        "We believe in treating the whole person, offering lifestyle and dietary counseling to complement your medical treatment.",
      image: "/images/specialities-images/Gastroenterology/HolisticCaregastro.jpg",
    },
    {
      title: "Affordable Care",
      description:
        "We provide world-class gastroenterology treatments that are both accessible and affordable, ensuring that quality care is available to everyone.",
      image: "/images/specialities-images/Affordable.webp",
    },
  ],
};

const serviceData = {
  title: "Our Gastroenterology Treatment Services",
  items: [
    {
      title: "Colonoscopy",
      description:
        "A minimally invasive procedure used to examine the colon for signs of cancer, polyps, or other digestive issues.",
      imageUrl: "/images/specialities-images/Gastroenterology/Colonoscopy.jpg",
    },
    {
      title: "Endoscopy",
      description:
        "A diagnostic procedure used to examine the esophagus, stomach, and upper part of the small intestine, often to identify ulcers or tumors.",
      imageUrl: "/images/specialities-images/Gastroenterology/Endoscopy.jpg",
    },
    {
      title: "Gastrointestinal Surgeries",
      description:
        "Including laparoscopic surgeries for gallstones, hernias, and more complex surgeries for colon cancer and other conditions.",
      imageUrl: "/images/specialities-images/Gastroenterology/GastrointestinalSurgeries.jpg",
    },
    {
      title: "Liver Biopsy",
      description:
        "For diagnosing liver diseases and assessing the extent of liver damage.",
      imageUrl: "/images/specialities-images/Gastroenterology/LiverBiopsy.jpg",
    },
    {
      title: "Pancreatic Treatment",
      description:
        "Specialized treatments for pancreatic conditions, including surgery for pancreatic cancer or chronic pancreatitis.",
      imageUrl: "/images/specialities-images/Gastroenterology/PancreaticTreatment.jpg",
    },
    {
      title: "Gastroesophageal reflux disease (GERD)",
      description:
        "Medical and surgical treatments for chronic acid reflux and related complications.",
      imageUrl: "/images/specialities-images/Gastroenterology/GERDTreatment.jpg",
    },
  ],
};

const whatsetsApartdata = {
  title:
    "Gastroenterology Treatment At Lokmanya Hospitals – What Sets Us Apart?",
  items: [
    {
      title: "Comprehensive Gastroenterology Services",
      description:
        "We offer a full range of treatments, from preventive care and diagnostic testing to advanced surgeries, ensuring optimal outcomes.",
      icon: Icon1,
    },
    {
      title: "Advanced Diagnostic Tools",
      description:
        "We utilize the latest technology for accurate diagnosis and targeted treatments, helping us provide precise care for all digestive conditions.",
      icon: Icon2,
    },
    {
      title: "Holistic Care Approach",
      description:
        "Our care extends beyond medical treatment, offering lifestyle and dietary counseling to support overall health and long-term recovery.",
      icon: Icon3,
    },
  ],
};

const consultationData = {
  title: "When To Consult For Gastroenterology Care?",
  items: [
    {
      title: "Persistent Abdominal Pain",
      description:
        "Ongoing discomfort or pain in the abdomen that doesn’t resolve should be addressed by a gastroenterologist.",
      image: "/images/specialities-images/Gastroenterology/PersistentAbdominalPain.jpg",
    },
    {
      title: "Chronic Acid Reflux or Heartburn",
      description:
        "If you experience frequent acid reflux or heartburn, it could signal a more serious condition like GERD.",
      image: "/images/specialities-images/Gastroenterology/ChronicAcidRefluxHeartburn.jpg",
    },
    {
      title: "Unexplained Weight Loss",
      description:
        "Significant, unexplained weight loss can indicate a serious gastrointestinal or metabolic disorder.",
      image: "/images/specialities-images/Gastroenterology/UnexplainedWeightLoss.jpg",
    },
    {
      title: "Blood in Stools",
      description:
        "Any signs of blood in your stools or black stools should be immediately evaluated by a doctor to rule out conditions like ulcers or colorectal cancer.",
      image: "/images/specialities-images/Gastroenterology/BloodStools.jpg",
    },
    {
      title: "Difficulty Swallowing",
      description:
        "Struggling to swallow food or liquids may indicate esophageal or digestive issues that need medical attention.",
      image: "/images/specialities-images/Gastroenterology/DifficultySwallowing.jpg",
    },
    {
      title: "Chronic Digestive Issues",
      description:
        "Persistent bloating, nausea, constipation, or diarrhea could be signs of an underlying digestive condition that requires diagnosis and treatment.",
      image: "/images/specialities-images/Gastroenterology/ChronicDigestiveIssues.jpg",
    },
  ],
};

const ConditionsTreatData = {
  title: "Conditions We Treat",
  items: [
    {
      title: "Gastroesophageal reflux disease (GERD)",
      icon: ConditionIcon1,
    },
    {
      title: "Irritable Bowel Syndrome (IBS)",
      icon: ConditionIcon2,
    },
    {
      title: "Crohn's Disease",
      icon: ConditionIcon3,
    },
    {
      title: "Ulcers (Stomach, Duodenal)",
      icon: ConditionIcon4,
    },
    {
      title: "Gallstones and Gallbladder Disease",
      icon: ConditionIcon5,
    },
    // {
    //   title: "Colon Cancer",
    //   icon: ConditionIcon6,
    // },
    {
      title: "Liver Disease (Hepatitis, Cirrhosis)",
      icon: ConditionIcon7,
    },
    // {
    //   title: "Pancreatitis and Pancreatic Cancer",
    //   icon: ConditionIcon8,
    // },
    {
      title: "Celiac Disease",
      icon: ConditionIcon9,
    },
    {
      title: "Inflammatory Bowel Disease (IBD)",
      icon: ConditionIcon10,
    },
    {
      title: "Gastrointestinal Bleeding",
      icon: ConditionIcon11,
    },
    {
      title: "Difficulty Swallowing (Dysphagia)",
      icon: ConditionIcon12,
    },
    // {
    //   title: "Unexplained Weight Loss",
    //   icon: ConditionIcon13,
    // },
  ],
};

const faqs = [
  {
    question: "Is gastroenterology treatment safe?",
    answer:
      "Yes, with advanced technology and experienced specialists, gastroenterology treatments at Lokmanya Hospitals are safe and effective. We assess each patient thoroughly to tailor the best treatment plan.",
  },
  {
    question: "Are there non-surgical options for digestive issues?",
    answer:
      "Yes, many digestive conditions can be managed with medications, dietary changes, and lifestyle modifications. Our specialists will guide you on the best course of action based on your diagnosis.",
  },
  {
    question: "Will I need follow-up care after my treatment?",
    answer:
      "Yes, follow-up visits are essential for monitoring your recovery and ensuring the best outcomes. Our team will guide you through each step of your recovery process.",
  },
];

function Gastroenterology() {

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
          Best Gastroenterology Hospital In Pune - Lokmanya Hospitals
        </title>
        <meta
          name="description"
          content="Best gastroenterology hospital in Pune—Lokmanya Hospital offers expert care for
IBS, acidity, liver disorders, and digestive health. Consult today!"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Hospital",
            "name": "Lokmanya Hospital",
            "url": "https://www.lokmanyahospitals.com/gastroenterology",
            "description": "Lokmanya Hospital offers expert gastroenterology care, addressing conditions such as IBS, acidity, liver disorders, and other digestive health issues in Pune, Maharashtra.",
            "medicalSpecialty": "Gastroenterology",
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
              <h1 className="page-heading">GASTROENTEROLOGY</h1>
              <p className="subtitle">
                Your digestive health is integral to your overall well-being. At
                Lokmanya Hospitals, we are dedicated to helping you maintain a
                healthy digestive system with our specialized gastroenterology
                services.
              </p>
            </div>
          </CommonBanner>
          <div className="overview-section side-space section-space">
            <h2 className="page-heading">Overview</h2>
            <div className="para">
              <p>
                Your digestive health is integral to your overall well-being. At
                Lokmanya Hospitals, we are dedicated to helping you maintain a
                healthy digestive system with our specialized gastroenterology
                services. Whether it’s routine checkups, early diagnosis, or
                advanced treatments, our expert gastroenterologists are
                committed to providing comprehensive care tailored to your
                individual needs.
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

export default Gastroenterology;
