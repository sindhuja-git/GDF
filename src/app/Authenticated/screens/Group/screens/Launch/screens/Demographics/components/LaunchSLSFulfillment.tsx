import React, { FC, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import useLaunchFormattedParams from 'app/Authenticated/screens/Group/screens/Launch/shared/useLaunchFormattedParams';
import SectionHeaderContainer from 'app/components/shared/SectionHeaderContainer';

import ListItemGrid from 'app/components/shared/ListItemGrid';
import ListItemContainer from 'app/components/shared/ListItemContainer';
import { getGroupSLSFulfillmentData } from 'app/api-urls';
import useApiCall from '../../../shared/useApiCall';
import { FetchStates } from '../../../shared/constants';

// TBD REMOVE LATER
export type LaunchSLSFulfillmentInfoQuery = {
  launchedGroup: {
    id: string;
    launchId: number;
    paperless: {
      code: string;
      name: string;
    };
  };
};

export type Info = {
  compareStatus: string;
  gdfValue: string | boolean;
  gsuValue: string;
};

export type InfoItem = {
  code: Info;
  name: Info;
  compareStatus: string;
};

export type LaunchSlsFulfillmentItem = {
  paperless: InfoItem;
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

const initialState: LaunchSlsFulfillmentItem = {
  paperless: initialInfoItem,
};

export type BasicProps = {
  load?: boolean;
  err?: boolean;
};

const LaunchSLSFulfillment: FC<BasicProps> = () => {
  // const classes = useGroupHeaderStyles();

  const { groupId, launchId } = useLaunchFormattedParams();

  const {
    currentState: groupSlsFulfillmentInfoCallState,
    response: groupSlsFulfillmentInfo = initialState,
    makeApiCall: makeGroupSlsFulfillmentInfoCall,
  } = useApiCall({
    url: getGroupSLSFulfillmentData(groupId, launchId),
    type: 'json',
  });

  useEffect(() => {
    if (groupSlsFulfillmentInfoCallState === FetchStates.NOT_YET_CALLED) {
      makeGroupSlsFulfillmentInfoCall();
    }
  }, [groupSlsFulfillmentInfoCallState, makeGroupSlsFulfillmentInfoCall]);

  return (
    <>
      {groupSlsFulfillmentInfoCallState === FetchStates.PENDING && (
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <CircularProgress color="inherit" />
          </Grid>
        </Grid>
      )}
      {groupSlsFulfillmentInfoCallState !== FetchStates.PENDING &&
        groupSlsFulfillmentInfoCallState !== FetchStates.ERROR && (
          <Grid container item>
            <SectionHeaderContainer header="SLS Fulfillment" />
            <ListItemGrid>
              <Grid item xs={3}>
                <ListItemContainer
                  valueId="sls-paperless-value"
                  id="sls-paperless-info"
                  header="SLS Paperless Setting"
                  value={`${groupSlsFulfillmentInfo?.paperless?.name?.gdfValue}`}
                  backgroundHighlight={
                    groupSlsFulfillmentInfo?.paperless?.compareStatus ===
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

export default LaunchSLSFulfillment;
