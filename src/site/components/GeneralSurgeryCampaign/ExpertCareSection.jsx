import Image from "next/image";
import React from "react";

const ExpertCareSection = ({
  title = "Expert Surgical Care",
  paragraph1,
  paragraph2,
  imageSrc,
  imageAlt = "Expert Care",
}) => {
  return (
    <section className="about-exprt-care side-space section-space">
      <h2 className="section-heading text-lg-start d-lg-none d-block">
        {title}
      </h2>
      <div className="row">
        <div className="col-lg-7 order-lg-1 order-2">
          <h2 className="section-heading text-start d-lg-block d-none">
            {title}
          </h2>
          <p>{paragraph1}</p>
          <p className="mb-0">{paragraph2}</p>
        </div>
        <div className="col-lg-5 order-lg-2 order-1">
          <div className="about-exprt-img">
            <Image width={496} height={275} src={imageSrc} alt={imageAlt} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertCareSection;
