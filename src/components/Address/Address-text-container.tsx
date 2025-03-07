import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Style from "./Address.module.scss";
import { useAppSelector } from "@/hooks/use-app-selector";
import { SavedAddressDataType } from "@/redux/addresses/slice";
import Cookies from "js-cookie";
import { GetTranslatedData } from "@/services/footer/services";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/language-context/LanguageContext";

const AddressTextContainer: React.FC = () => {
  const [selectedAddress, setSelectedAddress] = useState(
    {} as SavedAddressDataType | null
  );
  const addressData = useAppSelector((state) => state.addresses);
  const userLogin = useAppSelector((state) => state.user);
  const getUserData = Cookies.get("user");
  const { isLoading, error, data, refetch } = useQuery(
    ["footer"],
    async () => {
      return await GetTranslatedData({ token: "" });
    },
    {
      retry: (failureCount, error) => {
        const token = Cookies.get("auth-token");
        return !token;
      },
      retryDelay: 0,
      staleTime: 600000, //1 day
    }
  );

  const translatedData = data?.Data || [];

  const { language } = useLanguage();

  const getText = (value: string) => {
    const item = translatedData.find((item: any) => item.Value === value);
    return language === "ar" ? item?.Arabic : item?.English;
  };

  const isLoggedIn =
    getUserData !== undefined ? JSON.parse(getUserData).isLoggedIn : false;
  useEffect(() => {
    if (addressData?.addresses?.length > 0) {
      setSelectedAddress(addressData.selectedAddressDetails);
      if (addressData.selectedAddressDetails === null) {
        setSelectedAddress(addressData.addresses[0]);
      }
    } else {
      setSelectedAddress(null);
    }
    if (isLoggedIn) {
      setSelectedAddress(addressData.selectedAddressDetails);
    } else {
      setSelectedAddress(null);
    }
  }, [addressData, userLogin, isLoggedIn]);

  return (
    <>
      {selectedAddress !== null ? (
        <div className={Style.addressText}>
          <Typography
            paragraph={true}
            sx={{ margin: "0", fontSize: "0.6rem", fontWeight: "400" }}
          >
            {selectedAddress?.customAddress}
          </Typography>
        </div>
      ) : (
        <div className={Style.addressText}>
          <Typography
            paragraph={true}
            sx={{ margin: "0", fontSize: "0.6rem", fontWeight: "500" }}
          >
            {getText("No-Address")}
          </Typography>
        </div>
      )}
    </>
  );
};

export default AddressTextContainer;
