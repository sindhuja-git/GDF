import { REQUEST_SUCCEEDED, API_REQUEST_FAILED } from '../types';
import { GET_GROUP_ATTACHMENTS } from './types';

const initialState = {};

const handleRequestSucceeded = (requestType, response, state) => {
  switch (requestType) {
    case GET_GROUP_ATTACHMENTS:
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
    case GET_GROUP_ATTACHMENTS:
      return {
        ...state,
        errors: response,
      };
    default:
      return state;
  }
};

export const groupAttachmentsReducer = (
  currentState = initialState,
  action
) => {
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
