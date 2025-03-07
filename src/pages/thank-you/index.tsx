import { NextPage } from 'next';
import Head from 'next/head';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/dataFetching/apiResponseQueryKey';
import { headerCategoryMenu } from '@/dataFetching/apiResponseFetching';
import ThankYouIndex from '@/containers/thank-you/thank-you-index/thank-you-index';
import { useRouter } from 'next/router';
import { getOrderDetail } from '@/services/order/services';
import { GetCustomerTokenInCookiesStorage, GetCustomerTokenInLocalStorage } from '@/functions/local-storage-methods';
import { Box, Container } from '@mui/material';
import BoxTitle from '@/components/BoxTitle/Box-title';
import SectionLoader from '@/components/Section-loader/section-loader';
import style from './index.module.scss'
import { useEffect } from 'react';

const ThankYou: NextPage = () => {
  const { query } = useRouter();

  const { data, error, isLoading, refetch } = useQuery([`${query.orderId}`], async () => {
    const customerToken = await GetCustomerTokenInLocalStorage();
    const customerTokenCookies: string = await GetCustomerTokenInCookiesStorage();
    return await getOrderDetail(query.orderId, { token: customerToken !== null ? customerToken || customerTokenCookies : undefined });
  });
  
  useEffect(() => {
    if(data?.Message) {
      refetch()
    }
  }, [data?.Message])

  return (
    <>
      <Head>
        <meta name="description" content="Buy authentic pharmaceutical &amp; wellness products from Online Pharmacy &amp; Medical Store Online or Find a Wevoca Store near you. Call us to order at 021-11-11-38246." />
        <title>Thank you to shop with — TEMP®</title>
      </Head>
      {isLoading && <SectionLoader />}
      {error && <BoxTitle boxTitle="No Order Found" />}
      {data?.ID ? (
        <ThankYouIndex data={data} />
      ) : (
        <Container>
          <Box className={style.noProduct}>
            <BoxTitle boxTitle={data?.Message} />
          </Box>
        </Container>
      )}
    </>
  );
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await Promise.all([queryClient.prefetchQuery([QUERY_KEYS.HEADER_CATEGORY], headerCategoryMenu)]);
  return { props: { dehydratedState: dehydrate(queryClient) } };
}

export default ThankYou;
