/* eslint-disable no-param-reassign */
import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { Route } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import render from 'utils/testing/render';

import createMSWRestServer from 'utils/testing/createMSWRestServer';

import { client } from 'app/Authenticated/components/AuthenticatedAppProvider';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {
  launchPlanTypeInfoItemBuilder,
  launchRateInfoQueryBuilder,
} from 'utils/testing/dataBuilders';
import LaunchPlansAndRatesGrid, {
  sortByGdfName,
  deriveDisplayedPackageCode,
} from '../screens/PlansAndRates/components/LaunchPlansAndRatesGrid';
import Launch from '../index';
import useApiCall from '../shared/useApiCall';
import { FetchStates } from '../shared/constants';

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
  planSummary: {
    planSummary: [],
  },
});

const initialStateWithPlanAndRatesSummary = {
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
        planId: 6250197,
        gdfName: '2021 CST MN FI HP Standard ',
        planType: {
          code: '2021 CST MN FI HP Standard ',
          name: '2021 CST MN FI HP Standard ',
        },
        previousPackageCode: 'ZD103',
        packageCode: 'ZD298',
        productCode: null,
        deliveryNetwork: {
          code: '2021 CST MN FI HP Standard ',
          name: '2021 CST MN FI HP Standard ',
        },
        marketSegment: {
          code: '2021 CST MN FI HP Standard ',
          name: '2021 CST MN FI HP Standard ',
        },
        fundingType: {
          code: '2021 CST MN FI HP Standard ',
          name: '2021 CST MN FI HP Standard ',
        },
        pdmaYearType: {
          code: '2021 CST MN FI HP Standard ',
          name: '2021 CST MN FI HP Standard ',
        },
        creditableRxCoverage: 'Yes',
        cignaAffiliation: {
          code: '2021 CST MN FI HP Standard ',
          name: '2021 CST MN FI HP Standard ',
        },
        otherCurrentPackageCodes: [],
        beginDate: '2021-01-01',
        endDate: null,
        nextRenewalDate: '2022-01-01',
        autoAssignPackage: null,
        autoAssignPackageCode: null,
        hasRate: true,
        compareStatus: 'EQUAL',
        previousAutoDentalDisplay: '(DW055)',
      },
      {
        planId: 6250198,
        gdfName: '2021 CST MN FI HP Standard ',
        planType: {
          code: '2021 CST MN FI HP Standard ',
          name: '2021 CST MN FI HP Standard ',
        },
        previousPackageCode: 'ZD103',
        packageCode: 'ZD298',
        productCode: null,
        deliveryNetwork: {
          code: '2021 CST MN FI HP Standard ',
          name: '2021 CST MN FI HP Standard ',
        },
        marketSegment: {
          code: '2021 CST MN FI HP Standard ',
          name: '2021 CST MN FI HP Standard ',
        },
        fundingType: {
          code: '2021 CST MN FI HP Standard ',
          name: '2021 CST MN FI HP Standard ',
        },
        pdmaYearType: {
          code: '2021 CST MN FI HP Standard ',
          name: '2021 CST MN FI HP Standard ',
        },
        creditableRxCoverage: 'Yes',
        cignaAffiliation: {
          code: '2021 CST MN FI HP Standard ',
          name: '2021 CST MN FI HP Standard ',
        },
        otherCurrentPackageCodes: [],
        beginDate: '2021-01-01',
        endDate: null,
        nextRenewalDate: '2022-01-01',
        autoAssignPackage: null,
        autoAssignPackageCode: null,
        hasRate: true,
        compareStatus: 'EQUAL',
      },
      {
        planId: 6250199,
        gdfName: '2021 CST MN FI HP Standard ',
        planType: {
          code: '2021 CST MN FI HP Standard ',
          name: '2021 CST MN FI HP Standard ',
        },
        previousPackageCode: 'ZD103',
        packageCode: 'ZD298',
        productCode: null,
        deliveryNetwork: {
          code: '2021 CST MN FI HP Standard ',
          name: '2021 CST MN FI HP Standard ',
        },
        marketSegment: {
          code: '2021 CST MN FI HP Standard ',
          name: '2021 CST MN FI HP Standard ',
        },
        fundingType: {
          code: '2021 CST MN FI HP Standard ',
          name: '2021 CST MN FI HP Standard ',
        },
        pdmaYearType: {
          code: '2021 CST MN FI HP Standard ',
          name: '2021 CST MN FI HP Standard ',
        },
        creditableRxCoverage: 'Yes',
        cignaAffiliation: {
          code: '2021 CST MN FI HP Standard ',
          name: '2021 CST MN FI HP Standard ',
        },
        otherCurrentPackageCodes: [],
        beginDate: '2021-01-01',
        endDate: null,
        nextRenewalDate: '2022-01-01',
        autoAssignPackage: null,
        autoAssignPackageCode: '',
        hasRate: true,
        compareStatus: 'EQUAL',
      },
    ],
  },
  ratesSummary: {
    ratesSummary: [
      {
        planId: 6250197,
        gdfName: '2021 CST MN FI HP Standard ',
        planType: {
          code: 'M',
          name: 'Medical',
        },
        previousPackageCode: 'ZD103',
        packageCode: 'ZD298',
        productCode: null,
        deliveryNetwork: {
          code: '2021 CST MN FI HP Standard ',
          name: '2021 CST MN FI HP Standard ',
        },
        marketSegment: {
          code: '2021 CST MN FI HP Standard ',
          name: '2021 CST MN FI HP Standard ',
        },
        fundingType: {
          code: '2021 CST MN FI HP Standard ',
          name: '2021 CST MN FI HP Standard ',
        },
        pdmaYearType: {
          code: '2021 CST MN FI HP Standard ',
          name: '2021 CST MN FI HP Standard ',
        },
        creditableRxCoverage: 'Yes',
        cignaAffiliation: {
          code: '2021 CST MN FI HP Standard ',
          name: '2021 CST MN FI HP Standard ',
        },
        otherCurrentPackageCodes: [],
        beginDate: '2021-01-01',
        endDate: null,
        nextRenewalDate: '2022-01-01',
        autoAssignPackage: null,
        autoAssignPackageCode: null,
        hasRate: true,
        compareStatus: 'NOT_EQUAL',
        previousAutoDentalDisplay: '(DW055)',
      },
    ],
  },
};

const storeWithPlanAndRateSummary = mockStore(
  initialStateWithPlanAndRatesSummary
);

const onlyInGsuPlanWarningRegex = /.*Plan Record\(s\) found in GSU and not found in GDF Viewer.*/;

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

describe('Plans / Rates grid page tests', () => {
  test('navigate to Plans page from left nav ', async () => {
    (useApiCall as jest.Mock).mockImplementation(() => ({
      currentState: 'Finished',
      response: [launchPlanTypeInfoItemBuilder()],
    }));

    render(
      <Route
        path="group/:groupId/launches/:launchId/*"
        element={
          <Provider store={storeWithPlanAndRateSummary}>
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
    // Plans Page is found
    const plansTab = await screen.findByText(/Plans/i);
    fireEvent.click(plansTab);
    expect(await screen.queryByText('Plans (MAC Plan Summary'));
  });

  test('navigate to sites page from left nav ', async () => {
    (useApiCall as jest.Mock).mockImplementation(() => ({
      currentState: 'Finished',
      response: [launchRateInfoQueryBuilder()],
    }));

    render(
      <Route
        path="group/:groupId/launches/:launchId/*"
        element={
          <Provider store={storeWithPlanAndRateSummary}>
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
    const sitesTab = await screen.findByText(/Rates/i);
    fireEvent.click(sitesTab);
    expect(await screen.queryByText('Rates'));
  });

  test('renders Rates page and the data grid', async () => {
    (useApiCall as jest.Mock).mockImplementation(({ url }) => {
      // mock ratesTabFlagCallResponse
      if (url.includes('GDFViewer.RatesTab')) {
        return {
          currentState: FetchStates.FINISHED,
          response: true,
        };
      }

      // mock diff call responses
      return {
        currentState: FetchStates.FINISHED,
        response: 'NOT_EQUAL',
      };
    });
    await act(async () => {
      render(
        <Provider store={store}>
          <LaunchPlansAndRatesGrid
            planRateSummaryInfo={
              initialStateWithPlanAndRatesSummary.planSummary.planSummary
            }
            type="Rates"
          />
        </Provider>
      );
    });
    expect(await screen.findByText(/Actions/i)).toBeInTheDocument();

    expect(
      screen.getByRole('columnheader', { name: /Actions/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /GDF Name/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /Plan Type/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /Prior Pkg/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /Prd Code/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /DN ID/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /Mkt Seg/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /Fund Type/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /Ben Year Admin/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /Cred Cov/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /Cigna/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /Begin Date/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /Next Renew Date/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /End Date/i })
    ).toBeInTheDocument();
    expect(screen.queryByText(onlyInGsuPlanWarningRegex)).toBeNull();

    const autoPkg = await screen.findAllByText('Auto Pkg');
    expect(autoPkg).toHaveLength(1);
    const prevAutoPkg = await screen.findAllByText('Prior Auto Pkg');
    expect(prevAutoPkg).toHaveLength(1);
  });

  test('renders Plans page and the data grid with warning', async () => {
    (useApiCall as jest.Mock).mockImplementation(({ url }) => {
      // mock ratesTabFlagCallResponse
      if (url.includes('GDFViewer.RatesTab')) {
        return {
          currentState: FetchStates.FINISHED,
          response: true,
        };
      }

      // mock diff call responses
      return {
        currentState: FetchStates.FINISHED,
        response: 'NOT_EQUAL',
      };
    });
    await act(async () => {
      const plansStoreState = { ...initialStateWithPlanAndRatesSummary };
      plansStoreState.planSummary.planSummary[0].compareStatus = 'ONLY_IN_GSU';
      plansStoreState.planSummary.planSummary[0].packageCode =
        'NOT_AUTO_ASSIGNED';
      plansStoreState.planSummary.planSummary[1].compareStatus = 'ONLY_IN_GSU';
      plansStoreState.planSummary.planSummary[1].packageCode = 'AUTO_ASSIGNED';
      plansStoreState.planSummary.planSummary[1].autoAssignPackageCode =
        'AUTO_ASSIGNED';
      render(
        <Provider store={mockStore(plansStoreState)}>
          <LaunchPlansAndRatesGrid
            planRateSummaryInfo={
              initialStateWithPlanAndRatesSummary.planSummary.planSummary
            }
            type="Plans"
          />
        </Provider>
      );
    });
    expect(await screen.findByText(/Actions/i)).toBeInTheDocument();

    expect(
      screen.getByRole('columnheader', { name: /Actions/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /GDF Name/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /Plan Type/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /Prior Pkg/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /Prd Code/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /DN ID/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /Mkt Seg/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /Fund Type/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /Ben Year Admin/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /Cred Cov/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /Cigna/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /Begin Date/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /Next Renew Date/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /End Date/i })
    ).toBeInTheDocument();
    expect(screen.getByText(onlyInGsuPlanWarningRegex)).toBeInTheDocument();
    expect(screen.getByText(/.*Pkg: NOT_AUTO_ASSIGNED/)).toBeInTheDocument();
    expect(screen.queryByText(/.*Pkg: AUTO_ASSIGNED/)).toBeNull();

    const autoPkg = await screen.findAllByText('Auto Pkg');
    expect(autoPkg).toHaveLength(1);
    const prevAutoPkg = await screen.findAllByText('Prior Auto Pkg');
    expect(prevAutoPkg).toHaveLength(1);
  });

  test('Rates tab is not present when feature flag comes back false', async () => {
    (useApiCall as jest.Mock).mockImplementation(({ url }) => {
      // mock ratesTabFlagCallResponse
      if (url.includes('GDFViewer.RatesTab')) {
        return {
          currentState: FetchStates.FINISHED,
          response: false,
        };
      }

      // mock diff call responses
      return {
        currentState: FetchStates.FINISHED,
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

    // Rates tab is not shown
    expect(screen.queryByText(/Rates/i)).not.toBeInTheDocument();
  });

  test('Plans tab is not present when plan summary calls length is 0', async () => {
    (useApiCall as jest.Mock).mockImplementation(({ url }) => {
      // mock ratesTabFlagCallResponse
      if (url.includes('GDFViewer.RatesTab')) {
        return {
          currentState: FetchStates.FINISHED,
          response: true,
        };
      }

      // mock plansSummaryCallResponse
      if (url.includes('/plans/summary')) {
        return {
          currentState: FetchStates.FINISHED,
          response: 'N/A',
        };
      }

      // mock non-plan diff call responses
      return {
        currentState: FetchStates.FINISHED,
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

    // Plans tab is not shown
    expect(screen.queryByText(/Plans/i)).toBeNull();
  });

  test('Plans tab is present when plan summary calls length is not equal to 0', async () => {
    (useApiCall as jest.Mock).mockImplementation(({ url }) => {
      // mock ratesTabFlagCallResponse
      if (url.includes('GDFViewer.RatesTab')) {
        return {
          currentState: FetchStates.FINISHED,
          response: true,
        };
      }

      // mock plansSummaryCallResponse
      if (url.includes('/plans/summary')) {
        return {
          currentState: FetchStates.FINISHED,
          response: 'N/A',
        };
      }

      // mock non-plan diff call responses
      return {
        currentState: FetchStates.FINISHED,
        response: 'NOT_EQUAL',
      };
    });

    await act(async () => {
      render(
        <Route
          path="group/:groupId/launches/:launchId/*"
          element={
            <Provider store={storeWithPlanAndRateSummary}>
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

    // Plans tab is not shown
    expect(screen.queryByText(/Plans/i)).toBeInTheDocument();
  });

  test('sortByGdfName', () => {
    const unsortedPlans = [
      { gdfName: 'b' },
      { gdfName: 'a' },
      { gdfName: 'c' },
    ];
    const sortedPlans = [{ gdfName: 'a' }, { gdfName: 'b' }, { gdfName: 'c' }];
    unsortedPlans.sort(sortByGdfName);
    expect(unsortedPlans).toEqual(sortedPlans);
  });

  test('deriveDisplayedPackageCode - non HWB case', () => {
    expect(
      deriveDisplayedPackageCode('testPackageCode', 'testPlanName', [
        'ABCD',
        'JWSI',
      ])
    ).toBe('testPackageCode');
  });

  test('deriveDisplayedPackageCode - HWB case, Journeywell code found', () => {
    expect(
      deriveDisplayedPackageCode(
        'testPackageCode',
        'Health & Well-Being Solutions',
        ['ABCD', 'JWSI']
      )
    ).toBe('JWSI');
  });

  test('deriveDisplayedPackageCode - HWB case, Journeywell code not found', () => {
    expect(
      deriveDisplayedPackageCode(
        'testPackageCode',
        'Health & Well-Being Solutions',
        ['ABCD', 'DEFG']
      )
    ).toBe('');
  });

  test('renders Rates page and the data grid with Warning when compare status is NOT_EQUAL', async () => {
    (useApiCall as jest.Mock).mockImplementation(({ url }) => {
      // mock ratesTabFlagCallResponse
      if (url.includes('GDFViewer.RatesTab')) {
        return {
          currentState: FetchStates.FINISHED,
          response: true,
        };
      }

      // mock diff call responses
      return {
        currentState: FetchStates.FINISHED,
        response: 'NOT_EQUAL',
      };
    });
    await act(async () => {
      render(
        <Provider store={store}>
          <LaunchPlansAndRatesGrid
            planRateSummaryInfo={
              initialStateWithPlanAndRatesSummary.ratesSummary.ratesSummary
            }
            type="Rates"
          />
        </Provider>
      );
    });

    expect(
      screen.getByRole('columnheader', { name: /Actions/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /GDF Name/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /Plan Type/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /Prior Pkg/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /Prd Code/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /DN ID/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /Mkt Seg/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /Fund Type/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /Ben Year Admin/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /Cred Cov/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /Cigna/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /Begin Date/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /Next Renew Date/i })
    ).toBeInTheDocument();

    expect(screen.getByTitle('Needs Review'));
    expect(screen.queryByText(onlyInGsuPlanWarningRegex)).toBeNull();

    const autoPkg = await screen.findAllByText('Auto Pkg');
    expect(autoPkg).toHaveLength(3);
    const prevAutoPkg = await screen.findAllByText('Prior Auto Pkg');
    expect(prevAutoPkg).toHaveLength(3);
    const warningIcon = screen.getByTestId('WarningIcon');
    expect(warningIcon).toBeInTheDocument();
  });

  test('renders Rates page and the data grid with out warning when compare status is EQUAL', async () => {
    (useApiCall as jest.Mock).mockImplementation(({ url }) => {
      // mock ratesTabFlagCallResponse
      if (url.includes('GDFViewer.RatesTab')) {
        return {
          currentState: FetchStates.FINISHED,
          response: true,
        };
      }

      // mock diff call responses
      return {
        currentState: FetchStates.FINISHED,
        response: 'NOT_EQUAL',
      };
    });
    initialStateWithPlanAndRatesSummary.ratesSummary.ratesSummary[0].compareStatus =
      'EQUAL';

    await act(async () => {
      const { container } = render(
        <Provider store={store}>
          <LaunchPlansAndRatesGrid
            planRateSummaryInfo={
              initialStateWithPlanAndRatesSummary.ratesSummary.ratesSummary
            }
            type="Rates"
          />
        </Provider>
      );
      const warningIcon = container.querySelector('#icon-warning-Rates');
      expect(warningIcon).not.toBeInTheDocument();
    });

    expect(
      screen.getByRole('columnheader', { name: /Actions/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /GDF Name/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /Plan Type/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /Prior Pkg/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /Prd Code/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /DN ID/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /Mkt Seg/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /Fund Type/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /Ben Year Admin/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /Cred Cov/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /Cigna/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /Begin Date/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /Next Renew Date/i })
    ).toBeInTheDocument();

    expect(screen.queryByTitle('Needs Review')).toBeNull();
    expect(screen.queryByText(onlyInGsuPlanWarningRegex)).toBeNull();

    const autoPkg = await screen.findAllByText('Auto Pkg');
    expect(autoPkg).toHaveLength(3);
    const prevAutoPkg = await screen.findAllByText('Prior Auto Pkg');
    expect(prevAutoPkg).toHaveLength(3);
  });

  test('renders Rates page and the data grid with out warning when compare status is NOT_COMPARABLE', async () => {
    (useApiCall as jest.Mock).mockImplementation(({ url }) => {
      // mock ratesTabFlagCallResponse
      if (url.includes('GDFViewer.RatesTab')) {
        return {
          currentState: FetchStates.FINISHED,
          response: true,
        };
      }

      // mock diff call responses
      return {
        currentState: FetchStates.FINISHED,
        response: 'NOT_EQUAL',
      };
    });
    initialStateWithPlanAndRatesSummary.ratesSummary.ratesSummary[0].compareStatus =
      'NOT_COMPARABLE';

    await act(async () => {
      render(
        <Provider store={store}>
          <LaunchPlansAndRatesGrid
            planRateSummaryInfo={
              initialStateWithPlanAndRatesSummary.ratesSummary.ratesSummary
            }
            type="Rates"
          />
        </Provider>
      );
    });
    const reportIcon = screen.getByTestId('ReportIcon');
    expect(reportIcon).toBeInTheDocument();
  });

  test('renders Rates page and the data grid with out warning when compare status is ONLY_IN_GSU', async () => {
    (useApiCall as jest.Mock).mockImplementation(({ url }) => {
      // mock ratesTabFlagCallResponse
      if (url.includes('GDFViewer.RatesTab')) {
        return {
          currentState: FetchStates.FINISHED,
          response: true,
        };
      }

      // mock diff call responses
      return {
        currentState: FetchStates.FINISHED,
        response: 'NOT_EQUAL',
      };
    });
    initialStateWithPlanAndRatesSummary.ratesSummary.ratesSummary[0].compareStatus =
      'ONLY_IN_GSU';

    await act(async () => {
      render(
        <Provider store={store}>
          <LaunchPlansAndRatesGrid
            planRateSummaryInfo={
              initialStateWithPlanAndRatesSummary.ratesSummary.ratesSummary
            }
            type="Rates"
          />
        </Provider>
      );
    });
    const warningIcon = screen.getByTestId('WarningIcon');
    expect(warningIcon).toBeInTheDocument();
  });
});
