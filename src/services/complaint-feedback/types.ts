
// GetComplaintType
export type GetComplaintType_ResponseType = {
    ResponseType: 1 | '0';
    Data: {
        ID: string;
        name: string;
        value: string;
        Alias: string;
    }[];
};

// AddComplaint
export type AddComplaint_ResponseType = {
    responseType: 1 | '0';
    FeedbackNumber: number;
    message: string;
};

// AddFeedback
export type AddFeedback_ResponseType = {
    responseType: 1 | '0';
    ComplaintNumber: number;
    message: string;
};
