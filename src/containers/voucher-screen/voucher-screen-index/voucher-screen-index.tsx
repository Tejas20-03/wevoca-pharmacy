import { Box, Typography } from '@mui/material';
import React, { useLayoutEffect } from 'react';

import style from './voucher-index.module.scss';
import { useQuery } from '@tanstack/react-query';
import { DeleteAppliedVoucherInLocalStorage, GetCustomerTokenInCookiesStorage, GetCustomerTokenInLocalStorage, GetSelectedPaymentMethodInLocalStorage } from '@/functions/local-storage-methods';
import { getCustomerVouchers } from '@/services/voucher/services';
import dynamic from 'next/dynamic';
import PageWithBanner from '@/components/page-banner/page-with-banner';
import PromoInput from '@/components/cart/promo-input/promo-input';
import ArrowLeft from '@/containers/svg-icons/arrow-left';
import Link from 'next/link';
import { useLanguage } from '@/language-context/LanguageContext';
import { GetTranslatedData } from '@/services/footer/services';
import Cookies from 'js-cookie';
const TabPanel = dynamic(() => import('@/components/tabs/TabPanel'));
const VoucherContainer = dynamic(() => import('@/components/Voucher/voucher-container/Voucher-container'));
const BoxTitle = dynamic(() => import('@/components/BoxTitle/Box-title'));

interface IProps {}

const getCurrentDate = () => {
  const today = new Date();
  return today.getTime();
};

const isDateBefore = (date: string) => {
  const targetDate = new Date(date);
  return getCurrentDate() < targetDate.getTime();
};

const VoucherIndex: React.FC<IProps> = () => {
  const [value, setValue] = React.useState(0);

  const paymentMethodSelected = GetSelectedPaymentMethodInLocalStorage();
  const decodedPaymentMethod = JSON.parse(decodeURI(paymentMethodSelected));
  const { data } = useQuery(['getCustomerVoucher'], async () => {
    const customerToken = GetCustomerTokenInLocalStorage();
    const customerTokenCookies: string = await GetCustomerTokenInCookiesStorage();
    return await getCustomerVouchers({ token: customerToken !== null ? customerToken || customerTokenCookies : undefined });
  });
  const unused = data?.Data?.filter((item) => item.isUsed === 'False' && isDateBefore(item.EndDate));
  useLayoutEffect(() => {
    DeleteAppliedVoucherInLocalStorage();
  }, []);

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
    <PageWithBanner removeSideSpacing={style.cartPageCOntainer}>
      <div className={style.backButton}>
        <Link href={'/payment'}>
          <ArrowLeft />
        </Link>
        <BoxTitle classes={style.voucherHeading} boxTitle={getText("Vouchers")} />
      </div>
      <Box className={style.promoBox}>
        {decodedPaymentMethod?.id === 2 && <BoxTitle boxTitle=" Voucher Code" />}
        {decodedPaymentMethod?.id === 1 && (
          <>
            <BoxTitle boxTitle=" Apply your bank discount" />
            <Typography variant="body2" component="p">
              Add your first 6 digits of your selected card to apply promo
            </Typography>
          </>
        )}
        <PromoInput voucherScreen={true} selectedOptionVal={decodedPaymentMethod?.id === 1 ? true : false} />
      </Box>
      {decodedPaymentMethod?.id === 1 && <BoxTitle boxTitle="Vouchers" />}
      <Typography>
        <strong>{getText("Note")}:</strong> Click on voucher to apply <br />
      </Typography>
      <Box className={`verticalTabs ${style.orderTabs}`} sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}>
        <Box className={style.orderTabPanel}>
          <TabPanel classes={style.orderTabs} value={value} index={0}>
            {unused !== undefined && unused?.length > 0 ? (
              unused?.map((item, index) => <VoucherContainer cardpage={true} unused={true} key={index} buttonColor="var(--primary-color)" data={item} type={value} />)
            ) : (
              <>
                <Typography>
                  <strong>{getText("Note")}:</strong> Vouchers not found! <br />
                </Typography>
                <Typography sx={{ paddingLeft: '47px' }}>You haven’t been given any vouchers yet</Typography>
              </>
            )}
          </TabPanel>
        </Box>
      </Box>
    </PageWithBanner>
  );
};

export default VoucherIndex;
