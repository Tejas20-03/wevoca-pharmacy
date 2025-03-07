import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import React, { useRef } from "react";
import FormStyle from "@/components/Login/FormField.module.scss";
import style from "@/components/Feedback-form/feedback-form.module.scss";
import Buttons from "@/components/Button/Buttons";
import complaint from "./Complaint-form.module.scss";
import {
  GetCustomerTokenInCookiesStorage,
  GetCustomerTokenInLocalStorage,
} from "@/functions/local-storage-methods";
import { postAddComplaint } from "@/services/complaint-feedback/services";
import * as Yup from "yup";
import MaskedInput from "react-text-mask";
import { Slide, toast } from "react-toastify";
import Select, {
  components,
  OptionProps,
  SingleValueProps,
} from "react-select";
import Image from "next/image";
import DownArrow from "@/components/Global-Icon/down-arrow";
import { useQuery } from "@tanstack/react-query";
import { GetTranslatedData } from "@/services/footer/services";
import Cookies from "js-cookie";
import { useLanguage } from "@/language-context/LanguageContext";

interface IProps {
  complaintTypes: { id: number; value: string; label: string }[];
  allBranch: { id: number; value: string; label: string }[];
}

interface OptionType {
  value: string;
  label: string;
}

interface FormValueProps {
  name: string;
  phonenumber: string;
  ComplaintType: string;
  complaint: string;
  branchType: string;
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

const ComplaintForm: React.FC<IProps> = ({ complaintTypes, allBranch }) => {
  const selectRef = useRef(null);
  const selectRef2 = useRef(null);
  const initialValues: FormValueProps = {
    name: "",
    phonenumber: "",
    branchType: "",
    ComplaintType: "",
    complaint: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("This Field is Required"),
    phonenumber: Yup.string()
      .matches(/^(03)([0-9]{9})/g, "Invalid Phone number")
      .required("Phone Number is required")
      .min(11, "Phone number must be 11 digits")
      .max(11, "phone number must be 11 digits"),
    branchType: Yup.string().required("This Field is Required"),
    ComplaintType: Yup.string().required("This Field is Required"),
    complaint: Yup.string().required("This Field is Required"),
  });
  const { isLoading, error, data, refetch } = useQuery(
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
      staleTime: 600000, //1 day
    }
  );

  const translatedData = data?.Data || [];

  const { language } = useLanguage();

  const getText = (value: string) => {
    const item = translatedData.find((item: any) => item.Value === value);
    return language === "ar" ? item?.Arabic : item?.English;
  };

  const { Option } = components;
  const CustomSelectOption = (props: OptionProps<OptionType>) => {
    return (
      <Option {...props} className={`Menu_${props.innerProps.id}`}>
        <>
          {props.isSelected ? (
            <div>
              <Image
                fill
                src="/assets/selected-option-img.svg"
                alt="radio icon"
                style={{ marginRight: "5px" }}
              />
            </div>
          ) : (
            <div>
              <Image
                fill
                src="/assets/unselected-option-img.svg"
                alt="radio icon"
                style={{ marginRight: "5px" }}
              />
            </div>
          )}
        </>
        {props.children}
      </Option>
    );
  };
  const CustomSelectValue = (props: SingleValueProps<OptionType>) => (
    <div className="selectedItem">{props.data.label}</div>
  );

  const onSubmit = (
    value: FormValueProps,
    { resetForm }: FormikHelpers<FormValueProps>
  ) => {
    const postAddComplaintFunc = async () => {
      const customerTokenResponse = GetCustomerTokenInLocalStorage();
      const customerTokenCookies: string =
        await GetCustomerTokenInCookiesStorage();
      const response = await postAddComplaint(
        value.name,
        value.phonenumber,
        value.complaint,
        value.branchType,
        value.ComplaintType,
        {
          token:
            customerTokenResponse !== null
              ? customerTokenResponse || customerTokenCookies
              : undefined,
        }
      );
      if (response && response.responseType.toString() === "1") {
        resetForm();
        selectRef.current?.clearValue();
        selectRef2.current?.clearValue();
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
    postAddComplaintFunc();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {(props) => {
        const { initialValues, touched, errors, setFieldValue } = props;
        return (
          <Form
            className={`${FormStyle.Form} ${style.feedbackForm} ${complaint.complaintForm}`}
          >
            <div className={style.formGroup}>
              <Field id="Name" name="name" placeholder={getText("Your-name")} />
              {touched.name && <span>{errors.name}</span>}
            </div>
            <div className={style.formGroup}>
              <div className="selectBox">
                <Select
                  id="branchType"
                  name={initialValues.branchType}
                  options={allBranch}
                  className="fancy_select"
                  components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                    SingleValue: CustomSelectValue,
                    Option: CustomSelectOption,
                  }}
                  classNamePrefix="react-select__option123"
                  placeholder="Branch Type"
                  isSearchable={false}
                  onChange={(selectedOption) => {
                    setFieldValue("branchType", selectedOption?.value);
                  }}
                  ref={selectRef}
                />
                <DownArrow />
                {touched.branchType && <span>{errors.branchType}</span>}
              </div>
            </div>
            <div className={style.formGroup}>
              <div className="selectBox">
                <Select
                  id="ComplaintType"
                  name="ComplaintType"
                  options={complaintTypes}
                  className="fancy_select"
                  components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                    SingleValue: CustomSelectValue,
                    Option: CustomSelectOption,
                  }}
                  classNamePrefix="react-select__option123"
                  placeholder="Complaint Type"
                  isSearchable={false}
                  onChange={(selectedOption) => {
                    setFieldValue("ComplaintType", selectedOption?.value);
                  }}
                  ref={selectRef2}
                />
                <DownArrow />
                {touched.ComplaintType && <span>{errors.ComplaintType}</span>}
              </div>
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
            <div className={`${style.formGroup} ${complaint.formGroup}`}>
              <Field
                id="complaint"
                name="complaint"
                placeholder="What’s your complaint"
                as="textarea"
              />
              {touched.complaint && <span>{errors.complaint}</span>}
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

export default ComplaintForm;
