import { Box, Container } from "@mui/material";
import React from "react";
import style from "./home-blog.module.scss";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/dataFetching/apiResponseQueryKey";
import { homeBlogs } from "@/dataFetching/apiResponseFetching";
import SectionLoader from "@/components/Section-loader/section-loader";
import { GetTranslatedData } from "@/services/footer/services";
import { useLanguage } from "@/language-context/LanguageContext";
import Cookies from "js-cookie";

const BlogCardIndex = dynamic(
  () => import("@/components/blog/blog-card/blog-card-item")
);
const HomeSectionTitle = dynamic(
  () => import("@/containers/home/common/home-section-title/home-section-title")
);

const HomeBlogs: React.FC = () => {
  const { language } = useLanguage();

  const {
    data: HomeBlogResponseData,
    isLoading: HomeBlogResponseLoading,
    error: HomeBlogResponseError,
  } = useQuery({
    queryKey: [QUERY_KEYS.HOME_BLOG],
    queryFn: homeBlogs,
    staleTime: 600000,
  });

  const { data: translatedData } = useQuery(
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
      staleTime: 600000,
    }
  );

  const getText = (value: string) => {
    const translatedItems = translatedData?.Data || [];
    const item = translatedItems.find((item: any) => item.Value === value);
    return language === "ar" ? item?.Arabic : item?.English;
  };

  return (
    <Container className={style.mainContainer}>
      <Box className={style.titleContainer}>
        <HomeSectionTitle
          color="var(--text-color)"
          title={getText("Blogs")}
        />
        <Link className={`btn btn-primary ${style.viewAllBtn}`} href={`/blogs`}>
          {getText("View-All")}
        </Link>
      </Box>
      <ul className={style.grid}>
        {HomeBlogResponseData?.length > 0 ? (
          HomeBlogResponseData.map((data, index) => (
            <BlogCardIndex
              className={style.grid_item}
              data={data}
              key={index}
            />
          ))
        ) : HomeBlogResponseLoading ? (
          <SectionLoader />
        ) : HomeBlogResponseError ? (
          ""
        ) : null}
      </ul>
    </Container>
  );
};

export default HomeBlogs;
