import React from 'react';
import { GetCategoryMenu } from '@/services/categories/services';
import { categoryNames } from '@/data/category-menu-names';
import { GetCategoryMenu_ResponseType } from '@/services/categories/types';

import dynamic from 'next/dynamic';
const HeaderIndex = dynamic(() => import('@/containers/header/header-index/header-index'), { ssr: true });
const CategoriesIndex = dynamic(() => import('@/containers/categories-menu/categories-index/categories-index'), { ssr: true });

interface IProps { categoryMenuResponses: GetCategoryMenu_ResponseType[] }

const Categories: React.FC<IProps> = ({ categoryMenuResponses }) => {
    return (
        <>

            {categoryMenuResponses && <CategoriesIndex data={categoryMenuResponses} />}
        </>
    )
}


export async function getServerSideProps() {
    const categoryMenuPromises = categoryNames.map((categoryName) => GetCategoryMenu(categoryName, { token: '' }));
    const categoryMenuResponses = await Promise.all(categoryMenuPromises);
    return { props: { categoryMenuResponses } };
}

export default Categories;
