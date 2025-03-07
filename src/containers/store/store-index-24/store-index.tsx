import React from 'react';
import style from './store-index.module.scss';

import dynamic from 'next/dynamic';
const PageWithBanner = dynamic(() => import('@/components/page-banner/page-with-banner'));
const StoreContainer24 = dynamic(() => import('@/components/store-page/store-card/store-container-24/store-container'));

const StoreIndex: React.FC = () => {
    return (
        <PageWithBanner removeSideSpacing={style.pageSpacing}>
            <StoreContainer24 />
        </PageWithBanner>
    );
};

export default StoreIndex;
