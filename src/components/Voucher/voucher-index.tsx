import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import React from "react";

import style from "./voucher-index.module.scss";
import { useAppSelector } from "@/hooks/use-app-selector";
import { closeVoucher } from "@/redux/voucher-popup/slice";
import { useQuery } from "@tanstack/react-query";
import {
  GetCustomerTokenInCookiesStorage,
  GetCustomerTokenInLocalStorage,
} from "@/functions/local-storage-methods";
import { getCustomerVouchers } from "@/services/voucher/services";
import Cookies from "js-cookie";

import dynamic from "next/dynamic";
import { useLanguage } from "@/language-context/LanguageContext";
import { GetTranslatedData } from "@/services/footer/services";
const GlobalModal = dynamic(() => import("@/components/global-modal/modal"));
const TabPanel = dynamic(() => import("@/components/tabs/TabPanel"));
const VoucherContainer = dynamic(
  () => import("./voucher-container/Voucher-container")
);
const BoxTitle = dynamic(() => import("@/components/BoxTitle/Box-title"));

interface IProps {}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const getCurrentDate = () => {
  const today = new Date();
  return today.getTime();
};

const isDateBefore = (date: string) => {
  const targetDate = new Date(date);
  return getCurrentDate() < targetDate.getTime();
};

const isDateAfter = (date: string) => {
  const targetDate = new Date(date);
  return getCurrentDate() > targetDate.getTime();
};

const VoucherIndex: React.FC<IProps> = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState(0);
  const { openVoucherPopup } = useAppSelector((state) => state.Voucher);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { data } = useQuery(
    ["getCustomerVoucher"],
    async () => {
      const customerToken = GetCustomerTokenInLocalStorage();
      const customerTokenCookies: string =
        await GetCustomerTokenInCookiesStorage();

      return await getCustomerVouchers({
        token:
          customerToken !== null
            ? customerToken || customerTokenCookies
            : undefined,
      });
    },
    {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      retry: (failureCount, error) => {
        const token = Cookies.get("auth-token");
        return !token;
      },
      retryDelay: 0,

      staleTime: 600000, // 1 day
    }
  );
  const unused = data?.Data?.filter(
    (item) => item.isUsed === "False" && isDateBefore(item.EndDate)
  );
  const used = data?.Data?.filter((item) => item.isUsed === "True");
  const expired = data?.Data?.filter(
    (item) => item.isUsed === "False" && isDateAfter(item.EndDate)
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
    <GlobalModal
      openSelector={openVoucherPopup}
      closeFunc={() => dispatch(closeVoucher())}
      containerClass={style.addressModalContainer}
      contentClass={style.addressModalContent}
    >
      <BoxTitle boxTitle={getText("Vouchers")} />

      <Box
        className={`verticalTabs ${style.orderTabs}`}
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: 224,
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
          className={style.tabWrapper}
        >
          <Tab label={getText("Unused")} {...a11yProps(0)} />
          <Tab label={getText("Used")} {...a11yProps(1)} />
          <Tab label={getText("Expired")} {...a11yProps(2)} />
        </Tabs>
        <Box className={style.orderTabPanel}>
          <TabPanel classes={style.orderTabs} value={value} index={0}>
            {unused !== undefined && unused?.length > 0 ? (
              unused?.map((item, index) => (
                <VoucherContainer
                  unused={true}
                  key={index}
                  buttonColor="var(--primary-color)"
                  data={item}
                  type={value}
                />
              ))
            ) : (
              <>
                <Typography>{getText("Note-Vouchers-not-found")}</Typography>
                {/* <Typography sx={{ paddingLeft: "47px" }}>
                  You haven’t been given any vouchers yet
                </Typography> */}
              </>
            )}
          </TabPanel>
          <TabPanel classes={style.orderTabs} value={value} index={1}>
            {used !== undefined && used?.length > 0 ? (
              used?.map((item, index) => (
                <VoucherContainer
                  key={index}
                  buttonColor="var(--bg-color-darkest)"
                  data={item}
                  type={value}
                />
              ))
            ) : (
              <>
                <Typography>{getText("Note-Vouchers-not-found")}</Typography>
                {/* <Typography sx={{ paddingLeft: "47px" }}>
                  You haven’t been given any vouchers yet
                </Typography> */}
              </>
            )}
          </TabPanel>
          <TabPanel classes={style.orderTabs} value={value} index={2}>
            {expired !== undefined && expired?.length > 0 ? (
              expired?.map((item, index) => (
                <VoucherContainer
                  key={index}
                  buttonColor="var(--bg-color-darker)"
                  data={item}
                  type={value}
                />
              ))
            ) : (
              <>
                <Typography>{getText("Note-Vouchers-not-found")}</Typography>
                {/* <Typography sx={{ paddingLeft: "47px" }}>
                  You haven’t been given any vouchers yet
                </Typography> */}
              </>
            )}
          </TabPanel>
        </Box>
      </Box>
    </GlobalModal>
  );
};

export default VoucherIndex;
