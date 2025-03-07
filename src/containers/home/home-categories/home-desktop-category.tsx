import React, { useRef } from "react";
import style from "./home-categories.module.scss";
import { GetBannersNew_DetailDataType } from "@/services/banners/types";
import Image from "next/image";
import { handleBannersRoute } from "@/containers/home/home-banners/home-banners";
import { Box, Container } from "@mui/material";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import LeftArrowWithBg from "@/components/Global-Icon/Left-arrow-with-bg";
import RightArrowWithBg from "@/components/Global-Icon/right-arrow-with-bg";
import dynamic from "next/dynamic";
import { useLanguage } from "@/language-context/LanguageContext";

const HomeSectionTitle = dynamic(
  () => import("@/containers/home/common/home-section-title/home-section-title")
);

interface IProps {
  sectionTitle: string;
  data: GetBannersNew_DetailDataType[];
}

const HomeDesktopCategory: React.FC<IProps> = ({ sectionTitle, data }) => {
  const navigationNextRef = useRef(null);
  const navigationPrevRef = useRef(null);
  const { language } = useLanguage();

  return (
    <Container className={style.mainContainer}>
      <Box className={style.titleWrapper}>
        <HomeSectionTitle title={sectionTitle} color="var(--text-color)" />
        <div className={style.btnGroup}>
          <button className={`swiper-button`} ref={navigationPrevRef}>
            <LeftArrowWithBg />
          </button>
          <button className={`swiper-button`} ref={navigationNextRef}>
            <RightArrowWithBg />
          </button>
        </div>
      </Box>
      <Swiper
        navigation
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = navigationPrevRef.current;
          swiper.params.navigation.nextEl = navigationNextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        className={style.productSwiper}
        slidesPerView={5}
        spaceBetween={10}
        modules={[Navigation, Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          320: {
            slidesPerView: 2.4,
            spaceBetween: 10,
          },
          575: {
            slidesPerView: 2.8,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 3.2,
            spaceBetween: 10,
          },
          767: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          820: {
            slidesPerView: 5,
            spaceBetween: 15,
          },
          993: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
          1199: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
      >
        {data.map((item, index) => (
          <SwiperSlide
            className={style.slide}
            virtualIndex={index}
            key={`product_${index}`}
          >
            <div key={item.ID} className={style.gridItemWrapper}>
              <Link href={handleBannersRoute(item)}></Link>
              <div className={style.gridItem}>
                <div className={style.gridItemImageContainer}>
                  <Image
                    priority={true}
                    fill
                    className={style.gridItemImage}
                    src={item.BannerImageNew}
                    alt={item.Text}
                    sizes="(min-width: 1000px) 158px, (min-width: 580px) calc(-1.6vw + 158px), (min-width: 560px) 120px, calc(120px)"
                  />
                </div>
                <h3 className={style.gridItemText}>
                  {language === "en" ? item.Text : item.TitleArabic}
                </h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default HomeDesktopCategory;
