import React, { useState, useEffect } from 'react';
import { ChatUser } from '@/const/common';
import { Message } from '@/const/message';
import { getMessage } from '@/utils/message';
import Bubble from './bubble';
import UserAvatar from '@/components/avatar';
import styles from './index.less';

interface ChatBoxProps {
  chatUser: ChatUser;
}

const ChatBox: React.FC<ChatBoxProps> = ({ chatUser }) => {
  const { id, name } = chatUser;
  const [ messages, setMessages ] = useState<Message[]>([]);

  useEffect(() => {
    const newMessages = getMessage(id);
    setMessages(newMessages);
  }, [chatUser]);

  const messageList = messages?.map(item => (
    <li key={item.id}><Bubble message={item} /></li>
  ));

  return (
    <div className={styles['chat-box']}>
      <div className={styles['chat-header']}>
        <UserAvatar id={id} />
        <div className={styles['chat-info']}>
          <span>{name}</span>
        </div>
      </div>
      <ul className={styles['message-list']}>
        { messageList }
      </ul>
    </div>
  );
};

export default ChatBox;
