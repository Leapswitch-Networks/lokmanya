import React from "react";
import Appendicitis from "../../assets/images/Appendicitis.svg";
import Gallstones from "../../assets/images/Gallstones.svg";
import Hernias from "../../assets/images/Hernias.svg";
import Colorectalconditions from "../../assets/images/Colorectalconditions.svg";
import NeonatalSurgery from "../../assets/images/NeonatalSurgery.svg";
import TongueTie from "../../assets/images/TongueTieRelease.svg";
import StaplerCircumcision from "../../assets/images/StaplerCircumcision.svg";
import SurgeryBladder from "../../assets/images/SurgeryofBladder.svg";
import PediatricTumors from "../../assets/images/PediatricTumors.svg";
import Thoracotomy from "../../assets/images/Thoracotomy.svg";
import Gastrointestinaldisorders from "../../assets/images/Gastrointestinaldisorders.svg";
import Softtissue from "../../assets/images/Softtissuelumpsandcysts.svg";
import Infectionsabscesses from "../../assets/images/Infectionsandabscesses.svg";
import Image from "next/image";

const defaultTreatmentConditions = [
  { icon: Appendicitis, title: "Appendicitis" },
  { icon: Gallstones, title: "Gallstones" },
  { icon: Hernias, title: "Hernias" },
  { icon: Colorectalconditions, title: "Colorectal conditions" },
  { icon: NeonatalSurgery, title: "Neonatal Surgery" },
  { icon: TongueTie, title: "Tongue Tie Release" },
  { icon: StaplerCircumcision, title: "Stapler Circumcision" },
  { icon: SurgeryBladder, title: "Surgery of Bladder" },
  { icon: PediatricTumors, title: "Pediatric Tumors" },
  { icon: Thoracotomy, title: "Thoracotomy" },
  { icon: Gastrointestinaldisorders, title: "Gastrointestinal Disorders" },
  { icon: Softtissue, title: "Soft tissue lumps and cysts" },
  { icon: Infectionsabscesses, title: "Infections and abscesses" },
];

const ConditionsWeTreatSection = ({ data = defaultTreatmentConditions }) => {
  return (
    <section id="conditions" className="campagin-ctreat side-space section-space">
      <h2 className="section-heading mb-md-3 mb-2">Conditions We Treat</h2>
      <div className="row row-cols-xl-6 row-cols-lg-4 row-cols-md-3 row-cols-2 g-md-4 g-3 justify-content-center">
        {data.map((item, index) => (
          <div className="col" key={index}>
            <div className="campagin-ctreat-card">
              {typeof item.icon === "function" ? (
                <item.icon />
              ) : (
                <Image width={51} height={51} alt={`Icon For ${item.title}`} src={item.icon?.src || item.icon} />
              )}
              <p className="mb-0">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ConditionsWeTreatSection;
