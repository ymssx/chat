import { ChatSession } from '@/const/common';
import { Message } from '@/const/message';

const MESSAGE_STORE: {
  [hash: string]: { [sessionId: string]: Message[] };
} = {};

export const setMessages = (messages: Message[] = []) => {
  if (messages.length === 0) return;

  const { sessionId, hash } = messages[0];
  if (!MESSAGE_STORE[hash]) {
    MESSAGE_STORE[hash] = {};
  }
  MESSAGE_STORE[hash][sessionId] = messages;
};

export const storeMessages = (messages: Message[] = []) => {
  if (messages.length === 0) return;

  const { sessionId, hash } = messages[0];
  if (!MESSAGE_STORE[hash]) {
    MESSAGE_STORE[hash] = {};
  }
  MESSAGE_STORE[hash][sessionId] = [
    ...(MESSAGE_STORE[hash][sessionId] ?? []),
    ...messages,
  ];
};

export const getMessages = (hash: string, sessionId: string) => {
  if (!MESSAGE_STORE[hash]) {
    return [];
  }
  return MESSAGE_STORE[hash][sessionId] || [];
};
