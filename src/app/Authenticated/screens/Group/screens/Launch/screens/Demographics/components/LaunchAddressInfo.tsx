import React, { FC, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import useLaunchFormattedParams from 'app/Authenticated/screens/Group/screens/Launch/shared/useLaunchFormattedParams';

import ListItemContainer from 'app/components/shared/ListItemContainer';
import ListItemGrid from 'app/components/shared/ListItemGrid';
import SectionHeaderContainer from 'app/components/shared/SectionHeaderContainer';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { getGroupAddressData } from 'app/api-urls';
import { FetchStates } from '../../../shared/constants';
import useApiCall from '../../../shared/useApiCall';

const useAddressBorderStyles = makeStyles((theme: Theme) => {
  return createStyles({
    contentBorder: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  });
});

export type Info = {
  compareStatus: string;
  gdfValue: string | boolean;
  gsuValue: string;
};

export type InfoItem = {
  street1: Info;
  street2: Info;
  city: Info;
  state: Info;
  county: Info;
  zip: Info;
};

export type LaunchAddressItem = {
  address: InfoItem;
};

const infoItem: Info = {
  compareStatus: '',
  gdfValue: '',
  gsuValue: '',
};

const initialInfoItem: InfoItem = {
  street1: infoItem,
  street2: infoItem,
  city: infoItem,
  state: infoItem,
  county: infoItem,
  zip: infoItem,
};

const initialState: LaunchAddressItem = {
  address: initialInfoItem,
};
export type BasicProps = {
  load?: boolean;
  err?: boolean;
};

const LaunchAddressInfo: FC<BasicProps> = () => {
  const { groupId, launchId } = useLaunchFormattedParams();

  const classes = useAddressBorderStyles();

  const {
    currentState: groupAddressInfoCallState,
    response: groupAddressInfo = initialState,
    makeApiCall: makeGroupAddressInfoCall,
  } = useApiCall({
    url: getGroupAddressData(groupId, launchId),
    type: 'json',
  });

  useEffect(() => {
    if (groupAddressInfoCallState === FetchStates.NOT_YET_CALLED) {
      makeGroupAddressInfoCall();
    }
  }, [groupAddressInfoCallState, makeGroupAddressInfoCall]);

  return (
    <>
      {groupAddressInfoCallState === FetchStates.PENDING && (
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <CircularProgress color="inherit" />
          </Grid>
        </Grid>
      )}
      {groupAddressInfoCallState !== FetchStates.ERROR &&
        groupAddressInfoCallState !== FetchStates.PENDING && (
          <Grid container item className={classes.contentBorder}>
            <SectionHeaderContainer header="Address" />
            <ListItemGrid>
              <Grid item xs={6}>
                <ListItemContainer
                  valueId="address-line1-value"
                  id="address-line1-info"
                  header="Address Line 1"
                  value={groupAddressInfo?.address?.street1?.gdfValue}
                  backgroundHighlight={
                    groupAddressInfo?.address?.street1?.compareStatus ===
                    'NOT_EQUAL'
                  }
                />
              </Grid>
            </ListItemGrid>
            <ListItemGrid>
              <Grid item xs={6}>
                <ListItemContainer
                  valueId="address-line2-value"
                  id="address-line2-info"
                  header="Address Line 2"
                  value={groupAddressInfo?.address?.street2?.gdfValue}
                  backgroundHighlight={
                    groupAddressInfo?.address?.street2?.compareStatus ===
                    'NOT_EQUAL'
                  }
                />
              </Grid>
            </ListItemGrid>
            <ListItemGrid>
              <Grid item xs={3}>
                <ListItemContainer
                  valueId="city-value"
                  id="city-info"
                  header="City"
                  value={groupAddressInfo?.address?.city?.gdfValue}
                  backgroundHighlight={
                    groupAddressInfo?.address?.city?.compareStatus ===
                    'NOT_EQUAL'
                  }
                />
              </Grid>
              <Grid item xs={1}>
                <ListItemContainer
                  valueId="state-value"
                  id="state-info"
                  header="State"
                  value={groupAddressInfo?.address?.state?.gdfValue}
                  backgroundHighlight={
                    groupAddressInfo?.address?.state?.compareStatus ===
                    'NOT_EQUAL'
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <ListItemContainer
                  valueId="zip-value"
                  id="zip-info"
                  header="ZIP Code"
                  value={groupAddressInfo?.address?.zip?.gdfValue}
                  backgroundHighlight={
                    groupAddressInfo?.address?.zip?.compareStatus ===
                    'NOT_EQUAL'
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <ListItemContainer
                  valueId="county-value"
                  id="county-info"
                  header="County"
                  value={groupAddressInfo?.address?.county?.gdfValue}
                  backgroundHighlight={
                    groupAddressInfo?.address?.county?.compareStatus ===
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

export default LaunchAddressInfo;
