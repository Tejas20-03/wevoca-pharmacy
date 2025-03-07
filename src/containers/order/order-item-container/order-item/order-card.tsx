import React, { useEffect, useMemo } from "react";
import styles from "./order-card.module.scss";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import Arrowbottom from "@/containers/svg-icons/arrow-bottom";
import { Typography } from "@mui/material";
import DotIcon from "@/components/Global-Icon/Dot-icon";
import OrderIconAcIn from "@/containers/svg-icons/order-icon-ac-in";
import {
  CheckOrderStatus_ResponseDataType,
  GetOrderDetail_ResponseType,
  MyOrders_OrdersDataType,
} from "@/services/order/types";
import { ordersFetchingType } from "@/containers/order/use-infinite-orders/use-infinite-orders";
import { getCheckOrderStatus, getOrderDetail } from "@/services/order/services";
import SectionLoader from "@/components/Section-loader/section-loader";
import {
  GetCustomerTokenInCookiesStorage,
  GetCustomerTokenInLocalStorage,
} from "@/functions/local-storage-methods";
import dynamic from "next/dynamic";
import { getProductReviewsFunc } from "@/dataFetching/apiResponseFetching";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/dataFetching/apiResponseQueryKey";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { useLanguage } from "@/language-context/LanguageContext";
import { GetTranslatedData } from "@/services/footer/services";
import Cookies from "js-cookie";
// Use dynamic to load OrderCardDetails dynamically
const OrderCardDetails = dynamic(
  () =>
    import(
      "@/containers/order/order-item-container/Order Card Detalis/OrderCardDetails"
    ),
  { loading: () => <SectionLoader /> } // Loading indicator while the component is being loaded
);

interface Props {
  data: MyOrders_OrdersDataType;
  typeValue: ordersFetchingType;
}

const OrderCard: React.FC<Props> = ({ data, typeValue }) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [isLoadDetails, setIsLoadDetails] = React.useState<boolean>(false);
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [cancelReason, setCancelReason] = React.useState(
    {} as CheckOrderStatus_ResponseDataType
  );
  const [isCancelled, setIscancelled] = React.useState<boolean>(false);
  const [isDelivered, setIsDelivered] = React.useState<boolean>(false);
  const [dataDetails, setDataDetails] = React.useState<
    GetOrderDetail_ResponseType | undefined
  >();
  const [reviewData, setReviewData] = React.useState<
    GetOrderDetail_ResponseType | undefined
  >();
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
      setIsLoadDetails((pre) => (pre = !pre));
    };
  const { OrderDetailID } = useAppSelector(
    (state) => state.ProductOrderReviewSlice
  );

  const createdAtStr = dataDetails?.CreatedAt;
  let createdAt, currentTime, minutesDifference;

  if (createdAtStr) {
    const [datePart, timePart] = createdAtStr.split(" | ");
    const [date, month, year] = datePart.split("/");
    const [time, meridian] = timePart.split(" ");

    let [hours, minutes, seconds] = time.split(":");
    if (meridian === "AM" && hours === "12") {
      hours = "0";
    } else if (meridian === "PM" && hours !== "12") {
      hours = String(parseInt(hours, 10) + 12);
    }

    createdAt = new Date(
      Number(year),
      Number(month) - 1,
      Number(date),
      Number(hours),
      Number(minutes),
      Number(seconds)
    );
    currentTime = new Date();

    const timeDifferenceMilliseconds = currentTime - createdAt;
    minutesDifference = Math.floor(timeDifferenceMilliseconds / (1000 * 60));
  } else {
    // Handle the case where CreatedAt is null or undefined
    // You can set default values or handle it as needed
  }

  useEffect(() => {
    if (expanded) {
      const getProductReviewsFuncData = async () => {
        const productIds = dataDetails?.Detail.map(
          (Detail) => Detail.ProductID
        );

        if (productIds) {
          const productReviewsData = await Promise.all(
            productIds.map(async (productId) => {
              const reviews = await getProductReviewsFunc(productId);
              return { productId, reviews };
            })
          );
          setReviewData(productReviewsData);
          return productReviewsData;
        }
        return [];
      };

      getProductReviewsFuncData();
    }
  }, [expanded, dataDetails, OrderDetailID]);

  useEffect(() => {
    // Fetch order details when the accordion item is expanded
    if (expanded) {
      const fetchOrderDetails = async () => {
        const customerTokenCookies: string =
          await GetCustomerTokenInCookiesStorage();
        const customerToken = GetCustomerTokenInLocalStorage();

        const response = await getOrderDetail(data.ID, {
          token:
            customerToken !== null
              ? customerToken || customerTokenCookies
              : undefined,
        });
        const response123 = await getCheckOrderStatus(data.ID, {
          token:
            customerToken !== null
              ? customerToken || customerTokenCookies
              : undefined,
        });
        if (response?.Detail?.length > 0) {
          setDataDetails(response);
        } else {
          setIsLoadDetails(false);
        }
        if (response123?.Data?.length > 0) {
          setCancelReason(response123);
        } else {
          setCancelReason(false);
        }
      };

      fetchOrderDetails();
    }
  }, [expanded, isLoadDetails, data.ID]);

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

  useMemo(() => {
    const orderStatus = data.OrderStatus.toLowerCase();

    if (
      orderStatus === "cancelled" ||
      orderStatus === "re-punched" ||
      orderStatus === "punc on PRISM"
    ) {
      setIscancelled(true);
    } else if (orderStatus === "delivered") {
      setIsDelivered(true);
    } else {
      setIsPending(true);
    }
  }, [data.OrderStatus]);

  const statusFunction = () => {
    switch (typeValue) {
      case "delivered":
        return (
          <OrderIconAcIn
            color="var(--text-color-alt)"
            bgColor="var(--primary-color)"
            opacity={1}
          />
        );
      case "cancelled":
        return (
          <OrderIconAcIn
            color="var(--text-color-alt)"
            bgColor="var(--error-color)"
            opacity={1}
          />
        );
      case "pending":
        return (
          <OrderIconAcIn
            color={
              isLoadDetails ? "var(--primary-color)" : "var(--text-color-alt)"
            }
            bgColor={
              isLoadDetails ? "var(--primary-color)" : "var(--bg-color-darker)"
            }
            opacity={isLoadDetails ? 0.1 : 1}
          />
        );
      case "all":
        return (
          <OrderIconAcIn
            color="var(--text-color-alt)"
            bgColor="var(--primary-color)"
            opacity={1}
          />
        );
    }
  };
  const allStatusFunction = () => {
    const type: ordersFetchingType = isCancelled
      ? "cancelled"
      : isDelivered
      ? "delivered"
      : isPending
      ? "pending"
      : "all";
    switch (type) {
      case "delivered":
        return (
          <OrderIconAcIn
            color="var(--text-color-alt)"
            bgColor="var(--primary-color)"
            opacity={1}
          />
        );
      case "cancelled":
        return (
          <OrderIconAcIn
            color="var(--text-color-alt)"
            bgColor="var(--error-color)"
            opacity={1}
          />
        );
      case "pending":
        return (
          <OrderIconAcIn
            color={
              isLoadDetails ? "var(--primary-color)" : "var(--text-color-alt)"
            }
            bgColor={
              isLoadDetails ? "var(--primary-color)" : "var(--bg-color-darker)"
            }
            opacity={isLoadDetails ? 0.1 : 1}
          />
        );
      case "all":
        return (
          <OrderIconAcIn
            color="var(--text-color-alt)"
            bgColor="var(--primary-color)"
            opacity={1}
          />
        );
    }
  };
  const orderStatus = () => {
    const type: ordersFetchingType = isCancelled
      ? "cancelled"
      : isDelivered
      ? "delivered"
      : isPending
      ? "pending"
      : "all";
    switch (type) {
      case "delivered":
        return "Delivered";
      case "cancelled":
        return getText("Cancelled");
      case "pending":
        return "Pending";
      case "all":
        return "Pending";
    }
  };

  useEffect(() => {
    if (data?.OrderStatus === "CANCELLED") {
      setIscancelled(true);
      setIsPending(false);
      setIsDelivered(false);
    }
  }, [data]);

  return (
    <>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        className={styles.accordionHeader}
        style={{ boxShadow: "none", width: "100%" }}
      >
        <AccordionSummary
          expandIcon={<Arrowbottom color="var(--text-color-lighter)" />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          className={styles.accordionSummary}
        >
          <a className={`${styles.container}`}>
            <div className={styles.iconContainer}>
              {typeValue === "all" ? allStatusFunction() : statusFunction()}
            </div>
            <div className={styles.headingContainer}>
              <Typography
                variant="body1"
                component="p"
                className={styles.address}
              >
                {getText("Order-ID")} {data.ID}
              </Typography>
              <div className={styles.subHeadingContainer}>
                <Typography
                  variant="body1"
                  component="p"
                  className={styles.subHeading}
                >
                  {data.Created_at}{" "}
                </Typography>
                <DotIcon color="--bg-color-darkest" />
                <Typography
                  variant="body1"
                  component="p"
                  className={styles.subHeading}
                >
                  {getText(orderStatus())}{" "}
                </Typography>
              </div>
            </div>
          </a>
        </AccordionSummary>
        <AccordionDetails>
          {dataDetails?.Detail?.length > 0 ? (
            <OrderCardDetails
              reviewData={reviewData}
              orderJourneyStatus={cancelReason}
              minutesDifference={minutesDifference}
              typeValue={data.OrderStatus}
              data={dataDetails}
              isCancelled={isCancelled}
              isDelivered={isDelivered}
              isPending={isPending}
            />
          ) : dataDetails?.Detail === undefined ? (
            <SectionLoader />
          ) : (
            dataDetails === undefined && (
              <Typography
                sx={{
                  textAlign: "center",
                  padding: "30px 0",
                  fontWeight: "600",
                }}
              >
                No Detail Found
              </Typography>
            )
          )}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default OrderCard;
