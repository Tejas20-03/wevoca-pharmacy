import { createAsyncThunk } from '@reduxjs/toolkit';
import { CalculateCartAmount, CalculateCartTotal, GetThisProductDataFromCart } from '@/functions/cart-methods';
import { ProductDataType } from '@/services/product/types';
import { getMultipleProducts } from '@/services/product/services';
import { deepClone } from '@/utils/lodash-methods';
import { AsyncThunkConfig } from '@/redux/store';
import { cartActions, CartProductType, cartSliceIntialState, CartSliceType } from './slice';
import { clearPrescription } from '@/redux/prescription/slice';

import { ConvertJsonToObject, ConvertObjectToJson } from '@/utils/api-methods';
import { LocalStorageKeys } from '@/data/local-storage-keys';

import { PlatformFeesAPI } from '@/services/order/services';
import { Slide, toast } from 'react-toastify';
import { GetAddCartInDB, PostAddCartInDB } from '@/services/cart/services';
import { GetCustomerTokenInLocalStorage } from '@/functions/local-storage-methods';
import mixpanel from 'mixpanel-browser';

const SetCartInLocalStorage = async (cartData: CartSliceType) => localStorage.setItem(LocalStorageKeys.CART, ConvertObjectToJson({ ...cartData, createdAt: new Date() }));
const GetCartFromLocalStorage = async (): Promise<CartSliceType> => ConvertJsonToObject(localStorage.getItem(LocalStorageKeys.CART) || ConvertObjectToJson(cartSliceIntialState)) as CartSliceType;

const CartThunks = {
  SetCartDataFromLocalStorage: 'cart/setCartDataFromLocalStorage',
  EmptyCart: 'cart/emptyCart',
  AddProductsInCart: 'cart/addProductsInCart',
  RemoveProductsFromCart: 'cart/removeProductFromCart',
  SetVoucherDiscount: 'cart/setVoucherDiscount',
  SetDeliveryCharges: 'cart/setDeliveryCharges',
  OverrideCartWithTheseProducts: 'cart/overrideCartWithTheseProducts',
  UpdateCartWithRespectToProductsAvailableQty: 'cart/updateCartWithRespectToProductsAvailableQty',
};

const customId = 'custom-id-yes';

export const setCartDataFromLocalStorage = createAsyncThunk<void, {}, AsyncThunkConfig>(CartThunks.SetCartDataFromLocalStorage, async ({}, { dispatch }) => {
  const customerToken = GetCustomerTokenInLocalStorage();
  const cartData = await GetAddCartInDB({ token: customerToken !== null ? customerToken : undefined });
  dispatch(cartActions.setCart(cartData));
  const platformFees = await PlatformFeesAPI({});
  dispatch(cartActions.setCart({ platformFee: platformFees }));
});

export const emptyCart = createAsyncThunk<void, {}, AsyncThunkConfig>(CartThunks.EmptyCart, async ({}, { dispatch, getState }) => {
  const cartData = getState().cart;
  const storeData = getState().store;
  const customerToken = GetCustomerTokenInLocalStorage();
  const getCarts = await GetCartFromLocalStorage();
  await PostAddCartInDB(
    storeData?.selectedStoreCode,
    'web',
    {
      appliedPromo: cartSliceIntialState?.appliedPromo,
      cartProducts: cartSliceIntialState?.cartProducts,
      appliedPromoDiscount: cartSliceIntialState?.appliedPromoDiscount,
      createdAt: `${getCarts.createdAt}`,
      deliveryCharges: cartSliceIntialState?.deliveryCharges,
      discount: cartSliceIntialState?.discount,
      platformFee: cartData?.platformFee,
      subTotal: cartSliceIntialState?.subTotal,
      total: cartSliceIntialState?.total,
    },
    { token: customerToken !== null ? customerToken : undefined }
  );
  dispatch(
    cartActions.setCart({
      appliedPromo: cartSliceIntialState?.appliedPromo,
      appliedPromoDiscount: cartSliceIntialState?.appliedPromoDiscount,
      cartProducts: cartSliceIntialState?.cartProducts,
      createdAt: cartSliceIntialState?.createdAt,
      deliveryCharges: cartSliceIntialState?.deliveryCharges,
      discount: cartSliceIntialState?.discount,
      subTotal: cartSliceIntialState?.subTotal,
      total: cartSliceIntialState?.total,
    })
  );
  await SetCartInLocalStorage(cartSliceIntialState);
});

type ProductAddedMessage = { productID: string; message: string; products?: { id: string; data: ProductDataType; quantityToAdd: number; perStrip?: boolean } };
export const addProductsInCart = createAsyncThunk<ProductAddedMessage[], { products: { id: string; data: ProductDataType; quantityToAdd: number; perStrip?: boolean }[] }, AsyncThunkConfig>(CartThunks.AddProductsInCart, async ({ products }, { dispatch, getState }) => {
  const cartData = getState().cart;
  const storeData = getState().store;
  const customerToken = GetCustomerTokenInLocalStorage();
  const getCarts = await GetCartFromLocalStorage();
  if (cartData?.platformFee === 0) {
    const platformFees = await PlatformFeesAPI({});
    dispatch(cartActions.setCart({ platformFee: platformFees }));
  }
  const productAddedMessages: ProductAddedMessage[] = [];
  let processedCartData: CartSliceType = deepClone(cartData);
  products.forEach((product) => {
    if (product.data.Category === 'Labs') {
      let canAdd = true;
      if (cartData.cartProducts.length > 0) {
        cartData.cartProducts.map((item) => {
          if (item.data.Category !== 'Labs') {
            canAdd = false;
            productAddedMessages.push({ productID: product.id, message: 'Please make separate orders for Lab Tests.' });
            return productAddedMessages;
          }
        });
      }
      if (!canAdd) return productAddedMessages;
    } else {
      if (cartData.cartProducts.length > 0) {
        let canAdd = true;
        cartData.cartProducts.map((item) => {
          if (item.data.Category === 'Labs') {
            canAdd = false;
            productAddedMessages.push({ productID: product.id, message: 'Please make separate orders for Lab Tests.' });
            return productAddedMessages;
          }
        });
        if (!canAdd) return productAddedMessages;
      }
    }
    if (product?.data?.Variation && product?.data?.Variation.length > 0) {
      // For Per Strip
      if (product.perStrip) {
        const productAlreadyExistInCart = GetThisProductDataFromCart(product?.id, processedCartData?.cartProducts);
        const boxItemInCart = GetThisProductDataFromCart(`${product?.id.slice(0, -6)}-Box`, processedCartData?.cartProducts);
        const boxQuantity = boxItemInCart && Number(boxItemInCart?.quanity || 0) * Number(product?.data.Variation[0].NoofStrips || 0);
        const possibleQtyAfterAddingProduct = productAlreadyExistInCart ? productAlreadyExistInCart?.quanity + product?.quantityToAdd + Number(boxQuantity || 0) : product?.quantityToAdd + Number(boxQuantity || 0);
        const totalQuantityInCart = Number(productAlreadyExistInCart?.quanity || 0) + Number(boxQuantity || 0);
        const availableQty = Number(Number(product?.data?.Variation[1]?.AvailableQty) - Number(totalQuantityInCart || 0) || 0);
        const maxAllowedQty = Number(product?.data?.Variation[1]?.MaxOrder || 0);
        let QtyToAdd = 0;
        if (availableQty >= possibleQtyAfterAddingProduct) {
          QtyToAdd = possibleQtyAfterAddingProduct <= maxAllowedQty ? (productAlreadyExistInCart ? productAlreadyExistInCart?.quanity + product?.quantityToAdd : product?.quantityToAdd) : maxAllowedQty;
        } else {
          QtyToAdd = availableQty <= maxAllowedQty && availableQty > 0 ? (productAlreadyExistInCart ? productAlreadyExistInCart?.quanity + product?.quantityToAdd : product?.quantityToAdd) : 0;
        }

        if (QtyToAdd <= Number(productAlreadyExistInCart?.quanity || 0)) {
          productAddedMessages.push({ productID: product.id, message: 'Maximum allowed quantity limit reached!' });
          return;
        } else productAddedMessages.push({ productID: product.id, message: 'Product added in cart' });

        const finalizedProductData: CartProductType = { id: product.id.includes('-Strip') ? product.id : `${product.id}-Strip`, quanity: QtyToAdd, data: product?.data, perStrip: product?.perStrip };
        if (productAlreadyExistInCart === undefined && QtyToAdd > 0) processedCartData?.cartProducts?.push(finalizedProductData);
        else {
          const productIndexInCart = processedCartData?.cartProducts?.findIndex((productInCart) => productInCart.id === product.id);

          processedCartData.cartProducts[productIndexInCart] = finalizedProductData;
        }
        if (finalizedProductData?.data?.Variation) {
          const discountAmount = Number(finalizedProductData?.data?.DiscountPrice) > 0 ? Number(finalizedProductData?.data?.Variation[1]?.SalePrice) - Number(finalizedProductData?.data?.Variation[1]?.DiscountPrice) : 0;
          const productPriceData = { cost: Number(finalizedProductData?.data?.Variation[1]?.SalePrice), discount: discountAmount, qty: finalizedProductData?.quanity };
          const productOldPriceData = productAlreadyExistInCart?.data.Variation ? { cost: Number(productAlreadyExistInCart?.data?.Variation[1]?.SalePrice), discount: discountAmount, qty: productAlreadyExistInCart.quanity } : null;
          const calculatedCartTotals = CalculateCartAmount('adding-product', productPriceData, productOldPriceData, processedCartData.total, processedCartData.subTotal, processedCartData.discount, processedCartData.appliedPromoDiscount, processedCartData.deliveryCharges, storeData.selectedStoreDeliveryCharges, storeData.selectedStoreDeliveryChargesWaiveAfter, cartData.platformFee);
          processedCartData = { cartProducts: processedCartData.cartProducts, appliedPromo: processedCartData.appliedPromo, ...calculatedCartTotals };
        }
      }
      // For Per Box
      else {
        const productAlreadyExistInCart = GetThisProductDataFromCart(product?.id, processedCartData?.cartProducts);

        const stripItemInCart = GetThisProductDataFromCart(`${product?.id.slice(0, -4)}-Strip`, processedCartData?.cartProducts);
        const stripQuantity = stripItemInCart && Math.ceil(Number(stripItemInCart?.quanity || 0) / Number(product?.data?.Variation?.[0].NoofStrips || 0));
        const possibleQtyAfterAddingProduct = productAlreadyExistInCart ? productAlreadyExistInCart?.quanity + product?.quantityToAdd + Number(stripQuantity || 0) : product?.quantityToAdd + Number(stripQuantity || 0);
        const maxAllowedQty = Number(Number(product?.data?.Variation[0]?.MaxOrder || 0) - Number(stripQuantity || 0) - Number(productAlreadyExistInCart?.quanity || 0));

        const availableQty = Number(Number(product?.data?.Variation[0]?.AvailableQty) - Number(stripQuantity || 0) - Number(productAlreadyExistInCart?.quanity || 0) || 0);

        let QtyToAdd = 0;
        if (availableQty >= possibleQtyAfterAddingProduct) {
          QtyToAdd = possibleQtyAfterAddingProduct <= maxAllowedQty ? (productAlreadyExistInCart ? productAlreadyExistInCart?.quanity + product?.quantityToAdd : product?.quantityToAdd) : maxAllowedQty;
        } else {
          QtyToAdd = availableQty <= maxAllowedQty && availableQty > 0 ? (productAlreadyExistInCart ? productAlreadyExistInCart?.quanity + product?.quantityToAdd : product?.quantityToAdd) : 0;
        }
        const avalibleStrip = Number(Number(product?.data?.Variation[1]?.AvailableQty) - Number(stripItemInCart?.quanity || 0) - Number(Number(productAlreadyExistInCart?.quanity || 0) * Number(product?.data?.Variation[0]?.NoofStrips || 0) || 0) || 0);
        if (QtyToAdd === 0 && avalibleStrip >= Number(product.data.Variation[0].NoofStrips || 0)) {
          QtyToAdd = productAlreadyExistInCart ? productAlreadyExistInCart?.quanity + product?.quantityToAdd : product?.quantityToAdd;
        }

        if (QtyToAdd <= Number(productAlreadyExistInCart?.quanity || 0)) {
          productAddedMessages.push({ productID: product.id, message: 'Maximum allowed quantity limit reached!' });
          return;
        } else productAddedMessages.push({ productID: product.id, message: 'Product added in cart', products: { id: product.id, data: product.data, quantityToAdd: QtyToAdd, perStrip: product.perStrip } });

        const finalizedProductData: CartProductType = { id: product.id?.includes('-Box') ? product.id : `${product.id}-Box`, quanity: QtyToAdd, data: product?.data, perStrip: product?.perStrip };
        if (productAlreadyExistInCart === undefined && QtyToAdd > 0) processedCartData?.cartProducts?.push(finalizedProductData);
        else {
          const productIndexInCart = processedCartData?.cartProducts?.findIndex((productInCart) => productInCart.id === product.id);
          processedCartData.cartProducts[productIndexInCart] = finalizedProductData;
        }
        if (finalizedProductData?.data?.Variation) {
          const discountAmount = Number(finalizedProductData?.data?.DiscountPrice) > 0 ? Number(finalizedProductData?.data?.Variation[0]?.SalePrice) - Number(finalizedProductData?.data?.Variation[0]?.DiscountPrice) : 0;
          const productPriceData = { cost: Number(finalizedProductData?.data?.Variation[0]?.SalePrice), discount: discountAmount, qty: finalizedProductData?.quanity };
          const productOldPriceData = productAlreadyExistInCart ? { cost: Number(productAlreadyExistInCart?.data?.Variation[0]?.SalePrice), discount: discountAmount, qty: productAlreadyExistInCart.quanity } : null;
          const calculatedCartTotals = CalculateCartAmount('adding-product', productPriceData, productOldPriceData, processedCartData.total, processedCartData.subTotal, processedCartData.discount, processedCartData.appliedPromoDiscount, processedCartData.deliveryCharges, storeData.selectedStoreDeliveryCharges, storeData.selectedStoreDeliveryChargesWaiveAfter, cartData.platformFee);
          processedCartData = { cartProducts: processedCartData.cartProducts, appliedPromo: processedCartData.appliedPromo, ...calculatedCartTotals };
        }
      }
    }
    // For Products without variation
    else {
      const productAlreadyExistInCart = GetThisProductDataFromCart(product.id, processedCartData.cartProducts);
      const possibleQtyAfterAddingProduct = productAlreadyExistInCart ? productAlreadyExistInCart.quanity + product.quantityToAdd : product.quantityToAdd;
      const availableQty = Number(product?.data?.AvailableQty || '0');
      const maxAllowedQty = Number(product?.data?.MaxOrder || '0');
      let QtyToAdd = 0;
      if (availableQty >= possibleQtyAfterAddingProduct) QtyToAdd = possibleQtyAfterAddingProduct <= maxAllowedQty ? possibleQtyAfterAddingProduct : maxAllowedQty;
      else QtyToAdd = availableQty <= maxAllowedQty ? availableQty : maxAllowedQty;

      if (QtyToAdd === productAlreadyExistInCart?.quanity) {
        if (possibleQtyAfterAddingProduct >= maxAllowedQty) {
          productAddedMessages.push({ productID: product.id, message: 'Maximum allowed quantity limit reached!' });
          return;
        } else {
          if (availableQty <= maxAllowedQty) {
            const productName = product.data.Title;
            const toastMessage = `Only ${availableQty} quantity available of ${productName}.`;
            productAddedMessages.push({ productID: product.id, message: toastMessage });
            return;
          } else {
            productAddedMessages.push({ productID: product.id, message: 'Product added in cart', products: { id: product.id, data: product.data, quantityToAdd: QtyToAdd, perStrip: product.perStrip } });
          }
        }
      } else {
        productAddedMessages.push({ productID: product.id, message: 'Product added in cart', products: { id: product.id, data: product.data, quantityToAdd: QtyToAdd, perStrip: product.perStrip } });
      }

      const finalizedProductData: CartProductType = { id: product.id, quanity: QtyToAdd, data: product.data, perStrip: undefined };
      if (productAlreadyExistInCart === undefined) processedCartData.cartProducts.push(finalizedProductData);
      else {
        const productIndexInCart = processedCartData.cartProducts.findIndex((productInCart) => productInCart.id === product.id);
        processedCartData.cartProducts[productIndexInCart] = finalizedProductData;
      }

      const discountAmount = Number(finalizedProductData.data.DiscountPrice) > 0 ? Number(finalizedProductData.data.Price) - Number(finalizedProductData.data.DiscountPrice) : 0;

      const productPriceData = { cost: Number(finalizedProductData.data.Price), discount: discountAmount, qty: finalizedProductData.quanity };
      const productOldPriceData = productAlreadyExistInCart ? { cost: Number(productAlreadyExistInCart.data.Price), discount: discountAmount, qty: productAlreadyExistInCart.quanity } : null;
      const calculatedCartTotals = CalculateCartAmount('adding-product', productPriceData, productOldPriceData, processedCartData.total, processedCartData.subTotal, processedCartData.discount, processedCartData.appliedPromoDiscount, processedCartData.deliveryCharges, storeData.selectedStoreDeliveryCharges, storeData.selectedStoreDeliveryChargesWaiveAfter, cartData.platformFee);

      processedCartData = { cartProducts: processedCartData.cartProducts, appliedPromo: processedCartData.appliedPromo, ...calculatedCartTotals };
    }
  });
  await PostAddCartInDB(
    storeData?.selectedStoreCode,
    'web',
    {
      appliedPromo: processedCartData?.appliedPromo,
      cartProducts: processedCartData?.cartProducts,
      appliedPromoDiscount: processedCartData?.appliedPromoDiscount,
      createdAt: `${getCarts?.createdAt}`,
      deliveryCharges: processedCartData?.deliveryCharges,
      discount: processedCartData?.discount,
      platformFee: cartData?.platformFee,
      subTotal: processedCartData?.subTotal,
      total: processedCartData?.total,
    },
    { token: customerToken !== null ? customerToken : undefined }
  );
  dispatch(cartActions.setCart(processedCartData));
  await SetCartInLocalStorage(processedCartData);
  return productAddedMessages;
});

type ProductRemovedMessage = { products?: { id: string; qtyToRemove: number } };
export const removeProductFromCart = createAsyncThunk<ProductRemovedMessage[], { products: { id: string; qtyToRemove: number | 'all' }[]; perStrip?: boolean | undefined }, AsyncThunkConfig>(CartThunks.RemoveProductsFromCart, async ({ products, perStrip }, { dispatch, getState }) => {
  const cartData = getState().cart;
  const storeData = getState().store;
  const getCarts = await GetCartFromLocalStorage();
  const customerToken = GetCustomerTokenInLocalStorage();
  let discountAmount;
  let productPriceData;
  let calculatedCartTotals;
  let processedCartData: CartSliceType = deepClone(cartData);
  const productRemovedFromCartMessages: ProductRemovedMessage[] = [];
  products.forEach((product) => {
    const productAlreadyExistInCart = GetThisProductDataFromCart(product.id, processedCartData.cartProducts);
    if (productAlreadyExistInCart === undefined) return;
    const isDeletingProductFromCart = Boolean(product.qtyToRemove === 'all' || product.qtyToRemove >= productAlreadyExistInCart.quanity);
    const qtyToRemove = product.qtyToRemove !== 'all' && !isDeletingProductFromCart ? product.qtyToRemove : productAlreadyExistInCart.quanity;
    if (productAlreadyExistInCart.data.Variation && productAlreadyExistInCart.data.Variation.length > 0) {
      if (perStrip) {
        discountAmount = Number(productAlreadyExistInCart?.data?.Variation?.[1]?.DiscountPrice) > 0 ? Number(productAlreadyExistInCart.data.Variation?.[1].SalePrice) - Number(productAlreadyExistInCart?.data?.Variation?.[1]?.DiscountPrice) : 0;

        productPriceData = { cost: Number(productAlreadyExistInCart.data.Variation?.[1].SalePrice), discount: discountAmount, qty: qtyToRemove };
        calculatedCartTotals = CalculateCartAmount('removing-product', productPriceData, null, processedCartData.total, processedCartData.subTotal, processedCartData.discount, processedCartData.appliedPromoDiscount, processedCartData.deliveryCharges, storeData.selectedStoreDeliveryCharges, storeData.selectedStoreDeliveryChargesWaiveAfter, cartData.platformFee);
      } else {
        discountAmount = Number(productAlreadyExistInCart.data?.Variation?.[0]?.DiscountPrice) > 0 ? Number(productAlreadyExistInCart.data.Variation?.[0].SalePrice) - Number(productAlreadyExistInCart.data.Variation?.[0].DiscountPrice) : 0;

        productPriceData = { cost: Number(productAlreadyExistInCart.data.Variation?.[0].SalePrice), discount: discountAmount, qty: qtyToRemove };
        calculatedCartTotals = CalculateCartAmount('removing-product', productPriceData, null, processedCartData.total, processedCartData.subTotal, processedCartData.discount, processedCartData.appliedPromoDiscount, processedCartData.deliveryCharges, storeData.selectedStoreDeliveryCharges, storeData.selectedStoreDeliveryChargesWaiveAfter, cartData.platformFee);
      }
    } else {
      discountAmount = Number(productAlreadyExistInCart.data.DiscountPrice) > 0 ? Number(productAlreadyExistInCart.data.Price) - Number(productAlreadyExistInCart.data.DiscountPrice) : 0;

      productPriceData = { cost: Number(productAlreadyExistInCart.data.Price), discount: discountAmount, qty: qtyToRemove };
      calculatedCartTotals = CalculateCartAmount('removing-product', productPriceData, null, processedCartData.total, processedCartData.subTotal, processedCartData.discount, processedCartData.appliedPromoDiscount, processedCartData.deliveryCharges, storeData.selectedStoreDeliveryCharges, storeData.selectedStoreDeliveryChargesWaiveAfter, cartData.platformFee);
    }
    if (isDeletingProductFromCart) processedCartData.cartProducts = processedCartData.cartProducts.filter((productInCart) => productInCart.id.toString() !== product.id);
    else {
      processedCartData.cartProducts = processedCartData.cartProducts.map((item) => {
        if (item.id === product.id) item.quanity -= qtyToRemove;
        return item;
      });
    }
    toast('Product removed from Cart', {
      toastId: customId,
      position: 'bottom-center',
      autoClose: 500,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      transition: Slide,
      theme: 'dark',
    });

    processedCartData = { cartProducts: processedCartData.cartProducts, appliedPromo: processedCartData.appliedPromo, ...calculatedCartTotals };
    if (processedCartData.cartProducts.length === 0) {
      processedCartData = {
        cartProducts: [],
        subTotal: 0,
        discount: 0,
        deliveryCharges: 0,
        appliedPromoDiscount: 0,
        total: 0,
        appliedPromo: '',
        platformFee: 0,
        createdAt: new Date(),
      };
    }
    processedCartData.cartProducts.map((item) => {
      if (item.id === product.id) productRemovedFromCartMessages.push({ products: { id: product?.id, qtyToRemove: item?.quanity } });
    });
  });
  await PostAddCartInDB(
    storeData?.selectedStoreCode,
    'web',
    {
      appliedPromo: processedCartData?.appliedPromo,
      cartProducts: processedCartData?.cartProducts,
      appliedPromoDiscount: processedCartData?.appliedPromoDiscount,
      createdAt: `${getCarts.createdAt}`,
      deliveryCharges: processedCartData?.deliveryCharges,
      discount: processedCartData?.discount,
      platformFee: cartData?.platformFee,
      subTotal: processedCartData?.subTotal,
      total: processedCartData?.total,
    },
    { token: customerToken !== null ? customerToken : undefined }
  );
  if (processedCartData?.cartProducts?.length === 0) {
    dispatch(clearPrescription());
  }
  dispatch(cartActions.setCart(processedCartData));
  await SetCartInLocalStorage(processedCartData);
  return productRemovedFromCartMessages;
});

export const setVoucherDiscount = createAsyncThunk<void, { voucherCode: string; voucherDiscount: number; action: 'add' | 'remove' }, AsyncThunkConfig>(CartThunks.SetVoucherDiscount, async ({ voucherCode, voucherDiscount, action }, { dispatch, getState }) => {
  const cartData = getState().cart;
  const processedCartData = deepClone(cartData);

  if (action === 'add') {
    processedCartData.appliedPromo = voucherCode;
    processedCartData.appliedPromoDiscount = voucherDiscount;
  } else if (action === 'remove') {
    processedCartData.appliedPromo = '';
    processedCartData.appliedPromoDiscount = 0;
  }
  processedCartData.total = CalculateCartTotal(processedCartData.subTotal, processedCartData.discount, processedCartData.deliveryCharges, processedCartData.appliedPromoDiscount, cartData.platformFee, voucherCode !== '' ? true : false);
  dispatch(cartActions.setCart({ total: processedCartData.total, subTotal: processedCartData.subTotal, appliedPromoDiscount: processedCartData.appliedPromoDiscount, appliedPromo: processedCartData.appliedPromo, deliveryCharges: processedCartData.deliveryCharges, discount: processedCartData.discount }));
  await SetCartInLocalStorage(processedCartData);
});

export const setDeliveryCharges = createAsyncThunk<void, { deliveryCharges: number }, AsyncThunkConfig>(CartThunks.SetDeliveryCharges, async ({ deliveryCharges }, { dispatch, getState }) => {
  const cartData = getState().cart;
  const processedCartData = deepClone(cartData);

  processedCartData.deliveryCharges = deliveryCharges;
  processedCartData.total = CalculateCartTotal(processedCartData.subTotal, processedCartData.discount, processedCartData.deliveryCharges, processedCartData.appliedPromoDiscount, cartData.platformFee);

  dispatch(cartActions.setCart(processedCartData));
  await SetCartInLocalStorage(processedCartData);
});

export const overwriteCartWithTheseProducts = createAsyncThunk<void, { products: { id: string; data: ProductDataType; quantityToAdd: number; perStrip?: boolean }[] }, AsyncThunkConfig>(CartThunks.OverrideCartWithTheseProducts, async ({ products }, { dispatch }) => {
  if (!products) return;
  await dispatch(emptyCart({}));
  await dispatch(addProductsInCart({ products }));
});

export const updateCartWithRespectToProductsAvailableQty = createAsyncThunk<{ cartExpired: boolean }, {}, AsyncThunkConfig>(CartThunks.UpdateCartWithRespectToProductsAvailableQty, async ({}, { dispatch, getState }) => {
  const cartData = getState().cart;
  const storeData = getState().store;
  const localCartData = await GetCartFromLocalStorage();
  let cartExpired = false;
  if ((new Date().getTime() - new Date(localCartData.createdAt).getTime()) / 1000 > 80000) {
    dispatch(cartActions.setCart(cartSliceIntialState));
    cartExpired = true;
  } else if (cartData.cartProducts?.length !== 0) {
    const productIDsString = cartData.cartProducts?.map((product) => {
      if (product?.id?.includes('-Box')) return product.id?.slice(0, -4);
      else if (product?.id?.includes('-Strip')) return product.id?.slice(0, -6);
      else return product.id;
    });
    type Product = {
      id: string;
      data: ProductDataType;
      quantityToAdd: number;
      perStrip?: boolean;
    };
    const response = await getMultipleProducts(productIDsString.join('|'), storeData.selectedStoreCode, {});
    if (response) {
      const data = response.Data.flatMap((item) =>
        cartData.cartProducts?.map((data) => {
          const id = data.id && data.id.includes('Box') ? data.id.slice(0, -4) : data.id && data.id.includes('-Strip') ? data.id.slice(0, -6) : data.id;
          if (item.ID === id) {
            if (item.Variation && item.Variation.length > 0 && data?.perStrip === true) return { ...item, perStripBox: true, VariationTitle: data.data.Variations, quantityToAdd: data.quanity, ID: data.id };
            else if (item.Variation && item.Variation.length > 0 && data?.perStrip === false) return { ...item, perStripBox: false, VariationTitle: data.data.Variations, quantityToAdd: data.quanity, ID: data.id };
            else return { ...item, perStripBox: undefined, VariationTitle: data.data.Variations, quantityToAdd: data.quanity, ID: data.id };
          }
        })
      );
      const products = data.map((item) => {
        if (item?.perStripBox === true) {
          if (Number(item?.Variation[1]?.AvailableQty) > 0) return { id: item.ID, data: { ...item, ID: item.ID.slice(0, -6) }, quantityToAdd: Number(Number(item.quantityToAdd) >= Number(item.Variation[1].AvailableQty) ? item.Variation[1].AvailableQty : item.quantityToAdd), perStrip: true };
          else return null;
        } else if (item?.perStripBox === false) {
          if (Number(item?.Variation[0]?.AvailableQty) > 0) return { id: item.ID, data: { ...item, ID: item.ID.slice(0, -4) }, quantityToAdd: Number(Number(item.quantityToAdd) >= Number(item.Variation[0].AvailableQty) ? item.Variation[0].AvailableQty : item.quantityToAdd), perStrip: false };
          else return null;
        } else {
          if (item && Number(item.AvailableQty) > 0) {
            return { id: item.ID, data: item, quantityToAdd: Number(Number(item.quantityToAdd) > Number(item.AvailableQty) ? item.AvailableQty : item.quantityToAdd) };
          } else {
            return null;
          }
        }
      }) as Product[];
      const filteredProducts = products.filter((product) => product !== null);
      if (filteredProducts !== undefined && filteredProducts.length > 0) {
        await dispatch(overwriteCartWithTheseProducts({ products: filteredProducts }));
        const voucherCode = cartData.appliedPromo || '';
        const voucherDiscount = cartData.appliedPromoDiscount;
        if (voucherCode !== '') await dispatch(setVoucherDiscount({ voucherCode, voucherDiscount, action: 'add' }));
      } else {
        toast('Item Not Avaliable!', {
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

        return;
      }
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 500));
  return cartExpired;
});
