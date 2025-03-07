import { NextPage } from "next";
import SectionLoader from "@/components/Section-loader/section-loader";
import { BASE_URL_DVAGO_API } from "@/services/config";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import wrapper from "@/redux/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { productsPerPage } from "@/Constants/constants";
import dynamic from "next/dynamic";
import { QUERY_KEYS } from "@/dataFetching/apiResponseQueryKey";
import {
  checkTypeBySlug,
  headerCategoryMenu,
} from "@/dataFetching/apiResponseFetching";
const CollectionIndex = dynamic(
  () => import("@/containers/Collection/collection-index"),
  { ssr: true }
);

interface IProps {}

const Brand: NextPage<IProps> = ({ item, slug }) => {
  const router = useRouter();
  useEffect(() => {
    const { brands } = router.query;
    if (brands) {
      setTimeout(() => {
        if (item === undefined) {
          router.reload();
        }
      }, 500);
    }
  }, [router.asPath, item]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    if (value === 1) {
      router.push({
        pathname: router.pathname,
        query: { brands: router.query?.brands },
      });
    } else {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, page: value },
      });
    }
  };

  return (
    <>
      <div style={{ marginBottom: "5.5rem" }}>
        {slug ? (
          <CollectionIndex
            item={item}
            fetchingType={"brand"}
            slug={slug}
            handleChange={handleChange}
          />
        ) : (
          <SectionLoader />
        )}
      </div>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, params, query }) => {
      const slug = params !== undefined && params.brands;
      const encodedSlug = slug?.includes("&") ? encodeURIComponent(slug) : slug;
      const slugPageNumber = query !== undefined && query.page;
      const slugWithoutSpaces = slug ? slug.toString().replace(/\s/g, "") : "";
      if (Number(slugPageNumber) === 1) {
        const redirectTo = req?.url.replace(/\?page=1$/, "");
        res.setHeader("Location", redirectTo);
        res.statusCode = 302;
        res.end();
        return { props: {} };
      }
      const queryClient = new QueryClient();
      const { selectedStoreCode } = store.getState().store;
      const branchCode = req.cookies.branchCode;
      const headersInfo = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const getData = async () =>
        await (
          await fetch(
            `${BASE_URL_DVAGO_API}/AppAPIV3/GetProductByBrandSlugV1&BrandSlug=${encodedSlug}&limit=${
              slugPageNumber === undefined
                ? 0
                : Number(slugPageNumber) === 1
                ? 0
                : (Number(slugPageNumber) - 1) * productsPerPage
            },16&BranchCode=${branchCode || selectedStoreCode}`,
            headersInfo
          )
        ).json();
      const item = await queryClient.fetchQuery({
        queryKey: [`${slug}`],
        queryFn: getData,
      });
      // Make the API request
      const catRedirectData = await checkTypeBySlug(slugWithoutSpaces);
      if (catRedirectData.ResponseType === 1) {
        if (slugWithoutSpaces !== catRedirectData?.Data?.Slug) {
          if (catRedirectData?.Data.Type === "Brand") {
            res.setHeader("Location", `${catRedirectData?.Data?.Slug}`);
            res.statusCode = 302;
            res.end();
            return null; // Return null to indicate a redirect
          }
        }
      }

      await Promise.all([
        queryClient.prefetchQuery(
          [QUERY_KEYS.HEADER_CATEGORY],
          headerCategoryMenu
        ),
      ]);
      return { props: { item, slug, dehydratedState: dehydrate(queryClient) } };
    }
);

export default Brand;
