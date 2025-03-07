import { useState, useEffect } from 'react';
import { useAppSelector } from './use-app-selector';
import { NextRouter } from 'next/router';
import { useLanguage } from '@/language-context/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { GetTranslatedData } from '@/services/footer/services';
import Cookies from 'js-cookie';

interface stateType {
  headerEstimateTimeText?: string;
  estimateTimeText?: string;
  estimateTimeTextForCart?: string;
  bool?: boolean;
}

export const useEstimateTime = (category: string | null, router?: NextRouter) => {
  const [cartProductCat, setCartProductCat] = useState<string>('');
  const { cartProducts } = useAppSelector((state) => state.cart);
  const storeData = useAppSelector((state) => state.store);
  const systemTime = new Date().getHours();
  useEffect(() => {
    if (cartProducts?.length) {
      cartProducts.map((cart) => {
        if (cart?.data?.Category !== undefined) {
          setCartProductCat(cart?.data?.Category);
        } else {
          setCartProductCat('');
        }
      });
    } else {
      setCartProductCat('');
    }
  }, [cartProductCat, cartProducts, systemTime, storeData, category, router]);
  const [estimateTime, setEstimateTime] = useState<stateType>({
    headerEstimateTimeText: '',
    estimateTimeText: '',
    estimateTimeTextForCart: '',
    bool: false,
  });

  const { language } = useLanguage();

  const { data: translatedData } = useQuery(
    ["complain-form"],
    async () => {
      return await GetTranslatedData({ token: "" });
    },
    {
      retry: (failureCount, error) => {
        const token = Cookies.get("auth-token");
        return !token;
      },
      retryDelay: 0,
      staleTime: 600000,
    }
  );

  const getText = (value: string) => {
    const translatedItems = translatedData?.Data || [];
    const item = translatedItems.find((item: any) => item.Value === value);
    return language === "ar" ? item?.Arabic : item?.English;
  };
  useEffect(() => {
    const convertMinutesToHoursAndDays = () => {
      const hours = Math.floor(storeData.selectedStoreDeliveryTime / 60);

      if (hours >= 24) {
        const days = Math.floor(hours / 24);
        setEstimateTime({
          headerEstimateTimeText: `${days} days`,
          estimateTimeText: `Expected time ${days} working days `,
          estimateTimeTextForCart: `Your order will be delivered within ${days} working days`,
          bool: false,
        });
        return;
      }

      const isNightTime = systemTime >= 21 || systemTime <= 1;

      if (category !== null && category?.toLowerCase() === 'labs' && isNightTime) {
        setEstimateTime({
          headerEstimateTimeText: '10 AM - 11 AM',
          estimateTimeText: 'Delivery time: 10 AM - 11 AM',
          estimateTimeTextForCart: 'A representative from Essa Lab will be in contact with you between 10 AM - 11 AM.',
          bool: true,
        });
        return;
      }

      if (category !== null && category?.toLowerCase() === 'labs') {
        setEstimateTime({
          headerEstimateTimeText: '3 Hours',
          estimateTimeText: getText('Expected-Time'),
          estimateTimeTextForCart: 'A representative from Essa Lab will be in contact with you within the next 3 hours.',
          bool: false,
        });
        return;
      }

      if (systemTime >= 1 && systemTime <= 8) {
        setEstimateTime({
          headerEstimateTimeText: '10 AM - 11 AM',
          estimateTimeText: 'Delivery time: 10 AM - 11 AM',
          estimateTimeTextForCart: 'Your order will be delivered between 10 AM - 11 AM.',
          bool: true,
        });
        return;
      }

      if (cartProductCat === 'Labs') {
        setEstimateTime({
          headerEstimateTimeText: '3 Hours',
          estimateTimeText: getText('Expected-Time'),
          estimateTimeTextForCart: 'A representative from Essa Lab will be in contact with you within the next 3 hours.',
          bool: false,
        });
        return;
      }

      setEstimateTime({
        headerEstimateTimeText: '60 Mins',
        estimateTimeText: getText('Expected-Time'),
        // estimateTimeTextForCart: `Your order will be delivered within ${hours} hour`,
        estimateTimeTextForCart: getText("Your-order-will-be-delivered"),
        bool: false,
      });
    };

    convertMinutesToHoursAndDays();
  }, [storeData, systemTime, category, cartProductCat]);

  return {
    headerEstimateTimeText: estimateTime.headerEstimateTimeText,
    estimateTimeText: estimateTime.estimateTimeText,
    estimateTimeTextForCart: estimateTime.estimateTimeTextForCart,
    bool: estimateTime.bool,
  };
};