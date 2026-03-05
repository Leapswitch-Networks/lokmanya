import { useState, useEffect } from "react";
import * as Yup from "yup";
// import DoctorWithEarth from "../site/assets/images/international-patients/FindDocBannerImg.png"; 
import BannerImage from "../site/assets/images/international-patients/IP-Banner-New.webp";
import { CommonBanner } from "../site/components";
import LokmanyaNetwork from "../site/components/LokmanyaNetworkSection/LokmanyaNetwork";
import Head from "next/head";
import MainSuccessStor from "@/site/components/MainSuccessStor";
import GetInTouch from "@/site/components/InternationalPatients/GetInTouch";
import MeetOurExperts from "@/site/components/InternationalPatients/MeetOurExperts";
import SpecialitiesSlider from "@/site/components/InternationalPatients/SpecialitiesSlider";
import TreatmentJourney from "@/site/components/InternationalPatients/TreatmentJourney";
import InternationalPatientServices from "@/site/components/InternationalPatients/InternationalPatientServices";
import InternationalPatientsCard from "@/site/components/InternationalPatients/InternationalPatientsCard";
import { fetchAllArea } from "@/ApiActions/CommonApi";

const InternationalPatients = () => {
  // const baseUrl = process.env.REACT_APP_BASE_URL;

  const [HOSPITALS, setAreas] = useState([]);
  // const API_URL_AREAS = `${baseUrl}/get-area`;

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetchAllArea();
        setAreas(response.data.data); // Set areas
      } catch (error) {
        console.error("Failed to fetch locations", error);
      }
    };
    fetchAreas();
  }, []);



  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [currentDoctorName, setCurrentDoctorName] = useState("");
  // const [currentDoctorLocation, setCurrentDoctorLocation] = useState("");
  // const handleModalOpen = (doctorName, doctorLocation) => {

  //   setCurrentDoctorName(44); // Ensure the doctor name is set
  //   setCurrentDoctorLocation(doctorLocation);
  //   setIsModalOpen(true); // Open the modal
  // };

  // const handleModalClose = () => setIsModalOpen(false);


  // Validation Schema using Yup with Regex
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .matches(/^[a-zA-Z' -]+$/, "Invalid name format"),
    email: Yup.string()
      .required("Email is required")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email address"
      ),
    mobile: Yup.string()
      .required("Mobile number is required")
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
    hospital: Yup.string().required("Hospital is required"),
    message: Yup.string()
      .required("Message is required")
      .matches(
        /^[a-zA-Z0-9\s.,!?'"-]+$/,
        "Message contains invalid characters"
      ),
  });

  // useEffect(() => {
  //   const fetchAreas = async () => {
  //     try {
  //       const response = await axiosConfig.get(API_URL_AREAS);
  //       setAreas(response.data.data); // Set areas
  //     } catch (error) {
  //       console.error("Failed to fetch locations", error);
  //     }
  //   };
  //   fetchAreas();
  // }, []);

  return (
    <>
      <Head>
        <title>International Patient Service At Lokmanya Hospital Pune</title>
        <meta
          name="description"
          content="Lokmanya Hospital offers exceptional healthcare services for international patients with advanced treatments, expert doctors, and dedicated support."
        />
      </Head>
      <CommonBanner bgImage={BannerImage.src}>
        <h1 className="page-heading ip-ttl-width">
          Comprehensive Care for International Patients
        </h1>
      </CommonBanner>
      <InternationalPatientsCard />
      <InternationalPatientServices />
      <TreatmentJourney />
      <MeetOurExperts HOSPITALS={HOSPITALS} />
      <SpecialitiesSlider />
      <MainSuccessStor />
      <GetInTouch HOSPITALS={HOSPITALS} />

      <LokmanyaNetwork />
    </>
  );
};

export default InternationalPatients;
