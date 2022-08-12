/* eslint-disable no-param-reassign */
import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import render from 'utils/testing/render';
import { mockFetchData } from 'utils/testing/mockFetch';

import createMSWRestServer from 'utils/testing/createMSWRestServer';

import { client } from 'app/Authenticated/components/AuthenticatedAppProvider';

import { launchMspInfoQueryBuilder } from 'utils/testing/dataBuilders';
import LaunchMspInfo from '../screens/Demographics/components/LaunchMspInfo';

const mswServer = createMSWRestServer();

// Enable API mocking before tests.
beforeAll(() => mswServer.listen());

// Reset Apollo cache
beforeEach(() => client.resetStore());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => mswServer.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => mswServer.close());

describe('Demographics group MSP info page tests', () => {
  it('renders Demographics - Group MSP page  ', async () => {
    mockFetchData(launchMspInfoQueryBuilder);
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<LaunchMspInfo load={false} err={false} />);
    });

    expect(await screen.findByText('MSP Group Size')).toBeInTheDocument();
    expect(
      await screen.findByText(/MSP Group Size Effective Date/i)
    ).toBeInTheDocument();
  });
});
