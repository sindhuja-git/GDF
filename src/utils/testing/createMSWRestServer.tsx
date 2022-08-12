import { setupServer } from 'msw/node';
// import API mocking utilities from Mock Service Worker
import { rest } from 'msw';

import {
  launchGroupBasicInfoQueryBuilder,
  launchGspAssociationTableInfoBuilder,
  launchGroupRepsInfoQueryBuilder,
  launchEnrollmentInfoQueryBuilder,
  launchPrintTechInfoQueryBuilder,
  launchSLSFulfillmentInfoQueryBuilder,
  launchAddressInfoQueryBuilder,
  launchMspInfoQueryBuilder,
  launchGroupPlansInfoQueryBuilder,
  launchReferentialEligilityDataBuilder,
  launchAutoAssignDentalInfoQueryBuilder,
  launchRateInfoQueryBuilder,
  launchGroupSitesInfoQueryBuilder,
  launchGroupContactsInfoQueryBuilder,
  launchPlanTypeInfoItemBuilder,
  launchPlanDetailsQueryBuilder,
  launchPlanPcdInfoQueryBuilder,
  launchPlanPackageRulesQueryBuilder,
  launchPlanEligibilityRulesQueryBuilder,
  launchPlanEligibilityRuleInfoQueryBuilder,
  LaunchPlansLinkQueryBuilder,
  launchGdfRateInfoQueryBuilder,
} from 'utils/testing/dataBuilders';

/**
 * ! We will be testing invalid routes and layout here. We will be testing demographics pages independently.
 */

export const defaultLaunchGroupBasicInfo = launchGroupBasicInfoQueryBuilder();
export const defaultLaunchGroupRepsInfo = launchGroupRepsInfoQueryBuilder();
export const defaultLaunchEnrollmentInfo = launchEnrollmentInfoQueryBuilder();
export const defaultLaunchSLSFulfillmentInfo = launchSLSFulfillmentInfoQueryBuilder();
export const defaultLaunchPrintTechInfo = launchPrintTechInfoQueryBuilder();
export const defaultLaunchAddressInfo = launchAddressInfoQueryBuilder();
export const defaultLaunchMspInfo = launchMspInfoQueryBuilder();
export const defaultLaunchGspAssociationTableInfo = launchGspAssociationTableInfoBuilder();
export const defaultLaunchGroupPlansInfo = launchGroupPlansInfoQueryBuilder();
export const defaultLaunchReferentialEligibilityInfo = launchReferentialEligilityDataBuilder();
export const defaultLaunchAutoAssignDentalInfo = launchAutoAssignDentalInfoQueryBuilder();
export const defaultRateInfo = launchRateInfoQueryBuilder();
export const defaultGdfRateInfo = launchGdfRateInfoQueryBuilder();
export const defaultLaunchGroupSitesInfo = launchGroupSitesInfoQueryBuilder();
export const defaultLaunchGroupContactsInfo = launchGroupContactsInfoQueryBuilder();
export const defaultPlanTypeInfo = launchPlanTypeInfoItemBuilder();
export const defaultLaunchPlanDetails = launchPlanDetailsQueryBuilder();
export const defaultLaunchPcdInfo = launchPlanPcdInfoQueryBuilder();
export const defaultLaunchPackageRules = launchPlanPackageRulesQueryBuilder();
export const defaultLaunchEligibilityRules = launchPlanEligibilityRulesQueryBuilder();
export const defaultLaunchEligibilityRuleInfo = launchPlanEligibilityRuleInfoQueryBuilder();
export const defaultLaunchPlanLink = LaunchPlansLinkQueryBuilder();

/**
 * MSW doesn't provide us the types for overrides.
 */
const createMSWRestServer = (...overrides: any) =>
  setupServer(
    rest.get('getGroupBasicInfoData', (req, res, ctx) => {
      return res(ctx.json(defaultLaunchGroupBasicInfo));
    }),
    rest.get('getGroupRepsInfo', (req, res, ctx) => {
      return res(ctx.json(defaultLaunchGroupRepsInfo));
    }),
    rest.get('getGroupEnrollmentInfo', (req, res, ctx) => {
      return res(ctx.json(defaultLaunchEnrollmentInfo));
    }),
    rest.get('getGroupSlsFulfillmentInfo', (req, res, ctx) => {
      return res(ctx.json(defaultLaunchSLSFulfillmentInfo));
    }),
    rest.get('getGroupPrintTechInfo', (req, res, ctx) => {
      return res(ctx.json(defaultLaunchPrintTechInfo));
    }),
    rest.get('getGroupAddressInfo', (req, res, ctx) => {
      return res(ctx.json(defaultLaunchAddressInfo));
    }),
    rest.get('getGroupMspInfo', (req, res, ctx) => {
      return res(ctx.json(defaultLaunchMspInfo));
    }),
    rest.get('getGspAssociationTableInfo', (req, res, ctx) => {
      return res(ctx.json(defaultLaunchGspAssociationTableInfo));
    }),
    rest.get('getGroupPlanInfo', (req, res, ctx) => {
      return res(ctx.json(defaultLaunchGroupPlansInfo));
    }),
    rest.get('getReferentialEligibilityInfo', (req, res, ctx) => {
      return res(ctx.json(defaultLaunchReferentialEligibilityInfo));
    }),
    rest.get('getPlanAutoDentalInfo', (req, res, ctx) => {
      return res(ctx.json(defaultLaunchAutoAssignDentalInfo));
    }),
    rest.get('getGroupSiteData', (req, res, ctx) => {
      return res(ctx.json(defaultLaunchGroupSitesInfo));
    }),
    rest.get('getGroupRateInfo', (req, res, ctx) => {
      return res(ctx.json(defaultRateInfo));
    }),
    rest.get('getGroupRateDiffInfo', (req, res, ctx) => {
      return res(ctx.json(defaultGdfRateInfo));
    }),
    rest.get('getGroupContactsInfo', (req, res, ctx) => {
      return res(ctx.json(defaultLaunchGroupContactsInfo));
    }),
    rest.get('getPlanDetails', (req, res, ctx) => {
      return res(ctx.json(defaultPlanTypeInfo));
    }),
    rest.get('getGroupPlanDetails', (req, res, ctx) => {
      return res(ctx.json(defaultLaunchPlanDetails));
    }),
    rest.get('getGroupPcdInfo', (req, res, ctx) => {
      return res(ctx.json(defaultLaunchPcdInfo));
    }),
    rest.get('getPacakgeRulesInfo', (req, res, ctx) => {
      return res(ctx.json(defaultLaunchPackageRules));
    }),
    rest.get('getEligibilityRulesInfo', (req, res, ctx) => {
      return res(ctx.json(defaultLaunchEligibilityRules));
    }),
    rest.get('getEligibilityRulesInfo', (req, res, ctx) => {
      return res(ctx.json(defaultLaunchEligibilityRuleInfo));
    }),

    ...overrides
  );

export default createMSWRestServer;
