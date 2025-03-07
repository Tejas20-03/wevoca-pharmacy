
import { NextPage } from 'next';
import React from 'react';
import dynamic from 'next/dynamic';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/dataFetching/apiResponseQueryKey';
import { headerCategoryMenu } from '@/dataFetching/apiResponseFetching';
const FeedbackIndex = dynamic(() => import('@/containers/feedback/feedback-index/feedback-index'), { ssr: true });

const Index: NextPage = () => <FeedbackIndex />

export const getServerSideProps = async () => {
    const queryClient = new QueryClient();
    await Promise.all([queryClient.prefetchQuery([QUERY_KEYS.HEADER_CATEGORY], headerCategoryMenu)]);
    return { props: { dehydratedState: dehydrate(queryClient) } };
}

export default Index;
