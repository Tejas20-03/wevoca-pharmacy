import React, { useMemo, useState } from "react";
import style from "./home-brands.module.scss";
import {
  GetBannersNew_DetailDataType,
  GetBannersNew_ResponseType,
} from "@/services/banners/types";
import Image from "next/image";
import Link from "next/link";
import { handleBannersRoute } from "@/containers/home/home-banners/home-banners";
import { Box, Container } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/dataFetching/apiResponseQueryKey";
import { homeBrands } from "@/dataFetching/apiResponseFetching";
import { useAppSelector } from "@/hooks/use-app-selector";
import Cookies from "js-cookie";
import SectionLoader from "@/components/Section-loader/section-loader";
import { useLanguage } from "@/language-context/LanguageContext";
import { GetTranslatedData } from "@/services/footer/services";
const HomeSectionTitle = dynamic(
  () => import("@/containers/home/common/home-section-title/home-section-title")
);

const HomeBrands: React.FC = () => {
  const { selectedStoreID } = useAppSelector((state) => state.store);
  const [imageLoaderState, setImageLoading] = useState<boolean>(false);
  const getBranchCode = Cookies.get("branchCode");
  const branchCode =
    getBranchCode?.toString() || selectedStoreID?.toString() || "32";
  const { language } = useLanguage();
  const {
    data: homeBrand,
    isLoading: homeBrandLoading,
    error: homeBrandError,
  } = useQuery({
    queryKey: [QUERY_KEYS.HOME_BRANDS],
    queryFn: () => homeBrands(branchCode),
    staleTime: 600000,
  });
  const data = useMemo<GetBannersNew_DetailDataType[]>(
    () => (homeBrand && homeBrand.Detail ? homeBrand.Detail : []),
    [homeBrand]
  );

  const {
    isLoading,
    error,
    data: translatedData,
    refetch,
  } = useQuery(
    ["complain-form"],
    async () => {
      return await GetTranslatedData({ token: "" });
    },
    {
      retry: (failureCount, error) => {
        const token = Cookies.get("auth-token");
        return !token;
      },
      retryDelay: 0,
      staleTime: 600000, //1 day
    }
  );

  const getText = (value: string) => {
    const translatedItems = translatedData?.Data || [];
    const item = translatedItems.find((item: any) => item.Value === value);
    return language === "ar" ? item?.Arabic : item?.English;
  };

  return (
    <>
      <Container className={style.mainContainer}>
        <Box className={style.titleContainer}>
          <HomeSectionTitle
            color="var(--primary-color)"
            title={
              language === "en"
                ? homeBrand?.Description
                : homeBrand?.DescriptionArabic
            }
            className={` ${style.titleText} secondary-font`}

          />
          <Link
            className={`btn btn-primary ${style.viewAllBtn}`}
            href={`/brands`}
          >
            {getText("View-All")}
          </Link>
        </Box>
        <Swiper
          navigation
          modules={[Autoplay]}
          className={style.productSwiper}
          slidesPerView={4}
          spaceBetween={25}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          breakpoints={{
            0: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            575: {
              slidesPerView: 4,
              spaceBetween: 15,
            },
            767: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
            992: {
              slidesPerView: 6,
              spaceBetween: 15,
            },
            1200: {
              slidesPerView: 6,
              spaceBetween: 25,
            },
          }}
        >
          {homeBrandLoading ? (
            <SectionLoader />
          ) : homeBrandError ? (
            ""
          ) : (
            data.map((item, index) => (
              <SwiperSlide
                id={`Brands=${index}`}
                className={style.slide}
                virtualIndex={index}
                key={index}
              >
                <Link
                  prefetch={false}
                  key={index}
                  className={style.imageContainer}
                  href={handleBannersRoute(item)}
                >
                  <Image
                    sizes="(min-width: 1000px) 144px, (min-width: 780px) 128px, (min-width: 500px) 112px, 80px"
                    fill
                    style={{ objectFit: "contain" }}
                    priority={true}
                    onLoad={() => setImageLoading(true)}
                    src={
                      imageLoaderState
                        ? item.BannerImageNew
                        : "/assets/favicon.png"
                    }
                    alt={item.Text}
                  />
                </Link>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </Container>
    </>
  );
};

export default HomeBrands;
