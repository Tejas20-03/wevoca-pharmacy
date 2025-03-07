import TabPanel from "@/components/tabs/TabPanel";
import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import style from "./order-tabs.module.scss";
import OrderCardContainer from "@/containers/order/order-item-container/order-card-container";
import OrderCancelPopup from "@/components/order-cancel-popup/Order-cancel-popup";
import ProductReviewPopup from "@/components/product-review-popup/product-review-popup";
import { useLanguage } from "@/language-context/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { GetTranslatedData } from "@/services/footer/services";
import Cookies from "js-cookie";

interface IProps {}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const OrderTabs: React.FC<IProps> = () => {
  const [value, setValue] = React.useState(0);
  const [orderCanceled, setOrderCanceled] = React.useState(false);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const orderCancelledFunc = () => {
    setOrderCanceled(true);
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
        <Tab label={getText("All")} {...a11yProps(0)} />
        <Tab label={getText("Current")} {...a11yProps(1)} />
        <Tab label={getText("Completed")} {...a11yProps(2)} />
        <Tab label={getText("Cancelled")} {...a11yProps(3)} />
      </Tabs>
      <Box className={style.orderTabPanel}>
        <TabPanel classes={style.orderTabs} value={value} index={0}>
          <OrderCardContainer orderCanceled={orderCanceled} type={value} />
        </TabPanel>
        <TabPanel classes={style.orderTabs} value={value} index={1}>
          <OrderCardContainer orderCanceled={orderCanceled} type={value} />
        </TabPanel>
        <TabPanel classes={style.orderTabs} value={value} index={2}>
          <OrderCardContainer orderCanceled={orderCanceled} type={value} />
        </TabPanel>
        <TabPanel classes={style.orderTabs} value={value} index={3}>
          <OrderCardContainer orderCanceled={orderCanceled} type={value} />
        </TabPanel>
      </Box>
      <OrderCancelPopup orderCancelledFunc={orderCancelledFunc} />
      <ProductReviewPopup orderCancelledFunc={orderCancelledFunc} />
    </Box>
  );
};

export default OrderTabs;
