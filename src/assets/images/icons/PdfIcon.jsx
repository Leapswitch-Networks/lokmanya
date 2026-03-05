import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    id="Layer_1"
    width={props.width ||20}
    height={props.height ||20}
    x={0}
    y={0}
    style={{
      enableBackground: "new 0 0 150 150",
    }}
    viewBox="0 0 150 150"
    {...props}
  >
    <style>{".pdf1{fill-rule:evenodd;clip-rule:evenodd;fill:#ce1725}"}</style>
    <path
      d="M51.1 5h47.4l41.9 41.9v80.4c0 9.8-8 17.8-17.8 17.8H51.1c-9.8 0-17.8-8-17.8-17.8V22.8C33.3 13 41.3 5 51.1 5z"
      style={{
        fillRule: "evenodd",
        clipRule: "evenodd",
        fill: "#e5252a",
      }}
    />
    <path
      d="m98.5 5 41.9 41.9H103c-2.5 0-4.5-2-4.5-4.5V5zM13.5 64.6H110c2.1 0 3.9 1.8 3.9 3.9v35.4c0 2.1-1.8 3.9-3.9 3.9H13.5c-2.1 0-3.9-1.8-3.9-3.9V68.5c0-2.1 1.8-3.9 3.9-3.9z"
      className="pdf1"
    />
    <path
      d="M28.6 99V73.4h10.9c2.7 0 4.8.7 6.4 2.2 1.6 1.5 2.4 3.5 2.4 5.9s-.8 4.5-2.4 5.9c-1.6 1.5-3.7 2.2-6.4 2.2h-4.3V99h-6.6zm6.5-14.8h3.6c1 0 1.7-.2 2.3-.7.5-.5.8-1.1.8-1.9s-.3-1.5-.8-1.9c-.5-.5-1.3-.7-2.3-.7h-3.6v5.2zM51 99V73.4h9c1.8 0 3.5.2 5 .8 1.6.5 3 1.3 4.3 2.3 1.3 1 2.3 2.3 3 4 .7 1.7 1.1 3.6 1.1 5.8 0 2.1-.4 4.1-1.1 5.7-.7 1.7-1.7 3-3 4s-2.7 1.7-4.3 2.3c-1.6.5-3.3.8-5 .8h-9zm6.4-5.6h1.9c1 0 2-.1 2.8-.3.8-.2 1.6-.6 2.4-1.2.7-.5 1.3-1.3 1.7-2.2.4-1 .6-2.1.6-3.5s-.2-2.5-.6-3.5c-.4-1-1-1.7-1.7-2.2-.8-.5-1.6-.9-2.4-1.2-.9-.2-1.8-.3-2.8-.3h-1.9v14.4zM76.7 99V73.4h18.2V79H83.3v4.1h9.3v5.5h-9.3V99h-6.6z"
      style={{
        fill: "#fff",
      }}
    />
  </svg>
)
export default SvgComponent
