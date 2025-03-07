import { Skeleton } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';
import style from './home-category-loader.module.scss';

interface IProps {}

const HomeCategoryLoader: NextPage<IProps> = () => {
  return (
    <>
      <div className={style.categoryContainer}>
        <Skeleton className={style.loader} variant="rectangular" width={`100%`} />
        <Skeleton className={style.loader} variant="rectangular" width={`100%`} />
        <Skeleton className={style.loader} variant="rectangular" width={`100%`} />
        <Skeleton className={style.loader} variant="rectangular" width={`100%`} />
        <Skeleton className={style.loader} variant="rectangular" width={`100%`} />
        <Skeleton className={style.loader} variant="rectangular" width={`100%`} />
        <Skeleton className={`${style.loader} ${style.mobileLoader}`} variant="rectangular" width={`100%`} />
        <Skeleton className={`${style.loader} ${style.mobileLoader}`} variant="rectangular" width={`100%`} />
        <Skeleton className={`${style.loader} ${style.mobileLoader}`} variant="rectangular" width={`100%`} />
      </div>
    </>
  );
};

export default HomeCategoryLoader;
