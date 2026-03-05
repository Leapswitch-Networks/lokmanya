// import { ArrowGradient } from "../../assets/images/icons";
import ArrowButton from "../controls/ArrowButton";
import "./services.css";
const ServiceCard = ({ title, subtitle, shadowColor, onClick }) => {
  return (
    <div className="service-card-outer">
      <a

        className="service-card"
        onClick={onClick}
        style={{ "--shadow-color": shadowColor }}
      >
        <div className="card-content">
          <h4 className="">{title}</h4>
          {/* <p className="card-subtitle">{subtitle}</p> */}
        </div>
        {/* <ArrowGradient />
          <ArrowGradient /> */}
        <ArrowButton />
        {/* <svg width="225" height="208" viewBox="1.5 0 225 160" fill="" xmlns="">
        <mask id="path-1-inside-1_1449_158" fill="white">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M227 15C227 6.71573 220.284 0 212 0H15C6.71573 0 0 6.71573 0 15V110C0 118.284 6.71574 125 15 125H183.872C188.103 125 191 119.23 191 115V104C191 95.7157 197.716 89 206 89H217C221.23 89 227 86.1026 227 81.8723V15Z"></path></mask>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M227 15C227 6.71573 220.284 0 212 0H15C6.71573 0 0 6.71573 0 15V110C0 118.284 6.71574 125 15 125H183.872C188.103 125 191 119.23 191 115V104C191 95.7157 197.716 89 206 89H217C221.23 89 227 86.1026 227 81.8723V15Z" fill="none" stroke="red" transform="scale(1.001, 1.28)"></path>
          </svg> */}
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
      </a>
    </div>
  );
};

export default ServiceCard;
