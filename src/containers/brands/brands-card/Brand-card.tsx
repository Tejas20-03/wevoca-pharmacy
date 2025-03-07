import React from 'react';
import styles from './Brand-card.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { BrandListingData } from '@/services/brands/types';

interface IProps {
    value: BrandListingData
}

const BrandCard: React.FC<IProps> = ({ value }) => {
    return (
        <li className={styles.brandCard}>
            <Link href={`/brands/${value.Slug}`}>
                <Image loader={() => value.BrandLogo} unoptimized={true} src={value.BrandLogo} alt="Brand Logo" fill />
            </Link>
        </li>
    );
};

export default BrandCard;
