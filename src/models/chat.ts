import socket from '@/server/request';
import { ChatChannel, ChatSession } from '@/const/common';
import { Message } from '@/const/message';

export interface ChatState {
  channelMap: { [hash: string]: ChatChannel };
  currentSessionId: string;
  hash: string;
  messages: Message[];
}

export enum Reducers {
  SetSessionMap = 'set-session-map',
  SetSession = 'set-session',
  SetCurrentSessionId = 'set-current-session-id',
  setHash = 'set-hash',
  DispatchMessage = 'dispatch-message',
  TakeMessages = 'take-messages',
  SetMessages = 'set-messages',
  AddMessage = 'add-message',
}

const updateSessonMap = (
  state: ChatState,
  {
    payload: { sessionMap, hash },
  }: { payload: { sessionMap: { [id: string]: ChatSession }; hash: string } },
) => {
  state.channelMap[hash] = {
    ...state.channelMap[hash],
    sessionMap,
  };
  return {
    ...state,
    channelMap: { ...state.channelMap },
  };
};

const updateSession = (
  state: ChatState,
  {
    payload: { newSession, hash },
  }: { payload: { newSession: ChatSession; hash: string } },
) => {
  state.channelMap[hash].sessionMap = {
    ...state.channelMap[hash].sessionMap,
    [newSession.id]: newSession,
  };
  return updateSessonMap(state, {
    payload: { sessionMap: state.channelMap[hash].sessionMap, hash },
  });
};

const addMessage = (
  state: ChatState,
  { payload: message }: { payload: Message },
) => {
  return {
    ...state,
    messages: [...state.messages, message],
  };
};

export default {
  namespace: 'chat',
  state: {
    hash: 'KUTKGKJ',
    currentSessionId: null,
    messages: [],
    channelMap: {
      KUTKGKJ: {
        hash: 'KUTKGKJ',
        name: 'TEST HASH',
        sessionMap: {
          asdwewqda1e1: {
            id: 'asdwewqda1e1',
            name: 'Big Group',
            members: [
              '5c3ba48f-8252-4330-9689-71f7876f5279',
              'dqwe',
              'zmsdi',
              'f123',
              'dd82',
              'd9129e',
              'dasd8213',
              'ddii21',
            ],
            lastTime: '2026-12-32',
            lastMessage: 'test message3',
            unreadNumber: 0,
          },
          asdwqe1: {
            id: 'asdwqe1',
            name: 'Group',
            members: ['5c3ba48f-8252-4330-9689-71f7876f5279', 'dqwe', 'zmsdi'],
            lastTime: '2026-12-32',
            lastMessage: 'test message3',
            unreadNumber: 0,
          },
        },
      },
      ZZZZZ: {
        hash: 'ZZZZZ',
        sessionMap: {
          sdewq: {
            id: 'sdewq',
            name: 'Group',
            members: ['5c3ba48f-8252-4330-9689-71f7876f5279', 'dqwe', 'zmsdi'],
            lastTime: '2026-12-32',
            lastMessage: 'test message3',
            unreadNumber: 0,
          },
        },
      },
    },
  },
  reducers: {
    [Reducers.SetSessionMap]: updateSessonMap,
    [Reducers.SetSession]: updateSession,
    [Reducers.SetCurrentSessionId](
      state: ChatState,
      { payload: sessionId }: { payload: string },
    ) {
      return {
        ...state,
        currentSessionId: sessionId,
      };
    },
    [Reducers.DispatchMessage](
      state: ChatState,
      { payload: message }: { payload: Message },
    ) {
      const { sessionId, time, content, hash } = message;
      const currentSession = state.channelMap[hash].sessionMap[sessionId];
      if (state.currentSessionId !== sessionId) {
        currentSession.unreadNumber += 1;
      }
      currentSession.lastMessage = content;
      currentSession.lastTime = time;

      return updateSession(addMessage(state, { payload: message }), {
        payload: { newSession: currentSession, hash },
      });
    },
    [Reducers.TakeMessages](
      state: ChatState,
      {
        payload: { hash, sessionId },
      }: { payload: { hash: string; sessionId: string } },
    ) {
      const currentSession = state.channelMap[hash].sessionMap[sessionId];
      currentSession.unreadNumber = 0;
      console.log(123);

      return updateSession(state, {
        payload: { newSession: currentSession, hash },
      });
    },
    [Reducers.SetMessages](
      state: ChatState,
      { payload: messages }: { payload: Message[] },
    ) {
      return {
        ...state,
        messages,
      };
    },
    [Reducers.AddMessage]: addMessage,
  },
  effects: {},
  subscriptions: {
    socket({ dispatch }: { dispatch: Function }) {
      socket.on('message', (res: any) => {
        const message = JSON.parse(res || '{}');
        console.log('new message', message);
        dispatch({
          type: Reducers.DispatchMessage,
          payload: message,
        });
      });
    },
  },
};
