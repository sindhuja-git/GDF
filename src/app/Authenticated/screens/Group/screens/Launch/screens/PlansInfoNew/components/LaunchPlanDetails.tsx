import React, { FC, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { makeStyles } from '@material-ui/core/styles';
import useLaunchFormattedParams from 'app/Authenticated/screens/Group/screens/Launch/shared/useLaunchFormattedParams';

import { formatIsoStringToVernacularDate } from 'utils/date/helpers';
import ListItemContainer from 'app/components/shared/ListItemContainer';
import ListItemGrid from 'app/components/shared/ListItemGrid';
import SectionHeaderContainer from 'app/components/shared/SectionHeaderContainer';
import { useSelector } from 'react-redux';
import { selectMacPlanSummary } from 'app/Ducks/PlanSummary/selectors';
import { getGdfName } from 'app/api-urls';
import useApiCall from '../../../shared/useApiCall';
import { FetchStates } from '../../../shared/constants';

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

export type ItemProps = {
  planInfo: any;
};

const LaunchPlanDetails: FC<ItemProps> = (props) => {
  const { planInfo } = props;
  const { packageInfos, type } = planInfo;
  const { launchId, planId, packageCode } = useLaunchFormattedParams();

  const classes = useStyles();

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
  const {
    currentState: gdfNameCallState,
    response: gdfName = '',
    makeApiCall: makeGdfNameCall,
  } = useApiCall({
    url: getGdfName(launchId, planId),
    type: 'text',
  });

  useEffect(() => {
    if (gdfNameCallState === FetchStates.NOT_YET_CALLED) {
      makeGdfNameCall();
    }
  }, [gdfNameCallState, makeGdfNameCall]);

  return (
    <>
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
              value={gdfName}

              /*  TBD
              backgroundHighlight={
                groupPlanDetails?.name?.compareStatus === 'NOT_EQUAL'
              } */
            />
          </Grid>
          <Grid item xs={2}>
            <ListItemContainer
              header="Begin Date"
              value={
                packageInfos[0]?.effectiveFromDate?.gdfValue
                  ? formatIsoStringToVernacularDate(
                      packageInfos[0]?.effectiveFromDate?.gdfValue
                    )
                  : ''
              }
              backgroundHighlight={
                packageInfos[0]?.effectiveFromDate?.compareStatus ===
                'NOT_EQUAL'
              }
            />
          </Grid>
          <Grid item xs={2}>
            <ListItemContainer
              header="End Date"
              value={
                packageInfos[0]?.effectiveToDate?.gdfValue
                  ? formatIsoStringToVernacularDate(
                      packageInfos[0]?.effectiveToDate?.gdfValue
                    )
                  : ''
              }
              backgroundHighlight={
                packageInfos[0]?.effectiveToDate?.compareStatus === 'NOT_EQUAL'
              }
            />
          </Grid>
          <Grid item xs={2}>
            <ListItemContainer
              header="Plan Type"
              value={type?.name?.gdfValue || ''}
            />
          </Grid>
        </ListItemGrid>
      </Grid>
    </>
  );
};

export default LaunchPlanDetails;
