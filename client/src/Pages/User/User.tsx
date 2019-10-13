import React from 'react';
import { useParams } from 'react-router-dom';

interface Props {}

const User: React.FC<Props> = () => {
  const { username } = useParams();

  return (
    <>
      <h2>{username}</h2>
    </>
  );
};

export default User;
