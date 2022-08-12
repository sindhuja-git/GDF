import { GET_GROUP_ATTACHMENTS } from './types';

export function getGroupAttachments(groupNumber, launchId) {
  return {
    type: GET_GROUP_ATTACHMENTS,
    groupNumber,
    launchId,
  };
}
