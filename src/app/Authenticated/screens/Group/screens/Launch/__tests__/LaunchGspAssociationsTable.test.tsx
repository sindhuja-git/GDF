/* eslint-disable no-param-reassign */
import React from 'react';
import { screen, fireEvent, act } from '@testing-library/react';
import { Route } from 'react-router-dom';

import render from 'utils/testing/render';

import createMSWRestServer from 'utils/testing/createMSWRestServer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { client } from 'app/Authenticated/components/AuthenticatedAppProvider';
import { launchGspAssociationTableInfoBuilder } from 'utils/testing/dataBuilders';
import { mockFetchData } from 'utils/testing/mockFetch';
import LaunchGspAssociationsTable from '../screens/Gsp/components/LaunchGspAssociationsTable';
import Launch from '../index';
import { FetchStates } from '../shared/constants';
import useApiCall from '../shared/useApiCall';

jest.mock('../shared/useApiCall');

const mockStore = configureStore();
const store = mockStore({
  groupNumber: {
    groupNumber: 1234,
  },
  attachments: {
    groupAttachments: [
      {
        id: 819600905,
        name: 'attachmentName',
        downloadUrl: 'attachment url',
        active: true,
        attachmentType: {
          name: 'attachment type',
          code: 'attachment code',
        },
      },
    ],
  },
});

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

describe('GSP page tests', () => {
  test('navigate to GSP page from left nav ', async () => {
    (useApiCall as jest.Mock).mockImplementation(() => ({
      currentState: 'Finished',
      response: [launchGspAssociationTableInfoBuilder()],
    }));

    render(
      <Route
        path="group/:groupId/launches/:launchId/*"
        element={
          <Provider store={store}>
            <Launch />
          </Provider>
        }
      />,
      {
        routerProps: {
          initialEntries: ['/group/groupId/launches/launchId/'],
        },
      }
    );
    // GSP Page is found
    const gspTab = await screen.findByText(/GSP/i);
    fireEvent.click(gspTab);
    expect(await screen.findByRole('heading', { name: /GSP/i }));
  });

  test('renders GSP page and the data grid ', async () => {
    (useApiCall as jest.Mock).mockImplementation(({ url }) => {
      // mock contactsTabFlagCallResponse
      if (url.includes('GDFViewer.RatesTab')) {
        return {
          currentState: 'Finished',
          response: [],
        };
      }

      // mock diff call responses
      return {
        currentState: 'Finished',
        response: [],
      };
    });
    render(
      <Route
        path="group/:groupId/launches/:launchId/*"
        element={
          <Provider store={store}>
            <Launch />
          </Provider>
        }
      />,
      {
        routerProps: {
          initialEntries: ['/group/groupId/launches/launchId/'],
        },
      }
    );
    // GSP Page is found
    const gspTab = await screen.findByText(/GSP/i);
    fireEvent.click(gspTab);
    expect(await screen.findByRole('heading', { name: /GSP/i }));
  });
});

test('renders GSP page and the data grid ', async () => {
  mockFetchData(launchGspAssociationTableInfoBuilder);
  (useApiCall as jest.Mock).mockImplementation(({ url }) => {
    // mock contactsCallResponse
    if (url.includes('/gsp-associations')) {
      return {
        currentState: FetchStates.FINISHED,
        response: [
          {
            street1: {
              compareStatus: 'NOT_EQUAL',
              gdfValue: 'street1',
              gsuValue: 'street3',
            },
            street2: {
              compareStatus: 'EQUAL',
              gdfValue: 'street2',
              gsuValue: 'street2',
            },
            zip: {
              compareStatus: 'EQUAL',
              gdfValue: 'ZIP',
              gsuValue: 'ZIP',
            },
            compareStatus: 'NOT_EQUAL',
          },
        ],
      };
    }

    // mock diff call responses
    return {
      currentState: FetchStates.FINISHED,
      response: [],
    };
  });

  await act(async () => {
    const { getByRole } = render(<LaunchGspAssociationsTable />);
    expect(
      await screen.findByText(/Group-Site-Plan Associations/i)
    ).toBeInTheDocument();
    expect(
      getByRole('columnheader', { name: /Plan Type/i })
    ).toBeInTheDocument();
    expect(getByRole('columnheader', { name: /Site ID/i })).toBeInTheDocument();
    expect(getByRole('columnheader', { name: /Package/i })).toBeInTheDocument();
  });
});
