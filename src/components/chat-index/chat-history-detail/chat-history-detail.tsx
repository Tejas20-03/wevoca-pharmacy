/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import { NextPage } from "next";
import { GetChatHistoryDetailData } from "@/services/chat/types";
import style from "./chat-history-detail.module.scss";
import Image from "next/image";
import { timeElapsed } from "@/utils/timeelapse";

interface IProps {
  data: GetChatHistoryDetailData[];
}

export const ChatHistoryDetail: NextPage<IProps> = ({ data }) => {
  return (
    <>
      {data && (
        <ul className={style.userChatDetail}>
          {data.map((item, index) => {
            return (
              <React.Fragment key={index}>
                {item?.FromUserId?.toString()?.length === 3 && (
                  <li className={style.question}>
                    <div className={style.modalLogo}>
                      <Image
                        fill
                        // src="/assets/dvago-green-small-logo.svg"
                        src="/assets/temp-green-small-logo.png"
                        alt="logo"
                      />
                    </div>
                    {item?.Type === "image" ? (
                      <div className={`${style.agentChat}`}>
                        <span>{timeElapsed(item?.CreatedAt)}</span>
                        <div className={style.agentChatImage}>
                          <Image fill src={item?.MessageText} alt="logo" />
                        </div>
                      </div>
                    ) : (
                      <div className={style.agentChat}>
                        <span>{timeElapsed(item?.CreatedAt)}</span>
                        <p>{item?.MessageText}</p>
                      </div>
                    )}
                  </li>
                )}
                {item?.FromUserId?.toString()?.length !== 3 && (
                  <li className={style.answer}>
                    <span>{timeElapsed(item?.CreatedAt)}</span>
                    <p>{item?.MessageText}</p>
                  </li>
                )}
              </React.Fragment>
            );
          })}
        </ul>
      )}
    </>
  );
};
