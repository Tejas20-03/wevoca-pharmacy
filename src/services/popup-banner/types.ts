export type GetPopupBanner_ResponseDataType = {
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
  Detail: GetPopupBannerResponse[];
}[];

export type GetPopupBannerLog_Response = {
  responseType: number;
  message: string;
};

export type GetPopupBannerResponse = {
  ID: string;
  BannerID: string;
  BannerImageGUID: string;
  Type: string;
  TypeID: string;
  TypeValue: string;
  Text: string;
  Sort: string;
  MetaTitle: string;
  MetaDescription: string;
  IsActive: string;
  BannerImageNew: string;
  Text1: string;
  Slug: string;
}[];
