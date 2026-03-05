import React, { useState } from "react";
import AppointmentModal from "@/site/components/AppointmentModal";

const Job_positions = [
  // {
  //   title: "Fellowships in Arthroplasty, Orthopedic Trauma & Spine Surgeon",
  //   education: "M.S. Orthopaedics / DNB Orthopaedics",
  //   exp: "-",
  //   location: "S B Road, Nigdi, Chinchwad, Swargate",
  // },
  {
    title: "Staff Nurse",
    education: "GNM/BSC Nursing",
    exp: "1-5 years",
    location: "S B Road, Pune",
  },
  {
    title: "Senior Staff Nurse",
    education: "GNM/BSC Nursing",
    exp: "5-8 years",
    location: "S B Road, Pune",
  },
  {
    title: "Infection Control Nurse",
    education: "GNM/BSC Nursing & Certified Course of ICN",
    exp: "3-5 years",
    location: "S B Road, Pune",
  },
  {
    title: "Executive - Billing",
    education: "Graduate - B.Com / M.Com / B.Sc, MS Office",
    exp: "3-5 years",
    location: "S B Road, Pune",
  },
  {
    title: "ICU Intensivist",
    education: "IDCCM / DRNB / DM In Critical Care",
    exp: "-",
    location: "S B Road, Pune",
  },
  {
    title: "Call Center ( Marketing )",
    education: "Any Graduation",
    exp: "1 Years +",
    location: "S B Road, Pune",
  },
  {
    title: "Assistant Consultant / Associate Consultant for General Surgery Department",
    education: "MS / DNB (General Surgery)",
    exp: "-",
    location: "Nigdi, Pune ",
  }
];

const AvailablePositions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const handleModalOpen = (title) => {
    setModalTitle(title);
    setIsModalOpen(true);
  };
  const handleModalClose = () => setIsModalOpen(false);

  return (
    <section className="available-positions section-below-space side-space">
      <h2 className="section-heading">Available Positions</h2>
      <div className="table-outer">
        <table className="table positions-table">
          <thead>
            <tr>
              <th scope="col">JOB TITLE</th>
              <th scope="col">YEARS OF EXP</th>
              <th scope="col">EDUCATION</th>
              <th scope="col">LOCATION</th>
              <th scope="col">Apply now</th>
            </tr>
          </thead>
          <tbody>
            {Job_positions.map((position, index) => (
              <tr key={index}>
                <td scope="row">{position.title}</td>
                <td>{position.exp}</td>
                <td>{position.education}</td>
                <td>{position.location}</td>
                <td>
                  <button
                    type="button"
                    className="button-primary mx-auto"
                    onClick={() => handleModalOpen(position.title)}
                  >
                    <span>APPLY</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Appointment Modal */}
      <AppointmentModal
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
        file={true}
        title={modalTitle}
      />
    </section>
  );
};

export default AvailablePositions;
