import { Message } from './message';

export interface ChatUser {
  id: string;
  name: string;
}

export interface ChatSession {
  id: string;
  name: string;
  members: ChatUser['id'][];
  lastMessage: string;
  lastTime: string;
  unreadNumber: number;
  selected?: boolean;
}

export interface ChatChannel {
  hash: string;
  name?: string;
  sessionMap: { [sessionId: string]: ChatSession };
}
