/* eslint-disable no-param-reassign */
import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import render from 'utils/testing/render';
import { mockFetchData } from 'utils/testing/mockFetch';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import createMSWRestServer from 'utils/testing/createMSWRestServer';

import { client } from 'app/Authenticated/components/AuthenticatedAppProvider';

import { launchPlanPackageRulesQueryBuilder } from 'utils/testing/dataBuilders';
import LaunchPackageRules from '../screens/PlansInfo/components/LaunchPackageRules';

const mswServer = createMSWRestServer();

// Enable API mocking before tests.
beforeAll(() => mswServer.listen());

// Reset Apollo cache
beforeEach(() => client.resetStore());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => mswServer.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => mswServer.close());

describe('Plan Info - plan package rules section tests', () => {
  const mockStore = configureStore();
  const store = mockStore({
    eligibilityRules: {
      selectedOneEligibilityRule: {
        pdmaDomesticPartnerType: {
          code: { gdfValue: 'YSO', gsuValue: null, compareStatus: 'N/A' },
          compareStatus: 'N/A',
          name: {
            gdfValue:
              'Yes same sex without dep children in non-marriage states',
            gsuValue: null,
            compareStatus: 'N/A',
          },
        },
      },
    },
  });
  it('renders Plan Info - plan package rules  Info', async () => {
    mockFetchData(launchPlanPackageRulesQueryBuilder);
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(
        <Provider store={store}>
          <LaunchPackageRules load={false} err={false} />
        </Provider>
      );
    });

    expect(await screen.findByText(/Market Segment/i)).toBeInTheDocument();
    expect(await screen.findByText(/Cigna Affiliation/i)).toBeInTheDocument();
    expect(await screen.findByText(/Funding Subtype/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/Creditable RX Coverage?/)
    ).toBeInTheDocument();
    expect(await screen.findByText(/Grandfathered Plan?/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/What is the HRA Administrator Type?/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/PDMA Year Type/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/PDMA Domestic Partner Type/i)
    ).toBeInTheDocument();
  });
});
