import React from 'react';
// import './Technologies.css';
import Icon1 from '../../../assets/images/Breast_Cancer.svg';
import Icon2 from '../../../assets/images/Lung_Cancer.svg';
import Icon3 from '../../../assets/images/prostate_cancer.svg';
import Icon4 from '../../../assets/images/cororectal.svg';
import Icon5 from '../../../assets/images/hnc.svg';
import Icon6 from '../../../assets/images/Gastrointestinal_Cancer.svg';
import Icon7 from '../../../assets/images/Gynecological_Cancer.svg';
import Icon8 from '../../../assets/images/Blood_Cancer.svg';
import Icon9 from '../../../assets/images/Skin_Cancer.svg';
import Icon10 from '../../../assets/images/Liver_Cancer.svg';
import Icon11 from '../../../assets/images/Kidney_Cancer.svg';
import Icon12 from '../../../assets/images/bladder_cancer.svg';
import Icon13 from '../../../assets/images/Pancreatic_Cancer.svg';
import Icon14 from '../../../assets/images/Esophageal.svg';
import Icon15 from '../../../assets/images/bst.svg';
// import Icon16 from '../../../assets/images/sts.svg';
// import Icon17 from '../../../assets/images/Pediatric_Cancer.svg';


const technologies = [
  {
    title: "Breast Cancer",
    icon: Icon1, // Replace with an actual icon or image for this technology
  },
  {
    title: "Lung Cancer",
    icon: Icon2, // Replace with an actual icon or image for this technology
  },
  {
    title: "Prostate Cancer",
    icon: Icon3, // Replace with an actual icon or image for this technology
  },
  {
    title: "Colorectal Cancer",
    icon: Icon4, // Replace with an actual icon or image for this technology
  },
  {
    title: "Head and Neck Cancer",
    icon: Icon5, // Replace with an actual icon or image for this technology
  },
  {
    title: "Gastrointestinal Cancer",
    icon: Icon6, // Replace with an actual icon or image for this technology
  },
  {
    title: "Gynecological Cancers (e.g., Ovarian, Cervical, Uterine)",
    icon: Icon7, // Replace with an actual icon or image for this technology
  },
  {
    title: "Blood Cancer (Leukemia, Lymphoma, Myeloma)",
    icon: Icon8, // Replace with an actual icon or image for this technology
  },
  {
    title: "Skin Cancer (Melanoma, Basal Cell, Squamous Cell Carcinoma)",
    icon: Icon9, // Replace with an actual icon or image for this technology
  },
  {
    title: "Liver Cancer",
    icon: Icon10, // Replace with an actual icon or image for this technology
  },
  {
    title: "Kidney Cancer",
    icon: Icon11, // Replace with an actual icon or image for this technology
  },
  {
    title: "Bladder Cancer",
    icon: Icon12, // Replace with an actual icon or image for this technology
  },
  {
    title: "Pancreatic Cancer",
    icon: Icon13, // Replace with an actual icon or image for this technology
  },
  {
    title: "Esophageal Cancer",
    icon: Icon14, // Replace with an actual icon or image for this technology
  },
  {
    title: "Brain and Spine Tumors",
    icon: Icon15, // Replace with an actual icon or image for this technology
  },
  // {
  //   title: "Soft Tissue Sarcoma",
  //   icon: Icon16, // Replace with an actual icon or image for this technology
  // },
  // {
  //   title: "Pediatric Cancer",
  //   icon: Icon17, // Replace with an actual icon or image for this technology
  // },
];



const Conditions = () => {
  return (
    <section className="conditionsTreat section-space side-space">
      <h2 className='section-heading'>Conditions We Treat</h2>
      <div className="technologies-grid">
        {technologies.map((tech, index) => (
          <div className="technology-card" key={index}>
            <div className="icon"><img src={tech.icon} alt={tech.title} /></div>
            <h3 >{tech.title}</h3>
            {/* <p className='tech-desc'>{tech.description}</p> */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Conditions;
