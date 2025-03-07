import { CartProductType, CartSliceType } from '@/redux/cart/slice';

// export const GetAllUniqueCartProductIDs = (cartProducts: CartProductType[]): string[] => cartProducts.map(product => product.id);
export const GetThisProductDataFromCart = (productID: string, cartProducts: CartProductType[]): CartProductType | undefined => {
  return cartProducts.find(product => product.id.toString() === productID)
};
// export const DoesThisProductExistInCart = (productID: string, cartProducts: CartProductType[]): boolean => Boolean(GetThisProductDataFromCart(productID, cartProducts));

// export const GetStripsProducts = (productID: string, cartProducts: CartProductType[]): CartProductType | undefined => {
//   cartProducts.find(product => {
//     if (product.id === productID && product.perStrip) return product;
//   });
//   return;
// };
const CalculateCartSubTotal = (subTotal: number, productPrice: number, action: cartCalculationAction) => (action === 'adding-product' ? subTotal + productPrice : subTotal - productPrice);
const CalculateCartDiscount = (discount: number, productDiscount: number, action: cartCalculationAction) => (action === 'adding-product' ? discount + productDiscount : discount - productDiscount);
const CalculateCartDeliveryCharges = (subTotal: number, discount: number, maxDeliveryCharges: number, deliveryChargesWaiveAfter: number) => (deliveryChargesWaiveAfter > 0 && subTotal - discount >= deliveryChargesWaiveAfter ? 0 : maxDeliveryCharges);
export const CalculateCartTotal = (subTotal: number, discount: number, deliveryCharges: number, appliedPromoDiscount: number, platformFee: number, voucherAppliedFlag = false) => {
  let total = 0;
  total = (appliedPromoDiscount > subTotal) ? 0 : subTotal;
  total = appliedPromoDiscount > subTotal ? 0 : appliedPromoDiscount > 0 ? total - appliedPromoDiscount : (voucherAppliedFlag && appliedPromoDiscount === 0) ? total : total - discount;
  total = total + deliveryCharges + platformFee
  if (total < 0) total = 0;
  return total;
};

type cartCalculationAction = 'adding-product' | 'removing-product';
type cartCalculationProductPriceData = { cost: number; discount: number; qty: number };
export const CalculateCartAmount = (action: cartCalculationAction, productPriceData: cartCalculationProductPriceData, productOldPriceData: cartCalculationProductPriceData | null, cartTotal: number, cartSubTotal: number, cartDiscount: number, cartAppliedPromoDiscount: number, cartDeliveryCharges: number, maxDeliveryCharges: number, deliveryChargesWaiveAfter: number, platformFee: number): Omit<CartSliceType, 'cartProducts' | 'appliedPromo' | 'platformFee'> => {
  let total = cartTotal;
  let subTotal = cartSubTotal;
  let deliveryCharges = cartDeliveryCharges;
  let discount = cartDiscount;
  const appliedPromoDiscount = cartAppliedPromoDiscount;
  if (action === 'removing-product') {
    subTotal = CalculateCartSubTotal(subTotal, productPriceData.cost * productPriceData.qty, 'removing-product');
    discount = CalculateCartDiscount(discount, productPriceData.discount * productPriceData.qty, 'removing-product');
  } else if (action === 'adding-product') {
    if (productOldPriceData !== null) {
      subTotal = CalculateCartSubTotal(subTotal, productOldPriceData.cost * productOldPriceData.qty, 'removing-product');
      discount = CalculateCartDiscount(discount, productOldPriceData.discount * productOldPriceData.qty, 'removing-product');
    }
    subTotal = CalculateCartSubTotal(subTotal, productPriceData.cost * productPriceData.qty, 'adding-product');
    discount = CalculateCartDiscount(discount, productPriceData.discount * productPriceData.qty, 'adding-product');
  }

  deliveryCharges = CalculateCartDeliveryCharges(subTotal, discount, maxDeliveryCharges, deliveryChargesWaiveAfter);
  total = CalculateCartTotal(subTotal, discount, deliveryCharges, appliedPromoDiscount, platformFee);

  if (total < 0) total = 0;

  return { total, subTotal, discount, deliveryCharges, appliedPromoDiscount };
};