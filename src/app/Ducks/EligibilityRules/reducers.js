import { REQUEST_SUCCEEDED, API_REQUEST_FAILED } from '../types';
import { GET_ELIGIBILITY_RULES, GET_SELECTED_ELIGIBILITY_RULE } from './types';

export const initialState = {
  eligibilityRules: {},
  selectedOneEligibilityRule: {},
  errors: '',
};
const handleRequestSucceeded = (requestType, response, state) => {
  switch (requestType) {
    case GET_ELIGIBILITY_RULES:
      return {
        ...state,
        ...response,
        errors: '',
      };

    default:
      return state;
  }
};
const handleRequestFailed = (requestType, response, state) => {
  switch (requestType) {
    case GET_ELIGIBILITY_RULES:
      return {
        ...state,
        errors: response,
      };
    default:
      return state;
  }
};
export const eligibilityRulesReducer = (
  currentState = initialState,
  action
) => {
  const { type, requestType, response, error, payload } = action;
  switch (type) {
    case GET_SELECTED_ELIGIBILITY_RULE:
      return {
        ...currentState,
        selectedOneEligibilityRule: payload,
      };
    case REQUEST_SUCCEEDED:
      return handleRequestSucceeded(requestType, response, currentState);
    case API_REQUEST_FAILED:
      return handleRequestFailed(requestType, error, currentState);
    default:
      return currentState;
  }
};
