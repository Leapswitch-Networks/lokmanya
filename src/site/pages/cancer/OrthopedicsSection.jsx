import React, { useState, useEffect } from "react";
import kneeImage from "../../../assets/images/CANCER_banner.webp";
import { CommonBanner } from "../../components";

function OrthopedicsSection() {
  const [cities, setCities] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);


  //fetch method from backend side
  useEffect(() => {
    setCities(["Pune", "Mumbai", "Delhi"]);

    setDepartments(["Orthopedics", "Cardiology", "Neurology"]);

   
    setDoctors(["Dr. A", "Dr. B", "Dr. C"]);
  }, []);

  return (
    <section>
      <CommonBanner bgColor={"#EFEDD1"} bgImage={kneeImage.src}>
        <div className="header-section">
          <h1 className="page-heading">CANCER</h1>
          <p className="subtitle">
          Lokmanya Hospitals is a trusted name in healthcare in Pune, known for its commitment to providing world-class cancer care.
          </p>
          {/* <p className="consultations">1,50,000+ Consultations Annually</p> */}
          {/* <div className="search-bar">
            <select className="dropdown">
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <select className="dropdown">
              {departments.map((department, index) => (
                <option key={index} value={department}>
                  {department}
                </option>
              ))}
            </select>
            <select className="dropdown">
              {doctors.map((doctor, index) => (
                <option key={index} value={doctor}>
                  {doctor}
                </option>
              ))}
            </select>
            <ButtonPrimary to="Submit">Submit</ButtonPrimary>
          </div> */}
        </div>
      </CommonBanner>
      <div className="overview-section side-space section-space">
        <h2 className="page-heading">Overview</h2>
        <div className="para">
          <p >
          Lokmanya Hospitals is a leading name in cancer care in Pune, offering a comprehensive range of services with a patient-focused approach. Our specialized oncology department is equipped with advanced technology and staffed by a team of expert oncologists, surgeons, and radiation specialists. From early diagnosis to advanced treatments, including surgery, chemotherapy, and radiation, we ensure high-quality, personalized care for every patient.

          </p>
          <p>
          We provide innovative treatments such as targeted therapies and immunotherapy, ensuring the best possible outcomes. At Lokmanya Hospitals, we are dedicated to guiding you through every stage of your cancer journey with the utmost care and compassion.


          </p>
          <p className="mb-0">
          At Lokmanya Hospitals, we focus on your complete well-being, providing not only medical treatment but also emotional and nutritional support, all aimed at ensuring a smooth recovery and a better quality of life.
          </p>
        </div>
      </div>
    </section>
  );
}

export default OrthopedicsSection;