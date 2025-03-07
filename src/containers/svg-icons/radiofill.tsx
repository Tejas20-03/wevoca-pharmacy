import React from "react";
import ISvgProps from "@/types/svg-props";

const RadioFill: React.FC<ISvgProps> = ({ size = 14, color = "#F2E31B" }) => (
  <svg
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.5 0C4.704 0 0 4.704 0 10.5C0 16.296 4.704 21 10.5 21C16.296 21 21 16.296 21 10.5C21 4.704 16.296 0 10.5 0ZM10.5 18.9C5.859 18.9 2.1 15.141 2.1 10.5C2.1 5.859 5.859 2.1 10.5 2.1C15.141 2.1 18.9 5.859 18.9 10.5C18.9 15.141 15.141 18.9 10.5 18.9Z"
      fill="#008176"
    />
    <path
      d="M10.5 15C12.9853 15 15 12.9853 15 10.5C15 8.01472 12.9853 6 10.5 6C8.01472 6 6 8.01472 6 10.5C6 12.9853 8.01472 15 10.5 15Z"
      fill="#008176"
    />
  </svg>
);

export default RadioFill;
