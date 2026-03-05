import './slider.css'
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Keyboard, Pagination, Navigation, Autoplay } from 'swiper/modules';

const Slider = () => {
  const BASE_URL = process.
    env.REACT_APP_FILE_BASE_URL_PUBLIC;
  const sliderRef = useRef(null);

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      keyboard={{
        enabled: true,
      }}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop={true}
      navigation={true}
      modules={[Autoplay, Keyboard, Pagination, Navigation]}
      className="main-slider"
    >
      <SwiperSlide>
        <img src={`${BASE_URL}/images/slider/liver-transplant-desk.webp`} alt="slider" crossOrigin="anonymous" className="hide_on_mobile" />
        <img src={`${BASE_URL}/images/slider/liver-transplant-mob.webp`} alt="slider" crossOrigin="anonymous" className="hide_on_desktop" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={`${BASE_URL}/images/slider/Desktop-1920x600-Tomo.webp`} alt="slider" crossOrigin="anonymous" className="hide_on_mobile" />
        <img src={`${BASE_URL}/images/slider/Tomo540X600.webp`} alt="slider" crossOrigin="anonymous" className="hide_on_desktop" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={`${BASE_URL}/images/slider/1920x600pix_Da-Vinci-01.webp`} alt="slider" crossOrigin="anonymous" className="hide_on_mobile" />
        <img src={`${BASE_URL}/images/slider/mobile_540X600pix-Da-Vinci-01.webp`} alt="slider" crossOrigin="anonymous" className="hide_on_desktop" />
      </SwiperSlide>
      <SwiperSlide>
        <a href="https://momstory.co.in" target='blank'><img src={`${BASE_URL}/images/slider/BANNER1-1920X600.webp`} alt="slider" crossOrigin="anonymous" className="hide_on_mobile" /></a>
        <a href="https://momstory.co.in" target='blank'><img src={`${BASE_URL}/images/slider/banner1-540x600.webp`} alt="slider" crossOrigin="anonymous" className="hide_on_desktop" /></a>
      </SwiperSlide>
      <SwiperSlide>
        <img src={`${BASE_URL}/images/slider/1920x600pix_Smith&Nephew-01.webp`} alt="slider" crossOrigin="anonymous" className="hide_on_mobile" />
        <img src={`${BASE_URL}/images/slider/mobile_540X600pix-Smith-&-Nephew-01.webp`} alt="slider" crossOrigin="anonymous" className="hide_on_desktop" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={`${BASE_URL}/images/slider/Web-Banner-ranking-2-1920x600.webp`} alt="slider" crossOrigin="anonymous" className="hide_on_mobile" />
        <img src={`${BASE_URL}/images/slider/Award-Ranking-mobile-540.webp`} alt="slider" crossOrigin="anonymous" className="hide_on_desktop" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={`${BASE_URL}/images/slider/Ortho-banner-1920x600-Desktop.webp`} alt="slider" crossOrigin="anonymous" className="hide_on_mobile" />
        <img src={`${BASE_URL}/images/slider/Orthopedic-Mobile-Banner-v11-540.webp`} alt="slider" crossOrigin="anonymous" className="hide_on_desktop" />
      </SwiperSlide>
    </Swiper>
  );
}

export default Slider;

