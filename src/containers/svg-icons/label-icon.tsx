import React from 'react';
import ISvgProps from '@/types/svg-props';


const LabelIcon: React.FC<ISvgProps> = ({ color = `--text-color-alt` }) => (
    <svg width="25" height="22" viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M15.8928 1.79297H20.6312C22.0908 1.79297 23.2741 2.97621 23.2741 4.43582V9.17417C23.2741 9.52464 23.1348 9.86075 22.887 10.1086L13.25 19.7456C12.2179 20.7777 10.5445 20.7777 9.51244 19.7456L5.32144 15.5546C4.28934 14.5225 4.28934 12.8491 5.32144 11.817L14.9585 2.18001C15.2063 1.93219 15.5424 1.79297 15.8928 1.79297V1.79297Z" stroke={`var(${color})`} strokeWidth="1.84031" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.7411 18.9723L7.54797 19.7678C6.3335 20.5774 4.69264 20.2492 3.88299 19.0348C3.77085 18.8666 3.67838 18.686 3.6074 18.4967L1.58559 13.1053C1.13774 11.911 1.60673 10.5673 2.70043 9.91106L14.0268 3.11523" stroke={`var(${color})`} strokeWidth="1.84031" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21.2952 5.09682C21.2952 4.36701 20.7036 3.77539 19.9738 3.77539C19.244 3.77539 18.6523 4.36701 18.6523 5.09682C18.6523 5.82662 19.244 6.41824 19.9738 6.41824C20.7036 6.41824 21.2952 5.82662 21.2952 5.09682Z" fill={`var(${color})`} />
    </svg>
);

export default LabelIcon;
