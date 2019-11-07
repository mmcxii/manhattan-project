import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext, UserProps } from 'Store';

export const useReadLSUserInfo = () => {
  const { dispatch } = useContext(UserContext);
  const { push } = useHistory();

  // Clear out localstorage data and redirect to login. Log error if provided.
  const resetUserInfo = (error?: Error): void => {
    if (error && error instanceof Error) {
      console.log('Error updating stored user:', error.message || error);
    }

    localStorage.removeItem('loginToken');
    localStorage.removeItem('userInfo');
    push('/login');
  };

  // Updates the user data stored in localstorage
  const setUserInfo = (user: UserProps): void => {
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
  }, [dispatch, push]);
};
