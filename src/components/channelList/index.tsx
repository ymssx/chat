import React from 'react';
import { Collapse } from 'antd';
import { ChatChannel } from '@/const/common';
import SessionList from '../sessionList';

const { Panel } = Collapse;

interface ChannelListProps {
  selectedSessionId: string;
  channelMap: { [hash: string]: ChatChannel };
  handleSelect: (sessionId: string, hash: string) => void;
}

const ChannelList: React.FC<ChannelListProps> = ({
  selectedSessionId,
  channelMap,
  handleSelect,
}) => {
  const channelList = [];
  for (const hash in channelMap) {
    const channel = channelMap[hash];
    channelList.push(channel);
  }

  const channels = channelList.map(({ hash, name, sessionMap }) => (
    <Panel key={hash} header={name ?? hash}>
      <SessionList
        hash={hash}
        sessionMap={sessionMap}
        selectedSessionId={selectedSessionId}
        handleSelect={handleSelect}
      />
    </Panel>
  ));

  return <Collapse>{channels}</Collapse>;
};

export default ChannelList;
