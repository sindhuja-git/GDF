import Fetch from '../../../utils/fetch';
import { getPlanOrRatesSummaryData } from '../../api-urls';

const fetchPlanOrRatesSummary = async (obj) => {
  // eslint-disable-next-line no-useless-catch
  try {
    return await Fetch({
      url: getPlanOrRatesSummaryData(obj.groupNumber, obj.launchId, obj.isRate),
    });
  } catch (err) {
    throw err;
  }
};

export default fetchPlanOrRatesSummary;
