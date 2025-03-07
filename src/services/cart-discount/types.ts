// GetChildCategory
export type BrandListingData_Response = {
  ResponseType: 1 | '0';
  Data: BrandListingData[];
};
export type BrandListingData = {
  ID: string,
  Name: string,
  Slug: string,
  BrandLogo: string
};