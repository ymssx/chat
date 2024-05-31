import React, { useEffect, useState } from 'react';
import { Modal, Input, Button } from 'antd';

interface NotificationProps {}

const NotificationModal: React.FC<NotificationProps> = ({}) => {
  const ifShowNotificationRequest = !Notification.permission;

  const handleConfirm = () => {
    Notification.requestPermission();
  };

  return (
    <Modal
      closable={true}
      maskClosable={true}
      visible={ifShowNotificationRequest}
      title={'是否允许通知?'}
      onOk={handleConfirm}
    >
      开启后，当有新消息后，我们可以第一时间通知到你
    </Modal>
  );
};

export default NotificationModal;
