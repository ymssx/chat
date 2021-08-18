import React from 'react';
import { ChatUser } from "@/const/common";
import styles from './index.less';

interface ChatItemProps {
  data: ChatUser;
}

interface ChatListProps {
  chatList: ChatUser[];
  handleSelect: (index: number) => void;
}

const ChatItem: React.FC<ChatItemProps> = ({ data }) => {
  const { name } = data;
  return (
    <div className={styles['chat-item']}>{name}</div>
  );
}

const ChatList: React.FC<ChatListProps> = ({ chatList, handleSelect }) => {
  return (
    <ul className={styles['chat-list']}>
      {chatList.map((item, index) => (
        <li
          key={item.id}
          onClick={() => handleSelect(index)}
        >
          <ChatItem data={item} />
        </li>
      ))}
    </ul>
  );
};

export default ChatList;