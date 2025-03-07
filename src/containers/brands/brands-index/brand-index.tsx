import React, { useEffect } from 'react';
import styles from './brand-index.module.scss';
import BaseLayout from '@/layouts/base-layout/base-layout';
import BreadCrumb from '@/components/Bread-crumb/BreadCrumb';
import { Container } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { GetBrandsListing } from '@/services/brands/services';
import Cookies from 'js-cookie';
import SectionLoader from '@/components/Section-loader/section-loader';
import BrandCard from '@/containers/brands/brands-card/Brand-card';

interface IProps { }

const BrandIndex: React.FC<IProps> = () => {
    const { isLoading, error, data, refetch } = useQuery(['brands'], async () => {

        return await GetBrandsListing({ token: '' });
    },
        {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            retry: (failureCount, error) => {
                const token = Cookies.get('auth-token');
                return !token;
            },
            retryDelay: 0,

            staleTime: 600000, // 1 day
        }
    );

    useEffect(() => {
        if (error) refetch();
    }, [error])


    if (isLoading) return <SectionLoader />;

    if (error) return <SectionLoader />

    const brandCard = data?.Data.length > 0 && data?.Data.map((value, index) => <BrandCard value={value} key={index} />)
    return (
        <BaseLayout classes={styles.bannerContainer}>
            <Container>
                <BreadCrumb FourthLink="Brands" classes='deal-breadcrumb' />
                <ul className={styles.BrandContainer}>{brandCard}</ul>
            </Container>
        </BaseLayout>
    );
};

export default BrandIndex;
