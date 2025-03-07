import React from 'react';
// import styles from './Home-icon.module.scss';

interface IProps {
    color?: string
}

const AppBarPrescriptionIcon: React.FC<IProps> = ({ color }) => {
    return (
        <svg width="22" height="27" viewBox="0 0 22 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.15 9.45H19.575L12.15 2.025V9.45ZM2.7 0H13.5L21.6 8.1V24.3C21.6 25.0161 21.3155 25.7028 20.8092 26.2092C20.3028 26.7155 19.6161 27 18.9 27H2.7C1.2015 27 0 25.785 0 24.3V2.7C0 1.2015 1.2015 0 2.7 0ZM14.85 21.6V18.9H2.7V21.6H14.85ZM18.9 16.2V13.5H2.7V16.2H18.9Z" fill={`var(${color})`} />
        </svg>

    );
};

export default AppBarPrescriptionIcon;
