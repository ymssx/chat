import React, { useState } from 'react';
import { connect } from 'dva';
import ChannelList from '@/components/areaList';
import ChatBox from '@/components/chatBox';
import styles from './index.less';
import { ChatState } from '@/models/chat';
import { ChatChannel, ChatSession } from '@/const/common';
import { getMessages, setMessages } from '@/utils/chat';
import { Message } from '@/const/message';

interface ChatPageProps {
  channelMap: { [hash: string]: ChatChannel };
  currentSessionId: string;
  messages: Message[];
  dispatch: Function;
}

const ChatPage: React.FC<ChatPageProps> = ({
  messages,
  currentSessionId,
  channelMap,
  dispatch,
}) => {
  const chatBox = currentSessionId ? <ChatBox /> : null;

  const handleSelect = (sessionId: string, hash: string) => {
    dispatch({
      type: 'chat/set-current-session-id',
      payload: sessionId,
    });

    dispatch({
      type: 'chat/take-messages',
      payload: { sessionId, hash },
    });

    setMessages(messages);
    dispatch({
      type: 'chat/set-messages',
      payload: getMessages(hash, sessionId),
    });
  };

  return (
    <div className={styles['chat-page']}>
      <div className={styles['chat-list-wrapper']}>
        <ChannelList handleSelect={handleSelect} />
      </div>
      <div className={styles['chat-box-wrapper']}>{chatBox}</div>
    </div>
  );
};

const mapStateToProps = ({ chat }: { chat: ChatState }) => {
  const { channelMap, currentSessionId, messages } = chat;
  return { channelMap, currentSessionId, messages };
};

export default connect(mapStateToProps)(ChatPage);
