import React, { FC } from 'react';
import { Grid, Typography } from '@material-ui/core';
import ListItemContainer from 'app/components/shared/ListItemContainer';
import ListItemGrid from 'app/components/shared/ListItemGrid';
import { makeStyles, Theme } from '@material-ui/core/styles';
import LaunchReferentialEligibilityData from './LaunchReferentialEligibilityData';

const useStyles = makeStyles((theme: Theme) => ({
  marginLeft: {
    marginLeft: '8px',
    fontWeight: 'bold',
  },
  margin: {
    marginLeft: '8px',
    fontWeight: 'bold',
    marginTop: theme.spacing(2),
  },
  fixedHeight: { height: '76px' },
  spacing: {
    marginRight: theme.spacing(4),
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

export type LaunchEligibilityRules = {
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

export type BasicProps = {
  selectedEligRule: LaunchEligibilityRules;
  isGovernmentPlan: boolean;
};

const LaunchEligibilityRuleInfo: FC<BasicProps> = (props) => {
  const { selectedEligRule, isGovernmentPlan } = props;
  const ruleId = selectedEligRule?.id?.gdfValue;
  const classes = useStyles();

  return (
    <>
      <Grid container direction="column">
        <Typography variant="h5" component="h2" className={classes.margin}>
          {selectedEligRule?.name?.gdfValue || ''}
        </Typography>
        <ListItemGrid>
          <Grid item xs={3}>
            <ListItemContainer
              header="New Hire Waiting Period"
              value={
                selectedEligRule
                  ? selectedEligRule?.newHireWaitingPeriod?.name?.gdfValue
                  : ''
              }
              backgroundHighlight={
                selectedEligRule?.newHireWaitingPeriod?.compareStatus ===
                'NOT_EQUAL'
              }
            />
          </Grid>
          <Grid item xs={3}>
            <ListItemContainer
              header="Rehire Waiting Period"
              value={
                selectedEligRule
                  ? selectedEligRule?.rehireWaitingPeriod?.name?.gdfValue
                  : ''
              }
              backgroundHighlight={
                selectedEligRule?.rehireWaitingPeriod?.compareStatus ===
                'NOT_EQUAL'
              }
            />
          </Grid>
          <Grid item xs={3}>
            <ListItemContainer
              header="Grandchildren Allowed?"
              value={
                selectedEligRule &&
                selectedEligRule?.grandchildrenAllowed?.gdfValue
                  ? 'Yes'
                  : 'No'
              }
              backgroundHighlight={
                selectedEligRule?.grandchildrenAllowed?.compareStatus ===
                'NOT_EQUAL'
              }
            />
          </Grid>
        </ListItemGrid>

        {!isGovernmentPlan && (
          <ListItemGrid>
            <Grid item xs={6}>
              <Typography variant="h4" className={classes.marginLeft}>
                Non-Student Age-Off Rules
              </Typography>
              <div className={classes.fixedHeight}>
                <ListItemContainer
                  header="Max Dependent Age"
                  value={
                    selectedEligRule
                      ? selectedEligRule?.maxDependentAge?.gdfValue
                      : ''
                  }
                  backgroundHighlight={
                    selectedEligRule?.maxDependentAge?.compareStatus ===
                    'NOT_EQUAL'
                  }
                />
              </div>
              <ListItemContainer
                header="When to Cancel Rule"
                value={
                  selectedEligRule
                    ? selectedEligRule?.dependentWhenToCancel?.name?.gdfValue
                    : ''
                }
                backgroundHighlight={
                  selectedEligRule?.dependentWhenToCancel?.compareStatus ===
                  'NOT_EQUAL'
                }
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h4" className={classes.marginLeft}>
                Student Age-Off Rules
              </Typography>
              <div className={classes.fixedHeight}>
                <ListItemContainer
                  header="Max Dependent Age"
                  value={
                    selectedEligRule
                      ? selectedEligRule?.maxStudentAge?.gdfValue
                      : ''
                  }
                  backgroundHighlight={
                    selectedEligRule?.maxStudentAge?.compareStatus ===
                    'NOT_EQUAL'
                  }
                />
              </div>
              <ListItemContainer
                header="When to Cancel Rule"
                value={
                  (selectedEligRule?.maxStudentAge?.gdfValue ||
                    selectedEligRule?.maxStudentAge?.gsuValue) &&
                  selectedEligRule
                    ? selectedEligRule?.studentWhenToCancel?.name?.gdfValue
                    : ''
                }
                backgroundHighlight={
                  selectedEligRule?.studentWhenToCancel?.compareStatus ===
                  'NOT_EQUAL'
                }
              />
            </Grid>
          </ListItemGrid>
        )}
        <LaunchReferentialEligibilityData ruleId={ruleId} />
      </Grid>
    </>
  );
};

export default LaunchEligibilityRuleInfo;
