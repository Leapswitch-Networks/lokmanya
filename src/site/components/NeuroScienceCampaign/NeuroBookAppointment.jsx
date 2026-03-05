import { storeLeadInfo } from "@/ApiActions/CommonApi";
import { errorToast, successToast } from "@/utils/Toast";
import Image from "next/image";
import { useState, useEffect } from "react";

const NeuroBookAppointment = ({ image, doctorList }) => {

  const defaultDoctors = [
    { value: "16", label: "Dr. Nilesh Khanzode" },
    { value: "54", label: "Dr. Ritesh Bhalla" },
    { value: "42", label: "Dr. Amit Pande" },
    { value: "999", label: "Dr. Saste Dhairyshil" },
  ];

  const finalDoctorList = doctorList?.length ? doctorList : defaultDoctors;

  const fallbackImg = "/images/new-theme/Newpages/CampaignPages/gn-book-img.webp";


  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    doctor: "",
    city: "",
  });


  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      formtype: "neuro_science",
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


  useEffect(() => {
    if (formSubmitted) {
      const timer = setTimeout(() => {
        setFormSubmitted(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [formSubmitted]);

  return (
    <section id="bookappointment" className="campaign-book-sec side-space section-space">
      <div className="bg-color-image campaign-book-sec-inner">
        <div className="row align-items-center g-0">
          <div className="col-xl-6 col-lg-6 col-md-7">
            <div id="appointment" className="camp-book-form">
              <h3 className="text-md-start text-center text-white mb-4">
                Book An Appointment
              </h3>
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
                    aria-label="Select Doctor"
                    className="form-select form-select-white"
                    name="doctor"
                    value={formData.doctor}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select Doctor
                    </option>

                    {finalDoctorList.map((doc) => (
                      <option key={doc.value} value={doc.value}>
                        {doc.label}
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
                      data-bs-delay="3000"
                    >
                      <div className="toast-header">
                        <strong className="me-auto">Success</strong>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="toast"
                          aria-label="Close"
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

          <div className="col-xl-6 col-lg-6 col-md-5 d-md-block d-none">
            <div className="campaign-book-sec-img">
              <Image width={615} height={375}
                className="w-100 h-100"
                // src="/images/new-theme/Newpages/CampaignPages/gn-book-img.webp"
                src={image ? image : fallbackImg}
                alt="book appointment"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NeuroBookAppointment;
