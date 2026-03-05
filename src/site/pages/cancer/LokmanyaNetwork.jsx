import React from 'react'
import { NetworkCard } from '../../components';
import HosptalImg1 from "../../assets/images/Lokmanya HSS.webp";
import HosptalImg2 from "../../assets/images/hospital-img-2.webp";
import HosptalImg3 from "../../assets/images/hospital-img-3.webp";
import HosptalImg4 from "../../assets/images/hospital-img-4.webp";
// import HosptalImg5 from "../../assets/images/Kolhapur_Branch.webp";
const HOSPITALS = [
  {
    id: 1,
    img: HosptalImg1,
    title: "Lokmanya Hospital",
    location: "S B Road, Pune",
    directionLink: "https://maps.app.goo.gl/Q2Z28tos9CAHPBSx8",
  },
  {
    id: 2,
    img: HosptalImg2,
    title: "Lokmanya Hospital",
    location: "Nigdi, Pune",
    directionLink: "https://maps.app.goo.gl/V4Vuyho1VxP38Eci9",
  },
  {
    id: 3,
    img: HosptalImg3,
    title: "Lokmanya Hospital",
    location: "Chinchwad, Pune",
    directionLink: "https://maps.app.goo.gl/ytC3hg2Ksaxs768B7",
  },
  {
    id: 4,
    img: HosptalImg4,
    title: "Lokmanya Hospital",
    location: "Swargate, Pune",
    directionLink: "https://maps.app.goo.gl/FpX5pJFbTEtcoDzd9",
  },
  // {
  //   id: 5,
  //   img: HosptalImg5,
  //   title: "Lokmanya Hospital",
  //   location: "Kolhapur",
  //   directionLink: "https://maps.app.goo.gl/bcUyeot2LeKReHh7A",
  // },
];

function LokmanyaNetwork() {
  return (
    <section className="success-stories-custom-1 section-space side-space lok-network container-custom">
      <h2 className="section-heading">Lokmanya Hospitals Network</h2>
        <div className="row row-cols-1 row-cols-lg-4 row-cols-md-2 row-cols-sm-2 g-md-3 g-3 justify-content-center">
          {HOSPITALS.map((hospital) => (
            <div className="col" key={hospital.id}>
              <NetworkCard data={hospital} />
            </div>
          ))}
        </div>
    </section>
  )
}

export default LokmanyaNetwork
