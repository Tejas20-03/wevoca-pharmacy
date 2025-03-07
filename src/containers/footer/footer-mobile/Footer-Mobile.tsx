import style from "./Footer-Mobile.module.scss";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "@/hooks/use-app-selector";
import dynamic from "next/dynamic";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { ChatIndex } from "@/components/chat-index/chat-index";
import { useLanguage } from "@/language-context/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { GetTranslatedData } from "@/services/footer/services";
import Cookies from "js-cookie";
const AppBarHomeIcon = dynamic(
  () => import("@/components/Global-Icon/Home-icon")
);
const AppBarPrescriptionIcon = dynamic(
  () => import("@/components/Global-Icon/Prescription-icon")
);
const AppBarUserIcon = dynamic(
  () => import("@/components/Global-Icon/user-icon")
);
const AppBarCartIcon = dynamic(
  () => import("@/components/Global-Icon/AppBarCartIcon")
);
const CartQuantityNum = dynamic(
  () => import("@/components/cart/cart-quantity-num/cart-quantity-num")
);
const TalkToPharmacist = dynamic(
  () => import("@/containers/svg-icons/talk-to-pharmacist")
);
const Buttons = dynamic(() => import("@/components/Button/Buttons"));
const GlobalModal = dynamic(() => import("@/components/global-modal/modal"));
const CategoryIcon = dynamic(
  () => import("@/containers/svg-icons/category-icon")
);

interface IProps {
  handleAccount: () => void;
}

const FooterMobile: React.FC<IProps> = ({ handleAccount }) => {
  const cart = useAppSelector((state) => state.cart);
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const { width: windowWidth } = useWindowDimensions();

  const currentRoute = router.pathname;
  const callDoctor = () => {
    setIsOpen(true);
    setTimeout(() => {
      handleOnClose();
    }, 1500);
  };
  const handleOnClose = () => {
    setIsOpen(false);
    window.open("tel:+9221111138246");
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
      <footer className={style.footerBar}>
        {/* <ChatIndex className={style.chat} /> */}
        <AppBar position="fixed" sx={{ top: "auto", bottom: 0 }}>
          <Toolbar className={style.footerToolbar}>
            <Link prefetch={false} href="/">
              <IconButton
                color="inherit"
                className={currentRoute === "/" ? style.active : ""}
              >
                <AppBarHomeIcon
                  color={
                    currentRoute === "/"
                      ? "--primary-color"
                      : "--bg-color-darker"
                  }
                />
                <p className={currentRoute === "/" ? style.paraActive : ""}>
                  {getText("Home")}
                </p>
              </IconButton>
            </Link>
            <Link prefetch={false} href="/categories">
              <IconButton
                color="inherit"
                className={currentRoute === "/categories" ? style.active : ""}
              >
                <CategoryIcon
                  color={
                    currentRoute === "/categories"
                      ? "--primary-color"
                      : "--bg-color-darker"
                  }
                />
                <p
                  className={
                    currentRoute === "/categories" ? style.paraActive : ""
                  }
                >
                  {getText("Categories")}
                </p>
              </IconButton>
            </Link>
            <Link prefetch={false} href="/cart-2">
              <div
                className={`${style.footerCart} ${
                  cart.cartProducts?.length ? style.footerQuantity : ""
                }`}
              >
                <AppBarCartIcon />
                <CartQuantityNum
                  classes={cart.cartProducts?.length ? style.cartQnt : ""}
                  quantity={cart.cartProducts?.length}
                />
              </div>
            </Link>
            <Link prefetch={false} href="/prescription">
              <IconButton
                color="inherit"
                className={currentRoute === "/prescription" ? style.active : ""}
              >
                <AppBarPrescriptionIcon
                  color={
                    currentRoute === "/prescription"
                      ? "--primary-color"
                      : "--bg-color-darker"
                  }
                />
                <p
                  className={
                    currentRoute === "/prescription" ? style.paraActive : ""
                  }
                >
                  {getText("Prescription")}
                </p>
              </IconButton>
            </Link>
            <Link prefetch={false} href="#" onClick={handleAccount}>
              <IconButton
                color="inherit"
                className={currentRoute === "/account" ? style.active : ""}
              >
                <AppBarUserIcon
                  color={
                    currentRoute === "/account"
                      ? "--primary-color"
                      : "--bg-color-darker"
                  }
                />
                <p
                  className={
                    currentRoute === "/account" ? style.paraActive : ""
                  }
                >
                  {getText("User")}
                </p>
              </IconButton>
            </Link>
          </Toolbar>
        </AppBar>
      </footer>
      <GlobalModal
        openSelector={isOpen}
        closeFunc={() => setIsOpen(false)}
        containerClass={style.cartContainer}
        contentClass={style.cartContainerContent}
        modalBoxClass={style.cartBoxContainer}
      >
        <Box className={style.gridBox}>
          <Typography sx={{ mb: 4 }}>Talk to Pharmacist</Typography>
          <Typography
            sx={{
              fontSize: "20px",
              color: "var(--primary-color)",
              lineHeight: 1.2,
              mb: 3,
            }}
          >
            Your phone call will be to TEMP Pharmacist.
          </Typography>
        </Box>
      </GlobalModal>
    </>
  );
};

export default FooterMobile;
