import React from 'react';
import { ChatUser } from '@/const/common';
import styles from './index.less';
import UserAvatar from '@/components/avatar';

interface ChatItemProps {
  data: ChatUser;
}

interface ChatListProps {
  chatList: ChatUser[];
  selectedIndex: number;
  handleSelect: (index: number) => void;
}

const ChatItem: React.FC<ChatItemProps> = ({ data }) => {
  const { id, name } = data;
  return (
    <div className={styles['chat-item']}>
      <div className={styles['avatar']}>
        <UserAvatar id={id} name={name} />
      </div>
      <div className={styles['chat-info']}>
        <div className={styles['name']}>{name}</div>
        <div className={styles['chat-sub']}>
          <span className={styles['unread-dot']}>12</span>
        </div>
      </div>
    </div>
  );
};

const ChatList: React.FC<ChatListProps> = ({
  chatList,
  selectedIndex,
  handleSelect,
}) => {
  return (
    <ul className={styles['chat-list']}>
      {chatList.map((item, index) => (
        <li
          key={item.id}
          className={index === selectedIndex ? styles['selected'] : null}
          onClick={() => handleSelect(index)}
        >
          <ChatItem data={item} />
        </li>
      ))}
    </ul>
  );
};

export default ChatList;
