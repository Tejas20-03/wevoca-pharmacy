import DownArrow from '@/components/Global-Icon/down-arrow';
import RightArrow from '@/components/Global-Icon/Right-arrow';
import { GetCategoryMenuData } from '@/services/categories/types';
import Link from 'next/link';
import React from 'react';
import style from './category-menu.module.scss'

interface IProps {
    item: GetCategoryMenuData;
}

const renderSubMenu = (subMenu: GetCategoryMenuData[], hasSubSubMenu = false, item: string) => {
    return (
        <ul className={`submenu ${hasSubSubMenu ? `has-sub-submenu` : ''} ${item}`}>
            {subMenu.map((item, index) => (
                <li key={`${item}_${index}`}>
                    <Link href={`/cat/${item.Slug}`}>
                        {item.Name} {item.SubMenu?.length > 0 && <RightArrow />}
                    </Link>
                    {item.SubMenu?.length > 0 && renderSubMenu(item.SubMenu, item.SubMenu.some(subItem => subItem.SubMenu?.length > 0))}
                </li>
            ))}
        </ul>
    );
};

const CategoryMenu: React.FC<IProps> = ({ item }) => {
    return (
        <>
            <li>
                <Link href={`/cat/${item.Slug}`}>
                    {item.Name} {item.SubMenu?.length > 0 && <DownArrow />}
                </Link>
                {item.SubMenu?.length > 0 && renderSubMenu(item.SubMenu, item.SubMenu.some(subItem => subItem.SubMenu?.length > 0), item.Slug)}
            </li>
        </>
    );
};


export default CategoryMenu;