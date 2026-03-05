import React, { useEffect, useState } from 'react'

import WhyChooseSection from '../site/components/WhyChooseSection/WhyChooseSection';
import OurServicesSection from '../site/components/OurServicesSection/OurServicesSection';
import WhatsetsApartSection from '../site/components/WhatSetsApartSection/WhatsetsApartSection';
import WhenConsultSection from '../site/components/WhenConsultSection/WhenConsultSection';

import Icon1 from '../site/assets/images/Patient-CenteredCare.svg';
import Icon2 from '../site/assets/images/AdvancedDiagnosticTechnology.svg';
import Icon3 from '../site/assets/images/MinimallyInvasiveTechnique.svg';
import Icon4 from '../assets/images/ComprehensiveRehabilitation.svg';
import Icon5 from '../assets/images/AffordableOrthopedicIcon.svg';



import ConditionIcon1 from '../assets/images/Osteoarthritis.svg';
import ConditionIcon2 from '../assets/images/RheumatoidArthritis.svg';
import ConditionIcon3 from '../assets/images/HipFractures.svg';
import ConditionIcon4 from '../assets/images/KneePainandDegeneration.svg';
import ConditionIcon5 from '../assets/images/SpinalDisorders.svg';
import ConditionIcon6 from '../assets/images/SportsInjuries.svg';
import ConditionIcon7 from '../assets/images/BoneFracturesDislocations.svg';
import ConditionIcon8 from '../assets/images/Tendonitis.svg';
import ConditionIcon9 from '../assets/images/CarpalTunnelSyndrome.svg';
import ConditionIcon10 from '../assets/images/ShoulderImpingement.svg';
import ConditionIcon11 from '../assets/images/JointInstability.svg';
import ConditionIcon12 from '../assets/images/GoutConditions.svg';
import ConditionIcon13 from '../assets/images/PediatricOrthopedicIssues.svg';
import ConditionIcon14 from '../assets/images/AmputationsLoss.svg';
import ConditionIcon15 from '../site/assets/images/icons/FractureCareManagement.svg';


import ConditionsTreatSection from '../site/components/ConditionsTreatSection/ConditionsTreatSection';
import FaqSection from '../site/components/FaqSection/FaqSection';
import PatientSuccessStories from '../site/components/PatientsSuccessStorySection/PatientSuccessStories';
import LokmanyaNetwork from '../site/components/LokmanyaNetworkSection/LokmanyaNetwork';
import { CommonBanner } from '../site/components';
import BannerImg from "../site/assets/images/ortho-banner.webp";
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSpecialityDoctors } from '@/ApiActions/CommonApi';
import MeetOurExpertSpeciality from '@/site/components/MeetOurExpertSpeciality';


const WhyChooseData = {
  title: "Why Choose Lokmanya Hospitals for Orthopedic Care?",
  items: [
    {
      title: 'Comprehensive Orthopedic Care',
      description: 'We offer a full spectrum of treatments for musculoskeletal conditions, including surgery, non-surgical interventions, and rehabilitation.',
      image: "/images/specialities-images/Orthopedics/ComprehensiveOrthopedicCare.jpg",
    },
    {
      title: 'Expert Team of Orthopedic Surgeons',
      description: 'Our orthopedic surgeons have extensive experience in diagnosing and treating a wide range of musculoskeletal conditions, ensuring that you receive the most advanced and effective treatments.',
      image: "/images/specialities-images/Orthopedics/ExpertTeamortho.jpg",
    },
    // {
    //     title: 'State-of-the-Art Facilities',
    //     description: 'Our orthopedic department is equipped with cutting-edge technology, including diagnostic tools like MRI, CT scans, and X-rays, ensuring accurate diagnosis and effective treatment plans.',
    //     image: Image3,
    // },
    {
      title: 'Personalized Treatment Plans',
      description: 'We believe in providing individualized care tailored to your unique needs, whether it’s surgical or non-surgical treatment.',
      image: "/images/specialities-images/Orthopedics/PersonalizedTreatmentPlans.jpg",
    },
    {
      title: 'Affordable and Accessible',
      description: 'We are committed to making high-quality orthopedic care accessible to all, providing cost-effective solutions without compromising on the quality of care.',
      image: "/images/specialities-images/Affordable.webp",
    },
    {
      title: 'Unmatched Surgical Expertise',
      description: 'With an impressive track record of 1,50,000 knee replacements, 35,000 joint replacements, and 12,000 robotic knee replacement surgeries, our expertise ensures precision, care, and superior patient outcomes.',
      image: "/images/specialities-images/Orthopedics/surgeons-performing-operation.webp",
    },
  ]
};

const serviceData = {
  title: "Our Orthopedic Services",
  items: [
    {
      title: "Joint Replacement Surgery",
      description: "Whether you need a hip, knee, or shoulder replacement, our experienced orthopedic surgeons use the latest techniques and advanced prosthetics to restore function and relieve pain.",
      imageUrl: "/images/specialities-images/Orthopedics/JointReplacementSurgery.jpg",
    },
    {
      title: "Spinal Surgery",
      description: "We treat conditions like scoliosis, herniated discs, and spinal stenosis, offering both surgical and non-surgical treatment options for back and neck pain.",
      imageUrl: "/images/specialities-images/Orthopedics/SpinalSurgery.jpg",
    },
    {
      title: "Fracture Care",
      description: "Our team is skilled in treating fractures and bone injuries, providing personalized care for both simple and complex fractures.",
      imageUrl: "/images/specialities-images/Orthopedics/FractureCare.jpg",
    },
    {
      title: "Arthroscopy",
      description: "We offer minimally invasive joint surgery, including knee and shoulder arthroscopy, to treat ligament tears, cartilage damage, and other joint problems with smaller incisions and quicker recovery times.",
      imageUrl: "/images/specialities-images/Orthopedics/Arthroscopy.jpg",
    },
    {
      title: "Sports Injuries",
      description: "We specialize in treating sports-related injuries such as ligament tears, tendonitis, and fractures, helping athletes recover and return to their active lifestyles.",
      imageUrl: "/images/specialities-images/Orthopedics/SportsInjuries.jpg",
    },
    {
      title: "Pediatric Orthopedics",
      description: "We provide specialized care for musculoskeletal conditions in children, from congenital deformities to injuries and growth-related issues.",
      imageUrl: "/images/specialities-images/Orthopedics/PediatricOrthopedics.jpg",
    },
    {
      title: "Trauma Care",
      description: "Our trauma surgeons are experienced in treating severe injuries caused by accidents, falls, or other traumatic events, providing immediate and ongoing care.",
      imageUrl: "/images/specialities-images/Orthopedics/TraumaCare.jpg",
    },
    // {
    //   title: "Orthotic and Prosthetic Services",
    //   description: "We offer customized orthotic devices and prosthetics to improve mobility and functionality for patients with amputations or chronic conditions.",
    //   imageUrl: img8,
    // }
  ]
};

const whatsetsApartdata = {
  title: "Orthopedics at Lokmanya Hospitals – What Sets Us Apart?",
  items: [
    {
      title: "Patient-Centered Care",
      description: "Our patients are at the heart of everything we do. Each treatment plan is personalized to meet your specific needs, ensuring the best possible outcome.",
      icon: Icon1,
    },
    {
      title: "Advanced Diagnostic Tools",
      description: "Early diagnosis is crucial for effective treatment. Our state-of-the-art diagnostic tools, including MRI, X-rays, and CT scans, help us accurately assess musculoskeletal conditions and create precise treatment plans.",
      icon: Icon2,
    },
    {
      title: "Minimally Invasive Techniques",
      description: "Whenever possible, we use minimally invasive techniques, such as arthroscopy and robotic-assisted surgeries, to reduce recovery time and improve patient outcomes.",
      icon: Icon3,
    },
    {
      title: "Comprehensive Rehabilitation",
      description: "Post-treatment rehabilitation is essential for a full recovery. Our rehabilitation programs, including Physiotherapy and pain management, are tailored to your individual needs.",
      icon: Icon4,
    },
    {
      title: "Affordable Orthopedic Care in Pune",
      description: "At Lokmanya Hospitals, we make orthopedic care accessible and affordable without compromising on the quality of treatment and service.",
      icon: Icon5,
    },
  ]
};

const consultationData = {
  title: "When To Consult A Doctor For Orthopedic Issues?",
  items: [
    {
      title: "Persistent Joint or Bone Pain",
      description: "Pain lasting more than a few weeks or worsening over time is a clear signal to see a doctor.",
      image: "/images/specialities-images/Orthopedics/PersistentJoin.jpg",
    },
    {
      title: "Limited Range of Motion",
      description: "Difficulty in moving a joint or experiencing stiffness may indicate arthritis or an injury.",
      image: "/images/specialities-images/Orthopedics/limtd-range.webp",
    },
    {
      title: "Recent Injury or Trauma",
      description: "Any injury causing swelling, pain, or deformity should be evaluated immediately to rule out fractures or ligament damage.",
      image: "/images/specialities-images/Orthopedics/recent-injury-ortho.webp",
    },
    {
      title: "Numbness or Tingling",
      description: "Sensations of numbness, tingling, or weakness in the arms or legs could signal nerve compression or damage.",
      image: "/images/specialities-images/Orthopedics/NumbnessTingling.jpg",
    },
    {
      title: "Inability to Bear Weight",
      description: "If you can’t bear weight on a joint, such as your knee or ankle, it could point to a fracture or severe sprain.",
      image: "/images/specialities-images/Orthopedics/InabilityWeight.jpg",
    },
    {
      title: "Swelling, Redness, or Warmth in Joints",
      description: "These signs of inflammation or infection require prompt medical attention.",
      image: "/images/specialities-images/Orthopedics/SwellingJoints.jpg",
    }
  ]
};

const ConditionsTreatData = {
  title: "Conditions We Treat",
  items: [
    {
      title: "Osteoarthritis",
      icon: ConditionIcon1,
    },
    {
      title: "Rheumatoid Arthritis",
      icon: ConditionIcon2,
    },
    {
      title: "Hip Fractures",
      icon: ConditionIcon3,
    },
    {
      title: "Knee Pain and Degeneration",
      icon: ConditionIcon4,
    },
    {
      title: "Spinal Disorders (Scoliosis, Herniated Discs)",
      icon: ConditionIcon5,
    },
    {
      title: "Sports Injuries (ACL Tears, Meniscus Tears, Rotator Cuff Tears)",
      icon: ConditionIcon6,
    },
    {
      title: "Bone Fractures and Dislocations",
      icon: ConditionIcon7,
    },
    {
      title: "Tendonitis",
      icon: ConditionIcon8,
    },
    {
      title: "Carpal Tunnel Syndrome",
      icon: ConditionIcon9,
    },
    {
      title: "Shoulder Impingement",
      icon: ConditionIcon10,
    },
    {
      title: "Joint Instability",
      icon: ConditionIcon11,
    },
    {
      title: "Gout and Other Joint Conditions",
      icon: ConditionIcon12,
    },
    {
      title: "Pediatric Orthopedic Issues (Clubfoot, Hip Dysplasia, Growing Pains)",
      icon: ConditionIcon13,
    },
    {
      title: "Amputations and Limb Loss",
      icon: ConditionIcon14,
    },
    {
      title: "Fracture Care Management",
      icon: ConditionIcon15,
    }
  ]
};

const faqs = [
  {
    question: "What are the risks associated with orthopedic surgeries?",
    answer: "As with any surgery, there may be risks such as infection, blood clots, or complications from anesthesia. However, our expert orthopedic team takes all necessary precautions to minimize these risks and ensure the safest possible outcome.",
  },
  {
    question: "How long does the recovery process take after orthopedic surgery?",
    answer: "Recovery times vary depending on the procedure and individual factors. Generally, patients can expect recovery times ranging from a few weeks to several months, with most patients returning to normal activities within 3-6 months.",
  },
  {
    question: "Do I need Physiotherapy after orthopedic surgery?",
    answer: "Yes, Physiotherapy is an important part of your recovery process. Our rehabilitation programs are tailored to help you regain strength, mobility, and functionality after surgery or injury.",
  },
  {
    question: "What can I do to prevent orthopedic problems?",
    answer: "Maintaining a healthy lifestyle, including regular exercise, maintaining a healthy weight, and avoiding repetitive strain injuries, can help prevent many orthopedic problems. Our team can offer advice on exercises and preventive care to keep your bones and joints healthy.",
  }
];
function Service() {

  
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
        <title>Best Orthopedic Hospital In Pune | Lokmanya Hospitals</title>
        <meta name="description" content="Lokmanya Hospital, the best orthopedic hospital in Pune, offers advanced joint
replacement, arthroscopy, spine surgery, trauma care & robotic procedures.​" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Hospital",
            "name": "Lokmanya Hospital",
            "url": "https://www.lokmanyahospitals.com/orthopedics",
            "description": "Lokmanya Hospital specializes in orthopedic care including robotic knee replacements, fracture management, and joint pain treatments in Pune, Maharashtra.",
            "medicalSpecialty": "Orthopedic",
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
              <h1 className="page-heading">ORTHOPEDICS</h1>
              <p className="subtitle">
                Lokmanya Hospitals is renowned for its skilled and knowledgeable orthopedics specialists who
                utilize state-of-the-art technology for orthopedic care.
              </p>
            </div>
          </CommonBanner>
          <div className="overview-section side-space section-space">
            <h2 className="page-heading">Overview</h2>
            <div className="para">
              <p >
                Lokmanya Hospitals is a leading name in orthopedic care in Pune, offering a full range of services designed to treat musculoskeletal conditions, injuries, and disorders. Our specialized orthopedic department is equipped with advanced technology and staffed by a team of expert orthopedic surgeons and specialists who are dedicated to providing the highest level of care to patients of all ages.
              </p>
              <p>
                From joint pain and fractures to complex musculoskeletal disorders, we offer comprehensive, personalized treatment options. Whether you need surgery or conservative treatments like Physiotherapy, medications, or lifestyle modifications, our team is here to guide you through every step of your treatment and recovery journey.
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
      </div >
    </>
  )
}

export default Service
