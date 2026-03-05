import React, { useState, useRef, useCallback } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import Share from "../../assets/images/icons/share-blue.svg";
import Phone from "../../assets/images/icons/call-blue.svg";
import Instagram from "../../assets/images/icons/insta-blu.svg";
import Linkedin from "../../assets/images/icons/linkedin-blu.svg";
import Facebook from "../../assets/images/icons/fb-blu.svg";
import Youtube from "../../assets/images/icons/yt-blu.svg";

import Link from "next/link";
import { addLeadContactus, createLead, updateLead } from "@/ApiActions/CommonApi";
import { successToast } from "@/utils/Toast";
import Image from "next/image";
import debounce from "lodash.debounce";

const GetInTouch = ({ HOSPITALS }) => {
  const [leadId, setLeadId] = useState(null);
  const [progressiveData, setProgressiveData] = useState({
    patientName: "",
    email: "",
    mobileNumber: "",
    areaId: "",
    message: "",
    formtype: "contact",
  });
  const isCreatingLead = useRef(false);

  const saveProgressiveLead = async (fieldName, value) => {
    try {
      const keyMap = {
        name: "patientName",
        email: "email",
        mobile: "mobileNumber",
        hospital: "areaId",
        message: "message",
      };

      const updated = {
        ...progressiveData,
        [keyMap[fieldName]]: value,
        formtype: "contact",
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
    

  const initialFormData = {
    name: "",
    email: "",
    mobile: "",
    hospital: "",
    message: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    mobile: Yup.string().required("Mobile number is required"),
    hospital: Yup.string().required("Please select a hospital"),
    message: Yup.string().required("Message is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const jsonPayload = {
        patientName: values.name,
        email: values.email,
        mobileNumber: values.mobile,
        areaId: values.hospital,
        message: values.message,
        type: "International",
        leadId:leadId
      };

      const response = await addLeadContactus(jsonPayload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        successToast("Appointment booked successfully!");
        resetForm();
        setLeadId(null);
      }
    } catch (error) {
      console.error("Submission failed:", error.response?.data || error.message);
      alert("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="get-in-touch">
      <div className="section-space side-space get-in-touch-inner">
        <div className="row common-gutter">
          <div className="col-md-7 col-xl-8">
            <Formik
              initialValues={initialFormData}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, status, setFieldValue }) => (
                <Form id="getInTouchForm" className="getInTouchForm">
                  <h4 className="form-title">Get in touch with us</h4>
                  <div className="row common-gutter">
                    <div className="col-md-6">
                      <label htmlFor="name">Name*</label>
                      <Field
                        type="text"
                        name="name"
                        placeholder="Enter your Name*"
                        className="common-input"
                        onChange={(e) => {
                          debouncedSaveProgressiveLead("name", e.target.value);
                          setFieldValue("name", e.target.value);
                        }}
                      />
                      <ErrorMessage name="name" component="div" className="error" />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="email">E-mail*</label>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Enter your E-mail*"
                        className="common-input"
                        onChange={(e) => {
                          debouncedSaveProgressiveLead("email", e.target.value);
                          setFieldValue("email", e.target.value);
                        }}
                      />
                      <ErrorMessage name="email" component="div" className="error" />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="mobile">Mobile No.*</label>
                      <Field
                        type="text"
                        name="mobile"
                        placeholder="Enter your mobile number*"
                        className="common-input"
                        onChange={(e) => {
                          debouncedSaveProgressiveLead("mobile", e.target.value);
                          setFieldValue("mobile", e.target.value);
                        }}
                      />
                      <ErrorMessage name="mobile" component="div" className="error" />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="hospital">Hospital*</label>
                      <Field
                        as="select"
                        name="hospital"
                        className="custom-select"
                        onChange={(e) => {
                          debouncedSaveProgressiveLead("hospital", e.target.value);
                          setFieldValue("hospital", e.target.value);
                        }}
                      >
                        <option value="" disabled>
                          Select Hospital*
                        </option>
                        {HOSPITALS.map((hospital) => (
                          <option key={hospital.id} value={hospital.id}>
                            {hospital.masterName}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage name="hospital" component="div" className="error" />
                    </div>
                    <div className="col-12">
                      <label htmlFor="message">Your Message*</label>
                      <Field
                        as="textarea"
                        name="message"
                        placeholder="Enter your message here*"
                        className="common-input"
                        onChange={(e) => {
                          debouncedSaveProgressiveLead("message", e.target.value);
                          setFieldValue("message", e.target.value);
                        }}
                      />
                      <ErrorMessage name="message" component="div" className="error" />
                    </div>
                    <div className="col-12">
                      <button
                        type="submit"
                        className={`button-primary ${isSubmitting ? "disabled-btn" : ""}`}
                        disabled={isSubmitting}
                      >
                        <span>
                          {isSubmitting ? (
                            <>
                              Submitting
                              <div className="spinner-border spinner-border-sm custom-spinner ms-2"></div>
                            </>
                          ) : (
                            "Submit"
                          )}
                        </span>
                      </button>
                    </div>
                  </div>
                  {status && status.message && (
                    <div className={status.success ? "success" : "error"}>
                      {status.message}
                    </div>
                  )}
                </Form>
              )}
            </Formik>
          </div>

          <div className="col-md-5 col-xl-4">
            <div className="getInTouchForm">
              <h5>Contact Us</h5>
              <div className="contacts-div">
                <div className="icon-wrap">
                  <Image width={20} height={20} src={Phone.src} alt="Phone Icon" />
                </div>
                <div>
                  <p>Phone</p>
                  <Link href="tel:+919307076767" className="numberHover">
                    93 0707 6767
                  </Link>
                </div>
              </div>

              <div className="contacts-div">
                <div className="icon-wrap">
                  <Image width={20} height={20} src={Share.src} alt="Share Icon" />
                </div>
                <div>
                  <p>Follow us</p>
                  <div className="social-icons-div">
                    <Link href="https://www.instagram.com/lokmanya_hospital/" target="_blank">
                      <Image width={32} height={32} src={Instagram.src} alt="Instagram" />
                    </Link>
                    <Link href="https://www.linkedin.com/company/lokmanyahospitals/" target="_blank">
                      <Image width={32} height={32} src={Linkedin.src} alt="LinkedIn" />
                    </Link>
                    <Link href="https://www.facebook.com/lokmanyahospitals" target="_blank">
                      <Image width={32} height={32} src={Facebook.src} alt="Facebook" />
                    </Link>
                    <Link href="https://www.youtube.com/@LokmanyaHospitalsPune/" target="_blank">
                      <Image width={32} height={32} src={Youtube.src} alt="YouTube" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
