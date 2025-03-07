import { Typography } from '@mui/material';
import React, { ElementType } from 'react';
import style from './Box-title.module.scss';

interface IProps {
    boxTitle: string;
    classes?: string;
    tag?: string;
}

const BoxTitle: React.FC<IProps> = ({ boxTitle, classes, tag }) => {
    const boxClass = `${style.boxTitle} ${classes?.length && classes}`
    return (
        <Typography className={boxClass} variant="body2" component={tag ?? 'h2'}>{boxTitle}</Typography>
    );
};

export default BoxTitle;
