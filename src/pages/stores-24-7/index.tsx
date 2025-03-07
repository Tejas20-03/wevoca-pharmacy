import { GetCategoryMenu_ResponseType } from '@/services/categories/types';
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import dynamic from 'next/dynamic';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { headerCategoryMenu } from '@/dataFetching/apiResponseFetching';
import { QUERY_KEYS } from '@/dataFetching/apiResponseQueryKey';
const Store24Index = dynamic(() => import('@/containers/store/store-index-24/store-index'), { ssr: true });

interface IProps {
  categoryMenuResponse: GetCategoryMenu_ResponseType[];
}

const Index: NextPage<IProps> = () => {
  return (
    <>
      <Head>
        <meta name="description" content="Buy authentic pharmaceutical & wellness products from Online Pharmacy & Medical Store Online or Find a Wevoca Store near you. Call us to order at 021-11-11-38246." />
        <title>TEMP 24/7 Stores — TEMP®</title>
      </Head>
      <Store24Index />
    </>
  );
};

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();
  await Promise.all([queryClient.prefetchQuery([QUERY_KEYS.HEADER_CATEGORY], headerCategoryMenu)]);
  return { props: { dehydratedState: dehydrate(queryClient) } };
};

export default Index;
