import BaseLayout from '@/layouts/base-layout/base-layout';
import { Container } from '@mui/material';
import React from 'react';
import style from './page-banner.module.scss';

interface IProps {
    children: React.ReactNode,
    removeSideSpacing?: string,
}

const PageWithBanner: React.FC<IProps> = ({ children, removeSideSpacing }) => {
    const baseLayoutClass = `${removeSideSpacing} ${removeSideSpacing?.length && removeSideSpacing}`
    return (
        <BaseLayout classes={baseLayoutClass}>
            <Container className={style.productContainer}>
                {children}
            </Container>
        </BaseLayout>
    );
};

export default PageWithBanner;
