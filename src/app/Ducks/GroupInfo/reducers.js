import { REQUEST_SUCCEEDED, API_REQUEST_FAILED } from '../types';
import { GET_GROUP_NUMBER } from './types';

const initialState = {
  groupNumber: '',
};

const handleRequestSucceeded = (requestType, response, state) => {
  switch (requestType) {
    case GET_GROUP_NUMBER:
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
    case GET_GROUP_NUMBER:
      return {
        ...state,
        errors: response,
      };
    default:
      return state;
  }
};

export const groupNumberReducer = (currentState = initialState, action) => {
  const { type, requestType, response, error, payload } = action;
  switch (type) {
    case GET_GROUP_NUMBER:
      return {
        ...currentState,
        groupNumber: payload,
      };
    case REQUEST_SUCCEEDED:
      return handleRequestSucceeded(requestType, response, currentState);
    case API_REQUEST_FAILED:
      return handleRequestFailed(requestType, error, currentState);
    default:
      return currentState;
  }
};
