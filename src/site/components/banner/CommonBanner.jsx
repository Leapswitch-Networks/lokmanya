import React from "react";

const CommonBanner = ({ image, bgImage, bgColor = "", children, className = "" }) => {
  return (
    <div className={`banner-main ${className} ${bgImage ? 'has-bg-image' : ''}`}>
      <div className="row g-0 justify-content-center">
        <div className="col-md-8 col-lg-8 banner-left-col">
          <div className="banner-left-sec">{children}</div>
        </div>
        <div className="col-md-4 banner-right-col">
          <div
            className={`banner-right-sec showRightBanner ${bgColor && "bg-before"}`}
            style={{
              background: bgImage ? `url(${bgImage}) center center / cover no-repeat ` : bgColor,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {image && <img loading="eager" src={image} alt={"banner-right"} className="banner-right" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonBanner;

