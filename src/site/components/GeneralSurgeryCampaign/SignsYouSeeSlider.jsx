import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Keyboard, Pagination, Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";

const SignsYouSeeSlider = () => {
  const imageBasePath = "/images/new-theme/Newpages/CampaignPages/";

  const consultData = [
    { img: "AbdominalPain.webp", title: "Abdominal Pain" },
    { img: "Swelling.webp", title: "Swelling or Lump" },
    { img: "DigestiveIssues.webp", title: "Digestive Issues" },
    {
      img: "UnexplainedWeightLoss.webp",
      title: "Unexplained Weight Loss or Gain",
    },
    { img: "TraumaInjury.webp", title: "Trauma or Injury" },
    { img: "TraumaInjury.webp", title: "Infection" },
  ];

  return (
    <section className="signs-you-see side-space section-space">
      <h2 className="section-heading mb-md-3 mb-2 text-white">
        Signs You Should See a Doctor for General Surgery
      </h2>
      <div className="signs-you-see-slider">
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
          spaceBetween={20}
          navigation={{
            prevEl: "#custom-prev",
            nextEl: "#custom-next",
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            320: { slidesPerView: 2, spaceBetween: 10, centeredSlides: false },
            550: { slidesPerView: 2, spaceBetween: 10 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1200: { slidesPerView: 5 },
          }}
          modules={[Autoplay, Keyboard, Navigation, Pagination]}
        >
          {consultData.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="signs-you-see-card">
                <div className="signs-you-see-img">
                  <Image width={230} height={185}
                    src={`/images/new-theme/Newpages/CampaignPages/${item.img}`}
                    alt={item.title}
                  />
                </div>
                {item.title && (
                  <p className="mb-0 mt-1 text-center">{item.title}</p>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SignsYouSeeSlider;
