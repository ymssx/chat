import React, { useState, useEffect } from 'react';
import { ChatUser } from '@/const/common';
import { Message } from '@/const/message';
import { getMessage } from '@/utils/message';
import Bubble from './bubble';
import UserAvatar from '@/components/avatar';
import { Input } from 'antd';
import styles from './index.less';

const { TextArea } = Input;

interface ChatBoxProps {
  chatUser: ChatUser;
}

const ChatBox: React.FC<ChatBoxProps> = ({ chatUser }) => {
  const { id, name } = chatUser;
  const [messages, setMessages] = useState<Message[]>([]);
  const [lastSendMessageTime, setLastSendMessageTime] = useState<string>('');

  useEffect(() => {
    const newMessages = getMessage(id);
    setMessages(newMessages);
  }, [chatUser]);

  const handleHover = (time: string) => {
    setLastSendMessageTime(time);
  };

  const messageList = messages?.map((item) => (
    <li key={item.id}>
      <Bubble message={item} handleHover={handleHover} />
    </li>
  ));

  const lastMessageHint = lastSendMessageTime
    ? `该消息回复于${lastSendMessageTime}`
    : '';

  return (
    <div className={styles['chat-box']}>
      <div className={styles['chat-header']}>
        <UserAvatar id={id} name={name} />
        <div className={styles['chat-info']}>
          <div className={styles['name']}>{name}</div>
          <div className={styles['hint']}>{lastMessageHint}</div>
        </div>
      </div>
      <ul className={styles['message-list']}>{messageList}</ul>
      <div className={styles['input']}>
        <TextArea autoSize bordered={false} placeholder={'给ta发消息吧～'} />
      </div>
    </div>
  );
};

export default ChatBox;
