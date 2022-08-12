/* eslint-disable no-nested-ternary */
import React, { FC, useEffect } from 'react';

import { Box, CircularProgress, Grid } from '@material-ui/core';
import { formatIsoStringToVernacularDate } from 'utils/date/helpers';
import SectionHeaderContainer from 'app/components/shared/SectionHeaderContainer';
import ListItemContainer from 'app/components/shared/ListItemContainer';
import ListItemGrid from 'app/components/shared/ListItemGrid';
import {
  getGroupGdfRateData,
  getGroupRateData,
  getReferentialRateData,
} from 'app/api-urls';
import { useSelector } from 'react-redux';
import { selectRatesSummary } from 'app/Ducks/PlanSummary/selectors';
import Alert from '@material-ui/lab/Alert';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import WarningIcon from '@mui/icons-material/Warning';
import { makeStyles } from '@material-ui/core/styles';
import { isEmpty } from 'utils/isEmpty';
import ReportIcon from '@mui/icons-material/Report';
import useLaunchFormattedParams from '../../../shared/useLaunchFormattedParams';
import useApiCall from '../../../shared/useApiCall';
import { FetchStates } from '../../../shared/constants';
import LaunchCommentsContainer, {
  Comment,
} from '../../shared/LaunchCommentsContainer';

type GdfGsuCompare = {
  compareStatus: string;
  gdfValue: string;
  gsuValue: string;
};

const initialCompareItem: GdfGsuCompare = {
  gdfValue: '',
  gsuValue: '',
  compareStatus: '',
};

export type Dictionary = {
  code: GdfGsuCompare;
  name: GdfGsuCompare;
  compareStatus?: string;
};

const InitialDictionaryCompareItem: Dictionary = {
  code: initialCompareItem,
  name: initialCompareItem,
  compareStatus: '',
};

type RateTierValue = {
  type: Dictionary;
  value: GdfGsuCompare;
  compareStatus?: string;
};

type AddOnRateTierValue = {
  rateAttributeType: Dictionary;
  value: GdfGsuCompare;
  compareStatus?: string;
};

type AddOnRate = {
  type: Dictionary;
  rateTierStructure: Dictionary;
  values?: AddOnRateTierValue[];
  compareStatus?: string;
};

type LaunchReferentiaRateItem = {
  comments: Comment[];
  dentalDiscountedForPreventive: boolean | String;
  dentalVoluntary: boolean | String;
};

export type LaunchGroupGdfRateInfoItem = {
  gdfName: string;
};

const gdfRatesInitialState: LaunchGroupGdfRateInfoItem = {
  gdfName: '',
};

export type LaunchGroupRateInfoItem = {
  effectiveFromDate: GdfGsuCompare;
  effectiveToDate: GdfGsuCompare;
  planRateType?: Dictionary | null;
  properties: {
    area?: Dictionary | null;
    rateTierStructure?: Dictionary | null;
    rateTierValues?: RateTierValue[];
    addonRates?: AddOnRate[];
  };
  compareStatus: string;
};

const ratesInitialState: LaunchGroupRateInfoItem = {
  effectiveFromDate: initialCompareItem,
  effectiveToDate: initialCompareItem,
  planRateType: InitialDictionaryCompareItem,
  properties: {
    area: InitialDictionaryCompareItem,
    rateTierValues: [],
    addonRates: [],
  },
  compareStatus: '',
};

export type BasicProps = {
  load?: boolean;
  err?: boolean;
};

type BootstrapSize =
  | boolean
  | 1
  | 2
  | 'auto'
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | undefined;

const shouldTierSegmentBeHighlighted: Function = (compareStatus: string) =>
  ['NOT_EQUAL', 'NOT_COMPARABLE'].includes(compareStatus);

const rateTierValueToAddonRateTierValue: Function = (
  addonRateTierValue: AddOnRateTierValue
) =>
  ({
    type: addonRateTierValue.rateAttributeType,
    value: addonRateTierValue.value,
    compareStatus: addonRateTierValue.compareStatus,
  } as RateTierValue);

const RateValueDisplay: FC<{
  fieldType: string;
  header: string;
  value: string;
  compareStatus: string;
  size?: BootstrapSize;
}> = ({ fieldType, header, value, compareStatus, size = 1 }) => {
  return (
    <Grid item xs={size}>
      <ListItemContainer
        header={header}
        value={`$${Number(value).toFixed(2)}`}
        backgroundHighlight={shouldTierSegmentBeHighlighted(compareStatus)}
        id={
          shouldTierSegmentBeHighlighted(compareStatus)
            ? `background-highlighted-${fieldType}`
            : ''
        }
      />
    </Grid>
  );
};

const RateTiersSelectionAndValuesDisplay: FC<{
  fieldType: string;
  rateTierSelection: string;
  compareStatus: string;
  rateTierValues: RateTierValue[];
  tiersSize?: BootstrapSize;
  valuesSize?: BootstrapSize;
}> = ({
  fieldType,
  rateTierSelection,
  compareStatus,
  rateTierValues,
  tiersSize = 2,
  valuesSize = 1,
}) => {
  return (
    <>
      <Grid item xs={tiersSize}>
        <ListItemContainer
          header="Rate-Tiers Selection"
          value={rateTierSelection}
          backgroundHighlight={shouldTierSegmentBeHighlighted(compareStatus)}
          id={
            shouldTierSegmentBeHighlighted(compareStatus)
              ? `background-highlighted-${fieldType}`
              : ''
          }
        />
      </Grid>
      {rateTierValues
        ?.filter((rt) => rt?.value?.gdfValue !== null)
        ?.map(({ type, value }) => (
          <RateValueDisplay
            fieldType="RateValueDisplay"
            key={type.code.gdfValue}
            header={type.name.gdfValue}
            value={value?.gdfValue}
            compareStatus={value?.compareStatus}
            size={valuesSize}
          />
        ))}
    </>
  );
};
const useStyles = makeStyles((theme) => ({
  errorBorder: {
    border: '2px solid',
    borderColor: theme.palette.error.main,
    color: '#d91535',
  },
  warningBorder: {
    border: '2px solid',
    borderColor: theme.palette.warning.main,
  },
  errorText: {
    marginTop: '2px',
  },
  warningText: {
    marginTop: '2px',
  },
}));

interface RatesAlertWarningProps {
  rateNotComparableOnGsuAndGdf?: boolean;
  addonRateFoundInGsuNotInGdf?: boolean;
  addonRateFoundInGdfNotInGsu?: boolean;
  commentsExist?: boolean;
  addOnRatesOnlyInGsu?: Array<{}>;
  addOnRatesOnlyInGdf?: Array<{}>;
}
// All the scenarios are explained with developer details in detail - https://confluence.healthpartners.com/confluence/display/AS/Developer+Notes+-+Rates+DIFF+COMPARE
const RatesAlertWarning: FC<RatesAlertWarningProps> = ({
  rateNotComparableOnGsuAndGdf,
  addonRateFoundInGsuNotInGdf,
  addonRateFoundInGdfNotInGsu,
  commentsExist,
  addOnRatesOnlyInGsu,
  addOnRatesOnlyInGdf,
}) => {
  const classes = useStyles();
  return (
    <Alert
      severity={
        rateNotComparableOnGsuAndGdf ||
        addonRateFoundInGdfNotInGsu ||
        commentsExist
          ? 'error'
          : 'warning'
      }
      variant="standard"
      className={
        rateNotComparableOnGsuAndGdf ||
        addonRateFoundInGdfNotInGsu ||
        commentsExist
          ? classes.errorBorder
          : classes.warningBorder
      }
      icon={
        rateNotComparableOnGsuAndGdf || addonRateFoundInGdfNotInGsu ? (
          <WarningAmberIcon />
        ) : commentsExist ? (
          <ReportIcon />
        ) : (
          <WarningIcon />
        )
      }
    >
      <Grid
        className={
          rateNotComparableOnGsuAndGdf ||
          addonRateFoundInGdfNotInGsu ||
          commentsExist
            ? classes.errorText
            : classes.warningText
        }
      >
        {rateNotComparableOnGsuAndGdf
          ? 'GDF Viewer could not accurately compare this rate'
          : addonRateFoundInGsuNotInGdf
          ? 'Add-On Rate Record(s) found in GSU and not found in GDF Viewer:'
          : addonRateFoundInGdfNotInGsu
          ? 'Add-On Rate Record(s) found in GDF and not found in GSU:'
          : commentsExist
          ? 'Rate comments exists - user review always required'
          : null}

        {addonRateFoundInGsuNotInGdf && addOnRatesOnlyInGsu
          ? addOnRatesOnlyInGsu?.map((ao: any) => {
              return <li> {ao?.type?.name?.gsuValue}</li>;
            })
          : addonRateFoundInGdfNotInGsu && addOnRatesOnlyInGdf
          ? addOnRatesOnlyInGdf.map((ao: any) => {
              return <li> {ao?.type?.name?.gdfValue}</li>;
            })
          : null}
      </Grid>
    </Alert>
  );
};

const LaunchRateInfo: FC<BasicProps> = () => {
  const { groupId, launchId, planId, packageCode } = useLaunchFormattedParams();
  const {
    currentState: rateInfoCallState,
    response: gdfRateInfo = gdfRatesInitialState,
    makeApiCall: makeRateInfoCall,
  } = useApiCall({
    url: getGroupGdfRateData(groupId, launchId, planId),
    type: 'json',
  });

  const rateSummaryInfo = useSelector(selectRatesSummary);

  const currentPlanInfo = rateSummaryInfo?.find(
    (rateSummary: { planId: string | number }) => rateSummary?.planId === planId
  );

  const gdfName = currentPlanInfo
    ? currentPlanInfo.gdfName
    : gdfRateInfo?.gdfName;

  const {
    currentState: getGroupRateCallState,
    response: rateInfo = ratesInitialState,
    makeApiCall: makeGroupRateCall,
  } = useApiCall({
    url: getGroupRateData(groupId, launchId, planId, packageCode),
    type: 'json',
  });

  const {
    currentState: referentialRateInfoCallState,
    response: referentialRateInfo = {} as LaunchReferentiaRateItem,
    makeApiCall: makeReferentialRateInfoCall,
  } = useApiCall({
    url: getReferentialRateData(launchId, planId),
    type: 'json',
  });

  useEffect(() => {
    const calls = [
      {
        currentState: rateInfoCallState,
        makeApiCall: makeRateInfoCall,
      },
      {
        currentState: getGroupRateCallState,
        makeApiCall: makeGroupRateCall,
      },
      {
        currentState: referentialRateInfoCallState,
        makeApiCall: makeReferentialRateInfoCall,
      },
    ];
    calls.forEach(({ currentState, makeApiCall }) => {
      if (currentState === FetchStates.NOT_YET_CALLED) {
        makeApiCall();
      }
    });
  }, [
    rateInfoCallState,
    makeRateInfoCall,
    getGroupRateCallState,
    makeGroupRateCall,
    referentialRateInfoCallState,
    makeReferentialRateInfoCall,
  ]);
  const planRateType = rateInfo?.planRateType?.code?.gdfValue;

  const rateTierValues = rateInfo?.properties?.rateTierValues || [];
  const addOnRates = rateInfo?.properties?.addonRates?.length
    ? rateInfo?.properties?.addonRates
    : [];

  const addOnRatesOnlyInGsu = addOnRates.filter(
    (ao) => ao.compareStatus === 'ONLY_IN_GSU'
  );

  const addOnRatesOnlyInGdf = addOnRates.filter(
    (ao) => ao.compareStatus === 'ONLY_IN_GDF'
  );

  const cannotAccuratelyCompareThisPlan: boolean =
    rateInfo?.compareStatus === 'ONLY_IN_GDF';

  // when there is no rate to compare on GSU side and the rate is only in GDF
  const rateNotComparableOnGsuAndGdf =
    cannotAccuratelyCompareThisPlan &&
    rateInfo?.effectiveFromDate?.gsuValue === null;

  const addonRateFoundInGsuNotInGdf = addOnRatesOnlyInGsu?.length !== 0;
  const addonRateFoundInGdfNotInGsu =
    rateInfo?.effectiveFromDate?.gsuValue !== null &&
    cannotAccuratelyCompareThisPlan &&
    addOnRatesOnlyInGdf?.length !== 0;

  // sort rateTierValues
  rateTierValues?.sort((a: any, b: any) =>
    a.type.sortOrder.gdfValue < b.type.sortOrder.gdfValue ? -1 : 1
  );

  const nonGsuAddOnRates = addOnRates?.filter(
    (ao) => ao.compareStatus !== 'ONLY_IN_GSU'
  );

  // sort addonRate values
  nonGsuAddOnRates.forEach((addonRate) =>
    addonRate?.values?.sort((a: any, b: any) =>
      a.rateAttributeType.sortOrder.gdfValue <
      b.rateAttributeType.sortOrder.gdfValue
        ? -1
        : 1
    )
  );

  const loading =
    rateInfoCallState === FetchStates.PENDING ||
    referentialRateInfoCallState === FetchStates.PENDING ||
    getGroupRateCallState === FetchStates.PENDING;

  const error =
    rateInfoCallState === FetchStates.ERROR ||
    getGroupRateCallState === FetchStates.ERROR;

  return (
    <>
      {loading && (
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <CircularProgress color="inherit" />
          </Grid>
        </Grid>
      )}

      {!loading && !error && (
        <Grid item>
          {rateNotComparableOnGsuAndGdf && (
            <RatesAlertWarning
              rateNotComparableOnGsuAndGdf={rateNotComparableOnGsuAndGdf}
            />
          )}
          {addonRateFoundInGsuNotInGdf && (
            <RatesAlertWarning
              addonRateFoundInGsuNotInGdf={addonRateFoundInGsuNotInGdf}
              addOnRatesOnlyInGsu={addOnRatesOnlyInGsu}
            />
          )}

          <ListItemGrid>
            <Grid item>
              <ListItemContainer header="GDF Name" value={gdfName} />
            </Grid>
          </ListItemGrid>
          <ListItemGrid>
            <Grid item xs={3}>
              <ListItemContainer
                header="Plan Begin Date"
                value={
                  rateInfo?.effectiveFromDate?.gdfValue
                    ? formatIsoStringToVernacularDate(
                        rateInfo?.effectiveFromDate?.gdfValue
                      )
                    : ''
                }
                backgroundHighlight={
                  rateInfo?.effectiveFromDate?.compareStatus === 'NOT_EQUAL'
                }
              />
            </Grid>
            <Grid item xs={3}>
              <ListItemContainer
                header="Plan End Date"
                value={
                  rateInfo?.effectiveToDate?.gdfValue
                    ? formatIsoStringToVernacularDate(
                        rateInfo?.effectiveToDate?.gdfValue
                      )
                    : ''
                }
                backgroundHighlight={
                  rateInfo?.effectiveToDate?.compareStatus === 'NOT_EQUAL'
                }
              />
            </Grid>
          </ListItemGrid>

          <SectionHeaderContainer header="Rate Details" />
          {!isEmpty(referentialRateInfo?.comments) && (
            <Box m={1}>
              <RatesAlertWarning
                commentsExist={!isEmpty(referentialRateInfo?.comments)}
              />
            </Box>
          )}
          <ListItemGrid>
            <Grid item>
              <LaunchCommentsContainer
                comments={referentialRateInfo?.comments}
              />
            </Grid>
          </ListItemGrid>
          {planRateType === 'PRT1' && (
            <ListItemGrid>
              <Grid item xs={6}>
                <ListItemContainer
                  header="SG Rate Area"
                  value={rateInfo?.properties?.area?.code?.gdfValue}
                  backgroundHighlight={
                    rateInfo?.properties?.area?.compareStatus === 'NOT_EQUAL'
                  }
                />
              </Grid>
            </ListItemGrid>
          )}

          {['PRT4', 'PRT5'].includes(planRateType as string) && (
            <ListItemGrid>
              <RateTiersSelectionAndValuesDisplay
                fieldType="rateTierSelection"
                rateTierSelection={
                  rateInfo?.properties?.rateTierStructure?.name?.gdfValue || ''
                }
                rateTierValues={rateTierValues}
                compareStatus={
                  rateInfo?.properties?.rateTierStructure
                    ?.compareStatus as string
                }
                tiersSize={3}
                valuesSize={2}
              />
            </ListItemGrid>
          )}

          {nonGsuAddOnRates.length > 0 && (
            <>
              <SectionHeaderContainer header="Add-on Rates" />
              {addonRateFoundInGdfNotInGsu && (
                <RatesAlertWarning
                  addonRateFoundInGdfNotInGsu={addonRateFoundInGdfNotInGsu}
                  addOnRatesOnlyInGdf={addOnRatesOnlyInGdf}
                />
              )}
              {nonGsuAddOnRates.length !== 0 &&
                nonGsuAddOnRates.map(
                  (artv: AddOnRate) =>
                    artv.type.name.gdfValue && (
                      <ListItemGrid key={artv.type.code.gdfValue}>
                        <Grid item xs={2}>
                          <ListItemContainer
                            header="Add-on Rate Type"
                            value={artv.type.name.gdfValue}
                          />
                        </Grid>
                        <RateTiersSelectionAndValuesDisplay
                          fieldType="rateTiersSelection"
                          rateTierSelection={
                            artv.rateTierStructure.name.gdfValue || ''
                          }
                          rateTierValues={
                            artv?.values?.map((addonRateTierValue) =>
                              rateTierValueToAddonRateTierValue(
                                addonRateTierValue
                              )
                            ) || []
                          }
                          compareStatus={
                            artv.rateTierStructure.compareStatus || ''
                          }
                          tiersSize={4}
                          valuesSize={1}
                        />
                      </ListItemGrid>
                    )
                )}
            </>
          )}

          <>
            {referentialRateInfoCallState === FetchStates.PENDING && (
              <Grid container justify="center" alignItems="center">
                <Grid item>
                  <CircularProgress color="inherit" />
                </Grid>
              </Grid>
            )}
            {referentialRateInfoCallState !== FetchStates.PENDING &&
              referentialRateInfoCallState !== FetchStates.ERROR && (
                <Grid container item>
                  <ListItemGrid>
                    <Grid item xs={5}>
                      {referentialRateInfo?.dentalDiscountedForPreventive !=
                        null && (
                        <ListItemContainer
                          header="Rate Discounted for Prevent Dental on Medical Package?"
                          referentialData
                          value={
                            referentialRateInfo?.dentalDiscountedForPreventive ===
                            true
                              ? 'Yes'
                              : 'No'
                          }
                        />
                      )}
                    </Grid>
                    <Grid item xs={5}>
                      {referentialRateInfo?.dentalVoluntary != null && (
                        <ListItemContainer
                          header="Voluntary Dental Flag"
                          referentialData
                          value={
                            referentialRateInfo?.dentalVoluntary === true
                              ? 'Yes'
                              : 'No'
                          }
                        />
                      )}
                    </Grid>
                  </ListItemGrid>
                </Grid>
              )}
          </>
        </Grid>
      )}
    </>
  );
};

export default LaunchRateInfo;
