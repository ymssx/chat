import socket from '@/server/request';
import { getUserId } from '@/utils/id';
import { getUserName } from '@/utils/user';

enum Reducers {}

export interface UserState {
  userId: string;
  userName: string;
}

export default {
  namespace: 'user',
  state: {
    userId: getUserId(),
    userName: null,
  },
  reducers: {
    setUserName(state: UserState, { payload: name }: { payload: string }) {
      return { ...state, name };
    },
  },
  effects: {},
  subscriptions: {
    socket() {
      socket?.on('connected', () => {
        console.log('connected', getUserId());
      });
    },
  },
};
