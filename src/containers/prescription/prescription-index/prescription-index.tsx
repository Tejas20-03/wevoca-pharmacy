/* eslint-disable @typescript-eslint/no-unused-vars */
import GalleryCamera from "@/components/prescription/galleryCamera";
import BoxTitle from "@/components/BoxTitle/Box-title";
import BreadCrumb from "@/components/Bread-crumb/BreadCrumb";

import UploadPresc from "@/components/Global-Icon/upload-icon";
import PageWithBanner from "@/components/page-banner/page-with-banner";
import { Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import style from "./prescription-index.module.scss";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import Cookies from "js-cookie";
import { postAddPrescriptionInquiry } from "@/services/prescription/services";

import { Slide, toast } from "react-toastify";
import Image from "next/image";
import Arrowbottom from "@/containers/svg-icons/arrow-bottom";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { openLoginPopup } from "@/redux/Login-popup/slice";
import {
  GetCustomerTokenInCookiesStorage,
  GetCustomerTokenInLocalStorage,
} from "@/functions/local-storage-methods";

import Notification from "@/containers/svg-icons/notification";
import DoorDelivery from "@/containers/svg-icons/door-delivery";
import mixpanel from "mixpanel-browser";
import { json } from "stream/consumers";
import { postUploadImage } from "@/services/checkout/services";
import {
  addInquiryObj,
  addInquiryObjType,
} from "@/services/prescription/types";
import { useAppSelector } from "@/hooks/use-app-selector";
import { BASE_URL_DVAGO_API } from "@/services/config";
import { useLanguage } from "@/language-context/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { GetTranslatedData } from "@/services/footer/services";

interface IProps {}

const PrescriptionIndex: React.FC<IProps> = () => {
  const dispatch = useAppDispatch();
  const storeData = useAppSelector((state) => state.store);
  const [file, setFile] = useState<{ url: string; data: File | null }>({
    url: "",
    data: null,
  });
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showPrescription, setShowPrescription] = useState<boolean>(true);

  const handleUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];
    setFile({ url: URL.createObjectURL(file), data: file });
  };

  const { width: windowWidth } = useWindowDimensions();

  const ContainerClass = file?.length === 0 && `${style.removeContainer}`;
  const handlePlaceOrder = () => cloudinaryUpload(file.data);
  const cloudinaryUpload = async (photo: unknown) => {
    const customerTokenResponse = GetCustomerTokenInLocalStorage();
    const customerTokenCookies: string =
      await GetCustomerTokenInCookiesStorage();
    const getUserData = Cookies.get("user");
    if (getUserData === undefined) {
      alert("Please login before placing order");
      return;
    }
    const userLoggedin = JSON.parse(getUserData).isLoggedIn;
    if (!userLoggedin) {
      dispatch(openLoginPopup());
      return;
    }
    if (
      photo?.type === "image/png" ||
      photo?.type === "image/gif" ||
      photo?.type === "image/jpeg"
    ) {
      setIsProcessing(true);
      const formData = new FormData();
      formData.append("image", photo);
      let cloudinaryURL = "";
      try {
        const authorizationHeader =
          customerTokenResponse !== null
            ? customerTokenResponse || customerTokenCookies
            : undefined;
        const headers: HeadersInit = {
          "X-Authorization": authorizationHeader || "",
        };
        const cloudinaryResponse = await fetch(
          `${BASE_URL_DVAGO_API}/AppAPIV3/UploadImage`,
          {
            method: "post",
            body: formData,
            headers: headers,
          }
        );
        const cloudMessage = await cloudinaryResponse.json();
        cloudinaryURL = cloudMessage?.Message;
      } catch (error) {
        console.log("An Error Occured While Uploading");
      }
      const addInquiryObj: addInquiryObjType = {
        BranchCode: storeData?.selectedStoreCode,
        ProductID: "",
        Type: "Prescription",
        PrescriptionURL: cloudinaryURL,
      };
      await postAddPrescriptionInquiry(addInquiryObj, {
        token:
          customerTokenResponse !== null
            ? customerTokenResponse || customerTokenCookies
            : undefined,
      }).then((response) => {
        setIsProcessing(false);
        toast(`${response?.message}`, {
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
        // mixpanel.track("prescription_uploaded");
        if (typeof window !== "undefined") {
          // window?.webengage?.track("prescription_uploaded");
        }
        setFile({ url: "", data: null });
      });
      setIsProcessing(false);
    } else {
      toast(
        `Image formate is not supported. Please only upload png, jpeg or gif`,
        {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Slide,
          theme: "dark",
        }
      );
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

  const prescriptionToggle = () => {
    setShowPrescription(!showPrescription);
  };

  return (
    <PageWithBanner removeSideSpacing={style.removeSideSpacing}>
      <BreadCrumb
        FourthLink={getText("Prescription")}
        classes="deal-breadcrumb"
      />
      <Grid container>
        <Grid item sm={12} md={6} lg={7} pr={{ md: 3 }}>
          <BoxTitle
            boxTitle={getText("Upload-Prescription")}
            tag="h1"
            classes={style.prescriptionTitle}
          />
          {windowWidth > 767 ? (
            <Typography paragraph={true} className={style.uploadText}>
              {getText("Upload-prescription-Desc")}
            </Typography>
          ) : (
            <Typography paragraph={true} className={style.uploadText}>
              {getText("Please-upload")}
            </Typography>
          )}
          <ul className={style.btnList}>
            <li>
              <div>
                <UploadPresc color="--primary-color-darker" />
                <Typography variant="body2" component="p">
                  {getText("Upload-Prescription")}
                </Typography>
              </div>
            </li>
            <li>
              <div>
                <Notification color="--primary-color-darker" />
                <Typography variant="body2" component="p">
                  {getText("Received-Notification")}
                </Typography>
              </div>
            </li>
            <li>
              <div>
                <DoorDelivery color="--primary-color-darker" />
                <Typography variant="body2" component="p">
                  {getText("Doorstep-Delivery")}
                </Typography>
              </div>
            </li>
          </ul>

          {windowWidth < 767 && (
            <GalleryCamera
              isProcessing={isProcessing}
              handlePlaceOrder={handlePlaceOrder}
              file={file.url}
              handleUploadChange={handleUploadChange}
              setFile={setFile}
              classes={ContainerClass}
            />
          )}

          <div className={`selectBox ${style.selectBox}`}>
            <p
              onClick={prescriptionToggle}
              className={!showPrescription ? style.rotateArrow : ""}
            >
              {getText("Prescription-Guide")}
              <Arrowbottom color="--text-color-grey" opacity={0.5} />
            </p>
            <ul className={!showPrescription ? style.hide : ""}>
              <li>
                <Image
                  fill
                  // src={"/assets/dvago-green-small-logo.svg"}
                  src={"/assets/temp-green-small-logo.png"}
                  alt="radio icon"
                  style={{ marginRight: "5px" }}
                />
                {getText("Upload-clear-image")}
              </li>
              <li>
                <Image
                  fill
                  // src={"/assets/dvago-green-small-logo.svg"}
                  src={"/assets/temp-green-small-logo.png"}
                  alt="radio icon"
                  style={{ marginRight: "5px" }}
                />
                {getText("Doctor-details-required")}
              </li>
              <li>
                <Image
                  fill
                  // src={"/assets/dvago-green-small-logo.svg"}
                  src={"/assets/temp-green-small-logo.png"}
                  alt="radio icon"
                  style={{ marginRight: "5px" }}
                />
                {getText("Date-of-prescription")}
              </li>
              <li>
                <Image
                  fill
                  // src={"/assets/dvago-green-small-logo.svg"}
                  src={"/assets/temp-green-small-logo.png"}
                  alt="radio icon"
                  style={{ marginRight: "5px" }}
                />
                {getText("Patient-details")}
              </li>
              <li>
                <Image
                  fill
                  // src={"/assets/dvago-green-small-logo.svg"}
                  src={"/assets/temp-green-small-logo.png"}
                  alt="radio icon"
                  style={{ marginRight: "5px" }}
                />
                {getText("Dosage-details")}
              </li>
            </ul>
          </div>
        </Grid>
        <Grid item sm={12} md={6} lg={5}>
          {windowWidth > 767 && (
            <GalleryCamera
              isProcessing={isProcessing}
              handlePlaceOrder={handlePlaceOrder}
              file={file.url}
              handleUploadChange={handleUploadChange}
              setFile={setFile}
            />
          )}
        </Grid>
      </Grid>
    </PageWithBanner>
  );
};

export default PrescriptionIndex;
