import React from "react";
import ISvgProps from "@/types/svg-props";

const OrderIconOut: React.FC<ISvgProps> = ({
  size = 16,
  color = "#008176",
}) => (
  <svg width={Math.round(size * 1.437)} height={size} viewBox="0 0 23 16">
    <path d="M24 12c0 6.627-5.373 12-12 12s-12-5.373-12-12h2c0 5.514 4.486 10 10 10s10-4.486 10-10-4.486-10-10-10c-2.777 0-5.287 1.141-7.099 2.977l2.061 2.061-6.962 1.354 1.305-7.013 2.179 2.18c2.172-2.196 5.182-3.559 8.516-3.559 6.627 0 12 5.373 12 12zm-13-6v8h7v-2h-5v-6h-2z" />
  </svg>
);

export default OrderIconOut;
