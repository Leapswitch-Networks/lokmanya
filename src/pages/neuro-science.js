import React, { useEffect, useState } from "react";
import ButtonPrimary from "../site/components/controls/ButtonPrimary";
import {
  CerebralPalsy,
  Epilepsy,
  Hydrocephalus,
  InnovativeTreat,
  LegacyTrust,
  // NabhWhite,
  // PeripheralNerveDisorder,
  PersonThreestar,
  SleepDisorder,
  StrokeBrain,
  TrustedTeam,
  WhiteStth,
  Worlclasscare,
} from "../site/assets/images/icons";
import ParkinsonsDisease from "../assets/images/Parkinsons Disease.svg";
import Alzheimer from "../assets/images/Alzheimers Disease.svg";
import Sclerosis from "../assets/images/Multiple Sclerosis.svg";
import Migraine from "../assets/images/Migraine.svg";
import Neuroinfectious from "../assets/images/Neuroinfectious Diseases.svg";
import NerveMuscle from "../assets/images/Nerve and Muscle Disorders.svg";
import Neuropsychologica from "../assets/images/Nerve and Muscle Disorders-1.svg";
import PediatricDisorders from "../assets/images/Pediatric Disorder.svg";
import BrainTumors from "../assets/images/Brain Tumors.svg";
import Aneurysms from "../assets/images/Brain Tumors.svg";
// import EpilepsySeizure from "../assets/images/Epilepsy.svg";
import SpinalCord from "../site/assets/images/Spinal Cord Tumors.svg";
import HerniatedDiscs from "../site/assets/images/Herniated Discs and Spinal Stenosis.svg";
import TraumaticBrain from "../assets/images/Multiple Sclerosis.svg";
import TrigeminalNeuralgia from "../assets/images/Migraine.svg";
import MovementDisorders from "../site/assets/images/MovementDisorders.svg";
import Chiari from "../site/assets/images/Chiari Malformations.svg";
import CranialDisorders from "../assets/images/Traumatic Brain Injury.svg";
import BookCallSection from "../site/components/BookCallnowSection/BookCallSection";
import OurLocation from "../site/components/LokmanyaNetworkSection/OurLocation";
import FaqSection from "../site/components/FaqSection/FaqSection";
import { errorToast, successToast } from "../utils/Toast";
import axiosConfig from "../utils/axiosConfig";
import Counter from "../site/components/Counter/Counter";
import AppointmentModal from "../site/components/AppointmentModal";
import Head from "next/head";
import Link from "next/link";
import CampaignMeetExperts from "@/site/components/GeneralSurgeryCampaign/CampaignMeetExperts";
import ConditionsWeTreatSection from "@/site/components/GeneralSurgeryCampaign/ConditionsWeTreatSection";
import MainSuccessStor from "@/site/components/MainSuccessStor";
import AboutNeurosurgerySection from "@/site/components/NeuroScienceCampaign/AboutNeurosurgerySection";
import NeuroOurServices from "@/site/components/NeuroScienceCampaign/NeuroOurServices";
import WhenToConsultSlider from "@/site/components/NeuroScienceCampaign/WhenToConsultSlider";
import NeuroBookAppointment from "@/site/components/NeuroScienceCampaign/NeuroBookAppointment";
import Image from "next/image";

import DrVikramAglave from "../site/assets/images/findAdoctor/DrVikramAglave.webp";
import DrRiteshBhalla from "../site/assets/images/findAdoctor/DrRiteshBhalla.webp";
import DrNileshKhanzhode from "../site/assets/images/findAdoctor/DrNileshKhanzhode.webp";
import DrApte from "../site/assets/images/findAdoctor/DrApte.jpeg";
import DrHemant from "../site/assets/images/findAdoctor/Dr_Hemant_Sant-removebg-preview.png";

const treatmentConditions = [
  { icon: StrokeBrain, title: "Stroke" },
  { icon: Epilepsy, title: "Epilepsy" },
  {
    icon: ParkinsonsDisease,
    title: "Parkinson’s Disease and Movement Disorders",
  },
  { icon: Alzheimer, title: "Alzheimer’s Disease and Dementia" },
  { icon: Sclerosis, title: "Multiple Sclerosis" },
  { icon: Migraine, title: "Migraine and Chronic Headaches" },
  { icon: Neuroinfectious, title: "Neuroinfectious Diseases" },
  { icon: NerveMuscle, title: "Nerve and Muscle Disorders" },
  { icon: CerebralPalsy, title: "Cerebral Palsy" },
  { icon: Neuropsychologica, title: "Neuropsychological Disorders" },
  { icon: SleepDisorder, title: "Sleep Disorders" },
  { icon: PediatricDisorders, title: "Pediatric Neurological Disorders" },
  { icon: BrainTumors, title: "Brain Tumors (Benign and Malignant)" },
  { icon: Aneurysms, title: "Aneurysms and AVMs" },
  // { icon: EpilepsySeizure, title: "Epilepsy and Seizure Disorders" },
  { icon: SpinalCord, title: "Spinal Cord Tumors and Injuries" },
  { icon: HerniatedDiscs, title: "Herniated Discs and Spinal Stenosis" },
  { icon: TraumaticBrain, title: "Traumatic Brain Injuries (TBI)" },
  { icon: TrigeminalNeuralgia, title: "Trigeminal Neuralgia" },
  { icon: Hydrocephalus, title: "Hydrocephalus" },
  // { icon: PeripheralNerveDisorder, title: "Peripheral Nerve Disorders" },
  {
    icon: MovementDisorders,
    title: "Movement Disorders (e.g., Parkinson’s Disease)",
  },
  { icon: Chiari, title: "Chiari Malformations" },
  { icon: CranialDisorders, title: "Cranial Nerve Disorders" },
];
const doctors = [
  {
    id:69,
    name: "Dr. Charudutt Apte",
    designation: "Head Department of Neurosurgery",
    field: "Neurosurgery",
    exp: "40+ Years of Experience",
    image: DrApte,
  },
  {
    id:75,
    name: "Dr. Hemant Sant",
    designation: "Consultant Neurology Department",
    field: "Neurosurgery",
    exp: "36+ Years of Experience",
    image: DrHemant,
  }
  
  ,{
    id:66,
    name: "Dr. Vikram Aglave",
    designation: "Consultant Neurology Department",
    field: "Neurology",
    exp: "13+ Years of Experience",
    image: DrVikramAglave,
  },
  {
    id:54,
    name: "Dr. Ritesh Bhalla",
    designation: "Consultant Neurosurgeon ",
    field: "Neurosurgery",
    exp: "9+ Years of Experience",
    image: DrRiteshBhalla,
  },
  {
    id:16,
    name: "Dr. Nilesh Kanzode",
    designation: "Consultant Neurosurgeon",
    field: "Neurosurgery",
    exp: "8+ Years of Experience",
    image: DrNileshKhanzhode,
  },
  
];
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
  {
    question:
      "What are the risks associated with neurological treatments?What are the common signs of a neurological condition?",
    answer:
      "Symptoms such as chronic headaches, dizziness, numbness, weakness, or seizures may indicate a neurological issue requiring medical attention.",
  },
  {
    question: "What are the benefits of minimally invasive neuro surgery?",
    answer:
      "Minimally invasive techniques offer reduced pain, minimum blood loss, shorter recovery times, and smaller scars compared to traditional surgeries.",
  },
  {
    question: "How long does it take to recover from brain surgery?",
    answer:
      "Recovery varies based on the type of surgery and the individual’s overall health. Most patients resume daily activities within 4-8 weeks.",
  },
  {
    question: "Can neurological conditions be prevented?",
    answer:
      "While some conditions are unavoidable, maintaining a healthy lifestyle, managing stress, and addressing risk factors like high blood pressure can reduce the likelihood of certain neurological disorders.",
  },
];

export const neuroTestimonials = [
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

const NeuroScienceCampaign = () => {
  useEffect(() => {
    // import('./generalsurgerycampaign.css');
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDoctorName, setCurrentDoctorName] = useState("");
  const [currentDoctorLocation, setCurrentDoctorLocation] = useState("");
  const handleModalOpen = (doctorName, doctorLocation) => {
    console.log("Doctor name:", doctorName); // Debugging line to check the doctor name

    setCurrentDoctorName(44); // Ensure the doctor name is set
    setCurrentDoctorLocation(doctorLocation);
    setIsModalOpen(true); // Open the modal
  };

  // Book Appointment button

  const [isModalOpenapp, setIsModalOpenapp] = useState(false);
  const [modalTitle, setModalTitle] = useState(""); // State for the title
  const [modalType, setModalType] = useState("neuro_science"); // State for the title

  const handleModalOpenapp = (title, type) => {
    setModalTitle(title); // Set the modal title
    setModalType(type);
    setIsModalOpenapp(true);
  };

  const handleModalCloseapp = () => setIsModalOpenapp(false);

  // Book Appointment Form

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    doctor: "",
    city: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    phoneNumber: "",
    doctor: "",
    city: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const validateFullName = (name) => {
    const nameRegex = /^[a-zA-Z\s]+$/; // Only letters and spaces
    return nameRegex.test(name);
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/; // Only 10 digit phone numbers
    return phoneRegex.test(phone);
  };

  const validateCity = (city) => {
    return city.trim().length > 0; // City should not be empty
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const resetForm = () => {
    setFormData({
      fullName: "",
      phoneNumber: "",
      doctor: "",
      city: "",
    });
    setErrors({});
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    const newErrors = {};

    // Validate Full Name
    if (!validateFullName(formData.fullName)) {
      valid = false;
      newErrors.fullName = "Full Name should only contain letters and spaces.";
    }

    // Validate Phone Number
    if (!validatePhoneNumber(formData.phoneNumber)) {
      valid = false;
      newErrors.phoneNumber = "Phone number should be 10 digits.";
    }

    // Validate Doctor Selection
    if (!formData.doctor) {
      valid = false;
      newErrors.doctor = "Please select a doctor.";
    }

    // Validate City
    if (!validateCity(formData.city)) {
      valid = false;
      newErrors.city = "City is required.";
    }

    setErrors(newErrors);

    if (valid) {
      setFormSubmitted(true);
      console.log("Form Data Submitted:", formData);

      try {
        const response = await axiosConfig.post(
          "/add-lead-campaign-gn",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 201) {
          successToast("Appointment booked successfully!");
          resetForm();
        }
      } catch (error) {
        console.error("Form submission error:", error);
        errorToast("Something went wrong. Please try again.");
      }
    }
  };

  const handleModalClose = () => setIsModalOpen(false);
  return (
    <>
      <Head>
        <title>Best Neuroscience Hospital in Pune | Lokmanya Neuro Care</title>
        <meta name="description" content="Get advanced treatment for brain, spine, and nerve disorders at Lokmanya Hospital. Expert neurologists and neurosurgeons offering 24/7 critical care." />
      </Head>
      <div className="position-relative">
        <section className="neuro-sci-bnr">
          <div className="row w-100 align-items-center mt-lg-0 mt-5">
            <div className="col-xl-7 col-lg-6">
              <div className="gen-sgy-bnr-ctnt">
                <div className="gen-sgy-bnr-ttl mb-lg-4 mb-md-3 mb-2">
                  <h1 className="text-white mb-0">
                    Breaking Barriers in Neuroscience for Better Tomorrow
                  </h1>
                </div>
                <div className="row mb-lg-4 mb-md-3 mb-2 g-lg-3 g-2 justify-content-lg-start justify-content-center">
                  <div className="col-xl-4 col-lg-12 col-md-4 col-6 d-flex">
                    <div className="d-flex align-items-center gap-lg-3 gap-2">
                      <WhiteStth />
                      <div>
                        <Counter
                          targetValue="50"
                          duration={3000}
                          usePlusSign={true}
                          className="neuro-sci-counter mb-1 text-white text-start"
                        />
                        <p className="mb-0 text-white text-start neuro-sci-txt">
                          Experienced specialists
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-12 col-md-4 col-6 d-flex">
                    <div className="d-flex align-items-center gap-lg-3 gap-2">
                      <PersonThreestar />
                      <div>
                        <Counter
                          targetValue="50"
                          duration={3000}
                          usePlusSign={true}
                          className="neuro-sci-counter mb-1 text-white text-start"
                        />
                        <p className="mb-0 text-white text-start neuro-sci-txt">
                          Years of experience
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-xl-4 col-lg-12 col-md-4 col-6 d-flex">
                                        <div className='d-flex align-items-center gap-lg-3 gap-2'>
                                            <NabhWhite />
                                            <div className='text-start'>
                                                <span className='neuro-sci-counter mb-1 text-white text-start'>NABH</span>
                                                <p className='mb-0 text-white text-start neuro-sci-txt'>Certified Nursing Excellence</p>
                                            </div>
                                        </div>
                                    </div> */}
                </div>
                <Link
                  href="#"
                  className="book-new-btn d-block"
                  onClick={(e) => {
                    e.preventDefault();
                    handleModalOpenapp("Book Appointment", "neuro_science");
                  }}
                  title="Book Appointment"
                >
                  <span className="text-uppercase">Book An Appointment</span>
                </Link>
              </div>
            </div>
            <div className="col-xl-5 col-lg-6">
              <div className="neuro-sci-bnr-img">
                <Image width={500} height={490}
                  src="/images/new-theme/Newpages/CampaignPages/neuro-brain-bnr-img.webp"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section >
        <AboutNeurosurgerySection handleModalOpenapp={handleModalOpenapp} />
        <ConditionsWeTreatSection data={treatmentConditions} />
        <NeuroOurServices />
        <section
          id="whyus"
          className="campaign-why-choose side-space section-space pt-0"
        >
          <h2 className="section-heading text-start d-lg-none d-block">
            Why Choose Lokmanya Hospitals for Neurosciences?
          </h2>
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="campaign-why-choose-img">
                <Image width={600} height={435}
                  src="/images/new-theme/Newpages/CampaignPages/campaign-why-choose-img.png"
                  alt="Why Choose NeuroScience"
                />
              </div>
            </div>
            <div className="col-md-6">
              <h2 className="section-heading text-start d-lg-block d-none">
                Why Choose Lokmanya Hospitals for Neurosciences?
              </h2>
              <div className="campaign-why-choose-ctnt mt-md-4 mt-3">
                <div className="row row-cols-lg-2 row-cols-md-1 row-cols-1 g-lg-5 g-2">
                  <div className="col pb-lg-3 pb-lg-2 grad-black-1">
                    <div className="d-flex align-items-center gap-lg-3 gap-2">
                      <TrustedTeam />
                      <p className="mb-0">
                        Trusted Team of World-Class Healthcare Professional
                      </p>
                    </div>
                  </div>
                  <div className="col pb-lg-3 pb-lg-2">
                    <div className="d-flex align-items-center gap-lg-3 gap-2">
                      <Worlclasscare />
                      <p className="mb-0">
                        State-of-the-Art Facilities for World-Class Care
                      </p>
                    </div>
                  </div>
                  <div className="col mt-lg-0 pt-lg-3 pt-2 ">
                    <div className="d-flex align-items-center gap-lg-3 gap-2">
                      <InnovativeTreat />
                      <p className="mb-0">
                        Innovative Technology for Enhanced Treatment Outcomes
                      </p>
                    </div>
                  </div>
                  <div className="col mt-lg-0 pt-lg-3 pt-2 grad-black-2">
                    <div className="d-flex align-items-center gap-lg-3 gap-2">
                      <LegacyTrust />
                      <p className="mb-0">
                        A Legacy of Trust and Excellence in Healthcare
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-md-4 mt-3 d-flex justify-content-lg-start justify-content-center">
                <ButtonPrimary
                  onClick={() => handleModalOpenapp("Book Appointment")}
                  title="Book Appointment"
                >
                  Book An Appointment
                </ButtonPrimary>
              </div>
            </div>
          </div>
        </section>
        <WhenToConsultSlider />
        <section className="expert-neuro-meet side-space section-space">
          <BookCallSection
            title="Expert Neurological Care, One Consultation Away"
            subtitle="Schedule Your Consultation Today!"
            primaryText="Book an appointment"
            // secondaryText="Book an appointment"
            imageUrl="/images/new-theme/Newpages/CampaignPages/expert-neurology-meet-img.png"
            onPrimaryClick={() => handleModalOpenapp("Book Appointment")}
          />
          {/* <AppointmentModal isModalOpen={isbookModalOpen} handleModalClose={handlebookModalClose} /> */}
        </section>
        <CampaignMeetExperts data={doctors} />
        <MainSuccessStor data={neuroTestimonials} />
        <section className="side-space section-space pt-0">
          <OurLocation />
        </section>
        <section id="faq" className="hospital-faq-section">
          <FaqSection data={faqs} />
        </section>
        <NeuroBookAppointment />
        <AppointmentModal
          isModalOpen={isModalOpenapp}
          handleModalClose={handleModalCloseapp}
          title={modalTitle}
          formtype={modalType}
        />
      </div >
    </>
  );
};

export default NeuroScienceCampaign;
