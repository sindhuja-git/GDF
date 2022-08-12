/* eslint-disable no-param-reassign */
import React from 'react';
import { act, screen } from '@testing-library/react';
import { Route } from 'react-router-dom';
import render from 'utils/testing/render';
import createMSWRestServer from 'utils/testing/createMSWRestServer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { client } from 'app/Authenticated/components/AuthenticatedAppProvider';
import GspPlanCards from '../screens/Gsp/components/GspPlanCards';

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
  planSummary: {
    planSummary: [
      {
        planId: 7287228,
        planType: {
          code: 'M',
          name: 'Medical',
        },
        packageCode: '',
        marketSegment: {
          code: '42',
          name: '42 Large Non-Brokered',
        },
        otherCurrentPackageCodes: ['JWSI'],
      },
    ],
  },
});

const mswServer = createMSWRestServer();

// Enable API mocking before tests.
beforeAll(() => mswServer.listen());

// Reset Apollo cache
beforeEach(() => {
  client.resetStore();
});

// Reset any runtime request handlers we may add during the tests.
afterEach(() => mswServer.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => mswServer.close());

describe('GSP page tests - info cards', () => {
  test('renders GspPlanCards and the loading progress bar', async () => {
    await act(async () => {
      render(
        <Route
          path="group/:groupId/launches/:launchId/gsp"
          element={
            <Provider store={store}>
              <GspPlanCards />
            </Provider>
          }
        />,
        {
          routerProps: {
            initialEntries: ['/group/groupId/launches/launchId/gsp'],
          },
        }
      );
      expect(
        await screen.findByText('Government Programs')
      ).toBeInTheDocument();
      expect(await screen.findByText('CDHP')).toBeInTheDocument();
      expect(
        await screen.findByText('Health & Well-Being Solutions')
      ).toBeInTheDocument();
    });
  });
});
