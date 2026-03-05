import React, { useState, useEffect, useRef, useCallback } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { errorToast, successToast } from "../../utils/Toast";
import { addLeadDoctor, fetchAllArea, getDoctorSingleById, createLead, updateLead } from "@/ApiActions/CommonApi";
import debounce from "lodash.debounce";

const DocAppointmentModal = ({
  isModalOpen,
  currentDoctorName,
  handleModalClose,
  title = "Book Appointment",
  selectedHospital = "",
}) => {
  const [locations, setLocations] = useState([]);
  const [loadingLocations, setLoadingLocations] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [initialFormValues, setInitialFormValues] = useState({
    name: "",
    mobile: "",
    location: "",
  });

  const [leadId, setLeadId] = useState(null);
  const [progressiveData, setProgressiveData] = useState({
    patientName: "",
    mobileNumber: "",
    areaId: "",
    doctorName: currentDoctorName,
    formtype: "hyperlocal",
  });

  const isCreatingLead = useRef(false);

  // ✅ function pehle declare
  const saveProgressiveLead = async (fieldName, value) => {
    try {
      const keyMap = {
        name: "patientName",
        mobile: "mobileNumber",
        location: "areaId",
      };

      const updatedData = {
        ...progressiveData,
        [keyMap[fieldName]]: value,
        doctorName: currentDoctorName,
        formtype: "doctor",
      };

      setProgressiveData(updatedData);

      if (!leadId && fieldName === "name" && value.trim().length >= 3) {
        if (isCreatingLead.current) return;
        isCreatingLead.current = true;

        const response = await createLead(updatedData);
        if (response?.status === 201) {
          setLeadId(response.data.id);
        }

        isCreatingLead.current = false;
      } else if (leadId) {
        await updateLead({ id: leadId, ...updatedData });
      }
    } catch (error) {
      console.error("Progressive save error:", error);
      isCreatingLead.current = false;
    }
  };

  // ✅ ab debounce safely use ho sakta hai
  const debouncedSaveProgressiveLead = useCallback(
    debounce((fieldName, value) => {
      saveProgressiveLead(fieldName, value);
    }, 1000),
    [progressiveData, leadId, currentDoctorName]
  );

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoadingLocations(true);
        const areaResponse = await fetchAllArea();
        const allLocations = areaResponse.data?.data || [];

        const doctorResponse = await getDoctorSingleById(currentDoctorName);
        let doctorLocations = [];
        if (doctorResponse.data?.opdTiming) {
          try {
            const opdData = JSON.parse(doctorResponse.data.opdTiming);
            doctorLocations = opdData.week.map((item) => item.location);
          } catch (error) {
            console.error("Error parsing OPD timing:", error);
          }
        }

        const filteredLocations = allLocations.filter((loc) =>
          doctorLocations.includes(loc.masterName)
        );
        const finalLocations = filteredLocations.length > 0 ? filteredLocations : allLocations;

        const defaultLoc = finalLocations[0]?.id || "";

        setLocations(finalLocations);
        setSelectedLocation(defaultLoc);

        setInitialFormValues((prev) => ({
          ...prev,
          location: defaultLoc,
        }));
      } catch (error) {
        console.error("Failed to fetch locations:", error.response || error.message);
        errorToast("Failed to fetch locations. Please try again.");
      } finally {
        setLoadingLocations(false);
      }
    };

    if (isModalOpen && currentDoctorName) {
      fetchLocations();
    }
  }, [isModalOpen, currentDoctorName]);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .matches(/^[a-zA-Z' -]+$/, "Please enter a valid name"),
    mobile: Yup.string()
      .required("Mobile number is required")
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
    location: Yup.string().required("Location is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const payload = {
        doctorId: currentDoctorName,
        patientName: values.name,
        mobileNumber: values.mobile,
        areaId: values.location,
        leadId: leadId,
      };

      const response = await addLeadDoctor(payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        successToast("Appointment booked successfully!");
        resetForm();
        setLeadId(null);
        handleModalClose();
      } else {
        errorToast("Failed to book appointment. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error.response?.data || error.message);
      errorToast("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ condition ab sirf return ke andar
  if (!isModalOpen) return null;

  return (
    <div id="appointModal" className="modal fade show" tabIndex="-1" style={{ display: "block" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" onClick={handleModalClose}></button>
          </div>
          <div className="modal-body">
            <Formik
              enableReinitialize
              initialValues={initialFormValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, values, setFieldValue }) => (
                <Form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <Field
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      onChange={(e) => {
                        const val = e.target.value;
                        setFieldValue("name", val);
                        setInitialFormValues((prev) => ({ ...prev, name: val }));
                        debouncedSaveProgressiveLead("name", val);
                      }}
                    />
                    <ErrorMessage name="name" component="div" className="text-danger" />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="mobile" className="form-label">Mobile</label>
                    <Field
                      type="tel"
                      className="form-control"
                      id="mobile"
                      name="mobile"
                      onChange={(e) => {
                        const val = e.target.value;
                        setFieldValue("mobile", val);
                        setInitialFormValues((prev) => ({ ...prev, mobile: val }));
                        debouncedSaveProgressiveLead("mobile", val);
                      }}
                    />
                    <ErrorMessage name="mobile" component="div" className="text-danger" />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="location" className="form-label">Location</label>
                    {loadingLocations ? (
                      <p>Loading locations...</p>
                    ) : (
                      <Field
                        as="select"
                        className="form-control"
                        id="location"
                        name="location"
                        value={values.location}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFieldValue("location", val);
                          setInitialFormValues((prev) => ({ ...prev, location: val }));
                          setSelectedLocation(val);
                          debouncedSaveProgressiveLead("location", val);
                        }}
                      >
                        <option value="">Select Location</option>
                        {locations.map((loc) => (
                          <option key={loc.id} value={loc.id}>
                            {loc.masterName}
                          </option>
                        ))}
                      </Field>
                    )}
                    <ErrorMessage name="location" component="div" className="text-danger" />
                  </div>

                  <div className="flexBtn">
                    <button
                      type="submit"
                      className={`button-primary false ${isSubmitting ? "disabled-btn" : ""}`}
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
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocAppointmentModal;
