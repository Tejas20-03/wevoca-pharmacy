import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { Box, Modal } from "@mui/material";
import React from "react";
import style from "./modal.module.scss";
import Image from "next/image";
import CloseIcon from "@/containers/svg-icons/close-icon";

interface IProps {
  openSelector?: boolean;
  closeFunc?: Function;
  children: React.ReactNode;
  contentClass?: string;
  containerClass?: string;
  modalBoxClass?: string;
  modalHeadClass?: string;
  closeBtnClass?: string;
}

const GlobalModal: React.FC<IProps> = ({
  openSelector,
  closeFunc,
  children,
  contentClass,
  containerClass,
  modalBoxClass,
  modalHeadClass,
  closeBtnClass,
}) => {
  const dispatch = useAppDispatch();
  return (
    <Modal
      open={openSelector !== undefined && openSelector}
      onClose={() => closeFunc?.() !== undefined && dispatch(closeFunc())}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={`${style.ModalContainer} ${containerClass}`}
    >
      <Box className={`${style.modalBox} ${modalBoxClass}`}>
        <div className={`${style.modalHead} ${modalHeadClass}`}>
          <div className={style.modalLogo}>
            {/* <Image fill src="/assets/dvago-green-small-logo.svg" alt="logo" /> */}
            <Image fill src="/assets/temp-green-small-logo.png" alt="logo" />
          </div>
        </div>
        <div className={`${style.modalContent} ${contentClass}`}>
          <button
            onClick={() => closeFunc?.() !== undefined && dispatch(closeFunc())}
            className={`${style.closeBtn} ${
              closeBtnClass !== undefined ? closeBtnClass : ""
            } close-alert`}
          >
            <CloseIcon color="--text-color" />
          </button>
          {children}
        </div>
      </Box>
    </Modal>
  );
};

export default GlobalModal;
