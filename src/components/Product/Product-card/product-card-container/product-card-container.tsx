import React, { useMemo } from 'react';
import style from './product-card-container.module.scss';
import { ProductCardDataType } from '@/services/product/types';

import dynamic from 'next/dynamic';
const ProductCard = dynamic(() => import('@/components/Product/Product-card/ProductCard'));
const InfiniteScroll = dynamic(() => import('react-infinite-scroll-component'));

interface productCardProps {
    data: ProductCardDataType[],
    loadMore?: () => void,
    className?: string
}


const ProductCardContainer: React.FC<productCardProps> = ({ data, loadMore, className }) => {
    const classes = useMemo(() => ` ${style.ProductListContainer} ${className}`, [className])
    const listItems = data.map((itemData, index: number) => {
        if (itemData?.Variation !== undefined) {
            return <ProductCard data={itemData} key={index} />
        }
        return null
    }
    );
    return (
        <div className={classes}>
            <InfiniteScroll
                dataLength={data.length} //This is important field to render the next data
                next={loadMore}
                hasMore={true}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                <ul>
                    {listItems}
                </ul>
            </InfiniteScroll>
        </div>
    );
};

export default ProductCardContainer;
