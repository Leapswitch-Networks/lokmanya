import React from "react";
import PersonPlus from "../assets/images/New-theme/icons/personplus.svg";

const benefitsData = [
  {
    icon: PersonPlus,
    title: "Expert Team of Cardiologists",
    description:
      "At Lokmanya Hospital, our team of highly experienced and skilled cardiologists in Pune specializes in diagnosing and treating a wide range of heart conditions. From preventive care to complex cardiac surgeries, our experts ensure accurate diagnosis and treatment. We use a multidisciplinary approach, combining advanced techniques and expertise to deliver optimal heart health outcomes.",
  },
  {
    icon: PersonPlus,
    title: "Advanced Diagnostic and Treatment Technology",
    description:
      "We utilize cutting-edge diagnostic tools like ECG, echocardiograms, stress tests, and advanced imaging techniques to assess heart health accurately. Our treatments incorporate the latest advancements, including minimally invasive procedures, catheter-based interventions, and robotic-assisted surgeries, ensuring quicker recovery and superior care.",
  },
  {
    icon: PersonPlus,
    title: "Comprehensive Cardiac Care Under One Roof",
    description:
      "Lokmanya Hospital offers a complete range of cardiology services, from early detection and diagnosis to advanced treatments and post-care. Our top-notch facilities, including dedicated cardiac units, catheterization labs, and intensive care units, provide patients with seamless care throughout their journey.",
  },
  {
    icon: PersonPlus,
    title: "Customized Treatment Plans",
    description:
      "Our cardiologists in Pune recognize that every patient's heart condition is unique. We develop personalized treatment plans that address individual needs, combining medication, lifestyle changes, and surgical options for the best results. This tailored approach helps achieve better outcomes and enhances long-term heart health.",
  },
  {
    icon: PersonPlus,
    title: "Post-Treatment Cardiac Rehabilitation",
    description:
      "Rehabilitation is crucial to heart recovery, and Lokmanya Hospital provides comprehensive post-treatment care. Our expert rehabilitation team works closely with patients to improve heart function, strength, and overall health through supervised exercise programs, nutritional counseling, and stress management techniques.",
  },
  {
    icon: PersonPlus,
    title: "Affordable and Transparent Treatment Costs",
    description:
      "Lokmanya Hospital is dedicated to providing high-quality cardiology care at affordable prices. Our transparent pricing ensures that patients understand the cost of consultations, diagnostics, treatments, and rehabilitation. By offering competitive rates, we make exceptional cardiac care accessible to everyone in Pune.",
  },
];

const BenefitsSection = () => {
  return (
    <section className="hospital-choose-bnft side-space section-space">
      <h2 className="page-heading text-start text-md-center mb-md-3 mb-2">
        Your Health, Our Priority : Benefits Of Choosing Lokmanya Hospital
      </h2>
      <div className="row g-md-4 g-3">
        {benefitsData.map((benefit, index) => (
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12" key={index}>
            <div className="hospital-choose-bnft-card h-100">
              <div className="d-flex align-items-center gap-3 mb-2">
                <img src={benefit.icon.src} alt={`${benefit.title} icon`} />
                <h4 className="mb-0">{benefit.title}</h4>
              </div>
              <p className="mb-0">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BenefitsSection;
