import { Box, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import MinusIcon from '@/components/Global-Icon/Minus-icon';
import PlusIcon from '@/components/Global-Icon/Plus-icon';
import style from './cartQuantity.module.scss';
import { useAppSelector } from '@/hooks/use-app-selector';
import { GetThisProductDataFromCart } from '@/functions/cart-methods';

import { ProductDataType } from '@/services/product/types';
import { CartProductType } from '@/redux/cart/slice';
import { useDispatch } from 'react-redux';
import { StoreDispatch } from '@/redux/store';
import { addProductsInCart, removeProductFromCart } from '@/redux/cart/actions';
import { Slide, toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { addToCartMixPanelFunction, removeFromCartMixPanelFunction } from '@/utils/mix-panel-hooks';

interface IProps {
  productData: ProductDataType;
  className?: string;
  selectedOptionVal?: string;
  perStrip?: boolean;
}

const customId = 'custom-id-yes';
const CartQuantity: React.FC<IProps> = ({ selectedOptionVal, productData, className, perStrip, decodedPaymentMethod }) => {
  const cartData = useAppSelector((state) => state.cart);
  const storeData = useAppSelector((state) => state.store);
  const { query } = useRouter();
  const dispatch = useDispatch<StoreDispatch>();
  const [currentProductDataInCart, setCurrentProductDataInCart] = useState<CartProductType | undefined>();
  const handleRemoveProductFromCart = () => {
    if (productData?.Variation && productData?.Variation.length > 0) {
      if (selectedOptionVal === 'Box') {
        dispatch(removeProductFromCart({ products: [{ id: `${productData?.ProductID}-Box`, qtyToRemove: 1 }], perStrip: false }))
          .unwrap()
          .then((response) => {
            removeFromCartMixPanelFunction(1, selectedOptionVal || productData?.VariationTitle, productData, '', storeData?.selectedStoreID?.toString() || '32', cartData?.total);
          });
      } else {
        dispatch(removeProductFromCart({ products: [{ id: `${productData?.ProductID}-Strip`, qtyToRemove: 1 }], perStrip: true }))
          .unwrap()
          .then((response) => {
            removeFromCartMixPanelFunction(1, selectedOptionVal || productData?.VariationTitle, productData, '', storeData?.selectedStoreID?.toString() || '32', cartData?.total);
          });
      }
    } else {
      if (productData) {
        dispatch(removeProductFromCart({ products: [{ id: productData?.ProductID.toString(), qtyToRemove: 1 }], perStrip: undefined }))
          .unwrap()
          .then((response) => {
            removeFromCartMixPanelFunction(1, selectedOptionVal || productData?.VariationTitle, productData, '', storeData?.selectedStoreID?.toString() || '32', cartData?.total);
          });
      }
    }
  };
  const handleAddProductInCart = () => {
    if (productData.Variation && productData.Variation.length > 0) {
      if (selectedOptionVal === 'Strip') {
        dispatch(addProductsInCart({ products: [{ id: `${productData?.ProductID.toString()}-Strip`, data: productData, quantityToAdd: 1, perStrip: true }] }))
          .unwrap()
          .then((response) => {
            if (response.length <= 0) return;
            toast.clearWaitingQueue({ containerId: customId });
            toast(response[0].message, {
              toastId: customId,
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
            const variation = selectedOptionVal !== undefined ? selectedOptionVal : '';
            const responseData = response?.[0]?.products?.data
            const totalNum = Number(responseData?.DiscountPrice) !== 0 ? Number(responseData?.DiscountPrice) + cartData?.total : Number(responseData?.SalePrice) + cartData?.total || 0;
            addToCartMixPanelFunction(response?.[0]?.products?.quantityToAdd, variation, response?.[0]?.products?.data, '', storeData?.selectedStoreID?.toString() || '32', totalNum);
          });
      } else {
        dispatch(addProductsInCart({ products: [{ id: `${productData?.ProductID.toString()}-Box`, data: productData, quantityToAdd: 1, perStrip: false }] }))
          .unwrap()
          .then((response) => {
            if (response.length <= 0) return;
            toast.clearWaitingQueue({ containerId: customId });
            toast(response[0].message, {
              toastId: customId,
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
            const variation = selectedOptionVal !== undefined ? selectedOptionVal : '';
            const responseData = response?.[0]?.products?.data
            const totalNum = Number(responseData?.DiscountPrice) !== 0 ? Number(responseData?.DiscountPrice) + cartData?.total : Number(responseData?.SalePrice) + cartData?.total || 0;
            addToCartMixPanelFunction(response?.[0]?.products?.quantityToAdd, variation, response?.[0]?.products?.data, '', storeData?.selectedStoreID?.toString() || '32', totalNum);
          });
      }
    } else {
      dispatch(addProductsInCart({ products: [{ id: productData.ProductID, data: productData, quantityToAdd: 1, perStrip: undefined }] }))
        .unwrap()
        .then((response) => {
          if (response.length <= 0) return;
          toast.clearWaitingQueue({ containerId: customId });
          toast(response[0].message, {
            toastId: customId,
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
          const variation = response?.[0]?.products?.data?.Variations !== undefined ? response?.[0]?.products?.data?.Variations : '';
          const responseData = response?.[0]?.products?.data
          const totalNum = Number(responseData?.DiscountPrice) !== 0 ? Number(responseData?.DiscountPrice) + cartData?.total : Number(responseData?.SalePrice) + cartData?.total || 0;
          addToCartMixPanelFunction(response?.[0]?.products?.quantityToAdd, variation, response?.[0]?.products?.data, '', storeData?.selectedStoreID?.toString() || '32', totalNum);
        });
    }
  };

  useEffect(() => {
    if (productData?.Variation && productData?.Variation.length > 0) {
      if (selectedOptionVal === 'Strip') {
        setCurrentProductDataInCart(GetThisProductDataFromCart(`${productData?.ProductID}-Strip`, cartData?.cartProducts));
      } else {
        setCurrentProductDataInCart(GetThisProductDataFromCart(`${productData?.ProductID}-Box`, cartData?.cartProducts));
      }
    } else {
      setCurrentProductDataInCart(GetThisProductDataFromCart(`${productData?.ProductID}`, cartData?.cartProducts));
    }
  }, [cartData.cartProducts, query.ProductUrl, selectedOptionVal]);

  const classes = useMemo(() => ` ${style.QuantityBox} ${className} ${decodedPaymentMethod ? style.checkoutQty : ''}`, [className]);

  if (decodedPaymentMethod) {
    return (
      <>
        {selectedOptionVal !== '' && selectedOptionVal === 'Box' && !perStrip ? (
          <>
            {productData?.Variation !== undefined && Number(productData?.Variation?.[0]?.AvailableQty || '0') > 0 && currentProductDataInCart && currentProductDataInCart.quanity > 0 && (
              <>
                {cartData.cartProducts.map((item, index) => (
                  <>
                    {item?.perStrip !== undefined && !item?.perStrip && item.id === `${productData?.ProductID}-Box` && (
                      <Box key={index} className={classes}>
                        <Typography paragraph={true}>{item.quanity}</Typography>
                      </Box>
                    )}
                  </>
                ))}
              </>
            )}
          </>
        ) : selectedOptionVal !== '' && selectedOptionVal === 'Strip' && perStrip ? (
          <>
            {productData?.Variation !== undefined && Number(productData?.Variation?.[1]?.AvailableQty || '0') > 0 && currentProductDataInCart && currentProductDataInCart.quanity > 0 && (
              <>
                {cartData.cartProducts.map((item) => (
                  <>
                    {item?.perStrip !== undefined && item?.perStrip && item.id === `${productData?.ProductID}-Strip` && (
                      <Box className={classes}>
                        <Typography paragraph={true}>{item.quanity}</Typography>
                      </Box>
                    )}
                  </>
                ))}
              </>
            )}
          </>
        ) : selectedOptionVal === '' || selectedOptionVal === undefined ? (
          <>
            {Number(productData?.AvailableQty || 0) > 0 && currentProductDataInCart && currentProductDataInCart.quanity > 0 && (
              <Box className={classes}>
                <Typography paragraph={true}>
                  Quantity : <span>x{currentProductDataInCart?.quanity}</span>
                </Typography>
              </Box>
            )}
          </>
        ) : (
          ''
        )}
      </>
    );
  } else {
    return (
      <>
        {selectedOptionVal !== '' && selectedOptionVal === 'Box' && !perStrip ? (
          <>
            {productData?.Variation !== undefined && Number(productData?.Variation?.[0]?.AvailableQty || '0') > 0 && currentProductDataInCart && currentProductDataInCart.quanity > 0 && (
              <>
                {cartData.cartProducts.map((item, index) => (
                  <>
                    {item?.perStrip !== undefined && !item?.perStrip && item.id === `${productData?.ProductID}-Box` && (
                      <Box key={index} className={classes}>
                        <button onClick={handleRemoveProductFromCart}>
                          <MinusIcon color="--text-color" />
                        </button>
                        <Typography paragraph={true}>{item.quanity}</Typography>
                        <button onClick={handleAddProductInCart}>
                          <PlusIcon color="--primary-color" />
                        </button>
                      </Box>
                    )}
                  </>
                ))}
              </>
            )}
          </>
        ) : selectedOptionVal !== '' && selectedOptionVal === 'Strip' && perStrip ? (
          <>
            {productData?.Variation !== undefined && Number(productData?.Variation?.[1]?.AvailableQty || '0') > 0 && currentProductDataInCart && currentProductDataInCart.quanity > 0 && (
              <>
                {cartData.cartProducts.map((item) => (
                  <>
                    {item?.perStrip !== undefined && item?.perStrip && item.id === `${productData?.ProductID}-Strip` && (
                      <Box className={classes}>
                        <button onClick={handleRemoveProductFromCart}>
                          <MinusIcon color="--text-color" />
                        </button>
                        <Typography paragraph={true}>{item.quanity}</Typography>
                        <button onClick={handleAddProductInCart}>
                          <PlusIcon color="--primary-color" />
                        </button>
                      </Box>
                    )}
                  </>
                ))}
              </>
            )}
          </>
        ) : selectedOptionVal === '' || selectedOptionVal === undefined ? (
          <>
            {Number(productData?.AvailableQty || 0) > 0 && currentProductDataInCart && currentProductDataInCart.quanity > 0 && (
              <Box className={classes}>
                <button onClick={handleRemoveProductFromCart}>
                  <MinusIcon color="--text-color" />
                </button>
                <Typography paragraph={true}>{currentProductDataInCart?.quanity}</Typography>
                <button onClick={handleAddProductInCart}>
                  <PlusIcon color="--primary-color" />
                </button>
              </Box>
            )}
          </>
        ) : (
          ''
        )}
      </>
    );
  }
};

export default CartQuantity;
