// API Method=GetBannersNew
export declare type BannersType = {
  ID: string;
  Title: string;
  Description: string;
  BranchID: string;
  IsActive: string;
  CreatedBy: string;
  CreatedAt: string;
  UpdatedBy: string;
  UpdatedAt: string;
  StartDate: string;
  EndDate: string;
  ScheduleJSON: string;
  Detail: BannersDetailType[];
};
export declare type BannersDetailType = {
  ID: string;
  BannerID: string;
  BannerImageGUID: string;
  Type: string;
  TypeID: string;
  TypeValue: string;
  Text: string;
  Sort: string;
  BannerImageNew: string;
  Slug: string;
};

// API Method=GetChildCategory
export declare type SubCategoryResponseType = {
  ResponseType: number;
  Data: SubCategoryDataType[];
};
export declare type SubCategoryDataType = {
  ID: string;
  Name: string;
  ParentID: string;
};

// API Method=GetComplaintType
export declare type AllComplaintsResponseType = {
  ResponseType: number;
  Data: AllComplaintsDataType[];
};
export declare type AllComplaintsDataType = {
  ID: string;
  name: string;
  value: string;
  Alias: string;
};

// API Method=AddComplaint
export declare type SubmitComplaintType = {
  responseType: number;
  ComplaintNumber: number;
  message: string;
};

// API Method=GetCustomerCreditCard
export declare type AllCustomerCreditCardType = {
  ResponseType: number;
  Data: CreditCardApiDataType[];
};
export declare type CreditCardApiDataType = {
  ID: string;
  CustomerID: string;
  Name: string;
  CardNumber: string;
  CVC: string;
  Expiry: string;
  Token: string;
  Created: string;
};

// API GetBranchCodeByLatLng
export declare type BranchCodeByLatLngType = {
  ResponseType: number;
  Data: {
    ID: number;
    Title: string;
    Description: null;
    Polygon: null;
    DeliveryMins: number;
    Phone: null;
    Address: string;
    Longitude: string;
    Latitude: string;
    IsActive: boolean;
    IsBackupBranch: boolean;
    CreatedBy: number;
    CreatedAt: string | null;
    UpdatedBy: number;
    UpdatedAt: string | null;
    EditURL: string | null;
    ScheduleJSON: string | null;
    BranchCode: string;
    IsAvailable: boolean;
  }[];
  Msg: string | null;
  StackTrace: string | null;
};

// API Method=AddInquiry
export declare type AddInquiryType = {
  responseType: number;
  message: string;
};

// API Method=AddFeedback
export declare type SubmitFeedbackType = {
  responseType: number;
  FeedbackNumber: number;
  message: string;
};

// API Method=GetNotification
export declare type HeadlineResponseType = {
  ResponseType: number;
  Data: HeadlineDataType[];
};
export declare type HeadlineDataType = {
  ID: string;
  Notification: string;
  IsActive: string;
  Created: string;
};

// API Method=MyOrders
export declare type AllOrdersType = {
  ResponseType: number;
  Data: AllOrdersDataType[];
};
export declare type AllOrdersDataType = {
  ID: string;
  CustomerName: string;
  Total: string;
  ShippingAddress: string;
  OrderStatus: string;
  Created_at: string;
  OutletName: string;
};

// API Method=MyPendingOrders
export declare type PendingOrdersType = {
  responseType: string;
  Data: [] | PendingOrdersDataType[];
};
export declare type PendingOrdersDataType = {
  ID: string;
  CustomerName: string;
  Total: string;
  ShippingAddress: string;
  OrderStatus: string;
  Created_at: string;
  OutletName: string;
};

// API Method=GetOrderDetail
export declare type OrderDetailsResponseType = {
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
  Source: string;
  TotalPriceUSD: string;
  CustomerName: string;
  ShopifyPayload: string;
  CustomerID: string;
  ShippingAddress: string;
  DeliveryStatus: string;
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
  Detail: OrderDetailsDataType[];
};
export declare type OrderDetailsDataType = {
  ID: string;
  OrderID: string;
  ShopifyProductID: string;
  SKU: string;
  ShopifyProductTitle: string;
  ShopifyVariantID: string;
  ShopifyVariantTitle: string;
  ProductID: string;
  ProductTitle: string;
  VariantID: string;
  VariantTitle: string;
  Price: string;
  Discount: string;
  Quantity: string;
  Vendor: string;
  Grams: string;
  TotalPrice: string;
};

// API Method=CheckOrderStatus
export declare type CheckOrderStatusResponseType = {
  ResponseType: number;
  Data: CheckOrderStatusDataType[];
};
export declare type CheckOrderStatusDataType = {
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

// API Method=GetCancelReason
export declare type OrderCancellationReasonsResponseType = {
  ResponseType: number;
  Data: OrderCancellationReasonsDataType[];
};
export declare type OrderCancellationReasonsDataType = {
  id: string;
  CancelReason: string;
};

// API Method=CancelOrder
export declare type CancelOrderResponseType = {
  responseType: number;
  message: string;
};

// API Method=RateOrder
export declare type RateOrderResponseType = {
  responseType: number;
  message: string;
};

// ???????????????
// API Method=UpdatePrescription
export declare type ReuploadPrescriptionResponseType = {
  responseType: number;
  message: string;
};

// API Method=ProcessOrder
export declare type PlaceOrderResponseType = {
  responseType: string;
  OrderID: string;
  DeliveryTime: string;
  OrderAmount: string;
  message: string;
  URL: string;
};

// API Method=GetCollectionType
export declare type GetCollectionResponseType = {
  ResponseType: number;
  Data: GetCollectionDataType[];
};
export declare type GetCollectionDataType = {
  ItemType: string;
};

// API Method=GetProductByType
export declare type GetAllProductsOfCollectionsResponseType = {
  ResponseType: number;
  RecordsCount: string;
  Data: GetAllProductsOfCollectionsDataType[];
};
export declare type GetAllProductsOfCollectionsDataType = {
  ProductID: string;
  Title: string;
  SalePercent: string;
  Highlights: string;
  ProductImage: string;
  Category: string;
  Brand: string;
  Price: string;
  SalePrice: string;
  ShopifyProductID: string;
  VariationTitle: string;
  unitpercase: string;
  AvailableQty: string;
  MaxOrder: string;
  Description: string;
  Variations: string;
  DiscountPrice: string;
  DiscountAmount: string;
  ParentCategory: string;
  PrescriptionRequired: string;
  CategoryImageURL: string;
};

// API Method=GetProductDetailByName
export declare type ProductDetailsResponseType = {
  ResponseType: number;
  Data: ProductDetailsDataType[];
};
export declare type ProductDetailsDataType = {
  ID: string;
  Title: string;
  Price: string;
  SalePrice: string;
  SalePercent: string;
  Description: string;
  Variations: string;
  Highlights: string;
  ProductImage: string;
  Category: string;
  CategoryID: string;
  Brand: string;
  BrandID: string;
  AvailableQty: string;
  MaxOrder: string;
  DiscountPrice: string;
  DiscountAmount: string;
  PrescriptionRequired: string;
};

// API Method=GetProductBanners
export declare type ProductBannersType = {
  ID: string;
  Title: string;
  Description: string;
  IsActive: string;
  CreatedBy: string;
  CreatedAt: string;
  UpdatedBy: string;
  UpdatedAt: string;
  StartDate: string;
  EndDate: string;
  BranchID: string;
  Detail: ProductBannersDetailType[];
};
export declare type ProductBannersDetailType = {
  ID: string;
  ProductCollectionID: string;
  ProductID: string;
  Text: string;
  CreatedAt: string;
  ProductTitle: string;
  Sort: string;
  ID1: string;
  Title: string;
  SalePercent: string;
  Highlights: string;
  ProductImage: string;
  Category: string;
  Brand: string;
  Price: string;
  SalePrice: string;
  ShopifyProductID: string;
  VariationTitle: string;
  unitpercase: string;
  AvailableQty: string;
  MaxOrder: string;
  Description: string;
  Variations: string;
  CategoryImageURL: string;
  DiscountPrice: string;
  DiscountAmount: string;
  PrescriptionRequired: string;
};

// API Method=GetProductDescriptionByID
export declare type MedicineProductExtraDescriptionResponseType = {
  ResponseType: number;
  Data: MedicineProductExtraDescriptionDataType[];
};
export declare type MedicineProductExtraDescriptionDataType = {
  "How it works": string;
  Description: string;
  Generics: string;
  "used for": string;
  "Requires Prescription (YES/NO)": string;
  Indication: string;
  "Side Effects": string;
  "When not to Use": string;
  Dosage: string;
  "Storage yes or /no": string;
  Precautions: string;
  "Warning 1": string;
  "Warning 2": string;
  "Warning 3": string;
  "Pregnancy category": string;
  "Drug Interactions": string;
};

// API Method=GetMultipleProducts
export declare type GetMultipleProductsType = {
  ResponseType: number;
  Data: GetMultipleProductsDataType[];
};
export declare type GetMultipleProductsDataType = {
  ID: string;
  Title: string;
  SalePercent: string;
  Highlights: string;
  ProductImage: string;
  Category: string;
  Brand: string;
  Price: string;
  SalePrice: string;
  ShopifyProductID: string;
  VariationTitle: string;
  unitpercase: string;
  AvailableQty: string;
  MaxOrder: string;
  Description: string;
  Variations: string;
  DiscountPrice: string;
  DiscountAmount: string;
  PrescriptionRequired: string;
  CategoryID: string;
  BrandID: string;
};

// ???????????????
// API Method=AddViewUnavailableItem
export declare type OpenedProductOutOfStockPageType = {};

// API Method=CheckVoucher
export declare type ValidateVoucherResponseType = {
  responseType: string;
  Data: ValidateVoucherDataType[];
};
export declare type ValidateVoucherDataType = {
  ID: string;
  Name: string;
  VoucherCode: string;
  DiscountType: string;
  IsActive: string;
  Amount: string;
  CustomerVoucherCode: string;
  Platforms: string;
  IsOneTimeUse: string;
  IsSuperDiscount: string;
  VoucherApplyType: string;
  OrderMethods: string;
  PaymentMethods: string;
  ApplicableCategories: string;
  StartDateTime: string;
  EndDateTime: string;
  ShowOnCCPanel: string;
  RedemptionLimit: string;
  EmployeeLevel: string;
  ValidateMOV: string;
  MOV: string;
  IsEmployeeVoucher: string;
  CapAmount: string;
  ApplicableProducts: string;
  ApplicableCategoriesName: string;
};

// API Method=GetTrending
export declare type TrendingsType = {
  ResponseType: number;
  Data: TrendingDataType[];
};
export declare type TrendingDataType = {
  ID: string;
  Trend: string;
  Created: string;
};

// API Method=SearchText
export declare type AutocompleteSearchType = {
  ResponseType: string;
  Result: string;
  Data: AutocompleteSearchDataType[];
};
export declare type AutocompleteSearchDataType = {
  id: string;
  Title: string;
};

// API Method=SearchProductByJSON
export declare type SearchProductByJSONResponseType = {
  ResponseType: number;
  Result: string;
  Data: SearchProductByJSONDataType[];
};
export declare type SearchProductByJSONDataType = {
  ID: string;
  Title: string;
  Price: string;
  SalePrice: string;
  SalePercent: string;
  Description: string;
  Variations: string;
  Highlights: string;
  ProductImage: string;
  Category: string;
  Brand: string;
  AvailableQty: string;
  MaxOrder: string;
  DiscountPrice: string;
  DiscountAmount: string;
  PrescriptionRequired: string;
};

// API Method=GetBranch
export declare type AllStoresResponseType = {
  ResponseType: number;
  Data: AllStoresDataType[];
};
export declare type AllStoresDataType = {
  ID: string;
  BranchCode: string;
  Title: string;
  Description: string;
  Polygon: string;
  IsActive: string;
  CreatedBy: string;
  CreatedAt: string;
  UpdatedBy: string;
  UpdatedAt: string;
  Phone: string;
  Longitude: string;
  Latitude: string;
  Address: string;
  City: string;
  IsDefaultBranch: string;
  IsBackupBranch: string;
  DeliveryTime: string;
  UpdateStock: string;
  DeliveryMins: string;
  ScheduleJSON: string;
  DeliveryFee: string;
  DeliveryFeeLimit: string;
  BranchImage: string;
};

// API Method=GetBranchSchedule
export declare type StoreScheduleResponseType = StoreScheduleType[];
export declare type StoreScheduleType = {
  day: number;
  periods: {
    start: string;
    end: string;
    title: string;
    backgroundColor: string;
    borderColor: string;
    textColor: string;
  }[];
};

// API Method=GetCustomerInfo
export declare type CustomerInfoType = {
  ResponseType: number;
  Data:
  | []
  | {
    ID: string;
    FirstName: string;
    LastName: string;
    Name: string;
    Mobile: string;
    Area: string;
    Address: string;
    Email: string;
    Gender: string;
    Source: string;
    Channel: string;
    Transactions: string;
    Orders: string;
    Reservations: string;
    Enquiry: string;
    FakeOrders: string;
    NoShows: string;
    MemberPoints: string;
    deviceToken: string;
    IsCustomerVerified: string;
    ConfirmedOrders: string;
    IsCreditCardVerified: string;
    VerificationCode: string;
    Created: string;
    Password: string;
    LoginDiscount: string;
    IsMobileDealNotAvailed: string;
    FBID: string;
    Currency: string;
    City: string;
    DOB: string;
  }[];
};

// API Method=CustomerAdditionalInfo
export declare type UpdateCustomerAdditionalInfoResponseType = {
  responseType: number;
  message: string;
};

// API Method=CustomerLogin
export declare type CustomerLoginResponseType = {
  responseType: string;
  NewCustomer: string;
  CustomerID: string;
};

// API Method=CheckVerificationCode
export declare type VerifyOtpResponseType = {
  responseType: string;
  Message: string;
  CustomerID: string;
};

export declare type GetSubProductsCategoriesResponseType = {
  ResponseType: number;
  Data: GetSubProductsCategoriesDataType[];
};
export declare type GetSubProductsCategoriesDataType = {
  ID: string;
  Name: string;
  ParentID: string;
};
