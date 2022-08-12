/* eslint-disable no-param-reassign */
import React from 'react';
// import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import render from 'utils/testing/render';
import { mockFetchData } from 'utils/testing/mockFetch';

import createMSWRestServer from 'utils/testing/createMSWRestServer';

import { client } from 'app/Authenticated/components/AuthenticatedAppProvider';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {
  launchPlanEligibilityRulesQueryBuilder,
  launchPlanEligibilityRuleInfoQueryBuilder,
} from 'utils/testing/dataBuilders';
import LaunchEligibilityRules from '../screens/PlansInfo/components/LaunchEligibilityRules';

const mockStore = configureStore();
const store = mockStore({
  eligibilityRules: {
    selectedOneEligibilityRule: {
      pdmaDomesticPartnerType: {
        code: { gdfValue: 'YSO', gsuValue: null, compareStatus: 'N/A' },
        compareStatus: 'N/A',
        name: {
          gdfValue: 'Yes same sex without dep children in non-marriage states',
          gsuValue: null,
          compareStatus: 'N/A',
        },
      },
    },
  },
});
// import LaunchEligibilityRuleInfo from '../screens/PlansInfo/components/LaunchEligibilityRuleInfo';

const mswServer = createMSWRestServer();

// Enable API mocking before tests.
beforeAll(() => mswServer.listen());

// Reset Apollo cache
beforeEach(() => client.resetStore());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => mswServer.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => mswServer.close());

describe('Plan Info - Eligibility rules section tests', () => {
  it('renders Plan Info - Eligibility rules section', async () => {
    mockFetchData(launchPlanEligibilityRulesQueryBuilder);
    mockFetchData(launchPlanEligibilityRuleInfoQueryBuilder);
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(
        <Provider store={store}>
          <LaunchEligibilityRules load={false} err={false} />
        </Provider>
      );
    });
    /* await act(async () => {
      render(<LaunchEligibilityRuleInfo load={false} err={false} />);
    }); */

    // expect(await screen.findByText(/Eligibility Rules/)).toBeInTheDocument();
    /* expect(
      await screen.findByText(/New Hire Waiting Period/)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Rehire Waiting Period/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Grandchildren Allowed?/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Non-Student Age-Off Rules/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Student Age-Off Rules')
    ).toBeInTheDocument(); */
    // expect(await screen.findByText(/Max Dependent Age/i)).toBeInTheDocument();
    // expect(await screen.findByText(/When to Cancel Rule/i)).toBeInTheDocument();
  });
});
