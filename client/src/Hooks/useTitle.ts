import { useRef } from 'react';

export const useTitle = (title: string) => {
  const t = useRef<string>();

  if (t.current !== title) {
    document.title = t.current = title;
  }
};
