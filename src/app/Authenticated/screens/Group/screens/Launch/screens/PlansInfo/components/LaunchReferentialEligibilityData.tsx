import React, { FC, useEffect } from 'react';

import { Grid, CircularProgress } from '@material-ui/core';

import useLaunchFormattedParams from 'app/Authenticated/screens/Group/screens/Launch/shared/useLaunchFormattedParams';
import { formatIsoStringToVernacularDate } from 'utils/date/helpers';

import ListItemContainer from 'app/components/shared/ListItemContainer';
import ListItemGrid from 'app/components/shared/ListItemGrid';
import { getReferentialEligilibilityData } from 'app/api-urls';
import { Dictionary } from '../../../components/LaunchLayout/components/LaunchHeader/components/LaunchInfo';
import { Comment } from '../../shared/LaunchCommentsContainer';
import useApiCall from '../../../shared/useApiCall';
import { FetchStates } from '../../../shared/constants';

export type LaunchReferentialEligibilityItem = {
  id?: number;
  comments: Comment[];
  effectiveFromDate?: Dictionary;
  fundingType: Dictionary;
  issuingState: Dictionary;
  activeEligibleEmployeeDefinitionCode?: Dictionary;
  activeEmployeeNote?: string;
  employeesExcludedDefinition: Dictionary;
  employeesExcludedNote?: string;
  retroactiveMemberTerminationPeriod: Dictionary;
  nonStandardTerminationPeriodNote?: string;
  doesHpVerifyStudentEligibility: Dictionary;
  doesHpVerifyDisabledDependents: Dictionary;
  doubleCoverageInSameGroupAllowed: string | boolean;
  lateEnrollmentApplies: Dictionary;
  retireeEligibility?: string | boolean;
  earlyRetireeEligibility?: string | boolean;
  retireeDefinitionNote: string;
  earlyRetireeDefinitionNote: string;
  rehireNote?: string | null;
};
export type BasicProps = {
  ruleId: string;
};

export type InitialProps = boolean;

const LaunchReferentialEligibilityData: FC<BasicProps> = (props) => {
  const { ruleId } = props;
  const { launchId, planId } = useLaunchFormattedParams();

  const {
    currentState: referentialEligibilityInfoCallState,
    response: referentialEligibilityinfoData = [] as Array<
      LaunchReferentialEligibilityItem
    >,
    makeApiCall: makeReferentialEligibilityInfoCall,
  } = useApiCall({
    url: getReferentialEligilibilityData(launchId, planId),
    type: 'json',
  });

  useEffect(() => {
    if (referentialEligibilityInfoCallState === FetchStates.NOT_YET_CALLED) {
      makeReferentialEligibilityInfoCall();
    }
  }, [referentialEligibilityInfoCallState, makeReferentialEligibilityInfoCall]);
  const filteredData = referentialEligibilityinfoData.filter(
    (d: LaunchReferentialEligibilityItem) => {
      return d.id === Number(ruleId);
    }
  );
  const referentialEligibilityInfo = filteredData[0];

  return (
    <>
      {referentialEligibilityInfoCallState === FetchStates.PENDING && (
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <CircularProgress color="inherit" />
          </Grid>
        </Grid>
      )}
      {referentialEligibilityInfoCallState !== FetchStates.PENDING &&
        referentialEligibilityInfoCallState !== FetchStates.ERROR && (
          <Grid container item>
            <ListItemGrid>
              <Grid item xs={5}>
                <ListItemContainer
                  header="Retroactive Member Termination Period"
                  referentialData
                  value={
                    referentialEligibilityInfo
                      ?.retroactiveMemberTerminationPeriod?.name
                  }
                />
              </Grid>
              <Grid item xs={5}>
                <ListItemContainer
                  header="Describe Non-standard Termination Period?"
                  referentialData
                  value={
                    referentialEligibilityInfo?.nonStandardTerminationPeriodNote
                  }
                />
              </Grid>
            </ListItemGrid>
            <ListItemGrid>
              <Grid item xs={10}>
                <ListItemContainer
                  header="Comments"
                  referentialData
                  value={referentialEligibilityInfo?.comments?.map(
                    (comment: Comment) => comment?.text
                  )}
                />
              </Grid>
            </ListItemGrid>
            <ListItemGrid>
              <Grid item xs={4}>
                <ListItemContainer
                  header="Effective Date of Eligibility Rule"
                  referentialData
                  value={
                    referentialEligibilityInfo?.effectiveFromDate
                      ? formatIsoStringToVernacularDate(
                          referentialEligibilityInfo?.effectiveFromDate?.toString()
                        )
                      : ''
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <ListItemContainer
                  header="Funding Type"
                  referentialData
                  value={referentialEligibilityInfo?.fundingType?.name}
                />
              </Grid>
              <Grid item xs={3}>
                <ListItemContainer
                  header="Issuing State"
                  referentialData
                  value={referentialEligibilityInfo?.issuingState?.code}
                />
              </Grid>
            </ListItemGrid>
            <ListItemGrid>
              <Grid item xs={4}>
                <ListItemContainer
                  header="Active Eligibile Employee Definition Code"
                  referentialData
                  value={
                    referentialEligibilityInfo
                      ?.activeEligibleEmployeeDefinitionCode?.name
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <ListItemContainer
                  header="Active Eligibile Employee Definition"
                  referentialData
                  value={referentialEligibilityInfo?.activeEmployeeNote}
                />
              </Grid>
            </ListItemGrid>
            <ListItemGrid>
              <Grid item xs={4}>
                <ListItemContainer
                  header="Employee Excluded from Coverage Code"
                  referentialData
                  value={
                    referentialEligibilityInfo?.employeesExcludedDefinition
                      ?.name
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <ListItemContainer
                  header="Employee Excluded from Coverage Definition"
                  referentialData
                  value={referentialEligibilityInfo?.employeesExcludedNote}
                />
              </Grid>
            </ListItemGrid>
            <ListItemGrid>
              <Grid item xs={4}>
                <ListItemContainer
                  header="Does HealthPartners Verify Student Eligibility?"
                  referentialData
                  value={
                    referentialEligibilityInfo?.doesHpVerifyStudentEligibility
                      ?.name
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <ListItemContainer
                  header="Does HealthPartners Verify Disabled Dependents?"
                  referentialData
                  value={
                    referentialEligibilityInfo?.doesHpVerifyDisabledDependents
                      ?.name
                  }
                />
              </Grid>
            </ListItemGrid>
            <ListItemGrid>
              <Grid item xs={4}>
                <ListItemContainer
                  header="Is Double Coverage in the Same Group Allowed?"
                  referentialData
                  value={
                    referentialEligibilityInfo?.doubleCoverageInSameGroupAllowed ===
                    true
                      ? 'Yes'
                      : 'No'
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <ListItemContainer
                  header="Late Enrollment Applies (For Medical Only)"
                  referentialData
                  value={
                    referentialEligibilityInfo?.lateEnrollmentApplies?.name
                  }
                />
              </Grid>
            </ListItemGrid>
            <ListItemGrid>
              <Grid item xs={4}>
                <ListItemContainer
                  header="Are Retirees Eligible?"
                  referentialData
                  value={
                    referentialEligibilityInfo?.retireeEligibility === true
                      ? 'Yes'
                      : 'No'
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <ListItemContainer
                  header="If Yes, Definition of Retiree"
                  referentialData
                  value={referentialEligibilityInfo?.retireeDefinitionNote}
                />
              </Grid>
            </ListItemGrid>
            <ListItemGrid>
              <Grid item xs={4}>
                <ListItemContainer
                  header="Are Early Retirees Eligible?"
                  referentialData
                  value={
                    referentialEligibilityInfo?.earlyRetireeEligibility === true
                      ? 'Yes'
                      : 'No'
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <ListItemContainer
                  header="If Yes, Definition of Early Retiree"
                  referentialData
                  value={referentialEligibilityInfo?.earlyRetireeDefinitionNote}
                />
              </Grid>
            </ListItemGrid>
            <ListItemGrid>
              <Grid item xs={7}>
                <ListItemContainer
                  header="Rehire Notes"
                  referentialData
                  value={referentialEligibilityInfo?.rehireNote}
                />
              </Grid>
            </ListItemGrid>
          </Grid>
        )}
    </>
  );
};

export default LaunchReferentialEligibilityData;
