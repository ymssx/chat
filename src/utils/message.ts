import { Message } from "@/const/message";

const mockData: { [id: string]: Message[] } = {
  'ewqeqw': [
    {
      id: '123123',
      time: '1996-09-23',
      target: 'ewqeqw',
      origin: 'sadas',
      content: 'Hello~',
    },
    {
      id: 'e123123',
      time: '1996-09-23',
      target: 'sadas',
      origin: 'ewqeqw',
      content: 'How are you?',
    },
    {
      id: 'e123e12123',
      time: '1996-09-23',
      target: 'ewqeqw',
      origin: 'sadas',
      content: 'Early in the day it was whispered that we should sail in a boat, only thou and I, and never a soul in the world would know of this our pilgrimage to no country and to no end.',
    },
    {
      id: 'e1231dddd23',
      time: '1996-09-23',
      target: 'sadas',
      origin: 'ewqeqw',
      content: 'The time that my journey takes is long and the way of it long.I came out on the chariot of the first gleam of light, and pursued my voyage through the wildernesses of worlds leaving my track on many a star and planet.',
    },
  ],
  'sadas': [
    {
      id: 'dqwe1eqw23',
      time: '1996-09-23',
      target: 'ewqeqw',
      origin: 'sadas',
      content: '上线！',
    },
    {
      id: '321dq321',
      time: '1996-09-23',
      target: 'ewqeqw',
      origin: 'sadas',
      content: '五黑五缺一',
    },
    {
      id: 'dq3213',
      time: '1996-09-23',
      target: 'sadas',
      origin: 'ewqeqw',
      content: '不去，我要学习呢',
    },
  ],
};

export const getMessage = (userId: string): Message[] => {
  return mockData[userId] || [];
};
