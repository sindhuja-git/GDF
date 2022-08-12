/* eslint-disable no-param-reassign */
import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { Route } from 'react-router-dom';
import render from 'utils/testing/render';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import createMSWRestServer from 'utils/testing/createMSWRestServer';
import { mockFetchData } from 'utils/testing/mockFetch';
import { act } from 'react-dom/test-utils';

import { launchGroupContactsInfoQueryBuilder } from 'utils/testing/dataBuilders';
import { client } from 'app/Authenticated/components/AuthenticatedAppProvider';
import useApiCall from '../shared/useApiCall';
import LaunchContactsGrid from '../screens/Contacts/components/LaunchContactsGrid';
import { getHighlightedCells } from '../shared/getHighlightedCells';
import Launch from '../index';
import { FetchStates } from '../shared/constants';
import {
  scenario12,
  scenario13,
  scenario14,
  scenario15,
  scenario21,
  scenario22,
  scenario23,
  scenario24,
  scenario25,
} from '../shared/contactsDiffScenarioTestData';

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
        attachmentType: {
          name: 'attachment type',
          code: 'attachment code',
        },
        active: true,
      },
    ],
  },
});

const mswServer = createMSWRestServer();

// Enable API mocking before tests.
beforeAll(() => mswServer.listen());

// Reset Apollo cache
beforeEach(() => client.resetStore());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => mswServer.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => mswServer.close());

describe('Contacts page tests', () => {
  test('navigate to Contacts page from left nav ', async () => {
    (useApiCall as jest.Mock).mockImplementation(() => ({
      currentState: 'Finished',
      response: [launchGroupContactsInfoQueryBuilder()],
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
    // Contacts Page is found
    const contactsTab = await screen.findByText(/Contacts/i);
    fireEvent.click(contactsTab);
    expect(await screen.findByRole('heading', { name: /Contacts/i }));
  });

  test('Contacts tab is not present when feature flag comes back false', async () => {
    (useApiCall as jest.Mock).mockImplementation(({ url }) => {
      // mock contactsTabFlagCallResponse
      if (url.includes('GDFViewer.ContactsTab')) {
        return {
          currentState: 'Finished',
          response: false,
        };
      }

      // mock diff call responses
      return {
        currentState: 'Finished',
        response: 'NOT_EQUAL',
      };
    });

    await act(async () => {
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
    });

    // Contacts tab is not shown
    expect(await screen.queryByText(/Contacts/i)).not.toBeInTheDocument();
  });

  test('renders Contacts page and the data grid ', async () => {
    mockFetchData(launchGroupContactsInfoQueryBuilder);
    (useApiCall as jest.Mock).mockImplementation(({ url }) => {
      // mock contactsCallResponse
      if (url.includes('/contacts')) {
        return {
          currentState: FetchStates.FINISHED,
          response: [],
        };
      }

      // mock diff call responses
      return {
        currentState: FetchStates.FINISHED,
        response: 'NOT_EQUAL',
      };
    });
    await act(async () => {
      const { getByRole } = render(
        <LaunchContactsGrid load={false} err={false} />
      );
      expect(
        getByRole('columnheader', { name: /Contact Name/i })
      ).toBeInTheDocument();
      expect(
        getByRole('columnheader', { name: /Contact Type/i })
      ).toBeInTheDocument();
      expect(
        getByRole('columnheader', { name: /Site ID/i })
      ).toBeInTheDocument();
      expect(
        getByRole('columnheader', { name: /Address/i })
      ).toBeInTheDocument();
      expect(
        getByRole('columnheader', { name: /Primary Phone/i })
      ).toBeInTheDocument();
      expect(getByRole('columnheader', { name: /Fax/i })).toBeInTheDocument();
      expect(getByRole('columnheader', { name: /Email/i })).toBeInTheDocument();
    });
  });

  // Data-driven scenarios for Contacts Grid [https://confluence.healthpartners.com/confluence/display/AS/Contacts+DIFF+COMPARE+Scenarios]
  test.each`
    scenarioNumber | scenarioObject
    ${12}          | ${scenario12}
    ${13}          | ${scenario13}
    ${14}          | ${scenario14}
    ${15}          | ${scenario15}
    ${21}          | ${scenario21}
    ${22}          | ${scenario22}
    ${23}          | ${scenario23}
    ${24}          | ${scenario24}
    ${25}          | ${scenario25}
  `(
    `Scenario $scenarioNumber test`,
    async ({ scenarioObject: { apiResponse, highlightedCells } }) => {
      (useApiCall as jest.Mock).mockImplementation(() => ({
        currentState: 'Finished',
        response: apiResponse,
      }));
      await act(async () => {
        render(<LaunchContactsGrid load={false} err={false} />);
        expect(getHighlightedCells('contact')).toStrictEqual(highlightedCells);
      });
    }
  );
});
