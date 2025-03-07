
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import dynamic from 'next/dynamic';
import { QUERY_KEYS } from '@/dataFetching/apiResponseQueryKey';
import { headerCategoryMenu } from '@/dataFetching/apiResponseFetching';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import AccountPageLoader from '@/components/skeleton/account/account-page-loader';
const AccountIndex = dynamic(() => import('@/containers/account/account-index/account-index'), { ssr: false, loading: () => <AccountPageLoader /> });

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <meta name="description" content="Buy authentic pharmaceutical &amp; wellness products from Online Pharmacy &amp; Medical Store Online or Find a Wevoca Store near you. Call us to order at 021-11-11-38246." />
        <title>Account — TEMP®</title>
      </Head>

      <AccountIndex />
    </>
  );
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await Promise.all([queryClient.prefetchQuery([QUERY_KEYS.HEADER_CATEGORY], headerCategoryMenu)]);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Index;
