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
      if (!user) {
        throw new Error('Invalid or missing user data retrieved.');
      }

      localStorage.setItem('userInfo', JSON.stringify(user));
      dispatch({ type: 'LOG_USER_IN', payload: user });
    } catch (error) {
      console.log('Error updating stored user data:', error.message || error);
      resetUserInfo();
    }

    return;
  };

  useEffect(() => {
    const lsLoginToken = localStorage.getItem('loginToken');

    if (!lsLoginToken) {
      resetUserInfo();
      return;
    }

    const requestData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${lsLoginToken}`
      }
    };

    fetch('/auth/validate', requestData)
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Could not validate user.');
        }
        return res.json();
      })
      .then(userData => {
        if (!userData) {
          throw new Error('No user data returned.');
        }
        setUserInfo(userData);
      })
      .catch(err => {
        alert('Invalid or missing credentials. Please log in.');
        resetUserInfo(err);
      });
  }, [dispatch]);
};
