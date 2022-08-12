import { GET_GROUP_NUMBER } from './types';

export function getGroupNumber(groupNumber) {
  return {
    type: GET_GROUP_NUMBER,
    payload: groupNumber,
  };
}
