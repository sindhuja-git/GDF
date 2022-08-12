import React, { FC } from 'react';

// import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import useSetLaunchTitle from 'app/Authenticated/screens/Group/screens/Launch/shared/useSetLaunchTitle';

import LaunchGroupBasicInfo from './components/LaunchGroupBasicInfo';
import LaunchGroupRepsInfo from './components/LaunchGroupRepsInfo';
import LaunchEnrollment from './components/LaunchEnrollment';
import LaunchPrintTechInfo from './components/LaunchPrintTechInfo';
import LaunchSLSFulfillment from './components/LaunchSLSFulfillment';
import LaunchAddressInfo from './components/LaunchAddressInfo';
import LaunchMspInfo from './components/LaunchMspInfo';

const Demographics: FC<{}> = () => {
  useSetLaunchTitle('Demographics');

  return (
    <Card>
      <CardContent>
        <LaunchGroupBasicInfo />
        <LaunchGroupRepsInfo />
        <LaunchEnrollment />
        <LaunchPrintTechInfo />
        <LaunchSLSFulfillment />
        <LaunchAddressInfo />
        <LaunchMspInfo />
      </CardContent>
    </Card>
  );
};

export default Demographics;
