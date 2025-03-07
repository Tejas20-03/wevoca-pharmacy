import CartAndUserContainer from "@/components/Cart-n-User/Cart-and-user-container";
import SearchComp from "@/components/Search/Search";
import React, { useEffect, useMemo, useState } from "react";
import LogoSec from "@/containers/header/header-index/Logo-sec";
import style from "./header-mobile.module.scss";
import { openSidebarToggle } from "@/redux/sidebar-toggle/slice";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import Image from "next/image";
import { useEstimateTime } from "@/hooks/use-estimate-time";
import { useRouter } from "next/router";
import { useLanguage } from "@/language-context/LanguageContext";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { GetTranslatedData } from "@/services/footer/services";
import Cookies from "js-cookie";

interface IProps {
  windowWidth: number;
}

const HeaderMobile: React.FC<IProps> = ({ windowWidth }) => {
  const router = useRouter();
  const split = router.asPath.split("/");
  const { pathname } = router;
  const showHeader =
    pathname === "/" ||
    pathname.includes("/cat/") ||
    pathname.includes("/p/") ||
    pathname.includes("/col/") ||
    pathname.includes("/categories") ||
    pathname.includes("/search") ||
    pathname.includes("/atozmedicine");
  // Initialize state for pageName
  const [pageName, setPageName] = useState("");

  useEffect(() => {
    if (split.length > 2 && split[2] !== "") {
      const pageNameWithParams = split[2].split("?")[0];
      const updatedPageName = pageNameWithParams.split("?")[0];
      setPageName(updatedPageName); // Set the pageName state
    } else {
      setPageName("");
    }
  }, [split]);

  // Pass the pageName to useEstimateTime hook
  const { headerEstimateTimeText } = useEstimateTime(pageName, router);

  const dispatch = useAppDispatch();
  const [sticky, setSticky] = useState("");
  const isSticky = () => {
    const scrollTop = window.scrollY;
    const stickyClass = scrollTop >= 100 ? `${style.isSticky} sticky` : "";
    setSticky(stickyClass);
  };
  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => window.removeEventListener("scroll", isSticky);
  }, []);
  const { language, setLanguage } = useLanguage();
  const classes = useMemo(
    () => `${style.headerResponsive} ${sticky}`,
    [sticky]
  );

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
  };

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
    <header className={classes}>
      <div className={style.headerMenu}>
        <button onClick={() => dispatch(openSidebarToggle())}>
          <Image
            src="/assets/hamburger-icon.svg"
            alt="hamburger icon"
            width={23}
            height={15}
          />
        </button>
        <LogoSec style={style.logoSmall} windowWidth={windowWidth} />
      </div>
      <div className={style.languageToggle}>
        <button
          className={`${style.langBtn} ${
            language === "en" ? style.active : ""
          }`}
          onClick={() => setLanguage("en")}
        >
          EN
        </button>
        <button
          className={`${style.langBtn} ${
            language === "ar" ? style.active : ""
          }`}
          onClick={() => setLanguage("ar")}
        >
          عربي
        </button>
      </div>
      <div className={style.deliveryTime}>
        <p>
          {getText("Delivers-In")}
          {/* <span>{headerEstimateTimeText}</span> */}
        </p>
      </div>
      {showHeader && <SearchComp />}
      <CartAndUserContainer />
    </header>
  );
};

export default HeaderMobile;
