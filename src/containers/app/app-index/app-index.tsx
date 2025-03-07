// import React, { useEffect, useMemo } from 'react';
// import { useAppDispatch } from '@/hooks/use-app-dispatch';
// import { logoutUser, setUserDataFromLocalStorage } from '@/redux/user/actions';
// import { emptyCart, setCartDataFromLocalStorage } from '@/redux/cart/actions';
// import { setAddressesAfterUserLogin } from '@/redux/addresses/actions';
// import { useAppSelector } from '@/hooks/use-app-selector';
// import { getUserCurrentLocationAndSetGeocode } from '@/redux/map/actions';
// import { fetchAndSetNearestStoreData } from '@/redux/store/actions';
// import { GetCustomerTokenInLocalStorage } from '@/functions/local-storage-methods';
// import { showStartingPopup } from '@/redux/address-popup/slice';
// import dynamic from 'next/dynamic';
// import mixpanel from 'mixpanel-browser';
// import { identifyUser } from '@/utils/mix-pnael';
// const BannerPopup = dynamic(() => import('@/components/banner-popup/banner-popup'), { ssr: false });

// interface IProps {
//   children: React.ReactNode;
// }

// const AppIndex: React.FC<IProps> = ({ children }) => {
//   const dispatch = useAppDispatch();

//   const addressesData = useAppSelector((state) => state.addresses);
//   const storeData = useAppSelector((state) => state.store);
//   const userData = useAppSelector((state) => state.user);
//   const { startingPopup, activeSelectedTab } = useAppSelector((state) => state.AddressPopup);

//   const SetupReduxStoreFromLocalStorage = async () => {
//     await dispatch(setUserDataFromLocalStorage({}));
//     await dispatch(setAddressesAfterUserLogin({}));
//     await dispatch(setCartDataFromLocalStorage({}));
//   };

//   useMemo(() => {
//     return () => {
//       const userToken = GetCustomerTokenInLocalStorage();
//       if (!userToken || userToken.length === 0) {
//         dispatch(emptyCart({}));
//         dispatch(logoutUser({}));
//         mixpanel.reset();
//       }
//     };
//   }, [dispatch]);

//   const openAddressPopupAtStart = () => {
//     const userToken = GetCustomerTokenInLocalStorage();
//     const addressPopupCloseTime = localStorage.getItem('addressPopupCloseTime');
//     const twentyMinutes = 20 * 60 * 1000; // 60 minutes in milliseconds
//     const currentTime = new Date().getTime();
//     if (addressesData.addresses.length > 0) {
//       if (userToken?.length !== 0 || userToken !== undefined || userToken !== null || userToken !== '') {
//         if (!addressPopupCloseTime || currentTime - new Date(addressPopupCloseTime).getTime() > twentyMinutes) {
//           dispatch(showStartingPopup());
//         }
//       }
//     }
//   };

//   useEffect(() => {
//     SetupReduxStoreFromLocalStorage();

//     if (typeof window !== 'undefined') {
//       const visited = localStorage.getItem('firstVisit');
//       if (!visited) {
//         const randomNumber = Math.floor(Math.random() * 1000000);
//         localStorage.setItem('firstVisit', randomNumber.toString());
//         mixpanel.track('first_site_open');
//         if (typeof window !== 'undefined') {
//           window?.webengage?.track('first_site_open');
//         }
//       }
//     }
//   }, []);

//   useEffect(() => {
//     if (!activeSelectedTab) openAddressPopupAtStart();
//     if (addressesData.addresses.length === 0) dispatch(getUserCurrentLocationAndSetGeocode({ setNearestStoreDataAsWell: true }));
//     if (addressesData.selectedAddressID !== null && addressesData.selectedAddressDetails !== null) dispatch(fetchAndSetNearestStoreData({ latitude: addressesData.selectedAddressDetails.lat, longitude: addressesData.selectedAddressDetails.lng }));
//   }, [addressesData]);
//   useEffect(() => {
//     if (addressesData.selectedAddressID !== null && addressesData.selectedAddressDetails !== null) dispatch(fetchAndSetNearestStoreData({ latitude: addressesData.selectedAddressDetails.lat, longitude: addressesData.selectedAddressDetails.lng }));
//   }, [storeData]);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       if (userData?.isLoggedIn) {
//         const userId = userData?.userID;
//         const userProperties = {
//           $email: userData?.email,
//           $name: userData?.userName,
//           $store_id: storeData?.selectedStoreID?.toString() || '32',
//         };
//         identifyUser(userId, userProperties);
//       }
//     }
//   }, [userData]);

//   return (
//     <>
//       {children}
//       {addressesData?.addresses?.length === 0 ? <BannerPopup /> : !startingPopup ? <BannerPopup /> : ''}
//     </>
//   );
// };

// export default AppIndex;

import React, { useEffect, useMemo } from 'react';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { logoutUser, setUserDataFromLocalStorage } from '@/redux/user/actions';
import { emptyCart, setCartDataFromLocalStorage } from '@/redux/cart/actions';
import { setAddressesAfterUserLogin } from '@/redux/addresses/actions';
import { useAppSelector } from '@/hooks/use-app-selector';
import { getUserCurrentLocationAndSetGeocode } from '@/redux/map/actions';
import { fetchAndSetNearestStoreData } from '@/redux/store/actions';
import { GetCustomerTokenInLocalStorage } from '@/functions/local-storage-methods';
import { showStartingPopup } from '@/redux/address-popup/slice';
import dynamic from 'next/dynamic';
import mixpanel from 'mixpanel-browser';
import { identifyUser } from '@/utils/mix-pnael';
const BannerPopup = dynamic(() => import('@/components/banner-popup/banner-popup'), { ssr: false });

interface IProps {
  children: React.ReactNode;
}

const AppIndex: React.FC<IProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const addressesData = useAppSelector((state) => state.addresses);
  const storeData = useAppSelector((state) => state.store);
  const userData = useAppSelector((state) => state.user);
  const { startingPopup, activeSelectedTab } = useAppSelector((state) => state.AddressPopup);

  // Combine redundant useEffect calls
  useEffect(() => {
    if (!activeSelectedTab) openAddressPopupAtStart();
    if (addressesData.addresses.length === 0) dispatch(getUserCurrentLocationAndSetGeocode({ setNearestStoreDataAsWell: true }));
  }, [addressesData, activeSelectedTab]);

  useEffect(() => {
    if (addressesData.selectedAddressID !== null && addressesData.selectedAddressDetails !== null) {
      dispatch(fetchAndSetNearestStoreData({ latitude: addressesData.selectedAddressDetails.lat, longitude: addressesData.selectedAddressDetails.lng }));
    }
  }, [addressesData]);

  useEffect(() => {
    SetupReduxStoreFromLocalStorage();
    trackFirstVisit();
  }, []);

  // Memoize the callback to avoid recreation on every render
  useMemo(() => {
    return () => {
      const userToken = GetCustomerTokenInLocalStorage();
      if (!userToken || userToken.length === 0) {
        dispatch(emptyCart({}));
        dispatch(logoutUser({}));
        // mixpanel.reset();
      }
    };
  }, [dispatch]);

  // Memoize the callback to avoid recreation on every render
  const openAddressPopupAtStart = useMemo(() => {
    return () => {
      const userToken = GetCustomerTokenInLocalStorage();
      const addressPopupCloseTime = localStorage.getItem('addressPopupCloseTime');
      const twentyMinutes = 20 * 60 * 1000;
      const currentTime = new Date().getTime();
      if (addressesData.addresses.length > 0 && userToken && userToken.length !== 0 && (!addressPopupCloseTime || currentTime - new Date(addressPopupCloseTime).getTime() > twentyMinutes)) {
        dispatch(showStartingPopup());
      }
    };
  }, [addressesData, dispatch]);

  const SetupReduxStoreFromLocalStorage = async () => {
    await dispatch(setUserDataFromLocalStorage({}));
    await dispatch(setAddressesAfterUserLogin({}));
    await dispatch(setCartDataFromLocalStorage({}));
  };

  const trackFirstVisit = () => {
    if (typeof window !== 'undefined') {
      const visited = localStorage.getItem('firstVisit');
      if (!visited) {
        const randomNumber = Math.floor(Math.random() * 1000000);
        localStorage.setItem('firstVisit', randomNumber.toString());
        // mixpanel.track('first_site_open');
        if (typeof window !== 'undefined') {
          window?.webengage?.track('first_site_open');
        }
      }
    }
  };

  useEffect(() => {
    if (userData?.isLoggedIn) {
      const userId = userData?.userID;
      const userProperties = {
        $email: userData?.email,
        $name: userData?.userName,
        $store_id: storeData?.selectedStoreID?.toString() || '32',
      };
      identifyUser(userId, userProperties);
    }
  }, [userData, storeData]);

  return (
    <>
      {children}
      {addressesData?.addresses?.length === 0 || !startingPopup ? <BannerPopup /> : null}
    </>
  );
};

export default AppIndex;
