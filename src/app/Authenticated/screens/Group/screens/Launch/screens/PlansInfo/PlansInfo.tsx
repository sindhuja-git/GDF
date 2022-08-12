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

import LaunchEligibilityRules from './components/LaunchEligibilityRules';
import LaunchAutoAssignDentalInfo from './components/LaunchAutoAssignDentalDetails';
import {
  getCommentsData,
  getPlanDetailsData,
  getPackageRulesData,
} from '../../../../../../../api-urls';
import LaunchQuesAnswerInfo from './components/LaunchQuesAnswerInfo';
import LaunchCommentsContainer from '../shared/LaunchCommentsContainer';
import useApiCall from '../../shared/useApiCall';

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

const initialState: LaunchPlanTypeInfoItem = {
  planType: initialInfoItem,
  marketSegment: initialInfoItem,
};

const commentsInitialState: Array<CommentInfoItem> = [
  {
    text: '',
    createDate: '',
    createUser: '',
    createUserDisplayName: '',
  },
];

const PlansInfo: FC = () => {
  useSetLaunchTitle('Plans Info');
  const { groupId, launchId, planId, packageCode } = useLaunchFormattedParams();

  const {
    currentState: getPlanDetailsCallState,
    response: planDetails = initialState,
    makeApiCall: makePlanDetailsCall,
  } = useApiCall({
    url: getPlanDetailsData(groupId, launchId, planId, packageCode),
    type: 'json',
  });

  const {
    currentState: getPackageRulesCallState,
    response: packageRules = initialState,
    makeApiCall: makePackageRulesCall,
  } = useApiCall({
    url: getPackageRulesData(groupId, launchId, planId, packageCode),
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
        currentState: getPlanDetailsCallState,
        makeApiCall: makePlanDetailsCall,
      },
      {
        currentState: getPackageRulesCallState,
        makeApiCall: makePackageRulesCall,
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
    getPlanDetailsCallState,
    makePlanDetailsCall,
    getPackageRulesCallState,
    makePackageRulesCall,
    getCommentsCallState,
    makeCommentsCall,
  ]);
  const planType = planDetails?.planType?.name?.gdfValue;
  const marketSegmentCode = packageRules?.marketSegment?.code?.gdfValue;
  const isGovernmentPlan =
    planType === 'Medical' &&
    GOVERNMENT_MARKET_SEGMENT_CODES.some(
      (govtMarketSegmentCode) => govtMarketSegmentCode === marketSegmentCode
    );
  const loading =
    getPlanDetailsCallState === FetchStates.PENDING ||
    getPackageRulesCallState === FetchStates.PENDING ||
    getCommentsCallState === FetchStates.PENDING;

  const error =
    getPlanDetailsCallState === FetchStates.ERROR ||
    getPackageRulesCallState === FetchStates.ERROR ||
    getCommentsCallState === FetchStates.ERROR;
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
              <LaunchPlanDetails />
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
                    <LaunchPcdInfo />
                    <LaunchPackageRules
                      planType={planType}
                      isGovernmentPlan={isGovernmentPlan}
                    />
                  </>
                )}
              {planType !== 'CDHP' &&
                planType !== 'Health & Well-Being Solutions' &&
                planType !== 'Admin' &&
                planType !== 'Health & Wellness' &&
                planType !== 'Worksite Health/EAP' && (
                  <>
                    <LaunchEligibilityRules
                      isGovernmentPlan={isGovernmentPlan}
                    />
                    <LaunchAutoAssignDentalInfo />
                  </>
                )}
              {(planType === 'CDHP' ||
                planType === 'Health & Well-Being Solutions' ||
                planType === 'Admin' ||
                planType === 'Health & Wellness' ||
                planType === 'Worksite Health/EAP') && <LaunchQuesAnswerInfo />}
            </CardContent>
          </Card>
        </Container>
      )}
    </>
  );
};

export default PlansInfo;
