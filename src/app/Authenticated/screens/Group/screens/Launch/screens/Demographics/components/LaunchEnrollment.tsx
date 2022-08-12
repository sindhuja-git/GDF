import React, { FC, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import useLaunchFormattedParams from 'app/Authenticated/screens/Group/screens/Launch/shared/useLaunchFormattedParams';
import SectionHeaderContainer from 'app/components/shared/SectionHeaderContainer';

import ListItemGrid from 'app/components/shared/ListItemGrid';
import ListItemContainer from 'app/components/shared/ListItemContainer';
import { getGroupEnrollmentData } from 'app/api-urls';
import useApiCall from '../../../shared/useApiCall';
import { FetchStates } from '../../../shared/constants';

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

export type LaunchEnrollmentItem = {
  electronicEnrollment: Info;
  exchangeCode: InfoItem;
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

const initialState: LaunchEnrollmentItem = {
  electronicEnrollment: infoItem,
  exchangeCode: initialInfoItem,
};

export type BasicProps = {
  load?: boolean;
  err?: boolean;
};

const LaunchEnrollment: FC<BasicProps> = () => {
  const { groupId, launchId } = useLaunchFormattedParams();

  const {
    currentState: groupEnrollmentInfoCallState,
    response: groupEnrollmentInfo = initialState,
    makeApiCall: makeGroupEnrollmentInfoCall,
  } = useApiCall({
    url: getGroupEnrollmentData(groupId, launchId),
    type: 'json',
  });

  useEffect(() => {
    if (groupEnrollmentInfoCallState === FetchStates.NOT_YET_CALLED) {
      makeGroupEnrollmentInfoCall();
    }
  }, [groupEnrollmentInfoCallState, makeGroupEnrollmentInfoCall]);

  return (
    <>
      {groupEnrollmentInfoCallState === FetchStates.PENDING && (
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <CircularProgress color="inherit" />
          </Grid>
        </Grid>
      )}
      {groupEnrollmentInfoCallState !== FetchStates.PENDING &&
        groupEnrollmentInfoCallState !== FetchStates.ERROR && (
          <Grid container item>
            <SectionHeaderContainer header="Enrollment" />
            <ListItemGrid>
              <Grid item xs={2}>
                <ListItemContainer
                  valueId="electronic-enroll-value"
                  id="electronic-enroll-info"
                  header="Electronic Enrollment?"
                  value={
                    groupEnrollmentInfo?.electronicEnrollment?.gdfValue === true
                      ? 'Yes'
                      : 'No'
                  }
                  backgroundHighlight={
                    groupEnrollmentInfo?.electronicEnrollment?.compareStatus ===
                    'NOT_EQUAL'
                  }
                />
              </Grid>
              <Grid item xs={5}>
                <ListItemContainer
                  valueId="exchnge-code-value"
                  id="exchnge-code-info"
                  header="Exchange Code"
                  value={`${groupEnrollmentInfo?.exchangeCode?.code?.gdfValue} | ${groupEnrollmentInfo?.exchangeCode?.name?.gdfValue}`}
                  backgroundHighlight={
                    groupEnrollmentInfo?.exchangeCode?.compareStatus ===
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

export default LaunchEnrollment;
