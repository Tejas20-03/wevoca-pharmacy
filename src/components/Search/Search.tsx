import { Box } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@/components/Global-Icon/Search-Icon";
import { Search, SearchIconWrapper, StyledInputBase } from "./Search-mui-style";
import Style from "./search.module.scss";
import Router from "next/router";
import { SEARCH_PAGE_URL } from "@/Constants/constants";
import { useAppSelector } from "@/hooks/use-app-selector";
import { getSearchText } from "@/services/search/services";
import { SearchText_ResponseDataType } from "@/services/search/types";
import Link from "next/link";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { searchActions } from "@/redux/search/slice";
import debounce from "lodash/debounce";
// import MicIcon from '@/components/Global-Icon/mic-icon';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import SpeechScreen from '../speech/speech-screen';
import mixpanel from "mixpanel-browser";
import * as gtag from "@/utils/googleEvents";
import { useLanguage } from "@/language-context/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { GetTranslatedData } from "@/services/footer/services";
import Cookies from "js-cookie";

interface IProps {
  SearchClass?: string;
  searchFunc?: () => void;
}

const SearchComp: React.FC<IProps> = ({ SearchClass, searchFunc }) => {
  const storeData = useAppSelector((state) => state.store);
  const [searchText, setSearchText] = useState<string>("");
  const [searchedValue, setSearchedValue] = useState(
    [] as SearchText_ResponseDataType[] | undefined
  );

  const dispatch = useAppDispatch();
  const debouncedHandleChangeEvent = debounce(handelChangeEvent, 500);

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

  const handleSearch = () => {
    if (searchText !== "") {
      dispatch(searchActions.setSearch({ value: searchText }));
      Router.push(SEARCH_PAGE_URL(searchText));
      setTimeout(() => {
        setSearchedValue([]);
        setSearchText("");
      }, 1000);
    }
  };
  const handleKeyDown = (event: { key: string }) => {
    if (searchText !== "") {
      if (event.key === "Enter") {
        dispatch(searchActions.setSearch({ value: searchText }));
        Router.push(SEARCH_PAGE_URL(encodeURIComponent(searchText)));
        // mixpanel.track('product_searched', { keyword: searchText, event_source: 'Web', store_id: storeData?.selectedStoreID?.toString() || '32' });
        if (typeof window !== "undefined") {
          // window?.webengage?.track('product_searched', { keyword: searchText, event_source: 'Web', store_id: storeData?.selectedStoreID?.toString() || '32' });
        }
        gtag.event({
          action: "search",
          params: {
            search_term: searchText,
          },
        });
        setTimeout(() => {
          setSearchedValue([]);
          setSearchText("");
        }, 1000);
      }
    }
  };
  const response = async (search: string) => {
    const apiResponse = await getSearchText(
      search,
      storeData.selectedStoreID?.toString() || "",
      { token: "" }
    );
    return apiResponse;
  };

  function handelChangeEvent(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value !== "") {
      response(e.target.value).then((searchedValueResponse) => {
        setSearchedValue(searchedValueResponse?.Data);
      });
    } else {
      setSearchedValue([]);
    }
  }

  const handleChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    debouncedHandleChangeEvent(e);
  };

  const handleProductClick = (value: string) => {
    if (searchedValue && searchedValue?.length > 0) {
      // mixpanel.track('product_searched', { keyword: value?.Title, event_source: 'Web', store_id: storeData?.selectedStoreID?.toString() || '32' });

      if (typeof window !== "undefined") {
        // window?.webengage?.track('product_searched', { keyword: value?.Title, event_source: 'Web', store_id: storeData?.selectedStoreID?.toString() || '32' });
      }
      gtag.event({
        action: "search",
        params: {
          search_term: value?.Title,
        },
      });
      setTimeout(() => {
        setSearchedValue([]);
        setSearchText("");
      }, 1000);
    }
  };
  // const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  // const openMic = () => {
  //   if (browserSupportsSpeechRecognition) {
  //     SpeechRecognition.startListening();
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     console.log("Browser doesn't support speech recognition.");
  //   }
  // };

  // useEffect(() => {
  //   if (!listening) closeVoiceSearch();
  //   else return;
  // }, [listening]);

  // const closeVoiceSearch = () => {
  //   document.body.style.overflow = 'auto';
  //   if (transcript) {
  //     SpeechRecognition.stopListening();
  //     dispatch(searchActions.setSearch({ value: transcript }));
  //     Router.push(SEARCH_PAGE_URL(encodeURIComponent(transcript)));
  //     resetTranscript();
  //   }else {
  //     SpeechRecognition.stopListening();
  //     resetTranscript();
  //   }
  // };

  return (
    <Box className={`${Style.search} ${SearchClass?.length && SearchClass}`}>
      <Search onChange={searchFunc}>
        <SearchIconWrapper
          className={`${Style.searchIconWrapper} search-btn`}
          onClick={handleSearch}
        >
          <SearchIcon color="--primary-color" />
        </SearchIconWrapper>

        <StyledInputBase
          placeholder={getText("Search-For")}
          inputProps={{ "aria-label": "search" }}
          onChange={handleChangeEvent}
          onKeyDown={handleKeyDown}
          value={searchText}
          className="search-input"
          style={{
            color: "var(--primary-color)",
            fontWeight: "500",
            fontSize: "14px",
          }}
        />
      </Search>
      <div
        className={`${Style.searchResultBox} ${
          searchedValue?.length === 0 ? Style.searchBoxClosed : ""
        }`}
      >
        <ul>
          {searchedValue !== undefined &&
            searchedValue?.length > 0 &&
            searchedValue?.map((value, index) => (
              <li key={index}>
                <Link
                  prefetch={false}
                  onClick={() => handleProductClick(value)}
                  href={{
                    pathname:
                      value.Slug !== ""
                        ? `/p/${value.Slug.replace(/%/g, "")}`
                        : "",
                    query: value.Slug === "" ? { search: value.Title } : null,
                  }}
                >
                  {value.Title}
                </Link>
              </li>
            ))}
        </ul>
        <div className={Style.viewAll}>
          <button onClick={handleSearch}>View All Results</button>
        </div>
      </div>
      {/* {listening ? <SpeechScreen transcript={transcript} resetTranscript={closeVoiceSearch} handleChangeEvent={handleChangeEvent} handleKeyDown={handleKeyDown} searchText={searchText} /> : ''} */}
    </Box>
  );
};

export default SearchComp;
