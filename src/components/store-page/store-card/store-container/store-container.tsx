import React, { useEffect, useState } from 'react';
import StoreCardItem from '@/components/store-page/store-card/StoreCardItem';
import style from './store-container.module.scss';
import { GetBranch_ResponseDataType } from '@/services/stores/types';
import { getBranch, getBranchSchedule } from '@/services/stores/services';
import SectionLoader from '@/components/Section-loader/section-loader';
import dynamic from 'next/dynamic';
const StoreModal = dynamic(() => import('@/components/store-page/store-modal/Store-modal'));

interface IProps {}

const StoreContainer: React.FC<IProps> = () => {
  const [storeData, setStoreData] = useState([] as GetBranch_ResponseDataType[] | null);
  const [branchCode, setBranchCode] = useState<string>('');
  useEffect(() => {
    const storeFunc = async () => {
      const response = await getBranch('', { token: '' });
      if (response && response.Data && response.Data.length > 0) {
        setStoreData(response.Data);
      } else {
        setStoreData(null);
      }
      await getBranchSchedule(branchCode, { token: '' }).then((res) => {
        console.log(res);
      });
    };
    storeFunc();
  }, []);

  const storeCard = storeData?.map((data, index) => <StoreCardItem data={data} key={index} setBranchCode={setBranchCode} />);

  return (
    <>
      <ul className={style.storeCardContainer}>{storeCard}</ul>
      {storeData?.length ? <StoreModal branchCodeProp={branchCode} /> : <SectionLoader />}
    </>
  );
};

export default StoreContainer;
