import React from 'react';
import { Avatar } from 'antd';

interface AvatarProps {
  id: string;
  name: string;
}

const UserAvatar: React.FC<AvatarProps> = ({ id, name = '?' }) => {
  return (
    <Avatar shape="square" size={40}>
      {name[0]}
    </Avatar>
  );
};

export default UserAvatar;
