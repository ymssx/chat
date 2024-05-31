import React, { useEffect, useState } from 'react';
import { Modal, Input, Button } from 'antd';
import { connect } from 'dva';
import ChannelList from '@/components/areaList';
import ChatBox from '@/components/chatBox';
import styles from './index.less';
import { ChatState } from '@/models/chat';
import { ChatChannel, ChatSession } from '@/const/common';
import { Message } from '@/const/message';
import NotificationModal from '@/components/notification';
import { Events } from '@/utils/user';

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
  const [nameDialogVisible, setNameDialogVisible] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    window.addEventListener(Events.OPEN_SET_NAME_USERNAME, () => {
      setNameDialogVisible(true);
    });
  }, []);

  const chatBox = currentSessionId ? <ChatBox /> : null;

  const handleSelect = (sessionId: string, hash: string) => {
    dispatch({
      type: 'chat/select-session',
      payload: { messages, sessionId, hash },
    });
  };

  const handleSetName = () => {
    if (!userName) return;

    window.dispatchEvent(
      new CustomEvent(Events.SET_USERNAME, {
        detail: { name: userName },
      }),
    );
    setNameDialogVisible(false);
  };

  const userNameFooter = (
    <div>
      <Button onClick={handleSetName}>确定</Button>
    </div>
  );

  const handleInputName = (e: any) => {
    setUserName(e?.target?.value);
  };

  return (
    <div className={styles['chat-page']}>
      <div className={styles['chat-list-wrapper']}>
        <ChannelList handleSelect={handleSelect} />
      </div>
      <div className={styles['chat-box-wrapper']}>{chatBox}</div>

      {/* Set User Name */}
      <Modal
        closable={false}
        maskClosable={false}
        visible={nameDialogVisible}
        footer={userNameFooter}
        title={'你的名字'}
      >
        <Input onChange={handleInputName} />
      </Modal>

      <NotificationModal />
    </div>
  );
};

const mapStateToProps = ({ chat }: { chat: ChatState }) => {
  const { channelMap, currentSessionId, messages } = chat;
  return { channelMap, currentSessionId, messages };
};

export default connect(mapStateToProps)(ChatPage);
