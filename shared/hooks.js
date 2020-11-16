import { useState, useCallback } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const useToggle = (initialValue = false) => {
  const [flag, setFlag] = useState(initialValue);

  const toggle = useCallback(() => {
    setFlag(!flag);
  }, [flag]);

  return [flag, toggle];
};
