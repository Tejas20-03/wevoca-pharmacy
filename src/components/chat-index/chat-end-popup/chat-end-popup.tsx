/* eslint-disable @typescript-eslint/no-empty-function */
import { NextPage } from 'next';
import style from './chat-end-popup.module.scss';
import GlobalModal from '@/components/global-modal/modal';
import { Box, Typography } from '@mui/material';
import Buttons from '@/components/Button/Buttons';
import { closechatEnd } from '@/redux/chat-end-popup/slice';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';

interface IProps {
  endChatFunc: () => void;
}

export const ChatEndPopup: NextPage<IProps> = ({endChatFunc}) => {
  const { chatEndPopup } = useAppSelector((state) => state.chatEndSlice);
  const dispatch = useAppDispatch();
  return (
    <GlobalModal openSelector={chatEndPopup} closeFunc={() => dispatch(closechatEnd())} containerClass={style.cartContainer} contentClass={style.cartContainerContent} modalBoxClass={style.cartBoxContainer}>
      <Box className={style.gridBox}>
        <Typography>Are you sure you want to end the chat</Typography>
      </Box>
      <Box className={style.gridBox2}>
        <Buttons btnClass="primary btn-half-rounded" btnClickFunction={() => dispatch(closechatEnd())}>
          Cancel
        </Buttons>
        <Buttons btnClass="primary btn-half-rounded" btnClickFunction={endChatFunc}>
          End Chat
        </Buttons>
      </Box>
    </GlobalModal>
  );
};
