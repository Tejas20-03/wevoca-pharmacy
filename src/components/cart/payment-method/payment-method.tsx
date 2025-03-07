/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import CartBoxContainer from "@/components/cart/cart-box-container/cart-box-container";
import RadioBtn from "@/components/radio-btn/radio-btn";
import { Field, Form, Formik } from "formik";
import style from "./payment-method.module.scss";

import SavedCardIndex from "@/components/saved-card-popup/saved-card-index";
import { useAppSelector } from "@/hooks/use-app-selector";
import { paymentRadioObjProp } from "@/containers/cart/cart-index/Cart-index";
import { Box } from "@mui/material";
import VisacardIcon from "@/containers/svg-icons/visacard-icon";
import MastercardIcon from "@/containers/svg-icons/mastercard-icon";
import BoxTitle from "@/components/BoxTitle/Box-title";
import Buttons from "@/components/Button/Buttons";
import EditIcon from "@/components/Global-Icon/Edit-icon";
import FormStyle from "@/components/Login/FormField.module.scss";
import promoStyle from "@/components/cart/promo-input/promo-input.module.scss";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { openSavedCard } from "@/redux/saved-card/slice";
import CashIcon from "@/containers/svg-icons/cash-icon";
import { useLanguage } from "@/language-context/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { GetTranslatedData } from "@/services/footer/services";
import Cookies from "js-cookie";

interface IProps {
  changeCartBtn?: boolean;
  setSelectedOptionVal: React.Dispatch<
    React.SetStateAction<
      | { key: string; value: string; isDefault: boolean }
      | { key: string; value: string; isDefault?: undefined }
    >
  >;
  selectedOptionVal: paymentRadioObjProp | [];
  paymentRadioObj: { key: string; value: string; isDefault?: boolean }[];
  hasLabsCategory: boolean;
  mCart?: boolean;
}
interface initialValuesProps {
  feedbackRadio: string;
}

const PaymentMethod: React.FC<IProps> = ({
  mCart = false,
  decodedPaymentMethod,
  selectedOptionVal,
  setSelectedOptionVal,
  paymentRadioObj,
}) => {
  const dispatch = useAppDispatch();
  const { openSavedCardPopup } = useAppSelector((state) => state.savedCard);

  const initialValue: initialValuesProps = {
    feedbackRadio: "",
  };

  const { selected } = useAppSelector((state) => state.creditCard);
  const creditCardValue: { cardNumber: string } = {
    cardNumber: "",
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
    <CartBoxContainer boxTitle={getText("Payment-Method")} classes={style.paymentBox}>
      <div className={style.groupRadioCardWrapper}>
        <Formik initialValues={initialValue} onSubmit={() => {}}>
          {() => (
            <>
              <RadioBtn
                name="paymentMethod"
                classes={style.paymentRadio}
                cateogryOption={paymentRadioObj}
                selectedOptionVal={selectedOptionVal}
                setSelectedOptionVal={setSelectedOptionVal}
              />
            </>
          )}
        </Formik>
        {decodedPaymentMethod?.id === 2 ? (
          <Box className={style.cardsWrapper1}>
            <CashIcon />
          </Box>
        ) : decodedPaymentMethod?.id === 1 ? (
          <Box className={style.cardsWrapper}>
            <MastercardIcon />
            <VisacardIcon />
          </Box>
        ) : (
          <>
            <Box className={style.cardsWrapper1}>
              <CashIcon />
            </Box>
            <Box className={style.cardsWrapper}>
              <MastercardIcon />
              <VisacardIcon />
            </Box>
          </>
        )}
      </div>
      {!mCart &&
        (selectedOptionVal as paymentRadioObjProp)?.value ===
          paymentRadioObj?.[1]?.value && (
          <CartBoxContainer classes={style.paymentCard}>
            <img src="/assets/payment-method-icon.svg" alt="svg image" />
            <p>
              After clicking “Proceed to online payment”, you will be redirected
              to transaction page to complete your purchase securely.
            </p>
          </CartBoxContainer>
        )}
      {!mCart && paymentRadioObj?.[0]?.value !== "Cash On Delivery" && (
        <CartBoxContainer classes={`${style.paymentCard}`}>
          <img src="/assets/payment-method-icon.svg" alt="svg image" />
          <p>
            After clicking “Proceed to online payment”, you will be redirected
            to transaction page to complete your purchase securely.
          </p>
        </CartBoxContainer>
      )}
      {(selectedOptionVal as paymentRadioObjProp)?.value ===
        paymentRadioObj?.[1]?.value && (
        <div
          className={`${style.cardSelection} ${
            mCart ? style.cardSelectionDesignUpdate : ""
          }`}
        >
          <BoxTitle boxTitle="Selected credit card" />
          <Formik initialValues={creditCardValue} onSubmit={() => {}}>
            {() => (
              <Form
                className={`${FormStyle.Form}  ${promoStyle.promoCodeForm} ${style.formGroup} promo-code-form`}
              >
                <Field
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="Card Number*"
                  value={selected?.CardNumber}
                  onClick={() => dispatch(openSavedCard())}
                  readOnly
                />
                <Buttons btnClickFunction={() => dispatch(openSavedCard())}>
                  <EditIcon color="--primary-color-darker" />
                </Buttons>
              </Form>
            )}
          </Formik>
        </div>
      )}
      {openSavedCardPopup && <SavedCardIndex />}
    </CartBoxContainer>
  );
};

export default PaymentMethod;
