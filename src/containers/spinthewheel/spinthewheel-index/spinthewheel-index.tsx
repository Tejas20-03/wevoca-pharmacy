import BreadCrumb from '@/components/Bread-crumb/BreadCrumb';
import PageWithBanner from '@/components/page-banner/page-with-banner';
import React from 'react';
import BoxTitle from '@/components/BoxTitle/Box-title';
// import style from './order-index.module.scss';

interface IProps {}

const SpinTheWheelIndex: React.FC<IProps> = () => {
  return (
    <PageWithBanner>
      <BoxTitle boxTitle="Fortune Wheel" />
      
    </PageWithBanner>
  );
};

export default SpinTheWheelIndex;
