import DeliveryIcon from '@/containers/svg-icons/delivery';
import { Typography } from '@mui/material';
import React from 'react';
import style from './product-expected-delivery-full-width-banner.module.scss';
import { useEstimateTime } from '@/hooks/use-estimate-time';
import { useLanguage } from '@/language-context/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { GetTranslatedData } from '@/services/footer/services';
import Cookies from 'js-cookie';

interface IProps {
  categoryName: string;
}

const ProductExpectedDeliveryFullWidthBanner: React.FC<IProps> = ({ categoryName }) => {
  const { bool, estimateTimeText } = useEstimateTime(categoryName); // Pass categoryName directly

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

  return (
    <div className={style.container}>
      <Typography className={style.expectedTime} variant='body1' component='h2'>{estimateTimeText}</Typography>
      {!bool && (
        <>
          <Typography className={style.seperator} variant='body1' component='h2'>|</Typography>
          <DeliveryIcon />
          <Typography className={style.quickDelivery} variant='body1' component='h2'>{getText("QUICK-DELIVERY")}</Typography>
        </>
      )}
    </div>

  );
};

export default ProductExpectedDeliveryFullWidthBanner;
