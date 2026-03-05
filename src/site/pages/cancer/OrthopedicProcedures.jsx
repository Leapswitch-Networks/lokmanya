import React from 'react';
// import './OrthopedicProcedures.css';
import ortho_1 from '../../../assets/images/Surgery.jpg';
import ortho_2 from '../../../assets/images/Chemotherapy.jpg';
import ortho_3 from '../../../assets/images/Targeted Therapy.jpg';
// import ortho_4 from '../../../assets/images/Hormone Therapy.jpg';
// import ortho_5 from '../../../assets/images/image.png';

const procedures = [
  {
    title: "Surgery",
    description: "Our skilled surgeons perform tumor removal and biopsies with the latest surgical techniques, ensuring minimal disruption and faster recovery.",
    imageUrl: ortho_1, // Replace with an appropriate image for surgery
    backgroundColor: '#E2FFFE',
  },
  {
    title: "Chemotherapy",
    description: "Chemotherapy is used to target and destroy cancer cells. Our oncology team customizes chemotherapy regimens to fit your specific condition.",
    imageUrl: ortho_2, // Replace with an appropriate image for chemotherapy
    backgroundColor: '#e5e7ff',
  },
  {
    title: "Targeted Therapy",
    description: "We use advanced therapies that specifically target cancer cells without harming healthy tissue, offering precision care.",
    imageUrl: ortho_3, // Replace with an appropriate image for targeted therapy
    backgroundColor: '#fffae5',
  },
  // {
  //   title: "Hormone Therapy",
  //   description: "Commonly used for cancers, hormone therapy blocks hormones that stimulate cancer cell growth.",
  //   imageUrl: ortho_4, // Replace with an appropriate image for hormone therapy
  //   backgroundColor: '#dfeffe',
  // }
 
];


const OrthopedicProcedures = () => {
  return (
    <section className="orthopedic-procedures section-space side-space">
      <h2 className='section-heading'>Our Cancer Treatment Services</h2>
      <div id='orthopedic-procedures' className="row g-3">
        {procedures.map((procedure, index) => (
         <div className="col-md-4">

         <div 
            className="procedure-card" 
            key={index} 
            style={{ backgroundColor: procedure.backgroundColor }}
          >
            <img src={procedure.imageUrl || 'path_to_placeholder_image.png'} alt={procedure.title} />
            <h3>{procedure.title}</h3>
            <p>{procedure.description}</p>
          </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrthopedicProcedures;