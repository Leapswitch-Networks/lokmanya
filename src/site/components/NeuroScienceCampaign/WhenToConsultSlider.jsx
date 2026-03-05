import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Imported images
import Seizures from "../../assets/images/Seizures.webp";
import ChronicHeadaches from "../../../assets/images/Chronic Headaches or Migraines.jpg";
import FrequentDizziness from "../../../assets/images/Frequent Dizziness or Balance Issues.jpg";
import UnexplainedNumbness from "../../../assets/images/Unexplained Numbness or Tingling.jpg";
import MemoryProblems from "../../../assets/images/Memory Problems or Confusion.jpg";
import SeizuresLoss from "../../../assets/images/Seizures or Loss of Consciousness.jpg";
import MuscleWeakness from "../../../assets/images/Muscle Weakness or Loss of Coordination.jpg";

// Internal data array
const consultData = [
  {
    img: "/images/new-theme/Newpages/CampaignPages/campaign-consult-img-1.png",
    title: "Chronic Headaches",
  },
  {
    img: "/images/new-theme/Newpages/CampaignPages/campaign-consult-img-5.png",
    title: "Neurological Symptoms",
  },
  {
    img: Seizures,
    title: "Seizures or Epilepsy",
  },
  {
    img: "/images/new-theme/Newpages/CampaignPages/campaign-consult-img-3.png",
    title: "Head Injuries",
  },
  {
    img: "/images/new-theme/Newpages/CampaignPages/campaign-consult-img-2.png",
    title: "Back or Neck Pain",
  },
  {
    img: ChronicHeadaches,
    title: "Chronic Headache or Migraine",
  },
  {
    img: FrequentDizziness,
    title: "Frequent Dizziness or Balance Issues",
  },
  {
    img: UnexplainedNumbness,
    title: "Unexplained Numbness or Tingling",
  },
  {
    img: MemoryProblems,
    title: "Memory Problems or Confusion",
  },
  {
    img: SeizuresLoss,
    title: "Seizures or Loss of Consciousness",
  },
  {
    img: MuscleWeakness,
    title: "Muscle Weakness or Loss of Coordination",
  },
];

const WhenToConsultSlider = () => {
  return (
    <section className="campaign-when-consult side-space section-space pt-0">
      <h2 className="section-heading">
        When To Consult A Neuroscience Expert?
      </h2>
      <Swiper
        slidesPerView={5}
        centeredSlides={true}
        keyboard={{ enabled: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: "#custom-prev",
          nextEl: "#custom-next",
        }}
        spaceBetween={0}
        breakpoints={{
          0: { slidesPerView: 1 },
          320: { slidesPerView: 2.5, spaceBetween: 10 },
          550: { slidesPerView: 2.5, spaceBetween: 10 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
          1200: { slidesPerView: 5 },
        }}
        modules={[Autoplay, Keyboard, Navigation, Pagination]}
      >
        {consultData.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="campaign-when-consult-card">
              <div className="campaign-when-consult-img">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={300}
                  height={200}
                  className="img-fluid"
                />
              </div>
              {item.title && (
                <p className="mb-0 text-center">{item.title}</p>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default WhenToConsultSlider;
