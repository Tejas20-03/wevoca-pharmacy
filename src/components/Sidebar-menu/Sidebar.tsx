import {
  BLOG_PAGE_URL,
  BRANDS_PAGE_URL,
  DEALS_PAGE_URL,
  FAQ_PAGE_URL,
  FEEDBACK_PAGE_URL,
  ORDER_PAGE_URL,
  PRIVACY_POLICY_PAGE_URL,
  REFUND_POLICY_PAGE_URL,
  RETURN_POLICY_PAGE_URL,
  SHIPPING_POLICY_PAGE_URL,
  STORES_PAGE_URL,
  TERMS_AND_CONDITIONS_PAGE_URL,
} from "@/Constants/constants";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { openAddressPopup } from "@/redux/address-popup/slice";
import { closeSidebarToggle } from "@/redux/sidebar-toggle/slice";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Style from "./Sidebar.module.scss";
import Router from "next/router";
import { DeleteCustomerTokenInLocalstorage } from "@/functions/local-storage-methods";
import { logoutUser } from "@/redux/user/actions";
import { changeLoginScreen } from "@/redux/Login-popup/slice";
import Buttons from "@/components/Button/Buttons";
import mixpanel from "mixpanel-browser";
import { useQuery } from "@tanstack/react-query";
import { GetTranslatedData } from "@/services/footer/services";
import Cookies from "js-cookie";
import { useLanguage } from "@/language-context/LanguageContext";

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { openSidebar } = useAppSelector((state) => state.sidebarToggle);
  const { isLoggedIn, userName } = useAppSelector((state) => state.user);

  const handleOpenAddress = () => {
    dispatch(closeSidebarToggle());
    dispatch(openAddressPopup());
  };

  const { isLoading, error, data, refetch } = useQuery(
    ["sidebar"],
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


  const handleLogout = () => {
    DeleteCustomerTokenInLocalstorage();
    dispatch(logoutUser({}));
    dispatch(changeLoginScreen(false));
    Router.push("/");
    // mixpanel.reset();
  };

  return (
    <>
      <Box
        className={`${Style.sidebarBox} ${
          openSidebar ? Style.sidebarBoxActive : ""
        }`}
      >
        <div className={Style.sidebarHeader}>
          <Image
            // src="/assets/dvago-white-logo.svg"
            src="/assets/favicon.png"
            alt="WeVoca Logo"
            width={80}
            height={48}
          />
          {userName && <Typography paragraph={true}>{userName}</Typography>}
        </div>
        <div className={Style.sidebarContent}>
          <ul>
            <li>
              <Link
                prefetch={false}
                onClick={() => dispatch(closeSidebarToggle())}
                href={{ pathname: DEALS_PAGE_URL() }}
              >
                {getText("Deals")}
              </Link>
            </li>
            <li>
              <Link
                prefetch={false}
                onClick={() => dispatch(closeSidebarToggle())}
                href={{ pathname: FEEDBACK_PAGE_URL() }}
              >
                {getText("Feedback")}
              </Link>
            </li>
            <li>
              <Link
                prefetch={false}
                onClick={() => dispatch(closeSidebarToggle())}
                href={{ pathname: STORES_PAGE_URL() }}
              >
                {getText("Stores")}
              </Link>
            </li>
            {isLoggedIn && (
              <li>
                <Link
                  prefetch={false}
                  onClick={() => dispatch(closeSidebarToggle())}
                  href={{ pathname: ORDER_PAGE_URL() }}
                >
                  {getText("My-Orders")}
                </Link>
              </li>
            )}

            <li>
              <Link
                prefetch={false}
                onClick={() => {
                  dispatch(closeSidebarToggle());
                  handleOpenAddress();
                }}
                href=""
              >
                {getText("Address")}
              </Link>
            </li>

            <li>
              <Link
                prefetch={false}
                onClick={() => dispatch(closeSidebarToggle())}
                href={{ pathname: FAQ_PAGE_URL() }}
              >
                {getText("FAQs")}
              </Link>
            </li>
            <li>
              <Link
                prefetch={false}
                onClick={() => dispatch(closeSidebarToggle())}
                href={{ pathname: BLOG_PAGE_URL() }}
              >
                {getText("Blogs")}
              </Link>
            </li>
            <li>
              <Link
                prefetch={false}
                onClick={() => dispatch(closeSidebarToggle())}
                href={{ pathname: BRANDS_PAGE_URL() }}
              >
                {getText("Brands")}
              </Link>
            </li>
            <li>
              <Link
                prefetch={false}
                onClick={() => dispatch(closeSidebarToggle())}
                href={{ pathname: PRIVACY_POLICY_PAGE_URL() }}
              >
                {getText("Privacy-Policy")}
              </Link>
            </li>
            <li>
              <Link
                prefetch={false}
                onClick={() => dispatch(closeSidebarToggle())}
                href={{ pathname: TERMS_AND_CONDITIONS_PAGE_URL() }}
              >
                {getText("Terms-Of-Service")}
              </Link>
            </li>
            <li>
              <Link
                prefetch={false}
                onClick={() => dispatch(closeSidebarToggle())}
                href={{ pathname: RETURN_POLICY_PAGE_URL() }}
              >
                {getText("Return-Policy")}
              </Link>
            </li>
            <li>
              <Link
                prefetch={false}
                onClick={() => dispatch(closeSidebarToggle())}
                href={{ pathname: REFUND_POLICY_PAGE_URL() }}
              >
                {getText("Refund-Policy")}
              </Link>
            </li>
            <li>
              <Link
                prefetch={false}
                onClick={() => dispatch(closeSidebarToggle())}
                href={{ pathname: SHIPPING_POLICY_PAGE_URL() }}
              >
                {getText("Shipping-Policy")}
              </Link>
            </li>
            <li>
              <Link
                prefetch={false}
                target="_blank"
                // href="https://decibel-careerportal-1334.mydecibel.com/#/"
                href="/"
              >
                {getText("Careers")}
              </Link>
            </li>
          </ul>

          <div className={Style.logoutBtnWrapper}>
            {isLoggedIn && (
              <Buttons
                btnClass={`primary btn-half-rounded ${Style.logoutBtn}`}
                btnClickFunction={handleLogout}
              >
                {getText("Logout")}
              </Buttons>
            )}
          </div>
        </div>
      </Box>
      <div
        className={`${Style.overlap} ${openSidebar ? Style.overlapActive : ""}`}
        onClick={() => dispatch(closeSidebarToggle())}
      ></div>
    </>
  );
};

export default Sidebar;
