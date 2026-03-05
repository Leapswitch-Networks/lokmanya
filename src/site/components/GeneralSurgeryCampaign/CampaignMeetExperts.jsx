import { useState } from "react";
import DrSuprashant from "../../assets/images/findAdoctor/DrSuprashnat.jpeg";
import docBag from "../../assets/images/findAdoctor/doctors-bag.svg";
import PlaceholderImg from "../../assets/images/Dr-placeholder-img.webp";
import Profilesvg1 from "../../assets/images/icons/CampaignPageicons/profile-clip-1.svg";
import Profilesvg2 from "../../assets/images/icons/CampaignPageicons/profile-clip-2.svg";
import DocAppointmentModal from "../DocAppointmentModal";
import { ButtonPrimary } from "..";
import Image from "next/image";

const defaultDoctors = [
  {
    id: 24,
    name: "Dr. Aravind Kulkarni",
    designation: "Consultant General Surgery Department",
    field: "General Surgery",
    exp: "39+ Years of Experience",
    image: "",
  },
  {
    id: 23,
    name: "Dr. Suprashant Kulkarni",
    designation: "Consultant General Surgery Department",
    field: "General Surgery",
    exp: "25+ Years of Experience",
    image: DrSuprashant,
  },
  {
    id: 58,
    name: "Dr. Saurabh Dumbre",
    designation: "Consultant General Surgery Department",
    field: "General Surgery",
    exp: "8+ Years of Experience",
    image: "",
  },
];

const CampaignMeetExperts = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDoctorName, setCurrentDoctorName] = useState("");
  const [currentDoctorLocation, setCurrentDoctorLocation] = useState("Pune");

  const doctors = data?.length ? data : defaultDoctors;

  const handleModalOpen = (id, name, location = "Pune") => {
    setCurrentDoctorName(id);
    setCurrentDoctorLocation(location);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentDoctorName("");
    setCurrentDoctorLocation("");
  };

  return (
    <section id="doctors" className="campaign-team-exprt side-space section-space">
      <h2 className="section-heading">Our Team of Expert Doctors</h2>

      <div className="row g-4 justify-content-center">
        {doctors.map((doc, index) => (
          <div className="col-12 col-md-6 col-lg-6 col-xl-4" key={index}>
            <div className="docCard h-100">
              <div className="docCard-inner">
                <div className="docImg">
                  <div className="prof-svg-1">
                    <Image width={100} height={100} alt="Profile svg 1" src={Profilesvg1.src} />
                  </div>
                  <div className="prof-svg-2">
                    <Image width={100} height={100} alt="Profile svg 2" src={Profilesvg2.src} />
                  </div>
                  <Image
                    width={100}
                    height={100}
                    className="bg-white object-fit-contain"
                    src={doc.image?.src || PlaceholderImg.src}
                    alt={doc.name || "Doctor image"}
                  />
                </div>
                <div className="content">
                  <h4>
                    {doc.name.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}
                  </h4>
                  <p>{doc.designation}</p>
                  <p>{doc.field}</p>
                  <div className="innerContent">
                    {doc.exp ? (
                      <>
                        <Image width={25} height={25} loading="lazy" src={docBag.src} alt="experience icon" />
                        <p className="mb-0">{doc.exp}</p>
                      </>
                    ) : (
                      <p className="mb-0">No experience info</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="btnDiv">
                <ButtonPrimary onClick={() => handleModalOpen(doc.id, doc.name)}>
                  Book An Appointment
                </ButtonPrimary>
              </div>
            </div>
          </div>
        ))}
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

export default CampaignMeetExperts;
