import {
  build,
  fake,
  sequence,
  oneOf,
  bool,
} from '@jackfranklin/test-data-bot';
import { formatISO } from 'date-fns';
import { GetGroupLaunchesQuery } from 'app/Authenticated/screens/Group/screens/Launch/components/LaunchLayout/components/LaunchHeader/components/LaunchInfo';
import { LaunchedGroupHeaderInfoQuery } from 'app/Authenticated/screens/Group/screens/Launch/components/LaunchLayout/LaunchLayout';
import { LaunchGroupBasicItem } from 'app/Authenticated/screens/Group/screens/Launch/screens/Demographics/components/LaunchGroupBasicInfo';

import { LaunchGspAssociationItem } from 'app/Authenticated/screens/Group/screens/Launch/screens/Gsp/components/LaunchGspAssociationsTable';

import { LaunchGroupRepsItem } from 'app/Authenticated/screens/Group/screens/Launch/screens/Demographics/components/LaunchGroupRepsInfo';
import { LaunchEnrollmentItem } from 'app/Authenticated/screens/Group/screens/Launch/screens/Demographics/components/LaunchEnrollment';
import { LaunchPrintTechItem } from 'app/Authenticated/screens/Group/screens/Launch/screens/Demographics/components/LaunchPrintTechInfo';
import { LaunchSlsFulfillmentItem } from 'app/Authenticated/screens/Group/screens/Launch/screens/Demographics/components/LaunchSLSFulfillment';
import { LaunchAddressItem } from 'app/Authenticated/screens/Group/screens/Launch/screens/Demographics/components/LaunchAddressInfo';
import { LaunchMspItem } from 'app/Authenticated/screens/Group/screens/Launch/screens/Demographics/components/LaunchMspInfo';
import { LaunchReferentialEligibilityItem } from 'app/Authenticated/screens/Group/screens/Launch/screens/PlansInfo/components/LaunchReferentialEligibilityData';
import { GroupCommentsQuery } from 'app/Authenticated/screens/Group/screens/Launch/components/LaunchLayout/components/LaunchSideSheet/components/CommentsTabPanel/CommentsTabPanel';
import { LaunchGroupContactsInfoItem } from 'app/Authenticated/screens/Group/screens/Launch/screens/Contacts/components/LaunchContactsGrid';
import { LaunchGroupPlansInfoItem } from 'app/Authenticated/screens/Group/screens/Launch/screens/PlansAndRates/components/LaunchPlansAndRatesGrid';
import { LaunchGroupSitesInfoItem } from 'app/Authenticated/screens/Group/screens/Launch/screens/Sites/components/LaunchSitesGrid';
import { LaunchPlanPcdInfoItem } from 'app/Authenticated/screens/Group/screens/Launch/screens/PlansInfo/components/LaunchPcdInfo';
import { LaunchPlanDetailItem } from 'app/Authenticated/screens/Group/screens/Launch/screens/PlansInfo/components/LaunchPlanDetails';
import { LaunchPackageRulesItem } from 'app/Authenticated/screens/Group/screens/Launch/screens/PlansInfo/components/LaunchPackageRules';
import { LaunchPackageCodeItem } from 'app/Authenticated/screens/Group/screens/Launch/screens/shared/LaunchPackageCode';
import {
  LaunchEligibilityRulesItem,
  LaunchRuleInfoItem,
} from 'app/Authenticated/screens/Group/screens/Launch/screens/PlansInfo/components/LaunchEligibilityRules';
import { LaunchAutoAssignDentalDetails } from '../../app/Authenticated/screens/Group/screens/Launch/screens/PlansInfo/components/LaunchAutoAssignDentalDetails';
import {
  LaunchGroupGdfRateInfoItem,
  LaunchGroupRateInfoItem,
} from '../../app/Authenticated/screens/Group/screens/Launch/screens/RateInfo/components/LaunchRateInfo';
import { LaunchPlanTypeInfoItem } from '../../app/Authenticated/screens/Group/screens/Launch/screens/PlansInfo/PlansInfo';

type Overwrites<T> = {
  // This should be field, but test-data-bot doesn't expost the type.
  [key in keyof T]?: any;
};

export type GDFDictionary = {
  code: string;
  name: string;
};

export const gdfDictionaryBuilder = build<GDFDictionary>('GdfDictrionary', {
  fields: {
    code: fake((faker) => faker.commerce.product()),
    name: fake((faker) => faker.commerce.productName()),
  },
});

export const launchedHeaderInfoQueryBuilder = build<
  LaunchedGroupHeaderInfoQuery
>('LaunchHeaderInfo', {
  fields: {
    launchedGroup: {
      id: fake((faker) => faker.random.uuid()),
      launchId: sequence(),
      name: fake((faker) => faker.commerce.product()),
      number: sequence(),
    },
  },
});

export const launchGroupBasicInfoQueryBuilder = build<LaunchGroupBasicItem>(
  'LaunchGroupBasicInfo',
  {
    fields: {
      dbaName: {
        gdfValue: fake((faker) => faker.commerce.product()),
        gsuValue: fake((faker) => faker.commerce.product()),
        compareStatus: 'EQUAL',
      },

      einTin: {
        gdfValue: fake((faker) => faker.commerce.product()),
        gsuValue: fake((faker) => faker.commerce.product()),
        compareStatus: 'EQUAL',
      },
      inceptionDate: {
        gdfValue: fake((faker) => formatISO(faker.date.future())),
        gsuValue: fake((faker) => formatISO(faker.date.future())),
        compareStatus: 'N/A',
      },
      name: {
        gdfValue: fake((faker) => faker.commerce.product()),
        gsuValue: fake((faker) => faker.commerce.product()),
        compareStatus: 'EQUAL',
      },
      number: {
        gdfValue: sequence(),
        gsuValue: sequence(),
        compareStatus: 'EQUAL',
      },
      isSmallGroup: {
        gdfValue: false,
        gsuValue: false,
        compareStatus: 'EQUAL',
      },
    },
  }
);

export const launchGroupRepsInfoQueryBuilder = build<LaunchGroupRepsItem>(
  'LaunchGroupRepsInfo',
  {
    fields: {
      macRep: {
        firstName: {
          gdfValue: fake((faker) => faker.commerce.product()),
          gsuValue: fake((faker) => faker.commerce.product()),
          compareStatus: 'EQUAL',
        },
      },

      salesAccountMgr: {
        firstName: {
          gdfValue: fake((faker) => faker.commerce.product()),
          gsuValue: fake((faker) => faker.commerce.product()),
          compareStatus: 'EQUAL',
        },
        lastName: {
          gdfValue: fake((faker) => faker.commerce.product()),
          gsuValue: fake((faker) => faker.commerce.product()),
          compareStatus: 'EQUAL',
        },
        compareStatus: 'EQUAL',
      },
      customerServiceRep: {
        firstName: {
          gdfValue: fake((faker) => faker.commerce.product()),
          gsuValue: fake((faker) => faker.commerce.product()),
          compareStatus: 'EQUAL',
        },
        lastName: {
          gdfValue: fake((faker) => faker.commerce.product()),
          gsuValue: fake((faker) => faker.commerce.product()),
          compareStatus: 'EQUAL',
        },
        compareStatus: 'EQUAL',
      },
    },
  }
);
export const launchEnrollmentInfoQueryBuilder = build<LaunchEnrollmentItem>(
  'LaunchEnrollmentInfo',
  {
    fields: {
      electronicEnrollment: {
        gdfValue: true,
        gsuValue: true,
        compareStatus: 'EQUAL',
      },
      exchangeCode: {
        code: {
          gdfValue: fake((faker) => faker.commerce.product()),
          gsuValue: fake((faker) => faker.commerce.product()),
          compareStatus: 'EQUAL',
        },
        name: {
          gdfValue: fake((faker) => faker.commerce.product()),
          gsuValue: fake((faker) => faker.commerce.product()),
          compareStatus: 'EQUAL',
        },
      },
    },
  }
);

export const launchPrintTechInfoQueryBuilder = build<LaunchPrintTechItem>(
  'LaunchPrintTechInfo',
  {
    fields: {
      sbcDistribution: {
        gdfValue: fake((faker) => faker.commerce.product()),
        gsuValue: fake((faker) => faker.commerce.product()),
        compareStatus: 'EQUAL',
      },
      contractSpdFulfillment: {
        gdfValue: fake((faker) => faker.commerce.product()),
        gsuValue: fake((faker) => faker.commerce.product()),
        compareStatus: 'EQUAL',
      },
      isPublicEntity: {
        gdfValue: true,
        gsuValue: true,
        compareStatus: 'EQUAL',
      },
      erisa: {
        gdfValue: true,
        gsuValue: true,
        compareStatus: 'EQUAL',
      },
    },
  }
);

export const launchSLSFulfillmentInfoQueryBuilder = build<
  LaunchSlsFulfillmentItem
>('LaunchSLSFulfillment', {
  fields: {
    paperless: {
      gdfValue: false,
      gsuValue: false,
      compareStatus: 'EQUAL',
    },
  },
});

export const launchAddressInfoQueryBuilder = build<LaunchAddressItem>(
  'LaunchAddressInfo',
  {
    fields: {
      address: {
        street1: {
          gdfValue: fake((faker) => faker.commerce.product()),
          gsuValue: fake((faker) => faker.commerce.product()),
          compareStatus: 'EQUAL',
        },
        street2: {
          gdfValue: fake((faker) => faker.commerce.product()),
          gsuValue: fake((faker) => faker.commerce.product()),
          compareStatus: 'EQUAL',
        },
        city: {
          gdfValue: fake((faker) => faker.commerce.product()),
          gsuValue: fake((faker) => faker.commerce.product()),
          compareStatus: 'EQUAL',
        },
        state: {
          gdfValue: fake((faker) => faker.commerce.product()),
          gsuValue: fake((faker) => faker.commerce.product()),
          compareStatus: 'EQUAL',
        },
        county: {
          gdfValue: fake((faker) => faker.commerce.product()),
          gsuValue: fake((faker) => faker.commerce.product()),
          compareStatus: 'EQUAL',
        },
        zip: {
          gdfValue: fake((faker) => faker.commerce.product()),
          gsuValue: fake((faker) => faker.commerce.product()),
          compareStatus: 'EQUAL',
        },
      },
    },
  }
);

export const launchReferentialEligilityDataBuilder = build<
  LaunchReferentialEligibilityItem
>('LaunchMspInfo', {
  fields: {
    id: 1,
    comments: [
      {
        text: fake((faker) => faker.commerce.product()),
        createDate: fake((faker) => formatISO(faker.date.future())),
        createUserName: fake((faker) => faker.commerce.product()),
        createUserDisplayName: fake((faker) => faker.commerce.product()),
      },
    ],
    effectiveFromDate: {
      code: fake((faker) => faker.commerce.product()),
      name: fake((faker) => faker.commerce.product()),
    },
    fundingType: {
      code: fake((faker) => faker.commerce.product()),
      name: fake((faker) => faker.commerce.product()),
    },
    issuingState: {
      code: fake((faker) => faker.commerce.product()),
      name: fake((faker) => faker.commerce.product()),
    },
    activeEligibleEmployeeDefinitionCode: {
      ccode: fake((faker) => faker.commerce.product()),
      name: fake((faker) => faker.commerce.product()),
    },
    activeEmployeeNote: fake((faker) => faker.commerce.product()),
    employeesExcludedDefinition: {
      code: fake((faker) => faker.commerce.product()),
      name: fake((faker) => faker.commerce.product()),
    },
    employeesExcludedNote: fake((faker) => faker.commerce.product()),
    retroactiveMemberTerminationPeriod: {
      code: fake((faker) => faker.commerce.product()),
      name: fake((faker) => faker.commerce.product()),
    },
    nonStandardTerminationPeriodNote: '',
    doesHpVerifyStudentEligibility: {
      code: fake((faker) => faker.commerce.product()),
      name: fake((faker) => faker.commerce.product()),
    },
    doesHpVerifyDisabledDependents: {
      code: fake((faker) => faker.commerce.product()),
      name: fake((faker) => faker.commerce.product()),
    },
    doubleCoverageInSameGroupAllowed: bool(),
    lateEnrollmentApplies: {
      code: fake((faker) => faker.commerce.product()),
      name: fake((faker) => faker.commerce.product()),
    },
    retireeEligibility: fake((faker) => faker.commerce.product()),
    retireeDefinitionNote: fake((faker) => faker.commerce.product()),
    earlyRetireeEligibility: fake((faker) => faker.commerce.product()),
    earlyRetireeDefinitionNote: fake((faker) => faker.commerce.product()),
    rehireNote: fake((faker) => faker.commerce.product()),
  },
});

export const launchMspInfoQueryBuilder = build<LaunchMspItem>('LaunchMspInfo', {
  fields: {
    mspGroupSize: {
      code: {
        gdfValue: fake((faker) => faker.commerce.product()),
        gsuValue: fake((faker) => faker.commerce.product()),
        compareStatus: 'EQUAL',
      },
      compareStatus: 'EQUAL',
    },
    mspGroupSizeEffectiveDate: {
      gdfValue: fake((faker) => faker.commerce.product()),
      gsuValue: fake((faker) => faker.commerce.product()),
      compareStatus: 'EQUAL',
    },
    compareStatus: 'EQUAL',
  },
});

export const groupCommentsQueryBuilder = build<GroupCommentsQuery>(
  'GroupCommentsInfo',
  {
    fields: {
      group: {
        comments: [
          {
            id: fake((faker) => faker.random.uuid()),
            text: fake((faker) => faker.commerce.product()),
            commentType: gdfDictionaryBuilder(),
            createDate: fake((faker) => formatISO(faker.date.future())),
            createUserName: fake((faker) => faker.commerce.product()),
            createUserDisplayName: fake((faker) => faker.commerce.product()),
          },
        ],
        launches: [
          {
            id: fake((faker) => faker.random.uuid()),
            effectiveDate: fake((faker) => formatISO(faker.date.future())),
            launchDate: fake((faker) => formatISO(faker.date.future())),
            launchComments: [
              {
                id: fake((faker) => faker.random.uuid()),
                text: fake((faker) => faker.commerce.product()),
                createDate: fake((faker) => formatISO(faker.date.future())),
                createUserName: fake((faker) => faker.commerce.product()),
                createUserDisplayName: fake((faker) =>
                  faker.commerce.product()
                ),
                commentType: gdfDictionaryBuilder(),
              },
              {
                id: fake((faker) => faker.random.uuid()),
                text: fake((faker) => faker.commerce.product()),
                createDate: fake((faker) => formatISO(faker.date.future())),
                createUserName: fake((faker) => faker.commerce.product()),
                createUserDisplayName: fake((faker) =>
                  faker.commerce.product()
                ),
                commentType: gdfDictionaryBuilder(),
              },
            ],
          },
        ],
      },
    },
  }
);

export const launchGroupPlansInfoQueryBuilder = build<LaunchGroupPlansInfoItem>(
  'LaunchGroupPlansInfo',
  {
    fields: {
      hrefUriVariables: fake((faker) => ({
        planId: faker.random.uuid(),
        packageCode: faker.commerce.product(),
      })),
      gdfName: fake((faker) => faker.commerce.product()),
      planType: gdfDictionaryBuilder(),
      previousPackageCode: fake((faker) => faker.commerce.product()),
      packageCode: fake((faker) => faker.commerce.product()),
      productCode: fake((faker) => faker.commerce.product()),
      deliveryNetwork: gdfDictionaryBuilder(),
      marketSegment: gdfDictionaryBuilder(),
      fundingType: gdfDictionaryBuilder(),
      benYearAdmin: gdfDictionaryBuilder(),
      pdmaYearType: gdfDictionaryBuilder(),
      creditableRxCoverage: fake((faker) => faker.commerce.product()),
      cignaAffiliation: gdfDictionaryBuilder(),
      autoAssignPackage: fake((faker) => faker.commerce.product()),
      previousAutoDentalDisplay: fake((faker) => faker.commerce.product()),
      beginDate: fake((faker) => formatISO(faker.date.future())),
      endDate: fake((faker) => formatISO(faker.date.future())),
      nextRenewalDate: fake((faker) => formatISO(faker.date.future())),
      hasRate: bool(),
      compareStatus: bool(),
    },
  }
);

export const groupLaunchesQueryBuilder = (
  overwrites?: Overwrites<GetGroupLaunchesQuery>
) => {
  let groupOverwrites = {};
  let launchOverwrites = {};

  if (overwrites?.group) {
    const { launches, ...filteredKeys } = overwrites.group;
    groupOverwrites = filteredKeys;
    [launchOverwrites] = launches;
  }

  return build<GetGroupLaunchesQuery>('LaunchHeaderInfo', {
    fields: {
      group: {
        __typename: 'Group',
        id: fake((faker) => faker.random.uuid()),
        launches: [
          {
            __typename: 'Launch',
            id: sequence(),
            inactive: oneOf(true),
            formType: gdfDictionaryBuilder(),
            status: gdfDictionaryBuilder(),
            launchDate: fake((faker) => formatISO(faker.date.future())),
            effectiveDate: fake((faker) => formatISO(faker.date.future())),
            macReceivedDate: fake((faker) => formatISO(faker.date.future())),
            finalDate: fake((faker) => formatISO(faker.date.future())),
            ...launchOverwrites,
          },
        ],
        ...groupOverwrites,
      },
    },
  })();
};

export const LaunchPlansLinkQueryBuilder = build<LaunchPackageCodeItem>(
  'LaunchPlansLink',
  {
    fields: {
      medicalPackageCode: fake((faker) => faker.commerce.product()),
      autoDentalPackageCode: fake((faker) => faker.commerce.product()),
    },
  }
);

export const launchAutoAssignDentalInfoQueryBuilder = build<
  LaunchAutoAssignDentalDetails
>('LaunchAutoAssignDentalDetails', {
  fields: {
    autoAssignType: {
      gdfValue: 'DEN Preventive Dental Minnesota HP Fully-Insured Children',
      gsuValue: null,
      compareStatus: 'N/A',
    },
    autoAssignPackage: {
      gdfValue: 'PE708',
      gsuValue: null,
      compareStatus: 'N/A',
    },
    autoAssignPackageDeliveryNetwork: {
      code: {
        gdfValue: '149',
        gsuValue: null,
        compareStatus: 'N/A',
      },
      name: {
        gdfValue: 'Open-access w/mayo',
        gsuValue: null,
        compareStatus: 'N/A',
      },
      compareStatus: 'N/A',
    },
  },
});

export const launchGdfRateInfoQueryBuilder = build<LaunchGroupGdfRateInfoItem>(
  'LaunchGdfRateInfo',
  {
    fields: {
      gdfName: 'GDF Plan Name',
    },
  }
);

export const launchRateInfoQueryBuilder = build<LaunchGroupRateInfoItem>(
  'LaunchRateInfo',
  {
    fields: {
      compareStatus: 'NOT_EQUAL',
      effectiveFromDate: {
        gdfValue: fake((faker) => formatISO(faker.date.future())),
        gsuValue: fake((faker) => formatISO(faker.date.future())),
        compareStatus: 'NOT_EQUAL',
      },
      effectiveToDate: {
        gdfValue: fake((faker) => formatISO(faker.date.future())),
        gsuValue: fake((faker) => formatISO(faker.date.future())),
        compareStatus: fake((faker) => formatISO(faker.date.future())),
      },
      planRateType: {
        code: {
          gdfValue: fake((faker) => faker.commerce.product()),
          gsuValue: fake((faker) => faker.commerce.product()),
          compareStatus: fake((faker) => faker.commerce.product()),
        },
        name: {
          gdfValue: fake((faker) => faker.commerce.product()),
          gsuValue: fake((faker) => faker.commerce.product()),
          compareStatus: fake((faker) => faker.commerce.product()),
        },
      },
      properties: {
        area: {
          code: {
            gdfValue: fake((faker) => faker.commerce.product()),
            gsuValue: fake((faker) => faker.commerce.product()),
            compareStatus: fake((faker) => faker.commerce.product()),
          },
          name: {
            gdfValue: fake((faker) => faker.commerce.product()),
            gsuValue: fake((faker) => faker.commerce.product()),
            compareStatus: fake((faker) => faker.commerce.product()),
          },
        },
        rateTierValues: [],
        addonRates: [],
      },
    },
  }
);

export const launchGspAssociationTableInfoBuilder = build<
  LaunchGspAssociationItem
>('LaunchGspAssociationsTable', {
  fields: {
    siteId: {
      gdfValue: fake((faker) => faker.commerce.product()),
      gsuValue: fake((faker) => faker.commerce.product()),
      compareStatus: 'N/A',
    },
    packageCode: {
      gdfValue: fake((faker) => faker.commerce.product()),
      gsuValue: fake((faker) => faker.commerce.product()),
      compareStatus: 'N/A',
    },
    planType: {
      code: {
        gdfValue: fake((faker) => faker.commerce.product()),
        gsuValue: fake((faker) => faker.commerce.product()),
        compareStatus: 'N/A',
      },
      name: {
        gdfValue: fake((faker) => faker.commerce.product()),
        gsuValue: fake((faker) => faker.commerce.product()),
        compareStatus: 'N/A',
      },
      compareStatus: 'N/A',
    },
    compareStatus: 'N/A',
  },
});

export const launchGroupContactsInfoQueryBuilder = build<
  LaunchGroupContactsInfoItem
>('LaunchGroupContactsInfo', {
  fields: {
    address: {
      city: {
        compareStatus: fake((faker) => faker.commerce.product()),
        gdfValue: fake((faker) => faker.commerce.product()),
        gsuValue: fake((faker) => faker.commerce.product()),
      },
      county: {
        compareStatus: fake((faker) => faker.commerce.product()),
        gdfValue: fake((faker) => faker.commerce.product()),
        gsuValue: fake((faker) => faker.commerce.product()),
      },
      state: {
        compareStatus: fake((faker) => faker.commerce.product()),
        gdfValue: fake((faker) => faker.commerce.product()),
        gsuValue: fake((faker) => faker.commerce.product()),
      },
      street1: {
        compareStatus: fake((faker) => faker.commerce.product()),
        gdfValue: fake((faker) => faker.commerce.product()),
        gsuValue: fake((faker) => faker.commerce.product()),
      },
      street2: {
        compareStatus: fake((faker) => faker.commerce.product()),
        gdfValue: fake((faker) => faker.commerce.product()),
        gsuValue: fake((faker) => faker.commerce.product()),
      },
      zip: {
        compareStatus: fake((faker) => faker.commerce.product()),
        gdfValue: fake((faker) => faker.commerce.product()),
        gsuValue: fake((faker) => faker.commerce.product()),
      },
      compareStatus: fake((faker) => faker.commerce.product()),
    },
    compareStatus: fake((faker) => faker.commerce.product()),
    emailAddress: {
      compareStatus: fake((faker) => faker.commerce.product()),
      gdfValue: fake((faker) => faker.commerce.product()),
      gsuValue: fake((faker) => faker.commerce.product()),
    },
    faxNumber: {
      compareStatus: fake((faker) => faker.commerce.product()),
      gdfValue: fake((faker) => faker.commerce.product()),
      gsuValue: fake((faker) => faker.commerce.product()),
    },
    firstName: {
      compareStatus: fake((faker) => faker.commerce.product()),
      gdfValue: fake((faker) => faker.commerce.product()),
      gsuValue: fake((faker) => faker.commerce.product()),
    },
    jobTitle: {
      compareStatus: fake((faker) => faker.commerce.product()),
      gdfValue: fake((faker) => faker.commerce.product()),
      gsuValue: fake((faker) => faker.commerce.product()),
    },
    lastName: {
      compareStatus: fake((faker) => faker.commerce.product()),
      gdfValue: fake((faker) => faker.commerce.product()),
      gsuValue: fake((faker) => faker.commerce.product()),
    },
    middleInitial: {
      compareStatus: fake((faker) => faker.commerce.product()),
      gdfValue: fake((faker) => faker.commerce.product()),
      gsuValue: fake((faker) => faker.commerce.product()),
    },
    phoneExtension: {
      compareStatus: fake((faker) => faker.commerce.product()),
      gdfValue: fake((faker) => faker.commerce.product()),
      gsuValue: fake((faker) => faker.commerce.product()),
    },
    phoneNumber: {
      compareStatus: fake((faker) => faker.commerce.product()),
      gdfValue: fake((faker) => faker.commerce.product()),
      gsuValue: fake((faker) => faker.commerce.product()),
    },
    roleListstring: {
      compareStatus: fake((faker) => faker.commerce.product()),
      gdfValue: fake((faker) => faker.commerce.product()),
      gsuValue: fake((faker) => faker.commerce.product()),
    },
    siteListString: {
      compareStatus: fake((faker) => faker.commerce.product()),
      gdfValue: fake((faker) => faker.commerce.product()),
      gsuValue: fake((faker) => faker.commerce.product()),
    },
  },
});

export const launchGroupSitesInfoQueryBuilder = build<LaunchGroupSitesInfoItem>(
  'LaunchGroupSitesInfo',
  {
    fields: {
      compareStatus: fake((faker) => faker.commerce.product()),
      inactive: {
        compareStatus: fake((faker) => faker.commerce.product()),
        gdfValue: false,
        gsuValue: bool(),
      },
      name: {
        compareStatus: fake((faker) => faker.commerce.product()),
        gdfValue: fake((faker) => faker.commerce.product()),
        gsuValue: fake((faker) => faker.commerce.product()),
      },
      siteId: {
        compareStatus: fake((faker) => faker.commerce.product()),
        gdfValue: fake((faker) => faker.commerce.product()),
        gsuValue: fake((faker) => faker.commerce.product()),
      },
      type: {
        code: {
          compareStatus: fake((faker) => faker.commerce.product()),
          gdfValue: fake((faker) => faker.commerce.product()),
          gsuValue: fake((faker) => faker.commerce.product()),
        },
        name: {
          compareStatus: fake((faker) => faker.commerce.product()),
          gdfValue: fake((faker) => faker.commerce.product()),
          gsuValue: fake((faker) => faker.commerce.product()),
        },
        compareStatus: 'N/A',
      },
      updatedBy: {
        compareStatus: fake((faker) => faker.commerce.product()),
        gdfValue: fake((faker) => faker.commerce.product()),
        gsuValue: fake((faker) => faker.commerce.product()),
      },
    },
  }
);

export const launchPlanTypeInfoItemBuilder = build<LaunchPlanTypeInfoItem>(
  'LaunchPlanTypeInfo',
  {
    fields: {
      planType: {
        name: {
          compareStatus: fake((faker) => faker.commerce.product()),
          gdfValue: fake((faker) => faker.commerce.product()),
          gsuValue: fake((faker) => faker.commerce.product()),
        },
      },
      marketSegment: {
        code: {
          compareStatus: fake((faker) => faker.commerce.product()),
          gdfValue: fake((faker) => faker.commerce.product()),
          gsuValue: fake((faker) => faker.commerce.product()),
        },
      },
    },
  }
);

export const launchPlanDetailsQueryBuilder = build<LaunchPlanDetailItem>(
  'LaunchPlanDetails',
  {
    fields: {
      id: {
        compareStatus: fake((faker) => faker.commerce.product()),
        gdfValue: fake((faker) => faker.commerce.product()),
        gsuValue: fake((faker) => faker.commerce.product()),
      },
      name: {
        compareStatus: fake((faker) => faker.commerce.product()),
        gdfValue: fake((faker) => faker.commerce.product()),
        gsuValue: fake((faker) => faker.commerce.product()),
      },
      beginDate: {
        compareStatus: fake((faker) => faker.commerce.product()),
        gdfValue: fake((faker) => faker.commerce.product()),
        gsuValue: fake((faker) => faker.commerce.product()),
      },
      endDate: {
        compareStatus: fake((faker) => faker.commerce.product()),
        gdfValue: fake((faker) => faker.commerce.product()),
        gsuValue: fake((faker) => faker.commerce.product()),
      },
      planType: {
        name: {
          compareStatus: fake((faker) => faker.commerce.product()),
          gdfValue: fake((faker) => faker.commerce.product()),
          gsuValue: fake((faker) => faker.commerce.product()),
        },
        code: {
          compareStatus: fake((faker) => faker.commerce.product()),
          gdfValue: fake((faker) => faker.commerce.product()),
          gsuValue: fake((faker) => faker.commerce.product()),
        },
      },
      compareStatus: fake((faker) => faker.commerce.product()),
    },
  }
);

export const launchPlanPcdInfoQueryBuilder = build<LaunchPlanPcdInfoItem>(
  'LaunchPlanPcdInfo',
  {
    fields: {
      packageCode: {
        compareStatus: fake((faker) => faker.commerce.product()),
        gdfValue: fake((faker) => faker.commerce.product()),
        gsuValue: fake((faker) => faker.commerce.product()),
      },
      deliveryNetwork: {
        name: {
          compareStatus: fake((faker) => faker.commerce.product()),
          gdfValue: fake((faker) => faker.commerce.product()),
          gsuValue: fake((faker) => faker.commerce.product()),
        },
        code: {
          compareStatus: fake((faker) => faker.commerce.product()),
          gdfValue: fake((faker) => faker.commerce.product()),
          gsuValue: fake((faker) => faker.commerce.product()),
        },
      },
      fundingType: {
        name: {
          compareStatus: fake((faker) => faker.commerce.product()),
          gdfValue: fake((faker) => faker.commerce.product()),
          gsuValue: fake((faker) => faker.commerce.product()),
        },
        code: {
          compareStatus: fake((faker) => faker.commerce.product()),
          gdfValue: fake((faker) => faker.commerce.product()),
          gsuValue: fake((faker) => faker.commerce.product()),
        },
      },
      corporation: {
        name: {
          compareStatus: fake((faker) => faker.commerce.product()),
          gdfValue: fake((faker) => faker.commerce.product()),
          gsuValue: fake((faker) => faker.commerce.product()),
        },
        code: {
          compareStatus: fake((faker) => faker.commerce.product()),
          gdfValue: fake((faker) => faker.commerce.product()),
          gsuValue: fake((faker) => faker.commerce.product()),
        },
      },
    },
  }
);

export const launchPlanPackageRulesQueryBuilder = build<LaunchPackageRulesItem>(
  'LaunchPlanPackageRules',
  {
    fields: {
      marketSegment: {
        name: {
          compareStatus: fake((faker) => faker.commerce.product()),
          gdfValue: fake((faker) => faker.commerce.product()),
          gsuValue: fake((faker) => faker.commerce.product()),
        },
        code: {
          compareStatus: fake((faker) => faker.commerce.product()),
          gdfValue: fake((faker) => faker.commerce.product()),
          gsuValue: fake((faker) => faker.commerce.product()),
        },
      },
      cignaAffiliation: {
        name: {
          compareStatus: fake((faker) => faker.commerce.product()),
          gdfValue: fake((faker) => faker.commerce.product()),
          gsuValue: fake((faker) => faker.commerce.product()),
        },
        code: {
          compareStatus: fake((faker) => faker.commerce.product()),
          gdfValue: fake((faker) => faker.commerce.product()),
          gsuValue: fake((faker) => faker.commerce.product()),
        },
      },
      fundingSubType: {
        name: {
          compareStatus: fake((faker) => faker.commerce.product()),
          gdfValue: fake((faker) => faker.commerce.product()),
          gsuValue: fake((faker) => faker.commerce.product()),
        },
        code: {
          compareStatus: fake((faker) => faker.commerce.product()),
          gdfValue: fake((faker) => faker.commerce.product()),
          gsuValue: fake((faker) => faker.commerce.product()),
        },
      },
      creditableRxCoverage: {
        compareStatus: fake((faker) => faker.commerce.product()),
        gdfValue: fake((faker) => faker.commerce.product()),
        gsuValue: fake((faker) => faker.commerce.product()),
      },
      grandfatheredPlan: {
        compareStatus: fake((faker) => faker.commerce.product()),
        gdfValue: fake((faker) => faker.commerce.product()),
        gsuValue: fake((faker) => faker.commerce.product()),
      },
      administratorType: {
        name: {
          compareStatus: fake((faker) => faker.commerce.product()),
          gdfValue: fake((faker) => faker.commerce.product()),
          gsuValue: fake((faker) => faker.commerce.product()),
        },
        code: {
          compareStatus: fake((faker) => faker.commerce.product()),
          gdfValue: fake((faker) => faker.commerce.product()),
          gsuValue: fake((faker) => faker.commerce.product()),
        },
      },
      pdmaYearType: {
        name: {
          compareStatus: fake((faker) => faker.commerce.product()),
          gdfValue: fake((faker) => faker.commerce.product()),
          gsuValue: fake((faker) => faker.commerce.product()),
        },
        code: {
          compareStatus: fake((faker) => faker.commerce.product()),
          gdfValue: fake((faker) => faker.commerce.product()),
          gsuValue: fake((faker) => faker.commerce.product()),
        },
      },
      pdmaDomesticPartnerType: {
        name: {
          compareStatus: fake((faker) => faker.commerce.product()),
          gdfValue: fake((faker) => faker.commerce.product()),
          gsuValue: fake((faker) => faker.commerce.product()),
        },
        code: {
          compareStatus: fake((faker) => faker.commerce.product()),
          gdfValue: fake((faker) => faker.commerce.product()),
          gsuValue: fake((faker) => faker.commerce.product()),
        },
      },
    },
  }
);

export const launchPlanEligibilityRulesQueryBuilder = build<
  LaunchEligibilityRulesItem
>('LaunchPlanEligibilityRules', {
  fields: {
    id: {
      gdfValue: fake((faker) => faker.commerce.product()),
      gsuValue: fake((faker) => faker.commerce.product()),
      compareStatus: 'N/A',
    },
    name: {
      compareStatus: fake((faker) => faker.commerce.product()),
      gdfValue: fake((faker) => faker.commerce.product()),
      gsuValue: fake((faker) => faker.commerce.product()),
    },
    newHireWaitingPeriod: {
      name: {
        compareStatus: fake((faker) => faker.commerce.product()),
        gdfValue: fake((faker) => faker.commerce.product()),
        gsuValue: fake((faker) => faker.commerce.product()),
      },
      code: {
        compareStatus: fake((faker) => faker.commerce.product()),
        gdfValue: fake((faker) => faker.commerce.product()),
        gsuValue: fake((faker) => faker.commerce.product()),
      },
    },
    rehireWaitingPeriod: {
      name: {
        compareStatus: fake((faker) => faker.commerce.product()),
        gdfValue: fake((faker) => faker.commerce.product()),
        gsuValue: fake((faker) => faker.commerce.product()),
      },
      code: {
        compareStatus: fake((faker) => faker.commerce.product()),
        gdfValue: fake((faker) => faker.commerce.product()),
        gsuValue: fake((faker) => faker.commerce.product()),
      },
    },
    grandchildrenAllowed: {
      compareStatus: fake((faker) => faker.commerce.product()),
      gdfValue: fake((faker) => faker.commerce.product()),
      gsuValue: fake((faker) => faker.commerce.product()),
    },
    ageOffSplitStudentNon: {
      compareStatus: fake((faker) => faker.commerce.product()),
      gdfValue: fake((faker) => faker.commerce.product()),
      gsuValue: fake((faker) => faker.commerce.product()),
    },
    maxDependentAge: {
      compareStatus: fake((faker) => faker.commerce.product()),
      gdfValue: fake((faker) => faker.commerce.product()),
      gsuValue: fake((faker) => faker.commerce.product()),
    },
    maxStudentAge: {
      compareStatus: fake((faker) => faker.commerce.product()),
      gdfValue: fake((faker) => faker.commerce.product()),
      gsuValue: fake((faker) => faker.commerce.product()),
    },
    studentWhenToCancel: {
      name: {
        compareStatus: fake((faker) => faker.commerce.product()),
        gdfValue: fake((faker) => faker.commerce.product()),
        gsuValue: fake((faker) => faker.commerce.product()),
      },
      code: {
        compareStatus: fake((faker) => faker.commerce.product()),
        gdfValue: fake((faker) => faker.commerce.product()),
        gsuValue: fake((faker) => faker.commerce.product()),
      },
    },
    dependentWhenToCancel: {
      name: {
        compareStatus: fake((faker) => faker.commerce.product()),
        gdfValue: fake((faker) => faker.commerce.product()),
        gsuValue: fake((faker) => faker.commerce.product()),
      },
      code: {
        compareStatus: fake((faker) => faker.commerce.product()),
        gdfValue: fake((faker) => faker.commerce.product()),
        gsuValue: fake((faker) => faker.commerce.product()),
      },
    },
  },
});

export const launchPlanEligibilityRuleInfoQueryBuilder = build<
  LaunchRuleInfoItem
>('LaunchPlanEligibilityRules', {
  fields: {
    selectedEligRule: {
      name: {
        compareStatus: fake((faker) => faker.commerce.product()),
        gdfValue: fake((faker) => faker.commerce.product()),
        gsuValue: fake((faker) => faker.commerce.product()),
      },
      newHireWaitingPeriod: {
        name: {
          compareStatus: fake((faker) => faker.commerce.product()),
          gdfValue: fake((faker) => faker.commerce.product()),
          gsuValue: fake((faker) => faker.commerce.product()),
        },
        code: {
          compareStatus: fake((faker) => faker.commerce.product()),
          gdfValue: fake((faker) => faker.commerce.product()),
          gsuValue: fake((faker) => faker.commerce.product()),
        },
      },
      rehireWaitingPeriod: {
        name: {
          compareStatus: fake((faker) => faker.commerce.product()),
          gdfValue: fake((faker) => faker.commerce.product()),
          gsuValue: fake((faker) => faker.commerce.product()),
        },
        code: {
          compareStatus: fake((faker) => faker.commerce.product()),
          gdfValue: fake((faker) => faker.commerce.product()),
          gsuValue: fake((faker) => faker.commerce.product()),
        },
      },
      grandchildrenAllowed: {
        compareStatus: fake((faker) => faker.commerce.product()),
        gdfValue: fake((faker) => faker.commerce.product()),
        gsuValue: fake((faker) => faker.commerce.product()),
      },
      ageOffSplitStudentNon: {
        compareStatus: fake((faker) => faker.commerce.product()),
        gdfValue: fake((faker) => faker.commerce.product()),
        gsuValue: fake((faker) => faker.commerce.product()),
      },
      maxDependentAge: {
        compareStatus: fake((faker) => faker.commerce.product()),
        gdfValue: fake((faker) => faker.commerce.product()),
        gsuValue: fake((faker) => faker.commerce.product()),
      },
      maxStudentAge: {
        compareStatus: fake((faker) => faker.commerce.product()),
        gdfValue: fake((faker) => faker.commerce.product()),
        gsuValue: fake((faker) => faker.commerce.product()),
      },
      whenToCancel: {
        name: {
          compareStatus: fake((faker) => faker.commerce.product()),
          gdfValue: fake((faker) => faker.commerce.product()),
          gsuValue: fake((faker) => faker.commerce.product()),
        },
        code: {
          compareStatus: fake((faker) => faker.commerce.product()),
          gdfValue: fake((faker) => faker.commerce.product()),
          gsuValue: fake((faker) => faker.commerce.product()),
        },
      },
    },
  },
});

// LaunchRuleInfoItem;
