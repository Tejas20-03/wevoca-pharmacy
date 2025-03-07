import React from 'react';
import ISvgProps from '@/types/svg-props';


const ArrowRight: React.FC<ISvgProps> = ({ size = 9, color = '#F2E31B' }) => (
  <svg width={size} height={Math.round(size * 1.77)} viewBox="0 0 9 16">
    <path fill={color} d="M0.308694 15.6869C-0.101551 15.2776 -0.101546 14.5952 0.300655 14.1859L6.37488 8.00396L0.308694 1.82302C-0.101551 1.40455 -0.101551 0.731307 0.308694 0.313856C0.718939 -0.104619 1.38157 -0.104619 1.79182 0.313856L8.75491 7.39928C9.0817 7.7318 9.0817 8.26896 8.75491 8.60149L1.79182 15.6869C1.38157 16.1044 0.718939 16.1044 0.308694 15.6869Z" />
  </svg>
);

export default ArrowRight;
