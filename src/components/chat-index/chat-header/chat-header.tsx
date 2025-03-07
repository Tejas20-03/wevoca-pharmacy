/* eslint-disable @typescript-eslint/no-empty-function */
import { NextPage } from 'next';
import style from './chat-header.module.scss';
import Buttons from '@/components/Button/Buttons';
import ArrowLeft from '@/containers/svg-icons/arrow-left';
import { Typography } from '@mui/material';
import { GetChatHistoryList_api } from '@/services/chat/types';
import CloseIcon from '@/containers/svg-icons/close-icon';

interface IProps {
  ChatHistoryData: GetChatHistoryList_api | undefined;
  openEndChat: () => void;
}

export const ChatHeader: NextPage<IProps> = ({ ChatHistoryData, openEndChat }) => {
  return (
    <div className={`${style.chatHead} ${ChatHistoryData ? style.chatHistoryListHead : ''}`}>
      <Buttons btnClickFunction={() => openEndChat()}>
        <ArrowLeft />
      </Buttons>
      <Typography variant="body1" component="p">
        Chat
      </Typography>
      <Buttons btnClickFunction={() => openEndChat()}>
        <CloseIcon color="--text-color" />
      </Buttons>
    </div>
  );
};
