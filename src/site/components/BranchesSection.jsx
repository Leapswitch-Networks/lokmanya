import Link from "next/link";
import BlueRTArrow from "../assets/images/icons/blu-arrow-grad.svg";
import HosptalImg1 from "../assets/images/Lokmanya HSS.webp";
import HosptalImg2 from "../assets/images/Nigdi.webp";
import HosptalImg3 from "../assets/images/Chinchwad.webp";
import HosptalImg4 from "../assets/images/Swargate.webp";
import Image from "next/image";

const BRANCHES = [
  {
    id: "sb-road-branch",
    name: "Lokmanya Hospital - S B Road, Pune",
    address: [
      "402/A Gokhale Nagar Road,",
      "Vetal Baba Chowk, off Senapati Bapat,",
      "Pune, Maharashtra 411016",
    ],
    img: HosptalImg1,
    mapLink: "https://maps.app.goo.gl/Q2Z28tos9CAHPBSx8",
    branchLabel: "Lokmanya HSS - S B Road, Pune",
    shortName: "S B Road",
  },
  {
    id: "nigdi-branch",
    name: "Lokmanya Hospital - Nigdi, Pune",
    address: [
      "Sector 27, Tilak Rd,",
      "Sector No. 24, Pradhikaran, Nigdi,",
      "Pune, Maharashtra 411044",
    ],
    img: HosptalImg2,
    mapLink: "https://maps.app.goo.gl/V4Vuyho1VxP38Eci9",
    branchLabel: "Lokmanya Hospital - Nigdi, Pune",
    shortName: "Nigdi",
  },
  {
    id: "chinchwad-branch",
    name: "Lokmanya Hospital - Chinchwad, Pune",
    address: [
      "314/B, Chinchwad Gaon Rd,",
      "Udyog Nagar, Chinchwad,",
      "Pune, Maharashtra 411033",
    ],
    img: HosptalImg3,
    mapLink: "https://maps.app.goo.gl/ytC3hg2Ksaxs768B7",
    branchLabel: "Lokmanya Hospital - Chinchwad, Pune",
    shortName: "Chinchwad",
  },
  {
    id: "swargate-branch",
    name: "Lokmanya Hospital - Swargate, Pune",
    address: [
      "484/6, Shiv Darshan Rd,",
      "Mitra Mandal Colony, Parvati Paytha,",
      "Pune, Maharashtra 411009",
    ],
    img: HosptalImg4,
    mapLink: "https://maps.app.goo.gl/FpX5pJFbTEtcoDzd9",
    branchLabel: "Lokmanya Hospital - Swargate, Pune",
    shortName: "Swargate",
  },
];

const BranchesSection = ({ handleModalOpen }) => {


  return (
    <div className="section-space side-space">
      <div className="row g-4">
        {BRANCHES.map((branch, index) => (
          <div className="col-md-6" key={index}>
            <section id={branch.id} className="sb-road-hosp">
              <div className="sec-border">
                <div className="row align-items-center flex-column">
                  <div className="col-12 mb-3">
                    <div className="branch-hosp-img">
                      <Image width={569} height={335} src={branch.img.src} alt={branch.name} />
                    </div>
                  </div>
                  <div className="col-12 cnt-col">
                    <h2 className="branch-name">{branch.name}</h2>
                    <ul className="contact-details list-unstyled">
                      <li>
                        <h4 className="contact-ttl">Address:</h4>
                        {branch.address.map((line, i) => (
                          <div key={i}>{line}</div>
                        ))}
                      </li>
                    </ul>
                    <ul className="list-unstyled d-flex gap-md-3 gap-2">
                      <li>
                        <h4 className="contact-ttl">Contact:</h4>
                        <a className="contact-txt" href="tel:9307076767">93 0707 6767</a>
                      </li>
                      <li>
                        <h4 className="contact-ttl">Email:</h4>
                        <a className="contact-txt" href="mailto:care@lokmanyahospitals.com" target="_blank">
                          care@lokmanyahospitals.com
                        </a>
                      </li>
                    </ul>
                    <div className="d-flex gap-3 align-items-center">
                      <button
                        onClick={() =>
                          handleModalOpen(
                            "Book Appointment",
                            `${branch.shortName}`,
                            `${branch.buttonId}` // e.g., "bookappointmentswargate-branch"
                          )
                        }
                        className="button-primary"
                      >
                        <span>Book Appointment</span>
                      </button>

                      <Link
                        href={branch.mapLink}
                        target="_blank"
                        className="get-dir"
                        rel="noopener noreferrer"
                      >
                        <span>Get Direction</span>
                        <Image width={11} height={11} src={BlueRTArrow.src} alt="Arrow Icon" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BranchesSection;
