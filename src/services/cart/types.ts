// GetChildCategory
export type CartMessageData_Response = {
  ResponseType: 1;
  message: string;
};
export type cartData_Response = {
  appliedPromo: string;
  appliedPromoDiscount: number;
  cartProducts: cartProductData_Response[];
  createdAt: string;
  deliveryCharges: number;
  discount: number;
  platformFee: number;
  subTotal: number;
  total: number;
};

export type cartProductData_Response = {
  data?: {
    AvailableQty?: string;
    Category?: string;
    CategoryImageURL?: string;
    DiscountAmount?: string;
    DiscountPrice?: string;
    DiscountStripAmount?: string;
    DiscountStripPrice?: string;
    ID?: string;
    MaxOrder?: string;
    NoofStrips?: string;
    Price?: string;
    ProductID?: string;
    ProductImage?: string;
    SalePrice?: string;
    SaleStripPrice?: string;
    Slug?: string;
    Title?: string;
    TotalStripTablets?: string;
    TotalTablets?: string;
    Variation?: [];
    Variations?: string;
  };
  id?: string;
  quanity?: number;
};
