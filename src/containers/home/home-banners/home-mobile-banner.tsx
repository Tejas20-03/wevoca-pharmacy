import React, { useRef, useMemo } from 'react';
import style from './home-banners.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useResponsive } from '@/features/responsive';
import Image from 'next/image';
import Link from 'next/link';
import Box from '@mui/material/Box';
import LeftArrowWithBg from '@/components/Global-Icon/Left-arrow-with-bg';
import RightArrowWithBg from '@/components/Global-Icon/right-arrow-with-bg';
import { GetBannersNew_DetailDataType } from '@/services/banners/types';

interface IProps {
  data: GetBannersNew_DetailDataType[];
  handleBannersRoute: (item: GetBannersNew_DetailDataType) => string;
}

const HomeMobileBanner: React.FC<IProps> = ({ data, handleBannersRoute }) => {
  const { isTablet, isMobile } = useResponsive();
  const navigationNextRef = useRef(null);
  const navigationPrevRef = useRef(null);

  // Use useMemo to memoize Swiper configuration
  const swiperConfig = useMemo(() => {
    return {
      navigation: {
        prevEl: navigationPrevRef.current,
        nextEl: navigationNextRef.current,
      },
      loop: true,
      centeredSlides: true,
      initialSlide: 0,
      slidesPerView: 1.15,
      spaceBetween: isMobile ? 12 : isTablet ? 18 : 20,
      modules: [Pagination, Autoplay, Navigation],
      pagination: {
        clickable: true,
        bulletActiveClass: style.activeBullet,
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: true,
      },
    };
  }, [isMobile, isTablet]);

  return (
    <div className={`${style.swiperContainer} ${style.swiperContainerMobile}`}>
      <Box className={style.titleWrapper}>
        <div className={style.btnGroup}>
          <button className={`swiper-button`} ref={navigationPrevRef}>
            <LeftArrowWithBg color="var(--text-color)" />
          </button>
          <button className={`swiper-button`} ref={navigationNextRef}>
            <RightArrowWithBg color="var(--text-color)" />
          </button>
        </div>
      </Box>
      <Swiper
        onInit={(swiper) => {
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        className={style.container}
        {...swiperConfig} // Spread the swiperConfig object
      >
        {data.map((item, index) => (
          <SwiperSlide className={`${style.slide} banner_${index}`} virtualIndex={index} key={index}>
            <Link prefetch={false} href={handleBannersRoute(item)} style={{ position: 'relative', height: '100%', display: 'block' }}>
              <Image
                fill
                sizes="(min-width: 575px) 485px, (min-width: 520px) 420px, (min-width: 440px) 350px, 320px"
                quality={50}
                src={item.BannerImageNew}
                alt={item.Text}
                onClick={() => handleBannersRoute(item)}
                priority={true}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeMobileBanner;
