import React, { useCallback, useEffect, useState } from "react";
// import axiosConfig from '../utils/axiosConfig';
import ContactDoctor from "../site/assets/images/contactus/ContactBannerImg.png";
import Share from "../site/assets/images/icons/share-blue.svg";
import Phone from "../site/assets/images/icons/call-blue.svg";
import Email from "../site/assets/images/icons/email.svg";
import Facebook from '../site/assets/images/icons/fb-blu.svg';
import Instagram from '../site/assets/images/icons/insta-blu.svg';
import Linkedin from '../site/assets/images/icons/linkedin-blu.svg';
import Youtube from '../site/assets/images/icons/yt-blu.svg';


import {
  // ButtonPrimary,
  CommonBanner,
} from "../site/components";

import CommonInput from "../site/components/controls/CommonInput";
import LokmanyaNetwork from "../site/components/LokmanyaNetworkSection/LokmanyaNetwork";
import Head from "next/head";
import Link from "next/link";
// import ContactUsLok from "@/site/components/ContactUsLok";
import { addLeadContactus, fetchAllArea } from "@/ApiActions/CommonApi";
import { createLead, updateLead } from "@/ApiActions/CommonApi";
import { useRef } from "react";
import Image from "next/image";
import debounce from "lodash.debounce";

const ContactUs = () => {
  // useState hook to track the active tab
  const [activeTab, setActiveTab] = useState("Inquiry"); // Manages the active tab

  const baseUrl = process.env.NEXT_PUBLIC_FILE_BASE_URL;
  const [HOSPITALS, setAreas] = useState([]); // State for locations
  // const API_URL_AREAS = `${baseUrl}/get-area`;
  const initialFormData = {
    name: "",
    email: "",
    mobile: "",
    areaId: "",
    message: "",
  };


  const [formData, setFormData] = useState(initialFormData);

  const [loading, setLoading] = useState(false);

  const [thankyouMsg, setThankyouMsg] = useState('');

  const [errorMsg, setErrorMsg] = useState('');

  const [errors, setErrors] = useState({}); // Store error messages here

  // Regular expressions for validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const mobileRegex = /^[0-9]{10}$/;
  const nameRegex = /^[a-zA-Z' -]+$/;
  const messageRegex = /^[a-zA-Z0-9\s.,!?\'"-]+$/;
  // Handle input change
  // const handleChange = (e) => {
  //   const { id, value } = e.target; // Destructure the id and value from the event target
  //   setFormData((prevData) => ({
  //     ...prevData, // Spread the previous state
  //     [id]: value, // Update the field with the matching id
  //   }));
  // };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

   debouncedSaveProgressiveLead(id, value);
  };



  const [leadId, setLeadId] = useState(null);
  const [progressiveData, setProgressiveData] = useState({
    patientName: "",
    email: "",
    mobileNumber: "",
    areaId: "",
    message: "",
    formtype: activeTab, // this will change based on tab
  });
  const isCreatingLead = useRef(false);

  const saveProgressiveLead = async (fieldName, value) => {
    try {
      const keyMap = {
        name: "patientName",
        email: "email",
        mobile: "mobileNumber",
        areaId: "areaId",
        message: "message",
      };

      const updated = {
        ...progressiveData,
        [keyMap[fieldName]]: value,
        formtype: activeTab,
      };

      setProgressiveData(updated);

      if (!leadId && fieldName === "name" && value.trim().length >= 3) {
        if (isCreatingLead.current) return;
        isCreatingLead.current = true;

        const res = await createLead(updated);
        if (res?.status === 201) {
          setLeadId(res.data.id);
        }

        isCreatingLead.current = false;
      } else if (leadId) {
        await updateLead({ id: leadId, ...updated });
      }
    } catch (err) {
      console.error("Progressive lead error:", err);
      isCreatingLead.current = false;
    }
  };

    // ✅ Hamesha yahan rakho, koi condition ke andar nahi
    const debouncedSaveProgressiveLead = useCallback(
      debounce((fieldName, value) => {
        saveProgressiveLead(fieldName, value);
      }, 800),
      [progressiveData, leadId]
    );


  // Fetch areas (locations) data
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


  // Handle form submission
  const handleSubmit = async (e) => {

    //console.log(activeTab);
    e.preventDefault();

    // Reset messages before submission
    setThankyouMsg("");
    setErrorMsg("");

    // Validate form data
    const validationErrors = {};

    // Validate Name
    if (!nameRegex.test(formData.name)) {
      validationErrors.name = "Please enter a valid Name";
    }

    // Validate Email
    if (!emailRegex.test(formData.email)) {
      validationErrors.email = "Please enter a valid email address";
    }


    // Validate Mobile Number
    if (!mobileRegex.test(formData.mobile)) {
      validationErrors.mobile = "Please enter a valid mobile number (10 digits)";
    }

    // AreaId (select option) validation
    if (!formData.areaId) {
      validationErrors.areaId = "Please select a hospital.";
    }

    // Validate Message
    if (!messageRegex.test(formData.message)) {
      validationErrors.message = "Please enter a valid message";
    }

    console.log(Object.keys(validationErrors).length);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return; // Don't submit if there are validation errors
    }

    setLoading(true);

    try {
      const jsonPayload = {
        patientName: formData.name,
        email: formData.email,
        mobileNumber: formData.mobile,
        areaId: formData.areaId,
        message: formData.message,
        type: activeTab,
        leadId:leadId
      };



      const response = await addLeadContactus(jsonPayload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        // Reset messages before submission
        setThankyouMsg("");
        setErrorMsg("");
        setErrors("");
        setLeadId(null);
        setFormData(initialFormData);
        setThankyouMsg("Appointment booked successfully!");

      } else {
        setErrorMsg("Submission successful, but with unexpected status. Please verify.");
      }
    } catch (error) {
      console.error("Submission failed:", error.response?.data || error.message);
      setErrorMsg("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <Head>
        <title>Contact Us - Lokmanya Hospital</title>
        <meta name="description" content="Connect with the best multi-speciality hospital in Pune. Contact Lokmanya Hospital for expert care, appointments, and all your healthcare needs." />
      </Head>
      <CommonBanner bgColor={"#DFF5F5"} image={ContactDoctor.src}>
        <h1 className="page-heading">Reach Out To Us</h1>
      </CommonBanner>
      <section id='contactUsLok' className="">
        <div className="section-space side-space get-in-touch-inner">
          <div className="row common-gutter">
            <div className="col-md-5 col-xl-4">
              <div className="getInTouchForm">
                <div className="contacts-div">
                  <div className="icon-wrap"><Image width={20} height={20} alt="Phone Icon" src={Phone.src} /></div>
                  <div>
                    <p>Phone</p>
                    <Link className="numberHover" href="tel:+919307076767">93 0707 6767</Link>
                  </div>
                </div>
                <div className="contacts-div">
                  <div className="icon-wrap"><Image width={20} height={20} alt="Email Icon" src={Email.src} /></div>
                  <div>
                    <p>Email</p>
                    <Link href="mailto:care@lokmanyahospitals.com">care@lokmanyahospitals.com</Link>

                  </div>
                </div>


                <div className="contacts-div">
                  <div className="icon-wrap"><Image width={20} height={20} alt="Share Icon" src={Share.src} /></div>
                  <div>
                    <p>Follow us</p>
                    <div className="social-icons-div">
                      <Link href="https://www.instagram.com/lokmanya_hospital/" target="_blank" rel="noopener noreferrer"><Image width={32} height={32} src={Instagram.src} alt="Instagram" /></Link>
                      <Link href="https://www.linkedin.com/company/lokmanyahospitals/" target="_blank" rel="noopener noreferrer"><Image width={32} height={32} src={Linkedin.src} alt="Linkedin" /></Link>
                      <Link href="https://www.facebook.com/lokmanyahospitals" target="_blank" rel="noopener noreferrer"><Image width={32} height={32} src={Facebook.src} alt="Facebook" /></Link>
                      <Link href="https://www.youtube.com/@LokmanyaHospitalsPune/" target="_blank" rel="noopener noreferrer"><Image width={32} height={32} src={Youtube.src} alt="Youtube" /></Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-7 col-xl-8">
              <form id="getInTouchForm" className="getInTouchForm" onSubmit={handleSubmit}>
                <div className="buttons3 mb-3">
                  {/* Toggle active class based on activeTab state */}
                  <button
                    type="button"
                    className={`tab-btn ${activeTab === "Inquiry" ? "active" : ""}`}
                    onClick={() => setActiveTab("Inquiry")}
                  >
                    Inquiry
                  </button>
                  <button
                    type="button"
                    className={`tab-btn ${activeTab === "Feedback" ? "active" : ""}`}
                    onClick={() => setActiveTab("Feedback")}
                  >
                    Feedback
                  </button>
                  <button
                    type="button"
                    className={`tab-btn ${activeTab === "Complaint" ? "active" : ""}`}
                    onClick={() => setActiveTab("Complaint")}
                  >
                    Complaint
                  </button>
                </div>

                <div className="row common-gutter">
                  <div className="col-md-6">
                    <label htmlFor="name">Name*</label>
                    <CommonInput
                      id="name"
                      placeholder="Enter your Name*"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="email">E-mail*</label>
                    <CommonInput
                      id="email"
                      placeholder="Enter your E-mail*"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="mobile">Mobile No.*</label>
                    <CommonInput
                      id="mobile"
                      placeholder="Enter your mobile number*"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                    />
                    {errors.mobile && <span className="error">{errors.mobile}</span>}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="areaId">Hospital*</label>
                    <select
                      id="areaId"
                      value={formData.areaId}
                      onChange={(e) =>
                        setFormData((prevData) => ({ ...prevData, areaId: e.target.value }))
                      }
                      required
                      className="custom-select"
                    >
                      <option value="" disabled>
                        Select Hospital*
                      </option>
                      {HOSPITALS.map((hospital) => (
                        <option key={hospital.id} value={hospital.id}>
                          {hospital.masterName}
                        </option>
                      ))}
                    </select>
                    {errors.areaId && <span className="error">{errors.areaId}</span>}
                  </div>


                  <div className="col-12">
                    <label htmlFor="message">Your Message*</label>
                    <CommonInput
                      id="message"
                      placeholder="Enter your message here*"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                    {errors.message && <span className="error">{errors.message}</span>}
                  </div>

                  <div className="col-12 contactBtnFlex">
                    <div className="buttonFlex">
                      <button
                        type="submit"
                        className={`button-primary false ${loading ? "disabled-btn" : ""}`}
                        disabled={loading}
                      >
                        <span>
                          {loading ? (
                            <>
                              Submitting
                              <div className="spinner-border spinner-border-sm custom-spinner ms-2"></div>
                            </>
                          ) : (
                            "Submit"
                          )}
                        </span>
                      </button>

                      {/* Conditionally display success or error message */}
                      {thankyouMsg && <span className="thank-you">{thankyouMsg}</span>}
                      {errorMsg && <span className="error-msg">{errorMsg}</span>}

                    </div>

                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <LokmanyaNetwork />
    </>
  );
};


export default ContactUs;
