import React from 'react';
import { connect } from 'dva';
import { Message } from '@/const/message';
import styles from './index.less';
import UserAvatar from '@/components/avatar';
import { UserState } from '@/models/user';

interface BubbleProps {
  message: Message;
  userId: string;
  color?: string;
  showAvatar?: boolean;
  showName?: boolean;
  right?: boolean;
}

const Bubble: React.FC<BubbleProps> = ({
  message,
  userId,
  color,
  right = false,
  showAvatar = false,
  showName = false,
}) => {
  const { id, time, sessionId, originId, content } = message;

  const bubbleClassName =
    originId === userId || right ? 'bubble-right' : 'bubble-left';

  const bubbleStyle = color ? { backgroundColor: color } : {};

  const arrowStyle =
    originId === userId || right
      ? { borderLeft: `solid 8px ${color}` }
      : { borderRight: `solid 8px ${color}` };

  return (
    <div
      className={[styles['bubble-wrapper'], styles[bubbleClassName]].join(' ')}
    >
      <div className={styles['avatar']}>
        {showAvatar ? <UserAvatar id={originId} name={originId} /> : null}
      </div>
      {showName ? <div className={styles['name']}>{originId}</div> : null}
      <div className={styles['bubble']} style={bubbleStyle}>
        {content}
        <div style={arrowStyle} className={styles['arrow']} />
      </div>
    </div>
  );
};

const mapStateToProps = ({ user }: { user: UserState }) => {
  const { userId } = user;
  return { userId };
};

export default connect(mapStateToProps)(Bubble);
