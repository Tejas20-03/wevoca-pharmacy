import React from 'react';
// import styles from './Home-icon.module.scss';

interface IProps {
    color?: string
}

const PlusIcon: React.FC<IProps> = ({ color }) => {
    return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.53125 5.85206C0.53125 5.20739 1.05386 4.68477 1.69854 4.68477H10.0119C10.6566 4.68477 11.1792 5.20739 11.1792 5.85206C11.1792 6.49674 10.6566 7.01935 10.0119 7.01935H1.69854C1.05386 7.01935 0.53125 6.49674 0.53125 5.85206Z" fill={`var(${color})`} />
            <path d="M5.85516 11.6885C5.26709 11.6885 4.79037 11.2118 4.79037 10.6237L4.79037 1.08042C4.79037 0.492351 5.26709 0.015625 5.85516 0.015625C6.44323 0.015625 6.91996 0.49235 6.91996 1.08042L6.91996 10.6237C6.91996 11.2118 6.44323 11.6885 5.85516 11.6885Z" fill={`var(${color})`} />
        </svg>
    );
};

export default PlusIcon;
