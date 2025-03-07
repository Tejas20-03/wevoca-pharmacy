import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { changeLoginScreen, closeLoginPopup } from "@/redux/Login-popup/slice";
import { Box, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import style from "@/components/Address/Modal/modal-structure.module.scss";
import LoginStyle from "./Login-modal.module.scss";
import Image from "next/image";
import * as Yup from "yup";
import LoginCredentialCard from "./login-credential-card/login-credential-card";
import LoginOtpCard from "./login-otp-card/login-otp-card";
import CloseIcon from "@/containers/svg-icons/close-icon";
export interface formFields {
  name: string;
  phonenumber: string;
  email: string;
}

interface Props {}

const LoginModal: React.FC<Props> = () => {
  const { popup, isOtpScreen } = useAppSelector((state) => state.LoginPopup);
  const dispatch = useAppDispatch();
  const [initialValue, setInitialValue] = useState<formFields>({
    name: "",
    phonenumber: "",
    email: "",
  });
  const validationSchema = Yup.object({
    name: Yup.string().required("This Field is Required"),
    phonenumber: Yup.string()
      .matches(/^(03)([0-9]{9})/g, "Invalid Phone number")
      .required("Phone Number is required")
      .min(11, "Phone number must be 11 digits")
      .max(11, "phone number must be 11 digits"),
  });

  useEffect(() => {
    dispatch(changeLoginScreen(false));
  }, []);
  return (
    <Modal
      open={popup}
      onClose={() => dispatch(closeLoginPopup())}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={style.ModalContainer}
    >
      <Box className={style.modalBox}>
        <div className={style.modalHead}>
          <div className={style.modalLogo}>
            <Image
            //   src="/assets/dvago-green-small-logo.svg"
              src="/assets/temp-green-small-logo.png"
              alt="logo"
              width={74}
              height={73}
            />
          </div>
        </div>
        <div
          className={`${style.modalContent} ${LoginStyle.LoginModalContent}`}
        >
          <button
            className={style.closeBtn}
            onClick={() => dispatch(closeLoginPopup())}
          >
            <CloseIcon color="--text-color" />
          </button>
          {isOtpScreen && (
            <LoginOtpCard
              setInitialValue={setInitialValue}
              initialValue={initialValue}
            />
          )}
          {!isOtpScreen && (
            <LoginCredentialCard
              initialValue={initialValue}
              validationSchema={validationSchema}
              setInitialValue={setInitialValue}
            />
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default LoginModal;
