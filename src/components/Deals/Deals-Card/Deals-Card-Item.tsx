import React from 'react';
import style from './Deals-Card.module.scss';

import { GetBannersNew_DetailDataType } from '@/services/banners/types';
import DealsBannerImage from '@/components/Banner-image/Deals-banner-image';

interface IProps {
    data: GetBannersNew_DetailDataType;
}

const DealsCardItem: React.FC<IProps> = ({ data }) => {
    return (
        <li className={style.dealsCardItems}>
            <div className={style.dealsCardItem}>
                <DealsBannerImage className={style.dealsImages} src={data.BannerImageNew} alt={data.Text} type={data.Type} slug={data.Slug} />
            </div>
        </li>
    );
};

export default DealsCardItem;
