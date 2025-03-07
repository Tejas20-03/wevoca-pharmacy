import { Container, Skeleton } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';
import style from './account-page-loader.module.scss';

interface IProps {}

const AccountPageLoader: NextPage<IProps> = () => {
  return (
    <>
      <div className={style.accountLoader}>
        <Container>
          <div className={style.breadcrumb}>
            <Skeleton className={style.loader} variant="rectangular" width={`40px`} />
            <Skeleton className={style.loader} variant="rectangular" width={`12px`} />
            <Skeleton className={style.loader} variant="rectangular" width={`76px`} />
          </div>
          <div className={style.title}>
            <Skeleton className={style.loader} variant="rectangular" width={`100%`} />
          </div>
          <div className={style.number}>
            <Skeleton className={style.loader} variant="rectangular" width={'242px'} />
            <Skeleton className={style.loader} variant="rectangular" width={'110px'} />
          </div>
           <div className={style.boxes}>
            <Skeleton className={style.loader} variant="rectangular" width={`100%`} />
            <Skeleton className={style.loader} variant="rectangular" width={`100%`} />
            <Skeleton className={style.loader} variant="rectangular" width={`100%`} />
            <Skeleton className={style.loader} variant="rectangular" width={`100%`} />
          </div>
          <div className={style.form}>
            <Skeleton className={style.loader} variant="rectangular" width={`100%`} />
            <Skeleton className={style.loader} variant="rectangular" width={`100%`} />
            <Skeleton className={style.loader} variant="rectangular" width={`100%`} />
          </div>
          <div className={style.button}>
            <Skeleton className={style.loader} variant="rectangular" width={'220px'} />
          </div>
        </Container>
      </div>
    </>
  );
};

export default AccountPageLoader;
