import React from "react";
import { ButtonPrimary } from "..";
import Image from "next/image";

const AboutNeurosurgerySection = ({ handleModalOpenapp }) => {
  return (
    <section className="about-neurosurgery side-space section-space">
      <h2 className="section-heading text-start d-md-none d-block">
        Advancing Neuroscience
      </h2>
      <div className="row position-relative align-items-xl-start align-items-center">
        <div className="col-xxl-6 col-lg-5 col-12">
          <div className="about-neurosurgery-img">
            <Image width={600} height={485}
              src="/images/new-theme/Newpages/CampaignPages/abt-neuroscience-img.webp"
              alt="About Neuroscience"
            />
          </div>
        </div>
        <div className="col-xxl-6 col-lg-7 col-12">
          <div className="about-neurosurgery-ctnt">
            <h2 className="section-heading text-start d-md-block d-none">
              Advancing Neuroscience
            </h2>
            <p>
              At Lokmanya Hospitals, we specialize in providing world-class
              neurosurgical care to patients in Pune and beyond. From brain
              tumors and aneurysms to spine-related neurological disorders,
              our highly skilled neurosurgeons deliver advanced treatment
              options tailored to your needs. Equipped with cutting-edge
              technology and guided by years of expertise, we are committed
              to improving neurological health and enhancing your quality of
              life.
            </p>
            <p>
              Whether you require minimally invasive brain surgery, complex
              spinal procedures, or non-surgical interventions, our team is
              here to offer compassionate and personalized care. Our goal is
              to address neurological issues effectively, enabling you to
              lead a healthier and more active life.
            </p>
            <div>
              <ButtonPrimary
                onClick={() => handleModalOpenapp("Book Appointment")}
                title="Book Appointment"
              >
                Book An Appointment
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutNeurosurgerySection;
