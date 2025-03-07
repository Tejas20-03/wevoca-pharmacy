import React, { useMemo } from 'react';
import { GetBannersNew_DetailDataType } from '@/services/banners/types';
import 'swiper/css';
import 'swiper/css/pagination';
import { ATOZ_PAGE_URL, BRAND_PAGE_URL, COLLECTIONS_PAGE_URL, COLLECTION_PAGE_URL, PRODUCT_PAGE_URL } from '@/Constants/constants';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/dataFetching/apiResponseQueryKey';
import { homeBanner, homeBannerMobile } from '@/dataFetching/apiResponseFetching';
import { useAppSelector } from '@/hooks/use-app-selector';
import Cookies from 'js-cookie';
import HomeDesktopBanner from './home-desktop-banner';
import HomeMobileBanner from './home-mobile-banner';

interface IProps {}
export const handleBannersRoute = (item: GetBannersNew_DetailDataType) => {
  switch (item.Type) {
    case 'screen':
      return '#';
    case 'product':
      return PRODUCT_PAGE_URL(item.Slug);
    case 'atozmedicine':
      return ATOZ_PAGE_URL('A');
    case 'collection':
      return COLLECTION_PAGE_URL(item.Slug);
    case 'category':
      return COLLECTIONS_PAGE_URL(item.Slug);
    case 'brand':
      return BRAND_PAGE_URL(item.Slug);
    default:
      return '#';
  }
};

const HomeBanners: React.FC<IProps> = () => {
  const { selectedStoreID } = useAppSelector((state) => state.store);
  const getBranchCode = Cookies.get('branchCode');
  const branchCode = getBranchCode?.toString() || selectedStoreID?.toString() || '32';
  const { data: banner, error: bannerError, isLoading: bannerLoader } = useQuery({ queryKey: [QUERY_KEYS.BANNER], queryFn: () => homeBanner(branchCode), staleTime: 600000 });
  const { data: bannerMobile, error: bannerMobileError, isLoading: bannerMobileLoader } = useQuery({ queryKey: [QUERY_KEYS.BANNER_MOBILE], queryFn: () => homeBannerMobile(branchCode), staleTime: 600000 });

  const bannerDesktopData = useMemo<GetBannersNew_DetailDataType[]>(() => (banner && banner?.Detail?.length > 0 ? banner?.Detail : []), [banner]);
  const bannerMobileData = useMemo<GetBannersNew_DetailDataType[]>(() => (bannerMobile && bannerMobile?.Detail?.length > 0 ? bannerMobile?.Detail : []), [bannerMobile]);
  return (
    <>
      {bannerError ? '' : bannerLoader ? '' : <HomeDesktopBanner data={bannerDesktopData} handleBannersRoute={handleBannersRoute} />}
      {bannerMobileError ? '' : bannerMobileLoader ? '' : <HomeMobileBanner data={bannerMobileData} handleBannersRoute={handleBannersRoute} />}
    </>
  );
};

export default HomeBanners;
