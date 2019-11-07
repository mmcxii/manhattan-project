import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from 'Store';

export const useReadLSUserInfo = () => {
  const { dispatch } = useContext(UserContext);
  const { push } = useHistory();
  useEffect(() => {
    const lsLoginToken = localStorage.getItem('loginToken');

    try {
      if (lsLoginToken) {
        const authUser = async () => {
          const response: Response = await fetch('/auth/validate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${lsLoginToken}`
            }
          });

          if (!response.ok) {
            alert('Token validation failed. Redirecting to login.');
            return push('/login');
          }

          const userData = await response.json();

          localStorage.setItem('userInfo', JSON.stringify(userData));

          dispatch({ type: 'LOG_USER_IN', payload: userData });
        };
        authUser();
      }
    } catch (error) {
      localStorage.removeItem('loginToken');
      localStorage.removeItem('userInfo');
      alert('Error authenticating. Please try logging in again!');
      return push('/login');
    }
  }, [dispatch]);
};
