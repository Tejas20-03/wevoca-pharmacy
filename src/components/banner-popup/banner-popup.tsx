import React, { useEffect, useState } from 'react';
import styles from './banner-popup.module.scss';
import CloseIconWithBackground from '@/containers/svg-icons/close-icon-with-background';
import Router, { useRouter } from 'next/router';
import { getPopupBanner, getPopupBannerApp, setPopupBannerLog } from '@/services/popup-banner/services';
import { GetPopupBannerResponse } from '@/services/popup-banner/types';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import Image from 'next/image';


const BannerPopup: React.FC = () => {
  const router = useRouter();
  const { width: windowWidth } = useWindowDimensions();
  const [popupShown, setPopupShown] = useState(false);
  const [popupValue, setPopupValue] = useState([] as GetPopupBannerResponse[]);
  const [popupValueApp, setPopupValueApp] = useState([] as GetPopupBannerResponse[]);
  const [currentPopupIndex, setCurrentPopupIndex] = useState(0);
  const [currentAppPopupIndex, setCurrentAppPopupIndex] = useState(0); // For app popup

  const popupBannerApi = async () => {
    const response = await getPopupBanner({});
    const responseAppBanner = await getPopupBannerApp({});
    setPopupValue(response?.Detail);
    setPopupValueApp(responseAppBanner?.Detail);
    return [response, responseAppBanner];
  };

  const cyclePopupIndex = (currentIndex: number, length: number) => {
    return (currentIndex + 1) % length;
  };
  
  const showNextPopup = (isAppPopup: boolean) => {
    if (isAppPopup) {
      setCurrentAppPopupIndex(cyclePopupIndex(currentAppPopupIndex, popupValueApp.length));
    } else {
      setCurrentPopupIndex(cyclePopupIndex(currentPopupIndex, popupValue.length));
    }
  };

  const resetIndexesIfNeeded = (lastPopupIndex, lastAppPopupIndex, checkingResponse) => {
    if (checkingResponse?.[0]?.Detail?.length !== 0 && currentPopupIndex >= checkingResponse?.[0]?.Detail?.length) {
      localStorage.setItem('lastPopupIndex', '0');
      setCurrentPopupIndex(0);
    } else {
      setCurrentPopupIndex(lastPopupIndex);
    }
    if (checkingResponse?.[1]?.Detail?.length !== 0 && currentAppPopupIndex >= checkingResponse?.[1]?.Detail?.length) {
      localStorage.setItem('lastAppPopupIndex', '0');
      setCurrentAppPopupIndex(0);
    } else {
      setCurrentAppPopupIndex(lastAppPopupIndex);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const checkingResponse = await popupBannerApi();
      if (checkingResponse?.length > 0) {
        const lastPopupIndex = parseInt(localStorage.getItem('lastPopupIndex') || '0', 10);
        const lastAppPopupIndex = parseInt(localStorage.getItem('lastAppPopupIndex') || '0', 10);
        resetIndexesIfNeeded(lastPopupIndex, lastAppPopupIndex, checkingResponse);

        // Check if popup should be shown
        const popupClosedTime = localStorage.getItem('popupClosedTime');
        const twentyMinutes = 20 * 60 * 1000; // 20 minutes in milliseconds
        const currentTime = new Date().getTime();
        if (!popupClosedTime || currentTime - new Date(popupClosedTime).getTime() > twentyMinutes) {
          setPopupShown(true);
        }
      }
    };

    fetchData();
  }, [currentPopupIndex, currentAppPopupIndex]);

  if (!popupShown || (popupValueApp?.length === 0 && popupValue?.length === 0)) {
    return null;
  }

  const currentPopupItem = windowWidth <= 576 ? popupValueApp?.[currentAppPopupIndex] : popupValue?.[currentPopupIndex];
  const isAppPopup = windowWidth <= 576 ? true : false;

  const closePopup = () => {
    setPopupShown(false);
    const currentTime = new Date();
    localStorage.setItem('popupClosedTime', currentTime.toString());

    if (isAppPopup) {
      localStorage.setItem('lastAppPopupIndex', currentAppPopupIndex === popupValueApp?.length - 1 ? '0' : (currentAppPopupIndex + 1).toString());
    } else {
      localStorage.setItem('lastPopupIndex', currentPopupIndex === popupValue?.length - 1 ? '0' : (currentPopupIndex + 1).toString());
    }

    showNextPopup(isAppPopup); // Move to the next popup when the current one is closed
  };

  const visitPage = () => {
    const popupArray = isAppPopup ? popupValueApp !== undefined && popupValueApp : popupValue;
    const currentPopupIndexItems = isAppPopup ? currentAppPopupIndex : currentPopupIndex;
    if (popupArray?.length > 0) {
      if (popupArray?.[currentPopupIndexItems].Type === 'screen') {
        router.push(`/`);
      } else if (popupArray?.[currentPopupIndexItems].Type === 'collection') {
        router.push(`/col/${popupArray?.[currentPopupIndexItems].Slug}`);
      } else if (popupArray?.[currentPopupIndexItems].Type === 'category') {
        router.push(`/cat/${popupArray?.[currentPopupIndexItems].Slug}`);
      } else if (popupArray?.[currentPopupIndexItems].Type === 'product') {
        router.push(`/p/${popupArray?.[currentPopupIndexItems].Slug}`);
      } else if (popupArray?.[currentPopupIndexItems].Type === 'brand') {
        router.push(`/brands/${popupArray?.[currentPopupIndexItems].Slug}`);
      } else {
        router.push(`/`);
      }
      Router.events.on('routeChangeComplete', async (url) => {
        setPopupShown(false);
        const currentTime = new Date();
        localStorage.setItem('popupClosedTime', currentTime.toString());
        await setPopupBannerLog({});
        if (isAppPopup) {
          localStorage.setItem('lastAppPopupIndex', currentAppPopupIndex === popupArray?.length - 1 ? '0' : (currentAppPopupIndex + 1).toString());
        } else {
          localStorage.setItem('lastPopupIndex', currentPopupIndex === popupArray?.length - 1 ? '0' : (currentPopupIndex + 1).toString());
        }

        showNextPopup(isAppPopup);
      });
    }
  };
  return (
    <>
      {(popupValueApp?.length > 0 ? (
          <div className={styles.popup}>
            <div className={styles.popupWrapper}>
              <button className={styles.closePopupBtn} onClick={closePopup}>
                <CloseIconWithBackground />
              </button>
              <button className={styles.imageWrapper} onClick={visitPage} style={{ position: 'relative' }}>
                <Image priority sizes="(min-width: 760px) 550px, (min-width: 620px) 550px, (min-width: 580px) 550px, (min-width: 440px) 550px, 550px" fill src={currentPopupItem?.BannerImageNew} alt="banner" />
              </button>
            </div>
          </div>
        ) : popupValueApp?.length === 0 ? <h1>Loading....</h1> : (
          popupValue?.length > 0
        )
      ) ? (
        <div className={styles.popup}>
          <div className={styles.popupWrapper}>
            <button className={styles.closePopupBtn} onClick={closePopup}>
              <CloseIconWithBackground />
            </button>
            <button className={styles.imageWrapper} onClick={visitPage} style={{ position: 'relative' }}>
              <Image priority sizes="(min-width: 760px) 550px, (min-width: 620px) 503px, (min-width: 580px) 480px, (min-width: 440px) 480px, 550px" width={550} height={550} src={currentPopupItem?.BannerImageNew} alt="banner" />
            </button>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default BannerPopup;
