import React from 'react';
import { NextPage } from 'next';
import style from './chat-footer.module.scss';
import Buttons from '@/components/Button/Buttons';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import SendIcon from '@/components/Global-Icon/Send-Icon';
import Camera from '@/containers/svg-icons/camera';
import { useFileUpload } from '@/hooks/useFileUpload'; // Import the custom hook
import { ChatMessageType } from '@/components/chat-index/chat-index';

interface IProps {
  agentChatEnded: boolean;
  userChatEnded: boolean;
  creditCardValue: {
    chatMessage: string;
  };
  handleSubmit: (value: { chatMessage: string }, { resetForm }: FormikHelpers<{ chatMessage: string }>) => void;
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessageType[]>>;
  sendMessage: (message: string) => void;
}

export const ChatFooter: NextPage<IProps> = ({
  agentChatEnded,
  userChatEnded,
  creditCardValue,
  handleSubmit,
  setChatMessages,
  sendMessage,
}) => {
  const { handleUploadChange } = useFileUpload(setChatMessages, sendMessage);

  return (
    <div className={style.chatFooter}>
      <Formik initialValues={creditCardValue} onSubmit={handleSubmit}>
        {() => (
          <Form>
            <Field id="chatMessage" name="chatMessage" placeholder="Write your message" disabled={agentChatEnded || userChatEnded} />
            <Buttons types="submit">
              <SendIcon />
            </Buttons>
          </Form>
        )}
      </Formik>
      <div className={style.gallaryIcon}>
        <input type="file" accept="image/png, image/jpeg" onChange={handleUploadChange} />
        <Camera size={32} color="--primary-color" />
      </div>
    </div>
  );
};
