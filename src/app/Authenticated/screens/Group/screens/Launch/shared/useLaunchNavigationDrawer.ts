import { useContext, useCallback } from 'react';

import {
  LaunchNavigationDrawerValueContext,
  LaunchNavigationDrawerSetContext,
} from '../components/LaunchLayoutProvider/context/LaunchNavigationDrawerContextProvider';

const useLaunchNavigationDrawer = () => {
  const open = useContext(LaunchNavigationDrawerValueContext);
  const setOpen = useContext(LaunchNavigationDrawerSetContext);

  if (open === undefined) {
    throw new Error(
      'useLaunchNavigationDrawer must be wrapped inside LaunchNavigationDrawerValueContext'
    );
  }

  if (setOpen === undefined) {
    throw new Error(
      'useLaunchNavigationDrawer must be wrapped inside LaunchNavigationDrawerSetContext'
    );
  }

  // we shouldn't preoptimize hower since this is "global." We will preoptimize
  const toggleOpen = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, [setOpen]);

  return { open, setOpen, toggleOpen };
};

export default useLaunchNavigationDrawer;
