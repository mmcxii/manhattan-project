import { useEffect, useContext } from 'react';
import { UserContext } from 'Store';
import { async } from 'q';

export const useReadLSUserInfo = () => {
  const { dispatch } = useContext(UserContext);

  useEffect(() => {
    const lsLoginToken = localStorage.getItem('loginToken');

    try {
      if (lsLoginToken) {

        
      }
    } catch (error) {
      localStorage.removeItem('loginToken');
      localStorage.removeItem('userInfo');
    }

    dispatch({ type: 'LOG_USER_IN', payload: parsedData });
  }, [dispatch]);
};
