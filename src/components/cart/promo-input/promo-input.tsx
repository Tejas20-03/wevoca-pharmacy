import React, { useEffect, useLayoutEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { AddPromo, removePromo } from "@/redux/promo-code/slice";
import Buttons from "@/components/Button/Buttons";
import style from "./promo-input.module.scss";
import FormStyle from "@/components/Login/FormField.module.scss";
import CloseIcon from "@/components/Global-Icon/Close-icon";
import { setVoucherDiscount } from "@/redux/cart/actions";
import { CheckVoucherNew_ArgsType } from "@/services/voucher/types";
import { useAppSelector } from "@/hooks/use-app-selector";
import { PaymentType } from "@/services/checkout/types";
import { postCheckVoucherNew } from "@/services/voucher/services";
import { Typography } from "@mui/material";
import { Slide, toast } from "react-toastify";
import {
  GetCustomerTokenInCookiesStorage,
  GetCustomerTokenInLocalStorage,
  SetAppliedVoucherInLocalStorage,
} from "@/functions/local-storage-methods";
import { getCustomerCreditCard } from "@/services/credit-card/services";
import { useRouter } from "next/router";
import GlobalModal from "@/components/global-modal/modal";
import mixpanel from "mixpanel-browser";
import { useLanguage } from "@/language-context/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { GetTranslatedData } from "@/services/footer/services";
import Cookies from "js-cookie";

interface IProps {
  selectedOptionVal: boolean;
  appliedVoucherCart?: boolean;
  voucherInLocal?: string;
  onVoucherRemoved?: () => void;
  voucherScreen?: boolean;
  onlyVoucher?: boolean;
  appliedVoucherValue?: string;
  setLoadingVoucherCheck?: React.Dispatch<React.SetStateAction<boolean>>;
  checkoutScreen?: boolean;
}

const PromoInput: React.FC<IProps> = ({
  setLoadingVoucherCheck,
  appliedVoucherValue,
  onlyVoucher = false,
  voucherScreen = false,
  selectedOptionVal,
  appliedVoucherCart,
  voucherInLocal,
  onVoucherRemoved,
  checkoutScreen = false,
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { selected } = useAppSelector((state) => state.creditCard);
  const storeData = useAppSelector((state) => state.store);
  const userData = useAppSelector((state) => state.user);
  const cartData = useAppSelector((state) => state.cart);
  const { promoCode } = useAppSelector((state) => state.promoCode);
  const [isBankCodeApplied, setIsBankCodeApplied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");
  const [disableItem, setDisableItem] = useState(false);
  const [checkPopup, setCheckPopup] = useState(false);
  const promoCodeValue: { promoCode: string } = {
    promoCode: "",
  };
  const promoCodeSubmit = (value: { promoCode: string }) => {
    handleApplyPromo(input);
  };
  const promoCodeSubmit2 = (value: { promoCode: string }) => {
    handleApplyPromo(input);
  };
  useEffect(() => {
    if (promoCode) {
      handleApplyPromo(promoCode);
    }
  }, []);
  useLayoutEffect(() => {
    if (selected?.CardNumber !== null) {
      handleApplyPromo(selected?.CardNumber?.slice(0, 6), true);
    } else if (selected?.CardNumber === null && isBankCodeApplied) {
      handleRemovePromo();
    }
  }, [selected?.CardNumber]);

  useLayoutEffect(() => {
    if (!selectedOptionVal && isBankCodeApplied) handleRemovePromo2();
    if (selectedOptionVal) handleRemovePromo2();
  }, [selectedOptionVal]);

  useLayoutEffect(() => {
    const getCustomerCreditCardFunc = async () => {
      const customerTokenResponse = GetCustomerTokenInLocalStorage();
      const customerTokenCookies: string =
        await GetCustomerTokenInCookiesStorage();
      const response = await getCustomerCreditCard({
        token:
          customerTokenResponse !== null
            ? customerTokenResponse || customerTokenCookies
            : undefined,
      });
      if (response && response.ResponseType?.toString() === "1") {
        response.Data.map((item) => {
          if (input === item.CardNumber?.slice(0, 6)) {
            handleRemovePromo();
          }
        });
      }
    };
    if (selectedOptionVal) getCustomerCreditCardFunc();
  }, [selectedOptionVal]);

  //   useEffect(() => {
  //     const MedicineCat = cartData.cartProducts.filter((product) => product?.data?.Category?.toLowerCase() === "medicine");
  //     if (MedicineCat?.length === 0) handleRemovePromo();
  // }, [cartData.cartProducts]);

  const handleValidatePromo = async (voucherCode: string) => {
    console.log(
      "cartData.cartProducts =>",
      cartData.cartProducts.map((item) => ({
        ItemID: item.id.toString(),
        ProductName: item.data.Title,
        CategoryName: item.data.Category,
        Price: item.perStrip
          ? item?.data?.Variation?.[1]?.SalePrice
          : item.perStrip === false
          ? item?.data?.Variation?.[0]?.SalePrice
          : item?.data?.Price,
        Quantity: item.quanity.toString(),
        ItemImage: item.data.ProductImage,
        Type: item.perStrip
          ? item?.data?.Variation?.[1]?.Type
          : item.perStrip === false
          ? item?.data?.Variation?.[0]?.Type
          : item?.data?.Variations,
      }))
    );
    setCheckPopup(false);
    setLoadingVoucherCheck?.(true);
    const voucherData: CheckVoucherNew_ArgsType = {
      branchCode: storeData.selectedStoreCode,
      creditCardToken: selected?.Token || "",
      customerID: userData.userID,
      orderTotal: cartData.total.toString(),
      orderSubtotal: cartData.subTotal.toString(),
      voucherCode: voucherCode || "",
      paymentType: selectedOptionVal ? PaymentType.ONLINE : PaymentType.COD,
      orderdata: cartData.cartProducts.map((item) => ({
        ItemID: item.id.toString(),
        ProductName: item.data.Title,
        CategoryName: item.data.Category,
        Price: item.perStrip
          ? item?.data?.Variation?.[1]?.SalePrice
          : item.perStrip === false
          ? item?.data?.Variation?.[0]?.SalePrice
          : item?.data?.Price,
        Quantity: item.quanity.toString(),
        ItemImage: item.data.ProductImage,
        Type: item.perStrip
          ? item?.data?.Variation?.[1]?.Type
          : item.perStrip === false
          ? item?.data?.Variation?.[0]?.Type
          : item?.data?.Variations,
      })),
    };
    const customerToken = GetCustomerTokenInLocalStorage();
    const customerTokenCookies: string =
      await GetCustomerTokenInCookiesStorage();
    if (voucherCode) {
      const response = await postCheckVoucherNew(voucherData, {
        token:
          customerToken !== null
            ? customerToken || customerTokenCookies
            : undefined,
      });
      if (response) {
        if (response.isValid === false) {
          setError(response.message);
          localStorage.setItem("error", response?.message);
          setCheckPopup(true);
          setError2(response?.message);
          SetAppliedVoucherInLocalStorage("");
        } else if (response.isValid) {
          // mixpanel.track('promo_applied', {
          //   code: response?.voucherCode,
          //   value: Number(response.voucherAmount),
          //   type: response?.VoucherType,
          //   store_id: storeData?.selectedStoreID?.toString() || '32',
          // });
          if (typeof window !== "undefined") {
            // window?.webengage?.track('promo_applied', {
            //   code: response?.voucherCode,
            //   value: Number(response.voucherAmount),
            //   type: response?.VoucherType,
            //   store_id: storeData?.selectedStoreID?.toString() || '32',
            // });
          }
          dispatch(
            setVoucherDiscount({
              action: "add",
              voucherCode: response.voucherCode,
              voucherDiscount: Number(response.voucherAmount || "0"),
            })
          );
          setInput(response.voucherCode);
          setDisableItem(true);
          dispatch(AddPromo(response.voucherCode));
          if (voucherScreen) {
            setCheckPopup(false);
            setLoadingVoucherCheck?.(false);
            const encodedItem = encodeURI(JSON.stringify(response.voucherCode));
            SetAppliedVoucherInLocalStorage(encodedItem);
            setTimeout(() => {
              router.push("/payment");
            }, 2000);
          }
        } else {
          setCheckPopup(true);
          setError("Invalid Promo Entered!");
          setDisableItem(false);
        }
      }
    }
  };

  const handleRemovePromo = () => {
    dispatch(
      setVoucherDiscount({
        action: "remove",
        voucherCode: "",
        voucherDiscount: 0,
      })
    );
    setIsBankCodeApplied(true);
    setIsProcessing(false);
    setInput("");
    setError("");
    setDisableItem(false);
  };

  const handleRemovePromo2 = () => {
    dispatch(
      setVoucherDiscount({
        action: "remove",
        voucherCode: "",
        voucherDiscount: 0,
      })
    );
    setIsBankCodeApplied(true);
    setIsProcessing(false);
    setInput("");
    setError("");
    setError2("");
    setDisableItem(false);
    onVoucherRemoved?.();
  };

  const handleApplyPromo = async (
    voucherCode?: string,
    isBankCardAutoApply: boolean = false
  ) => {
    if (voucherCode === "") return;
    if (selectedOptionVal === undefined) return;
    if (voucherCode && selectedOptionVal === undefined) {
      toast("Please select a payment method before applying a voucher", {
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
    } else {
      if (voucherCode) {
        setIsBankCodeApplied(isBankCardAutoApply);
        setIsProcessing(true);
        setError("");
        await setTimeout(async () => {
          if (voucherCode === undefined || voucherCode === "")
            setError("Invalid Promo Entered!");
          else
            await handleValidatePromo(
              voucherCode?.replace(/"/g, "") || input?.replace(/"/g, "")
            );
          setIsProcessing(false);
          if (isBankCardAutoApply) setError("");
        }, 1000);
      }
    }
  };

  const handelChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  useLayoutEffect(() => {
    const applyingVoucher = async () => {
      if (voucherInLocal !== "null" || voucherInLocal !== "")
        await handleValidatePromo(voucherInLocal?.replace(/"/g, ""));
    };
    applyingVoucher();
  }, [voucherInLocal]);

  useEffect(() => {
    const applyingDecodedVoucher = async () => {
      if (appliedVoucherValue) {
        await handleValidatePromo(appliedVoucherValue?.replace(/"/g, ""));
      }
    };
    applyingDecodedVoucher();
  }, [appliedVoucherValue]);

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
      {checkoutScreen ? (
        ""
      ) : !checkoutScreen && !appliedVoucherCart && !voucherScreen ? (
        <>
          <Formik initialValues={promoCodeValue} onSubmit={promoCodeSubmit}>
            {() => (
              <Form
                className={`${FormStyle.Form} ${style.promoCodeForm} promo-code-form`}
              >
                <Field
                  name="promoCode"
                  disabled={disableItem}
                  value={input}
                  onChange={handelChangeEvent}
                  id="promoCode"
                  className="promoCODE"
                  placeholder={getText("Apply-Promo-Code")}
                />
                {cartData.appliedPromo === "" && (
                  <Buttons
                    types="submit"
                    btnClass={`primary btn-half-rounded ${style.apply}`}
                  >
                    {isProcessing ? "loading" : getText("Apply")}
                  </Buttons>
                )}
                {cartData.appliedPromo !== "" && (
                  <Buttons
                    btnClickFunction={handleRemovePromo}
                    types="button"
                    btnClass={style.cancelPromo}
                  >
                    <CloseIcon color="--primary-color" />
                  </Buttons>
                )}
              </Form>
            )}
          </Formik>
          <Typography
            variant="body2"
            component="p"
            className={style.errorMessage}
          >
            {error}
          </Typography>
        </>
      ) : !checkoutScreen && voucherScreen && !onlyVoucher ? (
        <>
          <Formik initialValues={promoCodeValue} onSubmit={promoCodeSubmit2}>
            {() => (
              <Form
                className={`${FormStyle.Form} ${style.promoCodeForm} ${style.promoCart2} promo-code-form`}
              >
                <Field
                  name="promoCode"
                  disabled={disableItem}
                  value={input}
                  onChange={handelChangeEvent}
                  id="promoCode"
                  className="promoCODE"
                  placeholder="Enter a voucher code"
                />
                <Typography
                  variant="body2"
                  component="p"
                  className={`${style.errorMessage2} ${
                    error ? style.errorMeesageAppear : ""
                  }`}
                >
                  {error}
                </Typography>
                {cartData.appliedPromo !== "" && (
                  <Buttons
                    btnClickFunction={handleRemovePromo2}
                    types="button"
                    btnClass={style.cancelPromo}
                  >
                    <CloseIcon color="--primary-color" />
                  </Buttons>
                )}
                <div style={{ textAlign: "center", width: "100%" }}>
                  {cartData.appliedPromo === "" ? (
                    <Buttons
                      types="submit"
                      btnClass={`primary btn-half-rounded ${style.apply}`}
                    >
                      {isProcessing ? "loading" : getText("Apply")}
                    </Buttons>
                  ) : (
                    <Buttons
                      types="submit"
                      btnClass={`primary btn-half-rounded ${style.apply}`}
                    >
                      Applied
                    </Buttons>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </>
      ) : (
        <>
          {!onlyVoucher && error === "" && (
            <div className={style.voucherValue}>
              <Typography>
                {voucherInLocal?.replace(/"/g, "")} VOUCHER APPLIED
              </Typography>{" "}
              <Buttons btnClickFunction={handleRemovePromo2}>Remove</Buttons>
            </div>
          )}
        </>
      )}
      {onlyVoucher && voucherScreen && appliedVoucherValue && (
        <GlobalModal
          openSelector={checkPopup}
          closeFunc={() => setCheckPopup(false)}
        >
          <Typography
            sx={{
              textAlign: "center",
              pb: 5,
              pt: 2,
              fontWeight: "600",
              width: "100%",
            }}
          >
            {error2}
          </Typography>
        </GlobalModal>
      )}
    </>
  );
};

export default PromoInput;
