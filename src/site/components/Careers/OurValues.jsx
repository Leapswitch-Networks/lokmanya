import React from "react";
import MisionIcon from "@/site/assets/images/ClinicalExcellence.svg";
import PatientIcon from "@/site/assets/images/EthicalPractices.svg";
import EthicalIcon from "@/site/assets/images/Integrity.svg";
import IntegrityIcon from "@/site/assets/images/PatientCentricity.svg";
import Image from "next/image";

const OurValues = () => {
  const aboutData = [
    {
      icon: MisionIcon,
      title: "Clinical Excellence",
      text: "Our commitment to delivering the highest quality of healthcare is represented by our team of highly skilled medical practitioners.",
    },
    {
      icon: PatientIcon,
      title: "Patient Centricity",
      text: "Delivering the best quality of healthcare is incomplete without putting patients at the center, while addressing patients' the needs",
    },
    {
      icon: EthicalIcon,
      title: "Ethical Practices",
      text: "Gaining the trust of our patients involves being completely honest with them and also maintaining their information as confidential.",
    },
    {
      icon: IntegrityIcon,
      title: "Integrity and Accountability",
      text: "We uphold the highest standards of ethical practice and take responsibility for the care we provide.",
    },
  ];

  return (
    <section className="our-values section-space side-space">
      <h2 className="section-heading">Our Values</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-md-4 g-3">
        {aboutData.map((item, index) => (
          <div className="col custom-card" key={index}>
            <div className={`custom-card-inner card-bg-${index + 1}`}>
              <Image width={48} height={48} className="mb-md-3 mb-2" src={item.icon.src} alt={item.title} />
              <h5 className="card-ttl">{item.title}</h5>
              <p className="mb-0">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurValues;
