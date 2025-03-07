import React from 'react';
import ISvgProps from '@/types/svg-props';


const MinusBtn: React.FC<ISvgProps> = ({ size = 3, color = '#303733' }) => (
    <svg width={Math.round(size * (14 / 3))} height={size} viewBox="0 0 14 3">
        <Rect fill={color} width="13.6829" height="3" rx="1.5" />
    </svg>
);

export default MinusBtn;
