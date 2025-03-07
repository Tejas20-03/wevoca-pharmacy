import { MyOrders_OrdersDataType } from '@/services/order/types';
import { useEffect, useState } from 'react';
import { HandleFetchProducts } from './use-infinite-orders.logic';
import { useRouter } from 'next/router';

export type voucherFetchingType = 'Unused' | 'Used' | 'Expired';

export type ordersFetchingType = 'all' | 'pending' | 'delivered' | 'cancelled';
const useInfiniteOrders = (orderCanceled: boolean, fetchingType: ordersFetchingType, orderPerPage: number) => {
  const [currentPageNumber, setCurrentPageNumber] = useState(0);
  const [canLoadMoreData, setCanLoadMoreData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [onLoading, setOnLoading] = useState(true);
  const [data, setData] = useState<MyOrders_OrdersDataType[]>([]);

  const router = useRouter();

  const handleFetchData = async () => {
    if (!canLoadMoreData || isLoading) return;
    setIsLoading(true);
    const fetchedProducts = await HandleFetchProducts(fetchingType, currentPageNumber, orderPerPage);
    if (currentPageNumber === 0) {
      setOnLoading(true);
    }
    // Add null check before spreading
    if (fetchedProducts?.data) {
      setData((prev) => [...prev, ...fetchedProducts.data]);
      setCanLoadMoreData(Boolean(fetchedProducts.data.length > 0 && fetchedProducts.data.length === orderPerPage));
    } else {
      setCanLoadMoreData(false);
    }
    setIsLoading(false);
    setOnLoading(false);
};

  useEffect(() => {
    setCanLoadMoreData(true);
    setCurrentPageNumber(0);
    setData([]);
  }, [fetchingType, orderCanceled]);

  useEffect(() => {
    if (currentPageNumber === 0) handleFetchData();
  }, [currentPageNumber, router, data]);

  return { data: data, canLoadMoreData, handleFetchData, isLoading, onLoading };
};

export default useInfiniteOrders;
