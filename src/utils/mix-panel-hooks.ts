import { ProductDataType } from '@/services/product/types';
import mixpanel from 'mixpanel-browser';
import * as gtag from '@/utils/googleEvents';
import * as fbq from '@/utils/fpixel';

export const addToCartMixPanelFunction = (qty: number | undefined, variation: string, productDetailValues?: ProductDataType, productDescriptionValues?: string, storeData: string | undefined, total: number) => {
  if(productDetailValues){
  // mixpanel.track('add_to_cart', {
  //   item_name: productDetailValues?.Title || '',
  //   category_1: productDetailValues?.Category || '',
  //   category_2: productDetailValues?.ParentCategory || '',
  //   category_3: '',
  //   product_id: productDetailValues?.UPC ? productDetailValues?.UPC : productDetailValues?.ShopifyProductID,
  //   price: Number(productDetailValues?.DiscountPrice) !== 0 ? Number(productDetailValues?.DiscountPrice) : Number(productDetailValues?.SalePrice) || 0,
  //   unit: productDetailValues?.Variations || '',
  //   type: productDetailValues?.Variations || '',
  //   manufacturer: productDetailValues?.Brand || '',
  //   generics: productDetailValues.Generic || '',
  //   store_id: storeData,
  //   event_source: 'Web',
  //   quantity: qty ?? 0,
  //   used_for: productDetailValues?.Usedfor || '',
  // });
  if (typeof window !== 'undefined') {
    // window?.webengage?.track('add_to_cart', {
    //   item_name: productDetailValues?.Title || '',
    //   category_1: productDetailValues?.Category || '',
    //   category_2: productDetailValues?.ParentCategory || '',
    //   category_3: '',
    //   product_id: productDetailValues?.UPC ? productDetailValues?.UPC : productDetailValues?.ShopifyProductID,
    //   price: Number(productDetailValues?.DiscountPrice) !== 0 ? Number(productDetailValues?.DiscountPrice) : Number(productDetailValues?.SalePrice) || 0,
    //   unit: productDetailValues?.Variations || '',
    //   type: productDetailValues?.Variations || '',
    //   manufacturer: productDetailValues?.Brand || '',
    //   generics: productDetailValues.Generic || '',
    //   store_id: storeData,
    //   event_source: 'Web',
    //   quantity: qty ?? 0,
    //   used_for: productDetailValues?.Usedfor || '',
    // });
  }
  gtag.event({
    action: 'add_to_cart',
    params: {
      currency: 'PKR',
      value: Number(productDetailValues?.DiscountPrice) !== 0 ? Number(productDetailValues?.DiscountPrice) : Number(productDetailValues?.SalePrice) || 0,
      items: [productDetailValues].map((item) => ({
        item_id: item?.UPC?.toString() ? item?.UPC?.toString() : item?.ShopifyProductID?.toString() ,
        item_name: item?.Title,
        item_brand: item?.Brand || '',
        item_category: item?.Category || '',
        item_category2: item?.ParentCategory || '',
        item_category4: item?.Generic || '',
        item_category5: variation || '',
      })),
    },
  });
  fbq.event('AddToCart', {
    content_ids: productDetailValues?.UPC ?productDetailValues?.UPC :productDetailValues?.ShopifyProductID,
    content_category: productDetailValues?.Category,
    content_name: productDetailValues?.Title,
    currency: 'PKR',
    value: Number(productDetailValues?.DiscountPrice) !== 0 ? Number(productDetailValues?.DiscountPrice) : Number(productDetailValues?.SalePrice) || 0,
  });
}
};

export const removeFromCartMixPanelFunction = (qty: number | undefined, variation: string | undefined, productDetailValues?: ProductDataType, productDescriptionValues?: string, storeData: string | undefined, total: number) => {
  if(productDetailValues){
  // mixpanel.track('removed_from_cart', {
  //   product_name: productDetailValues?.Title || '',
  //   category_1: productDetailValues?.Category || '',
  //   category_2: productDetailValues?.ParentCategory || '',
  //   category_3: '',
  //   product_id: productDetailValues?.UPC ? productDetailValues?.UPC : productDetailValues?.ShopifyProductID,
  //   price: Number(productDetailValues?.DiscountPrice) !== 0 ? Number(productDetailValues?.DiscountPrice) : Number(productDetailValues?.SalePrice) || 0,
  //   unit: productDetailValues?.Variations || '',
  //   type: productDetailValues?.Variations || '',
  //   manufacturer: productDetailValues?.Brand || '',
  //   generics: productDetailValues.Generic || '',
  //   store_id: storeData,
  //   event_source: 'Web',
  //   quantity: qty || 1,
  //   used_for: productDetailValues?.Usedfor || '',
  // });
  if (typeof window !== 'undefined') {
    // window?.webengage?.track('removed_from_cart', {
    //   product_name: productDetailValues?.Title || '',
    //   category_1: productDetailValues?.Category || '',
    //   category_2: productDetailValues?.ParentCategory || '',
    //   category_3: '',
    //   product_id: productDetailValues?.UPC ? productDetailValues?.UPC : productDetailValues?.ShopifyProductID,
    //   price: Number(productDetailValues?.DiscountPrice) !== 0 ? Number(productDetailValues?.DiscountPrice) : Number(productDetailValues?.SalePrice) || 0,
    //   unit: productDetailValues?.Variations || '',
    //   type: productDetailValues?.Variations || '',
    //   manufacturer: productDetailValues?.Brand || '',
    //   generics: productDetailValues.Generic || '',
    //   store_id: storeData,
    //   event_source: 'Web',
    //   quantity: qty || 1,
    //   used_for: productDetailValues?.Usedfor || '',
    // });
  }
  gtag.event({
    action: 'remove_from_cart',
    params: {
      currency: 'PKR',
      value: Number(productDetailValues?.DiscountPrice) !== 0 ? Number(productDetailValues?.DiscountPrice) : Number(productDetailValues?.SalePrice) || 0,
      items: [productDetailValues].map((item) => ({
        item_id: item?.UPC?.toString() ? item?.UPC?.toString() : item?.ShopifyProductID?.toString() ,
        item_name: item?.Title,
        item_brand: item?.Brand || '',
        item_category: item?.Category || '',
        item_category2: item?.ParentCategory || '',
        item_category4: item?.Generic || '',
        item_category5: variation || '',
      })),
    },
  });
}
};
