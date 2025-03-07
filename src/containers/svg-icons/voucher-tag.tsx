import React from 'react';
import ISvgProps from '@/types/svg-props';


// '#7D8FAB'

const VoucherTag: React.FC<ISvgProps> = ({ size = 18, color = { color } }) => (
    <svg width={Math.round(size * 21 / 18)} height={size} viewBox="0 0 21 18" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M13.3703 1H17.4187C18.6658 1 19.6768 2.01096 19.6768 3.25804V7.30647C19.6768 7.6059 19.5578 7.89307 19.3461 8.10481L11.1122 16.3386C10.2304 17.2205 8.80071 17.2205 7.91889 16.3386L4.33812 12.7579C3.4563 11.876 3.4563 10.4463 4.33812 9.56451L12.572 1.33068C12.7837 1.11895 13.0709 1 13.3703 1V1Z" stroke={color} strokeWidth="1.56147" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7.25768 15.6772L6.23828 16.3568C5.20065 17.0485 3.7987 16.7681 3.10694 15.7305C3.01113 15.5868 2.93212 15.4325 2.87147 15.2708L1.14405 10.6643C0.761409 9.64397 1.16211 8.4959 2.09656 7.93523L11.7738 2.12891" stroke={color} strokeWidth="1.56147" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17.9836 3.82238C17.9836 3.19884 17.4781 2.69336 16.8546 2.69336C16.2311 2.69336 15.7256 3.19884 15.7256 3.82238C15.7256 4.44592 16.2311 4.9514 16.8546 4.9514C17.4781 4.9514 17.9836 4.44592 17.9836 3.82238Z" fill={color} />
    </svg>
);

export default VoucherTag;




