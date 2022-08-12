/* eslint-disable no-param-reassign */
import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import render from 'utils/testing/render';
import createMSWRestServer from 'utils/testing/createMSWRestServer';
import { client } from 'app/Authenticated/components/AuthenticatedAppProvider';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { PlansInfo } from '../screens/PlansInfo/index';
import {
  LaunchTitleSetContext,
  LaunchTitleValueContext,
} from '../components/LaunchLayoutProvider/context/LaunchTitleContextProvider';
import useApiCall from '../shared/useApiCall';
import { FetchStates } from '../shared/constants';

jest.mock(
  'app/Authenticated/screens/Group/screens/Launch/shared/useLaunchFormattedParams',
  () => () => ({
    groupId: 'mockGroupId',
    launchId: 'mockLaunchId',
    planId: 'mockPlanId',
    packageCode: 'mockPackageCode',
  })
);

jest.mock('../shared/useApiCall');

const mswServer = createMSWRestServer();
const mockSetState = jest.fn();
// Enable API mocking before tests.
beforeAll(() => mswServer.listen());

// Reset Apollo cache
beforeEach(() => client.resetStore());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => mswServer.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => mswServer.close());

const mockStore = configureStore();
const store = mockStore({
  groupNumber: {
    groupNumber: 1234,
  },
  eligibilityRules: {
    eligibilityRules: {},
    selectedOneEligibilityRule: {
      ageOffSplit: {
        gdfValue: false,
        gsuValue: false,
        compareStatus: 'EQUAL',
      },
      dependentCoverageAllowedAtAge: {
        code: {
          gdfValue: '26',
          gsuValue: '26',
          compareStatus: 'EQUAL',
        },
        name: {
          gdfValue: '26',
          gsuValue: '26',
          compareStatus: 'EQUAL',
        },
        compareStatus: 'EQUAL',
      },
      rehireWaitingPeriod: {
        code: {
          gdfValue: '1STA30D',
          gsuValue: '1STA30D',
          compareStatus: 'EQUAL',
        },
        name: {
          gdfValue: 'First of month following 30 days',
          gsuValue: 'First of month following 30 days',
          compareStatus: 'EQUAL',
        },
        compareStatus: 'EQUAL',
      },
      dependentWhenToCancel: {
        code: {
          gdfValue: 'L',
          gsuValue: 'L',
          compareStatus: 'EQUAL',
        },
        name: {
          gdfValue: 'Last day of DOB month',
          gsuValue: 'Last day of DOB month',
          compareStatus: 'EQUAL',
        },
        compareStatus: 'EQUAL',
      },
      id: {
        gdfValue: 7525391,
        gsuValue: null,
        compareStatus: 'N/A',
      },
      newHireWaitingPeriod: {
        code: {
          gdfValue: '1STA30D',
          gsuValue: '1STA30D',
          compareStatus: 'EQUAL',
        },
        name: {
          gdfValue: 'First of month following 30 days',
          gsuValue: 'First of month following 30 days',
          compareStatus: 'EQUAL',
        },
        compareStatus: 'EQUAL',
      },
      studentCoverageAllowedAtAge: {
        code: {
          gdfValue: '',
          gsuValue: '',
          compareStatus: 'EQUAL',
        },
        name: {
          gdfValue: '',
          gsuValue: '',
          compareStatus: 'EQUAL',
        },
        compareStatus: 'EQUAL',
      },
      name: {
        gdfValue: 'Medical',
        gsuValue: 'Medical',
        compareStatus: 'EQUAL',
      },
      maxDependentAge: {
        gdfValue: '26',
        gsuValue: '26',
        compareStatus: 'EQUAL',
      },
      grandchildrenAllowed: {
        gdfValue: true,
        gsuValue: true,
        compareStatus: 'EQUAL',
      },
      studentWhenToCancel: {
        code: {
          gdfValue: '',
          gsuValue: '',
          compareStatus: 'EQUAL',
        },
        name: {
          gdfValue: '',
          gsuValue: '',
          compareStatus: 'EQUAL',
        },
        compareStatus: 'EQUAL',
      },
      maxStudentAge: {
        gdfValue: '',
        gsuValue: '',
        compareStatus: 'EQUAL',
      },
      planType: {
        code: {
          gdfValue: 'M',
          gsuValue: 'M',
          compareStatus: 'N/A',
        },
        name: {
          gdfValue: 'Medical',
          gsuValue: 'Medical',
          compareStatus: 'N/A',
        },
        compareStatus: 'N/A',
      },
      pdmaDomesticPartnerType: {
        code: {
          gdfValue: 'NO',
          gsuValue: 'NO',
          compareStatus: 'EQUAL',
        },
        name: {
          gdfValue: 'No',
          gsuValue: 'No',
          compareStatus: 'EQUAL',
        },
        compareStatus: 'EQUAL',
      },
      compareStatus: 'EQUAL',
    },
    errors: '',
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

const mockPlanDetailsDiffResponse = {
  name: {
    gdfValue: '2022 CST MN FI HPIC NationalONE Empower HRA',
    gsuValue: '2022 CST MN FI HPIC NationalONE Empower HRA',
    compareStatus: 'EQUAL',
  },
  beginDate: {
    gdfValue: '2022-01-01',
    gsuValue: '2022-01-01',
    compareStatus: 'EQUAL',
  },
  endDate: {
    gdfValue: null,
    gsuValue: null,
    compareStatus: 'EQUAL',
  },
  planType: {
    code: {
      gdfValue: 'M',
      gsuValue: 'M',
      compareStatus: 'N/A',
    },
    name: {
      gdfValue: 'Medical',
      gsuValue: 'Medical',
      compareStatus: 'N/A',
    },
    compareStatus: 'N/A',
  },
  compareStatus: 'EQUAL',
};

const mockPackageRulesDiffResponse = {
  marketSegment: {
    code: {
      gdfValue: '41',
      gsuValue: '41',
      compareStatus: 'EQUAL',
    },
    name: {
      gdfValue: '41 Large Brokered',
      gsuValue: '41 Large Brokered',
      compareStatus: 'EQUAL',
    },
    compareStatus: 'EQUAL',
  },
  cignaAffiliation: {
    code: {
      gdfValue: 'NAP',
      gsuValue: 'NAP',
      compareStatus: 'EQUAL',
    },
    name: {
      gdfValue: 'Non-Affiliation Offering',
      gsuValue: 'Non-Affiliation Offering',
      compareStatus: 'EQUAL',
    },
    compareStatus: 'EQUAL',
  },
  fundingSubType: {
    code: {
      gdfValue: '10',
      gsuValue: '10',
      compareStatus: 'EQUAL',
    },
    name: {
      gdfValue: 'Fully insured',
      gsuValue: 'Fully insured',
      compareStatus: 'EQUAL',
    },
    compareStatus: 'EQUAL',
  },
  grandfatheredPlan: {
    gdfValue: false,
    gsuValue: false,
    compareStatus: 'EQUAL',
  },
  administratorType: {
    code: {
      gdfValue: 'HPPTP',
      gsuValue: 'HPPTP',
      compareStatus: 'EQUAL',
    },
    name: {
      gdfValue: 'HP pay to provider',
      gsuValue: 'HP pay to provider',
      compareStatus: 'EQUAL',
    },
    compareStatus: 'EQUAL',
  },
  creditableRxCoverage: {
    gdfValue: 'Yes',
    gsuValue: 'Yes',
    compareStatus: 'EQUAL',
  },
  pdmaYearType: {
    code: {
      gdfValue: 'CAL',
      gsuValue: 'CAL',
      compareStatus: 'EQUAL',
    },
    name: {
      gdfValue: 'Calendar',
      gsuValue: 'Calendar',
      compareStatus: 'EQUAL',
    },
    compareStatus: 'EQUAL',
  },
  autoAssignPackage: {
    gdfValue: '',
    gsuValue: '',
    compareStatus: 'EQUAL',
  },
  autoAssignPackageDeliveryNetwork: {
    code: {
      gdfValue: null,
      gsuValue: '',
      compareStatus: 'N/A',
    },
    name: {
      gdfValue: null,
      gsuValue: '',
      compareStatus: 'N/A',
    },
    compareStatus: 'N/A',
  },
  autoAssignType: {
    gdfValue: '',
    gsuValue: '',
    compareStatus: 'EQUAL',
  },
  compareStatus: 'EQUAL',
};

const mockEligibilityRulesDiffResponse = [
  {
    ageOffSplit: {
      gdfValue: false,
      gsuValue: false,
      compareStatus: 'EQUAL',
    },
    dependentCoverageAllowedAtAge: {
      code: {
        gdfValue: '26',
        gsuValue: '26',
        compareStatus: 'EQUAL',
      },
      name: {
        gdfValue: '26',
        gsuValue: '26',
        compareStatus: 'EQUAL',
      },
      compareStatus: 'EQUAL',
    },
    rehireWaitingPeriod: {
      code: {
        gdfValue: '1STA30D',
        gsuValue: '1STA30D',
        compareStatus: 'EQUAL',
      },
      name: {
        gdfValue: 'First of month following 30 days',
        gsuValue: 'First of month following 30 days',
        compareStatus: 'EQUAL',
      },
      compareStatus: 'EQUAL',
    },
    dependentWhenToCancel: {
      code: {
        gdfValue: 'L',
        gsuValue: 'L',
        compareStatus: 'EQUAL',
      },
      name: {
        gdfValue: 'Last day of DOB month',
        gsuValue: 'Last day of DOB month',
        compareStatus: 'EQUAL',
      },
      compareStatus: 'EQUAL',
    },
    id: {
      gdfValue: 7525391,
      gsuValue: null,
      compareStatus: 'N/A',
    },
    newHireWaitingPeriod: {
      code: {
        gdfValue: '1STA30D',
        gsuValue: '1STA30D',
        compareStatus: 'EQUAL',
      },
      name: {
        gdfValue: 'First of month following 30 days',
        gsuValue: 'First of month following 30 days',
        compareStatus: 'EQUAL',
      },
      compareStatus: 'EQUAL',
    },
    studentCoverageAllowedAtAge: {
      code: {
        gdfValue: '',
        gsuValue: '',
        compareStatus: 'EQUAL',
      },
      name: {
        gdfValue: '',
        gsuValue: '',
        compareStatus: 'EQUAL',
      },
      compareStatus: 'EQUAL',
    },
    name: {
      gdfValue: 'Medical',
      gsuValue: 'Medical',
      compareStatus: 'EQUAL',
    },
    maxDependentAge: {
      gdfValue: '26',
      gsuValue: '26',
      compareStatus: 'EQUAL',
    },
    grandchildrenAllowed: {
      gdfValue: true,
      gsuValue: true,
      compareStatus: 'EQUAL',
    },
    studentWhenToCancel: {
      code: {
        gdfValue: '',
        gsuValue: '',
        compareStatus: 'EQUAL',
      },
      name: {
        gdfValue: '',
        gsuValue: '',
        compareStatus: 'EQUAL',
      },
      compareStatus: 'EQUAL',
    },
    maxStudentAge: {
      gdfValue: '',
      gsuValue: '',
      compareStatus: 'EQUAL',
    },
    planType: {
      code: {
        gdfValue: 'M',
        gsuValue: 'M',
        compareStatus: 'N/A',
      },
      name: {
        gdfValue: 'Medical',
        gsuValue: 'Medical',
        compareStatus: 'N/A',
      },
      compareStatus: 'N/A',
    },
    pdmaDomesticPartnerType: {
      code: {
        gdfValue: 'NO',
        gsuValue: 'NO',
        compareStatus: 'EQUAL',
      },
      name: {
        gdfValue: 'No',
        gsuValue: 'No',
        compareStatus: 'EQUAL',
      },
      compareStatus: 'EQUAL',
    },
    compareStatus: 'EQUAL',
  },
];

const mockEligibilityReferentialDataDiffResponse = [
  {
    id: 7525391,
    comments: [],
    effectiveFromDate: '2015-01-01',
    fundingType: {
      code: '10',
      name: 'Fully insured',
    },
    issuingState: {
      code: 'MN',
      name: 'Minnesota',
    },
    activeEligibleEmployeeDefinitionCode: {
      code: '30',
      name: '30 Hours',
    },
    activeEmployeeNote: null,
    employeesExcludedDefinition: {
      code: 'P',
      name: 'Part Time',
    },
    employeesExcludedNote: null,
    retroactiveMemberTerminationPeriod: {
      code: 'S',
      name: 'Standard 90 days',
    },
    nonStandardTerminationPeriodNote: null,
    doesHpVerifyStudentEligibility: {
      code: 'F',
      name: 'NA (Fed Reform)',
    },
    doesHpVerifyDisabledDependents: {
      code: 'Y',
      name: 'Yes',
    },
    doubleCoverageInSameGroupAllowed: false,
    lateEnrollmentApplies: {
      code: 'STD',
      name: 'Standard special enrollment applies',
    },
    retireeEligibility: false,
    retireeDefinitionNote: null,
    earlyRetireeEligibility: false,
    earlyRetireeDefinitionNote: null,
    rehireNote: null,
    planType: {
      code: 'M',
      name: 'Medical',
    },
    active: true,
  },
];

const mockCommentsResponse: Array<string> = [];

describe('Plans info page tests', () => {
  test('renders plans info page', async () => {
    (useApiCall as jest.Mock).mockImplementation(({ url }) => {
      // mock plan details diff response
      if (url.includes('/details')) {
        return {
          currentState: FetchStates.FINISHED,
          response: mockPlanDetailsDiffResponse,
        };
      }

      // mock package rules diff response
      if (url.includes('/packageRules')) {
        return {
          currentState: FetchStates.FINISHED,
          response: mockPackageRulesDiffResponse,
        };
      }

      // mock eligibility rules diff response
      if (url.includes('/eligibility/rules')) {
        return {
          currentState: FetchStates.FINISHED,
          response: mockEligibilityRulesDiffResponse,
        };
      }

      // mock eligibility rules diff response
      if (url.includes('/eligibility/referential')) {
        return {
          currentState: FetchStates.FINISHED,
          response: mockEligibilityReferentialDataDiffResponse,
        };
      }

      // mock comments response
      if (url.includes('/comments')) {
        return {
          currentState: FetchStates.FINISHED,
          response: mockCommentsResponse,
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
        <LaunchTitleValueContext.Provider value="test title">
          <LaunchTitleSetContext.Provider value={mockSetState}>
            <Provider store={store}>
              <PlansInfo />
            </Provider>
          </LaunchTitleSetContext.Provider>
        </LaunchTitleValueContext.Provider>
      );

      expect(await screen.findByText('Plan Details')).toBeInTheDocument();
      expect(await screen.findByText('GDF Name')).toBeInTheDocument();
      expect(
        await screen.findByText('2022 CST MN FI HPIC NationalONE Empower HRA')
      ).toBeInTheDocument();
      expect(await screen.findByText('Begin Date')).toBeInTheDocument();
      expect(await screen.findByText('01/01/2022')).toBeInTheDocument();
      expect(await screen.findByText('End Date')).toBeInTheDocument();
      expect(await screen.findByText('Plan Type')).toBeInTheDocument();
      expect(await screen.findByText('Medical')).toBeInTheDocument();

      expect(await screen.findByText('PCD Info')).toBeInTheDocument();
      expect(await screen.findByText('Package Rules')).toBeInTheDocument();
      expect(await screen.findByText('Eligibility Rules')).toBeInTheDocument();
    });
  });
});
