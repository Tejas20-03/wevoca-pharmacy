import React from 'react';
import ISvgProps from '@/types/svg-props';


const location: React.FC<ISvgProps> = ({ size = 14, color = '#F2E31B' }) => (
    <svg width={size} height={Math.round(size * 1.42)} viewBox="0 0 14 20">
        <path fill={color} fillRule="evenodd" clipRule="evenodd" d="M7 0C3.13 0 0 3.13 0 7C0 11.17 4.42 16.92 6.24 19.11C6.64 19.59 7.37 19.59 7.77 19.11C9.58 16.92 14 11.17 14 7C14 3.13 10.87 0 7 0ZM2 7C2 4.24 4.24 2 7 2C9.76 2 12 4.24 12 7C12 9.88 9.12 14.19 7 16.88C4.92 14.21 2 9.85 2 7ZM4.5 7C4.5 8.38 5.62 9.5 7 9.5C8.38 9.5 9.5 8.38 9.5 7C9.5 5.62 8.38 4.5 7 4.5C5.62 4.5 4.5 5.62 4.5 7Z" />
    </svg>
);

export default location;
