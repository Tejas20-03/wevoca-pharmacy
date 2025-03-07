import { Container, Skeleton } from '@mui/material';
import React from 'react';
import style from './headerSkeleton.module.scss';

interface IProps {}

const HeaderDesktopSkeleton: React.FC<IProps> = () => {

  return (
    <header className={style.headerLoader}>
      <Container>
        <div className={style.headerLoaderTopDesktop}>
          <div>
            <Skeleton variant="rectangular" width={`120px`} height={`36px`} />
          </div>
          <div className={style.headerLoaderTopRight}>
            <Skeleton variant="rectangular" width={`277px`} height={`36px`} />
            <Skeleton variant="rectangular" width={`250px`} height={`36px`} style={{marginLeft: '15px'}} />
            <Skeleton variant="rectangular" width={`144px`} height={`36px`} style={{marginLeft: '15px'}} />
            <Skeleton variant="rectangular" width={`105px`} height={`36px`} style={{marginLeft: '15px'}} />
          </div>
        </div>
        <div className={style.headerLoaderTopMobile}>
          <div>
            <Skeleton variant="rectangular" width={`50px`} height={`36px`} />
            <Skeleton variant="rectangular" width={`50px`} height={`36px`} />
            <Skeleton variant="rectangular" width={`150px`} height={`36px`} />
          </div>
          <div>
            <Skeleton variant="rectangular" width={`144px`} height={`36px`} />
          </div>
        </div>
        <ul className={style.headerLoaderBottom}>
          <li><Skeleton variant="rectangular" width={`104px`} height={`36px`} /></li>
          <li><Skeleton variant="rectangular" width={`104px`} height={`36px`} /></li>
          <li><Skeleton variant="rectangular" width={`104px`} height={`36px`} /></li>
          <li><Skeleton variant="rectangular" width={`104px`} height={`36px`} /></li>
          <li><Skeleton variant="rectangular" width={`104px`} height={`36px`} /></li>
          <li><Skeleton variant="rectangular" width={`104px`} height={`36px`} /></li>
          <li><Skeleton variant="rectangular" width={`104px`} height={`36px`} /></li>
        </ul>
      </Container>
    </header>
  );
};

export default HeaderDesktopSkeleton;
