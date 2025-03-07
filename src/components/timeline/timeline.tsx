/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import styles from './timeline.module.scss';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';

const cartCount = [
  { id: 1, title: 'Cart', status: true },
  { id: 2, title: 'Payment', status: false },
  { id: 3, title: 'Checkout', status: false },
];

const NumberedTimeline: React.FC<{ activeStep: number }> = ({ activeStep }) => {
  const router = useRouter();
  return (
    <Box className={styles.timelineWrapper}>
      {cartCount &&
        cartCount?.map((item) => (
          <Box className={`${styles.circleItem} ${item?.id <= activeStep ? styles.active : ''}`} key={item?.id}>
            <Box className={styles.number}>{item?.id}</Box>
            <Box className={styles.title}>{item?.title}</Box>
          </Box>
        ))}
    </Box>
  );
};

export default NumberedTimeline;
