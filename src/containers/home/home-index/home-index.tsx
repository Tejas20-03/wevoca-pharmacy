import React from 'react';
import BaseLayout from '@/layouts/base-layout/base-layout';
import style from './home-index.module.scss';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import HeaderIndex from '@/containers/header/header-index/header-index';
import dynamic from 'next/dynamic';
import HomeAbout from '@/containers/home/home-about/home-about';
import { GetCategoryMenu_ResponseType } from '@/services/categories/types';
const HomeBanners = dynamic(() => import('@/containers/home/home-banners/home-banners'), { ssr: true });
const HomeCategories = dynamic(() => import('@/containers/home/home-categories/home-categories'), { ssr: true });
const HomeProducts = dynamic(() => import('@/containers/home/home-products/home-products'), { ssr: true });
const HomeBrands = dynamic(() => import('@/containers/home/home-brands/home-brands'), { ssr: true });
const HomeBlogs = dynamic(() => import('@/containers/home/home-blogs/home-blogs'), { ssr: true });

interface IProps {
  categoryMenuResponse: GetCategoryMenu_ResponseType[]
}


const HomeIndex: React.FC<IProps> = ({ categoryMenuResponse }) => {
  const { width: windowWidth } = useWindowDimensions();

  return (
    <>
      <HeaderIndex categoryMenuResponse={categoryMenuResponse} />
      <BaseLayout classes={style.container}>
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

export default HomeIndex;
