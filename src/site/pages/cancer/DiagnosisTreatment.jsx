import React from 'react';

import demoImg from '../../../assets/images/02933e47aa52754836641d388eb512c1.png';

const diagnosisData = [
  { title: "Doctor Consultation", img: demoImg, number: "01" },
  { title: "Diagnostic Tests", img: demoImg, number: "02" },
  { title: "Customised Treatment Plan", img: demoImg, number: "03" },
  { title: "Surgical Consultation & Postoperative Care", img: demoImg, number: "04" },
];

const DiagnosisTreatment = () => {
  return (
        <section className="diagnosis-treatment side-space">
          <h2 className='section-heading'>Diagnosis & Treatment</h2>
          <div className="cards-container">
            {diagnosisData.map((item, index) => (
              <div className="card" key={index}>
                <img src={item.img} alt={item.title} className="card-image" />
                <div className="card-content-1">
                  <h3 className="card-title">{item.title}</h3>
                  <span className="card-number">{item.number}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
  );
};

export default DiagnosisTreatment;