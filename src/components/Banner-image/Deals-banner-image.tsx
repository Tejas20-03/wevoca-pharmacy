import React, { useMemo } from 'react';
import style from './Banner-image.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { BRAND_PAGE_URL, COLLECTIONS_PAGE_URL, COLLECTION_PAGE_URL, PRODUCT_PAGE_URL } from '@/Constants/constants';

interface Props {
    className?: string;
    src: string;
    alt: string;
    type: string;
    slug: string;

}



const DealsBannerImage: React.FC<Props> = ({ className, src, alt, type, slug }) => {
    const handleBannersRoute = () => {
        switch (type) {
            case 'screen':
                return "";
            case 'product':
                return PRODUCT_PAGE_URL(slug);
            case 'atozmedicine':
                return BRAND_PAGE_URL(slug);
            case 'collection':
                return COLLECTION_PAGE_URL(slug);
            case 'category':
                return COLLECTIONS_PAGE_URL(slug);
            case 'brand':
                return BRAND_PAGE_URL(slug);
            default:
                return "";
        }


    }

    const classes = useMemo(() => ` ${style.container} ${className}`, [className])
    const clickable = handleBannersRoute() !== ""; // Check if there is a link
    return (
        <div className={classes} >
            <div>
                {clickable ?
                <Link href={handleBannersRoute()} prefetch={false}>
                    {src && <Image loader={() => src} unoptimized={true} src={src} alt={alt} fill onClick={() => { handleBannersRoute() }} />}
                </Link>
                : src && <Image loader={() => src} unoptimized={true} src={src} alt={alt} fill onClick={() => { handleBannersRoute() }} />
                }
            </div>
        </div>
    )
}

export default DealsBannerImage;