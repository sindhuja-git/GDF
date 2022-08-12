import { useEffect } from 'react';

import useLaunchTitle from './useLaunchTitle';

/**
 * This hook will be tested with each page that uses it
 */
const useSetLaunchTitle = (title: string) => {
  const { setTitle } = useLaunchTitle();

  useEffect(() => {
    setTitle?.(title);
    return () => {
      setTitle?.('');
    };
  }, [setTitle, title]);
};

export default useSetLaunchTitle;
