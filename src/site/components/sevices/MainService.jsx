import React from 'react';
import ServiceCard2 from './ServiceCard2';
import AppointmentModal from '../AppointmentModal';

const services = [
  {
    title: 'Book Appointment',
    actionType: 'modal',
    modalId: 'bookappointmentId',
  },
  {
    title: 'Book Health Checkup',
    actionType: 'modal',
    modalId: 'bookHealthCheckupId',
  },
  {
    title: 'Find A Hospital',
    actionType: 'link',
    link: '/our-branch',
  },
  {
    title: 'Second Opinion',
    actionType: 'modal',
    modalId: 'bookSecondOpinionId',
  },
  {
    title: 'Book a Lab Test',
    actionType: 'modal',
    modalId: 'bookLabTestId',
  },
];

const MainService = ({
  handleModalOpen,
  handleModalClose,
  isModalOpen,
  modalTitle,
  modalId,
}) => {
  const handleCardClick = (service) => {
    if (service.actionType === 'modal') {
      handleModalOpen(service.title, service.modalId);
    } else if (service.actionType === 'link') {
      window.location.href = service.link;
    }
  };

  // console.log("modalId", modalId);
  return (
    <section className="services side-space section-space">
      {services.map((service, index) => (
        <ServiceCard2
          key={index}
          title={service.title}
          onClick={() => handleCardClick(service)}
        />
      ))}

      <AppointmentModal
        isModalOpen={isModalOpen}
        submitBtnClass={modalId}
        handleModalClose={handleModalClose}
        title={modalTitle}
      />
    </section>
  );
};

export default MainService;
