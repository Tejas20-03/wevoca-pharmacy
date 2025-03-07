// GetChildCategory
export type GetChildCategory_ResponseType = {
  ResponseType: 1 | '0';
  Data: ChildCategoryDataType[];
};
export type ChildCategoryDataType = {
  ID: string;
  Name: string;
  ParentID: string;
  Slug: string;
};


export type GetCategoryMenu_ResponseType = {
  Name: string
  Slug: string
  SubMenu: GetCategoryMenuData[];
};
export type GetCategoryMenuData = {
  Name: string
  Slug: string
  SubMenu: GetCategoryMenuData2[];
};

export type GetCategoryMenuData2 = {
  Name: string
  Slug: string
  SubMenu: GetCategoryMenuData[];
};

