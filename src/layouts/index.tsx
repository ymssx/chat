import { Events } from '@/utils/user';
import { useState, useEffect } from 'react';
import { IRouteComponentProps } from 'umi'
import { Modal, Input, Button } from 'antd';

export default function Layout({ children, location, route, history, match }: IRouteComponentProps) {
  const [nameDialogVisible, setNameDialogVisible] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    window.addEventListener(Events.OPEN_SET_NAME_USERNAME, () => {
      setNameDialogVisible(true);
    });
  }, []);
  const handleSetName = () => {
    if (!userName) return;

    window.dispatchEvent(
      new CustomEvent(Events.SET_USERNAME, {
        detail: { name: userName },
      }),
    );
    setNameDialogVisible(false);
  };

  const userNameFooter = (
    <div>
      <Button onClick={handleSetName}>确定</Button>
    </div>
  );

  const handleInputName = (e: any) => {
    setUserName(e?.target?.value);
  };

  return <>
    {children}

    {/* Set User Name */}
    <Modal
      closable={false}
      maskClosable={false}
      open={nameDialogVisible}
      footer={userNameFooter}
      title={'你的名字'}
    >
      <Input onChange={handleInputName} />
    </Modal>
  </>;
}