import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import BreadCrumb from "@/components/Bread-crumb/BreadCrumb";
import PageWithBanner from "@/components/page-banner/page-with-banner";
import style from "./payment-index.module.scss";
import PaymentMethod from "@/components/cart/payment-method/payment-method";
import { Typography } from "@mui/material";
import Buttons from "@/components/Button/Buttons";
import BillDetails from "@/components/cart/bill-details/bill-details";
import { useAppSelector } from "@/hooks/use-app-selector";
import { useRouter } from "next/router";
import BoxTitle from "@/components/BoxTitle/Box-title";
import dynamic from "next/dynamic";
import NumberedTimeline from "@/components/timeline/timeline";
import {
  DeleteAppliedVoucherInLocalStorage,
  GetAppliedVoucherInLocalStorage,
  GetSelectedPaymentMethodInLocalStorage,
  SetSelectedPaymentMethodInLocalStorage,
} from "@/functions/local-storage-methods";
import Link from "next/link";
import ArrowLeft from "@/containers/svg-icons/arrow-left";
import { AddPromo, removePromo } from "@/redux/promo-code/slice";
import { useDispatch } from "react-redux";
import { setVoucherDiscount } from "@/redux/cart/actions";
import { useLanguage } from "@/language-context/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { GetTranslatedData } from "@/services/footer/services";
import Cookies from "js-cookie";
const GlobalModal = dynamic(() => import("@/components/global-modal/modal"));

interface IProps {}
export type paymentRadioObjProp = {
  id: number;
  key: string;
  value: string;
  isDefault?: boolean;
};

const PaymentIndex: React.FC<IProps> = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartData = useAppSelector((state) => state.cart);
  const { promoCode } = useAppSelector((state) => state.promoCode);
  const [selectPaymentPopup, setSelectPaymentPopup] = useState(false);
  const paymentMethodSelected = GetSelectedPaymentMethodInLocalStorage();
  const paymentMethodValue = JSON.parse(decodeURI(paymentMethodSelected));
  const appliedVoucher = GetAppliedVoucherInLocalStorage();
  const voucherInLocal = appliedVoucher ? decodeURI(appliedVoucher) : "";

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
  const paymentRadioObj: paymentRadioObjProp[] = [
    { id: 2, key: getText("Cash-On-Delivery"), value: "Cash On Delivery" },
    {
      id: 1,
      key: getText("Debit-Credit-Card"),
      value: "CreditCard",
      isDefault: true,
    },
  ];
  const [selectedOptionVal, setSelectedOptionVal] = useState<
    paymentRadioObjProp | {}
  >({});
  const checkSlecetedObj =
    selectedOptionVal !== null ? Object?.entries(selectedOptionVal) : "";

  useEffect(() => {
    if (voucherInLocal) {
      dispatch(AddPromo(voucherInLocal));
      setSelectedOptionVal(paymentMethodValue);
    }
  }, [voucherInLocal]);
  const handleCheckout2 = async () => {
    if (checkSlecetedObj?.length > 0) {
      const encodedItem = encodeURI(JSON.stringify(selectedOptionVal));
      SetSelectedPaymentMethodInLocalStorage(encodedItem);
      router.push("/checkout");
    }
  };

  const voucherApplyFunc = () => {
    if (Object.entries(selectedOptionVal)?.length > 0) {
      const encodedItem = encodeURI(JSON.stringify(selectedOptionVal));
      SetSelectedPaymentMethodInLocalStorage(encodedItem);
      router.push("/voucher");
    }
  };

  const handleVoucherRemoved = () => {
    DeleteAppliedVoucherInLocalStorage();
    // DeleteVoucherValue();
  };

  const handleRemovePromo2 = () => {
    dispatch(removePromo());
    dispatch(
      setVoucherDiscount({
        action: "remove",
        voucherCode: "",
        voucherDiscount: 0,
      })
    );
    handleVoucherRemoved();
  };

  useLayoutEffect(() => {
    if (cartData?.appliedPromo === "") {
      dispatch(removePromo());
    }
  }, [cartData?.appliedPromo]);

  useEffect(() => {
    if (promoCode !== null && promoCode !== "") {
      // Check if both selectedOptionVal and paymentMethodValue are not empty and not null
      if (
        selectedOptionVal &&
        paymentMethodValue &&
        Object.entries(selectedOptionVal).length > 0 &&
        Object.entries(paymentMethodValue).length > 0
      ) {
        // Check if the payment method has changed
        if (selectedOptionVal.id !== paymentMethodValue.id) {
          // Remove applied voucher if it exists
          handleRemovePromo2();
        }
      }
    }
  }, [selectedOptionVal, paymentMethodValue]);

  return (
    <>
      <PageWithBanner removeSideSpacing={style.cartPageCOntainer}>
        <div className={style.backButton}>
          <Link href={"/cart-2"}>
            <ArrowLeft />
          </Link>
          <BoxTitle classes={style.voucherHeading} boxTitle="Shopping Cart" />
        </div>
        <BreadCrumb
          FourthLink={getText("My-Cart")}
          secondLink={"/collection/medicine"}
          classes={`deal-breadcrumb ${style.cartBreadCrumb}`}
        />
        <NumberedTimeline activeStep={2} />
        <>
          {cartData.cartProducts.length > 0 ? (
            <>
              <div className={style.CartGridContainer}>
                <div className={style.cartLeft}>
                  <PaymentMethod
                    mCart={true}
                    selectedOptionVal={selectedOptionVal}
                    setSelectedOptionVal={setSelectedOptionVal}
                    paymentRadioObj={paymentRadioObj}
                  />
                  {promoCode === "" ? (
                    <Buttons
                      btnClickFunction={voucherApplyFunc}
                      btnClass={`primary btn-half-rounded ${
                        checkSlecetedObj?.length === 0 ? style.notSelected : ""
                      }`}
                    >
                      Apply a Voucher
                    </Buttons>
                  ) : (
                    <div className={style.voucherValue}>
                      <Typography>
                        {promoCode?.replace(/"/g, "")} VOUCHER APPLIED
                      </Typography>{" "}
                      <Buttons btnClickFunction={handleRemovePromo2}>
                        Remove
                      </Buttons>
                    </div>
                  )}
                  <BillDetails />
                </div>
                <div className={style.checkoutBtn}>
                  <Buttons
                    btnClickFunction={handleCheckout2}
                    types="button"
                    btnClass={`primary btn-half-rounded ${
                      checkSlecetedObj?.length === 0 ? style.notSelected : ""
                    }`}
                  >
                    Confirm Payment
                  </Buttons>
                </div>
              </div>
            </>
          ) : (
            <BoxTitle
              boxTitle={getText("Cart-is-Empty")}
              classes={style.noCart}
            />
          )}
        </>
      </PageWithBanner>
      <GlobalModal
        openSelector={selectPaymentPopup}
        closeFunc={() => setSelectPaymentPopup(false)}
      >
        <Typography sx={{ textAlign: "center", pb: 5, width: "100%" }}>
          Please select a{" "}
          <span style={{ fontWeight: 600 }}>payment method</span> to complete
          your purchase
        </Typography>
      </GlobalModal>
    </>
  );
};

export default PaymentIndex;
