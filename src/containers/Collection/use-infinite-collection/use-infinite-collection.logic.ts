
import { getProductBanners, getProductByAlphabet, getProductByBrand, getProductByCategory } from '@/services/product/services';
import { ProductCardDataType } from '@/services/product/types';
import { postSearchProductByJSON } from '@/services/search/services';
import { imageType } from '@/types/image-types';
import { collectionFetchingType } from './use-infinite-collection';

export const HandleFetchProductsByBrand = async (slugUrl: string, limit: [number, number], storeCode: string) => {
  let banners: imageType[] = [];
  let data: ProductCardDataType[] = [];
  let pageTitle: string = '';
  const brandCollection: boolean = false;

  const response = await getProductByBrand(slugUrl, limit, storeCode, { token: '' });

  if (response && response?.Data?.length > 0) {
    banners = response.BannerImageURL === '' ? [] : [{ image: response.BannerImageURL, imageAlt: response.Data[0].Brand || '' }];
    data = response.Data;
    pageTitle = response.CollectionName;
  }

  return { banners, pageTitle, data, brandCollection };
};

export const HandleFetchProductsByCategory = async (slugUrl: string, limit: [number, number], storeCode: string, token?: string | undefined) => {
  let banners: imageType[] = [];
  let data: ProductCardDataType[] = [];
  let pageTitle: string = '';
  const brandCollection: boolean = false;

  const response = await getProductByCategory(slugUrl, limit, storeCode, { token: '' });
  if (response && response?.Data?.length > 0) {
    banners = response.CategoryImageURL === '' ? [] : [{ image: response.CategoryImageURL, imageAlt: response.Data[0].Category || '' }];
    data = response.Data;
    pageTitle = response.CollectionName;
  }

  return { banners, pageTitle, data, brandCollection };
};

export const HandleFetchProductsByAlphabet = async (slugUrl: string = 'A', limit: [number, number], storeCode: string) => {
  let banners: imageType[] = [];
  let data: ProductCardDataType[] = [];
  let pageTitle: string = '';
  const brandCollection: boolean = false;

  const response = await getProductByAlphabet(slugUrl, limit, storeCode, { token: '' });
  if (response && response?.Data?.length > 0) {
    banners = [];
    data = response.Data;
    pageTitle = response.CollectionName;
  }

  return { banners, pageTitle, data, brandCollection };
};
export const HandleFetchProductsBySearch = async (slugUrl: string = 'A', limit: [number, number], storeCode: string) => {
  let banners: imageType[] = [];
  let data: ProductCardDataType[] = [];
  let pageTitle: string = '';
  const brandCollection: boolean = false;

  const limitStr = `${limit[0]},${limit[1]}`;
  const response = await postSearchProductByJSON({ ProductName: slugUrl, BranchCode: storeCode, limit: limitStr, Type: '', Name: '' }, { token: '' });
  if (response && response?.Data?.length > 0) {
    banners = [];
    data = response.Data;
    pageTitle = response.CollectionName;
  }

  return { banners, pageTitle, data, brandCollection };
};

export const HandleFetchProductsByCollection = async (slugUrl: string, storeCode: string, token?: string | undefined) => {
  let banners: imageType[] = [];
  let data: ProductCardDataType[] = [];
  let pageTitle: string = '';
  const brandCollection: boolean = true

  const response = await getProductBanners(slugUrl, storeCode, '', { token: '' });
  if (response && response.Detail && response.Detail.length > 0) {
    banners = [];
    data = response.Detail;
    pageTitle = response.CollectionName;
  }

  return { banners, pageTitle, data, brandCollection };
};

export const HandleFetchProducts = async (fetchingType: collectionFetchingType, slug: string, slugUrl: string, currentPage: number, productsPerPage: number, storeCode: string) => {
  const limit: [number, number] = [productsPerPage * currentPage, productsPerPage];
  switch (fetchingType) {
    case 'brand':
      return await HandleFetchProductsByBrand(slugUrl, limit, storeCode);
    case 'category':
      return await HandleFetchProductsByCategory(slugUrl, limit, storeCode);
    case 'atozmedicine':
      return await HandleFetchProductsByAlphabet(slugUrl, limit, storeCode);
    case 'search':
      return await HandleFetchProductsBySearch(slug, limit, storeCode);
    case 'collection':
      return await HandleFetchProductsByCollection(slugUrl, storeCode);
  }
};
