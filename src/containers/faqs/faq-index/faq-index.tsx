import React, { useEffect, useState } from 'react';
import FaqAbout from '@/containers/faqs/faq-about/faq-about';
import FaqDelivery from '@/containers/faqs/faq-delivery/faq-delivery';
import FaqMedicines from '@/containers/faqs/faq-medicines/faq-medicines';
import FaqOrders from '@/containers/faqs/faq-orders/faq-orders';
import FaqPayment from '@/containers/faqs/faq-payment/faq-payment';
import FaqReturn from '@/containers/faqs/faq-return/faq-return';
import PageWithBanner from '@/components/page-banner/page-with-banner';
import BreadCrumb from '@/components/Bread-crumb/BreadCrumb';
import style from './faq-index.module.scss';


interface IProps { }

const FaqIndex: React.FC<IProps> = () => {
    return (
        <PageWithBanner removeSideSpacing={style.pageSpacing}>
            <BreadCrumb FourthLink="FAQS" classes='deal-breadcrumb' />
            <div className="faq-grid">
                <FaqAbout />
                <FaqPayment />
                <FaqReturn />
                <FaqOrders />
                <FaqDelivery />
                <FaqMedicines />
            </div>
        </PageWithBanner>
    );
};

export default FaqIndex;
