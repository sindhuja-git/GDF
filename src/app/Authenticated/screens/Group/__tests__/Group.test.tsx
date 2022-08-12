import React from 'react';
import { Route } from 'react-router-dom';
import { screen } from '@testing-library/react';
import { graphql } from 'msw';
import createMSWServer from 'utils/testing/createMSWServer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import render from 'utils/testing/render';
import { client } from 'app/Authenticated/components/AuthenticatedAppProvider';
import Group from '../index';

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
        attachmentType: {
          name: 'attachment type',
          code: 'attachment code',
        },
        downloadUrl: 'attachment url',
        active: true,
      },
    ],
  },
});

const mswServer = createMSWServer();

// Enable API mocking before tests.
beforeAll(() => mswServer.listen());

// Reset Apollo cache
beforeEach(() => client.resetStore());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => mswServer.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => mswServer.close());

describe('Group Pages tests', () => {
  test('When URL is invalid. Show 404', () => {
    render(
      <Route
        path="group/:groupId/*"
        element={
          <Provider store={store}>
            <Group />
          </Provider>
        }
      />,
      {
        routerProps: {
          initialEntries: ['/group/groupId/invalid'],
        },
      }
    );

    expect(screen.getByText(/404 - not found/i)).toBeInTheDocument();
  });

  test('When URL is root url; "/". If group has no launches. Render no launches.', async () => {
    mswServer.use(
      graphql.query('GetLatestLaunch', (req, res, ctx) => {
        return res(
          ctx.data({
            group: {
              __typename: 'Group',
              id: 'groupId',
              launches: [],
            },
          })
        );
      })
    );

    render(
      <Route
        path="group/:groupId/*"
        element={
          <Provider store={store}>
            <Group />
          </Provider>
        }
      />,
      {
        routerProps: {
          initialEntries: ['/group/groupId'],
        },
      }
    );

    // find no launches
    expect(
      await screen.findByText(/this group has no launches/i)
    ).toBeInTheDocument();
  });

  test('When URL is root url; "/". If GetLatestLaunch fails with unexpected error. print error message', async () => {
    mswServer.use(
      graphql.query('GetLatestLaunch', (req, res, ctx) => {
        return res(
          ctx.errors([
            {
              message: 'Not authorized',
            },
          ])
        );
      })
    );

    render(
      <Route
        path="group/:groupId/*"
        element={
          <Provider store={store}>
            <Group />
          </Provider>
        }
      />,
      {
        routerProps: {
          initialEntries: ['/group/groupId'],
        },
      }
    );

    // find error description
    expect(
      await screen.findByText(
        /Unable to find latest launch: Error: Not authorized/i
      )
    ).toBeInTheDocument();
  });

  test('When URL is root url; "/". If GetLatestLaunch returns a latest launch. Redirect to demographics', async () => {
    mswServer.use(
      graphql.query('GetLatestLaunch', (req, res, ctx) => {
        return res(
          ctx.data({
            group: {
              __typename: 'Group',
              id: 'groupId',
              launches: [
                {
                  __typename: 'Launch',
                  id: '1337',
                },
              ],
            },
          })
        );
      })
    );

    render(
      <Route
        path="group/:groupId/*"
        element={
          <Provider store={store}>
            <Group />
          </Provider>
        }
      />,
      {
        routerProps: {
          initialEntries: ['/group/groupId'],
        },
      }
    );

    // find demographcis
    expect(
      await screen.findByRole('heading', { name: /demographics/i })
    ).toBeInTheDocument();
  });
});
