/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button } from '@mui/material';
import { NextPage } from 'next';
import style from './chat-index.module.scss';
import Cookies from 'js-cookie';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { openLoginPopupOnChat } from '@/redux/Login-popup/slice';
import { GetChatFaq, GetChatMode, GetInitialMessage, GetUserChat, GetUserChatMessage } from '@/services/chat/services';
import { GetCustomerTokenInLocalStorage } from '@/functions/local-storage-methods';
import { GetBotQuestion_apiData, GetBotQuestion_apiData_children, GetChatHistoryDetailData } from '@/services/chat/types';
import ChatIcon from '@/containers/svg-icons/chat-icon';
import { closechatEnd, openchatEnd } from '@/redux/chat-end-popup/slice';
import { useAppSelector } from '@/hooks/use-app-selector';
import { ChatBotIndex } from './chat-bot/chat-bot';
import { FormikHelpers } from 'formik';
import { ChatHistoryList } from './chat-history-list/chat-history-list';
import { useQuery } from '@tanstack/react-query';
import { ChatHistoryDetail } from './chat-history-detail/chat-history-detail';
import { ChatEndPopup } from './chat-end-popup/chat-end-popup';
import { ChatFooter } from './chat-footer/chat-footer';
import { ChatHeader } from './chat-header/chat-header';
import useSignalRConnection from '@/hooks/useChatSignalR';

interface IProps {
  className?: string;
}

export type ChatBotState = Array<{
  question?: GetBotQuestion_apiData[]; // Change selectedAnswer to question
  suchildQuestion?: GetBotQuestion_apiData_children[];
  selectedAnswer?: GetBotQuestion_apiData_children;
  childAnswer?: string;
}>;

export type ChatMessageType = { question: { name: string; message: string; type?: string } } | { answer: { name: string; message: string; type?: string } };

export const ChatIndex: NextPage<IProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const getUserData = Cookies.get('user');
  const { userName, userID } = useAppSelector((state) => state.user);
  const isLoggedIn = getUserData !== undefined ? JSON.parse(getUserData).isLoggedIn : false;
  const userObj = getUserData !== undefined && JSON.parse(getUserData);
  const [openChatBox, setOpenChatBox] = useState(false);
  const [isAgentAvailabe, setIsAgentAvailabe] = useState(false);
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const [chatHistoryDetail2, setChatHistoryDetail] = useState<GetChatHistoryDetailData[] | null>([] | null);
  const userToken = GetCustomerTokenInLocalStorage();

  const classes = useMemo(() => ` ${style.chatContainer} ${className}`, [className]);

  const { connection, broadCastMessage, chatBot, chatMessages, chatMessagesRef, chatStarted, endChat, initialQuestion, screenStack, sendMessage, start, updateChatBot, updateChatMessages, updateInitialQuestion, updateScreenStack } = useSignalRConnection();

  useEffect(() => {
    // Check if the element is available before scrolling
    if (chatMessagesRef.current) {
      chatMessagesRef?.current?.scrollTo(0, chatMessagesRef?.current?.scrollHeight);
    }
  }, [chatMessages]);

  const { data: ChatHistoryData, isLoading, error, refetch } = useQuery([`chatHistory 1`], () => GetUserChat({ token: userToken !== null ? userToken : undefined }, userID));
  const chatBtnClickFunction = async () => {
    if (!isLoggedIn) dispatch(openLoginPopupOnChat());
    else {
      setOpenChatBox?.(true);
      refetch();
      if (ChatHistoryData?.ResponseType === 1) updateScreenStack('list');
      const fetchInitialMessage = await GetInitialMessage({ token: userToken !== null ? userToken : undefined }, userObj?.userID);
      if (fetchInitialMessage?.ResponseType === 1) {
        updateInitialQuestion?.(fetchInitialMessage?.Data[0]?.Question);
        setOpenChatBox?.(!openChatBox);
        const fetchChatMode = await GetChatMode({ token: userToken !== null ? userToken : undefined });
        if (fetchChatMode?.ResponseType === 1) {
          if (fetchChatMode?.Data?.Mode) setIsAgentAvailabe(true);
          else setIsAgentAvailabe(false);
          const fetchChatFaq = await GetChatFaq({ token: userToken !== null ? userToken : undefined });
          if (fetchChatFaq?.ResponseType === 1) updateChatBot?.([{ question: fetchChatFaq.Data }]);
        }
      }
    }
  };
  const chatWithBotNAgent = () => {
    updateScreenStack('');
  };
  const handleAnswerSelection = (selectedAnswer: GetBotQuestion_apiData) => {
    if (selectedAnswer?.HasChildQuestions) {
      const subChildQuestions = selectedAnswer.ChildQuestions;
      updateChatBot?.((prev) => [...prev, { selectedAnswer: selectedAnswer }, { suchildQuestion: subChildQuestions }]);
    } else {
      updateChatBot?.((prev) => [...prev, { selectedAnswer: selectedAnswer }, { childAnswer: selectedAnswer?.Answer }]);
    }
  };
  const openEndChat = () => {
    if (screenStack === 'detail') {
      updateScreenStack('list');
      return;
    } else if (screenStack === 'list') {
      dispatch(closechatEnd());
      setOpenChatBox?.(false);
      setIsAgentAvailabe(false);
      updateChatBot?.(null);
      updateChatMessages?.([]);
      return;
    } else {
      if (chatMessages?.length && chatMessages[chatMessages?.length - 1]?.question?.message !== 'Chat Ended.') {
        dispatch(openchatEnd());
      } else {
        dispatch(closechatEnd());
        setOpenChatBox?.(false);
        setIsAgentAvailabe(false);
        updateChatBot?.(null);
        updateChatMessages?.([]);
      }
    }
  };
  const endChatFunc = () => {
    if (chatMessages[chatMessages?.length - 1]?.question?.message !== 'Chat Ended.') {
      endChat();
      updateChatBot?.(null);
      dispatch(closechatEnd());
    } else {
      setOpenChatBox?.(false);
      setIsAgentAvailabe(false);
      updateChatMessages?.([]);
    }
  };
  const creditCardValue: { chatMessage: string } = {
    chatMessage: '',
  };
  const handleSubmit = (value: { chatMessage: string }, { resetForm }: FormikHelpers<{ chatMessage: string }>) => {
    if (value?.chatMessage?.trim()) {
      sendMessage(value?.chatMessage);
      updateChatMessages?.((prev) => [...prev, { answer: { name: userName, message: value?.chatMessage, type: 'text' } }]);
      resetForm();
    }
  };

  const seeChatHistory = async (id: string) => {
      const fetchChatMode = await GetUserChatMessage({ token: userToken !== null ? userToken : undefined }, id);
      if (fetchChatMode?.ResponseType === 1) {
        setChatHistoryDetail(fetchChatMode?.Data);
        updateScreenStack('detail');
        if(fetchChatMode.Data[fetchChatMode.Data.length - 1].MessageText !== 'Chat Ended.'){
          await start();
        }
      } else {
        setChatHistoryDetail(null);
      }
    };

  const agentChatEnded = chatMessages && chatMessages.some((item) => item?.question?.message === 'Chat Ended.');
  const userChatEnded = chatMessages && chatMessages.some((item) => item?.answer?.message === 'Chat Ended.');

  useEffect(() => {
    if (connection.state === 'Connected') {
      broadCastMessage();
    }
  }, [connection, chatMessages, chatHistoryDetail2]);

  const cloneQuestion = () => {
    setIsLastQuestion(false);
    if (chatBot && chatBot.length > 0) {
      const firstQuestion = chatBot[0]; // Get the first question from chatBot array
      const chatBotLastItem = chatBot.filter((chat) => chat.selectedAnswer);
      const selectedAnswerLastItem = chatBotLastItem[chatBotLastItem.length - 1];
      if (selectedAnswerLastItem?.selectedAnswer?.HasChildQuestions === false) {
        // Append the first question to the previous state
        updateChatBot((prev) => [...prev, { question: firstQuestion.question }]);
      }
    }
  };

  return (
    <>
      <Box className={classes}>
        <div className={`${style.chatBoxWrapper}`}>
          {userObj?.authToken && openChatBox && (
            <div>
              <div className={`${style.chatBoxHeadBody} ${chatStarted && chatMessages[chatMessages?.length - 1]?.question?.message !== 'Chat Ended.' && screenStack === '' && isAgentAvailabe && style.botChatWrapper}`} ref={chatMessagesRef}>
                <ChatHeader ChatHistoryData={ChatHistoryData?.ResponseType === 1 ? ChatHistoryData : undefined} openEndChat={openEndChat} />
                {screenStack === 'list' && <ChatHistoryList start={chatWithBotNAgent} seeChatHistory={seeChatHistory} data={ChatHistoryData} isLoading={isLoading} error={error} />}
                {screenStack === '' && (
                  <div className={style.chatBody}>
                    <ChatBotIndex isLastQuestion={isLastQuestion} setIsLastQuestion={setIsLastQuestion} cloneQuestion={cloneQuestion} initialQuestion={initialQuestion} chatBot={chatBot} chatMessages={chatMessages} handleAnswerSelection={handleAnswerSelection} isAgentAvailabe={isAgentAvailabe} start={start} />
                  </div>
                )}
                <div></div>
                {screenStack === 'detail' && (
                  <div className={style.chatBody}>
                    <ChatHistoryDetail data={chatHistoryDetail2} />
                  </div>
                )}
              </div>
              {chatStarted && chatMessages[chatMessages?.length - 1]?.question?.message !== 'Chat Ended.' && screenStack === '' && isAgentAvailabe && <ChatFooter setChatMessages={updateChatMessages} sendMessage={sendMessage} agentChatEnded={agentChatEnded} creditCardValue={creditCardValue} handleSubmit={handleSubmit} userChatEnded={userChatEnded} />}
              {screenStack === 'detail' && chatHistoryDetail2 && chatHistoryDetail2[chatHistoryDetail2.length - 1]?.MessageText !== 'Chat Ended.' && <ChatFooter setChatMessages={updateChatMessages} sendMessage={sendMessage} agentChatEnded={agentChatEnded} creditCardValue={creditCardValue} handleSubmit={handleSubmit} userChatEnded={userChatEnded} />}
            </div>
          )}
        </div>
        <Button sx={{ p: 0, borderRadius: 50 }} onClick={chatBtnClickFunction} className={style.chatIconWrapper}>
          <ChatIcon />
        </Button>
      </Box>
      <ChatEndPopup endChatFunc={endChatFunc} />
    </>
  );
};
