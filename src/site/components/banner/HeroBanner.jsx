import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';

const HeroBanner = ({ slides = [] }) => {
    const shouldLoop = slides.length > 1;

    return (
        <section className="banner">
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                keyboard={{ enabled: true }}
                pagination={{ clickable: true }}
                autoplay={{ delay: 7000, disableOnInteraction: false }}
                loop={shouldLoop}
                navigation={true}
                modules={[Autoplay, Keyboard, Pagination, Navigation]}
                className="main-slider"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        {slide.link ? (
                            <Link href={slide.link}>
                                <img src={slide.desktop} alt={`banner-${index}`} className="desktop-banner" />
                                <img src={slide.mobile} alt={`banner-mobile-${index}`} className="mobile-banner" />
                            </Link>
                        ) : slide.onClick ? (
                            <div onClick={slide.onClick} style={{ cursor: 'pointer' }}>
                                <img src={slide.desktop} alt={`banner-${index}`} className="desktop-banner" />
                                <img src={slide.mobile} alt={`banner-mobile-${index}`} className="mobile-banner" />
                            </div>
                        ) : (
                            <>
                                <img src={slide.desktop} alt={`banner-${index}`} className="desktop-banner" />
                                <img src={slide.mobile} alt={`banner-mobile-${index}`} className="mobile-banner" />
                            </>
                        )}
                    </SwiperSlide>
                ))}

            </Swiper>
        </section>
    );
};

export default HeroBanner;
