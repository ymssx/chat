import React from "react";
import { Message } from "@/const/message";
import styles from './index.less';

interface BubbleProps {
  message: Message;
}

const Bubble: React.FC<BubbleProps> = ({ message }) => {
  // TODO: use redux
  const currentUserId = 'ewqeqw';

  const { id, time, target, origin, content } = message;

  const bubbleClassName = origin === currentUserId
    ? 'bubble-right'
    : 'bubble-left';

  return (
    <div className={styles['bubble-wrapper']}>
      <div
        className={[styles['bubble'], styles[bubbleClassName]].join(' ')}
      >
        {content}
      </div>
    </div>
  );
};

export default Bubble;
