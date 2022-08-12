import { REQUEST_SUCCEEDED, API_REQUEST_FAILED } from '../types';
import { GET_PLAN_SUMMARY, GET_RATES_SUMMARY } from './types';

const initialState = [];

const handleRequestSucceeded = (requestType, response, state) => {
  switch (requestType) {
    case GET_PLAN_SUMMARY:
      return {
        ...state,
        planSummary: response,
        errors: '',
      };

    default:
      return state;
  }
};
const handleRequestFailed = (requestType, response, state) => {
  switch (requestType) {
    case GET_PLAN_SUMMARY:
      return {
        ...state,
        errors: response,
      };
    default:
      return state;
  }
};

export const planSummaryReducer = (currentState = initialState, action) => {
  const { type, requestType, response, error } = action;
  switch (type) {
    case REQUEST_SUCCEEDED:
      return handleRequestSucceeded(requestType, response, currentState);
    case API_REQUEST_FAILED:
      return handleRequestFailed(requestType, error, currentState);
    default:
      return currentState;
  }
};

const handleRatesSummaryRequestSucceeded = (requestType, response, state) => {
  switch (requestType) {
    case GET_RATES_SUMMARY:
      return {
        ...state,
        ratesSummary: response,
        errors: '',
      };

    default:
      return state;
  }
};
const handleRatesSummaryRequestFailed = (requestType, response, state) => {
  switch (requestType) {
    case GET_RATES_SUMMARY:
      return {
        ...state,
        errors: response,
      };
    default:
      return state;
  }
};

export const ratesSummaryReducer = (currentState = initialState, action) => {
  const { type, requestType, response, error } = action;
  switch (type) {
    case REQUEST_SUCCEEDED:
      return handleRatesSummaryRequestSucceeded(
        requestType,
        response,
        currentState
      );
    case API_REQUEST_FAILED:
      return handleRatesSummaryRequestFailed(requestType, error, currentState);
    default:
      return currentState;
  }
};
