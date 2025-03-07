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



const BannerImage: React.FC<Props> = ({ className, src, alt, type, slug }) => {
    const handleBannersRoute = () => {
        switch (type) {
            case 'screen':
                return "#";
            case 'product':
                return PRODUCT_PAGE_URL(slug);
            case 'atozmedicine':
                return BRAND_PAGE_URL(slug);
            case 'collection':
                return COLLECTIONS_PAGE_URL(slug);
            case 'category':
                return COLLECTION_PAGE_URL(slug);
            case 'brand':
                return BRAND_PAGE_URL(slug);
            default:
                return "#";
        }
    }

    const classes = useMemo(() => ` ${style.container} ${className}`, [className])
    return (
        <div className={classes} >
            <div >
                <Link href={handleBannersRoute()} prefetch={false}>

                    {src &&
                        <Image
                            src={src}
                            alt={alt}

                            sizes="(max-width: 320px) 280px, (max-width: 640px) 600px, 100vw"
                            width={0}
                            height={0}
                            style={{ width: '100%', height: 'auto' }} // optional
                            onClick={() => { handleBannersRoute() }}
                        />}
                </Link>
            </div>
        </div>
    )
}

export default BannerImage;