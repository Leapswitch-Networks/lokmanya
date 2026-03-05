import Image from "next/image";
import React from "react";

const defaultServicesData = [
  { title: "Appendectomy", image: "Appendectomy.webp" },
  { title: "Hernia Repair", image: "HerniaRepair.webp" },
  { title: "Gallbladder Surgery", image: "GallbladderSurgery.webp" },
  { title: "Bowel Resection", image: "BowelResection.webp" },
  { title: "Thyroid Surgery", image: "ThyroidSurgery.webp" },
  { title: "Breast Surgery", image: "BreastSurgery.webp" },
  { title: "Laparoscopic Surgery", image: "LaparoscopicSurgery.webp" },
  { title: "Emergency Surgery", image: "EmergencySurgery.webp" },
];

const ServicesAndProceduresSection = ({ data = defaultServicesData }) => {
  return (
    <section id="services" className="gen-our-srvc side-space section-space">
      <h2 className="section-heading mb-md-3 mb-2">
        Our Services & Procedures
      </h2>
      <div className="row g-md-3 g-2">
        {data.map(({ title, image }, index) => (
          <div className="col-lg-3 col-md-4 col-6" key={index}>
            <div className="locations-card">
              <Image width={675} height={180}
                src={`/images/new-theme/Newpages/CampaignPages/${image}`}
                alt={title}
              />
              <div className="locations-card-body">
                <p className="card-title text-center">{title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesAndProceduresSection;
