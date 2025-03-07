import { GetCategoryMenu_ResponseType, GetCategoryMenuData } from "@/services/categories/types";

export const filterEmptySubmenus = (
  menu: GetCategoryMenu_ResponseType[] | undefined
): GetCategoryMenu_ResponseType[] | undefined => {
  if (menu) {
    for (let i = 0; i < menu.length; i++) {
      const item: GetCategoryMenu_ResponseType = menu[i]; // Specify the type of item
      if (item.SubMenu) {
        item.SubMenu = filterEmptySubmenus(item.SubMenu) as GetCategoryMenuData[]; // Cast to the correct type
        if (item.SubMenu && item.SubMenu.length === 0) {
          delete item.SubMenu;
        }
      }
    }
  }
  return menu;
};
