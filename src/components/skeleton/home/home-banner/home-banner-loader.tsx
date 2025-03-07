
import { Skeleton } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';
import style from './home-banner-loader.module.scss';

interface IProps {}

const HomeBannerLoader: NextPage<IProps> = () => {

  return (
    <>
      <div className={style.swiperContainer}>
        <Skeleton variant="rectangular" width={`100%`} />
        <Skeleton variant="rectangular" width={`100%`} />
        <Skeleton variant="rectangular" width={`100%`} />
      </div>
    </>
  );
};

export default HomeBannerLoader;
