import React, { useEffect, useState } from 'react'

// import OrthopedicsSection from '../site/pages/cancer/OrthopedicsSection';
import WhyChooseSection from '../site/components/WhyChooseSection/WhyChooseSection';
import OurServicesSection from '../site/components/OurServicesSection/OurServicesSection';
import WhatsetsApartSection from '../site/components/WhatSetsApartSection/WhatsetsApartSection';
import WhenConsultSection from '../site/components/WhenConsultSection/WhenConsultSection';

import kneeImage from "../assets/images/jhkBanner.webp";


import Icon1 from '../site/assets/images/Patient-CenteredCare.svg';
import Icon2 from '../site/assets/images/AdvancedDiagnosticTechnology.svg';
import Icon3 from '../assets/images/Robotic-Assisted-Precision.svg';
import Icon4 from '../assets/images/ComprehensiveRehabilitation.svg';
import Icon5 from '../assets/images/AffordableOrthopedicIcon.svg';


import ConditionIcon1 from '../assets/images/Osteoarthritis jhk.svg';
import ConditionIcon2 from '../assets/images/RheumatoidArthritisjhk.svg';
import ConditionIcon3 from '../assets/images/HipFracturesjkh.svg';
import ConditionIcon4 from '../assets/images/KneeDegeneration.svg';
import ConditionIcon5 from '../assets/images/Post-TraumaticArthritis.svg';
import ConditionIcon6 from '../assets/images/SportsInjuriesjhk.svg';
import ConditionIcon7 from '../assets/images/LigamentTears.svg';
import ConditionIcon8 from '../assets/images/CartilageDamage.svg';
import ConditionIcon9 from '../assets/images/HipDysplasia.svg';
import ConditionIcon10 from '../assets/images/JointInstabilityjhk.svg';
import ConditionIcon11 from '../assets/images/BoneJointInfections.svg';
import ConditionIcon12 from '../assets/images/JointDeformities.svg';
import ConditionsTreatSection from '../site/components/ConditionsTreatSection/ConditionsTreatSection';
import FaqSection from '../site/components/FaqSection/FaqSection';
import PatientSuccessStories from '../site/components/PatientsSuccessStorySection/PatientSuccessStories';
import LokmanyaNetwork from '../site/components/LokmanyaNetworkSection/LokmanyaNetwork';
import { CommonBanner } from '../site/components';
import Head from 'next/head';
import MeetOurExpertSpeciality from '@/site/components/MeetOurExpertSpeciality';
import { useRouter } from 'next/router';
import { getSpecialityDoctors } from '@/ApiActions/CommonApi';


const WhyChooseData = {
  title: "Why Choose Lokmanya Hospitals?",
  items: [
    {
      title: 'Comprehensive Treatment Options',
      description: 'From conservative treatments like physiotherapy and medications to advanced surgical procedures, we provide a full spectrum of care for joint, hip, and knee problems.',
      image: "/images/specialities-images/JNK/ComprehensiveTreatmentOptions.jpg",
    },
    {
      title: 'Expert Team',
      description: 'Our orthopedic surgeons are highly trained and experienced in joint replacement surgeries, using the latest techniques to ensure the best outcomes.',
      image: "/images/specialities-images/JNK/Expert-Team-jhk.jpg",
    },
    // {
    //   title: 'State-of-the-Art Infrastructure',
    //   description: 'We are equipped with cutting-edge medical technologies, including robotic-assisted surgeries, to provide precise and effective joint replacement procedures.',
    //   image: Image3,
    // },
    {
      title: 'Personalized Care',
      description: "We focus on your unique needs, offering tailored treatment plans and rehabilitation programs to ensure a speedy and smooth recovery.",
      image: "/images/specialities-images/JNK/Personalized-Care-jhk.jpg",
    },

    {
      title: 'Affordable and Accessible',
      description: 'We are committed to providing high-quality orthopedic care that is accessible to all, offering affordable treatment without compromising on excellence.',
      image: "/images/specialities-images/Affordable.webp",
    },
    {
      title: 'Exceptional Surgical Skill',
      description: 'Our experience guarantees accuracy, care, and excellent patient results, as seen by our exceptional track record of 1,50,000 knee replacements, 35,000 joint replacements, and 12,000 robotic knee replacement surgeries.',
      image: "/images/specialities-images/Orthopedics/surgeons-performing-operation.webp",
    },
  ]
};

const serviceData = {
  title: "Our Joint, Hip, and Knee Replacement Services",
  items: [
    {
      title: "Joint Replacement Surgery",
      description: "Whether you need a total or partial joint replacement, our skilled surgeons use the latest techniques and advanced prosthetics to restore function and relieve pain.",
      imageUrl: "/images/specialities-images/JNK/JointReplacementSurgery-jhk.jpg",
    },
    {
      title: "Hip Replacement Surgery",
      description: "Our orthopedic surgeons specialize in hip replacement surgeries, including minimally invasive techniques, to ensure quicker recovery and reduced risk of complications.",
      imageUrl: "/images/specialities-images/JNK/HipReplacementSurgery.jpg",
    },
    {
      title: "Knee Replacement Surgery",
      description: "We offer both total knee replacement (TKR) and partial knee replacement (PKR), depending on the severity of the condition, using advanced surgical techniques to restore knee function and mobility.",
      imageUrl: "/images/specialities-images/JNK/KneeReplacementSurgery.jpg",
    },
    {
      title: "Robotic-Assisted Surgery",
      description: "For greater precision and faster recovery, we offer robotic-assisted joint replacement surgeries, where advanced robotic technology assists in the surgical procedure.",
      imageUrl: "/images/specialities-images/JNK/Robotic-AssistedSurgery.jpg",
    },
    {
      title: "Arthroscopic Surgery",
      description: "For conditions such as torn cartilage or ligament damage, our arthroscopic techniques offer a minimally invasive approach, reducing recovery time and scarring.",
      imageUrl: "/images/specialities-images/JNK/ArthroscopicSurgery.jpg",
    },
    {
      title: "Rehabilitation and Physiotherapy",
      description: "Post-surgery rehabilitation is essential for restoring movement and strength. We offer comprehensive physiotherapy and rehabilitation programs tailored to your recovery needs.",
      imageUrl: "/images/specialities-images/JNK/RehabilitationPhysiotherapy.jpg",
    }
  ]
};

const whatsetsApartdata = {
  title: "What Sets Us Apart?",
  items: [
    {
      title: "Patient-Centered Care",
      description: "We prioritize your well-being, ensuring that each treatment and surgical plan is customized to meet your specific needs and goals.",
      icon: Icon1,
    },
    {
      title: "Advanced Diagnostic Tools",
      description: "Early diagnosis plays a critical role in determining the best treatment plan. Our advanced diagnostic technologies, including imaging systems like MRI and CT scans, help us accurately assess the condition of your joints.",
      icon: Icon2,
    },
    {
      title: "Robotic-Assisted Precision",
      description: "At Lokmanya Hospitals, we have successfully performed over 15,000 robotic knee replacement surgeries to date. Our use of advanced robotic technology in joint replacements ensures the precise placement of the prosthetic joint, resulting in quicker recovery, reduced pain, and better long-term outcomes for our patients.",
      icon: Icon3,
    },
    {
      title: "Comprehensive Post-Operative Care",
      description: "Your recovery is just as important as the surgery itself. Our orthopedic team provides ongoing support, including pain management, physiotherapy, and rehabilitation, to ensure you regain full function.",
      icon: Icon4,
    },
    {
      title: "Affordable Orthopedic Care in Pune",
      description: "We believe that high-quality orthopedic care should be accessible. We provide affordable treatment options for joint replacement, with a focus on excellence and patient satisfaction.",
      icon: Icon5,
    }
  ]
};

const consultationData = {
  title: "When To Consult For Joint, Hip, And Knee Replacement?",
  items: [
    {
      title: "Chronic Joint Pain",
      description: "If you experience persistent joint pain that doesn’t improve with rest, medication, or Physiotherapy, and it interferes with your daily activities, it may be time to consult for a replacement.",
      image: "/images/specialities-images/JNK/ChronicJointPain.jpg",
    },
    {
      title: "Severe Arthritis Symptoms",
      description: "If you suffer from advanced arthritis (osteoarthritis, rheumatoid arthritis) and your joints are stiff, swollen, or painful despite non-surgical treatments, joint replacement could be a viable option.",
      image: "/images/specialities-images/JNK/SevereArthritisSymptoms.jpg",
    },
    {
      title: "Difficulty Walking or Moving",
      description: "When joint pain or stiffness limits your mobility, making walking, climbing stairs, or performing daily activities difficult, it may be an indication that a joint replacement is necessary.",
      image: "/images/specialities-images/JNK/DifficultyWalking.jpg",
    },
    {
      title: "Inability to Manage Pain with Medication",
      description: "If you are relying heavily on pain medications for relief but still experiencing persistent or worsening pain, it could be time to consider surgery.",
      image: "/images/specialities-images/JNK/InabilityManagePain.jpg",
    },
    {
      title: "Failed Conservative Treatments",
      description: "When other treatments such as Physiotherapy, medications, or injections have not provided adequate relief, joint replacement surgery might offer a more lasting solution.",
      image: "/images/specialities-images/JNK/FailedConservativeTreatments.jpg",
    },
    {
      title: "Injuries Leading to Joint Deformities",
      description: "If a joint injury or fracture has caused deformities or instability in the joint, a replacement may help restore normal function and alleviate pain.",
      image: "/images/specialities-images/JNK/InjuriesJointDeformities.jpg",
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
      title: "Knee Degeneration",
      icon: ConditionIcon4,
    },
    {
      title: "Post-Traumatic Arthritis",
      icon: ConditionIcon5,
    },
    {
      title: "Sports Injuries",
      icon: ConditionIcon6,
    },
    {
      title: "Ligament Tears (e.g., ACL Tears)",
      icon: ConditionIcon7,
    },
    {
      title: "Cartilage Damage",
      icon: ConditionIcon8,
    },
    {
      title: "Hip Dysplasia",
      icon: ConditionIcon9,
    },
    {
      title: "Joint Instability",
      icon: ConditionIcon10,
    },
    {
      title: "Bone and Joint Infections",
      icon: ConditionIcon11,
    },
    {
      title: "Joint Deformities",
      icon: ConditionIcon12,
    }
  ]
};

const faqs = [
  {
    question: "What are the risks associated with joint replacement surgeries?",
    answer: "As with any surgery, joint replacement may involve risks such as infection, blood clots, or prosthesis-related issues. Our expert orthopedic team takes all necessary precautions to minimize these risks and ensure the safest possible outcome.",
  },
  {
    question: "How long does the recovery process take after joint replacement surgery?",
    answer: "Recovery times vary depending on the type of surgery and the individual. Typically, patients can expect a recovery period of a few weeks to several months, with most returning to normal activities within 3-6 months.",
  },
  {
    question: "Will I need physiotherapy after surgery?",
    answer: "Yes, physiotherapy is a vital part of the recovery process. Our rehabilitation programs are tailored to help you regain strength, mobility, and functionality after joint replacement surgery.",
  },
  {
    question: "How long will my joint replacement last?",
    answer: "The lifespan of a joint replacement depends on various factors, including the type of prosthesis used, your activity level, and overall health. In most cases, joint replacements can last between 15 and 20 years.",
  }
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
        <title>Best Hip, Joint & Knee Replacement Hospital In Pune | Lokmanya Hospitals</title>
        <meta name="description" content="Best hip, joint & knee replacement hospital in Pune—Lokmanya Hospital offers
robotic-assisted surgery with precision, minimal invasion & faster recovery." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Hospital",
            "name": "Lokmanya Hospital",
            "url": "https://www.lokmanyahospitals.com/joint-hip-and-knee-replacement",
            "description": "Lokmanya Hospital specializes in advanced joint, hip, and knee replacement surgeries, offering state-of-the-art robotic-assisted procedures and comprehensive orthopedic care in Pune, Maharashtra.",
            "medicalSpecialty": "Joint, Hip, and Knee Replacement",
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
          <CommonBanner bgColor={"#EFEDD1"} bgImage={kneeImage.src}>
            <div className="header-section">
              <h1 className="page-heading">Joint — Knee, Hip & Shoulder Replacement</h1>
              <p className="subtitle">
                Lokmanya Hospitals is renowned for its excellence in orthopedic care and is trusted by patients across Pune for joint, hip, and knee replacements
              </p>
            </div>
          </CommonBanner>
          <div className="overview-section side-space section-space">
            <h2 className="page-heading">Overview</h2>
            <div className="para">
              <p >
                Lokmanya Hospitals is a leading name in joint, hip, and knee replacement surgeries in Pune, offering comprehensive care and advanced treatments to patients suffering from joint pain, arthritis, and other musculoskeletal conditions. Our specialized orthopedic department is equipped with state-of-the-art technology and staffed by a team of expert orthopedic surgeons who are dedicated to restoring mobility and improving quality of life for every patient.
              </p>
              <p >
                Whether you are experiencing pain from arthritis, injury, or age-related wear and tear, we provide customized treatment plans that focus on both medical and surgical solutions. Our commitment to patient-centered care ensures that you receive personalized attention throughout your recovery journey, from pre-surgery to post-operative rehabilitation.
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
  )
}

export default SpineBack 
