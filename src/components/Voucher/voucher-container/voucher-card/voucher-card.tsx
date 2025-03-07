import LabelIcon from '@/containers/svg-icons/label-icon';
import { CheckVoucher_ResponseDataType } from '@/services/voucher/types';
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Slide, toast } from 'react-toastify';
import style from './voucher-card.module.scss';
import Buttons from '@/components/Button/Buttons';
import { SetAppliedVoucherInLocalStorage } from '@/functions/local-storage-methods';
import { useRouter } from 'next/router';
import PromoInput from '@/components/cart/promo-input/promo-input';
import { useLanguage } from '@/language-context/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { GetTranslatedData } from '@/services/footer/services';
import Cookies from 'js-cookie';

interface IProps {
  buttonColor: string;
  data: CheckVoucher_ResponseDataType;
  cardpage?: boolean
  unused: boolean;
}

const formatEndDate = (endDate: string) => {
  const date = new Date(endDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
const VoucherCard: React.FC<IProps> = ({ buttonColor, data, unused, cardpage }) => {
  const [appliedVoucherValue, setAppliedVoucherValue] = useState('')
  const [loadingVoucherCheck, setLoadingVoucherCheck] = useState(false)
  const applyVoucher = () => {
    if(!setLoadingVoucherCheck) return;
    const encodedItem = encodeURI(JSON.stringify(data?.VoucherCode));
    SetAppliedVoucherInLocalStorage(encodedItem);
    setAppliedVoucherValue(data?.VoucherCode)
  }
  const clipboard = () => {
    if (unused) {
      navigator?.clipboard?.writeText(data?.VoucherCode);
      toast('Copy to clipboard', {
        position: 'bottom-center',
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
        theme: 'dark',
      });
    }
  };

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
    <>
      {!cardpage ? (
        <div className={style.imageContainer}>
          <button style={{ background: `${buttonColor}` }} onClick={clipboard}>
            <Box className={style.box}>
              <Typography variant="body1" component="h2">
                <LabelIcon />
                {data?.Amount} {data?.DiscountType === 'Percent' ? '%' : 'KWD'} off
              </Typography>
              <Typography variant="body1" component="p">
                Valid Till : {formatEndDate(data?.EndDate)}
              </Typography>
            </Box>
            <Box className={style.box2}>
              <Typography variant="body1" component="h2">
                Code:
              </Typography>
              <Typography variant="body1" component="p">
                {data?.VoucherCode}
              </Typography>
            </Box>
          </button>
        </div>
      ) : (
        <div className={`${style.imageContainer} ${style.imageContainer2}`}>
          <div style={{ background: `${buttonColor}` }}>
            <Box className={style.box}>
              <Typography className={style.voucherCode} variant="body1" component="p">
                {data?.VoucherCode}
              </Typography>
              <Typography className={style.date} variant="body1" component="p">
                Valid Till : {formatEndDate(data?.EndDate)}
              </Typography>
            </Box>
            <Box className={`${style.box2} ${style.voucherBox}`}>
              <Typography className={style.voucherAmount} variant="body1" component="h2">
                <LabelIcon color='--primary-color' />
                {data?.Amount} {data?.DiscountType === 'Percent' ? '%' : 'KWD'} off
              </Typography>
              <Buttons btnClickFunction={applyVoucher} btnClass={`primary btn-half-rounded ${!loadingVoucherCheck ? style.loadingBtn : ''}`}>
               {loadingVoucherCheck ? getText('Apply') : 'loading'}
              </Buttons>
            </Box>
          </div>
          <PromoInput setLoadingVoucherCheck={setLoadingVoucherCheck} appliedVoucherValue={appliedVoucherValue} onlyVoucher={true}  voucherScreen={true} selectedOptionVal={false} />
        </div>
      )}
    </>
  );
};

export default VoucherCard;
