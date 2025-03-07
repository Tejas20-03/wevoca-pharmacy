import React from 'react';
import DealsCardItem from '@/components/Deals/Deals-Card/Deals-Card-Item';
import style from './Deals-Card-Container.module.scss';
import { GetBannersNew_DetailDataType } from '@/services/banners/types';

interface IProps {

  data: GetBannersNew_DetailDataType[];
}

const DealsCardContainer: React.FC<IProps> = ({ data }) => {
  const listItems = data.map((itemData, index: number) => <DealsCardItem key={index} data={itemData} />);
  return <ul className={style.dealsCardWrapper}>{listItems}</ul>;
};

export default DealsCardContainer;
