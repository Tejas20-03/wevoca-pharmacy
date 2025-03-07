// AddViewUnavailableItem
export type AddViewUnavailableItem_ResponseType = {
  responseType: 1 | 0;
  message: string;
};

// GetProductDescriptionByID
export type GetProductDescriptionByID_ResponseType = {
  ResponseType: 1 | '0';
  Data: Record<string, string>[];
};

// GetProductDetailByID
export type GetProductDetailByID_ResponseType = {
  responseType: 1 | '0';
  Data: ProductDataType[];
};
export type ProductDataType = {
  ID: string;
  ProductID: string;
  Title: string;
  Price: string;
  SalePrice: string;
  SalePercent: string;
  Slug: string;
  Description: string;
  Description1: string;
  Variations: string;
  Generic?: string;
  Highlights: string;
  ProductImage: string;
  Category: string;
  CategoryID: string;
  CategorySlug: string;
  Brand: string;
  BrandID: string;
  BrandSlug: string;
  AvailableQty: string;
  MaxOrder: string;
  DiscountAmount: string;
  DiscountPrice: string;
  PrescriptionRequired: string;
  UPC?: string;
  ShopifyProductID?: string;
  VariationTitle?: string;
  unitpercase?: string;
  MetaTitle: string;
  MetaDescription: string;
  Variation: ProductVariation[];
  ParentCategory: string;
  ParentCategorySlug: string;
  TotalStripTablets: string;
  TotalTablets: string;
  NoofStrips: string;
  HowItWorks: string;
  Usedfor?: string;
};
export type ProductVariation = {
  AvailableQty: string,
  DiscountAmount: string,
  DiscountPrice: string,
  MaxOrder: string,
  SalePrice: string,
  TotalTablets: string,
  Type: string,
  NoofStrips: string,
}

// GetMultipleProducts
export type GetMultipleProducts_ResponseType = {
  ResponseType: 1 | '0';
  Data: ProductDataType[];
};

// GetProductByCategory
export type GetProductByCategory_ResponseType = {
  ResponseType: 1 | '0';
  RecordsCount: string;
  CategoryImageURL: string;
  CollectionName: string;
  Data: ProductCardDataType[];
};
export type GetProductByCategory_ProductType = {
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
  PrescriptionRequired: string;
  Slug: string;
  CategoryHierarchy: CategoryHierarchy[];
  Variation: ProductVariation[];
};

export type CategoryHierarchy = {
  ID: string,
  Name: string,
  ParentID: string,
  Slug: string
}

// GetProductByBrand
export type GetProductByBrand_ResponseType = {
  ResponseType: 1 | '0';
  RecordsCount: string;
  BannerImageURL: string;
  CollectionName: string;
  Data: ProductCardDataType[];
};
export type GetProductByBrand_ProductType = {
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
  PrescriptionRequired: string;
  Slug: string;
  Variation: ProductVariation[];
};

// GetProductByAlphabet
export type GetProductByAlphabet_ResponseType = {
  ResponseType: 1 | '0';
  RecordsCount: string;
  BannerImageURL: string;
  CollectionName: string;
  Data: GetProductByAlphabet_ProductType[];
};
export type GetProductByAlphabet_ProductType = {
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
};

// GetProductBanners
export type GetProductBanners_TitleTypes = 'HomePageProductCarouselOne' | 'HomePageProductCarouselTwo' | 'HomePageProductCarouselThree' | 'SearchPageSuggestionsProducts' | 'CartPageSuggestionsProducts' | 'ProductDetailsPageSuggestionProducts' | 'AppHomePageProductCarouselOne' | 'AppHomePageProductCarouselTwo';
export type GetProductBanners_ResponseType = {
  ID: string;
  Title: string;
  Description: string;
  DescriptionArabic:string;
  IsActive: string;
  CreatedBy: string;
  CreatedAt: string;
  UpdatedBy: string;
  UpdatedAt: string;
  StartDate: string;
  EndDate: string;
  BranchID: string;
  BannerImageURL: string;
  CollectionName: string;
  Slug: string;
  Detail: GetProductBanners_ProductDataType[];
};
export type GetProductBanners_ProductDataType = {
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
  unitpercase1: string;
  AvailableQty: string;
  MaxOrder: string;
  Description: string;
  Variations: string;
  Variation: ProductVariation[];
  CategoryImageURL: string;
  DiscountPrice: string;
  DiscountAmount: string;
  PrescriptionRequired: string;
  unitpercase: string;
  Slug: string;
  TotalStripTablets: string;
  TotalTablets: string;
  NoofStrips: string;
};

export type ProductCardDataType = {
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
  PrescriptionRequired: string;
  MetaDescription: string;
  MetaTitle: string;
};


export type productSuggestion_response = {
  ResponseType: 1 | '0';
  Data: productSuggestionDetail[];
}

export type productSuggestionDetail = {
  ID: string,
  Title: string,
  BackendTitle: string,
  Description: string,
  IsActive: string,
  CreatedBy: string,
  CreatedAt: string,
  UpdatedBy: string,
  UpdatedAt: string,
  Vendor: string,
  ProductType: string,
  Handle: string,
  Tags: string,
  ShopifyURL: string,
  ShopifyProductID: string,
  ImageURL: string,
  Combinataions: string,
  Categories: string,
  BrandImageURL: string,
  CategoryImageURL: string,
  CategoryID: string,
  PrescriptionRequired: string,
  Unit: string,
  Case: string,
  Purchase: string,
  TempControl: string,
  Generic: string,
  MaxCount: string,
  Sort: string,
  IsActiveCS: string,
  unitpercase1: string,
  VariationTitle: string,
  NewTitle: string,
  NewSize: string,
  PhysicalForm: string,
  Slug: string,
  MetaTitle: string,
  MetaDescription: string,
  IsSuggestive: string
}