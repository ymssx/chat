import socket from '@/server/request';
import { ChatChannel, ChatSession } from '@/const/common';
import { Message } from '@/const/message';
import { storeMessages } from '@/utils/chat';
import { getUserId } from '@/utils/id';

export interface ChatState {
  channelMap: { [hash: string]: ChatChannel };
  currentSessionId: string;
  hash: string;
  messages: Message[];
}

export enum Reducers {
  SetChannelMap = 'set-channel-map',
  AddSession = 'add-session',
  RemoveSession = 'remove-session',
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
        name: 'TEST CHANNEL',
        sessionMap: {},
      },
      ZZZZZ: {
        hash: 'ZZZZZ',
        name: 'TEST CHANNEL 2',
        sessionMap: {},
      },
    },
  },
  reducers: {
    [Reducers.SetChannelMap](
      state: ChatState,
      { payload: channelMap }: { payload: { [hash: string]: string[] } },
    ) {
      for (const hash in channelMap) {
        const memberList = channelMap[hash];
        state.channelMap[hash].sessionMap = memberList.reduce(
          (map: { [sessionId: string]: ChatSession }, userId) => {
            map[userId] = {
              id: userId,
              name: userId,
              lastMessage: '',
              lastTime: '',
              unreadNumber: 0,
              members: [userId, getUserId()],
            };
            return map;
          },
          {},
        );
      }
      return {
        ...state,
        channelMap: { ...state.channelMap },
      };
    },
    [Reducers.AddSession](
      state: ChatState,
      {
        payload: { userId, hashList },
      }: { payload: { userId: string; hashList: string[] } },
    ) {
      for (const hash of hashList) {
        state.channelMap[hash].sessionMap[userId] = {
          id: userId,
          name: userId,
          lastMessage: '',
          lastTime: '',
          unreadNumber: 0,
          members: [userId, getUserId()],
        };
      }
      return {
        ...state,
        channelMap: { ...state.channelMap },
      };
    },
    [Reducers.RemoveSession](
      state: ChatState,
      {
        payload: { userId, hashList },
      }: { payload: { userId: string; hashList: string[] } },
    ) {
      for (const hash of hashList) {
        delete state.channelMap[hash].sessionMap[userId];
      }
      return {
        ...state,
        channelMap: { ...state.channelMap },
      };
    },
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
      const targetSession = state.channelMap[hash].sessionMap[sessionId];
      if (state.currentSessionId !== sessionId) {
        targetSession.unreadNumber += 1;
      }
      targetSession.lastMessage = content;
      targetSession.lastTime = time;

      storeMessages([message]);
      if (sessionId === state.currentSessionId) {
        return updateSession(addMessage(state, { payload: message }), {
          payload: { newSession: targetSession, hash },
        });
      } else {
        return updateSession(state, {
          payload: { newSession: targetSession, hash },
        });
      }
    },
    [Reducers.TakeMessages](
      state: ChatState,
      {
        payload: { hash, sessionId },
      }: { payload: { hash: string; sessionId: string } },
    ) {
      const currentSession = state.channelMap[hash].sessionMap[sessionId];
      currentSession.unreadNumber = 0;

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
    [Reducers.setHash](
      state: ChatState,
      { payload: hash }: { payload: string },
    ) {
      return { ...state, hash, currentSessionId: null };
    },
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

      socket.on('init-channel', (res: any) => {
        const channelMap = JSON.parse(res || '{}');
        dispatch({
          type: Reducers.SetChannelMap,
          payload: channelMap,
        });
      });

      socket.on('user-connect', (res: any) => {
        const user = JSON.parse(res || '{}');
        dispatch({
          type: Reducers.AddSession,
          payload: user,
        });
      });

      socket.on('user-disconnect', (res: any) => {
        const user = JSON.parse(res || '{}');
        dispatch({
          type: Reducers.RemoveSession,
          payload: user,
        });
      });
    },
  },
};
