import { Box, Typography } from "@mui/material";
import React, { useMemo } from "react";
import style from "./bill-details.module.scss";
import { useAppSelector } from "@/hooks/use-app-selector";
import { numberWithCommas } from "@/functions/numberWithCommas";

import dynamic from "next/dynamic";
import { useLanguage } from "@/language-context/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { GetTranslatedData } from "@/services/footer/services";
import Cookies from "js-cookie";
const BoxTitle = dynamic(() => import("@/components/BoxTitle/Box-title"), {
  ssr: false,
});

interface IProps {}

const BillDetails: React.FC<IProps> = () => {
  const cartData = useAppSelector((state) => state.cart);
  const storeData = useAppSelector((state) => state.store);
  const addresses = useAppSelector((state) => state.addresses);
  const AmountLeftForFreeDelivery = useMemo(
    () =>
      cartData?.appliedPromoDiscount === 0
        ? storeData.selectedStoreDeliveryChargesWaiveAfter +
          cartData.discount -
          cartData.subTotal
        : storeData.selectedStoreDeliveryChargesWaiveAfter +
          cartData?.appliedPromoDiscount -
          cartData.subTotal,
    [
      cartData,
      storeData.selectedStoreDeliveryChargesWaiveAfter,
      cartData.discount,
      cartData.appliedPromoDiscount,
    ]
  );
  const subTotal = useMemo(
    () => cartData.subTotal.toFixed(2),
    [cartData.subTotal]
  );
  const discount = useMemo(
    () =>
      (cartData.appliedPromo !== "" && cartData.appliedPromoDiscount >= 0
        ? cartData.appliedPromoDiscount
        : cartData.discount
      ).toFixed(2),
    [cartData.appliedPromo, cartData.appliedPromoDiscount, cartData.discount]
  );
  const afterDiscount = useMemo(
    () =>
      (
        cartData.subTotal -
        (cartData.appliedPromo !== ""
          ? cartData.appliedPromoDiscount
          : cartData.discount)
      ).toFixed(2),
    [
      cartData.subTotal,
      cartData.appliedPromo,
      cartData.appliedPromoDiscount,
      cartData.discount,
    ]
  );
  const platformFees = useMemo(
    () => cartData?.platformFee?.toFixed(2),
    [cartData, cartData.platformFee]
  );
  const deliverFee = useMemo(
    () => cartData?.deliveryCharges?.toFixed(2),
    [cartData.deliveryCharges, storeData, addresses]
  );
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
    <Box className={style.billPricing}>
      <BoxTitle boxTitle={getText("Bill-Details")} />
      <Box className={style.priceTable}>
        {[
          { title: getText("Sub-Total"), value: `KWD ${subTotal}` },
          {
            title: (
              <span>
                {getText("Discount")}{" "}
                {cartData.appliedPromo ? (
                  <span>({cartData.appliedPromo.toUpperCase()})</span>
                ) : (
                  ""
                )}
              </span>
            ),
            value: `${
              discount.toString() === "0.00" ? "" : "-"
            } KWD ${discount}`,
          },
          {
            title: getText("After-Discount"),
            value: `KWD ${Number(afterDiscount) < 0 ? 0 : afterDiscount}`,
          },
          { title: getText("Delivery-Fee"), value: `+ KWD ${deliverFee}` },

          { title: getText("Platform-Fee"), value: `+ KWD ${platformFees}` },
        ].map((item, index) => (
          <div key={index}>
            <Typography variant="body2" component="p">
              {item.title}
            </Typography>
            <Typography variant="body2" component="p">
              {numberWithCommas(item.value)}
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
            {Math.abs(cartData.total - Math.floor(cartData.total)) < 0.5
              ? numberWithCommas(Number(cartData.total).toFixed(2))
              : numberWithCommas(Number(cartData.total).toFixed(2))}
          </Typography>
        </div>
      </Box>
      {storeData.selectedStoreDeliveryChargesWaiveAfter > 0 && (
        <>
          {AmountLeftForFreeDelivery > 0 && (
            <Typography variant="body2" component="p">
              {getText("You-are-KWD-away")}{" "}
              {/* {numberWithCommas(AmountLeftForFreeDelivery.toFixed(2))} away from
              free delivery */}
            </Typography>
          )}
          {AmountLeftForFreeDelivery < 0 && (
            <Typography variant="body2" component="p">
              You have got free delivery
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default BillDetails;
