import React from 'react';
import ISvgProps from '@/types/svg-props';


const ScrollDownIcon: React.FC<ISvgProps> = ({ color = '--primary-color' }) => (
    <svg width="61" height="61" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M60.0584 30.5C60.0584 47.072 46.7224 60.5 30.2792 60.5C13.836 60.5 0.5 47.072 0.5 30.5C0.5 13.928 13.836 0.5 30.2792 0.5C46.7224 0.5 60.0584 13.928 60.0584 30.5Z" stroke={`var(${color})`} />
        <path d="M30.2891 18.5V41.5441" stroke={`var(${color})`} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M37.2346 34.5449L30.2853 41.5449L23.3359 34.5449" stroke={`var(${color})`} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default ScrollDownIcon;
