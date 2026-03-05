import React, { useState } from "react";
import OurLocation from "../site/components/LokmanyaNetworkSection/OurLocation";
import FaqSection from "../site/components/FaqSection/FaqSection";
import AppointmentModal from "../site/components/AppointmentModal";
import Head from "next/head";
import GeneralSurgeryBanner from "@/site/components/GeneralSurgeryCampaign/GeneralSurgeryBanner";
import ExpertCareSection from "@/site/components/GeneralSurgeryCampaign/ExpertCareSection";
import ConditionsWeTreatSection from "@/site/components/GeneralSurgeryCampaign/ConditionsWeTreatSection";
import ServicesAndProceduresSection from "@/site/components/GeneralSurgeryCampaign/ServicesAndProcedures";
import AdvancedSurgicalCareSection from "@/site/components/GeneralSurgeryCampaign/AdvancedSurgicalCareSection";
import WhyChooseLokSection from "@/site/components/GeneralSurgeryCampaign/WhyChooseLokSection";
import SignsYouSeeSlider from "@/site/components/GeneralSurgeryCampaign/SignsYouSeeSlider";
import CampaignMeetExperts from "@/site/components/GeneralSurgeryCampaign/CampaignMeetExperts";
import MainSuccessStor from "@/site/components/MainSuccessStor";
import AppointmentForm from "@/site/components/GeneralSurgeryCampaign/AppointmentForm";


const faqs = [
  {
    question: "What types of surgery are considered general surgery?",
    answer:
      "General surgery includes a wide range of procedures, from gallbladder removal and hernia repair to colorectal surgery and breast surgery.",
  },
  {
    question: "Is minimally invasive surgery safer?",
    answer:
      "Minimally invasive surgeries typically result in smaller incisions, less pain, and faster recovery times compared to traditional surgeries.",
  },
  {
    question: "How long is the recovery after surgery?",
    answer:
      "Recovery time varies depending on the type of surgery and your overall health. Most patients can resume normal activities within a few weeks, though full recovery may take longer.",
  },
  {
    question: "How do I prepare for surgery?",
    answer:
      "Your surgeon will provide detailed instructions on how to prepare, including dietary restrictions, medications, and pre-surgical tests.",
  },
  {
    question: "Are general surgeries covered by insurance?",
    answer:
      "Many general surgeries are covered by health insurance. We recommend contacting your provider for specific coverage details.",
  },
];

const generalTestimonials = [
  {
    id: 1,
    review:
      "Overall experience right from the patient admission, operation & later discharge was very good. Staff was supportive and also doctors are caring & helpful.",
    author: "Tanvi Kulkarni",
  },
  {
    id: 2,
    review:
      "Admission process is smooth and easy. Nursing staff is very cooperative and friendly. Dr visits regularly after admission. Overall experience is good.",
    author: "Aman Sharma",
  },
  {
    id: 3,
    review:
      "Very quick action taken while admitting me in hospital. Good service received from each and every staff. Medicines are effective for fast recovery from my illness.",
    author: "Vaijayanti More",
  },
  {
    id: 4,
    review:
      "I am admitted in male ward. Very good behavior from every staff. All staff, doctors, nurses, and other staff are very polite and calmly talking. Pharmacy, billing, floor staff, coordinator, physiotherapy all were cooperative. Thank you all, I will recommend this hospital to all.",
    author: "Santosh Tiwari",
  },
  {
    id: 5,
    review:
      "Good place for treatment, overall very nice service of doctor and staff. Patient is treated with utmost care and attention. Nice service of billing department as well which supported for smooth claim processing.",
    author: "Amey Dalvi",
  },
];

const GeneralSurgeryCampaign = () => {

  // Book Appointment button

  const [isModalOpenapp, setIsModalOpenapp] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalType] = useState("general-surgery-campaign")
  const handleModalOpenapp = (title) => {
    setModalTitle(title);
    setIsModalOpenapp(true);
  };

  const handleModalCloseapp = () => setIsModalOpenapp(false);


  return (
    <>
      <Head></Head>
      <div className="position-relative">
        <GeneralSurgeryBanner
          title="Advancing Your Health Through General Surgery"
          subtitle="Precision, Compassion, Excellence"
          buttonText="Book An Appointment"
          imageSrc="gen-sgy-bnr-img.webp"
          handleButtonClick={(label) => handleModalOpenapp(label)}
        />
        <ExpertCareSection
          title="Expert Surgical Care"
          paragraph1="At Lokmanya Hospitals, we provide comprehensive and compassionate care for a wide range of surgical conditions. Whether you're dealing with routine procedures or more complex surgeries, our expert surgical team is dedicated to delivering the highest quality of care in a comfortable and supportive environment. With advanced technology, experienced surgeons, and personalized treatment plans, we ensure that every patient receives the best possible outcome."
          paragraph2="From minimally invasive procedures to major surgeries, our general surgery department offers a full spectrum of services designed to address your unique needs. We focus on both the treatment and prevention of surgical conditions, helping you achieve a healthier, pain-free life."
          imageSrc="/images/new-theme/Newpages/CampaignPages/exprt-about-img.webp"
          imageAlt="Expert Surgical Care"
        />
        <ConditionsWeTreatSection />
        <ServicesAndProceduresSection />
        <AdvancedSurgicalCareSection
          heading="Advanced Surgical Care"
          subtext="Schedule Your Consultation Today!"
          image="AdvancedSurgicalimg.png"
          onBookAppointment={handleModalOpenapp}
        />
        <WhyChooseLokSection onBookAppointment={handleModalOpenapp} />
        <SignsYouSeeSlider />
        <CampaignMeetExperts />
        <MainSuccessStor data={generalTestimonials} />
        <section className="side-space section-space pt-0">
          <OurLocation />
        </section>
        <section id="faq" className="hospital-faq-section">
          <FaqSection data={faqs} />
        </section>
        <AppointmentForm />
        <AppointmentModal
          isModalOpen={isModalOpenapp}
          handleModalClose={handleModalCloseapp}
          title={modalTitle}
           formtype={modalType}
        />
      </div>
    </>
  );
};

export default GeneralSurgeryCampaign;
