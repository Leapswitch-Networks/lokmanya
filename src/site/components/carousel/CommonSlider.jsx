import React from "react";
import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Keyboard, Pagination, Navigation, Autoplay } from "swiper/modules";

// import ArrowLeft from "../../assets/images/arrow-left.svg";
// import ArrowRight from "../../assets/images/arrow-right.svg";

import ArrowLeft from "../../assets/images/icons/Arrow-left-blu.svg";
import ArrowRight from "../../assets/images/icons/Arrow-right-blu.svg";

const defaultBreakpoints = {
};

const CommonSlider = ({
  children,
  slidesPerView = 1,
  spaceBetween = 30,
  loop = true,
  autoplay = false,
  breakpoints = defaultBreakpoints,
  modules = {}
}) => (
  <div className="common-slider-parent position-relative">
    <div className="slider-btn-prev" id="prev" aria-label="Previous">
      <img src={ArrowLeft.src} alt="arrow-left" />
    </div>
    <div className="slider-btn-next" id="next" aria-label="Next">
      <img src={ArrowRight.src} alt="arrow-right" />
    </div>
    <Swiper
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
      keyboard={{ enabled: true }}
      pagination={{ clickable: true }}
      autoplay={autoplay}
      loop={loop}
      breakpoints={{
        ...defaultBreakpoints,
        ...breakpoints,
        1024: { slidesPerView, spaceBetween }, // Ensure it respects custom props
      }}
      navigation={{
        prevEl: "#prev",
        nextEl: "#next",
      }}
      modules={modules}
    >
      {children}
    </Swiper>
  </div>
);

export default CommonSlider;
