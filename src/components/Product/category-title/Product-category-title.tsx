import { Typography } from '@mui/material';

import React, { ElementType, ReactNode } from 'react';
import style from './Product-category-title.module.scss';

interface IProps {
    pgTitle: String;

    tag?: ElementType<ReactNode>
}

const ProductCategoryTitle: React.FC<IProps> = ({ pgTitle, tag = 'h1' }) => {
    return (
        <Typography className={style.BrandCategoryName} variant='body1' component={tag}>{pgTitle}</Typography>
    );
};

export default ProductCategoryTitle;
