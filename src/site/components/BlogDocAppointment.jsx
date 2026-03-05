import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import axiosConfig from "../../utils/axiosConfig";
import { errorToast, successToast } from "../../utils/Toast";
import { addLeadDoctorSinglePage, fetchAllArea } from "@/ApiActions/CommonApi";

const BlogdocAppointment = ({
  isModalOpen,
  currentDoctorName,
  handleModalClose,
  relatedDoctor,
  title = "Book Appointment",
  selectedHospital = "",
}) => {
  const [locations, setLocations] = useState([]); // State to store fetched locations
  const [loadingLocations, setLoadingLocations] = useState(true); // Loading state for dropdown


  // Fetch areas (locations) data
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetchAllArea();
        setLocations(response.data.data); // Set areas
      } catch (error) {
        console.error("Failed to fetch locations", error);
      }
      finally {
        setLoadingLocations(false);
      }
    };
    fetchLocations();
  }, []);

  if (!isModalOpen) return null;

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .matches(/^[a-zA-Z' -]+$/, "Please enter a valid Name"),
    mobile: Yup.string()
      .required("Mobile Number is required")
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
    location: Yup.string().required("Location is required"),
    email: Yup.string()
      .required("Email is required")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email address"
      ),
  });

  // Initial form data with selectedHospital as default value for location
  const initialFormData = {
    d_name: currentDoctorName,
    email: "",
    name: "",
    mobile: "",
    city: "",
    location: selectedHospital || "",
  };

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const jsonPayload = {
        doctorId: relatedDoctor.id,
        patientName: values.name,
        mobileNumber: values.mobile,
        cityId: values.city,
        branch: values.location,
        email: values.email,
      };

      const response = await addLeadDoctorSinglePage(jsonPayload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // const response = await axiosConfig.post("/add-lead-doctor", jsonPayload, {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });

      if (response.status == 201) {
        successToast("Appointment booked successfully!");
        resetForm();
        handleModalClose();
      }
    } catch (error) {
      console.error("Submission failed:", error.response?.data || error.message);
      alert("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="appointModal" className="modal fade show" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleModalClose}
            ></button>
          </div>
          <div className="modal-body">
            <Formik
              initialValues={initialFormData}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <Field type="hidden" id="d_name" name="d_name" />
                    <Field
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <Field type="email" id="email" name="email" className="form-control" />
                    <ErrorMessage name="email" component="div" className="error" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="mobile" className="form-label">
                      Mobile
                    </label>
                    <Field
                      type="tel"
                      className="form-control"
                      id="mobile"
                      name="mobile"
                    />
                    <ErrorMessage
                      name="mobile"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="location" className="form-label">
                      Location
                    </label>
                    {loadingLocations ? (
                      <p>Loading locations...</p>
                    ) : (
                      <Field
                        as="select"
                        className="form-control"
                        id="location"
                        name="location"
                      >
                        <option value="">Select Location</option>
                        {locations.map((loc) => (
                          <option key={loc.id} value={loc.id}>
                            {loc.masterName}
                          </option>
                        ))}
                      </Field>
                    )}
                    <ErrorMessage
                      name="location"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="flexBtn">
                    <button
                      type="submit"
                      className="button-primary false"
                      disabled={isSubmitting}
                    >
                      <span>{isSubmitting ? "Submitting..." : "Submit"}</span>
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogdocAppointment;
