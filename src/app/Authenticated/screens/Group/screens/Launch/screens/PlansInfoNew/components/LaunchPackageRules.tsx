import React, { FC } from 'react';
import Grid from '@material-ui/core/Grid';
import ListItemContainer from 'app/components/shared/ListItemContainer';
import ListItemGrid from 'app/components/shared/ListItemGrid';
import SectionHeaderContainer from 'app/components/shared/SectionHeaderContainer';
import { useSelector } from 'react-redux';
import { selectedEligibilityRule } from 'app/Ducks/EligibilityRules/selectors';
import { fsaPlansPresentSelector } from 'app/Ducks/PlanSummary/selectors';

export type ItemProps = {
  planInfo: any;
  planType: string;
  isGovernmentPlan: boolean;
};

const LaunchPackageRules: FC<ItemProps> = (props) => {
  const { planInfo } = props;
  const { planType, isGovernmentPlan } = props;

  const selectedRule = useSelector(selectedEligibilityRule);
  const fsaPlansPresent = useSelector(fsaPlansPresentSelector);
  return (
    <>
      <Grid container direction="column">
        <SectionHeaderContainer header="Package Rules" />
        <ListItemGrid>
          <Grid item xs={3}>
            <ListItemContainer
              header="Market Segment"
              value={
                `${planInfo?.packageInfos[0]?.packageRule?.marketSegment?.code?.gdfValue} ${planInfo?.packageInfos[0]?.packageRule?.marketSegment?.name?.gdfValue}` ||
                ''
              }
              backgroundHighlight={
                planInfo?.packageInfos[0]?.packageRule?.marketSegment
                  ?.compareStatus === 'NOT_EQUAL'
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
                      planInfo?.packageInfos[0]?.packageRule?.cignaAffiliated
                        ?.code?.gdfValue || ''
                    }
                    backgroundHighlight={
                      planInfo?.packageInfos[0]?.packageRule?.cignaAffiliated
                        ?.compareStatus === 'NOT_EQUAL'
                    }
                  />
                </Grid>

                <Grid item xs={3}>
                  <ListItemContainer
                    header="Funding Subtype"
                    value={
                      planInfo?.packageInfos[0]?.packageRule?.fundSubtype?.name
                        ?.gdfValue || ''
                    }
                    backgroundHighlight={
                      planInfo?.packageInfos[0]?.packageRule?.fundSubtype
                        ?.compareStatus === 'NOT_EQUAL'
                    }
                  />
                </Grid>
              </>
            )}
        </ListItemGrid>
        {planType !== 'CDHP' && planType !== 'Health & Well-Being Solutions' && (
          <>
            <ListItemGrid>
              {planType !== 'Dental' && (
                <Grid item xs={3}>
                  <ListItemContainer
                    header="Creditable RX Coverage"
                    value={
                      planInfo?.packageInfos[0]?.packageRule?.creditableCoverage
                        ?.name?.gdfValue || ''
                    }
                    backgroundHighlight={
                      planInfo?.packageInfos[0]?.packageRule?.creditableCoverage
                        ?.compareStatus === 'NOT_EQUAL'
                    }
                  />
                </Grid>
              )}

              <Grid item xs={3}>
                <ListItemContainer
                  header="Grandfathered Plan?"
                  value={
                    planInfo?.packageInfos[0]?.packageRule
                      ?.grandfatheredPlanFlag?.gdfValue
                      ? 'Yes'
                      : 'No'
                  }
                  backgroundHighlight={
                    planInfo?.packageInfos[0]?.packageRule
                      ?.grandfatheredPlanFlag?.compareStatus === 'NOT_EQUAL'
                  }
                />
              </Grid>
            </ListItemGrid>

            <ListItemGrid>
              <Grid item xs={4}>
                <ListItemContainer
                  header="What is the HRA Administrator Type?"
                  value={
                    planInfo?.packageInfos[0]?.packageRule?.hra?.name
                      ?.gdfValue || ''
                  }
                  backgroundHighlight={
                    planInfo?.packageInfos[0]?.packageRule?.hra
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
                      planInfo?.packageInfos[0]?.packageRule?.pdmaYearType
                        ? `${planInfo?.packageInfos[0]?.packageRule?.pdmaYearType?.code?.gdfValue} - ${planInfo?.packageInfos[0]?.packageRule?.pdmaYearType?.name?.gdfValue}`
                        : '' || ''
                    }
                    backgroundHighlight={
                      planInfo?.packageInfos[0]?.packageRule?.pdmaYearType
                        ?.compareStatus === 'NOT_EQUAL'
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
    </>
  );
};

export default LaunchPackageRules;
