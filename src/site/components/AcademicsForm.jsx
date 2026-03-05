import React, { useState } from "react";
import {
    required,
    requiredFile,
    validateForm,
    validpatientName,
    validMail,
    validMobile
} from "../../utils/commonHelpers";
import { errorToast, successToast } from "../../utils/Toast";
import { CustomSelect } from ".";
// import { CustomSelect } from "@/components";
import axiosConfig from "../../site/../utils/axiosConfig";
// import axiosConfig from "../site/../utils/axiosConfig";



const AcademicsForm = ({ jobPositionOptions }) => {
    const initialState = {
        formData: {
            patientName: "",
            email: "",
            mobileNumber: "",
            resume: null,
            courseName: "",
        },
        errors: {
            patientName: "",
            email: "",
            mobileNumber: "",
            resume: "",
            courseName: "",
        },
    };

    const [academicsForm, setAcademicsForm] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [fileInputKey, setFileInputKey] = useState(Date.now());


    const handleChange = (e) => {
        const { name, value } = e.target;
        setAcademicsForm((prev) => ({
            ...prev,
            formData: {
                ...prev.formData,
                [name]: value,
            },
            errors: {
                ...prev.errors,
                [name]: "",
            },
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setAcademicsForm((prev) => ({
            ...prev,
            formData: {
                ...prev.formData,
                resume: file || null,
            },
            errors: {
                ...prev.errors,
                resume: "",
            },
        }));
    };

    const handleModalClose = () => {
        setAcademicsForm(initialState);
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();

        const validationRules = {
            patientName: [required, validpatientName],
            email: [required, validMail],
            mobileNumber: [required, validMobile],
            resume: [requiredFile],
            courseName: [required],
        };

        const errors = validateForm(academicsForm.formData, validationRules);

        if (Object.keys(errors).length > 0) {
            setAcademicsForm((prev) => ({
                ...prev,
                errors: errors,
            }));
            errorToast("Please fill all required fields correctly!");
            return;
        }

        setLoading(true);

        // Prepare form data for submission (including file)
        const formData = new FormData();
        Object.entries(academicsForm.formData).forEach(([key, value]) => {
            formData.append(key, value);
        });
        console.log("Submitting form data:", academicsForm.formData);

        try {
            const response = await axiosConfig.post(`api/common/add-lead-course`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 201) {
                successToast("Submitted successfully!");
                setFileInputKey(Date.now());
                handleModalClose();
                setLoading(false);
            }
        } catch (error) {
            console.error("Form submission error:", error);
            errorToast("Something went wrong. Please try again.");
        }

        // await promiseToast(
        //     async () => {
        //         // Example POST request:
        //         const response = await axiosConfig.post(`api/common/add-lead-careers`, data, {
        //             headers: {
        //                 "Content-Type": "multipart/form-data",
        //             },
        //         });
        //         setFileInputKey(Date.now());
        //         handleModalClose();
        //         setLoading(false);
        //     },
        //     "Submitting...",
        //     "Your enquiry has been submitted successfully!",
        //     "Submission failed"
        // );
    };

    return (
        <div className="academics-form">
            <form onSubmit={onSubmitForm}>
                <div className="row g-md-4 g-3">
                    {/* Full Name */}
                    <div className="col-lg-6 col-md-12">
                        <div className="">
                            <label htmlFor="patientName" className="form-label">
                                Full Name*
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="patientName"
                                name="patientName"
                                placeholder="Enter your full name"
                                value={academicsForm.formData.patientName}
                                onChange={handleChange}
                            />
                            {academicsForm.errors.patientName && (
                                <span className="error text-danger">
                                    {academicsForm.errors.patientName}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Email */}
                    <div className="col-lg-6 col-md-12">
                        <div className="">
                            <label htmlFor="email" className="form-label">
                                Email*
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                value={academicsForm.formData.email}
                                onChange={handleChange}
                            />
                            {academicsForm.errors.email && (
                                <span className="error text-danger">
                                    {academicsForm.errors.email}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Mobile Number */}
                    <div className="col-lg-6 col-md-12">
                        <div className="">
                            <label htmlFor="mobileNumber" className="form-label">
                                Mobile Number*
                            </label>
                            <input
                                type="tel"
                                className="form-control"
                                id="mobileNumber"
                                name="mobileNumber"
                                placeholder="Enter your mobile number"
                                value={academicsForm.formData.mobileNumber}
                                onChange={handleChange}
                            />
                            {academicsForm.errors.mobileNumber && (
                                <span className="error text-danger">
                                    {academicsForm.errors.mobileNumber}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Resume Upload */}
                    <div className="col-lg-6 col-md-12">
                        <div className="">
                            <label htmlFor="resume" className="form-label">Resume*</label>
                            <input
                                key={fileInputKey}
                                type="file"
                                id="resume"
                                className="form-control border-0"
                                accept="application/pdf"
                                onChange={handleFileChange}
                            />
                            {academicsForm.errors.resume && (
                                <span className="error text-danger">
                                    {academicsForm.errors.resume}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Job Position */}
                    <div className="col-lg-12 col-md-12">
                        <div className="">
                            <label htmlFor="courseName" className="form-label">
                                Course*
                            </label>
                            <CustomSelect
                                name="courseName"
                                options={jobPositionOptions}
                                defaultOption="Select Course"
                                value={academicsForm.formData.courseName}
                                onChange={(e) =>
                                    setAcademicsForm((prev) => ({
                                        ...prev,
                                        formData: {
                                            ...prev.formData,
                                            courseName: e.target.value,
                                        },
                                        errors: {
                                            ...prev.errors,
                                            courseName: "",
                                        },
                                    }))
                                }
                            />
                            {academicsForm.errors.courseName && (
                                <span className="error text-danger">
                                    {academicsForm.errors.courseName}
                                </span>
                            )}
                        </div>
                    </div>


                    {/* Submit Button */}
                    <div className="modal-submit-sec d-flex justify-content-md-start justify-content-center mt-md-4 mt-3">
                        <button
                            className={`button-primary ${loading ? "theme-btn-disabled" : ""}`}
                            type="submit"
                            disabled={loading}
                        >
                            <span>{loading ? "Submitting..." : "Submit"}</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AcademicsForm;
