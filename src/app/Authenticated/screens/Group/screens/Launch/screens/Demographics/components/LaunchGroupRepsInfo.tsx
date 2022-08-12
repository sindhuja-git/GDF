import React, { FC, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import useLaunchFormattedParams from 'app/Authenticated/screens/Group/screens/Launch/shared/useLaunchFormattedParams';
import ListItemContainer from 'app/components/shared/ListItemContainer';
import ListItemGrid from 'app/components/shared/ListItemGrid';
import SectionHeaderContainer from 'app/components/shared/SectionHeaderContainer';
import { getGroupRepsData } from 'app/api-urls';
import { FetchStates } from '../../../shared/constants';
import useApiCall from '../../../shared/useApiCall';

export type Info = {
  compareStatus: string;
  gdfValue: string | boolean;
  gsuValue: string;
};

export type InfoItem = {
  firstName: Info;
  lastName: Info;
  compareStatus: string;
};

export type LaunchGroupRepsItem = {
  macRep: InfoItem;
  salesAccountMgr: InfoItem;
  customerServiceRep: InfoItem;
};

const item: Info = {
  compareStatus: '',
  gdfValue: '',
  gsuValue: '',
};

const initialInfoItem: InfoItem = {
  firstName: item,
  lastName: item,
  compareStatus: '',
};

const initialState: LaunchGroupRepsItem = {
  macRep: initialInfoItem,
  salesAccountMgr: initialInfoItem,
  customerServiceRep: initialInfoItem,
};

export type BasicProps = {
  load?: boolean;
  err?: boolean;
};

const LaunchGroupRepsInfo: FC<BasicProps> = () => {
  const { groupId, launchId } = useLaunchFormattedParams();

  const {
    currentState: groupRepsInfoCallState,
    response: groupRepsInfo = initialState,
    makeApiCall: makeGroupRepsInfoCall,
  } = useApiCall({
    url: getGroupRepsData(groupId, launchId),
    type: 'json',
  });

  useEffect(() => {
    if (groupRepsInfoCallState === FetchStates.NOT_YET_CALLED) {
      makeGroupRepsInfoCall();
    }
  }, [groupRepsInfoCallState, makeGroupRepsInfoCall]);

  return (
    <>
      {groupRepsInfoCallState === FetchStates.PENDING && (
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <CircularProgress color="inherit" />
          </Grid>
        </Grid>
      )}
      {groupRepsInfoCallState !== FetchStates.PENDING &&
        groupRepsInfoCallState !== FetchStates.ERROR && (
          <Grid container item>
            <SectionHeaderContainer header="Group Reps" />
            <ListItemGrid>
              <Grid item xs={3}>
                <ListItemContainer
                  valueId="mac-rep-value"
                  id="mac-rep-info"
                  header="MAC Rep"
                  value={`${groupRepsInfo?.macRep?.lastName?.gdfValue}, ${groupRepsInfo?.macRep?.firstName?.gdfValue}`}
                  backgroundHighlight={
                    groupRepsInfo?.macRep?.compareStatus === 'NOT_EQUAL'
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <ListItemContainer
                  valueId="sales-acc-value"
                  id="sales-acc-info"
                  header="Sales Account Manager"
                  value={`${groupRepsInfo?.salesAccountMgr?.lastName?.gdfValue}, ${groupRepsInfo?.salesAccountMgr?.firstName?.gdfValue}`}
                  backgroundHighlight={
                    groupRepsInfo?.salesAccountMgr?.compareStatus ===
                    'NOT_EQUAL'
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <ListItemContainer
                  valueId="cust-rep-value"
                  id="cust-rep-info"
                  header="Sales Customer Service Rep"
                  value={
                    groupRepsInfo?.customerServiceRep?.firstName?.gdfValue &&
                    groupRepsInfo?.customerServiceRep?.firstName?.gdfValue !==
                      '' &&
                    `${groupRepsInfo?.customerServiceRep?.lastName?.gdfValue}, ${groupRepsInfo?.customerServiceRep?.firstName?.gdfValue}`
                  }
                  backgroundHighlight={
                    groupRepsInfo?.customerServiceRep?.compareStatus ===
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

export default LaunchGroupRepsInfo;
