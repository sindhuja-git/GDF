const { GET_RATES_SUMMARY } = require('../types');
const { ratesSummaryReducer } = require('../reducers');
const { API_REQUEST_FAILED, REQUEST_SUCCEEDED } = require('../../types');

describe('ratesSummaryReducer tests', () => {
  it('should return the initial state', () => {
    expect(ratesSummaryReducer(undefined, {})).toEqual([]);
  });

  it('should handle GET_RATES_SUMMARY', () => {
    const startAction = {
      type: GET_RATES_SUMMARY,
    };
    // it's empty on purpose because it's just starting to fetch
    expect(ratesSummaryReducer([], startAction)).toEqual([]);
  });

  test('GET_RATES_SUMMARY Initial Sate', () => {
    const initialState = {
      ratesSummary: {},
    };
    const action = {
      type: 'plans/GET_RATES_SUMMARY',
      data: {},
    };
    const expected = {};
    expect(ratesSummaryReducer(initialState, action).ratesSummary).toEqual(
      expected
    );
  });

  it('should handle GET_RATES_SUMMARY SUCCESS 02', () => {
    const failAction = {
      type: REQUEST_SUCCEEDED,
      response: [
        {
          planId: 6250197,
          gdfName: '2021 CST MN FI HP Standard',
        },
      ],
      requestType: GET_RATES_SUMMARY,
    };
    const expected = {
      errors: '',
      ratesSummary: [
        {
          gdfName: '2021 CST MN FI HP Standard',
          planId: 6250197,
        },
      ],
    };
    expect(ratesSummaryReducer({}, failAction)).toEqual(expected);
  });

  it('should handle GET_RATES_SUMMARY FAIL', () => {
    const failAction = {
      type: API_REQUEST_FAILED,
      error: true,
      requestType: GET_RATES_SUMMARY,
    };
    expect(ratesSummaryReducer({}, failAction)).toEqual({ errors: true });
  });
});
