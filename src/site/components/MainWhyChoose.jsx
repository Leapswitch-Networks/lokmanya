import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Navigation } from "swiper/modules";
import "swiper/css";

import WhyChoseIco1 from "../assets/images/icons/talent.svg";
import WhyChoseIco2 from "../assets/images/icons/technology.svg";
import WhyChoseIco3 from "../assets/images/icons/infrastructure.svg";
import WhyChoseIco4 from "../assets/images/icons/heart-plus.svg";

import ArrowLeft from "../assets/images/icons/Arrow-left-blu.svg";
import ArrowRight from "../assets/images/icons/Arrow-right-blu.svg";
import Image from "next/image";
const WHY_CARDS = [
  {
    title: "Trusted Team of World-Class Healthcare Professional",
    icon: WhyChoseIco1,
    className: "card-1",
  },
  {
    title: "Innovative Technology for Enhanced Treatment Outcomes",
    icon: WhyChoseIco2,
    className: "card-2",
  },
  {
    title: "State-of-the-Art Facilities for World-Class Care",
    icon: WhyChoseIco3,
    className: "card-3",
  },
  {
    title: "A Legacy of Trust and Excellence in Healthcare",
    icon: WhyChoseIco4,
    className: "card-4",
  },
];

const MainWhyChoose = () => {
  return (
    <>
      {/* Desktop Section */}
      <section className="why-choose d-none d-lg-block">
        <div className="why-choose-inner side-space">
          <h2 className="section-heading text-white">Why Choose Lokmanya Hospitals</h2>

          <div className="row why-choose-row">
            <div className="col-md-4">
              {WHY_CARDS.slice(0, 2).map((card, index) => (
                <div key={index} className={`why-choose-card ${card.className}`}>
                  <Image height={40} width={40} src={card.icon.src} alt="why choose icon" />
                  <h4 className="text-center">{card.title}</h4>
                </div>
              ))}
            </div>

            <div className="col-md-4">
              <div className="main-img">
                <Image height={452} width={418}
                  src="/images/why-choose-img-png.webp"
                  alt="why choose main"
                />
              </div>
            </div>

            <div className="col-md-4">
              {WHY_CARDS.slice(2).map((card, index) => (
                <div key={index} className={`why-choose-card ${card.className}`}>
                  <Image height={40} width={40} src={card.icon.src} alt="why choose icon" />
                  <h4 className="text-center">{card.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Section */}
      <section className="whyChooseMobile why-choose side-space section-space d-lg-none">
        <h2 className="section-heading text-white">Why Choose Lokmanya Hospitals</h2>
        <div className="main-img">
          <Image height={250} width={232} src="/images/why-choose-img-png.png" alt="why choose main" />
        </div>
        <div className="position-relative">
          <div className="swiper-btn-prev" id="custom-prev">
            <Image height={13} width={15} loading="lazy" src={ArrowLeft.src} alt="arrow-left" />
          </div>
          <div className="swiper-btn-next" id="custom-next">
            <Image height={13} width={15} loading="lazy" src={ArrowRight.src} alt="arrow-right" />
          </div>

          <Swiper
            slidesPerView={2}
            keyboard={{ enabled: true }}
            autoplay={false}
            loop={true}
            pagination={{ clickable: true }}
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
              550: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
              },
            }}
            modules={[Autoplay, Keyboard, Navigation]}
          >
            {WHY_CARDS.map((card, index) => (
              <SwiperSlide key={index}>
                <div className="whyMobileCard">
                  <Image height={52} width={52} src={card.icon.src} alt="why choose icon" />
                  <h4 className="mt-2">{card.title}</h4>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default MainWhyChoose;
