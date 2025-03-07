
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import dynamic from 'next/dynamic';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/dataFetching/apiResponseQueryKey';
import { headerCategoryMenu } from '@/dataFetching/apiResponseFetching';
const PrescriptionIndex = dynamic(() => import('@/containers/prescription/prescription-index/prescription-index'), { ssr: true });


const Index: NextPage = () => {
    return (
        <>
            <Head>
                <meta name="description" content="Content: Order prescription medicines online with DVAGO®. Upload your prescription online and get your prescribed medicines delivered to your doorstep. We offer a wide range of authentic prescription medicines with free delivery. Order now or find a DVAGO® store near you. Call us at 021-11-11-38246 for assistance." />
                <title>Upload Prescription Online | Order Prescription Medicines Online - TEMP®</title>
            </Head>

            <PrescriptionIndex />
        </>
    );
};


export const getServerSideProps = async () => {
    const queryClient = new QueryClient();
    await Promise.all([queryClient.prefetchQuery([QUERY_KEYS.HEADER_CATEGORY], headerCategoryMenu)]);
    return { props: { dehydratedState: dehydrate(queryClient) } };
}


export default Index;
