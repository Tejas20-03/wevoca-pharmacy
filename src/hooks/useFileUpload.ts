import { GetCustomerTokenInLocalStorage } from '@/functions/local-storage-methods';
import { BETA_URL_DVAGO_API } from '@/services/config';
import { useState } from 'react';
import { useAppSelector } from './use-app-selector';
import { ChatMessageType } from '@/components/chat-index/chat-index';

export const useFileUpload = (setChatMessages: React.Dispatch<React.SetStateAction<ChatMessageType[]>>, sendMessage: (message: string) => void) => {
  const [file, setFile] = useState<{ url: string; data: File | null }>({ url: '', data: null });

  const userToken = GetCustomerTokenInLocalStorage();
  const { userName } = useAppSelector((state) => state.user);
  
  const handleUploadChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file1 = input.files[0];
    setFile({ url: URL.createObjectURL(file1), data: file1 });
    const formData = new FormData();
    formData.append('image', file1);

    const authorizationHeader = userToken !== null ? userToken : undefined;
    const headers: HeadersInit = {
      'X-Authorization': authorizationHeader || '',
    };
    const UploadChatFile = await fetch(`${BETA_URL_DVAGO_API}/AppAPIV3/UploadChatFile`, {
      method: 'post',
      body: formData,
      headers: headers,
    });
    const postedImage = await UploadChatFile?.json();
    if (postedImage.ResponseType === 1) {
      setChatMessages((prev) => [...prev, { answer: { name: userName, message: postedImage?.Data, type: 'image' } }]);
      sendMessage(postedImage?.Data);
    }
  };

  return { file, handleUploadChange };
};
