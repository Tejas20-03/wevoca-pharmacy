// GetBranch
export type GetBranch_ResponseType = {
  ResponseType: 0 | 1;
  Data: GetBranch_ResponseDataType[];
};
export type GetBranch_ResponseDataType = {
  ID: string;
  BranchCode: string;
  Title: string;
  Description: string;
  Polygon: string;
  IsActive: string;
  CreatedBy: string;
  CreatedAt: string;
  UpdatedBy: string;
  UpdatedAt: string;
  Phone: string;
  Longitude: string;
  Latitude: string;
  Address: string;
  City: string;
  IsDefaultBranch: string;
  IsBackupBranch: string;
  DeliveryTime: string;
  UpdateStock: string;
  DeliveryMins: string;
  ScheduleJSON: string;
  DeliveryFee: string;
  DeliveryFeeLimit: string;
  BranchImage: string;
};

// GetBranchSchedule
export type GetBranchSchedule_ResponseType =
  | {
    responseType: 0;
    Data: [];
  }
  | {
    day: number;
    periods: {
      start: string;
      end: string;
      title: string;
      backgroundColor: string;
      borderColor: string;
      textColor: string;
    }[];
  }[];

// GetBranchCodeByLatLng
export type GetBranchCodeByLatLng_ResponseType = {
  ResponseType: 0 | 1;
  Msg: null | string;
  StackTrace: null | string;
  Data: null | GetBranchCodeByLatLng_ResponseDataType;
};
export type GetBranchCodeByLatLng_ResponseDataType = {
  ID: number;
  Title: string;
  Description: null | string;
  Polygon: null | string;
  DeliveryMins: number;
  DeliveryFee: string;
  DeliveryFeeLimit: string;
  Phone: null | string;
  Address: string;
  Longitude: number;
  Latitude: number;
  IsActive: boolean;
  IsBackupBranch: boolean;
  CreatedBy: null | number;
  CreatedAt: null | number;
  UpdatedBy: null | number;
  UpdatedAt: null | number;
  EditURL: null | string;
  ScheduleJSON: null | string;
  BranchCode: string;
  IsAvailable: boolean;
};


// GetBranchCodeByLatLng Second
export type GetBranchCodeByLatLngSecond_ResponseType = {
  ResponseType: "0" | 1;
  Data: GetBranchCodeByLatLngSecond_ResponseDataType[];
};
export type GetBranchCodeByLatLngSecond_ResponseDataType = {
  ID: string,
  Title: string,
  DeliveryMins: string,
  Address: string,
  Longitude: string,
  Latitude: string,
  IsActive: string,
  IsBackupBranch: string,
  CreatedBy: string,
  BranchCode: string,
  DeliveryFee: string,
  DeliveryFeeLimit: string
};
