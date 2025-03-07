import React from "react";
import ISvgProps from "@/types/svg-props";

const Edit: React.FC<ISvgProps> = ({ size = 18, color = "#008176" }) => (
  <svg width={size} height={size} viewBox="0 0 18 18">
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.15663 2.6875H2.59036C2.16857 2.6875 1.76406 2.85506 1.46581 3.15331C1.16756 3.45156 1 3.85607 1 4.27786V15.4104C1 15.8322 1.16756 16.2367 1.46581 16.535C1.76406 16.8332 2.16857 17.0008 2.59036 17.0008H13.7229C14.1447 17.0008 14.5492 16.8332 14.8475 16.535C15.1457 16.2367 15.3133 15.8322 15.3133 15.4104V9.84413"
    />
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.1199 1.49406C14.4363 1.17772 14.8653 1 15.3127 1C15.7601 1 16.1891 1.17772 16.5055 1.49406C16.8218 1.81041 16.9995 2.23946 16.9995 2.68683C16.9995 3.13421 16.8218 3.56326 16.5055 3.87961L8.95123 11.4338L5.77051 12.229L6.56569 9.04829L14.1199 1.49406Z"
    />
  </svg>
);

export default Edit;
