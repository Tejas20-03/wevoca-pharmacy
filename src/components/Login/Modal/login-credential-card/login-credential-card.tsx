import { Box, Typography } from "@mui/material";

import { Field, FieldProps, Form, Formik } from "formik";
import React, { useState } from "react";
import { formFields } from "@/components/Login/Modal/Login-modal";
import FormStyle from "@/components/Login/FormField.module.scss";
import style from "./login-credential-card.module.scss";
import { postCustomerLogin } from "@/services/user/services";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { changeLoginScreen } from "@/redux/Login-popup/slice";
import MaskedInput from "react-text-mask";
import mixpanel from "mixpanel-browser";
import { identifyUser, aliasUser } from "@/utils/mix-pnael";
import { GetTranslatedData } from "@/services/footer/services";
import Cookies from "js-cookie";
import { useLanguage } from "@/language-context/LanguageContext";
import { useQuery } from "@tanstack/react-query";

interface IProps {
  initialValue: formFields;
  validationSchema: Object;
  setInitialValue: React.Dispatch<React.SetStateAction<formFields>>;
}

const phoneNumberMask = [
  /[0-9]/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

const LoginCredentialCard: React.FC<IProps> = ({
  setInitialValue,
  initialValue,
  validationSchema,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isError, setError] = useState("");
  const dispatch = useAppDispatch();
  const onSubmit = async (value: formFields) => {
    const phoneNumber =
      JSON.stringify(value.phonenumber).slice(0, 2) === "00"
        ? JSON.stringify(value.phonenumber).slice(1)
        : value.phonenumber;
    const phoneNumber2 =
      JSON.stringify(value.phonenumber).slice(0, 2) === "00"
        ? JSON.stringify(value.phonenumber).slice(2)
        : value.phonenumber;
    if (
      value.name === null ||
      value.phonenumber === null ||
      value.email === null
    )
      return;
    setIsProcessing(true);
    const response = await postCustomerLogin(
      value.name,
      `${phoneNumber}`,
      value.email,
      { token: "" }
    );
    setIsProcessing(false);
    if (response && response.responseType?.toString() === "1") {
      if (response.NewCustomer === "true") {
        aliasUser(response.CustomerID);
      } else {
        identifyUser(response.CustomerID, {
          name: value.name,
          email: value.email,
          phoneNumber: phoneNumber,
        });
      }
      setError("");
      dispatch(changeLoginScreen(true));
      setInitialValue({
        name: value.name,
        phonenumber: `${phoneNumber2}`,
        email: value.email,
      });
    } else {
      setError(response?.Message);
    }
  };

  const { isLoading, error, data, refetch } = useQuery(
    ["login-card"],
    async () => {
      return await GetTranslatedData({ token: "" });
    },
    {
      retry: (failureCount, error) => {
        const token = Cookies.get("auth-token");
        return !token;
      },
      retryDelay: 0,
      staleTime: 600000, //1 day
    }
  );

  const translatedData = data?.Data || [];

  const { language } = useLanguage();

  const getText = (value: string) => {
    const item = translatedData.find((item: string) => item.Value === value);
    return language === "ar" ? item?.Arabic : item?.English;
  };

  return (
    <>
      <Typography id="modal-modal-title" variant="h4" component="h1" className={style.headingColor}>
        {getText("Hey-There")}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {getText("Login-below")}
      </Typography>
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(props) => {
          const { touched, errors } = props;
          return (
            <Form className={FormStyle.Form}>
              <Box className={style.formGroup}>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder={getText("Your-name")}
                />
                {touched.name && <span>{errors.name}</span>}
              </Box>
              <Box className={style.formGroup}>
                <Field
                  type="number"
                  id="phonenumber"
                  name="phonenumber"
                  placeholder="Phone Number*"
                  render={({ field }: FieldProps) => (
                    <MaskedInput
                      {...field}
                      inputMode="numeric"
                      mask={phoneNumberMask}
                      className="form-control"
                      placeholder={getText("Enter-phone")}
                      guide={false}
                      id="my-input-id"
                    />
                  )}
                />
                {touched.phonenumber && <span>{errors.phonenumber}</span>}
              </Box>
              <Box className={style.formGroup}>
                <Field
                  id="email"
                  name="email"
                  placeholder={getText("Email-address")}
                  type="email"
                />
                <span>{errors.email}</span>
              </Box>
              <Typography className={style.loginError}>{isError}</Typography>
              {!isProcessing ? (
                <button className="submitForm" type="submit">
                  Send Code
                </button>
              ) : (
                <button
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    e.preventDefault()
                  }
                  type="submit"
                  className={style.submitLoading}
                >
                  loading
                </button>
              )}
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default LoginCredentialCard;
