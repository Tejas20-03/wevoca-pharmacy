// AddViewUnavailableItem
export type AddViewUnavailableItem_ResponseType = {
  ResponseType: 1 | 0;
  message: string;
};

export type FetchReviewsData_Response = {
  ResponseType: 1 | 0;
  Data: FetchReviewsData[];
};
export type FetchReviewsData = {
  ApprovedBy: string;
  Created: string;
  CustomerName: string;
  ID: string;
  IsApproved: string;
  OrderDetailID: string;
  OrderID: string;
  Platform: string;
  ProductID: string;
  Rating: string;
  Reviews: string;
};
