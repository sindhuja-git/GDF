import { takeLatest, call, put } from 'redux-saga/effects';
import fetchEligibilityRules from './api';
import { GET_ELIGIBILITY_RULES } from './types';
import { requestSucceeded, requestFailed } from '../actions';

export function* getEligibilityRulesWorker(action) {
  const { type, groupId, launchId, planId } = action;
  try {
    const response = yield call(fetchEligibilityRules, {
      groupId,
      launchId,
      planId,
    });
    const data = {
      eligibilityRules: response,
    };
    yield put(requestSucceeded(type, data));
  } catch (error) {
    yield put(requestFailed(type, error));
  }
}

export function* getEligibilityRulesWatcher() {
  yield takeLatest(GET_ELIGIBILITY_RULES, getEligibilityRulesWorker);
}
