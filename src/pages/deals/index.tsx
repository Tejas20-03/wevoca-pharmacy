

import wrapper from '@/redux/store';
import { getBannersNew } from '@/services/banners/services';
import { GetBannersNew_ResponseType } from '@/services/banners/types';
import { NextPage } from 'next';
import React from 'react';

import dynamic from 'next/dynamic';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/dataFetching/apiResponseQueryKey';
import { headerCategoryMenu } from '@/dataFetching/apiResponseFetching';
const DealIndex = dynamic(() => import('@/containers/deals/deals-index/deal-index'), { ssr: true });


interface IProps {
    productDetailResponse: GetBannersNew_ResponseType
}

const Index: NextPage<IProps> = ({ productDetailResponse }) => {
    return (
        <>
            {productDetailResponse && <DealIndex data={productDetailResponse} />}
        </>
    )
}


export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ res, req }) => {

    
    const { selectedStoreID } = store.getState().store
    const branchCode = req.cookies.branchCode;
    const productDetailResponse = await getBannersNew('DealsBanners', branchCode || selectedStoreID || '32', { token: '' })

    const queryClient = new QueryClient();
    await Promise.all([queryClient.prefetchQuery([QUERY_KEYS.HEADER_CATEGORY], headerCategoryMenu)]);
    return { props: { productDetailResponse, dehydratedState: dehydrate(queryClient) } }

})






export default Index;
