// import { ArrowGradient } from "../../assets/images/icons";
import ArrowButton from "../controls/ArrowButton";
// import "./services.css";
const ServiceCard2 = ({ title, onClick }) => {
  return (
    <div className="service-card-outer service-card-two-outer">
      <button
        aria-label="Book Services"
        type="button"
        className="service-card service-card-two"
        onClick={onClick}
      >
        <div className="card-content">
          <h4 className="">{title}</h4>
        </div>
        <ArrowButton />
        <svg
          className="corner-img"
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M-162 -75H-177V-60C-177 -68.2843 -170.284 -75 -162 -75ZM35 -75C43.2843 -75 50 -68.2843 50 -60V-75H35ZM50 6.87228C50 11.1026 44.2303 14 40 14H29C20.7157 14 14 20.7157 14 29V40C14 44.2303 11.1026 50 6.87227 50H50V6.87228ZM-162 50C-170.284 50 -177 43.2843 -177 35V50H-162Z"
            fill="#fff"
          />
        </svg>
      </button>
    </div>
  );
};

export default ServiceCard2;
