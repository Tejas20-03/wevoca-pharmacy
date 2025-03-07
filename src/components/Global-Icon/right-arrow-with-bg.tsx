import React from 'react';
// import styles from './Home-icon.module.scss';

interface IProps {
    color?: string
}

const RightArrowWithBg: React.FC<IProps> = ({ color = "var(--secondary-color)" }) => {
    return (
        <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="20.3516" cy="20.5" rx="20.3516" ry="20.5" transform="matrix(-1 0 0 1 40.7031 0)" fill={color} />
            <g clipPath="url(#clip0_2570_19035)">
                <path d="M23.3911 20.5C23.3911 20.3163 23.3258 20.1326 23.1955 19.9925L19.0936 15.5853C18.8326 15.3049 18.4096 15.3049 18.1487 15.5853C17.8879 15.8655 17.8879 16.32 18.1487 16.6004L21.7784 20.5L18.1489 24.3996C17.888 24.68 17.888 25.1344 18.1489 25.4146C18.4097 25.6951 18.8328 25.6951 19.0937 25.4146L23.1957 21.0074C23.326 20.8673 23.3911 20.6836 23.3911 20.5Z" fill="white" />
            </g>
            <defs>
                <clipPath id="clip0_2570_19035">
                    <rect width="10.25" height="9.53983" fill="white" transform="matrix(4.3395e-08 1 1 -4.24985e-08 15.8984 15.375)" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default RightArrowWithBg;
