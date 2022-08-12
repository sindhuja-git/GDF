import { GET_ELIGIBILITY_RULES, GET_SELECTED_ELIGIBILITY_RULE } from './types';

export function getEligibilityRules(groupId, launchId, planId, packageCode) {
  return {
    type: GET_ELIGIBILITY_RULES,
    groupId,
    launchId,
    planId,
    packageCode,
  };
}

export function getSelectedOneEligibilityRule(eligRule) {
  return {
    type: GET_SELECTED_ELIGIBILITY_RULE,
    payload: eligRule,
  };
}
