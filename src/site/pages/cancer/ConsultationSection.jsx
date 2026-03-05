import React from 'react';
import img1 from '../../../assets/images/Persistent or Unexplained Symptoms.jpg';
import img2 from '../../../assets/images/Family History of Cancer.jpg';
import img3 from '../../../assets/images/Changes in the Skin or Lumps.jpg';
import img4 from '../../../assets/images/Difficulty Swallowing or Persistent Cough.jpg';
import img5 from '../../../assets/images/Changes in Bowel or Bladder Habits.jpg';
import img6 from '../../../assets/images/Abnormal Bleeding or Discharge.jpg';

const consultationData = [
  {
    title: "Persistent or Unexplained Symptoms",
    description: "If you experience persistent symptoms such as unexplained weight loss, fatigue, pain, or changes in bodily functions (e.g., blood in stool, difficulty swallowing), it is important to consult with an oncologist for early detection.",
    image: img1, // Replace with an appropriate image if available
  },
  {
    title: "Family History of Cancer",
    description: "If cancer runs in your family, especially close relatives, it’s advisable to consult a healthcare provider for screening and preventive measures, as some cancers are hereditary.",
    image: img2, // Replace with an appropriate image if available
  },
  {
    title: "Changes in the Skin or Lumps",
    description: "If you notice any unusual lumps, growths, or changes in your skin, such as new moles or sores that don’t heal, it could be a sign of skin cancer or another type, making early consultation essential.",
    image: img3, // Replace with an appropriate image if available
  },
  {
    title: "Difficulty Swallowing or Persistent Cough",
    description: "If you have trouble swallowing, a persistent cough that doesn’t go away, or hoarseness, it could indicate conditions such as throat, lung, or esophageal cancer. Consulting a specialist is crucial for timely intervention.",
    image: img4, // Replace with an appropriate image if available
  },
  {
    title: "Changes in Bowel or Bladder Habits",
    description: "Sudden and unexplained changes in bowel or bladder habits, such as frequent urination, blood in the urine, or changes in stool color or consistency, could be a sign of cancers related to the digestive or urinary systems.",
    image: img5, // Replace with an appropriate image if available
  },
  {
    title: "Abnormal Bleeding or Discharge",
    description: "Unexplained bleeding or discharge from the mouth, nose, or other parts of the body, especially after menopause or during non-menstrual periods, may be a sign of cancer, and early consultation can help with diagnosis and treatment.",
    image: img6, // Replace with an appropriate image if available
  },
];


const ConsultationSection = () => {
  return (
    <section className="section-space side-space">
      <h2 className="section-heading">When To Consult For Cancer Care?
</h2>
      <div className="row g-3">
        {consultationData.map((item, index) => (
          <div className="col-md-3 col-sm-6 col-lg-4">
          <div key={index} className="consultation-card">
            <img loading="lazy" src={item.image} alt={item.title} className="consultation-image" />
            <h5 className="card-ttl">{item.title}</h5>
            <p>{item.description}</p>
          </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ConsultationSection;
