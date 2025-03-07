import { NextPage } from 'next';
import wrapper from '@/redux/store';
import { BASE_URL_DVAGO_API } from '@/services/config';
import axios from 'axios';
import SectionLoader from '@/components/Section-loader/section-loader';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/dataFetching/apiResponseQueryKey';
import { checkTypeBySlug, headerCategoryMenu } from '@/dataFetching/apiResponseFetching';
const CollectionIndex = dynamic(() => import('@/containers/Collection/collection-index'), { ssr: true });
import AddressInput from '@/components/Address/Address-bar-container';
import { productsPerPage } from '@/Constants/constants';

interface IProps {}

const Collections: NextPage<IProps> = ({ item, slug }) => {
  const router = useRouter();
  useEffect(() => {
    const { collection } = router.query;
    if (collection) {
      setTimeout(() => {
        if (item === undefined) {
          router.reload();
        }
      }, 500);
    }
  }, [router.asPath, item]);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    if (value === 1) {
      router.push({
        pathname: router.pathname,
        query: { brands: router.query?.brands },
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
      <AddressInput mobile={true} />
      {slug ? <CollectionIndex item={item} fetchingType={'collection'} slug={slug} isSubCategory={true} handleChange={handleChange} /> : <SectionLoader />}
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ res, req, params, query }) => {
  const slug = params !== undefined && params.collection;
  const encodedSlug = slug?.includes('&') ? encodeURIComponent(slug) : slug;
  const slugPageNumber = query !== undefined && query.page;
  const slugWithoutSpaces = slug ? slug.toString().replace(/\s/g, '') : '';
  if (Number(slugPageNumber) === 1) {
    const redirectTo = req?.url.replace(/\?page=1$/, '');
    res.setHeader('Location', redirectTo);
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }
  const { selectedStoreCode } = store.getState().store;
  const branchCode = req.cookies.branchCode;
  const headersInfo = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const [getData] = await Promise.all([axios.get(`${BASE_URL_DVAGO_API}/AppAPIV3/GetProductBannersBySlugV1&Slug=${slug}&BranchCode=${branchCode || selectedStoreCode || ''}&ProductID=''`, headersInfo)]);
  const item = getData.data;
  const catRedirectData = await checkTypeBySlug(slugWithoutSpaces);
  if (catRedirectData.ResponseType === 1) {
    if (slugWithoutSpaces !== catRedirectData?.Data?.Slug) {
      if (catRedirectData?.Data.Type === 'Collection') {
        res.setHeader('Location', `${catRedirectData?.Data?.Slug}`);
        res.statusCode = 302;
        res.end();
        return null; // Return null to indicate a redirect
      }
    }
  }

  const queryClient = new QueryClient();
  await Promise.all([queryClient.prefetchQuery([QUERY_KEYS.HEADER_CATEGORY], headerCategoryMenu)]);
  return { props: { item, slug, dehydratedState: dehydrate(queryClient) } };
});

export default Collections;
