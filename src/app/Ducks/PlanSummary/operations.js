import { takeLatest, call, put } from 'redux-saga/effects';
import fetchPlanOrRatesSummary from './api';
import { GET_PLAN_SUMMARY, GET_RATES_SUMMARY } from './types';
import { requestSucceeded, requestFailed } from '../actions';

export function* getPlanSummaryWorker(action) {
  const { type, groupNumber, launchId } = action;
  try {
    const response = yield call(fetchPlanOrRatesSummary, {
      groupNumber,
      launchId,
      isRate: false,
    });

    yield put(requestSucceeded(type, response));
  } catch (error) {
    yield put(requestFailed(type, error));
  }
}

export function* getRatesSummaryWorker(action) {
  const { type, groupNumber, launchId } = action;
  try {
    const response = yield call(fetchPlanOrRatesSummary, {
      groupNumber,
      launchId,
      isRate: true,
    });

    yield put(requestSucceeded(type, response));
  } catch (error) {
    yield put(requestFailed(type, error));
  }
}

export function* getPlanSummaryWatcher() {
  yield takeLatest(GET_PLAN_SUMMARY, getPlanSummaryWorker);
}

export function* getRatesSummaryWatcher() {
  yield takeLatest(GET_RATES_SUMMARY, getRatesSummaryWorker);
}
