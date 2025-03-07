import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { openStorePopup } from "@/redux/Store-popup/slice";
import { GetBranch_ResponseDataType } from "@/services/stores/types";
import { Link, Typography } from "@mui/material";
import React from "react";
import style from "./StoreCardItem.module.scss";

interface IProps {
  data: GetBranch_ResponseDataType;
  setBranchCode: React.Dispatch<React.SetStateAction<string>>;
}

const StoreCardItem: React.FC<IProps> = ({ data, setBranchCode }) => {
  const dispatch = useAppDispatch();
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    const branchCode = (event.target as HTMLElement).getAttribute(
      "data-id"
    ) as string;
    setBranchCode(branchCode);
    dispatch(openStorePopup());
  };
  return (
    <>
      <li className={style.storeCardWrapper}>
        <div className={style.cardImg}>
          <button data-id={data?.BranchCode} onClick={handleOpen}>
            <img
              className={!data?.BranchImage ? style.dvagoLogo : ""}
              src={data?.BranchImage || "/assets/temp-green-small-logo.png"}
              alt={`${data.Title} store image`}
              onError={(e) => {
                e.currentTarget.src = "/assets/temp-green-small-logo.png";
              }}
            />
          </button>
        </div>
        <div className={style.cardContent}>
          <Typography className={style.title} variant="h6" component="h2">
            <button data-id={data?.BranchCode} onClick={handleOpen}>
              {data.Title}
            </button>
          </Typography>
          <Typography className={style.address} paragraph={true}>
            {data.Description}
          </Typography>
          {/* <Buttons btnClass='primary btn-rounded'>Get Directions</Buttons> */}
          <Link
            prefetch={false}
            className="btn primary btn-rounded"
            href={`https://maps.google.com/?q=${data.Latitude},${data.Longitude}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Directions
          </Link>
        </div>
      </li>
    </>
  );
};

export default StoreCardItem;
