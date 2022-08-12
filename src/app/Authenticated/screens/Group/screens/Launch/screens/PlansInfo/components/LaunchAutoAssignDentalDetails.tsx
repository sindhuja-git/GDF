import React, { FC, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import SectionHeaderContainer from 'app/components/shared/SectionHeaderContainer';
import ListItemContainer from 'app/components/shared/ListItemContainer';
import ListItemGrid from 'app/components/shared/ListItemGrid';
import { getPackageRulesData } from 'app/api-urls';
import useLaunchFormattedParams from '../../../shared/useLaunchFormattedParams';
import useApiCall from '../../../shared/useApiCall';
import { FetchStates } from '../../../shared/constants';

export type LaunchAutoAssignDentalDetails = {
  autoAssignType: {
    gdfValue: string;
    gsuValue: string;
    compareStatus: string;
  };
  autoAssignPackage: {
    gdfValue: string | null;
    gsuValue: string;
    compareStatus: string;
  };
  autoAssignPackageDeliveryNetwork: InfoItem;
};

export type Info = {
  compareStatus: string;
  gdfValue: string | null;
  gsuValue: string;
};

export type InfoItem = {
  code: Info;
  name: Info;
  compareStatus: string;
};

const infoItem: Info = {
  compareStatus: '',
  gdfValue: '',
  gsuValue: '',
};

const initialInfoItem: InfoItem = {
  code: infoItem,
  name: infoItem,
  compareStatus: '',
};

const initialState: LaunchAutoAssignDentalDetails = {
  autoAssignType: {
    gdfValue: '',
    gsuValue: '',
    compareStatus: '',
  },
  autoAssignPackage: {
    gdfValue: '',
    gsuValue: '',
    compareStatus: '',
  },
  autoAssignPackageDeliveryNetwork: initialInfoItem,
};

export type BasicProps = {
  load?: boolean;
  err?: boolean;
};

const LaunchAutoAssignDentalInfo: FC<BasicProps> = () => {
  const { groupId, launchId, planId, packageCode } = useLaunchFormattedParams();

  const {
    currentState: autoAssignDentalInfoCallState,
    response: autoAssignDentalInfo = initialState,
    makeApiCall: makeAutoAssignDentalInfoCall,
  } = useApiCall({
    url: getPackageRulesData(groupId, launchId, planId, packageCode),
    type: 'json',
  });

  useEffect(() => {
    if (autoAssignDentalInfoCallState === FetchStates.NOT_YET_CALLED) {
      makeAutoAssignDentalInfoCall();
    }
  }, [autoAssignDentalInfoCallState, makeAutoAssignDentalInfoCall]);

  return (
    <>
      {autoAssignDentalInfoCallState === FetchStates.PENDING && (
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <CircularProgress color="inherit" />
          </Grid>
        </Grid>
      )}
      {autoAssignDentalInfoCallState !== FetchStates.PENDING &&
        autoAssignDentalInfoCallState !== FetchStates.ERROR &&
        autoAssignDentalInfo?.autoAssignPackage?.gdfValue && (
          <Grid container direction="column">
            <SectionHeaderContainer header="Auto Assigned Dental" />
            <ListItemGrid>
              <Grid item xs={2}>
                <ListItemContainer
                  header="Auto Assign Package"
                  value={autoAssignDentalInfo?.autoAssignPackage?.gdfValue}
                  backgroundHighlight={
                    autoAssignDentalInfo?.autoAssignPackage?.compareStatus ===
                    'NOT_EQUAL'
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <ListItemContainer
                  header="Auto Assign Package Delivery Network"
                  value={
                    autoAssignDentalInfo?.autoAssignPackageDeliveryNetwork?.code
                      ?.gdfValue !== undefined &&
                    `${autoAssignDentalInfo?.autoAssignPackageDeliveryNetwork?.code?.gdfValue} - ${autoAssignDentalInfo?.autoAssignPackageDeliveryNetwork?.name?.gdfValue}`
                  }
                  backgroundHighlight={
                    autoAssignDentalInfo?.autoAssignPackageDeliveryNetwork
                      ?.compareStatus === 'NOT_EQUAL'
                  }
                />
              </Grid>
              <Grid item xs={7}>
                <ListItemContainer
                  header="Auto Assign Type"
                  value={autoAssignDentalInfo?.autoAssignType?.gdfValue}
                  backgroundHighlight={
                    autoAssignDentalInfo?.autoAssignType?.compareStatus ===
                    'NOT_EQUAL'
                  }
                />
              </Grid>
            </ListItemGrid>
          </Grid>
        )}
    </>
  );
};

export default LaunchAutoAssignDentalInfo;
