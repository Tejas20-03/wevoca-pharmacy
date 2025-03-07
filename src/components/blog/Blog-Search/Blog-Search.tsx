
import React from 'react';
import styles from './Blog-Search.module.scss';
import { Box } from '@mui/material';
import { Search, SearchIconWrapper, StyledInputBase } from '@/components/Search/Search-mui-style';
import SearchIcon from '@/components/Global-Icon/Search-Icon';
import { useLanguage } from '@/language-context/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { GetTranslatedData } from '@/services/footer/services';
import Cookies from 'js-cookie';

interface IProps {
    searchText: string,
    handelChangeEvent: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const BlogSearch: React.FC<IProps> = ({ searchText, handelChangeEvent}) => {
    const { language } = useLanguage();

    const { data: translatedData } = useQuery(
      ["complain-form"],
      async () => {
        return await GetTranslatedData({ token: "" });
      },
      {
        retry: (failureCount, error) => {
          const token = Cookies.get("auth-token");
          return !token;
        },
        retryDelay: 0,
        staleTime: 600000,
      }
    );
  
    const getText = (value: string) => {
      const translatedItems = translatedData?.Data || [];
      const item = translatedItems.find((item: any) => item.Value === value);
      return language === "ar" ? item?.Arabic : item?.English;
    };
    return (
        <Box className={`${styles.search}`}>
            <Search>
                <SearchIconWrapper className={`${styles.searchIconWrapper} search-btn`}>
                    <SearchIcon color='--primary-color' />
                </SearchIconWrapper>

                <StyledInputBase
                    placeholder={getText("Search-Here")}
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={handelChangeEvent}
                    value={searchText}
                    className='search-input'
                />
            </Search>
        </Box>
    );
};

export default BlogSearch;
