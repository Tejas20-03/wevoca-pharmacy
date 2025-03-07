import { NextPage } from 'next';
import SectionLoader from '@/components/Section-loader/section-loader';
import Head from 'next/head';
import wrapper from '@/redux/store';
import { useRouter } from 'next/router';
import { productsPerPage } from '@/Constants/constants';
import CollectionIndex from '@/containers/Collection/collection-index';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/dataFetching/apiResponseQueryKey';
import { getAlphabetCategory, headerCategoryMenu } from '@/dataFetching/apiResponseFetching';
import { useAppSelector } from '@/hooks/use-app-selector';
import Cookies from 'js-cookie';

interface IProps {
  slug: string;
  slugPageNumber: number;
}
const Collections: NextPage<IProps> = ({ slug, slugPageNumber }) => {
  const { selectedStoreID } = useAppSelector((state) => state.store);
  const getBranchCode = Cookies.get('branchCode');
  const branchCode = getBranchCode?.toString() || selectedStoreID?.toString() || '32';
  const { data: fetchData } = useQuery({ queryKey: [QUERY_KEYS.ALPHABETS_CATEGORY], queryFn: async () => await getAlphabetCategory(slug, [`${Number(slugPageNumber) === 1 ? 0 : (Number(slugPageNumber) - 1) * productsPerPage},16`], branchCode), staleTime: 600000 });
  const router = useRouter();
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    if (value === 1) {
      router.push({
        pathname: router.pathname,
        query: { alphabet: router.query?.alphabet },
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
        <meta name="description" content="WeVoca brings you an easy-to-use A to Z Medicine directory where you can find and buy medicines based on the alphabet you select. Our online store offers a wide range of authentic medicines at the best prices in Pakistan. With our fast and reliable delivery service, you can get your order delivered straight to your doorstep. WeVoca is your one-stop-shop for all your medication needs. Order now and experience the convenience of online medicine shopping with DVAGO." />
        <title>A to Z Medicines in Country - Buy Online at Best Prices -TEMP®</title>
      </Head>
      <div style={{ marginBottom: '7.5rem' }}>{slug ? <CollectionIndex item={fetchData} fetchingType={'atozmedicine'} slug={slug} isSubCategory={true} handleChange={handleChange} /> : <SectionLoader />}</div>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, params, query }) => {
  const queryClient = new QueryClient();
  const { selectedStoreID } = store.getState().store;
  const branchCode = req.cookies.branchCode?.toString() || selectedStoreID?.toString() || '32';
  const slug = params !== undefined ? params.alphabet : undefined;
  const slugPageNumber = query !== undefined && Number(query.page);
  const slugPage = slugPageNumber === undefined ? 0 : isNaN(slugPageNumber) ? 0 : Number(slugPageNumber) === 1 ? 0 : (Number(slugPageNumber) - 1) * productsPerPage;
  await Promise.all([queryClient.prefetchQuery([QUERY_KEYS.ALPHABETS_CATEGORY], () => getAlphabetCategory(slug, [slugPage, '16'], branchCode)), queryClient.prefetchQuery([QUERY_KEYS.HEADER_CATEGORY], headerCategoryMenu)]);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      slug,
      slugPageNumber,
    },
  };
});

export default Collections;
