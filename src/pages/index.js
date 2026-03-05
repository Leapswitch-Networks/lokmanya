import React, { useState } from "react";
import Head from "next/head";
import LokmanyaNetwork from "@/site/components/LokmanyaNetworkSection/LokmanyaNetwork";
import BlogComponent from "@/site/components/BlogComponent/BlogComponent";
import MainBannerSlider from "@/site/components/banner/MainBannerSlider";
import MainService from "@/site/components/sevices/MainService";
import MainSpecialities from "@/site/components/MainSpecialities";
import MainWhyChoose from "@/site/components/MainWhyChoose";
import MainHonours from "@/site/components/MainHonours";
import ExpertOpinions from "@/site/components/ExpertOpinions";
import MainAchievement from "@/site/components/MainAchievement";
import MainSuccessStor from "@/site/components/MainSuccessStor";
import MainMeetDoctors from "@/site/components/MainMeetDoctors";


const blogsData = [
  {
    image: "/images/BlogImg-1.webp",
    category: "Orthopedics",
    date: "17 Apr, 2025",
    title: "Robotic Knee Replacement Surgery",
    link: "/blogs/robotic-knee-replacement-surgery",
  },
  {
    image: "/images/BlogImg-2.webp",
    category: "Orthopedics",
    date: "16 Apr, 2025",
    title: "Knee Replacement Surgery: Procedure, Types And Risks",
    link: "/blogs/knee-replacement-surgery-procedure-types-and-risks",
  },
  {
    image: "/images/BlogImg-3.webp",
    category: "Orthopedics",
    date: "15 Apr, 2025",
    title: "Hip Surgery Cost In Pune, India",
    link: "/blogs/hip-surgery-cost-in-pune-india",
  },
  {
    image: "/images/BlogImg-4.webp",
    category: "Orthopedics",
    date: "15 Apr, 2025",
    title: "Knee Transplant Cost In Pune, India",
    link: "/blogs/knee-transplant-cost-in-pune-india",
  },
];

export default function Homepage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState(""); // State for the title
  const [modalId, setModalId] = useState("");

  const handleModalOpen = (title, submitBtnClass) => {
    setModalTitle(title); // Set the modal title
    setIsModalOpen(true);
    setModalId(submitBtnClass);
  };

  const handleModalClose = () => setIsModalOpen(false);


  return (
    <>
      <Head>
        <title>Best Multi Speciality Hospital In Pune - Lokmanya Hospital</title>
        <meta name="description" content="Lokmanya Hospital is the best multi speciality hospital in Pune. Receive exceptional medical care & advanced treatments for all your health 
        needs." />
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
          "@type": "Hospital",
          "name": "Lokmanya Hospitals",
          "url": "https://www.lokmanyahospitals.com",
          "logo": "https://lokmanyahospitals.com/static/media/logo.a44ed5fb90d0f144efad8f21c4d249ea.svg",
          "image": "https://lokmanyahospitals.com/static/media/banner-dk-1.3926c94885fb985119ac.webp",
          "description": "Lokmanya Hospital is a prominent healthcare provider in Pune, specializing in orthopedic and multi-specialty treatments using advanced technology. With more than 50 years of experience in Healthcare, the hospital has successfully treated over 150,000 patients globally.",
          "address": {
            "@type": "PostalAddress",
          "streetAddress": "Lokmanya Hospitals Pvt. Ltd., 3rd Floor, 759/51, Deccan Pride, F.C. Road, Deccan Gymkhana",
          "addressLocality": "Pune",
          "addressRegion": "Maharashtra",
          "postalCode": "411004",
          "addressCountry": "IN"
  },
          "contactPoint": {
            "@type": "ContactPoint",
          "telephone": "+91-9307076767",
          "contactType": "customer service",
          "availableLanguage": ["English", "Marathi", "Hindi"]
  },
          "department": [
          {
            "@type": "MedicalSpecialty",
          "name": "Orthopedics",
          "url": "https://lokmanyahospitals.com/orthopedics"
    },
          {
            "@type": "MedicalSpecialty",
          "name": "Cardiology",
          "url": "https://lokmanyahospitals.com/cardiology"
    },
          {
            "@type": "MedicalSpecialty",
          "name": "Neurology",
          "url": "https://lokmanyahospitals.com/neurology"
    }
          ],
          "sameAs": [
          "https://www.instagram.com/lokmanya_hospital/",
          "https://www.linkedin.com/company/lokmanyahospitals/",
          "https://www.facebook.com/lokmanyahospitals",
          "https://www.youtube.com/@LokmanyaHospitalsPune/"
          ]
}`}
        </script>
      </Head>
      <main id="home">
        <MainBannerSlider />
        <MainService
          handleModalOpen={handleModalOpen}
          handleModalClose={handleModalClose}
          isModalOpen={isModalOpen}
          modalTitle={modalTitle}
          modalId={modalId}
        />
        <MainSpecialities />
        <MainAchievement />
        <MainWhyChoose />
        <BlogComponent data={blogsData} />
        <ExpertOpinions />
        <MainSuccessStor />
        <MainHonours />
        <LokmanyaNetwork />
        <MainMeetDoctors />
      </main>
    </>
  );
}
