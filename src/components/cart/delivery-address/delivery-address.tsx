import { Box, Typography } from "@mui/material";
import React from "react";
import CartBoxContainer from "@/components/cart/cart-box-container/cart-box-container";
import style from "./delivery-address.module.scss";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { openAddressPopup, showSelectedTab } from "@/redux/address-popup/slice";
import {
  openLoginPopup,
  openLoginPopupOnAddToCart,
} from "@/redux/Login-popup/slice";
import Cookies from "js-cookie";
import { useAppSelector } from "@/hooks/use-app-selector";
import { useLanguage } from "@/language-context/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { GetTranslatedData } from "@/services/footer/services";
interface IProps {
  addressTag: string;
  address: string;
}

const DeliveryAddress: React.FC<IProps> = ({ addressTag, address }) => {
  const dispatch = useAppDispatch();
  const addressData = useAppSelector((state) => state.addresses);
  const handleOpenAddress = () => {
    const getUserData = Cookies.get("user");
    const isLoggedIn =
      getUserData !== undefined ? JSON.parse(getUserData).isLoggedIn : false;
    if (isLoggedIn) {
      dispatch(openAddressPopup());
      if (addressData.addresses?.length > 0) {
        dispatch(showSelectedTab());
      }
    } else {
      dispatch(openLoginPopup());
      dispatch(openLoginPopupOnAddToCart(true));
    }
  };

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
    <CartBoxContainer
      buttonText={getText("Change-Address")}
      boxTitle={getText("Delivery-Address")}
      classes={style.DeliveryAddressBox}
      btnOnClick={handleOpenAddress}
    >
      <Box className={style.addressBox}>
        {addressTag?.length && (
          <Typography
            className={style.addressTag}
            variant="body2"
            component="span"
          >
            {addressTag}
          </Typography>
        )}
        {address?.length && (
          <Typography
            className={style.completeAddress}
            variant="body2"
            component="span"
          >
            {address}
          </Typography>
        )}
      </Box>
    </CartBoxContainer>
  );
};

export default DeliveryAddress;
