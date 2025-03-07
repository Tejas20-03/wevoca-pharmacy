/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import { NextPage } from "next";
import SectionLoader from "@/components/Section-loader/section-loader";
import Image from "next/image";
import style from "./chat-history-list.module.scss";
import ArrowRight from "@/containers/svg-icons/arrow-right";
import Buttons from "@/components/Button/Buttons";
import { GetChatHistoryList_api } from "@/services/chat/types";
import PlusIcon from "@/components/Global-Icon/Plus-icon";
import { timeElapsed } from "@/utils/timeelapse";
import { Typography } from "@mui/material";

interface IProps {
  data: GetChatHistoryList_api | undefined;
  isLoading: boolean;
  error: unknown;
  seeChatHistory: (id: string) => void;
  start: () => void;
}

export const ChatHistoryList: NextPage<IProps> = ({
  data,
  isLoading,
  error,
  seeChatHistory,
  start,
}) => {
  if (isLoading) return <SectionLoader />;
  if (error) return <p>Chat History not found!</p>;
  const chatIDOfNotEnded = data?.Data?.filter((item) =>
    item.EndAt === "" ? item.Id : ""
  );
  const historyList =
    data &&
    data?.Data?.map((chatData) => (
      <li key={chatData?.$id}>
        <div>
          <Image
            fill
            // src={"/assets/dvago-green-small-logo.svg"}
            src={"/assets/temp-green-small-logo.png"}
            alt="radio icon"
            style={{ marginRight: "5px" }}
          />
        </div>
        <div className={style.lastMessageWrapper}>
          <Typography
            dangerouslySetInnerHTML={{ __html: `${chatData?.LastMessage}` }}
          />
          <span>{timeElapsed(chatData?.LastMessageAt)}</span>
        </div>
        {chatData.EndAt === "" ? <div className={style.tag}>Active</div> : ""}
        <div className={style.arrowRight}>
          <ArrowRight color="var(--primary-color)" />
        </div>
        <Buttons
          btnClickFunction={() => seeChatHistory?.(`${chatData?.Id}`)}
        ></Buttons>
      </li>
    ));

  return (
    <>
      <div>
        <ul className={style.chatHistoryList}>{historyList}</ul>
      </div>
      <div className={style.startConversation}>
        <Buttons
          btnClickFunction={() =>
            chatIDOfNotEnded?.[0]?.Id
              ? seeChatHistory?.(`${chatIDOfNotEnded?.[0]?.Id}`)
              : start()
          }
          btnClass="btn primary btn-half-rounded"
        >
          <PlusIcon color="--text-color-alt" /> Start New Conversation
        </Buttons>
      </div>
    </>
  );
};
