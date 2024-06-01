import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import ChannelList from '@/components/areaList';
import ChatBox from '@/components/chatBox';
import styles from './index.less';
import { ChatState } from '@/models/chat';
import { ChatChannel, ChatSession } from '@/const/common';
import { Message } from '@/const/message';
import NotificationModal from '@/components/notification';
import { Events } from '@/utils/user';
import { genRequestUrl } from '@/utils/request-chat';
import { getUserId } from '@/utils/id';
import { Modal, message } from 'antd';

const { confirm } = Modal;

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
      type: 'chat/select-session',
      payload: { messages, sessionId, hash },
    });
  };

  const handleRequestChat = async () => {
    const url = await genRequestUrl(getUserId());
    confirm({
      icon: null,
      content: (
        <div>
          <h3>将下面链接发送给好友</h3>
          <code>{url}</code>
        </div>
      ),
      okText: 'Copy',
      onOk() {
        window.navigator?.clipboard
          ?.writeText(url)
          .then(() => {
            message.success('Copied');
          })
          .catch((e) => {
            message.error('Failed');
          });
      },
    });
  };

  return (
    <div className={styles['chat-page']}>
      <div className={styles['chat-list-wrapper']}>
        <ChannelList handleSelect={handleSelect} />
        <ul className={styles['chat-list-footer']}>
          <li onClick={handleRequestChat}>邀请聊天</li>
        </ul>
      </div>
      <div className={styles['chat-box-wrapper']}>{chatBox}</div>

      <NotificationModal />
    </div>
  );
};

const mapStateToProps = ({ chat }: { chat: ChatState }) => {
  const { channelMap, currentSessionId, messages } = chat;
  return { channelMap, currentSessionId, messages };
};

export default connect(mapStateToProps)(ChatPage);
