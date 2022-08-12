import { GET_PLAN_SUMMARY, GET_RATES_SUMMARY } from './types';

export function getPlanSummary(groupNumber, launchId) {
  return {
    type: GET_PLAN_SUMMARY,
    groupNumber,
    launchId,
  };
}

export function getRatesSummary(groupNumber, launchId) {
  return {
    type: GET_RATES_SUMMARY,
    groupNumber,
    launchId,
  };
}
