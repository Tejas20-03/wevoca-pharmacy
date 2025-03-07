import { Skeleton } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';
import style from './home-brand-loader.module.scss';

interface IProps {}

const HomwBrandLoader: NextPage<IProps> = () => {
  return (
    <>
      <div className={style.brandLoader}>
        <div className={style.title}>
          <Skeleton className={style.loader} variant="rectangular" width={`90px`} />
          <Skeleton className={style.loader} variant="rectangular" width={`100px`} />
        </div>
        <div className={style.brandItem}>
          <Skeleton className={style.loader} variant="rectangular" width={`100px`} />
          <Skeleton className={style.loader} variant="rectangular" width={`100px`} />
          <Skeleton className={style.loader} variant="rectangular" width={`100px`} />
          <Skeleton className={style.loader} variant="rectangular" width={`100px`} />
          <Skeleton className={style.loader} variant="rectangular" width={`100px`} />
          <Skeleton className={style.loader} variant="rectangular" width={`100px`} />
        </div>
      </div>
    </>
  );
};

export default HomwBrandLoader;
