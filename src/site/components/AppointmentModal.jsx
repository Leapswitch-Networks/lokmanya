import React, { useCallback, useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { errorToast, successToast } from "../../utils/Toast";
import { storeLeadInfo, storeLeadInfoCareer, createLead, updateLead } from "@/ApiActions/CommonApi";
import debounce from "lodash.debounce";

const AppointmentModal = ({
  isModalOpen,
  handleModalClose,
  title,
  file,
  submitBtnClass = "",
  location: propLocation,
  formtype: propFormType,
}) => {
  const ModalRef = useRef();
  const [leadId, setLeadId] = useState(null);
  const [progressiveData, setProgressiveData] = useState({
    patientName: "",
    mobileNumber: "",
    location: "",
    formtype: "",
  });


  // Determine formtype
   let formtype = propFormType || "book_appointment";
  if (file) formtype = "careers";
  else if (title === "Book Health Checkup") formtype = "health_checkup";
  else if (title === "Book a Lab Test") formtype = "lab_test";
  else if (title === "Second Opinion") formtype = "second_opinion";


  const saveProgressiveLead = async (fieldName, value) => {
    try {
      const keyMap = {
        patientName: "patientName",
        mobile: "mobileNumber",
        location: "location",
      };

      const updatedData = {
        ...progressiveData,
        [keyMap[fieldName]]: value,
        formtype,
      };

      setProgressiveData(updatedData);

      // ✅ agar formtype change ho gaya hai → naya lead create hoga
      if (progressiveData.type && progressiveData.type !== formtype) {
        setLeadId(null);
      }

      if (!leadId && fieldName == "patientName" && value.trim().length >= 3) {
        const response = await createLead(updatedData);

        if (response?.status === 201) {
          setLeadId(response.data.id);
        }
      } else if (leadId) {
        await updateLead({ id: leadId, ...updatedData, type: formtype });
      }
    } catch (err) {
      console.error("Progressive save error", err);
    }
  };


  // ✅ Hamesha yahan rakho, koi condition ke andar nahi
  const debouncedSaveProgressiveLead = useCallback(
    debounce((fieldName, value) => {
      saveProgressiveLead(fieldName, value);
    }, 800),
    [progressiveData, leadId,formtype]
  );

  // Cleanup debounce
  useEffect(() => {
    return () => {
      debouncedSaveProgressiveLead.cancel();
    };
  }, [debouncedSaveProgressiveLead]);

  if (!isModalOpen) return null;


  // Get current date
  const currentDate = new Date().toISOString().split("T")[0];

  const validationSchema = Yup.object().shape({
    patientName: Yup.string()
      .required("Name is required")
      .matches(/^[a-zA-Z' -]+$/, "Please enter a valid Name"),

    location: Yup.string()
      .required("Location is required")
      .matches(/^[a-zA-Z' -]+$/, "Please enter a valid location"),

    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile must be a 10-digit number")
      .required("Mobile number is required"),

    coverLetter: file
      ? Yup.mixed()
        .nullable()
        .test("fileType", "Only PDF files are allowed", (value) => {
          return (
            !value ||
            ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(value.type)
          );
        })
      : null,

    resume: file
      ? Yup.mixed()
        .required("Resume is required")
        .test("fileType", "Only PDF files are allowed", (value) => {
          return (
            value &&
            ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(value.type)
          );
        })
      : null,
  });






  const handleSubmit = async (values, { resetForm }) => {
    try {
      if (file) {
        const data = new FormData();
        data.append("patientName", values.patientName);
        data.append("location", values.location);
        data.append("mobileNumber", values.mobile);
        data.append("formtype", values.formtype);
        data.append("leadId", leadId);
        if (values.coverLetter) data.append("coverLetter", values.coverLetter);
        if (values.resume) data.append("resume", values.resume);

        const response = await storeLeadInfoCareer(data);

        if (response.status === 201) {
          successToast("Job application submitted successfully!");
          resetForm();
        }
      } else {
        const jsonPayload = {
          patientName: values.patientName,
          location: values.location,
          mobileNumber: values.mobile,
          selecteddate: values.date,
          formtype: values.formtype,
          leadId: leadId,
        };

        const response = await storeLeadInfo(jsonPayload, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 201) {
          successToast("Appointment booked successfully!");
          resetForm({
            values: {
              patientName: "",
              location: propLocation || "",
              mobile: "",
              formtype: "",
              date: "",
              coverLetter: null,
              resume: null,
              leadId: "",
            },
          });
        }
      }

      handleModalClose();
      setLeadId(null);
      ModalRef.current.click();
    } catch (error) {
      console.error("Submission failed:", error.response?.data || error.message);
      errorToast("An error occurred. Please try again.");
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
              ref={ModalRef}
              // onClick={handleModalClose}
              onClick={() => {
                setLeadId(null); 
                setProgressiveData({
                  patientName: "",
                  mobileNumber: "",
                  location: "",
                  formtype: "",   
                });
                handleModalClose(); 
              }}
            ></button>
          </div>
          <div className="modal-body">
            <Formik
              initialValues={{
                name: "",
                location: propLocation || "",
                mobile: "",
                formtype: formtype,
                date: currentDate,
                coverLetter: null,
                resume: null,
                leadId: leadId || "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue, isSubmitting }) => (
                <Form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <Field
                      type="text"
                      id="patientName"
                      name="patientName"
                      className="form-control"
                      onChange={(e) => {
                        const value = e.target.value;
                        setFieldValue("patientName", value);
                        debouncedSaveProgressiveLead("patientName", value);
                      }}
                    />
                    <ErrorMessage name="patientName" component="div" className="error" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="location" className="form-label">Location</label>
                    <Field
                      type="text"
                      id="location"
                      name="location"
                      className="form-control"
                      readOnly={!!propLocation}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFieldValue("location", value);
                        debouncedSaveProgressiveLead("location", value);
                      }}
                    />
                    <ErrorMessage name="location" component="div" className="error" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="mobile" className="form-label">Mobile</label>
                    <Field
                      type="tel"
                      id="mobile"
                      name="mobile"
                      className="form-control"
                      onChange={(e) => {
                        const value = e.target.value;
                        setFieldValue("mobile", value);
                        debouncedSaveProgressiveLead("mobile", value);
                      }}
                    />
                    <ErrorMessage name="mobile" component="div" className="error" />
                  </div>

                  <Field type="hidden" name="formtype" />

                  {file && (
                    <>
                      <div className="mb-3">
                        <label htmlFor="coverLetter" className="form-label">Cover Letter</label>
                        <input
                          type="file"
                          id="coverLetter"
                          className="form-control"
                          accept="application/pdf"
                          onChange={(event) =>
                            setFieldValue("coverLetter", event.target.files[0])
                          }
                        />
                        <ErrorMessage name="coverLetter" component="div" className="error" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="resume" className="form-label">Resume</label>
                        <input
                          type="file"
                          id="resume"
                          className="form-control"
                          accept="application/pdf"
                          onChange={(event) =>
                            setFieldValue("resume", event.target.files[0])
                          }
                        />
                        <ErrorMessage name="resume" component="div" className="error" />
                      </div>
                    </>
                  )}

                  <div className="flexBtn">
                    <button
                      type="submit"
                      className={`button-primary false ${submitBtnClass} ${isSubmitting ? "disabled-btn" : ""}`}
                      disabled={isSubmitting}
                    >
                      <span className={submitBtnClass}>
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

export default AppointmentModal;
