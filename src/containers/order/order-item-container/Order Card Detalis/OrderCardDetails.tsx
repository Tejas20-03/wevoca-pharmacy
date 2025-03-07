import React, { useEffect, useMemo } from "react";
import styles from "./OrderCardDetails.module.scss";
import Typography from "@mui/material/Typography";
import OrderCircleNumberModal from "@/containers/order/order-circle-number-modal/OrderCircleNumberModal";
import Buttons from "@/components/Button/Buttons";
import { getCancelReason } from "@/services/order/services";
import {
  CheckOrderStatus_ResponseDataType,
  GetOrderDetail_DetailsDataType,
  GetOrderDetail_ResponseType,
} from "@/services/order/types";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import {
  addCancelOrder,
  openCancelOrder,
} from "@/redux/cancel-order-popup/slice";
import { getMultipleProducts } from "@/services/product/services";
import { useAppSelector } from "@/hooks/use-app-selector";
import { overwriteCartWithTheseProducts } from "@/redux/cart/actions";
import { ordersFetchingType } from "@/containers/order/use-infinite-orders/use-infinite-orders";
import { Slide, toast } from "react-toastify";
import { Box, Rating, Stack } from "@mui/material";
import BoxTitle from "@/components/BoxTitle/Box-title";
import Image from "next/image";
import { numberWithCommas } from "@/functions/numberWithCommas";

import { useRouter } from "next/router";
import {
  addProductReview,
  openProductReview,
} from "@/redux/order-review-popup/slice";
import { toSentenceCase } from "@/functions/toSentanceCase";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import mixpanel from "mixpanel-browser";
import { SaveOrderDetail } from "@/redux/order-detail/slice";
import { useLanguage } from "@/language-context/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { GetTranslatedData } from "@/services/footer/services";
import Cookies from "js-cookie";

interface Props {
  data: GetOrderDetail_ResponseType | undefined;
  isCancelled?: boolean;
  isDelivered?: boolean;
  isPending?: boolean;
  typeValue?: string;
  minutesDifference: number;
  orderJourneyStatus: CheckOrderStatus_ResponseDataType;
  reviewData?: unknown;
}

const OrderCardDetails: React.FC<Props> = ({
  reviewData,
  orderJourneyStatus,
  data,
  typeValue,
  isCancelled,
  isDelivered,
  isPending,
  minutesDifference,
}) => {
  const subTotal = useMemo(() => Number(data?.Subtotal)?.toFixed(2), [data]);
  const discount = useMemo(
    () =>
      data?.VoucherCode !== "" && Number(data?.VoucherValue || "0") >= 0
        ? Number(data?.VoucherValue || "0").toFixed(2)
        : Number(data?.Discount || "0")?.toFixed(2),
    [data]
  );
  const afterDiscount = useMemo(
    () =>
      (
        Number(data?.Subtotal) -
        (data?.VoucherCode !== ""
          ? Number(data?.VoucherValue)
          : Number(data?.Discount))
      )?.toFixed(2),
    [data]
  );
  const deliverFee = useMemo(() => data?.DeliveryFees, [data]);
  const PlatformFees = useMemo(() => data?.PlatformFees, [data]);
  const storeData = useAppSelector((state) => state.store);
  const cartData = useAppSelector((state) => state.cart);
  const addressData = useAppSelector((state) => state.addresses);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const MultipleProductTitleVal = data?.Detail?.map(
    (item) => item?.ProductTitle
  )
    .filter(Boolean)
    .join(", ");
  const orderCancel = (orderId: string) => {
    dispatch(SaveOrderDetail(data));
    setTimeout(() => {
      dispatch(openCancelOrder());
      dispatch(
        addCancelOrder({
          orderId,
        })
      );
    }, 200);
  };
  const { width: windowWidth } = useWindowDimensions();

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

  const reorderFunc = async () => {
    if (addressData.addresses.length <= 0) {
      toast("Please Add Address to continue", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
        theme: "dark",
      });
      return;
    }
    const productIDs = data?.Detail?.map((item) => item?.ProductID) || [];
    const response = await getMultipleProducts(
      productIDs?.join(),
      storeData?.selectedStoreCode,
      {}
    );
    if (response === undefined || response?.ResponseType?.toString() !== "1") {
      toast("Something went wrong! Please Check your internet connection", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
        theme: "dark",
      });
      return;
    }
    const data2 = response.Data.flatMap((item) =>
      data?.Detail.map((data) => {
        if (item.ProductID === data.ProductID) {
          if (item.Variation && item.Variation.length > 0)
            return {
              ...item,
              perStripBox: true,
              VariationTitle: data.VariantTitle,
              quantityToAdd: data.Quantity,
            };
          else
            return {
              ...item,
              perStripBox: false,
              VariationTitle: data.VariantTitle,
              quantityToAdd: data.Quantity,
            };
        }
      })
    );
    const products1 = data2.map((item) => {
      if (item?.perStripBox) {
        if (item?.VariationTitle?.trim() === "Box") {
          return {
            id: item.ID,
            data: item,
            quantityToAdd: Number(
              Number(item.quantityToAdd) >=
                Number(item.Variation?.[0].AvailableQty)
                ? item.Variation?.[0].AvailableQty
                : item.quantityToAdd
            ),
            perStrip: false,
          };
        } else if (item?.VariationTitle?.trim() === "Strip") {
          return {
            id: item.ID,
            data: item,
            quantityToAdd: Number(
              Number(item.quantityToAdd) >=
                Number(item.Variation?.[1].AvailableQty)
                ? item.Variation?.[1].AvailableQty
                : item.quantityToAdd
            ),
            perStrip: true,
          };
        }
      } else {
        if (item && Number(item.AvailableQty) > 0) {
          return {
            id: item.ID,
            data: item,
            quantityToAdd: Number(
              item.quantityToAdd > item.AvailableQty
                ? item.AvailableQty
                : item.quantityToAdd
            ),
          };
        } else {
          return null;
        }
      }
    });
    const products = products1.filter((item) => item !== null);
    if (products !== null && products.length > 0) {
      await dispatch(overwriteCartWithTheseProducts({ products }));

      setTimeout(() => {
        if (windowWidth > 575) {
          router.push({ pathname: "/cart", query: { reorder: true } });
        } else if (windowWidth < 576) {
          router.push("/cart-2");
        }
      }, 500);
    } else {
      toast("Item Not Avaliable!", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
        theme: "dark",
      });
      return;
    }
  };

  useEffect(() => {
    const addCancelOrderFunc = async () => {
      const response = await getCancelReason({ token: "" });
      if (response?.responseType.toString() === "1") {
        dispatch(
          addCancelOrder({
            cancelReason: response.Data,
          })
        );
      }
    };

    addCancelOrderFunc();
  }, []);

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

  const orderAssignedBtn = () => {
    toast(
      "Order Confirmed. Cancellation Not Available. Please Note: Once an order is confirmed, it cannot be canceled. If you have any concerns, please contact our Customer Support at 021-111-138-246.",
      {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
        theme: "dark",
      }
    );
  };

  const timeExceedBtn = () => {
    toast(
      "Order Cancellation Time Limit Exceeded. Please Note: Orders cannot be canceled after 10 minutes. If you have any concerns, please contact our Customer Support at 021-111-138-246.",
      {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
        theme: "dark",
      }
    );
  };
  function parseDateString(dateString) {
    if (!dateString) {
      return "Invalid date";
    }

    const [datePart, timePart] = dateString.split(" | ");
    const [day, month, year] = datePart.split("/");
    const [time, meridian] = timePart.split(" ");

    let [hours, minutes, seconds] = time.split(":");
    if (meridian === "PM" && hours < 12) {
      hours = parseInt(hours, 10) + 12;
    } else if (meridian === "AM" && hours === "12") {
      hours = "00";
    }

    const date = new Date(
      year,
      parseInt(month, 10) - 1,
      day,
      hours,
      minutes,
      seconds
    );
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  const openAndProvideReview = (Detail: GetOrderDetail_DetailsDataType) => {
    dispatch(
      addProductReview({
        orderId: data?.ID,
        OrderDetailID: Detail?.ID,
        orderDetailData: Detail,
      })
    );
    dispatch(openProductReview());
  };
  return (
    <div
      className={`${styles.AccordionDetailsContainer} ${
        (data?.OrderStatus === "CANCELLED" || data?.CancelReason !== "") &&
        styles.cancelledOrderContainer
      }`}
    >
      <>
        {data?.OrderStatus === "CANCELLED" || data?.CancelReason !== "" ? (
          <Typography className={styles.cancelledOrderText}>
            Order was cancelled due to {data?.CancelReason}
          </Typography>
        ) : (
          ""
        )}
        <div className={styles.orderStatusNumber}>
          <OrderCircleNumberModal
            color={
              data?.OrderStatus === "Delivered"
                ? "var(--bg-color)"
                : data?.OrderStatus === "Pending"
                ? "var(--bg-color)"
                : data?.OrderStatus === "HOLD MOVEMENT"
                ? "var(--text-color-lightest)"
                : data?.OrderStatus === "CANCELLED" || data?.CancelReason !== ""
                ? "var(--bg-color)"
                : "var(--bg-color)"
            }
            size={30}
            bgColor={
              data?.OrderStatus === "Delivered"
                ? "var(--primary-color)"
                : data?.OrderStatus === "Pending"
                ? "var(--primary-color)"
                : data?.OrderStatus === "HOLD MOVEMENT"
                ? "var(--bg-color)"
                : data?.OrderStatus === "CANCELLED" || data?.CancelReason !== ""
                ? "var(--text-color-lightest)"
                : "var(--primary-color)"
            }
            number={1}
            title={getText("Order-Placed")}
            subTitle={
              orderJourneyStatus?.Data[0]?.Created_at !== ""
                ? getText("We-have-received")
                : ""
            }
            time={
              orderJourneyStatus?.Data[0]?.Created_at !== ""
                ? orderJourneyStatus?.Data[0]?.Created_at &&
                  parseDateString(orderJourneyStatus?.Data[0]?.Created_at)
                : ""
            }
          />
          <OrderCircleNumberModal
            color={
              data?.OrderStatus === "Delivered"
                ? "var(--bg-color)"
                : data?.OrderStatus === "Pending"
                ? "var(--primary-color)"
                : data?.OrderStatus === "HOLD MOVEMENT"
                ? "var(--text-color-lightest)"
                : data?.OrderStatus === "CANCELLED" || data?.CancelReason !== ""
                ? "var(--bg-color)"
                : orderJourneyStatus?.Assigned_at !== ""
                ? "var(--bg-color)"
                : "var(--primary-color)"
            }
            size={30}
            bgColor={
              data?.OrderStatus === "Delivered"
                ? "var(--primary-color)"
                : data?.OrderStatus === "Pending"
                ? "var(--bg-color)"
                : data?.OrderStatus === "HOLD MOVEMENT"
                ? "var(--bg-color)"
                : data?.OrderStatus === "CANCELLED" || data?.CancelReason !== ""
                ? "var(--text-color-lightest)"
                : orderJourneyStatus?.Assigned_at !== ""
                ? "var(--primary-color)"
                : "var(--bg-color)"
            }
            number={2}
            title={getText("Order-Confirmed")}
            subTitle={
              orderJourneyStatus?.Data[0]?.Assigned_at !== ""
                ? "Your order is confirmed"
                : ""
            }
            time={
              orderJourneyStatus?.Data[0]?.Assigned_at !== ""
                ? orderJourneyStatus?.Data[0]?.Assigned_at &&
                  parseDateString(orderJourneyStatus?.Data[0]?.Assigned_at)
                : ""
            }
          />
          <OrderCircleNumberModal
            color={
              data?.OrderStatus === "Delivered"
                ? "var(--bg-color)"
                : data?.OrderStatus === "Pending"
                ? "var(--primary-color)"
                : data?.OrderStatus === "HOLD MOVEMENT"
                ? "var(--text-color-lightest)"
                : data?.OrderStatus === "CANCELLED" || data?.CancelReason !== ""
                ? "var(--bg-color)"
                : orderJourneyStatus?.Picked_at !== ""
                ? "var(--bg-color)"
                : "var(--primary-color)"
            }
            bgColor={
              data?.OrderStatus === "Delivered"
                ? "var(--primary-color)"
                : data?.OrderStatus === "Pending"
                ? "var(--bg-color)"
                : data?.OrderStatus === "HOLD MOVEMENT"
                ? "var(--bg-color)"
                : data?.OrderStatus === "CANCELLED" || data?.CancelReason !== ""
                ? "var(--text-color-lightest)"
                : orderJourneyStatus?.Picked_at !== ""
                ? "var(--primary-color)"
                : "var(--bg-color)"
            }
            number={3}
            title={getText("Order-On-Delivery")}
            subTitle={
              orderJourneyStatus?.Data?.[0]?.Picked_at !== ""
                ? "Rider has picked up your order"
                : ""
            }
            time={
              orderJourneyStatus?.Data?.[0]?.Picked_at !== ""
                ? orderJourneyStatus?.Data?.[0]?.Picked_at &&
                  parseDateString(orderJourneyStatus?.Data?.[0]?.Picked_at)
                : ""
            }
          />
          <OrderCircleNumberModal
            color={
              data?.OrderStatus === "Delivered"
                ? "var(--bg-color)"
                : data?.OrderStatus === "DELIVERED"
                ? "var(--bg-color)"
                : data?.OrderStatus === "Pending"
                ? "var(--primary-color)"
                : data?.OrderStatus === "HOLD MOVEMENT"
                ? "var(--text-color-lightest)"
                : data?.OrderStatus === "CANCELLED" || data?.CancelReason !== ""
                ? "var(--bg-color)"
                : "var(--primary-color)"
            }
            size={30}
            bgColor={
              data?.OrderStatus === "Delivered"
                ? "var(--primary-color)"
                : data?.OrderStatus === "DELIVERED"
                ? "var(--primary-color)"
                : data?.OrderStatus === "Pending"
                ? "var(--bg-color)"
                : data?.OrderStatus === "HOLD MOVEMENT"
                ? "var(--bg-color)"
                : data?.OrderStatus === "CANCELLED" || data?.CancelReason !== ""
                ? "var(--text-color-lightest)"
                : "var(--bg-color)"
            }
            number={4}
            title={getText("Order-Delivered")}
            subTitle={
              orderJourneyStatus?.Data[0]?.Delivered_at !== ""
                ? "Order is successfully delivered"
                : ""
            }
            time={
              orderJourneyStatus?.Data[0]?.Delivered_at !== ""
                ? orderJourneyStatus?.Data[0]?.Delivered_at &&
                  parseDateString(orderJourneyStatus?.Data[0]?.Delivered_at)
                : ""
            }
          />
        </div>
        <div className={styles.orderDetailContainer}>
          <div className={styles.orderItemDetail}>
            {data?.Detail.map((Detail, index) => (
              <div className={styles.productTitleContainer} key={index}>
                <div className={styles.productTitleWrapper}>
                  <div>
                    <Image
                      src={Detail?.ItemImage}
                      alt="logo"
                      width={74}
                      height={73}
                    />
                  </div>
                  <div>
                    {" "}
                    <div className={styles.productTitleInnerContainer}>
                      <Typography className={styles.productTitle}>
                        {Detail?.ProductTitle}
                      </Typography>
                      <div style={{ textAlign: "right" }}>
                        <Typography className={styles.productPrice}>
                          KWD{" "}
                          {numberWithCommas(
                            parseFloat(Detail?.TotalPrice).toFixed(2)
                          )}
                        </Typography>
                        {data?.OrderStatus?.toLowerCase() === "delivered" &&
                        data?.OrderStatus?.toLowerCase() === "delivered" &&
                        Detail?.IsReviewed === "False" ? (
                          <Buttons
                            btnClickFunction={() =>
                              openAndProvideReview(Detail)
                            }
                            btnClass="primary btn-half-rounded"
                          >
                            Write a Review
                          </Buttons>
                        ) : (
                          data?.OrderStatus?.toLowerCase() === "delivered" && (
                            <Stack
                              className={styles.desktopReviewRating}
                              spacing={1}
                            >
                              <Rating
                                className={styles.ratingInReview}
                                name="half-rating-read"
                                value={Detail?.Rating}
                                precision={0.5}
                                readOnly
                              />
                            </Stack>
                          )
                        )}
                      </div>
                    </div>
                    <div className={styles.orderDetailReviewRatingMobile}>
                      <div
                        className={`${styles.productQuantity} ${
                          Detail?.VariantTitle !== ""
                            ? styles.productQuantitySingle
                            : ""
                        }`}
                      >
                        {Detail?.VariantTitle !== "" && (
                          <Typography className={styles.productPrice}>
                            {Detail?.VariantTitle !== ""
                              ? `Per ${toSentenceCase(Detail?.VariantTitle)}`
                              : ""}{" "}
                          </Typography>
                        )}
                        <Typography className={styles.productPrice}>
                          Quantity: {Detail?.Quantity}
                        </Typography>
                      </div>
                      {data?.OrderStatus?.toLowerCase() === "delivered" &&
                      Detail?.IsReviewed === "False" ? (
                        <div
                          className={styles.writeReviewMobile}
                          style={{ textAlign: "center" }}
                        >
                          <Buttons
                            btnClickFunction={() =>
                              openAndProvideReview(Detail)
                            }
                            btnClass="primary btn-half-rounded"
                          >
                            Write a Review
                          </Buttons>
                        </div>
                      ) : (
                        data?.OrderStatus?.toLowerCase() === "delivered" && (
                          <Stack
                            className={styles.mobileReviewRating}
                            spacing={1}
                          >
                            <Rating
                              className={styles.ratingInReview}
                              name="half-rating-read"
                              value={Detail?.Rating}
                              precision={0.5}
                              readOnly
                            />
                          </Stack>
                        )
                      )}
                    </div>
                  </div>
                </div>
                {Detail?.Review !== "" && (
                  <div className={styles.productReview}>
                    <p>{Detail?.Review}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className={styles.orderPaymentDetail}>
            <Box className={styles.billPricing}>
              <div className={styles.orderCustomerDetail}>
                <Typography className={styles.customerTitle}>
                  {data?.CustomerName}
                </Typography>
                <Typography className={styles.CustomerAddress}>
                  {data?.ShippingAddress}
                </Typography>
              </div>
              <BoxTitle boxTitle={getText("Bill-Details")} />
              <Box className={styles.priceTable}>
                {[
                  { title: getText("Sub-Total"), amount: `KWD ${subTotal}` },
                  {
                    title: `${getText("Discount")} ${
                      data?.VoucherCode !== ""
                        ? `(${data?.VoucherCode?.toUpperCase()})`
                        : ""
                    }`,
                    amount: `${
                      discount.toString() === "0.00" ? "" : "-"
                    } KWD ${discount}`,
                  },
                  {
                    title: getText("After-Discount"),
                    amount: `KWD ${
                      Number(afterDiscount) < 0 ? 0 : afterDiscount
                    }`,
                  },
                  {
                    title: getText("Delivery-Fee"),
                    amount: `+ KWD ${Number(deliverFee).toFixed(2)}`,
                  },
                  {
                    title: getText("Platform-Fee"),
                    amount: `+ KWD ${Number(PlatformFees).toFixed(2)}`,
                  },
                ]?.map((item, index) => (
                  <div key={index}>
                    <Typography variant="body2" component="p">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {numberWithCommas(item.amount)}
                    </Typography>
                  </div>
                ))}
              </Box>
              <Box className={styles.orderTotal}>
                <div>
                  <Typography variant="body2" component="p">
                    {" "}
                    {getText("Order-Total")}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {" "}
                    KWD{" "}
                    {Math.abs(data?.Total - Math.floor(data?.Total)) < 0.5
                      ? numberWithCommas(Number(data?.Total).toFixed(2))
                      : numberWithCommas(Number(data?.Total).toFixed(2))}
                  </Typography>
                </div>
              </Box>
            </Box>
          </div>
        </div>

        {orderStatus() === "Pending" && (
          <div className={styles.btnContainer}>
            {typeValue === "Assigned_To_Rider" ? (
              <Buttons
                btnClickFunction={() => orderAssignedBtn()}
                btnClass={`primary btn-half-rounded ${styles.btnCancelled} ${styles.btnGrey}`}
              >
                {getText("Cancel-Order")}
              </Buttons>
            ) : minutesDifference > 10 ? (
              <Buttons
                btnClickFunction={() => timeExceedBtn()}
                btnClass={`primary btn-half-rounded ${styles.btnCancelled} ${styles.btnGrey}`}
              >
                {getText("Cancel-Order")}
              </Buttons>
            ) : (
              <Buttons
                btnClass={`primary btn-half-rounded ${styles.btnCancelled}`}
                btnClickFunction={() => orderCancel(data.ID)}
              >
                {getText("Cancel-Order")}
              </Buttons>
            )}
          </div>
        )}
        {orderStatus() !== "Pending" && (
          <div className={styles.btnContainer}>
            <Buttons
              btnClass={`primary btn-half-rounded ${styles.btnReorder}`}
              btnClickFunction={reorderFunc}
            >
              REORDER
            </Buttons>
          </div>
        )}
      </>
    </div>
  );
};

export default OrderCardDetails;
