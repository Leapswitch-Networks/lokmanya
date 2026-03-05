// Complete and cleaned DoctorSingle component in Next.js
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "@/styles/doctorsingle.css"
import * as Yup from "yup";
import Head from "next/head";
import Link from "next/link";

import { successToast } from "../../utils/Toast";

import defaultImage from "@/site/assets/images/Dr-placeholder-img.webp";
import BagIcon from "@/site/assets/images/icons/BagIcon";
import Call from "@/site/assets/images/icons/Call";
import BtnPlay from "@/site/assets/images/New-theme/icons/blu-btn-play.svg";
import Image from "next/image";
import { addLeadDoctorSinglePage, createLead, fetchAllArea, getDoctorSingleBySlug, updateLead, getVideosFrontend } from "@/ApiActions/CommonApi";
import axiosConfig from '../../utils/axiosConfig';
import LogoLoader from "@/components/loader/LogoLoader";
// import Image from "next/image";
import DocNotFound from "@/components/Error/DocNotFound";
import debounce from "lodash.debounce";
import FaqSection from "@/site/components/FaqSection/FaqSection";
import { ButtonPrimary } from "@/site/components";
import BookCallSection from "@/site/components/BookCallnowSection/BookCallSection";
import ConditionTreatmentComponent from "@/site/components/GeneralSurgeryCampaign/ConditionTreatment/ConditionTreatmentComponent";
const DoctorSingle = ({ blogData }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeBranch, setActiveBranch] = useState("");
  const [branches, setBranches] = useState([]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const sectionRef = useRef(null);
  const scrollToSection = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const [leadId, setLeadId] = useState(null);
  const [progressiveData, setProgressiveData] = useState({
    patientName: "",
    mobileNumber: "",
    branch: "",
    query: "",
    doctorName: "",
    slug: "",
  });
  const [doctorVideos, setDoctorVideos] = useState([]);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [conditions, setConditions] = useState([]);
  const isCreatingLead = useRef(false);

  const openVideoModal = (url) => {
    setVideoUrl(url);
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    setVideoUrl("");
  };

  const saveProgressiveLead = async (fieldName, value) => {
    try {
      const keyMap = {
        patientName: "patientName",
        mobileNumber: "mobileNumber",
        branch: "areaId",
        query: "message",
      };
      const updatedData = {
        ...progressiveData,
        [keyMap[fieldName]]: value,
        doctorName: doctor?.id || "",
        slug: slug,
        formtype: "doctor",
      };
      setProgressiveData(updatedData);
      if (!leadId && fieldName === "patientName" && value.trim().length >= 3) {
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
      console.error("Progressive lead save error:", error);
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


  useEffect(() => {
    if (!router.isReady) return;
    const path = router.asPath;
    // const slug = path.split("/").filter(Boolean).pop();
    const resolvedSlug = path.split("/").filter(Boolean).pop();

    const fetchDoctor = async () => {
      try {
        // const response = await getDoctorSingleBySlug(slug);
        const response = await getDoctorSingleBySlug(resolvedSlug);
        setDoctor(response.data);
        const opdData = JSON.parse(response.data.opdTiming);

        if (opdData.week && opdData.week.length > 0) {
          setActiveBranch(opdData.week[0].location);
          setActiveTabIndex(0);
        }
      } catch (error) {
        console.error("Error fetching doctor:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [router.isReady, router.asPath]);

  useEffect(() => {
    if (doctor) {
      const fetchConditions = async () => {
        try {
          const response = await axiosConfig.get('/api/admin/get-doctor-conditions', {
            params: { doctor_id: doctor.id }
          });
          setConditions(response.data);
        } catch (error) {
          console.error("Error fetching conditions:", error);
        }
      };
      fetchConditions();

      const fetchVideos = async () => {
        try {
          const response = await getVideosFrontend(doctor.id);
          setDoctorVideos(response.data);
        } catch (error) {
          console.error("Error fetching videos:", error);
        }
      };
      fetchVideos();
    }
  }, [doctor]);

  useEffect(() => {
    if (isVideoModalOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("bodyClass");
    } else {
      document.body.style.overflow = "auto";
      document.body.classList.remove("bodyClass");
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.classList.remove("bodyClass");
    };
  }, [isVideoModalOpen]);

  // Fetch branches for the dropdown
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetchAllArea();
        setBranches(response.data.data); // Set areas
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };
    fetchBranches();

  }, [slug, blogData]);

  useEffect(() => {
    if (doctor && branches.length > 0) {
      const opdData = JSON.parse(doctor.opdTiming);
      if (opdData.week && opdData.week.length > 0) {
        const locationName = opdData.week[0].location;
        const matchingBranch = branches.find(branch => branch.masterName === locationName);
        if (matchingBranch) {
          setActiveBranch(matchingBranch.id);
          setActiveTabIndex(0);
        }
      }
    }
  }, [doctor, branches]);

  const baseUrl = process.env.NEXT_PUBLIC_FILE_BASE_URL;
  if (loading) {
    return <LogoLoader />;
  }

  if (!doctor) {
    return <DocNotFound BackBtn />;
  }

  const {
    id,
    doctorName,
    description,
    designation,
    specialty,
    mobile_no,
    education,
    featured_images,
    experience,
    opdTiming,
    metaTitle,
    metaDescription,
    doctorSchema,
    specialtyName,
  } = doctor;

  // Initial Values
  const initialValues = {
    doctorName: doctorName,
    patientName: "",
    mobileNumber: "",
    branch: activeBranch,
    query: "",
    //recaptcha: "",
  };
  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    patientName: Yup.string()
      .required("Name is required")
      .matches(/^[a-zA-Z' -]+$/, "Please enter a valid Name"),
    mobileNumber: Yup.string()
      .required("Mobile Number is required")
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
    branch: Yup.string().required("Branch is required"),
    query: Yup.string()
      .required("Message is required")
      .matches(/^[a-zA-Z0-9\s.,!?\'"-]+$/, "Please enter a valid Message"),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const jsonPayload = {
        doctorName: id,
        patientName: values.patientName,
        mobileNumber: values.mobileNumber,
        branch: values.branch,
        query: values.query,
        slug: slug,
        leadId: leadId
      };
      const response = await addLeadDoctorSinglePage(jsonPayload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        successToast("Appointment booked successfully!");
        setLeadId(null);
        resetForm(); // Reset form fields
      }

    } catch (error) {
      console.error(
        "Submission failed:",
        error.response?.data || error.message
      );
      alert("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  function convertTo12HourFormat(time24) {
    let hours = parseInt(time24.split(":")[0], 10);
    let minutes = time24.split(":")[1];
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return `${hours}:${minutes} ${ampm}`;
  }
  const handlePillClick = (index, branch) => {
    setActiveTabIndex(index);
    setActiveBranch(branch);
  };


  let faqData = [];

  if (doctor?.faq) {
    // If FAQ comes as JSON string, parse it
    if (typeof doctor.faq === "string") {
      try {
        faqData = JSON.parse(doctor.faq);
      } catch (err) {
        faqData = [];
      }
    } else if (Array.isArray(doctor.faq)) {
      faqData = doctor.faq;
    }
  }


  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        {/* <script type="application/ld+json">
          {JSON.stringify(doctorSchema)}
        </script> */}
        <script type="application/ld+json">
          {`{
                  "@context": "https://schema.org",
                  "@type": "Physician",
                  "name": "${doctorName}",
                  "image": "https://lokmanyahospitals.com/images/${featured_images}",
                  "medicalSpecialty": "${specialty}",
                  "description": "${description}",
          "address": {
            "@type": "PostalAddress",
          "streetAddress": "Lokmanya Hospitals Pvt. Ltd., 3rd Floor, 759/51, Deccan Pride, F.C. Road, Deccan Gymkhana",
          "addressLocality": "Pune",
          "addressRegion": "Maharashtra",
          "postalCode": "411004",
          "addressCountry": "IN"
          },
          "contactPoint": {
            "@type": "ContactPoint",
          "telephone": "+91-9307076767",
          "contactType": "Appointment"
          },
          "hospitalAffiliation": {
            "@type": "Hospital",
          "name": "Lokmanya Hospital",
          "url": "https://lokmanyahospitals.com/",
          "address": {
            "@type": "PostalAddress",
          "streetAddress": "Lokmanya Hospitals Pvt. Ltd., 3rd Floor, 759/51, Deccan Pride, F.C. Road, Deccan Gymkhana",
          "addressLocality": "Pune",
          "addressRegion": "Maharashtra",
          "postalCode": "411004",
          "addressCountry": "IN"
            }
          },
          "review": {
            "@type": "Review",
          "author": {
            "@type": "Person",
          "name": "${doctorName}"
            },
          "reviewRating": {
            "@type": "Rating",
          "ratingValue": "4.7",
          "bestRating": "5"
            },
          },
          "acceptsInsurance": "Yes",
          "url": "https://lokmanyahospitals.com/doctors/${slug || ""}",
        }`}
        </script>
      </Head>

      {/* <LogoLoader /> */}
      <section className="doctor-banner-section pb-0">
        <div className="doctor-top-info">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <div className="doctor-prof-container align-items-center">
                <figure className="doctor-image">
                  {baseUrl && featured_images ? (
                    <img
                      crossOrigin="anonymous"
                      src={`${baseUrl}/${featured_images}`}
                      alt={doctorName}
                    />
                  ) : (
                    <img
                      crossOrigin="anonymous"
                      src={defaultImage.src}
                      alt={doctorName}
                    />
                  )}
                </figure>
                <div className="doctor-info">
                  <h1 className="doctor-name text-white">{doctorName}</h1>
                  <ul className="education">
                    {education && (
                      <li>
                        <p className="mb-md-3 mb-2 text-white">{education}</p>
                      </li>
                    )}
                    {designation && (
                      <li>
                        <p className="mb-md-3 mb-2 text-white">{designation}</p>
                      </li>
                    )}
                  </ul>

                  {experience && (
                    <div className="exp">
                      <BagIcon />
                      <span className="text-white">{experience}+ Years of Experience</span>
                    </div>
                  )}
                  <div className="button-group">
                    <Link href="javascript:void(0)" onClick={scrollToSection} className="button-primary btn-white">
                      <span>View More</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 pt-4 pt-lg-0">
              <div className="dept-sec">
                <div className="dept">
                  <h5 className="section-title">Department</h5>
                  <p>{specialtyName}</p>
                </div>
                <div className="contact-wrapper">
                  <h5 className="section-title">Contact</h5>
                  <Link href={`tel:${mobile_no}`} className="contact-group">
                    <Call />
                    <span>{mobile_no}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Single Section */}
      <section
        id="doctor-details"
        className="section-space docSingleSection"
      >
        <div className="doctorSingleWrapper">
          <div className="row">
            <div id="opdDiv" className="col-md-8">
              <h3>Available At & OPD Timings</h3>
              {JSON.parse(opdTiming).week.length > 0 &&
                JSON.parse(opdTiming).week[0].location ? (
                <>
                  <div className="mb-3">
                    <ul
                      className="nav nav-pills locationPills"
                      id="myTab"
                      role="tablist"
                    >
                      {JSON.parse(opdTiming).week.map((location, index) => (
                        <li className="nav-item" key={`location-tab-${index}`}>
                          <a
                            className={`nav-link ${activeTabIndex === index ? "active" : ""}`}
                            id={`location-tab-${index}`}
                            data-bs-toggle="tab"
                            href={`#location-${index}`}
                            role="tab"
                            aria-controls={`location-${index}`}
                            aria-selected={activeTabIndex === index}
                            onClick={(e) => {
                              e.preventDefault(); // prevent default anchor behavior
                              handlePillClick(index, location.location);
                            }}
                          >
                            {location.location}, {location.city || ""}
                          </a>

                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="tab-content mb-4">
                    {JSON.parse(opdTiming).week.map((location, index) => (
                      <div
                        key={`location-content-${index}`}
                        className={`tab-pane opd-bg fade ${activeTabIndex === index ? "show active" : ""}`}
                        id={`location-${index}`}
                        role="tabpanel"
                        aria-labelledby={`location-tab-${index}`}
                      >
                        {location.timings && (
                          <table className="time-table" border="1">
                            <tbody>
                              <tr>
                                {Object.keys(location.timings).map(
                                  (day, dayIndex) => (
                                    <td
                                      key={`day-${dayIndex}`}
                                      className="day-column"
                                    >
                                      {day.charAt(0).toUpperCase() +
                                        day.slice(1)}
                                    </td>
                                  )
                                )}
                              </tr>
                              <tr>
                                {Object.entries(location.timings).map(
                                  ([day, details], timeIndex) => (
                                    <td
                                      key={`time-${timeIndex}`}
                                      className="time-column"
                                    >
                                      {details.status ? (
                                        <div>
                                          {details.times.map(
                                            (time, timeSlotIndex) => (
                                              <div
                                                key={`time-slot-${timeSlotIndex}`}
                                                className="docTime"
                                              >
                                                {convertTo12HourFormat(
                                                  time.openTime
                                                )}{" "}
                                                -{" "}
                                                {convertTo12HourFormat(
                                                  time.closeTime
                                                )}
                                              </div>
                                            )
                                          )}
                                        </div>
                                      ) : details.apppoiment_status ? (
                                        <p className="time-status">
                                          {details.apppoiment_status}
                                        </p>
                                      ) : (
                                        <p className="time-status">-</p>
                                      )}
                                    </td>
                                  )
                                )}
                              </tr>
                            </tbody>
                          </table>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p>No OPD timings available at the moment.</p>
              )}
              {description && (
                <div className="aboutDoctor">
                  {/* <h4>About Doctor</h4> */}
                  <div
                    className="article-sect"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                </div>
              )}

               {conditions.length > 0 && (
                <ConditionTreatmentComponent  conditions={conditions} />
               )}
              {faqData && faqData.length > 0 && faqData.some(faq => faq.question?.trim() || faq.answer?.trim()) && (
                <div className="dr-single-faqsection mt-md-4 mt-3">
                  <h2 className="mb-0">Frequently Asked Questions</h2>
                  <FaqSection data={faqData} />
                </div>
              )}

              {/* {conditions.length > 0 && (
                <section
                  id="conditions"
                  className="campagin-our-srvc-prd"
                >
                  {console.log("conditions ghvjhdg", conditions)
                  }
                  <h2 className="section-heading">Conditions Treated</h2>
                  <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-sm-2 row-cols-2 g-md-4 g-3 justify-content-md-start justify-content-center">
                    {conditions.map((condition, index) => (
                      <div className="col" key={index}>
                        <div className="campagin-our-srvc-prd-card">
                          <div className="campagin-our-srvc-card-img">
                            <Image
                              src={`${baseUrl}/${condition.image}`}
                              alt={condition.name}
                              className="img-fluid"
                              width={270}
                              height={145}
                            />
                            <div className="campagin-our-srvc-card-ctnt">
                              <h4 className="mb-0 dr-condition-name-clamp">{condition.name}</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )} */}

            

              {doctor.expertTagline && (
                <section className="expert-neuro-meet expert-meet-doc-single">
                  <BookCallSection
                    title={doctor.expertTagline}
                    subtitle="Schedule Your Consultation Today!"
                    primaryText="Book an appointment"
                    // secondaryText="Book an appointment"
                    imageUrl="/images/new-theme/Newpages/CampaignPages/expert-neurology-meet-img.png"
                  />
                </section>
              )}

              {doctor?.doctorblog?.length > 0 && (
                <div className="dr-blogs-section mt-md-4 mt-3">
                  <h3>Read Our Latest Blogs</h3>
                  <div className="row row-cols-xl-4 row-cols-lg-4 row-cols-md-3 row-cols-sm-3 row-cols-3 g-md-3 g-2 justify-content-start">
                    {doctor.doctorblog.map((post, i) => (
                      <div className={`col ${i >= 4 ? 'rest-hidden' : ''}`} key={post.id}>
                        <div className="dr-blogs-card">
                          <Link href={`/blogs/${post.slug}`} className="dr-blogs-link">
                            <div className='dr-blogs-img position-relative'>
                              <img
                                loading="lazy"
                                src={`${process.env.NEXT_PUBLIC_FILE_BASE_URL}/${post.thumbnil_image}`}
                                alt={post.title}
                              />
                            </div>
                            <p className="mb-0 mt-2 dr-blogcard-ttl-clamp" dangerouslySetInnerHTML={{ __html: post.title }} />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 d-flex align-items-center justify-content-start view-all-blogs-btn">
                    <Link href='/blogs'>
                      <ButtonPrimary isWhite={true}>View All Blogs</ButtonPrimary>
                    </Link>
                  </div>
                </div>
              )}

              {doctorVideos?.length > 0 && (
                <div className="dr-videos-section mt-md-4 mt-3">
                  <h3>Watch Our Latest Videos</h3>
                  <div className="row row-cols-xl-4 row-cols-lg-4 row-cols-md-2 row-cols-2 g-md-3 g-3 justify-content-start">
                    {doctorVideos.slice(0, 4).map((video, i) => (
                      <div className="col" key={video.id}>
                        <div className="opinions-card" onClick={() => openVideoModal(video.videoUrl)}>
                          <div className="opinion-img mb-2 op-video-img">
                            <button
                              className="btn-play"
                              onClick={(e) => {
                                e.stopPropagation(); // prevent double trigger
                                openVideoModal(video.videoUrl);
                              }}
                            >
                              <Image width={40} height={40} src={BtnPlay.src} alt="Play button" />
                            </button>
                            <Image
                              width={270}
                              height={145}
                              src={video.thumbnil_image ? `/${video.thumbnil_image.replace(/\\/g, '/').replace(/^\//, '')}` : ''}
                              alt={video.title}
                            />
                          </div>
                          <p className="mb-0 mt-2 dr-videocard-ttl-clamp dr-blogcard-ttl-clamp">{video.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* {doctorVideos.length > 4 && ( */}
                  <div className="mt-4 d-flex align-items-center justify-content-start view-all-videos-btn">
                    <Link href='/videos'>
                      <ButtonPrimary isWhite={true}>View All Videos</ButtonPrimary>
                    </Link>
                  </div>
                  {/* )} */}
                </div>
              )}

            </div>


            <div className="col-md-4 mt-md-0 mt-3">
              <div className="contactForm" ref={sectionRef}>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                  enableReinitialize={true}
                >
                  {({ setFieldValue, isSubmitting }) => (
                    <Form id="getInTouchForm" className="getInTouchForm single-docForm">
                      <div className="row common-gutter">
                        <h4 className="text-white">Book An Appointment</h4>

                        {/* Full Name */}
                        <div className="col-12 px-0">
                          <label className="text-white">Full Name*</label>
                          <Field
                            name="patientName"
                            placeholder="Enter your Full Name"
                            className="form-control"
                            onChange={(e) => {
                              const value = e.target.value;
                              setFieldValue("patientName", value);
                              debouncedSaveProgressiveLead("patientName", value);
                            }}
                          />
                          <ErrorMessage
                            name="patientName"
                            component="p"
                            className="error"
                          />
                        </div>

                        {/* Mobile Number */}
                        <div className="col-12 px-0">
                          <label className="text-white">Mobile No.*</label>
                          <Field
                            name="mobileNumber"
                            placeholder="Enter your mobile number"
                            className="form-control"
                            onChange={(e) => {
                              const value = e.target.value;
                              setFieldValue("mobileNumber", value);
                              debouncedSaveProgressiveLead("mobileNumber", value);
                            }}
                          />
                          <ErrorMessage
                            name="mobileNumber"
                            component="p"
                            className="error"
                          />
                        </div>

                        {/* Branch */}
                        <div className="col-12 px-0">
                          <label className="text-white">Branch*</label>
                          <Field
                            as="select"
                            name="branch"
                            className="form-control"
                            value={activeBranch} // Set dropdown value
                            onChange={(e) => {
                              setActiveBranch(e.target.value); // Sync with pills
                              setFieldValue("branch", e.target.value);
                              debouncedSaveProgressiveLead("branch", e.target.value); // ✅ Corrected value
                            }}
                          >
                            <option value="" disabled>
                              Select Branch
                            </option>
                            {branches.length > 0 ? (
                              branches.map((branch) => (
                                <option key={branch.id} value={branch.id}>
                                  {branch.masterName}
                                </option>
                              ))
                            ) : (
                              <option disabled>No branches available</option>
                            )}
                          </Field>
                          <ErrorMessage
                            name="branch"
                            component="p"
                            className="error"
                          />
                        </div>

                        {/* Query */}
                        <div className="col-12 px-0">
                          <label className="text-white">Your Query</label>
                          <Field
                            name="query"
                            placeholder="Type here"
                            className="form-control"
                            as="textarea"
                            onChange={(e) => {
                              const value = e.target.value;
                              setFieldValue("query", value);
                              debouncedSaveProgressiveLead("query", value);
                            }}
                          />
                          <ErrorMessage
                            name="query"
                            component="p"
                            className="error"
                          />
                        </div>

                        {/* Submit Button */}
                        {/* Submit Button */}
                        <button
                          className={`button-primary btn-white ${isSubmitting ? "btn-disabled" : ""}`}
                          type="submit"
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
      </section>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="modal-overlay-custom" onClick={closeVideoModal}>
          <div
            className="modal-content-custom"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-custom"
              onClick={closeVideoModal}
            >
              &times;
            </button>
            <iframe
              src={videoUrl}
              title="Doctor Video"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="modal-video-custom"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};


export default DoctorSingle;
