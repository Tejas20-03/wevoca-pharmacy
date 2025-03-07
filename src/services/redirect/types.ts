

// GetProductDetailByID
export type GetCategorySlugRedirect = {
  responseType: 1 | '0';
  Data: GetCategorySlug[];
};

export type GetCategorySlug = {
  Type: string,
  ID: number,
  Title: string,
  Slug: string,
  ProductCount: number
}