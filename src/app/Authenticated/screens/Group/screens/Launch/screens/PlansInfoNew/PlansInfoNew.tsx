import React, { FC, useEffect } from 'react';
import { Container, CircularProgress, Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import useLaunchFormattedParams from 'app/Authenticated/screens/Group/screens/Launch/shared/useLaunchFormattedParams';
import useSetLaunchTitle from 'app/Authenticated/screens/Group/screens/Launch/shared/useSetLaunchTitle';
import {
  FetchStates,
  GOVERNMENT_MARKET_SEGMENT_CODES,
} from 'app/Authenticated/screens/Group/screens/Launch/shared/constants';
import LaunchPlanDetails from './components/LaunchPlanDetails';
import LaunchPcdInfo from './components/LaunchPcdInfo';
import LaunchPackageRules from './components/LaunchPackageRules';

/* import LaunchEligibilityRules from './components/LaunchEligibilityRules';
import LaunchAutoAssignDentalInfo from './components/LaunchAutoAssignDentalDetails'; */
import { getCommentsData, getPlanInfo } from '../../../../../../../api-urls';
/* import LaunchQuesAnswerInfo from './components/LaunchQuesAnswerInfo'; */
import LaunchCommentsContainer from '../shared/LaunchCommentsContainer';
import useApiCall from '../../shared/useApiCall';

/* const commentsInitialState: Array<CommentInfoItem> = [
  {
    text: '',
    createDate: '',
    createUser: '',
    createUserDisplayName: '',
  },
]; */

export type Info = {
  compareStatus: string;
  gdfValue: string;
  gsuValue: string;
};

export type InfoItem = {
  code: Info;
  name: Info;
  compareStatus: string;
};

export type LaunchPlanTypeInfoItem = {
  planType: InfoItem;
  marketSegment: InfoItem;
};

type CommentInfoItem = {
  text: string;
  createDate: string;
  createUser: string;
  createUserDisplayName: string;
};

const commentsInitialState: Array<CommentInfoItem> = [
  {
    text: '',
    createDate: '',
    createUser: '',
    createUserDisplayName: '',
  },
];

const PlansInfoNew: FC = () => {
  useSetLaunchTitle('Plans Info');
  const { groupId, launchId, planId, packageCode } = useLaunchFormattedParams();
  const {
    currentState: getPlanInfoCallState,
    response: planInfo,
    makeApiCall: makePlanInfoCall,
  } = useApiCall({
    url: getPlanInfo(groupId, launchId, planId, packageCode),
    type: 'json',
  });
  const {
    currentState: getCommentsCallState,
    response: comments = commentsInitialState,
    makeApiCall: makeCommentsCall,
  } = useApiCall({
    url: getCommentsData(planId),
    type: 'json',
  });

  useEffect(() => {
    const calls = [
      {
        currentState: getPlanInfoCallState,
        makeApiCall: makePlanInfoCall,
      },
      {
        currentState: getCommentsCallState,
        makeApiCall: makeCommentsCall,
      },
    ];
    calls.forEach(({ currentState, makeApiCall }) => {
      if (currentState === FetchStates.NOT_YET_CALLED) {
        makeApiCall();
      }
    });
  }, [
    getPlanInfoCallState,
    makePlanInfoCall,
    getCommentsCallState,
    makeCommentsCall,
  ]);
  const planType = (planInfo as any)?.type?.name?.gdfValue;
  const loading = getPlanInfoCallState === FetchStates.PENDING;
  const marketSegmentCode = (planInfo as any)?.packageInfos[0]?.packageRule
    ?.marketSegment?.code?.gdfValue;
  const isGovernmentPlan =
    planType === 'Medical' &&
    GOVERNMENT_MARKET_SEGMENT_CODES.some(
      (govtMarketSegmentCode) => govtMarketSegmentCode === marketSegmentCode
    );
  const error = getPlanInfoCallState === FetchStates.ERROR;
  return (
    <>
      {loading && (
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <CircularProgress color="inherit" />
          </Grid>
        </Grid>
      )}
      {!error && !loading && planType && (
        <Container>
          <Card>
            <CardContent>
              <LaunchPlanDetails planInfo={planInfo} />
              {(planType === 'CDHP' ||
                planType === 'Health & Well-Being Solutions' ||
                planType === 'Admin' ||
                planType === 'Health & Wellness' ||
                planType === 'Worksite Health/EAP') &&
                comments.length > 0 && (
                  <LaunchCommentsContainer comments={comments} />
                )}
              {planType !== 'Admin' &&
                planType !== 'Health & Wellness' &&
                planType !== 'Worksite Health/EAP' && (
                  <>
                    <LaunchPcdInfo planInfo={planInfo} />
                    <LaunchPackageRules
                      planInfo={planInfo}
                      planType={planType}
                      isGovernmentPlan={isGovernmentPlan}
                    />
                  </>
                )}
              {/*   {planType !== 'CDHP' &&
                planType !== 'Health & Well-Being Solutions' &&
                planType !== 'Admin' &&
                planType !== 'Health & Wellness' &&
                planType !== 'Worksite Health/EAP' && (
                  <>
                    <LaunchEligibilityRules
                      // planInfo={planInfo}
                      isGovernmentPlan={isGovernmentPlan}
                    />
                    <LaunchAutoAssignDentalInfo />
                  </>
                )} */}
            </CardContent>
          </Card>
        </Container>
      )}
    </>
  );
};

export default PlansInfoNew;
