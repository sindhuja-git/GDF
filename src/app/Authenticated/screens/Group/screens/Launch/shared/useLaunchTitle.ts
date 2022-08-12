import { useContext } from 'react';

import {
  LaunchTitleValueContext,
  LaunchTitleSetContext,
} from '../components/LaunchLayoutProvider/context/LaunchTitleContextProvider';

const useLaunchTitle = () => {
  const title = useContext(LaunchTitleValueContext);
  const setTitle = useContext(LaunchTitleSetContext);

  if (title === undefined) {
    throw new Error(
      'useLaunchTitle must be wrapped inside LaunchTitleValueContext'
    );
  }

  if (setTitle === undefined) {
    throw new Error(
      'useLaunchTitle must be wrapped inside LaunchTitleSetContext'
    );
  }

  return {
    title,
    setTitle,
  };
};

export default useLaunchTitle;
