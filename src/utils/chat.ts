import { ChatSession } from '@/const/common';
import { Message } from '@/const/message';

const mockUserList = [
  { id: 'ewqeqw', name: 'YAMI' },
  { id: 'sadas', name: 'XMG' },
  { id: 'dqwe', name: 'Roobot' },
  { id: 'zmsdi', name: 'DEMO' },
];

const mockData: { [id: string]: Message[] } = {
  asdwqe1: [
    {
      id: '123123',
      time: '1996-09-23',
      target: 'asdwqe1',
      origin: 'sadas',
      content: 'Hello~',
    },
    {
      id: 'e123123',
      time: '1996-09-23',
      target: 'asdwqe1',
      origin: 'ewqeqw',
      content: 'How are you?',
    },
    {
      id: 'e123e12123',
      time: '1996-09-23',
      target: 'asdwqe1',
      origin: 'sadas',
      content:
        'Early in the day it was whispered that we should sail in a boat, only thou and I, and never a soul in the world would know of this our pilgrimage to no country and to no end.',
    },
    {
      id: 'e1231dddd23',
      time: '1996-09-23',
      target: 'asdwqe1',
      origin: 'ewqeqw',
      content:
        'The time that my journey takes is long and the way of it long.I came out on the chariot of the first gleam of light, and pursued my voyage through the wildernesses of worlds leaving my track on many a star and planet.',
    },
  ],
  asdwqsdae1: [
    {
      id: 'dqwe1eqw23',
      time: '1996-09-23',
      target: 'asdwqsdae1',
      origin: 'sadas',
      content: '上线！',
    },
    {
      id: '321dq321',
      time: '1996-09-23',
      target: 'asdwqsdae1',
      origin: 'sadas',
      content: '五黑五缺一',
    },
    {
      id: 'dq3213',
      time: '1996-09-23',
      target: 'asdwqsdae1',
      origin: 'ewqeqw',
      content: '不去，我要学习呢',
    },
  ],
  asdwewqda1e1: [
    {
      id: 'dqwe1eqw23',
      time: '1996-09-23',
      target: 'asdwewqda1e1',
      origin: 'sadas',
      content: '只有在有必要时才会展现头像',
    },
    {
      id: '321dq321',
      time: '1996-09-23',
      target: 'asdwewqda1e1',
      origin: 'dqwe',
      content: '每个发言者都有不同色彩的气泡',
    },
    {
      id: 'dq3213',
      time: '1996-09-23',
      target: 'asdwewqda1e1',
      origin: 'ewqeqw',
      content: '自己的发言为白色',
    },
    {
      id: 'Ad2dasd',
      time: '1996-09-23',
      target: 'asdwewqda1e1',
      origin: 'f123',
      content: '111111',
    },
    {
      id: 'B32fd213',
      time: '1996-09-23',
      target: 'asdwewqda1e1',
      origin: 'dd82',
      content: '222222',
    },
    {
      id: 'dasdase12',
      time: '1996-09-23',
      target: 'asdwewqda1e1',
      origin: 'dqwe',
      content: '打乱队形',
    },
    {
      id: 'Cdddd211',
      time: '1996-09-23',
      target: 'asdwewqda1e1',
      origin: 'dasd8213',
      content: '3333',
    },
    {
      id: 'D3332121',
      time: '1996-09-23',
      target: 'asdwewqda1e1',
      origin: 'ddii21',
      content: '44444',
    },
  ],
};

export const getMessage = (userId: string): Message[] => {
  return mockData[userId] || [];
};

export const getChatSessions = (): ChatSession[] => {
  return [
    {
      id: 'asdwqe1',
      name: 'XMG',
      members: ['ewqeqw', 'sadas'],
      lastTime: '1996-12-32',
      lastMessage: 'test message',
      unreadNumber: 3,
    },
    {
      id: 'asdwqsdae1',
      name: 'Robot',
      members: ['ewqeqw', 'dqwe'],
      lastTime: '2026-12-32',
      lastMessage: 'test message2',
      unreadNumber: 1,
    },
    {
      id: 'awqda1e1',
      name: 'SELF',
      members: ['ewqeqw', 'ewqeqw'],
      lastTime: '2026-12-32',
      lastMessage: 'test message3',
      unreadNumber: 0,
    },
    {
      id: 'asdwewqda1e1',
      name: 'Group',
      members: ['ewqeqw', 'dqwe', 'zmsdi'],
      lastTime: '2026-12-32',
      lastMessage: 'test message3',
      unreadNumber: 12,
    },
    {
      id: 'zzzzzz',
      name: 'Big Group',
      members: [
        'ewqeqw',
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
      unreadNumber: 999,
    },
  ];
};
