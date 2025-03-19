import {
  Container,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import style from "./header-desktop.module.scss";
import CartAndUserContainer from "@/components/Cart-n-User/Cart-and-user-container";
import SearchComp from "@/components/Search/Search";
import AddressInput from "@/components/Address/Address-bar-container";
import Buttons from "@/components/Button/Buttons";
import PrescriptionIcon from "@/containers/svg-icons/prescription-icon";
import Router from "next/router";
import CategoryMenu from "./category-menu/category-menu";
import LogoSec2 from "@/containers/header/header-index/Logo-sec2";
import mixpanel from "mixpanel-browser";
import { useLanguage } from "@/language-context/LanguageContext";
import { GetTranslatedData } from "@/services/footer/services";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import HomeSectionTitle from "@/containers/home/common/home-section-title/home-section-title";

interface IProps {
  windowWidth: number;
  setAddNewAddressVal: React.Dispatch<React.SetStateAction<boolean>>;
  setAddressBarClicked: React.Dispatch<React.SetStateAction<boolean>>;
  addNewAddressVal: boolean;
  categoryMenuResponse: any[][];
}

const HeaderDesktop: React.FC<IProps> = ({
  windowWidth,
  categoryMenuResponse,
  setAddNewAddressVal,
  setAddressBarClicked,
}) => {
  const [sticky, setSticky] = useState("");
  const { language, setLanguage } = useLanguage();
  const isSticky = () => {
    const scrollTop = window.scrollY;
    const stickyClass = scrollTop >= 100 ? `${style.isSticky} sticky` : "";
    setSticky(stickyClass);
  };

  const { isLoading, error, data, refetch } = useQuery(
    ["header-desktop"],
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

  const getText = (value: string) => {
    const item = translatedData.find((item: any) => item.Value === value);
    return language === "ar" ? item?.Arabic : item?.English;
  };

  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => window.removeEventListener("scroll", isSticky);
  }, []);

  const classes = useMemo(() => `${style.header} ${sticky}`, [sticky]);
  const instantOrderFunc = () => {
    Router.push("/prescription");
    // mixpanel.track('instant_order_clicked');

    if (typeof window !== "undefined") {
      // window?.webengage?.track('instant_order_clicked');
    }
  };

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
  };

  return (
    <header className={classes}>
      <Container>
        <Grid container spacing={2}>
          <Grid
            item
            xs={4}
            sm={3}
            md={2}
            xl={2}
            lg={2}
            sx={{ paddingTop: "0 !important" }}
          >
            {/* <LogoSec2 style={style.logo} windowWidth={windowWidth} /> */}
            <HomeSectionTitle color="var(--bg-color)" title={"wevoca"} />
          </Grid>
          <Grid
            item
            xs={8}
            sm={9}
            md={10}
            xl={10}
            lg={10}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              paddingTop: "0 !important",
            }}
          >
            <SearchComp />
            <AddressInput
              setAddressBarClicked={setAddressBarClicked}
              setAddNewAddressVal={setAddNewAddressVal}
            />
            <Buttons
              btnClickFunction={instantOrderFunc}
              btnClass={`primary btn-half-rounded ${style.instantOrder} secondary-font`}
            >
              <PrescriptionIcon color="var(--text-color)" />{" "}
              {getText("Instant-Order")}
            </Buttons>
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
            <CartAndUserContainer />
          </Grid>
        </Grid>
        <ul className={style.categoryMenu}>
          {categoryMenuResponse?.length > 0
            ? categoryMenuResponse.map((menuItems, index) => (
                <React.Fragment key={index}>
                  <>
                    {menuItems?.length > 0 &&
                      menuItems.map((item, index) => (
                        <CategoryMenu key={index} item={item} />
                      ))}
                  </>
                </React.Fragment>
              ))
            : ""}
        </ul>
      </Container>
    </header>
  );
};

export default HeaderDesktop;
