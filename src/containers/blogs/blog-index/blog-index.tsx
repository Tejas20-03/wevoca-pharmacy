import BreadCrumb from "@/components/Bread-crumb/BreadCrumb";
import PageWithBanner from "@/components/page-banner/page-with-banner";
import React, { useEffect, useState } from "react";
import BlogCardIndex from "@/components/blog/blog-card/blog-card-item";
import styles from "./blog-index.module.scss";
import { Box } from "@mui/material";
import Buttons from "@/components/Button/Buttons";
import { GetBlogListing, GetBlogSearch } from "@/services/blogs/services";
import {
  blogListingData,
  blogListingData_Response,
} from "@/services/blogs/types";
import SectionLoader from "@/components/Section-loader/section-loader";
import BlogSearch from "@/components/blog/Blog-Search/Blog-Search";

import debounce from "lodash/debounce";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/language-context/LanguageContext";
import { GetTranslatedData } from "@/services/footer/services";
import Cookies from "js-cookie";

interface IProps {}

type addressType = "Latest" | "Trending" | "Featured";
const addressTypeArray: Array<addressType> = ["Latest", "Featured", "Trending"];
const BlogIndex: React.FC<IProps> = () => {
  const [blogListingApiData, setBlogListingApiData] = useState<
    blogListingData[] | undefined
  >([]);
  const [selectedAddressType, setSelectedAddressType] =
    useState<addressType>("Latest");
  const [searchedValue, setSearchedValue] = useState<
    blogListingData[] | undefined
  >([]);
  const [searchText, setSearchText] = useState<string>("");
  const [SearchValue, setSearchValue] = useState<boolean>(false);

  const blogListingApi = async () => {
    const blogListing: blogListingData_Response | undefined =
      await GetBlogListing({ token: "" });
    setBlogListingApiData(blogListing?.Data);
  };

  useEffect(() => {
    blogListingApi();
  }, []);

  const TrendingBlogs =
    blogListingApiData?.length > 0 ? (
      blogListingApiData?.map(
        (data, index) =>
          data.IsTrending === "True" && (
            <BlogCardIndex data={data} key={index} />
          )
      )
    ) : (
      <SectionLoader />
    );
  const FeaturedBlog =
    blogListingApiData?.length > 0 ? (
      blogListingApiData?.map(
        (data, index) =>
          data.IsFeatured === "True" && (
            <BlogCardIndex data={data} key={index} />
          )
      )
    ) : (
      <SectionLoader />
    );
  const LatestBlogs =
    blogListingApiData?.length > 0 ? (
      blogListingApiData
        ?.slice()
        .sort(
          (a, b) =>
            new Date(b.Created).getTime() - new Date(a.Created).getTime()
        )
        .map((data, index) => <BlogCardIndex data={data} key={index} />)
    ) : (
      <SectionLoader />
    );

  const handleSearch = async (searchText: string, blogType: addressType) => {
    const response = await GetBlogSearch(searchText, { token: "" });
    const searchedValue = response?.Data;
    setSearchedValue(
      searchedValue?.filter((data) => {
        if (blogType === "Featured") {
          return data.IsFeatured === "True";
        } else if (blogType === "Trending") {
          return data.IsTrending === "True";
        } else {
          return true;
        }
      })
    );
    setSearchValue(true);
  };

  const debouncedSearch = debounce(handleSearch, 200);

  const handelChangeEvent = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchedText = e.target.value.toLowerCase();
    setSearchText(searchedText);
    debouncedSearch(searchedText, selectedAddressType);
  };

  const handleChangeItem = (item: "Featured" | "Trending" | "Latest") => {
    if (item !== selectedAddressType) {
      setSelectedAddressType(item);
      handleSearch(searchText, item);
    }
  };

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
    <PageWithBanner removeSideSpacing={styles.pageSpacing}>
      <BreadCrumb FourthLink={getText("Blogs")} classes="deal-breadcrumb" />
      <Box className={styles.btnGroup}>
        {addressTypeArray.map((item: addressType, index: number) => (
          <Buttons
            key={index}
            btnClass={`primary btn-half-rounded ${
              item === selectedAddressType
                ? `${styles.selectedAddressTypeItem} active`
                : ""
            }`}
            btnClickFunction={() => handleChangeItem(item)}
          >
            {" "}
            {item}
          </Buttons>
        ))}
        <BlogSearch
          setSearchText={setSearchText}
          searchText={searchText}
          handelChangeEvent={handelChangeEvent}
          setSearchedValue={setSearchedValue}
        />
      </Box>
      <ul className={styles.blogsGrid}>
        {searchText.length > 0 && searchedValue !== undefined ? (
          searchedValue.map((data, index) => (
            <>
              {selectedAddressType === "Featured" &&
              data.IsFeatured === "True" ? (
                <BlogCardIndex data={data} key={`${index}_${data}`} />
              ) : selectedAddressType === "Trending" &&
                data.IsTrending === "True" ? (
                <BlogCardIndex data={data} key={`${index}_${data}`} />
              ) : (
                selectedAddressType === "Latest" && (
                  <BlogCardIndex data={data} key={`${index}_${data}`} />
                )
              )}
            </>
          ))
        ) : selectedAddressType === "Featured" ? (
          FeaturedBlog
        ) : selectedAddressType === "Trending" ? (
          TrendingBlogs
        ) : selectedAddressType === "Latest" ? (
          LatestBlogs
        ) : (
          <SectionLoader />
        )}
      </ul>
      {SearchValue === true &&
        searchText.length > 0 &&
        searchedValue?.length === 0 && <p>No blogs found.</p>}
    </PageWithBanner>
  );
};

export default BlogIndex;
