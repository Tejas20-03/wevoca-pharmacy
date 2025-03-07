import React from "react";
import styles from "./Search-Icon.module.scss";

interface IProps {
  //   color: string;
}

const SendIcon: React.FC<IProps> = () => {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.2346 2.68463C18.6666 1.48963 17.5086 0.331625 16.3136 0.764625L1.70855 6.04663C0.509554 6.48063 0.364554 8.11663 1.46755 8.75563L6.12955 11.4546L10.2926 7.29163C10.4812 7.10947 10.7338 7.00867 10.996 7.01095C11.2582 7.01323 11.509 7.1184 11.6944 7.30381C11.8798 7.48921 11.9849 7.74003 11.9872 8.00222C11.9895 8.26442 11.8887 8.51702 11.7066 8.70563L7.54355 12.8686L10.2436 17.5306C10.8816 18.6336 12.5176 18.4876 12.9516 17.2896L18.2346 2.68463Z"
        fill="#008176"
      />
    </svg>
  );
};

export default SendIcon;
