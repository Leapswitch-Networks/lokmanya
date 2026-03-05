import React, { useEffect } from "react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { useState } from "react";
import AppointmentModal from "@/site/components/AppointmentModal";
import Aboutbanner2 from "@/site/assets/images/OurBranchBnrImg.png";
import OverviewImg from "@/site/assets/images/aboutus-overview.webp";
import VisionIcon from "@/site/assets/images/Mision.svg";
import MisionIcon from "@/site/assets/images/ourmission.svg";
import ValuesIcon from "@/site/assets/images/ourvalues.svg";
import { CommonBanner } from "@/site/components";
import LokmanyaNetwork from "../site/components/LokmanyaNetworkSection/LokmanyaNetwork";
import Head from "next/head";
import Counter from "@/site/components/Counter/Counter";
import MainHonours from "@/site/components/MainHonours";
import Timeline from "@/site/components/Timeline";
import LeadershipTeam from "@/site/components/LeadershipTeam";
import Image from "next/image";


const aboutData = [
  {
    icon: VisionIcon,
    title: "Our Vision",
    text: "To be among the global leaders in humanity’s war against pain and disability.",
  },
  {
    icon: MisionIcon,
    title: "Our Mission",
    text: "To Spreads smiles of happy mobility by leveraging the power of technology and a soothing touch of personal care.",
  },

  {
    icon: ValuesIcon,
    title: "Our Values",
    text: "Integrity, Commitment, Innovation, Sensitivity.",
  },
];

const AboutUs = () => {
  useEffect(() => {
    Fancybox.bind("[data-fancybox]", {
      infinite: true,
      buttons: ["zoom", "slideShow", "thumbs", "close"],
      Image: {
        zoom: true,
      },
      Thumbs: {
        autoStart: true,
      },
    });

    return () => {
      Fancybox.destroy();
    };
  }, []);


  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => setIsModalOpen(false);

  return (
    <>
      <Head>
        <title>Trusted Multi-Speciality Healthcare Provider In Pune</title>
        <meta
          name="description"
          content="Lokmanya Hospital, Pune's trusted multi-speciality healthcare provider. Expert doctors, cutting-edge treatments, and patient-centric care."
        />
      </Head>
      <CommonBanner bgColor={"#EFEDD1"} bgImage={Aboutbanner2.src}>
        <h1 className="page-heading text-white">ABOUT LOKMANYA HOSPITALS</h1>
      </CommonBanner>
      <section className="overview side-space section-space">
        <div className="row align-items-center">
          <div className="col-lg-5 col-md-6 pe-lg-4 pe-md-3 order-md-1 order-2">
            <div className="overview-img-box">
              <div className="overview-counter counter1">
                <div className="overview-counter1">
                  <Counter
                    targetValue="50"
                    duration={3000}
                    usePlusSign={true}
                    className="counter-numb txt-blue"
                  />
                  <p className="mb-0 txt-blue">Years Of Experience</p>
                </div>
              </div>
              <Image width={485} height={446} className="overview-img" src={OverviewImg.src} alt="OverView" />
              <div className="overview-counter counter2">
                <div className="overview-counter2">
                  <Counter
                    targetValue="30"
                    duration={3000}
                    usePlusSign={true}
                    className="counter-numb txt-yellow"
                  />
                  <p className="mb-0 txt-yellow">Specialties</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7 col-md-6 order-md-2 order-1 mb-md-0 mb-3">
            <h2 className="text-start section-heading">Overview</h2>
            {/* <p>
            Lokmanya Hospital is a renowned healthcare facility in Pune, offering orthopedic and multi-
specialty treatments with advanced technology. With over 50 years of experience in Super
Specialty Orthopedic Care, Lokmanya Hospitals has served over 1,50,000 patients worldwide.
            </p> */}
            <p>
              Lokmanya Hospitals is a leading multispecialty healthcare facility
              in Pune, committed to providing world-class medical care with a
              patient-centric approach. Renowned for its expertise in
              orthopaedic treatments, Lokmanya also excels in a wide range of
              specialties, making it a trusted name in healthcare.
            </p>
            <p>
              With over 50 years of experience in healthcare , Lokmanya Hospitals
              has pioneered numerous advancements. Our highly skilled team of
              doctors and surgeons is recognized for clinical excellence and
              innovation in treating complex multi-speciality conditions. As a
              leader in the healthcare sector, Lokmanya Hospitals has
              successfully treated over 1,50,000 patients from around the world,
              earning a reputation for delivering exceptional outcomes and
              transforming lives.
            </p>
            <p className="mb-0">
              Lokmanya Hospitals offers a comprehensive range of multispecialty
              services, including cardiology, neurology, gastroenterology,
              urology, and internal medicine, among others. Our
              multidisciplinary team collaborates to provide integrated care,
              ensuring that patients receive accurate diagnosis and holistic
              treatments tailored to their unique needs.
            </p>
          </div>
        </div>
      </section>
      <LeadershipTeam />
      <AppointmentModal
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
      />
      <section className="aboutsection side-space section-space pt-0">
        <div className="row  row-cols-1 row-cols-sm-2 row-cols-lg-3 g-md-4 g-3">
          {aboutData.map((item, index) => (
            <div className="col custom-card" key={index}>
              <div className={`custom-card-inner card-bg-${index + 1}`}>
                <Image width={47} height={47}
                  className="mb-md-3 mb-2"
                  src={item.icon.src}
                  alt={item.title}
                />
                <h5 className="card-ttl">{item.title}</h5>
                <p className="mb-0">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Timeline />
      <div className="section-space pb-0">
        <MainHonours />
      </div>
      <LokmanyaNetwork />
    </>
  );
};

export default AboutUs;
