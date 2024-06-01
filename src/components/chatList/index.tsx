import React, { useEffect } from 'react';
import { ChatSession } from '@/const/common';
import styles from './index.less';
import UserAvatar from '@/components/avatar';
import { getUserId } from '@/utils/id';
import classnames from 'classnames';
import { getHashQuery } from '@/utils/util';

interface SessionItemProps {
  data: ChatSession;
}

interface SessionListProps {
  hash: string;
  sessionMap: { [sessionId: string]: ChatSession };
  selectedSessionId: string | null;
  handleSelect: (sessionId: string, hash: string) => void;
}

const SessionItem: React.FC<SessionItemProps> = ({ data }) => {
  const { id, name, unreadNumber, lastMessage, lastTime } = data;
  return (
    <div className={classnames({ [styles['chat-item']]: true, [styles['has-message']]: unreadNumber > 0 })}>
      <div className={styles['avatar']}>
        <UserAvatar id={id} name={name} />
      </div>
      <div className={styles['chat-info']}>
        <div className={styles['name']}>
          {id === getUserId() ? <span>Self - </span> : null}
          {name}
        </div>
        <div className={styles['chat-sub']}>
          {unreadNumber ? (
            <span className={styles['unread-dot']}>
              {unreadNumber > 99 ? '99+' : unreadNumber}
            </span>
          ) : null}
          <span className={styles['message']}>{lastMessage}</span>
        </div>
      </div>
    </div>
  );
};

const SessionList: React.FC<SessionListProps> = ({
  hash,
  sessionMap,
  selectedSessionId,
  handleSelect,
}) => {
  let sessionList = [];
  const userId = getUserId();
  const targetId = getHashQuery().id;
  for (const id in sessionMap) {
    if (id === userId) {
      continue;
    }
    const session = sessionMap[id];
    session.selected = id === selectedSessionId;
    sessionList.push(session);
  }
  const targetSession = sessionList.find(item => item.id === targetId);
  if (targetSession) {
    sessionList = [targetSession];
  }

  useEffect(() => {
    if (targetId && !selectedSessionId) {
      handleSelect(targetId, '*');
    }
  }, [targetId]);

  return (
    <ul className={styles['chat-list']}>
      {sessionList.map((item, index) => (
        <li
          key={item.id}
          className={item.selected ? styles['selected'] : null}
          onClick={() => handleSelect(item.id, hash)}
        >
          <SessionItem data={item} />
        </li>
      ))}
    </ul>
  );
};

export default SessionList;
