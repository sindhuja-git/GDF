import React, { FC, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { makeStyles } from '@material-ui/core/styles';
import useLaunchFormattedParams from 'app/Authenticated/screens/Group/screens/Launch/shared/useLaunchFormattedParams';
import { FetchStates } from 'app/Authenticated/screens/Group/screens/Launch/shared/constants';

import { formatIsoStringToVernacularDate } from 'utils/date/helpers';
import ListItemContainer from 'app/components/shared/ListItemContainer';
import ListItemGrid from 'app/components/shared/ListItemGrid';
import { getPlanDetailsData } from 'app/api-urls';
import SectionHeaderContainer from 'app/components/shared/SectionHeaderContainer';
import { useSelector } from 'react-redux';
import { selectMacPlanSummary } from 'app/Ducks/PlanSummary/selectors';
import useApiCall from '../../../shared/useApiCall';

export type InfoItem = {
  compareStatus: string;
  gdfValue: string;
  gsuValue: string;
};

export type LaunchPlanDetailItem = {
  id: InfoItem;
  name: InfoItem;
  beginDate: InfoItem;
  endDate: InfoItem;
  planType?: PlanTypeinfo | null;
  compareStatus?: string | null;
};

export type PlanTypeinfo = {
  code: InfoItem;
  name: InfoItem;
  compareStatus: string;
};

const initialInfoItem: InfoItem = {
  compareStatus: '',
  gdfValue: '',
  gsuValue: '',
};

const planTypeInfoItem: PlanTypeinfo = {
  code: initialInfoItem,
  name: initialInfoItem,
  compareStatus: '',
};

const initialState: LaunchPlanDetailItem = {
  id: initialInfoItem,
  name: initialInfoItem,
  beginDate: initialInfoItem,
  endDate: initialInfoItem,
  planType: planTypeInfoItem,
  compareStatus: null,
};

export type BasicProps = {
  load?: boolean;
  err?: boolean;
};

const useStyles = makeStyles((theme) => ({
  errorBorder: {
    border: '2px solid',
    borderColor: theme.palette.error.main,
    color: '#d91535',
  },
  errorText: {
    marginTop: '2px',
  },
}));

const LaunchPlanDetails: FC<BasicProps> = () => {
  const { groupId, launchId, planId, packageCode } = useLaunchFormattedParams();

  const classes = useStyles();

  const {
    currentState: groupPlanDetailsCallState,
    response: groupPlanDetails = initialState,
    makeApiCall: makeGroupPlanDetailsCall,
  } = useApiCall({
    url: getPlanDetailsData(groupId, launchId, planId, packageCode),
    type: 'json',
  });

  useEffect(() => {
    if (groupPlanDetailsCallState === FetchStates.NOT_YET_CALLED) {
      makeGroupPlanDetailsCall();
    }
  }, [groupPlanDetailsCallState, makeGroupPlanDetailsCall]);

  const planSummaryInfo = useSelector(selectMacPlanSummary);
  const cannotAccuratelyCompareThisPlan: boolean = Array.isArray(
    planSummaryInfo
  )
    ? ['NOT_COMPARABLE', 'ONLY_IN_GDF'].includes(
        planSummaryInfo.find(
          (planSummary) => planSummary?.packageCode === packageCode
        )?.compareStatus
      )
    : false;

  const currentPlanInfo = planSummaryInfo?.find(
    (planSummary: { packageCode: string | number }) =>
      planSummary?.packageCode === packageCode
  );

  const gdfName = currentPlanInfo
    ? currentPlanInfo.gdfName
    : groupPlanDetails?.name?.gdfValue;

  return (
    <>
      {groupPlanDetailsCallState === FetchStates.PENDING && (
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <CircularProgress color="inherit" />
          </Grid>
        </Grid>
      )}
      {groupPlanDetailsCallState !== FetchStates.PENDING &&
        groupPlanDetailsCallState !== FetchStates.ERROR && (
          <Grid item>
            {cannotAccuratelyCompareThisPlan && (
              <Alert
                severity="error"
                variant="standard"
                className={classes.errorBorder}
                icon={<WarningAmberIcon />}
              >
                <Grid className={classes.errorText}>
                  GDF Viewer could not accurately compare this plan
                </Grid>
              </Alert>
            )}
            <SectionHeaderContainer header="Plan Details" />
            <ListItemGrid>
              <Grid item xs={4}>
                <ListItemContainer
                  header="GDF Name"
                  value={gdfName || ''}
                  backgroundHighlight={
                    groupPlanDetails?.name?.compareStatus === 'NOT_EQUAL'
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <ListItemContainer
                  header="Begin Date"
                  value={
                    groupPlanDetails?.beginDate?.gdfValue
                      ? formatIsoStringToVernacularDate(
                          groupPlanDetails?.beginDate?.gdfValue
                        )
                      : ''
                  }
                  backgroundHighlight={
                    groupPlanDetails?.beginDate?.compareStatus === 'NOT_EQUAL'
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <ListItemContainer
                  header="End Date"
                  value={
                    groupPlanDetails?.endDate?.gdfValue
                      ? formatIsoStringToVernacularDate(
                          groupPlanDetails?.endDate?.gdfValue
                        )
                      : ''
                  }
                  backgroundHighlight={
                    groupPlanDetails?.endDate?.compareStatus === 'NOT_EQUAL'
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <ListItemContainer
                  header="Plan Type"
                  value={groupPlanDetails?.planType?.name?.gdfValue || ''}
                />
              </Grid>
            </ListItemGrid>
          </Grid>
        )}
    </>
  );
};

export default LaunchPlanDetails;
