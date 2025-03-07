import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { Box, Typography } from "@mui/material";

import React from "react";
import style from "./saved-card-index.module.scss";
import { useAppSelector } from "@/hooks/use-app-selector";
import BoxTitle from "@/components/BoxTitle/Box-title";
import SavedCardContainer from "./saved-container/saved-container";
import { closeSavedCard } from "@/redux/saved-card/slice";
import {
  GetCustomerTokenInCookiesStorage,
  GetCustomerTokenInLocalStorage,
} from "@/functions/local-storage-methods";
import { getCustomerCreditCard } from "@/services/credit-card/services";

import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/language-context/LanguageContext";
import { GetTranslatedData } from "@/services/footer/services";
import Cookies from "js-cookie";
const GlobalModal = dynamic(() => import("@/components/global-modal/modal"));

interface IProps {}

const SavedCardIndex: React.FC<IProps> = () => {
  // const [data, setData] = useState<CreditCardApiDataType[]>([]);
  const dispatch = useAppDispatch();
  const { openSavedCardPopup } = useAppSelector((state) => state.savedCard);
  const { data, refetch } = useQuery(["savedCreditCard"], async () => {
    const customerToken = await GetCustomerTokenInLocalStorage();
    const customerTokenCookies: string =
      await GetCustomerTokenInCookiesStorage();
    return await getCustomerCreditCard({
      token:
        customerToken !== null
          ? customerToken || customerTokenCookies
          : undefined,
    });
  });
  const cardData = data?.Data?.map((data, index) => {
    return <SavedCardContainer refetch={refetch} data={data} key={index} />;
  });
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
    <GlobalModal
      openSelector={openSavedCardPopup}
      closeFunc={() => dispatch(closeSavedCard())}
      containerClass={style.voucherPopupContainer}
      contentClass={style.voucherPopupContainerContent}
    >
      <BoxTitle boxTitle={getText("Select-Saved-Card")} />
      <Box className={style.voucherAllContent}>
        <Box className={style.savedCardContainer}>{cardData}</Box>
        <Typography>
          {getText("Note-You-can-add-new-card")}
        </Typography>
      </Box>
    </GlobalModal>
  );
};

export default SavedCardIndex;
