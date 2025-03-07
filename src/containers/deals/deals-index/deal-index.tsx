import BaseLayout from '@/layouts/base-layout/base-layout';
import React from 'react';
import BreadCrumb from '@/components/Bread-crumb/BreadCrumb';
import { Container } from '@mui/system';
import DealsCardContainer from '@/components/Deals/Deals-Card/Deals-Card-Container/Deals-Card-Container';
import style from './Deals-index.module.scss';
import { GetBannersNew_ResponseType } from '@/services/banners/types';
import Head from 'next/head';


interface IProps {

    data: GetBannersNew_ResponseType,

}

const DealsContainer: React.FC<IProps> = ({ data }) => {
    return (
        <>
            <Head>
                <meta name="description" content='Discover the best deals on authentic pharmaceutical and wellness products at Wevoca Online Pharmacy. Our online medical store offers unbeatable prices on a range of products, including medicines, supplements, personal care items, and more. Shop now and save big!' />
                {/* <title>Best Deals on Authentic Pharmaceutical & Wellness Products - DVAGO®</title> */}
                <title>Best Deals on Authentic Pharmaceutical & Wellness Products - TEMP®</title>
            </Head>
            <BaseLayout classes={style.dealsLayout}>
                <Container>
                    <BreadCrumb FourthLink="deals" classes='deal-breadcrumb' />
                    {data && <DealsCardContainer data={data.Detail} />}
                </Container>
            </BaseLayout>
        </>
    );
};

export default DealsContainer;
