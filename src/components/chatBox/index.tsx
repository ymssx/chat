import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'dva';
import { Message } from '@/const/message';
import Bubble from './bubble';
import UserAvatar from '@/components/avatar';
import { Input } from 'antd';
import styles from './index.less';
import { BUBBLE_COLOR_LIST } from '@/const/colors';
import { getUserId, uuid } from '@/utils/id';
import API from '@/server/api';
import { request } from '@/server/request';
import { UserState } from '@/models/user';
import { ChatState } from '@/models/chat';
import { ChatSession } from '@/const/common';

const { TextArea } = Input;

interface ChatBoxProps {
  hash: string;
  messages: Message[];
  session: ChatSession;
  userId: string;
  dispatch: Function;
}

const INPUT_STORE: { [id: string]: string } = {};

const ChatBox: React.FC<ChatBoxProps> = ({
  hash,
  messages,
  session,
  userId,
  dispatch,
}) => {
  if (!session) return null;

  const { id, name, members } = session;
  const [inputMessage, setInputMessage] = useState<string>('');

  const inputBar = useRef(null);
  useEffect(() => {
    setInputMessage(INPUT_STORE[id] ?? '');
    (inputBar?.current as any)?.focus();
  }, [id]);

  const colorMap = new Map<string, string>();
  let colorIndex = 0;
  const messageList = messages
    ?.filter(item => members.includes(item.originId) && id === item.sessionId)
    ?.map(item => {
      const { id, originId } = item;
      const isSelf = originId === userId;
      let color: string | undefined;
      if (!isSelf) {
        if (colorMap.has(originId)) {
          color = colorMap.get(originId);
        } else {
          color = BUBBLE_COLOR_LIST[colorIndex];
          colorIndex = (colorIndex + 1) % BUBBLE_COLOR_LIST.length;
          colorMap.set(originId, color);
        }
      }

      return (
        <li key={id}>
          <Bubble
            message={item}
            color={color}
            showName={members.length > 2}
            showAvatar={members.length > 2 && !isSelf}
          />
        </li>
      );
    });

  const avatarList = [];
  for (let index = 0; index < members.length; index++) {
    const memberId = members[index];
    if (memberId !== userId) {
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

  const handleInput = (e: any) => {
    const message = e?.target?.value.replace('\n', '');
    setInputMessage(message);
    INPUT_STORE[id] = message;
  };

  const handleSendMessage = () => {
    const message = {
      hash,
      sessionId: id,
      originId: userId,
      content: inputMessage?.trim(),
      time: String(new Date().getTime()),
      id: uuid(),
    };
    dispatch({
      type: 'chat/add-message',
      payload: message,
    });
    setInputMessage('');
    if (id !== getUserId()) {
      request.post(API.sendMessage, message);
    }
  };

  return (
    <div className={styles['chat-box']}>
      <div className={styles['chat-header']}>
        {/* <UserAvatar id={id} name={name} /> */}
        <div className={styles['avatar-list']}>{avatarList}</div>
        <div className={styles['chat-info']}>
          <div className={styles['name']}>{name}</div>
          <div className={styles['hint']}>{'TODO'}</div>
        </div>
      </div>
      <ul className={styles['message-list']}>{messageList}</ul>
      <div className={styles['input']}>
        <TextArea
          autoSize
          ref={inputBar}
          bordered={false}
          value={inputMessage}
          placeholder={'给ta发消息吧～'}
          onChange={handleInput}
          onPressEnter={handleSendMessage}
        />
      </div>
    </div>
  );
};

const mapStateToProps = ({
  user,
  chat,
}: {
  user: UserState;
  chat: ChatState;
}) => {
  const { userId } = user;
  const { hash, currentSessionId, channelMap, messages } = chat;
  return {
    userId,
    hash,
    messages,
    session: channelMap[hash].sessionMap[currentSessionId],
  };
};

export default connect(mapStateToProps)(ChatBox);
