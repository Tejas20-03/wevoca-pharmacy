/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import style from './product-review-popup.module.scss';
import { Box, Rating } from '@mui/material';

import BoxTitle from '@/components/BoxTitle/Box-title';
import { useAppSelector } from '@/hooks/use-app-selector';
import { useAppDispatch } from '@/hooks/use-app-dispatch';

import dynamic from 'next/dynamic';
import { closeProductReview } from '@/redux/order-review-popup/slice';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import Buttons from '@/components/Button/Buttons';
import FormStyle from '@/components/Login/FormField.module.scss';
import { PostProductReview } from '@/services/reviews/services';
import { GetCustomerTokenInCookiesStorage, GetCustomerTokenInLocalStorage } from '@/functions/local-storage-methods';
import { Slide, toast } from 'react-toastify';
import Image from 'next/image';
const GlobalModal = dynamic(() => import('@/components/global-modal/modal'), { ssr: false });

interface IProps {
  orderCancelledFunc: () => void;
}

interface FormValueProps {
  ReviewValue: string;
}

const ProductReviewPopup: React.FC<IProps> = ({ orderCancelledFunc }) => {
  const [value, setValue] = React.useState<number | null>(null);
  const [error, setError] = React.useState({
    ratingError: '',
    reviewError: '',
    apiErrorMessage: '',
  });
  const [characterCount, setCharacterCount] = React.useState(0);
  const { OrderDetailID, orderId, orderProductReviewPopup, orderDetailData } = useAppSelector((state) => state.ProductOrderReviewSlice);
  const dispatch = useAppDispatch();

  const initialValue: FormValueProps = {
    ReviewValue: '',
  };

  const onSubmit = async (value2: FormValueProps, { resetForm }: FormikHelpers<FormValueProps>) => {
    if (value2.ReviewValue === '' || value === null) {
      setError({
        ratingError: '*Please enter a star rating for this review.',
        reviewError: '*Please provide feedback for this product',
        apiErrorMessage: '',
      });
    }
    if (value2.ReviewValue === '') return;
    else if (value === null) return;
    const response = await productReviewApi(value2.ReviewValue);
    if (response?.ResponseType === 1) {
      toast(response?.message, {
        position: 'bottom-center',
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
        theme: 'dark',
      });
      resetForm();
      setValue(null);
      setError({
        ratingError: '',
        reviewError: '',
        apiErrorMessage: '',
      });
      setTimeout(() => {
        dispatch(closeProductReview());
      }, 600);
      orderCancelledFunc?.();
    } else {
      setError({
        ratingError: '',
        reviewError: '',
        apiErrorMessage: response !== undefined ? response.message : '',
      });
    }
  };
  const productReviewApi = async (productReview: string) => {
    const customerTokenResponse = GetCustomerTokenInLocalStorage();
    const customerTokenCookies: string = await GetCustomerTokenInCookiesStorage();
    const data = {
      Platform: 'web',
      ProductID: orderDetailData?.ProductID !== undefined ? orderDetailData?.ProductID : '',
      Rating: value !== null ? value : 0,
      Reviews: productReview !== '' ? productReview : '',
      OrderID: orderId,
      OrderDetailID: OrderDetailID !== '' ? OrderDetailID : '',
    };
    const response = await PostProductReview(data, { token: customerTokenResponse !== null ? customerTokenResponse || customerTokenCookies : undefined });
    return response;
  };

  const closeReviewPopup = () => {
    setValue(null);
    setError({
      ratingError: '',
      reviewError: '',
      apiErrorMessage: '',
    });
    dispatch(closeProductReview());
    setCharacterCount(0);
  };
  return (
    <>
      <GlobalModal openSelector={orderProductReviewPopup} closeFunc={closeReviewPopup} containerClass={style.voucherPopupContainer} contentClass={style.voucherPopupContainerContent}>
        <Box className={style.reviewContent}>
          <BoxTitle boxTitle="Give a review on product" />
          <Box className={style.reviewWrapper}>
            <div className={style.productTitleWrapper}>
              <div>
                <Image src={orderDetailData?.ItemImage} alt="logo" width={74} height={73} />
              </div>
              <h5>{orderDetailData?.ProductTitle}</h5>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Rating
                name="simple-controlled"
                className={style.reviewStars}
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
              {error.ratingError && <span className={style.error}>{error.ratingError}</span>}
            </div>
          </Box>

          <Formik initialValues={initialValue} validationSchema={undefined} onSubmit={onSubmit}>
            {(props) => {
              const { values, handleChange } = props;
              const handleReviewChange = (e) => {
                if (e.target.value.length > 500) {
                  return;
                } else {
                  const currentValue = e.target.value;
                  setCharacterCount(currentValue.length);
                  handleChange(e);
                }
              };
              return (
                <Form className={`${FormStyle.Form} ${style.feedbackForm}`}>
                  <div className={style.formGroup}>
                    <Field id="feedback" name="ReviewValue" placeholder="Write your review here" as="textarea" onChange={handleReviewChange} />
                    <div className={style.reviewDetailIndication}>
                      {error.reviewError && <span className={style.error}>{error.reviewError}</span>}
                      <div>{characterCount}/500</div>
                    </div>
                  </div>
                <div className={`btnGroup btnSubmit ${style.formSubmitWrap}`}>
                    <p> {error?.apiErrorMessage}</p>
                    <Buttons types="submit" btnClass={`primary btn-half-rounded ${style.submitReviewBtn} ${!value || !values.ReviewValue ? style.unstyled : ''}`}>
                      Submit
                    </Buttons>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </Box>
      </GlobalModal>
    </>
  );
};

export default ProductReviewPopup;
