import React, { useEffect, useState } from 'react';
import StoreCardItem from '@/components/store-page/store-card/StoreCardItem';
import style from './store-container.module.scss';
import { GetBranch_ResponseDataType } from '@/services/stores/types';
import { getBranch, getBranchSchedule } from '@/services/stores/services';
import SectionLoader from '@/components/Section-loader/section-loader';
import dynamic from 'next/dynamic';
import PageBanner from '@/components/page-banner/Page-banner';
import BreadCrumb from '@/components/Bread-crumb/BreadCrumb';
import { GetBranch_ResponseType } from '@/services/ticker/types';
const StoreModal2 = dynamic(() => import('@/components/store-page/store-modal-2/Store-modal'));

interface IProps {}

const StoreContainer: React.FC<IProps> = () => {
  const [storeData, setStoreData] = useState([] as GetBranch_ResponseDataType[] | null);
  const [storeBannerImage, setStoreBannerImage] = useState<GetBranch_ResponseType>();
  const [branchCode, setBranchCode] = useState<string>('');
  useEffect(() => {
    const storeFunc = async () => {
      const response = await getBranch('', { token: '' });
      if (response && response.Data && response.Data.length > 0) {
        const data = response?.Data.filter((data) => data?.Title?.includes('24'));
        setStoreData(data);
        setStoreBannerImage(response);
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
  const bannerImage = (storeBannerImage?.BannerImageGUID === undefined || storeBannerImage?.BannerImageGUID === '') ? [] : [{ image: storeBannerImage?.BannerImageGUID, imageAlt: '' || '' }];
  return (
    <>
      {bannerImage?.length ? <PageBanner BannarUrl={bannerImage} /> : ''}
      <BreadCrumb FourthLink="stores" classes="deal-breadcrumb" />
      <ul className={style.storeCardContainer}>{storeCard}</ul>
      {storeData?.length ? <StoreModal2 branchCodeProp={branchCode} /> : <SectionLoader />}
    </>
  );
};

export default StoreContainer;