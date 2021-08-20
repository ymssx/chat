import socket from '@/server/request';
import { getUserId } from '@/utils/id';

enum Reducers {}

export interface UserState {
  userId: string;
}

export default {
  namespace: 'user',
  state: {
    userId: getUserId(),
  },
  reducers: {},
  effects: {},
  subscriptions: {
    socket() {
      socket.on('connected', () => {
        console.log('connected', getUserId());
      });
    },
  },
};
