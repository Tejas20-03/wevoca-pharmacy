
import { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/dataFetching/apiResponseQueryKey';
import { headerCategoryMenu } from '@/dataFetching/apiResponseFetching';
const CartIndex = dynamic(() => import('@/containers/cart/cart-index/Cart-index'), { ssr: true });

const Cart: NextPage = () => {
  return (
    <>
      <Head>
        <meta name="description" content="Buy authentic pharmaceutical &amp; wellness products from Online Pharmacy &amp; Medical Store Online or Find a Wevoca Store near you. Call us to order at 021-11-11-38246." />
        <title>Your Shopping Cart — TEMP®</title>
      </Head>
      <CartIndex />
    </>
  );
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await Promise.all([queryClient.prefetchQuery([QUERY_KEYS.HEADER_CATEGORY], headerCategoryMenu)]);
  return { props: { dehydratedState: dehydrate(queryClient) } };
}

export default Cart;
