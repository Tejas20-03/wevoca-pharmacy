import React, { useMemo } from "react";
import style from "./home-categories.module.scss";
import { GetBannersNew_DetailDataType } from "@/services/banners/types";
import { Container } from "@mui/material";
import HomeMobileCategory from "./home-mobile-category";
import HomeDesktopCategory from "./home-desktop-category";
import Cookies from "js-cookie";
import { useAppSelector } from "@/hooks/use-app-selector";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/dataFetching/apiResponseQueryKey";
import { homeCategory } from "@/dataFetching/apiResponseFetching";
import HomeCategoryLoader from "@/components/skeleton/home/home-category/home-category-loader";
import { useLanguage } from "@/language-context/LanguageContext";

interface IProps {}

const HomeCategories: React.FC<IProps> = () => {
  const { selectedStoreID } = useAppSelector((state) => state.store);
  const getBranchCode = Cookies.get("branchCode");
  const { language } = useLanguage();
  const branchCode =
    getBranchCode?.toString() || selectedStoreID?.toString() || "32";
  const {
    data: homeCategoryData,
    error: homeCategoryError,
    isLoading: homeCategoryLoader,
  } = useQuery({
    queryKey: [QUERY_KEYS.HOME_CATEGORY],
    queryFn: () => homeCategory(branchCode),
    staleTime: 600000,
  });
  const sectionTitle = useMemo<string>(
    () =>
      homeCategoryData && homeCategoryData.Description
        ? // ? homeCategoryData.Description
          language === "en"
          ? homeCategoryData.Description
          : homeCategoryData.DescriptionArabic
        : "Product Categories",
    [homeCategoryData, language]
  );
  const data = useMemo<GetBannersNew_DetailDataType[]>(
    () =>
      homeCategoryData && homeCategoryData.Detail
        ? homeCategoryData.Detail
        : [],
    [homeCategoryData]
  );
  return (
    <>
      <div className={style.container} >
        <Container className={style.categoryContainer}>
          {homeCategoryError ? (
            ""
          ) : homeCategoryLoader ? (
            <HomeCategoryLoader />
          ) : homeCategoryData && homeCategoryData.Description ? (
            <>
              {/* Use display none/block in CSS to show/hide based on screen size */}
              <div className={style.mobileView}>
                <HomeMobileCategory sectionTitle={sectionTitle} data={data} />
              </div>
              <div className={style.desktopView}>
                <HomeDesktopCategory sectionTitle={sectionTitle} data={data} />
              </div>
            </>
          ) : (
            ""
          )}
        </Container>
      </div>
    </>
  );
};

export default HomeCategories;
