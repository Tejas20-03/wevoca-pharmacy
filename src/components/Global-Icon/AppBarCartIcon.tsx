import React from 'react';
// import styles from './Home-icon.module.scss';

interface IProps {
    color?: string
}

const AppBarCartIcon: React.FC<IProps> = () => {
    return (
        <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.9454 4.81107C22.7376 4.45104 22.4401 4.15101 22.0818 3.94024C21.7235 3.72948 21.3167 3.61517 20.901 3.60848H5.50787L4.81036 0.890623C4.73989 0.628263 4.58267 0.397493 4.3643 0.235898C4.14592 0.0743036 3.87927 -0.00859463 3.60777 0.000705296H1.20259C0.883644 0.000705296 0.57776 0.127406 0.352231 0.352936C0.126701 0.578466 0 0.884349 0 1.2033C0 1.52224 0.126701 1.82813 0.352231 2.05366C0.57776 2.27919 0.883644 2.40589 1.20259 2.40589H2.6938L6.01296 14.7445C6.08343 15.0068 6.24065 15.2376 6.45902 15.3992C6.6774 15.5608 6.94405 15.6437 7.21555 15.6344H18.0389C18.2609 15.6337 18.4785 15.5716 18.6674 15.4548C18.8563 15.3381 19.0092 15.1713 19.1092 14.973L23.0537 7.08397C23.2246 6.72561 23.3042 6.33051 23.2853 5.93391C23.2665 5.53731 23.1497 5.15156 22.9454 4.81107Z" fill="white" />
            <path d="M6.61443 21.6473C7.61069 21.6473 8.41832 20.8397 8.41832 19.8434C8.41832 18.8472 7.61069 18.0396 6.61443 18.0396C5.61817 18.0396 4.81055 18.8472 4.81055 19.8434C4.81055 20.8397 5.61817 21.6473 6.61443 21.6473Z" fill="white" />
            <path d="M18.6398 21.6473C19.6361 21.6473 20.4437 20.8397 20.4437 19.8434C20.4437 18.8472 19.6361 18.0396 18.6398 18.0396C17.6436 18.0396 16.8359 18.8472 16.8359 19.8434C16.8359 20.8397 17.6436 21.6473 18.6398 21.6473Z" fill="white" />
        </svg>

    );
};

export default AppBarCartIcon;
