import React, { useEffect, useMemo, useState } from "react";
import BreadCrumb from "@/components/Bread-crumb/BreadCrumb";
import PageWithBanner from "@/components/page-banner/page-with-banner";
import style from "./cart-index.module.scss";
import { Box, Typography } from "@mui/material";
import Buttons from "@/components/Button/Buttons";
import SingleCart from "@/components/cart/cart-container/single-cart/single-cart";
import BillDetails from "@/components/cart/bill-details/bill-details";
import { getCartBannerMobile } from "@/services/checkout/services";
import { useAppSelector } from "@/hooks/use-app-selector";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { updateCartWithRespectToProductsAvailableQty } from "@/redux/cart/actions";
import { useRouter } from "next/router";
import { BannerResponseData, BannerResponse } from "@/services/checkout/types";
import BoxTitle from "@/components/BoxTitle/Box-title";
import { useEstimateTime } from "@/hooks/use-estimate-time";
import CartPageBanner from "@/components/page-banner/cart-page-banner";
import dynamic from "next/dynamic";
import NumberedTimeline from "@/components/timeline/timeline";
import { updatePrescriptionOject } from "@/redux/prescription/slice";
import mixpanel from "mixpanel-browser";
const GlobalModal = dynamic(() => import("@/components/global-modal/modal"));
import * as gtag from "@/utils/googleEvents";
import { GetAppliedVoucherInLocalStorage } from "@/functions/local-storage-methods";
import { AddPromo } from "@/redux/promo-code/slice";
import PromoInput from "@/components/cart/promo-input/promo-input";
import DeliveryAddress from "@/components/cart/delivery-address/delivery-address";
import EditIcon from "@/components/Global-Icon/Edit-icon";
import { openAddressPopup } from "@/redux/address-popup/slice";
import { useLanguage } from "@/language-context/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { GetTranslatedData } from "@/services/footer/services";
import Cookies from "js-cookie";

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
  const cartData = useAppSelector((state) => state.cart);
  const storeData = useAppSelector((state) => state.store);
  const { promoCode } = useAppSelector((state) => state.promoCode);
  const { prescriptionObj } = useAppSelector((state) => state.prescription);
  const addressesData = useAppSelector((state) => state.addresses);
  const [selectPaymentPopup, setSelectPaymentPopup] = useState(false);
  const [MsiteBannerURL, setMsiteBannerURL] = useState(
    [] as BannerResponseData[]
  );
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const appliedVoucher = GetAppliedVoucherInLocalStorage();
  const voucherInLocal = decodeURI(appliedVoucher);
  const [
    isCartDataUpdatedToLatestInventory,
    setIsCartDataUpdatedToLatestInventory,
  ] = useState(false);
  const { estimateTimeTextForCart, bool } = useEstimateTime(
    cartData?.cartProducts[0]?.data?.Category
  );
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
  const isPrescriptionRequired = useMemo(() => {
    const prescriptionRequiredProducts = cartData.cartProducts.find(
      (item) => item?.data?.PrescriptionRequired === "True"
    );
    return Boolean(prescriptionRequiredProducts !== undefined);
  }, [cartData.cartProducts]);
  useEffect(() => {
    const cartPgBanner = async () => {
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
    // Dispatch the action to update prescription object in Redux state
    dispatch(
      updatePrescriptionOject({
        lastModified: file.lastModified,
        lastModifiedDate: file?.lastModified?.toString() || "",
        name: file.name,
        size: file.size,
        type: file.type,
        webkitRelativePath: file.webkitRelativePath || "",
      })
    );
  };

  const handleCheckout = async () => {
    router.push("/payment");
  };
  // const [isButtonEnabled, setIsButtonEnabled] = useState(true);

  // useEffect(() => {

  //   setIsButtonEnabled(false);

  //   const timer = setTimeout(() => {
  //     setIsButtonEnabled(true);
  //   }, 1500);

  //   return () => clearTimeout(timer);
  // }, [cartData,cartData.appliedPromoDiscount]);
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
      gtag.event({
        action: "begin_checkout",
        params: {
          currency: "PKR",
          value: cartData?.total?.toFixed(2),
          quantity: cartData?.cartProducts?.length,
          items: cartData.cartProducts.map((item) => ({
            item_id: item?.data?.UPC?.toString()
              ? item?.data?.UPC?.toString()
              : item?.data?.ShopifyProductID?.toString(),
            item_name: item?.data?.Title,
            item_brand: item?.data?.Brand || "",
            item_category: item?.data?.Category || "",
            item_category2: item?.data?.ParentCategory || "",
            item_category4: item?.data?.Generic || "",
            item_category5: item?.data?.Variations || "",
          })),
        },
      });
    }
  }, []);

  useEffect(() => {
    if (voucherInLocal === "null") return;
    if (voucherInLocal) {
      dispatch(AddPromo(voucherInLocal));
    }
  }, [voucherInLocal]);

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
      <PageWithBanner removeSideSpacing={style.cartPageCOntainer}>
        <BreadCrumb
          FourthLink={getText("My-Cart")}
          secondLink={"/collection/medicine"}
          classes={`deal-breadcrumb ${style.cartBreadCrumb}`}
        />

        <NumberedTimeline activeStep={1} />
        <>
          {isCartDataUpdatedToLatestInventory &&
          !isCartEmpty &&
          cartData.cartProducts.length > 0 ? (
            <>
              <div className={style.CartGridContainer}>
                <div className={style.cartRight}>
                  {cartData.cartProducts.length > 0 &&
                    cartData.cartProducts.map((item, index) => (
                      <SingleCart key={index} data={item} />
                    ))}
                  {isPrescriptionRequired && prescriptionObj?.name === "" && (
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
                  {prescriptionObj?.name !== "" && (
                    <Typography className={style.successText}>
                      Prescription Uploaded
                    </Typography>
                  )}
                </div>
                <div className={style.cartLeft}>
                  {" "}
                  <PromoInput
                    voucherInLocal={promoCode}
                    checkoutScreen={true}
                    selectedOptionVal={true}
                    appliedVoucherValue={promoCode}
                  />
                  <BillDetails />
                  {/* {MsiteBannerURL?.length > 0 && <CartPageBanner BannarUrl={MsiteBannerURL} />} */}
                  <Typography sx={{ fontWeight: 600 }}>
                    {getText("Delivery-Address")}
                  </Typography>
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
                  <Box sx={{ mt: 2 }}>
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
                <div className={style.checkoutBtn}>
                  <Buttons
                    btnClickFunction={handleCheckout}
                    types="button"
                    btnClass={`primary btn-half-rounded`}
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

export default CartIndex;
