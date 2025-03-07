import React from 'react';
// import styles from './Home-icon.module.scss';

interface IProps {
    color: string
}

const CartIcon: React.FC<IProps> = ({ color }) => {
    return (
        <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.32086 22C9.86914 22 10.3136 21.5523 10.3136 21C10.3136 20.4477 9.86914 20 9.32086 20C8.77259 20 8.32812 20.4477 8.32812 21C8.32812 21.5523 8.77259 22 9.32086 22Z" stroke={`var(${color})`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20.235 22C20.7833 22 21.2278 21.5523 21.2278 21C21.2278 20.4477 20.7833 20 20.235 20C19.6867 20 19.2422 20.4477 19.2422 21C19.2422 21.5523 19.6867 22 20.235 22Z" stroke={`var(${color})`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1.375 1H5.34604L8.00663 14.39C8.09741 14.8504 8.34606 15.264 8.70905 15.5583C9.07204 15.8526 9.52624 16.009 9.99215 16H19.6418C20.1077 16.009 20.5619 15.8526 20.9249 15.5583C21.2879 15.264 21.5365 14.8504 21.6273 14.39L23.2157 6H6.33879" stroke={`var(${color})`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default CartIcon;
