import React from 'react';
import { Message } from '@/const/message';
import styles from './index.less';

interface BubbleProps {
  message: Message;
  handleHover: (time: string) => void;
}

const Bubble: React.FC<BubbleProps> = ({ message, handleHover }) => {
  // TODO: use redux
  const currentUserId = 'ewqeqw';

  const { id, time, target, origin, content } = message;

  const bubbleClassName =
    origin === currentUserId ? 'bubble-right' : 'bubble-left';

  return (
    <div
      className={[styles['bubble-wrapper'], styles[bubbleClassName]].join(' ')}
    >
      <div
        className={styles['bubble']}
        onMouseEnter={() => handleHover(time)}
        onMouseOut={() => handleHover('')}
      >
        {content}
      </div>
    </div>
  );
};

export default Bubble;
