import React, { useEffect, useState } from 'react';

import { UserProps } from 'Store';

interface Props {}

const EditUser: React.FC<Props> = () => {
  const [userInfo, setUserInfo] = useState<UserProps | null>(null);

  useEffect(() => {
    const getUserInfo = async () => {};

    getUserInfo();
  }, []);

  return <>Edit User Info Page</>;
};

export default EditUser;
