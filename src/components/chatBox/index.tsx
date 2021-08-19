import React, { useState, useEffect } from 'react';
import { ChatSession } from '@/const/common';
import { Message } from '@/const/message';
import { getMessage } from '@/utils/chat';
import Bubble from './bubble';
import UserAvatar from '@/components/avatar';
import { Input } from 'antd';
import styles from './index.less';
import { BUBBLE_COLOR_LIST } from '@/const/colors';

const { TextArea } = Input;

interface ChatBoxProps {
  session: ChatSession;
}

const ChatBox: React.FC<ChatBoxProps> = ({ session }) => {
  const { id, name, members } = session;
  const [messages, setMessages] = useState<Message[]>([]);
  const [lastSendMessageTime, setLastSendMessageTime] = useState<string>('');
  // TODO: use redux
  const currentUserId = 'ewqeqw';

  useEffect(() => {
    const newMessages = getMessage(id);
    setMessages(newMessages);
  }, [session]);

  const handleHover = (time: string) => {
    setLastSendMessageTime(time);
  };

  const colorMap = new Map<string, string>();
  let colorIndex = 0;
  const messageList = messages?.map((item) => {
    const { id, origin } = item;
    const isSelf = origin === currentUserId;
    let color: string | undefined;
    if (!isSelf) {
      if (colorMap.has(origin)) {
        color = colorMap.get(origin);
      } else {
        color = BUBBLE_COLOR_LIST[colorIndex];
        colorIndex = (colorIndex + 1) % BUBBLE_COLOR_LIST.length;
        colorMap.set(origin, color);
      }
    }

    return (
      <li key={id}>
        <Bubble
          message={item}
          color={color}
          showName={members.length > 2}
          showAvatar={members.length > 2}
          handleHover={handleHover}
        />
      </li>
    );
  });

  const lastMessageHint = lastSendMessageTime
    ? `该消息回复于${lastSendMessageTime}`
    : '';

  const avatarList = [];
  for (let index = 0; index < members.length; index++) {
    const memberId = members[index];
    if (memberId !== currentUserId) {
      avatarList.push(
        <span className={styles['avatar']} key={memberId}>
          <UserAvatar id={memberId} name={memberId} />
        </span>,
      );
    }
    if (avatarList.length >= 5) {
      break;
    }
  }

  return (
    <div className={styles['chat-box']}>
      <div className={styles['chat-header']}>
        {/* <UserAvatar id={id} name={name} /> */}
        <div className={styles['avatar-list']}>{avatarList}</div>
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
