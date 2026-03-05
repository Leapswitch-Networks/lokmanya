import React from "react";
import RightArrow from "../../assets/images/Right-arrow.svg";
import Location from "../../assets/images/icons/location.svg";
import Image from "next/image";

const NetworkCard = ({ data }) => {
  return (
    <div className="network-card">
      <div className="nw-img">
        <Image height={200} width={295} src={data.img.src} className="card-img-top" alt={data.title} />
      </div>
      <div className="nw-card-info">
        <h5 className="nw-title">{data.title}</h5>
        <div className="location-div">
          <Image width={18} height={20} src={Location.src} alt="location icon" style={{ width: '18px', height: '20px' }} />
          <span>{data.location}</span>
        </div>
        <div className="d-flex align-items-center justify-content-center gap-2">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={data.directionLink}
            className="direction-link"
          >
            Get Directions{" "}
            <Image height={10} width={10} src={RightArrow.src} alt="right arrow" style={{ width: '10px', height: '10px' }} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default NetworkCard;
