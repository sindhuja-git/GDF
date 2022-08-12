/* eslint-disable no-param-reassign */
import React from 'react';
import { screen } from '@testing-library/react';
import render from 'utils/testing/render';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { act } from 'react-dom/test-utils';
import useApiCall from '../shared/useApiCall';
import LaunchNavigationDrawer from '../components/LaunchLayout/components/LaunchNavigationDrawer';
import LaunchNavigationDrawerContextProvider from '../components/LaunchLayoutProvider/context/LaunchNavigationDrawerContextProvider';
import {
  scenarioNotEqual,
  scenarioOnlyInGdf,
  scenarioOnlyInGsu,
  scenarioNotComparable,
  scenarioEqual,
} from '../shared/launchNavigationRatesTestData';

jest.mock('../shared/useApiCall');

const mockImplementationFromResponseDefinition = (responseDefinition: any) => ({
  url,
}) => {
  if (url.includes('GDFViewer.RatesTab')) {
    return {
      currentState: 'Finished',
      response: responseDefinition.ratesTab,
    };
  }
  if (url.includes('GDFViewer.ContactsTab')) {
    return {
      currentState: 'Finished',
      response: responseDefinition.contactsTab,
    };
  }
  if (url.includes('sites')) {
    return {
      currentState: 'Finished',
      response: responseDefinition.sites,
    };
  }
  if (url.includes('rates')) {
    return {
      currentState: 'Finished',
      response: responseDefinition.rates,
    };
  }
  if (url.includes('demographics')) {
    return {
      currentState: 'Finished',
      response: responseDefinition.demographics,
    };
  }
  if (url.includes('contacts')) {
    return {
      currentState: 'Finished',
      response: responseDefinition.contacts,
    };
  }
  if (url.includes('gsp-associations')) {
    return {
      currentState: 'Finished',
      response: responseDefinition.gsp,
    };
  }
  if (url.includes('plans')) {
    return {
      currentState: 'Finished',
      response: responseDefinition.plans,
    };
  }
  return {
    currentState: 'Finished',
    response: true,
  };
};

const baseStore: any = {
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
  ratesSummary: {
    ratesSummary: [{}],
  },
};
const mockStore = configureStore();
const store = mockStore(baseStore);

// Data-driven scenarios for Contacts Grid [https://confluence.healthpartners.com/confluence/display/AS/Rates+DIFF+COMPARE+Scenarios]
test.each`
  scenarioNumber | scenarioObject
  ${5}           | ${scenarioNotEqual}
  ${2}           | ${scenarioOnlyInGdf}
  ${13}          | ${scenarioOnlyInGsu}
  ${10}          | ${scenarioNotComparable}
  ${4}           | ${scenarioEqual}
`(
  `Scenario $scenarioNumber test`,
  async ({ scenarioObject: { apiResponse, querySelector } }) => {
    (useApiCall as jest.Mock).mockImplementation(
      mockImplementationFromResponseDefinition(apiResponse)
    );
    const storeWithRates = { ...baseStore };
    storeWithRates.ratesSummary = {
      ratesSummary: [{}],
    };

    await act(async () => {
      const { container } = render(
        <Provider store={mockStore(storeWithRates)}>
          <LaunchNavigationDrawerContextProvider>
            <LaunchNavigationDrawer load={false} err={false} />
          </LaunchNavigationDrawerContextProvider>
        </Provider>
      );

      const ratesWarning = container.querySelector(`${querySelector}`);
      if (ratesWarning === null) {
        expect(ratesWarning).not.toBeInTheDocument();
      } else {
        expect(ratesWarning).toBeInTheDocument();
      }
    });
  }
);

describe('Navigation drawer tests', () => {
  test('Rates tab should be present when feature flag is on and ratesummaries are present', async () => {
    (useApiCall as jest.Mock).mockImplementation(
      mockImplementationFromResponseDefinition({
        ratesTab: true,
        contactsTab: true,
        rates: 'NOT_EQUAL',
        sites: 'NOT_EQUAL',
        demographics: 'NOT_EQUAL',
        contacts: 'NOT_EQUAL',
        gsp: 'NOT_EQUAL',
        plans: 'NOT_EQUAL',
      })
    );

    await act(async () => {
      render(
        <Provider store={store}>
          <LaunchNavigationDrawerContextProvider>
            <LaunchNavigationDrawer load={false} err={false} />
          </LaunchNavigationDrawerContextProvider>
        </Provider>
      );
      expect(screen.queryByText(/Rates/)).toBeInTheDocument();
    });
  });

  test('Rates tab should not be present when feature flag is on and ratesummaries are not present', async () => {
    const storeWithNoRates = { ...baseStore };
    storeWithNoRates.ratesSummary = {
      ratesSummary: [],
    };
    (useApiCall as jest.Mock).mockImplementation(
      mockImplementationFromResponseDefinition({
        ratesTab: true,
        contactsTab: true,
        rates: 'NOT_EQUAL',
        sites: 'NOT_EQUAL',
        demographics: 'NOT_EQUAL',
        contacts: 'NOT_EQUAL',
        gsp: 'NOT_EQUAL',
        plans: 'NOT_EQUAL',
      })
    );
    await act(async () => {
      render(
        <Provider store={mockStore(storeWithNoRates)}>
          <LaunchNavigationDrawerContextProvider>
            <LaunchNavigationDrawer load={false} err={false} />
          </LaunchNavigationDrawerContextProvider>
        </Provider>
      );
      expect(screen.queryByText(/Rates/)).not.toBeInTheDocument();
    });
  });

  test('Rates tab should not be present when feature flag is off', async () => {
    (useApiCall as jest.Mock).mockImplementation(
      mockImplementationFromResponseDefinition({
        ratesTab: false,
        contactsTab: true,
        rates: 'NOT_EQUAL',
        sites: 'NOT_EQUAL',
        demographics: 'NOT_EQUAL',
        contacts: 'NOT_EQUAL',
        gsp: 'NOT_EQUAL',
        plans: 'NOT_EQUAL',
      })
    );

    await act(async () => {
      render(
        <Provider store={store}>
          <LaunchNavigationDrawerContextProvider>
            <LaunchNavigationDrawer load={false} err={false} />
          </LaunchNavigationDrawerContextProvider>
        </Provider>
      );
      expect(screen.queryByText(/Rates/)).not.toBeInTheDocument();
    });
  });

  test('Rates tab should not be present when no rate summaries', async () => {
    (useApiCall as jest.Mock).mockImplementation(
      mockImplementationFromResponseDefinition({
        ratesTab: true,
        contactsTab: true,
        rates: 'NOT_EQUAL',
        sites: 'NOT_EQUAL',
        demographics: 'NOT_EQUAL',
        contacts: 'NOT_EQUAL',
        gsp: 'NOT_EQUAL',
        plans: 'NOT_EQUAL',
      })
    );
    const storeWithNoRates = { ...baseStore };
    storeWithNoRates.ratesSummary = {
      ratesSummary: [],
    };
    await act(async () => {
      render(
        <Provider store={mockStore(storeWithNoRates)}>
          <LaunchNavigationDrawerContextProvider>
            <LaunchNavigationDrawer load={false} err={false} />
          </LaunchNavigationDrawerContextProvider>
        </Provider>
      );
      expect(screen.queryByText(/Rates/)).not.toBeInTheDocument();
    });
  });

  // Contacts tab
  test('Contacts tab should be present when feature flag is on', async () => {
    (useApiCall as jest.Mock).mockImplementation(
      mockImplementationFromResponseDefinition({
        ratesTab: true,
        contactsTab: true,
        rates: 'NOT_COMPARABLE',
        sites: 'NOT_EQUAL',
        demographics: 'NOT_EQUAL',
        contacts: 'NOT_EQUAL',
        gsp: 'NOT_EQUAL',
        plans: 'NOT_EQUAL',
      })
    );
    await act(async () => {
      render(
        <Provider store={store}>
          <LaunchNavigationDrawerContextProvider>
            <LaunchNavigationDrawer load={false} err={false} />
          </LaunchNavigationDrawerContextProvider>
        </Provider>
      );
      expect(screen.queryByText(/Contacts/)).toBeInTheDocument();
    });
  });

  test('Warning icon should be present on contacts when the status is NOT_EQUAL', async () => {
    (useApiCall as jest.Mock).mockImplementation(
      mockImplementationFromResponseDefinition({
        ratesTab: true,
        contactsTab: true,
        rates: 'NOT_EQUAL',
        sites: 'NOT_EQUAL',
        demographics: 'NOT_EQUAL',
        contacts: 'NOT_EQUAL',
        gsp: 'NOT_EQUAL',
        plans: 'NOT_EQUAL',
      })
    );

    await act(async () => {
      const { container } = render(
        <Provider store={mockStore(baseStore)}>
          <LaunchNavigationDrawerContextProvider>
            <LaunchNavigationDrawer load={false} err={false} />
          </LaunchNavigationDrawerContextProvider>
        </Provider>
      );
      const contactWarning = container.querySelector('#icon-warning-Contacts');
      expect(contactWarning).toBeInTheDocument();
    });
  });

  test('No Warning icon should be present on contacts when the status is EQUAL', async () => {
    (useApiCall as jest.Mock).mockImplementation(
      mockImplementationFromResponseDefinition({
        ratesTab: true,
        contactsTab: true,
        rates: 'NOT_EQUAL',
        sites: 'NOT_EQUAL',
        demographics: 'NOT_EQUAL',
        contacts: 'EQUAL',
        gsp: 'NOT_EQUAL',
        plans: 'NOT_EQUAL',
      })
    );

    await act(async () => {
      const { container } = render(
        <Provider store={mockStore(baseStore)}>
          <LaunchNavigationDrawerContextProvider>
            <LaunchNavigationDrawer load={false} err={false} />
          </LaunchNavigationDrawerContextProvider>
        </Provider>
      );
      const contactsWarning = container.querySelector('#icon-warning-Contacts');
      expect(contactsWarning).not.toBeInTheDocument();
    });
  });
});
