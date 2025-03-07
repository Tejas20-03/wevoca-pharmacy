import { GetCustomerTokenInCookiesStorage, GetCustomerTokenInLocalStorage } from '@/functions/local-storage-methods';
import { getMyCancelledOrders, getMyCompleteOrders, getMyOrders, getMyPendingOrders } from '@/services/order/services';
import { orders_OrdersDataType } from '@/services/order/types';
// import { useQuery } from '@tanstack/react-query';
import { ordersFetchingType } from './use-infinite-orders';

const HandleFetchAllOrders = async (limit: [number, number]) => {
  let data: orders_OrdersDataType[] = [];

  const CustomerToken = GetCustomerTokenInLocalStorage();
  const customerTokenCookies: string = await GetCustomerTokenInCookiesStorage();
  if (data?.length === 0) {
    const response = await getMyOrders(limit, { token: CustomerToken !== null ? CustomerToken || customerTokenCookies : undefined });
    if (response && response?.Data?.length > 0) {
      data = response.Data;
    }
  }

  return { data };
};
const HandleFetchPendingOrders = async (limit: [number, number]) => {
  let data: orders_OrdersDataType[] = [];

  const customerToken = GetCustomerTokenInLocalStorage();
  const customerTokenCookies: string = await GetCustomerTokenInCookiesStorage();
  const response = await getMyPendingOrders(limit, { token: customerToken !== null ? customerToken || customerTokenCookies : undefined });
  if (response && response?.Data?.length > 0) {
    data = response.Data;
  }

  return { data };
};
const HandleFetchDeliveredOrders = async (limit: [number, number]) => {
  let data: orders_OrdersDataType[] = [];

  const customerToken = GetCustomerTokenInLocalStorage();
  const customerTokenCookies: string = await GetCustomerTokenInCookiesStorage();
  const response = await getMyCompleteOrders(limit, { token: customerToken !== null ? customerToken || customerTokenCookies : undefined });
  if (response && response?.Data?.length > 0) {
    data = response.Data;
  }

  return { data };
};
const HandleFetchCancelledOrders = async (limit: [number, number]) => {
  let data: orders_OrdersDataType[] = [];

  const customerToken = GetCustomerTokenInLocalStorage();
  const customerTokenCookies: string = await GetCustomerTokenInCookiesStorage();
  const response = await getMyCancelledOrders(limit, { token: customerToken !== null ? customerToken || customerTokenCookies : undefined });
  if (response && response?.Data?.length > 0) {
    data = response.Data;
  }

  return { data };
};

export const HandleFetchProducts = async (fetchingType: ordersFetchingType, currentPage: number, productsPerPage: number) => {
  const limit: [number, number] = [productsPerPage * currentPage, productsPerPage];
  switch (fetchingType) {
    case 'all':
      return await HandleFetchAllOrders(limit);
    case 'pending':
      return await HandleFetchPendingOrders(limit);
    case 'cancelled':
      return await HandleFetchCancelledOrders(limit);
    case 'delivered':
      return await HandleFetchDeliveredOrders(limit);
  }
};
