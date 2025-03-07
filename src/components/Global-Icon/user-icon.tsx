import React from 'react';
// import styles from './Home-icon.module.scss';

interface IProps {
    color: string
}

const AppBarUserIcon: React.FC<IProps> = ({ color }) => {
    return (
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.79449 5.79449C5.79449 8.98919 8.39429 11.589 11.589 11.589C14.7837 11.589 17.3835 8.98919 17.3835 5.79449C17.3835 2.5998 14.7837 0 11.589 0C8.39429 0 5.79449 2.5998 5.79449 5.79449ZM21.8903 24.4656H23.178V23.178C23.178 18.2089 19.1334 14.1643 14.1643 14.1643H9.01366C4.04327 14.1643 0 18.2089 0 23.178V24.4656H1.28767H2.57533H20.6026H21.8903Z" fill={`var(${color})`} />
        </svg>
    );
};

export default AppBarUserIcon;
