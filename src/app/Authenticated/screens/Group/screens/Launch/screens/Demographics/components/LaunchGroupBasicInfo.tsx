import React, { FC, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import useLaunchFormattedParams from 'app/Authenticated/screens/Group/screens/Launch/shared/useLaunchFormattedParams';
import { formatIsoStringToVernacularDate } from 'utils/date/helpers';
import { padToFour } from 'utils/padZero';
import ListItemGrid from 'app/components/shared/ListItemGrid';
import ListItemContainer from 'app/components/shared/ListItemContainer';
import { getGroupBasicInfoData } from 'app/api-urls';
import useApiCall from '../../../shared/useApiCall';
import { FetchStates } from '../../../shared/constants';

export type InfoItem = {
  compareStatus: string;
  gdfValue: string | boolean;
  gsuValue: string;
};

export type LaunchGroupBasicItem = {
  number: InfoItem;
  einTin: InfoItem;
  dbaName: InfoItem;
  name: InfoItem;
  inceptionDate?: InfoItem | null;
  isSmallGroup: InfoItem;
};

const initialInfoItem: InfoItem = {
  compareStatus: '',
  gdfValue: '',
  gsuValue: '',
};
const initialState: LaunchGroupBasicItem = {
  number: initialInfoItem,
  einTin: initialInfoItem,
  dbaName: initialInfoItem,
  name: initialInfoItem,
  inceptionDate: initialInfoItem,
  isSmallGroup: initialInfoItem,
};

export type BasicProps = {
  load?: boolean;
  err?: boolean;
};

const LaunchGroupBasicInfo: FC<BasicProps> = () => {
  const { groupId, launchId } = useLaunchFormattedParams();

  const {
    currentState: groupBasicInfoCallState,
    response: groupBasicInfo = initialState,
    makeApiCall: makeGroupBasicInfoCall,
  } = useApiCall({
    url: getGroupBasicInfoData(groupId, launchId),
    type: 'json',
  });

  useEffect(() => {
    if (groupBasicInfoCallState === FetchStates.NOT_YET_CALLED) {
      makeGroupBasicInfoCall();
    }
  }, [groupBasicInfoCallState, makeGroupBasicInfoCall]);
  return (
    <>
      {groupBasicInfoCallState === FetchStates.PENDING && (
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <CircularProgress color="inherit" />
          </Grid>
        </Grid>
      )}
      {groupBasicInfoCallState !== FetchStates.PENDING &&
        groupBasicInfoCallState !== FetchStates.ERROR && (
          <Grid container item>
            <ListItemGrid>
              <Grid item xs={3}>
                <ListItemContainer
                  header="Group Number"
                  valueId="group-nbr-value"
                  id="group-nbr-info"
                  value={
                    groupBasicInfo?.number &&
                    padToFour(Number(groupBasicInfo?.number?.gdfValue))
                  }
                  backgroundHighlight={
                    groupBasicInfo?.number?.compareStatus === 'NOT_EQUAL'
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <ListItemContainer
                  valueId="small-group-value"
                  id="small-group-info"
                  header="Small Group?"
                  referentialData
                  value={
                    groupBasicInfo?.isSmallGroup?.gdfValue === true
                      ? 'Yes'
                      : 'No'
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <ListItemContainer
                  header="Group Inception Date"
                  referentialData
                  value={
                    groupBasicInfo?.inceptionDate?.gdfValue
                      ? formatIsoStringToVernacularDate(
                          groupBasicInfo?.inceptionDate?.gdfValue.toString()
                        )
                      : ''
                  }
                />
              </Grid>
            </ListItemGrid>
            <ListItemGrid>
              <Grid item xs={6}>
                <ListItemContainer
                  valueId="legal-name-value"
                  id="legal-name"
                  header="Legal Name"
                  value={groupBasicInfo?.name?.gdfValue}
                  backgroundHighlight={
                    groupBasicInfo?.name?.compareStatus === 'NOT_EQUAL'
                  }
                />
              </Grid>

              <Grid item xs={3}>
                <ListItemContainer
                  valueId="eintin-value"
                  id="eintin"
                  header="EIN/TIN"
                  value={groupBasicInfo?.einTin?.gdfValue}
                  backgroundHighlight={
                    groupBasicInfo?.einTin?.compareStatus === 'NOT_EQUAL'
                  }
                />
              </Grid>
            </ListItemGrid>
            <ListItemGrid>
              <Grid item xs={3}>
                <ListItemContainer
                  valueId="dba-name-value"
                  id="dba-name"
                  header="DBA Name"
                  value={groupBasicInfo?.dbaName?.gdfValue || ''}
                  backgroundHighlight={
                    groupBasicInfo?.dbaName?.compareStatus === 'NOT_EQUAL'
                  }
                />
              </Grid>
            </ListItemGrid>
          </Grid>
        )}
    </>
  );
};

export default LaunchGroupBasicInfo;
