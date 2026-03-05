import Image from "next/image";
import doctorIcon from "../../assets/images/international-patients/doctor.svg";
import followup from "../../assets/images/international-patients/followup.svg";
import food from "../../assets/images/international-patients/food.svg";
import interpreter from "../../assets/images/international-patients/interpreter.svg";
import passport from "../../assets/images/international-patients/passport.svg";
import schedleAppo from "../../assets/images/international-patients/schedule-appo.svg"; // Assuming it's missing above

const JOURNEY = [
  {
    id: 1,
    title: "Scheduling Appointments",
    desc: "Avail consultation over the phone and guaranteed appointment with the doctor before your visit.",
    src: schedleAppo,
  },
  {
    id: 2,
    title: "Visa & Travel Arrangement",
    desc: "Assured guidance in arranging Visa extension and invitation letter. Complimentary pick & drop facility from airport to hospital.",
    src: passport,
  },
  {
    id: 3,
    title: "Dedicated Staff Allocation",
    desc: "Dedicated assistant for patient support before, during and post-treatment to ensure a smooth journey.",
    src: doctorIcon,
  },
  {
    id: 4,
    title: "Foreign Language Interpreter",
    desc: "Language support and interpretation services for seamless communication during your medical journey.",
    src: interpreter,
  },
  {
    id: 5,
    title: "Stay & Food Arrangement",
    desc: "Assistance in arranging accommodation near the hospital. Enjoy local cuisine with a touch of home comfort.",
    src: food,
  },
  {
    id: 6,
    title: "Assured Follow Up",
    desc: "Post-treatment consultation over phone/video call to track your recovery after returning home.",
    src: followup,
  },
];

const TreatmentJourney = () => {
  return (
    <section className="treatment-journey">
      <div className="side-space section-space treatment-journey-inner">
        <h2 className="section-heading text-white">
          Your Treatment Journey at Lokmanya Hospitals
        </h2>
        <div className="row common-gutter">
          {JOURNEY.map((j, index) => (
            <div key={index} className="col-lg-4 col-sm-6">
              <div className="journey-card h-100">
                <h4 className="journey-title">
                  <span className="j-count">{j.id}</span> {j.title}
                </h4>
                <p>{j.desc}</p>
                <Image width={70} height={70}
                  src={j.src?.src || ""}
                  alt={j.title}
                  className="journey-img mt-3 object-fit-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TreatmentJourney;
