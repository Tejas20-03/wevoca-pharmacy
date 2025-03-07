import BoxTitle from "@/components/BoxTitle/Box-title";
import BreadCrumb from "@/components/Bread-crumb/BreadCrumb";
import PageWithBanner from "@/components/page-banner/page-with-banner";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import styles from "./blog-detail-index.module.scss";
import { blogDetailData } from "@/services/blogs/types";
import SectionLoader from "@/components/Section-loader/section-loader";
import { useLanguage } from "@/language-context/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { GetTranslatedData } from "@/services/footer/services";
import Cookies from "js-cookie";

interface IProps {
  blogDetail: blogDetailData[];
}

const BlogDetailIndex: React.FC<IProps> = ({ blogDetail }) => {
  const { language } = useLanguage();

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
    <PageWithBanner removeSideSpacing={styles.pageSpacing}>
      {blogDetail?.length ? (
        blogDetail.map((item, index) => (
          <>
            <BreadCrumb
              secondLink={`/blogs`}
              secondTitle={getText("Blogs")}
              FourthLink={blogDetail[0].Title}
              classes="deal-breadcrumb"
            />
            <Box key={index} className={styles.blogDetailWrapper}>
              <Box className={styles.bannerImg}>
                {item.ImageURL?.length > 0 ? (
                  <Image src={item.ImageURL} alt="banner Image" fill />
                ) : (
                  <Image
                    // src={"/assets/dvago-logo.svg"}
                    src={"/assets/favicon.png"}
                    alt="banner Image"
                    fill
                  />
                )}
              </Box>
              <Box>
                <BoxTitle
                  classes={styles.headingSpace}
                  boxTitle={item.Title}
                  tag={"h1"}
                />
                <div className={styles.contentPara}>
                  <Typography
                    variant="body2"
                    component="div"
                    dangerouslySetInnerHTML={{ __html: `${item.Content}` }}
                  ></Typography>
                </div>
              </Box>
            </Box>
          </>
        ))
      ) : (
        <SectionLoader />
      )}
    </PageWithBanner>
  );
};

export default BlogDetailIndex;
