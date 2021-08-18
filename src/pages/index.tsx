import React, { useState } from 'react';
import ChatList from '@/components/chatList';
import ChatBox from '@/components/chatBox';
import styles from './index.less';

const ChatPage: React.FC<void> = () => {
  const chatList = [
    { id: 'ewqeqw', name: 'YAMI' },
    { id: 'sadas', name: 'XMG' },
  ]
  const [currentSelect, setCurrentSelect] = useState<number>(-1);

  const handleSelectChat = (index: number) => setCurrentSelect(index);

  const chatBox = currentSelect === -1
    ? null
    : <ChatBox chatUser={chatList[currentSelect]} />;

  return (
    <div className={styles['chat-page']}>
      <div className={styles['chat-list-wrapper']}>
        <ChatList chatList={chatList} handleSelect={handleSelectChat} />
      </div>
      <div className={styles['chat-box-wrapper']}>
        { chatBox }
      </div>
    </div>
  );
}

export default ChatPage;
