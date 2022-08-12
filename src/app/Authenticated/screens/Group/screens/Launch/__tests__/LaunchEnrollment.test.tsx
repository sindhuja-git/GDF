/* eslint-disable no-param-reassign */
import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import render from 'utils/testing/render';
import { mockFetchData } from 'utils/testing/mockFetch';
import createMSWRestServer from 'utils/testing/createMSWRestServer';

import { client } from 'app/Authenticated/components/AuthenticatedAppProvider';

import { launchEnrollmentInfoQueryBuilder } from 'utils/testing/dataBuilders';
import LaunchEnrollment from '../screens/Demographics/components/LaunchEnrollment';

const mswServer = createMSWRestServer();

// Enable API mocking before tests.
beforeAll(() => mswServer.listen());

// Reset Apollo cache
beforeEach(() => client.resetStore());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => mswServer.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => mswServer.close());

describe('Demographics group enrollment info page tests', () => {
  it('renders Demographics - Group enrollment page  ', async () => {
    mockFetchData(launchEnrollmentInfoQueryBuilder);

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<LaunchEnrollment load={false} err={false} />);
    });
    expect(
      await screen.findByText(/Electronic Enrollment?/i)
    ).toBeInTheDocument();

    // Small group found
    expect(await screen.findByText(/Exchange Code/i)).toBeInTheDocument();
  });
});
