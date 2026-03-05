import Image from "next/image";
import BrainTumorSurgery from "../../assets/images/Brain Tumor Surgery.webp";
import SpinalNeuroSurgery from "../../assets/images/Spinal Neuro Surgery.webp";
import NeurovascularSurgery from "../../assets/images/Neurovascular Surgery.webp";
// import EpilepsySurgery from "../../assets/images/Epilepsy Surgery.webp";
// import PeripheralNerve from "../../assets/images/Peripheral Nerve Surgery.webp";
import TraumaNeurosurgery from "../../assets/images/Trauma and Emergency Neurosurgery.webp";
import StrokeManagement from "../../../assets/images/Stroke Management.jpg";
import EpilepsyCare from "../../../assets/images/Epilepsy Care.jpg";
import ParkinsonDisease from "../../../assets/images/ParkinsonDisorders.jpg";
import NeurodegenerativeDiseases from "../../../assets/images/Neurodegenerative Diseases.jpg";
import HeadacheMigraine from "../../../assets/images/Headaches and Migraines.jpg";

const NeuroOurServices = () => {
  const servicesData = [
    { title: "Brain Tumor Surgery", imgSrc: BrainTumorSurgery },
    { title: "Spinal Neurosurgery", imgSrc: SpinalNeuroSurgery },
    { title: "Neurovascular Surgery", imgSrc: NeurovascularSurgery },
    // { title: "Epilepsy Surgery", imgSrc: EpilepsySurgery },
    // { title: "Peripheral Nerve Surgery", imgSrc: PeripheralNerve },
    { title: "Trauma and Emergency Neurosurgery", imgSrc: TraumaNeurosurgery },
    { title: "Stroke Management", imgSrc: StrokeManagement },
    { title: "Epilepsy Care", imgSrc: EpilepsyCare },
    { title: "Parkinson’s Disease and Movement Disorders", imgSrc: ParkinsonDisease },
    { title: "Neurodegenerative Diseases", imgSrc: NeurodegenerativeDiseases },
    { title: "Headache & Migraine", imgSrc: HeadacheMigraine },
  ];

  return (
    <section
      id="services"
      className="campagin-our-srvc-prd side-space section-space"
    >
      <h2 className="section-heading">Our Services & Procedures</h2>
      <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-sm-2 row-cols-2 g-md-4 g-3 justify-content-center">
        {servicesData.map((service, index) => (
          <div className="col" key={index}>
            <div className="campagin-our-srvc-prd-card">
              <div className="campagin-our-srvc-card-img">
                <Image
                  src={service.imgSrc}
                  alt={service.title}
                  className="img-fluid"
                  placeholder="blur"
                />
                <div className="campagin-our-srvc-card-ctnt">
                  <h4 className="mb-0">{service.title}</h4>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NeuroOurServices;
