import React from 'react';
// import styles from './Home-icon.module.scss';

interface IProps {
    color: string
}

const CloseIcon: React.FC<IProps> = ({ color }) => {
    return (
        <svg width="36" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M27.9389 7.08508C22.2994 1.4456 13.0449 1.4456 7.40539 7.08508C1.76591 12.7246 1.76591 21.9791 7.40539 27.6186C13.0449 33.2581 22.1548 33.2581 27.7943 27.6186C33.4338 21.9791 33.5784 12.7246 27.9389 7.08508ZM21.721 23.4251L17.6721 19.3763L13.6233 23.4251L11.5989 21.4007L15.6477 17.3518L11.5989 13.303L13.6233 11.2785L17.6721 15.3274L21.721 11.2785L23.7454 13.303L19.6966 17.3518L23.7454 21.4007L21.721 23.4251Z" fill={`var(${color})`} />
        </svg>
    );
};

export default CloseIcon;
