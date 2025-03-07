import React from 'react';
import Svg, { Path, G, Circle } from 'react-native-svg';

const order_cen_1: React.FC<ISvgProps> = ({ size = 10, color = { color }, bgColor = { bgColor } }) => {
    return (
        <svg width="32" height="32" viewBox="0 0 32 32"
            // fill="none"  
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M0.5 16C0.5 7.43959 7.43959 0.5 16 0.5C24.5604 0.5 31.5 7.43959 31.5 16C31.5 24.5604 24.5604 31.5 16 31.5C7.43959 31.5 0.5 24.5604 0.5 16Z"
                stroke={color} // border color  
                fill={bgColor} // bakground color: ;
            />
            <path d="M17.0459 10.9922V21H15.7812V12.5713L13.2314 13.501V12.3594L16.8477 10.9922H17.0459Z"
                fill={color} // text color 
            />
        </svg>
    )
}
export default order_cen_1;

