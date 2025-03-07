// GetBannersNew
export type GetBannersNew_TitleType = 'HomePageWebBanner' | 'Homepageappcategory' | 'HomePageCategories' | 'HomepageappcategoryV1' | 'HomePageBrands' | 'DealsBanners' | 'HomePageBanners' | 'HomePageDiseaseCaraousel' | 'HomePagePromotionalImages' | 'HomepagecategoryWebsite';
export type GetBannersNew_BannerType = 'product' | 'brand' | 'category' | 'collection' | 'screen' | 'atozmedicine';
export type GetBannersNew_ResponseType = {
  ID: string;
  Title: string;
  Description: string;
  DescriptionArabic:string;
  BranchID: string;
  IsActive: string;
  CreatedBy: string;
  CreatedAt: string;
  UpdatedBy: string;
  UpdatedAt: string;
  StartDate: string;
  EndDate: string;
  ScheduleJSON: string;
  Detail: GetBannersNew_DetailDataType[];
};
export type GetBannersNew_DetailDataType = {
  ID: string;
  BannerID: string;
  BannerImageGUID: string;
  Type: GetBannersNew_BannerType;
  TypeID: string;
  TypeValue: string;
  Text: string;
  Sort: string;
  BannerImageNew: string;
  Slug: string;
  TitleArabic:string;
};
