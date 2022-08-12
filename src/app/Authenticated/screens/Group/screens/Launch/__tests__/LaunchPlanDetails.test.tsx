/* eslint-disable no-param-reassign */
import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import render from 'utils/testing/render';
import { mockFetchData } from 'utils/testing/mockFetch';

import createMSWRestServer from 'utils/testing/createMSWRestServer';

import { client } from 'app/Authenticated/components/AuthenticatedAppProvider';

import { launchPlanDetailsQueryBuilder } from 'utils/testing/dataBuilders';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import LaunchPlanDetails from '../screens/PlansInfo/components/LaunchPlanDetails';

jest.mock(
  'app/Authenticated/screens/Group/screens/Launch/shared/useLaunchFormattedParams',
  () => () => ({ packageCode: 'abc123' })
);

const mswServer = createMSWRestServer();

// Enable API mocking before tests.
beforeAll(() => mswServer.listen());

// Reset Apollo cache
beforeEach(() => client.resetStore());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => mswServer.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => mswServer.close());

const mockStore = configureStore();
const baseStore = {
  planSummary: {
    planSummary: [
      {
        packageCode: 'abc123',
        compareStatus: 'EQUAL',
      },
    ],
  },
};

const gdfNameStore = {
  planSummary: {
    planSummary: [
      {
        gdfName:
          '2022 CST MN SI HPAI Choice - *Park Nicollet Primary Clinic MNA "Park Nicollet First Plan MNA "',
      },
    ],
  },
};

describe('Plan Info - plan details section tests, alert not present', () => {
  it('renders Plan Info - plan details', async () => {
    const planDetailsResponse = launchPlanDetailsQueryBuilder();
    planDetailsResponse.compareStatus = 'EQUAL';
    mockFetchData(planDetailsResponse);
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(
        <Provider store={mockStore(baseStore)}>
          <LaunchPlanDetails load={false} err={false} />
        </Provider>
      );
    });
    expect(await screen.findByText('GDF Name')).toBeInTheDocument();
    expect(await screen.findByText(/Begin Date/i)).toBeInTheDocument();
    expect(await screen.findByText(/End Date/i)).toBeInTheDocument();
    expect(await screen.findByText(/Plan Type/i)).toBeInTheDocument();
    expect(
      await screen.queryByText(
        'GDF Viewer could not accurately compare this plan'
      )
    ).not.toBeInTheDocument();
  });

  it('renders Plan Info - plan details, alert present', async () => {
    const baseStoreWithNotComparablePlan = {
      planSummary: {
        planSummary: [
          {
            packageCode: 'abc123',
            compareStatus: 'NOT_COMPARABLE',
          },
        ],
      },
    };
    const planDetailsResponse = launchPlanDetailsQueryBuilder();
    planDetailsResponse.compareStatus = 'NOT_COMPARABLE';
    mockFetchData(planDetailsResponse);
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(
        <Provider store={mockStore(baseStoreWithNotComparablePlan)}>
          <LaunchPlanDetails load={false} err={false} />
        </Provider>
      );
    });
    expect(await screen.findByText('GDF Name')).toBeInTheDocument();
    expect(await screen.findByText(/Begin Date/i)).toBeInTheDocument();
    expect(await screen.findByText(/End Date/i)).toBeInTheDocument();
    expect(await screen.findByText(/Plan Type/i)).toBeInTheDocument();
    expect(
      await screen.findByText(
        'GDF Viewer could not accurately compare this plan'
      )
    ).toBeInTheDocument();
  });
});

describe('GDF Name - GDF Name appears the same as in Mac Plan Summary', () => {
  it('renders Plan Info - plan details', async () => {
    const planDetailsResponse = launchPlanDetailsQueryBuilder();
    planDetailsResponse.compareStatus = 'EQUAL';
    planDetailsResponse.name.gdfValue =
      '2022 CST MN SI HPAI Choice - *Park Nicollet Primary Clinic MNA "Park Nicollet First Plan MNA "';
    mockFetchData(planDetailsResponse);

    await act(async () => {
      render(
        <Provider store={mockStore(gdfNameStore)}>
          <LaunchPlanDetails load={false} err={false} />
        </Provider>
      );
    });
    expect(
      await screen.findByText(
        '2022 CST MN SI HPAI Choice - *Park Nicollet Primary Clinic MNA "Park Nicollet First Plan MNA "'
      )
    ).toBeInTheDocument();
  });
});
