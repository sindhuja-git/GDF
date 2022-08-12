/* eslint-disable no-param-reassign */
import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import render from 'utils/testing/render';
import { mockFetchData } from 'utils/testing/mockFetch';

import createMSWRestServer from 'utils/testing/createMSWRestServer';

import { client } from 'app/Authenticated/components/AuthenticatedAppProvider';

import { launchSLSFulfillmentInfoQueryBuilder } from 'utils/testing/dataBuilders';
import LaunchSLSFulfillment from '../screens/Demographics/components/LaunchSLSFulfillment';

const mswServer = createMSWRestServer();

// Enable API mocking before tests.
beforeAll(() => mswServer.listen());

// Reset Apollo cache
beforeEach(() => client.resetStore());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => mswServer.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => mswServer.close());

describe('Demographics group reps info page tests', () => {
  it('renders Demographics - Group reps page  ', async () => {
    mockFetchData(launchSLSFulfillmentInfoQueryBuilder);
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<LaunchSLSFulfillment load={false} err={false} />);
    });
    expect(
      await screen.findByText(/SLS Paperless Setting/i)
    ).toBeInTheDocument();
  });
});
