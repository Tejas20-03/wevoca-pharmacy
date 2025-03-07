import { Typography } from '@mui/material';
import React from 'react';
import styles from './Toast.module.scss';

interface IProps {
    children: React.ReactNode;
}

const Toast: React.FC<IProps> = ({ children }) => {
    return (
        <Typography className={styles.toastMessage}>{children}</Typography>
    );
};

export default Toast;
