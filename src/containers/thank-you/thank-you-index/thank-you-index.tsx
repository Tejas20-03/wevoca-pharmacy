import ThankYouBannerIcon from "@/containers/svg-icons/thankyou-banner";
import { Box, Typography } from "@mui/material";
import style from "./thank-you.module.scss";
import PageWithBanner from "@/components/page-banner/page-with-banner";
import { GetOrderDetail_ResponseType } from "@/services/order/types";
import { numberWithCommas } from "@/functions/numberWithCommas";
import { useEffect, useMemo } from "react";
import BoxTitle from "@/components/BoxTitle/Box-title";
import Buttons from "@/components/Button/Buttons";
import { useRouter } from "next/router";
import GlobalModal from "@/components/global-modal/modal";
import React from "react";
import * as gtag from "@/utils/googleEvents";
import { useAppSelector } from "@/hooks/use-app-selector";
import mixpanel from "mixpanel-browser";
import { useLanguage } from "@/language-context/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { GetTranslatedData } from "@/services/footer/services";
import Cookies from "js-cookie";
interface IProps {
  data: GetOrderDetail_ResponseType;
}

const ThankYouIndex: React.FC<IProps> = ({ data }) => {
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
  const router = useRouter();
  const { deliveryCharges, cartProducts } = useAppSelector(
    (state) => state.cart
  );
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  useEffect(() => {
    const multipleGenericVal = data.Detail?.map((item) => item?.Generics)
      .filter(Boolean)
      .join(", ");
    const MultipleProductTitleVal = data.Detail?.map(
      (item) => item?.ProductTitle
    )
      .filter(Boolean)
      .join(", ");
    const MultipleCategoryVal = data.Detail?.map((item) => item?.ParentCategory)
      .filter(Boolean)
      .join(", ");
    const MultipleParentCategoryVal = data.Detail?.map(
      (item) => item?.ParentCategory
    )
      .filter(Boolean)
      .join(", ");
    if (data) {
      gtag.event({
        action: "purchase",
        params: {
          transaction_id: data.ID,
          value: Number(data.Total),
          shipping: data?.DeliveryFees,
          tax: data?.Total_Tax,
          currency: "PKR",
          coupon: data.VoucherCode || "",
          items: data.Detail.map((item) => ({
            item_id: item?.ShopifyProductID?.toString(),
            item_name: item?.ProductTitle,
            discount: item?.Discount,
            item_brand: item?.Brand || "",
            item_category: item?.ParentCategory || "",
            price: Number(item?.Price),
          })),
        },
      });
      // mixpanel.track('checkout_completed', {
      //   order_total: data?.Total,
      //   order_id: data?.ID,
      //   order_source: 'Website',
      //   sub_total: data?.Subtotal,
      //   discount: data?.Discount,
      //   after_discount: Number(afterDiscount),
      //   delivery_fee: data?.DeliveryFees,
      //   platform_fee: data?.PlatformFees,
      //   quantity: data?.Detail?.length,
      //   category_1_names: MultipleCategoryVal,
      //   category_2_names: MultipleParentCategoryVal,
      //   generics: multipleGenericVal,
      //   event_source: 'Web',
      //   store_id: data?.BranchID?.toString() || '32',
      //   order_type: router?.query?.reorder === 'true' ? 'Re Order' : 'New Order',
      //   payment_method: data?.Gateway,
      //   product_names: MultipleProductTitleVal,
      //   product_detail: data.Detail.map((item) => ({
      //     product_name: item?.ProductTitle,
      //     category_lv1: item?.ChildCategory,
      //     category_lv2: item?.ParentCategory,
      //     category_lv3: '',
      //     product_id: item?.ShopifyProductID ,
      //     price: item?.Discount !== '0' ? Number(item?.TotalPrice) : Number(item?.Price) || 0,
      //     quantity: item?.Quantity,
      //     manufacturer: item?.Brand || '',
      //     generics: item?.Generics || '',
      //     unit: item?.VariantTitle || '',
      //     type: item?.VariantTitle || '',
      //     used_for: item?.UsedFor || '',
      //   })),
      // });
      if (typeof window !== "undefined") {
        // window?.webengage?.track('checkout_completed', {
        //   order_total: data?.Total,
        //   order_id: data?.ID,
        //   order_source: 'Website',
        //   sub_total: data?.Subtotal,
        //   discount: data?.Discount,
        //   after_discount: Number(afterDiscount),
        //   delivery_fee: data?.DeliveryFees,
        //   platform_fee: data?.PlatformFees,
        //   quantity: data?.Detail?.length,
        //   category_1_names: MultipleCategoryVal,
        //   category_2_names: MultipleParentCategoryVal,
        //   generics: multipleGenericVal,
        //   event_source: 'Web',
        //   store_id: data?.BranchID?.toString() || '32',
        //   order_type: router?.query?.reorder === 'true' ? 'Re Order' : 'New Order',
        //   product_names: MultipleProductTitleVal,
        //   payment_method: data?.Gateway,
        //   product_detail: data.Detail.map((item) => ({
        //     product_name: item?.ProductTitle,
        //     category_lv1: item?.ChildCategory,
        //     category_lv2: item?.ParentCategory,
        //     category_lv3: '',
        //     product_id: item?.ShopifyProductID ,
        //     price: item?.Discount !== '0' ? Number(item?.TotalPrice) : Number(item?.Price) || 0,
        //     quantity: item?.Quantity,
        //     manufacturer: item?.Brand || '',
        //     generics: item?.Generics || '',
        //     unit: item?.VariantTitle || '',
        //     type: item?.VariantTitle || '',
        //     used_for: item?.UsedFor || '',
        //   })),
        // });
      }
    }
  }, []);

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
      <PageWithBanner removeSideSpacing={style.pageSpacing}>
        <Box className={style.BannerSection}>
          <ThankYouBannerIcon />
          <Typography className={style.orderRecevied}>
            {getText("Order-Received")}
          </Typography>
          <Typography>
            {getText("Order-ID")} #{data.ID}
          </Typography>
        </Box>
        <div className={style.orderDetailContainer}>
          <div className={style.orderCustomerDetail}>
            <Typography className={style.customerTitle}>
              {data?.CustomerName}
            </Typography>
            <Typography className={style.CustomerAddress}>
              {data?.ShippingAddress}
            </Typography>
          </div>
          <div className={style.orderItemDetail}>
            <BoxTitle boxTitle={getText("Order-Details")} />
            {data?.Detail.map((Detail, index) => (
              <div className={style.productTitleContainer} key={index}>
                <div className={style.productTitleInnerContainer}>
                  <Typography className={style.productTitle}>
                    {Detail?.ProductTitle}
                  </Typography>
                  <Typography className={style.productPrice}>
                    KWD{" "}
                    {numberWithCommas(
                      parseFloat(Detail?.TotalPrice).toFixed(2)
                    )}
                  </Typography>
                </div>
                <Typography className={style.productPrice}>
                  {Detail?.VariantTitle !== ""
                    ? `Per ${Detail?.VariantTitle}`
                    : ""}
                </Typography>
                <Typography className={style.productPrice}>
                  Quantity: {Detail?.Quantity}
                </Typography>
              </div>
            ))}
          </div>
          <div className={style.orderPaymentDetail}>
            <Box className={style.billPricing}>
              <BoxTitle boxTitle={getText("Bill-Details")} />
              <Box className={style.priceTable}>
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
              <Box className={style.orderTotal}>
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
        <div className={style.orderTrackBtnWrapper}>
          <Buttons
            btnClickFunction={() => router.push(`/orders`)}
            btnClass={`primary btn-half-rounded ${style.trackOrderScreen}`}
          >
            {getText("Track-Order")}
          </Buttons>
        </div>
      </PageWithBanner>

      <GlobalModal
        openSelector={isOpen}
        closeFunc={() => setIsOpen(false)}
        containerClass={style.cartContainer}
        contentClass={style.cartContainerContent}
        modalBoxClass={style.cartBoxContainer}
      >
        <Box className={style.gridBox}>
          <Typography variant="h2" sx={{ mb: 4 }}>
            Talk to Customer Service
          </Typography>
          <Typography
            sx={{
              fontSize: "20px",
              color: "var(--primary-color)",
              lineHeight: 1.2,
              mb: 3,
            }}
          >
            Your phone call will be to TEMP Customer Service Agent.
          </Typography>
        </Box>
      </GlobalModal>
    </>
  );
};

export default ThankYouIndex;
