import React, { FC } from 'react';
import useSetLaunchTitle from 'app/Authenticated/screens/Group/screens/Launch/shared/useSetLaunchTitle';
import LaunchContactsGrid from './components/LaunchContactsGrid';

const Contacts: FC<{}> = () => {
  useSetLaunchTitle('Contacts');
  return <LaunchContactsGrid />;
};

export default Contacts;
