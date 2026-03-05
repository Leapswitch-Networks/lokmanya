import * as React from "react";
const SVGComponent = (props) => (
  <svg
    width={46}
    height={46}
    viewBox="0 0 46 46"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      style={{
        mixBlendMode: "color-burn",
      }}
      clipPath="url(#clip0_3678_1308)"
    >
      <path
        d="M30.0909 22.2633L20.8109 15.5174C20.4703 15.2705 20.0182 15.2334 19.6449 15.4252C19.2686 15.6156 19.0337 16.0022 19.0337 16.4201V29.9075C19.0337 30.3298 19.2686 30.715 19.6449 30.9054C19.804 30.9857 19.978 31.0258 20.1535 31.0258C20.3826 31.0258 20.6146 30.953 20.8109 30.8087L30.0909 24.0688C30.3839 23.8531 30.5549 23.52 30.5549 23.166C30.5564 22.8061 30.3809 22.4745 30.0909 22.2633Z"
        fill="url(#paint0_linear_3678_1308)"
      />
      <path
        d="M22.7204 0.793945C10.3767 0.793945 0.373891 10.7968 0.373891 23.1405C0.373891 35.4797 10.3767 45.4796 22.7204 45.4796C35.0611 45.4796 45.0655 35.4782 45.0655 23.1405C45.0669 10.7968 35.0611 0.793945 22.7204 0.793945ZM22.7204 41.7512C12.441 41.7512 4.10674 33.4214 4.10674 23.1405C4.10674 12.864 12.441 4.52382 22.7204 4.52382C32.9984 4.52382 41.3311 12.8625 41.3311 23.1405C41.3326 33.4214 32.9984 41.7512 22.7204 41.7512Z"
        fill="url(#paint1_linear_3678_1308)"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_3678_1308"
        x1={30.5549}
        y1={31.0258}
        x2={15.5628}
        y2={20.0398}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#223E76" />
        <stop offset={0.511069} stopColor="#365699" />
        <stop offset={1} stopColor="#2BA9B4" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_3678_1308"
        x1={45.0655}
        y1={45.4795}
        x2={0.37985}
        y2={0.787987}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#223E76" />
        <stop offset={0.511069} stopColor="#365699" />
        <stop offset={1} stopColor="#2BA9B4" />
      </linearGradient>
      <clipPath id="clip0_3678_1308">
        <rect
          width={44.6916}
          height={44.6916}
          fill="white"
          transform="translate(0.373886 0.791016)"
        />
      </clipPath>
    </defs>
  </svg>
);
export default SVGComponent;
