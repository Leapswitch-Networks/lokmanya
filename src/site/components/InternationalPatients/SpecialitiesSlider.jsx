import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Navigation } from "swiper/modules";
import "swiper/css";

import ArrowLeft from "../../assets/images/icons/Arrow-left-blu.svg";
import ArrowRight from "../../assets/images/icons/Arrow-right-blu.svg";

// Specialty icons (replace these with actual imports from your asset files)
import Cardiology from "../../assets/images/icons/SpecialitiesIcons/Cardiology.svg";
import Physiotherapy from "../../assets/images/icons/SpecialitiesIcons/Physiotherapy.svg";
import CardiacSurgery from "../../assets/images/icons/SpecialitiesIcons/CardiacSurgery.svg";
import Neurology from "../../assets/images/icons/SpecialitiesIcons/Neurology.svg";
import Orthopaedics from "../../assets/images/icons/SpecialitiesIcons/Orthopaedics.svg";
import Gynaecology from "../../assets/images/icons/SpecialitiesIcons/Gyncology.svg";
import Gastroenterology from "../../assets/images/icons/SpecialitiesIcons/Gastero.svg";
import SpineBack from "../../assets/images/icons/SpecialitiesIcons/SpineBack.svg";
import Jhk from "../../assets/images/icons/SpecialitiesIcons/JnK.svg";
import GeneralSurgery from "../../assets/images/icons/SpecialitiesIcons/GeneralSurgery.svg";
import Internal from "../../assets/images/icons/SpecialitiesIcons/InternalMed.svg";
import NeuroSurgery from "../../assets/images/icons/SpecialitiesIcons/NeuroSurgery.svg";
import Dental from "../../assets/images/icons/SpecialitiesIcons/Dental.svg";
import Opthalmology from "../../assets/images/icons/SpecialitiesIcons/Opthalmology.svg";
import Urology from "../../assets/images/icons/SpecialitiesIcons/Urology.svg";
import Dermatology from "../../assets/images/icons/SpecialitiesIcons/Dermatology.svg";
import Dietetics from "../../assets/images/icons/SpecialitiesIcons/Dietatics.svg";
import Tcc from "../../assets/images/icons/SpecialitiesIcons/Trauma-2.svg";
import { SpecialityCard } from "..";

// Sample SpecialityCard component
// const SpecialityCard = ({ specialty }) => (
//   <div className="speciality-card text-center">
//     <img
//       src={specialty.icon?.src || ""}
//       alt={specialty.name}
//       className="mx-auto mb-2"
//     />
//     <p>{specialty.name}</p>
//   </div>
// );

// Data array
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

const SpecialitiesSlider = () => {
  return (
    <section className="patients-specialities specialities side-space section-below-space">
      <h2 className="section-heading">Advanced Specialties for International Patients</h2>

      <div className="position-relative">
        <div className="swiper-btn-prev" id="custom-prev">
          <img src={ArrowLeft.src} alt="arrow-left" />
        </div>
        <div className="swiper-btn-next" id="custom-next">
          <img src={ArrowRight.src} alt="arrow-right" />
        </div>

                  <Swiper
            slidesPerView={6}
            keyboard={{
              enabled: true,
            }}
            autoplay={false}
            loop={true}
            spaceBetween={10}
            navigation={{
              prevEl: "#custom-prev",
              nextEl: "#custom-next",
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              320: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              550: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
              1200: {
                slidesPerView: 5,
              },
            }}
            modules={[Autoplay, Keyboard, Navigation]}
          >
          {SPECIALITIES.map((specialty, index) => (
            <SwiperSlide key={index}>
              <Link href={specialty.slug}>
                <SpecialityCard specialty={specialty} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SpecialitiesSlider;
