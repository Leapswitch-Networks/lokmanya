import Image from "next/image";
import React from "react";

const MainMeetDoctors = () => {
  return (
    <section className="meet-doctors">
      <div className="meet-doctors-inner side-space section-space">
        <div className="meet-doctors-first">
          <h2 className="section-heading text-white">
            Expert Care, Pioneering Treatment, Saving Lives
          </h2>
          <p className="text-white">
            Our superspecialist doctors offer top-quality care through a
            team-led approach.
          </p>
        </div>
      </div>
      <Image width={1531} height={380} src="/images/ExpertDoc-GroupImg.webp" alt="why choose main" />
    </section>
  );
};

export default MainMeetDoctors;
