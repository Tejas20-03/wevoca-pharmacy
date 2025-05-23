import React from 'react';
import dynamic from 'next/dynamic';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/dataFetching/apiResponseQueryKey';
import { headerCategoryMenu } from '@/dataFetching/apiResponseFetching';
import Head from 'next/head';
import Script from 'next/script';
const BlogIndex = dynamic(() => import('@/containers/blogs/blog-index/blog-index'), { ssr: true });

const Index: React.FC = () => {
  return (
    <>
      <BlogIndex />
    </>
  );
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await Promise.all([queryClient.prefetchQuery([QUERY_KEYS.HEADER_CATEGORY], headerCategoryMenu)]);
  return { props: { dehydratedState: dehydrate(queryClient) } };
}

export default Index;
