import React, { useMemo } from "react";
import style from "./order-card-container.module.scss";
import OrderCard from "./order-item/order-card";
import useInfiniteOrders, {
  ordersFetchingType,
} from "@/containers/order/use-infinite-orders/use-infinite-orders";

import SectionLoader from "@/components/Section-loader/section-loader";
import InfiniteScroll from "react-infinite-scroll-component";
import BoxTitle from "@/components/BoxTitle/Box-title";
import { Box, Typography } from "@mui/material";
import { useLanguage } from "@/language-context/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { GetTranslatedData } from "@/services/footer/services";
import Cookies from "js-cookie";

interface IProps {
  type: number;
  orderCanceled: boolean;
}

const OrderCardContainer: React.FC<IProps> = ({ type, orderCanceled }) => {
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

  const typeValue: ordersFetchingType = useMemo(() => {
    switch (type) {
      case 0:
        return "all";
      case 1:
        return "pending";
      case 2:
        return "delivered";
      case 3:
        return getText("Cancelled");
      default:
        return "all";
    }
  }, [type, orderCanceled]);
  const { data, canLoadMoreData, handleFetchData, isLoading, onLoading } =
    useInfiniteOrders(orderCanceled, typeValue, 8);
  const orderDetails = data.map((dataitem, index) => (
    <OrderCard data={dataitem} typeValue={typeValue} key={index} />
  ));
  const loader = <SectionLoader />;
  return (
    <>
      {data.length > 0 ? (
        <InfiniteScroll
          dataLength={data.length}
          next={handleFetchData}
          hasMore={true}
          loader={
            !onLoading && canLoadMoreData && isLoading && <SectionLoader />
          }
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {orderDetails}
        </InfiniteScroll>
      ) : onLoading ? (
        loader
      ) : (
        <>
          <Box className={style.noProduct}>
            <BoxTitle boxTitle={getText("No-all-orders-found")} />
            <Typography variant="body2" component="p">
              {/* There are no {typeValue} orders yet! */}
              {getText("There-are-no-all-orders-yet")}
            </Typography>
          </Box>
        </>
      )}
    </>
  );
};

export default OrderCardContainer;
