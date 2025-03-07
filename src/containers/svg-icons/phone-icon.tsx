import React from 'react';
import ISvgProps from '@/types/svg-props';


const PhoneIcon: React.FC<ISvgProps> = ({ size = 14, color = '#F2E31B' }) => (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.7375 14.6055C20.6797 14.4369 20.58 14.2858 20.4478 14.1664C20.3155 14.047 20.1551 13.9633 19.9815 13.923L13.6815 12.4845C13.5105 12.4457 13.3325 12.4504 13.1638 12.4981C12.995 12.5458 12.8409 12.635 12.7155 12.7575C12.5685 12.894 12.558 12.9045 11.8755 14.2065C9.61086 13.163 7.79624 11.3409 6.762 9.072C8.0955 8.4 8.106 8.4 8.2425 8.2425C8.36504 8.11708 8.45423 7.96298 8.50192 7.79424C8.5496 7.6255 8.55427 7.44751 8.5155 7.2765L7.077 1.05C7.03673 0.876431 6.95295 0.715964 6.83355 0.583707C6.71415 0.45145 6.56306 0.351752 6.3945 0.294C6.14929 0.206419 5.89608 0.143115 5.6385 0.105C5.37311 0.043465 5.1023 0.00829431 4.83 0C3.549 0 2.32047 0.508874 1.41467 1.41467C0.508873 2.32048 0 3.549 0 4.83C0.00555651 9.11685 1.71096 13.2265 4.74222 16.2578C7.77348 19.289 11.8832 20.9944 16.17 21C16.8043 21 17.4324 20.8751 18.0184 20.6323C18.6044 20.3896 19.1368 20.0338 19.5853 19.5853C20.0338 19.1368 20.3896 18.6044 20.6323 18.0184C20.8751 17.4324 21 16.8043 21 16.17C21.0003 15.9027 20.9793 15.6359 20.937 15.372C20.8929 15.1112 20.8261 14.8547 20.7375 14.6055Z" fill="#231F20" />
    </svg>

);

export default PhoneIcon; 
