/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { NextPage } from 'next';
import style from './chat-index.module.scss';
import BotWellnessIcon from '@/containers/svg-icons/bot-wellness-icon';
import { GetBotQuestion_apiData } from '@/services/chat/types';
import Buttons from '@/components/Button/Buttons';
import SectionLoader from '@/components/Section-loader/section-loader';
import Image from 'next/image';
import { ChatBotState, ChatMessageType } from '@/components/chat-index/chat-index';
import useSignalRConnection from '@/hooks/useChatSignalR';

interface IProps {
  handleAnswerSelection: (selectedAnswer: GetBotQuestion_apiData) => void;
  isAgentAvailabe: boolean;
  start: () => void;
  chatBot: ChatBotState | null;
  chatMessages: ChatMessageType[];
  initialQuestion?: string;
  cloneQuestion: () => void;
  setIsLastQuestion: React.Dispatch<React.SetStateAction<boolean>>;
  isLastQuestion: boolean;
}

export const ChatBotIndex: NextPage<IProps> = ({ isLastQuestion, setIsLastQuestion, cloneQuestion, initialQuestion, chatBot, chatMessages, handleAnswerSelection, isAgentAvailabe, start }) => {
  const date = new Date();
  useEffect(() => {
    const chatBotLastItem = chatBot?.filter((chat) => chat.selectedAnswer);
    const chatBotLastQuestion = chatBot?.[chatBot?.length - 1];
    const selectedAnswerLastItem = chatBotLastItem?.[chatBotLastItem?.length - 1];
    if (selectedAnswerLastItem?.selectedAnswer?.HasChildQuestions === false && !chatBotLastQuestion?.question?.length) {
      setIsLastQuestion(true);
    } else {
      setIsLastQuestion(false);
    }
  }, [chatBot, isLastQuestion]);

  return (
    <>
      <div className={style.botWellnessBox}>
        <div className={style.botWellnessBoxHead}>
          <BotWellnessIcon />
        </div>
        <div className={style.botWellnessBoxBody}>
          <Typography component="p" variant="body1">
            Wellness Bot
          </Typography>
        </div>
      </div>
      {initialQuestion && (
        <ul className={`${style.userChatDetail} ${style.initialQuestionMessage}`}>
          <li className={style.question}>
            <div className={style.modalLogo}>
              {/* <Image fill src="/assets/dvago-green-small-logo.svg" alt="logo" /> */}
              <Image fill src="/assets/temp-green-small-logo.png" alt="logo" />
            </div>
            <div className={style.agentChat}>
              <span className={style.timing}>{`${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')} ${date.getHours() >= 12 ? 'PM' : 'AM'}`}</span>
              <span>{initialQuestion}</span>
            </div>
          </li>
        </ul>
      )}
      {chatBot && chatBot?.length > 0 ? (
        <div className={style.botChatDetail}>
          {chatBot.map((item, index) => (
            <React.Fragment key={index}>
              {item?.question &&
                item?.question
                  ?.filter((item) => item?.$id)
                  ?.map((questionList) => (
                    <Buttons key={questionList?.Id} btnClass={`primary btn-half-rounded ${style.question}`} btnClickFunction={() => handleAnswerSelection(questionList)}>
                      <Typography variant="body1" component="p">
                        {questionList?.Question}
                      </Typography>
                    </Buttons>
                  ))}
              {item?.selectedAnswer?.Question && (
                <div className={style.answer}>
                  <span>{item?.selectedAnswer?.Question}</span>
                </div>
              )}
              {item?.suchildQuestion
                ? item?.suchildQuestion
                    ?.filter((item) => item?.$id)
                    .map((questionList) => (
                      <Buttons key={questionList?.Id} btnClass={`primary btn-half-rounded ${style.question}`} btnClickFunction={() => handleAnswerSelection(questionList)}>
                        <Typography variant="body1" component="p">
                          {questionList?.Question}
                        </Typography>
                      </Buttons>
                    ))
                : null}
              {item?.childAnswer ? (
                <ul className={`${style.userChatDetail} ${style.initialQuestionMessage}`}>
                  <li className={style.question}>
                    <div className={style.modalLogo}>
                      {/* <Image fill src="/assets/dvago-green-small-logo.svg" alt="logo" /> */}
                      <Image fill src="/assets/temp-green-small-logo.png" alt="logo" />
                    </div>
                    <div className={style.agentChat}>
                      <Typography className={style.chatBotChildQuestion} variant="body1" component="div" dangerouslySetInnerHTML={{ __html: `${item?.childAnswer}` }}></Typography>
                    </div>
                  </li>
                </ul>
              ) : null}
            </React.Fragment>
          ))}
        </div>
      ) : chatBot === null ? (
        ''
      ) : (
        <SectionLoader />
      )}

      {isAgentAvailabe && chatBot?.length !== 0 && chatBot !== null ? (
        <div className={`${style.botChatDetail} ${chatBot === null ? '' : style.chatWrapper}`}>
          <Buttons btnClass={`primary btn-half-rounded ${style.chatWithAgent}`} btnClickFunction={start}>
            <Typography variant="body1" component="p">
              Chat with Agent
            </Typography>
          </Buttons>
        </div>
      ) : (
        ''
      )}
      <div className={style.botChatDetail} style={{ marginTop: '0' }}>
        {isLastQuestion && (
          <Buttons btnClass={`primary btn-half-rounded ${style.question}`} btnClickFunction={cloneQuestion}>
            <Typography variant="body1" component="p">
              Go to main Menu
            </Typography>
          </Buttons>
        )}
      </div>
      {chatMessages && (
        <ul className={style.userChatDetail}>
          {chatMessages.map((item, index) => {
            return (
              <React.Fragment key={index}>
                {/* Render chat messages if the message is not "Chat Ended." */}
                {item?.question?.message !== 'Chat Ended.' && item?.question?.message && (
                  <li className={style.question}>
                    <div className={style.modalLogo}>
                      {/* <Image fill src="/assets/dvago-green-small-logo.svg" alt="logo" /> */}
                      <Image fill src="/assets/temp-green-small-logo.png" alt="logo" />
                    </div>
                    <div className={style.agentChat}>
                      <span>{item?.question?.name}</span>
                      {item?.question?.type === 'image' ? (
                        <div className={style.agentChatImage}>
                          <Image fill src={item?.question?.message} alt="chat uploaded image" />
                        </div>
                      ) : (
                        <span dangerouslySetInnerHTML={{ __html: `${item?.question?.message}` }}></span>
                      )}
                    </div>
                  </li>
                )}
                {item?.answer && item?.answer?.type === 'text' && (
                  <li className={style.answer}>
                    <span className={style.timing}>{`${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')} ${date.getHours() >= 12 ? 'PM' : 'AM'}`}</span>
                    <span>{item?.answer?.message}</span>
                  </li>
                )}
                {item?.answer && item?.answer?.type === 'image' && (
                  <li className={style.answer}>
                    <div className={`${style.agentChat}`}>
                      <div className={style.agentChatImage}>
                        <Image fill src={item?.answer?.message} alt="chat uploaded image" />
                      </div>
                    </div>
                  </li>
                )}
                {item?.question?.message === 'Chat Ended.' && (
                  <li className={style.chatEnded}>
                    <div className={style.agentChat}>
                      <span>{item?.question?.message}</span>
                    </div>
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
