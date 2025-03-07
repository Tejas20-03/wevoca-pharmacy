
import { ProductCardDataType, ProductVariation } from '@/services/product/types';

// SearchText
export type SearchText_ResponseType = {
  ResponseType: 1 | 0;
  Result: string;
  Data: SearchText_ResponseDataType[];
};
export type SearchText_ResponseDataType = {
  id: string;
  Title: string;
  Slug: string;
};

// SearchProductByJSON
export type SearchProductByJSON_ArgsType = {

  ProductName?: string;
  BranchCode: string;
  limit: string;
  Type: string;
  Name: string;
};
export type SearchProductByJSON_ResponseType = {
  ResponseType: 1 | 0;
  Result: string;
  BannerImageURL: string;
  CollectionName: string;

  CategoryImageURL?: string;
  CategoryImageApp?: string;
  RecordsCount?: string;
  Data: ProductCardDataType[];
  Detail?:ProductCardDataType[];
};
export type SearchProductByJSON_ResponseDataType = {
  ProductID: string;
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
  Slug: string;
  Variation: ProductVariation[];
};

// Trending
export type Trending_ResponseType = {
  ResponseType: 1 | 0;
  Data: Trending_ResponseDataType[];
};
export type Trending_ResponseDataType = {
  ID: string;
  Trend: string;
  Created: string;
};
