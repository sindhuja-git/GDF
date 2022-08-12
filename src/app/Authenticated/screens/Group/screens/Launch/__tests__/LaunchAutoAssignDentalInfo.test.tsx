/* eslint-disable no-param-reassign */
import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import render from 'utils/testing/render';
import { rest } from 'msw';
import { mockFetchData } from 'utils/testing/mockFetch';

import createMSWRestServer from 'utils/testing/createMSWRestServer';

import { client } from 'app/Authenticated/components/AuthenticatedAppProvider';

import { launchAutoAssignDentalInfoQueryBuilder } from 'utils/testing/dataBuilders';
// eslint-disable-next-line import/no-named-as-default
import LaunchAutoAssignDentalDetails from '../screens/PlansInfo/components/LaunchAutoAssignDentalDetails';

const mswServer = createMSWRestServer();

// Enable API mocking before tests.
beforeAll(() => mswServer.listen());

// Reset Apollo cache
beforeEach(() => client.resetStore());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => mswServer.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => mswServer.close());

describe('Renders Auto dental Info - Plan Info', () => {
  it('Renders Auto dental Info - Medical Plan  ', async () => {
    mockFetchData(launchAutoAssignDentalInfoQueryBuilder);
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<LaunchAutoAssignDentalDetails load={false} err={false} />);
    });
    expect(screen.queryByText('Auto Assign Package')).toBeInTheDocument();
    expect(
      screen.queryByText('Auto Assign Package Delivery Network')
    ).toBeInTheDocument();
    expect(screen.queryByText('Auto Assign Type')).toBeInTheDocument();
  });

  it('Renders No Auto dental Info - Medical Plan  ', async () => {
    const launchAutoAssignDentalInfoQueryBuilderNoAutoDental = launchAutoAssignDentalInfoQueryBuilder(
      {
        map: (data) => {
          data.autoAssignType.gdfValue = null;
          data.autoAssignType.compareStatus = 'EQUAL';
          data.autoAssignPackageDeliveryNetwork.code.gdfValue = null;
          data.autoAssignPackageDeliveryNetwork.name.gdfValue = null;
          data.autoAssignPackageDeliveryNetwork.compareStatus = 'EQUAL';
          data.autoAssignPackage.gdfValue = null;
          data.autoAssignPackage.compareStatus = 'EQUAL';
          return data;
        },
      }
    );

    mswServer.use(
      rest.get('getGroupBasicInfoData', (req, res, ctx) => {
        return res(
          ctx.json(launchAutoAssignDentalInfoQueryBuilderNoAutoDental)
        );
      })
    );

    mockFetchData(launchAutoAssignDentalInfoQueryBuilderNoAutoDental);
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<LaunchAutoAssignDentalDetails load={false} err={false} />);
    });
    expect(screen.queryByText('Auto Assign Package')).toBeNull();
    expect(
      screen.queryByText('Auto Assign Package Delivery Network')
    ).toBeNull();
    expect(screen.queryByText('Auto Assign Type')).toBeNull();

    // none of the fields are highlighted, all EQUAL
    expect(
      screen
        .queryByText('Auto Assign Package')
        ?.parentElement?.parentElement?.className?.split(' ')
        ?.find((className) => className.includes('backgroundHighlight'))
    ).toBeUndefined();
    expect(
      screen
        .queryByText('Auto Assign Package Delivery Network')
        ?.parentElement?.parentElement?.className?.split(' ')
        ?.find((className) => className.includes('backgroundHighlight'))
    ).toBeUndefined();
    expect(
      screen
        .queryByText('Auto Assign Type')
        ?.parentElement?.parentElement?.className?.split(' ')
        ?.find((className) => className.includes('backgroundHighlight'))
    ).toBeUndefined();
  });

  it('Renders Highlighted Fields when compareStatus is NOT_EQUAL - Medical Plan  ', async () => {
    const launchAutoAssignDentalInfoQueryBuilderNoAutoDental = launchAutoAssignDentalInfoQueryBuilder(
      {
        map: (data) => {
          data.autoAssignType.gdfValue = 'Family';
          data.autoAssignType.compareStatus = 'NOT_EQUAL';
          data.autoAssignPackageDeliveryNetwork.code.gdfValue = 'A';
          data.autoAssignPackageDeliveryNetwork.name.gdfValue = 'A';
          data.autoAssignPackageDeliveryNetwork.compareStatus = 'NOT_EQUAL';
          data.autoAssignPackage.gdfValue = 'PHB10';
          data.autoAssignPackage.compareStatus = 'NOT_EQUAL';
          return data;
        },
      }
    );

    mswServer.use(
      rest.get('getGroupBasicInfoData', (req, res, ctx) => {
        return res(
          ctx.json(launchAutoAssignDentalInfoQueryBuilderNoAutoDental)
        );
      })
    );

    mockFetchData(launchAutoAssignDentalInfoQueryBuilderNoAutoDental);
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<LaunchAutoAssignDentalDetails load={false} err={false} />);
    });

    // all three fields are highlighted, all NOT_EQUAL
    expect(
      screen
        .queryByText('Auto Assign Package')
        ?.parentElement?.parentElement?.className?.split(' ')
        ?.find((className) => className.includes('backgroundHighlight'))
    ).toBeDefined();
    expect(
      screen
        .queryByText('Auto Assign Package Delivery Network')
        ?.parentElement?.parentElement?.className?.split(' ')
        ?.find((className) => className.includes('backgroundHighlight'))
    ).toBeDefined();
    expect(
      screen
        .queryByText('Auto Assign Type')
        ?.parentElement?.parentElement?.className?.split(' ')
        ?.find((className) => className.includes('backgroundHighlight'))
    ).toBeDefined();
  });
});
