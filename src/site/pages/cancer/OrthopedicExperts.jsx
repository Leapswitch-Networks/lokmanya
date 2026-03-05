// import './OrthopedicExperts.css';
// import suneedhi from '../../../assets/images/3bce981c8663670a1f50b20872b93e69.jpeg'
import { ButtonPrimary } from '../../components';
import doctor from "../../assets/images/international-patients/doctor.webp";

// const expertData = [
//   { name: "Dr. Suneedhi Paranjpe", title: "Surgical Oncologist", experience: "10+ Years Of Experience", img: suneedhi },
//   { name: "Dr. Milind Shrivasthav", title: "Consultant Orthopedic", experience: "15+ Years Of Experience", img: suneedhi },
//   { name: "Dr. Milind Shrivasthav", title: "Consultant Orthopedic", experience: "15+ Years Of Experience", img: suneedhi },
//   { name: "Dr. Milind Shrivasthav", title: "Consultant Orthopedic", experience: "15+ Years Of Experience", img: suneedhi },
// ];
const OUR_DOCTORS = [
  {
    id: 1,
    title: "Scheduling Appointments",
    desc: "Avail complimentary consultation over the phone and guaranteed appointment with the doctor before your visit.",
    src: doctor,
  },
  {
    id: 2,
    title: "Visa & Travel Arrangement",
    desc: "Assured guidance in arranging Visa extension and invitation letter. Complimentary pick & drop facility from airport/hotel to hospital",
    src: doctor,
  },
  {
    id: 3,
    title: "Dedicated Staff Allocation",
    desc: "Dedicated assistant for patients support before, during and post-treatment to ensure smooth journey during your journey",
    src: doctor,
  },
  {
    id: 4,
    title: "Foreign Language Interpreter",
    desc: "Assured guidance in arranging Visa extension and invitation letter. Complimentary pick & drop facility from airport/hotel to the hospital",
    src: doctor,
  },
  {
    id: 5,
    title: "Stay & Food Arrangement",
    desc: "Assistance in arranging accommodation for patients attendants near the hospital. Sumptuous spread of local cuisines with a religious touch.",
    src: doctor,
  },
  {
    id: 6,
    title: "Assured follow up",
    desc: "Avail complimentary consultation over the phone and guaranteed appointment with the doctor before your visit.",
    src: doctor,
  },
];

const OrthopedicExperts = () => {
  return (
    <section className="experts section-space side-space">
      <h2 className='section-heading'>Meet Our Orthopedic Experts</h2>
      <div className="experts-container">
      <div  class="row common-gutter">
          {OUR_DOCTORS.map((d) => (
            <div class="col-xl-3 col-md-5 col-6" key={d.id}>
              <div className="meet-ex-card">
                <div className="meet-ex-image">
                  <img
                    src={d.src}
                    alt={d.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="meet-ex-info">
                  <h4>Dr. Suneedhi Paranjpe</h4>
                  <div className="doc-info">
                    <p>Surgical Oncologist</p>
                    <p>10+ Years of Experience</p>
                    <ButtonPrimary isWhite>Book An Appointment</ButtonPrimary>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrthopedicExperts;