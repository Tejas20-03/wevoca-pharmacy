// GetChildCategory
export type blogListingData_Response = {
  ResponseType: 1 | '0';
  Data: blogListingData[];
};
export type blogListingData = {
  Id: number,
  Name: string,
  Title: string,
  Content: string,
  ImageURL: string,
  ImageURL1: string,
  IsActive: string,
  Created: string
  IsFeatured: string,
  IsTrending: string,
  Slug: string,
  formattedDate?: string
};
export type blogDetailData_Response = {
  ResponseType: 1 | '0';
  Data: blogDetailData[];
};
export type blogDetailData = {
  Id: number,
  Name: string,
  Title: string,
  Content: string,
  ImageURL: string,
  IsActive: string,
  Created: string,
  IsFeatured: boolean,
  IsTrending: boolean,
  Slug: string;
  MetaDescription: string;
  MetaTitle: string; 
};
