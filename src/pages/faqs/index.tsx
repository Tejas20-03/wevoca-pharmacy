
import Head from 'next/head';
import React from 'react';
import dynamic from 'next/dynamic';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/dataFetching/apiResponseQueryKey';
import { headerCategoryMenu } from '@/dataFetching/apiResponseFetching';
const FaqIndex = dynamic(() => import('@/containers/faqs/faq-index/faq-index'), { ssr: true });

const Index: React.FC = () => {
  return (
    <>
      <Head>
        <meta name="description" content="About What is WeVoca? WeVoca Pharmacy &amp; Wellness Experts is a modern pharmacy concept where medicine is sold following the best international standards. Here, we ensure that everything our customers buy is 100% authentic. We consider medicine handling a very crucial factor for human lives so all the medicine is trans" />
        <title>FAQs — TEMP®</title>
      </Head>
      <FaqIndex />
    </>
  );
};

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();
  await Promise.all([queryClient.prefetchQuery([QUERY_KEYS.HEADER_CATEGORY], headerCategoryMenu)]);
  return { props: { dehydratedState: dehydrate(queryClient) } };
};

export default Index;
