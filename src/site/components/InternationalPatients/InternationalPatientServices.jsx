import Treatmentplan from "../../assets/images/international-patients/Treatmentplan.webp";
import VisaAssistance from "../../assets/images/international-patients/VisaAssistance.webp";
import PaymentAssistance from "../../assets/images/international-patients/PaymentAssistance.webp";
import QuickHelp from "../../assets/images/international-patients/QuickHelp.webp";
import payment from "../../assets/images/international-patients/payment.webp";
import Image from "next/image";

const SERVICES = [
  { title: "Treatment Plan", src: Treatmentplan },
  { title: "Visa Assistance", src: VisaAssistance },
  { title: "Payment / Insurance Assistance", src: PaymentAssistance },
  { title: "Quick Help", src: QuickHelp },
];

const InternationalPatientServices = () => {
  return (
    <section className="side-space section-below-space international-patient-services">
      <h2 className="section-heading">International Patient Services</h2>

      <div className="row row-cols-xl-4 row-cols-lg-4 row-cols-sm-3 row-cols-2 common-gutter">
        {SERVICES.map((service, index) => (
          <div key={index} className="col">
            <div className="patient-service-card">
              <h4>{service.title}</h4>
              <div className="patient-service-img">
                <Image width={217} height={150}
                  src={service.src?.src || ""}
                  alt={service.title}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InternationalPatientServices;
