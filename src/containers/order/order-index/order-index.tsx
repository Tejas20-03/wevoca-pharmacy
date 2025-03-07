import BreadCrumb from "@/components/Bread-crumb/BreadCrumb";
import PageWithBanner from "@/components/page-banner/page-with-banner";
import React from "react";
import OrderTabs from "@/containers/order/order-tabs/order-tabs";
import { useLanguage } from "@/language-context/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { GetTranslatedData } from "@/services/footer/services";
import Cookies from "js-cookie";
// import style from './order-index.module.scss';

interface IProps {}

const OrderIndex: React.FC<IProps> = () => {
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
    <PageWithBanner>
      <BreadCrumb FourthLink={getText("My-Orders")} classes="deal-breadcrumb" />
      <OrderTabs />
    </PageWithBanner>
  );
};

export default OrderIndex;
