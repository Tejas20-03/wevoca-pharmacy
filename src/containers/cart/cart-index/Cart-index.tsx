import React, { useEffect, useMemo, useState } from "react";
import BreadCrumb from "@/components/Bread-crumb/BreadCrumb";
import PageWithBanner from "@/components/page-banner/page-with-banner";
import style from "./cart-index.module.scss";

import FormStyle from "@/components/Login/FormField.module.scss";
import promoStyle from "@/components/cart/promo-input/promo-input.module.scss";

import DeliveryAddress from "@/components/cart/delivery-address/delivery-address";
import PaymentMethod from "@/components/cart/payment-method/payment-method";
import DeliveryInstruction from "@/components/cart/delivery-instruction/delivery-instruction";
import { Box, Typography } from "@mui/material";
import PromoInput from "@/components/cart/promo-input/promo-input";
import Buttons from "@/components/Button/Buttons";
import CartContainer from "@/components/cart/cart-container/cart-container";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import SingleCart from "@/components/cart/cart-container/single-cart/single-cart";
import BillDetails from "@/components/cart/bill-details/bill-details";
import {
  getCartBannerMobile,
  getCartBannerWeb,
  postProcessOrder,
} from "@/services/checkout/services";
import { useAppSelector } from "@/hooks/use-app-selector";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import {
  emptyCart,
  updateCartWithRespectToProductsAvailableQty,
} from "@/redux/cart/actions";
import { useRouter } from "next/router";
import { openLoginPopup } from "@/redux/Login-popup/slice";
import { openAddressPopup } from "@/redux/address-popup/slice";
import {
  BannerResponseData,
  PaymentType,
  BannerResponse,
} from "@/services/checkout/types";
import BoxTitle from "@/components/BoxTitle/Box-title";
import EditIcon from "@/components/Global-Icon/Edit-icon";
import * as fbq from "@/utils/fpixel";
import * as gtag from "@/utils/googleEvents";
import {
  GetCustomerTokenInCookiesStorage,
  GetCustomerTokenInLocalStorage,
} from "@/functions/local-storage-methods";
import { useEstimateTime } from "@/hooks/use-estimate-time";
import CartPageBanner from "@/components/page-banner/cart-page-banner";
import { Slide, toast } from "react-toastify";
import dynamic from "next/dynamic";
import CartBoxContainer from "@/components/cart/cart-box-container/cart-box-container";
import { Field, Form, Formik } from "formik";
import { openSavedCard } from "@/redux/saved-card/slice";
import mixpanel from "mixpanel-browser";
import { getGA4ClientId } from "@/functions/ga4-clientId";
import { useLanguage } from "@/language-context/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { GetTranslatedData } from "@/services/footer/services";
const GlobalModal = dynamic(() => import("@/components/global-modal/modal"));

interface IProps {}
export type paymentRadioObjProp = {
  id: number;
  key: string;
  value: string;
  isDefault?: boolean;
};

const CartIndex: React.FC<IProps> = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { width: windowWidth } = useWindowDimensions();
  const cartData = useAppSelector((state) => state.cart);
  const userData = useAppSelector((state) => state.user);
  const addressesData = useAppSelector((state) => state.addresses);
  const creditCardData = useAppSelector((state) => state.creditCard);
  const storeData = useAppSelector((state) => state.store);
  const [prescriptionImgData, setPrescriptionImgData] = useState<Asset | null>(
    null
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectPaymentPopup, setSelectPaymentPopup] = useState(false);
  const [webBannerURL, setWebBannerURL] = useState([] as BannerResponseData[]);
  const [MsiteBannerURL, setMsiteBannerURL] = useState(
    [] as BannerResponseData[]
  );
  const [deliveryInstructionVal, setDeliveryInstructionVal] =
    useState<string>("");
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const [
    isCartDataUpdatedToLatestInventory,
    setIsCartDataUpdatedToLatestInventory,
  ] = useState(false);

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
    { id: 1, key: getText("Debit-Credit-Card"), value: "CreditCard", isDefault: true },
  ];
  // Initialize selectedOptionVal with the first item of paymentRadioObj, or an empty object if it's empty
  const [selectedOptionVal, setSelectedOptionVal] = useState<
    paymentRadioObjProp | []
  >([]);
  const afterDiscount = useMemo(
    () =>
      (
        cartData.subTotal -
        (cartData.appliedPromo !== ""
          ? cartData.appliedPromoDiscount
          : cartData.discount)
      ).toFixed(2),
    [
      cartData.subTotal,
      cartData.appliedPromo,
      cartData.appliedPromoDiscount,
      cartData.discount,
    ]
  );
  const { estimateTimeTextForCart, bool } = useEstimateTime(
    cartData?.cartProducts[0]?.data?.Category
  );
  const isPrescriptionRequired = useMemo(() => {
    const prescriptionRequiredProducts = cartData.cartProducts.find(
      (item) => item?.data?.PrescriptionRequired === "True"
    );
    return Boolean(prescriptionRequiredProducts !== undefined);
  }, [cartData.cartProducts]);
  useEffect(() => {
    const cartPgBanner = async () => {
      const cartWebBannerResponse: BannerResponse | undefined =
        await getCartBannerWeb({ token: "" });
      if (cartWebBannerResponse?.ResponseType === 1) {
        setWebBannerURL(cartWebBannerResponse.Data);
      }
      const cartMobileBannerResponse: BannerResponse | undefined =
        await getCartBannerMobile({ token: "" });
      if (cartMobileBannerResponse?.ResponseType === 1) {
        setMsiteBannerURL(cartMobileBannerResponse.Data);
      }
    };
    cartPgBanner();
  }, []);

  const handleSetPrescriptionImageData = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = e.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];
    setPrescriptionImgData(file);
  };

  const handleUploadPrescription = async (photo: unknown) => {
    const customerTokenCookies: string =
      await GetCustomerTokenInCookiesStorage();
    const customerTokenLocal = GetCustomerTokenInLocalStorage();
    const data = new FormData();
    data.append("file", photo);
    try {
      const authorizationHeader =
        customerTokenLocal !== null
          ? customerTokenLocal || customerTokenCookies
          : undefined;
      const headers: HeadersInit = {
        "X-Authorization": authorizationHeader || "",
      };
      const cloudinaryResponse = await fetch(
        "https://apidbbeta.dvago.pk/AppAPIV3/UploadImage",
        {
          method: "post",
          body: data,
          headers: headers,
        }
      );
      const cloudMessage = await cloudinaryResponse.json();
      return cloudMessage?.Message;
    } catch (error) {
      console.log("An Error Occured While Uploading");
    }
  };

  const isMobileResponsive = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return (
        navigator.userAgent.match(/IEMobile/i) ||
        navigator.userAgent.match(/WPDesktop/i)
      );
    },
    any: function () {
      return (
        isMobileResponsive.Android() ||
        isMobileResponsive.BlackBerry() ||
        isMobileResponsive.iOS() ||
        isMobileResponsive.Opera() ||
        isMobileResponsive.Windows()
      );
    },
  };
  const updatedOrderData = cartData.cartProducts.map((item) => {
    const originalItemID = item?.id?.toString();
    const modifiedItemID = originalItemID.replace(/-(?:Box|Strip)$/, "");
    return {
      ItemID: modifiedItemID,
      Quantity: item?.quanity?.toString(),
      ProductName: item?.data?.Title,
      CategoryName: item?.data?.Category,
      Price: item?.data?.Variation?.length
        ? item?.perStrip
          ? item?.data?.Variation?.[1]?.SalePrice
          : item?.data?.Variation?.[0]?.SalePrice
        : item?.data?.SalePrice, // Use the respective price based on the variation
      ItemImage: item?.data?.ProductImage,
      DiscountPrice: item?.data?.Variation?.length
        ? (item?.perStrip
            ? (
                Number(item?.data?.Variation?.[1]?.DiscountAmount) *
                item?.quanity
              ).toString()
            : Number(item?.data?.Variation?.[0]?.DiscountAmount) * item?.quanity
          ).toString()
        : (Number(item?.data?.DiscountAmount) * item?.quanity).toString(),
      Type:
        item?.perStrip !== undefined ? (!item?.perStrip ? "Box" : "Strip") : "",
    };
  });

  const handleCheckout = async () => {
    const customerTokenCookies: string =
      await GetCustomerTokenInCookiesStorage();
    const customerTokenLocal = GetCustomerTokenInLocalStorage();
    const getUserData = Cookies.get("user");
    const isLoggedIn =
      getUserData !== undefined ? JSON.parse(getUserData).isLoggedIn : false;

    if (
      !isLoggedIn ||
      customerTokenLocal === undefined ||
      customerTokenLocal === null
    ) {
      alert("Please login before placing order");
      dispatch(openLoginPopup());
      return;
    }

    if (addressesData.selectedAddressDetails === null) {
      alert("Please select delivery address before placing order");
      dispatch(openAddressPopup());
      return;
    }

    if (Object.entries(selectedOptionVal)?.length === 0) {
      setSelectPaymentPopup(true);
      return;
    }

    setIsProcessing(true);
    let uploadedPrescriptionUrl = "";
    if (isPrescriptionRequired && prescriptionImgData !== null)
      uploadedPrescriptionUrl = await handleUploadPrescription(
        prescriptionImgData
      );
    const ga4ClientId = getGA4ClientId();
    const response = await postProcessOrder(
      userData.phoneNum,
      {
        platform: "web",

        phone: userData.phoneNum,
        fullname: userData.userName,

        lat: addressesData.selectedAddressDetails.lat?.toString(),
        lng: addressesData.selectedAddressDetails.lng?.toString(),
        cityname: addressesData.selectedAddressDetails.customAddress,
        customeraddress: addressesData.selectedAddressDetails.customAddress,

        orderamount: cartData.subTotal,
        deliverycharges: cartData.deliveryCharges,
        PlatformFees: cartData.platformFee,
        discountamount:
          cartData.appliedPromo !== ""
            ? cartData?.appliedPromoDiscount
            : cartData?.discount,
        totalamount: cartData.total,

        paymenttype: selectedOptionVal?.value,
        token: creditCardData.selected?.Token || "",
        IsPrescriptionRequired: isPrescriptionRequired,
        PrescriptionURL: uploadedPrescriptionUrl,
        Remarks: deliveryInstructionVal || "",

        tax: "",
        taxamount: "",
        deliverytime: "",
        ordertype: "Delivery",

        BranchCode: storeData.selectedStoreCode,
        BranchID: storeData.selectedStoreID
          ? storeData.selectedStoreID?.toString()
          : "",
        VoucherCode: cartData.appliedPromo,
        VoucherAmount: cartData.appliedPromoDiscount,
        orderdata: updatedOrderData,
        client_id: ga4ClientId || "",
      },
      {
        token:
          customerTokenCookies !== null
            ? customerTokenCookies || customerTokenLocal
            : undefined,
      }
    );

    setIsProcessing(false);
    if (response && response?.responseType?.toString() === "1") {
      const productIds = cartData.cartProducts.map((item) =>
        item?.id.toString()
      );
      const productNames = cartData?.cartProducts?.map(
        (item) => item?.data?.Title
      );
      const produtCategory = cartData?.cartProducts?.map(
        (item) => item?.data?.Category
      );
      if (
        selectedOptionVal?.value === PaymentType.COD ||
        parseInt(response.OrderAmount) === 0
      ) {
        if (cartData?.cartProducts?.length > 0) {
          fbq.event("Purchase", {
            content_ids: productIds,
            content_category: produtCategory,
            content_name: productNames,
            currency: "PKR",
            value: response.OrderAmount,
          });
        }
        alert(`Order Placed Successfully! ${getText("Order-ID")} #${response.OrderID}`);
        dispatch(emptyCart({}));
        router.replace(`/thank-you?orderId=${response.OrderID}`);
      } else if (selectedOptionVal?.value === PaymentType.ONLINE) {
        if (cartData?.cartProducts?.length > 0) {
          fbq.event("Purchase", {
            content_ids: productIds,
            content_category: produtCategory,
            content_name: productNames,
            currency: "PKR",
            value: response.OrderAmount,
          });
        }
        if (response.URL !== "") {
          window.location.href = response.URL;
          dispatch(emptyCart({}));
        }
      }
    } else if (response && response?.responseType === 0) {
      toast(response?.message, {
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
    } else alert("Something went wrong!");
  };

  const { selected } = useAppSelector((state) => state.creditCard);
  const creditCardValue: { cardNumber: string } = {
    cardNumber: "",
  };

  useEffect(() => {
    dispatch(updateCartWithRespectToProductsAvailableQty({}))
      .unwrap()
      .then((res) => {
        setIsCartEmpty(
          res.cartExpired ? true : Boolean(cartData.cartProducts.length <= 0)
        );
      })
      .catch(() => {
        setIsCartEmpty(Boolean(cartData.cartProducts.length <= 0));
      })
      .finally(() => {
        setIsCartDataUpdatedToLatestInventory(true);
      });
  }, []);
  useEffect(() => {
    if (isCartDataUpdatedToLatestInventory)
      setIsCartEmpty(Boolean(cartData.cartProducts.length <= 0));
  }, [cartData.cartProducts]);

  // const [isButtonEnabled, setIsButtonEnabled] = useState(true);

  // useEffect(() => {

  //   setIsButtonEnabled(false);

  //   const timer = setTimeout(() => {
  //     setIsButtonEnabled(true);
  //   }, 1500);

  //   return () => clearTimeout(timer);
  // }, [cartData,cartData.appliedPromoDiscount]);

  useEffect(() => {
    const multipleGenericVal = cartData.cartProducts
      ?.map((item) => item?.data?.Generic)
      .filter(Boolean)
      .join(", ");
    const MultipleProductTitleVal = cartData.cartProducts
      ?.map((item) => item?.data?.Title)
      .filter(Boolean)
      .join(", ");
    const MultipleCategoryVal = cartData.cartProducts
      ?.map((item) => item?.data?.Category)
      .filter(Boolean)
      .join(", ");
    const MultipleParentCategoryVal = cartData.cartProducts
      ?.map((item) => item?.data?.ParentCategory)
      .filter(Boolean)
      .join(", ");
    if (cartData) {
      // mixpanel.track('checkout_started', {
      //   order_total: cartData?.total,
      //   order_source: 'Website',
      //   sub_total: cartData?.subTotal,
      //   discount: cartData?.discount,
      //   after_discount: Number(afterDiscount),
      //   delivery_fee: cartData?.deliveryCharges,
      //   platform_fee: cartData?.platformFee,
      //   quantity: cartData.cartProducts.length,
      //   category_1_names: MultipleCategoryVal,
      //   category_2_names: MultipleParentCategoryVal,
      //   generics: multipleGenericVal,
      //   event_source: 'Web',
      //   store_id: storeData?.selectedStoreID?.toString() || '32',
      //   order_type: router?.query?.reorder === 'true' ? 'Re Order' : 'New Order',
      //   product_names: MultipleProductTitleVal,
      //   product_detail: cartData.cartProducts.map((item) => ({
      //     product_name: item?.data?.Title,
      //     category_lv1: item?.data?.Category,
      //     category_lv2: item?.data?.ParentCategory,
      //     category_lv3: '',
      //     product_id: item?.data?.UPC ? item?.data?.UPC : item?.data?.ShopifyProductID,
      //     price: item?.data?.DiscountPrice !== '0' ? Number(item?.data?.DiscountPrice) : Number(item?.data?.SalePrice) || 0,
      //     quantity: item?.data?.Variations === 'Strip' ? item?.data?.TotalTablets : item?.data?.Variations === 'Box' ? item?.quanity?.toString() : '1',
      //     manufacturer: item?.data?.Brand || '',
      //     generics: item?.data?.Generic || '',
      //     unit: item?.data?.VariationTitle || '',
      //     type: item?.data?.VariationTitle || '',
      //     used_for: item?.data?.Usedfor || '',
      //   })),
      // });
      if (typeof window !== "undefined") {
        // window?.webengage?.track('checkout_started', {
        //   order_total: cartData?.total,
        //   order_source: 'Website',
        //   sub_total: cartData?.subTotal,
        //   discount: cartData?.discount,
        //   after_discount: Number(afterDiscount),
        //   delivery_fee: cartData?.deliveryCharges,
        //   platform_fee: cartData?.platformFee,
        //   quantity: cartData.cartProducts.length,
        //   category_1_names: MultipleCategoryVal,
        //   category_2_names: MultipleParentCategoryVal,
        //   generics: multipleGenericVal,
        //   event_source: 'Web',
        //   store_id: storeData?.selectedStoreID?.toString() || '32',
        //   order_type: router?.query?.reorder === 'true' ? 'Re Order' : 'New Order',
        //   product_names: MultipleProductTitleVal,
        //   product_detail: cartData.cartProducts.map((item) => ({
        //     product_name: item?.data?.Title,
        //     category_lv1: item?.data?.Category,
        //     category_lv2: item?.data?.ParentCategory,
        //     category_lv3: '',
        //     product_id: item?.data?.UPC ? item?.data?.UPC : item?.data?.ShopifyProductID,
        //     price: item?.data?.DiscountPrice !== '0' ? Number(item?.data?.DiscountPrice) : Number(item?.data?.SalePrice) || 0,
        //     quantity: item?.data?.Variations === 'Strip' ? item?.data?.TotalTablets : item?.data?.Variations === 'Box' ? item?.quanity?.toString() : '1',
        //     manufacturer: item?.data?.Brand || '',
        //     generics: item?.data?.Generic || '',
        //     unit: item?.data?.VariationTitle || '',
        //     type: item?.data?.VariationTitle || '',
        //     used_for: item?.data?.Usedfor || '',
        //   })),
        // });
      }
      // gtag.event({
      //   action: 'begin_checkout',
      //   params: {
      //     currency: 'PKR',
      //     value: cartData?.total?.toFixed(2),
      //     quantity: cartData?.cartProducts?.length,
      //     items: cartData.cartProducts.map((item) => ({
      //       item_id: item?.data?.UPC?.toString() ? item?.data?.UPC?.toString() : item?.data?.ShopifyProductID?.toString() ,
      //       item_name: item?.data?.Title,
      //       item_brand: item?.data?.Brand || '',
      //       item_category: item?.data?.Category || '',
      //       item_category2: item?.data?.ParentCategory || '',
      //       item_category4: item?.data?.Generic || '',
      //       item_category5: item?.data?.Variations || '',
      //     })),
      //   },
      // });
    }
  }, []);

  
  return (
    <>
      {windowWidth > 767 && webBannerURL?.length > 0 && (
        <CartPageBanner BannarUrl={webBannerURL} />
      )}
      <PageWithBanner removeSideSpacing={style.cartPageCOntainer}>
        <BreadCrumb
          FourthLink={getText("My-Cart")}
          secondLink={"/collection/medicine"}
          classes={`deal-breadcrumb ${style.cartBreadCrumb}`}
        />
        <>
          {isCartDataUpdatedToLatestInventory &&
          !isCartEmpty &&
          cartData.cartProducts.length > 0 ? (
            <>
              {windowWidth > 767 ? (
                <div className={style.CartGridContainer}>
                  <div className={style.cartLeft}>
                    <DeliveryAddress
                      addressTag={
                        addressesData.selectedAddressDetails?.addressType
                      }
                      address={
                        addressesData?.selectedAddressDetails?.customAddress
                      }
                    />
                    <PaymentMethod
                      selectedOptionVal={selectedOptionVal}
                      setSelectedOptionVal={setSelectedOptionVal}
                      paymentRadioObj={paymentRadioObj}
                    />
                    {selectedOptionVal?.value === PaymentType.ONLINE && (
                      <CartBoxContainer classes={style.paymentCard}>
                        <img
                          src="/assets/payment-method-icon.svg"
                          alt="svg image"
                        />
                        <p>
                          After clicking “Proceed to online payment”, you will
                          be redirected to transaction page to complete your
                          `purchase` securely.
                        </p>
                      </CartBoxContainer>
                    )}
                    {selectedOptionVal?.value === PaymentType.ONLINE && (
                      <CartBoxContainer
                        classes={style.paymentCardDetails}
                        buttonText={"Change Card"}
                        btnOnClick={() => dispatch(openSavedCard())}
                      >
                        <BoxTitle boxTitle="Selected credit card" />
                        <Formik
                          initialValues={creditCardValue}
                          onSubmit={() => {}}
                        >
                          {() => (
                            <Form
                              className={`${FormStyle.Form}  ${promoStyle.promoCodeForm} ${style.formGroup} promo-code-form`}
                            >
                              <Field
                                id="cardNumber"
                                name="cardNumber"
                                placeholder="Card Number*"
                                value={selected?.CardNumber}
                                onClick={() => dispatch(openSavedCard())}
                                readOnly
                              />
                            </Form>
                          )}
                        </Formik>
                      </CartBoxContainer>
                    )}
                    <DeliveryInstruction
                      setDeliveryInstructionVal={setDeliveryInstructionVal}
                      deliveryInstructionVal={deliveryInstructionVal}
                    />
                    <Box className={style.promoBox}>
                      {selectedOptionVal?.value === PaymentType.ONLINE && (
                        <Typography variant="body2" component="p">
                          Add your first 6 digits of your selected card to apply
                          promo
                        </Typography>
                      )}
                      <PromoInput
                        selectedOptionVal={
                          selectedOptionVal?.length === 0
                            ? undefined
                            : selectedOptionVal?.value === PaymentType.ONLINE
                        }
                      />
                    </Box>
                    {isPrescriptionRequired && !prescriptionImgData && (
                      <Typography
                        className={style.prescription}
                        variant="body2"
                        component="p"
                      >
                        Some medications require PRESCRIPTION,{" "}
                        <button>
                          <input
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                            onChange={handleSetPrescriptionImageData}
                          />
                          click here
                        </button>{" "}
                        to upload prescription
                      </Typography>
                    )}
                    {prescriptionImgData && (
                      <Typography className={style.successText}>
                        Prescription Uploaded
                      </Typography>
                    )}
                    <Box sx={{ mt: 4 }}>
                      {!bool ? (
                        <Typography sx={{ fontWeight: 600 }}>
                          {getText("Quick-Delivery-Guaranteed")}
                        </Typography>
                      ) : (
                        <Typography sx={{ fontWeight: 600 }}>
                          Delivery Time information:
                        </Typography>
                      )}
                      <Typography className={`${style.orderBtn}`}>
                        {estimateTimeTextForCart}
                      </Typography>
                    </Box>
                  </div>
                  <div className={style.cartRight}>
                    <CartContainer />
                    {!isProcessing && (
                      <div className={style.checkoutBtn}>
                        <Buttons
                          btnClickFunction={handleCheckout}
                          types="button"
                          btnClass={`primary btn-half-rounded  ${
                            selectedOptionVal?.value === PaymentType.ONLINE
                              ? style.OnlinePaymentBtn
                              : ""
                          }`}
                        >
                          {selectedOptionVal?.value === PaymentType.ONLINE
                            ? "Proceed to online payment"
                            : "Checkout"}
                        </Buttons>
                      </div>
                    )}
                    {isProcessing && (
                      <div className={style.checkoutBtn}>
                        <p>Processing your order..</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className={style.CartGridContainer}>
                  <div className={style.cartRight}>
                    {cartData.cartProducts.length > 0 &&
                      cartData.cartProducts.map((item, index) => (
                        <SingleCart key={index} data={item} />
                      ))}
                    {isPrescriptionRequired && !prescriptionImgData && (
                      <Typography
                        className={style.prescription}
                        variant="body2"
                        component="p"
                      >
                        Some medications require PRESCRIPTION,{" "}
                        <button>
                          <input
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                            onChange={handleSetPrescriptionImageData}
                          />
                          click here
                        </button>{" "}
                        to upload prescription
                      </Typography>
                    )}
                    {prescriptionImgData && (
                      <Typography className={style.successText}>
                        Prescription Uploaded
                      </Typography>
                    )}
                  </div>
                  <div className={style.cartLeft}>
                    <Box className={style.promoBox}>
                      {selectedOptionVal?.value === PaymentType.ONLINE && (
                        <Typography variant="body2" component="p">
                          Add your first 6 digits of your selected card to apply
                          promo
                        </Typography>
                      )}
                      <PromoInput
                        selectedOptionVal={
                          selectedOptionVal?.length === 0
                            ? undefined
                            : selectedOptionVal?.value === PaymentType.ONLINE
                        }
                      />
                    </Box>
                    <PaymentMethod
                      selectedOptionVal={selectedOptionVal}
                      setSelectedOptionVal={setSelectedOptionVal}
                      paymentRadioObj={paymentRadioObj}
                    />
                    <BillDetails />
                    {MsiteBannerURL?.length > 0 && (
                      <CartPageBanner BannarUrl={MsiteBannerURL} />
                    )}
                    <Box className={style.AddressBox}>
                      {addressesData.selectedAddressDetails?.customAddress !==
                        "" && (
                        <div>
                          {addressesData.selectedAddressDetails?.customAddress}
                        </div>
                      )}
                      <Buttons
                        btnClickFunction={() => dispatch(openAddressPopup())}
                      >
                        {" "}
                        <EditIcon color="--primary-color-darker" />
                      </Buttons>
                    </Box>
                    <Box>
                      {!bool ? (
                        <Typography sx={{ fontWeight: 600 }}>
                          {getText("Quick-Delivery-Guaranteed")}
                        </Typography>
                      ) : (
                        <Typography sx={{ fontWeight: 600 }}>
                          Delivery Time information:
                        </Typography>
                      )}
                      <Typography className={`${style.orderBtn}`}>
                        {estimateTimeTextForCart}
                      </Typography>
                    </Box>
                  </div>
                  {!isProcessing && (
                    <div className={style.checkoutBtn}>
                      <Buttons
                        btnClickFunction={handleCheckout}
                        types="button"
                        btnClass={`primary btn-half-rounded ${
                          selectedOptionVal?.value === PaymentType.ONLINE
                            ? style.OnlinePaymentBtn
                            : ""
                        }`}
                      >
                        {selectedOptionVal?.value === PaymentType.ONLINE
                          ? "Proceed to online payment"
                          : "Checkout"}
                      </Buttons>
                    </div>
                  )}
                  {isProcessing && (
                    <div className={style.checkoutBtn}>
                      <p>Processing your order..</p>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <BoxTitle boxTitle={getText("Cart-is-Empty")} classes={style.noCart} />
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

export default CartIndex;
