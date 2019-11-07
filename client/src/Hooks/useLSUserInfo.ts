import { useEffect, useContext } from 'react';
import { UserContext } from 'Store';
import { async } from 'q';

export const useReadLSUserInfo = () => {
  const { dispatch } = useContext(UserContext);

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
        })

        console.log(response);
      }
       authUser();
      }
    } catch (error) {
      localStorage.removeItem('loginToken');
    }

    // dispatch({ type: 'LOG_USER_IN', payload: parsedData });
  }, [dispatch]);
};
