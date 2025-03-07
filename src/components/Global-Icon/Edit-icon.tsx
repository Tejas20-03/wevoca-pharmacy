import React from 'react';
// import styles from './Home-icon.module.scss';

interface IProps {
    color?: string
}

const EditIcon: React.FC<IProps> = ({ color }) => {
    return (
        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.35946 2.87109H2.89829C2.40869 2.87109 1.93914 3.06559 1.59294 3.41179C1.24674 3.75799 1.05225 4.22754 1.05225 4.71714V17.6395C1.05225 18.1291 1.24674 18.5986 1.59294 18.9448C1.93914 19.291 2.40869 19.4855 2.89829 19.4855H15.8206C16.3102 19.4855 16.7798 19.291 17.126 18.9448C17.4722 18.5986 17.6667 18.1291 17.6667 17.6395V11.1783" stroke={`var(${color})`} strokeWidth="1.16077" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16.2803 1.48756C16.6475 1.12035 17.1455 0.914062 17.6649 0.914062C18.1842 0.914063 18.6822 1.12035 19.0494 1.48756C19.4166 1.85476 19.6229 2.35279 19.6229 2.87209C19.6229 3.39139 19.4166 3.88943 19.0494 4.25663L10.2807 13.0254L6.58856 13.9484L7.51159 10.2563L16.2803 1.48756Z" stroke={`var(${color})`} strokeWidth="1.16077" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default EditIcon;
