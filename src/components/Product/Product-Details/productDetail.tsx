import BreadCrumb from "@/components/Bread-crumb/BreadCrumb";
import ProductImage from "@/components/Product/Product-image-container/Product-image-container";
import { Box, Container, Rating, Stack, Typography } from "@mui/material";
import ProductExpectedDeliveryFullWidthBanner from "@/components/Product/product-expected-delivery-full-width-banner/product-expected-delivery-full-width-banner";
import style from "./productDetail.module.scss";
import Buttons from "@/components/Button/Buttons";
import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "@/hooks/use-app-selector";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { ProductDataType } from "@/services/product/types";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { addProductsInCart } from "@/redux/cart/actions";
import { postAddArrangeMedicineInquiry } from "@/services/arrange-medicine/services";
import { openAddressPopup } from "@/redux/address-popup/slice";
import { Slide, toast } from "react-toastify";
import Head from "next/head";
import * as fbq from "@/utils/fpixel";
import * as gtag from "@/utils/googleEvents";
import {
  GetCustomerTokenInCookiesStorage,
  GetCustomerTokenInLocalStorage,
} from "@/functions/local-storage-methods";
import Link from "next/link";
import {
  openLoginPopup,
  openLoginPopupOnAddToCart,
} from "@/redux/Login-popup/slice";
import { Formik } from "formik";
import RadioBtn from "@/components/radio-btn/radio-btn";
import { numberWithCommas } from "@/functions/numberWithCommas";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/dataFetching/apiResponseQueryKey";
import { getProductReviewsFunc } from "@/dataFetching/apiResponseFetching";
import ProductReviews from "./product-reviews/ProductReviews";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { addToCartMixPanelFunction } from "@/utils/mix-panel-hooks";
import { addInquiryObjType } from "@/services/prescription/types";
import { useLanguage } from "@/language-context/LanguageContext";
import { GetTranslatedData } from "@/services/footer/services";
const PageWithBanner = dynamic(
  () => import("@/components/page-banner/page-with-banner"),
  { ssr: true }
);
const ProductDescription = dynamic(
  () => import("./productDescription/productDescription"),
  { ssr: true }
);
const ProductSuggestions = dynamic(
  () => import("./productSuggestion/product-suggestion"),
  { ssr: true }
);
const BoxTitle = dynamic(() => import("@/components/BoxTitle/Box-title"), {
  ssr: true,
});
const CartQuantity = dynamic(() => import("@/components/cart/cartQuantity"), {
  ssr: true,
});

interface Props {}

interface initialValuesProps {
  feedbackRadio: string;
}

const customId = "custom-id-yes";
const ProductDetail: React.FC<Props> = ({
  productDetailJson,
  productDescriptionJson,
  productSuggestion,
}) => {
  const dispatch = useAppDispatch();
  const storeData = useAppSelector((state) => state.store);
  const addressesData = useAppSelector((state) => state.addresses);
  const cart = useAppSelector((state) => state.cart);
  const router = useRouter();
  const productDetailData = useMemo<ProductDataType>(
    () =>
      productDetailJson?.Data && productDetailJson?.Data.length > 0
        ? productDetailJson?.Data[0]
        : [],
    [productDetailJson?.Data, storeData]
  );
  const productDetailDescription = useMemo(
    () =>
      productDescriptionJson?.Data && productDescriptionJson?.Data.length > 0
        ? productDescriptionJson?.Data
        : [],
    [productDescriptionJson?.Data]
  );
  const productDetailValues = productDetailJson?.Data?.[0];
  const productDescriptionValues = productDescriptionJson?.Data?.[0];
  const cateogryOption: { key: string; value: string; isDefault?: boolean }[] =
    [
      {
        key: `Per ${
          productDetailData?.Variation?.length !== 0
            ? "Box"
            : `${productDetailData?.Variations}`
        } ${
          productDetailData?.Variation === undefined ||
          productDetailData?.Variation?.length === 0
            ? ``
            : `( ${
                productDetailData?.Variation !== undefined &&
                productDetailData?.Variation?.length === 0
                  ? productDetailData.NoofStrips
                  : productDetailData?.Variation?.[0]?.NoofStrips
              } Strips = ${
                productDetailData?.Variation !== undefined &&
                productDetailData?.Variation?.length === 0
                  ? productDetailData.TotalTablets
                  : productDetailData?.Variation?.[0]?.TotalTablets
              } Tablets )`
        }`,
        value: `Box`,
        isDefault:
          productDetailData?.Variation?.length === 0 &&
          productDetailData?.Variations === "Box"
            ? true
            : productDetailData?.Variation !== undefined &&
              productDetailData?.Variation?.[0]?.AvailableQty >= "0"
            ? true
            : true,
      },
      {
        key: `Per ${
          productDetailData?.Variation?.length !== 0
            ? "Strip"
            : `${productDetailData?.Variations}`
        } ${
          productDetailData?.Variation === undefined ||
          productDetailData?.Variation?.length === 0
            ? ``
            : `( ${
                productDetailData?.Variation !== undefined &&
                productDetailData?.Variation?.length === 0
                  ? productDetailData.TotalStripTablets
                  : productDetailData?.Variation?.[1]?.TotalTablets
              } Tablets )`
        }`,
        value: `Strip`,
        isDefault:
          productDetailData?.Variation?.length === 0 &&
          productDetailData?.Variations === "Strip"
            ? true
            : productDetailData?.Variation !== undefined &&
              productDetailData?.Variation?.[1]?.AvailableQty >= "0"
            ? true
            : false,
      },
    ];
  const item2 = cateogryOption.find((item) => item.isDefault);
  const [selectedOptionVal, setSelectedOptionVal] = useState(
    item2 || cateogryOption[0]
  );
  useEffect(() => {
    if (productDetailData?.Variations === "Box") {
      setSelectedOptionVal(item2 || cateogryOption[0]);
    } else {
      setSelectedOptionVal(item2 || cateogryOption[1]);
    }
  }, [router.asPath, productDetailJson]);

  const handleAddProductInCart = () => {
    const getUserData = Cookies.get("user");
    const isLoggedIn =
      getUserData !== undefined ? JSON.parse(getUserData).isLoggedIn : false;
    if (productDetailData === null || productDetailData === undefined) return;
    if (!isLoggedIn) {
      dispatch(openLoginPopup());
      dispatch(openLoginPopupOnAddToCart(true));
      return;
    }
    if (addressesData.selectedAddressID === null) dispatch(openAddressPopup());
    else if (addressesData.selectedAddressID !== null) {
      if (
        productDetailData.Variation &&
        productDetailData.Variation.length > 0
      ) {
        if (selectedOptionVal?.value === "Strip") {
          dispatch(
            addProductsInCart({
              products: [
                {
                  id: `${productDetailData?.ID.toString()}-Strip`,
                  data: { ...productDetailData },
                  quantityToAdd: 1,
                  perStrip: true,
                },
              ],
            })
          )
            .unwrap()
            .then((response) => {
              if (response.length <= 0) return;
              toast.clearWaitingQueue({ containerId: customId });
              toast(response[0].message, {
                toastId: customId,
                position: "bottom-center",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Slide,
                theme: "dark",
              });
              const totalNum =
                Number(productDetailValues?.DiscountPrice) !== 0
                  ? Number(productDetailValues?.DiscountPrice) + cart?.total
                  : Number(productDetailValues?.SalePrice) + cart?.total || 0;
              addToCartMixPanelFunction(
                response?.[0]?.products?.quantityToAdd,
                selectedOptionVal?.value,
                productDetailValues,
                productDescriptionValues?.SPECIFICATION?.Generics,
                storeData?.selectedStoreID?.toString() || "32",
                totalNum
              );
            });
        } else {
          dispatch(
            addProductsInCart({
              products: [
                {
                  id: `${productDetailData?.ID.toString()}-Box`,
                  data: { ...productDetailData },
                  quantityToAdd: 1,
                  perStrip: false,
                },
              ],
            })
          )
            .unwrap()
            .then((response) => {
              if (response.length <= 0) return;
              toast.clearWaitingQueue({ containerId: customId });
              toast(response[0].message, {
                toastId: customId,
                position: "bottom-center",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Slide,
                theme: "dark",
              });
              const totalNum =
                Number(productDetailValues?.DiscountPrice) !== 0
                  ? Number(productDetailValues?.DiscountPrice) + cart?.total
                  : Number(productDetailValues?.SalePrice) + cart?.total || 0;
              addToCartMixPanelFunction(
                response?.[0]?.products?.quantityToAdd,
                selectedOptionVal?.value,
                productDetailValues,
                productDescriptionValues?.SPECIFICATION?.Generics,
                storeData?.selectedStoreID?.toString() || "32",
                totalNum
              );
            });
        }
      } else {
        dispatch(
          addProductsInCart({
            products: [
              {
                id: productDetailData.ProductID,
                data: productDetailData,
                quantityToAdd: 1,
                perStrip: undefined,
              },
            ],
          })
        )
          .unwrap()
          .then((response) => {
            if (response.length <= 0) return;
            toast.clearWaitingQueue({ containerId: customId });
            toast(response[0].message, {
              toastId: customId,
              position: "bottom-center",
              autoClose: 1500,
              hideProgressBar: true,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              transition: Slide,
              theme: "dark",
            });
            const totalNum =
              Number(productDetailValues?.DiscountPrice) !== 0
                ? Number(productDetailValues?.DiscountPrice) + cart?.total
                : Number(productDetailValues?.SalePrice) + cart?.total || 0;
            console.log(
              "productDetailValues?.DiscountPrice =>",
              productDetailValues?.DiscountPrice
            );
            console.log("cart?.total =>", cart?.total);
            addToCartMixPanelFunction(
              response?.[0]?.products?.quantityToAdd,
              productDetailValues?.Variations,
              productDetailValues,
              productDescriptionValues?.SPECIFICATION?.Generics,
              storeData?.selectedStoreID?.toString() || "32",
              totalNum
            );
          });
      }
    }
  };

  const addInquiryObj: addInquiryObjType = {
    BranchCode: storeData?.selectedStoreCode,
    ProductID: productDetailData?.ID,
    Type: "Arrangement Request",
    PrescriptionURL: "",
  };
  const handleArrangeProductForMe = async () => {
    const customerToken = GetCustomerTokenInLocalStorage();
    const customerTokenCookies: string =
      await GetCustomerTokenInCookiesStorage();
    await postAddArrangeMedicineInquiry(addInquiryObj, {
      token:
        customerToken !== null
          ? customerToken || customerTokenCookies
          : undefined,
    });
    toast("You will be notified Soon!", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      transition: Slide,
      theme: "dark",
    });
  };

  const initialValue: initialValuesProps = {
    feedbackRadio: "",
  };

  const {
    data: productReviews,
    error: productReviewsError,
    isLoading: productReviewsLoader,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCT_REVIEWS],
    queryFn: () =>
      getProductReviewsFunc(productDetailJson?.Data?.[0]?.ProductID),
  });
  // Function to calculate the average rating
  useEffect(() => {
    refetch();
  }, [productDetailData]);
  const calculateAverage = () => {
    const sumOfRatings = productReviews?.Data.reduce(
      (acc, review) => acc + Number(review.Rating),
      0
    );
    const averageRating = Number(sumOfRatings) / productReviews?.Data?.length;
    return averageRating?.toString()?.slice(0, 3);
  };
  const { width: windowWidth } = useWindowDimensions();
  const { language } = useLanguage();

  const scrollToSection = (sectionTitle: string) => {
    const headerHeight = windowWidth > 575 ? 250 : 130;
    const sectionElement = document.getElementById(sectionTitle);
    if (sectionElement) {
      const scrollToY =
        sectionElement.getBoundingClientRect().top +
        window.scrollY -
        headerHeight;
      window.scrollTo({ top: scrollToY, behavior: "smooth" });
    }
  };

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
    <>
      <Head>
        <meta
          name="description"
          content={`${productDetailData?.MetaDescription}`}
        />
        <title>{productDetailData?.MetaTitle}</title>
      </Head>
      <PageWithBanner removeSideSpacing={style.pageSpacing}>
        <>
          {productDetailJson?.Data !== undefined &&
          productDetailJson?.Data?.length > 0 ? (
            <Container className={style.mainContainer}>
              <BreadCrumb
                secondLink={`/cat/${productDetailData?.CategorySlug}`}
                secondTitle={productDetailData?.Category}
                thirdLink={`/cat/${productDetailData?.ParentCategorySlug}`}
                thirdTitle={productDetailData?.ParentCategory}
                FourthLink={
                  language === "en"
                    ? productDetailData?.Title
                    : productDetailData?.TitleArabic
                }
                classes="deal-breadcrumb"
              />
              <div className={`${style.container}`}>
                <div className={`${style.imageContainer}`}>
                  <ProductImage
                    className={style.imgInnerContainer}
                    src={productDetailData?.ProductImage || ""}
                    alt={
                      `${productDetailData.Title?.toLowerCase()} Product Image` ||
                      "Product Image"
                    }
                  />
                </div>
                <div className={`${style.contentContainer}`}>
                  <Typography
                    className={style.productTitle}
                    variant="body1"
                    component="h1"
                  >
                    {language === "en"
                      ? productDetailData?.Title
                      : productDetailData.TitleArabic}
                  </Typography>
                  {productReviews?.Data?.length ? (
                    <Box className={style.productReviewList}>
                      <Stack spacing={1}>
                        <Rating
                          className={style.ratingInReview}
                          name="half-rating-read"
                          value={Number(calculateAverage())}
                          precision={0.5}
                          readOnly
                        />
                      </Stack>
                      <Typography
                        onClick={() => scrollToSection("rating_review")}
                      >
                        {productReviews?.Data?.length} Rating
                      </Typography>
                    </Box>
                  ) : null}
                  <div className={style.brandName}>
                    <Typography
                      className={style.perCase}
                      variant="body1"
                      component="h2"
                    >
                      {getText("Brands")} :{" "}
                      <Link href={`/brands/${productDetailData?.BrandSlug}`}>
                        {productDetailData?.Brand.toLowerCase()}
                      </Link>
                    </Typography>
                  </div>
                  <div className={style.perCaseAndQtyPriceContainer}>
                    {productDetailData?.Variation?.length > 0 ? (
                      <Formik initialValues={initialValue} onSubmit={() => {}}>
                        {() => (
                          <RadioBtn
                            classes={`${style.variationRadioGroup} ${style.doubleVariant}`}
                            isVariationAvaiable={
                              productDetailData?.Variation?.[0]
                                ?.AvailableQty === "0" &&
                              productDetailData?.Variation?.[1]
                                ?.AvailableQty === "0"
                                ? true
                                : false
                            }
                            name={`feedbackRadio2`}
                            cateogryOption={cateogryOption}
                            selectedOptionVal={selectedOptionVal}
                            setSelectedOptionVal={setSelectedOptionVal}
                          />
                        )}
                      </Formik>
                    ) : (
                      <Formik initialValues={initialValue} onSubmit={() => {}}>
                        {() => (
                          <RadioBtn
                            classes={`${style.variationRadioGroup} ${style.singleVariant}`}
                            isVariationAvaiable={
                              productDetailData?.Variation?.[0]
                                ?.AvailableQty === "0" &&
                              productDetailData?.Variation?.[0]
                                ?.AvailableQty === "0"
                                ? true
                                : false
                            }
                            name={`feedbackRadio2`}
                            cateogryOption={cateogryOption.slice(0, 1)}
                            selectedOptionVal={selectedOptionVal}
                            setSelectedOptionVal={setSelectedOptionVal}
                          />
                        )}
                      </Formik>
                    )}
                    <div className={style.priceQtyContainer}>
                      <div className={style.priceContainer}>
                        {productDetailData?.Variation?.length > 0 ? (
                          <>
                            {selectedOptionVal?.value === "Box" ? (
                              <>
                                {productDetailData?.Variation !== undefined &&
                                  productDetailData?.Variation?.[0]
                                    ?.DiscountPrice !== "0" && (
                                    <Typography
                                      className={style.price}
                                      variant="body1"
                                      component="h2"
                                    >
                                      KWD{" "}
                                      {numberWithCommas(
                                        parseFloat(
                                          productDetailData?.Variation?.[0]
                                            ?.DiscountPrice
                                        ).toFixed(2)
                                      )}
                                    </Typography>
                                  )}
                                <Typography
                                  className={
                                    productDetailData?.Variation?.[0]
                                      ?.DiscountPrice === "0"
                                      ? style.price
                                      : style.cutPrice
                                  }
                                  variant="body1"
                                  component="h2"
                                >
                                  KWD{" "}
                                  {productDetailData?.Variation !== undefined &&
                                    numberWithCommas(
                                      parseFloat(
                                        productDetailData?.Variation?.[0]
                                          ?.SalePrice
                                      ).toFixed(2)
                                    )}
                                </Typography>
                              </>
                            ) : (
                              <>
                                {productDetailData?.Variation !== undefined &&
                                  productDetailData?.Variation?.[1]
                                    ?.DiscountPrice !== "0" && (
                                    <Typography
                                      className={style.price}
                                      variant="body1"
                                      component="h2"
                                    >
                                      KWD{" "}
                                      {numberWithCommas(
                                        parseFloat(
                                          productDetailData?.Variation?.[1]
                                            ?.DiscountPrice
                                        ).toFixed(2)
                                      )}
                                    </Typography>
                                  )}
                                <Typography
                                  className={
                                    productDetailData?.Variation !==
                                      undefined &&
                                    productDetailData?.Variation?.[1]
                                      ?.DiscountPrice === "0"
                                      ? style.price
                                      : style.cutPrice
                                  }
                                  variant="body1"
                                  component="h2"
                                >
                                  KWD{" "}
                                  {productDetailData?.Variation !== undefined &&
                                    numberWithCommas(
                                      parseFloat(
                                        productDetailData?.Variation?.[1]
                                          ?.SalePrice
                                      ).toFixed(2)
                                    )}
                                </Typography>
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            {productDetailData?.DiscountPrice !== "0" && (
                              <Typography
                                className={style.price}
                                variant="body1"
                                component="h2"
                              >
                                KWD{" "}
                                {numberWithCommas(
                                  parseFloat(
                                    productDetailData?.DiscountPrice
                                  ).toFixed(2)
                                )}
                              </Typography>
                            )}
                            <Typography
                              className={
                                productDetailData?.DiscountPrice === "0"
                                  ? style.price
                                  : style.cutPrice
                              }
                              variant="body1"
                              component="h2"
                            >
                              KWD{" "}
                              {numberWithCommas(
                                parseFloat(productDetailData?.Price).toFixed(2)
                              )}
                            </Typography>
                          </>
                        )}
                      </div>
                      <CartQuantity
                        productDetailValues={productDetailValues}
                        selectedOptionVal={
                          productDetailData?.Variation?.length
                            ? selectedOptionVal?.value
                            : ""
                        }
                        productData={productDetailData}
                        perStrip={
                          selectedOptionVal?.value !== undefined &&
                          selectedOptionVal?.value === "Strip"
                            ? true
                            : false
                        }
                      />
                      <div className={style.qtyContainer}></div>
                    </div>
                  </div>

                  <div className={style.addToCardAndDeliveryContainer}>
                    <div className={style.DeliveryContainer}>
                      {productDetailJson &&
                        productDetailJson?.Data?.length > 0 &&
                        Number(productDetailJson?.Data[0]?.AvailableQty) <=
                          0 && (
                          <Typography variant="body2" component="p">
                            <button>Out of Stock</button>
                          </Typography>
                        )}
                      <ProductExpectedDeliveryFullWidthBanner
                        categoryName={productDetailData?.Category}
                      />
                    </div>
                    <div className={style.addToCardContainer}>
                      {productDetailJson &&
                      productDetailJson?.Data?.length > 0 &&
                      Number(productDetailJson?.Data?.[0]?.AvailableQty) <=
                        0 ? (
                        <Buttons
                          btnClickFunction={handleArrangeProductForMe}
                          btnClass={`secondary btn-half-rounded ${style.btn} ${style.notifyMe}`}
                        >
                          {" "}
                          Notify Me{" "}
                        </Buttons>
                      ) : productDetailJson?.Data?.[0]?.AvailableQty ===
                        undefined ? (
                        <Buttons
                          btnClass={`   secondary-font ${style.desktopAddToCart}  ${style.greyOut}`}
                        >
                          {" "}
                          {getText("add-to-cart")}
                        </Buttons>
                      ) : (
                        <Buttons
                          btnClickFunction={handleAddProductInCart}
                          btnClass={` ${style.desktopAddToCart} secondary-font `}
                        >
                          {" "}
                          {getText("add-to-cart")}
                        </Buttons>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <ProductDescription
                productTitle={
                  language === "en"
                    ? productDetailData.Title.split(" ").slice(0, 2).join(" ")
                    : productDetailData.TitleArabic.split(" ")
                        .slice(0, 2)
                        .join(" ")
                }
                productDetailDescription={productDetailDescription}
                howItWorks={productDetailData?.HowItWorks}
                description={productDetailData?.Description}
              />
              <div id="rating_review">
                {productReviews?.ResponseType === 1 && (
                  <ProductReviews
                    data={productReviews?.Data}
                    key={productDetailData?.ProductID}
                  />
                )}
              </div>
              <ProductSuggestions productSuggestion={productSuggestion} />
            </Container>
          ) : (
            productDetailJson?.responseType === "0" && (
              <Container>
                <Box className={style.noProduct}>
                  <BoxTitle boxTitle="No products found" />
                  <Typography variant="body1" component="p">
                    Currently no products has been added to this category yet!
                  </Typography>
                </Box>
              </Container>
            )
          )}
        </>
      </PageWithBanner>
    </>
  );
};

export default ProductDetail;
