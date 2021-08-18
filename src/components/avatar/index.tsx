import React from 'react';
import { Avatar } from 'antd';

interface AvatarProps {
  id: string;
}

const UserAvatar: React.FC<AvatarProps> = ({ id }) => {
  return (
    <Avatar
      shape="square"
      size={40}
    />
  );
};

export default UserAvatar;