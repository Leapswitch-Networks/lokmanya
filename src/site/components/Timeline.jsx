import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ArrowLeft from "../../site/assets/images/icons/Arrow-left-blu.svg";
import ArrowRight from "../../site/assets/images/icons/Arrow-right-blu.svg";

// Image Imports
import seeds1 from "@/site/assets/images/seeds1.webp";
import seeds2 from "@/site/assets/images/seeds2.png";
import seeds3 from "@/site/assets/images/seeds3.webp";
import seeds4 from "@/site/assets/images/seeds4.png";
import seeds5 from "@/site/assets/images/seeds5.png";
import seeds6 from "@/site/assets/images/seeds6.jpg";
import seeds7 from "@/site/assets/images/seeds7.webp";
import seeds8 from "@/site/assets/images/seeds8.png";
import Image from "next/image";

// Slide data
const storySlides = [
  {
    id: 1,
    img: seeds1,
    date: "1972",
    description: "Lokmanya Hospital inaugurated at Chinchwad unit.",
  },
  {
    id: 2,
    img: seeds2,
    date: "1974",
    description: "Inauguration of the new Lokmanya Hospital at the Chinchwad unit.",
  },
  {
    id: 3,
    img: seeds3,
    date: "1993",
    description: "Lokmanya Hospital commissioned at Nigdi unit.",
  },
  {
    id: 4,
    img: seeds4,
    date: "1998",
    description: "Performed the 1st microscopic spine surgery in Maharashtra at Lokmanya Hospital, Nigdi.",
  },
  {
    id: 5,
    img: seeds5,
    date: "2006",
    description: "Lokmanya Hospital commissioned at Kolhapur unit",
  },
  {
    id: 6,
    img: seeds6,
    date: "2014",
    description: "Lokmanya Hospitals for Joint Replacement & Arthroscopy commissioned at Mitra Mandal, Pune.",
  },
  {
    id: 7,
    img: seeds7,
    date: "2016",
    description: "1st Robotic Joint Replacement Surgery in India at Lokmanya Hospitals, Pune.",
  },
  {
    id: 8,
    img: seeds8,
    date: "2020",
    description: "Lokmanya Hospitals for LHSS at S B Road.",
  },
];

const Timeline = () => {
  return (
    <section className="storysection side-space section-space">
      <h2 className="section-heading text-white">
        Our Story Grew From Seeds of Compassion
      </h2>

      <div className="position-relative">
        <div className="swiper-btn-prev" id="custom-prev">
          <Image width={15} height={15} src={ArrowLeft.src} alt="arrow-left" />
        </div>
        <div className="swiper-btn-next" id="custom-next">
          <Image width={15} height={15} src={ArrowRight.src} alt="arrow-right" />
        </div>

        <Swiper
          slidesPerView={5}
          spaceBetween={10}
          loop={false}
          keyboard={{ enabled: true }}
          navigation={{
            prevEl: "#custom-prev",
            nextEl: "#custom-next",
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            550: { slidesPerView: 1 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1200: { slidesPerView: 5 },
          }}
          modules={[Keyboard, Navigation]}
        >
          {storySlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="timeline-card">
                <div className="patient-service-img">
                  <a
                    href={slide.img.src}
                    data-fancybox="fancyamenities"
                    data-caption={`${slide.date}, ${slide.description}`}
                  >
                    <Image width={205} height={120}
                      src={slide.img.src}
                      alt={`history-img-${slide.id}`}
                    />
                  </a>
                </div>
                <div className="spineCarouselText">
                  <h4 className="text-center">{slide.date}</h4>
                  <p className="mb-0 text-center">{slide.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Timeline;
