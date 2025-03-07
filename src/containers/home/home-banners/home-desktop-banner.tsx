import React, { useRef } from 'react';
import style from './home-banners.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useResponsive } from '@/features/responsive';
import Image from 'next/image';
import Link from 'next/link';
import { Box } from '@mui/material';
import LeftArrowWithBg from '@/components/Global-Icon/Left-arrow-with-bg';
import RightArrowWithBg from '@/components/Global-Icon/right-arrow-with-bg';
import { GetBannersNew_DetailDataType } from '@/services/banners/types';

interface IProps {
    data: GetBannersNew_DetailDataType[];
    handleBannersRoute: (item: GetBannersNew_DetailDataType) => string;
}
const HomeDesktopBanner: React.FC<IProps> = ({ data, handleBannersRoute }) => {
  const { isTablet, isMobile } = useResponsive();
  const navigationNextRef = useRef(null);
  const navigationPrevRef = useRef(null);
  return (
    <div className={`${style.swiperContainer} ${style.swiperContainerDesktop}`}>
      <Box className={style.titleWrapper}>
        <div className={style.btnGroup}>
          <button className={`swiper-button`} ref={navigationPrevRef}>
            <LeftArrowWithBg color="var(--primary-color)" />
          </button>
          <button className={`swiper-button`} ref={navigationNextRef}>
            <RightArrowWithBg color="var(--primary-color)" />
          </button>
        </div>
      </Box>
      <Swiper
        onInit={(swiper) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line no-param-reassign
          swiper.params.navigation.prevEl = navigationPrevRef.current;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line no-param-reassign
          swiper.params.navigation.nextEl = navigationNextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        className={style.container}
        loop
        centeredSlides
        initialSlide={0}
        slidesPerView={1.15}
        spaceBetween={isMobile ? 12 : isTablet ? 18 : 20}
        modules={[Pagination, Autoplay, Navigation]}
        pagination={{ clickable: true, bulletActiveClass: style.activeBullet }}
        autoplay={{ delay: 2500, disableOnInteraction: true }}
      >
        {data.map((item, index) => (
          <SwiperSlide className={`${style.slide} banner_${index}`} virtualIndex={index} key={index}>
            <Link prefetch={false} href={handleBannersRoute(item)} style={{ position: 'relative', width: '100%', height: '100%', display: 'block' }}>
              <Image sizes="(min-width: 2280px) 1920px, (min-width: 2060px) 1772px, (min-width: 1920px) 1650px, (min-width: 1720px) 1477px, (min-width: 1460px) 1250px, (min-width: 1220px) 1042px, (min-width: 960px) 820px, (min-width: 760px) 640px, (min-width: 600px) 550px, 550px" quality={50} fill src={item.BannerImageNew} alt={`banner_${item.Text}`} onClick={() => handleBannersRoute(item)} priority={true} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeDesktopBanner;
