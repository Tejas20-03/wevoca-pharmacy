import { Box, Typography } from "@mui/material";
import React, { ChangeEventHandler } from "react";
import CartBoxContainer from "@/components/cart/cart-box-container/cart-box-container";
import GalleryIcon from "@/components/Global-Icon/gallery-icon";
import style from "./galleryCamera.module.scss";
import Image from "next/image";
import Buttons from "@/components/Button/Buttons";
import { useLanguage } from "@/language-context/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { GetTranslatedData } from "@/services/footer/services";
import Cookies from "js-cookie";

interface IProps {
  file?: string | undefined;
  handleUploadChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  handlePlaceOrder: () => void;
  isProcessing: boolean;
  setFile: ({}: Object) => void | undefined;
  classes?: string | boolean | undefined;
}

const GalleryCamera: React.FC<IProps> = ({
  file,
  isProcessing,
  handleUploadChange,
  handlePlaceOrder,
  classes,
  setFile,
}) => {
  const containerClass = `${style.gallerySec} ${
    typeof classes === "string" ? classes : ""
  }`;

  const removeFile = () => {
    setFile({ url: "", data: null });
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
    <>
      <CartBoxContainer classes={containerClass}>
        {file?.length === 0 ? (
          <>
            <Box className={style.btnGroup}>
              <button>
                <GalleryIcon color="--primary-color" />
                <Typography variant="body1" component="p">
                  {getText("Gallery")}
                </Typography>
                <input
                  type="file"
                  accept="image/png, image/gif, image/jpeg"
                  onChange={handleUploadChange}
                />
              </button>
            </Box>
            <Typography variant="body1" component="p">
              <strong>{getText("Note")}:</strong> {getText("Always-upload")}
            </Typography>
          </>
        ) : (
          <>
            {file && (
              <Image
                width={0}
                height={0}
                src={file && file.toString()}
                alt="uploaded Prescription"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            )}
          </>
        )}
      </CartBoxContainer>
      {file && file?.length > 0 && (
        <div className={style.uploadingBtns}>
          {isProcessing && <p>Uploading your prescription...</p>}
          {!isProcessing && (
            <>
              <div className={style.changeRemoveBtn}>
                <Buttons btnClass={`primary btn-half-rounded`}>
                  Change
                  <input
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
                    onChange={handleUploadChange}
                  />
                </Buttons>
                <Buttons
                  btnClass={`primary btn-half-rounded`}
                  btnClickFunction={removeFile}
                >
                  Remove
                </Buttons>
              </div>
              <Buttons
                btnClickFunction={handlePlaceOrder}
                btnClass={`primary btn-half-rounded`}
              >
                Place Order
              </Buttons>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default GalleryCamera;
