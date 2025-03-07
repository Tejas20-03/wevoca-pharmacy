import SectionLoader from '@/components/Section-loader/section-loader';

import wrapper from '@/redux/store';
import { postSearchProductByJSON } from '@/services/search/services';
import { GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { productsPerPage } from '@/Constants/constants';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/dataFetching/apiResponseQueryKey';
import { headerCategoryMenu } from '@/dataFetching/apiResponseFetching';
import { SearchProductByJSON_ResponseType } from '@/services/search/types';
const CollectionIndex = dynamic(() => import('@/containers/Collection/collection-index'), { ssr: true });

interface IProps {
  item?: SearchProductByJSON_ResponseType;
  slug: string;
}
const Index: NextPage<IProps> = ({ item, slug }) => {
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    if (value === 1) {
      router.push({
        pathname: router.pathname,
        query: { search: router.query?.search },
      });
    } else {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, page: value },
      });
    }
  };
  return (
    <>
      <Head>
        <meta name="description" content="Search for a wide range of pharmaceutical and wellness products online at WeVoca. Browse through our categories and find the product you need. Enjoy fast delivery and quality customer service. Start your search now." />
        <title>Search for Products Online - TEMP®</title>
      </Head>

      <div style={{ marginBottom: '5.5rem' }}>{slug ? <CollectionIndex item={item} fetchingType={'search'} slug={slug} handleChange={handleChange} /> : <SectionLoader />}</div>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context: GetServerSidePropsContext) => {
  const slug = context !== undefined && context.query.search;
  const slugPageNumber = context.query.page !== undefined && context.query.page;
   // Redirect logic
   if (Number(slugPageNumber) === 1) {
    const redirectTo = context.req.url.replace(/\&page=1$/, '');
    context.res.setHeader('Location', redirectTo);
    context.res.statusCode = 302;
    context.res.end();
    return { props: {} };
  }

  const { selectedStoreCode } = store.getState().store;
  const branchItem = context.req.cookies.branchCode;
  const limitStr = `${slugPageNumber === undefined || slugPageNumber === false ? 0 : Number(slugPageNumber) === 1 ? 0 : (Number(slugPageNumber) - 1) * productsPerPage},16`;

  const item = await postSearchProductByJSON({ ProductName: slug?.toString(), BranchCode: branchItem || selectedStoreCode, limit: limitStr, Type: '', Name: '' }, { token: '' });
  const queryClient = new QueryClient();
  await Promise.all([queryClient.prefetchQuery([QUERY_KEYS.HEADER_CATEGORY], headerCategoryMenu)]);
  return { props: { item, slug, dehydratedState: dehydrate(queryClient) } };
});

export default Index;
