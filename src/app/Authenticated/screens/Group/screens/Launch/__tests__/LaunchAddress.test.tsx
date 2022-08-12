/* eslint-disable no-param-reassign */
import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import render from 'utils/testing/render';
import { mockFetchData } from 'utils/testing/mockFetch';

import createMSWRestServer from 'utils/testing/createMSWRestServer';

import { client } from 'app/Authenticated/components/AuthenticatedAppProvider';

import { launchAddressInfoQueryBuilder } from 'utils/testing/dataBuilders';
import LaunchAddressInfo from '../screens/Demographics/components/LaunchAddressInfo';

const mswServer = createMSWRestServer();

// Enable API mocking before tests.
beforeAll(() => mswServer.listen());

// Reset Apollo cache
beforeEach(() => client.resetStore());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => mswServer.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => mswServer.close());

describe('Demographics group address info page tests', () => {
  it('renders Demographics - Group address page  ', async () => {
    mockFetchData(launchAddressInfoQueryBuilder);
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<LaunchAddressInfo load={false} err={false} />);
    });

    expect(await screen.findByText(/Address Line 1/i)).toBeInTheDocument();
    expect(await screen.findByText(/Address Line 2/i)).toBeInTheDocument();
    expect(await screen.findByText(/City/i)).toBeInTheDocument();
    expect(await screen.findByText(/State/i)).toBeInTheDocument();
    expect(await screen.findByText(/Zip Code/i)).toBeInTheDocument();
    expect(await screen.findByText(/County/i)).toBeInTheDocument();
  });
});
