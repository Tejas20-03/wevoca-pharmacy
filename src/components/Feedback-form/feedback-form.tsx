import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import React from "react";
import FormStyle from "@/components/Login/FormField.module.scss";
import style from "./feedback-form.module.scss";
import Buttons from "@/components/Button/Buttons";
import {
  GetCustomerTokenInCookiesStorage,
  GetCustomerTokenInLocalStorage,
} from "@/functions/local-storage-methods";
import { postAddFeedback } from "@/services/complaint-feedback/services";
import * as Yup from "yup";
import MaskedInput from "react-text-mask";
import { Slide, toast } from "react-toastify";
import { useLanguage } from "@/language-context/LanguageContext";
import Cookies from "js-cookie";
import { GetTranslatedData } from "@/services/footer/services";
import { useQuery } from "@tanstack/react-query";

interface IProps {}

interface FormValueProps {
  name: string;
  phonenumber: string;
  feedback: string;
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

const FeedbackForm: React.FC<IProps> = () => {
  const initialValue: FormValueProps = {
    name: "",
    phonenumber: "",
    feedback: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("This Field is Required"),
    phonenumber: Yup.string()
      .matches(/^(03)([0-9]{9})/g, "Invalid Phone number")
      .required("Phone Number is required")
      .min(11, "Phone number must be 11 digits")
      .max(11, "phone number must be 11 digits"),
    feedback: Yup.string().required("This Field is Required"),
  });
  const onSubmit = (
    value: FormValueProps,
    { resetForm }: FormikHelpers<FormValueProps>
  ) => {
    const postAddFeedbackFunc = async () => {
      const customerTokenResponse = GetCustomerTokenInLocalStorage();
      const customerTokenCookies: string =
        await GetCustomerTokenInCookiesStorage();

      const response = await postAddFeedback(
        value.name,
        value.phonenumber,
        value.feedback,
        {
          token:
            customerTokenResponse !== null
              ? customerTokenResponse || customerTokenCookies
              : undefined,
        }
      );
      if (response && response.responseType.toString() === "1") {
        resetForm();
        toast(response.message, {
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
      }
    };
    postAddFeedbackFunc();
  };

  const { isLoading, error, data, refetch } = useQuery(
    ["feedback-form"],
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
    <Formik
      initialValues={initialValue}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(props) => {
        const { touched, errors } = props;
        return (
          <Form className={`${FormStyle.Form} ${style.feedbackForm}`}>
            <div className={style.formGroup}>
              <Field id="name" name="name" placeholder={getText("Your-name")} />
              {touched.name && <span>{errors.name}</span>}
            </div>
            <div className={style.formGroup}>
              <Field
                type="number"
                id="phonenumber"
                name="phonenumber"
                placeholder="Phone Number*"
                render={({ field }: FieldProps) => (
                  <MaskedInput
                    {...field}
                    mask={phoneNumberMask}
                    className="form-control"
                    placeholder={getText("Enter-phone")}
                    guide={false}
                    id="my-input-id"
                  />
                )}
              />
              {touched.phonenumber && <span>{errors.phonenumber}</span>}
            </div>
            <div className={`${style.formGroup} ${style.emptyFormGroup}`}></div>
            <div className={style.formGroup}>
              <Field
                id="feedback"
                name="feedback"
                placeholder="What’s your feedback"
                as="textarea"
              />
              {touched.feedback && <span>{errors.feedback}</span>}
            </div>
            <div className="btnGroup btnSubmit">
              <Buttons types="submit" btnClass="primary btn-half-rounded">
                Submit
              </Buttons>
              {/* <Buttons types='button' btnClass='primary btn-half-rounded'>whatsapp</Buttons> */}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FeedbackForm;
