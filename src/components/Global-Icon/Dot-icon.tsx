import React from 'react';
import styles from './Dot-icon.module.scss';

interface IProps {
    color?: string;
}

const DotIcon: React.FC<IProps> = ({ color }) => {
    return (
        <svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="2.5" cy="2.5" r="2.5" fill={`var(${color})`} />
        </svg>
    );
};

export default DotIcon;
