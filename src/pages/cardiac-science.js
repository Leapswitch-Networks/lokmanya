import React, { useEffect, useState } from "react";
import ButtonPrimary from "../site/components/controls/ButtonPrimary";
import {
  CerebralPalsy,
  Epilepsy,
  Hydrocephalus,
  InnovativeTreat,
  LegacyTrust,
  // NabhWhite,
  PeripheralNerveDisorder,
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

import DrAshish from "../site/assets/images/findAdoctor/DrBaviskar.webp";
import DrRiteshBhalla from "../site/assets/images/findAdoctor/DrRiteshBhalla.webp";
import DrNileshKhanzhode from "../site/assets/images/findAdoctor/DrNileshKhanzhode.webp";
import DrApte from "../site/assets/images/findAdoctor/DrApte.jpeg";

import dummy from "../site/assets/images/Brain Tumor Surgery.webp";
import dummy1 from "../site/assets/images/cardicScience/CoronaryArteryBypassGraft.jpg";
import AngioplastyStentPlacement from "../site/assets/images/cardicScience/AngioplastyStentPlacement.jpg";
import Pacemaker from "../site/assets/images/cardicScience/Pacemaker.webp";
import HeartValveSurgery from "../site/assets/images/cardicScience/HeartValveSurgery.webp";
import AorticSurgery from "../site/assets/images/cardicScience/AorticSurgery.webp";
import CoronaryArteryBypass from "../site/assets/images/cardicScience/CoronaryArteryBypass.webp";
import MinimallyInvasiveCardiacSurgery from "../site/assets/images/cardicScience/MinimallyInvasiveCardiacSurgery.webp";

import CongenitalHeartDefectSurgery from "../site/assets/images/cardicScience/CongenitalHeartDefectSurgery.webp";

import AorticAneurysms from "../site/assets/images/cardicScience/svg/Aortic Dissections.svg";
import AorticDissections from "../site/assets/images/cardicScience/svg/Aortic Dissections.svg";
import Arrhythmias from "../site/assets/images/cardicScience/svg/Arrhythmias (Irregular Heart Rhythms).svg";
import AtrialFibrillation from "../site/assets/images/cardicScience/svg/Atrial Fibrillation.svg";
import Cardiomyopathy from "../site/assets/images/cardicScience/svg/Cardiomyopathy (Weakening of the Heart Muscle).svg";
import ChronicAngina from "../site/assets/images/cardicScience/svg/Chronic Angina (Chest Pain).svg";
import CongenitalHeart from "../site/assets/images/cardicScience/svg/Congenital Heart Defects.svg";
import DiabeticCardiovascular from "../site/assets/images/cardicScience/svg/Diabetic Cardiovascular Conditions.svg";
import Endocarditis from "../site/assets/images/cardicScience/svg/Endocarditis.svg";
import HeartFailure from "../site/assets/images/cardicScience/svg/Heart Failure.svg";
import Hyperlipidemia from "../site/assets/images/cardicScience/svg/Hyperlipidemia (High Cholesterol).svg";
import Hypertension from "../site/assets/images/cardicScience/svg/Hypertension (High Blood Pressure).svg";
import MyocardialInfarction from "../site/assets/images/cardicScience/svg/Myocardial Infarction (Heart Attack).svg"
import Pericarditis from "../site/assets/images/cardicScience/svg/Pericarditis.svg"
import PeripheralArteryDisease from "../site/assets/images/cardicScience/svg/Peripheral Artery Disease.svg"
import PulmonaryHypertension from "../site/assets/images/cardicScience/svg/Pulmonary Hypertension.svg"
import Stroke from "../site/assets/images/cardicScience/svg/Stroke (Cardiovascular-related).svg"


const treatmentConditions = [
  { icon: AorticAneurysms, title: "Coronary Artery Disease" },
  { icon: Epilepsy, title: "Heart Valve Disease/Disorders" },
  {
    icon: Arrhythmias,
    title: "Arrhythmias (Irregular Heart Rhythms)",
  },
  { icon: AtrialFibrillation, title: "Atrial Fibrillation" },
  { icon: CongenitalHeart, title: "Congenital Heart Defects" },
  {
    icon: HeartFailure,
    title: "Heart Failure",
  },
  { icon: MyocardialInfarction, title: "Myocardial Infarction (Heart Attack)" },
  {
    icon: Cardiomyopathy,
    title: "Cardiomyopathy (Weakening of the Heart Muscle)",
  },
  //   { icon: CerebralPalsy, title: "Cerebral Palsy" },
  { icon: Hypertension, title: "Hypertension (High Blood Pressure)" },
  { icon: PeripheralArteryDisease, title: "Peripheral Artery Disease" },
  { icon: AorticAneurysms, title: "Aortic Aneurysms" },
  { icon: AorticDissections, title: "Aortic Dissections" },
  { icon: Stroke, title: "Stroke (Cardiovascular-related)" },
  // { icon: EpilepsySeizure, title: "Epilepsy and Seizure Disorders" },
  { icon: PulmonaryHypertension, title: "Pulmonary Hypertension" },
  { icon: Hyperlipidemia, title: "Hyperlipidemia (High Cholesterol)" },
  { icon: ChronicAngina, title: "Chronic Angina (Chest Pain)" },
  { icon: DiabeticCardiovascular, title: "Diabetic Cardiovascular Conditions" },
  { icon: Pericarditis, title: "Pericarditis" },
  { icon: Endocarditis, title: "Endocarditis" },
];
const servicesData = [
  { title: "Coronary Artery Bypass Graft (CABG)", imgSrc: dummy1 },
  { title: "Angioplasty & Stent Placement", imgSrc: AngioplastyStentPlacement },
  { title: "Pacemaker or ICD Implantation", imgSrc: Pacemaker },
  // { title: "Epilepsy Surgery", imgSrc: EpilepsySurgery },
  // { title: "Peripheral Nerve Surgery", imgSrc: PeripheralNerve },
  { title: "Heart Valve Surgery", imgSrc: HeartValveSurgery },
  { title: "Minimally Invasive Cardiac Surgery", imgSrc: MinimallyInvasiveCardiacSurgery },
  { title: "Aortic Surgery", imgSrc: AorticSurgery },
  { title: "Congenital Heart Defect Surgery", imgSrc: CongenitalHeartDefectSurgery },
  { title: "Coronary Artery Bypass Grafting (CABG)", imgSrc: CoronaryArteryBypass },
  { title: "Pacemaker and ICD Implantation", imgSrc: Pacemaker },
  //   { title: "Physiotherapy & Sports Rehabilitation", imgSrc: dummy },
  //   { title: "Return-to-Sport Conditioning Programs", imgSrc: dummy },
  //   { title: "Injury Prevention & Performance Optimization", imgSrc: dummy },
  //   { title: "Pediatric Sports Injury Care", imgSrc: dummy },
  //   { title: "Post-Surgical Recovery Planning", imgSrc: dummy },
];

const DoctorList =[
   {
   value: 70,
    label: "Dr. Ashish Baviskar",
  },
 
]
const doctors = [
  {
    id: 70,
    name: "Dr. Ashish Baviskar",
    designation: "Minimally Invasive Cardiothoracic and Vascular Surgeon",
    field: "Cardiology, Cardiac Surgery",
    exp: "15+ Years of Experience",
    image: DrAshish,
  },
  // {
  //   id: 54,
  //   name: "Dr. Ritesh Bhalla",
  //   designation: "Consultant Neurosurgeon ",
  //   field: "Neurosurgery",
  //   exp: "9+ Years of Experience",
  //   image: DrRiteshBhalla,
  // },
  // {
  //   id: 16,
  //   name: "Dr. Nilesh Kanzode",
  //   designation: "Consultant Neurosurgeon",
  //   field: "Neurosurgery",
  //   exp: "8+ Years of Experience",
  //   image: DrNileshKhanzhode,
  // },
  // {
  //   id: 69,
  //   name: "Dr. Charudutt Apte",
  //   designation: "Head Department of Neurosurgery",
  //   field: "Neurosurgery",
  //   exp: "40+ Years of Experience",
  //   image: DrApte,
  // },
];
const faqs = [
  {
    question: "What are the warning signs of coronary artery disease?",
    answer:
      "Common symptoms include chest pain or discomfort (angina), shortness of breath, fatigue, and dizziness. Early detection is key to preventing complications like heart attacks",
  },
  {
    question: "How is arrhythmia diagnosed and treated?",
    answer:
      "Arrhythmias are diagnosed using ECG, Holter monitoring, or electrophysiological studies. Treatment may involve medication, lifestyle changes, or procedures like catheter ablation or pacemaker implantation.",
  },
  {
    question: "What are the treatment options for heart failure?",
    answer:
      " Heart failure is managed through medications, lifestyle modifications, and in advanced cases, device therapy or surgical interventions such as valve repair or heart transplant evaluation.",
  },
  {
    question:
      "Can valve disorders be treated without open-heart surgery?",
    answer:
      " Yes. Minimally invasive procedures like transcatheter aortic valve replacement (TAVR) or balloon valvuloplasty are available for select patients, depending on the severity and type of valve disease.",
  },
  {
    question: "What causes congenital heart defects and how are they managed?",
    answer:
      " Congenital heart defects are structural abnormalities present at birth. Management may include monitoring, medication, or corrective surgery depending on the type and severity of the defect.",
  },
  {
    question: "Is high blood pressure considered a cardiac condition?",
    answer:
      " Yes. Hypertension significantly increases the risk of heart disease, stroke, and heart failure. It’s managed through medication, dietary changes, and regular monitoring.",
  },
  {
    question: "What lifestyle changes help prevent cardiac conditions?",
    answer:
      "A heart-healthy lifestyle includes regular exercise, a balanced diet low in saturated fats and sodium, stress management, avoiding tobacco, and routine cardiac check-ups",
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

const CardicScience = () => {

  const newImage= "/images/new-theme/Newpages/CampaignPages/cardic.webp"

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
        <title>Advanced Cardiac Care | Lokmanya Hospitals Pune</title>
        <meta
          name="description"
          content="Expert diagnosis, treatment & surgery for heart conditions. Access advanced cardiac care at Lokmanya Hospitals. Book your consultation today."
        />
      </Head>
      <div className="position-relative">
        <section className="cardicScienceBaner">
          <div className="row w-100 align-items-center mt-lg-0 mt-5">
            <div className="col-xl-7 col-lg-6">
              <div className="gen-sgy-bnr-ctnt">
                <div className="gen-sgy-bnr-ttl mb-lg-4 mb-md-3 mb-2">
                  <h1 className="text-white mb-0">
                    Leading Progress in Cardiac Science for a Healthier Tomorrow
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
              <div className="neuro-sci-bnr-img cardicScienceImage">
                <Image
                  width={500}
                  height={490}
                  src="/images/new-theme/Newpages/CampaignPages/HeartImageCardicScience.webp"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
        {/* <AboutNeurosurgerySection handleModalOpenapp={handleModalOpenapp} /> */}
        <section className="about-neurosurgery side-space section-space">
          <h2 className="section-heading text-start d-md-none d-block">
            Excellence in Cardiac Care
          </h2>
          <div className="row position-relative align-items-xl-start align-items-center">
            <div className="col-xxl-6 col-lg-5 col-12">
              <div className="about-neurosurgery-img">
                <Image
                  width={600}
                  height={485}
                  src="/images/new-theme/Newpages/CampaignPages/MaskGroup.png"
                  alt="About Neuroscience"
                />
              </div>
            </div>
            <div className="col-xxl-6 col-lg-7 col-12">
              <div className="about-neurosurgery-ctnt cardicScienceAbout">
                <h2 className="section-heading text-start d-md-block d-none">
                  Excellence in Cardiac Care
                </h2>
                <p>
                  At Lokmanya Hospitals, we bring together clinical expertise, advanced technology, and compassionate care to deliver comprehensive cardiac solutions for patients in Pune and beyond. From coronary artery disease and arrhythmias to heart failure and structural heart conditions, our multidisciplinary team offers precise diagnostics and tailored interventions that prioritize both heart health and overall well-being. With a commitment to innovation and outcomes, we ensure every patient receives care that is both evidence-based and deeply personalized
                </p>
                <p>
                  Whether you require minimally invasive cardiac procedures, complex bypass surgeries, or preventive cardiology support, our specialists are equipped to guide you through every stage of your journey. At Lokmanya, we work to restore strength, resilience, and confidence, helping you return to the life you love with renewed energy and peace of mind.
                </p>
                <div>
                  <ButtonPrimary
                    onClick={() => handleModalOpenapp("Book Appointment")}
                    title="Book Appointment"
                  >
                    Book An Appointment
                  </ButtonPrimary>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ConditionsWeTreatSection data={treatmentConditions} />
        {/* <NeuroOurServices /> */}
        <section
          id="services"
          className="campagin-our-srvc-prd side-space section-space"
        >
          <h2 className="section-heading">Our Cardiac Treatment & Surgery Services</h2>
          <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-sm-2 row-cols-2 g-md-4 g-3 justify-content-center">
            {servicesData.map((service, index) => (
              <div className="col" key={index}>
                <div className="campagin-our-srvc-prd-card">
                  <div className="campagin-our-srvc-card-img">
                    <Image
                      src={service.imgSrc}
                      alt={service.title}
                      className="img-fluid"
                      placeholder="blur"
                    />
                    <div className="campagin-our-srvc-card-ctnt">
                      <h4 className="mb-0">{service.title}</h4>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* <section
          id="whyus"
          className="campaign-why-choose side-space section-space pt-0"
        >
          <h2 className="section-heading text-start d-lg-none d-block">
            Why Choose Lokmanya Hospitals for Neurosciences?
          </h2>
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="campaign-why-choose-img">
                <Image
                  width={600}
                  height={435}
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
        </section> */}
        {/* <WhenToConsultSlider /> */}
        <section className="expert-neuro-meet side-space section-space">
          <BookCallSection
            title="World-Class Cardiac Science, One Consultation Away"
            subtitle="Your Journey to Better Heart Health Begins Here"
            primaryText="Book an Appointment"
            // secondaryText="Book an appointment"
            imageUrl="/images/new-theme/Newpages/CampaignPages/doctorWithHeart.webp"
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
        <NeuroBookAppointment image={newImage} doctorList={DoctorList}/>
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

export default CardicScience;
