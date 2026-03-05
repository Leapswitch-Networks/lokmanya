import React from "react";
import BlueStar from "../../assets/images/icons/CampaignPageicons/blue-str";
import { ButtonPrimary } from "..";
import Counter from "../Counter/Counter";
import Image from "next/image";

const WhyChooseLokSection = ({
  image = "gen-why-choose-docimg.png",
  counters = [
    { label: "Years of Experience", value: 50, usePlus: true },
    { label: "Successful Surgeries", value: 2000, usePlus: true },
    { label: "Satisfied Patients", value: 5000, usePlus: true },
  ],
  onBookAppointment,
}) => {
  const reasons = [
    "Comprehensive Surgical Treatments",
    "Minimally Invasive Procedures",
    "Robotic-Assisted Surgeries",
    "Patient-Centric Rehabilitation",
    "Emerging Surgical Technologies",
    "Surgical Outcomes Analysis",
    "Ethical Considerations in Surgery",
  ];

  return (
    <section id="whyus" className="gen-why-choose side-space section-space pt-0">
      <h2 className="section-heading mb-md-3 mb-2 text-start d-md-none d-block">
        Why Choose Lokmanya Hospitals for General Surgery?
      </h2>
      <div className="row align-items-end">
        <div className="col-md-5 order-lg-1 order-2">
          <h2 className="section-heading mb-md-3 mb-2 text-start d-md-block d-none">
            Why Choose Lokmanya Hospitals for General Surgery?
          </h2>
          <div className="gen-why-ctnt d-flex flex-column gap-lg-4 gap-md-3 gap-2 mb-md-0 mb-3 align-items-md-start align-items-center">
            {reasons.map((reason, index) => (
              <div className="d-flex gap-2 align-items-center" key={index}>
                <BlueStar />
                <p className="mb-0">{reason}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-4 order-lg-2 order-1">
          <div className="gen-why-img">
            <Image width={395} height={560}
              className="w-100 h-100"
              src={`/images/new-theme/Newpages/CampaignPages/${image}`}
              alt=""
            />
            <div className="gen-why-book-btn">
              <ButtonPrimary onClick={() => onBookAppointment?.("Book Appointment")}>
                Book An Appointment
              </ButtonPrimary>
            </div>
          </div>
        </div>

        <div className="col-md-3 order-lg-3 order-3">
          <div className="row g-md-3 g-2 px-lg-4 px-md-2">
            {counters.map((counter, index) => (
              <div className="col-lg-12 col-md-12 col-sm-4 col-4" key={index}>
                <div className="gen-why-counter-card">
                  <Counter
                    targetValue={counter.value}
                    duration={3000}
                    usePlusSign={counter.usePlus}
                    className="gen-why-counter-numb txt-blue"
                  />
                  <p className="mb-0">{counter.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseLokSection;
