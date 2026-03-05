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
import NeuroBookAppointment from "@/site/components/NeuroScienceCampaign/NeuroBookAppointment";
import Image from "next/image";

import DrVikramAglave from "../site/assets/images/findAdoctor/DrVikramAglave.webp";
import DrNikhil from "../site/assets/images/findAdoctor/DrNikhil.png";
import DrBhushan from "../site/assets/images/findAdoctor/BhushanGanvir.png";
import DrRiteshBhalla from "../site/assets/images/findAdoctor/DrRiteshBhalla.webp";
import DrNileshKhanzhode from "../site/assets/images/findAdoctor/DrNileshKhanzhode.webp";
import DrApte from "../site/assets/images/findAdoctor/DrApte.jpeg";

import dummy from "../site/assets/images/Brain Tumor Surgery.webp";

import CartilageDamage from "../site/assets/images/SportInjurynew/Svg/cartilageLatest.svg";
import Concussionss from "../site/assets/images/SportInjurynew/Svg/ConcussionsHeadInjuries.svg";
import Fractures1 from "../site/assets/images/SportInjurynew/Svg/FracturesDislocations.svg";
import LigamentTears from "../site/assets/images/SportInjurynew/Svg/Ligament Tears.svg";
import MuscleStrainss from "../site/assets/images/SportInjurynew/Svg/MuscleStrainsSprains.svg";
import Overusse from "../site/assets/images/SportInjurynew/Svg/OveruseInjuriess.svg";
import ShinSplints from "../site/assets/images/SportInjurynew/Svg/ShinSplintsFractures.svg";
import TendonInjuriess from "../site/assets/images/SportInjurynew/Svg/TendonInjuries.svg";

import AdvanceddImaging from "../site/assets/images/SportInjurynew/Svg/Images/AdvancedImagingMotionAnalysis.png";
import ArthroscopicSurger from "../site/assets/images/SportInjurynew/Svg/Images/Arthroscopic Surgery.png";
import CartilageRestorationProcedures from "../site/assets/images/SportInjurynew/Svg/Images/Cartilage Restoration Procedures.png";
import ConcussionAssessmentManagement from "../site/assets/images/SportInjurynew/Svg/Images/ConcussionAssessmentManagement.png";
import FractureFixation from "../site/assets/images/SportInjurynew/Svg/Images/FractureFixationJointStabilization.png";
import InjuryPrevention from "../site/assets/images/SportInjurynew/Svg/Images/InjuryyPrevention.png";
import LigamentReconstruction from "../site/assets/images/SportInjurynew/Svg/Images/LigamentReconstruction.png";
import NonManagement from "../site/assets/images/SportInjurynew/Svg/Images/Non-Surgical Injury Management.png";
import dummy9 from "../site/assets/images/SportInjurynew/Svg/Images/Pediatric Sports Injury Care.png";
import SportsRehabilitation from "../site/assets/images/SportInjurynew/Svg/Images/PhysiotherapyRehabilitation.png";
import dummy11 from "../site/assets/images/SportInjurynew/Svg/Images/Post-Surgical Recovery Planning.png";
import dummy12 from "../site/assets/images/SportInjurynew/Svg/Images/Return-to-Sport Conditioning Programs.png";
import SportsInjuryEvaluationn from "../site/assets/images/SportInjurynew/Svg/Images/SportEnjuryEvaluttion.png";
import TendonRepair from "../site/assets/images/SportInjurynew/Svg/Images/TendonRepair.png";

const treatmentConditions = [
  { icon: LigamentTears, title: "Ligament Tears" },
  { icon: Fractures1, title: "Fractures & Dislocations" },
  {
    icon: TendonInjuriess,
    title: "Tendon Injuries (Achilles Tendonitis, Rotator Cuff Tears)",
  },
  { icon: MuscleStrainss, title: "Muscle Strains & Sprains" },
  { icon: ShinSplints, title: "Shin Splints & Stress Fractures" },
  {
    icon: CartilageDamage,
    title: "Cartilage Damage (Meniscus Tears, Chondromalacia)",
  },
  { icon: Concussionss, title: "Concussions & Head Injuries" },
  {
    icon: Overusse,
    title: "Overuse Injuries (Tennis Elbow, Golfer’s Elbow, Runner’s Knee)",
  },
  // { icon: CerebralPalsy, title: "Cerebral Palsy" },
  // { icon: Neuropsychologica, title: "Neuropsychological Disorders" },
  // { icon: SleepDisorder, title: "Sleep Disorders" },
  // { icon: PediatricDisorders, title: "Pediatric Neurological Disorders" },
  // { icon: BrainTumors, title: "Brain Tumors (Benign and Malignant)" },
  // { icon: Aneurysms, title: "Aneurysms and AVMs" },
  // // { icon: EpilepsySeizure, title: "Epilepsy and Seizure Disorders" },
  // { icon: SpinalCord, title: "Spinal Cord Tumors and Injuries" },
  // { icon: HerniatedDiscs, title: "Herniated Discs and Spinal Stenosis" },
  // { icon: TraumaticBrain, title: "Traumatic Brain Injuries (TBI)" },
  // { icon: TrigeminalNeuralgia, title: "Trigeminal Neuralgia" },
  // { icon: Hydrocephalus, title: "Hydrocephalus" },
  // // { icon: PeripheralNerveDisorder, title: "Peripheral Nerve Disorders" },
  // {
  //   icon: MovementDisorders,
  //   title: "Movement Disorders (e.g., Parkinson’s Disease)",
  // },
  // { icon: Chiari, title: "Chiari Malformations" },
  // { icon: CranialDisorders, title: "Cranial Nerve Disorders" },
];
const servicesData = [
  {
    title: "Sports Injury Evaluation & Diagnosis",
    imgSrc: SportsInjuryEvaluationn,
  },
  { title: "Advanced Imaging & Motion Analysis", imgSrc: AdvanceddImaging },
  { title: "Arthroscopic Surgery", imgSrc: ArthroscopicSurger },
  // { title: "Epilepsy Surgery", imgSrc: EpilepsySurgery },
  // { title: "Peripheral Nerve Surgery", imgSrc: PeripheralNerve },
  {
    title: "Ligament Reconstruction (ACL, MCL, etc.)",
    imgSrc: LigamentReconstruction,
  },
  {
    title: "Tendon Repair (Rotator Cuff, Achilles, etc.)",
    imgSrc: TendonRepair,
  },
  {
    title: "Fracture Fixation & Joint Stabilization",
    imgSrc: FractureFixation,
  },
  {
    title: "Cartilage Restoration Procedures",
    imgSrc: CartilageRestorationProcedures,
  },
  {
    title: "Concussion Assessment & Management",
    imgSrc: ConcussionAssessmentManagement,
  },
  { title: "Non-Surgical Injury Management", imgSrc: NonManagement },
  {
    title: "Physiotherapy & Sports Rehabilitation",
    imgSrc: SportsRehabilitation,
  },
  { title: "Return-to-Sport Conditioning Programs", imgSrc: dummy12 },
  {
    title: "Injury Prevention & Performance Optimization",
    imgSrc: InjuryPrevention,
  },
  { title: "Pediatric Sports Injury Care", imgSrc: dummy9 },
  { title: "Post-Surgical Recovery Planning", imgSrc: dummy11 },
];

const DoctorList =[
   {
   value: 74,
    label: "Dr. Nikhill Likhate ",
  },
  {
    value: 11,
    label: "Dr. Bhushan Ganvir",
  },
]

const doctors = [
  {
    id: 74,
    name: "Dr. Nikhill Likhate ",
    designation: "Consultant Sports Medicine Department",
    field: "Joint Replacement, Orthopedics, Sports Medicine",
    exp: "20+ Years of Experience",
    image: DrNikhil,
  },
  {
    id: 11,
    name: "Dr. Bhushan Ganvir",
    designation: "Consultant Sports Medicine",
    field: "Orthopedics, Sports Medicine",
    exp: "15+ Years of Experience",
    image: DrBhushan,
  },
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
    question: "What are ligament tears and how are they treated?",
    answer:
      " Ligament tears, such as ACL or MCL injuries, often occur during high-impact or twisting movements. Treatment may involve bracing, physiotherapy, or surgical reconstruction depending on severity.",
  },
  {
    question: "How do stress fractures differ from regular fractures?",
    answer:
      " Stress fractures are tiny cracks in the bone caused by repetitive strain, common in runners and athletes. Unlike acute fractures, they develop gradually and often require rest and activity modification",
  },
  {
    question: "What is the difference between a sprain and a strain?",
    answer:
      "A sprain affects ligaments, while a strain involves muscles or tendons. Both can result from overstretching or sudden force and are treated with rest, ice, compression, and rehabilitation.",
  },
  {
    question:
      "Can tendon injuries like rotator cuff tears heal without surgery?",
    answer:
      " Mild to moderate tendon injuries may respond well to physiotherapy and targeted exercises. Severe tears might require surgical repair for full functional recovery.",
  },
  {
    question:
      "What causes cartilage damage such as meniscus tears or chondromalacia?",
    answer:
      "Cartilage injuries often result from trauma, overuse, or degeneration. Treatment ranges from conservative management to arthroscopic procedures for repair or debridement",
  },
  {
    question:
      "How are overuse injuries like tennis elbow and runner’s knee managed?",
    answer:
      " These conditions stem from repetitive motion and strain. Management includes rest, physiotherapy, ergonomic correction, and sometimes corticosteroid injections or bracing.",
  },
  {
    question:
      "Are concussions considered sports injuries and how are they treated?",
    answer:
      " Yes, concussions are common in contact sports. Treatment involves cognitive rest, gradual return to activity, and close monitoring by neurology and sports medicine specialist",
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

const SportsInjury = () => {
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
  const image2 = "/images/new-theme/Newpages/CampaignPages/DoctorWitXray.webp";

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
        <title>Expert Sports Injury Care | Lokmanya Hospitals Pune</title>
        <meta
          name="description"
          content="Get advanced treatment for ligament tears, fractures, tendon injuries & more. Book your sports injury consultation at Lokmanya Hospitals today."
        />
      </Head>
      <div className="position-relative">
        <section className="sportInjuryBanere ">
          <div className="row w-100 align-items-center mt-lg-0 mt-5">
            <div className="col-xl-7 col-lg-6">
              <div className="gen-sgy-bnr-ctnt">
                <div className="gen-sgy-bnr-ttl mb-lg-4 mb-md-3 mb-2">
                  <h1 className="text-white mb-0">
                    Raising the Standard in Sports Injury Rehabilitation
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
              <div className="neuro-sci-bnr-img sportInjury">
                <Image
                  width={363}
                  height={290}
                  className="sportInjury"
                  src="/images/new-theme/Newpages/CampaignPages/sportInjury.webp"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
        {/* <AboutNeurosurgerySection handleModalOpenapp={handleModalOpenapp} /> */}
        <section className="about-neurosurgery side-space section-space">
          <h2 className="section-heading text-start d-md-none d-block">
            Advanced Solutions for Sports Injury
          </h2>
          <div className="row position-relative align-items-xl-start align-items-center">
            <div className="col-xxl-6 col-lg-5 col-12">
              <div className="about-neurosurgery-img">
                <Image
                  width={600}
                  height={485}
                  src="/images/new-theme/Newpages/CampaignPages/SportInjusryOverview.webp"
                  alt="About Neuroscience"
                />
              </div>
            </div>
            <div className="col-xxl-6 col-lg-7 col-12">
              <div className="about-neurosurgery-ctnt sportInjury">
                <h2 className="section-heading text-start d-md-block d-none">
                  Advanced Solutions for Sports Injury
                </h2>
                <p>
                  At Lokmanya Hospitals, we specialize in restoring movement,
                  strength, and confidence for athletes and active individuals
                  across Pune and beyond. From ligament tears and joint
                  instability to stress fractures and performance-impacting
                  injuries, our sports medicine and orthopedic teams deliver
                  targeted, evidence-based care tailored to your recovery goals.
                  With advanced imaging, minimally invasive techniques, and
                  rehabilitation programs built around biomechanics and
                  endurance, we are redefining how sports injuries are treated
                  and how recovery is achieved.
                </p>
                <p>
                  Whether you require arthroscopic surgery, post-injury
                  conditioning, or non-surgical intervention, our specialists
                  offer personalized care that accelerates healing and minimizes
                  downtime. Our mission is simple: to help you move better,
                  recover faster, and return to your sport stronger than before,
                  with clarity, control, and lasting resilience.
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
          <h2 className="section-heading">Sports Injury Services & Procedures</h2>
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
            title="Expert Sports Injury Care, One Consultation Away"
            subtitle="Schedule Your Consultation Today!"
            primaryText="Book an Appointment"
            // secondaryText="Book an appointment"
            imageUrl="/images/new-theme/Newpages/CampaignPages/DoctorWithFrame.webp"
            // imageUrl="/images/new-theme/Newpages/CampaignPages/expert-neurology-meet-img.png"
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
        <NeuroBookAppointment image={image2} doctorList={DoctorList}/>
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

export default SportsInjury;
