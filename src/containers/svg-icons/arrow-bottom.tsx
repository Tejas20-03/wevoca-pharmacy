import React from 'react';
import ISvgProps from '@/types/svg-props';




const Arrowbottom: React.FC<ISvgProps> = ({ size = 10, color = "var(--primary-color)", opacity }) => (
    <svg style={{ opacity: opacity }} width={Math.round(size * 18 / 10)} height={size} viewBox="0 0 18 10">
        <path fill={color} d="M0.75 1.25005C0.75 1.05823 0.823312 0.866234 0.96975 0.719797C1.26281 0.426734 1.73738 0.426734 2.03025 0.719797L9.00001 7.68955L15.9698 0.719798C16.2628 0.426735 16.7374 0.426735 17.0303 0.719798C17.3231 1.01286 17.3233 1.48742 17.0303 1.7803L9.53026 9.2803C9.2372 9.57336 8.76263 9.57336 8.46976 9.2803L0.96975 1.7803C0.823312 1.63386 0.75 1.44186 0.75 1.25005Z" />
    </svg>
);

export default Arrowbottom;


