// components/SpecialitiesSection.js
import React from "react";
import Link from "next/link";

import Cardiology from "../assets/images/icons/SpecialitiesIcons/Cardiology.svg";
import Physiotherapy from "../assets/images/icons/SpecialitiesIcons/Physiotherapy.svg";
import CardiacSurgery from "../assets/images/icons/SpecialitiesIcons/CardiacSurgery.svg";
import Neurology from "../assets/images/icons/SpecialitiesIcons/Neurology.svg";
import Orthopaedics from "../assets/images/icons/SpecialitiesIcons/Orthopaedics.svg";
import Gynaecology from "../assets/images/icons/SpecialitiesIcons/Gyncology.svg";
import Gastroenterology from "../assets/images/icons/SpecialitiesIcons/Gastero.svg";
import SpineBack from "../assets/images/icons/SpecialitiesIcons/SpineBack.svg";
import Jhk from "../assets/images/icons/SpecialitiesIcons/JnK.svg";
import GeneralSurgery from "../assets/images/icons/SpecialitiesIcons/GeneralSurgery.svg";
import Internal from "../assets/images/icons/SpecialitiesIcons/InternalMed.svg";
import NeuroSurgery from "../assets/images/icons/SpecialitiesIcons/NeuroSurgery.svg";
import Dental from "../assets/images/icons/SpecialitiesIcons/Dental.svg";
import Opthalmology from "../assets/images/icons/SpecialitiesIcons/Opthalmology.svg";
import Urology from "../assets/images/icons/SpecialitiesIcons/Urology.svg";
import Dermatology from "../assets/images/icons/SpecialitiesIcons/Dermatology.svg";
import Dietetics from "../assets/images/icons/SpecialitiesIcons/Dietatics.svg";
import Tcc from "../assets/images/icons/SpecialitiesIcons/Trauma-2.svg";
import { SpecialityCard } from ".";

const SPECIALITIES = [
  { name: "Orthopedics", icon: Orthopaedics, slug: "/orthopedics" },
  { name: "Joint Replacement", icon: Jhk, slug: "/joint-hip-and-knee-replacement" },
  { name: "Spine", icon: SpineBack, slug: "/spine" },
  { name: "General Surgery", icon: GeneralSurgery, slug: "/general-surgery" },
  { name: "Internal Medicine", icon: Internal, slug: "/internal-medicine" },
  { name: "Trauma & Critical Care", icon: Tcc, slug: "/trauma-and-critical-care" },
  { name: "Gastroenterology", icon: Gastroenterology, slug: "/gastroenterology" },
  { name: "Neurology", icon: Neurology, slug: "/neurology" },
  { name: "Neuro Surgery", icon: NeuroSurgery, slug: "/neurosurgery" },
  { name: "Cardiology", icon: Cardiology, slug: "/cardiology" },
  { name: "Cardiac Surgery", icon: CardiacSurgery, slug: "/cardiac-surgery" },
  { name: "Gynecology", icon: Gynaecology, slug: "/gynecology" },
  { name: "Urology", icon: Urology, slug: "/urology" },
  { name: "Dietetics", icon: Dietetics, slug: "/dietetics" },
  { name: "Physiotherapy", icon: Physiotherapy, slug: "/physiotherapy" },
  { name: "Dental", icon: Dental, slug: "/dental" },
  { name: "Ophthalmology", icon: Opthalmology, slug: "/ophthalmology" },
  { name: "Dermatology", icon: Dermatology, slug: "/dermatology" },
];

const MainSpecialities = () => {
  return (
    <section id="healthcare-specialities" className="specialities side-space">
      <h1 className="section-heading">Best Multispeciality Hospital in Pune for Comprehensive Healthcare</h1>
      <div className="row common-gutter">
        {SPECIALITIES.map((specialty, index) => (
          <div className="col-6 col-md-4 col-lg-3 col-xl-2" key={index}>
            <Link href={specialty.slug}>
              <SpecialityCard specialty={specialty} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MainSpecialities;        
