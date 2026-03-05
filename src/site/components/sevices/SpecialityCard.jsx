import Image from 'next/image';
import React from 'react';

const SpecialityCard = ({ specialty }) => {
  return (
    <div className="speciality-card">
      <h3 className="centerText speciality-card-ttl">{specialty.name}</h3>
      <Image width={70} height={70} src={specialty.icon.src} alt={`Icon showing ${specialty.name}`} />
    </div>
  );
};


export default SpecialityCard;
