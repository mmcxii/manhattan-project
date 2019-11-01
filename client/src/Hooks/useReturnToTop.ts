import { useEffect } from 'react';

export const useReturnToTop = (changeTarget: any) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [changeTarget]);
};
