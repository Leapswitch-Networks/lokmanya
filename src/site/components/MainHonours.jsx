import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Pagination, Navigation } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Image imports
import ArrowLeft from "../assets/images/icons/Arrow-left-blu.svg";
import ArrowRight from "../assets/images/icons/Arrow-right-blu.svg";
import HonoursImg1 from "../assets/images/awards1.webp";
import HonoursImg2 from "../assets/images/awards2.webp";
import HonoursImg3 from "../assets/images/awards3.webp";
import HonoursImg4 from "../assets/images/awards4.webp";
import HonoursImg5 from "../assets/images/awards5.webp";
import HonoursImg6 from "../assets/images/Centre of excellence in joint replacement 2024.webp";
import HonoursImg7 from "../assets/images/awards7.webp";
import Image from "next/image";

const honoursData = [
  {
    id: 1,
    img: HonoursImg7,
    title: "MAHA Brands of Maharashtra of the year 2025",
    subTitle: "Sakal Group",
  },
  {
    id: 2,
    img: HonoursImg1,
    title: "Best Orthopaedics Hospitals of the year 2024",
    subTitle: "Navbharat Times",
  },
  {
    id: 3,
    img: HonoursImg5,
    title: "India’s 5 Most Trusted Healthcare Brands IN 2024",
    subTitle: "Insight Care Magazine",
  },
  {
    id: 4,
    img: HonoursImg6,
    title: "Centre of excellence in joint replacement 2024",
    subTitle: "Navbharat Times",
  },
  {
    id: 5,
    img: HonoursImg4,
    title: "India’s Most Admirable Brand",
    subTitle: "The Brand Story",
  },
  {
    id: 6,
    img: HonoursImg2,
    title: "Icons of the health",
    subTitle: "Maharashtra Times",
  },
  {
    id: 7,
    img: HonoursImg3,
    title: "Single Super Speciality Hospitals of the year (Orthopaedic)",
    subTitle: "Medgate Today",
  },
];

const MainHonours = () => {
  return (
    <section className="honourssection side-space">
      <h2 className="section-heading">Honours and Recognition</h2>
      <div className="honours-slider">
        <div className="swiper-btn-prev" id="honours-prev">
          <Image height={15} width={15} src={ArrowLeft.src} alt="arrow-left" />
        </div>
        <div className="swiper-btn-next" id="honours-next">
          <Image height={15} width={15} src={ArrowRight.src} alt="arrow-right" />
        </div>

        <Swiper
          spaceBetween={20}
          keyboard={{ enabled: true }}
          pagination={{ clickable: true }}
          loop={true}
          autoplay={false}
          navigation={{
            prevEl: "#honours-prev",
            nextEl: "#honours-next",
          }}
          modules={[Autoplay, Keyboard, Pagination, Navigation]}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            520: { slidesPerView: 2, spaceBetween: 10 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
          }}
        >
          {honoursData.map((honour) => (
            <SwiperSlide key={honour.id}>
              <div className={`honours-bg honours-bg-${honour.id}`}>
                <Image height={145} width={145}
                  className="honours-img"
                  src={honour.img.src}
                  alt={`honour-${honour.id}`}
                />
                <div className="honours-content">
                  <h5
                    className="card-ttl"
                    dangerouslySetInnerHTML={{ __html: honour.title }}
                  ></h5>
                  <p className="honors-date">{honour.subTitle}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default MainHonours;
