import React from "react";
import "./skeleton.css";

const Skeleton = () => {
  return (
    <div className="doctorCardSkeleton row justify-content-center">
      <div className="col-3">
        <div className="skeleton-avatar"></div>
      </div>
      <div className="col-9 text-Container">
        <div className="skeleton-line name"></div>
        <div className="skeleton-line name"></div>

        <div className="skeleton-line name"></div>
        <div className="skeleton-line name"></div>
        <div className="skeleton-line name"></div>
      </div>
      <div className="skeleton-button"></div>
    </div>
  );
};

export default Skeleton;
