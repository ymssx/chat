import { getSocket } from '@/server/request';
import { ChatChannel, ChatSession } from '@/const/common';
import { Message } from '@/const/message';
import { storeMessages, getMessages, setMessages } from '@/utils/chat';
import { getUserId } from '@/utils/id';
import { notification } from 'antd';
import { decryptWithPrivateKey, decryptWithSymmetricKey } from '@/utils/secret';
import { getPrivateKey } from '@/utils/user';

export interface ChatState {
  channelMap: { [hash: string]: ChatChannel };
  currentSessionId: string;
  hash: string;
  messages: Message[];
  newMessage: Message;
}

export enum Reducers {
  SetChannelMap = 'set-channel-map',
  AddSession = 'add-session',
  RemoveSession = 'remove-session',
  SetSessionMap = 'set-session-map',
  SetSession = 'set-session',
  SetCurrentSessionId = 'set-current-session-id',
  SetHash = 'set-hash',
  DispatchMessage = 'dispatch-message',
  TakeMessages = 'take-messages',
  SetMessages = 'set-messages',
  AddMessage = 'add-message',
  ChangeMessage = 'change-message',
  SetNewMessage = 'set-new-message',
}

export enum Effects {
  SelectSession = 'select-session',
}

interface EffectTools {
  put: Function;
  call: Function;
  select: Function;
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

const changeMessage = (
  state: ChatState,
  { payload: message }: { payload: Message },
) => {
  const index = state.messages.findIndex(item => item.id === message.id);
  if (index >= 0) {
    state.messages[index] = message;
  }
  return {
    ...state,
    messages: [...state.messages],
  };
};

export default {
  namespace: 'chat',
  state: {
    hash: '*',
    currentSessionId: null,
    messages: [],
    newMessage: null,
    channelMap: {
      ['*']: {
        hash: '*',
        name: '*',
        sessionMap: {},
      },
    },
  },
  reducers: {
    [Reducers.SetChannelMap](
      state: ChatState,
      {
        payload: channelMap,
      }: { payload: { [hash: string]: { id: string; name: string }[] } },
    ) {
      for (const hash in channelMap) {
        const memberList = channelMap[hash];
        state.channelMap[hash].sessionMap = memberList.reduce(
          (map: { [sessionId: string]: ChatSession }, { id, name }) => {
            map[id] = {
              id,
              name,
              lastMessage: '',
              lastTime: '',
              unreadNumber: 0,
              members: [id, getUserId()],
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
        payload: { id, name, hashList },
      }: { payload: { name: string; id: string; hashList: string[] } },
    ) {
      for (const hash of hashList) {
        state.channelMap[hash].sessionMap[id] = {
          id,
          name,
          lastMessage: '',
          lastTime: '',
          unreadNumber: 0,
          members: [id, getUserId()],
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
      const targetSession = state.channelMap[hash]?.sessionMap?.[sessionId];
      if (!targetSession) {
        return state;
      }
      const isCurrentSession =
        state.currentSessionId === sessionId && state.hash === hash;

      if (!isCurrentSession) {
        targetSession.unreadNumber += 1;
      }
      targetSession.lastMessage = content;
      targetSession.lastTime = time;

      if (document.visibilityState !== 'visible') {
        new Notification(content);
      }

      if (isCurrentSession) {
        return updateSession(addMessage(state, { payload: message }), {
          payload: { newSession: targetSession, hash },
        });
      } else {
        if (document.visibilityState === 'visible') {
          new Notification(content);
        }

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
    [Reducers.ChangeMessage]: changeMessage,
    [Reducers.SetHash](
      state: ChatState,
      { payload: hash }: { payload: string },
    ) {
      return { ...state, hash, currentSessionId: null };
    },
    [Reducers.SetNewMessage](
      state: ChatState,
      { payload: message }: { payload: Message },
    ) {
      return { ...state, newMessage: message };
    },
  },
  effects: {
    *[Effects.SelectSession](
      {
        payload: { messages, sessionId, hash },
      }: { payload: { messages: Message[]; sessionId: string; hash: string } },
      { put }: EffectTools,
    ) {
      yield put({
        type: Reducers.SetCurrentSessionId,
        payload: sessionId,
      });

      yield put({
        type: Reducers.TakeMessages,
        payload: { sessionId, hash },
      });

      yield setMessages(messages);

      yield put({
        type: Reducers.SetMessages,
        payload: getMessages(hash, sessionId),
      });
    },
  },
  subscriptions: {
    socket({ dispatch }: { dispatch: Function }) {
      getSocket().then(socket => {
        socket?.on('message', async (res: any) => {
          const message = JSON.parse(res || '{}');
          if (message.content) {
            const sessionKeyMap = JSON.parse(localStorage.getItem('session-key-map') || '{}');
            let symmetricKey = sessionKeyMap[message.sessionId]; // 优先从聊天id - 对称密钥中找密钥
            if (!symmetricKey && message.token) { // 如果没有则根据邀请token在token - 对称密钥中找密钥
              const tokenKeyMap = JSON.parse(localStorage.getItem('token-key-map') || '{}');
              symmetricKey = tokenKeyMap[message.token];
              sessionKeyMap[message.sessionId] = symmetricKey;
              localStorage.setItem('session-key-map', JSON.stringify(sessionKeyMap)); // 存到聊天id - 对称密钥中
            }
            if (symmetricKey) {
              message.content = await decryptWithSymmetricKey(message.content, symmetricKey);
            }
            message.content = await decryptWithPrivateKey(message.content, await getPrivateKey());
          }
          console.log('new message', message);

          storeMessages([message]);

          dispatch({
            type: Reducers.SetNewMessage,
            payload: message,
          });

          dispatch({
            type: Reducers.DispatchMessage,
            payload: message,
          });
        });

        socket?.on('init-channel', (res: any) => {
          const channelMap = JSON.parse(res || '{}');
          console.log('init-channel', channelMap);
          dispatch({
            type: Reducers.SetChannelMap,
            payload: channelMap,
          });
        });

        socket?.on('user-connect', (res: any) => {
          const user = JSON.parse(res || '{}');
          console.log('user-connect', user);
          dispatch({
            type: Reducers.AddSession,
            payload: user,
          });
        });

        socket?.on('user-disconnect', (res: any) => {
          const user = JSON.parse(res || '{}');
          dispatch({
            type: Reducers.RemoveSession,
            payload: user,
          });
        });
      });
    },
  },
};
