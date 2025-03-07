import React from 'react';
// import styles from './Home-icon.module.scss';

interface IProps {
    color: string
}

const YoutubeIcon: React.FC<IProps> = ({ color }) => {
    return (
        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.722 5.6175C19.6181 5.20223 19.4064 4.82175 19.1083 4.51448C18.8103 4.20721 18.4364 3.98404 18.0245 3.8675C16.5195 3.5 10.4995 3.5 10.4995 3.5C10.4995 3.5 4.47952 3.5 2.97452 3.9025C2.56262 4.01904 2.18875 4.24221 1.8907 4.54948C1.59265 4.85675 1.38096 5.23723 1.27702 5.6525C1.00159 7.17986 0.866855 8.72927 0.874524 10.2812C0.864706 11.8449 0.999445 13.4061 1.27702 14.945C1.39161 15.3474 1.60804 15.7134 1.9054 16.0077C2.20276 16.302 2.57099 16.5146 2.97452 16.625C4.47952 17.0275 10.4995 17.0275 10.4995 17.0275C10.4995 17.0275 16.5195 17.0275 18.0245 16.625C18.4364 16.5085 18.8103 16.2853 19.1083 15.978C19.4064 15.6707 19.6181 15.2903 19.722 14.875C19.9953 13.3591 20.1301 11.8215 20.1245 10.2812C20.1343 8.71759 19.9996 7.15636 19.722 5.6175V5.6175Z" stroke={`var(${color})`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.53125 13.1444L13.5625 10.2831L8.53125 7.42188V13.1444Z" fill={`var(${color})`} />
        </svg>
    );
};

export default YoutubeIcon;
