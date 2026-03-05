import React, { useEffect, useState } from "react";
// import NarendraV from "@/site/assets/images/Dr.NarendraVaidya.png";
// import Manpreet from "@/site/assets/images/Mr.ManpreetSohal.png";
import PlaceholderImg from "@/site/assets/images/Dr-placeholder-img.webp";
import Image from "next/image";

const doctors = [
  {
    id: 1,
    img: "/images/doctors/NarendraVaidyaSir.png",
    name: "Dr. Narendra Vaidya",
    position: "Chairman - Lokmanya Group of Hospitals",
    description: "Dr. Narendra Vaidya is an  Reconstructive Orthopedic and Joint replacement surgeon in Pune, India. He is the Founder and Chairman of Lokmanya Hospitals Pvt Ltd. Dr. Vaidya is awarded many prestigious awards like Rashtriya Ratna Award, Navbharat Health Excellence Award, and many other such recognitions. Dr. Vaidya pioneered and introduced Robotic Assisted Joint Replacement Surgery in India. He was the first to bring this cutting-edge technology in Asia. With the technology, more than 50000 knee replacement surgeries have been successfully performed by him, which are the highest in the series. He holds a vast experience of more than 28 years, with more than 100000 Orthopaedic Surgeries and more than 50000 Joint Replacement surgeries successfully performed by him."
  },
  {
    id: 2,
    img: "/images/doctors/ManpreetSir2.png",
    name: "Mr. Manpreet Sohal",
    position: "CEO & Managing Director – Lokmanya Group of Hospitals",
    description: "Mr. Manpreet Sohal is a healthcare leader with over two decades of experience in transforming hospital operations and driving strategic growth across India’s leading healthcare institutions. In July 2024, he joined Lokmanya Group of Hospitals as the Chief Executive Officer and Managing Director, bringing with him a strong legacy of operational excellence, patient-centric leadership, and innovation in healthcare delivery. Prior to joining Lokmanya Hospitals, Mr. Sohal held key leadership roles, including regional CEO of Global Hospitals and Director & COO at Max Nanavati Hospital, Mumbai. Zonal Director of fortis Health Care. His vision consistently focuses on driving clinical excellence, digital transformation, and expanding access to quality healthcare."
  },
];

const LeadershipTeam = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const openModal = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Optional cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);
  return (
    <>
      <section className="medicalteam section-below-space side-space">
        <h2 className="section-heading">Leadership Team</h2>
        <div className="experts-container">
          <div className="row common-gutter justify-content-center">
            {doctors.map((d) => (
              <div className="col-xl-4 col-md-4 col-6" key={d.id}>
                <div className="meet-ex-card" onClick={() => openModal(d)}>
                  <div className="meet-ex-image">
                    <Image width={335} height={225}
                      src={d.img || PlaceholderImg.src}
                      alt={d.name || "Doctor"}
                      style={{ objectFit: "contain", objectPosition: "bottom" }}
                    />
                  </div>
                  <div className="meet-ex-info">
                    <h4>{d.name}</h4>
                    <div className="doc-info">
                      <p className="mb-md-0 mb-3">{d.position}</p>
                      <p className="mb-0 rd-more">Read More +</p>
                      {/* Optional: Add more doctor info or button */}
                      {/* <p>10+ Years of Experience</p> */}
                      {/* <ButtonPrimary onClick={handleModalOpen} isWhite>Book An Appointment</ButtonPrimary> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {isModalOpen && selectedMember && (
        <div className="modal-overlay-custom director-overlay" onClick={closeModal}>
          <div className="modal-content-custom director-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-custom director-close-btn" onClick={closeModal}>
              &times;
            </button>
            <div className="modal-ctnt">
              <h3 className="text-white">{selectedMember.name}</h3>
              <p className="text-white mb-md-3 mb-2">{selectedMember.position}</p>
              <p
                className="text-white mb-0"
                style={{ whiteSpace: 'pre-line' }}
                dangerouslySetInnerHTML={{
                  __html: selectedMember.description || "No additional description available.",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LeadershipTeam;
