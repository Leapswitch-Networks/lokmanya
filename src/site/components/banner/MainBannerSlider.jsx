import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { ButtonPrimary, CustomSelect } from '..';
import { useRouter } from 'next/router';
// import { fetchAllArea } from "../ApiActions/CommonApi";
import { doctorsListFrontend, fetchAllArea, fetchAllSpecialty } from "@/ApiActions/CommonApi";
import Image from 'next/image';



const MainBannerSlider = ({
}) => {

  const [autoplayDelay, setAutoplayDelay] = useState(7000);

  const [areas, setAreas] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");

  // const baseUrl = process.env.NEXT_PUBLIC_FILE_BASE_URL;



  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetchAllArea();
        setAreas(response.data.data);
      } catch (error) {
        console.error("Failed to fetch locations", error);
      }
    };
    fetchAreas();
  }, []);

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await fetchAllSpecialty();
        setSpecialties(response.data);
      } catch (error) {
        console.error("Failed to fetch specialties", error);
      }
    };
    fetchSpecialties();
  },
    []);

  useEffect(() => {
    const fetchDoctors = async () => {
      if (!selectedLocation && !selectedSpecialty) return;

      try {
        const response = await doctorsListFrontend(
          selectedLocation || "",
          selectedSpecialty || ""
        );

        if (Array.isArray(response.data)) {
          setDoctors(response.data);
        } else {
          setDoctors([]);
          console.error("Doctors data is not an array:", response.data);
        }
      } catch (error) {
        console.error("Failed to fetch doctors", error);
      }
    };

    fetchDoctors();
  }, [selectedLocation, selectedSpecialty]);

  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();

    sessionStorage.setItem("selectedLocation", selectedLocation || "");
    sessionStorage.setItem("selectedSpecialty", selectedSpecialty || "");

    if (selectedDoctor) {
      router.push(`/doctors/${selectedDoctor}`);
    } else {
      router.push("/doctors");
    }
  };


  const locationOptions = areas.map((area) => ({
    label: area.masterName,
    value: area.masterName,
  }));

  const specialtyOptions = specialties.map((specialty) => ({
    label: specialty.masterName,
    value: specialty.id,
  }));

  const doctorOptions = Array.isArray(doctors)
    ? doctors.map((doctor) => ({
      label: doctor.doctorName,
      value: doctor.slug,
    }))
    : [];

  return (
    <section className="banner">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        keyboard={{ enabled: true }}
        pagination={{ clickable: true }}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false
        }}
        loop={true}
        navigation={true}
        modules={[Autoplay, Keyboard, Pagination, Navigation]}
        className="main-slider"
        onSlideChange={(swiper) => {
          swiper.params.autoplay.delay = swiper.realIndex === 0 ? 6000 : 3000;
          swiper.autoplay.start();
        }}
      >
        {[{
          desktop: '/images/new-theme/Webbanner_v3-01.webp',
          mobile: '/images/new-theme/WebbannerMobile-1.webp',
        },
        {
          desktop: '/images/new-theme/AwardWebbanner.webp',
          mobile: '/images/new-theme/AwardWebbannerMob.webp',
        },
        // {
        //   desktop: '/images/new-theme/Webbanner_v3-03.webp',
        //   mobile: '/images/new-theme/WebbannerMobile-1.webp',
        // },
        {
          desktop: '/images/new-theme/Webbanner_v3-04.webp',
          mobile: '/images/new-theme/Webbanner_v3-04-mob.webp',
        },

        {
          desktop: '/images/new-theme/Webbanner_v3-02.webp',
          mobile: '/images/new-theme/WebbannerMobile-2.webp',
        },
        ].map((banner, index) => (
          <SwiperSlide key={index}>
            <Image height={607} width={1531} loading={index === 0 ? 'eager' : 'lazy'} src={banner.desktop} alt="app banner" className="desktop-banner" />
            <Image height={607} width={1531} loading={index === 0 ? 'eager' : 'lazy'} src={banner.mobile} alt="app banner" className="mobile-banner" />
          </SwiperSlide>
        ))}
      </Swiper>

      <form onSubmit={handleSubmit} className="enqury-form">
        <h4 className="form-heading">I’m looking for</h4>

        <CustomSelect
          aria-label="Select Location"
          placeholder="Select Location*"
          defaultOption="Select Location"
          name="location"
          options={locationOptions}
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        />

        <CustomSelect
          aria-label="Select Specialty"
          placeholder="Select Specialty"
          defaultOption="Select Specialty"
          name="specialty"
          options={specialtyOptions}
          value={selectedSpecialty}
          onChange={(e) => setSelectedSpecialty(e.target.value)}
        />

        <CustomSelect
          aria-label="Select Doctor"
          placeholder="Select Doctor"
          defaultOption="Select Doctor"
          name="doctor"
          options={doctorOptions}
          value={selectedDoctor}
          onChange={(e) => setSelectedDoctor(e.target.value)}
        />

        <ButtonPrimary submitBtnClass="HomeSearchBtnId" type="submit">Search</ButtonPrimary>
      </form>
    </section>
  );
};

export default MainBannerSlider;
