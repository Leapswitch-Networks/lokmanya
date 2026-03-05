import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import ArrowLeft from "../assets/images/icons/Arrow-left-blu.svg";
import ArrowRight from "../assets/images/icons/Arrow-right-blu.svg";

const worldFacData = [
  {
    img: "/images/new-theme/Newpages/HospitalNearme/wrld-cls-1.webp",
    title: "Advanced operation theaters",
  },
  {
    img: "/images/new-theme/Newpages/HospitalNearme/wrld-cls-2.webp",
    title: "Comfortable inpatient rooms",
  },
  {
    img: "/images/new-theme/Newpages/HospitalNearme/wrld-cls-3.webp",
    title: "Modern diagnostic labs",
  },
  {
    img: "/images/new-theme/Newpages/HospitalNearme/wrld-cls-1.webp",
    title: "Advanced operation theaters",
  },
  {
    img: "/images/new-theme/Newpages/HospitalNearme/wrld-cls-2.webp",
    title: "Comfortable inpatient rooms",
  },
];

const WorldFacilitiesSection = () => {
  return (
    <section className="hospital-wrld-facility side-space section-space">
      <h2 className="page-heading text-center mb-md-3 mb-2">World-Class Facilities</h2>
      <div className="position-relative">
        {/* Navigation Buttons */}
        <div className="swiper-btn-prev" id="wrld-prev">
          <img src={ArrowLeft.src} alt="previous" />
        </div>
        <div className="swiper-btn-next" id="wrld-next">
          <img src={ArrowRight.src} alt="next" />
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Autoplay, Keyboard, Navigation, Pagination]}
          spaceBetween={25}
          slidesPerView={4}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: "#wrld-prev",
            nextEl: "#wrld-next",
          }}
          pagination={{ clickable: true }}
          keyboard={{ enabled: true }}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 10 },
            550: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
          }}
        >
          {worldFacData.map((data, index) => (
            <SwiperSlide key={index}>
              <div className="hospital-wrld-facility-card h-100">
                <div className="hospital-wrld-facility-card-img">
                  <img src={data.img} alt={data.title} className="w-100 h-100" />
                </div>
                <div className="hospital-wrld-facility-card-content">
                  <h4 className="mb-0 text-capitalize">{data.title}</h4>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default WorldFacilitiesSection;
