import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { Route } from 'react-router-dom';
import { graphql } from 'msw';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import render from 'utils/testing/render';
import createMSWServer from 'utils/testing/createMSWServer';
import {
  launchedHeaderInfoQueryBuilder,
  groupLaunchesQueryBuilder,
} from 'utils/testing/dataBuilders';
import { client } from 'app/Authenticated/components/AuthenticatedAppProvider';
import {
  AppLayoutElevationValueContext,
  AppLayoutElevationDispatchContext,
  ElevationStates,
} from 'app/components/AppLayoutProvider/context/AppLayoutElevationProvider';
import Launch from '../index';

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
    gdfDocument: [
      {
        downloadUrl: 'http://gdfDocumentDownload',
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

/**
 * For now testing at this level is a bit redundant as we are not a the screen. We may have more testing at this level eventually.
 */
describe('Launch Page tests', () => {
  test('Mounts component as 404', () => {
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
          initialEntries: ['/group/groupId/launches/launchId/invalid'],
        },
      }
    );

    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });
});

describe('LaunchLayout tests', () => {
  test('When layout mounts call dispatch with flatten. Unmounts call with resetElevation', () => {
    const mockDispatch = jest.fn();

    const { unmount } = render(
      <Provider store={store}>
        <AppLayoutElevationValueContext.Provider value={1}>
          <AppLayoutElevationDispatchContext.Provider value={mockDispatch}>
            <Route
              path="groups/:groupId/launches/:launchId/*"
              element={
                <Provider store={store}>
                  <Launch />
                </Provider>
              }
            />
          </AppLayoutElevationDispatchContext.Provider>
        </AppLayoutElevationValueContext.Provider>
      </Provider>,
      {
        routerProps: {
          initialEntries: ['/groups/groupId/launches/launchId/invalid/invalid'],
        },
      }
    );

    // dispatch is called with flatten.
    expect(mockDispatch).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith({
      type: ElevationStates.Flatten,
    });

    // reset mockDispatch
    mockDispatch.mockReset();
    expect(mockDispatch).not.toHaveBeenCalled();

    unmount();

    // dispatch is called with resetElevation.
    expect(mockDispatch).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith({
      type: ElevationStates.ResetElevation,
    });
  });

  test('Validate header when Launch In Flow - Final', async () => {
    const headerInfo = launchedHeaderInfoQueryBuilder();
    const groupLaunch = groupLaunchesQueryBuilder({
      group: {
        launches: [
          {
            isActive: true,
            status: {
              code: 'A',
              name: 'Active',
            },
          },
        ],
      },
    });
    const launch = groupLaunch.group.launches[0];

    mswServer.use(
      graphql.query('GetGroupLaunches', (req, res, ctx) => {
        return res(ctx.data(groupLaunch));
      }),
      graphql.query('GetHeaderInfo', (req, res, ctx) => {
        return res(ctx.data(headerInfo));
      })
    );

    render(
      <Route
        path="groups/:groupId/launches/:launchId/*"
        element={
          <Provider store={store}>
            <Launch />
          </Provider>
        }
      />,
      {
        routerProps: {
          initialEntries: [
            `/groups/${groupLaunch.group.id}/launches/${launch?.id}/invalid`,
          ],
        },
      }
    );

    // Group Title is correct
    expect(
      await screen.findByText(
        new RegExp(
          `${headerInfo.launchedGroup.number} ${headerInfo.launchedGroup.name}`,
          'i'
        )
      )
    ).toBeInTheDocument();

    // Launch Type is correct. Waiting cause it is independent api call
    expect(
      await screen.findByText(new RegExp(`gdf ${launch?.formType.name}`, 'i'))
    ).toBeInTheDocument();

    // Effective Date is found
    expect(screen.getByText(/effective date/i)).toBeInTheDocument();

    // Expect in flow
    expect(screen.getByText(/in flow/i)).toBeInTheDocument();

    // Expect in flow to be final
    expect(screen.getByText(/final$/i)).toBeInTheDocument();

    // mac received date is found
    expect(screen.getByText(/mac received date/i)).toBeInTheDocument();

    // final date is found
    expect(screen.getByText(/final date/i)).toBeInTheDocument();
  });

  test('Validate header when Launch In Flow - Draft', async () => {
    const headerInfo = launchedHeaderInfoQueryBuilder();
    const groupLaunch = groupLaunchesQueryBuilder({
      group: {
        launches: [
          {
            isActive: true,
            status: {
              code: 'A',
              name: 'Active',
            },
            finalDate: null,
            macReceivedDate: null,
          },
        ],
      },
    });
    const launch = groupLaunch.group.launches[0];

    mswServer.use(
      graphql.query('GetGroupLaunches', (req, res, ctx) => {
        return res(ctx.data(groupLaunch));
      }),
      graphql.query('GetHeaderInfo', (req, res, ctx) => {
        return res(ctx.data(headerInfo));
      })
    );

    render(
      <Route
        path="groups/:groupId/launches/:launchId/*"
        element={
          <Provider store={store}>
            <Launch />
          </Provider>
        }
      />,
      {
        routerProps: {
          initialEntries: [
            `/groups/${groupLaunch.group.id}/launches/${launch?.id}/invalid`,
          ],
        },
      }
    );

    // Group Title is correct
    expect(
      await screen.findByText(
        new RegExp(
          `${headerInfo.launchedGroup.number} ${headerInfo.launchedGroup.name}`,
          'i'
        )
      )
    ).toBeInTheDocument();

    // Launch Type is correct. Waiting cause it is independent api call
    expect(
      await screen.findByText(new RegExp(`gdf ${launch?.formType.name}`, 'i'))
    ).toBeInTheDocument();

    // Effective Date is found
    expect(screen.getByText(/effective date/i)).toBeInTheDocument();

    // Expect in flow
    expect(screen.getByText(/in flow/i)).toBeInTheDocument();

    // Expect in flow to be draft
    expect(screen.getByText(/draft$/i)).toBeInTheDocument();

    // mac received date is found
    expect(screen.queryByText(/mac received date/i)).not.toBeInTheDocument();

    // final date is found
    expect(screen.queryByText(/final date/i)).not.toBeInTheDocument();
  });

  test('Validate header when Rejected', async () => {
    const headerInfo = launchedHeaderInfoQueryBuilder();
    const groupLaunch = groupLaunchesQueryBuilder({
      group: {
        launches: [
          {
            isActive: false,
            status: {
              code: 'R',
              name: 'Rejected',
            },
            finalDate: null,
            macReceivedDate: null,
          },
        ],
      },
    });
    const launch = groupLaunch.group.launches[0];

    mswServer.use(
      graphql.query('GetGroupLaunches', (req, res, ctx) => {
        return res(ctx.data(groupLaunch));
      }),
      graphql.query('GetHeaderInfo', (req, res, ctx) => {
        return res(ctx.data(headerInfo));
      })
    );

    render(
      <Route
        path="groups/:groupId/launches/:launchId/*"
        element={
          <Provider store={store}>
            <Launch />
          </Provider>
        }
      />,
      {
        routerProps: {
          initialEntries: [
            `/groups/${groupLaunch.group.id}/launches/${launch?.id}/invalid`,
          ],
        },
      }
    );

    // Group Title is correct
    expect(
      await screen.findByText(
        new RegExp(
          `${headerInfo.launchedGroup.number} ${headerInfo.launchedGroup.name}`,
          'i'
        )
      )
    ).toBeInTheDocument();

    // Launch Type is correct. Waiting cause it is independent api call
    const launchInfoElement = await screen.findByText(
      new RegExp(`gdf ${launch?.formType.name}`, 'i')
    );
    expect(launchInfoElement).toBeInTheDocument();

    // Expect styling class with red border
    expect(launchInfoElement.className).toMatch(/rejectedStatus/i);

    // Expect in flow
    expect(screen.getByText(/rejected/i)).toBeInTheDocument();

    // Since it is rejected no draft nor final
    expect(screen.queryByText(/draft$/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/final$/i)).not.toBeInTheDocument();

    // effective date found
    expect(screen.queryByText(/effective date/i)).toBeInTheDocument();
  });

  test('Validate header when Completed', async () => {
    const headerInfo = launchedHeaderInfoQueryBuilder();
    const groupLaunch = groupLaunchesQueryBuilder({
      group: {
        launches: [
          {
            isActive: false,
            status: {
              code: 'C',
              name: 'Completed',
            },
            finalDate: null,
            macReceivedDate: null,
          },
        ],
      },
    });
    const launch = groupLaunch.group.launches[0];

    mswServer.use(
      graphql.query('GetGroupLaunches', (req, res, ctx) => {
        return res(ctx.data(groupLaunch));
      }),
      graphql.query('GetHeaderInfo', (req, res, ctx) => {
        return res(ctx.data(headerInfo));
      })
    );

    render(
      <Route
        path="groups/:groupId/launches/:launchId/*"
        element={
          <Provider store={store}>
            <Launch />
          </Provider>
        }
      />,
      {
        routerProps: {
          initialEntries: [
            `/groups/${groupLaunch.group.id}/launches/${launch?.id}/invalid`,
          ],
        },
      }
    );

    // Group Title is correct
    expect(
      await screen.findByText(
        new RegExp(
          `${headerInfo.launchedGroup.number} ${headerInfo.launchedGroup.name}`,
          'i'
        )
      )
    ).toBeInTheDocument();

    // Launch Type is correct. Waiting cause it is independent api call
    const launchInfoElement = await screen.findByText(
      new RegExp(`gdf ${launch?.formType.name}`, 'i')
    );
    expect(launchInfoElement).toBeInTheDocument();

    // Expect styling class with red border
    expect(launchInfoElement.className).toMatch(/completedStatus/i);

    // Expect in flow
    expect(screen.getByText(/completed/i)).toBeInTheDocument();

    // Since it is completed no draft nor final
    expect(screen.queryByText(/draft$/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/final$/i)).not.toBeInTheDocument();

    // effective date is found
    expect(screen.queryByText(/effective date/i)).toBeInTheDocument();
  });
});

describe('LaunchLayout Drawer tests', () => {
  test('Drawer renders expanded. Clicking on Menu closes it. Clicking again opens it', () => {
    const { container } = render(
      <Route
        path="groups/:groupId/launches/:launchId/*"
        element={
          <Provider store={store}>
            <Launch />
          </Provider>
        }
      />,
      {
        routerProps: {
          initialEntries: ['/groups/groupId/launches/launchId/invalid'],
        },
      }
    );

    // check drawer is open. We must check by id as drawer is always rendered. When closed it is rendered off the view port.
    const drawer = container.querySelector('#grp-nav-drwr');
    expect(drawer).toBeInTheDocument();
    expect(drawer?.getAttribute('aria-expanded')).toBe('true');

    // close drawer
    fireEvent.click(screen.getByRole('button', { name: /menu/i }));

    expect(drawer?.getAttribute('aria-expanded')).toBe('false');

    // open drawer
    fireEvent.click(screen.getByRole('button', { name: /menu/i }));

    expect(drawer?.getAttribute('aria-expanded')).toBe('true');
  });

  test('Render at demographic page, check it is current route. Change route, verify.', () => {
    render(
      <Route
        path="groups/:groupId/launches/:launchId/*"
        element={
          <Provider store={store}>
            <Launch />
          </Provider>
        }
      />,
      {
        routerProps: {
          initialEntries: ['/groups/groupId/launches/launchId'],
        },
      }
    );

    /**
     * As we are testing before we have page contents we are verifying the right route is open based on the navlink.
     * Bonus our navlink logic is custom
     */
    const demographicLink = screen.getByRole('button', {
      name: /demographics/i,
    });
    const sitesLink = screen.getByRole('button', {
      name: /sites/i,
    });
    expect(demographicLink.getAttribute('aria-current')).toBe('true');
    expect(sitesLink.getAttribute('aria-current')).toBe('false');

    // click sites
    fireEvent.click(sitesLink);

    // expect sites to be current route
    expect(demographicLink.getAttribute('aria-current')).toBe('false');
    expect(sitesLink.getAttribute('aria-current')).toBe('true');
  });
});
