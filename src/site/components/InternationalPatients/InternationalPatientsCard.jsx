import patients from "../../assets/images/icons/patients.svg";
import hospital from "../../assets/images/icons/hospital.svg";
import medicaSpecialities from "../../assets/images/icons/medical-specialities.svg";
import glob from "../../assets/images/icons/glob.svg";
import Image from "next/image";

const STATS = [
  {
    icon: patients,
    count: "4000+",
    label: "Average International Patients per year",
  },
  {
    icon: glob,
    count: "100+",
    label: "Countries Patients Treated",
  },
  {
    icon: hospital,
    count: "4",
    label: "Hospitals in India",
  },
  {
    icon: medicaSpecialities,
    count: "30+",
    label: "Medical Specialties",
  },
];

const InternationalPatientsCard = () => {
  return (
    <section className="side-space section-space international-patient">
      <h2 className="section-heading">International Patients</h2>
      <div className="row common-gutter">
        {STATS.map((stat, index) => (
          <div key={index} className="col-md-3 col-6">
            <div className="int-patient-card text-center">
              <Image width={50} height={50} src={stat.icon?.src || ""} alt={stat.label} />
              <h3 className="count">{stat.count}</h3>
              <p>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InternationalPatientsCard;
