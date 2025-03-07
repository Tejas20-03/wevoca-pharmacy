import React from "react";
import styles from "./categories-index.module.scss";
import BaseLayout from "@/layouts/base-layout/base-layout";
import { Container } from "@mui/material";
import Head from "next/head";
import BreadCrumb from "@/components/Bread-crumb/BreadCrumb";
import CategoriesData from "@/containers/categories-menu/categories-data/categories-data";
import { GetCategoryMenu_ResponseType } from "@/services/categories/types";
import { useLanguage } from "@/language-context/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { GetTranslatedData } from "@/services/footer/services";
import Cookies from "js-cookie";

interface IProps {
  data: GetCategoryMenu_ResponseType[];
}

const CategoriesIndex: React.FC<IProps> = ({ data }) => {
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
    <>
      <Head>
        <meta
          name="description"
          content="Discover the best deals on authentic pharmaceutical and wellness products at Wevoca Online Pharmacy. Our online medical store offers unbeatable prices on a range of products, including medicines, supplements, personal care items, and more. Shop now and save big!"
        />
        {/* <title>Best Deals on Authentic Pharmaceutical & Wellness Products - DVAGO®</title> */}
        <title>
          Best Deals on Authentic Pharmaceutical & Wellness Products - TEMP®
        </title>
      </Head>
      <BaseLayout classes={styles.dealsLayout}>
        <Container>
          <BreadCrumb
            FourthLink={getText("Categories")}
            classes="deal-breadcrumb"
          />
          <CategoriesData categoriesMenu={data} />
        </Container>
      </BaseLayout>
    </>
  );
};

export default CategoriesIndex;
