import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/dataFetching/apiResponseQueryKey';
import { headerCategoryMenu } from '@/dataFetching/apiResponseFetching';
const OrderIndex = dynamic(() => import('@/containers/order/order-index/order-index'), {ssr: true});


const Index: NextPage = () => {
  return (
    <>
      <Head>
        <meta name="description" content="View your order history and track your orders on WeVoca®. Check the status of your pending, completed, or cancelled orders. For any assistance, call us at 021-11-11-38246 or email us at support@WeVoca.com. Buy authentic pharmaceutical and wellness products from the best online pharmacy in Pakistan." />
        <title>My Orders - Order History on Premier Online Pharmacy - TEMP®</title>
      </Head>
      <OrderIndex />
    </>
  );
};

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();
  await Promise.all([queryClient.prefetchQuery([QUERY_KEYS.HEADER_CATEGORY], headerCategoryMenu)]);
  return { props: { dehydratedState: dehydrate(queryClient) } };
};

export default Index;
