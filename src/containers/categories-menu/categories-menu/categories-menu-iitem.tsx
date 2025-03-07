import { Accordion, AccordionSummary, AccordionDetails, Typography, Button } from '@mui/material';
import { GetCategoryMenuData } from '@/services/categories/types';
import Link from 'next/link';
import React, { useState } from 'react';
import DownArrow from '@/components/Global-Icon/down-arrow';

interface IProps {
    item: GetCategoryMenuData;
}

const renderSubMenu = (subMenu: GetCategoryMenuData[]) => {
    return (
        <ul className="submenu">
            {subMenu.map((item, index) => (
                <li key={`${item}_${index}`}>
                    <AccordionItem item={item} />
                </li>
            ))}
        </ul>
    );
};

const AccordionItem: React.FC<IProps> = ({ item }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleAccordion = () => {
        setExpanded(!expanded);
    };
    const unableToToggleAccordion = () => {
        setExpanded(false);
    };

    const hasSubMenu = item.SubMenu && item.SubMenu.length > 0;
    const accordionClass = hasSubMenu ? 'cateogries-menu' : 'cateogries-menu no-submenu';

    return (
        <Accordion className={accordionClass} expanded={expanded} onChange={hasSubMenu ? toggleAccordion : unableToToggleAccordion}>
            <AccordionSummary className="cateogries-itemLink">
                <Typography>
                    <Link href={`/cat/${item.Slug}`}>{item.Name}</Link>
                </Typography>
                <Button onClick={toggleAccordion}>
                    {hasSubMenu && (
                        <DownArrow color={'--primary-color-darker'} />
                    )}
                </Button>
            </AccordionSummary>
            <AccordionDetails>
                {hasSubMenu && renderSubMenu(item.SubMenu)}
            </AccordionDetails>
        </Accordion>
    );
};

const CategoriesMenuItem: React.FC<IProps> = ({ item }) => {
    return (
        <>
            <AccordionItem item={item} />
        </>
    );
};

export default CategoriesMenuItem;