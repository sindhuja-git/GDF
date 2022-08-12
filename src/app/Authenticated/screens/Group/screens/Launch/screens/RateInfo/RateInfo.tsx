import React, { FC } from 'react';

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import useSetLaunchTitle from 'app/Authenticated/screens/Group/screens/Launch/shared/useSetLaunchTitle';
import LaunchRateInfo from './components/LaunchRateInfo';

const RateInfo: FC<{}> = () => {
  useSetLaunchTitle('Rates Info');
  return (
    <Container>
      <Card>
        <CardContent>
          <LaunchRateInfo />
        </CardContent>
      </Card>
    </Container>
  );
};

export default RateInfo;
