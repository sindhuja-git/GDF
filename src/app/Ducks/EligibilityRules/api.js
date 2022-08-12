import Fetch from '../../../utils/fetch';
import { getEligibilityRulesData } from '../../api-urls';

const fetchEligibilityRules = async (obj) => {
  // eslint-disable-next-line no-useless-catch
  try {
    return await Fetch({
      url: getEligibilityRulesData(obj.groupId, obj.launchId, obj.planId),
    });
  } catch (err) {
    throw err;
  }
};
export default fetchEligibilityRules;
