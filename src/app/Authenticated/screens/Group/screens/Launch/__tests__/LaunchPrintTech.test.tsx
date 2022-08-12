/* eslint-disable no-param-reassign */
import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import render from 'utils/testing/render';
import { mockFetchData } from 'utils/testing/mockFetch';

import createMSWRestServer from 'utils/testing/createMSWRestServer';

import { client } from 'app/Authenticated/components/AuthenticatedAppProvider';

import { launchPrintTechInfoQueryBuilder } from 'utils/testing/dataBuilders';
import LaunchPrintTechInfo from '../screens/Demographics/components/LaunchPrintTechInfo';

const mswServer = createMSWRestServer();

// Enable API mocking before tests.
beforeAll(() => mswServer.listen());

// Reset Apollo cache
beforeEach(() => client.resetStore());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => mswServer.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => mswServer.close());

describe('Demographics print tech info page tests', () => {
  it('renders Demographics - Group print tech page  ', async () => {
    mockFetchData(launchPrintTechInfoQueryBuilder);
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<LaunchPrintTechInfo load={false} err={false} />);
    });
    expect(
      await screen.findByText('Contract/SPD FulFillment')
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/SBC Distributed by HP?/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/Public Entity?/)).toBeInTheDocument();
    expect(await screen.findByText(/ERISA?/)).toBeInTheDocument();
  });
});
