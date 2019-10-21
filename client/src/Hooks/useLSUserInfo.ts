import { useEffect, useContext } from 'react';
import { UserContext } from 'Store';

export const useLSUserInfo = () => {
  const { dispatch } = useContext(UserContext);

  useEffect(() => {
    const lsLoginToken = localStorage.getItem('loginToken');
    const lsUserInfo = localStorage.getItem('userInfo');

    if (lsLoginToken && lsUserInfo) {
      const parsedData = JSON.parse(lsUserInfo);

      dispatch({ type: 'LOG_USER_IN', payload: parsedData });
    }
  }, []);
};
