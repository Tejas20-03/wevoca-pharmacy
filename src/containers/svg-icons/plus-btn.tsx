import React from "react";
import ISvgProps from "@/types/svg-props";

const PlusBtn: React.FC<ISvgProps> = ({ size = 14, color = "#008176" }) => (
  <svg width={size} height={Math.round(size * (15 / 14))} viewBox="0 0 14 15">
    <path
      fill={color}
      d="M0 7.49999C0 6.67156 0.671573 5.99999 1.5 5.99999H12.1829C13.0114 5.99999 13.6829 6.67156 13.6829 7.49999C13.6829 8.32841 13.0114 8.99999 12.1829 8.99999H1.5C0.671573 8.99999 0 8.32841 0 7.49999Z"
    />
    <path
      fill={color}
      d="M6.84138 15C6.08569 15 5.47309 14.3874 5.47309 13.6317L5.47309 1.36829C5.47309 0.612606 6.08569 3.62117e-08 6.84138 0C7.59707 -3.62117e-08 8.20967 0.612606 8.20967 1.36829L8.20967 13.6317C8.20967 14.3874 7.59707 15 6.84138 15Z"
    />
  </svg>
);

export default PlusBtn;
