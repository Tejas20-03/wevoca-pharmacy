/* eslint-disable no-var */
declare var webengage: {
    init: (key: string) => void;
    user: {
      login: (userId: string) => void;
      setAttribute: (key: string, value: string) => void;
    };
  };