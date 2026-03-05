// components/EmployeeSpeaks.js

import { SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Pagination, Navigation } from "swiper/modules";
import dummyUser from "@/site/assets/images/careers/dummyUser.webp";
import QuoteMark from "@/site/assets/images/quote-mark-green.webp";
import CommonSlider from "@/site/components/carousel/CommonSlider";
import Image from "next/image";

const EMP_DATA = [
  {
    id: 1,
    desc: "As Manager of International Marketing, I invite you to join the Lokmanya Hospital family and experience the highest standards of healthcare. I am proud to work with an experienced team and introduce our state-of-the-art facility, cutting-edge technology, and treatments. Our team of renowned specialists is dedicated to delivering exceptional patient care. This opportunity helps me successfully promote the hospital's brand, values, and services to international audiences, fostering a strong reputation and credibility.",
    src: dummyUser,
    auther: "Sonali Satwekar",
    designation: "Manager – International Marketing",
  },
  {
    id: 2,
    desc: "I am privileged to be part of Lokmanya Hospitals as Assistant Manager in Branding and PR. Under the guidance of Mr. Swapnil Narake Sir, General Manager - Marketing, I've had the opportunity to contribute to impactful campaigns that enhance our brand presence and reflect our commitment to quality healthcare. I look forward to continuing this journey and contributing to the success of Lokmanya Hospitals.",
    src: dummyUser,
    auther: "Jai Patil",
    designation: "Assistant Manager - Branding",
  },
  {
    id: 3,
    desc: "I'm grateful to work at Lokmanya Hospitals under the guidance of Mr. Swapnil Sir and Mr. Lavkesh Sir. The work culture here is great—it gives me the energy, freedom, and passion to do my job well. It's a place where I can grow and feel motivated every day.",
    src: dummyUser,
    auther: "Dheeraj Desai",
    designation: "Assistant Manager – Digital",
  },
];

const breakpoints = {
  320: { slidesPerView: 1 },
  768: { slidesPerView: 2 },
};

const EmployeeSpeaks = () => {
  return (
    <div className="emp-speak section-space common-bg">
      <div className="emp-speak-inner side-space">
        <h2 className="section-heading text-white">Employee Speaks</h2>
        <CommonSlider
          breakpoints={breakpoints}
          slidesPerView={2}
          spaceBetween={40}
          modules={[Autoplay, Keyboard, Pagination, Navigation]}
        >
          {EMP_DATA.map((emp) => (
            <SwiperSlide key={emp.id}>
              <div className="emp-speak-card">
                <Image width={35} height={35} src={QuoteMark.src} alt="quotation" className="quote-mark" />
                <div className="d-flex flex-column justify-content-between">
                  <p>{emp.desc}</p>
                  <div className="auther">
                    <h5 className="auther-name">{emp.auther}</h5>
                    <p className="m-0">{emp.designation}</p>
                  </div>
                </div>
                <Image width={92} height={92} src={emp.src.src} alt={emp.auther} className="auther-img" />
              </div>
            </SwiperSlide>
          ))}
        </CommonSlider>
      </div>
    </div>
  );
};

export default EmployeeSpeaks;
