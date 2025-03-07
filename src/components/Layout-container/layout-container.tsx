import BaseLayout from '@/layouts/base-layout/base-layout';
import { Container } from '@mui/material';
import React from 'react';
import style from './layout-container.module.scss';

interface IProps {
    children: React.ReactNode
}

const LayoutContainer: React.FC<IProps> = ({ children }) => {
    return (
        <BaseLayout classes={style.aboutBaseLayout}>
            <Container className={style.productContainer}>{children}</Container>
        </BaseLayout>
    );
};

export default LayoutContainer;
