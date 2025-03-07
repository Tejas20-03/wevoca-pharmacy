import { Box } from '@mui/material';
import React from 'react';
import style from './Voucher-container.module.scss';
import VoucherCard from './voucher-card/voucher-card';
import { CheckVoucher_ResponseDataType } from '@/services/voucher/types';

interface IProps {
  buttonColor: string;
  type: number;
  cardpage?: boolean;
  data: CheckVoucher_ResponseDataType;
  unused?: boolean;
}

const VoucherContainer: React.FC<IProps> = ({ buttonColor, data, unused = false, cardpage = false }) => {
  return (
    <>
      {!cardpage ? (
        <Box className={style.gridBox}>
          <VoucherCard cardpage={cardpage} data={data} unused={unused} buttonColor={buttonColor} />
        </Box>
      ) : (
        <Box className={style.gridBox}>
          <VoucherCard cardpage={cardpage} data={data} unused={unused} buttonColor={buttonColor} />
        </Box>
      )}
    </>
  );
};

export default VoucherContainer;
