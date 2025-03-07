import React from 'react';
// import styles from './Home-icon.module.scss';

interface IProps {
    color?: string
}

const LeftArrowWithBg: React.FC<IProps> = ({ color = "var(--secondary-color)" }) => {
    return (
        <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="20.3516" cy="20.5" rx="20.3516" ry="20.5" fill={color} />
            <g clipPath="url(#clip0_2570_19040)">
                <path d="M17.312 20.5C17.312 20.3163 17.3773 20.1326 17.5076 19.9925L21.6096 15.5853C21.8705 15.3049 22.2935 15.3049 22.5544 15.5853C22.8152 15.8655 22.8152 16.32 22.5544 16.6004L18.9247 20.5L22.5543 24.3996C22.8151 24.68 22.8151 25.1344 22.5543 25.4146C22.2934 25.6951 21.8704 25.6951 21.6094 25.4146L17.5075 21.0074C17.3772 20.8673 17.312 20.6836 17.312 20.5Z" fill="white" />
            </g>
            <defs>
                <clipPath id="clip0_2570_19040">
                    <rect width="10.25" height="9.53983" fill="white" transform="translate(24.8047 15.375) rotate(90)" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default LeftArrowWithBg;
