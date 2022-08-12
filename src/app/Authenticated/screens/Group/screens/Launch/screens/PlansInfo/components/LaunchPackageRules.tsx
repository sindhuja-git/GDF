import React, { FC, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import useLaunchFormattedParams from 'app/Authenticated/screens/Group/screens/Launch/shared/useLaunchFormattedParams';
import ListItemContainer from 'app/components/shared/ListItemContainer';
import ListItemGrid from 'app/components/shared/ListItemGrid';
import SectionHeaderContainer from 'app/components/shared/SectionHeaderContainer';
import { useSelector } from 'react-redux';
import { getPackageRulesData } from 'app/api-urls';
import { selectedEligibilityRule } from 'app/Ducks/EligibilityRules/selectors';
import { fsaPlansPresentSelector } from 'app/Ducks/PlanSummary/selectors';
import useApiCall from '../../../shared/useApiCall';
import { FetchStates } from '../../../shared/constants';

export type Item = {
  compareStatus: string;
  gdfValue: string | boolean;
  gsuValue: string;
};

export type InfoItem = {
  code: Item;
  name: Item;
  compareStatus: string;
};

export type LaunchPackageRulesItem = {
  marketSegment: InfoItem;
  cignaAffiliation: InfoItem;
  fundingSubType: InfoItem;
  creditableRxCoverage: Item;
  grandfatheredPlan: Item;
  administratorType: InfoItem;
  pdmaYearType: InfoItem;
  pdmaDomesticPartnerType: InfoItem;
};

const packageRuleItem: Item = {
  compareStatus: '',
  gdfValue: '',
  gsuValue: '',
};

const initialInfoItem: InfoItem = {
  code: packageRuleItem,
  name: packageRuleItem,
  compareStatus: '',
};

const initialState: LaunchPackageRulesItem = {
  marketSegment: initialInfoItem,
  cignaAffiliation: initialInfoItem,
  fundingSubType: initialInfoItem,
  creditableRxCoverage: packageRuleItem,
  grandfatheredPlan: packageRuleItem,
  administratorType: initialInfoItem,
  pdmaYearType: initialInfoItem,
  pdmaDomesticPartnerType: initialInfoItem,
};

export type BasicProps = {
  planType: string;
  isGovernmentPlan: boolean;
};

export type InitialProps = boolean;

const LaunchPackageRules: FC<BasicProps> = (props) => {
  const { planType, isGovernmentPlan } = props;
  const { groupId, launchId, planId, packageCode } = useLaunchFormattedParams();

  const selectedRule = useSelector(selectedEligibilityRule);
  const fsaPlansPresent = useSelector(fsaPlansPresentSelector);

  const {
    currentState: groupPackageRulesCallState,
    response: groupPackageRules = initialState,
    makeApiCall: makeGroupPackageRulesCall,
  } = useApiCall({
    url: getPackageRulesData(groupId, launchId, planId, packageCode),
    type: 'json',
  });

  useEffect(() => {
    if (groupPackageRulesCallState === FetchStates.NOT_YET_CALLED) {
      makeGroupPackageRulesCall();
    }
  }, [groupPackageRulesCallState, makeGroupPackageRulesCall]);

  return (
    <>
      {groupPackageRulesCallState === FetchStates.PENDING && (
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <CircularProgress color="inherit" />
          </Grid>
        </Grid>
      )}
      {groupPackageRulesCallState !== FetchStates.PENDING &&
        groupPackageRulesCallState !== FetchStates.ERROR && (
          <Grid container direction="column">
            <SectionHeaderContainer header="Package Rules" />
            <ListItemGrid>
              <Grid item xs={3}>
                <ListItemContainer
                  header="Market Segment"
                  value={groupPackageRules?.marketSegment?.name?.gdfValue || ''}
                  backgroundHighlight={
                    groupPackageRules?.marketSegment?.compareStatus ===
                    'NOT_EQUAL'
                  }
                />
              </Grid>
              {!isGovernmentPlan &&
                planType !== 'CDHP' &&
                planType !== 'Health & Well-Being Solutions' && (
                  <>
                    <Grid item xs={3}>
                      <ListItemContainer
                        header="Cigna Affiliation"
                        value={
                          groupPackageRules?.cignaAffiliation?.code?.gdfValue ||
                          ''
                        }
                        backgroundHighlight={
                          groupPackageRules?.cignaAffiliation?.compareStatus ===
                          'NOT_EQUAL'
                        }
                      />
                    </Grid>

                    <Grid item xs={3}>
                      <ListItemContainer
                        header="Funding Subtype"
                        value={
                          groupPackageRules?.fundingSubType?.name?.gdfValue ||
                          ''
                        }
                        backgroundHighlight={
                          groupPackageRules?.fundingSubType?.compareStatus ===
                          'NOT_EQUAL'
                        }
                      />
                    </Grid>
                  </>
                )}
            </ListItemGrid>
            {planType !== 'CDHP' &&
              planType !== 'Health & Well-Being Solutions' && (
                <>
                  <ListItemGrid>
                    {planType !== 'Dental' && (
                      <Grid item xs={3}>
                        <ListItemContainer
                          header="Creditable RX Coverage"
                          value={
                            groupPackageRules?.creditableRxCoverage?.gdfValue ||
                            ''
                          }
                          backgroundHighlight={
                            groupPackageRules?.creditableRxCoverage
                              ?.compareStatus === 'NOT_EQUAL'
                          }
                        />
                      </Grid>
                    )}

                    <Grid item xs={3}>
                      <ListItemContainer
                        header="Grandfathered Plan?"
                        value={
                          groupPackageRules?.grandfatheredPlan?.gdfValue
                            ? 'Yes'
                            : 'No'
                        }
                        backgroundHighlight={
                          groupPackageRules?.grandfatheredPlan
                            ?.compareStatus === 'NOT_EQUAL'
                        }
                      />
                    </Grid>
                  </ListItemGrid>

                  <ListItemGrid>
                    <Grid item xs={4}>
                      <ListItemContainer
                        header="What is the HRA Administrator Type?"
                        value={
                          groupPackageRules?.administratorType?.name
                            ?.gdfValue || ''
                        }
                        backgroundHighlight={
                          groupPackageRules?.administratorType
                            ?.compareStatus === 'NOT_EQUAL'
                        }
                      />
                    </Grid>
                    {(planType === 'Medical' || planType === 'Dental') && (
                      <Grid item xs={3}>
                        <ListItemContainer
                          referentialData
                          header="Do FSA Plans Exist?"
                          value={fsaPlansPresent?.length === 0 ? 'No' : 'Yes'}
                        />
                      </Grid>
                    )}
                  </ListItemGrid>

                  <ListItemGrid>
                    {!isGovernmentPlan && planType !== 'Dental' && (
                      <Grid item xs={3}>
                        <ListItemContainer
                          header="PDMA Year Type"
                          value={
                            groupPackageRules?.pdmaYearType
                              ? `${groupPackageRules?.pdmaYearType?.code?.gdfValue} - ${groupPackageRules.pdmaYearType?.name?.gdfValue}`
                              : '' || ''
                          }
                          backgroundHighlight={
                            groupPackageRules?.pdmaYearType?.compareStatus ===
                            'NOT_EQUAL'
                          }
                        />
                      </Grid>
                    )}
                    {!isGovernmentPlan && (
                      <Grid item xs={4}>
                        <ListItemContainer
                          header="PDMA Domestic Partner Type"
                          value={
                            selectedRule
                              ? ` ${selectedRule?.name?.gdfValue}`
                              : '' || ''
                          }
                          backgroundHighlight={
                            selectedRule?.compareStatus === 'NOT_EQUAL'
                          }
                        />
                      </Grid>
                    )}
                  </ListItemGrid>
                </>
              )}
          </Grid>
        )}
    </>
  );
};

export default LaunchPackageRules;
