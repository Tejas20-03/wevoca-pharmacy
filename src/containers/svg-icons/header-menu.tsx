import React from "react";
import ISvgProps from "@/types/svg-props";

const HeaderMenu: React.FC<ISvgProps> = ({ size = 16, color = "#008176" }) => (
  <svg width={Math.round(size * 1.437)} height={size} viewBox="0 0 23 16">
    <path
      fill={color}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 1.5C0 0.671573 0.671573 0 1.5 0H21.5C22.3284 0 23 0.671573 23 1.5C23 2.32843 22.3284 3 21.5 3H1.5C0.671573 3 0 2.32843 0 1.5Z"
    />
    <path
      fill={color}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 7.6333C0 6.80487 0.671573 6.1333 1.5 6.1333H21.5C22.3284 6.1333 23 6.80487 23 7.6333C23 8.46173 22.3284 9.1333 21.5 9.1333H1.5C0.671573 9.1333 0 8.46173 0 7.6333Z"
    />
    <path
      fill={color}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 13.7666C0 12.9382 0.671573 12.2666 1.5 12.2666H21.5C22.3284 12.2666 23 12.9382 23 13.7666C23 14.595 22.3284 15.2666 21.5 15.2666H1.5C0.671573 15.2666 0 14.595 0 13.7666Z"
    />
  </svg>
);

export default HeaderMenu;
