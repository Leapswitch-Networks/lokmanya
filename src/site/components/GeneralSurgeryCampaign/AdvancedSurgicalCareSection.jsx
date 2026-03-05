import React from "react";
import Link from "next/link";
import Image from "next/image";

const AdvancedSurgicalCareSection = ({
  heading = "Advanced Surgical Care",
  subtext = "Schedule Your Consultation Today!",
  image = "AdvancedSurgicalimg.png",
  onBookAppointment,
}) => {
  return (
    <section className="expert-neuro-meet adv-srg-care side-space section-space">
      <div className="enquiry-meet-section">
        <div className="enquiry-meet-inner bg-color-image position-relative">
          <div className="row w-100 g-0">
            <div className="col-xl-4 col-md-5">
              <div className="enquiry-meet-ctnt d-flex flex-column align-items-md-start align-items-center">
                <h2 className="mb-md-3 mb-2 text-capitalize text-white">
                  {heading}
                </h2>
                <p className="mb-md-3 mb-2 text-white">{subtext}</p>
                <div className="d-flex gap-3 flex-wrap">
                  <Link
                    href="#"
                    className="book-new-btn d-block"
                    onClick={(e) => {
                      e.preventDefault();
                      onBookAppointment?.("Book Appointment");
                    }}
                  >
                    <span className="text-uppercase">Book An Appointment</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-8 col-md-7 d-flex justify-content-center d-md-flex d-none">
              <div className="enquiry-meet-img">
                <Image width={490} height={310}
                  src={`/images/new-theme/Newpages/CampaignPages/${image}`}
                  alt="meet"
                  crossOrigin="anonymous"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvancedSurgicalCareSection;
