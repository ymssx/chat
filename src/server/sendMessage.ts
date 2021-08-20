import API from './api';
import { request } from './request';

interface SendMessageProps {
  sessionId: string;
  originId: string;
  content: string;
  hash: string;
}

export const sendMessage = ({
  sessionId,
  originId,
  content,
  hash,
}: SendMessageProps) => {
  const time = String(new Date().getTime());
  return request.post(API.sendMessage, {
    hash,
    sessionId,
    originId,
    content,
    time,
    id: time + origin,
  });
};
