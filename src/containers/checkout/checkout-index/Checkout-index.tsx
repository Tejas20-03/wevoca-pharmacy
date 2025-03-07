import React, { useEffect, useMemo, useState } from 'react';
import BreadCrumb from '@/components/Bread-crumb/BreadCrumb';
import PageWithBanner from '@/components/page-banner/page-with-banner';
import style from './checkout-index.module.scss';
import PaymentMethod from '@/components/cart/payment-method/payment-method';
import { Box, Typography } from '@mui/material';
import Buttons from '@/components/Button/Buttons';
import SingleCart from '@/components/cart/cart-container/single-cart/single-cart';
import BillDetails from '@/components/cart/bill-details/bill-details';
import { getCartBannerMobile, postProcessOrder } from '@/services/checkout/services';
import { useAppSelector } from '@/hooks/use-app-selector';
import Cookies from 'js-cookie';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { emptyCart } from '@/redux/cart/actions';
import { useRouter } from 'next/router';
import { openLoginPopup } from '@/redux/Login-popup/slice';
import { openAddressPopup } from '@/redux/address-popup/slice';
import { BannerResponseData, PaymentType, BannerResponse } from '@/services/checkout/types';
import BoxTitle from '@/components/BoxTitle/Box-title';
import * as fbq from '@/utils/fpixel';
import { GetCustomerTokenInCookiesStorage, GetCustomerTokenInLocalStorage, GetSelectedPaymentMethodInLocalStorage, GetAppliedVoucherInLocalStorage } from '@/functions/local-storage-methods';
import { useEstimateTime } from '@/hooks/use-estimate-time';
import CartPageBanner from '@/components/page-banner/cart-page-banner';
import { Slide, toast } from 'react-toastify';
import dynamic from 'next/dynamic';
import NumberedTimeline from '@/components/timeline/timeline';
import Link from 'next/link';
import ArrowLeft from '@/containers/svg-icons/arrow-left';
import { AddPromo } from '@/redux/promo-code/slice';
import PromoInput from '@/components/cart/promo-input/promo-input';
import { getGA4ClientId } from '@/functions/ga4-clientId';
import { useLanguage } from '@/language-context/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { GetTranslatedData } from '@/services/footer/services';
const GlobalModal = dynamic(() => import('@/components/global-modal/modal'));

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
  const userData = useAppSelector((state) => state.user);
  const addressesData = useAppSelector((state) => state.addresses);
  const creditCardData = useAppSelector((state) => state.creditCard);
  const { promoCode } = useAppSelector((state) => state.promoCode);
  const { prescriptionObj } = useAppSelector((state) => state.prescription);
  const storeData = useAppSelector((state) => state.store);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectPaymentPopup, setSelectPaymentPopup] = useState(false);
  const [MsiteBannerURL, setMsiteBannerURL] = useState([] as BannerResponseData[]);
  const paymentMethodSelected = GetSelectedPaymentMethodInLocalStorage();
  // Decode the encoded data and parse it back to an object
  const decodedPaymentMethod = JSON.parse(decodeURI(paymentMethodSelected));
  
  const appliedVoucher = GetAppliedVoucherInLocalStorage();
  const voucherInLocal = decodeURI(appliedVoucher);

  const paymentRadioObj: paymentRadioObjProp[] = [decodedPaymentMethod];
  const [selectedOptionVal, setSelectedOptionVal] = useState<paymentRadioObjProp>(decodedPaymentMethod);

  const { estimateTimeTextForCart, bool } = useEstimateTime(cartData?.cartProducts[0]?.data?.Category);
  const isPrescriptionRequired = useMemo(() => {
    const prescriptionRequiredProducts = cartData.cartProducts.find((item) => item?.data?.PrescriptionRequired === 'True');
    return Boolean(prescriptionRequiredProducts !== undefined);
  }, [cartData.cartProducts]);
  useEffect(() => {
    const cartPgBanner = async () => {
      const cartMobileBannerResponse: BannerResponse | undefined = await getCartBannerMobile({ token: '' });
      if (cartMobileBannerResponse?.ResponseType === 1) {
        setMsiteBannerURL(cartMobileBannerResponse.Data);
      }
    };
    cartPgBanner();
  }, []);

  useEffect(() => {
    if (voucherInLocal) {
      dispatch(AddPromo(voucherInLocal));
    }
  }, [voucherInLocal]);
  const handleUploadPrescription = async (photo: unknown) => {
    const data = new FormData();
    data.append('file', photo);
    data.append('upload_preset', 'Dvago_App_Prescription_Image_Upload_Preset');
    data.append('cloud_name', 'Dvago');

    try {
      const cloudinaryResponse = await fetch('https://api.cloudinary.com/v1_1/Dvago/upload', { method: 'post', body: data });
      const json = await cloudinaryResponse.json();
      return json.secure_url || '';
    } catch (error) {
      console.log('An Error Occured While Uploading');
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
      return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function () {
      return isMobileResponsive.Android() || isMobileResponsive.BlackBerry() || isMobileResponsive.iOS() || isMobileResponsive.Opera() || isMobileResponsive.Windows();
    },
  };
  const updatedOrderData = cartData.cartProducts.map((item) => {
    const originalItemID = item?.id?.toString();
    const modifiedItemID = originalItemID.replace(/-(?:Box|Strip)$/, '');
    return {
      ItemID: modifiedItemID,
      Quantity: item?.quanity?.toString(),
      ProductName: item?.data?.Title,
      CategoryName: item?.data?.Category,
      Price: item?.data?.Variation?.length ? (item?.perStrip ? item?.data?.Variation?.[1]?.SalePrice : item?.data?.Variation?.[0]?.SalePrice) : item?.data?.SalePrice, // Use the respective price based on the variation
      ItemImage: item?.data?.ProductImage,
      DiscountPrice: item?.data?.Variation?.length ? (item?.perStrip ? (Number(item?.data?.Variation?.[1]?.DiscountAmount) * item?.quanity).toString() : Number(item?.data?.Variation?.[0]?.DiscountAmount) * item?.quanity).toString() : (Number(item?.data?.DiscountAmount) * item?.quanity).toString(),
      Type: item?.perStrip !== undefined ? (!item?.perStrip ? 'Box' : 'Strip') : '',
    };
  });

  const afterDiscount = useMemo(() => (cartData.subTotal - (cartData.appliedPromo !== '' ? cartData.appliedPromoDiscount : cartData.discount)).toFixed(2), [cartData.subTotal, cartData.appliedPromo, cartData.appliedPromoDiscount, cartData.discount]);

  const handleCheckout = async () => {
    const customerTokenCookies: string = await GetCustomerTokenInCookiesStorage();
    const customerTokenLocal = GetCustomerTokenInLocalStorage();
    const getUserData = Cookies.get('user');
    const isLoggedIn = getUserData !== undefined ? JSON.parse(getUserData).isLoggedIn : false;

    if (!isLoggedIn || customerTokenLocal === undefined || customerTokenLocal === null) {
      alert('Please login before placing order');
      dispatch(openLoginPopup());
      return;
    }

    if (addressesData.selectedAddressDetails === null) {
      alert('Please select delivery address before placing order');
      dispatch(openAddressPopup());
      return;
    }

    if (Object.entries(selectedOptionVal)?.length === 0) {
      setSelectPaymentPopup(true);
      return;
    }

    setIsProcessing(true);
    let uploadedPrescriptionUrl = '';
    if (isPrescriptionRequired && prescriptionObj?.name !== '') uploadedPrescriptionUrl = await handleUploadPrescription(prescriptionObj);

    // Example usage
    const ga4ClientId = getGA4ClientId();
    const response = await postProcessOrder(
      userData.phoneNum,
      {
        platform: 'web',

        phone: userData.phoneNum,
        fullname: userData.userName,

        lat: addressesData.selectedAddressDetails.lat?.toString(),
        lng: addressesData.selectedAddressDetails.lng?.toString(),
        cityname: addressesData.selectedAddressDetails.customAddress,
        customeraddress: addressesData.selectedAddressDetails.customAddress,

        orderamount: cartData.subTotal,
        deliverycharges: cartData.deliveryCharges,
        PlatformFees: cartData.platformFee,
        discountamount: cartData.appliedPromo !== '' ? cartData?.appliedPromoDiscount : cartData?.discount,
        totalamount: cartData.total,

        paymenttype: selectedOptionVal?.value,
        token: creditCardData.selected?.Token || '',
        IsPrescriptionRequired: isPrescriptionRequired,
        PrescriptionURL: uploadedPrescriptionUrl,
        Remarks: '',

        tax: '',
        taxamount: '',
        deliverytime: '',
        ordertype: 'Delivery',

        BranchCode: storeData.selectedStoreCode,

        VoucherCode: cartData.appliedPromo,
        VoucherAmount: cartData.appliedPromoDiscount,
        orderdata: updatedOrderData,
        client_id: ga4ClientId || '',
      },
      { token: customerTokenCookies !== null ? customerTokenCookies || customerTokenLocal : undefined }
    );

    setIsProcessing(false);
    if (response && response?.responseType?.toString() === '1') {
      const productIds = cartData.cartProducts.map((item) => item?.id.toString());
      const productNames = cartData?.cartProducts?.map((item) => item?.data?.Title);
      const produtCategory = cartData?.cartProducts?.map((item) => item?.data?.Category);
      if (selectedOptionVal?.value === PaymentType.COD || parseInt(response.OrderAmount) === 0) {
        if (cartData?.cartProducts?.length > 0) {
          fbq.event('Purchase', {
            content_ids: productIds,
            content_category: produtCategory,
            content_name: productNames,
            currency: 'PKR',
            value: response.OrderAmount,
          });
        }
        alert(`Order Placed Successfully! ${getText("Order-ID")} #${response.OrderID}`);
        dispatch(emptyCart({}));
        router.replace(`/thank-you?orderId=${response.OrderID}`);
      } else if (selectedOptionVal?.value === PaymentType.ONLINE) {
        // alert('Please enter your card details to proceed!');
        if (cartData?.cartProducts?.length > 0) {
          fbq.event('Purchase', {
            content_ids: productIds,
            content_category: produtCategory,
            content_name: productNames,
            currency: 'PKR',
            value: response.OrderAmount,
          });
        }
        if (response.URL !== '') {
          window.location.href = response.URL;
          dispatch(emptyCart({}));
        }
      }
    } else if (response && response?.responseType === 0) {
      toast(response?.message, {
        position: 'bottom-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
        theme: 'dark',
      });
    } else alert('Something went wrong!');
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
      <PageWithBanner removeSideSpacing={style.cartPageCOntainer}>
        <div className={style.backButton}>
          <Link href={'/payment'}>
            <ArrowLeft />
          </Link>
          <BoxTitle classes={style.voucherHeading} boxTitle="Shopping Cart" />
        </div>
        <BreadCrumb FourthLink={getText("My-Cart")} secondLink={'/collection/medicine'} classes={`deal-breadcrumb ${style.cartBreadCrumb}`} />
        <NumberedTimeline activeStep={3} />
        <>
          {cartData.cartProducts.length > 0 ? (
            <>
              <div className={style.CartGridContainer}>
                <div className={style.cartRight}>
                  {cartData.cartProducts.length > 0 && cartData.cartProducts.map((item, index) => <SingleCart decodedPaymentMethod={decodedPaymentMethod} key={index} data={item} />)}
                  {prescriptionObj?.name && <Typography className={style.successText}>Prescription Uploaded</Typography>}
                </div>
                <div className={style.cartLeft}>
                  <PaymentMethod mCart={false} decodedPaymentMethod={decodedPaymentMethod} selectedOptionVal={selectedOptionVal} setSelectedOptionVal={setSelectedOptionVal} paymentRadioObj={paymentRadioObj} />
                  <PromoInput voucherInLocal={promoCode} checkoutScreen={true} selectedOptionVal={true} appliedVoucherValue={promoCode} />
                  {promoCode !== '' && promoCode !== 'null' && (
                    <div className={style.voucherValue}>
                      <Typography>{promoCode?.replace(/"/g, '')} VOUCHER APPLIED</Typography>
                    </div>
                  )}
                  <BillDetails />
                  {MsiteBannerURL?.length > 0 && <CartPageBanner BannarUrl={MsiteBannerURL} />}
                  <Box>
                    {!bool ? <Typography sx={{ fontWeight: 600 }}>{getText("Quick-Delivery-Guaranteed")}</Typography> : <Typography sx={{ fontWeight: 600 }}>Delivery Time information:</Typography>}
                    <Typography className={`${style.orderBtn}`}>{estimateTimeTextForCart}</Typography>
                  </Box>
                  <Box className={style.AddressBox}>
                    <Typography sx={{ fontWeight: 600 }}>{getText("Delivery-Address")}</Typography>
                    {addressesData.selectedAddressDetails?.customAddress !== '' && <Typography className={`${style.orderBtn}`}>{addressesData.selectedAddressDetails?.customAddress}</Typography>}
                    {/* <Typography className={`${style.orderBtn}`}>{estimateTimeTextForCart}</Typography> */}
                  </Box>
                </div>
                {!isProcessing && (
                  <div className={style.checkoutBtn}>
                    <Buttons btnClickFunction={handleCheckout} types="button" btnClass={`primary btn-half-rounded ${selectedOptionVal?.value === PaymentType.ONLINE ? style.OnlinePaymentBtn : ''}`}>
                      {selectedOptionVal?.id === 1 ? 'Proceed to online payment' : 'Place Order'}
                    </Buttons>
                  </div>
                )}
                {isProcessing && (
                  <div className={style.checkoutBtn}>
                    <p>Processing your order..</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <BoxTitle boxTitle={getText("Cart-is-Empty")} classes={style.noCart} />
          )}
        </>
      </PageWithBanner>
      <GlobalModal openSelector={selectPaymentPopup} closeFunc={() => setSelectPaymentPopup(false)}>
        <Typography sx={{ textAlign: 'center', pb: 5, width: '100%' }}>
          Please select a <span style={{ fontWeight: 600 }}>payment method</span> to complete your purchase
        </Typography>
      </GlobalModal>
    </>
  );
};

export default CartIndex;
