import { useCallback, useEffect, useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from 'axios'; // Make sure this works with SSR or adjust
// import dynamic from 'next/dynamic';

import CommonInput from "../../components/controls/CustomInput";
// import Pagination from "../../components/Pagination"; // If used
// import ExpBag from '../../site/assets/images/icons/experience-bag-svg.svg';
// import RecaptchaComponent from "@/site/components/RecaptchaComponent";
// import BlogdocAppointment from "@/site/components/BlogDocAppointment";

// import ButtonPrimary from "../../components/controls/PrimaryButton";

import Calendar from "@/site/assets/images/blogListing/calendar.svg";
import Facebook from "@/site/assets/images/icons/facebook-orig.svg";
import Linkedin from "@/site/assets/images/icons/linkedin-orig.svg";
import XIcon from "@/site/assets/images/icons/x-icon.svg";
import * as Yup from 'yup';

import drplaceholder from "@/site/assets/images/Dr-placeholder-img.webp";

import { errorToast, successToast } from "@/utils/Toast";
import Link from "next/link";
// import RecaptchaComponent from "@/site/components/RecaptchaComponent";
import { addBlogLead, createLead, updateLead } from "@/ApiActions/CommonApi";
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';
import Image from "next/image";
import debounce from "lodash.debounce";


const BlogSingle = ({ blogData, baseUrl }) => {
  const router = useRouter();
  // const { slug } = router.query;
  const path = router.asPath; // e.g. "/doctor/dr-abc"
  const slug = path.split("/").filter(Boolean).pop(); // "dr-abc"
  const [leadId, setLeadId] = useState(null);
  console.log('leadId', leadId);

  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    patientName: "",
    mobileNumber: "",
    location: "",
    branch: "",
    query: "",
    slug: slug,
    leadId: leadId,
  });
  const [formErrors, setFormErrors] = useState({});
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [recaptchaError, setRecaptchaError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);


  const {
    title,
    description,
    categoryName,
    banner_image,
    publish_date,
    author,
    relatedBlogs,
    previousNext,
    metaTitle,
    metaDescription,
    blogSchema,
    relatedDoctor
  } = blogData;

  const currentURL = typeof window !== "undefined" ? window.location.href : "";

  const processDescription = (desc) =>
    desc.replace(
      /<oembed url="https:\/\/www\.youtube\.com\/watch\?v=([^"&]+)[^"]*"><\/oembed>/g,
      (_, videoId) =>
        `<iframe width="100%" height="425" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    );

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  //   if (formErrors[name]) {
  //     setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  //   }
  // };



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // saveProgressiveLead(name, value); // Progressive update here

    // Debounced API call
    debouncedSaveProgressiveLead(name, value);

    if (formErrors[name]) {
      setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };


  const handleRecaptchaVerify = (token) => {
    setRecaptchaVerified(token);
    setRecaptchaError("");
  };

  const validationSchema = Yup.object().shape({
    patientName: Yup.string()
      .required("Name is required")
      .matches(/^[a-zA-Z' -]+$/, "Please enter a valid Name"),
    mobileNumber: Yup.string()
      .required("Mobile Number is required")
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
    location: Yup.string().required("Branch is required"),
    query: Yup.string()
      .required("Message is required")
      .matches(/^[a-zA-Z0-9\s.,!?\'"-]+$/, "Please enter a valid Message"),
  });



  const [progressiveData, setProgressiveData] = useState({
    patientName: "",
    mobileNumber: "",
    location: "",
    branch: "",
    query: "",
    slug: slug,
    formtype: "blog",
  });
  const isCreatingLead = useRef(false);
  // Debounced function
  const debouncedSaveProgressiveLead = useCallback(
    debounce((fieldName, value) => {
      saveProgressiveLead(fieldName, value);
    }, 800),
    [progressiveData, leadId, slug] // dependencies
  );


  const saveProgressiveLead = async (fieldName, value) => {
    try {
      const keyMap = {
        patientName: "patientName",
        mobileNumber: "mobileNumber",
        location: "location",
        branch: "branch",
        query: "query",
      };

      const updatedData = {
        ...progressiveData,
        [keyMap[fieldName]]: value,
        slug: slug,
        formtype: "blog",
      };

      setProgressiveData(updatedData);

      if (!leadId && fieldName === "patientName" && value.trim().length >= 3) {
        if (isCreatingLead.current) return;
        isCreatingLead.current = true;

        const res = await createLead(updatedData);
        if (res?.status === 201) {
          setLeadId(res.data.id);
        }

        isCreatingLead.current = false;
      } else if (leadId) {
        await updateLead({ id: leadId, ...updatedData });
      }
    } catch (err) {
      console.error("Progressive lead save error:", err);
      isCreatingLead.current = false;
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setFormErrors({});
      setIsSubmitting(true); // Start loading

      const payload = {
        ...formData,
        leadId: leadId, // ✅ add leadId here
        // ✅ make sure slug bhi aa jaye
      };

      const response = await addBlogLead(payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        successToast("Your query has been submitted successfully!");
        setFormData({
          patientName: "",
          mobileNumber: "",
          location: "",
          branch: "",
          query: "",
          slug,
        });
        setLeadId(null); // reset after full submit
        setProgressiveData({}); // optional reset
      } else {
        errorToast(response.data.message || "Something went wrong!");
      }
    } catch (err) {
      if (err.name === "ValidationError") {
        const errors = {};
        err.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        setFormErrors(errors);
      } else {
        const serverErrors = err.response?.data?.errors || {};
        const errorMessage =
          err.response?.data?.message || "Error submitting query. Please try again!";
        setFormErrors(serverErrors);
        errorToast(errorMessage);
      }
    } finally {
      setIsSubmitting(false); // Stop loading
    }
  };


  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // if (!recaptchaVerified) {
  //   //   setRecaptchaError("Please complete the reCAPTCHA verification.");
  //   //   return;
  //   // }

  //   try {
  //     // const response = await axios.post("/add-blog-lead", formData);
  //     const response = await addBlogLead(formData, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (response.status === 201) {
  //       successToast("Your query has been submitted successfully!");
  //       setFormData({
  //         patientName: "",
  //         mobileNumber: "",
  //         location: "",
  //         branch: "",
  //         query: "",
  //         slug,
  //       });
  //     } else {
  //       errorToast(response.data.message || "Something went wrong!");
  //     }
  //   } catch (err) {
  //     const serverErrors = err.response?.data?.errors || {};
  //     const errorMessage =
  //       err.response?.data?.message || "Error submitting query. Please try again!";
  //     setFormErrors(serverErrors);
  //     errorToast(errorMessage);
  //   }
  // };

  useEffect(() => {
    setIsLoading(!blogData || Object.keys(blogData).length === 0);
  }, [blogData]);
  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        {/* <script type="application/ld+json">{JSON.stringify(blogSchema)}</script> */}
      </Head>




      {/* Blog Body */}
      <section className="blogDetails section-below-space side-space">
        <div className="row gy-3">
          {/* Main Blog Content */}
          <div className="col-12 col-lg-8">
            {/* Banner */}
            <div className="bannerImageDiv px-0 py-md-4 py-3">
              {
                // isLoading ? (
                //   <Skeleton height={300} />
                // ) : (
                // <Image width={1431} height={510}
                <img
                  className="bannerImage"
                  src={`${baseUrl}/${banner_image}`}
                  alt="banner"
                  crossOrigin="anonymous"
                />
                // )
              }
            </div>
            <div className="blogHeading">
              <div className="title">
                <h1>{title}</h1>
                <div className="subHeading">
                  <div className="category">
                    <p className="mb-0">Category: {categoryName}</p>
                  </div>
                  <div className="date">
                    <div className="mb-0 list-marker d-flex gap-2 align-items-center">
                      <Image width={17} height={17} alt="Published Date" src={Calendar.src} />
                      <span className="mb-0">{new Date(publish_date).toDateString()}</span>
                    </div>
                  </div>
                  <div className="author">
                    <div className="mb-0 list-marker">By {author}</div>
                  </div>
                </div>
              </div>
              <div className="social">
                <div className="share">
                  <h4>Share</h4>
                </div>
                <div className="blogShareIcons">
                  {/* Facebook Share */}
                  <a
                    aria-label="Click To Share on Facebook"
                    target="_blank"
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      currentURL
                    )}`}
                    rel="noopener noreferrer"
                  >
                    <Image width={28} height={28} alt="Share on Facebook" src={Facebook.src} />
                  </a>

                  {/* LinkedIn Share */}
                  <a
                    aria-label="Click To Share on Linkedin"
                    target="_blank"
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                      currentURL
                    )}&title=${encodeURIComponent(title)}`}
                    rel="noopener noreferrer"
                  >
                    <Image width={28} height={28} alt="Share on Linkedin" src={Linkedin.src} />
                  </a>



                  {/* X (Twitter) Share */}
                  <a
                    aria-label="Click To Share on Twitter"
                    target="_blank"
                    href={`https://twitter.com/share?url=${encodeURIComponent(
                      currentURL
                    )}&text=${encodeURIComponent(title)}&via=YourTwitterHandle`}
                    rel="noopener noreferrer"
                  >
                    <Image width={28} height={28} alt="Share on Twitter" src={XIcon.src} />
                  </a>

                </div>
              </div>

            </div>
            <hr />
            {/* <div className="article-sect" dangerouslySetInnerHTML={{ __html: description }} /> */}
            <div
              className="article-sect"
              dangerouslySetInnerHTML={{ __html: processDescription(description) }}
            />

            <hr />
            {relatedDoctor && (
              <div className="col-12">
                <div className="my-md-4 my-2">
                  {/* <h2 className="mb-md-3 mb-2 text-capitalize">This blog is written by {doctorData.doctorName}</h2> */}
                  <div className="video-insight-box">
                    <div className="video-insight-img">
                      <img
                        src={`${baseUrl}/${relatedDoctor.featured_images || drplaceholder}`}
                        crossOrigin="anonymous"
                        alt={`Video Insight By ${relatedDoctor.doctorName}`}
                      />
                    </div>
                    <div className="video-insight-ctnt">
                      <h3>{relatedDoctor.doctorName}</h3>
                      {relatedDoctor.education && (
                        <ul>
                          <li>{relatedDoctor.education}</li>
                        </ul>
                      )}
                      {relatedDoctor.designation && (
                        <p>{relatedDoctor.designation}</p>
                      )}
                      {relatedDoctor.specialtyName && (
                        <p>{relatedDoctor.specialtyName}</p>
                      )}
                      {/* {relatedDoctor?.experience && (
                        <div>
                         
                          <div className="d-flex gap-2 align-items-center mb-3">
                            <ExpBag /> <span className="fw-bold">{relatedDoctor?.experience}+ Years of Experience</span>
                          </div>
                        </div>
                      )} */}
                      <div className="d-flex align-items-center gap-3">
                        <Link href={`/doctors/${relatedDoctor.slug}`}
                          className="button-primary btn-white"><span>View Profile</span></Link>
                        <button onClick={handleModalOpen} className="button-primary" ><span>Book An Appointment</span></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="row recentBlogs recentBlogsSingle prevNext">
              {previousNext.previous && (
                <div className="col-lg-6 col-sm-12 smallCard row gx-2">
                  <h4>Previous blog</h4>
                  <Link
                    href={`/blogs/${previousNext.previous.slug}`} // Link to the previous blog
                    className="anchorBlogDiv"
                  >
                    <div className="col-4 col-md-3">
                      <div className="smallImage previousBlogImage">
                        <img src={
                          previousNext.previous.thumbnil_image
                            ? `${baseUrl}/${previousNext.previous.thumbnil_image}`
                            : "placeholder.jpg" // Fallback image
                        }
                          crossOrigin="anonymous"
                          alt="blog"
                          className="img-fluid"
                        />
                      </div>
                    </div>
                    <div className="smallContent col-8 col-md-9">
                      <h5>{previousNext.previous.title}</h5>

                    </div>
                  </Link>
                </div>
              )}
              {previousNext.next && (
                <div className="col-lg-6 col-sm-12 smallCard row gx-2">
                  <h4>Next blog</h4>
                  <Link
                    href={`/blogs/${previousNext.next.slug}`} // Link to the next blog
                    className="anchorBlogDiv"
                  >
                    <div className="smallImage col-4 col-md-3">
                      <img
                        src={
                          previousNext.next.thumbnil_image
                            ? `${baseUrl}/${previousNext.next.thumbnil_image}`
                            : "placeholder.jpg"
                        }
                        crossOrigin="anonymous"
                        alt="blog"
                        className="img-fluid"
                      />
                    </div>
                    <div className="smallContent col-8 col-md-9">
                      <h5>{previousNext.next.title}</h5>

                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar with Related Blogs */}
          <div className="col-12 col-lg-4 py-md-4 py-3">
            <div className="recentBlogs recentBlogsSingle">
              <h4 className="mb-3">Recent Blogs</h4>
              <div className="row">
                {relatedBlogs.map((related) => (
                  <Link href={`/blogs/${related.slug}`} key={related.id} target='_parent' >
                    <div className="smallCard row gx-2" key={related.id}>
                      <div className="smallImage col-4 col-md-3">

                        <img
                          src={
                            related.thumbnil_image
                              ? `${baseUrl}/${related.thumbnil_image}`
                              : "placeholder.jpg"
                          }
                          crossOrigin="anonymous"
                          alt="blog"
                          className="img-fluid"
                        />
                      </div>
                      <div className="smallContent col-8 col-md-9">
                        <h5>{related.title}</h5>
                      </div>
                    </div>
                  </Link>

                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="contactForm">
              <form onSubmit={handleSubmit} id="getInTouchForm" className="getInTouchForm blogs-getInTouchForm">
                <div className="row common-gutter">
                  <h4 className="text-white">Request A Call Back!</h4>
                  <div className="col-12 px-0">
                    <label className="text-white">Full Name*</label>
                    <CommonInput
                      name="patientName"
                      value={formData.patientName}
                      onChange={handleInputChange}
                      placeholder="Enter your Full Name"
                    />
                    {formErrors.patientName && <p className="error">{formErrors.patientName}</p>}
                  </div>
                  <div className="col-12 px-0">
                    <label className="text-white">Mobile No.*</label>
                    <CommonInput
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      placeholder="Enter your mobile number"
                    />
                    {formErrors.mobileNumber && <p className="error">{formErrors.mobileNumber}</p>}
                  </div>
                  <div className="col-12 px-0">
                    <label className="text-white">Location*</label>
                    <CommonInput
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Enter your location"
                    />
                    {formErrors.location && <p className="error">{formErrors.location}</p>}
                  </div>

                  {/* <div className="col-12 px-0">
                    <label>Branch*</label>
                    <CustomSelect
                      name="branch"
                      value={formData.branch}
                      onChange={handleInputChange}
                      label="Branch"
                      options={branches.map(branch => ({
                        value: branch.id,
                        label: branch.masterName,
                      }))}
                    /></div> */}


                  <div className="col-12 px-0">
                    <label className="text-white">Your Query</label>
                    <CommonInput
                      name="query"
                      value={formData.query}
                      onChange={handleInputChange}
                      placeholder="Type here"
                    />
                    {formErrors.query && <p className="error">{formErrors.query}</p>}

                  </div>
                  {/* <RecaptchaComponent onVerify={handleRecaptchaVerify} />
                  {recaptchaError && <p className="error">{recaptchaError}</p>} */}

                  <button
                    className={`button-primary btn-white ${isSubmitting ? "btn-disabled" : ""}`}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    <span>{isSubmitting ? "Submitting..." : "Submit"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Modal */}
      {/* <BlogdocAppointment isModalOpen={isModalOpen} handleModalClose={() => setIsModalOpen(handleModalClose)} relatedDoctor={relatedDoctor} /> */}
    </>
  );
};

export async function getServerSideProps(context) {
  const { blog_slug } = context.params;
  try {
    const baseUrl = process.env.NEXT_PUBLIC_FILE_BASE_URL;
    const response = await axios.get(`${baseUrl}/api/blog/get-blog-info-by-slug/${blog_slug}`);

    return {
      props: {
        blogData: response.data,
        baseUrl
      }
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
}

export default BlogSingle;
