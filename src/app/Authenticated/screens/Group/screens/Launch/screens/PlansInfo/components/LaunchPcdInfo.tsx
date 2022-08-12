import React, { FC, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import useLaunchFormattedParams from 'app/Authenticated/screens/Group/screens/Launch/shared/useLaunchFormattedParams';
import ListItemContainer from 'app/components/shared/ListItemContainer';
import ListItemGrid from 'app/components/shared/ListItemGrid';
import SectionHeaderContainer from 'app/components/shared/SectionHeaderContainer';
import { getPcdInfoData } from 'app/api-urls';
import useApiCall from '../../../shared/useApiCall';
import { FetchStates } from '../../../shared/constants';

export type InfoItem = {
  compareStatus: string;
  gdfValue: string;
  gsuValue: string;
};

export type LaunchPlanPcdInfoItem = {
  packageCode: InfoItem;
  deliveryNetwork: PcdInfo;
  fundingType: PcdInfo;
  corporation: PcdInfo;
};

export type PcdInfo = {
  code: InfoItem;
  name: InfoItem;
  compareStatus: string;
};

const initialInfoItem: InfoItem = {
  compareStatus: '',
  gdfValue: '',
  gsuValue: '',
};

const initialPcdInfoItem: PcdInfo = {
  code: initialInfoItem,
  name: initialInfoItem,
  compareStatus: '',
};

const initialState: LaunchPlanPcdInfoItem = {
  packageCode: initialInfoItem,
  deliveryNetwork: initialPcdInfoItem,
  fundingType: initialPcdInfoItem,
  corporation: initialPcdInfoItem,
};

export type BasicProps = {
  load?: boolean;
  err?: boolean;
};

const LaunchPcdInfo: FC<BasicProps> = () => {
  const { groupId, launchId, planId, packageCode } = useLaunchFormattedParams();

  const {
    currentState: groupPcdInfoCallState,
    response: groupPcdInfo = initialState,
    makeApiCall: makeGroupPcdInfoCall,
  } = useApiCall({
    url: getPcdInfoData(groupId, launchId, planId, packageCode),
    type: 'json',
  });

  useEffect(() => {
    if (groupPcdInfoCallState === FetchStates.NOT_YET_CALLED) {
      makeGroupPcdInfoCall();
    }
  }, [groupPcdInfoCallState, makeGroupPcdInfoCall]);

  return (
    <>
      {groupPcdInfoCallState === FetchStates.PENDING && (
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <CircularProgress color="inherit" />
          </Grid>
        </Grid>
      )}
      {groupPcdInfoCallState !== FetchStates.PENDING &&
        groupPcdInfoCallState !== FetchStates.ERROR && (
          <Grid container direction="column">
            <SectionHeaderContainer header="PCD Info" />
            <ListItemGrid>
              <Grid item xs={3}>
                <ListItemContainer
                  header="Package Code"
                  value={groupPcdInfo?.packageCode?.gdfValue || ''}
                  backgroundHighlight={
                    groupPcdInfo?.packageCode?.compareStatus === 'NOT_EQUAL'
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <ListItemContainer
                  header="Delivery Network"
                  value={
                    groupPcdInfo?.deliveryNetwork?.code?.gdfValue
                      ? `${groupPcdInfo?.deliveryNetwork?.code?.gdfValue} - ${groupPcdInfo?.deliveryNetwork?.name?.gdfValue}`
                      : '' || ''
                  }
                  backgroundHighlight={
                    groupPcdInfo?.deliveryNetwork?.compareStatus === 'NOT_EQUAL'
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <ListItemContainer
                  header="Funding Type"
                  value={groupPcdInfo?.fundingType?.name?.gdfValue || ''}
                  backgroundHighlight={
                    groupPcdInfo?.fundingType?.compareStatus === 'NOT_EQUAL'
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <ListItemContainer
                  header="Corporation"
                  value={groupPcdInfo?.corporation?.name?.gdfValue || ''}
                  backgroundHighlight={
                    groupPcdInfo?.corporation?.compareStatus === 'NOT_EQUAL'
                  }
                />
              </Grid>
            </ListItemGrid>
          </Grid>
        )}
    </>
  );
};

export default LaunchPcdInfo;
