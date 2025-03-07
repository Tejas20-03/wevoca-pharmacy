import React from 'react';
import ISvgProps from '@/types/svg-props';


const ArrowLeft: React.FC<ISvgProps> = ({ size = 10, color = "var(--primary-color)" }) => (
    <svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25.4586 11.7915H6.37656L14.7132 3.45482C15.3795 2.78857 15.3795 1.69523 14.7132 1.02898C14.047 0.362734 12.9707 0.362734 12.3045 1.02898L1.04656 12.2869C0.380313 12.9532 0.380313 14.0294 1.04656 14.6956L12.3045 25.9536C12.9707 26.6198 14.047 26.6198 14.7132 25.9536C15.3795 25.2873 15.3795 24.2111 14.7132 23.5448L6.37656 15.2081H25.4586C26.3982 15.2081 27.167 14.4394 27.167 13.4998C27.167 12.5602 26.3982 11.7915 25.4586 11.7915Z" fill="#303733" />
    </svg>
);

export default ArrowLeft;


