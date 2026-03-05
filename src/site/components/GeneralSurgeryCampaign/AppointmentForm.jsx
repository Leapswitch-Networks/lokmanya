import { storeLeadInfo } from "@/ApiActions/CommonApi";
import { errorToast, successToast } from "@/utils/Toast";
import Image from "next/image";
import { useState } from "react";

const AppointmentForm = () => {
  const doctors = [
    { value:"24", name: "Dr. Aravind Kulkarni" },
    { value:"23",  name: "Dr. Suprashant Kulkarni" },
    { value:"58", name: "Dr. Saurabh Dumbre" },
  ];

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    doctor: "",
    city: "",
  });

  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is required";
    if (!formData.doctor) newErrors.doctor = "Please select a doctor";
    if (!formData.city) newErrors.city = "City is required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  
  const handleSubmit = async (e) => {
  e.preventDefault();

  const newErrors = {};
  if (!formData.fullName) newErrors.fullName = "Full Name is required.";
  if (!formData.phoneNumber) newErrors.phoneNumber = "Phone Number is required.";
  if (!formData.city) newErrors.city = "City is required.";
  if (!formData.doctor) newErrors.doctor = "Please select a doctor.";

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  try {
    setIsSubmitting(true); // ✅ Start submitting

    const jsonPayload = {
      patientName: formData.fullName,
      mobileNumber: formData.phoneNumber,
      location: formData.city,
      doctorId: formData.doctor,
      formtype: "general-surgery-campaign",
    };

    const response = await storeLeadInfo(jsonPayload, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 201) {
      successToast("Appointment booked successfully!");
      setFormSubmitted(true);
      setFormData({ fullName: "", phoneNumber: "", doctor: "", city: "" });
    }
  } catch (error) {
    console.error("Submission failed:", error.response?.data || error.message);
    errorToast("An error occurred. Please try again.");
  } finally {
    setIsSubmitting(false); // ✅ End submitting
  }
};

  return (
    <section
      id="bookappointment"
      className="enquiry-meet-section side-space section-space hospital-book-section gen-meet-sec"
    >
      <div className="enquiry-meet-inner bg-color-image position-relative">
        <div className="row w-100 g-0">
          <div className="col-xl-6 col-lg-6 col-md-8 d-lg-flex d-none">
            <div className="enquiry-meet-img">
              <Image width={470} height={370}
                src="/images/new-theme/Newpages/CampaignPages/book-senior-doc-img.webp"
                alt="meet"
              />
            </div>
          </div>

          <div className="col-xl-6 col-lg-6 col-md-12">
            <div id="appointment">
              <h3 className="text-center text-white mb-4">Book An Appointment</h3>
              <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name*"
                    required
                  />
                  {errors.fullName && (
                    <span className="error" style={{ color: "red" }}>
                      {errors.fullName}
                    </span>
                  )}
                </div>

                <div className="col-md-6">
                  <input
                    type="tel"
                    className="form-control"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number*"
                    required
                  />
                  {errors.phoneNumber && (
                    <span className="error" style={{ color: "red" }}>
                      {errors.phoneNumber}
                    </span>
                  )}
                </div>

                <div className="col-md-6">
                  <select
                    className="form-select form-select-white"
                    name="doctor"
                    value={formData.doctor}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select Doctor
                    </option>
                    {doctors.map((doc, i) => (
                      <option key={i} value={doc.value}>
                        {doc.name}
                      </option>
                    ))}
                  </select>
                  {errors.doctor && (
                    <span className="error" style={{ color: "red" }}>
                      {errors.doctor}
                    </span>
                  )}
                </div>

                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City*"
                    required
                  />
                  {errors.city && (
                    <span className="error" style={{ color: "red" }}>
                      {errors.city}
                    </span>
                  )}
                </div>

                <div className="col-md-12">
                  <div className="col-md-12">
                    <button
                      type="submit"
                      name="contactbtn"
                      className="button-primary btn-white w-100"
                      disabled={isSubmitting} // ✅ Disable while submitting
                    >
                      <span>{isSubmitting ? "Submitting..." : "Submit"}</span>
                    </button>
                  </div>
                </div>
              </form>

              {/* {formSubmitted && (
                <div
                  aria-live="polite"
                  aria-atomic="true"
                  style={{ position: "relative", zIndex: 9999 }}
                >
                  <div style={{ position: "fixed", top: 110, right: 20 }}>
                    <div
                      className="toast show"
                      role="alert"
                      aria-live="assertive"
                      aria-atomic="true"
                    >
                      <div className="toast-header">
                        <strong className="me-auto">Success</strong>
                        <button
                          type="button"
                          className="btn-close"
                          aria-label="Close"
                          onClick={() => setFormSubmitted(false)}
                        />
                      </div>
                      <div className="toast-body">
                        Your form has been submitted successfully!
                      </div>
                    </div>
                  </div>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentForm;
