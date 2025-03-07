import React from 'react';
import styles from './Section-loader.module.scss';

interface IProps {
    color?: string
}

const SectionLoader: React.FC<IProps> = ({ color }) => {
    return (
        <svg width="94" height="94" viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M47 17.6667V3M67.7778 26.2222L78.2889 15.7111M76.3333 47H91M67.7778 67.7778L78.2889 78.2889M47 76.3333V91M26.2222 67.7778L15.7111 78.2889M17.6667 47H3M26.2222 26.2222L15.7111 15.7111" stroke={`var${color}`} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default SectionLoader;
