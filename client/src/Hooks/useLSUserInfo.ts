import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from 'Store';

export const useReadLSUserInfo = () => {
  const { dispatch } = useContext(UserContext);

  useEffect(() => {
    const lsLoginToken = localStorage.getItem('loginToken');

    try {

      if (lsLoginToken) {
        const { push } = useHistory();
        const authUser = async () => {
          const response: Response = await fetch('/auth/validate', { 
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${lsLoginToken}`
          }
        })

        if (!response.ok) {
          return push('/login')
        }

        const userData = await response.json();

        dispatch({ type: 'LOG_USER_IN', payload: userData });
      }
       authUser();
      }
    } catch (error) {
      localStorage.removeItem('loginToken');
      localStorage.removeItem('userInfo');
      return alert('Error authenticating. Please try logging in again!');
    }


  }, [dispatch]);
};
