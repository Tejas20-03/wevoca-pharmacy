import { NextPage } from 'next';
import SectionLoader from '@/components/Section-loader/section-loader';
import wrapper from '@/redux/store';
import { BASE_URL_DVAGO_API } from '@/services/config';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { productsPerPage } from '@/Constants/constants';
import dynamic from 'next/dynamic';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/dataFetching/apiResponseQueryKey';
import { headerCategoryMenu } from '@/dataFetching/apiResponseFetching';
const CollectionIndex = dynamic(() => import('@/containers/Collection/collection-index'), { ssr: true });
import AddressInput from '@/components/Address/Address-bar-container';
import mixpanel from 'mixpanel-browser';
import { useAppSelector } from '@/hooks/use-app-selector';
import * as gtag from '@/utils/googleEvents';

interface IProps {}

const Collection: NextPage<IProps> = ({ item, slug }) => {
  const storeData = useAppSelector((state) => state.store);
  console.log(storeData?.selectedStoreID || '32')
  if (item?.CategoryHierarchy?.[item?.CategoryHierarchy?.length - 1]?.ParentID === '0') {
    gtag.event({
      action: 'category_viewed',
      params: {
        category_name: item?.CollectionName,
        item_count: item?.RecordsCount,
        event_source: 'Web',
        store_id: storeData?.selectedStoreID?.toString() || '32',
        category_id: item?.CategoryHierarchy?.[0]?.ID,
      },
    });
    // mixpanel.track('category_viewed', {
    //   category_name: item?.CollectionName,
    //   item_count: item?.RecordsCount,
    //   category_id: item?.CategoryHierarchy?.[0]?.ID,
    //   event_source: 'Web',
    //   store_id: storeData?.selectedStoreID?.toString() || '32',
    // });
    if (typeof window !== 'undefined') {
      // window?.webengage?.track('category_viewed', {
      //   category_name: item?.CollectionName,
      //   item_count: item?.RecordsCount,
      //   category_id: item?.CategoryHierarchy?.[0]?.ID,
      //   event_source: 'Web',
      //   store_id: storeData?.selectedStoreID?.toString() || '32',
      // });
    }
  } else {
    // mixpanel.track('sub_category_viewed', {
    //   category_name: item?.CollectionName,
    //   item_count: item?.RecordsCount,
    //   category_id: item?.CategoryHierarchy?.[item?.CategoryHierarchy?.length - 1]?.ID,
    //   event_source: 'Web',
    //   store_id: storeData?.selectedStoreID?.toString() || '32',
    // });
    if (typeof window !== 'undefined') {
      // window?.webengage?.track('sub_category_viewed', {
      //   category_name: item?.CollectionName,
      //   item_count: item?.RecordsCount,
      //   category_id: item?.CategoryHierarchy?.[item?.CategoryHierarchy?.length - 1]?.ID,
      //   event_source: 'Web',
      //   store_id: storeData?.selectedStoreID?.toString() || '32',
      // });
    }
  }
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
        query: { collection: router.query?.collection },
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
      <div style={{ marginTop: '1.5rem', marginBottom: '5.5rem' }}>{slug ? <CollectionIndex item={item} fetchingType={'category'} slug={slug} isSubCategory={true} handleChange={handleChange} /> : <SectionLoader />}</div>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ res, req, params, query }) => {
  const slug = params !== undefined && params.collection;
  const slugPageNumber = query !== undefined && query.page;
  if (Number(slugPageNumber) === 1) {
    // Remove the query parameter from req.url
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
  const [getData] = await Promise.all([axios.get(`${BASE_URL_DVAGO_API}/AppAPIV3/GetProductByCategorySlugV2&CategorySlug=${slug}&limit=${slugPageNumber === undefined ? 0 : Number(slugPageNumber) === 1 ? 0 : (Number(slugPageNumber) - 1) * productsPerPage},16&BranchCode=${branchCode || selectedStoreCode}`, headersInfo)]);
  const item = getData.data;
  const queryClient = new QueryClient();
  await Promise.all([queryClient.prefetchQuery([QUERY_KEYS.HEADER_CATEGORY], headerCategoryMenu)]);
  return { props: { item, slug, dehydratedState: dehydrate(queryClient) } };
});

export default Collection;
