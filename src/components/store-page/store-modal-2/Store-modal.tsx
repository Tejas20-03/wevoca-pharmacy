import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { closeStorePopup } from "@/redux/Store-popup/slice";
import { getBranch } from "@/services/stores/services";
import { GetBranch_ResponseDataType } from "@/services/stores/types";
import { Box, Typography } from "@mui/material";

import React, { useEffect, useState } from "react";
import style from "./store-modal.module.scss";
import SectionLoader from "@/components/Section-loader/section-loader";
import Link from "next/link";

import dynamic from "next/dynamic";
import Image from "next/image";
const GlobalModal = dynamic(() => import("@/components/global-modal/modal"));

interface IProps {
  branchCodeProp: string;
}

const StoreModal: React.FC<IProps> = ({ branchCodeProp }) => {
  const [storeDetail, setStoreDetail] = useState(
    {} as GetBranch_ResponseDataType | null
  );
  const [isLoading, setIsLoading] = useState(true);
  const { popup } = useAppSelector((state) => state.StorePopup);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getBranch(branchCodeProp, { token: "" }).then((res) => {
      if (res?.Data?.length) {
        setStoreDetail(res?.Data[0]);
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }
    });
    return () => setStoreDetail(null);
  }, [branchCodeProp]);
  return (
    <GlobalModal
      openSelector={popup}
      closeFunc={() => dispatch(closeStorePopup())}
      containerClass={style.storeModalContainer}
      contentClass={style.storeModalContent}
    >
      {isLoading ? (
        <div className={style.popupLoader}>
          <SectionLoader />
        </div>
      ) : (
        <>
          <div
            className={style.storeModalImgWrapper}
            style={{ position: "relative", width: "280px", height: "308px" }}
          >
            {storeDetail?.BranchImage ? (
              <Image
                quality={50}
                sizes="(min-width: 1920px) 280px, (min-width: 1720px) 280px, (min-width: 1460px) 280px, (min-width: 1220px) 280px, (min-width: 960px) 280px, (min-width: 760px) 260px, (min-width: 600px) 260px, (min-width: 520px) 260px, (min-width: 440px) 260px, 243px"
                fill
                src={storeDetail.BranchImage}
                alt="store images"
              />
            ) : (
              <Image
                quality={50}
                sizes="(min-width: 1920px) 280px, (min-width: 1720px) 280px, (min-width: 1460px) 280px, (min-width: 1220px) 280px, (min-width: 960px) 280px, (min-width: 760px) 260px, (min-width: 600px) 260px, (min-width: 520px) 260px, (min-width: 440px) 260px, 243px"
                fill
                // src="/assets/dvago-green-small-logo.svg"
                src="/assets/temp-green-small-logo.png"
                alt="store images"
              />
            )}
          </div>
          <div className={style.storeModalContentWrapper}>
            <Typography className={style.title} variant="h3" component="h1">
              {storeDetail?.Title}
            </Typography>
            <Link
              prefetch={false}
              target="_blank"
              href={`https://maps.google.com/?q=${storeDetail?.Latitude},${storeDetail?.Longitude}`}
              className="btn primary btn-rounded"
            >
              get directions
            </Link>
            <Box className={style.contact}>
              <Image
                quality={50}
                sizes="21px"
                width={21}
                height={21}
                src="/assets/phone-icon.svg"
                alt="store images"
              />
              <a href={`tel:${storeDetail?.Phone}`}>{storeDetail?.Phone}</a>
            </Box>

            <Box className={style.storeTiming}>
              <Typography
                className={style.storeTitle}
                variant="body1"
                component="h6"
              >
                Store Timings
              </Typography>

              <Typography className={style.timing}>
                Monday-Sunday: 24/7
              </Typography>
            </Box>
          </div>
        </>
      )}
    </GlobalModal>
  );
};

export default StoreModal;
