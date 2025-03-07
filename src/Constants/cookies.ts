import { IncomingMessage, ServerResponse } from 'http';
import { setCookies, getCookie, checkCookies } from 'cookies-next';

const cookieMethods = (key: string, defaultVal: any, type: string) => ({
  setCookie_clientSide: (val: number | string) => setCookies(key, val),
  setCookie_serverSide: (val: number | string, req: IncomingMessage, res: ServerResponse) => setCookies('branchCode', val, { req, res }),

  getCookie_clientSide: () => {
    if (checkCookies(key)) {
      const val = getCookie(key);
      return getCookieCheck(defaultVal, type, val);
    } else {
      setCookies(key, defaultVal);
      return defaultVal;
    }
  },
  getCookie_serverSide: (req: IncomingMessage, res: ServerResponse) => {
    if (checkCookies(key, { req, res })) {
      let val = getCookie(key, { req, res });
      return getCookieCheck(defaultVal, type, val);
    } else {
      setCookies(key, defaultVal, { req, res });
      return defaultVal;
    }
  },

  checkCookie_clientSide: () => checkCookies(key),
  checkCookie_serverSide: (req: IncomingMessage, res: ServerResponse) => checkCookies(key, { req, res }),
});

const getCookieCheck = (defaultVal: any, type: string, val: any) => {
  if (type === 'number') {
    let manipulatedVal = Number(val);
    if (isNaN(manipulatedVal)) return defaultVal;
    else return manipulatedVal;
  } else {
    return val;
  }
};

const defaultBranchID = 5;
const defaultBranchCode = 32;
const defaultDeliveryTime = 60;
const defaultUser = { userID: '', userName: '', phoneNum: '' };

export const COOKIES = {
  BRANCH_ID: { key: 'branchID', defaultVal: defaultBranchID, ...cookieMethods('branchID', defaultBranchID, 'number') },
  BRANCH_CODE: { key: 'branchCode', defaultVal: defaultBranchCode, ...cookieMethods('branchCode', defaultBranchCode, 'number') },
  DELIVERY_TIME: { key: 'deliveryTime', defaultVal: defaultDeliveryTime, ...cookieMethods('deliveryTime', defaultDeliveryTime, 'number') },
  USER: { key: 'user', defaultVal: defaultUser, ...cookieMethods('user', defaultUser, 'object') },
};
