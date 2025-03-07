import { Container, Skeleton } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';
import style from './home-blog-loader.module.scss';

interface IProps {}

const HomeBlogsLoader: NextPage<IProps> = () => {
  return (
    <div className={style.blogLoader}>
      <Container>
        <div className={style.title}>
          <Skeleton className={style.loader} variant="rectangular" width={`90px`} />
          <Skeleton className={style.loader} variant="rectangular" width={`100px`} />
        </div>
        <div className={style.blogItems}>
          <div className={style.card}>
            <div className={style.cardImg}>
              <Skeleton className={style.loader} variant="rectangular" width={`100%`} />
            </div>
            <div className={style.cardContent}>
              <Skeleton className={style.loader} variant="rectangular" width={`100%`} />
              <Skeleton className={style.loader} variant="rectangular" width={`100%`} />
            </div>
          </div>
          <div className={style.card}>
            <div className={style.cardImg}>
              <Skeleton className={style.loader} variant="rectangular" width={`100%`} />
            </div>
            <div className={style.cardContent}>
              <Skeleton className={style.loader} variant="rectangular" width={`100%`} />
              <Skeleton className={style.loader} variant="rectangular" width={`100%`} />
            </div>
          </div>
          <div className={style.card}>
            <div className={style.cardImg}>
              <Skeleton className={style.loader} variant="rectangular" width={`100%`} />
            </div>
            <div className={style.cardContent}>
              <Skeleton className={style.loader} variant="rectangular" width={`100%`} />
              <Skeleton className={style.loader} variant="rectangular" width={`100%`} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HomeBlogsLoader;
