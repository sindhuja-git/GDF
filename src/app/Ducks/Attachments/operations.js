import { takeLatest, call, put } from 'redux-saga/effects';
import fetchGroupAttachmentInfo from './api';
import { GET_GROUP_ATTACHMENTS } from './types';
import { requestSucceeded, requestFailed } from '../actions';

export function* getGroupAttachmentsWorker(action) {
  const { type, groupNumber, launchId } = action;
  try {
    const response = yield call(fetchGroupAttachmentInfo, {
      groupNumber,
      launchId,
    });
    const attachments = response.filter((res) => {
      return res.attachmentType.code !== 'GDF';
    });
    const gdfDocument = response.filter((res) => {
      return res.attachmentType.code === 'GDF';
    });
    const data = {
      groupAttachments: attachments,
      gdfDocument,
    };
    yield put(requestSucceeded(type, data));
  } catch (error) {
    yield put(requestFailed(type, error));
  }
}

export function* getGroupAttachmentsWatcher() {
  yield takeLatest(GET_GROUP_ATTACHMENTS, getGroupAttachmentsWorker);
}
