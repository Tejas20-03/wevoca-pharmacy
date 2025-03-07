import React from "react";
import styles from "./categories-data.module.scss";
import { GetCategoryMenu_ResponseType } from "@/services/categories/types";
import { Box } from "@mui/material";
import CategoriesMenuItem from "@/containers/categories-menu/categories-menu/categories-menu-iitem";

interface IProps {
  categoriesMenu: GetCategoryMenu_ResponseType[];
}

const CategoriesData: React.FC<IProps> = ({ categoriesMenu }) => {
  return (
    <Box className={styles.categoryItems}>
      <ul className={styles.categoryMainList}>
        {categoriesMenu?.length > 0 ? (
          categoriesMenu.map((menuItems, index) => (
            <React.Fragment key={`menu-${index}`}>
              {Array.isArray(menuItems) &&
                menuItems.length > 0 &&
                menuItems.map((item, idx) => (
                  <CategoriesMenuItem key={`item-${idx}`} item={item} />
                ))}
            </React.Fragment>
          ))
        ) : (
          <li className={styles.emptyState}>No categories available</li>
        )}
      </ul>
    </Box>
  );
};

export default CategoriesData;
