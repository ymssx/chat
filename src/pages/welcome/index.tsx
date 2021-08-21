import React, { useState } from 'react';
import { Input, Button } from 'antd';
import styles from './index.less';

const WelcomePage: React.FC<void> = () => {
  const [name, setName] = useState('');

  const handleSetName = (e: any) => {
    setName(e.target.value);
  };

  const handleSubmitName = () => {
    localStorage.setItem('user-name', name);
    window.location.replace('/');
  };

  return (
    <div className={styles['welcome-page']}>
      <div className={styles['title']}>Set Your Name</div>
      <Input
        bordered
        onChange={handleSetName}
        value={name}
        onPressEnter={handleSubmitName}
      />
      {/* <Button ghost type="primary" onClick={handleSubmitName}>OK</Button> */}
    </div>
  );
};

export default WelcomePage;
