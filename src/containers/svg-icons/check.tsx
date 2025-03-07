import React from "react";
import ISvgProps from "@/types/svg-props";

const Check: React.FC<ISvgProps> = ({ size = 16, color = "#008176" }) => (
  <svg width={size} height={size} fill={color} viewBox="0 0 24 24">
    <path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z" />
  </svg>
);

export default Check;
