// ProcessOrder
export enum PaymentType {
  COD = 'Cash On Delivery',
  ONLINE = 'CreditCard',
}

export type GetInitialMessage_api_type = {
  $id: string;
  ResponseType: number;
  Data: GetInitialMessage_apiData[];
  Msg: null;
  StackTrace: null;
};

export type GetInitialMessage_apiData = {
  $id?: string;
  Id?: number;
  Question?: string;
  Answer?: string;
  Code?: string;
  ParentId?: number;
  IsInitialMessage?: boolean;
  HasChildQuestions?: boolean;
  ChildQuestions?: null;
};

export type GetChatMode_ApiData = {
  $id: string;
  ResponseType: number;
  Data: GetChatMode_ApiData_Data;
  Msg: null;
  StackTrace: null;
};

export type GetChatMode_ApiData_Data = {
  $id: string;
  Id: number;
  Mode: boolean;
  CreatedBy: number;
  CreatedAt: string;
};

export type GetBotQuestion_api = {
  $id: string;
  ResponseType: number;
  Data: GetBotQuestion_apiData[];
  Msg: null;
  StackTrace: null;
};

export type GetBotQuestion_apiData = {
  $id: string;
  Id: number;
  Question: string;
  Answer: string;
  Code: string;
  ParentId: number;
  IsInitialMessage: boolean;
  HasChildQuestions: boolean;
  ChildQuestions: GetBotQuestion_apiData_children[];
};

export type GetBotQuestion_apiData_children = {
  $id: string;
  Id: number;
  Question: string;
  Answer: string;
  Code: string;
  ParentId: number;
  IsInitialMessage: boolean;
  HasChildQuestions: boolean;
  ChildQuestions: GetBotQuestion_apiData_children[];
};

export type GetChatHistoryList_api = {
  $id: string;
  ResponseType: number;
  Data: GetChatHistoryListData[];
  Msg: null;
  StackTrace: null;
};

export type GetChatHistoryListData = {
  $id: string;
  CreatedAt: string;
  CreatedBy: number;
  CreatedByName: null;
  EndAt: string;
  Id: number;
  IsClosed: boolean;
  LastMessage: string;
  LastMessageAt: string;
  LastMessageType: string;
  Remarks: string;
  StartedAt: string;
  StartedBy: number;
  StartedByMobileNumber: null;
  StartedByName: null;
};

export type GetChatHistoryDetail_api = {
  $id: string;
  ResponseType: number;
  Data: GetChatHistoryDetailData[];
  Msg: null;
  StackTrace: null;
};

export type GetChatHistoryDetailData = {
  $id: string;
  Id: number;
  FromUserId: number;
  ToUserId: number;
  CreatedAt: string;
  MessageText: string;
  ChatId: number;
  Type: string;
};
