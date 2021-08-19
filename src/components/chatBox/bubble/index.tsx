import React from 'react';
import { Message } from '@/const/message';
import styles from './index.less';
import UserAvatar from '@/components/avatar';

interface BubbleProps {
  message: Message;
  color?: string;
  showAvatar?: boolean;
  showName?: boolean;
  handleHover: (time: string) => void;
}

const Bubble: React.FC<BubbleProps> = ({
  message,
  color,
  showAvatar = false,
  showName = false,
  handleHover,
}) => {
  // TODO: use redux
  const currentUserId = 'ewqeqw';

  const { id, time, target, origin, content } = message;

  const bubbleClassName =
    origin === currentUserId ? 'bubble-right' : 'bubble-left';

  const bubbleStyle = color ? { backgroundColor: color } : {};

  const arrowStyle =
    origin === currentUserId
      ? { borderLeft: `solid 8px ${color}` }
      : { borderRight: `solid 8px ${color}` };

  return (
    <div
      className={[styles['bubble-wrapper'], styles[bubbleClassName]].join(' ')}
    >
      <div className={styles['avatar']}>
        {showAvatar ? <UserAvatar id={origin} name={origin} /> : null}
      </div>
      {showName ? <div className={styles['name']}>{origin}</div> : null}
      <div
        className={styles['bubble']}
        style={bubbleStyle}
        onMouseEnter={() => handleHover(time)}
        onMouseOut={() => handleHover('')}
      >
        {content}
        <div style={arrowStyle} className={styles['arrow']} />
      </div>
    </div>
  );
};

export default Bubble;
