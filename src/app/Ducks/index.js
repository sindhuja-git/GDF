import { all } from 'redux-saga/effects';

import { getEligibilityRulesWatcher } from './EligibilityRules/operations';
import { getGroupAttachmentsWatcher } from './Attachments/operations';
import {
  getPlanSummaryWatcher,
  getRatesSummaryWatcher,
} from './PlanSummary/operations';

import { eligibilityRulesReducer } from './EligibilityRules/reducers';
import { groupNumberReducer } from './GroupInfo/reducers';
import { groupAttachmentsReducer } from './Attachments/reducers';
import {
  planSummaryReducer,
  ratesSummaryReducer,
} from './PlanSummary/reducers';

export default {
  eligibilityRules: eligibilityRulesReducer,
  groupNumber: groupNumberReducer,
  attachments: groupAttachmentsReducer,
  planSummary: planSummaryReducer,
  ratesSummary: ratesSummaryReducer,
};

export function* rootSaga() {
  yield all([
    getEligibilityRulesWatcher(),
    getGroupAttachmentsWatcher(),
    getPlanSummaryWatcher(),
    getRatesSummaryWatcher(),
  ]);
}
