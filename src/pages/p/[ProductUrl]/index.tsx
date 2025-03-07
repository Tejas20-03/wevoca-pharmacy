import wrapper from "@/redux/store";
import { BASE_URL_DVAGO_API } from "@/services/config";
import type { NextPage } from "next";
import axios from "axios";
import * as fbq from "@/utils/fpixel";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  GetProductSuggestion,
  getProductDescriptionByID,
  getProductDetailByID,
} from "@/services/product/services";
import { useRouter } from "next/router";
import { useAppSelector } from "@/hooks/use-app-selector";
import dynamic from "next/dynamic";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/dataFetching/apiResponseQueryKey";
import {
  getProductReviewsFunc,
  headerCategoryMenu,
} from "@/dataFetching/apiResponseFetching";
const ProductDetail = dynamic(
  () => import("@/components/Product/Product-Details/productDetail"),
  { ssr: true }
);
import AddressInput from "@/components/Address/Address-bar-container";
import mixpanel from "mixpanel-browser";
import * as gtag from "@/utils/googleEvents";
import Head from "next/head";

interface IProps {}

const Product: NextPage<IProps> = ({
  productDetailJson,
  productDescriptionJson,
  getProductBannersSuggestion,
}) => {
  const [productDetailJsonClient, setProductDetailJsonClient] = useState(null);
  const [productDetailJsonDescription, setProductDetailJsonDescription] =
    useState(null);
  const [productSuggesionResponse, setProductSuggesionResponse] =
    useState(null);
  const storeData = useAppSelector((state) => state.store);
  const router = useRouter();
  const slug = router.query.ProductUrl;
  const slugWithoutSpaces = slug ? slug.toString().replace(/\s/g, "") : "";
  const { selectedStoreCode } = useAppSelector((state) => state.store);
  if (productDetailJson && productDetailJson.Data?.length > 0) {
    const productDetails = productDetailJson.Data[0];
    fbq.event("ViewContent", {
      content_ids: productDetails?.UPC
        ? productDetails?.UPC
        : productDetails?.ShopifyProductID,
      content_category: productDetails?.Category,
      content_name: productDetails?.Title,
      currency: "PKR",
    });
  }
  const productDetailValues = productDetailJson?.Data?.[0];
  console.log("PRODUCT DETAIL JSON", productDetailJson);
  console.log("Data from json", productDetailJson?.Data?.[0]);

  useEffect(() => {
    if (productDetailValues != null) {
      // mixpanel.track('product_viewed', {
      //   product_name: productDetailValues?.Title || '',
      //   category_lv1: productDetailValues?.Category || '',
      //   category_lv2: productDetailValues?.ParentCategory || '',
      //   category_lv3: '',
      //   product_id: productDetailValues?.UPC ? productDetailValues?.UPC :productDetailValues?.ShopifyProductID,
      //   price: productDetailValues?.DiscountPrice !== '0' ? Number(productDetailValues?.DiscountPrice) : Number(productDetailValues?.SalePrice) || 0,
      //   quantity: productDetailValues?.Variations === 'Strip' ? productDetailValues?.TotalTablets : productDetailValues?.Variations === 'Box' ? productDetailValues?.TotalTablets : '1',
      //   manufacturer: productDetailValues?.Brand || '',
      //   generics: productDetailValues?.Generics || '',
      //   unit: productDetailValues?.Variations || '',
      //   type: productDetailValues?.Variations || '',
      //   used_for: productDetailValues?.Usedfor || '',
      //   store_id: storeData?.selectedStoreID?.toString() || '32',
      //   event_source: 'Web',
      // });
      if (typeof window !== "undefined") {
        // window?.webengage?.track('product_viewed', {
        //   product_name: productDetailValues?.Title || '',
        //   category_lv1: productDetailValues?.Category || '',
        //   category_lv2: productDetailValues?.ParentCategory || '',
        //   category_lv3: '',
        //   product_id: productDetailValues?.UPC ? productDetailValues?.UPC :productDetailValues?.ShopifyProductID,
        //   price: productDetailValues?.DiscountPrice !== '0' ? Number(productDetailValues?.DiscountPrice) : Number(productDetailValues?.SalePrice) || 0,
        //   quantity: productDetailValues?.Variations === 'Strip' ? productDetailValues?.TotalTablets : productDetailValues?.Variations === 'Box' ? productDetailValues?.TotalTablets : '1',
        //   manufacturer: productDetailValues?.Brand || '',
        //   generics: productDetailValues?.Generics || '',
        //   unit: productDetailValues?.Variations || '',
        //   type: productDetailValues?.Variations || '',
        //   used_for: productDetailValues?.Usedfor || '',
        //   store_id: storeData?.selectedStoreID?.toString() || '32',
        //   event_source: 'Web',
        // });
      }
      gtag.event({
        action: "view_item",
        params: {
          currency: "PKR",
          value:
            Number(productDetailValues?.DiscountPrice) !== 0
              ? Number(productDetailValues?.DiscountPrice)
              : Number(productDetailValues?.SalePrice) || 0,
          items: [productDetailValues].map((item) => ({
            item_id: item?.UPC?.toString()
              ? item?.UPC?.toString()
              : item?.ShopifyProductID?.toString(),
            item_name: item?.Title,
            item_brand: item?.Brand || "",
            item_category: item?.Category || "",
            item_category2:
              productDescriptionJson?.Data?.[0]?.SPECIFICATION?.Generics || "",
            item_category5: item?.Variations || "",
          })),
        },
      });
    }
  }, []);

  const ApiResponses = async () => {
    const productDetail = await getProductDetailByID(
      slugWithoutSpaces,
      `${selectedStoreCode || "32"}`,
      {}
    );
    setProductDetailJsonClient(productDetail);
    const productDescription = await getProductDescriptionByID(
      slugWithoutSpaces,
      {}
    );
    setProductDetailJsonDescription(productDescription);
    const productSuggestions = await GetProductSuggestion(
      productDetail?.Data?.[0]?.Usedfor,
      productDetail?.Data?.[0]?.UPC,
      `${selectedStoreCode || "32"}`,
      {}
    );
    setProductSuggesionResponse(productSuggestions);
  };

  useEffect(() => {
    ApiResponses();
  }, [
    router.asPath,
    productDetailJson,
    storeData.selectedStoreCode,
    slugWithoutSpaces,
  ]);
  const schemaMarkup = JSON.stringify({
    "@context": "http://schema.org",
    "@type": "Product",
    name: productDetailValues?.Title,
    image: productDetailValues?.ProductImage,
    description: productDetailValues?.Description,
    url: `https://www.WeVoca.pk/p/${productDetailValues?.Slug}`,
    brand: {
      "@type": "Brand",
      name: productDetailValues?.Brand,
    },
    offers: {
      "@type": "Offer",
      price:
        productDetailValues?.DiscountPrice !== "0"
          ? productDetailValues?.DiscountPrice
          : productDetailValues?.SalePrice,
    },
  });
  return (
    <>
      <AddressInput mobile={true} />
      <Head>
        <script
          type="application/ld+json"
          id="product-markup-schema"
          dangerouslySetInnerHTML={{ __html: schemaMarkup }}
        />
      </Head>
      {productDetailJson !== undefined &&
      getProductBannersSuggestion !== undefined &&
      getProductBannersSuggestion?.Data?.length > 0 ? (
        <ProductDetail
          addToCartOutOfStock={productDetailJsonClient}
          productDetailJson={productDetailJson}
          productDescriptionJson={productDescriptionJson}
          productSuggestion={getProductBannersSuggestion}
        />
      ) : (
        <ProductDetail
          addToCartOutOfStock={productDetailJsonClient}
          productDetailJson={productDetailJsonClient}
          productDescriptionJson={productDetailJsonDescription}
          productSuggestion={productSuggesionResponse}
        />
      )}
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, params }) => {
      const slug = params?.ProductUrl !== undefined && params?.ProductUrl;
      const slugWithoutSpaces = slug ? slug.toString().replace(/\s/g, "") : "";
      const { selectedStoreCode } = store.getState().store;
      const branchCode = req.cookies.branchCode;
      const headersInfo = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const [productDetailResponse, productDescriptionResponse] =
        await Promise.all([
          axios.get(
            `${BASE_URL_DVAGO_API}/AppAPIV3/GetProductDetailBySlugV2&ProductSlug=${slugWithoutSpaces}&BranchCode=${
              branchCode || selectedStoreCode
            }`,
            headersInfo
          ),
          axios.get(
            `${BASE_URL_DVAGO_API}/AppAPIV3/GetProductDescriptionBySlugV1&ProductSlug=${slugWithoutSpaces}`,
            headersInfo
          ),
        ]);
      const productDetailJson = productDetailResponse.data;
      console.log("Product Detail JSON", productDetailJson);
      const productDescriptionJson = productDescriptionResponse.data;
      const [getProductBannersSuggestion2] = await Promise.all([
        axios.get(
          `${BASE_URL_DVAGO_API}/AppAPIV3/GetSuggestiveProductsV2&Usedfor=${
            productDetailJson?.Data?.Usedfor
          }&UPC=${productDetailJson?.Data?.UPC}&BranchCode=${
            branchCode || selectedStoreCode || "32"
          }`,
          headersInfo
        ),
      ]);
      const getProductBannersSuggestion = getProductBannersSuggestion2.data;
      const queryClient = new QueryClient();
      await Promise.all([
        queryClient.prefetchQuery(
          [QUERY_KEYS.HEADER_CATEGORY],
          headerCategoryMenu,
          { staleTime: Infinity }
        ),
        queryClient.prefetchQuery(
          [QUERY_KEYS.PRODUCT_REVIEWS],
          () => getProductReviewsFunc(productDetailJson?.Data?.[0]?.ProductID),
          { staleTime: Infinity }
        ),
      ]);
      return {
        props: {
          productDetailJson,
          productDescriptionJson,
          getProductBannersSuggestion,
          dehydratedState: dehydrate(queryClient),
        },
      };
    }
);

export default Product;
