import {
  GOVERNMENT_MARKET_SEGMENT_CODES,
  HEALTH_AND_WELLBEING_PLAN_PACKAGE_CODES,
  FSA_PLAN_PACKAGE_CODES,
} from '../../Authenticated/screens/Group/screens/Launch/shared/constants';

export const selectMacPlanSummary = ({ planSummary }) => {
  return planSummary?.planSummary;
};

export const selectRatesSummary = ({ ratesSummary }) => {
  return ratesSummary?.ratesSummary;
};

export const govtPlansPresentSelector = ({ planSummary }) => {
  const filteredPlansWithPackageCodesAndSelectedTypes = planSummary?.planSummary?.filter(
    (p) => {
      return (
        p?.planType?.name !== 'Admin' &&
        p?.planType?.name !== 'Health & Wellness' &&
        p?.planType?.name !== 'Worksite Health/EAP' &&
        p?.packageCode !== null
      );
    }
  );

  const planMarketSegmentCodes = filteredPlansWithPackageCodesAndSelectedTypes?.map(
    (plan) => {
      return plan?.marketSegment?.code;
    }
  );

  return planMarketSegmentCodes?.some((p) => {
    return GOVERNMENT_MARKET_SEGMENT_CODES.some(
      (govtMarketSegmentCode) => govtMarketSegmentCode === p
    );
  });
};

export const cdhpPlansPresentSelector = ({ planSummary }) => {
  return planSummary?.planSummary?.some((plan) => plan?.planType?.code === 'C');
};

export const fsaPlansPresentSelector = ({ planSummary }) => {
  return planSummary?.planSummary?.filter((p) => {
    return (
      p?.planType?.name === 'CDHP' &&
      p?.packageCode !== null &&
      FSA_PLAN_PACKAGE_CODES.includes(p?.packageCode)
    );
  });
};

export const selectHWBPlanGdfId = ({ planSummary }) => {
  let hwbPlanGdfId = null;
  if (planSummary?.planSummary) {
    hwbPlanGdfId = planSummary?.planSummary?.find((plan) =>
      plan?.otherCurrentPackageCodes?.some((packageCode) =>
        HEALTH_AND_WELLBEING_PLAN_PACKAGE_CODES.includes(packageCode)
      )
    )?.planId;
  }
  return hwbPlanGdfId;
};
