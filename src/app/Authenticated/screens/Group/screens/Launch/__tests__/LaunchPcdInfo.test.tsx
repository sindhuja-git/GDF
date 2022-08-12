/* eslint-disable no-param-reassign */
import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import render from 'utils/testing/render';
import { mockFetchData } from 'utils/testing/mockFetch';

import createMSWRestServer from 'utils/testing/createMSWRestServer';

import { client } from 'app/Authenticated/components/AuthenticatedAppProvider';

import { launchPlanPcdInfoQueryBuilder } from 'utils/testing/dataBuilders';
import LaunchPcdInfo from '../screens/PlansInfo/components/LaunchPcdInfo';

const mswServer = createMSWRestServer();

// Enable API mocking before tests.
beforeAll(() => mswServer.listen());

// Reset Apollo cache
beforeEach(() => client.resetStore());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => mswServer.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => mswServer.close());

describe('Plan Info - plan PCD Info section tests', () => {
  it('renders Plan Info - plan PCD Info', async () => {
    mockFetchData(launchPlanPcdInfoQueryBuilder);
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<LaunchPcdInfo load={false} err={false} />);
    });

    expect(await screen.findByText(/Package Code/)).toBeInTheDocument();
    expect(await screen.findByText(/Delivery Network/i)).toBeInTheDocument();
    expect(await screen.findByText(/Funding Type/i)).toBeInTheDocument();
    expect(await screen.findByText(/Corporation/i)).toBeInTheDocument();
  });
});
