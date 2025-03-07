import React, { useMemo } from 'react';
import style from './Order-cancel-popup.module.scss';
import { Box, Typography } from '@mui/material';

import BoxTitle from '@/components/BoxTitle/Box-title';
import { useAppSelector } from '@/hooks/use-app-selector';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { addSelectReason, closeCancelOrder } from '@/redux/cancel-order-popup/slice';
import { GetCustomerTokenInCookiesStorage, GetCustomerTokenInLocalStorage } from '@/functions/local-storage-methods';
import { postCancelOrder } from '@/services/order/services';
import RadioOut from '@/containers/svg-icons/radioout';
import { Slide, toast } from 'react-toastify';

import dynamic from 'next/dynamic';
import mixpanel from 'mixpanel-browser';
const GlobalModal = dynamic(() => import('@/components/global-modal/modal'), { ssr: false });

interface IProps {
  orderCancelledFunc: () => void;
}

const OrderCancelPopup: React.FC<IProps> = ({ orderCancelledFunc }) => {
  const { cancelOrderCardPopup, cancelReason, orderId } = useAppSelector((state) => state.cancelOrderPopup);
  const { orderDetailData } = useAppSelector((state) => state.orderDetail);
  const storeData = useAppSelector((state) => state.store);
  const dispatch = useAppDispatch();
  const MultipleProductTitleVal = orderDetailData?.Detail?.map((item) => item?.ProductTitle)
    .filter(Boolean)
    .join(', ');
  const afterDiscount = useMemo(() => (Number(orderDetailData?.Subtotal) - (orderDetailData?.VoucherCode !== '' ? Number(orderDetailData?.VoucherValue) : Number(orderDetailData?.Discount)))?.toFixed(2), [orderDetailData]);
  const handleCancelClicked = async (cancelReason: string) => {
    const customerToken = GetCustomerTokenInLocalStorage();
    const customerTokenCookies: string = await GetCustomerTokenInCookiesStorage();
    const response = await postCancelOrder(orderId, cancelReason, { token: customerToken !== null ? customerToken || customerTokenCookies : undefined });
    if (response?.responseType?.toString() === '1') {
      toast(response?.message, {
        position: 'bottom-center',
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
        theme: 'dark',
      });
      const MultipleParentCategoryVal = orderDetailData?.Detail?.map((item) => item?.ParentCategory)
        .filter(Boolean)
        .join(', ');

      const MultipleCategoryVal = orderDetailData?.Detail?.map((item) => item?.ChildCategory)
        .filter(Boolean)
        .join(', ');
      const multipleGenericVal = orderDetailData?.Detail?.map((item) => item?.Generics)
        .filter(Boolean)
        .join(', ');
      if(orderDetailData){
      // mixpanel.track('order_cancelled', {
      //   order_id: orderDetailData?.ID,
      //   order_total: Number(orderDetailData?.Total),
      //   sub_total: Number(orderDetailData?.Subtotal),
      //   discount: Number(orderDetailData?.Discount),
      //   after_discount: Number(afterDiscount),
      //   delivery_fee: Number(orderDetailData?.DeliveryFees),
      //   platform_fee: Number(orderDetailData?.PlatformFees),
      //   store_location: storeData?.selectedStoreLocation,
      //   quantity: orderDetailData?.Detail?.length,
      //   category_1_names: MultipleParentCategoryVal,
      //   category_2_names: MultipleCategoryVal,
      //   generics: multipleGenericVal,
      //   store_id: storeData?.selectedStoreID?.toString() || '32',
      //   event_source: 'Web',
      //   cancelled_by: orderDetailData?.DeliveryStatus,
      //   cancellation_reason: cancelReason,
      //   product_names: MultipleProductTitleVal,
      //   product_detail: orderDetailData?.Detail.map((item) => ({
      //     product_name: item?.ProductTitle,
      //     category_lv1: item?.ParentCategory,
      //     category_lv2: item?.ParentCategory,
      //     category_lv3: '',
      //     product_id: item?.ShopifyProductID ,
      //     price: item?.Discount !== '0' ? Number(item?.TotalPrice) : Number(item?.Price) || 0,
      //     quantity: item?.Quantity,
      //     manufacturer: item?.Brand || '',
      //     generics: item?.Generics || '',
      //     unit: item?.VariantTitle || '',
      //     type: item?.VariantTitle || '',
      //     used_for: item?.UsedFor || '',
      //   })),
      // });

      if (typeof window !== 'undefined') {
        // window?.webengage?.track('order_cancelled', {
        //   order_id: orderDetailData?.ID,
        //   order_total: Number(orderDetailData?.Total),
        //   sub_total: Number(orderDetailData?.Subtotal),
        //   discount: Number(orderDetailData?.Discount),
        //   after_discount: Number(afterDiscount),
        //   delivery_fee: Number(orderDetailData?.DeliveryFees),
        //   platform_fee: Number(orderDetailData?.PlatformFees),
        //   store_location: storeData?.selectedStoreLocation,
        //   quantity: orderDetailData?.Detail?.length,
        //   category_1_names: MultipleParentCategoryVal,
        //   category_2_names: MultipleCategoryVal,
        //   generics: multipleGenericVal,
        //   store_id: storeData?.selectedStoreID?.toString() || '32',
        //   event_source: 'Web',
        //   cancelled_by: orderDetailData?.DeliveryStatus,
        //   cancellation_reason: cancelReason,
        //   product_names: MultipleProductTitleVal,
        //   product_detail: orderDetailData?.Detail.map((item) => ({
        //     product_name: item?.ProductTitle,
        //     category_lv1: item?.ChildCategory,
        //     category_lv2: item?.ParentCategory,
        //     category_lv3: '',
        //     product_id: item?.ShopifyProductID ,
        //     price: item?.Discount !== '0' ? Number(item?.TotalPrice) : Number(item?.Price) || 0,
        //     quantity: item?.Quantity,
        //     manufacturer: item?.Brand || '',
        //     generics: item?.Generics || '',
        //     unit: item?.VariantTitle || '',
        //     type: item?.VariantTitle || '',
        //     used_for: item?.UsedFor || '',
        //   })),
        // });
      }
    }
      orderCancelledFunc?.();
      dispatch(closeCancelOrder());
      dispatch(addSelectReason(cancelReason));
    }
  };

  return (
    <>
      <GlobalModal openSelector={cancelOrderCardPopup} closeFunc={() => dispatch(closeCancelOrder())} containerClass={style.voucherPopupContainer} contentClass={style.voucherPopupContainerContent}>
        <Box className={style.cancelOrderContent}>
          <BoxTitle boxTitle="Please select cancellation reason" />
          <Box className={style.cancelOrderContainer}>
            {cancelReason?.length &&
              cancelReason.map((item, index) => (
                <label key={index} id={item.id} onClick={() => handleCancelClicked(item.CancelReason)}>
                  <Typography>
                    <RadioOut /> {item.CancelReason}
                  </Typography>
                </label>
              ))}
          </Box>
        </Box>
      </GlobalModal>
    </>
  );
};

export default OrderCancelPopup;
