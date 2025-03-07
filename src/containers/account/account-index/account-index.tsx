/* eslint-disable @typescript-eslint/no-empty-function */
import BreadCrumb from "@/components/Bread-crumb/BreadCrumb";
import Buttons from "@/components/Button/Buttons";
import CreditCardIcon from "@/components/Global-Icon/Credit-card-icon";
import EditIcon from "@/components/Global-Icon/Edit-icon";
import LocationIcon from "@/components/Global-Icon/Location-icon";
import TimerIcon from "@/components/Global-Icon/Timer-Icon";
import VoucherIcon from "@/components/Global-Icon/voucher";
import PageWithBanner from "@/components/page-banner/page-with-banner";
import { Box, Grid, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import React, { useState } from "react";
import style from "./account-index.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import { useAppSelector } from "@/hooks/use-app-selector";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import Router from "next/router";
import { logoutUser } from "@/redux/user/actions";
import { openVoucher } from "@/redux/voucher-popup/slice";
import Link from "next/link";
import { openAddressPopup, showSelectedTab } from "@/redux/address-popup/slice";
import { openSavedCard } from "@/redux/saved-card/slice";
import { changeLoginScreen } from "@/redux/Login-popup/slice";
import { DeleteCustomerTokenInLocalstorage } from "@/functions/local-storage-methods";
import dynamic from "next/dynamic";
import { emptyCart } from "@/redux/cart/actions";
import mixpanel from "mixpanel-browser";
import { GetTranslatedData } from "@/services/footer/services";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useLanguage } from "@/language-context/LanguageContext";
const DatePicker = dynamic(() => import("react-datepicker"));
const SavedCardIndex = dynamic(
  () => import("@/components/saved-card-popup/saved-card-index")
);
const VoucherIndex = dynamic(
  () => import("@/components/Voucher/voucher-index")
);
const SelectMenu = dynamic(() => import("@/components/Select-Menu/selectMenu"));

interface IProps {}

interface initialValue {
  email: string;
  birthday: string;
  gender: string;
}

const AccountIndex: React.FC<IProps> = () => {
  const { language } = useLanguage();
  const addressData = useAppSelector((state) => state.addresses);
  const { openSavedCardPopup } = useAppSelector((state) => state.savedCard);
  const { openVoucherPopup } = useAppSelector((state) => state.Voucher);
  const { userName, email, phoneNum } = useAppSelector((state) => state.user);
  const [userEmail, setUserEmail] = useState({
    email,
  });
  const [startDate, setStartDate] = useState(new Date());
  const dispatch = useAppDispatch();

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

  const initailValue: initialValue = {
    email: "",
    birthday: "",
    gender: "",
  };

  const gender = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  const handleOpenAddress = () => {
    dispatch(openAddressPopup());
    if (addressData.addresses?.length > 0) {
      dispatch(showSelectedTab());
    }
  };

  const handleLogout = () => {
    DeleteCustomerTokenInLocalstorage();
    dispatch(emptyCart({}));
    dispatch(logoutUser({}));
    dispatch(changeLoginScreen(false));
    Router.push("/");
    // mixpanel.reset();
  };

  return (
    <PageWithBanner removeSideSpacing={style.pageContainer}>
      <BreadCrumb
        FourthLink={getText("User-Profile")}
        classes="deal-breadcrumb"
      />
      <Grid container className={style.accountContainer}>
        <Grid
          item
          sm={12}
          md={7}
          lg={7}
          pr={{ md: 3 }}
          className={style.accountSec1}
        >
          <Typography variant="h4" component="h1">
            {userName}
          </Typography>
          <Box className={style.addressBox}>
            <Typography variant="body1" component="p">
              +92 {phoneNum.slice(1)}
            </Typography>
            <Buttons btnClass="primary btn-rounded">
              {getText("Verified")}
            </Buttons>
          </Box>
          <ul>
            <li>
              <Link prefetch={false} href={`/orders`}>
                <div>
                  <TimerIcon color={"--primary-color-darker"} />
                </div>
                <Typography>{getText("Order-History")}</Typography>
              </Link>
            </li>
            <li>
              <Link
                prefetch={false}
                href={""}
                onClick={() => dispatch(openSavedCard())}
              >
                <div>
                  <CreditCardIcon color={"--primary-color-darker"} />
                </div>
                <Typography>{getText("Saved-Cards")}</Typography>
              </Link>
            </li>
            <li>
              <Link
                prefetch={false}
                href={""}
                onClick={() => handleOpenAddress()}
              >
                <div>
                  <LocationIcon color={"--primary-color-darker"} />
                </div>
                <Typography>{getText("Delivery-Address")}</Typography>
              </Link>
            </li>
            <li>
              <Link
                prefetch={false}
                href={""}
                onClick={() => dispatch(openVoucher())}
              >
                <div>
                  <VoucherIcon color={"--primary-color-darker"} />
                </div>
                <Typography>{getText("My-Vouchers")}</Typography>
              </Link>
            </li>
          </ul>
        </Grid>
      </Grid>
      <Formik initialValues={initailValue} onSubmit={() => {}}>
        {() => (
          <Form className={style.accountForm}>
            <Box className={style.formGroup}>
              <label htmlFor="email">{getText("Email")}</label>
              <Box>
                <Field
                  className={style.fieldStyle}
                  type="email"
                  placeholder={getText("Email")}
                  id="email"
                  name="email"
                  value={userEmail.email}
                  onChange={(e: { target: { value: string } }) =>
                    setUserEmail((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
                <Buttons>
                  <EditIcon color="--primary-color-darker" />
                </Buttons>
              </Box>
            </Box>
            <Box className={style.formGroup}>
              <label htmlFor="Birthday">{getText("Birthday")}</label>
              <Box>
                <DatePicker
                  className={style.fieldStyle}
                  selected={startDate}
                  onChange={(date: Date) => setStartDate(date)}
                />
                <Buttons>
                  <EditIcon color="--primary-color-darker" />
                </Buttons>
              </Box>
            </Box>
            <Box className={style.formGroup}>
              <label htmlFor="gender">{getText("Gender")}</label>
              <div className="selectBox">
                <SelectMenu
                  id="gender"
                  name="gender"
                  option={gender}
                  placeholder={getText("Gender")}
                />
              </div>
            </Box>
          </Form>
        )}
      </Formik>
      <div className={style.logoutBtnContainer}>
        <Buttons
          btnClass={`primary btn-half-rounded ${style.logoutBtn}`}
          btnClickFunction={handleLogout}
        >
          {getText("Logout")}
        </Buttons>
      </div>
      {openVoucherPopup && <VoucherIndex />}
      {openSavedCardPopup && <SavedCardIndex />}
    </PageWithBanner>
  );
};

export default AccountIndex;
