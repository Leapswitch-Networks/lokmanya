import React from "react";
import { ButtonPrimary } from ".";
import Link from "next/link";
import Image from "next/image";

const achievementData = {
  heading: (
    <>
      50 Years of Treating Patients And <br />
      Activating Path Breaking Life <br />
      Saving Initiatives
    </>
  ),
  paragraphs: [
    "Lokmanya Hospitals is a prominent healthcare provider in Pune, specializing in orthopedic and multi-specialty treatments using advanced technology. With more than 50 years of experience in Healthcare, the hospital has successfully treated over 150,000 patients globally.",
    "Lokmanya Hospitals is a leading multispecialty healthcare facility in Pune, committed to providing world-class medical care with a patient-centric approach. Renowned for its expertise in orthopaedic treatments, Lokmanya also excels in a wide range of specialties, making it a trusted name in healthcare.",
  ],
  image: "/images/new-theme/YearsofLegacy.webp",
};

const MainAchievement = () => {
  const { heading, paragraphs, image } = achievementData;

  return (
    <section className="achievement side-space section-space">
      <div className="row">
        <div className="col-md-7 achieveLeft">
          <h2 className="section-heading">{heading}</h2>
          {paragraphs.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
          <div className="d-flex justify-content-md-start justify-content-center">
            <Link href="/about-us" className="button-primary" aria-label="About Us Page Link"><span aria-label="Read More">Read More</span></Link>
          </div>
        </div>
        <div className="col-md-5">
          <Image height={438} width={496} src={image} alt="achievement" className="img-fluid" />
        </div>
      </div>
    </section>
  );
};

export default MainAchievement;
