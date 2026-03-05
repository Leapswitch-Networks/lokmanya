import React, { useState } from "react";
import AppointmentModal from "@/site/components/AppointmentModal";

const Job_positions = [
  {
    title: "Fellowship in Spine Surgery ",
    education: "M.S. Orthopaedics / DNB Orthopaedics",
    exp: "6  Month ",
    location: "S B Road, Nigdi, Chinchwad, Swargate ",
  },
  {
    title: "Fellowship in Trauma Surgery ",
    education: "M.S. Orthopaedics / DNB Orthopaedics",
    exp: "6  Month ",
    location: "S B Road, Nigdi, Chinchwad, Swargate ",
  },
  {
    title: "Fellowship in Arthoplasty Surgery ",
    education: "M.S. Orthopaedics / DNB Orthopaedics",
    exp: "6  Month ",
    location: "S B Road, Nigdi, Chinchwad, Swargate ",
  },
  {
    title: "Fellowship in Hernia Surgery & AWR",
    education: "MS / DNB in General Surgery",
    exp: "6  Month ",
    location: "Lokmanya Hospitals, Nigdi, Pune",
  },

];

const AvailablePositionsFellowships = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const handleModalOpen = (title) => {
    setModalTitle(title);
    setIsModalOpen(true);
  };
  const handleModalClose = () => setIsModalOpen(false);

  return (
    <section className="available-positions section-below-space side-space">
      <h2 className="section-heading">Fellowship at Lokmanya Hospitals</h2>
      <div className="table-outer">
        <table className="table positions-table">
          <thead>
            <tr>
              <th scope="col">Fellowship Course</th>
              <th scope="col">DURATION</th>
              <th scope="col">QUALIFICATION</th>
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

export default AvailablePositionsFellowships;
