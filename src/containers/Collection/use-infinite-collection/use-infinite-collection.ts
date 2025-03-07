import { ProductCardDataType } from '@/services/product/types';
import { imageType } from '@/types/image-types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { HandleFetchProducts } from './use-infinite-collection.logic';

export type collectionFetchingType = 'category' | 'brand' | 'collection' | 'atozmedicine' | 'search';
const useInfiniteCollection = (fetchingType: collectionFetchingType, slug: string, slugUrl: string, productsPerPage: number, selectedStoreCode: string) => {
  const [collectionBannersData, setCollectionBannersData] = useState<imageType[]>([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [collectionName, setCollectionName] = useState<string>('');
  const [canLoadMoreData, setCanLoadMoreData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [onLoading, setOnLoading] = useState(true);
  const [isBrandCollection, setBrandCollection] = useState(true);
  const [data, setData] = useState<ProductCardDataType[]>([]);

  const router = useRouter();
  const handleFetchData = async () => {
    if (!canLoadMoreData || isLoading) return;
    setIsLoading(true);
    const fetchedProducts = await HandleFetchProducts(fetchingType, slug, slugUrl, currentPageNumber, productsPerPage, selectedStoreCode);
    setBrandCollection(fetchedProducts.brandCollection)
    if (currentPageNumber === 1) {
      setCollectionBannersData(fetchedProducts?.banners);
      setOnLoading(true);
    }
    setData((prev) => [...prev, ...fetchedProducts?.data]);
    setCurrentPageNumber((prev) => prev + 1);
    setCollectionName(fetchedProducts.pageTitle);
    setCanLoadMoreData(Boolean(fetchedProducts.data.length > 0 && fetchedProducts.data.length === productsPerPage));
    setIsLoading(false);

    setOnLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setCanLoadMoreData(true);
      setCurrentPageNumber(1);
      setData([]);
    }, 1000)
  }, [slugUrl, router.query.collection]);

  useEffect(() => {
    if (currentPageNumber === 1) handleFetchData();
  }, [currentPageNumber, slugUrl]);

  return { bannersData: collectionBannersData, data: data, canLoadMoreData, pageTitle: collectionName, isLoading, handleFetchData, onLoading, isBrandCollection };
};

export default useInfiniteCollection;
