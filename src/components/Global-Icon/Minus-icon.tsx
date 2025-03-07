import React from 'react';
// import styles from './Home-icon.module.scss';

interface IProps {
    color?: string
}

const MinusIcon: React.FC<IProps> = ({ color }) => {
    return (
        <svg width="12" height="4" viewBox="0 0 12 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.605469" y="0.683594" width="10.648" height="2.33458" rx="1.16729" fill={`var(${color})`} />
        </svg>
    );
};

export default MinusIcon;
