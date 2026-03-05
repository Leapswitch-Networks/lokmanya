import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Navigation } from "swiper/modules";
import "swiper/css";

// Image imports
import ArrowLeft from "../../assets/images/icons/Arrow-left-blu.svg";
import ArrowRight from "../../assets/images/icons/Arrow-right-blu.svg";
import DrSuprashant from "../../assets/images/findAdoctor/DrSuprashantKulkarni.webp";
// import DrShailendra from "../../assets/images/findAdoctor/Dr.Shailendra.JPG";
import docBag from "../../assets/images/findAdoctor/doctors-bag.svg";
import PlaceholderImg from "../../assets/images/Dr-placeholder-img.webp";
import NarendraV from "../../assets/images/findAdoctor/DrNarendraVaidya.webp";
import Drbhatiapallav from "../../assets/images/findAdoctor/DrPallavBhatia.webp";

import DocAppointmentModal from "../DocAppointmentModal";
import { ButtonPrimary } from "..";
import Profilesvg1 from "../../../site/assets/images/icons/CampaignPageicons/profile-clip-1.svg";
import Profilesvg2 from "../../../site/assets/images/icons/CampaignPageicons/profile-clip-2.svg";
import Image from "next/image";

const defaultDoctors = [
  {
    id: "7",
    name: "Dr. Narendra Vaidya",
    designation: "Consultant Orthopeadic Department",
    field: "Orthopedics, Joint Replacement, Spine, Sports Medicine",
    exp: "30+ Years of Experience",
    image: NarendraV,
  },
  {
    id: "23",
    name: "Dr. Suprashant Kulkarni",
    designation: "Consultant General Surgery Department",
    field: "General Surgery",
    exp: "25+ Years of Experience",
    image: DrSuprashant,
  },
  {
    id: "14",
    name: "Dr. Bhatia Pallav",
    designation: "Consultant Spine Department",
    field: "Spine",
    exp: "18+ Years of Experience",
    image: Drbhatiapallav,
  },
  // {
  //   id: "3",
  //   name: "Dr. Shailendra Date",
  //   designation: "Consultant Internal Medicine",
  //   field: "Internal Medicine",
  //   exp: "30+ Years of Experience",
  //   image: DrShailendra,
  // },
];

const MeetOurExperts = ({ data = defaultDoctors }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDoctorName, setCurrentDoctorName] = useState("");
  const [currentDoctorLocation, setCurrentDoctorLocation] = useState("Pune");
  console.log('data', data);

  const handleModalOpen = (name, location = "Pune") => {
    setCurrentDoctorName(name);
    setCurrentDoctorLocation(location);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentDoctorName("");
    setCurrentDoctorLocation("");
  };

  return (
    <section className="side-space section-space meet-expert">
      <h2 className="section-heading">Meet Our Top Experts</h2>
      <div className="position-relative">
        <div className="swiper-btn-prev" id="doc-prev">
          <Image width={15} height={15} src={ArrowLeft.src} alt="arrow-left" />
        </div>
        <div className="swiper-btn-next" id="doc-next">
          <Image width={15} height={15} src={ArrowRight.src} alt="arrow-right" />
        </div>

        <Swiper
          modules={[Autoplay, Keyboard, Navigation]}
          spaceBetween={25}
          slidesPerView={3}
          navigation={{
            prevEl: "#doc-prev",
            nextEl: "#doc-next",
          }}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 10 },
            550: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1200: { slidesPerView: 3 },
          }}
        >
          {(data || []).map((doc, index) => (
            <SwiperSlide key={index}>
              <div className="docCard">
                <div className="docCard-inner">
                  <div className="docImg find-doc-new">
                    <div className="prof-svg-1">
                      <Image width={100} height={100} alt="SVG Icon 1" src={Profilesvg1.src} />
                    </div>
                    <div className="prof-svg-2 find-doc-new">
                      <Image width={100} height={100} alt="SVG Icon 2" src={Profilesvg2.src} />
                    </div>
                    <Image width={100} height={100}
                      src={doc.image?.src || PlaceholderImg.src}
                      alt={doc.name || "Doctor image"}
                    />
                  </div>
                  <div className="content">
                    <h4>
                      {doc.name
                        .toLowerCase()
                        .replace(/\b\w/g, (char) => char.toUpperCase())}
                    </h4>
                    <p>{doc.designation}</p>
                    <p>{doc.field}</p>
                    <div className="innerContent">
                      {doc.exp ? (
                        <>
                          <Image width={24} height={24}
                            loading="lazy"
                            src={docBag.src}
                            alt="experience icon"
                          />
                          <p className="mb-0">{doc.exp}</p>
                        </>
                      ) : (
                        <p className="mb-0">No experience info</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="btnDiv">
                  <ButtonPrimary
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the redirection from triggering
                      setCurrentDoctorName(doc.id);  // Set the current doctor name first
                      handleModalOpen(doc.id, doc.location);       // Open the modal
                    }}

                  >
                    Book An Appointment
                  </ButtonPrimary>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <DocAppointmentModal
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
        currentDoctorName={currentDoctorName}
        selectedHospital={currentDoctorLocation}
      />
    </section>
  );
};

export default MeetOurExperts;
