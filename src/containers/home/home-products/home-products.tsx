import React, { useEffect, useMemo, useRef, useState } from "react";
import style from "./home-products.module.scss";

import {
  GetProductBanners_ResponseType,
  GetProductBanners_TitleTypes,
} from "@/services/product/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import LeftArrowWithBg from "@/components/Global-Icon/Left-arrow-with-bg";
import RightArrowWithBg from "@/components/Global-Icon/right-arrow-with-bg";
import { Container } from "@mui/system";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/dataFetching/apiResponseQueryKey";
import {
  homeTopSellingProduct,
  homeDealsProduct,
  homeFeaturesProduct,
} from "@/dataFetching/apiResponseFetching";
import Cookies from "js-cookie";
import { useAppSelector } from "@/hooks/use-app-selector";
import SectionLoader from "@/components/Section-loader/section-loader";
import { useLanguage } from "@/language-context/LanguageContext";
const HomeSectionTitle = dynamic(
  () => import("@/containers/home/common/home-section-title/home-section-title")
);
const ProductCard = dynamic(
  () => import("@/components/Product/Product-card/ProductCard")
);

interface IProps {
  productBannerType: GetProductBanners_TitleTypes;
}

const HomeProducts: React.FC<IProps> = ({ productBannerType }) => {
  const [apiData, setApiData] = useState<GetProductBanners_ResponseType | null>(null);
  const { selectedStoreID } = useAppSelector((state) => state.store);
  const getBranchCode = Cookies.get("branchCode");
  const { language } = useLanguage();
  const branchCode =
    getBranchCode?.toString() || selectedStoreID?.toString() || "32";
  const { data: topSellingItemData, isLoading: topSellingItemLoading } =
    useQuery({
      queryKey: [QUERY_KEYS.HOME_PRODUCT_1],
      queryFn: () => homeTopSellingProduct(branchCode),
      staleTime: 600000,
    });
  const { data: DealsData, isLoading: DealsDataLoading } = useQuery({
    queryKey: [QUERY_KEYS.HOME_PRODUCT_2],
    queryFn: () => homeDealsProduct(branchCode),
    staleTime: 600000,
  });
  const { data: FeaturesProductData, isLoading: FeaturesProductDataLoading } =
    useQuery({
      queryKey: [QUERY_KEYS.HOME_PRODUCT_3],
      queryFn: () => homeFeaturesProduct(branchCode),
      staleTime: 600000,
    });

  useEffect(() => {
    if (
      topSellingItemData !== undefined &&
      productBannerType === topSellingItemData?.Title
    )
      setApiData(topSellingItemData);
    else if (DealsData !== undefined && productBannerType === DealsData?.Title)
      setApiData(DealsData);
    else if (
      FeaturesProductData !== undefined &&
      productBannerType === FeaturesProductData?.Title
    )
      setApiData(FeaturesProductData);
  }, [topSellingItemData, DealsData, FeaturesProductData]);
  const sectionTitle = useMemo<string>(
    () =>
      apiData && apiData.Description
        ? language === "en"
          ? apiData.Description
          : apiData.DescriptionArabic
        : "Products",
    [apiData, language]
  );
  const navigationNextRef = useRef(null);
  const navigationPrevRef = useRef(null);

  return (
    <>
      <div className={style.container}>
        <Container className={style.mainContainer}>
          <Box className={style.titleWrapper}>
            <HomeSectionTitle
              title={sectionTitle}
              color="var(--primary-color)"
            />
            <div className={style.btnGroup}>
              <button
                className={`swiper-button ${apiData?.Slug}1`}
                ref={navigationPrevRef}
              >
                <LeftArrowWithBg />
              </button>
              <button
                className={`swiper-button ${apiData?.Slug}2`}
                ref={navigationNextRef}
              >
                <RightArrowWithBg />
              </button>
            </div>
          </Box>
          <Swiper
            navigation
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
            className={style.productSwiper}
            slidesPerView={4}
            spaceBetween={25}
            modules={[Navigation]}
            breakpoints={{
              0: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              320: {
                slidesPerView: 2.4,
                spaceBetween: 10,
              },
              576: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              992: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              993: {
                slidesPerView: 4,
                spaceBetween: 25,
              },
            }}
          >
            {/* Top Selling product Items */}
            {productBannerType === "HomePageProductCarouselOne" &&
              (topSellingItemData !== undefined ? (
                topSellingItemData?.Detail?.map((item, index) => (
                  <SwiperSlide
                    className={style.slide}
                    virtualIndex={index}
                    key={`product_${item.ID}`}
                  >
                    <ul className={style.emptyUl}>
                      <ProductCard data={item} className={style.productCard} />
                    </ul>
                  </SwiperSlide>
                ))
              ) : topSellingItemLoading ? (
                <SectionLoader />
              ) : (
                ""
              ))}

            {/* Deals Product Items */}
            {productBannerType === "AppHomePageProductCarouselOne" &&
              (DealsData !== undefined ? (
                DealsData?.Detail?.map((item, index) => (
                  <SwiperSlide
                    className={style.slide}
                    virtualIndex={index}
                    key={`product_${item.ID}`}
                  >
                    <ul className={style.emptyUl}>
                      <ProductCard data={item} className={style.productCard} />
                    </ul>
                  </SwiperSlide>
                ))
              ) : DealsDataLoading ? (
                <SectionLoader />
              ) : (
                ""
              ))}

            {/* Features Product Items */}
            {productBannerType === "AppHomePageProductCarouselTwo" &&
              (FeaturesProductData !== undefined ? (
                FeaturesProductData?.Detail?.map((item, index) => (
                  <SwiperSlide
                    className={style.slide}
                    virtualIndex={index}
                    key={`product_${item.ID}`}
                  >
                    <ul className={style.emptyUl}>
                      <ProductCard data={item} className={style.productCard} />
                    </ul>
                  </SwiperSlide>
                ))
              ) : FeaturesProductDataLoading ? (
                <SectionLoader />
              ) : (
                ""
              ))}
          </Swiper>
        </Container>
      </div>
    </>
  );
};

export default HomeProducts;
