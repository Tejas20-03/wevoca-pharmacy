import React from 'react';

interface IProps {
    color?: string;
}

const DownArrow: React.FC<IProps> = ({ color = '--text-color-grey' }) => {
    return (
        <svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0.833376C9.14661e-09 0.620254 0.0799755 0.406923 0.239727 0.244216C0.559431 -0.0814056 1.07714 -0.0814056 1.39664 0.244216L9.00001 7.9883L16.6034 0.244217C16.9231 -0.0814047 17.4408 -0.0814047 17.7603 0.244217C18.0798 0.569839 18.08 1.09713 17.7603 1.42254L9.57847 9.75578C9.25876 10.0814 8.74106 10.0814 8.42156 9.75578L0.239727 1.42254C0.0799755 1.25983 -9.14661e-09 1.0465 0 0.833376Z" fill={`var(${color})`} />
        </svg>
    );
};

export default DownArrow;
