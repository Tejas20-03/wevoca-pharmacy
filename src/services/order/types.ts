// MyOrders
export type MyOrders_ResponseType = {
  ResponseType: 1 | '0';
  Data: MyOrders_OrdersDataType[];
};
export type MyOrders_OrdersDataType = {
  ID: string;
  CustomerName: string;
  Total: string;
  ShippingAddress: string;
  OrderStatus: string;
  Created_at: string;
  OutletName: string;
  TotalItems: string;
};

// MyPendingOrders
export type MyPendingOrders_ResponseType = {
  responseType: 1 | '0';
  Data: MyPendingOrders_ResponseDataType[];
};
export type MyPendingOrders_ResponseDataType = {
  ID: string;
  CustomerName: string;
  Total: string;
  ShippingAddress: string;
  OrderStatus: string;
  Created_at: string;
  OutletName: string;
  TotalItems: string;
};

// GetOrderDetail
export type GetOrderDetail_ResponseType = {
  Message?: string;
  ID: string;
  OrderPlatformID: string;
  ShopifyOrderID: string;
  app_id: string;
  browser_ip: string;
  contact_email: string;
  CreatedAt: string;
  OrderTime: string;
  Shopify_CreatedAt: string;
  Shopify_UpdatedAt: string;
  Currency: string;
  Subtotal: string;
  Total: string;
  Total_Tax: string;
  OrderStatus: string;
  Fulfillment_status: string;
  Gateway: string;
  OrderNumber: string;
  Phone: string;
  ProcessingMethod: string;
  PlatformFees: string;
  Source: string;
  TotalPriceUSD: string;
  CustomerName: string;
  ShopifyPayload: string;
  CustomerID: string;
  ShippingAddress: string;
  DeliveryFees: string;
  DeliveryStatus: string;
  Discount: string;
  CancelReason: string;
  Latitude: string;
  Longitude: string;
  Remarks: string;
  CustomerAddressID: string;
  CreatedBy: string;
  BranchID: string;
  Created_at: string;
  Assigned_at: string;
  Picked_at: string;
  Cancelled_at: string;
  Delivered_at: string;
  Verified_at: string;
  AssignedRiderID: string;
  Accepted_at: string;
  invc_sid: string;
  OrderChecked: string;
  AppliedRuleID: string;
  DSPID: string;
  VoucherID: string;
  VoucherCode: string;
  VoucherValue: string;
  BranchName: string;
  ExpectedDeliveryTime: string;
  Detail: GetOrderDetail_DetailsDataType[];
  Rating?: string;
};
export type GetOrderDetail_DetailsDataType = {
  AddOnEdit: string;
  ChildCategory: string;
  Discount: string;
  Generics: string;
  Grams: string;
  ID: string;
  IsReviewed: string;
  ItemImage: string;
  OrderID: string;
  ParentCategory: string;
  Price: string;
  ProductID: string;
  ProductSlug: string;
  ProductTitle: string;
  Quantity: string;
  Rating: string;
  Review: string;
  ReviewID: string;
  SKU: string;
  ShopifyProductID: string;
  ShopifyProductTitle: string;
  ShopifyVariantID: string;
  ShopifyVariantTitle: string;
  TotalPrice: string;
  VariantID: string;
  VariantTitle: string;
  Vendor: string;
  Brand: string;
  UsedFor: string;
};

// CheckOrderStatus
export type CheckOrderStatus_ResponseType = {
  ResponseType: 1;
  Data: CheckOrderStatus_ResponseDataType[];
};
export type CheckOrderStatus_ResponseDataType = {
  ID: string;
  FinancialStatus: string;
  FulfillmentStatus: string;
  DeliveryStatus: string;
  CancelReason: string;
  Created_at: string;
  Assigned_at: string;
  Picked_at: string;
  Cancelled_at: string;
  Delivered_at: string;
  Verified_at: string;
};

// GetCancelReason
export type GetCancelReason_ResponseType = {
  responseType: 1 | '0';
  Data: GetCancelReason_ResponseDataType[];
};
export type GetCancelReason_ResponseDataType = {
  id: string;
  CancelReason: string;
};

// CancelOrder
export type CancelOrder_ResponseType = {
  responseType: 1 | '0';
  message: string;
};

// RateOrder
export type RateOrder_ResponseType = {
  responseType: 1 | '0';
  message: string;
};

export type orders_ResponseType = {
  ResponseType: 1 | '0';
  Data: orders_OrdersDataType[];
};
export type orders_OrdersDataType = {
  ID: string;
  CustomerName: string;
  Total: string;
  ShippingAddress: string;
  OrderStatus: string;
  Created_at: string;
  OutletName: string;
  TotalItems: string;
};
