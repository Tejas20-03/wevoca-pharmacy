import { categoryNames } from '@/data/category-menu-names';
import { filterEmptySubmenus } from '@/functions/filter-menu';
import { getBannersNew } from '@/services/banners/services';
import { GetBlogListing } from '@/services/blogs/services';
import { GetCategoryMenu } from '@/services/categories/services';
import { BASE_URL_DVAGO_API } from '@/services/config';
import { getProductBanners, getProductByAlphabet } from '@/services/product/services';
import { GetProductReview } from '@/services/reviews/services';
import { getTicker } from '@/services/ticker/services';

export const homeBanner = async (selectedStoreID: string) => {
  const response = await getBannersNew('HomePageWebBanner', selectedStoreID || '32', {});
  return response;
};

export const homeBannerMobile = async (selectedStoreID: string) => {
  const response = await getBannersNew('HomePageBanners', selectedStoreID || '32', {});
  return response;
};

export const homeCategory = async (selectedStoreID: string) => {
  const response = await getBannersNew('HomepagecategoryWebsite', selectedStoreID || '32', {});
  return response;
};

export const homeTopSellingProduct = async (selectedStoreID: string) => {
  const response = await getProductBanners('HomePageProductCarouselOne', selectedStoreID || '32', '', {});
  return response;
};

export const homeDealsProduct = async (selectedStoreID: string) => {
  const response = await getProductBanners('AppHomePageProductCarouselOne', selectedStoreID || '32', '', {});
  return response;
};

export const homeFeaturesProduct = async (selectedStoreID: string) => {
  const response = await getProductBanners('AppHomePageProductCarouselTwo', selectedStoreID || '32', '', {});
  return response;
};

export const homeBlogs = async () => {
  const response = await GetBlogListing({});
  const removedResponse = response?.Data?.slice(0, 3)
  return removedResponse;
};

export const homeBrands = async (selectedStoreID: string) => {
  const response = await getBannersNew('HomePageBrands', selectedStoreID || '32', {});
  return response;
};

export const headerCategoryMenu = async () => {
  const categoryMenuPromises = categoryNames.map((categoryName) => GetCategoryMenu(categoryName, { token: '' }));
  const categoryMenuResponse = await Promise.all(categoryMenuPromises);
  // Filter out empty submenus
  const filteredCategoryMenuResponse = categoryMenuResponse.map((menu) => {
    return filterEmptySubmenus(menu);
  });
  return filteredCategoryMenuResponse;
};

export const getAlphabetCategory = async (slug: string, limit: [number, number], selectedStoreID: string) => {
  const response = await getProductByAlphabet(slug, limit, selectedStoreID || '32', {});
  return response;
};

export async function checkTypeBySlug(oldUrl: string) {
  const response = await fetch(`${BASE_URL_DVAGO_API}/AppAPIV3/CheckTypeBySlug&OldSlug=${oldUrl}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
}
export const newsTickerFn = async () => {
  const response = await getTicker({});
  return response;
};

export const getProductReviewsFunc = async (productID: string) => {
  const response = await GetProductReview(productID, {});
  return response;
};
