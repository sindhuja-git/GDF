import { API_BASE_URL } from './constants';
import { getQueryParametersString } from '../utils/getQueryParamsString';

const baseUrl = (groupId, launchId) => {
  return `${API_BASE_URL}/${groupId}/launches/${launchId}`;
};

export const getGroupBasicInfoData = (groupId, launchId) =>
  `${baseUrl(groupId, launchId)}/demographics`;

export const getDemographicsSummaryData = (groupId, launchId) =>
  `${baseUrl(groupId, launchId)}/demographics/summary`;

export const getGroupAddressData = (groupId, launchId) =>
  `${baseUrl(groupId, launchId)}/demographics/address`;

export const getGroupEnrollmentData = (groupId, launchId) =>
  `${baseUrl(groupId, launchId)}/demographics/enrollment`;

export const getGroupRepsData = (groupId, launchId) =>
  `${baseUrl(groupId, launchId)}/demographics/reps`;

export const getGroupMspData = (groupId, launchId) =>
  `${baseUrl(groupId, launchId)}/demographics/msp-info`;

export const getGroupPrintTechData = (groupId, launchId) =>
  `${baseUrl(groupId, launchId)}/demographics/printTech-fulfillment`;

export const getGroupSLSFulfillmentData = (groupId, launchId) =>
  `${baseUrl(groupId, launchId)}/demographics/sls-fulfillment`;

export const getGspAssociationsData = (groupId, launchId) =>
  `${baseUrl(groupId, launchId)}/gsp-associations`;

export const getGspAssociationsSummaryData = (groupId, launchId) =>
  `${baseUrl(groupId, launchId)}/gsp-associations/summary`;

export const getPlansSummaryData = (groupdId, launchId) =>
  `${baseUrl(groupdId, launchId)}/plans/summary`;

export const getPlanOrRatesSummaryData = (groupId, launchId, isRate) =>
  `/api/diff/groups/${groupId}/launches/${launchId}/mac-plan/summaries?isRate=${isRate}`;

export const getRatesSummaryData = (groupId, launchId) =>
  `${baseUrl(groupId, launchId)}/rates/summary`;

export const getGroupRateData = (groupId, launchId, planId, packageCode) =>
  `${baseUrl(
    groupId,
    launchId
  )}/plans/${planId}/rates/gsu${getQueryParametersString({
    pkgCode: packageCode,
  })}`;

export const getGroupGdfRateData = (groupId, launchId, planId) =>
  `/api/gsu-gdf/launches/${launchId}/plans/${planId}/rates`;

export const getReferentialEligilibilityData = (launchId, planId) =>
  `/api/gsu-gdf/launches/${launchId}/plans/${planId}/eligibility/referential`;

export const getReferentialRateData = (launchId, planId) =>
  `/api/gsu-gdf/launches/${launchId}/plans/${planId}/rate/referential`;

export const getPlansQuestionsAndAnswersDiffData = (
  groupId,
  launchId,
  planId,
  packageCode
) =>
  `${baseUrl(
    groupId,
    launchId
  )}/plans/${planId}/questions${getQueryParametersString({ packageCode })}`;

/* This can go away after implementing the newplaninfo */
export const getPackageRulesData = (groupId, launchId, planId, packageCode) =>
  `${baseUrl(
    groupId,
    launchId
  )}/plans/${planId}/packageRules${getQueryParametersString({ packageCode })}`;

export const getGroupSiteData = (groupId, launchId) =>
  `${baseUrl(groupId, launchId)}/sites`;

export const getSitesSummaryData = (groupId, launchId) =>
  `${baseUrl(groupId, launchId)}/sites/summary`;

export const getGroupContactsData = (groupId, launchId) =>
  `${baseUrl(groupId, launchId)}/contacts`;

export const getContactsSummaryData = (groupId, launchId) =>
  `${baseUrl(groupId, launchId)}/contacts/summary`;

/* This can go away after implementing the newplaninfo */
export const getPlanDetailsData = (groupId, launchId, planId, packageCode) =>
  `${baseUrl(
    groupId,
    launchId
  )}/plans/${planId}/details${getQueryParametersString({
    packageCode,
  })}`;

export const getPlanInfo = (groupId, launchId, planId, packageCode) => {
  return `${baseUrl(
    groupId,
    launchId
  )}/plans/${planId}${getQueryParametersString({
    packageCode,
  })}`;
};

export const getGdfName = (launchId, planId) => {
  return `/api/gsu-gdf/launches/${launchId}/plans/${planId}/name`;
};

/* This can go away after implementing the newplaninfo */
export const getPcdInfoData = (groupId, launchId, planId, packageCode) =>
  `${baseUrl(
    groupId,
    launchId
  )}/plans/${planId}/pcdInfo${getQueryParametersString({
    packageCode,
  })}`;

/* This can go away after implementing the newplaninfo */
export const getEligibilityRulesData = (
  groupId,
  launchId,
  planId,
  packageCode
) =>
  `${baseUrl(
    groupId,
    launchId
  )}/plans/${planId}/eligibility/rules${getQueryParametersString({
    packageCode,
  })}`;

export const getGroupAttachmentsData = (groupNumber, launchId) =>
  `/api/gsu-gdf/groups/${groupNumber}/launches/${launchId}/attachments`;

export const getPackageCodeData = (groupId, launchId, planId) =>
  `/api/gsu-gdf/launches/${launchId}/plans/${planId}/header`;

export const getPlansQuesAndData = (planId) =>
  `/api/gsu-gdf/launches/benefits/${planId}/admin`;

export const getCommentsData = (planId) =>
  `/api/gsu-gdf/launches/plans/${planId}/item/comments`;

export const getFeatureFlag = (flagName) =>
  `/admin/gsu-group/api/feature-flag/check/${flagName}`;
