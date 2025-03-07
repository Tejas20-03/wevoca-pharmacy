
export const MAPS_API_KEY = 'AIzaSyDDRP8cWTobbLw7d4y1yOCAbqF74NtHfUc';
export const productsPerPage = 16;
export const DVAGO_LOGO_WHITE_PATH = '/dvago-logo-white.png';
export const DVAGO_LOGO_WHITE_V_PATH = '/dvago-v-logo-white.png';
export const DVAGO_LOGO_GREEN_PATH = '/dvago-logo-green.png';
export const DVAGO_LOGO_GREEN_V_PATH = '/dvago-logo-green.png';
export const Upload_Prescription_PATH = '/Upload_Prescription_Path.png';
export const logo_new = '/logo.png';
export const logo_v_logo_green = '/dvago-v-logo-green.png';

export const productCount = 15;

// URL's Encode Decode Methods
// export const decodeUrl = (url: string | undefined): string => decodeURIComponent(url || '');    // decodeURIComponent(url?.split('-').join('%20') || '');
// const encodeUrl = (url: string): string => encodeURIComponent(url.toLowerCase().trim());        // encodeURIComponent(url.toLowerCase().trim()).split('%20').join('-');
// const reviewAndEncodeURL = (val: string[]) => {
//   let encodedUrl = val.reduce((acc, curr) => acc + '/' + encodeUrl(curr), '');
//   return encodedUrl === '//' ? '/' : encodedUrl;
// }
export const decodeUrl = (url: string | undefined): string => (url || '').replace(/-/g, ' '); // decodeURIComponent(url?.split('-').join('%20') || '');
export const encodeUrl = (url: string): string => url.toLowerCase().trim().replace(/\s+/g, '-'); // encodeURIComponent(url.toLowerCase().trim()).split('%20').join('-');

// URL's
export const HOME_PAGE_URL = () => `/`;
export const COLLECTION_PAGE_URL = (collection: string) => `/col/${collection}/`;
export const ATOZ_PAGE_URL = (alphabet: string) => `/atozmedicine/${alphabet}`;
export const COLLECTIONS_PAGE_URL = (collections: string) => {
  return `/cat/${collections}`;
};
export const COLLECTION_PAGE_Num_URL = (collection: string, pageNum: number) => `s/col/${encodeUrl(collection)}/${pageNum}/`;
export const COLLECTION_ID_PAGE_URL = (collection: string, collectionId: string) => `/col/${encodeUrl(collection)}/${encodeUrl(collectionId)}`;

export const PRODUCT_PAGE_URL = (slug: string) => `/p/${slug}`;
export const BRAND_PAGE_URL = (slug: string) => `/brands/${slug}`;
export const STORES_PAGE_URL = () => `/stores`;
export const STORE_DETAILS_PAGE_URL = (branchCode: string) => `/stores/${branchCode}`;
export const ORDER_PAGE_URL = () => `/orders`;
export const ORDER_DETAILS_PAGE_URL = (orderID: string) => `/orders/${orderID}`;
export const SEARCH_PAGE_URL = (search: string) => `/search?search=${search}`;
export const TERMS_AND_CONDITIONS_PAGE_URL = () => `/policies/terms-and-conditions`;
export const PRIVACY_POLICY_PAGE_URL = () => `/policies/privacy-policy`;
export const RETURN_POLICY_PAGE_URL = () => `/policies/return-policy`;
export const REFUND_POLICY_PAGE_URL = () => `/policies/refund-policy`;
export const SHIPPING_POLICY_PAGE_URL = () => `/policies/shipping-policy`;
export const FAQ_PAGE_URL = () => `/faqs`;
export const BLOG_PAGE_URL = () => `/blogs`;
export const BRANDS_PAGE_URL = () => `/brands`;
export const CART_PAGE_URL = () => `/cart`;
export const FEEDBACK_PAGE_URL = () => `/feedback`;
export const DEALS_PAGE_URL = () => `/deals`;
export const EASYORDER_PAGE_URL = () => `/easy-order`;
export const USER_DASHBOARD_PAGE_URL = () => `/account`;
