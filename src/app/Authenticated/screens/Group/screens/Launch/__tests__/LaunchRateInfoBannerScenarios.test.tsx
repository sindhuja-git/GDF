/* eslint-disable no-param-reassign */
import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import render from 'utils/testing/render';

import createMSWRestServer from 'utils/testing/createMSWRestServer';

import { client } from 'app/Authenticated/components/AuthenticatedAppProvider';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import LaunchRateInfo from '../screens/RateInfo/components/LaunchRateInfo';
import useApiCall from '../shared/useApiCall';
import { FetchStates } from '../shared/constants';
import {
  scenario01,
  scenario02,
  scenario03,
  scenario04,
  scenario05,
  scenario06,
  scenario07,
  scenario08,
  scenario09,
  scenario10,
  scenario11,
  scenario12,
} from '../shared/rateInfoDiffScenarios';

jest.mock(
  'app/Authenticated/screens/Group/screens/Launch/shared/useLaunchFormattedParams',
  () => () => ({ packageCode: 'abc123' })
);

const mockImplementationFromResponseDefinition = (responseDefinition: any) => ({
  url,
}) => {
  if (url.includes('rates/gsu')) {
    return {
      currentState: FetchStates.FINISHED,
      response: responseDefinition.apiResponseFromRatesGsu,
    };
  }
  if (url.includes('rate/referential')) {
    return {
      currentState: FetchStates.FINISHED,
      response: responseDefinition.apiResponseFromReferential,
    };
  }
  if (url.includes('/rates')) {
    return {
      currentState: FetchStates.FINISHED,
      response: {
        gdfName: 'name',
      },
    };
  }

  // mock diff call responses
  return {
    currentState: FetchStates.FINISHED,
    response: 'NOT_EQUAL',
  };
};

jest.mock('../shared/useApiCall');
const mswServer = createMSWRestServer();

// Enable API mocking before tests.
beforeAll(() => mswServer.listen());

// Reset Apollo cache
beforeEach(() => client.resetStore());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => mswServer.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => mswServer.close());

const mockStore = configureStore();
const baseStore = {
  rateSummary: {
    rateSummary: [
      {
        planId: 'planId',
        gdfName: 'gdfName',
        packageCode: 'abc123',
        compareStatus: 'EQUAL',
      },
      {
        planId: 'planId1',
        gdfName: 'gdfName1',
        packageCode: 'abc123',
        compareStatus: 'NOT_COMPARABLE',
      },
    ],
  },
};

describe('Rate Info - banner scenarios', () => {
  // Data-driven scenarios for Sites Grid [https://confluence.healthpartners.com/confluence/display/AS/Rates+DIFF+COMPARE+Scenarios]
  // second table in the confluence page after scrolling down - https://confluence.healthpartners.com/confluence/display/AS/Rates+DIFF+COMPARE+Scenarios
  // test for border color, icon and message text
  test.each`
    scenarioName                                                                                                            | scenarioObject
    ${`1. with rate comment, no differences`}                                                                               | ${scenario01}
    ${`2. with rate comment, no differences, no addon`}                                                                     | ${scenario02}
    ${`3. Match, with rate comment, with one rate field difference(s), no add-on rates`}                                    | ${scenario03}
    ${`4. only in GDF, with rate comment`}                                                                                  | ${scenario04}
    ${`5. No match (only in GDF), with rate comment, with one add-on`}                                                      | ${scenario05}
    ${`6. Match and rate field diff, with rate comment, with one add-on and diff in add-on`}                                | ${scenario06}
    ${`7. Match and rate field diff, with rate comment, with one mis-matched add-on rate (only in GDF) `}                   | ${scenario07}
    ${`8. Match and rate field diff, with rate comment, with one matched add-on rate and no diff on add-on (Only in GDF) `} | ${scenario08}
    ${`9. Match, with one mis-matched add-on rate (only in GSU) but has rate comments`}                                     | ${scenario09}
    ${`10. match, with one mis-matched add-on rate (only in GDF), diff on rate tier values, but has rate comments`}         | ${scenario10}
    ${`11. match, with one mis-matched add-on rate (only in GSU) and a
     second mis-matched add-on rate (only in GDF), but has rate comments and one diff in rate tier values`} | ${scenario11}
    ${`12.  No comments message when there are no rate comments`}                                                           | ${scenario12}
  `(
    `Scenario $scenarioName test`,
    async ({
      scenarioObject: {
        apiResponseFromRatesGsu,
        apiResponseFromReferential,
        icons,
        error,
        warning,
        messagetexts,
        highlightedCells,
      },
    }) => {
      (useApiCall as jest.Mock).mockImplementation(
        mockImplementationFromResponseDefinition({
          apiResponseFromRatesGsu,
          apiResponseFromReferential,
        })
      );

      // Use the asynchronous version of act to apply resolved promises
      await act(async () => {
        const { container } = render(
          <Provider store={mockStore(baseStore)}>
            <LaunchRateInfo load={false} err={false} />
          </Provider>
        );
        // Red banner
        expect(
          container.getElementsByClassName(' MuiAlert-standardError').length
        ).toBe(error);
        // Orange banner
        expect(
          container.getElementsByClassName('MuiAlert-standardWarning').length
        ).toBe(warning);

        const getHighlightedFields = Array.from(
          container.getElementsByClassName('background-highlight')
        );
        const spans = getHighlightedFields?.flatMap((g) => {
          return [g.firstChild?.firstChild?.textContent];
        });
        expect(spans).toEqual(highlightedCells);
      });
      icons.forEach((i: any) => {
        const test = screen.getByTestId(i);
        expect(test).toBeInTheDocument();
      });
      messagetexts.forEach((message: any) => {
        const test = screen.getByText(message);
        expect(test).toBeInTheDocument();
      });
    }
  );
});
