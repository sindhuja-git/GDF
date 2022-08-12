/* eslint-disable no-param-reassign */
import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { Route } from 'react-router-dom';
import render from 'utils/testing/render';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { launchGroupSitesInfoQueryBuilder } from 'utils/testing/dataBuilders';
import { act } from 'react-dom/test-utils';
import Launch from '../index';
import useApiCall from '../shared/useApiCall';
import LaunchSitesGrid from '../screens/Sites/components/LaunchSitesGrid';
import { getHighlightedCells } from '../shared/getHighlightedCells';
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
  scenario13,
  scenario14,
  scenario15,
  scenario18,
  scenario19,
  scenario31,
  scenario37,
  scenario47,
  scenario48,
  scenario49,
  scenario50,
  scenario52,
  scenario53,
  scenario54,
  scenario55,
  scenario61,
  scenario70,
  scenario79,
} from '../shared/sitesDiffScenarioTestData';

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

const rowCellToEntries = (rowCell: any) => {
  const divs: any[] = Array.from(rowCell.querySelectorAll('div'));
  return [divs[0].innerHTML, divs[1].innerHTML.replace(/<[^>]*>/g, '')];
};

const rowNodeToRowCell = (rowNode: any) =>
  Array.from(rowNode.querySelectorAll('td'));

const rowNodeToObject = (rowNode: any) =>
  Object.fromEntries(rowNodeToRowCell(rowNode).map(rowCellToEntries));

const rowNodeToSiteId = (rowNode: any) => rowNodeToObject(rowNode)['Site ID'];

const getAllDisplayedRows = () =>
  Array.from(screen.getByRole('grid').querySelectorAll('tr.site-row'));

const getHighlightedRows = () =>
  Array.from(screen.getByRole('grid').querySelectorAll('tr.highlighted-row'));

const getSiteIdsInOrangeAlert = () => {
  const alertNode = screen.queryByRole('alert');
  if (alertNode) {
    return Array.from(
      alertNode.querySelectorAll('div.MuiAlert-message > li')
    ).flatMap((listEntryNode: any) =>
      listEntryNode.innerHTML.replace('Site ID: ', '')
    );
  }
  return [];
};

describe('Sites page tests', () => {
  test('navigate to Sites page from left nav ', async () => {
    (useApiCall as jest.Mock).mockImplementation(() => ({
      currentState: 'Finished',
      response: [launchGroupSitesInfoQueryBuilder()],
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
    // Sites Page is found
    const sitesTab = await screen.findByText(/Sites/i);
    fireEvent.click(sitesTab);
    expect(await screen.findByRole('heading', { name: /Sites/i }));
  });

  test('renders Sites page and the data grid ', async () => {
    (useApiCall as jest.Mock).mockImplementation(() => ({
      currentState: 'Finished',
      response: [launchGroupSitesInfoQueryBuilder()],
    }));

    await act(async () => {
      const { getByRole } = render(
        <LaunchSitesGrid load={false} err={false} />
      );
      expect(
        getByRole('columnheader', { name: /Site ID/i })
      ).toBeInTheDocument();
      expect(
        getByRole('columnheader', { name: /Site Name/i })
      ).toBeInTheDocument();
      expect(
        getByRole('columnheader', { name: /Site Type/i })
      ).toBeInTheDocument();
      expect(
        getByRole('columnheader', { name: /Site Status/i })
      ).toBeInTheDocument();
    });
  });

  // Data-driven scenarios for Sites Grid [https://confluence.healthpartners.com/confluence/display/AS/Sites+DIFF+COMPARE+Scenarios]
  test.each`
    scenarioNumber | scenarioObject
    ${1}           | ${scenario01}
    ${2}           | ${scenario02}
    ${3}           | ${scenario03}
    ${4}           | ${scenario04}
    ${5}           | ${scenario05}
    ${6}           | ${scenario06}
    ${7}           | ${scenario07}
    ${8}           | ${scenario08}
    ${9}           | ${scenario09}
    ${10}          | ${scenario10}
    ${11}          | ${scenario11}
    ${12}          | ${scenario12}
    ${13}          | ${scenario13}
    ${14}          | ${scenario14}
    ${15}          | ${scenario15}
    ${18}          | ${scenario18}
    ${19}          | ${scenario19}
    ${31}          | ${scenario31}
    ${37}          | ${scenario37}
    ${47}          | ${scenario47}
    ${48}          | ${scenario48}
    ${49}          | ${scenario49}
    ${50}          | ${scenario50}
    ${52}          | ${scenario52}
    ${53}          | ${scenario53}
    ${54}          | ${scenario54}
    ${55}          | ${scenario55}
    ${61}          | ${scenario61}
    ${70}          | ${scenario70}
    ${79}          | ${scenario79}
  `(
    `Scenario $scenarioNumber test`,
    async ({
      scenarioObject: {
        apiResponse,
        alertBoxSiteIds,
        allSiteIds,
        highlightedRowsSiteIds,
        highlightedCells,
      },
    }) => {
      (useApiCall as jest.Mock).mockImplementation(() => ({
        currentState: 'Finished',
        response: apiResponse,
      }));

      await act(async () => {
        render(<LaunchSitesGrid load={false} err={false} />);

        expect(getSiteIdsInOrangeAlert()).toStrictEqual(alertBoxSiteIds);
        expect(getAllDisplayedRows().map(rowNodeToSiteId)).toStrictEqual(
          allSiteIds
        );
        expect(getHighlightedRows().map(rowNodeToSiteId)).toStrictEqual(
          highlightedRowsSiteIds
        );

        expect(getHighlightedCells('site')).toStrictEqual(highlightedCells);
      });
    }
  );
});
