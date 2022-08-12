import { API_REQUEST_FAILED, REQUEST_SUCCEEDED } from './types';

export function requestSucceeded(requestType, response) {
  return {
    type: REQUEST_SUCCEEDED,
    requestType,
    response,
  };
}
export function requestFailed(requestType, response) {
  return {
    type: API_REQUEST_FAILED,
    requestType,
    response,
  };
}
