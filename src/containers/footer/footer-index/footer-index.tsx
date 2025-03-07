import useWindowDimensions from '@/hooks/useWindowDimensions';
import React, { useEffect } from 'react';
import Router from 'next/router';
import Cookies from 'js-cookie';
import { openLoginPopup } from '@/redux/Login-popup/slice';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import dynamic from 'next/dynamic';
import { useAppSelector } from '@/hooks/use-app-selector';
import useFcmToken from '@/hooks/use-fcm-token';
import { GetFcmTokenFromLocalStorage, SetFcmTokenInLocalstorage } from '@/functions/local-storage-methods';
import { SaveFcmTokenApi } from '@/services/fcmtoken-api/services';
const FooterDesktop = dynamic(() => import('@/containers/footer/footer-desktop/Footer-desktop'));
const FooterMobile = dynamic(() => import('@/containers/footer/footer-mobile/Footer-Mobile'));

interface IProps {}

const FooterIndex: React.FC<IProps> = ({}) => {
  const { width: windowWidth } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const handleNavigation = (route: string) => {
    const getUserData = Cookies.get('user');
    const isLoggedIn = getUserData !== undefined ? JSON.parse(getUserData).isLoggedIn : false;

    if (isLoggedIn) {
      Router.push(route);
    } else {
      dispatch(openLoginPopup());
    }
  };

  const addressData = useAppSelector((state) => state.addresses);
  const { fcmToken } = useFcmToken();
  useEffect(() => {
    const getUserData = Cookies.get('user');
    const userData = getUserData !== undefined ? JSON.parse(getUserData) : '';
    const savedToken = GetFcmTokenFromLocalStorage();
    
    const saveFcmTokenInDB = async () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (fcmToken && !savedToken) {
            SaveFcmTokenApi(
              {
                CustomerID: userData?.userID ?? '',
                Token: fcmToken,
                Channel: 'Web',
                Latitude: `${addressData?.selectedAddressDetails?.lat !== undefined ? addressData.selectedAddressDetails.lat : position?.coords?.latitude}`,
                Longitude: `${addressData?.selectedAddressDetails?.lng !== undefined ? addressData.selectedAddressDetails.lng : position?.coords?.longitude}`,
              },
              { contentType: 'application/json' }
            ).then((response) => {
              SetFcmTokenInLocalstorage(fcmToken);
            });
          }
        },
        (error) => {
          if (error?.code === error?.PERMISSION_DENIED) {
            console.log('permission not granted');
          }
        }
      );
    };
    saveFcmTokenInDB();
  }, [fcmToken]);

  return <>{windowWidth === 0 ? '' : windowWidth > 576 ? <FooterDesktop handleOrders={() => handleNavigation('/orders')} handleAccount={() => handleNavigation('/account')} /> : <FooterMobile handleAccount={() => handleNavigation('/account')} />}</>;
};

export default FooterIndex;
