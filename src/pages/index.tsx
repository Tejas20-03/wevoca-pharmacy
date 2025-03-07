import type { NextPage } from "next";
import wrapper from "@/redux/store";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import BaseLayout from "@/layouts/base-layout/base-layout";
import dynamic from "next/dynamic";
import style from "./homeIndex-style.module.scss";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/dataFetching/apiResponseQueryKey";
import {
  headerCategoryMenu,
  homeBanner,
  homeBannerMobile,
  homeBlogs,
  homeBrands,
  homeCategory,
  homeDealsProduct,
  homeFeaturesProduct,
  homeTopSellingProduct,
  newsTickerFn,
} from "@/dataFetching/apiResponseFetching";
import HomeBannerLoader from "@/components/skeleton/home/home-banner/home-banner-loader";
import HomeCategoryLoader from "@/components/skeleton/home/home-category/home-category-loader";
import HomeBlogsLoader from "@/components/skeleton/home/home-blogs/home-blog-loader";
import HomwBrandLoader from "@/components/skeleton/home/home-brand/home-brand-loader";
import Ticker from "@/components/ticker/Ticker";
import AddressInput from "@/components/Address/Address-bar-container";
import mixpanel from "mixpanel-browser";
const HomeBanners = dynamic(
  () => import("@/containers/home/home-banners/home-banners"),
  { ssr: true, loading: () => <HomeBannerLoader /> }
);
const HomeCategories = dynamic(
  () => import("@/containers/home/home-categories/home-categories"),
  { ssr: true, loading: () => <HomeCategoryLoader /> }
);
const HomeProducts = dynamic(
  () => import("@/containers/home/home-products/home-products"),
  { ssr: true }
);
const HomeBrands = dynamic(
  () => import("@/containers/home/home-brands/home-brands"),
  { ssr: true, loading: () => <HomwBrandLoader /> }
);
const HomeBlogs = dynamic(
  () => import("@/containers/home/home-blogs/home-blogs"),
  { ssr: true, loading: () => <HomeBlogsLoader /> }
);
const HomeAbout = dynamic(
  () => import("@/containers/home/home-about/home-about"),
  { ssr: false }
);

const Index: NextPage = () => {
  const { width: windowWidth } = useWindowDimensions();
  const { data } = useQuery([QUERY_KEYS.TICKER], async () => newsTickerFn());
  // mixpanel.track('home_screen_viewed')
  if (typeof window !== "undefined") {
    // window?.webengage?.track('home_screen_viewed');
  }

  // console.log("Ticker from the Index",data)
  return (
    <>
      <BaseLayout classes={style.container}>
        <AddressInput mobile={true} />
        {/* {data && <Ticker data={data} />} */}
        <HomeBanners />
        <HomeCategories />
        <HomeProducts productBannerType="HomePageProductCarouselOne" />
        <HomeProducts productBannerType="AppHomePageProductCarouselOne" />
        <HomeProducts productBannerType="AppHomePageProductCarouselTwo" />
        {windowWidth > 767 && <HomeBlogs />}
        <HomeBrands />
        <HomeAbout />
      </BaseLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res }) => {
      // Add whatever `Cache-Control` value you want here
      res.setHeader("Cache-Control", "public, s-maxage=600000");
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            cacheTime: 1000 * 60 * 60 * 24, // 24 hours
            staleTime: 600000,
          },
        },
      });
      const { selectedStoreID } = store.getState().store;
      const branchCode =
        req.cookies.branchCode?.toString() ||
        selectedStoreID?.toString() ||
        "32";

      await Promise.all([
        queryClient.prefetchQuery([QUERY_KEYS.BANNER], () =>
          homeBanner(branchCode)
        ),
        queryClient.prefetchQuery([QUERY_KEYS.BANNER_MOBILE], () =>
          homeBannerMobile(branchCode)
        ),
        queryClient.prefetchQuery([QUERY_KEYS.HOME_CATEGORY], () =>
          homeCategory(branchCode)
        ),
        queryClient.prefetchQuery([QUERY_KEYS.HOME_PRODUCT_1], () =>
          homeTopSellingProduct(branchCode)
        ),
        queryClient.prefetchQuery([QUERY_KEYS.HOME_PRODUCT_2], () =>
          homeDealsProduct(branchCode)
        ),
        queryClient.prefetchQuery([QUERY_KEYS.HOME_PRODUCT_3], () =>
          homeFeaturesProduct(branchCode)
        ),
        queryClient.prefetchQuery([QUERY_KEYS.HOME_BLOG], homeBlogs),
        queryClient.prefetchQuery([QUERY_KEYS.HOME_BRANDS], () =>
          homeBrands(branchCode)
        ),
        queryClient.prefetchQuery(
          [QUERY_KEYS.HEADER_CATEGORY],
          headerCategoryMenu
        ),
        // queryClient.prefetchQuery([QUERY_KEYS.TICKER], newsTickerFn)
      ]);

      return {
        props: {
          dehydratedState: dehydrate(queryClient),
        },
      };
    }
);

export default Index;
