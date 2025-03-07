import React from 'react';
import { Box, Typography } from '@mui/material';
import Style from './collection-index.module.scss'
import BaseLayout from '@/layouts/base-layout/base-layout';
import { Container } from '@mui/system';
import BoxTitle from '@/components/BoxTitle/Box-title';
import ProductCategoryTitle from '@/components/Product/category-title/Product-category-title';
import Head from 'next/head';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { SearchProductByJSON_ResponseType } from '@/services/search/types';
const ProductCategorySlider = dynamic(() => import('@/components/Product/Product-category-slider/product-category-slider'), {ssr: true});
const PageBanner = dynamic(() => import('@/components/page-banner/Page-banner'), {ssr: true});
const Breadcrumb = dynamic(() => import('@/components/Bread-crumb/BreadCrumb'), {ssr: true});
const ProductCardContainer = dynamic(() => import('@/components/Product/Product-card/product-card-container/product-card-container'), {ssr: true});
const PaginationComp = dynamic(() => import('@/components/Pagination/pagination'), {ssr: true});

export type collectionFetchingType = 'category' | 'brand' | 'collection' | 'atozmedicine' | 'search';
interface collectionIndexProps {
    isSubCategory?: boolean
    fetchingType: collectionFetchingType,
    slug: string,
    item?: SearchProductByJSON_ResponseType,
    handleChange?: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const CollectionIndex: React.FC<collectionIndexProps> = ({ isSubCategory = false, slug, fetchingType, item, handleChange }) => {
    const router = useRouter();
    const bannerImage = (item?.CategoryImageURL === undefined || item?.CategoryImageURL === '') ? [] : [{ image: item?.CategoryImageURL, imageAlt: '' || '' }];
    const bannerImage2 = (item?.BannerImageURL === undefined || item?.BannerImageURL === '') ? [] : [{ image: item?.BannerImageURL, imageAlt: '' || '' }];
    const CategoryImageApp = (item?.CategoryImageApp === undefined || item?.CategoryImageApp === '') ? [] : [{ image: item?.CategoryImageApp, imageAlt: '' || '' }];
    return (
        <>
            {(fetchingType !== 'search' || fetchingType !== 'atozmedicine' || fetchingType !== 'collection') &&
                <Head>
                    {item?.Data !== undefined && item.Data[0]?.MetaDescription?.length > 0 && <meta name="description" content={`${item?.Data[0]?.MetaDescription}`} />}
                    {item?.Data !== undefined && item.Data[0]?.MetaTitle?.length > 0 && <title>{item?.Data[0]?.MetaTitle}</title>}
                </Head>}
            {fetchingType === 'collection' &&
                <Head>
                    {item?.Detail !== undefined && item.Detail[0]?.MetaDescription?.length > 0 && <meta name="description" content={`${item?.Detail[0]?.MetaDescription}`} />}
                    {item?.Detail !== undefined && item.Detail[0]?.MetaTitle?.length > 0 && <title>{item?.Detail[0]?.MetaTitle}</title>}
                </Head>}
            <BaseLayout classes={Style.bannerContainer}>
                {fetchingType !== 'category' && <>
                    {(bannerImage?.length > 0) && <PageBanner BannarUrl={bannerImage} />}
                    {(bannerImage?.length === 0) && <PageBanner BannarUrl={bannerImage2} />}
                </>}
                {fetchingType === 'category' && <>{CategoryImageApp && <PageBanner BannarUrl={CategoryImageApp} />}</>}
                <Container>
                    <>
                        {fetchingType !== 'category' && <>{item?.CollectionName && <Breadcrumb FourthLink={item?.CollectionName} classes="deal-breadcrumb" />}</>}
                        {fetchingType === 'category' && <>{item?.CollectionName && <Breadcrumb categoryHierarhcy={item.CategoryHierarchy} FourthLink={item?.CollectionName} classes="deal-breadcrumb" />}</>}
                        {item?.CollectionName && <ProductCategoryTitle pgTitle={item?.CollectionName} />}
                    </>
                </Container>
                {item?.Data !== undefined && item.Data.length > 0 &&
                    <>
                        {isSubCategory && <ProductCategorySlider slugUrl={slug} fetchingType={fetchingType} />}
                        <Container>
                            <ProductCardContainer data={item?.Data} />
                        </Container>
                    </>
                }
                {item?.Detail !== undefined && item.Detail.length > 0 &&
                    <>
                        {isSubCategory && <ProductCategorySlider slugUrl={slug} fetchingType={fetchingType} />}
                        <Container>
                            <ProductCardContainer data={item?.Detail} />
                        </Container>
                    </>
                }

                {item?.Data !== undefined && item?.Data.length === 0 &&
                    <Container>
                        <Box className={Style.noProduct}>
                            <BoxTitle boxTitle='No products found' />
                            <Typography variant='body1' component='p'>Currently no products has been added to this category yet!</Typography>
                        </Box>
                    </Container>
                }

                {item?.RecordsCount !== undefined && item?.RecordsCount !== '0' ? <PaginationComp router={router} PageCount={Math.ceil(Number(item?.RecordsCount) / 16)} handleChange={handleChange} /> : ''}
            </BaseLayout>
        </>
    );
};
export default CollectionIndex;
