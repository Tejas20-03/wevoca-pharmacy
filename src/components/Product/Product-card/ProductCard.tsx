/* eslint-disable @typescript-eslint/no-empty-function */
import {
  GetProductByCategory_ProductType,
  GetProductByBrand_ProductType,
  ProductDataType,
} from "@/services/product/types";
import { Typography } from "@mui/material";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import style from "./ProductCard.module.scss";
import { SearchProductByJSON_ResponseDataType } from "@/services/search/types";
import Router from "next/router";
import { useAppSelector } from "@/hooks/use-app-selector";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { openAddressPopup } from "@/redux/address-popup/slice";
import { addProductsInCart } from "@/redux/cart/actions";
import { Slide, toast } from "react-toastify";

import EyeIcon from "@/components/Global-Icon/Eye-icon";
import CartIcon from "@/containers/svg-icons/cart-icon";
import CartQuantity from "@/components/cart/cartQuantity";
import Cookies from "js-cookie";
import {
  openLoginPopup,
  openLoginPopupOnAddToCart,
} from "@/redux/Login-popup/slice";

import { Formik } from "formik";
import RadioBtn2 from "@/components/radio-btn/radio-btn-2";
import { numberWithCommas } from "@/functions/numberWithCommas";
import dynamic from "next/dynamic";
import { addToCartMixPanelFunction } from "@/utils/mix-panel-hooks";
import { useLanguage } from "@/language-context/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { GetTranslatedData } from "@/services/footer/services";
const GlobalModal = dynamic(() => import("@/components/global-modal/modal"), {
  ssr: false,
});
const ProductImage = dynamic(
  () =>
    import(
      "@/components/Product/Product-image-container/Product-image-container"
    ),
  { ssr: true }
);

export interface productCardProp {
  className?: string;
  data:
    | GetProductByCategory_ProductType
    | GetProductByBrand_ProductType
    | SearchProductByJSON_ResponseDataType
    | ProductDataType;
}
interface initialValuesProps {
  feedbackRadio: string;
}

const customId = "custom-id-yes";
const ProductCard: React.FC<productCardProp> = ({ data, className }) => {
  const cart = useAppSelector((state) => state.cart);
  const item = cart.cartProducts.filter(
    (item) => item?.data?.ProductID === data.ProductID
  );
  const addressesData = useAppSelector((state) => state.addresses);
  const { selectedStoreCode, selectedStoreID } = useAppSelector(
    (state) => state.store
  );
  const outOfStock = useMemo<boolean>(
    () => Number(data.AvailableQty) <= 0,
    [data.AvailableQty, data.ProductID, selectedStoreCode]
  );
  const URL = `/p/${data.Slug}`;
  const incodedURL = URL.replace(/%/g, "");
  const classes = useMemo(
    () => `${style.productHeader} ${outOfStock ? style.noStock : ""}`,
    [outOfStock]
  );
  const dispatch = useAppDispatch();
  const { language } = useLanguage();
  const [openPerBoxPerStripModal, setOpenPerBoxPerStripModal] =
    useState<boolean>(false);
  const addToCart = () => {
    const getUserData = Cookies.get("user");
    const isLoggedIn =
      getUserData !== undefined ? JSON.parse(getUserData).isLoggedIn : false;
    if (data === null || data === undefined) return;
    if (outOfStock) return;
    if (!isLoggedIn) {
      dispatch(openLoginPopup());
      dispatch(openLoginPopupOnAddToCart(true));
      return;
    }
    if (addressesData.selectedAddressID === null) dispatch(openAddressPopup());
    if (addressesData.selectedAddressID !== null) {
      if (data?.Variation && data?.Variation.length > 0) {
        if (selectedOptionVal?.value === "Strip") {
          dispatch(
            addProductsInCart({
              products: [
                {
                  id: `${data?.ProductID}-Strip`,
                  data: data,
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
              const variation =
                selectedOptionVal?.value !== undefined
                  ? selectedOptionVal?.value
                  : "";
              const responseData = response?.[0]?.products?.data;
              const totalNum =
                Number(responseData?.DiscountPrice) !== 0
                  ? Number(responseData?.DiscountPrice) + cart?.total
                  : Number(responseData?.SalePrice) + cart?.total || 0;
              addToCartMixPanelFunction(
                response?.[0]?.products?.quantityToAdd,
                variation,
                response?.[0]?.products?.data,
                "",
                selectedStoreID?.toString(),
                totalNum
              );
            });
        } else if (selectedOptionVal?.value === "Box") {
          dispatch(
            addProductsInCart({
              products: [
                {
                  id: `${data?.ProductID}-Box`,
                  data: data,
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
              const variation =
                selectedOptionVal?.value !== undefined
                  ? selectedOptionVal?.value
                  : "";
              const responseData = response?.[0]?.products?.data;
              const totalNum =
                Number(responseData?.DiscountPrice) !== 0
                  ? Number(responseData?.DiscountPrice) + cart?.total
                  : Number(responseData?.SalePrice) + cart?.total || 0;
              addToCartMixPanelFunction(
                response?.[0]?.products?.quantityToAdd,
                variation,
                response?.[0]?.products?.data,
                "",
                selectedStoreID?.toString(),
                totalNum
              );
            });
        }
      } else {
        dispatch(
          addProductsInCart({
            products: [
              {
                id: data.ProductID,
                data: data,
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
            const variation =
              response?.[0]?.products?.data?.Variations !== undefined
                ? response?.[0]?.products?.data?.Variations
                : "";
            const responseData = response?.[0]?.products?.data;
            const totalNum =
              Number(responseData?.DiscountPrice) !== 0
                ? Number(responseData?.DiscountPrice) + cart?.total
                : Number(responseData?.SalePrice) + cart?.total || 0;
            addToCartMixPanelFunction(
              response?.[0]?.products?.quantityToAdd,
              variation,
              response?.[0]?.products?.data,
              "",
              selectedStoreID?.toString(),
              totalNum
            );
          });
      }
    }
  };

  const cateogryOption: { key: string; value: string; isDefault?: boolean }[] =
    [
      {
        key: `Per Box ( ${
          data?.Variation !== undefined && data?.Variation?.length === 0
            ? data.NoofStrips
            : data?.Variation[0]?.NoofStrips
        } Strips = ${
          data?.Variation !== undefined && data?.Variation?.length === 0
            ? data.TotalTablets
            : data?.Variation[0]?.TotalTablets
        } Tablets ) `,
        value: `Box`,
        isDefault: true,
      },
      {
        key: `Per Strip ( ${
          data?.Variation !== undefined && data?.Variation?.length === 0
            ? data.TotalStripTablets
            : data?.Variation[1]?.TotalTablets
        } Tablets )`,
        value: `Strip`,
        isDefault: false,
      },
    ];
  const [selectedOptionVal, setSelectedOptionVal] = useState(cateogryOption[0]);
  const initialValue: initialValuesProps = {
    feedbackRadio: "",
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
    <React.Fragment>
      <li className={`${style.productListWrapper} ${className}`}>
        <div className={classes}>
          <Typography>{data.Category?.toLowerCase()}</Typography>
          <Link href={{ pathname: incodedURL }} prefetch={false}></Link>

          <ProductImage
            className={style.imageContainer}
            src={
              // data.ProductImage ? data.ProductImage : "/assets/dvago-logo.svg"
              data.ProductImage ? data.ProductImage : "/assets/favicon.png"
            }
            alt={
              `${data.Title?.toLowerCase()} Product Image` || "Product Image"
            }
          />
          {/* <div className={style.overlay}>
            {outOfStock ? (
              <Typography className={style.outofstock}>Out of Stock</Typography>
            ) : null}
            {!outOfStock &&
            item?.length === 0 &&
            data?.Variation?.length === 0 ? (
              <button onClick={addToCart} className={style.addToCart}>
                {getText("add-to-cart")}
              </button>
            ) : null}
            {data?.Variation?.length > 0 ? (
              <button
                onClick={() => setOpenPerBoxPerStripModal(true)}
                className={style.addToCart}
              >
                Select Options
              </button>
            ) : null}
            {item?.length > 0 && data?.Variation?.length === 0 && (
              <CartQuantity
                selectedOptionVal={
                  data?.Variation?.length ? selectedOptionVal?.value : ""
                }
                className={style.productQuanitity}
                productData={data}
              />
            )}
            <button onClick={() => Router.push(incodedURL)}>
              <EyeIcon color="--text-color-alt" />
            </button>
            {data?.Variation?.length === 0 ? (
              <button
                onClick={addToCart}
                className={outOfStock ? style.unableCart : ""}
              >
                <CartIcon color="--text-color-alt" />
              </button>
            ) : null}
            {data?.Variation?.length > 0 ? (
              <button
                onClick={() => setOpenPerBoxPerStripModal(true)}
                className={outOfStock ? style.unableCart : ""}
              >
                <CartIcon color="--text-color-alt" />
              </button>
            ) : null}
          </div> */}
        </div>
        <div className={style.productContent}>
          <Typography>
            <Link href={{ pathname: incodedURL }} prefetch={false}>
              {language === "en"
                ? data.Title?.toLowerCase()
                : data.TitleArabic?.toLowerCase()}
            </Link>
          </Typography>
          <Typography className={style.categoryName}>
            {data.Category}
          </Typography>
          <button
            onClick={addToCart}
            className={style.desktopAddToCart}
            disabled={outOfStock}
          >
            <span>+</span> {getText("add-to-cart")}
          </button>
          <div className={style.productFirstLine}>
            <div className={style.priceBox}>
              {data.DiscountPrice !== "0" ? (
                <Typography className={style.salePrice}>
                  KWD{" "}
                  {numberWithCommas(parseFloat(data.DiscountPrice).toFixed(2))}
                </Typography>
              ) : (
                <Typography className={style.salePrice}>
                  KWD {numberWithCommas(parseFloat(data.Price).toFixed(2))}
                </Typography>
              )}
              {data.DiscountPrice !== "0" && (
                <Typography className={`${style.regularPrice}`}>
                  KWD {numberWithCommas(parseFloat(data.Price).toFixed(2))}
                </Typography>
              )}
            </div>
          </div>
        </div>
      </li>
      <GlobalModal
        openSelector={openPerBoxPerStripModal}
        closeFunc={() => setOpenPerBoxPerStripModal(false)}
      >
        <div className={style.popupWrapper}>
          <Typography>
            <Link href={{ pathname: incodedURL }} prefetch={false}>
              {" "}
              {language === "en"
                ? data.Title?.toLowerCase()
                : data.TitleArabic?.toLowerCase()}
            </Link>
          </Typography>

          {data?.Variation?.length > 0 && (
            <Formik initialValues={initialValue} onSubmit={() => {}}>
              {() => (
                <RadioBtn2
                  classes={style.variationRadioGroup}
                  isVariationAvaiable={
                    data?.Variation?.[0]?.AvailableQty === "0" &&
                    data?.Variation?.[1]?.AvailableQty === "0"
                      ? true
                      : false
                  }
                  name="feedbackRadio"
                  cateogryOption={cateogryOption}
                  selectedOptionVal={selectedOptionVal}
                  setSelectedOptionVal={setSelectedOptionVal}
                />
              )}
            </Formik>
          )}
          <div className={style.productFirstLine}>
            <div className={style.priceBox}>
              {selectedOptionVal?.value === "Box" ? (
                <>
                  {data?.Variation !== undefined &&
                    data?.Variation?.[0]?.DiscountPrice !== "0" && (
                      <Typography className={style.salePrice}>
                        {" "}
                        KWD{" "}
                        {parseFloat(
                          data?.Variation?.[0]?.DiscountPrice
                        ).toFixed(2)}{" "}
                      </Typography>
                    )}
                  <Typography
                    className={
                      data?.Variation?.[0]?.DiscountPrice === "0"
                        ? style.regularPrice
                        : style.regularPrice
                    }
                  >
                    {" "}
                    KWD{" "}
                    {data?.Variation !== undefined &&
                      parseFloat(data?.Variation?.[0]?.SalePrice).toFixed(
                        2
                      )}{" "}
                  </Typography>
                </>
              ) : (
                <>
                  {data?.Variation !== undefined &&
                    data?.Variation?.[1]?.DiscountPrice !== "0" && (
                      <Typography className={style.salePrice}>
                        {" "}
                        KWD{" "}
                        {parseFloat(
                          data?.Variation?.[1]?.DiscountPrice
                        ).toFixed(2)}{" "}
                      </Typography>
                    )}
                  <Typography
                    className={
                      data?.Variation !== undefined &&
                      data?.Variation?.[1]?.DiscountPrice === "0"
                        ? style.regularPrice
                        : style.regularPrice
                    }
                  >
                    {" "}
                    KWD{" "}
                    {data?.Variation !== undefined &&
                      parseFloat(data?.Variation?.[1]?.SalePrice).toFixed(
                        2
                      )}{" "}
                  </Typography>
                </>
              )}
            </div>
            <CartQuantity
              selectedOptionVal={
                data?.Variation?.length ? selectedOptionVal?.value : ""
              }
              className={style.productQuanitity}
              productData={data}
              perStrip={
                selectedOptionVal?.value !== undefined &&
                selectedOptionVal?.value === "Strip"
                  ? true
                  : false
              }
            />
          </div>
          <div className={style.overlay}>
            <button onClick={addToCart} className={style.addToCart}>
              {getText("add-to-cart")}
            </button>
          </div>
        </div>
      </GlobalModal>
    </React.Fragment>
  );
};

export default ProductCard;
