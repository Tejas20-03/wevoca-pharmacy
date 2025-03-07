import React from 'react';
import ISvgProps from '@/types/svg-props';


const arrowup: React.FC<ISvgProps> = ({ size = 10, color = { color } }) => (
    <svg width={Math.round(size * 18 / 10)} height={size} viewBox="0 0 18 10">
        <path fill={color} d="M0.750008 8.74995C0.750008 8.94177 0.823318 9.13377 0.969757 9.2802C1.26282 9.57327 1.73738 9.57327 2.03026 9.2802L9.00002 2.31045L15.9698 9.2802C16.2628 9.57327 16.7374 9.57327 17.0303 9.2802C17.3231 8.98714 17.3233 8.51258 17.0303 8.2197L9.53027 0.719703C9.2372 0.42664 8.76264 0.42664 8.46976 0.719703L0.969757 8.2197C0.823318 8.36614 0.750008 8.55814 0.750008 8.74995Z" />
    </svg>
);
export default arrowup;


