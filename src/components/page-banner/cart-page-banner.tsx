import React from 'react';
import Style from './page-banner.module.scss';
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination } from "swiper/modules";
import BannerImage from '@/components/Banner-image/Banner-image';
import "swiper/css";
import "swiper/css/pagination";
import { useResponsive } from '@/features/responsive';
import { BannerResponseData } from '@/services/checkout/types';

interface IProps {

    BannarUrl: BannerResponseData[] | undefined;

}

const CartPageBanner: React.FC<IProps> = ({ BannarUrl }) => {
    const { isTablet, isMobile } = useResponsive();
    return (
        <>
            {BannarUrl &&
                <div className={Style.BannerContainer}>
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        loop={BannarUrl?.length > 1 ? true : false}
                        centeredSlides
                        initialSlide={2}
                        slidesPerView={1.15}
                        spaceBetween={isMobile ? 12 : isTablet ? 18 : 20}
                        pagination={{ clickable: true, bulletActiveClass: Style.activeBullet }}
                        autoplay={{ delay: 3000, disableOnInteraction: true }}
                    >
                        {BannarUrl.map((url, index: number) =>
                            <SwiperSlide key={index}>

                                <BannerImage className={Style.SwiperSlideImg} src={url.ImageURL} alt={`Banner Image ${index}`} type={''} slug={''} />
                            </SwiperSlide>
                        )}
                    </Swiper>
                </div>
            }
        </>
    );
};

export default CartPageBanner;
