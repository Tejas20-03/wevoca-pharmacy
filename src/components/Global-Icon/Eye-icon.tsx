import React from 'react';
// import styles from './Home-icon.module.scss';

interface IProps {
    color: string
}

const EyeIcon: React.FC<IProps> = ({ color }) => {
    return (
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 6.20607C1 6.20607 3.60304 1 8.15835 1C12.7137 1 15.3167 6.20607 15.3167 6.20607" stroke={`var(${color})`} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1 6.20703C1 6.20703 3.60304 11.4131 8.15835 11.4131C12.7137 11.4131 15.3167 6.20703 15.3167 6.20703" stroke={`var(${color})`} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.15931 8.15846C9.23752 8.15846 10.1116 7.2844 10.1116 6.20618C10.1116 5.12797 9.23752 4.25391 8.15931 4.25391C7.0811 4.25391 6.20703 5.12797 6.20703 6.20618C6.20703 7.2844 7.0811 8.15846 8.15931 8.15846Z" stroke={`var(${color})`} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default EyeIcon;
