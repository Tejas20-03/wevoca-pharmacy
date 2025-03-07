import BreadCrumb from '@/components/Bread-crumb/BreadCrumb';
import React from 'react';
import style from './store-index.module.scss';

import dynamic from 'next/dynamic';
const PageWithBanner = dynamic(() => import('@/components/page-banner/page-with-banner'));
const StoreContainer = dynamic(() => import('@/components/store-page/store-card/store-container/store-container'));

const StoreIndex: React.FC = () => {
    return (
        <PageWithBanner removeSideSpacing={style.pageSpacing}>
            <BreadCrumb FourthLink="stores" classes='deal-breadcrumb' />
            <StoreContainer />
        </PageWithBanner>
    );
};

export default StoreIndex;
