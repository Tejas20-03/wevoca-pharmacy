import React from 'react';
import Svg, { Path, G, Circle } from 'react-native-svg';

const order_cen_4: React.FC<ISvgProps> = ({ color = { color }, bgColor = { bgColor } }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill={bgColor} // background color ;
    // xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.5 16C0.5 7.43959 7.43959 0.5 16 0.5C24.5604 0.5 31.5 7.43959 31.5 16C31.5 24.5604 24.5604 31.5 16 31.5C7.43959 31.5 0.5 24.5604 0.5 16Z"
        stroke={color} // border color  
        fill={bgColor} // bakground color: ;
      />
      <path
        d="M23.1437 10.25H21.8955C21.7205 10.25 21.5544 10.3304 21.4473 10.4679L14.0848 19.7946L10.5544 15.3214C10.501 15.2536 10.4329 15.1988 10.3553 15.1611C10.2777 15.1233 10.1925 15.1037 10.1062 15.1036H8.85799C8.73835 15.1036 8.67228 15.2411 8.74549 15.3339L13.6366 21.5304C13.8651 21.8196 14.3044 21.8196 14.5348 21.5304L23.2562 10.4786C23.3294 10.3875 23.2633 10.25 23.1437 10.25Z"
        fill={color} // text color
      />
    </svg>
  )
}
export default order_cen_4;

