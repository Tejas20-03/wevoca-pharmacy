import React from 'react';

interface IProps {
    color: string;
}

const UserIcon: React.FC<IProps> = ({ color }) => {
    return (
        <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.8914 19V17C15.8914 15.9391 15.473 14.9217 14.7283 14.1716C13.9836 13.4214 12.9735 13 11.9203 13H4.97103C3.91785 13 2.9078 13.4214 2.16309 14.1716C1.41838 14.9217 1 15.9391 1 17V19" stroke={`var(${color})`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.44763 9C10.6408 9 12.4187 7.20914 12.4187 5C12.4187 2.79086 10.6408 1 8.44763 1C6.25447 1 4.47656 2.79086 4.47656 5C4.47656 7.20914 6.25447 9 8.44763 9Z" stroke={`var(${color})`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default UserIcon;
