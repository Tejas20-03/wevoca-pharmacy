// import { useEffect } from 'react';

import { GetCustomerTokenInLocalStorage } from '@/functions/local-storage-methods';
import { HttpTransportType, HubConnectionBuilder, JsonHubProtocol, LogLevel } from '@microsoft/signalr';
import { useAppSelector } from './use-app-selector';
import { useEffect, useRef, useState } from 'react';
import { ChatBotState, ChatMessageType } from '@/components/chat-index/chat-index';

const useSignalRConnection = () => {
  const [chatStarted, setChatStarted] = useState<boolean>(false);
  const [screenStack, setScreenStack] = useState<string>('');
  const [initialQuestion, setInitialQuestion] = useState<string | undefined>('');
  const [chatBot, setChatBot] = useState<ChatBotState | null>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessageType[]>([]);
  const [chatId, setChatId] = useState<string>('');
  const { phoneNum, userName } = useAppSelector((state) => state.user);
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const userToken = GetCustomerTokenInLocalStorage();
  const connection = new HubConnectionBuilder()
    .withUrl(``, {
      transport: HttpTransportType.WebSockets,
      withCredentials: true,
      skipNegotiation: true,
    })
    .withHubProtocol(new JsonHubProtocol())
    .withAutomaticReconnect()
    .configureLogging(LogLevel.Information)
    .withKeepAliveInterval(100)
    .withStatefulReconnect()
    .build();

  async function start() {
    console.log('connection is building')
    try {
      await connection.start();
      await createChat(`${phoneNum}`);
      broadCastMessage();
      setChatBot(null);
      setScreenStack('');
      setInitialQuestion('');
      setChatStarted(true);
    } catch (err) {
      console.log(err);
    }
  }

  connection.on('disconnected', async (error) => {
    console.error('Connection Disconnected:', error);
    try {
      await start();
    } catch (err) {
      console.error('Error reconnecting:', err);
    }
  });
  const createChat = async (message: string) => {
    try {
      const response = await connection.invoke('CreateChat', message);
      setChatId(`${JSON.parse(response).chatId}`);
    } catch (err) {
      console.error('Error creating chat:', err);
    }
  };

  const sendMessage = async (message: string) => {
    if (connection.state === 'Disconnected') await connection.start();
    try {
      await connection.send('SendMessage', chatId, message);
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  const endChat = async () => {
    if (connection.state === 'Disconnected') await connection.start();
    try {
      await connection.send('EndChat', chatId);
      setChatMessages((prev) => [...prev, { question: { name: userName, message: 'Chat Ended.' } }]);
      setChatStarted(false);
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };
  const broadCastMessage = async () => {
    if (connection.state === 'Disconnected') await connection.start();
    try {
      connection.on('broadcastmessagetouser', (chatId, username, message, type) => {
        setChatMessages((prev) => [...prev, { question: { name: username, message: message, type } }]);
        scrollToBottom();
      });
      // connection.on('notifyuserchatstarted', (chatId, userName, message) => {

      // })
    } catch (err) {
      console.error('Error Receiving message:', err);
    }
  };

  const scrollToBottom = (plusVal = 0) => {
    if (chatMessagesRef.current) {
      const scrollHeight = chatMessagesRef.current.scrollHeight;
      const clientHeight = chatMessagesRef.current.clientHeight;
      const extraSpace = 25; // Adjust this value as needed
      chatMessagesRef.current.scrollTo({
        top: scrollHeight - clientHeight + extraSpace + plusVal,
        behavior: 'smooth',
      });
    }
  };
  

  // Define functions to modify state
  const updateScreenStack = (value: string) => setScreenStack(value);
  const updateInitialQuestion = (value: string | undefined) => setInitialQuestion(value);
  const updateChatBot = (value: ChatBotState | null) => {
    setChatBot(value)
    scrollToBottom();
  };
  const updateChatMessages = (value: ChatMessageType[]) => setChatMessages(value);

  useEffect(() => {
    if (chatBot && chatBot.length > 0) {
      scrollToBottom(25);
    }
  }, [chatBot]);
  
  return {
    connection,
    chatStarted,
    screenStack,
    initialQuestion,
    chatBot,
    chatMessages,
    chatMessagesRef,
    start,
    sendMessage,
    endChat,
    broadCastMessage,
    updateScreenStack,
    updateInitialQuestion,
    updateChatBot,
    updateChatMessages,
  };
};

export default useSignalRConnection;
