import React, { FC, useEffect } from 'react';
import { Box, Grid, CircularProgress, Typography } from '@material-ui/core';
import useLaunchFormattedParams from 'app/Authenticated/screens/Group/screens/Launch/shared/useLaunchFormattedParams';
import { getPackageCodeData } from 'app/api-urls';
import useApiCall from '../../shared/useApiCall';
import { FetchStates } from '../../shared/constants';

export type LaunchPackageCodeItem = {
  medicalPackageCode: string;
  autoDentalPackageCode: string;
};

const initialState: LaunchPackageCodeItem = {
  medicalPackageCode: '',
  autoDentalPackageCode: '',
};
export type BasicProps = {
  load?: boolean;
  err?: boolean;
};

const LaunchPackageCode: FC<BasicProps> = () => {
  const pathArray = window.location.pathname.split('/');
  const { groupId, launchId } = useLaunchFormattedParams();

  const planId = pathArray[7];
  const {
    currentState: packageCodeCallState,
    response: packageCodeInfo = initialState,
    makeApiCall: makePackageCodeCall,
  } = useApiCall({
    url: getPackageCodeData(groupId, launchId, planId),
    type: 'json',
  });

  useEffect(() => {
    if (packageCodeCallState === FetchStates.NOT_YET_CALLED) {
      makePackageCodeCall();
    }
  }, [packageCodeCallState, makePackageCodeCall]);

  return (
    <>
      {packageCodeCallState === FetchStates.PENDING && (
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <CircularProgress color="inherit" />
          </Grid>
        </Grid>
      )}
      {packageCodeCallState !== FetchStates.PENDING &&
        packageCodeCallState !== FetchStates.ERROR && (
          <Box>
            <Typography variant="h2" component="h2">
              {packageCodeInfo?.medicalPackageCode}
              {packageCodeInfo?.autoDentalPackageCode
                ? ` | ${packageCodeInfo?.autoDentalPackageCode}`
                : null}
            </Typography>
          </Box>
        )}
    </>
  );
};

export default LaunchPackageCode;
