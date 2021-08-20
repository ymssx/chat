import React from 'react';
import { connect } from 'dva';
import { Collapse } from 'antd';
import { ChatChannel } from '@/const/common';
import SessionList from '../chatList';
import { ChatState } from '@/models/chat';
import { setMessages, getMessages } from '@/utils/chat';
import { Message } from '@/const/message';
import styles from './index.less';

const { Panel } = Collapse;

interface ChannelListProps {
  hash: string;
  messages: Message[];
  currentSessionId: string;
  channelMap: { [hash: string]: ChatChannel };
  handleSelect: (sessionId: string, hash: string) => void;
  dispatch: Function;
}

const ChannelList: React.FC<ChannelListProps> = ({
  hash,
  messages,
  currentSessionId,
  channelMap,
  handleSelect,
  dispatch,
}) => {
  const channelList = [];
  for (const hash in channelMap) {
    const channel = channelMap[hash];
    channelList.push(channel);
  }

  const handleJumpToUnread = (event: React.MouseEvent, targetHash: string) => {
    event.stopPropagation();

    const sessionId = Object.values(channelMap[targetHash].sessionMap).find(
      ({ unreadNumber }) => unreadNumber,
    )?.id;
    if (!sessionId) {
      return;
    }

    dispatch({
      type: 'chat/set-hash',
      payload: targetHash,
    });

    dispatch({
      type: 'chat/set-current-session-id',
      payload: sessionId,
    });

    dispatch({
      type: 'chat/take-messages',
      payload: { sessionId, hash: targetHash },
    });

    setMessages(messages);
    dispatch({
      type: 'chat/set-messages',
      payload: getMessages(targetHash, sessionId),
    });
  };

  const panelHeader = ({ hash, name, sessionMap }: ChatChannel) => (
    <span>
      {name ?? hash}
      <span
        onClick={event => handleJumpToUnread(event, hash)}
        className={styles['unread-dot']}
      >
        {Object.values(sessionMap).reduce((sum, { unreadNumber }) => {
          sum += unreadNumber;
          return sum;
        }, 0) || null}
      </span>
    </span>
  );

  const handleChangeHash = (newHash: undefined | string | string[]) => {
    dispatch({
      type: 'chat/set-hash',
      payload: Array.isArray(newHash) ? newHash[0] : newHash,
    });
  };

  const channels = channelList.map(({ hash, name, sessionMap }) => (
    <Panel key={hash} header={panelHeader({ hash, name, sessionMap })}>
      <SessionList
        hash={hash}
        sessionMap={sessionMap}
        selectedSessionId={currentSessionId}
        handleSelect={handleSelect}
      />
    </Panel>
  ));

  return (
    <Collapse
      activeKey={hash}
      ghost
      accordion
      bordered={false}
      onChange={handleChangeHash}
    >
      {channels}
    </Collapse>
  );
};

const mapStateToProps = ({ chat }: { chat: ChatState }) => {
  const { hash, channelMap, currentSessionId, messages } = chat;
  return { hash, channelMap, currentSessionId, messages };
};

export default connect(mapStateToProps)(ChannelList);
