import React from 'react';
// import './Technologies.css';
import Icon1 from '../../../assets/images/Patient-Centered Care cancer.svg';
import Icon2 from '../../../assets/images/Advanced Diagnostic Tools cancer.svg';
import Icon3 from '../../../assets/images/Affordable Cancer Care in Pune cancer.svg';
// import Icon4 from '../../../assets/images/fi_17087128.png';
// import Icon5 from '../../../assets/images/Group.png';
// import Icon6 from '../../../assets/images/Expanded.png'

const technologies = [
  {
    title: "Patient-Centered Care",
    description: "We believe in putting our patients first. Every treatment plan is customized to meet the individual needs of the patient, ensuring the highest level of care.",
    icon: Icon1, // Replace with an actual icon or image if available
  },
  {
    title: "Advanced Diagnostic Tools",
    description: "Early detection is key to effective treatment. Our advanced diagnostic tools allow for accurate and timely detection of cancers, ensuring the best possible outcomes.",
    icon: Icon2, // Replace with an actual icon or image if available
  },
  
  {
    title: "Affordable Cancer Care in Pune",
    description: "At Lokmanya Hospitals, we provide access to the latest cancer treatments without compromising on quality, all while ensuring affordability for our patients.",
    icon: Icon3, // Replace with an actual icon or image if available
  },
];



const Technologies = () => {
  return (
    <section className="technologies section-space side-space">
      <h2 className='section-heading'>Cancer Treatment At Lokmanya Hospitals – What Sets Us Apart?</h2>
      <div className="technologies-grid">
        {technologies.map((tech, index) => (
          <div className="technology-card" key={index}>
            <div className="icon"><img src={tech.icon} alt={tech.title} /></div>
            <h3 >{tech.title}</h3>
            <p className='tech-desc'>{tech.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Technologies;
