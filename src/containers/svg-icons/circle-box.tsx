import React from "react";
import ISvgProps from "@/types/svg-props";

const CircleBox: React.FC<ISvgProps> = ({ size = 16, color = "#BFC9DA" }) => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 11 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.5 0C2.464 0 0 2.464 0 5.5C0 8.536 2.464 11 5.5 11C8.536 11 11 8.536 11 5.5C11 2.464 8.536 0 5.5 0ZM5.5 9.9C3.069 9.9 1.1 7.931 1.1 5.5C1.1 3.069 3.069 1.1 5.5 1.1C7.931 1.1 9.9 3.069 9.9 5.5C9.9 7.931 7.931 9.9 5.5 9.9Z"
      fill="#008176"
    />
  </svg>
);

export default CircleBox;
