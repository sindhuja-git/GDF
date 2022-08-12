import React, { FC } from 'react';
import { Grid, Card, CardContent } from '@material-ui/core';
import useSetLaunchTitle from 'app/Authenticated/screens/Group/screens/Launch/shared/useSetLaunchTitle';
import LaunchGspAssociationsTable from './components/LaunchGspAssociationsTable';
import GspPlanCards from './components/GspPlanCards';

const Gsp: FC<{}> = () => {
  useSetLaunchTitle('GSP');

  return (
    <Card>
      <CardContent>
        <Grid container>
          <Grid item xs={5}>
            <LaunchGspAssociationsTable />
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={4}>
            <GspPlanCards />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Gsp;
