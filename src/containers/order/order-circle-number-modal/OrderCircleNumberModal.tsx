import React from 'react';
import CircleNumber from '@/components/Utils/IconsSvg/circleNumber';
import styles from './OrderCircleNumberModal.module.scss';
import { Typography } from '@mui/material';


interface Props {
    className?: string;
    color?: string;
    bgColor?: string;
    size?: number;
    number?: number;
    title?: string;
    subTitle?: string;
    time?: string;
}

const OrderCircleNumberModal: React.FC<Props> = ({ className, color, bgColor, size, number, title, subTitle, time }) => {
    return (
        <div className={`${styles.container} ${className}`}>
            <div className={`${styles.innerContainer}`}>
                <CircleNumber color={color} bgColor={bgColor} size={size} isnumber={true} number={number} />
            </div>
            <div className={styles.titleContainer}>
                <Typography className={styles.titleStatus}>{title && title}</Typography>
                <Typography className={styles.subtitle}>{(subTitle && number !== 0) && subTitle}</Typography>
            </div>
            <Typography className={styles.time}>{time && time}</Typography>
        </div>
    );
}

export default OrderCircleNumberModal;