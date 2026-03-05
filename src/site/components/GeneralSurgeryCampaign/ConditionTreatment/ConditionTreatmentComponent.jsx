import React from "react";
import "./Condtion.css";
import Image from "next/image";

import newImage from "./latest.png"

const ConditionTreatmentComponent = ({ conditions = [] }) => {
  return (
    <section id="conditions" className="campagin-ctreat">
      <h2 className="section-heading mbmd-3 mb-0 conditionTxt">Conditions We Treat</h2>

      <div className="row row-cols-xl-4 row-cols-lg-4 row-cols-md-3 row-cols-2 g-md-4 g-3 justify-content-start m-0">
        {conditions?.map((item, index) => (
          <div className="colContent" key={index}>
            <div className="campagin-ctreat-card">

              <div className="background-icon">
                <Image
                  width={80}
                  height={80}
                  alt={item?.name}
                  // src={item?.image?.replace(/\\/g, "/")}
                  src={newImage}
                />
              </div>

              <p className="mb-0 CardtitleName">{item?.name}</p>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ConditionTreatmentComponent;

