import { uuid } from '@/utils/id';
import API from './api';
import { request } from './request';
import { encryptWithPublicKey, encryptWithSymmetricKey } from '@/utils/secret';

interface SendMessageProps {
  sessionId: string;
  originId: string;
  content: string;
  hash: string;
  token?: string;
}

export const sendMessage = async ({
  sessionId,
  originId,
  content,
  hash,
  token = '',
}: SendMessageProps) => {
  const time = String(new Date().getTime());
  let newContent = await encryptWithPublicKey(content, sessionId);
  const symmetricKey = JSON.parse(localStorage.getItem('session-key-map') || '{}')[sessionId];
  if (symmetricKey) {
    newContent = await encryptWithSymmetricKey(newContent, symmetricKey);
  }
  return request.post(API.sendMessage, {
    hash,
    sessionId,
    originId,
    content: newContent,
    time,
    id: uuid(),
    token,
  });
};
