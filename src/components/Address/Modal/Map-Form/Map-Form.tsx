/* eslint-disable @typescript-eslint/no-unused-vars */

import Buttons from "@/components/Button/Buttons";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { showSelectedTab } from "@/redux/address-popup/slice";
import { StoreState } from "@/redux/store";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from "./Map-Form.module.scss";
import { openCartPopup2 } from "@/redux/cart-remove-popup/slice";
import { useAppSelector } from "@/hooks/use-app-selector";
import CartRemoveModal2 from "@/components/cart-empty-popup/cart-empty-popup-2";
import { postAddAddress } from "@/services/address";
import { GetCustomerTokenInLocalStorage } from "@/functions/local-storage-methods";
import { Slide, toast } from "react-toastify";
import { GetAddress_ResponseData } from "@/services/address/types";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import mixpanel from "mixpanel-browser";
import { identifyUser } from "@/utils/mix-pnael";
import { useLanguage } from "@/language-context/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { GetTranslatedData } from "@/services/footer/services";
import Cookies from "js-cookie";
const BoxTitle = dynamic(() => import("@/components/BoxTitle/Box-title"), {
  ssr: false,
});

interface IProps {
  handleSaveAddress: (addressType: string, customAddress: string) => void;
  setAddressFieldInput: React.Dispatch<
    React.SetStateAction<{
      search: string;
      house: string;
      society: string;
      area: string;
      errorSearch: string;
      errorHouse: string;
      errorSociety: string;
      errorArea: string;
    }>
  >;
  addressFieldInput: {
    search: string;
    house: string;
    society: string;
    area: string;
    errorSearch: string;
    errorHouse: string;
    errorSociety: string;
    errorArea: string;
  };
  mapIsDragging: boolean;
  getAddressData: GetAddress_ResponseData[];
}

export type addressType = "Home" | "Work" | "Other";
const addressTypeArray: Array<addressType> = ["Home", "Work", "Other"];
const MapForm: React.FC<IProps> = ({
  mapIsDragging,
  handleSaveAddress,
  setAddressFieldInput,
  addressFieldInput,
  getAddressData,
}) => {
  const router = useRouter();
  const [selectedAddressType, setSelectedAddressType] =
    useState<addressType>("Home");
  const [isShowCartPopup, setShowCartPopup] = useState<boolean>(false);
  const addressData = useAppSelector((state) => state.addresses);
  const userData = useAppSelector((state) => state.user);
  const handleSetInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Clear the error message for the field being edited
    const fieldName = e.target.name;
    const errorFieldName = `error${fieldName
      .charAt(0)
      .toUpperCase()}${fieldName.slice(1)}`;
    let inputValue = e.target.value;
    const regex = /[\uD800-\uDFFF]/g; // Emoji range in UTF-16
    if (regex.test(inputValue)) {
      inputValue = inputValue.replace(regex, ""); // Remove emojis
    }
    setAddressFieldInput((prev) => ({
      ...prev,
      [fieldName]: inputValue,
      [errorFieldName]: "", // Clear the error message
    }));
  };
  const { cartProducts } = useAppSelector((state) => state.cart);
  const mapData = useSelector((state: StoreState) => state.map);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setAddressFieldInput({
      search: "",
      house: "",
      society: "",
      area: "",
      errorSearch: "",
      errorHouse: "",
      errorSociety: "",
      errorArea: "",
    });
  }, []);
  const handleValidateAndSaveAddress = () => {
    let error = false;
    if (mapData.selectedAddress === "") {
      alert("please add the current location to proceed");
      return;
    }
    if (addressFieldInput.house.trim() === "") {
      setAddressFieldInput((prev) => ({
        ...prev,
        errorHouse: "This field is required *",
      }));
      error = true;
    }
    if (addressFieldInput.society.trim() === "") {
      setAddressFieldInput((prev) => ({
        ...prev,
        errorSociety: "This field is required *",
      }));
      error = true;
    }
    if (addressFieldInput.area.trim() === "") {
      setAddressFieldInput((prev) => ({
        ...prev,
        errorArea: "This field is required * ",
      }));
      error = true;
    }
    if (error) {
      return;
    }
    if (addressFieldInput.search.trim() === "") {
      setAddressFieldInput((prev) => ({
        ...prev,
        errorSearch: "This field is required * ",
      }));
      return;
    }
    const sameAddress = getAddressData.find(
      (item) =>
        item.Location ===
        `${addressFieldInput.house?.trim()} ${addressFieldInput.society?.trim()} ${addressFieldInput.area?.trim()}`
    );
    if (sameAddress !== undefined) {
      toast("Address with this description already exists", {
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
    if (cartProducts?.length > 0) {
      setShowCartPopup(true);
      dispatch(openCartPopup2());
      return;
    }
    setShowCartPopup(false);
    handleSaveAddress(
      selectedAddressType,
      `${addressFieldInput.house} ${addressFieldInput.society} ${addressFieldInput.area}`
      
    );
    if (userData?.isLoggedIn) {
      const userId = userData?.userID;
      const userProperties = {
        $area: addressFieldInput?.area,
      };
      identifyUser(userId, userProperties);
    }
    setAddressFieldInput((prev) => ({
      ...prev,
      errorSearch: "",
      errorHouse: "",
      errorSociety: "",
      errorArea: "",
    }));
    setTimeout(() => {
      dispatch(showSelectedTab());
    }, 200);
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
    <>
      <Box className={style.gridBox2}>
        <BoxTitle boxTitle={getText("Select-Label")} />
        <Box className={style.btnGroup}>
          {addressTypeArray.map((item: addressType, index: number) => (
            <Buttons
              key={index}
              btnClass={`primary btn-half-rounded ${
                item === selectedAddressType
                  ? style.selectedAddressTypeItem
                  : ""
              }`}
              btnClickFunction={() => setSelectedAddressType(item)}
            >
              {" "}
              {getText(item)}
            </Buttons>
          ))}
        </Box>
        <div className={style.formGroup}>
          <input
            className="floor"
            name="house"
            placeholder={getText("House-Flat-Number")}
            type="text"
            value={addressFieldInput.house}
            onChange={handleSetInput}
          />
          {addressFieldInput.errorHouse && (
            <span>{addressFieldInput.errorHouse}</span>
          )}
        </div>
        <div className={style.formGroup}>
          <input
            className="floor"
            name="society"
            placeholder={getText("Building-Society-Name")}
            type="text"
            value={addressFieldInput.society}
            onChange={handleSetInput}
          />
          {addressFieldInput.errorSociety && (
            <span>{addressFieldInput.errorSociety}</span>
          )}
        </div>
        <div className={style.formGroup}>
          <input
            className="floor"
            name="area"
            placeholder={getText("Area")}
            type="text"
            value={addressFieldInput.area}
            onChange={handleSetInput}
          />
          {addressFieldInput.errorArea && (
            <span>{addressFieldInput.errorArea}</span>
          )}
        </div>
        {!mapIsDragging ? (
          <div className={style.saveBtn}>
            <Buttons
              btnClass={`primary btn-half-rounded submit`}
              btnClickFunction={handleValidateAndSaveAddress}
            >
              {getText("Save-Address")}
            </Buttons>
          </div>
        ) : (
          <div className={style.saveBtnBlocked}>
            <Buttons btnClass={`primary btn-half-rounded submit`}>
              {getText("Save-Address")}
            </Buttons>
          </div>
        )}
      </Box>
      {isShowCartPopup && (
        <CartRemoveModal2
          onSuccess={handleValidateAndSaveAddress}
          handleSaveAddress={handleSaveAddress}
          selectedAddressType={selectedAddressType}
          addressFieldInput={`${addressFieldInput.house} ${addressFieldInput.society} ${addressFieldInput.area}`}
        />
      )}
    </>
  );
};

export default MapForm;
