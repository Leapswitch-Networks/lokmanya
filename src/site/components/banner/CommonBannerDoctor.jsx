import React from "react";
import defaultImage from "../../assets/images/Dr-placeholder-img.webp";

const CommonBannerDoctor = ({
  image,
  bgImage,
  bgColor = "",
  children,
  className = "",
  useDefaultImage = false, // New prop to control the use of default image
}) => {
  
    console.log('bgImage',bgImage);
    
  return (
    <div className={`banner-main ${className}`}>
      <div className="row g-0 justify-content-center">
        <div className="col-md-8 col-lg-8 banner-left-col">
          <div className="banner-left-sec">{children}</div>
        </div>
        <div className="col-md-4 banner-right-col">
          <div
            className={`banner-right-sec showRightBanner ${bgColor && "bg-before"}`}
            style={{
              background: bgImage ? `url(${bgImage}) center center / cover no-repeat` : bgColor,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Show the defaultImage only if useDefaultImage is true or image is not provided */}
            {useDefaultImage && (
              <img
                src={image || defaultImage}
                alt="banner-right"
                crossOrigin="anonymous"
                className="banner-right"
              />
             )} 
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonBannerDoctor;
