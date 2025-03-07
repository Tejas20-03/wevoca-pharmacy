import { blogListingData } from '@/services/blogs/types';
import { Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import style from './blog-card-index.module.scss';
import Link from 'next/link';
import Image from 'next/image';

interface IProps {
    data: blogListingData,
    className?: string;
}

const BlogCardIndex: React.FC<IProps> = ({ data, className }) => {
    const { Slug, Title, ImageURL1, formattedDate } = data

    const [imageLoaderState, setImageLoading] = useState<boolean>(false); 
    const classes = useMemo(() => `${style.blogCardWrapper} ${className && className}`, [className]);
    return (
        <li className={classes}>
            <div className={style.cardImg} style={{position: 'relative', width: '100%', height: '100%'}}>
                <Link href={`/blogs/${Slug}`} className={`item`} style={{position: 'relative', width: '100%', height: '100%'}}>
                    <Image
                        className={ImageURL1 ? style.blogImg : style.placeholderImg}
                        // src={imageLoaderState ? (ImageURL1 ? ImageURL1 : '/assets/dvago-logo.svg') : '/assets/dvago-logo.svg'}
                        src={imageLoaderState ? (ImageURL1 ? ImageURL1 : '/assets/favicon.png') : '/assets/favicon.png'}
                        alt="blog card image"
                        fill
                        onLoad={() => setImageLoading(true)} 
                        sizes="(min-width: 1000px) 144px, (min-width: 780px) 128px, (min-width: 500px) 112px, 80px"
                    />
                </Link>
            </div>
            <div className={style.cardContent}>
                <Typography className={style.title} variant="h6" component='h2'><Link href={`/blogs/${Slug}`} className={style.titleBtn}>{Title?.toLowerCase()}</Link></Typography>
                <Typography className={style.address} paragraph={true}>{formattedDate}</Typography>
            </div>
        </li>
    );
};

export default BlogCardIndex;
