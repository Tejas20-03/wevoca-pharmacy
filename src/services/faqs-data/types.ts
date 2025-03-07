export type GetFaqs_About_ResponseDataType =
  | {
      pageText: string;
      pageName: string;
      content: string;
      title: string;
    }[]
  | {
      responseType: '0';
      Data: [];
    };
