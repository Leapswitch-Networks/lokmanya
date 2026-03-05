import React, { useEffect, useState } from "react";

import WhyChooseSection from "../site/components/WhyChooseSection/WhyChooseSection";
import OurServicesSection from "../site/components/OurServicesSection/OurServicesSection";
import WhatsetsApartSection from "../site/components/WhatSetsApartSection/WhatsetsApartSection";
import WhenConsultSection from "../site/components/WhenConsultSection/WhenConsultSection";


import Icon1 from "../site/assets/images/Patient-CenteredCare.svg";
import Icon2 from "../site/assets/images/AdvancedDiagnosticTechnology.svg";
import Icon3 from "../site/assets/images/MinimallyInvasiveTechnique.svg";
import Icon4 from "../assets/images/ComprehensiveRehabilitation.svg";
import Icon5 from "../assets/images/AffordableSpineCare.svg";


import ConditionIcon2 from "../site/assets/images/icons/spine/SpinalDeformities.svg";
import ConditionIcon3 from "../site/assets/images/icons/spine/SpinalStenosis.svg";
import ConditionIcon4 from "../site/assets/images/icons/spine/DegenerativeDiscDisease.svg";
import ConditionIcon5 from "../site/assets/images/icons/spine/ScoliosisandKyphosis.svg";
import ConditionIcon6 from "../site/assets/images/icons/spine/SpinalFractures.svg";
import ConditionIcon7 from "../site/assets/images/icons/spine/Sciatica.svg";
import ConditionIcon8 from "../site/assets/images/icons/spine/SpinalCordInjuries.svg";
import ConditionIcon9 from "../site/assets/images/icons/spine/NeckPainandStrains.svg";
import ConditionIcon10 from "../site/assets/images/icons/spine/BackPain.svg";
import ConditionIcon11 from "../site/assets/images/icons/spine/WhiplashInjuries.svg";
import ConditionIcon12 from "../site/assets/images/icons/spine/SpinalInfectionsandTumors.svg";
import ConditionIcon13 from "../site/assets/images/icons/spine/Osteoporosis-relatedSpineConditions.svg";


import ConditionsTreatSection from "../site/components/ConditionsTreatSection/ConditionsTreatSection";
import FaqSection from "../site/components/FaqSection/FaqSection";
import PatientSuccessStories from "../site/components/PatientsSuccessStorySection/PatientSuccessStories";
import LokmanyaNetwork from "../site/components/LokmanyaNetworkSection/LokmanyaNetwork";
import { CommonBanner } from "../site/components";
import BannerImg from "../site/assets/images/spine-banner.webp";
import Head from "next/head";
import MeetOurExpertSpeciality from "@/site/components/MeetOurExpertSpeciality";
import { getSpecialityDoctors } from "@/ApiActions/CommonApi";
import { useRouter } from "next/router";

const WhyChooseData = {
  title: "Why Choose Lokmanya Hospitals for Spine Care?",
  items: [
    {
      title: "Comprehensive Spine Treatments",
      description:
        "We offer a wide range of treatments for spine and back conditions, including non-surgical options like Physiotherapy and advanced surgical procedures.",
      image: "/images/specialities-images/Spine/ComprehensiveSpineBack.webp",
    },
    {
      title: "Expert Spine Surgeons",
      description:
        "Our spine surgeons are highly skilled and experienced in treating a wide range of spinal conditions, utilizing the latest techniques and technologies to ensure the best outcomes for our patients.",
      image: "/images/specialities-images/Spine/ExpertGastroenterologyTeam.jpg",
    },
    {
      title: "State-of-the-Art Facilities",
      description:
        "Our spine care department is equipped with the latest diagnostic tools, including MRI, CT scans, and X-rays, allowing for accurate diagnosis and effective treatment planning.",
      image: "/images/specialities-images/Spine/State-of-the-ArtInfrastructureortho.jpg",
    },
    {
      title: "Personalized Care Plans",
      description:
        "At Lokmanya Hospitals, we recognize that every patient's condition is unique. Our spine specialists create customized treatment plans that focus on your specific needs, ensuring the most effective care.",
      image: "/images/specialities-images/JNK/Personalized-Care-jhk.jpg",
    },
    {
      title: "Minimally Invasive Options",
      description:
        "Whenever possible, we offer minimally invasive procedures that reduce recovery times, minimize discomfort, and improve outcomes.",
      image: "/images/specialities-images/Spine/MinimallyInvasiveTechniques.jpg",
    },
    {
      title: "Affordable and Accessible Spine Care",
      description:
        "We are dedicated to providing affordable spine and back care, making high-quality treatment accessible to all our patients.",
      image: "/images/specialities-images/Affordable.webp",
    },
  ],
};

const serviceData = {
  title: "Our Spine Care Services",
  items: [
    {
      title: "Spinal Surgery",
      description:
        "Our expert spinal surgeons treat conditions like herniated discs, spinal stenosis, and degenerative disc disease using advanced surgical techniques, including minimally invasive options.",
      imageUrl: "/images/specialities-images/Spine/SpinalSurgery.jpg",
    },
    {
      title: "Spinal Deformity Treatment",
      description:
        "We specialize in treating spinal deformities like scoliosis and kyphosis, using both non-surgical and surgical methods to restore proper spinal alignment and improve posture.",
      imageUrl: "/images/specialities-images/Spine/SpinalDeformityTreatment.jpg",
    },
    {
      title: "Back Pain Management",
      description:
        "We offer comprehensive pain management solutions, including medications, Physiotherapy, and lifestyle modifications to relieve chronic back pain.",
      imageUrl: "/images/specialities-images/Spine/BackPainManagement.jpg",
    },
    {
      title: "Fracture and Trauma Care",
      description:
        "Whether due to an accident or osteoporosis, our team provides care for spinal fractures and trauma, ensuring the best possible recovery outcomes.",
      imageUrl: "/images/specialities-images/Spine/fracturetrauma.webp",
    },
    {
      title: "Neck and Back Injury Treatment",
      description:
        "We provide treatment for conditions such as whiplash, neck strains, and spinal cord injuries, focusing on pain relief and recovery.",
      imageUrl: "/images/specialities-images/Spine/NeckBackInjury.jpg",
    },
    {
      title: "Scoliosis Treatment",
      description:
        "Our team specializes in the diagnosis and treatment of scoliosis in both children and adults, offering personalized treatment plans to manage and correct spinal curvature.",
      imageUrl: "/images/specialities-images/Spine/ScoliosisTreatment.jpg",
    },
    {
      title: "Sciatica Treatment",
      description:
        "We treat sciatica, which causes pain, numbness, or tingling in the legs, through a combination of conservative therapies and surgical options if necessary.",
      imageUrl: "/images/specialities-images/Spine/SciaticaTreatment.jpg",
    },
    {
      title: "Minimally Invasive Spine Surgery",
      description:
        "For many conditions, we offer minimally invasive spine surgery options that involve smaller incisions, less pain, and quicker recovery times compared to traditional surgeries.",
      imageUrl: "/images/specialities-images/Spine/MinimallyInvasiveSpine.jpg",
    },
    {
      title: "Post-Surgical Rehabilitation",
      description:
        "Our rehabilitation services focus on Physiotherapy and pain management to ensure a smooth recovery following spine surgery.",
      imageUrl: "/images/specialities-images/Spine/patient-doing-some.webp",
    },
  ],
};

const whatsetsApartdata = {
  title: "Spine Care at Lokmanya Hospitals – What Sets Us Apart?",
  items: [
    {
      title: "Patient-Centered Care",
      description:
        "We focus on providing personalized care to each patient. Every treatment plan is tailored to meet your individual needs, ensuring optimal outcomes and improving your quality of life.",
      icon: Icon1,
    },
    {
      title: "Advanced Diagnostic Technology",
      description:
        "Early detection and accurate diagnosis are crucial for effective treatment. Our advanced diagnostic tools, including MRI and CT scans, allow us to evaluate your spine and back conditions in detail.",
      icon: Icon2,
    },
    {
      title: "Minimally Invasive Techniques",
      description:
        "Whenever possible, we utilize minimally invasive techniques, which reduce recovery times, minimize pain, and help patients return to their normal lives more quickly.",
      icon: Icon3,
    },
    {
      title: "Comprehensive Rehabilitation Programs",
      description:
        "Post-treatment, our rehabilitation services focus on strengthening and stabilizing the spine, helping you achieve long-term pain relief and improved function.",
      icon: Icon4,
    },
    {
      title: "Affordable Spine Care in Pune",
      description:
        "We are committed to making high-quality spine and back care accessible to all, offering affordable treatment options without compromising on quality.",
      icon: Icon5,
    },
  ],
};

const consultationData = {
  title: "When To Consult A Doctor For Spine Issues?",
  items: [
    {
      title: "Persistent Back Pain",
      description:
        "If back pain lasts for more than a few weeks or interferes with your daily activities, it’s time to consult a specialist.",
      image: "/images/specialities-images/Spine/PersistentBackPain.jpg",
    },
    {
      title: "Pain Radiating to Limbs",
      description:
        "Pain, numbness, or tingling that spreads to your arms or legs could indicate nerve compression or a spinal condition requiring medical attention.",
      image: "/images/specialities-images/Spine/PainRadiatingLimbs.jpg",
    },
    {
      title: "Difficulty Walking or Standing",
      description:
        "If you experience weakness, instability, or difficulty standing for long periods, it may be a sign of a serious spinal issue.",
      image: "/images/specialities-images/Spine/DifficultyWalking.jpg",
    },
    {
      title: "Trauma or Injury",
      description:
        "After an accident or injury involving the neck or back, immediate evaluation by a spine specialist is essential to rule out fractures or spinal cord damage.",
      image: "/images/specialities-images/Spine/TraumaInjury.webp",
    },
    {
      title: "Loss of Bladder or Bowel Control",
      description:
        "Sudden incontinence accompanied by back pain may signal a medical emergency, such as cauda equina syndrome, and requires immediate consultation.",
      image: "/images/specialities-images/Spine/LossofBladder.webp",
    },
    {
      title: "Severe Stiffness or Limited Mobility",
      description:
        "Chronic stiffness or difficulty in moving your back or neck can be a symptom of underlying degenerative conditions or arthritis.",
      image: "/images/specialities-images/Spine/SevereStiffness.jpg",
    },
  ],
};

const ConditionsTreatData = {
  title: "Conditions We Treat",
  items: [
    // {
    //   title: "Herniated Discs",
    //   icon: ConditionIcon1,
    // },
    {
      title: "Spinal Deformities",
      icon: ConditionIcon2,
    },
    {
      title: "Spinal Stenosis",
      icon: ConditionIcon3,
    },
    {
      title: "Degenerative Disc Disease",
      icon: ConditionIcon4,
    },
    {
      title: "Scoliosis and Kyphosis",
      icon: ConditionIcon5,
    },
    {
      title: "Spinal Fractures",
      icon: ConditionIcon6,
    },
    {
      title: "Sciatica",
      icon: ConditionIcon7,
    },
    {
      title: "Spinal Cord Injuries",
      icon: ConditionIcon8,
    },
    {
      title: "Neck Pain and Strains",
      icon: ConditionIcon9,
    },
    {
      title: "Back Pain",
      icon: ConditionIcon10,
    },
    {
      title: "Whiplash Injuries",
      icon: ConditionIcon11,
    },
    {
      title: "Spinal Infections and Tumors",
      icon: ConditionIcon12,
    },
    {
      title: "Osteoporosis-related Spine Conditions",
      icon: ConditionIcon13,
    },
  ],
};

const faqs = [
  {
    question: "What causes back pain?",
    answer:
      "Back pain can be caused by a variety of factors, including poor posture, muscle strain, herniated discs, spinal degeneration, or injury. Our specialists can help identify the cause and provide effective treatment.",
  },
  {
    question: "What treatments are available for sciatica?",
    answer:
      "Treatment options for sciatica include medications, Physiotherapy, and minimally invasive procedures like epidural injections or surgery if needed. Our specialists will determine the best course of action based on your condition.",
  },
  {
    question: "How long will I need to recover after spine surgery?",
    answer:
      "Recovery times vary depending on the type of surgery and your individual health. Most patients can expect to resume normal activities within 6-12 weeks, with full recovery taking several months.",
  },
  {
    question: "Can I prevent back pain?",
    answer:
      "Maintaining good posture, engaging in regular exercise, lifting objects properly, and managing your weight are essential for preventing back pain. Our specialists can guide you on lifestyle changes to protect your spine.",
  },
];

function SpineBack() {

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
          Best Spine Surgery Treatment Hospital In Pune | Lokmanya Hospitals
        </title>
        <meta
          name="description"
          content="Best spine surgery hospital in Pune, Lokmanya Hospital offers expert care in spinal
fusion, disc replacement, minimally invasive spine surgery & rehabilitation."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Hospital",
            "name": "Lokmanya Hospital",
            "url": "https://www.lokmanyahospitals.com/spine",
            "description": "Lokmanya Hospital offers advanced spine care services, including minimally invasive surgeries, spinal fusion, and disc replacement, ensuring comprehensive treatment for various spinal conditions in Pune, Maharashtra.",
            "medicalSpecialty": "Spine Care",
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
              "email": "appointment@lokmanyahospitals.in"
            }
          })}
        </script>
      </Head>
      <div>
        <section>
          <CommonBanner bgColor={"#EFEDD1"} bgImage={BannerImg.src}>
            <div className="header-section">
              <h1 className="page-heading">SPINE</h1>
              <p className="subtitle">
                Lokmanya Hospitals is a trusted name in spine and back care,
                known for its commitment to providing world-class medical
                services.
              </p>
            </div>
          </CommonBanner>
          <div className="overview-section side-space section-space">
            <h2 className="page-heading">Overview</h2>
            <div className="para">
              <p>
                At Lokmanya Hospitals, we are committed to providing exceptional
                spine and back care to patients in Pune. Whether you're dealing
                with chronic back pain, spinal injuries, or complex conditions
                like scoliosis or herniated discs, our specialized spinal care
                team is here to help. With advanced technology, expert spinal
                surgeons, and personalized treatment plans, we ensure you
                receive the highest quality care tailored to your unique needs.
              </p>
              <p>
                From conservative treatments like Physiotherapy and pain
                management to cutting-edge surgical interventions, we provide
                comprehensive solutions for spine and back issues. Our holistic
                approach addresses the root cause of your pain, helping you
                regain mobility and improve your quality of life.
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
        {/* <DiagnosisTreatment /> */}
        {/* <OrthopedicExperts/> */}
        {/* <ExploreExpert/> */}
        <PatientSuccessStories />
        <LokmanyaNetwork />
      </div>
    </>
  );
}

export default SpineBack;
