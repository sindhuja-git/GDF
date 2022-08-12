import React, { FC, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import useLaunchFormattedParams from 'app/Authenticated/screens/Group/screens/Launch/shared/useLaunchFormattedParams';

import ListItemGrid from 'app/components/shared/ListItemGrid';
import ListItemContainer from 'app/components/shared/ListItemContainer';
import { getGroupMspData } from 'app/api-urls';

import { formatIsoStringToVernacularDate } from 'utils/date/helpers';
import useApiCall from '../../../shared/useApiCall';
import { FetchStates } from '../../../shared/constants';

export type LaunchMspItem = {
  mspGroupSize: {
    code: {
      gdfValue: string;
      gsuValue: string;
      compareStatus: string;
    };
    compareStatus: string;
  };
  mspGroupSizeEffectiveDate: {
    gdfValue: string;
    gsuValue: string;
    compareStatus: string;
  };
  compareStatus: string;
};

const initialState: LaunchMspItem = {
  mspGroupSize: {
    code: {
      gdfValue: '',
      gsuValue: '',
      compareStatus: '',
    },
    compareStatus: '',
  },
  mspGroupSizeEffectiveDate: {
    gdfValue: '',
    gsuValue: '',
    compareStatus: '',
  },
  compareStatus: '',
};

export type BasicProps = {
  load?: boolean;
  err?: boolean;
};

const LaunchMspInfo: FC<BasicProps> = () => {
  const { groupId, launchId } = useLaunchFormattedParams();

  const {
    currentState: groupMspInfoCallState,
    response: groupMspInfo = initialState,
    makeApiCall: makeGroupMspInfoCall,
  } = useApiCall({
    url: getGroupMspData(groupId, launchId),
    type: 'json',
  });

  useEffect(() => {
    if (groupMspInfoCallState === FetchStates.NOT_YET_CALLED) {
      makeGroupMspInfoCall();
    }
  }, [groupMspInfoCallState, makeGroupMspInfoCall]);

  return (
    <>
      {groupMspInfoCallState === FetchStates.PENDING && (
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <CircularProgress color="inherit" />
          </Grid>
        </Grid>
      )}
      {groupMspInfoCallState !== FetchStates.PENDING &&
        groupMspInfoCallState !== FetchStates.ERROR && (
          <Grid container item>
            <ListItemGrid>
              <Grid item xs={4}>
                <ListItemContainer
                  valueId="msp-grp-size-value"
                  id="msp-grp-size-info"
                  header="MSP Group Size"
                  value={groupMspInfo?.mspGroupSize?.code?.gdfValue}
                  backgroundHighlight={
                    groupMspInfo?.mspGroupSize?.code?.compareStatus ===
                    'NOT_EQUAL'
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <ListItemContainer
                  valueId="msp-grp-date-value"
                  id="msp-grp-date-info"
                  header="MSP Group Size Effective Date"
                  value={
                    groupMspInfo?.mspGroupSizeEffectiveDate?.gdfValue
                      ? formatIsoStringToVernacularDate(
                          groupMspInfo?.mspGroupSizeEffectiveDate?.gdfValue.toString()
                        )
                      : ''
                  }
                  backgroundHighlight={
                    groupMspInfo?.mspGroupSizeEffectiveDate?.compareStatus ===
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

export default LaunchMspInfo;
