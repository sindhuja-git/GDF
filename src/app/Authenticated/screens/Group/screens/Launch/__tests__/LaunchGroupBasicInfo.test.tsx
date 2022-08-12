/* eslint-disable no-param-reassign */
import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import render from 'utils/testing/render';
import { rest } from 'msw';
import { mockFetchData } from 'utils/testing/mockFetch';

import createMSWRestServer from 'utils/testing/createMSWRestServer';

import { client } from 'app/Authenticated/components/AuthenticatedAppProvider';
import { launchGroupBasicInfoQueryBuilder } from 'utils/testing/dataBuilders';
import LaunchGroupBasicInfo from '../screens/Demographics/components/LaunchGroupBasicInfo';

const mswServer = createMSWRestServer();

// Enable API mocking before tests.
beforeAll(() => mswServer.listen());

// Reset Apollo cache
beforeEach(() => {
  //   mockGetRowData.mockReset();
  client.resetStore();
});

// Reset any runtime request handlers we may add during the tests.
afterEach(() => mswServer.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => mswServer.close());

describe('Demographics basic info page tests', () => {
  it('renders Demographics page and the data grid ', async () => {
    mockFetchData(launchGroupBasicInfoQueryBuilder);

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<LaunchGroupBasicInfo load={false} err={false} />);
    });
    expect(await screen.findByText(/Group Number/i)).toBeInTheDocument();

    // Small group found
    expect(await screen.findByText(/Small Group/i)).toBeInTheDocument();

    // Group Inception Date
    expect(
      await screen.findByText(/Group Inception Date/i)
    ).toBeInTheDocument();

    // group Name found
    expect(await screen.findByText(/Legal Name/i)).toBeInTheDocument();

    // EIN/TIN found
    expect(await screen.findByText('EIN/TIN')).toBeInTheDocument();

    // DBA Name found
    expect(await screen.findByText(/DBA Name/i)).toBeInTheDocument();

    // remove the mock to ensure tests are completely isolated
    // global.fetch.mockRestore();
  });

  it('should give the is small group as true', async () => {
    const updatedLaunchGroupBasicInfo = launchGroupBasicInfoQueryBuilder({
      map: (data) => {
        data.isSmallGroup.gdfValue = true;

        return data;
      },
    });

    mswServer.use(
      rest.get('getGroupBasicInfoData', (req, res, ctx) => {
        return res(ctx.json(updatedLaunchGroupBasicInfo));
      })
    );

    mockFetchData(updatedLaunchGroupBasicInfo);

    await act(async () => {
      render(<LaunchGroupBasicInfo load={false} err={false} />);
    });

    const smallGroupValue = document.getElementById('small-group-value')
      ?.innerHTML;
    expect(smallGroupValue).toBe('Yes');
  });
});
