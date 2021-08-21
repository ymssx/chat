import { ChatSession } from '@/const/common';
import { Message } from '@/const/message';

const mockUserList = [
  { id: '5c3ba48f-8252-4330-9689-71f7876f5279', name: 'YAMI' },
  { id: 'sadas', name: 'XMG' },
  { id: 'dqwe', name: 'Roobot' },
  { id: 'zmsdi', name: 'DEMO' },
];

const mockData: { [id: string]: Message[] } = {
  asdwqe1: [
    {
      id: '123123',
      hash: 'KUTKGKJ',
      time: '1996-09-23',
      sessionId: 'asdwqe1',
      originId: 'sadas',
      content: 'Hello~',
    },
    {
      id: 'e123123',
      hash: 'KUTKGKJ',
      time: '1996-09-23',
      sessionId: 'asdwqe1',
      originId: '5c3ba48f-8252-4330-9689-71f7876f5279',
      content: 'How are you?',
    },
    {
      id: 'e123e12123',
      hash: 'KUTKGKJ',
      time: '1996-09-23',
      sessionId: 'asdwqe1',
      originId: 'sadas',
      content:
        'Early in the day it was whispered that we should sail in a boat, only thou and I, and never a soul in the world would know of this our pilgrimage to no country and to no end.',
    },
    {
      id: 'e1231dddd23',
      hash: 'KUTKGKJ',
      time: '1996-09-23',
      sessionId: 'asdwqe1',
      originId: '5c3ba48f-8252-4330-9689-71f7876f5279',
      content:
        'The time that my journey takes is long and the way of it long.I came out on the chariot of the first gleam of light, and pursued my voyage through the wildernesses of worlds leaving my track on many a star and planet.',
    },
    {
      id: 'e12zdd23',
      hash: 'KUTKGKJ',
      time: '1996-09-23',
      sessionId: 'asdwqe1',
      originId: '5c3ba48f-8252-4330-9689-71f7876f5279',
      content: '用户更关心的是对方的发言',
    },
    {
      id: 'e12zdd13',
      hash: 'KUTKGKJ',
      time: '1996-09-23',
      sessionId: 'asdwqe1',
      originId: '5c3ba48f-8252-4330-9689-71f7876f5279',
      content: '所以我的气泡是白色，对方是彩色',
    },
  ],
  asdwqsdae1: [
    {
      id: 'dqwe1eqw23',
      hash: 'KUTKGKJ',
      time: '1996-09-23',
      sessionId: 'asdwqsdae1',
      originId: 'sadas',
      content: '上线！',
    },
    {
      id: '321dq321',
      hash: 'KUTKGKJ',
      time: '1996-09-23',
      sessionId: 'asdwqsdae1',
      originId: 'sadas',
      content: '五黑五缺一',
    },
    {
      id: 'dq3213',
      hash: 'KUTKGKJ',
      time: '1996-09-23',
      sessionId: 'asdwqsdae1',
      originId: '5c3ba48f-8252-4330-9689-71f7876f5279',
      content: '不去，我要学习呢',
    },
  ],
  asdwewqda1e1: [
    {
      id: 'dqwe1eqw23',
      hash: 'KUTKGKJ',
      time: '1996-09-23',
      sessionId: 'asdwewqda1e1',
      originId: 'sadas',
      content: '只有在有必要时才会展现头像',
    },
    {
      id: 'dq32ddd13',
      hash: 'KUTKGKJ',
      time: '1996-09-23',
      sessionId: 'asdwewqda1e1',
      originId: '5c3ba48f-8252-4330-9689-71f7876f5279',
      content: '自己发言没有必要展示头像',
    },
    {
      id: '321dq321',
      hash: 'KUTKGKJ',
      time: '1996-09-23',
      sessionId: 'asdwewqda1e1',
      originId: 'dqwe',
      content: '每个发言者都有不同色彩的气泡',
    },
    {
      id: 'dq3213',
      hash: 'KUTKGKJ',
      time: '1996-09-23',
      sessionId: 'asdwewqda1e1',
      originId: '5c3ba48f-8252-4330-9689-71f7876f5279',
      content: '自己的发言为白色',
    },
    {
      id: 'Ad2dasd',
      hash: 'KUTKGKJ',
      time: '1996-09-23',
      sessionId: 'asdwewqda1e1',
      originId: 'f123',
      content: '111111',
    },
    {
      id: 'B32fd213',
      hash: 'KUTKGKJ',
      time: '1996-09-23',
      sessionId: 'asdwewqda1e1',
      originId: 'dd82',
      content: '222222',
    },
    {
      id: 'dasdase12',
      hash: 'KUTKGKJ',
      time: '1996-09-23',
      sessionId: 'asdwewqda1e1',
      originId: 'dqwe',
      content: '打乱队形',
    },
    {
      id: 'Cdddd211',
      hash: 'KUTKGKJ',
      time: '1996-09-23',
      sessionId: 'asdwewqda1e1',
      originId: 'dasd8213',
      content: '3333',
    },
    {
      id: 'D3332121',
      hash: 'KUTKGKJ',
      time: '1996-09-23',
      sessionId: 'asdwewqda1e1',
      originId: 'ddii21',
      content: '44444',
    },
  ],
};

export const getHistoryMessage = (sesssionId: string): Message[] => {
  return mockData[sesssionId] || [];
};

export const getChatSessions = (): ChatSession[] => {
  return [
    {
      id: 'asdwqe1',
      name: 'XMG',
      members: ['5c3ba48f-8252-4330-9689-71f7876f5279', 'sadas'],
      lastTime: '1996-12-32',
      lastMessage: 'test message',
      unreadNumber: 0,
    },
    {
      id: 'asdwqsdae1',
      name: 'Robot',
      members: ['5c3ba48f-8252-4330-9689-71f7876f5279', 'dqwe'],
      lastTime: '2026-12-32',
      lastMessage: 'test message2',
      unreadNumber: 0,
    },
    {
      id: 'awqda1e1',
      name: 'SELF',
      members: [
        '5c3ba48f-8252-4330-9689-71f7876f5279',
        '5c3ba48f-8252-4330-9689-71f7876f5279',
      ],
      lastTime: '2026-12-32',
      lastMessage: 'test message3',
      unreadNumber: 0,
    },
    {
      id: 'asdwewqda1e1',
      name: 'Group',
      members: ['5c3ba48f-8252-4330-9689-71f7876f5279', 'dqwe', 'zmsdi'],
      lastTime: '2026-12-32',
      lastMessage: 'test message3',
      unreadNumber: 0,
    },
    {
      id: 'zzzzzz',
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
  ];
};

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
