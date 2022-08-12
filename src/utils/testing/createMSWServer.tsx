import { graphql } from 'msw';
import { setupServer } from 'msw/node';

import {
  launchedHeaderInfoQueryBuilder,
  groupLaunchesQueryBuilder,
  groupCommentsQueryBuilder,
} from 'utils/testing/dataBuilders';

/**
 * ! We will be testing invalid routes and layout here. We will be testing demographics pages independently.
 */

export const defaultHeader = launchedHeaderInfoQueryBuilder();
export const defaultLaunch = groupLaunchesQueryBuilder({
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

export const defaultGroupCommentsInfo = groupCommentsQueryBuilder();

/**
 * MSW doesn't provide us the types for overrides.
 */
const createMSWServer = (...overrides: any) =>
  setupServer(
    graphql.query('GetGroupLaunches', (req, res, ctx) => {
      return res(ctx.data(defaultLaunch));
    }),
    graphql.query('GetHeaderInfo', (req, res, ctx) => {
      return res(ctx.data(defaultHeader));
    }),
    graphql.query('GetGroupCommentsInfo', (req, res, ctx) => {
      return res(ctx.data(defaultGroupCommentsInfo));
    }),

    ...overrides
  );

export default createMSWServer;
