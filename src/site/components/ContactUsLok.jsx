import React, { useState } from "react";
import { ButtonPrimary } from ".";
import CommonInput from "./controls/CommonInput";
import Link from "next/link";
import Share from "../assets/images/icons/share-blue.svg";
import Phone from "../assets/images/icons/call-blue.svg";
import Email from "../assets/images/icons/email.svg";
import Facebook from '../assets/images/icons/fb-blu.svg';
import Instagram from '../assets/images/icons/insta-blu.svg';
import Linkedin from '../assets/images/icons/linkedin-blu.svg';
import Youtube from '../assets/images/icons/yt-blu.svg';


const ContactUsLok = () => {
  const [activeTab, setActiveTab] = useState("Inquiry"); // Manages the active tab

  const baseUrl = process.env.NEXT_PUBLIC_FILE_BASE_URL;
  const [HOSPITALS, setAreas] = useState([]); // State for locations
  const API_URL_AREAS = `${baseUrl}/get-area`;
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

  const handleChange = (e) => {
    const { id, value } = e.target; // Destructure the id and value from the event target
    setFormData((prevData) => ({
      ...prevData, // Spread the previous state
      [id]: value, // Update the field with the matching id
    }));
  };

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
      };

      const response = await axiosConfig.post("/add-lead-contactus", jsonPayload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        // Reset messages before submission
        setThankyouMsg("");
        setErrorMsg("");
        setErrors("");
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
    <section id='contactUsLok' className="">
      <div className="section-space side-space get-in-touch-inner">
        <div className="row common-gutter">
          <div className="col-md-5 col-xl-4">
            <div className="getInTouchForm">
              <div className="contacts-div">
                <div className="icon-wrap"><img src={Phone.src} /></div>
                <div>
                  <p>Phone</p>
                  <Link className="numberHover" href="tel:+919307076767">93 0707 6767</Link>
                </div>
              </div>
              <div className="contacts-div">
                <div className="icon-wrap"><img src={Email.src} /></div>
                <div>
                  <p>Email</p>
                  <Link href="mailto:care@lokmanyahospitals.com">care@lokmanyahospitals.com</Link>

                </div>
              </div>


              <div className="contacts-div">
                <div className="icon-wrap"><img src={Share.src} /></div>
                <div>
                  <p>Follow us</p>
                  <div className="social-icons-div">
                    <Link href="https://www.instagram.com/lokmanya_hospital/" target="_blank" rel="noopener noreferrer"><img src={Instagram.src} alt="Instagram" /></Link>
                    <Link href="https://www.linkedin.com/company/lokmanyahospitals/" target="_blank" rel="noopener noreferrer"><img src={Linkedin.src} alt="Linkedin" /></Link>
                    <Link href="https://www.facebook.com/lokmanyahospitals" target="_blank" rel="noopener noreferrer"><img src={Facebook.src} alt="Facebook" /></Link>
                    <Link href="https://www.youtube.com/@LokmanyaHospitalsPune/" target="_blank" rel="noopener noreferrer"><img src={Youtube.src} alt="Youtube" /></Link>
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
                    <ButtonPrimary
                      type="submit"
                      className="button-primary false"
                      disabled={loading}
                    >
                      <span>{loading ? "Submitting..." : "Submit"}</span>
                    </ButtonPrimary>

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
  )

}


export default ContactUsLok;