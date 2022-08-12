import React, { FC } from 'react';
import useSetLaunchTitle from 'app/Authenticated/screens/Group/screens/Launch/shared/useSetLaunchTitle';
import LaunchSitesGrid from './components/LaunchSitesGrid';

const Sites: FC<{}> = () => {
  useSetLaunchTitle('Sites');
  return <LaunchSitesGrid />;
};

export default Sites;
