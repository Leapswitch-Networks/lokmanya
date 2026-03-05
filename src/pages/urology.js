import React, { useEffect, useState } from "react";
import LokmanyaNetwork from "../site/components/LokmanyaNetworkSection/LokmanyaNetwork";
import WhyChooseSection from "../site/components/WhyChooseSection/WhyChooseSection";
import OurServicesSection from "../site/components/OurServicesSection/OurServicesSection";
import WhatsetsApartSection from "../site/components/WhatSetsApartSection/WhatsetsApartSection";



import Icon1 from "../site/assets/images/Patient-CenteredCare.svg";
import Icon2 from "../site/assets/images/AdvancedDiagnosticTechnology.svg";
import Icon3 from "../assets/images/Minimally Invasive Techniques.svg";
import Icon4 from "../assets/images/Comprehensive Treatment Options.svg";
import Icon5 from "../assets/images/Affordable Urology Care in Pune.svg";

import WhenConsultSection from "../site/components/WhenConsultSection/WhenConsultSection";

import conditionIcon1 from "../assets/images/kidney_stones.svg";
import conditionIcon2 from "../assets/images/bph.svg";
import conditionIcon6 from "../assets/images/urinary_incontinence.svg";
import conditionIcon7 from "../assets/images/uti.svg";
import conditionIcon9 from "../assets/images/puc.svg";
import conditionIcon11 from "../assets/images/bladder_infections.svg";
import conditionIcon14 from "../assets/images/urinary_retention.svg";
import ConditionsTreatSection from "../site/components/ConditionsTreatSection/ConditionsTreatSection";
import FaqSection from "../site/components/FaqSection/FaqSection";
import PatientSuccessStories from "../site/components/PatientsSuccessStorySection/PatientSuccessStories";
import Head from "next/head";
import { CommonBanner } from "../site/components";
import BannerImg from "../site/assets/images/UROLOGY-banner.webp";
import MeetOurExpertSpeciality from "@/site/components/MeetOurExpertSpeciality";
import { useRouter } from "next/router";
import { getSpecialityDoctors } from "@/ApiActions/CommonApi";

const WhyChooseData = {
  title: "Why Choose Lokmanya Hospitals for Urology Care?",
  items: [
    {
      title: "Comprehensive Urological Services",
      description:
        "We provide a complete range of urological treatments, including diagnosis, medical management, minimally invasive procedures, and advanced surgeries.",
      image: "/images/specialities-images/Urology/ComprehensiveUrologicalServices.jpg",
    },
    {
      title: "Expert Urologists",
      description:
        "Our urologists are highly skilled and experienced in diagnosing and treating a wide variety of urological conditions, utilizing the latest medical advancements.",
      image: "/images/specialities-images/Urology/ExpertUrologists.jpg",
    },
    {
      title: "State-of-the-Art Facilities",
      description:
        "Lokmanya Hospitals is equipped with cutting-edge diagnostic tools, including advanced imaging systems, ensuring accurate diagnosis and effective treatment.",
      image: "/images/specialities-images/Urology/State-of-the-ArtFacilities.jpg",
    },
    {
      title: "Personalized Treatment Plans",
      description:
        "We recognize that each patient’s condition is unique. Our urologists tailor treatment plans to address your specific needs and offer the most effective care options.",
      image: "/images/specialities-images/Urology/PersonalizedTreatmentPlans.jpg",
    },
    {
      title: "Minimally Invasive Techniques",
      description:
        "Where possible, we use minimally invasive procedures that reduce recovery time, minimize discomfort, and improve outcomes.",
      image: "/images/specialities-images/Urology/MinimallyInvasiveTechniques.jpg",
    },
    {
      title: "Affordable Urology Care in Pune",
      description:
        "Our commitment to making high-quality urology care accessible ensures that you receive the best treatment at affordable costs.",
      image: "/images/specialities-images/Affordable.webp",
    },
  ],
};

const serviceData = {
  title: "Our Urology Services",
  items: [
    {
      title: "Kidney Stones Treatment",
      description:
        "Our urologists specialize in treating kidney stones using both medical management and advanced procedures like laser stone removal.",
      imageUrl: "/images/specialities-images/Urology/KidneyStonesTreatment.jpg",
    },
    {
      title: "Prostate Care",
      description:
        "We offer expert treatment for prostate conditions, including benign prostatic hyperplasia (BPH) and prostate cancer, with options ranging from medications to minimally invasive surgeries.",
      imageUrl: "/images/specialities-images/Urology/ProstateCare.jpg",
    },
    // {
    //   title: "Bladder Cancer Treatment",
    //   description: "Our team provides advanced care for bladder cancer, including diagnostic testing, surgical options, and post-surgical support to help you recover fully.",
    //   imageUrl: ortho_3,
    // },
    // {
    //   title: "Erectile Dysfunction (ED) Treatment",
    //   description: "We provide comprehensive treatments for erectile dysfunction, including medications, penile implants, and other therapies to improve sexual health and restore confidence.",
    //   imageUrl: ortho_4,
    // },
    {
      title: "Urinary Incontinence Treatment",
      description:
        "We offer a range of treatments for urinary incontinence, from pelvic floor exercises to surgical interventions, to help you regain control over your bladder function.",
      imageUrl: "/images/specialities-images/Urology/UrinaryIncontinenceTreatment.jpg",
    },
    {
      title: "Urinary Tract Infection (UTI) Treatment",
      description:
        "Whether you're experiencing a recurring UTI or a complex infection, our urologists can provide timely treatment, including antibiotics and preventive care strategies.",
      imageUrl: "/images/specialities-images/Urology/UrinaryTractInfection.webp",
    },
    // {
    //   title: "Male Infertility Care",
    //   description: "We provide diagnostic services and treatments for male infertility, including hormone therapy, surgery, and assisted reproductive technologies.",
    //   imageUrl: ortho_7,
    // },
    {
      title: "Pediatric Urology",
      description:
        "Our pediatric urology services include treatment for conditions like bedwetting, congenital abnormalities, and other urinary system issues in children.",
      imageUrl: "/images/specialities-images/Urology/PediatricUrology.jpg",
    },
    // {
    //   title: "Kidney Disease Management",
    //   description: "We specialize in the diagnosis and management of chronic kidney disease (CKD), offering comprehensive care to slow disease progression and improve kidney function.",
    //   imageUrl: ortho_9,
    // },
    // {
    //   title: "Vasectomy and Vasectomy Reversal",
    //   description: "Our skilled surgeons offer safe and effective vasectomy procedures for permanent birth control, along with vasectomy reversal options for those wishing to restore fertility.",
    //   imageUrl: ortho_10,
    // }
  ],
};

const whatsetsApartdata = {
  title: "Urology Care at Lokmanya Hospitals – What Sets Us Apart?",
  items: [
    {
      title: "Patient-Centered Care",
      description:
        "Our urologists focus on your individual needs, offering personalized care plans that address both medical and emotional aspects of your urological health.",
      icon: Icon1,
    },
    {
      title: "Advanced Diagnostic Tools",
      description:
        "We utilize the latest diagnostic technologies, such as ultrasound, CT scans, and cystoscopy, to provide accurate and timely diagnosis for all urological conditions.",
      icon: Icon2,
    },
    {
      title: "Minimally Invasive Surgery",
      description:
        "Whenever possible, we use minimally invasive surgical techniques, which offer benefits like reduced recovery times, less pain, and quicker return to daily activities.",
      icon: Icon3,
    },
    {
      title: "Comprehensive Treatment Options",
      description:
        "We offer a variety of treatment options, including medications, lifestyle changes, and advanced surgical procedures, to provide the most effective and appropriate care.",
      icon: Icon4,
    },
    {
      title: "Affordable Urology Care in Pune",
      description:
        "At Lokmanya Hospitals, we believe that high-quality urology care should be accessible to everyone, which is why we offer affordable treatment options without compromising on quality.",
      icon: Icon5,
    },
  ],
};

const consultationData = {
  title: "When To Consult A Urologist?",
  items: [
    {
      title: "Difficulty in Urination",
      description:
        "Experiencing trouble starting, maintaining, or stopping urination may indicate conditions like an enlarged prostate, urethral stricture, or other urinary tract issues that require prompt attention.",
      image: "/images/specialities-images/Urology/DifficultyinUrination.jpg",
    },
    {
      title: "Blood in Urine (Hematuria)",
      description:
        "Blood in the urine can be a sign of kidney stones, infections, or more serious conditions like bladder or kidney cancer. It’s essential to consult a urologist immediately for evaluation.",
      image: "/images/specialities-images/Urology/BloodinUrine.jpg",
    },
    {
      title: "Severe Abdominal or Back Pain",
      description:
        "Intense pain in the lower back or abdomen, often radiating to the groin, can suggest kidney stones or urinary obstructions. Seeking expert care ensures timely diagnosis and treatment.",
      image: "/images/specialities-images/Urology/SevereAbdominalorBackPain.jpg",
    },
    {
      title: "Prostate Health Concerns",
      description:
        "Symptoms such as frequent urination, weak urine flow, or difficulty emptying the bladder may be linked to prostate issues like BPH (Benign Prostatic Hyperplasia) or prostate cancer, which require specialized care.",
      image: "/images/specialities-images/Urology/ProstateHealthConcern.jpg",
    },
    {
      title: "Recurring Urinary Tract Infections (UTIs)",
      description:
        "Frequent or persistent UTIs can indicate underlying problems in the urinary system that need further investigation and targeted treatment to prevent complications.",
      image: "/images/specialities-images/Urology/RecurringUTI.jpg",
    },
    // {
    //   title: "Erectile Dysfunction or Male Infertility",
    //   description: "Issues like erectile dysfunction or difficulty conceiving could be linked to urological or hormonal factors. A urologist can provide tailored solutions to improve reproductive and sexual health.",
    //   image: consultimg6,
    // },
  ],
};

const ConditionsTreatData = {
  title: "Conditions We Treat",
  items: [
    {
      title: "Kidney Stones",
      icon: conditionIcon1,
    },
    {
      title: "Prostate Enlargement (BPH)",
      icon: conditionIcon2,
    },
    // {
    //   title: "Prostate Cancer",
    //   icon: conditionIcon3,
    // },
    // {
    //   title: "Bladder Cancer",
    //   icon: conditionIcon4,
    // },
    // {
    //   title: "Erectile Dysfunction (ED)",
    //   icon: conditionIcon5,
    // },
    {
      title: "Urinary Incontinence",
      icon: conditionIcon6,
    },
    {
      title: "Urinary Tract Infections (UTIs)",
      icon: conditionIcon7,
    },
    // {
    //   title: "Male Infertility",
    //   icon: conditionIcon8,
    // },
    {
      title: "Pediatric Urological Conditions",
      icon: conditionIcon9,
    },
    // {
    //   title: "Chronic Kidney Disease (CKD)",
    //   icon: conditionIcon10,
    // },
    {
      title: "Bladder Infections",
      icon: conditionIcon11,
    },
    // {
    //   title: "Vasectomy and Vasectomy Reversal",
    //   icon: conditionIcon12,
    // },
    // {
    //   title: "Testicular Cancer",
    //   icon: conditionIcon13,
    // },
    {
      title: "Urinary Retention",
      icon: conditionIcon14,
    },
    {
      title: "Reconstructive Urology",
      icon: conditionIcon14,
    },
  ],
};

const faqs = [
  {
    question: "What are the symptoms of prostate problems?",
    answer:
      "Common symptoms of prostate issues include frequent urination, difficulty starting or stopping urination, weak urine flow, and pain during urination. If you're experiencing any of these symptoms, it's important to consult a urologist for evaluation.",
  },
  {
    question: "How are kidney stones treated?",
    answer:
      "Treatment for kidney stones depends on their size and location. Small stones may be treated with medications, while larger stones may require procedures like shock wave lithotripsy (ESWL) or laser stone removal.",
  },
  // {
  //   question: "Is erectile dysfunction reversible?",
  //   answer: "Erectile dysfunction can be treated with medications, therapy, lifestyle changes, or surgical options like penile implants. Our urologists can help determine the best treatment based on your condition.",
  // },
  {
    question: "What can I do to prevent urinary tract infections (UTIs)?",
    answer:
      "To prevent UTIs, maintain good personal hygiene, drink plenty of water, urinate after sexual activity, and avoid irritating products. If you have recurring UTIs, consult with our urologists for further evaluation and preventive strategies.",
  },
];

function Urology() {
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
        <title>Best Urology Hospital in Pune | Lokmanya Hospital​s</title>
        <meta
          name="description"
          content="Lokmanya Hospital offers expert urology care in Pune, including treatment for
kidney stones, prostate issues, urinary tract infections, and advanced surgeries.​"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Hospital",
            "name": "Lokmanya Hospital",
            "url": "https://www.lokmanyahospitals.com/urology",
            "description": "Lokmanya Hospital offers comprehensive urology services, providing expert diagnosis and treatment for a wide range of urinary tract and male reproductive system conditions in Pune, Maharashtra.",
            "medicalSpecialty": "Urology",
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
              <h1 className="page-heading">UROLOGY</h1>
              <p className="subtitle">
                Lokmanya Hospitals is a trusted name in healthcare in Pune,
                offering exceptional urology services with an emphasis on
                quality, compassion, and advanced treatments.
              </p>
            </div>
          </CommonBanner>
          <div className="overview-section side-space section-space">
            <h2 className="page-heading">Overview</h2>
            <div className="para">
              <p>
                At Lokmanya Hospitals, we offer comprehensive urology services
                to treat a wide range of conditions affecting the urinary system
                and male reproductive health. Our dedicated team of urologists
                is equipped with advanced diagnostic tools and innovative
                treatments to ensure that our patients receive the highest level
                of care. Whether you're dealing with urinary tract infections,
                kidney stones, prostate issues, or complex conditions like
                bladder cancer or erectile dysfunction, we are here to provide
                the expertise and support you need for optimal health.
              </p>
              <p>
                Our patient-focused approach ensures personalized care, whether
                you require non-surgical treatments or advanced urological
                surgeries. With a focus on both medical and emotional
                well-being, we guide you through every stage of your treatment,
                helping you regain control of your health and quality of life.
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

export default Urology;
