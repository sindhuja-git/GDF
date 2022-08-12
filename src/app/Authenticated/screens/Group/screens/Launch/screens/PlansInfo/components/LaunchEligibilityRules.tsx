import React, { FC, useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import {
  CircularProgress,
  Typography,
  Button,
  Divider,
} from '@material-ui/core';
import useLaunchFormattedParams from 'app/Authenticated/screens/Group/screens/Launch/shared/useLaunchFormattedParams';
import SectionHeaderContainer from 'app/components/shared/SectionHeaderContainer';
import { getEligibilityRulesData } from 'app/api-urls';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { getSelectedOneEligibilityRule } from 'app/Ducks/EligibilityRules/actions';
import { useDispatch } from 'react-redux';
import LaunchEligibilityRuleInfo from './LaunchEligibilityRuleInfo';
import { FetchStates } from '../../../shared/constants';
import useApiCall from '../../../shared/useApiCall';

const useStyles = makeStyles((theme: Theme) => ({
  marginLeft: {
    marginLeft: '8px',
    fontWeight: 'bold',
  },
  marginTop: {
    marginTop: theme.spacing(2),
  },
  fixedHeight: { height: '76px' },
  spacing: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export type InfoItem = {
  compareStatus: string;
  gdfValue: string;
  gsuValue: string;
};

export type EligRuleInfo = {
  code: InfoItem;
  name: InfoItem;
  compareStatus: string;
};

export type LaunchEligibilityRulesItem = {
  id: InfoItem;
  newHireWaitingPeriod: EligRuleInfo;
  rehireWaitingPeriod: EligRuleInfo;
  grandchildrenAllowed: InfoItem;
  ageOffSplitStudentNon: InfoItem;
  maxDependentAge: InfoItem;
  maxStudentAge: InfoItem;
  studentWhenToCancel: EligRuleInfo;
  dependentWhenToCancel: EligRuleInfo;
  name: InfoItem;
};

const initialInfoItem: InfoItem = {
  compareStatus: '',
  gdfValue: '',
  gsuValue: '',
};

const initiaItem: EligRuleInfo = {
  code: initialInfoItem,
  name: initialInfoItem,
  compareStatus: '',
};

const initialState: Array<LaunchEligibilityRulesItem> = [
  {
    id: initialInfoItem,
    newHireWaitingPeriod: initiaItem,
    rehireWaitingPeriod: initiaItem,
    grandchildrenAllowed: initialInfoItem,
    ageOffSplitStudentNon: initialInfoItem,
    maxDependentAge: initialInfoItem,
    maxStudentAge: initialInfoItem,
    studentWhenToCancel: initiaItem,
    dependentWhenToCancel: initiaItem,
    name: initialInfoItem,
  },
];

export type LaunchRuleInfoItem = {
  selectedEligRule: {
    id: InfoItem;
    newHireWaitingPeriod: EligRuleInfo;
    rehireWaitingPeriod: EligRuleInfo;
    grandchildrenAllowed: InfoItem;
    ageOffSplitStudentNon: InfoItem;
    maxDependentAge: InfoItem;
    maxStudentAge: InfoItem;
    studentWhenToCancel: EligRuleInfo;
    dependentWhenToCancel: EligRuleInfo;
    name: InfoItem;
  };
};

const initialRuleState: LaunchRuleInfoItem = {
  selectedEligRule: {
    id: initialInfoItem,
    newHireWaitingPeriod: initiaItem,
    rehireWaitingPeriod: initiaItem,
    grandchildrenAllowed: initialInfoItem,
    ageOffSplitStudentNon: initialInfoItem,
    maxDependentAge: initialInfoItem,
    maxStudentAge: initialInfoItem,
    studentWhenToCancel: initiaItem,
    dependentWhenToCancel: initiaItem,
    name: initialInfoItem,
  },
};

export type BasicProps = {
  isGovernmentPlan: boolean;
};

export type EventHandlerProps = {
  onClick: (e: React.MouseEvent) => void;
};

const LaunchEligibilityRules: FC<BasicProps> = ({ isGovernmentPlan }) => {
  const { groupId, launchId, planId, packageCode } = useLaunchFormattedParams();

  const [selectedRule, setSelectedRule] = useState(
    initialRuleState.selectedEligRule.name.gdfValue
  );
  const [selectedEligibilityInfo, setSelectedEligibilityInfo] = useState(
    initialState[0]
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  const {
    currentState: eligibilityRulesCallState,
    response: eligibilityRules = initialState,
    makeApiCall: makeEligibilityRulesCall,
  } = useApiCall({
    url: getEligibilityRulesData(groupId, launchId, planId, packageCode),
    type: 'json',
  });

  useEffect(() => {
    if (eligibilityRulesCallState === FetchStates.NOT_YET_CALLED) {
      makeEligibilityRulesCall();
    }
    if (eligibilityRules.length === 1) {
      setSelectedEligibilityInfo(eligibilityRules[0]);
      dispatch(getSelectedOneEligibilityRule(eligibilityRules[0]));
    }
  }, [
    eligibilityRulesCallState,
    makeEligibilityRulesCall,
    dispatch,
    eligibilityRules,
  ]);

  const getEligibilityInfo = (e: any) => {
    const selectedEligibilityRule = e.currentTarget.value;
    setSelectedRule(selectedEligibilityRule);
    const selectedEligibilityRuleInfo = eligibilityRules?.filter((eg) => {
      return eg.name.gdfValue === selectedEligibilityRule;
    });
    setSelectedEligibilityInfo(selectedEligibilityRuleInfo[0]);
    dispatch(getSelectedOneEligibilityRule(selectedEligibilityRuleInfo[0]));
  };

  return (
    <>
      {eligibilityRulesCallState === FetchStates.PENDING && (
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <CircularProgress color="inherit" />
          </Grid>
        </Grid>
      )}
      {eligibilityRulesCallState !== FetchStates.PENDING &&
        eligibilityRulesCallState !== FetchStates.ERROR && (
          <Grid container direction="column">
            <SectionHeaderContainer header="Eligibility Rules" />
            {eligibilityRules.length === 1 && (
              <LaunchEligibilityRuleInfo
                selectedEligRule={selectedEligibilityInfo}
                isGovernmentPlan={isGovernmentPlan}
              />
            )}
            {eligibilityRulesCallState !== FetchStates.PENDING &&
              eligibilityRulesCallState !== FetchStates.ERROR &&
              eligibilityRules.length > 1 && (
                <Grid container>
                  <Grid container className={classes.marginTop}>
                    <Grid item xs={2}>
                      <Typography className={classes.marginLeft}>
                        Please select one:
                      </Typography>
                    </Grid>
                    <Grid item xs={10}>
                      {eligibilityRules.map((er) => {
                        const eligibilityName = er.name.gdfValue;
                        const isSelected = selectedRule === eligibilityName;
                        return (
                          <Button
                            color={isSelected ? 'secondary' : 'primary'}
                            className={classes.spacing}
                            onClick={getEligibilityInfo}
                            variant={isSelected ? 'contained' : 'outlined'}
                            value={eligibilityName}
                          >
                            {eligibilityName}
                          </Button>
                        );
                      })}
                    </Grid>
                  </Grid>
                  {selectedRule && (
                    <Grid>
                      <Divider />
                      <LaunchEligibilityRuleInfo
                        selectedEligRule={selectedEligibilityInfo}
                        isGovernmentPlan={isGovernmentPlan}
                      />
                    </Grid>
                  )}
                </Grid>
              )}
          </Grid>
        )}
    </>
  );
};
export default LaunchEligibilityRules;
